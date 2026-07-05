import React from "react";
import Section from "../components/Section";
import Reveal from "../components/Reveal";

const ARCHITECTURE = [
  { layer: "Conv Block 1", detail: "3 → 32 channels, 3×3 conv ×2, BatchNorm, ReLU, MaxPool" },
  { layer: "Conv Block 2", detail: "32 → 64 channels, 3×3 conv ×2, BatchNorm, ReLU, MaxPool" },
  { layer: "Conv Block 3", detail: "64 → 128 channels, 3×3 conv ×2, BatchNorm, ReLU, MaxPool" },
  { layer: "Conv Block 4", detail: "128 → 256 channels — Grad-CAM target layer" },
  { layer: "Classifier head", detail: "Global average pool → Dropout → FC(256→128) → FC(128→4)" },
];

const LIMITATIONS = [
  "Trained on a specific, limited public dataset — performance may drop on images from different microscopes, staining protocols, or patient populations.",
  "Only recognizes the classes it was trained on and cannot flag rare or out-of-distribution conditions.",
  "Cannot incorporate patient history, symptoms, or other lab values that a hematologist would normally consider.",
  "Confidence scores reflect statistical certainty within the model, not clinical certainty.",
];

const FUTURE = [
  "Expand the dataset with multi-institution, multi-stain samples to improve generalization.",
  "Add uncertainty estimation so the model can flag low-confidence or ambiguous cases explicitly.",
  "Explore attention-based architectures alongside CNNs for richer explainability.",
  "Pursue clinical validation studies with pathologist-in-the-loop evaluation.",
];

export default function About() {
  return (
    <div>
      <Section
        eyebrow="Research"
        title="Dataset, architecture, and evaluation"
        description="Full transparency on how luikAI was built, what it was tested on, and where it still falls short."
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="card space-y-4 p-8">
              <p className="eyebrow">Dataset</p>
              <p className="text-sm leading-relaxed text-ink/70">
                The CNN was trained on a labeled collection of microscopic
                peripheral blood smear images, spanning normal (benign)
                lymphocytes and multiple acute lymphoblastic leukemia (ALL)
                subtypes. Images were standardized to a fixed resolution and
                augmented (rotation, flip, color jitter) to improve
                robustness before training.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card space-y-4 p-8">
              <p className="eyebrow">Preprocessing</p>
              <p className="text-sm leading-relaxed text-ink/70">
                Each image is resized to 224×224, converted to a tensor, and
                normalized using ImageNet channel statistics. The same
                pipeline is applied at inference time on the Predict page to
                keep training and serving conditions consistent.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="Architecture" title="Model overview" className="!pt-0">
        <Reveal>
          <div className="card overflow-hidden">
            {ARCHITECTURE.map((row, i) => (
              <div
                key={row.layer}
                className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between ${
                  i !== ARCHITECTURE.length - 1 ? "border-b border-ink/10" : ""
                }`}
              >
                <span className="font-mono text-sm font-medium text-violet">{row.layer}</span>
                <span className="text-sm text-ink/60">{row.detail}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section eyebrow="Evaluation" title="Accuracy results" className="!pt-0">
        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="card p-8 text-center">
              <p className="font-display text-5xl font-semibold text-teal">96%</p>
              <p className="mt-3 eyebrow">Training accuracy</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card p-8 text-center">
              <p className="font-display text-5xl font-semibold text-violet">93%</p>
              <p className="mt-3 eyebrow">Testing accuracy</p>
            </div>
          </Reveal>
        </div>
        <p className="mt-6 text-sm text-ink/50">
          Accuracy figures reflect performance on the project's own held-out
          evaluation split and should not be read as a guarantee of
          real-world clinical performance.
        </p>
      </Section>

      <Section eyebrow="Honesty" title="Limitations" className="!pt-0">
        <Reveal>
          <ul className="card space-y-4 p-8 text-sm leading-relaxed text-ink/70">
            {LIMITATIONS.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section eyebrow="Roadmap" title="Future research directions" className="!pt-0">
        <Reveal>
          <ul className="card space-y-4 p-8 text-sm leading-relaxed text-ink/70">
            {FUTURE.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </div>
  );
}
