"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import FadeIn from "../ui/FadeIn";
import SectionHeader from "../ui/SectionHeader";
import { Github, ExternalLink } from "lucide-react";

const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="section-pad max-w-7xl mx-auto">
      <SectionHeader
        label="03. Projects"
        title="Things I've built"
        subtitle="A selection of projects that demonstrate my skills across the stack."
      />

      {/* Filter Tabs */}
      <FadeIn delay={0.1} className="mb-10 flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-200 ${
              filter === tag
                ? "bg-accent text-zinc-900 font-semibold"
                : "border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-accent hover:text-accent"
            }`}
          >
            {tag}
          </button>
        ))}
      </FadeIn>

      {/* Project Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.1}>
            <div className="group h-full flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 overflow-hidden hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5">
              {/* Card Header */}
              <div className="p-6 pb-4 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{project.icon}</span>
                  <span className="tag text-xs">{project.impact}</span>
                </div>

                <h3 className="font-display font-bold text-xl text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="font-body text-sm text-accent/80 font-medium mb-3">
                  {project.subtitle}
                </p>
                <p className="font-body text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="px-6 pb-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer Links */}
              <div className="px-6 pb-5 flex items-center gap-3 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-accent transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={13} /> Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-accent transition-colors"
                    aria-label="Live demo"
                  >
                    <ExternalLink size={13} /> Live
                  </a>
                )}
                {!project.live && (
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
                    Demo coming soon
                  </span>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* GitHub CTA */}
      <FadeIn delay={0.3} className="mt-12 text-center">
        <a
          href="https://github.com/ankitsingyadav"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-display font-semibold text-sm hover:border-accent hover:text-accent transition-all"
        >
          <Github size={16} /> See more on GitHub
        </a>
      </FadeIn>
    </section>
  );
}
