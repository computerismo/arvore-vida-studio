'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sephira, Path, SEPHIROTH_DATA } from '@/lib/qabalah-data';
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
  sephira: Sephira | null;
  pathItem: Path | null;
  onClose?: () => void;
  onGenerateAiMeditation: (entityName: string, entityType: 'sephira' | 'path') => void;
  embedded?: boolean;
}

export function EntityDetailContent({
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

  const entityKey = sephira ? `s-${sephira.id}` : pathItem ? `p-${pathItem.id}` : '';
  const activeTab = tabState.entityKey === entityKey ? tabState.tab : 'overview';
  const setActiveTab = (
    tab: 'overview' | 'attributions' | 'commentary' | 'meditation'
  ) => setTabState({ entityKey, tab });

  if (!sephira && !pathItem) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[#cfd6e2] border border-[#8c631a]/40 flex items-center justify-center">
          <Compass className="w-7 h-7 text-[#7c5814]" />
        </div>
        <div className="space-y-1.5 max-w-sm">
          <h3 className="font-serif text-lg font-bold text-[#161e2e]">
            Select a Sphere or Path
          </h3>
          <p className="text-xs text-[#4b576e] leading-relaxed">
            Tap any of the 10 Sephiroth, Da&apos;ath, or 22 Hebrew letter paths on the Tree
            of Life to inspect divine names, Golden Dawn color scales, Tarot keys, and
            pathworking commentary here.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2.5 w-full max-w-xs pt-2">
          <div className="p-2.5 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
            <div className="font-serif font-bold text-base text-[#7c5814] tabular-nums">10</div>
            <div className="text-[10px] text-[#4b576e]">Sephiroth</div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
            <div className="font-serif font-bold text-base text-[#7c5814] tabular-nums">22</div>
            <div className="text-[10px] text-[#4b576e]">Paths</div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
            <div className="font-serif font-bold text-base text-[#7c5814] tabular-nums">4</div>
            <div className="text-[10px] text-[#4b576e]">Color Scales</div>
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
    <div className="flex flex-col h-full min-h-0 text-[#161e2e]">
      {/* Header */}
      <div
        className={`${
          embedded ? 'px-4 py-3.5' : 'px-4 py-3.5 sm:p-5 md:p-6'
        } border-b border-[#b3bdd0] bg-[#d4dbe6] flex items-start justify-between gap-3 shrink-0`}
      >
        {sephira ? (
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className="relative w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-md shrink-0 overflow-hidden"
              style={{
                background: sephira.quarteredColors
                  ? `conic-gradient(from -45deg, ${sephira.quarteredColors[0]} 0deg 90deg, ${sephira.quarteredColors[1]} 90deg 180deg, ${sephira.quarteredColors[2]} 180deg 270deg, ${sephira.quarteredColors[3]} 270deg 360deg)`
                  : sephira.colors.briah || '#1b2232',
                borderColor: '#8c631a',
              }}
            >
              {sephira.quarteredColors && (
                <div className="absolute inset-[5px] rounded-full bg-[#f7f5ee] border border-[#6b6658]/60" />
              )}
              <span
                className={`relative z-10 font-serif font-bold text-xl ${
                  isLightBriah ? 'text-[#161e2e]' : 'text-[#fffefa]'
                }`}
              >
                {sephira.hebrewName}
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-mono">
                <span className="text-[#7c5814] font-semibold">
                  {sephira.number === 0 ? "Da'ath" : `Sphere ${sephira.number}`}
                </span>
                <span className="text-[#8291a8]" aria-hidden="true">·</span>
                <span className="text-[#4b576e]">{sephira.pillar} Pillar</span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#161e2e] mt-0.5 truncate">
                {sephira.name}
              </h2>
              <p className="text-xs text-[#4b576e] italic truncate">
                &ldquo;{sephira.translation}&rdquo;
              </p>
            </div>
          </div>
        ) : pathItem ? (
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className="w-12 h-12 rounded-2xl bg-[#1b2232] border-2 flex items-center justify-center text-2xl font-serif font-bold text-[#e8c982] shadow-md shrink-0"
              style={{ borderColor: pathItem.colors.atziluth || '#8c631a' }}
            >
              {pathItem.hebrewLetter}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-mono">
                <span className="text-[#7c5814] font-semibold">
                  Path {pathItem.number} ({pathItem.hebrewLetterName})
                </span>
                <span className="text-[#8291a8]" aria-hidden="true">·</span>
                <span className="text-[#4b576e]">
                  {pathItem.attribution} {pathItem.symbolIcon}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#161e2e] mt-0.5 truncate">
                {pathItem.tarotCardName}
              </h2>
              <p className="text-xs text-[#4b576e] italic truncate">
                Tarot Key {pathItem.tarotKey} · {pathItem.name}
              </p>
            </div>
          </div>
        ) : null}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details panel"
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-[#c5cede] hover:bg-[#b8c3d6] text-[#2c364a] hover:text-[#161e2e] transition-colors border border-[#aeb9cc] shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div
        role="tablist"
        className="flex border-b border-[#b3bdd0] bg-[#d8dfe9] px-2 sm:px-3 gap-1 text-xs overflow-x-auto no-scrollbar shrink-0"
      >
        {(
          [
            { id: 'overview', label: 'Overview', icon: Crown },
            { id: 'attributions', label: 'Attributions', icon: Compass },
            { id: 'commentary', label: 'Excerpts', icon: BookOpen },
            { id: 'meditation', label: 'Pathworking', icon: Sparkles },
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
                  ? 'border-[#8c631a] text-[#5e400b] bg-[#9a7022]/12 font-semibold'
                  : 'border-transparent text-[#4b576e] hover:text-[#161e2e]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-[#7c5814]" />
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
              <h3 className="text-xs font-serif font-bold tracking-wider text-[#7c5814] mb-2 flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#7c5814]" />
                Core Symbolism &amp; Essence
              </h3>
              <p className="text-[#242e42] leading-relaxed text-sm sm:text-[13px] bg-[#cfd6e2] p-3.5 rounded-xl border border-[#b3bdd0]">
                {sephira.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm sm:text-xs">
              <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0] space-y-1">
                <span className="text-[11px] font-semibold text-[#7c5814]">
                  Spiritual Experience
                </span>
                <p className="font-serif text-[#161e2e] font-medium">
                  {sephira.spiritualExperience}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0] space-y-1">
                <span className="text-[11px] font-semibold text-[#7c5814]">
                  Magical Image
                </span>
                <p className="font-serif text-[#161e2e] font-medium">
                  {sephira.magicalImage}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0] space-y-1">
                <span className="text-[11px] font-semibold text-[#7c5814]">Virtue</span>
                <p className="text-[#2c364a]">{sephira.virtue}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0] space-y-1">
                <span className="text-[11px] font-semibold text-[#7c5814]">
                  Vice / Illusion
                </span>
                <p className="text-[#2c364a]">{sephira.vice}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-serif font-bold tracking-wider text-[#7c5814] mb-2.5 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#7c5814]" />
                Golden Dawn Four Color Scales
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {(
                  [
                    { key: 'atziluth', title: 'Atziluth (Archetypal)' },
                    { key: 'briah', title: 'Briah (Creative)' },
                    { key: 'yetzirah', title: 'Yetzirah (Formative)' },
                    { key: 'assiah', title: 'Assiah (Material)' },
                  ] as const
                ).map((scale) => (
                  <div
                    key={scale.key}
                    className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]"
                  >
                    {sephira.quarteredColors && (scale.key === 'briah' || scale.key === 'yetzirah') ? (
                      <div className="w-full h-2.5 rounded-full mb-2 border border-[#161e2e]/20 overflow-hidden grid grid-cols-4">
                        <span style={{ backgroundColor: sephira.quarteredColors[0] }} />
                        <span style={{ backgroundColor: sephira.quarteredColors[1] }} />
                        <span style={{ backgroundColor: sephira.quarteredColors[3] }} />
                        <span style={{ backgroundColor: sephira.quarteredColors[2] }} />
                      </div>
                    ) : (
                      <div
                        className="w-full h-2.5 rounded-full mb-2 border border-[#161e2e]/20"
                        style={{ backgroundColor: sephira.colors[scale.key] }}
                      />
                    )}
                    <span className="font-semibold text-[#5e400b] block text-xs">
                      {scale.title}
                    </span>
                    <span className="text-[#4b576e] text-[11px]">
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
              const fromSeph = SEPHIROTH_DATA.find(
                (s) => s.id === pathItem.fromSephiraId
              );
              const toSeph = SEPHIROTH_DATA.find((s) => s.id === pathItem.toSephiraId);
              return (
                <div className="p-3.5 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0] flex items-center justify-between gap-2">
                  <div className="text-center flex-1 min-w-0">
                    <span className="text-[11px] text-[#4b576e] block">From</span>
                    <span className="text-sm font-serif font-bold text-[#5e400b] truncate block">
                      {fromSeph ? `${fromSeph.number}. ${fromSeph.name}` : ''}
                    </span>
                  </div>
                  <div className="px-2 text-[#7c5814] shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-center flex-1 min-w-0">
                    <span className="text-[11px] text-[#4b576e] block">To</span>
                    <span className="text-sm font-serif font-bold text-[#5e400b] truncate block">
                      {toSeph ? `${toSeph.number}. ${toSeph.name}` : ''}
                    </span>
                  </div>
                </div>
              );
            })()}

            <div>
              <h3 className="text-xs font-serif font-bold tracking-wider text-[#7c5814] mb-2">
                Path Title &amp; Esoteric Intelligence
              </h3>
              <p className="text-sm font-serif font-medium text-[#161e2e] bg-[#cfd6e2] p-3.5 rounded-xl border border-[#b3bdd0]">
                &ldquo;{pathItem.name}&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm sm:text-xs">
              <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
                <span className="text-[11px] font-semibold text-[#7c5814] block mb-1">
                  Hebrew Letter Meaning
                </span>
                <p className="text-[#242e42] font-medium">{pathItem.letterMeaning}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
                <span className="text-[11px] font-semibold text-[#7c5814] block mb-1">
                  Attribution
                </span>
                <p className="text-[#242e42] font-medium">
                  {pathItem.attributionType}: {pathItem.attribution} {pathItem.symbolIcon}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-serif font-bold tracking-wider text-[#7c5814] mb-2">
                Overview &amp; Symbolism
              </h3>
              <p className="text-sm sm:text-[13px] text-[#242e42] leading-relaxed bg-[#cfd6e2] p-3.5 rounded-xl border border-[#b3bdd0]">
                {pathItem.overview}
              </p>
            </div>
          </div>
        )}

        {sephira && activeTab === 'attributions' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm sm:text-xs">
            <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
              <span className="text-[11px] font-semibold text-[#7c5814] block mb-1">
                Divine Name
              </span>
              <p className="text-sm font-serif font-bold text-[#161e2e]">
                {sephira.divineName}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
              <span className="text-[11px] font-semibold text-[#7c5814] block mb-1">
                Archangel
              </span>
              <p className="text-sm font-serif font-bold text-[#161e2e]">
                {sephira.archangel}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
              <span className="text-[11px] font-semibold text-[#7c5814] block mb-1">
                Angelic Order
              </span>
              <p className="text-[#242e42]">{sephira.angelicOrder}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
              <span className="text-[11px] font-semibold text-[#7c5814] block mb-1">
                Astrological
              </span>
              <p className="text-[#242e42]">{sephira.astrological}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
              <span className="text-[11px] font-semibold text-[#7c5814] block mb-1">
                Element
              </span>
              <p className="text-[#242e42]">{sephira.element}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
              <span className="text-[11px] font-semibold text-[#7c5814] block mb-1">
                Microcosm / Body Part
              </span>
              <p className="text-[#242e42]">{sephira.chakraOrBodyPart}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
              <span className="text-[11px] font-semibold text-[#7c5814] block mb-1">
                Gemstone
              </span>
              <p className="text-[#242e42]">{sephira.preciousStone}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
              <span className="text-[11px] font-semibold text-[#7c5814] block mb-1">
                Incense &amp; Botanicals
              </span>
              <p className="text-[#242e42]">{sephira.incenseAndPlants}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0] sm:col-span-2">
              <span className="text-[11px] font-semibold text-[#7c5814] block mb-1">
                Tarot Attribution
              </span>
              <p className="text-[#242e42]">{sephira.tarotCards}</p>
            </div>
          </div>
        )}

        {pathItem && activeTab === 'attributions' && (
          <div className="grid grid-cols-1 gap-2.5 text-sm sm:text-xs">
            <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
              <span className="text-[11px] font-semibold text-[#7c5814] block mb-1">
                Hebrew Letter &amp; Meaning
              </span>
              <p className="text-sm font-serif font-bold text-[#161e2e]">
                {pathItem.hebrewLetter} ({pathItem.hebrewLetterName}) ·{' '}
                {pathItem.letterMeaning}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
              <span className="text-[11px] font-semibold text-[#7c5814] block mb-1">
                Tarot Key
              </span>
              <p className="text-sm font-serif font-bold text-[#161e2e]">
                Key {pathItem.tarotKey} — {pathItem.tarotCardName}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
              <span className="text-[11px] font-semibold text-[#7c5814] block mb-1">
                Esoteric Title
              </span>
              <p className="text-[#242e42] italic">&ldquo;{pathItem.name}&rdquo;</p>
            </div>
          </div>
        )}

        {sephira && activeTab === 'commentary' && (
          <div className="space-y-3.5">
            <div className="p-4 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
              <div className="flex items-center gap-2 text-[#5e400b] font-serif font-bold text-sm mb-2">
                <Scroll className="w-4 h-4 text-[#7c5814] shrink-0" />
                Dion Fortune — &ldquo;The Mystical Qabalah&rdquo;
              </div>
              <blockquote className="text-sm sm:text-[13px] text-[#242e42] italic leading-relaxed">
                &ldquo;{sephira.dionFortuneInsight}&rdquo;
              </blockquote>
            </div>

            <div className="p-4 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
              <div className="flex items-center gap-2 text-[#5e400b] font-serif font-bold text-sm mb-2">
                <BookOpen className="w-4 h-4 text-[#7c5814] shrink-0" />
                Israel Regardie — &ldquo;The Garden of Pomegranates&rdquo;
              </div>
              <blockquote className="text-sm sm:text-[13px] text-[#242e42] italic leading-relaxed">
                &ldquo;{sephira.regardieInsight}&rdquo;
              </blockquote>
            </div>
          </div>
        )}

        {pathItem && activeTab === 'commentary' && (
          <div className="space-y-3.5">
            <div className="p-4 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0]">
              <div className="flex items-center gap-2 text-[#5e400b] font-serif font-bold text-sm mb-2">
                <BookOpen className="w-4 h-4 text-[#7c5814] shrink-0" />
                Traditional Hermetic Path Attribution
              </div>
              <p className="text-sm sm:text-[13px] text-[#242e42] leading-relaxed">
                Path {pathItem.number} connects {pathItem.fromSephiraId.toUpperCase()} to{' '}
                {pathItem.toSephiraId.toUpperCase()}. In 777 correspondences, it represents
                the transformative bridge governed by {pathItem.tarotCardName} and the
                astrological or elemental force of {pathItem.attribution}.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'meditation' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0] space-y-2.5">
              <h4 className="text-sm font-serif font-bold text-[#5e400b] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#7c5814]" />
                Traditional Pathworking Meditation
              </h4>
              <p className="text-sm sm:text-[13px] text-[#242e42] leading-relaxed italic">
                &ldquo;
                {sephira ? sephira.pathworkingGuidance : pathItem?.pathworkingMeditation}
                &rdquo;
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#cfd6e2] border border-[#8c631a]/50 space-y-3">
              <h4 className="text-sm font-serif font-bold text-[#5e400b]">
                Guided Pathworking Oracle
              </h4>
              <p className="text-sm sm:text-xs text-[#2c364a] leading-relaxed">
                Generate an expanded step-by-step guided meditation journey specifically
                tailored to {sephira ? sephira.name : `Path ${pathItem?.number}`}.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose?.();
                  onGenerateAiMeditation(
                    sephira
                      ? sephira.name
                      : `Path ${pathItem?.number} (${pathItem?.hebrewLetterName} - ${pathItem?.tarotCardName})`,
                    sephira ? 'sephira' : 'path'
                  );
                }}
                className="w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8f681d] to-[#745112] text-[#f5f1e6] font-bold text-xs uppercase tracking-wider transition-all hover:brightness-110 active:scale-[0.99] flex items-center justify-center gap-2 shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                Generate Guided Meditation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface EntityDetailDrawerProps {
  sephira: Sephira | null;
  pathItem: Path | null;
  onClose: () => void;
  onGenerateAiMeditation: (entityName: string, entityType: 'sephira' | 'path') => void;
}

export default function EntityDetailDrawer({
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            sephira ? `${sephira.name} details` : `Path ${pathItem?.number} details`
          }
          className="fixed inset-0 z-50 flex items-end md:items-stretch md:justify-end pointer-events-none"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#161e2e]/45 backdrop-blur-xs pointer-events-auto"
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
            className="relative w-full md:max-w-lg lg:max-w-xl max-h-[86dvh] md:max-h-none md:h-full bg-[#dce2ec] border-t md:border-t-0 md:border-l border-[#8c631a]/45 rounded-t-3xl md:rounded-none shadow-2xl flex flex-col pointer-events-auto z-10 overflow-hidden"
          >
            {/* Mobile Drag Handle */}
            <div className="md:hidden pt-3 pb-1 flex justify-center bg-[#d4dbe6] shrink-0">
              <div className="w-10 h-1.5 rounded-full bg-[#98a4b8]" aria-hidden="true" />
            </div>

            <EntityDetailContent
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
