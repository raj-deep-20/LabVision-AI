import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import api from "../services/api";
import type { AuthUser } from "../services/contracts";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (token: string) => Promise<AuthUser>;
  signOut: () => void;
  refreshUser: () => Promise<AuthUser | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchCurrentUser() {
    const response = await api.get<AuthUser>("/auth/me");
    setUser(response.data);
    return response.data;
  }

  async function signIn(token: string) {
    localStorage.setItem("token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    try {
      return await fetchCurrentUser();
    } catch (error) {
      signOut();
      throw error;
    }
  }

  function signOut() {
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  }

  async function refreshUser() {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return null;
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    try {
      return await fetchCurrentUser();
    } catch {
      signOut();
      return null;
    }
  }

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
