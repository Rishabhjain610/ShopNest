import React, { useState, useContext } from "react";
import VoiceBot from "../assets/VoiceBot.png";
import { GeminiDataContext } from "../contextapi/GeminiContext";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi I am Simon! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { geminiResponse } = useContext(GeminiDataContext);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { from: "user", text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await geminiResponse(input);
      const botText = res?.reply || "Sorry, I couldn't get a response.";
      setMessages(msgs => [...msgs, { from: "bot", text: botText }]);
    } catch (err) {
      setMessages(msgs => [
        ...msgs,
        { from: "bot", text: "Sorry, something went wrong." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating VoiceBot Icon */}
      {!open && (
        <img
          src={VoiceBot}
          className="h-[100px] w-[100px] fixed bottom-6 left-4 z-50 cursor-pointer transition-all duration-200"
          alt="Voice Bot"
          onClick={() => setOpen(true)}
        />
      )}

      {/* Chatbot Side Panel */}
      {open && (
        <div className="fixed bottom-6 left-4 z-50 bg-[#18181b] border border-[#28282d] rounded-xl shadow-2xl p-4 w-80 h-96 flex flex-col justify-between animate-slide-in transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <img src={VoiceBot} className="h-8 w-8" alt="Voice Bot" />
            <span className="font-semibold text-lg text-[#e0e0e0]">Chatbot</span>
          </div>
          <div className="flex-1 overflow-y-auto text-sm p-2 bg-[#23232a] rounded">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`px-3 py-2 rounded-xl max-w-[80%] break-words ${
                    msg.from === "user"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                      : "bg-[#2d2d38] text-[#e0e0e0]"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="mb-2 flex justify-start">
                <span className="px-3 py-2 rounded-xl bg-[#2d2d38] text-[#e0e0e0]">
                  Typing...
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              className="flex-1 border-none outline-none rounded px-3 py-2 text-sm bg-[#23232a] text-[#e0e0e0] placeholder-[#888] focus:ring-2 focus:ring-blue-600"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              disabled={loading}
              autoFocus
            />
            <button
              className="px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded hover:from-blue-700 hover:to-indigo-700 text-sm font-semibold shadow"
              onClick={handleSend}
              disabled={loading}
            >
              Send
            </button>
            <button
              className="px-2 py-2 bg-[#23232a] text-[#e0e0e0] rounded text-xs hover:bg-[#28282d]"
              onClick={() => setOpen(false)}
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Simple slide-in animation and dark mode styles */}
      <style>
        {`
          .animate-slide-in {
            animation: slideInRight 0.3s;
          }
          @keyframes slideInRight {
            from { transform: translateX(-100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          ::-webkit-scrollbar {
            width: 6px;
            background: #23232a;
          }
          ::-webkit-scrollbar-thumb {
            background: #28282d;
            border-radius: 3px;
          }
        `}
      </style>
    </>
  );
};

export default Chatbot;