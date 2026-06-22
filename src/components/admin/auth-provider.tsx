"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

type AuthState = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  authorized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

function isAuthorized(user: User | null): boolean {
  if (!user) return false;
  const allow = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (allow.length === 0) return true; // sem allowlist → qualquer usuário autenticado
  return allow.includes((user.email ?? "").toLowerCase());
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      loading,
      configured: isFirebaseConfigured,
      authorized: isAuthorized(user),
      login: async (email, password) => {
        const auth = getFirebaseAuth();
        if (!auth) throw new Error("Firebase não configurado.");
        await signInWithEmailAndPassword(auth, email, password);
      },
      logout: async () => {
        const auth = getFirebaseAuth();
        if (auth) await signOut(auth);
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  return ctx;
}
