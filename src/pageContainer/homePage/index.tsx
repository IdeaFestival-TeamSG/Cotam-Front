"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import { useThemeStore } from "@/stores";

const HomePage = () => {
  const { theme, toggleThemeMode } = useThemeStore();

  return (
    <div
      className={cn(
        "flex",
        "w-screen",
        "h-screen",
        "justify-center",
        "items-center"
      )}
    > 
      <Button variant={"default"} onClick={toggleThemeMode} theme={theme}>theme change</Button>
      <Button variant={"destructive"} theme={theme}>detault</Button>
      <Button variant={"ghost"} theme={theme}>detault</Button>
      <Button variant={"link"} theme={theme}>detault</Button>
      <Button variant={"outline"} theme={theme}>detault</Button>
    </div>
  );
};

export default HomePage;
