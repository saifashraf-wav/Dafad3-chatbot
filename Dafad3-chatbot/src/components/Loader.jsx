import { Bot } from "lucide-react";

function Loader({ darkMode }) {
  const dotColor = darkMode ? "bg-gray-500" : "bg-green-400";

  return (
    <div className="flex justify-start">
      <div
        className={`rounded-2xl px-5 py-3 max-w-[80%] md:max-w-[70%] ${
          darkMode
            ? "bg-gray-800 text-gray-100 border border-gray-700"
            : "bg-white text-gray-800 shadow-md"
        }`}
      >
        <div className="flex items-center gap-3">
          <Bot
            className={`h-5 w-5 ${darkMode ? "text-green-400" : "text-green-600"}`}
          />
          <div className="flex gap-1">
            <div
              className={`w-2.5 h-2.5 ${dotColor} rounded-full animate-bounce`}
              style={{ animationDelay: "0ms" }}
            />
            <div
              className={`w-2.5 h-2.5 ${dotColor} rounded-full animate-bounce`}
              style={{ animationDelay: "150ms" }}
            />
            <div
              className={`w-2.5 h-2.5 ${dotColor} rounded-full animate-bounce`}
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
