"use client";

import { personal } from "@/lib/data";
import FadeIn from "../ui/FadeIn";
import SectionHeader from "../ui/SectionHeader";
import { Github, Linkedin, MapPin, Phone, Mail } from "lucide-react";

const stats = [
  { value: "3+", label: "Projects Built" },
  { value: "6/6", label: "PRs Merged" },
  { value: "5+", label: "Certifications" },
  { value: "2024", label: "Started B.Tech" },
];

export default function About() {
  return (
    <section id="about" className="section-pad max-w-7xl mx-auto">
      <SectionHeader label="01. About Me" title="Who am I?" />

      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left — Text */}
        <FadeIn delay={0.1}>
          <div className="space-y-5">
            <p className="font-body text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              {personal.bio}
            </p>
            <p className="font-body text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Currently pursuing my B.Tech in Computer Science at Deen Dayal
              Upadhyay Gorakhpur University, I actively contribute to
              open-source projects and hackathons while building real-world
              solutions that create impact.
            </p>

            {/* Contact Info */}
            <div className="pt-4 space-y-2">
              {[
                { icon: MapPin, text: personal.location },
                { icon: Mail, text: personal.email, href: `mailto:${personal.email}` },
                { icon: Phone, text: personal.phone },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={15} className="text-accent flex-shrink-0" />
                  {href ? (
                    <a
                      href={href}
                      className="font-mono text-sm text-zinc-600 dark:text-zinc-400 hover:text-accent transition-colors"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
                      {text}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="pt-2 flex gap-3">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-sm hover:border-accent hover:text-accent transition-all font-display font-medium"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-sm hover:border-accent hover:text-accent transition-all font-display font-medium"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Right — Stats */}
        <FadeIn delay={0.25}>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:border-accent/50 transition-colors group"
              >
                <div className="font-display font-extrabold text-4xl text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors">
                  {value}
                </div>
                <div className="font-body text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Decorative card */}
          <div className="mt-4 p-5 rounded-2xl bg-accent/10 border border-accent/20">
            <p className="font-mono text-xs text-accent tracking-widest mb-2">
              CURRENT FOCUS
            </p>
            <p className="font-body text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
              Building full-stack AI applications, contributing to open source,
              and sharpening DSA skills while pursuing B.Tech CSE.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
