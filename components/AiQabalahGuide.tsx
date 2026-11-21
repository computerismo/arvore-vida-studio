'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Bot, User, RefreshCw } from 'lucide-react';

interface AiQabalahGuideProps {
  initialPrompt?: string | null;
  initialEntityName?: string | null;
  initialEntityType?: 'sephira' | 'path' | null;
  embedded?: boolean;
}

const QUICK_PROMPTS = [
  {
    label: 'Middle Pillar Exercise',
    query:
      'Explain the Middle Pillar exercise ritual and how it balances energy across Kether, Tiphareth, Yesod, and Malkuth.',
  },
  {
    label: 'Binah vs Geburah',
    query: "Compare Dion Fortune's view of Binah vs Geburah on the Pillar of Severity.",
  },
  {
    label: 'Path 13 & The Abyss',
    query:
      'How does Path 13 (The High Priestess / Gimel) cross the Abyss from Kether to Tiphareth?',
  },
];

export default function AiQabalahGuide({
  initialPrompt,
  initialEntityName,
  initialEntityType,
  embedded = false,
}: AiQabalahGuideProps) {
  const defaultSeed =
    initialPrompt ||
    (initialEntityName
      ? `Generate a deep-dive pathworking meditation for ${initialEntityName}`
      : '');
  const [draft, setDraft] = useState<{ seed: string; text: string }>({
    seed: defaultSeed,
    text: defaultSeed,
  });
  const prompt = draft.seed === defaultSeed ? draft.text : defaultSeed;
  const setPrompt = (text: string) => setDraft({ seed: defaultSeed, text });
  const [messages, setMessages] = useState<
    Array<{ role: 'user' | 'assistant'; text: string }>
  >([
    {
      role: 'assistant',
      text: 'Greetings, seeker of the Mysteries. I am your Hermetic Qabalah Guide, versed in the traditions of the Golden Dawn, Dion Fortune, Israel Regardie, and 777. How may I assist your pathworking today?',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages.length, loading]);

  const handleSubmit = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || prompt;
    if (!query.trim() || loading) return;

    const userMsg = query;
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    if (!customQuery) setPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/qabalah-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
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

      setMessages((prev) => [...prev, { role: 'assistant', text: data.text }]);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Please check your connection and try again.';
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Error contacting Hermetic Oracle: ${message}`,
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
          : 'bg-[#dce2ec] border border-[#b3bdd0] rounded-2xl p-4 sm:p-6 shadow-md space-y-4'
      }
    >
      <div className="flex items-center gap-3 border-b border-[#b3bdd0] pb-3 shrink-0">
        <div className="p-2.5 rounded-xl bg-[#cfd6e2] text-[#7c5814] border border-[#8c631a]/40 shrink-0">
          <Sparkles className="w-5 h-5 text-[#7c5814]" />
        </div>
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#161e2e] truncate">
            Hermetic Qabalah Guide &amp; Oracle
          </h2>
          <p className="text-xs text-[#4b576e] truncate">
            Pathworking meditations, 777 attributions, and Hermetic synthesis
          </p>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 text-xs shrink-0">
        {QUICK_PROMPTS.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleQuickPrompt(item.query)}
            className="min-h-[40px] sm:min-h-[36px] px-3.5 py-1.5 rounded-xl bg-[#cfd6e2] border border-[#b3bdd0] text-[#2c364a] hover:border-[#8c631a] hover:text-[#5e400b] transition-colors whitespace-nowrap shrink-0"
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
                ? 'bg-[#c5cede] border-[#8c631a]/50 text-[#161e2e] ml-3 sm:ml-8'
                : 'bg-[#cfd6e2] border-[#b3bdd0] text-[#242e42] mr-0 sm:mr-4'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {m.role === 'user' ? (
                <User className="w-4 h-4 text-[#7c5814]" />
              ) : (
                <Bot className="w-4 h-4 text-[#7c5814]" />
              )}
            </div>
            <div className="min-w-0 flex-1 whitespace-pre-wrap break-words font-sans">
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#7c5814] p-3.5 bg-[#cfd6e2] rounded-xl border border-[#b3bdd0]">
            <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
            <span>Consulting Hermetic Archives...</span>
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
          placeholder="Ask about Sephiroth, Tarot, or pathworking..."
          className="flex-1 min-w-0 min-h-[46px] px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#cfd6e2] border border-[#aeb9cc] text-base sm:text-sm text-[#161e2e] placeholder-[#526078] focus:outline-none focus:border-[#8c631a]"
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          aria-label="Send message"
          className="min-h-[46px] min-w-[46px] px-3.5 sm:px-5 rounded-xl bg-[#9a7022]/16 border border-[#8c631a] text-[#5e400b] hover:bg-[#8c631a] hover:text-[#f5f1e6] font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 disabled:opacity-45 shrink-0 whitespace-nowrap"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
