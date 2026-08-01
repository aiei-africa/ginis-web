"use client";

import { useState } from "react";
import Link from "next/link";
import { T, PILLARS } from "@/lib/tokens";
import { useAuth } from "@/context/AuthContext";

const FUSION_TOPICS = [
  { id: "econ_elect", label: "Econ → Electoral" },
  { id: "inst_geo", label: "Institutions → Development" },
  { id: "geo_econ", label: "Geography → Economy" },
  { id: "all_pillars", label: "All Pillars — 2028" },
];

export default function FusionPage() {
  const { isAuthenticated } = useAuth();
  const [topic, setTopic] = useState("econ_elect");

  if (!isAuthenticated) {
    return (
      <div style={{ padding: "40px 16px 60px", textAlign: "center" }}>
        <div style={{ fontSize: 28, marginBottom: 12 }}>🔮</div>
        <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--font-playfair)", marginBottom: 8, color: T.ivory }}>Fusion Intelligence</h2>
        <p style={{ fontSize: 11, color: T.muted, fontWeight: 300, lineHeight: 1.8, marginBottom: 20, maxWidth: 320, margin: "0 auto 20px" }}>
          Cross-domain analytics and detailed drilldowns require a verified account. Register or log in to continue.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <Link href="/register" style={{ padding: "9px 18px", borderRadius: 2, border: "1px solid #E74C3C", background: "rgba(231,76,60,.15)", color: "#E74C3C", fontSize: 11, fontWeight: 600 }}>
            Register
          </Link>
          <Link href="/login" style={{ padding: "9px 18px", borderRadius: 2, border: `1px solid ${T.border}`, color: T.muted, fontSize: 11, fontWeight: 300 }}>
            Log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 60 }}>
      <div style={{ padding: "16px 14px 16px" }}>
        <div style={{ fontSize: 9, letterSpacing: ".22em", color: "#E74C3C", fontFamily: "var(--font-outfit)", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>
          GINIS · Cross-Domain
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-playfair)", marginBottom: 4 }}>Fusion Intelligence</h2>
        <p style={{ fontSize: 11, color: T.muted, fontWeight: 300, lineHeight: 1.85, marginBottom: 14 }}>
          Cross-pillar analytics integrating all four GINIS domains — Geographic, Electoral, Institutional, and Economic — to identify structural patterns invisible to single-domain analysis.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 14 }}>
          {PILLARS.map((p) => (
            <div key={p.id} style={{ border: `1px solid ${p.color}33`, borderRadius: 4, padding: 10, background: `${p.color}08` }}>
              <div style={{ fontSize: 16, marginBottom: 4 }}>{p.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: p.color, fontFamily: "var(--font-outfit)" }}>{p.label}</div>
              <div style={{ fontSize: 9, color: T.muted, fontWeight: 300 }}>{p.sub}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 12px" }}>
        <div style={{ fontSize: 8.5, color: T.muted, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-outfit)", fontWeight: 600 }}>CROSS-DOMAIN ANALYSIS</div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
          {FUSION_TOPICS.map((t) => {
            const isActive = topic === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTopic(t.id)}
                style={{ padding: "6px 12px", borderRadius: 2, border: `1px solid ${isActive ? "#E74C3C" : T.border}`, background: isActive ? "rgba(231,76,60,.15)" : "transparent", color: isActive ? "#E74C3C" : T.muted, fontSize: 10.5, cursor: "pointer", fontFamily: "var(--font-outfit)", fontWeight: isActive ? 600 : 300, whiteSpace: "nowrap" }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <div style={{ background: "rgba(14,30,54,.5)", border: "1px solid rgba(231,76,60,.2)", borderRadius: 4, padding: 14, minHeight: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 8, letterSpacing: ".2em", color: "#E74C3C", textTransform: "uppercase", fontFamily: "var(--font-outfit)", fontWeight: 600 }}>
              {FUSION_TOPICS.find((x) => x.id === topic)?.label}
            </span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(231,76,60,.44),transparent)" }} />
          </div>
          <div style={{ fontSize: 10, color: T.muted, fontWeight: 300, lineHeight: 1.7, textAlign: "center", padding: "10px 0" }}>
            AI-generated fusion intelligence comes online once the backend is wired to /fusion on ginis-api.
          </div>
        </div>
      </div>
    </div>
  );
}
