import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/predict", label: "Predict" },
  { to: "/explainability", label: "Explainability" },
  { to: "/chatbot", label: "Assistant" },
  { to: "/team", label: "Team" },
  { to: "/about", label: "Research" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-slide/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet">
            <span className="h-2.5 w-2.5 rounded-full bg-slide" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            luik<span className="text-violet">AI</span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-body text-sm font-medium transition-colors ${
                  isActive ? "text-violet" : "text-ink/70 hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/predict" className="btn-primary !py-2.5 !px-5 text-xs">
            Analyze a sample
          </NavLink>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-[1.5px] w-4 bg-ink transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-[1.5px] w-4 bg-ink transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-slide px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-body text-sm font-medium ${isActive ? "text-violet" : "text-ink/70"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
