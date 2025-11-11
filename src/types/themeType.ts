export type Theme = "light" | "dark";

export interface ThemeState {
  theme: Theme;
  initializeTheme: () => void;
  toggleThemeMode: () => void;
}
