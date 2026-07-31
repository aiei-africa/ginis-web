import Link from "next/link";
import { T, PILLARS } from "@/lib/tokens";

const STATS: [string, string][] = [
  ["16", "Regions"],
  ["261", "Districts"],
  ["175", "Institutions"],
  ["276", "Constituencies"],
];

const CORE_VALUES = [
  { icon: "⚖", name: "Independence", desc: "Strict neutrality and non-partisanship in all engagements" },
  { icon: "🔬", name: "Analytical Rigour", desc: "Evidence-based approaches to every challenge" },
  { icon: "💡", name: "Innovation", desc: "Leveraging emerging technologies for complex problems" },
  { icon: "🎯", name: "Accountability", desc: "Transparency and institutional responsibility" },
  { icon: "⭐", name: "Excellence", desc: "World-class standards in research and advisory" },
];

const STRATEGIC_PILLARS = [
  { n: "01", name: "Electoral Data Intelligence", tag: "Data Ecosystems · Predictive Modelling", color: "#5BBFEA" },
  { n: "02", name: "Digital Electoral Systems", tag: "Secure Platforms · Results Transmission", color: T.gold },
  { n: "03", name: "Election Risk Analysis", tag: "Risk Mapping · Early Warning · Threat Intelligence", color: "#E74C3C" },
  { n: "04", name: "Policy Research & Advisory", tag: "Governance Frameworks · Legislative Reform", color: "#9B59B6" },
  { n: "05", name: "Capacity Development", tag: "Training · Data Literacy · Operational Excellence", color: "#2ECC71" },
];

