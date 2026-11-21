'use client';

import React, { useState } from 'react';
import { Layers, Zap, Filter, SlidersHorizontal, ChevronDown, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  selectedScale: 'atziluth' | 'briah' | 'yetzirah' | 'assiah';
  onSelectScale: (scale: 'atziluth' | 'briah' | 'yetzirah' | 'assiah') => void;
  activeMode: 'default' | 'lightning' | 'serpent';
  onSelectMode: (mode: 'default' | 'lightning' | 'serpent') => void;
  activeFilter: string | null;
  onSelectFilter: (filter: string | null) => void;
}

const SCALES = [
  { id: 'atziluth', label: 'Atziluth' },
  { id: 'briah', label: 'Briah' },
  { id: 'yetzirah', label: 'Yetzirah' },
  { id: 'assiah', label: 'Assiah' },
] as const;

const MODES = [
  { id: 'default', label: 'Standard' },
  { id: 'lightning', label: 'Lightning' },
  { id: 'serpent', label: 'Serpent' },
] as const;

const FILTER_OPTIONS = [
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

export default function FilterBar({
  selectedScale,
  onSelectScale,
  activeMode,
  onSelectMode,
  activeFilter,
  onSelectFilter,
}: FilterBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeFilterLabel =
    FILTER_OPTIONS.find((opt) => opt.value === (activeFilter || ''))?.label ||
    'All Attributions';
  const hasActiveOverrides = activeMode !== 'default' || Boolean(activeFilter);

  const handleReset = () => {
    onSelectScale('briah');
    onSelectMode('default');
    onSelectFilter(null);
  };

  return (
    <div className="bg-[#09090d]/95 backdrop-blur-md border border-[#c5a059]/25 rounded-2xl shadow-xl overflow-hidden shrink-0">
      {/* Mobile Compact Summary Toggle Bar (< md) */}
      <div className="flex md:hidden items-center justify-between gap-2 px-3 py-1.5">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          className="flex-1 min-h-[40px] flex items-center justify-between gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] rounded-xl px-1"
        >
          <div className="flex items-center gap-2 min-w-0">
            <SlidersHorizontal className="w-4 h-4 text-[#c5a059] shrink-0" />
            <div className="text-xs text-[#9a9aa6] truncate">
              <span className="capitalize text-[#e8c982] font-semibold">{selectedScale}</span>
              <span aria-hidden="true"> · </span>
              <span className="capitalize">
                {activeMode === 'default' ? 'Standard' : activeMode}
              </span>
              {activeFilter && (
                <>
                  <span aria-hidden="true"> · </span>
                  <span className="text-[#e8e8ec]">{activeFilterLabel}</span>
                </>
              )}
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[#c5a059] shrink-0 transition-transform duration-200 ${
              mobileOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {hasActiveOverrides && (
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset filters"
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-[#14141a] border border-[#272730] text-[#a0a0a8] active:text-[#c5a059]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Controls Body: Collapsible on Mobile, Compact Single Row on Tablet (md+) & Desktop */}
      <div
        className={`${
          mobileOpen ? 'block border-t border-[#1e1e26]' : 'hidden'
        } md:block p-3 md:px-3 md:py-2`}
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-2.5 lg:gap-4">
          {/* Four Color Scale Switcher */}
          <div className="flex flex-col md:flex-row md:items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-mono tracking-wider text-[#c5a059] flex items-center gap-1 font-semibold md:hidden xl:flex shrink-0">
              <Layers className="w-3.5 h-3.5 text-[#c5a059]" />
              Scale
            </span>
            <div
              role="group"
              aria-label="Color scale"
              className="grid grid-cols-4 md:inline-flex items-center gap-0.5 p-0.5 bg-[#121217] rounded-xl border border-[#22222a]"
            >
              {SCALES.map((scale) => (
                <button
                  key={scale.id}
                  type="button"
                  onClick={() => onSelectScale(scale.id)}
                  className={`min-h-[40px] md:min-h-[34px] px-2 lg:px-2.5 rounded-lg font-medium transition-colors text-xs md:text-[11px] lg:text-xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] ${
                    selectedScale === scale.id
                      ? 'bg-[#c5a059]/20 text-[#e8c982] border border-[#c5a059]/60 font-semibold'
                      : 'text-[#8e8e98] hover:text-[#e0e0e0] border border-transparent'
                  }`}
                >
                  {scale.label}
                </button>
              ))}
            </div>
          </div>

          {/* Overlay Modes */}
          <div className="flex flex-col md:flex-row md:items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-mono tracking-wider text-[#c5a059] flex items-center gap-1 font-semibold md:hidden xl:flex shrink-0">
              <Zap className="w-3.5 h-3.5 text-[#c5a059]" />
              Overlay
            </span>
            <div
              role="group"
              aria-label="Tree overlay mode"
              className="grid grid-cols-3 md:inline-flex items-center gap-0.5 p-0.5 bg-[#121217] rounded-xl border border-[#22222a]"
            >
              {MODES.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onSelectMode(mode.id)}
                  className={`min-h-[40px] md:min-h-[34px] px-2 lg:px-2.5 rounded-lg font-medium transition-colors text-xs md:text-[11px] lg:text-xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] ${
                    activeMode === mode.id
                      ? 'bg-[#c5a059]/20 text-[#e8c982] border border-[#c5a059]/60 font-semibold'
                      : 'text-[#8e8e98] hover:text-[#e0e0e0] border border-transparent'
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
              className="text-[11px] font-mono tracking-wider text-[#c5a059] flex items-center gap-1 font-semibold md:sr-only"
            >
              <Filter className="w-3.5 h-3.5 text-[#c5a059]" />
              Attribution
            </label>
            <div className="flex items-center gap-1.5 w-full">
              <Filter className="hidden lg:block w-3.5 h-3.5 text-[#c5a059] shrink-0" />
              <select
                id="attribution-filter"
                value={activeFilter || ''}
                onChange={(e) => onSelectFilter(e.target.value || null)}
                className="w-full min-h-[42px] md:min-h-[36px] py-1.5 px-2.5 rounded-xl bg-[#121217] border border-[#22222a] text-base md:text-xs text-[#e0e0e0] focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                {FILTER_OPTIONS.map((opt) => (
                  <option
                    key={opt.value || 'all'}
                    value={opt.value}
                    className="bg-[#121217] text-[#e0e0e0]"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              {hasActiveOverrides && (
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset controls"
                  aria-label="Reset controls"
                  className="hidden md:flex min-h-[36px] min-w-[36px] items-center justify-center rounded-xl bg-[#14141a] border border-[#272730] text-[#a0a0a8] hover:text-[#c5a059] hover:border-[#c5a059]/50 transition-colors shrink-0"
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
