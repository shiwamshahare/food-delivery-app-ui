/**
 * Auth store — no React Context.
 * Persists auth state via AsyncStorage so it survives app reloads.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  hasOnboarded: boolean;
}

const STORAGE_KEY = '@foodapp_auth';

// Module-level state — starts loading until hydrated from storage
let state: AuthState = {
  user: null,
  isLoading: true,
  hasOnboarded: false,
};

type Listener = (s: AuthState) => void;
const listeners = new Set<Listener>();

function setState(partial: Partial<AuthState>) {
  state = { ...state, ...partial };
  listeners.forEach(l => l(state));
}

// ── Persistence helpers ─────────────────────────────────────────────────────

async function persist() {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user: state.user, hasOnboarded: state.hasOnboarded })
    );
  } catch (_) {
    // storage errors are non-fatal
  }
}

/** Called once at app start — hydrates state from AsyncStorage */
export async function hydrateAuth() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as { user: User | null; hasOnboarded: boolean };
      setState({ user: saved.user ?? null, hasOnboarded: saved.hasOnboarded ?? false, isLoading: false });
    } else {
      setState({ isLoading: false });
    }
  } catch (_) {
    setState({ isLoading: false });
  }
}

// ── Public API ──────────────────────────────────────────────────────────────

export async function login(email: string, password: string): Promise<boolean> {
  if (email.trim() === 'com.shahare@gmail.com' && password === 'password') {
    setState({
      user: {
        id: '1',
        name: 'Shiwam Shahare',
        email: 'com.shahare@gmail.com',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    });
    await persist();
    return true;
  }
  return false;
}

export async function logout() {
  setState({ user: null });
  await persist();
}

export async function completeOnboarding() {
  setState({ hasOnboarded: true });
  await persist();
}

// ── Hook ────────────────────────────────────────────────────────────────────

export function useAuth() {
  const [s, setS] = useState<AuthState>(state);

  useEffect(() => {
    const listener: Listener = newState => setS({ ...newState });
    listeners.add(listener);
    // Hydrate on first mount if still loading
    if (state.isLoading) {
      hydrateAuth();
    }
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    user: s.user,
    isLoading: s.isLoading,
    hasOnboarded: s.hasOnboarded,
    login,
    logout,
    completeOnboarding,
  };
}
