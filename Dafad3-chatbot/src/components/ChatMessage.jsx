import { Bot, User } from "lucide-react";

function ChatMessage({ darkMode, messages, formatTime }) {
  const isUser = messages.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`w-full max-w-md rounded-xl px-4 py-2.5 ${
          isUser
            ? "bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-md"
            : darkMode
              ? "bg-gray-700  text-gray-100 border border-gray-700"
              : "bg-white text-gray-800 shadow-md"
        }`}
      >
        {/* Header: icon + name on the left, time on the right */}
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`shrink-0 ${
                isUser
                  ? "text-green-200"
                  : darkMode
                    ? "text-green-400"
                    : "text-green-600"
              }`}
            >
              {isUser ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
            </span>
            <span className="text-sm font-medium">
              {isUser ? "You" : "Ai Assistant"}
            </span>
          </div>

          <span
            className={`text-xs ${
              isUser
                ? "opacity-70"
                : darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
            }`}
          >
            {formatTime(messages.timestamp)}
          </span>
        </div>

        {/* Message text */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
          {messages.text}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;
