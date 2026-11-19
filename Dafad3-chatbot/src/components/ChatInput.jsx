import { Send } from "lucide-react";

function ChatInput({ darkMode, isLoading, input, setInput, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend?.();
    }
  };

  return (
    <div
      className={`p-4 border-t ${
        darkMode ? "bg-gray-700 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Type your message"
            className={`flex-1 min-w-0 border rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
          <button
            onClick={onSend}
            disabled={isLoading || !input?.trim()}
            className="shrink-0 p-3 rounded-full bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-md transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
