import React from "react";
import Section from "../components/Section";
import TeamCard from "../components/TeamCard";
import Reveal from "../components/Reveal";

const TEAM = [
  { name: "Saira", role: "Team Leader", initials: "S", accent: "violet" },
  { name: "Ibad Khan", role: "Team Member", initials: "IK", accent: "teal" },
  { name: "Ambreen", role: "Team Member", initials: "A", accent: "rose" },
];

export default function Team() {
  return (
    <Section
      eyebrow="Team"
      title="The people behind luikAI"
      description="A  team working across AI,  machine learning explainability, and interface design."
    >
      <div className="grid gap-8 sm:grid-cols-3">
        {TEAM.map((member, i) => (
          <Reveal key={member.name} delay={i * 100}>
            <TeamCard {...member} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
