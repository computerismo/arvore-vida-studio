'use client';

import React, { useState } from 'react';
import { SEPHIROTH_DATA, PATHS_DATA, Sephira, Path } from '@/lib/qabalah-data';
import { Search, BookOpen, X, ChevronRight } from 'lucide-react';

interface CorrespondenceTableProps {
  onSelectSephira: (sephira: Sephira) => void;
  onSelectPath: (path: Path) => void;
  embedded?: boolean;
}

export default function CorrespondenceTable({
  onSelectSephira,
  onSelectPath,
  embedded = false,
}: CorrespondenceTableProps) {
  const [activeTab, setActiveTab] = useState<'sephiroth' | 'paths'>('sephiroth');
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.trim().toLowerCase();

  const filteredSephiroth = SEPHIROTH_DATA.filter((s) => {
    if (!query) return true;
    return (
      s.name.toLowerCase().includes(query) ||
      s.hebrewName.toLowerCase().includes(query) ||
      s.translation.toLowerCase().includes(query) ||
      s.divineName.toLowerCase().includes(query) ||
      s.archangel.toLowerCase().includes(query) ||
      s.astrological.toLowerCase().includes(query) ||
      s.element.toLowerCase().includes(query)
    );
  });

  const filteredPaths = PATHS_DATA.filter((p) => {
    if (!query) return true;
    return (
      p.name.toLowerCase().includes(query) ||
      p.hebrewLetterName.toLowerCase().includes(query) ||
      p.tarotCardName.toLowerCase().includes(query) ||
      p.attribution.toLowerCase().includes(query) ||
      p.letterMeaning.toLowerCase().includes(query) ||
      String(p.number).includes(query)
    );
  });

  return (
    <div
      className={
        embedded
          ? 'p-4 space-y-4'
          : 'bg-[#09090d] border border-[#24242c] rounded-2xl p-4 sm:p-6 shadow-xl space-y-4'
      }
    >
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 border-b border-[#22222a] pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#f0f0f5] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#c5a059] shrink-0" />
            <span>Master Correspondence Index</span>
          </h2>
          <p className="text-xs sm:text-xs text-[#9a9aa6] mt-1">
            777 reference across Divine Names, Archangels, Astrology, and Tarot keys.
          </p>
        </div>

        <div className="relative w-full md:w-64 lg:w-60 xl:w-72">
          <Search className="w-4 h-4 text-[#80808c] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            placeholder="Search Hebrew, Archangel, Tarot..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full min-h-[44px] md:min-h-[38px] pl-10 pr-10 py-2 rounded-xl bg-[#121218] border border-[#272730] text-base sm:text-xs text-[#e8e8ec] placeholder-[#787884] focus:outline-none focus:border-[#c5a059]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[36px] min-w-[36px] flex items-center justify-center text-[#8e8e98] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="grid grid-cols-2 sm:inline-flex gap-1.5 p-1 bg-[#121218] border border-[#22222a] rounded-xl">
        <button
          type="button"
          onClick={() => setActiveTab('sephiroth')}
          className={`min-h-[42px] md:min-h-[36px] px-3 sm:px-4 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'sephiroth'
              ? 'bg-[#c5a059]/20 text-[#e8c982] border border-[#c5a059]/60'
              : 'text-[#8e8e98] hover:text-[#e0e0e0] border border-transparent'
          }`}
        >
          Sephiroth ({filteredSephiroth.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('paths')}
          className={`min-h-[42px] md:min-h-[36px] px-3 sm:px-4 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'paths'
              ? 'bg-[#c5a059]/20 text-[#e8c982] border border-[#c5a059]/60'
              : 'text-[#8e8e98] hover:text-[#e0e0e0] border border-transparent'
          }`}
        >
          22 Paths ({filteredPaths.length})
        </button>
      </div>

      {/* MOBILE CARD LIST (< md) */}
      <div className="md:hidden divide-y divide-[#1e1e26] rounded-xl border border-[#22222a] bg-[#0e0e13] overflow-hidden">
        {activeTab === 'sephiroth' ? (
          filteredSephiroth.length > 0 ? (
            filteredSephiroth.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectSephira(s)}
                className="w-full text-left p-3.5 active:bg-[#171720] transition-colors flex items-center gap-3.5"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center border shrink-0 font-serif font-bold text-base text-white"
                  style={{
                    backgroundColor: '#131319',
                    borderColor: s.colors.briah || '#c5a059',
                  }}
                >
                  {s.hebrewName}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs tabular-nums text-[#c5a059] font-semibold">
                      {s.number === 0 ? 'Da' : `#${s.number}`}
                    </span>
                    <span className="font-serif font-bold text-sm text-[#f0f0f5] truncate">
                      {s.name}
                    </span>
                    <span className="text-xs text-[#8e8e98] truncate">
                      · {s.translation}
                    </span>
                  </div>
                  <div className="text-xs text-[#a8a8b2] mt-0.5 truncate">
                    {s.divineName} · {s.archangel}
                  </div>
                  <div className="text-[11px] text-[#7e7e8a] mt-0.5 truncate">
                    {s.astrological}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6e6e7a] shrink-0" />
              </button>
            ))
          ) : (
            <div className="p-6 text-center text-xs text-[#8e8e98]">
              No Sephiroth match &ldquo;{searchQuery}&rdquo;.
            </div>
          )
        ) : filteredPaths.length > 0 ? (
          filteredPaths.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPath(p)}
              className="w-full text-left p-3.5 active:bg-[#171720] transition-colors flex items-center gap-3.5"
            >
              <div className="w-11 h-11 rounded-xl bg-[#14141b] border border-[#c5a059]/45 flex items-center justify-center font-serif font-bold text-lg text-[#c5a059] shrink-0">
                {p.hebrewLetter}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs tabular-nums text-[#c5a059] font-semibold">
                    Path {p.number}
                  </span>
                  <span className="font-serif font-bold text-sm text-[#f0f0f5] truncate">
                    {p.tarotCardName}
                  </span>
                </div>
                <div className="text-xs text-[#a8a8b2] mt-0.5 truncate">
                  {p.hebrewLetterName} ({p.letterMeaning}) · {p.attribution} {p.symbolIcon}
                </div>
                <div className="text-[11px] text-[#7e7e8a] mt-0.5 italic truncate">
                  {p.name}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#6e6e7a] shrink-0" />
            </button>
          ))
        ) : (
          <div className="p-6 text-center text-xs text-[#8e8e98]">
            No Paths match &ldquo;{searchQuery}&rdquo;.
          </div>
        )}
      </div>

      {/* TABLET & DESKTOP TABLE (md+) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[#24242c] bg-[#111116] max-h-[520px] overflow-y-auto">
        {activeTab === 'sephiroth' ? (
          filteredSephiroth.length > 0 ? (
            <table className="w-full text-left text-xs text-[#a8a8b2] border-collapse">
              <thead className="bg-[#09090d] text-[#c5a059] font-serif sticky top-0 z-10 border-b border-[#24242c]">
                <tr>
                  <th className="py-3 px-3 whitespace-nowrap">#</th>
                  <th className="py-3 px-3 whitespace-nowrap">Sephira</th>
                  <th className="py-3 px-3 whitespace-nowrap">Hebrew</th>
                  <th className="py-3 px-3 whitespace-nowrap">Translation</th>
                  <th className="py-3 px-3 whitespace-nowrap">Divine Name</th>
                  <th className="py-3 px-3 whitespace-nowrap">Archangel</th>
                  <th className="py-3 px-3 whitespace-nowrap">Astrological</th>
                  <th className="py-3 px-3 whitespace-nowrap hidden lg:table-cell">
                    Spiritual Experience
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#202028] font-sans">
                {filteredSephiroth.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => onSelectSephira(s)}
                    className="hover:bg-[#191922] cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-3 font-mono tabular-nums font-bold text-[#c5a059]">
                      {s.number === 0 ? 'Da' : s.number}
                    </td>
                    <td className="py-3.5 px-3 font-serif font-bold text-[#f0f0f5] whitespace-nowrap">
                      {s.name}
                    </td>
                    <td className="py-3.5 px-3 font-serif font-bold text-[#c5a059] text-sm whitespace-nowrap">
                      {s.hebrewName}
                    </td>
                    <td className="py-3.5 px-3 text-[#e0e0e6]">{s.translation}</td>
                    <td className="py-3.5 px-3 text-[#e8c982]">{s.divineName}</td>
                    <td className="py-3.5 px-3 text-[#b8b8c2]">{s.archangel}</td>
                    <td className="py-3.5 px-3 text-[#9a9aa6]">{s.astrological}</td>
                    <td className="py-3.5 px-3 text-[#8e8e98] italic text-[11px] hidden lg:table-cell">
                      {s.spiritualExperience}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-xs text-[#8e8e98]">
              No Sephiroth match &ldquo;{searchQuery}&rdquo;.
            </div>
          )
        ) : filteredPaths.length > 0 ? (
          <table className="w-full text-left text-xs text-[#a8a8b2] border-collapse">
            <thead className="bg-[#09090d] text-[#c5a059] font-serif sticky top-0 z-10 border-b border-[#24242c]">
              <tr>
                <th className="py-3 px-3 whitespace-nowrap">Path #</th>
                <th className="py-3 px-3 whitespace-nowrap">Hebrew Letter</th>
                <th className="py-3 px-3 whitespace-nowrap">Meaning</th>
                <th className="py-3 px-3 whitespace-nowrap">Tarot Key</th>
                <th className="py-3 px-3 whitespace-nowrap">Attribution</th>
                <th className="py-3 px-3 whitespace-nowrap hidden lg:table-cell">
                  Intelligence Title
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202028] font-sans">
              {filteredPaths.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => onSelectPath(p)}
                  className="hover:bg-[#191922] cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-3 font-mono tabular-nums font-bold text-[#c5a059]">
                    {p.number}
                  </td>
                  <td className="py-3.5 px-3 font-serif font-bold text-[#c5a059] text-sm whitespace-nowrap">
                    {p.hebrewLetter} ({p.hebrewLetterName})
                  </td>
                  <td className="py-3.5 px-3 text-[#e0e0e6]">{p.letterMeaning}</td>
                  <td className="py-3.5 px-3 text-[#e8c982] font-medium whitespace-nowrap">
                    {p.tarotKey} — {p.tarotCardName}
                  </td>
                  <td className="py-3.5 px-3 text-[#b8b8c2] whitespace-nowrap">
                    {p.attribution} {p.symbolIcon}
                  </td>
                  <td className="py-3.5 px-3 text-[#8e8e98] italic text-[11px] hidden lg:table-cell">
                    {p.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-xs text-[#8e8e98]">
            No Paths match &ldquo;{searchQuery}&rdquo;.
          </div>
        )}
      </div>
    </div>
  );
}
