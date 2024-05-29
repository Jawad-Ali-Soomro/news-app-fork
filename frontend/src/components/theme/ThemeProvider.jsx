import React, { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme" }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(
      "light",
      "dark",
      "rose-light",
      "rose-dark",
      "green-light",
      "green-dark",
      "orange-light",
      "orange-dark",
      "violet-light",
      "violet-dark",
      "red-light",
      "red-dark"
    );

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
