import React from "react";

export default function Section({ id, eyebrow, title, description, children, className = "" }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-6 py-20 lg:px-10 ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-12 max-w-2xl">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          {title && <h2 className="font-display text-3xl font-semibold sm:text-4xl">{title}</h2>}
          {description && <p className="mt-4 text-ink/60">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
