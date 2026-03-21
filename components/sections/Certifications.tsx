"use client";

import { certifications } from "@/lib/data";
import FadeIn from "../ui/FadeIn";
import SectionHeader from "../ui/SectionHeader";
import { Award, ExternalLink } from "lucide-react";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="section-pad bg-zinc-50 dark:bg-zinc-950/50"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="06. Certifications"
          title="Credentials & achievements"
          subtitle="Professional certifications earned from industry-leading organizations."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <FadeIn key={cert.title} delay={i * 0.08}>
              <div className="group flex flex-col gap-3 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0 mt-0.5">
                    <Award size={16} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-sm text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-accent transition-colors">
                      {cert.title}
                    </h3>
                    <p className="font-body text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                      {cert.issuer}
                    </p>
                    <span className="font-mono text-xs text-accent/80 mt-1.5 block">
                      {cert.date}
                    </span>
                  </div>
                </div>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-accent border border-accent/30 hover:bg-accent/10 rounded-lg px-3 py-1.5 transition-all duration-200 w-fit mt-auto"
                  >
                    <ExternalLink size={12} />
                    View Certificate
                  </a>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}