'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Bot, User, RefreshCw } from 'lucide-react';
import { Language, UI_STRINGS } from '@/lib/i18n';

interface AiQabalahGuideProps {
  language: Language;
  initialPrompt?: string | null;
  initialEntityName?: string | null;
  initialEntityType?: 'sephira' | 'path' | null;
  embedded?: boolean;
}

export default function AiQabalahGuide({
  language,
  initialPrompt,
  initialEntityName,
  initialEntityType,
  embedded = false,
}: AiQabalahGuideProps) {
  const t = UI_STRINGS[language].aiGuide;
  const defaultSeed =
    initialPrompt || (initialEntityName ? t.meditationPrompt(initialEntityName) : '');
  const [draft, setDraft] = useState<{ seed: string; text: string }>({
    seed: defaultSeed,
    text: defaultSeed,
  });
  const prompt = draft.seed === defaultSeed ? draft.text : defaultSeed;
  const setPrompt = (text: string) => setDraft({ seed: defaultSeed, text });
  const [userHistory, setUserHistory] = useState<
    Array<{ role: 'user' | 'assistant'; text: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const scrollEndRef = useRef<HTMLDivElement | null>(null);

  const messages: Array<{ role: 'user' | 'assistant'; text: string }> = [
    { role: 'assistant', text: t.welcomeMessage },
    ...userHistory,
  ];

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [userHistory.length, loading]);

  const handleSubmit = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || prompt;
    if (!query.trim() || loading) return;

    const userMsg = query;
    setUserHistory((prev) => [...prev, { role: 'user', text: userMsg }]);
    if (!customQuery) setPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/qabalah-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          language,
          type:
            initialEntityType === 'sephira' || initialEntityType === 'path'
              ? 'meditation'
              : 'chat',
          entityName: initialEntityName,
          entityType: initialEntityType,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setUserHistory((prev) => [...prev, { role: 'assistant', text: data.text }]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t.connectionError;
      setUserHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `${t.errorPrefix} ${message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (text: string) => {
    setPrompt(text);
    handleSubmit(undefined, text);
  };

  return (
    <div
      className={
        embedded
          ? 'p-4 flex flex-col flex-1 min-h-0 gap-3.5'
          : 'bg-[#F8F4EC] border border-[#D1C6B3] rounded-2xl p-4 sm:p-6 shadow-md space-y-4'
      }
    >
      <div className="flex items-center gap-3 border-b border-[#D1C6B3] pb-3 shrink-0">
        <div className="p-2.5 rounded-xl bg-[#F0E9DE] text-[#7C5814] border border-[#8C631A]/40 shrink-0">
          <Sparkles className="w-5 h-5 text-[#7C5814]" />
        </div>
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#1F242C] truncate">
            {t.title}
          </h2>
          <p className="text-xs text-[#625D53] truncate">{t.subtitle}</p>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 text-xs shrink-0">
        {t.quickPrompts.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleQuickPrompt(item.query)}
            className="min-h-[40px] sm:min-h-[36px] px-3.5 py-1.5 rounded-xl bg-[#F0E9DE] border border-[#D1C6B3] text-[#2E3239] hover:border-[#8C631A] hover:text-[#5E400B] transition-colors whitespace-nowrap shrink-0"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div
        className={`space-y-3 overflow-y-auto overscroll-contain pr-0.5 ${
          embedded ? 'flex-1 min-h-0' : 'max-h-[48dvh] md:max-h-[420px]'
        }`}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-3 p-3.5 rounded-xl border text-sm sm:text-[13px] leading-relaxed ${
              m.role === 'user'
                ? 'bg-[#EEE0C7]/75 border-[#8C631A]/50 text-[#1F242C] ml-3 sm:ml-8'
                : 'bg-[#F0E9DE] border-[#D1C6B3] text-[#2E3239] mr-0 sm:mr-4'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {m.role === 'user' ? (
                <User className="w-4 h-4 text-[#7C5814]" />
              ) : (
                <Bot className="w-4 h-4 text-[#7C5814]" />
              )}
            </div>
            <div className="min-w-0 flex-1 whitespace-pre-wrap break-words font-sans">
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#7C5814] p-3.5 bg-[#F0E9DE] rounded-xl border border-[#D1C6B3]">
            <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
            <span>{t.loading}</span>
          </div>
        )}
        <div ref={scrollEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-stretch gap-2 pt-1">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={t.placeholder}
          className="flex-1 min-w-0 min-h-[46px] px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#F0E9DE] border border-[#D1C6B3] text-base sm:text-sm text-[#1F242C] placeholder-[#7B7366] focus:outline-none focus:border-[#8C631A]"
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          aria-label={t.sendAria}
          className="min-h-[46px] min-w-[46px] px-3.5 sm:px-5 rounded-xl bg-[#EEE0C7] border border-[#8C631A] text-[#5E400B] hover:bg-[#8C631A] hover:text-[#FAF7EF] font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 disabled:opacity-45 shrink-0 whitespace-nowrap"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">{t.send}</span>
        </button>
      </form>
    </div>
  );
}
