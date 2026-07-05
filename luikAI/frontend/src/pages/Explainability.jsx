import React from "react";
import Section from "../components/Section";
import ViewportFrame from "../components/ViewportFrame";
import Reveal from "../components/Reveal";

const SAMPLES = [
  {
    label: "SAMPLE 04",
    title: "Nuclear region emphasis",
    body: "Heat concentrates around an enlarged, irregular nucleus — a pattern commonly associated with lymphoblasts.",
    img: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=700&auto=format&fit=crop",
    ring: "rose",
  },
  {
    label: "SAMPLE 11",
    title: "Cytoplasmic boundary focus",
    body: "Activation traces the cell membrane and cytoplasm, reflecting a texture-driven distinction from normal lymphocytes.",
    img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=700&auto=format&fit=crop",
    ring: "teal",
  },
  {
    label: "SAMPLE 22",
    title: "Diffuse low-confidence case",
    body: "A flatter, more spread-out heatmap often correlates with lower model confidence — a signal worth flagging for review.",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=700&auto=format&fit=crop",
    ring: "violet",
  },
];

export default function Explainability() {
  return (
    <div>
      <Section
        eyebrow="Explainability"
        title="Why a prediction alone isn't enough"
        description="In clinical and research settings, a black-box model is a liability. luikAI uses Grad-CAM so every prediction comes with a visible, checkable reason."
      >
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="card space-y-5 p-8">
              <p className="eyebrow">What is Grad-CAM?</p>
              <p className="text-sm leading-relaxed text-ink/70">
                Gradient-weighted Class Activation Mapping (Grad-CAM) traces
                how strongly each region of an image influenced the CNN's
                final decision. It looks at the model's last convolutional
                layer — where spatial detail is still intact — and asks:
                "which pixels, if changed, would move this prediction the
                most?"
              </p>
              <p className="text-sm leading-relaxed text-ink/70">
                The result is a heatmap where warm colors (red, orange,
                yellow) mark regions of high influence, and cool colors
                (blue, dark) mark regions the model largely ignored.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card space-y-5 p-8">
              <p className="eyebrow">Why interpretability matters in medical AI</p>
              <ul className="space-y-3 text-sm leading-relaxed text-ink/70">
                <li>
                  <span className="font-semibold text-ink">Trust:</span> clinicians and
                  students can sanity-check whether the model is focusing on
                  cellular features, not artifacts like staining or lighting.
                </li>
                <li>
                  <span className="font-semibold text-ink">Error detection:</span> a
                  heatmap that lights up background or slide edges signals a
                  prediction that shouldn't be trusted.
                </li>
                <li>
                  <span className="font-semibold text-ink">Education:</span> Grad-CAM
                  visualizations double as teaching material for what
                  distinguishes leukemic cells morphologically.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="Reference gallery" title="Sample Grad-CAM visualizations">
        <div className="grid gap-10 sm:grid-cols-3">
          {SAMPLES.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="flex flex-col items-center gap-5 text-center">
              <ViewportFrame size={220} label={s.label} ring={s.ring}>
                <img src={s.img} alt={s.title} className="h-full w-full object-cover" />
              </ViewportFrame>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-ink/60">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="rounded-2xl border border-amber/30 bg-amber/10 px-6 py-5 text-sm leading-relaxed text-ink/70">
          <span className="font-semibold text-ink">A heatmap is a clue, not a verdict.</span>{" "}
          Grad-CAM explains what the model paid attention to — it does not
          confirm the model is medically correct. Always pair visual
          explanations with expert review.
        </div>
      </Section>
    </div>
  );
}
