'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Path, SEPHIROTH_DATA } from '@/lib/qabalah-data';
import { X, Sparkles, Compass, Eye, Flame, ArrowRight } from 'lucide-react';

interface PathDetailModalProps {
  pathItem: Path | null;
  onClose: () => void;
  onGenerateAiMeditation: (entityName: string, entityType: 'sephira' | 'path') => void;
}

export default function PathDetailModal({
  pathItem,
  onClose,
  onGenerateAiMeditation,
}: PathDetailModalProps) {
  if (!pathItem) return null;

  const fromSephira = SEPHIROTH_DATA.find((s) => s.id === pathItem.fromSephiraId);
  const toSephira = SEPHIROTH_DATA.find((s) => s.id === pathItem.toSephiraId);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-[#08080a] border border-[#c5a059] rounded-xl shadow-2xl flex flex-col overflow-hidden text-[#e0e0e0]"
        >
          {/* Header */}
          <div className="relative p-6 border-b border-[#2d2d30] bg-[#141417] flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-[#08080a] border border-[#c5a059] flex items-center justify-center text-3xl font-serif font-bold text-[#c5a059] shadow-md">
                {pathItem.hebrewLetter}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#c5a059] font-mono text-xs font-bold border border-[#c5a059]/40">
                    Path {pathItem.number} ({pathItem.hebrewLetterName})
                  </span>
                  <span className="text-xs text-[#c5a059] uppercase tracking-widest font-mono">
                    {pathItem.attributionType}: {pathItem.attribution} {pathItem.symbolIcon}
                  </span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#e0e0e0] mt-0.5">
                  {pathItem.tarotCardName}
                  <span className="text-[#a0a0a0] font-normal text-lg ml-2 font-sans">
                    (Tarot Key {pathItem.tarotKey})
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

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#e0e0e0]">
            {/* Connected Sephiras Banner */}
            <div className="p-4 rounded bg-[#141417] border border-[#2d2d30] flex items-center justify-between">
              <div className="text-center flex-1">
                <span className="text-[10px] text-[#808080] uppercase tracking-widest block">From Sephira</span>
                <span className="text-sm font-serif font-bold text-[#c5a059]">
                  {fromSephira ? `${fromSephira.number}. ${fromSephira.name}` : ''}
                </span>
              </div>
              <div className="px-3 text-[#c5a059]">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div className="text-center flex-1">
                <span className="text-[10px] text-[#808080] uppercase tracking-widest block">To Sephira</span>
                <span className="text-sm font-serif font-bold text-[#c5a059]">
                  {toSephira ? `${toSephira.number}. ${toSephira.name}` : ''}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-serif font-semibold text-[#c5a059] uppercase tracking-wider mb-2">
                Path Title &amp; Esoteric Intelligence
              </h3>
              <p className="text-sm font-serif font-medium text-[#e0e0e0] bg-[#141417] p-4 rounded border border-[#2d2d30]">
                &quot;{pathItem.name}&quot;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded bg-[#141417] border border-[#2d2d30]">
                <span className="text-[10px] font-semibold text-[#c5a059] uppercase tracking-wider block mb-1">
                  Hebrew Letter Meaning
                </span>
                <p className="font-medium text-[#a0a0a0]">{pathItem.letterMeaning}</p>
              </div>

              <div className="p-4 rounded bg-[#141417] border border-[#2d2d30]">
                <span className="text-[10px] font-semibold text-[#c5a059] uppercase tracking-wider block mb-1">
                  Hermetic Attribution
                </span>
                <p className="font-medium text-[#a0a0a0]">
                  {pathItem.attributionType}: {pathItem.attribution} {pathItem.symbolIcon}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-serif font-semibold text-[#c5a059] uppercase tracking-wider mb-2">
                Overview &amp; Symbolism
              </h3>
              <p className="text-xs text-[#a0a0a0] leading-relaxed bg-[#141417] p-4 rounded border border-[#2d2d30]">
                {pathItem.overview}
              </p>
            </div>

            <div className="p-5 rounded bg-[#141417] border border-[#2d2d30] space-y-3">
              <h4 className="text-sm font-serif font-bold text-[#c5a059] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#c5a059]" />
                Pathworking Meditation
              </h4>
              <p className="text-xs text-[#a0a0a0] italic leading-relaxed bg-[#08080a] p-3 rounded border border-[#2d2d30]">
                &quot;{pathItem.pathworkingMeditation}&quot;
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onGenerateAiMeditation(`Path ${pathItem.number} (${pathItem.hebrewLetterName} - ${pathItem.tarotCardName})`, 'path');
              }}
              className="w-full py-3 px-4 rounded bg-transparent border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              Generate Guided AI Pathworking Meditation for Path {pathItem.number}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
