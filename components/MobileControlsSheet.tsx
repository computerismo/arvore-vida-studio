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
            className="fixed inset-0 bg-black/75 backdrop-blur-xs pointer-events-auto"
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
            className="relative w-full max-h-[85dvh] bg-[#09090d] border-t border-[#c5a059]/40 rounded-t-3xl shadow-2xl flex flex-col pointer-events-auto z-10 text-[#e0e0e0] overflow-hidden"
          >
            {/* Drag Handle */}
            <div className="pt-3 pb-1 flex justify-center bg-[#0c0c11] shrink-0">
              <div className="w-10 h-1.5 rounded-full bg-[#32323c]" aria-hidden="true" />
            </div>

            {/* Header */}
            <div className="px-4 py-3 border-b border-[#202028] bg-[#0c0c11] flex items-center justify-between gap-3 shrink-0">
              <div>
                <h2 className="text-base font-serif font-bold text-[#f2f2f5]">
                  Diagram Controls
                </h2>
                <p className="text-xs text-[#8e8e98]">
                  Color scales, cosmic overlays, pillars &amp; filters
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {hasNonDefault && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="min-h-[44px] px-3 rounded-xl bg-[#14141b] border border-[#272732] text-xs font-medium text-[#c5a059] flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close diagram controls"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-[#14141b] border border-[#272732] text-[#a0a0a8] hover:text-white"
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
                <div className="text-xs font-medium text-[#c5a059] flex items-center gap-1.5">
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
                            ? 'bg-[#c5a059]/18 border-[#c5a059] text-[#f0d89c]'
                            : 'bg-[#121218] border-[#24242e] text-[#b4b4be]'
                        }`}
                      >
                        <div className="text-sm font-semibold">{scale.label}</div>
                        <div className="text-[11px] text-[#8e8e98]">{scale.subtitle}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Overlay Mode */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-[#c5a059] flex items-center gap-1.5">
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
                            ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#f0d89c]'
                            : 'bg-[#121218] border-[#24242e] text-[#9a9aa6]'
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
                <div className="text-xs font-medium text-[#c5a059] flex items-center gap-1.5">
                  <Columns className="w-3.5 h-3.5" />
                  <span>Three Pillars Backdrop</span>
                </div>
                <button
                  type="button"
                  onClick={onTogglePillars}
                  className={`w-full min-h-[46px] px-4 rounded-xl border flex items-center justify-between transition-colors ${
                    showPillars
                      ? 'bg-[#c5a059]/15 border-[#c5a059]/70 text-[#f0d89c]'
                      : 'bg-[#121218] border-[#24242e] text-[#9a9aa6]'
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
                  className="text-xs font-medium text-[#c5a059] flex items-center gap-1.5"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Attribution Filter</span>
                </label>
                <select
                  id="mobile-attribution-filter"
                  value={activeFilter || ''}
                  onChange={(e) => onSelectFilter(e.target.value || null)}
                  className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#121218] border border-[#262630] text-base text-[#f0f0f5] focus:outline-none focus:border-[#c5a059]"
                >
                  {ATTRIBUTION_FILTER_OPTIONS.map((opt) => (
                    <option
                      key={opt.value || 'all'}
                      value={opt.value}
                      className="bg-[#121218] text-[#f0f0f5]"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full min-h-[48px] rounded-xl bg-gradient-to-r from-[#c5a059] to-[#a6833f] text-black font-bold text-xs uppercase tracking-wider shadow-lg"
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
