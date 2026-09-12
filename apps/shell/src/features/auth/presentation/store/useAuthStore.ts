import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from './auth-state';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: null,
      signIn: (username) => set({ username }),
      signOut: () => set({ username: null }),
    }),
    {
      name: 'pokedex.session',
      partialize: (state) => ({ username: state.username }),
    },
  ),
);
