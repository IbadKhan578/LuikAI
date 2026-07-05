import React, { useCallback, useRef, useState } from "react";

export default function UploadBox({ onFileSelected, preview }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = useCallback(
    (files) => {
      const file = files?.[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelected(file);
      }
    },
    [onFileSelected]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
        dragging ? "border-violet bg-violet/5" : "border-ink/15 bg-white/50"
      }`}
    >
      {preview ? (
        <img
          src={preview}
          alt="Selected blood smear preview"
          className="mb-4 h-40 w-40 rounded-full border-4 border-violet/30 object-cover shadow-panel"
        />
      ) : (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet/10 text-violet">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 16V4m0 0L7 9m5-5 5 5M5 20h14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      <p className="font-body text-sm font-medium text-ink">
        Drag and drop a microscopic blood smear image
      </p>
      <p className="mt-1 text-xs text-ink/50">JPG or PNG, up to 10MB</p>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="btn-secondary mt-5 !py-2 !px-5 text-xs"
      >
        Browse files
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
