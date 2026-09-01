import React, { createContext, useContext, useEffect, useState } from 'react';
import { playTactileClick, playPageTurnSound } from '../lib/audioFeedback';

export type ThemeMode = 'cream' | 'midnight';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper that reads the saved theme from localStorage without throwing.
// Safari private mode, sandboxed iframes, and disabled-storage contexts
// can throw `SecurityError` on access.
const readSavedTheme = (): ThemeMode | null => {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'midnight' || saved === 'cream') return saved;
  } catch {
    /* storage unavailable */
  }
  return null;
};

const writeSavedTheme = (theme: ThemeMode) => {
  try {
    localStorage.setItem('portfolio-theme', theme);
  } catch {
    /* storage unavailable or full — silently ignore */
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => readSavedTheme() ?? 'cream');

  useEffect(() => {
    const root = document.documentElement;
    writeSavedTheme(theme);

    if (theme === 'midnight') {
      root.classList.add('dark', 'midnight');
      root.classList.remove('cream');
    } else {
      root.classList.add('cream');
      root.classList.remove('dark', 'midnight');
    }
  }, [theme]);

  const toggleTheme = () => {
    playPageTurnSound(1.1);
    playTactileClick('high');
    setThemeState((prev) => (prev === 'cream' ? 'midnight' : 'cream'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    playPageTurnSound(1.1);
    playTactileClick('high');
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
