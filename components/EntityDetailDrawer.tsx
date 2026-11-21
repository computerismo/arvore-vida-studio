'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sephira, Path } from '@/lib/qabalah-data';
import {
  getLocalizedSephirothData,
  getLocalizedPillarName,
  getLocalizedAttributionType,
} from '@/lib/qabalah-pt';
import { Language, UI_STRINGS } from '@/lib/i18n';
import {
  X,
  Sparkles,
  BookOpen,
  Crown,
  Compass,
  Scroll,
  ArrowRight,
  Layers,
  Sun,
} from 'lucide-react';

interface EntityDetailContentProps {
  language: Language;
  sephira: Sephira | null;
  pathItem: Path | null;
  onClose?: () => void;
  onGenerateAiMeditation: (entityName: string, entityType: 'sephira' | 'path') => void;
  embedded?: boolean;
}

export function EntityDetailContent({
  language,
  sephira,
  pathItem,
  onClose,
  onGenerateAiMeditation,
  embedded = false,
}: EntityDetailContentProps) {
  const [tabState, setTabState] = useState<{
    entityKey: string;
    tab: 'overview' | 'attributions' | 'commentary' | 'meditation';
  }>({ entityKey: '', tab: 'overview' });

  const t = UI_STRINGS[language].drawer;
  const sephirothList = getLocalizedSephirothData(language);
  const entityKey = sephira ? `s-${sephira.id}` : pathItem ? `p-${pathItem.id}` : '';
  const activeTab = tabState.entityKey === entityKey ? tabState.tab : 'overview';
  const setActiveTab = (
    tab: 'overview' | 'attributions' | 'commentary' | 'meditation'
  ) => setTabState({ entityKey, tab });

  if (!sephira && !pathItem) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#8E6636]/40 flex items-center justify-center">
          <Compass className="w-7 h-7 text-[#8E6636]" />
        </div>
        <div className="space-y-1.5 max-w-sm">
          <h3 className="font-serif text-lg font-bold text-[#302B26]">{t.emptyTitle}</h3>
          <p className="text-xs text-[#5D554A] leading-relaxed">{t.emptyDescription}</p>
        </div>
        <div className="grid grid-cols-3 gap-2.5 w-full max-w-xs pt-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
            <div className="font-serif font-bold text-base text-[#8E6636] tabular-nums">10</div>
            <div className="text-[10px] text-[#5D554A]">{t.statSephiroth}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
            <div className="font-serif font-bold text-base text-[#8E6636] tabular-nums">22</div>
            <div className="text-[10px] text-[#5D554A]">{t.statPaths}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
            <div className="font-serif font-bold text-base text-[#8E6636] tabular-nums">4</div>
            <div className="text-[10px] text-[#5D554A]">{t.statScales}</div>
          </div>
        </div>
      </div>
    );
  }

  const isLightHex = (hex?: string) => {
    if (!hex) return false;
    const cleaned = hex.replace('#', '').trim();
    if (cleaned.length !== 6) return false;
    const toLin = (v: number) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const l =
      0.2126 * toLin(parseInt(cleaned.slice(0, 2), 16)) +
      0.7152 * toLin(parseInt(cleaned.slice(2, 4), 16)) +
      0.0722 * toLin(parseInt(cleaned.slice(4, 6), 16));
    return l > 0.22;
  };

  const isLightBriah = Boolean(sephira?.quarteredColors) || isLightHex(sephira?.colors.briah);

  return (
    <div className="flex flex-col h-full min-h-0 text-[#302B26]">
      {/* Header */}
      <div
        className={`${
          embedded ? 'px-4 py-3.5' : 'px-4 py-3.5 sm:p-5 md:p-6'
        } border-b border-[#C2B5A2] bg-gradient-to-b from-[#DDD6CA] to-[#D1C8BB] flex items-start justify-between gap-3 shrink-0`}
      >
        {sephira ? (
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className="relative w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-md shrink-0 overflow-hidden"
              style={{
                background: sephira.quarteredColors
                  ? `conic-gradient(from -45deg, ${sephira.quarteredColors[0]} 0deg 90deg, ${sephira.quarteredColors[1]} 90deg 180deg, ${sephira.quarteredColors[2]} 180deg 270deg, ${sephira.quarteredColors[3]} 270deg 360deg)`
                  : sephira.colors.briah || '#1b2232',
                borderColor: '#8E6636',
              }}
            >
              {sephira.quarteredColors && (
                <div className="absolute inset-[5px] rounded-full bg-[#F9F3EA] border border-[#6b6658]/60" />
              )}
              <span
                className={`relative z-10 font-serif font-bold text-xl ${
                  isLightBriah ? 'text-[#302B26]' : 'text-[#FFFEFA]'
                }`}
              >
                {sephira.hebrewName}
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-mono">
                <span className="text-[#8E6636] font-semibold">
                  {t.sphereLabel(sephira.number)}
                </span>
                <span className="text-[#5D554A]/65" aria-hidden="true">·</span>
                <span className="text-[#5D554A]">
                  {t.pillarSuffix(getLocalizedPillarName(sephira.pillar, language))}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#302B26] mt-0.5 truncate">
                {sephira.name}
              </h2>
              <p className="text-xs text-[#5D554A] italic truncate">
                &ldquo;{sephira.translation}&rdquo;
              </p>
            </div>
          </div>
        ) : pathItem ? (
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className="w-12 h-12 rounded-2xl bg-[#24201B] border-2 flex items-center justify-center text-2xl font-serif font-bold text-[#E8C982] shadow-md shrink-0"
              style={{ borderColor: pathItem.colors.atziluth || '#8E6636' }}
            >
              {pathItem.hebrewLetter}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-mono">
                <span className="text-[#8E6636] font-semibold">
                  {t.pathLabel(pathItem.number, pathItem.hebrewLetterName)}
                </span>
                <span className="text-[#5D554A]/65" aria-hidden="true">·</span>
                <span className="text-[#5D554A]">
                  {pathItem.attribution} {pathItem.symbolIcon}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#302B26] mt-0.5 truncate">
                {pathItem.tarotCardName}
              </h2>
              <p className="text-xs text-[#5D554A] italic truncate">
                {t.tarotKeySubtitle(pathItem.tarotKey, pathItem.name)}
              </p>
            </div>
          </div>
        ) : null}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeAria}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-[#EAE3D7]/85 hover:bg-[#ECE4D5] text-[#5D554A] hover:text-[#302B26] transition-colors border border-[#C2B5A2] shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div
        role="tablist"
        className="flex border-b border-[#C2B5A2] bg-[#EAE3D7] px-2 sm:px-3 gap-1 text-xs overflow-x-auto no-scrollbar shrink-0"
      >
        {(
          [
            { id: 'overview', label: t.tabs.overview, icon: Crown },
            { id: 'attributions', label: t.tabs.attributions, icon: Compass },
            { id: 'commentary', label: t.tabs.commentary, icon: BookOpen },
            { id: 'meditation', label: t.tabs.meditation, icon: Sparkles },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[42px] py-2 px-3 font-medium border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                isActive
                  ? 'border-[#8E6636] text-[#302B26] bg-[#ECE4D5] font-semibold'
                  : 'border-transparent text-[#5D554A] hover:text-[#302B26]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#8E6636]' : 'text-[#5D554A]'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Scrollable Body */}
      <div
        onPointerDownCapture={(e) => e.stopPropagation()}
        className={`${
          embedded ? 'p-4' : 'p-4 sm:p-5 md:p-6 pb-safe'
        } overflow-y-auto overscroll-contain space-y-5 flex-1 min-h-0`}
      >
        {sephira && activeTab === 'overview' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-serif font-bold tracking-wider text-[#8E6636] mb-2 flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#8E6636]" />
                {t.overview.coreSymbolism}
              </h3>
              <p className="text-[#302B26] leading-relaxed text-sm sm:text-[13px] bg-gradient-to-b from-[#F9F3EA] to-[#F3ECE0] p-3.5 rounded-xl border border-[#C2B5A2]/75 shadow-xs">
                {sephira.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm sm:text-xs">
              <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75 space-y-1">
                <span className="text-[11px] font-semibold text-[#8E6636]">
                  {t.overview.planet}
                </span>
                <p className="font-serif text-[#302B26] font-semibold">
                  {sephira.planet}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75 space-y-1">
                <span className="text-[11px] font-semibold text-[#8E6636]">
                  {t.overview.yetziraticTitle}
                </span>
                <p className="font-serif text-[#302B26] font-medium">
                  {sephira.yetziraticTitle}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75 space-y-1">
                <span className="text-[11px] font-semibold text-[#8E6636]">
                  {t.overview.spiritualExperience}
                </span>
                <p className="font-serif text-[#302B26] font-medium">
                  {sephira.spiritualExperience}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75 space-y-1">
                <span className="text-[11px] font-semibold text-[#8E6636]">
                  {t.overview.magicalImage}
                </span>
                <p className="font-serif text-[#302B26] font-medium">
                  {sephira.magicalImage}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75 space-y-1">
                <span className="text-[11px] font-semibold text-[#8E6636]">
                  {t.overview.virtue}
                </span>
                <p className="text-[#302B26]">{sephira.virtue}</p>
              </div>

              <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75 space-y-1">
                <span className="text-[11px] font-semibold text-[#8E6636]">
                  {t.overview.vice}
                </span>
                <p className="text-[#302B26]">{sephira.vice}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-serif font-bold tracking-wider text-[#8E6636] mb-2.5 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#8E6636]" />
                {t.overview.fourScales}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {(
                  [
                    { key: 'atziluth', title: t.overview.scaleTitles.atziluth },
                    { key: 'briah', title: t.overview.scaleTitles.briah },
                    { key: 'yetzirah', title: t.overview.scaleTitles.yetzirah },
                    { key: 'assiah', title: t.overview.scaleTitles.assiah },
                  ] as const
                ).map((scale) => (
                  <div
                    key={scale.key}
                    className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75"
                  >
                    {sephira.quarteredColors &&
                    (scale.key === 'briah' || scale.key === 'yetzirah') ? (
                      <div className="w-full h-2.5 rounded-full mb-2 border border-[#302B26]/20 overflow-hidden grid grid-cols-4">
                        <span style={{ backgroundColor: sephira.quarteredColors[0] }} />
                        <span style={{ backgroundColor: sephira.quarteredColors[1] }} />
                        <span style={{ backgroundColor: sephira.quarteredColors[3] }} />
                        <span style={{ backgroundColor: sephira.quarteredColors[2] }} />
                      </div>
                    ) : (
                      <div
                        className="w-full h-2.5 rounded-full mb-2 border border-[#302B26]/20"
                        style={{ backgroundColor: sephira.colors[scale.key] }}
                      />
                    )}
                    <span className="font-semibold text-[#302B26] block text-xs">
                      {scale.title}
                    </span>
                    <span className="text-[#5D554A] text-[11px]">
                      {sephira.colorDescriptions[scale.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {pathItem && activeTab === 'overview' && (
          <div className="space-y-4">
            {(() => {
              const fromSeph = sephirothList.find(
                (s) => s.id === pathItem.fromSephiraId
              );
              const toSeph = sephirothList.find((s) => s.id === pathItem.toSephiraId);
              return (
                <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75 flex items-center justify-between gap-2">
                  <div className="text-center flex-1 min-w-0">
                    <span className="text-[11px] text-[#5D554A] block">{t.overview.from}</span>
                    <span className="text-sm font-serif font-bold text-[#302B26] truncate block">
                      {fromSeph ? `${fromSeph.number}. ${fromSeph.name}` : ''}
                    </span>
                  </div>
                  <div className="px-2 text-[#8E6636] shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-center flex-1 min-w-0">
                    <span className="text-[11px] text-[#5D554A] block">{t.overview.to}</span>
                    <span className="text-sm font-serif font-bold text-[#302B26] truncate block">
                      {toSeph ? `${toSeph.number}. ${toSeph.name}` : ''}
                    </span>
                  </div>
                </div>
              );
            })()}

            <div>
              <h3 className="text-xs font-serif font-bold tracking-wider text-[#8E6636] mb-2">
                {t.overview.pathTitleHeading}
              </h3>
              <p className="text-sm font-serif font-medium text-[#302B26] bg-gradient-to-b from-[#F9F3EA] to-[#F3ECE0] p-3.5 rounded-xl border border-[#C2B5A2]/75">
                &ldquo;{pathItem.name}&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm sm:text-xs">
              <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
                <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                  {t.overview.letterMeaning}
                </span>
                <p className="text-[#302B26] font-medium">{pathItem.letterMeaning}</p>
              </div>

              <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
                <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                  {t.overview.attribution}
                </span>
                <p className="text-[#302B26] font-medium">
                  {getLocalizedAttributionType(pathItem.attributionType, language)}:{' '}
                  {pathItem.attribution} {pathItem.symbolIcon}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-serif font-bold tracking-wider text-[#8E6636] mb-2">
                {t.overview.overviewSymbolism}
              </h3>
              <p className="text-sm sm:text-[13px] text-[#302B26] leading-relaxed bg-gradient-to-b from-[#F9F3EA] to-[#F3ECE0] p-3.5 rounded-xl border border-[#C2B5A2]/75 shadow-xs">
                {pathItem.overview}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-serif font-bold tracking-wider text-[#8E6636] mb-2.5 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#8E6636]" />
                {t.overview.fourScales}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {(
                  [
                    { key: 'atziluth', title: t.overview.scaleTitles.atziluth },
                    { key: 'briah', title: t.overview.scaleTitles.briah },
                    { key: 'yetzirah', title: t.overview.scaleTitles.yetzirah },
                    { key: 'assiah', title: t.overview.scaleTitles.assiah },
                  ] as const
                ).map((scale) => (
                  <div
                    key={scale.key}
                    className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75"
                  >
                    <div
                      className="w-full h-2.5 rounded-full mb-2 border border-[#302B26]/20"
                      style={{ backgroundColor: pathItem.colors[scale.key] }}
                    />
                    <span className="font-semibold text-[#302B26] block text-xs">
                      {scale.title}
                    </span>
                    <span className="text-[#5D554A] text-[11px]">
                      {pathItem.colorDescriptions[scale.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {sephira && activeTab === 'attributions' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm sm:text-xs">
            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.divineName}
              </span>
              <p className="text-sm font-serif font-bold text-[#302B26]">
                {sephira.divineName}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.archangel}
              </span>
              <p className="text-sm font-serif font-bold text-[#302B26]">
                {sephira.archangel}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.planet}
              </span>
              <p className="text-[#302B26] font-medium">{sephira.planet}</p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.astrological}
              </span>
              <p className="text-[#302B26]">{sephira.astrological}</p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.angelicOrder}
              </span>
              <p className="text-[#302B26]">{sephira.angelicOrder}</p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.yetziraticTitle}
              </span>
              <p className="text-[#302B26]">{sephira.yetziraticTitle}</p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.soulPart}
              </span>
              <p className="text-[#302B26]">{sephira.soulPart}</p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.element}
              </span>
              <p className="text-[#302B26]">{sephira.element}</p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.bodyPart}
              </span>
              <p className="text-[#302B26]">{sephira.chakraOrBodyPart}</p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.gemstone}
              </span>
              <p className="text-[#302B26]">{sephira.preciousStone}</p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.incensePlants}
              </span>
              <p className="text-[#302B26]">{sephira.incenseAndPlants}</p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.qliphoth}
              </span>
              <p className="text-[#302B26]">{sephira.qliphoth}</p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75 sm:col-span-2">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.tarotAttribution}
              </span>
              <p className="text-[#302B26]">{sephira.tarotCards}</p>
            </div>

            {sephira.symbols.length > 0 && (
              <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75 sm:col-span-2">
                <span className="text-[11px] font-semibold text-[#8E6636] block mb-2">
                  {t.attributions.symbols}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sephira.symbols.map((sym) => (
                    <span
                      key={sym}
                      className="px-2.5 py-1 rounded-lg bg-[#EAE3D7] border border-[#C2B5A2]/80 text-[#302B26] text-[11px] font-medium"
                    >
                      {sym}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {pathItem && activeTab === 'attributions' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm sm:text-xs">
            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75 sm:col-span-2">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.letterAndMeaning}
              </span>
              <p className="text-sm font-serif font-bold text-[#302B26]">
                {pathItem.hebrewLetter} ({pathItem.hebrewLetterName}) ·{' '}
                {pathItem.letterMeaning}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.tarotKey}
              </span>
              <p className="text-sm font-serif font-bold text-[#302B26]">
                {language === 'pt' ? 'Arcano' : 'Key'} {pathItem.tarotKey} —{' '}
                {pathItem.tarotCardName}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.pathAttribution}
              </span>
              <p className="text-sm font-serif font-bold text-[#302B26]">
                {getLocalizedAttributionType(pathItem.attributionType, language)}:{' '}
                {pathItem.attribution} {pathItem.symbolIcon}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75 sm:col-span-2">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.esotericTitle}
              </span>
              <p className="text-[#302B26] italic">&ldquo;{pathItem.name}&rdquo;</p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75 sm:col-span-2">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.consciousnessAspect}
              </span>
              <p className="text-[#302B26]">{pathItem.consciousnessAspect}</p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75 sm:col-span-2">
              <span className="text-[11px] font-semibold text-[#8E6636] block mb-1">
                {t.attributions.yetziraticText}
              </span>
              <p className="text-[#5D554A] italic leading-relaxed">
                &ldquo;{pathItem.yetziraticText}&rdquo;
              </p>
            </div>
          </div>
        )}

        {sephira && activeTab === 'commentary' && (
          <div className="space-y-3.5">
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#F9F3EA] to-[#F3ECE0] border border-[#C2B5A2]/75 shadow-xs">
              <div className="flex items-center gap-2 text-[#302B26] font-serif font-bold text-sm mb-2">
                <Scroll className="w-4 h-4 text-[#8E6636] shrink-0" />
                {t.commentary.dionFortuneTitle}
              </div>
              <blockquote className="text-sm sm:text-[13px] text-[#5D554A] italic leading-relaxed">
                &ldquo;{sephira.dionFortuneInsight}&rdquo;
              </blockquote>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-b from-[#F9F3EA] to-[#F3ECE0] border border-[#C2B5A2]/75 shadow-xs">
              <div className="flex items-center gap-2 text-[#302B26] font-serif font-bold text-sm mb-2">
                <BookOpen className="w-4 h-4 text-[#8E6636] shrink-0" />
                {t.commentary.israelRegardieTitle}
              </div>
              <blockquote className="text-sm sm:text-[13px] text-[#5D554A] italic leading-relaxed">
                &ldquo;{sephira.regardieInsight}&rdquo;
              </blockquote>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75 space-y-1.5 text-xs">
              <span className="text-[11px] font-semibold text-[#8E6636] block">
                {t.attributions.yetziraticTitle} · {t.attributions.soulPart}
              </span>
              <p className="font-serif font-semibold text-[#302B26]">
                {sephira.yetziraticTitle}
              </p>
              <p className="text-[#5D554A]">{sephira.soulPart}</p>
            </div>
          </div>
        )}

        {pathItem && activeTab === 'commentary' && (
          <div className="space-y-3.5">
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#F9F3EA] to-[#F3ECE0] border border-[#C2B5A2]/75 shadow-xs">
              <div className="flex items-center gap-2 text-[#302B26] font-serif font-bold text-sm mb-2">
                <Scroll className="w-4 h-4 text-[#8E6636] shrink-0" />
                {t.commentary.dionFortunePathTitle}
              </div>
              <blockquote className="text-sm sm:text-[13px] text-[#5D554A] italic leading-relaxed">
                &ldquo;{pathItem.dionFortuneInsight}&rdquo;
              </blockquote>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-b from-[#F9F3EA] to-[#F3ECE0] border border-[#C2B5A2]/75 shadow-xs">
              <div className="flex items-center gap-2 text-[#302B26] font-serif font-bold text-sm mb-2">
                <BookOpen className="w-4 h-4 text-[#8E6636] shrink-0" />
                {t.commentary.israelRegardiePathTitle}
              </div>
              <blockquote className="text-sm sm:text-[13px] text-[#5D554A] italic leading-relaxed">
                &ldquo;{pathItem.regardieInsight}&rdquo;
              </blockquote>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#C2B5A2]/75">
              <div className="flex items-center gap-2 text-[#302B26] font-serif font-bold text-xs mb-1.5">
                <Crown className="w-3.5 h-3.5 text-[#8E6636] shrink-0" />
                {t.commentary.yetziraticTitle}
              </div>
              <p className="text-xs text-[#5D554A] italic leading-relaxed">
                &ldquo;{pathItem.yetziraticText}&rdquo;
              </p>
            </div>
          </div>
        )}

        {activeTab === 'meditation' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#F9F3EA] to-[#F3ECE0] border border-[#C2B5A2]/75 space-y-2.5 shadow-xs">
              <h4 className="text-sm font-serif font-bold text-[#302B26] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8E6636]" />
                {t.meditation.traditionalTitle}
              </h4>
              <p className="text-sm sm:text-[13px] text-[#5D554A] leading-relaxed italic">
                &ldquo;
                {sephira ? sephira.pathworkingGuidance : pathItem?.pathworkingMeditation}
                &rdquo;
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-b from-[#F5EFE6] to-[#F0E9DD] border border-[#8E6636]/45 space-y-3">
              <h4 className="text-sm font-serif font-bold text-[#302B26]">
                {t.meditation.oracleTitle}
              </h4>
              <p className="text-sm sm:text-xs text-[#5D554A] leading-relaxed">
                {t.meditation.oracleDescription(
                  sephira
                    ? sephira.name
                    : language === 'pt'
                    ? `o Caminho ${pathItem?.number}`
                    : `Path ${pathItem?.number}`
                )}
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose?.();
                  onGenerateAiMeditation(
                    sephira
                      ? sephira.name
                      : `${language === 'pt' ? 'Caminho' : 'Path'} ${pathItem?.number} (${
                          pathItem?.hebrewLetterName
                        } - ${pathItem?.tarotCardName})`,
                    sephira ? 'sephira' : 'path'
                  );
                }}
                className="w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8E6636] to-[#745126] text-[#F9F3EA] font-bold text-xs uppercase tracking-wider transition-all hover:brightness-110 active:scale-[0.99] flex items-center justify-center gap-2 shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                {t.meditation.generateButton}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface EntityDetailDrawerProps {
  language: Language;
  sephira: Sephira | null;
  pathItem: Path | null;
  onClose: () => void;
  onGenerateAiMeditation: (entityName: string, entityType: 'sephira' | 'path') => void;
}

export default function EntityDetailDrawer({
  language,
  sephira,
  pathItem,
  onClose,
  onGenerateAiMeditation,
}: EntityDetailDrawerProps) {
  const [isTabletOrUp, setIsTabletOrUp] = useState(false);

  const isOpen = Boolean(sephira || pathItem);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsTabletOrUp(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  const sheetVariants = isTabletOrUp
    ? {
        initial: { x: '100%', y: 0 },
        animate: { x: 0, y: 0 },
        exit: { x: '100%', y: 0 },
      }
    : {
        initial: { x: 0, y: '100%' },
        animate: { x: 0, y: 0 },
        exit: { x: 0, y: '100%' },
      };

  const dialogAriaLabel = sephira
    ? `${sephira.name}`
    : `${language === 'pt' ? 'Caminho' : 'Path'} ${pathItem?.number}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={dialogAriaLabel}
          className="fixed inset-0 z-50 flex items-end md:items-stretch md:justify-end pointer-events-none"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1F242C]/45 backdrop-blur-xs pointer-events-auto"
          />

          {/* Bottom Sheet on Mobile (< md), Right Drawer on Tablet & Desktop (md+) */}
          <motion.aside
            key={isTabletOrUp ? 'drawer-desktop' : 'sheet-mobile'}
            initial={sheetVariants.initial}
            animate={sheetVariants.animate}
            exit={sheetVariants.exit}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            drag={isTabletOrUp ? false : 'y'}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.45 }}
            onDragEnd={(_, info) => {
              if (!isTabletOrUp && (info.offset.y > 110 || info.velocity.y > 500)) {
                onClose();
              }
            }}
            className="relative w-full md:max-w-lg lg:max-w-xl max-h-[86dvh] md:max-h-none md:h-full bg-gradient-to-b from-[#EAE4D8] to-[#D6CCBC] border-t md:border-t-0 md:border-l border-[#C2B5A2] rounded-t-3xl md:rounded-none shadow-2xl flex flex-col pointer-events-auto z-10 overflow-hidden"
          >
            {/* Mobile Drag Handle */}
            <div className="md:hidden pt-3 pb-1 flex justify-center bg-[#DDD6CA] shrink-0">
              <div className="w-10 h-1.5 rounded-full bg-[#C2B5A2]" aria-hidden="true" />
            </div>

            <EntityDetailContent
              language={language}
              sephira={sephira}
              pathItem={pathItem}
              onClose={onClose}
              onGenerateAiMeditation={onGenerateAiMeditation}
            />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
