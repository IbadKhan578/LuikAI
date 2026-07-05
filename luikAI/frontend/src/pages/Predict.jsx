import React, { useState } from "react";
import Section from "../components/Section";
import UploadBox from "../components/UploadBox";
import ResultPanel from "../components/ResultPanel";
import { predictImage } from "../api/client";

export default function Predict() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleFileSelected(selected) {
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setError(null);
  }

  async function handleAnalyze() {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const data = await predictImage(file);
      setResult(data);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Something went wrong while analyzing this image. Please confirm the backend service is running and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section
      eyebrow="Predict"
      title="Upload a specimen for analysis"
      description="Choose a clear, well-lit microscopic blood smear image. luikAI will classify the cell and generate a Grad-CAM explanation for its prediction."
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <UploadBox onFileSelected={handleFileSelected} preview={preview} />

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <>
                <span className="h-2 w-2 animate-ping rounded-full bg-slide" />
                Analyzing image…
              </>
            ) : (
              "Analyze image"
            )}
          </button>

          {error && (
            <p className="rounded-xl border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose">
              {error}
            </p>
          )}

          <div className="card p-6 text-sm leading-relaxed text-ink/60">
            <p className="eyebrow mb-2">Before you upload</p>
            <ul className="list-inside list-disc space-y-1.5">
              <li>Use a focused, single-cell or field-of-view smear image</li>
              <li>Avoid heavily cropped or filtered images</li>
              <li>Results are for research and educational demonstration only</li>
            </ul>
          </div>
        </div>

        <div>
          {!result && !loading && (
            <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-ink/15 text-center text-sm text-ink/40">
              Your prediction and Grad-CAM explanation will appear here.
            </div>
          )}
          {loading && (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 rounded-2xl border border-ink/10 bg-white/50 text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-violet/20 border-t-violet" />
              <p className="text-sm text-ink/50">Running CNN inference and generating Grad-CAM…</p>
            </div>
          )}
          <ResultPanel result={result} />
        </div>
      </div>
    </Section>
  );
}
