'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sephira } from '@/lib/qabalah-data';
import { X, Sparkles, BookOpen, Crown, Compass, Flame, Scroll } from 'lucide-react';

interface SephiraDetailModalProps {
  sephira: Sephira | null;
  onClose: () => void;
  onGenerateAiMeditation: (entityName: string, entityType: 'sephira' | 'path') => void;
}

export default function SephiraDetailModal({
  sephira,
  onClose,
  onGenerateAiMeditation,
}: SephiraDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'attributions' | 'commentary' | 'meditation'>('overview');

  if (!sephira) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#08080a] border border-[#c5a059] rounded-xl shadow-2xl flex flex-col overflow-hidden text-[#e0e0e0]"
        >
          {/* Header Banner */}
          <div className="relative p-6 border-b border-[#2d2d30] bg-[#141417] flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center border shadow-md"
                style={{
                  backgroundColor: sephira.colors.briah,
                  borderColor: '#c5a059',
                }}
              >
                <span className="font-serif font-bold text-2xl text-slate-950">
                  {sephira.hebrewName}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#c5a059] font-mono text-xs font-bold border border-[#c5a059]/40">
                    {sephira.number === 0 ? 'Da\'ath' : `Sphere ${sephira.number}`}
                  </span>
                  <span className="text-xs text-[#c5a059] uppercase tracking-widest font-mono">
                    {sephira.pillar} Pillar
                  </span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#e0e0e0] mt-0.5">
                  {sephira.name}
                  <span className="text-[#a0a0a0] font-normal text-lg ml-2 font-sans">
                    — &quot;{sephira.translation}&quot;
                  </span>
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#08080a] hover:bg-[#141417] text-[#a0a0a0] hover:text-[#e0e0e0] transition-colors border border-[#2d2d30]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#2d2d30] bg-[#08080a] px-6 gap-2 text-xs overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap uppercase tracking-wider ${
                activeTab === 'overview'
                  ? 'border-[#c5a059] text-[#c5a059] bg-[#c5a059]/10'
                  : 'border-transparent text-[#808080] hover:text-[#e0e0e0]'
              }`}
            >
              <Crown className="w-4 h-4 text-[#c5a059]" />
              Overview &amp; Vision
            </button>
            <button
              onClick={() => setActiveTab('attributions')}
              className={`py-3 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap uppercase tracking-wider ${
                activeTab === 'attributions'
                  ? 'border-[#c5a059] text-[#c5a059] bg-[#c5a059]/10'
                  : 'border-transparent text-[#808080] hover:text-[#e0e0e0]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#c5a059]" />
              Hermetic Attributions
            </button>
            <button
              onClick={() => setActiveTab('commentary')}
              className={`py-3 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap uppercase tracking-wider ${
                activeTab === 'commentary'
                  ? 'border-[#c5a059] text-[#c5a059] bg-[#c5a059]/10'
                  : 'border-transparent text-[#808080] hover:text-[#e0e0e0]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#c5a059]" />
              Fortune &amp; Regardie Excerpts
            </button>
            <button
              onClick={() => setActiveTab('meditation')}
              className={`py-3 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap uppercase tracking-wider ${
                activeTab === 'meditation'
                  ? 'border-[#c5a059] text-[#c5a059] bg-[#c5a059]/10'
                  : 'border-transparent text-[#808080] hover:text-[#e0e0e0]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              Pathworking &amp; AI Guide
            </button>
          </div>

          {/* Modal Content Area */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#e0e0e0]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-semibold text-[#c5a059] mb-2">
                    Core Symbolism
                  </h3>
                  <p className="text-[#a0a0a0] leading-relaxed text-xs bg-[#141417] p-4 rounded border border-[#2d2d30]">
                    {sephira.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded bg-[#141417] border border-[#2d2d30] space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#c5a059]">
                      Spiritual Experience
                    </span>
                    <p className="text-xs font-medium text-[#e0e0e0]">
                      {sephira.spiritualExperience}
                    </p>
                  </div>

                  <div className="p-4 rounded bg-[#141417] border border-[#2d2d30] space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#c5a059]">
                      Magical Image
                    </span>
                    <p className="text-xs font-medium text-[#e0e0e0]">
                      {sephira.magicalImage}
                    </p>
                  </div>

                  <div className="p-4 rounded bg-[#141417] border border-[#2d2d30] space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#c5a059]">
                      Virtue
                    </span>
                    <p className="text-xs text-[#a0a0a0]">{sephira.virtue}</p>
                  </div>

                  <div className="p-4 rounded bg-[#141417] border border-[#2d2d30] space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#c5a059]">
                      Vice / Illusion
                    </span>
                    <p className="text-xs text-[#a0a0a0]">{sephira.vice}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-serif font-semibold text-[#c5a059] mb-3">
                    Golden Dawn 4 Color Scales
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded bg-[#141417] border border-[#2d2d30]">
                      <div
                        className="w-full h-3 rounded mb-2 border border-white/20"
                        style={{ backgroundColor: sephira.colors.atziluth }}
                      ></div>
                      <span className="font-semibold text-[#c5a059] block">Atziluth (King)</span>
                      <span className="text-[#808080] text-[11px]">{sephira.colorDescriptions.atziluth}</span>
                    </div>

                    <div className="p-3 rounded bg-[#141417] border border-[#2d2d30]">
                      <div
                        className="w-full h-3 rounded mb-2 border border-white/20"
                        style={{ backgroundColor: sephira.colors.briah }}
                      ></div>
                      <span className="font-semibold text-[#c5a059] block">Briah (Queen)</span>
                      <span className="text-[#808080] text-[11px]">{sephira.colorDescriptions.briah}</span>
                    </div>

                    <div className="p-3 rounded bg-[#141417] border border-[#2d2d30]">
                      <div
                        className="w-full h-3 rounded mb-2 border border-white/20"
                        style={{ backgroundColor: sephira.colors.yetzirah }}
                      ></div>
                      <span className="font-semibold text-[#c5a059] block">Yetzirah (Prince)</span>
                      <span className="text-[#808080] text-[11px]">{sephira.colorDescriptions.yetzirah}</span>
                    </div>

                    <div className="p-3 rounded bg-[#141417] border border-[#2d2d30]">
                      <div
                        className="w-full h-3 rounded mb-2 border border-white/20"
                        style={{ backgroundColor: sephira.colors.assiah }}
                      ></div>
                      <span className="font-semibold text-[#c5a059] block">Assiah (Princess)</span>
                      <span className="text-[#808080] text-[11px]">{sephira.colorDescriptions.assiah}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attributions' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded bg-[#141417] border border-[#2d2d30]">
                  <span className="text-xs font-semibold text-[#c5a059] block mb-1">
                    Divine Name
                  </span>
                  <p className="text-base font-serif font-bold text-[#e0e0e0]">
                    {sephira.divineName}
                  </p>
                </div>

                <div className="p-4 rounded bg-[#141417] border border-[#2d2d30]">
                  <span className="text-xs font-semibold text-[#c5a059] block mb-1">
                    Archangel
                  </span>
                  <p className="text-base font-serif font-bold text-[#e0e0e0]">
                    {sephira.archangel}
                  </p>
                </div>

                <div className="p-4 rounded bg-[#141417] border border-[#2d2d30]">
                  <span className="text-xs font-semibold text-[#c5a059] block mb-1">
                    Angelic Order
                  </span>
                  <p className="text-sm font-medium text-[#a0a0a0]">
                    {sephira.angelicOrder}
                  </p>
                </div>

                <div className="p-4 rounded bg-[#141417] border border-[#2d2d30]">
                  <span className="text-xs font-semibold text-[#c5a059] block mb-1">
                    Astrological Attribution
                  </span>
                  <p className="text-sm font-medium text-[#a0a0a0]">
                    {sephira.astrological}
                  </p>
                </div>

                <div className="p-4 rounded bg-[#141417] border border-[#2d2d30]">
                  <span className="text-xs font-semibold text-[#c5a059] block mb-1">
                    Elemental Force
                  </span>
                  <p className="text-sm font-medium text-[#a0a0a0]">
                    {sephira.element}
                  </p>
                </div>

                <div className="p-4 rounded bg-[#141417] border border-[#2d2d30]">
                  <span className="text-xs font-semibold text-[#c5a059] block mb-1">
                    Human Body / Microcosm
                  </span>
                  <p className="text-sm font-medium text-[#a0a0a0]">
                    {sephira.chakraOrBodyPart}
                  </p>
                </div>

                <div className="p-4 rounded bg-[#141417] border border-[#2d2d30]">
                  <span className="text-xs font-semibold text-[#c5a059] block mb-1">
                    Precious Gemstone
                  </span>
                  <p className="text-sm font-medium text-[#a0a0a0]">
                    {sephira.preciousStone}
                  </p>
                </div>

                <div className="p-4 rounded bg-[#141417] border border-[#2d2d30]">
                  <span className="text-xs font-semibold text-[#c5a059] block mb-1">
                    Incense &amp; Botanical
                  </span>
                  <p className="text-sm font-medium text-[#a0a0a0]">
                    {sephira.incenseAndPlants}
                  </p>
                </div>

                <div className="p-4 rounded bg-[#141417] border border-[#2d2d30] md:col-span-2">
                  <span className="text-xs font-semibold text-[#c5a059] block mb-1">
                    Tarot Cards Attribution
                  </span>
                  <p className="text-sm font-medium text-[#a0a0a0]">
                    {sephira.tarotCards}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'commentary' && (
              <div className="space-y-6">
                <div className="p-5 rounded bg-[#141417] border border-[#2d2d30]">
                  <div className="flex items-center gap-2 text-[#c5a059] font-serif font-bold text-base mb-2">
                    <Scroll className="w-5 h-5 text-[#c5a059]" />
                    Dion Fortune — &quot;The Mystical Qabalah&quot;
                  </div>
                  <blockquote className="text-xs text-[#a0a0a0] italic leading-relaxed">
                    &quot;{sephira.dionFortuneInsight}&quot;
                  </blockquote>
                </div>

                <div className="p-5 rounded bg-[#141417] border border-[#2d2d30]">
                  <div className="flex items-center gap-2 text-[#c5a059] font-serif font-bold text-base mb-2">
                    <BookOpen className="w-5 h-5 text-[#c5a059]" />
                    Israel Regardie — &quot;The Garden of Pomegranates&quot;
                  </div>
                  <blockquote className="text-xs text-[#a0a0a0] italic leading-relaxed">
                    &quot;{sephira.regardieInsight}&quot;
                  </blockquote>
                </div>
              </div>
            )}

            {activeTab === 'meditation' && (
              <div className="space-y-6">
                <div className="p-5 rounded bg-[#141417] border border-[#2d2d30] space-y-4">
                  <h4 className="text-base font-serif font-bold text-[#c5a059] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#c5a059]" />
                    Traditional Pathworking Meditation
                  </h4>
                  <p className="text-xs text-[#a0a0a0] leading-relaxed bg-[#08080a] p-4 rounded border border-[#2d2d30] italic">
                    &quot;{sephira.pathworkingGuidance}&quot;
                  </p>
                </div>

                <div className="p-5 rounded bg-[#141417] border border-[#c5a059] space-y-3">
                  <h4 className="text-base font-serif font-bold text-[#c5a059]">
                    AI Hermetic Pathworking Guide
                  </h4>
                  <p className="text-xs text-[#a0a0a0]">
                    Use Gemini 3.5 Flash to generate an expanded, step-by-step custom guided meditation journey tailored specifically to {sephira.name}.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onGenerateAiMeditation(sephira.name, 'sephira');
                    }}
                    className="w-full py-3 px-4 rounded bg-transparent border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate Deep AI Pathworking Meditation for {sephira.name}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
