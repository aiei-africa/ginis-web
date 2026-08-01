"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { T } from "@/lib/tokens";
import { apiFetch } from "@/lib/api";

const REGIONS = [
  "Greater Accra", "Ashanti", "Central", "Eastern", "Western", "Western North",
  "Volta", "Oti", "Bono", "Bono East", "Ahafo", "Northern", "Savannah",
  "North East", "Upper East", "Upper West",
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "", phone: "", password: "", firstName: "", lastName: "",
    dateOfBirth: "", gender: "", region: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await apiFetch<{ userId: number }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });
      router.push(`/verify-otp?userId=${res.userId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
      <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-playfair)", marginBottom: 6 }}>Create an account</h2>
      <p style={{ fontSize: 11, color: T.muted, fontWeight: 300, lineHeight: 1.7, marginBottom: 18 }}>
        Fusion Intelligence and detailed drilldowns require a verified account.
      </p>
      <form onSubmit={handleSubmit}>
        <input style={inputStyle} placeholder="First name" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
        <input style={inputStyle} placeholder="Last name" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
        <input style={inputStyle} type="email" placeholder="Email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
        <input style={inputStyle} type="tel" placeholder="Phone (+233...)" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
        <input style={inputStyle} type="password" placeholder="Password" value={form.password} onChange={(e) => update("password", e.target.value)} required minLength={8} />
        <input style={inputStyle} type="date" placeholder="Date of birth" value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} required />
        <select style={inputStyle} value={form.gender} onChange={(e) => update("gender", e.target.value)} required>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select style={inputStyle} value={form.region} onChange={(e) => update("region", e.target.value)} required>
          <option value="">Region</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {error && <div style={{ color: T.red, fontSize: 11, marginBottom: 8 }}>{error}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", background: "rgba(231,76,60,.15)", border: "1px solid #E74C3C", borderRadius: 2, padding: "10px", color: "#E74C3C", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-outfit)" }}
        >
          {loading ? "Creating account…" : "Register"}
        </button>
      </form>
      <p style={{ fontSize: 10, color: T.muted, marginTop: 12, fontWeight: 300 }}>
        Already have an account? <a href="/login" style={{ color: T.gold }}>Log in</a>
      </p>
    </div>
  );
}
