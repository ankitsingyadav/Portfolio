"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Bot, X, Send, Briefcase } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  id: "initial",
  role: "assistant",
  content:
    "Hi! I'm Ankit's AI assistant 👋\nI can answer questions about his skills, projects, experience, education, AI work, and career interests.\nWhat would you like to know?",
};

const QUICK_QUESTIONS = [
  "Tell me about Ankit",
  "What are his technical skills?",
  "What are his best projects?",
  "What experience does he have with AI?",
  "Is he available for internships?",
  "How can I contact him?",
];

const RECRUITER_QUESTIONS = [
  "Give me a quick candidate summary",
  "What are Ankit's strongest skills?",
  "Which projects best demonstrate his abilities?",
  "Does he have full-stack experience?",
  "What is his AI/ML experience?",
  "How can I contact him?",
  "Show me his resume",
];

export default function AskAnkitAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const sendMessage = useCallback(
    async (userContent: string) => {
      const trimmedContent = userContent.trim();

      if (!trimmedContent || isLoading) {
        return;
      }

      if (trimmedContent.length > 2000) {
        setError("Please keep your message under 2000 characters.");
        return;
      }

      setError(null);

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmedContent,
      };

      const assistantId = `assistant-${Date.now() + 1}`;

      const assistantMsg: Message = {
        id: assistantId,
        role: "assistant",
        content: "",
      };

      /*
       * IMPORTANT:
       * The visual INITIAL_MESSAGE must never be sent to Gemini.
       *
       * We take only actual conversation messages:
       * user -> assistant -> user -> assistant
       */
      const conversationHistory = messages
        .filter((message) => message.id !== "initial")
        .filter((message) => message.content.trim().length > 0)
        .map((message) => ({
          role: message.role,
          content: message.content,
        }));

      const apiMessages = [
        ...conversationHistory,
        {
          role: "user" as const,
          content: trimmedContent,
        },
      ];

      setMessages((previous) => [
        ...previous,
        userMsg,
        assistantMsg,
      ]);

      setInput("");
      setIsLoading(true);

      abortRef.current?.abort();
      abortRef.current = new AbortController();

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: apiMessages,
            isRecruiter,
          }),
          signal: abortRef.current.signal,
        });

        if (!response.ok || !response.body) {
          let errorMessage = `Request failed with status ${response.status}.`;

          try {
            const errorData = await response.json();

            if (typeof errorData?.error === "string") {
              errorMessage = errorData.error;
            }
          } catch {
            // Keep fallback error message.
          }

          throw new Error(errorMessage);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let receivedText = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          const chunk = decoder.decode(value, {
            stream: true,
          });

          if (!chunk) {
            continue;
          }

          receivedText += chunk;

          setMessages((previous) =>
            previous.map((message) =>
              message.id === assistantId
                ? {
                  ...message,
                  content: receivedText,
                }
                : message
            )
          );
        }

        const finalChunk = decoder.decode();

        if (finalChunk) {
          receivedText += finalChunk;

          setMessages((previous) =>
            previous.map((message) =>
              message.id === assistantId
                ? {
                  ...message,
                  content: receivedText,
                }
                : message
            )
          );
        }

        if (!receivedText.trim()) {
          throw new Error("The AI returned an empty response.");
        }
      } catch (err: unknown) {
        if (
          err instanceof Error &&
          err.name === "AbortError"
        ) {
          return;
        }

        console.error("Chat error:", err);

        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";

        setError(message);

        setMessages((previous) =>
          previous.filter(
            (message) => message.id !== assistantId
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, isRecruiter, messages]
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    void sendMessage(input);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      void sendMessage(input);
    }
  };

  const activeQuestions = isRecruiter
    ? RECRUITER_QUESTIONS
    : QUICK_QUESTIONS;

  const showSuggestions = messages.length <= 1;

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            id="ask-ankit-ai-button"
            aria-label="Open Ask Ankit AI chat"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-white shadow-xl transition-all duration-200 hover:scale-105 hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Bot
              className="h-5 w-5"
              aria-hidden="true"
            />

            <span className="hidden text-sm font-medium sm:inline">
              Ask Ankit AI
            </span>
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ask Ankit AI Chat"
          className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
          style={{
            width: "min(90vw, 400px)",
            height: "min(80vh, 600px)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/40">
                  <Bot
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    aria-hidden="true"
                  />
                </div>

                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 dark:border-gray-800" />
              </div>

              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Ask Ankit AI
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Your guide to Ankit&apos;s skills, projects &amp;
                  experience.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                abortRef.current?.abort();
                setIsOpen(false);
              }}
              aria-label="Close chat"
              className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Recruiter Mode */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800/60">
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Briefcase
                className="h-4 w-4 text-orange-500"
                aria-hidden="true"
              />

              🎯 Recruiter Mode
            </span>

            <button
              role="switch"
              aria-checked={isRecruiter}
              aria-label="Toggle Recruiter Mode"
              onClick={() => setIsRecruiter((value) => !value)}
              className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              style={{
                backgroundColor: isRecruiter
                  ? "#2563eb"
                  : "#d1d5db",
              }}
            >
              <span
                className="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform"
                style={{
                  transform: isRecruiter
                    ? "translateX(18px)"
                    : "translateX(2px)",
                }}
              />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto bg-white p-4 dark:bg-gray-900"
            aria-live="polite"
            aria-relevant="additions"
          >
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      message.role === "user"
                        ? "max-w-xs rounded-2xl rounded-br-sm bg-blue-600 px-4 py-2.5 text-sm text-white"
                        : "max-w-xs rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-2.5 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    }
                  >
                    {message.content ? (
                      message.content
                        .split("\n")
                        .map((line, index, array) => (
                          <span key={index}>
                            {line}

                            {index < array.length - 1 && (
                              <br />
                            )}
                          </span>
                        ))
                    ) : (
                      <span className="text-xs italic opacity-50">
                        Thinking…
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {isLoading &&
                messages[messages.length - 1]?.content === "" && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 dark:bg-gray-800">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />

                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{
                          animationDelay: "150ms",
                        }}
                      />

                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{
                          animationDelay: "300ms",
                        }}
                      />
                    </div>
                  </div>
                )}

              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {error}

                  <button
                    onClick={() => setError(null)}
                    className="ml-2 underline hover:no-underline focus:outline-none"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Suggestions */}
          {showSuggestions && (
            <div className="border-t border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/40">
              <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                Suggested Questions
              </p>

              <div className="flex flex-wrap gap-1.5">
                {activeQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => void sendMessage(question)}
                    disabled={isLoading}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 transition-colors hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
            <form
              onSubmit={handleSubmit}
              className="relative flex items-end gap-2"
            >
              <textarea
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask about Ankit..."
                aria-label="Chat message input"
                rows={1}
                disabled={isLoading}
                maxLength={2000}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-100 py-2.5 pl-4 pr-12 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:bg-gray-800"
                style={{
                  maxHeight: "120px",
                }}
              />

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="absolute bottom-2 right-2 rounded-full p-1.5 text-blue-600 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40 dark:text-blue-400 dark:hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-1.5 text-center text-[10px] text-gray-400">
              AI may occasionally make mistakes. Always verify
              important information.
            </p>
          </div>
        </div>
      )}
    </>
  );
}