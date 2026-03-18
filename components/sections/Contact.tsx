"use client";

import { useState, FormEvent } from "react";
import { personal } from "@/lib/data";
import FadeIn from "../ui/FadeIn";
import SectionHeader from "../ui/SectionHeader";
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react";

// ── Replace with your Formspree form ID ─────────────────
// 1. Go to https://formspree.io → Sign up free
// 2. Create New Form → enter your email
// 3. Copy the URL and paste it below
const FORMSPREE_URL = "https://formspree.io/f/xdawygnw";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.from_name,
          email: formData.from_email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ from_name: "", from_email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contact" className="section-pad max-w-7xl mx-auto">
      <SectionHeader
        label="07. Contact"
        title="Let's work together"
        subtitle="Have a project in mind or want to connect? My inbox is always open."
      />

      <div className="grid md:grid-cols-2 gap-14 items-start">
        {/* Left — Info */}
        <FadeIn delay={0.1} className="space-y-6">
          <p className="font-body text-zinc-600 dark:text-zinc-400 leading-relaxed">
            I&apos;m currently open to internship opportunities, freelance
            projects, and open-source collaborations. Whether you have a
            question, a proposal, or just want to say hi — feel free to reach
            out!
          </p>

          <div className="space-y-4">
            {[
              {
                icon: Mail,
                label: "Email",
                value: personal.email,
                href: `mailto:${personal.email}`,
              },
              {
                icon: Github,
                label: "GitHub",
                value: "github.com/ankitsingyadav",
                href: personal.github,
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value: "linkedin.com/in/ankit-singh-yadav",
                href: personal.linkedin,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-accent/50 group transition-all"
              >
                <div className="p-2 rounded-lg bg-accent/10">
                  <Icon size={16} className="text-accent" />
                </div>
                <div>
                  <p className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
                    {label}
                  </p>
                  <p className="font-body text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-accent transition-colors">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </FadeIn>

        {/* Right — Form */}
        <FadeIn delay={0.2}>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-zinc-500 dark:text-zinc-400 tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  required
                  value={formData.from_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-body text-sm placeholder-zinc-400 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-zinc-500 dark:text-zinc-400 tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  name="from_email"
                  required
                  value={formData.from_email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-body text-sm placeholder-zinc-400 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-zinc-500 dark:text-zinc-400 tracking-wide">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project collaboration"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-body text-sm placeholder-zinc-400 focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-zinc-500 dark:text-zinc-400 tracking-wide">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or idea..."
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-body text-sm placeholder-zinc-400 focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-zinc-900 font-display font-bold text-sm hover:bg-accent-dark transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
            >
              {status === "sending" ? (
                <>
                  <span className="w-4 h-4 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={14} /> Send Message
                </>
              )}
            </button>

            {status === "success" && (
              <div className="flex items-center gap-2 text-green-500 text-sm font-body">
                <CheckCircle size={16} />
                Message sent! I&apos;ll get back to you soon. ✅
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-500 text-sm font-body">
                <AlertCircle size={16} />
                Something went wrong. Please email at {personal.email}
              </div>
            )}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
