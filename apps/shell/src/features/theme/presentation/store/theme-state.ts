import type { Theme } from './theme';

export interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}
