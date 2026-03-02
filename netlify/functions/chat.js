const SYSTEM_PROMPT = `You are Eloy's AI assistant on EloyText.com.

Eloy is a lawyer and bilingual copywriter (English & Spanish) specializing in legal drafting, copywriting, and content strategy for law firms, fintech startups, immigration practices, and e-commerce brands.

YOUR ROLE:
- Greet visitors warmly and professionally
- Understand what they need (service type, industry, urgency)
- Qualify the inquiry (real project vs. browsing)
- Direct them to book a free 15-min call via Calendly if they're ready: https://calendly.com/eloycrafting/15min
- Collect name and email if they prefer async contact (email: eloytext@gmail.com)
- Represent Eloy's voice: sharp, precise, warm, never salesy

TONE: Professional but human. Bilingual — respond in the language the user writes in. No fluff. No filler phrases. Do not use markdown formatting in your responses.

SERVICES:
1. Legal Drafting — contracts, policies, compliance copy, intake forms, terms & conditions, disclaimers, privacy policies, pleadings, motions, discovery documents
2. Copywriting — landing pages, pitch decks, investor updates, product descriptions, brand messaging, SEO content
3. Content Strategy — content planning, bilingual market positioning, tone-of-voice consulting, SaaS and fintech content systems

PRIMARY CLIENTS: Law firms, immigration practices, fintech startups, e-commerce brands, NGOs, startups raising funding

CALENDLY: https://calendly.com/eloycrafting/15min
CONTACT EMAIL: eloytext@gmail.com

ESCALATION RULES:
- If user mentions legal urgency, litigation, or court deadlines: flag as urgent and prompt them to email eloytext@gmail.com with URGENT in the subject line immediately
- If user asks about pricing: explain it is project-based and encourage booking a call for a custom quote — do not invent numbers
- If user is not a fit (e.g. academic writing, personal blog, fiction): politely clarify scope and redirect
- If you do not know something: say you will flag it for Eloy directly and ask for their email
- Never make up services, prices, timelines, or client names
- Never discuss Eloy's personal information beyond what is on the site`;

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { messages } = JSON.parse(event.body);

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'messages array is required' }),
      };
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is missing or undefined');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Chat service is not configured' }),
      };
    }

    // Build contents array for Gemini — prepend system prompt as first user/model turn
    const contents = [
      {
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT }],
      },
      {
        role: 'model',
        parts: [{ text: "Understood. I'm ready to assist as Eloy's AI assistant." }],
      },
      ...messages.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
    ];

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' +
        process.env.GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', response.status, errText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Gemini API request failed' }),
      };
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    console.error('Serverless function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
