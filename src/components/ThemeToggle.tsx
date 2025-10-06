import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import type { RootState, AppDispatch } from "@/store/store";
import { themeChange } from "@/store/actions";

const ThemeToggle = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { themeValue } = useSelector((state: RootState) => state.themes);

  const toggleTheme = () => {
    const payload = themeValue === "light" ? "dark" : "light";
    dispatch(themeChange(payload));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={`Switch to ${themeValue === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${themeValue === "light" ? "dark" : "light"} mode`}
    >
      {themeValue === "light" ? (
        <Moon className="w-5 h-5" aria-hidden="true" />
      ) : (
        <Sun className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
