import React from "react";
import { Link } from "react-router-dom";
import ViewportFrame from "../components/ViewportFrame";
import Section from "../components/Section";
import Reveal from "../components/Reveal";

const STEPS = [
  {
    tag: "FIG. 01",
    title: "Upload a specimen",
    body: "Submit a microscopic blood smear image in JPG or PNG format directly from your browser.",
  },
  {
    tag: "FIG. 02",
    title: "CNN classification",
    body: "A convolutional neural network analyzes cellular structure and returns a predicted class with a confidence score.",
  },
  {
    tag: "FIG. 03",
    title: "Grad-CAM explanation",
    body: "A heatmap overlay shows exactly which regions of the cell informed the model's decision, in plain view.",
  },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-28">
          <Reveal>
            <p className="eyebrow mb-5">Explainable AI · Hematology research</p>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              See what the model sees, cell by cell.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/60">
              luikAI classifies leukemia subtypes from microscopic blood cell
              images with a trained CNN, then shows its reasoning through
              Grad-CAM visual explanations — built for transparency, not
              black-box predictions.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/predict" className="btn-primary">
                Analyze a sample
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link to="/explainability" className="btn-secondary">
                How Grad-CAM works
              </Link>
            </div>
            <div className="mt-12 flex gap-10 hairline pt-8">
              <div>
                <p className="font-display text-2xl font-semibold">96%</p>
                <p className="mt-1 text-xs text-ink/50">Training accuracy</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold">93%</p>
                <p className="mt-1 text-xs text-ink/50">Testing accuracy</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold">4</p>
                <p className="mt-1 text-xs text-ink/50">Detected classes</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="flex justify-center">
            <ViewportFrame size={360} label="LIVE SPECIMEN VIEW" scanning ring="teal">
              <img
                src="https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?q=80&w=800&auto=format&fit=crop"
                alt="Microscopic view of stained blood cells"
                className="h-full w-full object-cover"
              />
            </ViewportFrame>
          </Reveal>
        </div>
      </section>

      {/* WHAT IS LEUKEMIA */}
      <Section
        eyebrow="Background"
        title="A fast-moving disease that rewards early, careful reading"
        description="Leukemia is a cancer of blood-forming tissue that produces abnormal white blood cells. Recognizing subtle morphological patterns in a blood smear is a skill built over years of training — luikAI is designed as a second set of eyes, not a replacement for one."
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.tag} delay={i * 100}>
              <div className="card h-full p-7">
                <p className="eyebrow">{step.tag}</p>
                <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA BAND */}
      <Section className="!pt-0">
        <Reveal>
          <div className="card flex flex-col items-center gap-6 overflow-hidden bg-ink p-12 text-center text-slide sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="font-display text-2xl font-semibold sm:text-3xl">
                Ready to inspect a specimen?
              </h3>
              <p className="mt-2 max-w-md text-sm text-slide/60">
                Upload an image and get a classification with a full visual
                explanation in seconds.
              </p>
            </div>
            <Link to="/predict" className="btn-primary !bg-teal hover:!bg-teal-light">
              Go to Predict
            </Link>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
