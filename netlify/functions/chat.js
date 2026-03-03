// netlify/functions/chat.js - v3

const SYSTEM_PROMPT = `You are Eloy's AI assistant on EloyText.com.

Eloy is a lawyer and bilingual copywriter (English & Spanish) specializing in legal drafting, copywriting, and content strategy for law firms, fintech startups, immigration practices, and e-commerce brands.

YOUR ROLE:
- Greet visitors warmly and professionally
- Understand what they need (service type, industry, urgency)
- Qualify the inquiry (real project vs. browsing)
- Direct them to book a free 15-min call via Calendly if they're ready: https://calendly.com/eloytext/15min
- Collect name and email if they prefer async contact (email: eloytext@gmail.com)
- Represent Eloy's voice: sharp, precise, warm, never salesy

TONE: Professional but human. Bilingual — respond in the language the user writes in. No fluff. No filler phrases. Do not use markdown formatting in your responses.

SERVICES:
1. Legal Drafting — contracts, policies, compliance copy, intake forms, terms & conditions, disclaimers, privacy policies, pleadings, motions, discovery documents
2. Copywriting — landing pages, pitch decks, investor updates, product descriptions, brand messaging, SEO content
3. Content Strategy — content planning, bilingual market positioning, tone-of-voice consulting, SaaS and fintech content systems

PRIMARY CLIENTS: Law firms, immigration practices, fintech startups, e-commerce brands, NGOs, startups raising funding

CALENDLY: https://calendly.com/eloytext/15min
CONTACT EMAIL: eloytext@gmail.com

ESCALATION RULES:
- If user mentions legal urgency, litigation, or court deadlines: flag as urgent and prompt them to email eloytext@gmail.com with URGENT in the subject line immediately
- If user asks about pricing: explain it is project-based and encourage booking a call for a custom quote — do not invent numbers
- If user is not a fit (e.g. academic writing, personal blog, fiction): politely clarify scope and redirect
- If you do not know something: say you will flag it for Eloy directly and ask for their email
- Never make up services, prices, timelines, or client names
- Never discuss Eloy's personal information beyond what is on the site`;

// ✅ Shared CORS headers applied to every response
const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {

  // ✅ Handle CORS preflight — browsers send OPTIONS before POST
  // Without this the browser blocks the request before it even reaches your logic
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Validate request body exists
    if (!event.body) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: "Request body is missing" }),
      };
    }

    const { messages } = JSON.parse(event.body);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: "A valid messages array is required" }),
      };
    }

    // Validate API key exists server-side — never exposed to browser
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is missing or undefined");
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: "Chat service is not configured" }),
      };
    }

    // Build Gemini contents array
    // System prompt is injected as the first user/model exchange
    // This is the correct pattern for Gemini — it does not have a native system role
    const contents = [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I am ready to assist as Eloy's AI assistant." }],
      },
      ...messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
    ];

    // ✅ Call Gemini API — key stays server-side in URL param, never in browser
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          // ✅ generationConfig prevents runaway responses and controls quality
          generationConfig: {
            temperature: 0.7, // Balanced: professional but natural
            maxOutputTokens: 1024, // Prevents excessively long replies
            topP: 0.9,
            topK: 40,
          },
          // ✅ Safety settings — appropriate for a professional business assistant
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      }
    );

    // Handle Gemini API-level errors
    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errText);
      return {
        statusCode: geminiResponse.status,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: "Gemini API request failed" }),
      };
    }

    const data = await geminiResponse.json();

    // Safely extract reply text with fallback
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I was unable to generate a response. Please try again.";

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ text }),
    };

  } catch (error) {
    console.error("Serverless function error:", error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
