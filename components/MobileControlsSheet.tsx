'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Layers, Zap, Filter, Columns, RotateCcw } from 'lucide-react';
import { Language, UI_STRINGS } from '@/lib/i18n';

interface MobileControlsSheetProps {
  language: Language;
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
  language,
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
  const t = UI_STRINGS[language].controls;

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
          aria-label={t.sheetTitle}
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
                  {t.sheetTitle}
                </h2>
                <p className="text-xs text-[#4b576e]">{t.sheetSubtitle}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {hasNonDefault && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="min-h-[44px] px-3 rounded-xl bg-[#cfd6e2] border border-[#aeb9cc] text-xs font-medium text-[#7c5814] flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {t.reset}
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t.closeSheetAria}
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
                  <span>{t.goldenDawnScale}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {t.scales.map((scale) => {
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
                  <span>{t.diagramOverlay}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {t.modes.map((mode) => {
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
                  <span>{t.threePillarsBackdrop}</span>
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
                  <span className="text-sm font-medium text-left">{t.showPillarsLabel}</span>
                  <span className="text-xs font-mono font-semibold shrink-0 ml-2">
                    {showPillars ? t.on : t.off}
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
                  <span>{t.attribution}</span>
                </label>
                <select
                  id="mobile-attribution-filter"
                  value={activeFilter || ''}
                  onChange={(e) => onSelectFilter(e.target.value || null)}
                  className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#cfd6e2] border border-[#aeb9cc] text-base text-[#161e2e] focus:outline-none focus:border-[#8c631a]"
                >
                  {t.filterOptions.map((opt) => (
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
                {t.done}
              </button>
            </div>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
}
