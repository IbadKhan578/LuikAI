import React from "react";

/**
 * ViewportFrame — luikAI's signature visual motif.
 *
 * A circular "microscope eyepiece" chrome with stage tick marks, used
 * consistently around specimen imagery (hero, Predict previews, Grad-CAM
 * samples) so the whole product feels like it's viewed through one
 * instrument. `scanning` adds a slow vertical scan-line sweep to suggest
 * active analysis.
 */
export default function ViewportFrame({
  children,
  size = 280,
  label,
  scanning = false,
  ring = "violet",
  className = "",
}) {
  const ringColor =
    {
      violet: "border-violet/40",
      rose: "border-rose/40",
      teal: "border-teal/40",
    }[ring] || "border-violet/40";

  const ticks = Array.from({ length: 24 });

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* tick ring */}
      <svg
        className="absolute inset-0 h-full w-full text-ink/25"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {ticks.map((_, i) => {
          const angle = (i / ticks.length) * 360;
          const isMajor = i % 6 === 0;
          return (
            <line
              key={i}
              x1="50"
              y1={isMajor ? "2" : "4"}
              x2="50"
              y2={isMajor ? "7" : "6"}
              stroke="currentColor"
              strokeWidth={isMajor ? "1" : "0.5"}
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}
      </svg>

      {/* main circular viewport */}
      <div
        className={`relative overflow-hidden rounded-full border-[3px] ${ringColor} bg-ink shadow-panel`}
        style={{ width: size * 0.86, height: size * 0.86 }}
      >
        {children}
        {scanning && (
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-teal/25 to-transparent animate-scan" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
      </div>

      {label && (
        <span className="eyebrow absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-ink/10 bg-slide px-3 py-1">
          {label}
        </span>
      )}
    </div>
  );
}
