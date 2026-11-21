'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Layers, Zap, Filter, Columns, RotateCcw } from 'lucide-react';

export const SCALE_OPTIONS = [
  { id: 'atziluth', label: 'Atziluth', subtitle: 'Archetypal (King)' },
  { id: 'briah', label: 'Briah', subtitle: 'Creative (Queen)' },
  { id: 'yetzirah', label: 'Yetzirah', subtitle: 'Formative (Prince)' },
  { id: 'assiah', label: 'Assiah', subtitle: 'Material (Princess)' },
] as const;

export const MODE_OPTIONS = [
  { id: 'default', label: 'Standard' },
  { id: 'lightning', label: 'Lightning' },
  { id: 'serpent', label: 'Serpent' },
] as const;

export const ATTRIBUTION_FILTER_OPTIONS = [
  { label: 'All Attributions', value: '' },
  { label: 'Fire Element', value: 'fire' },
  { label: 'Water Element', value: 'water' },
  { label: 'Air Element', value: 'air' },
  { label: 'Earth Element', value: 'earth' },
  { label: 'Solar / Sun', value: 'sun' },
  { label: 'Lunar / Moon', value: 'moon' },
  { label: 'Mercury', value: 'mercury' },
  { label: 'Venus', value: 'venus' },
  { label: 'Mars', value: 'mars' },
  { label: 'Jupiter', value: 'jupiter' },
  { label: 'Saturn', value: 'saturn' },
  { label: 'Pillar of Mercy', value: 'mercy' },
  { label: 'Pillar of Severity', value: 'severity' },
  { label: 'Pillar of Mildness', value: 'mildness' },
];

interface MobileControlsSheetProps {
  open: boolean;
  onClose: () => void;
  selectedScale: 'atziluth' | 'briah' | 'yetzirah' | 'assiah';
  onSelectScale: (scale: 'atziluth' | 'briah' | 'yetzirah' | 'assiah') => void;
  activeMode: 'default' | 'lightning' | 'serpent';
  onSelectMode: (mode: 'default' | 'lightning' | 'serpent') => void;
  activeFilter: string | null;
  onSelectFilter: (filter: string | null) => void;
  showPillars: boolean;
  onTogglePillars: () => void;
}

