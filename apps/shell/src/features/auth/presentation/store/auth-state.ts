export interface AuthState {
  username: string | null;
  signIn: (username: string) => void;
  signOut: () => void;
}
