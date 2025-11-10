"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores";

const ThemeInitializer = () => {
  const initializeTheme = useThemeStore((s) => s.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return null;
};

export default ThemeInitializer;


