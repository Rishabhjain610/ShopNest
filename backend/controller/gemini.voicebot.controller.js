
const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Extract text robustly from different SDK response shapes
function extractModelText(resp) {
  if (!resp) return "";
  try {
    if (typeof resp.text === "function") return resp.text();
    if (typeof resp.text === "string") return resp.text;
    if (resp?.response?.text && typeof resp.response.text === "function") return resp.response.text();
    if (resp?.response?.candidates?.[0]?.content?.parts?.[0]?.text)
      return resp.response.candidates[0].content.parts[0].text;
    if (resp?.result?.text && typeof resp.result.text === "function") return resp.result.text();
  } catch (e) {
    console.warn("extractModelText error", e);
  }
  return "";
}

// Safe JSON parsing that tolerates extra surrounding text
function safeParseJSON(text) {
  if (!text || typeof text !== "string") return null;
  try { return JSON.parse(text); } catch (e) {}
  const s = text.indexOf("{"), e = text.lastIndexOf("}");
  if (s !== -1 && e !== -1 && e > s) {
    try { return JSON.parse(text.slice(s, e + 1)); } catch (e) {}
  }
  return null;
}

// Deterministic fallback behavior for direct commands (no model JSON)
function buildFallbackForMessage(message, language) {
  const msg = (message || "").trim();
  const lower = msg.toLowerCase();

  // Compare prices -> chat (do not open external)
  if (/compare|compare prices|price comparison/.test(lower)) {
    const subject = msg.replace(/.*(?:compare|compare prices|price comparison)\s*/i, "").trim();
    return {
      action: "chat",
      url: null,
      search_query: subject || null,
      route: null,
      datetime: null,
      language: language || "en",
      result: null,
      response: subject ? `Comparing prices for ${subject}. I'll summarize options.` : "Which products do you want compared?"
    };
  }

  // YouTube search / open
  if (/youtube|play on youtube|search youtube/.test(lower)) {
    const q = msg.replace(/.*(?:youtube|play on youtube|search youtube)\s*/i, "").trim() || "";
    const url = q ? `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}` : "https://www.youtube.com/";
    return {
      action: "open_external",
      url,
      search_query: q || null,
      route: null,
      datetime: null,
      language: language || "en",
      result: null,
      response: q ? `Opening YouTube results for ${q}.` : "Opening YouTube."
    };
  }

  // ChatGPT
  if (/chatgpt|open chatgpt|open chat gpt/.test(lower)) {
    return {
      action: "open_external",
      url: "https://chat.openai.com/",
      search_query: null,
      route: null,
      datetime: null,
      language: language || "en",
      result: null,
      response: "Opening ChatGPT."
    };
  }
  const weatherMatch = msg.match(/(?:weather(?:\s+(?:in|at))?\s*(.*))$/i);
  if (weatherMatch) {
    const cityRaw = (weatherMatch[1] || "").trim();
    const city = cityRaw.replace(/[?.!]*$/,"").trim();
    const searchQuery = city ? `weather ${city}` : `weather`;
    const url = city
      ? `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`
      : `https://www.google.com/search?q=weather`;
    return {
      action: "weather",
      url,
      search_query: searchQuery || null,
      route: null,
      datetime: null,
      language: language || "en",
      result: null, // backend not fetching actual weather; frontend can open URL or call weather API
      response: city ? `${city}: fetching current weather.` : "Fetching current weather."
    };
  }

  // Google search or open google
  if (/google|search google|open google|find/.test(lower)) {
    const search = msg.replace(/.*(?:search|open|google|find)\s*/i, "").trim();
    if (search) {
      return {
        action: "open_external",
        url: `https://www.google.com/search?q=${encodeURIComponent(search)}`,
        search_query: search,
        route: null,
        datetime: null,
        language: language || "en",
        result: null,
        response: `Opening Google search for ${search}.`
      };
    } else {
      return {
        action: "open_external",
        url: "https://www.google.com/",
        search_query: null,
        route: null,
        datetime: null,
        language: language || "en",
        result: null,
        response: "Opening Google."
      };
    }
  }

  // navigation to app route like /collections, /cart, /products
  const routeMatch = msg.match(/(\/[a-z0-9\-_/]+)/i);
  if (routeMatch) {
    return {
      action: "navigate",
      url: null,
      search_query: null,
      route: routeMatch[1],
      datetime: null,
      language: language || "en",
      result: null,
      response: `Navigating to ${routeMatch[1]}.`
    };
  }

  // time/date (India fixed)
  if (/\btime\b|\bdate\b/.test(lower)) {
    const now = new Date();
    const friendly = now.toLocaleString(language || "en", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const isoInIndia = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    ).toISOString();
    return {
      action: "chat",
      url: null,
      search_query: null,
      route: null,
      datetime: isoInIndia,
      language: language || "en",
      result: null,
      response: friendly
    };
  }

  // default chat fallback
  return {
    action: "chat",
    url: null,
    search_query: null,
    route: null,
    datetime: null,
    language: language || "en",
    result: null,
    response: "Sorry, I can't perform that right now."
  };
}

async function bot(req, res) {
  try {
    const { message, language } = req.body || {};
    if (!message) return res.status(400).json({ error: "message required" });

    // Tushar system prompt
    const systemPrompt = `
You are "Tushar", a concise assistant. Use the user's language to reply.
When asked to return structured output, reply with JSON matching this schema (use null when not applicable):
{"action":"<open_external|search|navigate|chat|calculate|weather>","url":null,"search_query":null,"route":null,"datetime":null,"language":"<bcp-47>","result":null,"response":"<short reply>"}
If user asks to search/open Google, YouTube or ChatGPT, prefer action "open_external" with the proper url.
User-Language: ${language || "en"}
User: ${message}
`;

    // call model
    const modelName = "gemini-2.5-flash";
    const result = await ai.models.generateContent({
      model: modelName,
      contents: systemPrompt
    });

    const raw = extractModelText(result) || "";
    const parsed = safeParseJSON(raw);

    if (parsed && typeof parsed === "object") {
      parsed.action = parsed.action || "chat";
      parsed.language = parsed.language || language || "en";
      const textForTTS = typeof parsed.response === "string" ? parsed.response : String(parsed.response || "");
      return res.json({ response: parsed, text: textForTTS });
    }

    // fallback deterministic behavior
    const fallback = buildFallbackForMessage(message, language);
    return res.json({ response: fallback, text: fallback.response });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "gemini error", details: error?.message || String(error) });
  }
}

module.exports = { bot };
