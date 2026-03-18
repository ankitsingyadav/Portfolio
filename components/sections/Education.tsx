"use client";

import { education } from "@/lib/data";
import FadeIn from "../ui/FadeIn";
import SectionHeader from "../ui/SectionHeader";
import { GraduationCap, MapPin } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="section-pad max-w-7xl mx-auto">
      <SectionHeader label="05. Education" title="My academic path" />

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
        {education.map((edu, i) => (
          <FadeIn key={edu.institution} delay={i * 0.15}>
            <div className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:border-accent/50 transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-accent/10 flex-shrink-0">
                  <GraduationCap size={20} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-zinc-900 dark:text-zinc-100 text-base leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="font-body text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {edu.institution}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="font-mono text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full">
                      {edu.period}
                    </span>
                    <span className="font-mono text-xs text-accent font-semibold">
                      {edu.grade}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <MapPin size={11} className="text-zinc-400" />
                    <span className="font-mono text-xs text-zinc-400">
                      {edu.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
