import React from "react";
import ViewportFrame from "./ViewportFrame";

export default function ResultPanel({ result }) {
  if (!result) return null;

  const {
    predicted_class,
    confidence,
    probabilities,
    original_base64,
    heatmap_base64,
    overlay_base64,
    disclaimer,
  } = result;

  const confidencePct = Math.round(confidence * 100);
  const isBenign = predicted_class.toLowerCase().includes("benign");

  return (
    <div className="animate-fadeUp space-y-10">
      <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Predicted class</p>
          <h3 className="mt-2 font-display text-2xl font-semibold">{predicted_class}</h3>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-full border-4 font-mono text-lg font-semibold ${
              isBenign ? "border-teal/40 text-teal" : "border-rose/40 text-rose"
            }`}
          >
            {confidencePct}%
          </div>
          <div className="text-sm text-ink/60">
            <p className="font-medium text-ink">Confidence</p>
            <p>Top-class probability</p>
          </div>
        </div>
      </div>

      <div>
        <p className="eyebrow mb-6">Side-by-side visual explanation</p>
        <div className="grid gap-10 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-4">
            <ViewportFrame size={200} label="ORIGINAL" ring="violet">
              <img src={`data:image/png;base64,${original_base64}`} alt="Original uploaded sample" className="h-full w-full object-cover" />
            </ViewportFrame>
            <p className="text-center text-xs text-ink/50">Unmodified uploaded specimen</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <ViewportFrame size={200} label="GRAD-CAM" ring="rose">
              <img src={`data:image/png;base64,${heatmap_base64}`} alt="Grad-CAM heatmap" className="h-full w-full object-cover" />
            </ViewportFrame>
            <p className="text-center text-xs text-ink/50">Raw class activation heatmap</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <ViewportFrame size={200} label="OVERLAY" ring="teal" scanning>
              <img src={`data:image/png;base64,${overlay_base64}`} alt="Heatmap overlay on original" className="h-full w-full object-cover" />
            </ViewportFrame>
            <p className="text-center text-xs text-ink/50">Heatmap overlaid on original image</p>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <p className="eyebrow mb-4">Full class probability breakdown</p>
        <div className="space-y-3">
          {probabilities.map((p) => (
            <div key={p.label}>
              <div className="mb-1 flex justify-between text-xs text-ink/60">
                <span>{p.label}</span>
                <span className="font-mono">{(p.probability * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slide-dim">
                <div
                  className="h-full rounded-full bg-violet transition-all duration-700"
                  style={{ width: `${p.probability * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="rounded-xl border border-amber/30 bg-amber/10 px-4 py-3 text-xs leading-relaxed text-ink/70">
        {disclaimer}
      </p>
    </div>
  );
}
