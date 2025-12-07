import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [userTheme, setUserTheme] = useState(() => {
    try {
      const t = localStorage.getItem("theme");
      return t === "dark" || t === "light" ? t : null;
    } catch {
      return null;
    }
  });

  // helper to read system preference
  const getSystemTheme = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  // effective theme
  const theme = userTheme === "dark" ? "dark" : userTheme === "light" ? "light" : getSystemTheme();

  // Apply theme to <html> whenever effective theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  // if following system (userTheme === null), listen to system changes
  useEffect(() => {
    if (userTheme !== null) return;
    if (!window.matchMedia) return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      const root = document.documentElement;
      e.matches ? root.classList.add("dark") : root.classList.remove("dark");
    };

    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () => (mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler));
  }, [userTheme]);

  const setTheme = useCallback((value /* 'dark'|'light'|null */) => {
    try {
      if (value === null) {
        localStorage.removeItem("theme");
      } else {
        localStorage.setItem("theme", value);
      }
    } catch {}
    setUserTheme(value);
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, userTheme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
