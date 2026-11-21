'use client';

import React, { useState } from 'react';
import { PILLARS_DATA, SEPHIROTH_DATA, Sephira } from '@/lib/qabalah-data';
import { Scale, ChevronRight } from 'lucide-react';

interface PillarsExplorerProps {
  onSelectSephira: (sephira: Sephira) => void;
  embedded?: boolean;
}

export default function PillarsExplorer({
  onSelectSephira,
  embedded = false,
}: PillarsExplorerProps) {
  const [selectedPillarId, setSelectedPillarId] = useState<'Severity' | 'Mildness' | 'Mercy'>(
    'Mildness'
  );

  const activePillar = PILLARS_DATA[selectedPillarId];
  const pillarSephiroth = SEPHIROTH_DATA.filter((s) => s.pillar === selectedPillarId);

  return (
    <div
      className={
        embedded
          ? 'p-4 space-y-5'
          : 'bg-[#09090d] border border-[#24242c] rounded-2xl p-4 sm:p-6 shadow-xl space-y-5'
      }
    >
      <div className="border-b border-[#22222a] pb-4">
        <h2 className="text-lg sm:text-xl font-serif font-bold text-[#f0f0f5] flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#c5a059] shrink-0" />
          <span>The Three Pillars of the Tree of Life</span>
        </h2>
        <p className="text-xs text-[#9a9aa6] mt-1">
          Explore the three cosmic columns balancing Force (Mercy), Form (Severity), and Consciousness (Equilibrium).
        </p>
      </div>

      {/* Pillar Switcher: Stacked comfortably on narrow phones, 3-column on sm+ tablets & desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
        {(['Severity', 'Mildness', 'Mercy'] as const).map((pillarKey) => {
          const pillar = PILLARS_DATA[pillarKey];
          const isSelected = selectedPillarId === pillarKey;
          return (
            <button
              key={pillarKey}
              type="button"
              onClick={() => setSelectedPillarId(pillarKey)}
              className={`min-h-[56px] p-3.5 rounded-xl border text-left transition-all flex sm:flex-col items-center sm:items-start justify-between gap-2 ${
                isSelected
                  ? 'bg-[#c5a059]/18 border-[#c5a059] text-[#e8c982] shadow-md'
                  : 'bg-[#121218] border-[#25252e] text-[#a0a0a8] hover:text-[#e8e8ec] hover:border-[#c5a059]/45'
              }`}
            >
              <div className="font-serif font-bold text-sm leading-snug">{pillar.title}</div>
              <div className="text-xs text-[#c5a059] font-mono shrink-0">{pillar.hebrewName}</div>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Details */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#111116] border border-[#24242c] space-y-4">
        <div>
          <span className="text-[11px] font-mono tracking-wider text-[#c5a059] block mb-1 font-semibold">
            Column Characteristics
          </span>
          <h3 className="text-base sm:text-lg font-serif font-bold text-[#f0f0f5]">
            {activePillar.title}
          </h3>
          <p className="text-xs text-[#e8c982] font-medium mt-0.5">{activePillar.quality}</p>
        </div>

        <p className="text-sm sm:text-xs text-[#b8b8c2] leading-relaxed bg-[#09090d] p-4 rounded-xl border border-[#22222a]">
          {activePillar.description}
        </p>

        <div>
          <h4 className="text-sm font-serif font-semibold text-[#c5a059] mb-3">
            Sephiroth on this Pillar
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
            {pillarSephiroth.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectSephira(s)}
                className="w-full min-h-[60px] p-3.5 rounded-xl bg-[#09090d] border border-[#25252e] hover:border-[#c5a059] active:bg-[#15151d] text-left transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#c5a059]/15 text-[#c5a059] font-mono tabular-nums font-bold text-sm flex items-center justify-center border border-[#c5a059]/40 shrink-0">
                    {s.number === 0 ? 'Da' : s.number}
                  </div>
                  <div className="min-w-0">
                    <div className="font-serif font-bold text-sm text-[#f0f0f5] truncate">
                      {s.name} ({s.hebrewName})
                    </div>
                    <div className="text-xs text-[#8e8e98] truncate">{s.translation}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6e6e7a] shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
