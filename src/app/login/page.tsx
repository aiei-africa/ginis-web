"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { T } from "@/lib/tokens";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await apiFetch<{ accessToken: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setToken(res.accessToken);
      router.push("/fusion");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(231,76,60,0.05)", border: `1px solid ${T.border}`,
    borderRadius: 2, padding: "9px 10px", color: T.ivory, fontSize: 12, outline: "none",
    fontFamily: "var(--font-outfit)", boxSizing: "border-box", fontWeight: 300, marginBottom: 8,
  };

  return (
    <div style={{ padding: "20px 16px 60px" }}>
      <div style={{ fontSize: 9, letterSpacing: ".22em", color: "#E74C3C", fontFamily: "var(--font-outfit)", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>
        GINIS · Fusion Access
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-playfair)", marginBottom: 6 }}>Log in</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
        <input style={inputStyle} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input style={inputStyle} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div style={{ color: T.red, fontSize: 11, marginBottom: 8 }}>{error}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", background: "rgba(231,76,60,.15)", border: "1px solid #E74C3C", borderRadius: 2, padding: "10px", color: "#E74C3C", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-outfit)" }}
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
      <p style={{ fontSize: 10, color: T.muted, marginTop: 12, fontWeight: 300 }}>
        No account yet? <a href="/register" style={{ color: T.gold }}>Register</a>
      </p>
    </div>
  );
}
