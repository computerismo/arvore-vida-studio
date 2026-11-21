'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Sephira, Path } from '@/lib/qabalah-data';
import { Language, UI_STRINGS } from '@/lib/i18n';
import { getLocalizedSephirothData, getLocalizedPathsData } from '@/lib/qabalah-pt';
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
  const [language, setLanguage] = useState<Language>('pt');
  const [selectedScale, setSelectedScale] = useState<
    'atziluth' | 'briah' | 'yetzirah' | 'assiah'
  >('briah');
  const [activeMode, setActiveMode] = useState<'default' | 'lightning' | 'serpent'>(
    'default'
  );
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showPillars, setShowPillars] = useState(true);

  const [selectedSephiraId, setSelectedSephiraId] = useState<string | null>(null);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
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

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  const t = UI_STRINGS[language];

  const localizedSephiroth = useMemo(
    () => getLocalizedSephirothData(language),
    [language]
  );
  const localizedPaths = useMemo(() => getLocalizedPathsData(language), [language]);

  const selectedSephira = useMemo(
    () => localizedSephiroth.find((s) => s.id === selectedSephiraId) ?? null,
    [localizedSephiroth, selectedSephiraId]
  );
  const selectedPath = useMemo(
    () => localizedPaths.find((p) => p.id === selectedPathId) ?? null,
    [localizedPaths, selectedPathId]
  );

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
    setSelectedPathId(null);
    setSelectedSephiraId(s.id);
  };

  const handleSelectPath = (p: Path) => {
    setSelectedSephiraId(null);
    setSelectedPathId(p.id);
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
    { id: 'tree', label: t.mobileNav.tree, icon: Compass },
    { id: '777', label: t.mobileNav.index777, icon: Table },
    { id: 'pillars', label: t.mobileNav.pillars, icon: Columns },
    { id: 'ai', label: t.mobileNav.oracle, icon: Bot },
  ];

  const aiInitialPrompt = aiPromptTarget
    ? t.aiGuide.meditationPrompt(aiPromptTarget.name)
    : undefined;

  const selectedScaleLabel =
    t.controls.scales.find((s) => s.id === selectedScale)?.label ?? selectedScale;

  const hasCustomMobileControls =
    selectedScale !== 'briah' ||
    activeMode !== 'default' ||
    Boolean(activeFilter) ||
    !showPillars;

  return (
    <main
      className={`min-h-dvh ${
        mobileView === 'tree' ? 'h-dvh overflow-hidden md:h-auto md:overflow-visible' : ''
      } bg-[#EBE5DA] text-[#1F242C] font-sans selection:bg-[#9a7022]/25 selection:text-[#1F242C] pb-mobile-nav md:pb-14 relative flex flex-col`}
    >
      {/* Subtle Ambient Background */}
      <div className="fixed inset-0 bg-radial-pattern opacity-45 pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#F8F4EC]/75 via-transparent to-[#E2D8C7]/75 pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto px-2.5 sm:px-5 lg:px-8 pt-2.5 sm:pt-4 pb-1.5 md:pb-4 flex-1 min-h-0 flex flex-col gap-2 md:gap-4">
        {/* Adaptive Header */}
        <header className="flex items-center justify-between gap-2 sm:gap-3 border-b border-[#D1C6B3] pb-2 sm:pb-3.5 shrink-0 px-1 md:px-0">
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl lg:text-[26px] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1F242C] via-[#7C5814] to-[#1F242C] tracking-wide whitespace-nowrap truncate">
              <span>{t.header.titlePrefix}</span>
              <span className="hidden sm:inline">{t.header.titleSuffix}</span>
            </h1>
            <p className="hidden md:block text-xs text-[#625D53] mt-0.5">
              {t.header.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Toggle (PT-BR default | EN) */}
            <div
              role="group"
              aria-label={t.header.languageToggleAria}
              className="flex items-center bg-[#F8F4EC] border border-[#D1C6B3] rounded-xl p-0.5 min-h-[40px]"
            >
              <button
                type="button"
                onClick={() => setLanguage('pt')}
                aria-pressed={language === 'pt'}
                className={`min-h-[34px] px-2.5 rounded-lg text-[11px] font-mono font-bold tracking-wider transition-colors ${
                  language === 'pt'
                    ? 'bg-[#EEE0C7] text-[#5E400B] border border-[#8C631A]/65'
                    : 'text-[#625D53] hover:text-[#1F242C] border border-transparent'
                }`}
              >
                PT
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
                className={`min-h-[34px] px-2.5 rounded-lg text-[11px] font-mono font-bold tracking-wider transition-colors ${
                  language === 'en'
                    ? 'bg-[#EEE0C7] text-[#5E400B] border border-[#8C631A]/65'
                    : 'text-[#625D53] hover:text-[#1F242C] border border-transparent'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Controls Sheet Trigger */}
            {mobileView === 'tree' && (
              <button
                type="button"
                onClick={() => setMobileControlsOpen(true)}
                className={`md:hidden min-h-[40px] px-2.5 sm:px-3 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  hasCustomMobileControls
                    ? 'bg-[#EEE0C7] border-[#8C631A]/75 text-[#5E400B]'
                    : 'bg-[#F8F4EC] border-[#D1C6B3] text-[#1F242C]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#7C5814]" />
                <span>{t.header.controls}</span>
                <span className="hidden min-[390px]:inline text-[11px] text-[#625D53]">
                  · {selectedScaleLabel}
                </span>
              </button>
            )}

            {/* Guide Button */}
            <button
              type="button"
              onClick={() => setShowHowToStudy(true)}
              aria-label={t.header.guideAria}
              className="min-h-[40px] min-w-[40px] sm:min-w-0 sm:px-3.5 py-2 rounded-xl bg-[#F8F4EC] border border-[#D1C6B3] hover:border-[#8C631A] text-xs text-[#3A3E45] hover:text-[#5E400B] transition-colors flex items-center justify-center gap-2 font-medium whitespace-nowrap shrink-0"
            >
              <Info className="w-4 h-4 text-[#7C5814]" />
              <span className="hidden sm:inline">{t.header.guide}</span>
            </button>

            {/* Tablet & Desktop Reference Console Toggle */}
            <button
              type="button"
              onClick={handleToggleConsoleFromHeader}
              className="hidden md:flex min-h-[40px] px-4 py-2 rounded-xl bg-[#EEE0C7] border border-[#8C631A]/60 hover:border-[#7C5814] text-xs text-[#5E400B] hover:brightness-95 transition-all items-center gap-2 font-semibold whitespace-nowrap shrink-0"
            >
              <Table className="w-4 h-4" />
              <span>{t.header.referenceConsole}</span>
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
            language={language}
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
            language={language}
            selectedScale={selectedScale}
            activeFilter={activeFilter}
            activeMode={activeMode}
            selectedSephiraId={selectedSephiraId}
            selectedPathId={selectedPathId}
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
              language={language}
              onSelectSephira={handleSelectSephira}
              onSelectPath={handleSelectPath}
            />
          )}

          {mobileView === 'pillars' && (
            <PillarsExplorer
              language={language}
              onSelectSephira={handleSelectSephira}
            />
          )}

          {mobileView === 'ai' && (
            <div id="ai-guide-section">
              <AiQabalahGuide
                language={language}
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
          className="hidden md:block pt-2 border-t border-[#D1C6B3] space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F8F4EC]/95 border border-[#D1C6B3] rounded-2xl p-4 shadow-sm backdrop-blur-sm">
            <div>
              <h2 className="text-base font-serif font-bold text-[#1F242C] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#7C5814]" />
                {t.console.title}
              </h2>
              <p className="text-xs text-[#625D53] mt-0.5">
                {t.console.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => handleOpenConsoleTab('777')}
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isConsoleOpen && activeConsoleTab === '777'
                    ? 'bg-[#EEE0C7] text-[#5E400B] border border-[#8C631A]'
                    : 'bg-[#F0E9DE] text-[#3A3E45] border border-[#D1C6B3] hover:text-[#1F242C] hover:border-[#8C631A]/60'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                {t.console.tab777}
              </button>

              <button
                type="button"
                onClick={() => handleOpenConsoleTab('pillars')}
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isConsoleOpen && activeConsoleTab === 'pillars'
                    ? 'bg-[#EEE0C7] text-[#5E400B] border border-[#8C631A]'
                    : 'bg-[#F0E9DE] text-[#3A3E45] border border-[#D1C6B3] hover:text-[#1F242C] hover:border-[#8C631A]/60'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                {t.console.tabPillars}
              </button>

              <button
                type="button"
                onClick={() => handleOpenConsoleTab('ai')}
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isConsoleOpen && activeConsoleTab === 'ai'
                    ? 'bg-[#EEE0C7] text-[#5E400B] border border-[#8C631A]'
                    : 'bg-[#F0E9DE] text-[#3A3E45] border border-[#D1C6B3] hover:text-[#1F242C] hover:border-[#8C631A]/60'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                {t.console.tabOracle}
              </button>

              <button
                type="button"
                onClick={() => setIsConsoleOpen((prev) => !prev)}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-[#F0E9DE] border border-[#D1C6B3] text-[#3A3E45] hover:text-[#1F242C] transition-colors"
                aria-label={
                  isConsoleOpen
                    ? t.console.collapseAria
                    : t.console.expandAria
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
                  language={language}
                  onSelectSephira={handleSelectSephira}
                  onSelectPath={handleSelectPath}
                />
              )}

              {activeConsoleTab === 'pillars' && (
                <PillarsExplorer
                  language={language}
                  onSelectSephira={handleSelectSephira}
                />
              )}

              {activeConsoleTab === 'ai' && (
                <div id="ai-guide-section">
                  <AiQabalahGuide
                    language={language}
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
        aria-label={t.mobileNav.ariaLabel}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F8F4EC]/95 backdrop-blur-md border-t border-[#D1C6B3] pb-safe"
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
                  isActive ? 'text-[#5E400B]' : 'text-[#625D53] active:text-[#1F242C]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? 'text-[#7C5814]' : 'text-current'}`}
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
        language={language}
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
          aria-label={t.studyModal.ariaLabel}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-[#1f242c]/45 backdrop-blur-sm"
          onClick={() => setShowHowToStudy(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8F4EC] border-t sm:border border-[#D1C6B3] rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 pb-safe max-w-lg w-full max-h-[85dvh] overflow-y-auto space-y-4 text-[#1F242C] shadow-2xl"
          >
            <div className="sm:hidden flex justify-center -mt-1 pb-1">
              <div className="w-10 h-1.5 rounded-full bg-[#C7BBA5]" aria-hidden="true" />
            </div>

            <div className="flex items-center justify-between border-b border-[#D1C6B3] pb-3">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#6D4B0F] flex items-center gap-2">
                <Info className="w-5 h-5 text-[#7C5814] shrink-0" />
                {t.studyModal.title}
              </h3>
              <button
                type="button"
                onClick={() => setShowHowToStudy(false)}
                aria-label={t.studyModal.closeAria}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-[#F0E9DE] text-[#3A3E45] hover:text-[#1F242C] border border-[#D1C6B3]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ul className="text-sm sm:text-xs text-[#3A3E45] space-y-3 leading-relaxed list-disc list-inside">
              {t.studyModal.items.map((item) => (
                <li key={item.lead}>
                  <strong className="text-[#1F242C]">{item.lead}</strong>{' '}
                  {item.body}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setShowHowToStudy(false)}
              className="w-full min-h-[48px] py-3 rounded-xl bg-gradient-to-r from-[#8f681d] to-[#745112] text-[#FAF7EF] font-bold text-xs uppercase tracking-wider transition-all hover:brightness-110 shadow-md"
            >
              {t.studyModal.closeButton}
            </button>
          </div>
        </div>
      )}

      {/* On-Demand Detail Sheet (Bottom Sheet on Mobile, Right Slide-Over Drawer on Tablet & Desktop) */}
      <EntityDetailDrawer
        language={language}
        sephira={selectedSephira}
        pathItem={selectedPath}
        onClose={() => {
          setSelectedSephiraId(null);
          setSelectedPathId(null);
        }}
        onGenerateAiMeditation={handleGenerateAiMeditation}
      />
    </main>
  );
}
