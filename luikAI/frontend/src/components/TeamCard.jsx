import React from "react";

export default function TeamCard({ name, role, initials, accent = "violet" }) {
  const ring = {
    violet: "border-violet/30 text-violet",
    rose: "border-rose/30 text-rose",
    teal: "border-teal/30 text-teal",
  }[accent];

  return (
    <div className="card flex flex-col items-center gap-4 p-8 text-center transition-transform hover:-translate-y-1">
      <div className={`flex h-24 w-24 items-center justify-center rounded-full border-4 bg-white font-display text-2xl font-semibold ${ring}`}>
        {initials}
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold">{name}</h3>
        <p className="eyebrow mt-1">{role}</p>
      </div>
    </div>
  );
}
