"use client";

import { useCallback } from "react";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

export type ThemeMode = "light" | "dark";

type ThemeToggleProps = {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
};

export const ThemeToggle = ({ theme, onThemeChange }: ThemeToggleProps) => {
  const toggle = useCallback(() => {
    const next = theme === "light" ? "dark" : "light";
    onThemeChange(next);
  }, [theme, onThemeChange]);

  return (
    <motion.button
      type="button"
      onClick={toggle}
      className="btn btn-ghost btn-sm btn-square rounded-2xl"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {theme === "light" ? (
        <Moon className="size-5 text-base-content" strokeWidth={2} aria-hidden />
      ) : (
        <Sun className="size-5 text-base-content" strokeWidth={2} aria-hidden />
      )}
    </motion.button>
  );
};
