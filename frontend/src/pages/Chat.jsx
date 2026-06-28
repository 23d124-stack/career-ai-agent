import { useState } from "react";
import API from "../services/api";

function Chat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I'm CareerPilot AI. How can I help you today?"
    }
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");

    try {
      setLoading(true);

      const res = await API.post("/chat", {
        message: currentMessage
      });

      const botMessage = {
        sender: "bot",
        text: res.data.response
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Failed to get response."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="max-w-5xl mx-auto">

      <div className="bg-white rounded-xl shadow h-[80vh] flex flex-col">

        {/* Header */}
        <div className="p-5 border-b">
          <h1 className="text-3xl font-bold">
            💬 CareerPilot AI Chat
          </h1>

          <p className="text-gray-500">
            Ask anything about careers, interviews, skills, or projects.
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-xl ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="bg-gray-200 inline-block px-4 py-3 rounded-xl">
              Thinking...
            </div>
          )}

        </div>

        {/* Input */}
        <div className="border-t p-4 flex gap-3">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask CareerPilot AI..."
            className="flex-1 border rounded-lg px-4 py-3"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 text-white px-6 rounded-lg"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;