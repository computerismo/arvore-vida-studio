'use client';

import React, { useState } from 'react';
import { Sephira } from '@/lib/qabalah-data';
import { getLocalizedPillarsData, getLocalizedSephirothData } from '@/lib/qabalah-pt';
import { Language, UI_STRINGS } from '@/lib/i18n';
import { Scale, ChevronRight } from 'lucide-react';

interface PillarsExplorerProps {
  language: Language;
  onSelectSephira: (sephira: Sephira) => void;
  embedded?: boolean;
}

export default function PillarsExplorer({
  language,
  onSelectSephira,
  embedded = false,
}: PillarsExplorerProps) {
  const [selectedPillarId, setSelectedPillarId] = useState<'Severity' | 'Mildness' | 'Mercy'>(
    'Mildness'
  );

  const t = UI_STRINGS[language].pillarsExplorer;
  const pillarsData = getLocalizedPillarsData(language);
  const sephirothData = getLocalizedSephirothData(language);
  const activePillar = pillarsData[selectedPillarId];
  const pillarSephiroth = sephirothData.filter((s) => s.pillar === selectedPillarId);

  return (
    <div
      className={
        embedded
          ? 'p-4 space-y-5'
          : 'bg-[#dce2ec] border border-[#b3bdd0] rounded-2xl p-4 sm:p-6 shadow-md space-y-5'
      }
    >
      <div className="border-b border-[#b3bdd0] pb-4">
        <h2 className="text-lg sm:text-xl font-serif font-bold text-[#161e2e] flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#7c5814] shrink-0" />
          <span>{t.title}</span>
        </h2>
        <p className="text-xs text-[#4b576e] mt-1">{t.subtitle}</p>
      </div>

      {/* Pillar Switcher: Stacked comfortably on narrow phones, 3-column on sm+ tablets & desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
        {(['Severity', 'Mildness', 'Mercy'] as const).map((pillarKey) => {
          const pillar = pillarsData[pillarKey];
          const isSelected = selectedPillarId === pillarKey;
          return (
            <button
              key={pillarKey}
              type="button"
              onClick={() => setSelectedPillarId(pillarKey)}
              className={`min-h-[56px] p-3.5 rounded-xl border text-left transition-all flex sm:flex-col items-center sm:items-start justify-between gap-2 ${
                isSelected
                  ? 'bg-[#9a7022]/16 border-[#8c631a] text-[#5e400b] shadow-sm'
                  : 'bg-[#cfd6e2] border-[#b3bdd0] text-[#2c364a] hover:text-[#161e2e] hover:border-[#8c631a]/55'
              }`}
            >
              <div className="font-serif font-bold text-sm leading-snug">{pillar.title}</div>
              <div className="text-xs text-[#7c5814] font-mono shrink-0">{pillar.hebrewName}</div>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Details */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0] space-y-4">
        <div>
          <span className="text-[11px] font-mono tracking-wider text-[#7c5814] block mb-1 font-semibold">
            {t.characteristics}
          </span>
          <h3 className="text-base sm:text-lg font-serif font-bold text-[#161e2e]">
            {activePillar.title}
          </h3>
          <p className="text-xs text-[#5e400b] font-medium mt-0.5">{activePillar.quality}</p>
        </div>

        <p className="text-sm sm:text-xs text-[#242e42] leading-relaxed bg-[#d8dfe9] p-4 rounded-xl border border-[#b3bdd0]">
          {activePillar.description}
        </p>

        <div>
          <h4 className="text-sm font-serif font-semibold text-[#7c5814] mb-3">
            {t.sephirothOnPillar}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
            {pillarSephiroth.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectSephira(s)}
                className="w-full min-h-[60px] p-3.5 rounded-xl bg-[#dce2ec] border border-[#b3bdd0] hover:border-[#8c631a] active:bg-[#c5cede] text-left transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#9a7022]/15 text-[#7c5814] font-mono tabular-nums font-bold text-sm flex items-center justify-center border border-[#8c631a]/45 shrink-0">
                    {s.number === 0 ? 'Da' : s.number}
                  </div>
                  <div className="min-w-0">
                    <div className="font-serif font-bold text-sm text-[#161e2e] truncate">
                      {s.name} ({s.hebrewName})
                    </div>
                    <div className="text-xs text-[#4b576e] truncate">{s.translation}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#526078] shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
