"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { T } from "@/lib/tokens";
import { apiFetch } from "@/lib/api";

function VerifyOtpForm() {
  const router = useRouter();
  const params = useSearchParams();
  const userId = params.get("userId");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiFetch("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ userId, code }),
      });
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px 16px 60px" }}>
      <div style={{ fontSize: 9, letterSpacing: ".22em", color: "#E74C3C", fontFamily: "var(--font-outfit)", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>
        GINIS · Fusion Access
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-playfair)", marginBottom: 6 }}>Verify your phone</h2>
      <p style={{ fontSize: 11, color: T.muted, fontWeight: 300, lineHeight: 1.7, marginBottom: 18 }}>
        Enter the 6-digit code sent to your phone.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "100%", background: "rgba(231,76,60,0.05)", border: `1px solid ${T.border}`, borderRadius: 2, padding: "9px 10px", color: T.ivory, fontSize: 16, letterSpacing: "0.3em", textAlign: "center", outline: "none", fontFamily: "var(--font-outfit)", boxSizing: "border-box", marginBottom: 10 }}
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          required
        />
        {error && <div style={{ color: T.red, fontSize: 11, marginBottom: 8 }}>{error}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", background: "rgba(231,76,60,.15)", border: "1px solid #E74C3C", borderRadius: 2, padding: "10px", color: "#E74C3C", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-outfit)" }}
        >
          {loading ? "Verifying…" : "Verify"}
        </button>
      </form>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div style={{ padding: "20px 16px", color: "#8A7F6E", fontSize: 11 }}>Loading…</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}
