
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="fixed top-0 w-full z-50 px-4 py-3">
      <div className={`mx-auto max-w-7xl ${theme === 'dark' ? 'glass-dark' : 'glass'} px-4 sm:px-6 flex items-center justify-between`}>
        <div className="flex items-center">
          <div className="mr-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-9 h-9"
            >
              <path
                d="M4 12C4 7.58172 7.58172 4 12 4V20C7.58172 20 4 16.4183 4 12Z"
                fill="#047857"
              />
              <path
                d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20V4Z"
                fill="#1E3A8A"
              />
            </svg>
          </div>
          <h1 className="text-xl md:text-2xl font-serif font-bold">CardBrain</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors transform active:scale-94 transition-transform"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          
          <div className="hidden md:flex items-center space-x-1">
            <span className="font-medium text-sm px-3 py-1 hover:bg-secondary/20 rounded-md cursor-pointer">Dashboard</span>
            <span className="font-medium text-sm px-3 py-1 hover:bg-secondary/20 rounded-md cursor-pointer">Library</span>
            <span className="font-medium text-sm px-3 py-1 hover:bg-secondary/20 rounded-md cursor-pointer">Stats</span>
          </div>
          
          <button
            className="hidden md:block bg-brand-blue text-white px-3 py-1.5 rounded-md font-medium text-sm hover:bg-opacity-90 transition-colors transform hover:scale-103 active:scale-97 transition-transform"
          >
            Start Review
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
