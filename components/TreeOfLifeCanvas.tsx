'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, ZoomOut, RotateCcw, Columns } from 'lucide-react';
import {
  SEPHIROTH_DATA,
  PATHS_DATA,
  LIGHTNING_FLASH_SEQUENCE,
  SERPENT_PATH_SEQUENCE,
  Sephira,
  Path,
} from '@/lib/qabalah-data';

export type HoveredItem =
  | { type: 'sephira'; data: Sephira }
  | { type: 'path'; data: Path };

interface TreeOfLifeCanvasProps {
  selectedScale: 'atziluth' | 'briah' | 'yetzirah' | 'assiah';
  activeFilter: string | null;
  activeMode: 'default' | 'lightning' | 'serpent';
  selectedSephiraId: string | null;
  selectedPathId: string | null;
  onSelectSephira: (sephira: Sephira) => void;
  onSelectPath: (path: Path) => void;
  onHoverItem: (item: HoveredItem | null) => void;
  hoveredItem: HoveredItem | null;
  showPillars?: boolean;
  onTogglePillars?: () => void;
}

// Map Sephira IDs to absolute SVG coordinates inside viewBox="0 -30 600 916"
const SVG_COORDS: Record<string, { x: number; y: number }> = {
  kether: { x: 300, y: 80 },
  chokmah: { x: 470, y: 175 },
  binah: { x: 130, y: 175 },
  daath: { x: 300, y: 255 },
  chesed: { x: 470, y: 355 },
  geburah: { x: 130, y: 355 },
  tiphareth: { x: 300, y: 465 },
  netzach: { x: 470, y: 595 },
  hod: { x: 130, y: 595 },
  yesod: { x: 300, y: 705 },
  malkuth: { x: 300, y: 815 },
};

