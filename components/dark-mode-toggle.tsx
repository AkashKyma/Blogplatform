'use client';

import { useEffect, useState } from 'react';

function getThemeLabel(isDark: boolean) {
  return isDark ? 'Switch to light mode' : 'Switch to dark mode';
}

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;

    setIsDark(nextIsDark);
    document.documentElement.classList.toggle('dark', nextIsDark);
    window.localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 items-center justify-center rounded-full border border-border/70 bg-surface/80 px-4 text-sm font-medium text-foreground transition hover:border-foreground/40 hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={getThemeLabel(isDark)}
      title={getThemeLabel(isDark)}
    >
      <span className="mr-2 text-base" aria-hidden="true">
        {isDark ? '☀️' : '🌙'}
      </span>
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
}
