import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  personal,
  skills,
  projects,
  experience,
  education,
  certifications,
} from "@/lib/data";

export const runtime = "nodejs";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

function buildSystemPrompt(isRecruiter: boolean): string {
  return `You are Ask Ankit AI, the official AI assistant for Ankit Yadav's professional portfolio.

Your purpose is to help recruiters, hiring managers, developers, and visitors understand Ankit's professional background.

IMPORTANT RULES:

1. Use ONLY the verified information in the knowledge base below.
2. Never invent or assume information.
3. Never fabricate employment, companies, job titles, years of experience, technologies, achievements, certifications, project results, salary, or personal information.
4. Never claim to be Ankit.
5. You are an AI assistant representing Ankit's public professional portfolio.
6. If information is not available in the knowledge base, say:
"I don't have that information in Ankit's portfolio. You can contact Ankit directly for more details."
7. Do not make up links.
8. When discussing a project, include:
   - Project name
   - What it does / problem it solves
   - Technologies used
   - Live demo if available
   - GitHub if available
9. Keep answers professional, clear, and useful.
10. Prefer concise answers unless the user asks for more detail.

${isRecruiter
      ? `
RECRUITER MODE IS ACTIVE.

The visitor is likely a recruiter or hiring manager.

Prioritize:
- strongest technical skills
- relevant projects
- full-stack development
- AI/ML experience
- practical experience
- career interests
- internship/job availability
- contact information

Keep recruiter answers concise and professional.
`
      : ""
    }

=== ANKIT'S VERIFIED KNOWLEDGE BASE ===

PERSONAL INFORMATION

Name: ${personal.name}
Role: ${personal.role}
Tagline: ${personal.tagline}
Bio: ${personal.bio}
Location: ${personal.location}
Email: ${personal.email}
Phone: ${personal.phone}
LinkedIn: ${personal.linkedin}
GitHub: ${personal.github}
Resume: ${personal.resumeUrl}

TECHNICAL SKILLS

Programming Languages:
${skills.languages.join(", ")}

Frontend:
${skills.frontend.join(", ")}

Backend:
${skills.backend.join(", ")}

Tools:
${skills.tools.join(", ")}

Soft Skills:
${skills.soft.join(", ")}

PROJECTS

${projects
      .map(
        (p) => `
Project: ${p.title}
Subtitle: ${p.subtitle}
Description: ${p.description}
Technologies: ${p.tags.join(", ")}
Live Demo: ${p.live}
GitHub: ${p.github ?? "Not publicly available"}
Impact: ${p.impact}
`
      )
      .join("\n---\n")}

EXPERIENCE

${experience
      .map(
        (e) => `
Role: ${e.role}
Organization: ${e.company}
Period: ${e.period}
Type: ${e.type}
Description: ${e.description}
`
      )
      .join("\n---\n")}

EDUCATION

${education
      .map(
        (e) => `
Degree: ${e.degree}
Institution: ${e.institution}
Location: ${e.location}
Period: ${e.period}
Grade: ${e.grade}
`
      )
      .join("\n---\n")}

CERTIFICATIONS

${certifications
      .map((c) => `- ${c.title} from ${c.issuer} (${c.date})`)
      .join("\n")}

CAREER INTERESTS

Open to full-stack development, AI/ML engineering roles, and internships.

Interested in building scalable, real-world web applications.

=== END KNOWLEDGE BASE ===

Respond professionally and helpfully.

Use markdown when useful.
`;
}

/**
 * Converts the frontend conversation into valid Gemini history.
 *
 * Gemini requires:
 *
 * user
 * model
 * user
 * model
 *
 * The portfolio's visual welcome message is an assistant message,
 * but it must NOT be sent as model history.
 */
function buildGeminiHistory(
  messages: IncomingMessage[]
): Array<{
  role: "user" | "model";
  parts: [{ text: string }];
}> {
  const cleaned: Array<{
    role: "user" | "model";
    parts: [{ text: string }];
  }> = messages
    .filter(
      (message) =>
        message &&
        typeof message.content === "string" &&
        message.content.trim().length > 0 &&
        (message.role === "user" || message.role === "assistant")
    )
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content.trim() }],
    }));

  // Gemini history must begin with a user message.
  const firstUserIndex = cleaned.findIndex(
    (message) => message.role === "user"
  );

  if (firstUserIndex === -1) {
    return [];
  }

  const history = cleaned.slice(firstUserIndex);

  const normalized: Array<{
    role: "user" | "model";
    parts: [{ text: string }];
  }> = [];

  for (const message of history) {
    const previous = normalized[normalized.length - 1];

    if (!previous) {
      normalized.push({
        role: message.role,
        parts: [{ text: message.parts[0].text }],
      });

      continue;
    }

    // Gemini expects alternating user/model messages.
    // Merge consecutive messages with the same role.
    if (previous.role === message.role) {
      previous.parts[0].text += `\n${message.parts[0].text}`;
    } else {
      normalized.push({
        role: message.role,
        parts: [{ text: message.parts[0].text }],
      });
    }
  }

  return normalized;
};


export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    console.error(
      "GOOGLE_GENERATIVE_AI_API_KEY is missing from environment variables."
    );

    return Response.json(
      {
        error: "AI service is not configured.",
      },
      { status: 500 }
    );
  }

  let body: {
    messages?: IncomingMessage[];
    isRecruiter?: boolean;
  };

  try {
    body = await req.json();
  } catch {
    return Response.json(
      {
        error: "Invalid request body.",
      },
      { status: 400 }
    );
  }

  const messages = body.messages ?? [];
  const isRecruiter = Boolean(body.isRecruiter);

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json(
      {
        error: "No messages provided.",
      },
      { status: 400 }
    );
  }

  // Validate incoming messages.
  for (const message of messages) {
    if (
      !message ||
      (message.role !== "user" && message.role !== "assistant") ||
      typeof message.content !== "string" ||
      !message.content.trim() ||
      message.content.length > 2000
    ) {
      return Response.json(
        {
          error: "Invalid message format or message too long.",
        },
        { status: 400 }
      );
    }
  }

  // The final message must be the user's new question.
  const lastMessage = messages[messages.length - 1];

  if (lastMessage.role !== "user") {
    return Response.json(
      {
        error: "The latest message must be from the user.",
      },
      { status: 400 }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      systemInstruction: buildSystemPrompt(isRecruiter),
    });

    /*
     * Everything except the latest user message becomes history.
     *
     * This is important because sendMessageStream() sends the
     * latest user message separately.
     */
    const previousMessages = messages.slice(0, -1);

    const history = buildGeminiHistory(previousMessages);

    /*
     * Debug information without exposing the API key.
     */
    console.log("Ask Ankit AI request:", {
      messageCount: messages.length,
      historyCount: history.length,
      isRecruiter,
      firstHistoryRole: history[0]?.role ?? "none",
      lastUserMessageLength: lastMessage.content.length,
    });

    const chat = model.startChat({
      history,
    });

    const streamResult = await chat.sendMessageStream(
      lastMessage.content.trim()
    );

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResult.stream) {
            try {
              const text = chunk.text();

              if (text) {
                controller.enqueue(encoder.encode(text));
              }
            } catch {
              // Some chunks may not contain text.
              // Ignore those chunks safely.
            }
          }

          controller.close();
        } catch (error) {
          console.error("Gemini streaming error:", error);

          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown Gemini error";

    /*
     * Log the actual server-side error for debugging,
     * but don't expose internal details to the browser.
     */
    console.error("Gemini error details:", message);

    return Response.json(
      {
        error: "An error occurred while contacting the AI service.",
      },
      { status: 500 }
    );
  }
}