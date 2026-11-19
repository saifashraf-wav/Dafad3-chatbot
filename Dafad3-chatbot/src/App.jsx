import { useState } from "react";
import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";
import { formatTime } from "./utlis/chatUrls";
import Loader from "./components/Loader";
import ChatInput from "./components/ChatInput";
import { generateContent } from "./Services/geminiApi";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, how can i help you",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  async function onSend() {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await generateContent(text);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: reply,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Sorry, something went wrong. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col h-screen">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {messages.map((message) => {
            return (
              <ChatMessage
                key={message.id}
                darkMode={darkMode}
                messages={message}
                formatTime={formatTime}
              />
            );
          })}

          {isLoading && <Loader darkMode={darkMode} />}
        </div>
      </div>
      <ChatInput
        darkMode={darkMode}
        isLoading={isLoading}
        input={input}
        setInput={setInput}
        onSend={onSend}
      />
    </div>
  );
}

export default App;
