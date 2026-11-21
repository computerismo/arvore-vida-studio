'use client';

import React, { useState } from 'react';
import { Sephira, Path } from '@/lib/qabalah-data';
import TreeOfLifeCanvas, { HoveredItem } from '@/components/TreeOfLifeCanvas';
import EntityDetailDrawer from '@/components/EntityDetailDrawer';
import PillarsExplorer from '@/components/PillarsExplorer';
import CorrespondenceTable from '@/components/CorrespondenceTable';
import AiQabalahGuide from '@/components/AiQabalahGuide';
import FilterBar from '@/components/FilterBar';
import MobileControlsSheet from '@/components/MobileControlsSheet';
import {
  Info,
  Table,
  Columns,
  Bot,
  X,
  Compass,
  SlidersHorizontal,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

type MobileView = 'tree' | '777' | 'pillars' | 'ai';
type ConsoleTab = '777' | 'pillars' | 'ai';

export default function Home() {
  const [selectedScale, setSelectedScale] = useState<
    'atziluth' | 'briah' | 'yetzirah' | 'assiah'
  >('briah');
  const [activeMode, setActiveMode] = useState<'default' | 'lightning' | 'serpent'>(
    'default'
  );
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showPillars, setShowPillars] = useState(true);

  const [selectedSephira, setSelectedSephira] = useState<Sephira | null>(null);
  const [selectedPath, setSelectedPath] = useState<Path | null>(null);
  const [hoveredItem, setHoveredItem] = useState<HoveredItem | null>(null);

  // Mobile view state & controls sheet
  const [mobileView, setMobileView] = useState<MobileView>('tree');
  const [mobileControlsOpen, setMobileControlsOpen] = useState(false);

  // Tablet & Desktop collapsible reference console state
  const [activeConsoleTab, setActiveConsoleTab] = useState<ConsoleTab>('777');
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  // Study guide modal
  const [showHowToStudy, setShowHowToStudy] = useState(false);

  const [aiPromptTarget, setAiPromptTarget] = useState<{
    name: string;
    type: 'sephira' | 'path';
  } | null>(null);

  const scrollToConsole = (elementId = 'study-console') => {
    setTimeout(() => {
      document
        .getElementById(elementId)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 90);
  };

  const handleGenerateAiMeditation = (
    entityName: string,
    entityType: 'sephira' | 'path'
  ) => {
    setAiPromptTarget({ name: entityName, type: entityType });
    setMobileView('ai');
    setActiveConsoleTab('ai');
    setIsConsoleOpen(true);
    scrollToConsole('ai-guide-section');
  };

  const handleSelectSephira = (s: Sephira) => {
    setSelectedPath(null);
    setSelectedSephira(s);
  };

  const handleSelectPath = (p: Path) => {
    setSelectedSephira(null);
    setSelectedPath(p);
  };

  const handleSwitchMobileView = (view: MobileView) => {
    setMobileControlsOpen(false);
    setMobileView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleConsoleFromHeader = () => {
    const nextOpen = !isConsoleOpen;
    setIsConsoleOpen(nextOpen);
    if (nextOpen) {
      scrollToConsole('study-console');
    }
  };

  const handleOpenConsoleTab = (tab: ConsoleTab) => {
    if (isConsoleOpen && activeConsoleTab === tab) {
      setIsConsoleOpen(false);
      return;
    }
    setActiveConsoleTab(tab);
    setIsConsoleOpen(true);
    scrollToConsole('study-console');
  };

  const navItems: Array<{
    id: MobileView;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'tree', label: 'Tree', icon: Compass },
    { id: '777', label: '777 Index', icon: Table },
    { id: 'pillars', label: 'Pillars', icon: Columns },
    { id: 'ai', label: 'Oracle', icon: Bot },
  ];

  const aiInitialPrompt = aiPromptTarget
    ? `Generate a detailed step-by-step guided Pathworking Meditation for ${aiPromptTarget.name}.`
    : undefined;

  const hasCustomMobileControls =
    selectedScale !== 'briah' ||
    activeMode !== 'default' ||
    Boolean(activeFilter) ||
    !showPillars;

  return (
    <main
      className={`min-h-dvh ${
        mobileView === 'tree' ? 'h-dvh overflow-hidden md:h-auto md:overflow-visible' : ''
      } bg-[#050507] text-[#e0e0e0] font-sans selection:bg-[#c5a059]/30 selection:text-[#e8c982] pb-mobile-nav md:pb-14 relative flex flex-col`}
    >
      {/* Subtle Ambient Background */}
      <div className="fixed inset-0 bg-radial-pattern opacity-15 pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0c0c12]/60 via-transparent to-[#050507] pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto px-2.5 sm:px-5 lg:px-8 pt-2.5 sm:pt-4 pb-1.5 md:pb-4 flex-1 min-h-0 flex flex-col gap-2 md:gap-4">
        {/* Adaptive Header */}
        <header className="flex items-center justify-between gap-3 border-b border-[#c5a059]/20 pb-2 sm:pb-3.5 shrink-0 px-1 md:px-0">
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl lg:text-[26px] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f4f4f6] via-[#d4b26a] to-[#f4f4f6] tracking-wide whitespace-nowrap truncate">
              <span>Otz Chiim</span>
              <span className="hidden sm:inline"> · The Tree of Life</span>
            </h1>
            <p className="hidden md:block text-xs text-[#9a9aa6] mt-0.5">
              Hermetic Qabalah Reference · Golden Dawn Tradition
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile Controls Sheet Trigger */}
            {mobileView === 'tree' && (
              <button
                type="button"
                onClick={() => setMobileControlsOpen(true)}
                className={`md:hidden min-h-[40px] px-3 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  hasCustomMobileControls
                    ? 'bg-[#c5a059]/18 border-[#c5a059]/70 text-[#e8c982]'
                    : 'bg-[#121218] border-[#24242e] text-[#d0d0da]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Controls</span>
                <span className="text-[11px] text-[#9a9aa6] capitalize">
                  · {selectedScale}
                </span>
              </button>
            )}

            {/* Guide Button */}
            <button
              type="button"
              onClick={() => setShowHowToStudy(true)}
              aria-label="Study Guide"
              className="min-h-[40px] min-w-[40px] sm:min-w-0 sm:px-3.5 py-2 rounded-xl bg-[#121218] border border-[#24242e] hover:border-[#c5a059] text-xs text-[#b4b4be] hover:text-[#e8c982] transition-colors flex items-center justify-center gap-2 font-medium whitespace-nowrap shrink-0"
            >
              <Info className="w-4 h-4 text-[#c5a059]" />
              <span className="hidden sm:inline">Guide</span>
            </button>

            {/* Tablet & Desktop Reference Console Toggle */}
            <button
              type="button"
              onClick={handleToggleConsoleFromHeader}
              className="hidden md:flex min-h-[40px] px-4 py-2 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/50 hover:border-[#c5a059] text-xs text-[#e8c982] hover:text-white transition-colors items-center gap-2 font-semibold whitespace-nowrap shrink-0"
            >
              <Table className="w-4 h-4" />
              <span>Reference Console</span>
              {isConsoleOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </header>

        {/* Tablet & Desktop Controls Ribbon */}
        <div className="hidden md:block shrink-0">
          <FilterBar
            selectedScale={selectedScale}
            onSelectScale={setSelectedScale}
            activeMode={activeMode}
            onSelectMode={setActiveMode}
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
          />
        </div>

        {/* PRIMARY CENTERED TREE STAGE
            - Mobile (< md): Edge-to-edge full-height stage when mobileView === 'tree'
            - Tablet & Desktop (md+): Centered single-screen proportional stage */}
        <div
          className={`${
            mobileView === 'tree' ? 'flex' : 'hidden md:flex'
          } flex-1 md:flex-none min-h-0 w-full justify-center items-center md:h-[calc(100dvh-14.25rem)] md:min-h-[500px] md:max-h-[790px]`}
        >
          <TreeOfLifeCanvas
            selectedScale={selectedScale}
            activeFilter={activeFilter}
            activeMode={activeMode}
            selectedSephiraId={selectedSephira?.id || null}
            selectedPathId={selectedPath?.id || null}
            onSelectSephira={handleSelectSephira}
            onSelectPath={handleSelectPath}
            onHoverItem={setHoveredItem}
            hoveredItem={hoveredItem}
            showPillars={showPillars}
            onTogglePillars={() => setShowPillars((prev) => !prev)}
          />
        </div>

        {/* MOBILE DEDICATED VIEWS (< md) */}
        <div className="md:hidden">
          {mobileView === '777' && (
            <CorrespondenceTable
              onSelectSephira={handleSelectSephira}
              onSelectPath={handleSelectPath}
            />
          )}

          {mobileView === 'pillars' && (
            <PillarsExplorer onSelectSephira={handleSelectSephira} />
          )}

          {mobileView === 'ai' && (
            <div id="ai-guide-section">
              <AiQabalahGuide
                initialPrompt={aiInitialPrompt}
                initialEntityName={aiPromptTarget?.name}
                initialEntityType={aiPromptTarget?.type}
              />
            </div>
          )}
        </div>

        {/* TABLET & DESKTOP COLLAPSIBLE HERMETIC REFERENCE CONSOLE (md+) */}
        <section
          id="study-console"
          className="hidden md:block pt-2 border-t border-[#202028] space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#09090d]/90 border border-[#c5a059]/25 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
            <div>
              <h2 className="text-base font-serif font-bold text-[#f0f0f5] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#c5a059]" />
                Hermetic Reference Console
              </h2>
              <p className="text-xs text-[#8e8e98] mt-0.5">
                777 Index, 3 Pillars Analysis, and Pathworking Oracle
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => handleOpenConsoleTab('777')}
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isConsoleOpen && activeConsoleTab === '777'
                    ? 'bg-[#c5a059]/20 text-[#e8c982] border border-[#c5a059]'
                    : 'bg-[#121218] text-[#8e8e98] border border-[#24242e] hover:text-[#e8e8ec]'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                777 Index
              </button>

              <button
                type="button"
                onClick={() => handleOpenConsoleTab('pillars')}
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isConsoleOpen && activeConsoleTab === 'pillars'
                    ? 'bg-[#c5a059]/20 text-[#e8c982] border border-[#c5a059]'
                    : 'bg-[#121218] text-[#8e8e98] border border-[#24242e] hover:text-[#e8e8ec]'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                3 Pillars
              </button>

              <button
                type="button"
                onClick={() => handleOpenConsoleTab('ai')}
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isConsoleOpen && activeConsoleTab === 'ai'
                    ? 'bg-[#c5a059]/20 text-[#e8c982] border border-[#c5a059]'
                    : 'bg-[#121218] text-[#8e8e98] border border-[#24242e] hover:text-[#e8e8ec]'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                Oracle
              </button>

              <button
                type="button"
                onClick={() => setIsConsoleOpen((prev) => !prev)}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-[#121218] border border-[#24242e] text-[#a0a0a8] hover:text-white transition-colors"
                aria-label={
                  isConsoleOpen
                    ? 'Collapse Reference Console'
                    : 'Expand Reference Console'
                }
              >
                {isConsoleOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {isConsoleOpen && (
            <div className="transition-all">
              {activeConsoleTab === '777' && (
                <CorrespondenceTable
                  onSelectSephira={handleSelectSephira}
                  onSelectPath={handleSelectPath}
                />
              )}

              {activeConsoleTab === 'pillars' && (
                <PillarsExplorer onSelectSephira={handleSelectSephira} />
              )}

              {activeConsoleTab === 'ai' && (
                <div id="ai-guide-section">
                  <AiQabalahGuide
                    initialPrompt={aiInitialPrompt}
                    initialEntityName={aiPromptTarget?.name}
                    initialEntityType={aiPromptTarget?.type}
                  />
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {/* MOBILE FIXED BOTTOM TAB NAVIGATION (< md) */}
      <nav
        aria-label="Primary navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#09090d]/95 backdrop-blur-md border-t border-[#24242e] pb-safe"
      >
        <div className="grid grid-cols-4 items-center h-16 max-w-lg mx-auto px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = mobileView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSwitchMobileView(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`min-h-[48px] flex flex-col items-center justify-center gap-1 rounded-xl transition-colors ${
                  isActive ? 'text-[#e8c982]' : 'text-[#868694] active:text-[#e0e0e6]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? 'text-[#c5a059]' : 'text-current'}`}
                />
                <span className="text-[11px] font-medium tracking-tight leading-none whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Diagram Controls Bottom Sheet */}
      <MobileControlsSheet
        open={mobileControlsOpen}
        onClose={() => setMobileControlsOpen(false)}
        selectedScale={selectedScale}
        onSelectScale={setSelectedScale}
        activeMode={activeMode}
        onSelectMode={setActiveMode}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        showPillars={showPillars}
        onTogglePillars={() => setShowPillars((prev) => !prev)}
      />

      {/* Responsive "How to Study" Modal */}
      {showHowToStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="How to Study the Tree of Life"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowHowToStudy(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#09090d] border-t sm:border border-[#c5a059]/60 rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 pb-safe max-w-lg w-full max-h-[85dvh] overflow-y-auto space-y-4 text-[#e0e0e0] shadow-2xl"
          >
            <div className="sm:hidden flex justify-center -mt-1 pb-1">
              <div className="w-10 h-1.5 rounded-full bg-[#32323c]" aria-hidden="true" />
            </div>

            <div className="flex items-center justify-between border-b border-[#22222a] pb-3">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#e8c982] flex items-center gap-2">
                <Info className="w-5 h-5 text-[#c5a059] shrink-0" />
                How to Study the Tree of Life
              </h3>
              <button
                type="button"
                onClick={() => setShowHowToStudy(false)}
                aria-label="Close guide"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-[#121218] text-[#a0a0a8] hover:text-white border border-[#24242e]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ul className="text-sm sm:text-xs text-[#b8b8c2] space-y-3 leading-relaxed list-disc list-inside">
              <li>
                <strong className="text-[#f0f0f5]">Spheres (1–10 + Da&apos;ath):</strong> Click or
                tap any sphere on the diagram to slide open its divine names, archangels,
                astrological attributions, and classic commentary.
              </li>
              <li>
                <strong className="text-[#f0f0f5]">Connecting Pathways (11–32):</strong> Click any
                Hebrew letter or path line to inspect its Tarot Major Arcana key and esoteric title.
              </li>
              <li>
                <strong className="text-[#f0f0f5]">Golden Dawn Color Scales:</strong> Switch
                between Atziluth (King), Briah (Queen), Yetzirah (Prince), and Assiah (Princess)
                scales in the top toolbar or mobile Controls sheet.
              </li>
              <li>
                <strong className="text-[#f0f0f5]">Diagram Overlays:</strong> Toggle the Lightning
                Flash cosmic descent or Serpent of Wisdom ascent paths.
              </li>
              <li>
                <strong className="text-[#f0f0f5]">Reference Console:</strong> Expand the
                Reference Console below the Tree on tablet/desktop—or use the mobile bottom tabs—to
                browse the 777 Index, 3 Pillars, and Pathworking Oracle.
              </li>
            </ul>

            <button
              type="button"
              onClick={() => setShowHowToStudy(false)}
              className="w-full min-h-[48px] py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#a6833f] text-black font-bold text-xs uppercase tracking-wider transition-all hover:brightness-110 shadow-md"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

      {/* On-Demand Detail Sheet (Bottom Sheet on Mobile, Right Slide-Over Drawer on Tablet & Desktop) */}
      <EntityDetailDrawer
        sephira={selectedSephira}
        pathItem={selectedPath}
        onClose={() => {
          setSelectedSephira(null);
          setSelectedPath(null);
        }}
        onGenerateAiMeditation={handleGenerateAiMeditation}
      />
    </main>
  );
}
