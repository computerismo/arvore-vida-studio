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
        <div className="w-14 h-14 rounded-2xl bg-[#121218] border border-[#c5a059]/35 flex items-center justify-center">
          <Compass className="w-7 h-7 text-[#c5a059]" />
        </div>
        <div className="space-y-1.5 max-w-sm">
          <h3 className="font-serif text-lg font-bold text-[#f0f0f5]">
            Select a Sphere or Path
          </h3>
          <p className="text-xs text-[#9a9aa6] leading-relaxed">
            Tap any of the 10 Sephiroth, Da&apos;ath, or 22 Hebrew letter paths on the Tree
            of Life to inspect divine names, Golden Dawn color scales, Tarot keys, and
            pathworking commentary here.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2.5 w-full max-w-xs pt-2">
          <div className="p-2.5 rounded-xl bg-[#101016] border border-[#22222a]">
            <div className="font-serif font-bold text-base text-[#c5a059] tabular-nums">10</div>
            <div className="text-[10px] text-[#8e8e98]">Sephiroth</div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101016] border border-[#22222a]">
            <div className="font-serif font-bold text-base text-[#c5a059] tabular-nums">22</div>
            <div className="text-[10px] text-[#8e8e98]">Paths</div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101016] border border-[#22222a]">
            <div className="font-serif font-bold text-base text-[#c5a059] tabular-nums">4</div>
            <div className="text-[10px] text-[#8e8e98]">Color Scales</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0 text-[#e0e0e0]">
      {/* Header */}
      <div
        className={`${
          embedded ? 'px-4 py-3.5' : 'px-4 py-3.5 sm:p-5 md:p-6'
        } border-b border-[#222228] bg-[#0c0c10] flex items-start justify-between gap-3 shrink-0`}
      >
        {sephira ? (
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg shrink-0"
              style={{
                backgroundColor: sephira.colors.briah || '#141418',
                borderColor: '#c5a059',
              }}
            >
              <span className="font-serif font-bold text-xl text-white drop-shadow">
                {sephira.hebrewName}
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-mono">
                <span className="text-[#c5a059] font-semibold">
                  {sephira.number === 0 ? "Da'ath" : `Sphere ${sephira.number}`}
                </span>
                <span className="text-[#52525b]" aria-hidden="true">·</span>
                <span className="text-[#a0a0a8]">{sephira.pillar} Pillar</span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#f2f2f5] mt-0.5 truncate">
                {sephira.name}
              </h2>
              <p className="text-xs text-[#a0a0a8] italic truncate">
                &ldquo;{sephira.translation}&rdquo;
              </p>
            </div>
          </div>
        ) : pathItem ? (
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-[#111116] border-2 border-[#c5a059] flex items-center justify-center text-2xl font-serif font-bold text-[#c5a059] shadow-lg shrink-0">
              {pathItem.hebrewLetter}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-mono">
                <span className="text-[#c5a059] font-semibold">
                  Path {pathItem.number} ({pathItem.hebrewLetterName})
                </span>
                <span className="text-[#52525b]" aria-hidden="true">·</span>
                <span className="text-[#a0a0a8]">
                  {pathItem.attribution} {pathItem.symbolIcon}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#f2f2f5] mt-0.5 truncate">
                {pathItem.tarotCardName}
              </h2>
              <p className="text-xs text-[#a0a0a8] italic truncate">
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
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-[#14141a] hover:bg-[#202028] text-[#a0a0a8] hover:text-white transition-colors border border-[#2b2b34] shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div
        role="tablist"
        className="flex border-b border-[#222228] bg-[#0a0a0e] px-2 sm:px-3 gap-1 text-xs overflow-x-auto no-scrollbar shrink-0"
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
                  ? 'border-[#c5a059] text-[#e8c982] bg-[#c5a059]/10 font-semibold'
                  : 'border-transparent text-[#8e8e98] hover:text-[#e0e0e0]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-[#c5a059]" />
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
              <h3 className="text-xs font-serif font-bold tracking-wider text-[#c5a059] mb-2 flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#c5a059]" />
                Core Symbolism &amp; Essence
              </h3>
              <p className="text-[#c0c0ca] leading-relaxed text-sm sm:text-[13px] bg-[#101015] p-3.5 rounded-xl border border-[#22222a]">
                {sephira.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm sm:text-xs">
              <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a] space-y-1">
                <span className="text-[11px] font-semibold text-[#c5a059]">
                  Spiritual Experience
                </span>
                <p className="font-serif text-[#f0f0f5] font-medium">
                  {sephira.spiritualExperience}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a] space-y-1">
                <span className="text-[11px] font-semibold text-[#c5a059]">
                  Magical Image
                </span>
                <p className="font-serif text-[#f0f0f5] font-medium">
                  {sephira.magicalImage}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a] space-y-1">
                <span className="text-[11px] font-semibold text-[#c5a059]">Virtue</span>
                <p className="text-[#b8b8c2]">{sephira.virtue}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a] space-y-1">
                <span className="text-[11px] font-semibold text-[#c5a059]">
                  Vice / Illusion
                </span>
                <p className="text-[#b8b8c2]">{sephira.vice}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-serif font-bold tracking-wider text-[#c5a059] mb-2.5 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#c5a059]" />
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
                    className="p-3 rounded-xl bg-[#101015] border border-[#22222a]"
                  >
                    <div
                      className="w-full h-2.5 rounded-full mb-2 border border-white/15"
                      style={{ backgroundColor: sephira.colors[scale.key] }}
                    />
                    <span className="font-semibold text-[#e8c982] block text-xs">
                      {scale.title}
                    </span>
                    <span className="text-[#9a9aa6] text-[11px]">
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
                <div className="p-3.5 rounded-xl bg-[#101015] border border-[#22222a] flex items-center justify-between gap-2">
                  <div className="text-center flex-1 min-w-0">
                    <span className="text-[11px] text-[#8e8e98] block">From</span>
                    <span className="text-sm font-serif font-bold text-[#e8c982] truncate block">
                      {fromSeph ? `${fromSeph.number}. ${fromSeph.name}` : ''}
                    </span>
                  </div>
                  <div className="px-2 text-[#c5a059] shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-center flex-1 min-w-0">
                    <span className="text-[11px] text-[#8e8e98] block">To</span>
                    <span className="text-sm font-serif font-bold text-[#e8c982] truncate block">
                      {toSeph ? `${toSeph.number}. ${toSeph.name}` : ''}
                    </span>
                  </div>
                </div>
              );
            })()}

            <div>
              <h3 className="text-xs font-serif font-bold tracking-wider text-[#c5a059] mb-2">
                Path Title &amp; Esoteric Intelligence
              </h3>
              <p className="text-sm font-serif font-medium text-[#f0f0f5] bg-[#101015] p-3.5 rounded-xl border border-[#22222a]">
                &ldquo;{pathItem.name}&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm sm:text-xs">
              <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a]">
                <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                  Hebrew Letter Meaning
                </span>
                <p className="text-[#c0c0ca] font-medium">{pathItem.letterMeaning}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a]">
                <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                  Attribution
                </span>
                <p className="text-[#c0c0ca] font-medium">
                  {pathItem.attributionType}: {pathItem.attribution} {pathItem.symbolIcon}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-serif font-bold tracking-wider text-[#c5a059] mb-2">
                Overview &amp; Symbolism
              </h3>
              <p className="text-sm sm:text-[13px] text-[#c0c0ca] leading-relaxed bg-[#101015] p-3.5 rounded-xl border border-[#22222a]">
                {pathItem.overview}
              </p>
            </div>
          </div>
        )}

        {sephira && activeTab === 'attributions' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm sm:text-xs">
            <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a]">
              <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                Divine Name
              </span>
              <p className="text-sm font-serif font-bold text-[#f0f0f5]">
                {sephira.divineName}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a]">
              <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                Archangel
              </span>
              <p className="text-sm font-serif font-bold text-[#f0f0f5]">
                {sephira.archangel}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a]">
              <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                Angelic Order
              </span>
              <p className="text-[#c0c0ca]">{sephira.angelicOrder}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a]">
              <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                Astrological
              </span>
              <p className="text-[#c0c0ca]">{sephira.astrological}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a]">
              <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                Element
              </span>
              <p className="text-[#c0c0ca]">{sephira.element}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a]">
              <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                Microcosm / Body Part
              </span>
              <p className="text-[#c0c0ca]">{sephira.chakraOrBodyPart}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a]">
              <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                Gemstone
              </span>
              <p className="text-[#c0c0ca]">{sephira.preciousStone}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a]">
              <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                Incense &amp; Botanicals
              </span>
              <p className="text-[#c0c0ca]">{sephira.incenseAndPlants}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a] sm:col-span-2">
              <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                Tarot Attribution
              </span>
              <p className="text-[#c0c0ca]">{sephira.tarotCards}</p>
            </div>
          </div>
        )}

        {pathItem && activeTab === 'attributions' && (
          <div className="grid grid-cols-1 gap-2.5 text-sm sm:text-xs">
            <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a]">
              <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                Hebrew Letter &amp; Meaning
              </span>
              <p className="text-sm font-serif font-bold text-[#f0f0f5]">
                {pathItem.hebrewLetter} ({pathItem.hebrewLetterName}) ·{' '}
                {pathItem.letterMeaning}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a]">
              <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                Tarot Key
              </span>
              <p className="text-sm font-serif font-bold text-[#f0f0f5]">
                Key {pathItem.tarotKey} — {pathItem.tarotCardName}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#101015] border border-[#22222a]">
              <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                Esoteric Title
              </span>
              <p className="text-[#c0c0ca] italic">&ldquo;{pathItem.name}&rdquo;</p>
            </div>
          </div>
        )}

        {sephira && activeTab === 'commentary' && (
          <div className="space-y-3.5">
            <div className="p-4 rounded-xl bg-[#101015] border border-[#22222a]">
              <div className="flex items-center gap-2 text-[#e8c982] font-serif font-bold text-sm mb-2">
                <Scroll className="w-4 h-4 text-[#c5a059] shrink-0" />
                Dion Fortune — &ldquo;The Mystical Qabalah&rdquo;
              </div>
              <blockquote className="text-sm sm:text-[13px] text-[#c0c0ca] italic leading-relaxed">
                &ldquo;{sephira.dionFortuneInsight}&rdquo;
              </blockquote>
            </div>

            <div className="p-4 rounded-xl bg-[#101015] border border-[#22222a]">
              <div className="flex items-center gap-2 text-[#e8c982] font-serif font-bold text-sm mb-2">
                <BookOpen className="w-4 h-4 text-[#c5a059] shrink-0" />
                Israel Regardie — &ldquo;The Garden of Pomegranates&rdquo;
              </div>
              <blockquote className="text-sm sm:text-[13px] text-[#c0c0ca] italic leading-relaxed">
                &ldquo;{sephira.regardieInsight}&rdquo;
              </blockquote>
            </div>
          </div>
        )}

        {pathItem && activeTab === 'commentary' && (
          <div className="space-y-3.5">
            <div className="p-4 rounded-xl bg-[#101015] border border-[#22222a]">
              <div className="flex items-center gap-2 text-[#e8c982] font-serif font-bold text-sm mb-2">
                <BookOpen className="w-4 h-4 text-[#c5a059] shrink-0" />
                Traditional Hermetic Path Attribution
              </div>
              <p className="text-sm sm:text-[13px] text-[#c0c0ca] leading-relaxed">
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
            <div className="p-4 rounded-xl bg-[#101015] border border-[#22222a] space-y-2.5">
              <h4 className="text-sm font-serif font-bold text-[#e8c982] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                Traditional Pathworking Meditation
              </h4>
              <p className="text-sm sm:text-[13px] text-[#c0c0ca] leading-relaxed italic">
                &ldquo;
                {sephira ? sephira.pathworkingGuidance : pathItem?.pathworkingMeditation}
                &rdquo;
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#101015] border border-[#c5a059]/45 space-y-3">
              <h4 className="text-sm font-serif font-bold text-[#e8c982]">
                Guided Pathworking Oracle
              </h4>
              <p className="text-sm sm:text-xs text-[#b0b0ba] leading-relaxed">
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
                className="w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#a6833f] text-black font-bold text-xs uppercase tracking-wider transition-all hover:brightness-110 active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg"
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
            className="fixed inset-0 bg-black/70 backdrop-blur-xs pointer-events-auto"
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
            className="relative w-full md:max-w-lg lg:max-w-xl max-h-[86dvh] md:max-h-none md:h-full bg-[#08080b] border-t md:border-t-0 md:border-l border-[#c5a059]/35 rounded-t-3xl md:rounded-none shadow-2xl flex flex-col pointer-events-auto z-10 overflow-hidden"
          >
            {/* Mobile Drag Handle */}
            <div className="md:hidden pt-3 pb-1 flex justify-center bg-[#0c0c10] shrink-0">
              <div className="w-10 h-1.5 rounded-full bg-[#32323c]" aria-hidden="true" />
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
