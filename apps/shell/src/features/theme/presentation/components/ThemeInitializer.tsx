import { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';

export function ThemeInitializer() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return null;
}
