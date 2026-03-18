"use client";

import { skills } from "@/lib/data";
import FadeIn from "../ui/FadeIn";
import SectionHeader from "../ui/SectionHeader";

const categories = [
  {
    label: "Languages",
    emoji: "⚡",
    items: skills.languages,
    color: "from-yellow-400/10 to-yellow-400/5",
    accent: "border-yellow-400/30 group-hover:border-yellow-400/60",
  },
  {
    label: "Frontend",
    emoji: "🎨",
    items: skills.frontend,
    color: "from-blue-400/10 to-blue-400/5",
    accent: "border-blue-400/30 group-hover:border-blue-400/60",
  },
  {
    label: "Backend & DB",
    emoji: "🛠",
    items: skills.backend,
    color: "from-green-400/10 to-green-400/5",
    accent: "border-green-400/30 group-hover:border-green-400/60",
  },
  {
    label: "Tools & Platforms",
    emoji: "🚀",
    items: skills.tools,
    color: "from-purple-400/10 to-purple-400/5",
    accent: "border-purple-400/30 group-hover:border-purple-400/60",
  },
  {
    label: "Soft Skills",
    emoji: "🤝",
    items: skills.soft,
    color: "from-rose-400/10 to-rose-400/5",
    accent: "border-rose-400/30 group-hover:border-rose-400/60",
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-pad bg-zinc-50 dark:bg-zinc-950/50"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="02. Skills"
          title="What I work with"
          subtitle="A curated set of technologies I've used to build real-world projects."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(({ label, emoji, items, color, accent }, i) => (
            <FadeIn key={label} delay={i * 0.08}>
              <div
                className={`group p-6 rounded-2xl border bg-gradient-to-br ${color} border-zinc-200 dark:border-zinc-800 ${accent} transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{emoji}</span>
                  <h3 className="font-display font-bold text-zinc-800 dark:text-zinc-200">
                    {label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Scrolling skills ticker */}
        <FadeIn delay={0.3} className="mt-12 overflow-hidden">
          <div className="flex gap-4 animate-slide-left whitespace-nowrap select-none">
            {[
              ...skills.languages,
              ...skills.frontend,
              ...skills.backend,
              ...skills.tools,
              ...skills.languages,
              ...skills.frontend,
              ...skills.backend,
              ...skills.tools,
            ].map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 font-mono text-sm text-zinc-500 dark:text-zinc-500 flex-shrink-0"
              >
                <span className="text-accent">▸</span> {skill}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
