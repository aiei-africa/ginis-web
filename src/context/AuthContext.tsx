"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("ginis_token");
    if (stored) setTokenState(stored);
  }, []);

  function setToken(newToken: string | null) {
    setTokenState(newToken);
    if (newToken) {
      sessionStorage.setItem("ginis_token", newToken);
    } else {
      sessionStorage.removeItem("ginis_token");
    }
  }

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