export default function MobileControlsSheet({
  open,
  onClose,
  selectedScale,
  onSelectScale,
  activeMode,
  onSelectMode,
  activeFilter,
  onSelectFilter,
  showPillars,
  onTogglePillars,
}: MobileControlsSheetProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const hasNonDefault =
    selectedScale !== 'briah' ||
    activeMode !== 'default' ||
    Boolean(activeFilter) ||
    !showPillars;

  const handleReset = () => {
    onSelectScale('briah');
    onSelectMode('default');
    onSelectFilter(null);
    if (!showPillars) onTogglePillars();
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Diagram Controls"
          className="fixed inset-0 z-50 flex items-end justify-center md:hidden pointer-events-none"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#161e2e]/45 backdrop-blur-xs pointer-events-auto"
          />

          {/* Bottom Sheet */}
          <motion.section
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.45 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 450) {
                onClose();
              }
            }}
            className="relative w-full max-h-[85dvh] bg-[#dce2ec] border-t border-[#8c631a]/45 rounded-t-3xl shadow-2xl flex flex-col pointer-events-auto z-10 text-[#161e2e] overflow-hidden"
          >
            {/* Drag Handle */}
            <div className="pt-3 pb-1 flex justify-center bg-[#d4dbe6] shrink-0">
              <div className="w-10 h-1.5 rounded-full bg-[#98a4b8]" aria-hidden="true" />
            </div>

            {/* Header */}
            <div className="px-4 py-3 border-b border-[#b3bdd0] bg-[#d4dbe6] flex items-center justify-between gap-3 shrink-0">
              <div>
                <h2 className="text-base font-serif font-bold text-[#161e2e]">
                  Diagram Controls
                </h2>
                <p className="text-xs text-[#4b576e]">
                  Color scales, cosmic overlays, pillars &amp; filters
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {hasNonDefault && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="min-h-[44px] px-3 rounded-xl bg-[#cfd6e2] border border-[#aeb9cc] text-xs font-medium text-[#7c5814] flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close diagram controls"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-[#cfd6e2] border border-[#aeb9cc] text-[#2c364a] hover:text-[#161e2e]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Controls */}
            <div
              onPointerDownCapture={(e) => e.stopPropagation()}
              className="p-4 pb-safe overflow-y-auto overscroll-contain space-y-5"
            >
              {/* Color Scale 2x2 Grid */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-[#7c5814] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Golden Dawn Color Scale</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SCALE_OPTIONS.map((scale) => {
                    const isActive = selectedScale === scale.id;
                    return (
                      <button
                        key={scale.id}
                        type="button"
                        onClick={() => onSelectScale(scale.id)}
                        className={`min-h-[52px] px-3.5 py-2.5 rounded-xl border text-left transition-colors ${
                          isActive
                            ? 'bg-[#9a7022]/16 border-[#8c631a] text-[#4f3608]'
                            : 'bg-[#cfd6e2] border-[#b3bdd0] text-[#2c364a]'
                        }`}
                      >
                        <div className="text-sm font-semibold">{scale.label}</div>
                        <div className="text-[11px] text-[#4b576e]">{scale.subtitle}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Overlay Mode */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-[#7c5814] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Diagram Overlay</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {MODE_OPTIONS.map((mode) => {
                    const isActive = activeMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => onSelectMode(mode.id)}
                        className={`min-h-[44px] px-2.5 rounded-xl border text-xs font-semibold transition-colors whitespace-nowrap ${
                          isActive
                            ? 'bg-[#9a7022]/16 border-[#8c631a] text-[#4f3608]'
                            : 'bg-[#cfd6e2] border-[#b3bdd0] text-[#2c364a]'
                        }`}
                      >
                        {mode.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pillars Visibility Toggle */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-[#7c5814] flex items-center gap-1.5">
                  <Columns className="w-3.5 h-3.5" />
                  <span>Three Pillars Backdrop</span>
                </div>
                <button
                  type="button"
                  onClick={onTogglePillars}
                  className={`w-full min-h-[46px] px-4 rounded-xl border flex items-center justify-between transition-colors ${
                    showPillars
                      ? 'bg-[#9a7022]/16 border-[#8c631a] text-[#4f3608]'
                      : 'bg-[#cfd6e2] border-[#b3bdd0] text-[#2c364a]'
                  }`}
                >
                  <span className="text-sm font-medium">
                    Show Severity, Mildness &amp; Mercy Pillars
                  </span>
                  <span className="text-xs font-mono font-semibold">
                    {showPillars ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>

              {/* Attribution Filter */}
              <div className="space-y-2">
                <label
                  htmlFor="mobile-attribution-filter"
                  className="text-xs font-medium text-[#7c5814] flex items-center gap-1.5"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Attribution Filter</span>
                </label>
                <select
                  id="mobile-attribution-filter"
                  value={activeFilter || ''}
                  onChange={(e) => onSelectFilter(e.target.value || null)}
                  className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#cfd6e2] border border-[#aeb9cc] text-base text-[#161e2e] focus:outline-none focus:border-[#8c631a]"
                >
                  {ATTRIBUTION_FILTER_OPTIONS.map((opt) => (
                    <option
                      key={opt.value || 'all'}
                      value={opt.value}
                      className="bg-[#dce2ec] text-[#161e2e]"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full min-h-[48px] rounded-xl bg-gradient-to-r from-[#8f681d] to-[#745112] text-[#f5f1e6] font-bold text-xs uppercase tracking-wider shadow-lg"
              >
                Done
              </button>
            </div>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
}
