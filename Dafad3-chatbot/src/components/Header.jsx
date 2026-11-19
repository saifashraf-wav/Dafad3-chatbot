import Logo from "./Logo";
import { Moon, Sparkles, Sun } from "lucide-react";

function Header({ toggleDarkMode, darkMode }) {
  return (
    <header
      className={`${darkMode ? "bg-gray-700 text-white" : "bg-white"} shadow-lg py-4 px-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
    >
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="rounded-full">
            <Logo />
          </div>
          <h1 className="text-xl font-bold">Intelligent Chat</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium">
            <Sparkles
              className={`${darkMode ? "text-green-400" : "text-green-600"}h-4 w-4`}
            />
            <span
              className={`${darkMode ? "text-gray-300" : "text-green-700"} text-sm font-medium`}
            >
              Ai Powered
            </span>
          </div>
          <button
            className={`p-2 rounded-full cursor-pointer ${darkMode ? "bg-gray-700" : "bg-grey-200 text-grey-400"}`}
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