// Custom position overrides along path segment (0 to 1) to prevent label/badge overlaps
const PATH_BADGE_RATIOS: Record<string, number> = {
  'path-25': 0.35, // Samekh: places badge at y ≈ 549 above the Peh crossing at y = 595
  'path-13': 0.58, // Gimel: places badge at y ≈ 303 between Da'ath (255) and Path 19 (355)
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.4;

export default function TreeOfLifeCanvas({
  selectedScale,
  activeFilter,
  activeMode,
  selectedSephiraId,
  selectedPathId,
  onSelectSephira,
  onSelectPath,
  onHoverItem,
  hoveredItem,
  showPillars: controlledShowPillars,
  onTogglePillars,
}: TreeOfLifeCanvasProps) {
  const [internalShowPillars, setInternalShowPillars] = useState(true);
  const showPillars =
    controlledShowPillars !== undefined ? controlledShowPillars : internalShowPillars;
  const handleTogglePillars = () => {
    if (onTogglePillars) {
      onTogglePillars();
    } else {
      setInternalShowPillars((prev) => !prev);
    }
  };

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{
    active: boolean;
    moved: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });
  const pinchStartRef = useRef<{ distance: number; zoom: number } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setIsFinePointer(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const clampPan = (nextX: number, nextY: number, currentZoom: number) => {
    if (currentZoom <= 1 || !viewportRef.current) return { x: 0, y: 0 };
    const rect = viewportRef.current.getBoundingClientRect();
    const maxX = ((currentZoom - 1) * rect.width) / 2;
    const maxY = ((currentZoom - 1) * rect.height) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, nextX)),
      y: Math.max(-maxY, Math.min(maxY, nextY)),
    };
  };

  const applyZoom = (nextZoom: number) => {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Number(nextZoom.toFixed(2))));
    setZoom(clamped);
    setPan((prev) => clampPan(prev.x, prev.y, clamped));
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragStateRef.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      originX: pan.x,
      originY: pan.y,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.active || zoom <= 1) return;
    const dx = e.clientX - dragStateRef.current.startX;
    const dy = e.clientY - dragStateRef.current.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      dragStateRef.current.moved = true;
    }
    setPan(
      clampPan(dragStateRef.current.originX + dx, dragStateRef.current.originY + dy, zoom)
    );
  };

  const handlePointerUp = () => {
    dragStateRef.current.active = false;
    setIsDragging(false);
    setTimeout(() => {
      dragStateRef.current.moved = false;
    }, 0);
  };

  const getTouchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      dragStateRef.current.active = false;
      pinchStartRef.current = {
        distance: getTouchDistance(e.touches),
        zoom,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinchStartRef.current) {
      const currentDist = getTouchDistance(e.touches);
      const ratio = currentDist / Math.max(1, pinchStartRef.current.distance);
      applyZoom(pinchStartRef.current.zoom * ratio);
    }
  };

  const handleTouchEnd = () => {
    pinchStartRef.current = null;
  };

  const handleSelectSephiraSafe = (sephira: Sephira) => {
    if (dragStateRef.current.moved) return;
    onSelectSephira(sephira);
  };

  const handleSelectPathSafe = (pathItem: Path) => {
    if (dragStateRef.current.moved) return;
    onSelectPath(pathItem);
  };

  const isSephiraFiltered = (sephira: Sephira) => {
    if (!activeFilter) return true;
    const filterLower = activeFilter.toLowerCase();
    return (
      sephira.pillar.toLowerCase().includes(filterLower) ||
      sephira.element.toLowerCase().includes(filterLower) ||
      sephira.astrological.toLowerCase().includes(filterLower) ||
      sephira.name.toLowerCase().includes(filterLower) ||
      sephira.archangel.toLowerCase().includes(filterLower)
    );
  };

  const isPathFiltered = (path: Path) => {
    if (!activeFilter) return true;
    const filterLower = activeFilter.toLowerCase();
    return (
      path.attribution.toLowerCase().includes(filterLower) ||
      path.attributionType.toLowerCase().includes(filterLower) ||
      path.tarotCardName.toLowerCase().includes(filterLower) ||
      path.hebrewLetterName.toLowerCase().includes(filterLower) ||
      path.name.toLowerCase().includes(filterLower)
    );
  };

  const getLightningFlashD = () => {
    return LIGHTNING_FLASH_SEQUENCE.map((id, index) => {
      const coord = SVG_COORDS[id];
      return `${index === 0 ? 'M' : 'L'} ${coord.x} ${coord.y}`;
    }).join(' ');
  };

  const showFloatingTooltip = isFinePointer && hoveredItem;

  return (
    <div className="relative w-full md:max-w-[660px] mx-auto h-full flex flex-col md:bg-[#0a0a0d] md:rounded-2xl md:border md:border-[#24242c] md:p-3.5 lg:p-4 md:shadow-2xl select-none overflow-hidden">
      {/* Tablet & Desktop Canvas Toolbar (Hidden on Mobile so the Tree gets maximum screen height) */}
      <div className="hidden md:flex items-center justify-between gap-2 mb-2 px-1 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-xs text-[#c5a059] font-semibold tracking-wider truncate">
            Tree of Life · <span className="capitalize">{selectedScale}</span> Scale
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center bg-[#121218] border border-[#24242c] rounded-xl p-0.5">
            <button
              type="button"
              onClick={() => applyZoom(zoom - 0.35)}
              disabled={zoom <= MIN_ZOOM}
              aria-label="Zoom out"
              className="min-h-[32px] min-w-[32px] flex items-center justify-center rounded-lg text-[#a0a0a8] hover:text-[#e8c982] disabled:opacity-35 transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-[11px] font-mono tabular-nums text-[#a0a0a8] min-w-[38px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => applyZoom(zoom + 0.35)}
              disabled={zoom >= MAX_ZOOM}
              aria-label="Zoom in"
              className="min-h-[32px] min-w-[32px] flex items-center justify-center rounded-lg text-[#a0a0a8] hover:text-[#e8c982] disabled:opacity-35 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoom > 1 && (
              <button
                type="button"
                onClick={handleResetView}
                aria-label="Reset zoom"
                className="min-h-[32px] min-w-[32px] flex items-center justify-center rounded-lg text-[#c5a059] hover:bg-[#c5a059]/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleTogglePillars}
            className={`min-h-[34px] px-3 rounded-xl transition-colors border text-xs font-medium flex items-center gap-1.5 whitespace-nowrap ${
              showPillars
                ? 'bg-[#c5a059]/15 border-[#c5a059]/60 text-[#e8c982]'
                : 'bg-[#141418] border-[#272730] text-[#9a9aa6] hover:text-[#e0e0e0]'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Pillars</span>
          </button>
        </div>
      </div>

      {/* Viewport-Fitted SVG Stage */}
      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative flex-1 min-h-0 w-full overflow-hidden md:rounded-xl md:bg-[#07070a] md:border md:border-[#1a1a22] flex items-center justify-center ${
          zoom > 1
            ? isDragging
              ? 'cursor-grabbing touch-none'
              : 'cursor-grab touch-none'
            : 'touch-pan-y'
        }`}
      >
        <div
          className="w-full h-full flex items-center justify-center md:p-2 will-change-transform"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging
              ? 'none'
              : 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <svg
            viewBox="35 -28 530 912"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full max-w-full max-h-full drop-shadow-lg"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Interactive Hermetic Qabalah Tree of Life diagram with 10 Sephiroth, Daath, and 22 connecting paths"
          >
            <defs>
              <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c5a059" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#fef08a" stopOpacity="1" />
                <stop offset="100%" stopColor="#9a7b38" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* SUBTLE BACKGROUND PILLARS */}
            {showPillars && (
              <g className="transition-opacity duration-300">
                <rect
                  x="72"
                  y="92"
                  width="116"
                  height="566"
                  rx="10"
                  fill="#121216"
                  stroke="#27272a"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.55"
                />
                <text
                  x="130"
                  y="114"
                  textAnchor="middle"
                  className="fill-[#a0a0a8] text-[10px] font-serif tracking-[0.14em] uppercase pointer-events-none"
                >
                  Severity (Boaz)
                </text>

                <rect
                  x="242"
                  y="-16"
                  width="116"
                  height="888"
                  rx="10"
                  fill="#121216"
                  stroke="#27272a"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.55"
                />
                <text
                  x="300"
                  y="8"
                  textAnchor="middle"
                  className="fill-[#c5a059] text-[10px] font-serif tracking-[0.14em] uppercase font-bold pointer-events-none"
                >
                  Mildness (Middle)
                </text>

                <rect
                  x="412"
                  y="92"
                  width="116"
                  height="566"
                  rx="10"
                  fill="#121216"
                  stroke="#27272a"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.55"
                />
                <text
                  x="470"
                  y="114"
                  textAnchor="middle"
                  className="fill-[#a0a0a8] text-[10px] font-serif tracking-[0.14em] uppercase pointer-events-none"
                >
                  Mercy (Jachin)
                </text>
              </g>
            )}

            {/* THE 22 CONNECTING PATHS */}
            <g id="paths-group">
              {PATHS_DATA.map((pathItem) => {
                const start = SVG_COORDS[pathItem.fromSephiraId];
                const end = SVG_COORDS[pathItem.toSephiraId];
                if (!start || !end) return null;

                const isSelected = selectedPathId === pathItem.id;
                const isHovered =
                  isFinePointer &&
                  hoveredItem?.type === 'path' &&
                  hoveredItem.data.id === pathItem.id;
                const matchesFilter = isPathFiltered(pathItem);
                const isSerpent =
                  activeMode === 'serpent' &&
                  SERPENT_PATH_SEQUENCE.includes(pathItem.id);

                const badgeRatio = PATH_BADGE_RATIOS[pathItem.id] ?? 0.5;
                const badgeX = start.x + (end.x - start.x) * badgeRatio;
                const badgeY = start.y + (end.y - start.y) * badgeRatio;

                return (
                  <g
                    key={pathItem.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Path ${pathItem.number}, ${pathItem.hebrewLetterName}, ${pathItem.tarotCardName}`}
                    className="cursor-pointer group focus:outline-none"
                    onClick={() => handleSelectPathSafe(pathItem)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectPath(pathItem);
                      }
                    }}
                    onMouseEnter={() => {
                      if (isFinePointer) onHoverItem({ type: 'path', data: pathItem });
                    }}
                    onMouseLeave={() => {
                      if (isFinePointer) onHoverItem(null);
                    }}
                  >
                    <line
                      x1={start.x}
                      y1={start.y}
                      x2={end.x}
                      y2={end.y}
                      stroke="transparent"
                      strokeWidth="32"
                    />

                    {(isHovered || isSelected || isSerpent) && (
                      <line
                        x1={start.x}
                        y1={start.y}
                        x2={end.x}
                        y2={end.y}
                        stroke={isSerpent ? '#10b981' : '#c5a059'}
                        strokeWidth="8"
                        opacity={0.6}
                        filter="url(#goldGlow)"
                      />
                    )}

                    <line
                      x1={start.x}
                      y1={start.y}
                      x2={end.x}
                      y2={end.y}
                      stroke={
                        isSerpent
                          ? '#34d399'
                          : isSelected
                          ? '#c5a059'
                          : isHovered
                          ? '#fef08a'
                          : matchesFilter
                          ? '#45454e'
                          : '#1e1e24'
                      }
                      strokeWidth={isSelected || isHovered ? 3.5 : 2.2}
                      opacity={
                        matchesFilter
                          ? activeMode === 'serpent' && !isSerpent
                            ? 0.25
                            : 0.88
                          : 0.15
                      }
                      strokeDasharray={
                        pathItem.id === 'path-13' || pathItem.id === 'path-25'
                          ? '6 3'
                          : undefined
                      }
                    />

                    <g transform={`translate(${badgeX}, ${badgeY})`}>
                      <circle r="22" fill="transparent" />
                      <circle
                        r={isHovered || isSelected ? 14 : 12.5}
                        fill={isSelected ? '#1c1917' : isHovered ? '#18181b' : '#0a0a0d'}
                        stroke={isSelected ? '#c5a059' : isHovered ? '#e4e4e7' : '#4a4a55'}
                        strokeWidth={isSelected ? 2.2 : 1.3}
                        className="transition-all duration-150"
                      />
                      <text
                        textAnchor="middle"
                        dy="4.5"
                        className={`text-[13px] font-serif font-bold pointer-events-none transition-colors ${
                          isSelected
                            ? 'fill-[#c5a059]'
                            : isHovered
                            ? 'fill-[#ffffff]'
                            : 'fill-[#b8b8c2]'
                        }`}
                      >
                        {pathItem.hebrewLetter}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>

            {/* LIGHTNING FLASH OVERLAY */}
            {activeMode === 'lightning' && (
              <g id="lightning-flash-overlay" filter="url(#goldGlow)">
                <path
                  d={getLightningFlashD()}
                  fill="none"
                  stroke="url(#goldLineGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {LIGHTNING_FLASH_SEQUENCE.map((id, index) => {
                  const coord = SVG_COORDS[id];
                  return (
                    <g
                      key={`lf-step-${id}`}
                      transform={`translate(${coord.x - 24}, ${coord.y - 24})`}
                    >
                      <circle r="10" fill="#1c1917" stroke="#c5a059" strokeWidth="1.5" />
                      <text
                        textAnchor="middle"
                        dy="3.5"
                        className="fill-[#c5a059] text-[10px] font-mono font-bold pointer-events-none"
                      >
                        {index + 1}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* THE 10 SEPHIROTH + DA'ATH SPHERES */}
            <g id="sephiroth-group">
              {SEPHIROTH_DATA.map((sephira) => {
                const coord = SVG_COORDS[sephira.id];
                if (!coord) return null;

                const isDaath = sephira.number === 0;
                const isSelected = selectedSephiraId === sephira.id;
                const isHovered =
                  isFinePointer &&
                  hoveredItem?.type === 'sephira' &&
                  hoveredItem.data.id === sephira.id;
                const matchesFilter = isSephiraFiltered(sephira);
                const scaleAccentColor = sephira.colors[selectedScale] || '#c5a059';

                return (
                  <g
                    key={sephira.id}
                    transform={`translate(${coord.x}, ${coord.y})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${
                      isDaath ? "Da'ath" : `Sephira ${sephira.number}`
                    }, ${sephira.name}, ${sephira.translation}`}
                    className="cursor-pointer group focus:outline-none"
                    onClick={() => handleSelectSephiraSafe(sephira)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectSephira(sephira);
                      }
                    }}
                    onMouseEnter={() => {
                      if (isFinePointer) onHoverItem({ type: 'sephira', data: sephira });
                    }}
                    onMouseLeave={() => {
                      if (isFinePointer) onHoverItem(null);
                    }}
                  >
                    <circle r={isDaath ? 38 : 44} fill="transparent" />

                    {(isHovered || isSelected) && (
                      <circle
                        r={isDaath ? 36 : 43}
                        fill={scaleAccentColor}
                        opacity={0.28}
                        filter="url(#goldGlow)"
                      />
                    )}

                    <circle
                      r={isDaath ? 29 : 36}
                      fill={isDaath ? '#0e0e12' : '#111116'}
                      stroke={
                        isSelected
                          ? '#c5a059'
                          : isHovered
                          ? '#ffffff'
                          : isDaath
                          ? '#62626c'
                          : scaleAccentColor
                      }
                      strokeWidth={isSelected ? 3.5 : isHovered ? 3 : 2.6}
                      strokeDasharray={isDaath ? '4 3' : undefined}
                      opacity={matchesFilter ? 1 : 0.25}
                      className="transition-all duration-200"
                    />

                    <circle
                      r={isDaath ? 25 : 32}
                      fill="none"
                      stroke={scaleAccentColor}
                      strokeWidth="1"
                      opacity={isDaath ? 0.32 : 0.42}
                    />

                    <text
                      y={isDaath ? -12 : -15}
                      textAnchor="middle"
                      className="font-mono text-[10px] font-bold fill-[#c5a059] tracking-widest pointer-events-none"
                    >
                      {isDaath ? 'DAATH' : `#${sephira.number}`}
                    </text>

                    <text
                      y={isDaath ? 3 : 4}
                      textAnchor="middle"
                      className="font-serif text-[17px] font-bold fill-[#ffffff] pointer-events-none drop-shadow-sm"
                    >
                      {sephira.hebrewName}
                    </text>

                    <text
                      y={isDaath ? 16 : 19}
                      textAnchor="middle"
                      className="font-sans text-[9.5px] tracking-[0.12em] uppercase font-bold fill-[#b4b4be] pointer-events-none"
                    >
                      {sephira.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* MOBILE FLOATING COMPACT ZOOM CONTROLS (Bottom-right of full-bleed canvas) */}
        <div className="md:hidden absolute bottom-2 right-2 z-20 flex items-center bg-[#0c0c12]/90 backdrop-blur-md border border-[#282834] rounded-xl p-0.5 shadow-lg">
          <button
            type="button"
            onClick={() => applyZoom(zoom - 0.35)}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out"
            className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-[#b4b4be] active:text-[#e8c982] disabled:opacity-35"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="px-1 text-[11px] font-mono tabular-nums text-[#a0a0aa] min-w-[36px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => applyZoom(zoom + 0.35)}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
            className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-[#b4b4be] active:text-[#e8c982] disabled:opacity-35"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          {zoom > 1 && (
            <button
              type="button"
              onClick={handleResetView}
              aria-label="Reset zoom"
              className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-[#c5a059]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* FLOATING HOVER TOOLTIP (Desktop mouse hover only) */}
        <AnimatePresence>
          {showFloatingTooltip && hoveredItem && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.14 }}
              className="absolute bottom-3 left-3 right-3 bg-[#121217]/95 border border-[#c5a059]/60 rounded-xl p-3 shadow-2xl text-[#e0e0e0] z-30 pointer-events-none backdrop-blur-md"
            >
              {hoveredItem.type === 'sephira' ? (
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-[#262630] pb-1.5 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[#c5a059] font-mono text-xs font-semibold shrink-0">
                        {hoveredItem.data.number === 0
                          ? "Da'ath"
                          : `Sephira ${hoveredItem.data.number}`}
                      </span>
                      <span className="text-[#52525b]" aria-hidden="true">·</span>
                      <h4 className="font-serif font-bold text-[#f0f0f0] text-sm truncate">
                        {hoveredItem.data.name} ({hoveredItem.data.hebrewName})
                      </h4>
                    </div>
                    <span className="text-xs text-[#c5a059] italic shrink-0">
                      &ldquo;{hoveredItem.data.translation}&rdquo;
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-[#a8a8b2]">
                    <div className="truncate">
                      <span className="text-[#c5a059] font-medium">Pillar:</span>{' '}
                      {hoveredItem.data.pillar}
                    </div>
                    <div className="truncate">
                      <span className="text-[#c5a059] font-medium">Divine Name:</span>{' '}
                      {hoveredItem.data.divineName}
                    </div>
                    <div className="truncate">
                      <span className="text-[#c5a059] font-medium">Archangel:</span>{' '}
                      {hoveredItem.data.archangel}
                    </div>
                    <div className="truncate">
                      <span className="text-[#c5a059] font-medium">Astrological:</span>{' '}
                      {hoveredItem.data.astrological}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-[#262630] pb-1.5 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[#c5a059] font-mono text-xs font-semibold shrink-0">
                        Path {hoveredItem.data.number} ({hoveredItem.data.hebrewLetter})
                      </span>
                      <span className="text-[#52525b]" aria-hidden="true">·</span>
                      <h4 className="font-serif font-bold text-[#f0f0f0] text-sm truncate">
                        {hoveredItem.data.tarotCardName}
                      </h4>
                    </div>
                    <span className="text-xs text-[#c5a059] shrink-0">
                      {hoveredItem.data.attribution} {hoveredItem.data.symbolIcon}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-[#a8a8b2]">
                    <div className="truncate">
                      <span className="text-[#c5a059] font-medium">Title:</span>{' '}
                      {hoveredItem.data.name}
                    </div>
                    <div className="truncate">
                      <span className="text-[#c5a059] font-medium">Letter Meaning:</span>{' '}
                      {hoveredItem.data.letterMeaning}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
