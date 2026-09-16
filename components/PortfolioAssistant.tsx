"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Bot,
  ChevronDown,
  ExternalLink,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { certifications, education, experience, personal, projects, skills } from "@/lib/data";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const suggestions = ["Who is Ankit?", "Tell me about his internship", "What are his academic details?"];

function getAnswer(question: string) {
  const query = question.toLowerCase();

  if (/\b(hi|hello|hey|namaste)\b/.test(query)) {
    return `Hi! I’m Ankit’s portfolio assistant. Ask me about his background, skills, projects, experience, or how to get in touch.`;
  }

  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("phone") ||
    query.includes("linkedin") ||
    query.includes("hire") ||
    query.includes("reach")
  ) {
    return `You can contact Ankit at ${personal.email} or ${personal.phone}. He is based in ${personal.location}. You can also connect with him on LinkedIn: ${personal.linkedin}.`;
  }

  if (query.includes("who") || query.includes("about") || query.includes("introduce") || query.includes("background")) {
    return `${personal.name} is an ${personal.role.toLowerCase()} from ${personal.location}. ${personal.bio}`;
  }

  if (query.includes("skill") || query.includes("technology") || query.includes("tech stack") || query.includes("know")) {
    return `Ankit works with ${skills.languages.join(", ")}; frontend technologies including ${skills.frontend.join(", ")}; and backend tools such as ${skills.backend.join(", ")}. He also uses ${skills.tools.join(", ")}.`;
  }

  if (query.includes("project") || query.includes("built") || query.includes("portfolio") || query.includes("work")) {
    return `Ankit has built ${projects.length} highlighted projects: ${projects.map((project) => project.title).join(", ")}. His work includes social-impact education, AI-powered deal discovery, barcode shopping, and healthcare AI.`;
  }

  const matchedProject = projects.find((project) =>
    query.includes(project.title.toLowerCase())
  );
  if (matchedProject) {
    return `${matchedProject.title} is ${matchedProject.subtitle.toLowerCase()}. ${matchedProject.description} It uses ${matchedProject.tags.join(", ")}.`;
  }

  if (query.includes("intern") || query.includes("im amigos") || query.includes("iaf")) {
    const internship = experience.find((item) => item.type === "internship");
    return internship
      ? `Ankit worked as a ${internship.role} at ${internship.company} from ${internship.period}. ${internship.description}`
      : "Ankit’s internship details are not currently listed.";
  }

  if (query.includes("experience") || query.includes("contributor") || query.includes("open source")) {
    return `Ankit has ${experience.length} listed open-source experiences, including contributions to ${experience
      .map((item) => item.company.split("—")[0].trim())
      .join(", ")}. He has worked on feature enhancements, bug fixes, and collaborative code reviews.`;
  }

  if (
    query.includes("education") ||
    query.includes("academic") ||
    query.includes("study") ||
    query.includes("college") ||
    query.includes("university") ||
    query.includes("school") ||
    query.includes("degree") ||
    query.includes("sgpa") ||
    query.includes("percentage")
  ) {
    return `Ankit is pursuing ${education[0].degree} at ${education[0].institution} in ${education[0].location} (${education[0].period}) with ${education[0].grade}. He completed ${education[1].degree} at ${education[1].institution} with ${education[1].grade}.`;
  }

  if (query.includes("certif") || query.includes("achievement")) {
    return `Ankit has ${certifications.length} certifications, including IBM Granite Model for Software Development, Artificial Intelligence from Samsung Innovation Campus, and Google Analytics.`;
  }

  if (query.includes("resume") || query.includes("cv")) {
    return `You can download Ankit’s resume using the Resume button in the navigation bar.`;
  }

  return `I can answer questions about Ankit’s background, internship, academic details, skills, ${projects.length} projects, experience, certifications, and contact details. Try asking “Tell me about his internship.”`;
}

export default function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: `Hey! I’m Ankit’s AI portfolio assistant. Ask me anything about his work, skills, or background.`,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const askQuestion = (question: string) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", content: trimmedQuestion },
      { id: Date.now() + 1, role: "assistant", content: getAnswer(trimmedQuestion) },
    ]);
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askQuestion(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 md:bottom-8 md:right-8">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Ask Ankit assistant"
          className="mb-4 flex h-[min(620px,calc(100vh-120px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-surface-light shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-950 px-5 py-4 text-white dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-zinc-900">
                <Bot size={21} />
              </div>
              <div>
                <p className="font-display text-sm font-bold">Ask Ankit</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400">
                  Portfolio assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close assistant"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2.5 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    message.role === "user"
                      ? "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                      : "bg-accent text-zinc-900"
                  }`}
                >
                  {message.role === "user" ? <User size={14} /> : <Sparkles size={14} />}
                </div>
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-tr-sm bg-zinc-900 text-white dark:bg-zinc-800"
                      : "rounded-tl-sm bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => askQuestion(suggestion)}
                  className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:border-accent hover:bg-accent/10 dark:border-zinc-800 dark:text-zinc-400"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="border-t border-zinc-200 p-3 dark:border-zinc-800">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-1 dark:border-zinc-800 dark:bg-zinc-900">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Ankit..."
                aria-label="Ask a question about Ankit"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="rounded-lg bg-accent p-2 text-zinc-900 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send question"
              >
                <Send size={15} />
              </button>
            </div>
            <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-wider text-zinc-400">
              Answers are based on this portfolio
            </p>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen((open) => !open)}
        className="group flex items-center gap-2 rounded-full bg-accent px-4 py-3 font-display text-sm font-bold text-zinc-900 shadow-lg shadow-accent/20 transition-all hover:-translate-y-1 hover:bg-accent-dark"
        aria-label={isOpen ? "Close Ask Ankit assistant" : "Open Ask Ankit assistant"}
      >
        {isOpen ? <ChevronDown size={18} /> : <Sparkles size={18} />}
        <span>{isOpen ? "Close" : "Ask Ankit"}</span>
        {!isOpen && <ExternalLink size={14} className="transition-transform group-hover:rotate-12" />}
      </button>
    </div>
  );
}
