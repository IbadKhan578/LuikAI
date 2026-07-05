import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="hairline mt-24 bg-ink text-slide/80">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet">
                <span className="h-2.5 w-2.5 rounded-full bg-ink" />
              </span>
              <span className="font-display text-xl font-semibold text-slide">
                luik<span className="text-violet-light">AI</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slide/60">
              An explainable AI research platform for detecting leukemia
              subtypes from microscopic blood cell images. Built for
              academic demonstration, not clinical diagnosis.
            </p>
          </div>

          <div>
            <p className="eyebrow text-teal-light">Platform</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/predict" className="hover:text-slide">Predict</Link></li>
              <li><Link to="/explainability" className="hover:text-slide">Explainability</Link></li>
              <li><Link to="/chatbot" className="hover:text-slide">Assistant</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-teal-light">Project</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-slide">Research</Link></li>
              <li><Link to="/team" className="hover:text-slide">Team</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-teal-light">Disclaimer</p>
            <p className="mt-4 text-sm leading-relaxed text-slide/60">
              luikAI is a research prototype. It does not provide medical
              diagnoses. Always consult a qualified hematologist-pathologist.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-slide/10 pt-6 text-xs text-slide/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} luikAI Research Project.</span>
          <span className="font-mono">Model v1.0 · CNN + Grad-CAM</span>
        </div>
      </div>
    </footer>
  );
}
