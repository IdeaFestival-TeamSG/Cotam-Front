import { create } from "zustand";
import type { Theme, ThemeState } from "@/types";

export const useThemeStore = create<ThemeState>((set, get) => {
  return {
    theme: "light",
    initializeTheme: () => {
      const savedTheme =
        typeof window !== "undefined"
          ? (localStorage.getItem("theme") as Theme | null)
          : null;
      const systemPrefersDark =
        typeof window !== "undefined"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
          : false;

      const nextTheme: Theme =
        savedTheme ?? (systemPrefersDark ? "dark" : "light");
      if (get().theme === nextTheme) {
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", nextTheme);
        }
        return;
      }
      set({ theme: nextTheme });
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", nextTheme);
      }
    },
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
