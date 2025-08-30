
import React, { useRef, useEffect, useContext } from "react";
import VoiceBot from "../assets/VoiceBot.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../contextapi/AuthContext";

const Voicebot = () => {
  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  const { serverUrl } = useContext(AuthDataContext);
  const baseUrl = serverUrl || "http://localhost:3000";

  // get user's preferred BCP-47 language (e.g., "en-US", "mr-IN")
  const userLang = navigator.language || "en-US";

  const speakText = (text, lang) => {
    if (!text) return;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text));
      u.lang = lang || userLang;
      window.speechSynthesis.speak(u);
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    // set recognition language to user's locale
    recognitionRef.current.lang = userLang;

    recognitionRef.current.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      try {
        // send user's language to backend
        const res = await axios.post(`${baseUrl}/api/voice/voicebot`, {
          message: transcript,
          language: userLang
        });

        const payload = res.data || {};
        const structured = payload?.response && typeof payload.response === "object" ? payload.response : null;
        const text = payload?.text || (typeof payload.response === "string" ? payload.response : null);

        // prefer structured response.language for TTS language
        const ttsLang = (structured && structured.language) || userLang;

        if (structured) {
          // example: open_external/search/navigate handling (unchanged)
          if (structured.action === "open_external" && structured.url) {
            speakText(structured.response || "Opening...", ttsLang);
            window.open(structured.url, "_blank");
            return;
          }
          if (structured.action === "search" && structured.search_query) {
            speakText(structured.response || `Searching for ${structured.search_query}`, ttsLang);
            window.open(`https://www.google.com/search?q=${encodeURIComponent(structured.search_query)}`, "_blank");
            return;
          }
          if (structured.action === "navigate" && structured.route) {
            speakText(structured.response || `Navigating to ${structured.route}`, ttsLang);
            navigate(structured.route);
            return;
          }
          // fallback speak
          speakText(structured.response, ttsLang);
        } else if (text) {
          speakText(text, ttsLang);
        } else {
          speakText("Sorry, I couldn't get a response.", userLang);
        }
      } catch (err) {
        console.error("API error:", err);
        speakText("Sorry, I couldn't get a response.", userLang);
      }
    };

    recognitionRef.current.onerror = (err) => console.error("Recognition error:", err);

    return () => {
      try { recognitionRef.current.onresult = null; } catch (e) {}
      recognitionRef.current = null;
    };
  }, [baseUrl, navigate, userLang]);

  const handleStart = () => {
    if (recognitionRef.current) recognitionRef.current.start();
    else alert("Speech recognition not supported in this browser.");
  };

  return (
    <div>
      <img
        src={VoiceBot}
        alt="Voice Bot"
        className="h-[100px] w-[100px] fixed z-50 left-3 bottom-8 cursor-pointer"
        onClick={handleStart}
      />
    </div>
  );
};

export default Voicebot;
// // // ...existing code...
// // ...existing code...
// ...existing code...
