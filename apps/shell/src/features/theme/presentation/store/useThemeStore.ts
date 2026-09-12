import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeState } from './theme-state';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    { name: 'pokedex.theme' },
  ),
);
