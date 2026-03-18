"use client";

import { experience } from "@/lib/data";
import FadeIn from "../ui/FadeIn";
import SectionHeader from "../ui/SectionHeader";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-pad bg-zinc-50 dark:bg-zinc-950/50"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="04. Experience"
          title="Where I've contributed"
          subtitle="Open-source work and collaborative development experience."
        />

        <div className="relative max-w-2xl">
          {/* Vertical timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

          <div className="space-y-10 pl-12">
            {experience.map((exp, i) => (
              <FadeIn key={exp.id} delay={i * 0.15}>
                <div className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[2.15rem] top-1.5 w-3 h-3 rounded-full border-2 border-accent bg-surface-light dark:bg-surface-dark group-hover:bg-accent transition-colors duration-300" />

                  {/* Card */}
                  <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:border-accent/40 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100">
                          {exp.role}
                        </h3>
                        <p className="font-body text-accent text-sm font-medium mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                    <p className="font-body text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {exp.description}
                    </p>
                    <span className="mt-3 inline-block tag">{exp.type}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
