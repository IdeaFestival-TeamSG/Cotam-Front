import { Theme, ThemeState } from "@/types";
import { create } from "zustand";


export const useThemeStore = create<ThemeState>((set) => {
  const savedTheme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : null;

  const systemPrefersDark =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;

  const initialTheme: Theme =
    (savedTheme as Theme) || (systemPrefersDark ? "dark" : "light");

  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", initialTheme);
  }

  return {
    theme: initialTheme,
    toggleThemeMode: () => {
      set((state) => {
        const newMode: Theme = state.theme === "light" ? "dark" : "light";
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", newMode);
        }
        if (typeof window !== "undefined") {
          localStorage.setItem("theme", newMode);
        }
        return { theme: newMode };
      });
    },
  };
});
