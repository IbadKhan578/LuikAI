import React, { useEffect, useRef, useState } from "react";
import Section from "../components/Section";
import { sendChatMessage } from "../api/client";

const SUGGESTIONS = [
  "What is leukemia?",
  "How do I read the Grad-CAM overlay?",
  "How accurate is luikAI?",
  "What are the model's limitations?",
];

const GREETING = {
  role: "assistant",
  content:
    "Hello — I'm the luikAI Assistant. I can help explain leukemia basics, how to use this platform, and how to interpret your prediction results and Grad-CAM visualizations. What would you like to know?",
};

export default function Chatbot() {
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  // ✅ thread id hook MUST be here
  const threadId = useRef(
    localStorage.getItem("thread_id") || crypto.randomUUID()
  );

  // ✅ effect MUST be here
  useEffect(() => {
    localStorage.setItem("thread_id", threadId.current);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function submit(text) {
    if (!text.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const { reply } = await sendChatMessage(
        text,
        threadId.current
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
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
    <Section
      eyebrow="Assistant"
      title="Ask the luikAI medical assistant"
      description="A context-aware chatbot for leukemia education, model interpretation, and platform guidance. It offers general information only, not a diagnosis."
      className="!pb-10"
    >
      <div className="card mx-auto flex h-[34rem] max-w-3xl flex-col overflow-hidden">
        <div
          ref={scrollRef}
          className="flex-1 space-y-4 overflow-y-auto px-6 py-6"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-violet text-slide"
                    : "bg-slide-dim text-ink"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[70%] rounded-2xl bg-slide-dim px-4 py-3 text-sm text-ink/50">
                Thinking…
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-ink/10 px-6 py-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => submit(s)}
              className="rounded-full border border-ink/10 px-3 py-1.5 text-xs text-ink/60 transition-colors hover:border-violet hover:text-violet"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          className="flex items-center gap-3 border-t border-ink/10 px-6 py-4"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            className="flex-1 rounded-full border border-ink/15 bg-slide px-4 py-2.5 text-sm outline-none focus:border-violet"
          />
          <button
            type="submit"
            className="btn-primary !px-5 !py-2.5 text-xs"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </div>

      <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-ink/40">
        This assistant provides general educational information and does not
        replace professional medical advice or diagnosis.
      </p>
    </Section>
  );
}