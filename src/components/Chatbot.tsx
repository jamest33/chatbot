import React, { useState } from "react";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { user: input, bot: "" }]);

    // Call LLaMA-3.1 API (replace with actual API call)
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await response.json();

    // Add bot response to chat
    setMessages((prev) => [...prev, { user: input, bot: data.response }]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <div className="user-message">{msg.user}</div>
            <div className="bot-message">{msg.bot}</div>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        className="input"
      />
      <button onClick={handleSend} className="send-button">
        Send
      </button>
    </div>
  );
};

export default Chatbot;
