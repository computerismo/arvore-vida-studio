'use client';

import React, { useState } from 'react';
import { Layers, Zap, Filter, SlidersHorizontal, ChevronDown, RotateCcw } from 'lucide-react';
import { Language, UI_STRINGS } from '@/lib/i18n';

interface FilterBarProps {
  language: Language;
  selectedScale: 'atziluth' | 'briah' | 'yetzirah' | 'assiah';
  onSelectScale: (scale: 'atziluth' | 'briah' | 'yetzirah' | 'assiah') => void;
  activeMode: 'default' | 'lightning' | 'serpent';
  onSelectMode: (mode: 'default' | 'lightning' | 'serpent') => void;
  activeFilter: string | null;
  onSelectFilter: (filter: string | null) => void;
}

export default function FilterBar({
  language,
  selectedScale,
  onSelectScale,
  activeMode,
  onSelectMode,
  activeFilter,
  onSelectFilter,
}: FilterBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = UI_STRINGS[language].controls;

  const activeFilterLabel =
    t.filterOptions.find((opt) => opt.value === (activeFilter || ''))?.label ||
    t.filterOptions[0].label;
  const activeModeLabel =
    t.modes.find((mode) => mode.id === activeMode)?.label || t.modes[0].label;
  const hasActiveOverrides = activeMode !== 'default' || Boolean(activeFilter);

  const handleReset = () => {
    onSelectScale('briah');
    onSelectMode('default');
    onSelectFilter(null);
  };

  return (
    <div className="bg-[#F8F4EC]/95 backdrop-blur-md border border-[#D1C6B3] rounded-2xl shadow-sm overflow-hidden shrink-0">
      {/* Mobile Compact Summary Toggle Bar (< md) */}
      <div className="flex md:hidden items-center justify-between gap-2 px-3 py-1.5">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          className="flex-1 min-h-[40px] flex items-center justify-between gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C631A] rounded-xl px-1"
        >
          <div className="flex items-center gap-2 min-w-0">
            <SlidersHorizontal className="w-4 h-4 text-[#7C5814] shrink-0" />
            <div className="text-xs text-[#625D53] truncate">
              <span className="capitalize text-[#5E400B] font-semibold">{selectedScale}</span>
              <span aria-hidden="true"> · </span>
              <span>{activeModeLabel}</span>
              {activeFilter && (
                <>
                  <span aria-hidden="true"> · </span>
                  <span className="text-[#1F242C]">{activeFilterLabel}</span>
                </>
              )}
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[#7C5814] shrink-0 transition-transform duration-200 ${
              mobileOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {hasActiveOverrides && (
          <button
            type="button"
            onClick={handleReset}
            aria-label={t.resetControls}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-[#F0E9DE] border border-[#D1C6B3] text-[#4F4C45] active:text-[#7C5814]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Controls Body: Collapsible on Mobile, Compact Single Row on Tablet (md+) & Desktop */}
      <div
        className={`${
          mobileOpen ? 'block border-t border-[#D1C6B3]' : 'hidden'
        } md:block p-3 md:px-3 md:py-2`}
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-2.5 lg:gap-4">
          {/* Four Color Scale Switcher */}
          <div className="flex flex-col md:flex-row md:items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-mono tracking-wider text-[#7C5814] flex items-center gap-1 font-semibold md:hidden xl:flex shrink-0">
              <Layers className="w-3.5 h-3.5 text-[#7C5814]" />
              {t.scale}
            </span>
            <div
              role="group"
              aria-label={t.scale}
              className="grid grid-cols-4 md:inline-flex items-center gap-0.5 p-0.5 bg-[#F0E9DE] rounded-xl border border-[#D1C6B3]"
            >
              {t.scales.map((scale) => (
                <button
                  key={scale.id}
                  type="button"
                  onClick={() => onSelectScale(scale.id)}
                  className={`min-h-[40px] md:min-h-[34px] px-2 lg:px-2.5 rounded-lg font-medium transition-colors text-xs md:text-[11px] lg:text-xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C631A] ${
                    selectedScale === scale.id
                      ? 'bg-[#FCF9F3] text-[#5E400B] border border-[#8C631A]/70 font-semibold shadow-xs'
                      : 'text-[#4F4C45] hover:text-[#1F242C] border border-transparent'
                  }`}
                >
                  {scale.label}
                </button>
              ))}
            </div>
          </div>

          {/* Overlay Modes */}
          <div className="flex flex-col md:flex-row md:items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-mono tracking-wider text-[#7C5814] flex items-center gap-1 font-semibold md:hidden xl:flex shrink-0">
              <Zap className="w-3.5 h-3.5 text-[#7C5814]" />
              {t.overlay}
            </span>
            <div
              role="group"
              aria-label={t.diagramOverlay}
              className="grid grid-cols-3 md:inline-flex items-center gap-0.5 p-0.5 bg-[#F0E9DE] rounded-xl border border-[#D1C6B3]"
            >
              {t.modes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onSelectMode(mode.id)}
                  className={`min-h-[40px] md:min-h-[34px] px-2 lg:px-2.5 rounded-lg font-medium transition-colors text-xs md:text-[11px] lg:text-xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C631A] ${
                    activeMode === mode.id
                      ? 'bg-[#FCF9F3] text-[#5E400B] border border-[#8C631A]/70 font-semibold shadow-xs'
                      : 'text-[#4F4C45] hover:text-[#1F242C] border border-transparent'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Attribution Filter Dropdown */}
          <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:flex-1 md:min-w-[148px] md:max-w-[240px]">
            <label
              htmlFor="attribution-filter"
              className="text-[11px] font-mono tracking-wider text-[#7C5814] flex items-center gap-1 font-semibold md:sr-only"
            >
              <Filter className="w-3.5 h-3.5 text-[#7C5814]" />
              {t.attribution}
            </label>
            <div className="flex items-center gap-1.5 w-full">
              <Filter className="hidden lg:block w-3.5 h-3.5 text-[#7C5814] shrink-0" />
              <select
                id="attribution-filter"
                value={activeFilter || ''}
                onChange={(e) => onSelectFilter(e.target.value || null)}
                className="w-full min-h-[42px] md:min-h-[36px] py-1.5 px-2.5 rounded-xl bg-[#F0E9DE] border border-[#D1C6B3] text-base md:text-xs text-[#1F242C] focus:outline-none focus:border-[#8C631A] cursor-pointer"
              >
                {t.filterOptions.map((opt) => (
                  <option
                    key={opt.value || 'all'}
                    value={opt.value}
                    className="bg-[#F8F4EC] text-[#1F242C]"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              {hasActiveOverrides && (
                <button
                  type="button"
                  onClick={handleReset}
                  title={t.resetControls}
                  aria-label={t.resetControls}
                  className="hidden md:flex min-h-[36px] min-w-[36px] items-center justify-center rounded-xl bg-[#F0E9DE] border border-[#D1C6B3] text-[#4F4C45] hover:text-[#7C5814] hover:border-[#8C631A]/60 transition-colors shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
