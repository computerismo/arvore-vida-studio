'use client';

import React, { useState } from 'react';
import { SEPHIROTH_DATA, PATHS_DATA, Sephira, Path } from '@/lib/qabalah-data';
import { getLocalizedSephirothData, getLocalizedPathsData } from '@/lib/qabalah-pt';
import { Language, UI_STRINGS } from '@/lib/i18n';
import { Search, BookOpen, X, ChevronRight } from 'lucide-react';

interface CorrespondenceTableProps {
  language: Language;
  onSelectSephira: (sephira: Sephira) => void;
  onSelectPath: (path: Path) => void;
  embedded?: boolean;
}

export default function CorrespondenceTable({
  language,
  onSelectSephira,
  onSelectPath,
  embedded = false,
}: CorrespondenceTableProps) {
  const [activeTab, setActiveTab] = useState<'sephiroth' | 'paths'>('sephiroth');
  const [searchQuery, setSearchQuery] = useState('');

  const t = UI_STRINGS[language].table;
  const sephirothList = getLocalizedSephirothData(language);
  const pathsList = getLocalizedPathsData(language);
  const query = searchQuery.trim().toLowerCase();

  const filteredSephiroth = sephirothList.filter((s, index) => {
    if (!query) return true;
    const base = SEPHIROTH_DATA[index];
    return (
      s.name.toLowerCase().includes(query) ||
      s.hebrewName.toLowerCase().includes(query) ||
      s.translation.toLowerCase().includes(query) ||
      s.divineName.toLowerCase().includes(query) ||
      s.archangel.toLowerCase().includes(query) ||
      s.astrological.toLowerCase().includes(query) ||
      s.planet.toLowerCase().includes(query) ||
      s.element.toLowerCase().includes(query) ||
      (base &&
        (base.translation.toLowerCase().includes(query) ||
          base.astrological.toLowerCase().includes(query) ||
          base.planet.toLowerCase().includes(query) ||
          base.element.toLowerCase().includes(query)))
    );
  });

  const filteredPaths = pathsList.filter((p, index) => {
    if (!query) return true;
    const base = PATHS_DATA[index];
    return (
      p.name.toLowerCase().includes(query) ||
      p.hebrewLetterName.toLowerCase().includes(query) ||
      p.tarotCardName.toLowerCase().includes(query) ||
      p.attribution.toLowerCase().includes(query) ||
      p.letterMeaning.toLowerCase().includes(query) ||
      String(p.number).includes(query) ||
      (base &&
        (base.tarotCardName.toLowerCase().includes(query) ||
          base.attribution.toLowerCase().includes(query) ||
          base.name.toLowerCase().includes(query)))
    );
  });

  return (
    <div
      className={
        embedded
          ? 'p-4 space-y-4'
          : 'bg-[#F8F4EC] border border-[#D1C6B3] rounded-2xl p-4 sm:p-6 shadow-md space-y-4'
      }
    >
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 border-b border-[#D1C6B3] pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1F242C] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#7C5814] shrink-0" />
            <span>{t.title}</span>
          </h2>
          <p className="text-xs sm:text-xs text-[#625D53] mt-1">{t.subtitle}</p>
        </div>

        <div className="relative w-full md:w-64 lg:w-60 xl:w-72">
          <Search className="w-4 h-4 text-[#625D53] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full min-h-[44px] md:min-h-[38px] pl-10 pr-10 py-2 rounded-xl bg-[#F0E9DE] border border-[#D1C6B3] text-base sm:text-xs text-[#1F242C] placeholder-[#7B7366] focus:outline-none focus:border-[#8C631A]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label={t.clearSearchAria}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[36px] min-w-[36px] flex items-center justify-center text-[#625D53] hover:text-[#1F242C]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="grid grid-cols-2 sm:inline-flex gap-1.5 p-1 bg-[#F0E9DE] border border-[#D1C6B3] rounded-xl">
        <button
          type="button"
          onClick={() => setActiveTab('sephiroth')}
          className={`min-h-[42px] md:min-h-[36px] px-3 sm:px-4 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'sephiroth'
              ? 'bg-[#FCF9F3] text-[#5E400B] border border-[#8C631A]/70 shadow-xs'
              : 'text-[#4F4C45] hover:text-[#1F242C] border border-transparent'
          }`}
        >
          {t.sephirothTab(filteredSephiroth.length)}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('paths')}
          className={`min-h-[42px] md:min-h-[36px] px-3 sm:px-4 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'paths'
              ? 'bg-[#FCF9F3] text-[#5E400B] border border-[#8C631A]/70 shadow-xs'
              : 'text-[#4F4C45] hover:text-[#1F242C] border border-transparent'
          }`}
        >
          {t.pathsTab(filteredPaths.length)}
        </button>
      </div>

      {/* MOBILE CARD LIST (< md) */}
      <div className="md:hidden divide-y divide-[#E3D9C8] rounded-xl border border-[#D1C6B3] bg-[#FCF9F3] overflow-hidden">
        {activeTab === 'sephiroth' ? (
          filteredSephiroth.length > 0 ? (
            filteredSephiroth.map((s) => {
              const cleaned = s.colors.briah.replace('#', '');
              const toLin = (v: number) => {
                const c = v / 255;
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
              };
              const lum =
                cleaned.length === 6
                  ? 0.2126 * toLin(parseInt(cleaned.slice(0, 2), 16)) +
                    0.7152 * toLin(parseInt(cleaned.slice(2, 4), 16)) +
                    0.0722 * toLin(parseInt(cleaned.slice(4, 6), 16))
                  : 0;
              const isLight = Boolean(s.quarteredColors) || lum > 0.22;

              return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectSephira(s)}
                className="w-full text-left p-3.5 active:bg-[#F0E9DE] transition-colors flex items-center gap-3.5"
              >
                <div
                  className="relative w-11 h-11 rounded-full flex items-center justify-center border shrink-0 font-serif font-bold text-base overflow-hidden"
                  style={{
                    background: s.quarteredColors
                      ? `conic-gradient(from -45deg, ${s.quarteredColors[0]} 0deg 90deg, ${s.quarteredColors[1]} 90deg 180deg, ${s.quarteredColors[2]} 180deg 270deg, ${s.quarteredColors[3]} 270deg 360deg)`
                      : s.colors.briah || '#1b2232',
                    borderColor: '#6B6352',
                  }}
                >
                  {s.quarteredColors && (
                    <span className="absolute inset-[4px] rounded-full bg-[#FCF9F3] border border-[#6b6658]/60" />
                  )}
                  <span className={`relative z-10 ${isLight ? 'text-[#1F242C]' : 'text-[#FFFEFA]'}`}>
                    {s.hebrewName}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs tabular-nums text-[#7C5814] font-semibold">
                      {s.number === 0 ? 'Da' : `#${s.number}`}
                    </span>
                    <span className="font-serif font-bold text-sm text-[#1F242C] truncate">
                      {s.name}
                    </span>
                    <span className="text-xs text-[#625D53] truncate">
                      · {s.translation}
                    </span>
                  </div>
                  <div className="text-xs text-[#2E3239] mt-0.5 truncate">
                    {s.divineName} · {s.archangel}
                  </div>
                  <div className="text-[11px] text-[#625D53] mt-0.5 truncate">
                    {s.astrological}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#7B7366] shrink-0" />
              </button>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs text-[#625D53]">
              {t.emptySephiroth(searchQuery)}
            </div>
          )
        ) : filteredPaths.length > 0 ? (
          filteredPaths.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPath(p)}
              className="w-full text-left p-3.5 active:bg-[#F0E9DE] transition-colors flex items-center gap-3.5"
            >
              <div
                className="w-11 h-11 rounded-xl bg-[#FAF7EF] border-2 flex items-center justify-center font-serif font-bold text-lg text-[#1F242C] shrink-0"
                style={{ borderColor: p.colors.atziluth || '#8C631A' }}
              >
                {p.hebrewLetter}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs tabular-nums text-[#7C5814] font-semibold">
                    {language === 'pt' ? `Caminho ${p.number}` : `Path ${p.number}`}
                  </span>
                  <span className="font-serif font-bold text-sm text-[#1F242C] truncate">
                    {p.tarotCardName}
                  </span>
                </div>
                <div className="text-xs text-[#2E3239] mt-0.5 truncate">
                  {p.hebrewLetterName} ({p.letterMeaning}) · {p.attribution} {p.symbolIcon}
                </div>
                <div className="text-[11px] text-[#625D53] mt-0.5 italic truncate">
                  {p.name}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#7B7366] shrink-0" />
            </button>
          ))
        ) : (
          <div className="p-6 text-center text-xs text-[#625D53]">
            {t.emptyPaths(searchQuery)}
          </div>
        )}
      </div>

      {/* TABLET & DESKTOP TABLE (md+) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[#D1C6B3] bg-[#FCF9F3] max-h-[520px] overflow-y-auto">
        {activeTab === 'sephiroth' ? (
          filteredSephiroth.length > 0 ? (
            <table className="w-full text-left text-xs text-[#2E3239] border-collapse">
              <thead className="bg-[#EFE6D7] text-[#6D4B0F] font-serif sticky top-0 z-10 border-b border-[#D1C6B3]">
                <tr>
                  <th className="py-3 px-3 whitespace-nowrap">{t.headersSephiroth.num}</th>
                  <th className="py-3 px-3 whitespace-nowrap">{t.headersSephiroth.sephira}</th>
                  <th className="py-3 px-3 whitespace-nowrap">{t.headersSephiroth.hebrew}</th>
                  <th className="py-3 px-3 whitespace-nowrap">{t.headersSephiroth.translation}</th>
                  <th className="py-3 px-3 whitespace-nowrap">{t.headersSephiroth.divineName}</th>
                  <th className="py-3 px-3 whitespace-nowrap">{t.headersSephiroth.archangel}</th>
                  <th className="py-3 px-3 whitespace-nowrap">{t.headersSephiroth.astrological}</th>
                  <th className="py-3 px-3 whitespace-nowrap hidden lg:table-cell">
                    {t.headersSephiroth.experience}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3D9C8] font-sans">
                {filteredSephiroth.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => onSelectSephira(s)}
                    className="hover:bg-[#F3ECE0] cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-3 font-mono tabular-nums font-bold text-[#7C5814]">
                      {s.number === 0 ? 'Da' : s.number}
                    </td>
                    <td className="py-3.5 px-3 font-serif font-bold text-[#1F242C] whitespace-nowrap">
                      {s.name}
                    </td>
                    <td className="py-3.5 px-3 font-serif font-bold text-[#7C5814] text-sm whitespace-nowrap">
                      {s.hebrewName}
                    </td>
                    <td className="py-3.5 px-3 text-[#2E3239]">{s.translation}</td>
                    <td className="py-3.5 px-3 text-[#5E400B] font-medium">{s.divineName}</td>
                    <td className="py-3.5 px-3 text-[#2E3239]">{s.archangel}</td>
                    <td className="py-3.5 px-3 text-[#625D53]">{s.astrological}</td>
                    <td className="py-3.5 px-3 text-[#625D53] italic text-[11px] hidden lg:table-cell">
                      {s.spiritualExperience}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-xs text-[#625D53]">
              {t.emptySephiroth(searchQuery)}
            </div>
          )
        ) : filteredPaths.length > 0 ? (
          <table className="w-full text-left text-xs text-[#2E3239] border-collapse">
            <thead className="bg-[#EFE6D7] text-[#6D4B0F] font-serif sticky top-0 z-10 border-b border-[#D1C6B3]">
              <tr>
                <th className="py-3 px-3 whitespace-nowrap">{t.headersPaths.num}</th>
                <th className="py-3 px-3 whitespace-nowrap">{t.headersPaths.letter}</th>
                <th className="py-3 px-3 whitespace-nowrap">{t.headersPaths.meaning}</th>
                <th className="py-3 px-3 whitespace-nowrap">{t.headersPaths.tarotKey}</th>
                <th className="py-3 px-3 whitespace-nowrap">{t.headersPaths.attribution}</th>
                <th className="py-3 px-3 whitespace-nowrap hidden lg:table-cell">
                  {t.headersPaths.title}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3D9C8] font-sans">
              {filteredPaths.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => onSelectPath(p)}
                  className="hover:bg-[#F3ECE0] cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-3 font-mono tabular-nums font-bold text-[#7C5814]">
                    {p.number}
                  </td>
                  <td className="py-3.5 px-3 font-serif font-bold text-[#7C5814] text-sm whitespace-nowrap">
                    {p.hebrewLetter} ({p.hebrewLetterName})
                  </td>
                  <td className="py-3.5 px-3 text-[#2E3239]">{p.letterMeaning}</td>
                  <td className="py-3.5 px-3 text-[#5E400B] font-medium whitespace-nowrap">
                    {p.tarotKey} — {p.tarotCardName}
                  </td>
                  <td className="py-3.5 px-3 text-[#2E3239] whitespace-nowrap">
                    {p.attribution} {p.symbolIcon}
                  </td>
                  <td className="py-3.5 px-3 text-[#625D53] italic text-[11px] hidden lg:table-cell">
                    {p.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-xs text-[#625D53]">
            {t.emptyPaths(searchQuery)}
          </div>
        )}
      </div>
    </div>
  );
}
