import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sendChatMessage } from "../api/client";

const GREETING = {
  role: "assistant",
  content:
    "Hi, I'm the luikAI Assistant. Ask me about leukemia basics, how predictions work, or how to read a Grad-CAM heatmap.",
};

export default function FloatingChatbot() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Don't duplicate the full chatbot UI on the dedicated Chatbot page.
  const hideWidget = location.pathname === "/chatbot";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  if (hideWidget) return null;

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const { reply } = await sendChatMessage(text, nextMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I couldn't reach the assistant service just now. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[26rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-panel animate-fadeUp">
          <div className="flex items-center justify-between border-b border-ink/10 bg-ink px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-teal" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
              </span>
              <p className="font-body text-sm font-semibold text-slide">luikAI Assistant</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slide/60 hover:text-slide"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-violet text-slide"
                    : "bg-slide-dim text-ink"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[70%] rounded-2xl bg-slide-dim px-3.5 py-2.5 text-sm text-ink/50">
                Thinking…
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-ink/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about leukemia, results, Grad-CAM…"
              className="flex-1 rounded-full border border-ink/15 bg-slide px-4 py-2 text-sm outline-none focus:border-violet"
            />
            <button type="submit" className="btn-primary !px-4 !py-2 text-xs" disabled={loading}>
              Send
            </button>
          </form>
          <Link
            to="/chatbot"
            className="border-t border-ink/10 px-4 py-2 text-center text-xs font-medium text-violet hover:underline"
          >
            Open full assistant page
          </Link>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-violet text-slide shadow-panel transition-transform hover:scale-105 active:scale-95"
        aria-label="Open luikAI assistant"
      >
        {open ? (
          <span className="text-lg">✕</span>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4h-1A2.5 2.5 0 0 1 2 13.5v0"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="9.5" r="1" fill="currentColor" />
            <circle cx="13" cy="9.5" r="1" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