export default function HomePage() {
  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Hero */}
      <div style={{ padding: "28px 16px 20px", borderBottom: `1px solid ${T.border}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(198,167,78,0.07), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "5px 10px", border: "1px solid rgba(198,167,78,0.25)", borderRadius: 2 }}>
            <div style={{ width: 16, height: 1, background: T.gold }} />
            <span style={{ fontSize: 8, letterSpacing: ".28em", textTransform: "uppercase", color: T.gold, fontFamily: "var(--font-outfit)", fontWeight: 600 }}>
              African Institute for Electoral Intelligence
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(1.4rem,6vw,2.1rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: 8, fontFamily: "var(--font-playfair)", color: T.ivoryS, letterSpacing: -0.5 }}>
            Ghana Integrated<br /><span style={{ color: T.gold }}>National Intelligence</span><br />System
          </h1>
          <p style={{ fontSize: 11, color: T.muted2, lineHeight: 1.95, marginBottom: 18, fontWeight: 300, maxWidth: 380 }}>
            GINIS is AIEI&apos;s flagship data intelligence platform for Ghana — unifying geographic, electoral, institutional, and economic intelligence into one decision-support system. Engineering trust in Ghana&apos;s democracy through data.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, border: `1px solid ${T.border}`, borderRadius: 2, overflow: "hidden" }}>
            {STATS.map(([v, l]) => (
              <div key={l} style={{ padding: "10px 4px", textAlign: "center", borderRight: `1px solid ${T.border}` }}>
                <div style={{ fontSize: "1.4rem", fontWeight: 700, color: T.gold, fontFamily: "var(--font-cormorant)", letterSpacing: -0.5 }}>{v}</div>
                <div style={{ fontSize: 7.5, color: T.muted, letterSpacing: ".14em", textTransform: "uppercase", marginTop: 1, fontWeight: 300 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Four Pillars */}
      <div style={{ padding: "20px 14px" }}>
        <div style={{ fontSize: 9, letterSpacing: ".22em", color: T.gold, fontFamily: "var(--font-outfit)", fontWeight: 600, textTransform: "uppercase", marginBottom: 14 }}>
          Four Intelligence Pillars
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {PILLARS.map((p) => (
            <Link
              key={p.id}
              href={`/${p.id}`}
              style={{ background: "linear-gradient(135deg,rgba(14,30,54,.8),rgba(9,21,36,.8))", border: `1px solid ${p.color}33`, borderRadius: 4, padding: "16px 14px", textAlign: "left", width: "100%", position: "relative", overflow: "hidden", display: "block" }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg,${p.color},transparent)` }} />
              <div style={{ position: "absolute", bottom: -20, right: -20, width: 70, height: 70, borderRadius: "50%", background: `${p.color}0e`, pointerEvents: "none" }} />
              <span style={{ fontSize: 22, marginBottom: 10, display: "block" }}>{p.icon}</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.ivory, marginBottom: 3, fontFamily: "var(--font-playfair)" }}>{p.label}</div>
              <div style={{ fontSize: 9.5, color: T.muted, fontWeight: 300, lineHeight: 1.6, marginBottom: 10 }}>{p.sub}</div>
              <span style={{ fontSize: 9, color: p.color, letterSpacing: ".08em", fontWeight: 600 }}>ENTER PILLAR →</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Fusion Intelligence Entry */}
      <div style={{ padding: "0 14px 6px" }}>
        <Link
          href="/fusion"
          style={{ width: "100%", background: "linear-gradient(135deg,rgba(14,30,54,.8),rgba(9,21,36,.8))", border: "1px solid rgba(231,76,60,.3)", borderRadius: 4, padding: "16px 14px", textAlign: "left", position: "relative", overflow: "hidden", display: "block" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: "linear-gradient(90deg,#E74C3C,transparent)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 22 }}>🔮</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.ivory, marginBottom: 2, fontFamily: "var(--font-playfair)" }}>Fusion Intelligence</div>
              <div style={{ fontSize: 9.5, color: T.muted, fontWeight: 300 }}>Cross-domain analytics · All four pillars synthesised · 2028 Forecast</div>
            </div>
            <span style={{ marginLeft: "auto", fontSize: 9, color: "#E74C3C", letterSpacing: ".08em", fontWeight: 600 }}>ENTER →</span>
          </div>
        </Link>
      </div>

      {/* AIEI About Section */}
      <div style={{ padding: "16px 14px", borderTop: `1px solid ${T.border}`, marginTop: 4, background: "rgba(10,22,40,0.6)" }}>
        <div style={{ fontSize: 9, letterSpacing: ".22em", color: T.gold, fontFamily: "var(--font-outfit)", fontWeight: 600, textTransform: "uppercase", marginBottom: 10 }}>About AIEI</div>
        <p style={{ fontSize: 11, color: T.muted2, lineHeight: 1.85, fontWeight: 300, marginBottom: 14 }}>
          AIEI is a premier, non-partisan institution advancing the science and practice of elections through data intelligence, digital innovation, and rigorous policy research — positioned at the intersection of technology, governance, and democratic accountability.
        </p>
        <div style={{ background: "rgba(9,21,36,0.7)", border: `1px solid ${T.border}`, borderRadius: 4, padding: "14px 12px", marginBottom: 10 }}>
          <div style={{ fontSize: 8.5, color: T.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>Vision</div>
          <div style={{ fontSize: 10.5, color: T.ivory, lineHeight: 1.7, fontWeight: 300 }}>To establish Africa as a global benchmark for transparent, data-driven, and technologically resilient electoral systems.</div>
        </div>
        <div style={{ background: "rgba(9,21,36,0.7)", border: `1px solid ${T.border}`, borderRadius: 4, padding: "14px 12px" }}>
          <div style={{ fontSize: 8.5, color: T.gold, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>Mission</div>
          <div style={{ fontSize: 10.5, color: T.ivory, lineHeight: 1.7, fontWeight: 300 }}>To advance electoral integrity through intelligence-led solutions, combining data science, digital technologies, policy research, and capacity development.</div>
        </div>
      </div>

      {/* AIEI Core Values */}
      <div style={{ padding: "14px 14px 4px" }}>
        <div style={{ fontSize: 9, letterSpacing: ".22em", color: T.gold, fontFamily: "var(--font-outfit)", fontWeight: 600, textTransform: "uppercase", marginBottom: 10 }}>Core Values</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {CORE_VALUES.map((v) => (
            <div key={v.name} style={{ background: "rgba(14,30,54,.5)", border: `1px solid ${T.border}`, borderRadius: 4, padding: "10px 9px" }}>
              <div style={{ fontSize: 14, marginBottom: 4 }}>{v.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: T.ivory, marginBottom: 3 }}>{v.name}</div>
              <div style={{ fontSize: 8.5, color: T.muted, fontWeight: 300, lineHeight: 1.55 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AIEI 5 Strategic Pillars */}
      <div style={{ padding: "14px 14px 4px" }}>
        <div style={{ fontSize: 9, letterSpacing: ".22em", color: T.gold, fontFamily: "var(--font-outfit)", fontWeight: 600, textTransform: "uppercase", marginBottom: 10 }}>AIEI Strategic Pillars</div>
        <div style={{ fontSize: 9.5, color: T.muted, fontWeight: 300, marginBottom: 10 }}>
          Five pillars of electoral intelligence — the AIEI multidisciplinary framework integrating political science, data analytics, cybersecurity, and governance expertise.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {STRATEGIC_PILLARS.map((p) => (
            <div key={p.n} style={{ background: "rgba(9,21,36,0.6)", border: `1px solid ${p.color}22`, borderRadius: 4, padding: "10px 12px", display: "flex", alignItems: "center", gap: 12, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: p.color }} />
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 18, fontWeight: 700, color: `${p.color}55`, minWidth: 28, lineHeight: 1 }}>{p.n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.ivory, marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 8.5, color: `${p.color}99`, fontWeight: 300, letterSpacing: ".04em" }}>{p.tag}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 9, color: T.muted, fontWeight: 300, textAlign: "center" }}>GINIS operates under Pillar I — Electoral Data Intelligence</div>
      </div>

      {/* GINIS Footer */}
      <div style={{ padding: "20px 14px 10px", borderTop: `1px solid ${T.border}`, marginTop: 10, display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.gold, fontFamily: "var(--font-playfair)", letterSpacing: ".05em" }}>AIEI · aiei-africa.org</div>
          <div style={{ fontSize: 9, color: T.muted, fontWeight: 300, lineHeight: 1.6 }}>Non-partisan · Evidence-based · © {new Date().getFullYear()} AIEI</div>
          <div style={{ fontSize: 9, color: T.muted, fontWeight: 300 }}>📞 +233-(0)-302-960-403</div>
          <div style={{ fontSize: 9, color: T.muted, fontWeight: 300 }}>✉ info@aiei-africa.org</div>
        </div>
        <div style={{ fontSize: 9, color: T.muted, textAlign: "right", fontWeight: 300, lineHeight: 1.7 }}>
          <div style={{ color: T.gold, fontWeight: 600, marginBottom: 4 }}>Blueprint v1.0</div>
          <div>GINIS DB</div><div>ginis_intelligence Schema</div><div>Supabase Infrastructure</div>
        </div>
      </div>
    </div>
  );
}
