'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
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
import { Language, UI_STRINGS } from '@/lib/i18n';
import {
  getLocalizedSephirothData,
  getLocalizedPathsData,
  getLocalizedPillarName,
} from '@/lib/qabalah-pt';

export type HoveredItem =
  | { type: 'sephira'; data: Sephira }
  | { type: 'path'; data: Path };

interface TreeOfLifeCanvasProps {
  language: Language;
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

// Map Sephira IDs to absolute SVG coordinates inside viewBox="35 -28 530 912"
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
const MAX_ZOOM = 3.5;

function toLinearChannel(channel255: number): number {
  const c = channel255 / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function getRelativeLuminance(hex: string): number {
  const cleaned = hex.replace('#', '').trim();
  if (cleaned.length !== 6) return 0;
  const r = toLinearChannel(parseInt(cleaned.slice(0, 2), 16));
  const g = toLinearChannel(parseInt(cleaned.slice(2, 4), 16));
  const b = toLinearChannel(parseInt(cleaned.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isLightHex(hex: string): boolean {
  return getRelativeLuminance(hex) > 0.22;
}

const FLUTE_OFFSETS = [-10.5, -3.5, 3.5, 10.5];

interface ClassicalPillarProps {
  cx: number;
  variant: 'boaz' | 'jachin';
  title: string;
  subtitle: string;
}

function ClassicalPillar({ cx, variant, title, subtitle }: ClassicalPillarProps) {
  const isBoaz = variant === 'boaz';
  const orbFill = isBoaz ? 'url(#orb-dark)' : 'url(#orb-light)';
  const orbStroke = isBoaz ? '#7c817a' : '#a3a89d';
  const signStroke = isBoaz ? '#5c6158' : '#94865b';
  const primaryFill = isBoaz ? '#b5b6b1' : '#e8e6de';
  const secondaryFill = isBoaz ? '#d2d2c9' : '#f9f8f2';
  const shadowFill = isBoaz ? '#90958f' : '#c9cbc5';
  const strokeColor = isBoaz ? '#7c817a' : '#a3a89d';

  return (
    <g className="pointer-events-none">
      {/* Crowned Orb */}
      <circle
        cx={cx}
        cy={71}
        r={26}
        fill={orbFill}
        stroke={orbStroke}
        strokeWidth="0.65"
      />
      <line
        x1={cx - 5.6}
        y1={71}
        x2={cx + 5.6}
        y2={71}
        stroke={signStroke}
        strokeWidth="1.25"
      />
      {!isBoaz && (
        <line
          x1={cx}
          y1={65.4}
          x2={cx}
          y2={76.6}
          stroke={signStroke}
          strokeWidth="1.25"
        />
      )}

      {/* Stepped Capital */}
      <rect
        x={cx - 39}
        y={85}
        width={78}
        height={12.5}
        fill={primaryFill}
        stroke={strokeColor}
        strokeWidth="0.65"
      />
      <rect
        x={cx - 32.5}
        y={97.5}
        width={65}
        height={9}
        fill={secondaryFill}
        stroke={strokeColor}
        strokeWidth="0.6"
      />
      <rect
        x={cx - 27}
        y={106.5}
        width={54}
        height={11.5}
        fill={primaryFill}
        stroke={strokeColor}
        strokeWidth="0.6"
      />
      <line
        x1={cx - 36}
        y1={88}
        x2={cx + 36}
        y2={88}
        stroke="#aa8c50"
        strokeWidth="0.75"
      />

      {/* Fluted Shaft */}
      <rect
        x={cx - 22}
        y={118}
        width={44}
        height={702}
        fill={primaryFill}
        stroke={strokeColor}
        strokeWidth="0.65"
      />
      <rect x={cx - 21.3} y={118.6} width={5.6} height={700.8} fill={shadowFill} />
      <rect x={cx + 14.9} y={118.6} width={6.4} height={700.8} fill={secondaryFill} />

      {FLUTE_OFFSETS.map((offset) => (
        <g key={offset}>
          <line
            x1={cx + offset}
            y1={124}
            x2={cx + offset}
            y2={813}
            stroke={shadowFill}
            strokeWidth="0.65"
          />
          <line
            x1={cx + offset + 1.3}
            y1={124}
            x2={cx + offset + 1.3}
            y2={813}
            stroke={secondaryFill}
            strokeWidth="0.65"
          />
        </g>
      ))}

      {/* Stepped Base Plinth */}
      <rect
        x={cx - 27}
        y={820}
        width={54}
        height={8.5}
        fill={secondaryFill}
        stroke={strokeColor}
        strokeWidth="0.6"
      />
      <rect
        x={cx - 32.5}
        y={828.5}
        width={65}
        height={10}
        fill={primaryFill}
        stroke={strokeColor}
        strokeWidth="0.6"
      />
      <rect
        x={cx - 39}
        y={838.5}
        width={78}
        height={11.5}
        fill={secondaryFill}
        stroke={strokeColor}
        strokeWidth="0.6"
      />
      <line
        x1={cx - 29.5}
        y1={831.5}
        x2={cx + 29.5}
        y2={831.5}
        stroke="#aa8c50"
        strokeWidth="0.7"
      />

      {/* Pillar Inscription */}
      <text
        x={cx}
        y={865}
        textAnchor="middle"
        className="fill-[#24201B] text-[10.5px] font-serif font-bold tracking-[0.14em]"
      >
        {title}
      </text>
      <text
        x={cx}
        y={877}
        textAnchor="middle"
        className="fill-[#4E493F] text-[8.5px] font-serif italic"
      >
        {subtitle}
      </text>
    </g>
  );
}

export default function TreeOfLifeCanvas({
  language,
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
  const t = UI_STRINGS[language].canvas;
  const scaleLabel =
    UI_STRINGS[language].controls.scales.find((s) => s.id === selectedScale)?.label ??
    selectedScale;
  const localizedSephiroth = useMemo(
    () => getLocalizedSephirothData(language),
    [language]
  );
  const localizedPaths = useMemo(() => getLocalizedPathsData(language), [language]);
  const baseSephirothById = useMemo(
    () => new Map(SEPHIROTH_DATA.map((s) => [s.id, s])),
    []
  );
  const basePathsById = useMemo(() => new Map(PATHS_DATA.map((p) => [p.id, p])), []);

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
  const [isPinching, setIsPinching] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  // Live mirror of zoom & pan so native wheel/touch listeners never read stale closures
  const transformRef = useRef({ zoom: 1, pan: { x: 0, y: 0 } });

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

  const pinchStartRef = useRef<{
    distance: number;
    zoom: number;
    pan: { x: number; y: number };
    focalX: number;
    focalY: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setIsFinePointer(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const clampPan = useCallback((nextX: number, nextY: number, currentZoom: number) => {
    if (currentZoom <= 1 || !viewportRef.current) return { x: 0, y: 0 };
    const rect = viewportRef.current.getBoundingClientRect();
    const maxX = ((currentZoom - 1) * rect.width) / 2;
    const maxY = ((currentZoom - 1) * rect.height) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, nextX)),
      y: Math.max(-maxY, Math.min(maxY, nextY)),
    };
  }, []);

  const commitTransform = useCallback(
    (rawZoom: number, rawPanX: number, rawPanY: number) => {
      const clampedZoom = Math.max(
        MIN_ZOOM,
        Math.min(MAX_ZOOM, Number(rawZoom.toFixed(3)))
      );
      const clampedPan = clampPan(rawPanX, rawPanY, clampedZoom);
      transformRef.current = { zoom: clampedZoom, pan: clampedPan };
      setZoom(clampedZoom);
      setPan(clampedPan);
    },
    [clampPan]
  );

  // Zoom around a viewport-center-relative focal point (fx, fy)
  const zoomAtFocalPoint = useCallback(
    (nextZoomRaw: number, clientX?: number, clientY?: number) => {
      const { zoom: prevZoom, pan: prevPan } = transformRef.current;
      const nextZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, nextZoomRaw));

      if (nextZoom <= 1) {
        commitTransform(1, 0, 0);
        return;
      }

      if (
        clientX !== undefined &&
        clientY !== undefined &&
        viewportRef.current
      ) {
        const rect = viewportRef.current.getBoundingClientRect();
        const fx = clientX - (rect.left + rect.width / 2);
        const fy = clientY - (rect.top + rect.height / 2);
        const lx = (fx - prevPan.x) / prevZoom;
        const ly = (fy - prevPan.y) / prevZoom;
        commitTransform(nextZoom, fx - lx * nextZoom, fy - ly * nextZoom);
      } else {
        const ratio = nextZoom / prevZoom;
        commitTransform(nextZoom, prevPan.x * ratio, prevPan.y * ratio);
      }
    },
    [commitTransform]
  );

  const handleResetView = useCallback(() => {
    commitTransform(1, 0, 0);
  }, [commitTransform]);

  // Native non-passive wheel + 2-finger pinch listeners for smooth desktop & touch zooming
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Allow smooth mouse-wheel zoom and trackpad pinch-to-zoom directly over the Tree
      e.preventDefault();
      const { zoom: currentZoom } = transformRef.current;
      // Trackpad pinch sets ctrlKey and uses smaller deltas; mouse wheel uses ~100px steps
      const intensity = e.ctrlKey ? 0.012 : 0.0022;
      const factor = Math.exp(-e.deltaY * intensity);
      zoomAtFocalPoint(currentZoom * factor, e.clientX, e.clientY);
    };

    const getTouchMetrics = (touches: TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      const rect = el.getBoundingClientRect();
      const midX = (touches[0].clientX + touches[1].clientX) / 2;
      const midY = (touches[0].clientY + touches[1].clientY) / 2;
      return {
        distance: Math.hypot(dx, dy),
        focalX: midX - (rect.left + rect.width / 2),
        focalY: midY - (rect.top + rect.height / 2),
      };
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        dragStateRef.current.active = false;
        setIsDragging(false);
        setIsPinching(true);
        const { distance, focalX, focalY } = getTouchMetrics(e.touches);
        pinchStartRef.current = {
          distance: Math.max(1, distance),
          zoom: transformRef.current.zoom,
          pan: { ...transformRef.current.pan },
          focalX,
          focalY,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchStartRef.current) {
        e.preventDefault();
        const start = pinchStartRef.current;
        const { distance, focalX, focalY } = getTouchMetrics(e.touches);
        const nextZoom = Math.max(
          MIN_ZOOM,
          Math.min(MAX_ZOOM, start.zoom * (distance / start.distance))
        );
        if (nextZoom <= 1) {
          commitTransform(1, 0, 0);
          return;
        }
        const lx = (start.focalX - start.pan.x) / start.zoom;
        const ly = (start.focalY - start.pan.y) / start.zoom;
        commitTransform(nextZoom, focalX - lx * nextZoom, focalY - ly * nextZoom);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        pinchStartRef.current = null;
        setIsPinching(false);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [commitTransform, zoomAtFocalPoint]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (transformRef.current.zoom <= 1 || pinchStartRef.current) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragStateRef.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      originX: transformRef.current.pan.x,
      originY: transformRef.current.pan.y,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.active || pinchStartRef.current) return;
    const dx = e.clientX - dragStateRef.current.startX;
    const dy = e.clientY - dragStateRef.current.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      dragStateRef.current.moved = true;
    }
    commitTransform(
      transformRef.current.zoom,
      dragStateRef.current.originX + dx,
      dragStateRef.current.originY + dy
    );
  };

  const handlePointerUp = () => {
    dragStateRef.current.active = false;
    setIsDragging(false);
    setTimeout(() => {
      dragStateRef.current.moved = false;
    }, 0);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Do not hijack double-clicks on spheres, path badges, or floating zoom buttons
    if (target.closest('button') || target.closest('[role="button"]')) return;
    if (transformRef.current.zoom > 1.05) {
      handleResetView();
    } else {
      zoomAtFocalPoint(2, e.clientX, e.clientY);
    }
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
    const base = baseSephirothById.get(sephira.id) ?? sephira;
    return (
      sephira.pillar.toLowerCase().includes(filterLower) ||
      sephira.element.toLowerCase().includes(filterLower) ||
      sephira.astrological.toLowerCase().includes(filterLower) ||
      sephira.name.toLowerCase().includes(filterLower) ||
      sephira.archangel.toLowerCase().includes(filterLower) ||
      base.pillar.toLowerCase().includes(filterLower) ||
      base.element.toLowerCase().includes(filterLower) ||
      base.astrological.toLowerCase().includes(filterLower) ||
      base.name.toLowerCase().includes(filterLower) ||
      base.archangel.toLowerCase().includes(filterLower)
    );
  };

  const isPathFiltered = (path: Path) => {
    if (!activeFilter) return true;
    const filterLower = activeFilter.toLowerCase();
    const base = basePathsById.get(path.id) ?? path;
    return (
      path.attribution.toLowerCase().includes(filterLower) ||
      path.attributionType.toLowerCase().includes(filterLower) ||
      path.tarotCardName.toLowerCase().includes(filterLower) ||
      path.hebrewLetterName.toLowerCase().includes(filterLower) ||
      path.name.toLowerCase().includes(filterLower) ||
      base.attribution.toLowerCase().includes(filterLower) ||
      base.attributionType.toLowerCase().includes(filterLower) ||
      base.tarotCardName.toLowerCase().includes(filterLower) ||
      base.hebrewLetterName.toLowerCase().includes(filterLower) ||
      base.name.toLowerCase().includes(filterLower)
    );
  };

  const getLightningFlashD = () => {
    return LIGHTNING_FLASH_SEQUENCE.map((id, index) => {
      const coord = SVG_COORDS[id];
      return `${index === 0 ? 'M' : 'L'} ${coord.x} ${coord.y}`;
    }).join(' ');
  };

  const showFloatingTooltip = isFinePointer && hoveredItem && !isDragging;

  return (
    <div className="relative w-full h-full flex flex-col md:bg-[#F8F4EC] md:rounded-2xl md:border md:border-[#D1C6B3] md:p-3.5 lg:p-4 md:shadow-md select-none overflow-hidden">
      {/* Tablet & Desktop Canvas Toolbar (Hidden on Mobile so the Tree gets maximum screen height) */}
      <div className="hidden md:flex items-center justify-between gap-2 mb-2 px-1 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-xs text-[#7C5814] font-semibold tracking-wider truncate">
            {language === 'pt'
              ? `${t.treeOfLife} · ${t.scaleWord} ${scaleLabel}`
              : `${t.treeOfLife} · ${scaleLabel} ${t.scaleWord}`}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center bg-[#F0E9DE] border border-[#D1C6B3] rounded-xl p-0.5">
            <button
              type="button"
              onClick={() => zoomAtFocalPoint(zoom - 0.5)}
              disabled={zoom <= MIN_ZOOM}
              aria-label={t.zoomOut}
              title={t.zoomOut}
              className="min-h-[32px] min-w-[32px] flex items-center justify-center rounded-lg text-[#2E3239] hover:text-[#5E400B] hover:bg-[#FCF9F3] disabled:opacity-35 disabled:hover:bg-transparent transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetView}
              disabled={zoom <= MIN_ZOOM}
              title={zoom > 1 ? t.clickToResetZoom : t.zoomPercentLabel}
              className="px-1.5 text-[11px] font-mono tabular-nums text-[#2E3239] hover:text-[#5E400B] disabled:hover:text-[#2E3239] min-w-[44px] text-center"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={() => zoomAtFocalPoint(zoom + 0.5)}
              disabled={zoom >= MAX_ZOOM}
              aria-label={t.zoomIn}
              title={t.zoomIn}
              className="min-h-[32px] min-w-[32px] flex items-center justify-center rounded-lg text-[#2E3239] hover:text-[#5E400B] hover:bg-[#FCF9F3] disabled:opacity-35 disabled:hover:bg-transparent transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoom > 1 && (
              <button
                type="button"
                onClick={handleResetView}
                aria-label={t.resetZoom}
                title={t.resetZoom}
                className="min-h-[32px] min-w-[32px] flex items-center justify-center rounded-lg text-[#7C5814] hover:bg-[#EEE0C7] transition-colors"
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
                ? 'bg-[#EEE0C7] border-[#8C631A]/75 text-[#5E400B]'
                : 'bg-[#F0E9DE] border-[#D1C6B3] text-[#4F4C45] hover:text-[#1F242C]'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>{t.pillars}</span>
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
        onDoubleClick={handleDoubleClick}
        className={`relative flex-1 min-h-0 w-full overflow-hidden tree-stage-bg rounded-xl border border-[#D1C6B3]/80 md:border-[#D1C6B3] flex items-center justify-center ${
          zoom > 1
            ? isDragging
              ? 'cursor-grabbing touch-none'
              : 'cursor-grab touch-none'
            : 'touch-none md:touch-pan-y'
        }`}
      >
        <div
          className="w-full h-full flex items-center justify-center md:p-2 will-change-transform"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
            transformOrigin: 'center center',
            transition:
              isDragging || isPinching
                ? 'none'
                : 'transform 160ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <svg
            viewBox="35 -28 530 920"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full max-w-full max-h-full drop-shadow-lg"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={t.svgAriaLabel}
          >
            <defs>
              <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8c631a" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#d4a74a" stopOpacity="1" />
                <stop offset="100%" stopColor="#6e4b0e" stopOpacity="0.95" />
              </linearGradient>

              <radialGradient id="orb-dark" cx="35%" cy="25%">
                <stop offset="0" stopColor="#dadad1" />
                <stop offset=".68" stopColor="#b1b4ac" />
                <stop offset="1" stopColor="#8e958c" />
              </radialGradient>

              <radialGradient id="orb-light" cx="35%" cy="25%">
                <stop offset="0" stopColor="#fffefa" />
                <stop offset=".7" stopColor="#efeee5" />
                <stop offset="1" stopColor="#c8cec3" />
              </radialGradient>
            </defs>

            {/* CLASSICAL ARCHITECTURAL PILLARS (BOAZ & JACHIN) + MIDDLE AXIS */}
            {showPillars && (
              <g className="transition-opacity duration-300">
                <ClassicalPillar
                  cx={130}
                  variant="boaz"
                  title="BOAZ"
                  subtitle={t.pillarSeveritySubtitle}
                />

                <ClassicalPillar
                  cx={470}
                  variant="jachin"
                  title="JACHIN"
                  subtitle={t.pillarMercySubtitle}
                />

                {/* Middle Pillar Axis */}
                <line
                  x1="300"
                  y1="20"
                  x2="300"
                  y2="854"
                  stroke="#7e7255"
                  strokeWidth="0.9"
                  strokeDasharray="1.8 5"
                  opacity="0.65"
                  className="pointer-events-none"
                />
                <text
                  x="300"
                  y="8"
                  textAnchor="middle"
                  className="fill-[#6D4B0F] text-[10px] font-serif tracking-[0.14em] uppercase font-bold pointer-events-none"
                >
                  {t.pillarMildness}
                </text>
              </g>
            )}

            {/* THE 22 CONNECTING PATHS */}
            <g id="paths-group">
              {localizedPaths.map((pathItem) => {
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

                // Golden Dawn Tree convention: Queen Scale Spheres paired with King Scale Paths by default
                const pathColor =
                  selectedScale === 'briah'
                    ? pathItem.colors.atziluth
                    : pathItem.colors[selectedScale];
                const isPalePath = isLightHex(pathColor);
                const pathOpacity = matchesFilter
                  ? activeMode === 'serpent' && !isSerpent
                    ? 0.25
                    : 1
                  : 0.18;

                const badgeRatio = PATH_BADGE_RATIOS[pathItem.id] ?? 0.5;
                const badgeX = start.x + (end.x - start.x) * badgeRatio;
                const badgeY = start.y + (end.y - start.y) * badgeRatio;

                return (
                  <g
                    key={pathItem.id}
                    role="button"
                    tabIndex={0}
                    aria-label={
                      language === 'pt'
                        ? `Caminho ${pathItem.number}, ${pathItem.hebrewLetterName}, ${pathItem.tarotCardName}`
                        : `Path ${pathItem.number}, ${pathItem.hebrewLetterName}, ${pathItem.tarotCardName}`
                    }
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
                        stroke={isSerpent ? '#059669' : '#9a7022'}
                        strokeWidth="10"
                        opacity={0.45}
                        filter="url(#goldGlow)"
                      />
                    )}

                    {/* Outer pale gap halo so crossing paths separate cleanly */}
                    <line
                      x1={start.x}
                      y1={start.y}
                      x2={end.x}
                      y2={end.y}
                      stroke="#F3ECE0"
                      strokeWidth={isSelected || isHovered ? 8.8 : 7.8}
                      opacity={matchesFilter ? 0.92 : 0.18}
                    />

                    {/* Crisp dark casing border */}
                    <line
                      x1={start.x}
                      y1={start.y}
                      x2={end.x}
                      y2={end.y}
                      stroke={
                        isSelected
                          ? '#7C5814'
                          : isHovered
                          ? '#1F242C'
                          : '#6B6352'
                      }
                      strokeWidth={isSelected || isHovered ? 6.8 : 6.0}
                      opacity={pathOpacity}
                    />

                    {/* Golden Dawn colored path band */}
                    <line
                      x1={start.x}
                      y1={start.y}
                      x2={end.x}
                      y2={end.y}
                      stroke={pathColor}
                      strokeWidth={isSelected || isHovered ? 4.8 : 4.2}
                      opacity={pathOpacity}
                    />

                    <g transform={`translate(${badgeX}, ${badgeY})`} opacity={matchesFilter ? 1 : 0.35}>
                      <circle r="22" fill="transparent" />
                      {!isSelected && isPalePath && (
                        <circle
                          r={isHovered ? 15.2 : 13.7}
                          fill="none"
                          stroke="#6B6352"
                          strokeWidth="0.9"
                        />
                      )}
                      <circle
                        r={isHovered || isSelected ? 14 : 12.5}
                        fill={isSelected ? '#24201B' : isHovered ? '#FFFEFA' : '#FCF9F3'}
                        stroke={isSelected ? '#C5A059' : pathColor}
                        strokeWidth={isSelected ? 2.4 : 2.2}
                        className="transition-all duration-150"
                      />
                      <text
                        textAnchor="middle"
                        dy="4.5"
                        className={`text-[13px] font-serif font-bold pointer-events-none transition-colors ${
                          isSelected
                            ? 'fill-[#E8C982]'
                            : 'fill-[#1F242C]'
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
                      <circle r="10" fill="#24201B" stroke="#C5A059" strokeWidth="1.5" />
                      <text
                        textAnchor="middle"
                        dy="3.5"
                        className="fill-[#E8C982] text-[10px] font-mono font-bold pointer-events-none"
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
              {localizedSephiroth.map((sephira) => {
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
                const showQuartered =
                  Boolean(sephira.quarteredColors) &&
                  (selectedScale === 'briah' || selectedScale === 'yetzirah');
                const lightSphere = showQuartered || isDaath || isLightHex(scaleAccentColor);

                // Diagonal wedge coordinate at radius 36 (36 / sqrt(2) ≈ 25.456)
                const q = 25.456;

                return (
                  <g
                    key={sephira.id}
                    transform={`translate(${coord.x}, ${coord.y})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${
                      isDaath
                        ? "Da'ath"
                        : language === 'pt'
                        ? `Sephirah ${sephira.number}`
                        : `Sephira ${sephira.number}`
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
                        fill={showQuartered ? '#c1ae3b' : scaleAccentColor}
                        opacity={0.34}
                        filter="url(#goldGlow)"
                      />
                    )}

                    {/* Outer fine bronze halo ring matching the Golden Dawn plate */}
                    {!isDaath && (
                      <circle
                        r="39"
                        fill="none"
                        stroke={isSelected ? '#8c631a' : '#8a7242'}
                        strokeWidth={isSelected ? '1.3' : '0.75'}
                        opacity={matchesFilter ? (isSelected ? 0.9 : 0.55) : 0.2}
                      />
                    )}

                    {showQuartered && sephira.quarteredColors ? (
                      <g opacity={matchesFilter ? 1 : 0.35}>
                        {/* Top: Citrine */}
                        <path
                          d={`M 0 0 L ${-q} ${-q} A 36 36 0 0 1 ${q} ${-q} Z`}
                          fill={sephira.quarteredColors[0]}
                        />
                        {/* Right: Olive */}
                        <path
                          d={`M 0 0 L ${q} ${-q} A 36 36 0 0 1 ${q} ${q} Z`}
                          fill={sephira.quarteredColors[1]}
                        />
                        {/* Bottom: Black */}
                        <path
                          d={`M 0 0 L ${q} ${q} A 36 36 0 0 1 ${-q} ${q} Z`}
                          fill={sephira.quarteredColors[2]}
                        />
                        {/* Left: Russet */}
                        <path
                          d={`M 0 0 L ${-q} ${q} A 36 36 0 0 1 ${-q} ${-q} Z`}
                          fill={sephira.quarteredColors[3]}
                        />
                        {/* Outer boundary ring */}
                        <circle
                          r="36"
                          fill="none"
                          stroke={isSelected ? '#B98C32' : isHovered ? '#1F242C' : '#575349'}
                          strokeWidth={isSelected ? 3 : isHovered ? 2.4 : 1.4}
                        />
                        {/* Pale inner medallion so Hebrew & English names stay crisp */}
                        <circle
                          r="28.5"
                          fill="#FCF9F3"
                          stroke={selectedScale === 'yetzirah' ? '#C9A23F' : '#6B6658'}
                          strokeWidth={selectedScale === 'yetzirah' ? '1.3' : '0.9'}
                        />
                      </g>
                    ) : (
                      <>
                        <circle
                          r={isDaath ? 29 : 36}
                          fill={isDaath ? '#F4EFE4' : scaleAccentColor}
                          fillOpacity={isDaath ? 0.92 : 1}
                          stroke={
                            isSelected
                              ? '#B98C32'
                              : isHovered
                              ? '#1F242C'
                              : isDaath
                              ? '#7D735E'
                              : '#6B6352'
                          }
                          strokeWidth={isSelected ? 3.2 : isHovered ? 2.6 : isDaath ? 1.5 : 1.5}
                          strokeDasharray={isDaath ? '4 3' : undefined}
                          opacity={matchesFilter ? 1 : 0.32}
                          className="transition-all duration-200"
                        />

                        {!isDaath && (
                          <circle
                            r="33"
                            fill="none"
                            stroke={lightSphere ? '#6B6658' : '#FDFBF2'}
                            strokeWidth="0.65"
                            opacity={matchesFilter ? (lightSphere ? 0.3 : 0.42) : 0.12}
                          />
                        )}
                      </>
                    )}

                    <text
                      y={isDaath ? -12 : -15}
                      textAnchor="middle"
                      className={`font-mono text-[10px] font-bold tracking-widest pointer-events-none ${
                        isDaath
                          ? 'fill-[#7C5814]'
                          : lightSphere
                          ? 'fill-[#5E400B]'
                          : 'fill-[#F3D488]'
                      }`}
                    >
                      {isDaath ? 'DAATH' : `#${sephira.number}`}
                    </text>

                    <text
                      y={isDaath ? 3 : 4}
                      textAnchor="middle"
                      className={`font-serif text-[17px] font-bold pointer-events-none ${
                        isDaath
                          ? 'fill-[#24201B]'
                          : lightSphere
                          ? 'fill-[#1F242C]'
                          : 'fill-[#FFFEFA]'
                      }`}
                    >
                      {sephira.hebrewName}
                    </text>

                    <text
                      y={isDaath ? 16 : 18.5}
                      textAnchor="middle"
                      className={`font-sans ${
                        showQuartered ? 'text-[8.5px]' : 'text-[9.5px]'
                      } tracking-[0.11em] uppercase font-bold pointer-events-none ${
                        isDaath
                          ? 'fill-[#625D53]'
                          : lightSphere
                          ? 'fill-[#2E3239]'
                          : 'fill-[#F5F0E4]'
                      }`}
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
        <div className="md:hidden absolute bottom-2 right-2 z-20 flex items-center bg-[#F8F4EC]/92 backdrop-blur-md border border-[#D1C6B3] rounded-xl p-0.5 shadow-md">
          <button
            type="button"
            onClick={() => zoomAtFocalPoint(zoom - 0.5)}
            disabled={zoom <= MIN_ZOOM}
            aria-label={t.zoomOut}
            className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-[#2E3239] active:text-[#5E400B] disabled:opacity-35"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="px-1 text-[11px] font-mono tabular-nums text-[#2E3239] min-w-[40px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => zoomAtFocalPoint(zoom + 0.5)}
            disabled={zoom >= MAX_ZOOM}
            aria-label={t.zoomIn}
            className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-[#2E3239] active:text-[#5E400B] disabled:opacity-35"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          {zoom > 1 && (
            <button
              type="button"
              onClick={handleResetView}
              aria-label={t.resetZoom}
              className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-[#7C5814]"
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
              className="absolute bottom-3 inset-x-3 md:max-w-2xl md:mx-auto bg-[#F8F4EC]/96 border border-[#8C631A]/60 rounded-xl p-3 shadow-xl text-[#1F242C] z-30 pointer-events-none backdrop-blur-md"
            >
              {hoveredItem.type === 'sephira' ? (
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-[#D1C6B3] pb-1.5 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[#7C5814] font-mono text-xs font-semibold shrink-0">
                        {t.tooltipSphere(hoveredItem.data.number)}
                      </span>
                      <span className="text-[#A89C86]" aria-hidden="true">·</span>
                      <h4 className="font-serif font-bold text-[#1F242C] text-sm truncate">
                        {hoveredItem.data.name} ({hoveredItem.data.hebrewName})
                      </h4>
                    </div>
                    <span className="text-xs text-[#7C5814] italic shrink-0">
                      &ldquo;{hoveredItem.data.translation}&rdquo;
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-[#2E3239]">
                    <div className="truncate">
                      <span className="text-[#7C5814] font-semibold">{t.tooltipPillar}</span>{' '}
                      {getLocalizedPillarName(hoveredItem.data.pillar, language)}
                    </div>
                    <div className="truncate">
                      <span className="text-[#7C5814] font-semibold">{t.tooltipDivineName}</span>{' '}
                      {hoveredItem.data.divineName}
                    </div>
                    <div className="truncate">
                      <span className="text-[#7C5814] font-semibold">{t.tooltipArchangel}</span>{' '}
                      {hoveredItem.data.archangel}
                    </div>
                    <div className="truncate">
                      <span className="text-[#7C5814] font-semibold">{t.tooltipAstrological}</span>{' '}
                      {hoveredItem.data.astrological}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-[#D1C6B3] pb-1.5 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[#7C5814] font-mono text-xs font-semibold shrink-0">
                        {t.tooltipPath(hoveredItem.data.number, hoveredItem.data.hebrewLetter)}
                      </span>
                      <span className="text-[#A89C86]" aria-hidden="true">·</span>
                      <h4 className="font-serif font-bold text-[#1F242C] text-sm truncate">
                        {hoveredItem.data.tarotCardName}
                      </h4>
                    </div>
                    <span className="text-xs text-[#7C5814] shrink-0">
                      {hoveredItem.data.attribution} {hoveredItem.data.symbolIcon}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-[#2E3239]">
                    <div className="truncate">
                      <span className="text-[#7C5814] font-semibold">{t.tooltipTitle}</span>{' '}
                      {hoveredItem.data.name}
                    </div>
                    <div className="truncate">
                      <span className="text-[#7C5814] font-semibold">{t.tooltipLetterMeaning}</span>{' '}
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
