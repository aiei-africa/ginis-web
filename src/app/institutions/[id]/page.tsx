import Link from "next/link";
import { notFound } from "next/navigation";
import { T } from "@/lib/tokens";
import { INSTITUTIONS, sectColor } from "@/lib/data/institutions";

export default function InstitutionDetailPage({ params }: { params: { id: string } }) {
  const inst = INSTITUTIONS.find((i) => i.id === Number(params.id));
  if (!inst) return notFound();

  const sc = sectColor(inst.sector);

  return (
    <div style={{ paddingBottom: 60 }}>
      <Link href="/institutions" style={{ display: "flex", alignItems: "center", gap: 5, padding: "10px 14px 6px", color: T.gold, fontSize: 11, fontFamily: "var(--font-playfair)", letterSpacing: ".06em" }}>
        ← Institutions
      </Link>
      <div style={{ margin: "0 12px 12px", border: `1px solid ${T.border}`, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ padding: "18px 16px 14px", position: "relative", background: "linear-gradient(135deg,rgba(14,30,54,.9),rgba(9,21,36,.9))" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${sc},transparent)` }} />
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
            <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 2, background: `${sc}22`, color: sc, border: `1px solid ${sc}33`, fontWeight: 600 }}>{inst.class}</span>
            <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 2, background: "rgba(255,255,255,0.05)", color: T.muted2, border: `1px solid ${T.border2}`, fontWeight: 300 }}>{inst.sector}</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: T.gold, fontFamily: "var(--font-cormorant)", marginBottom: 2 }}>{inst.acronym}</div>
          <h2 style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.2, marginBottom: 4, fontFamily: "var(--font-outfit)", color: T.ivory }}>{inst.name}</h2>
          <p style={{ fontSize: 10, color: T.muted, fontWeight: 300, lineHeight: 1.6 }}>{inst.ministry} · {inst.cat2}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: `1px solid ${T.border}` }}>
          {[[inst.class, "SIGA Class"], [inst.hq, "HQ"], [inst.year || "N/A", "Established"]].map(([v, l], i) => (
            <div key={l} style={{ padding: "10px 6px", textAlign: "center", borderRight: i < 2 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.gold, marginBottom: 1 }}>{v}</div>
              <div style={{ fontSize: 8.5, color: T.muted, textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 300 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 12px" }}>
        <div style={{ border: `1px dashed ${T.border}`, borderRadius: 4, padding: "16px 14px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: T.gold, fontWeight: 600, marginBottom: 4, letterSpacing: ".08em", textTransform: "uppercase" }}>Intelligence Brief</div>
          <div style={{ fontSize: 10, color: T.muted, fontWeight: 300, lineHeight: 1.7 }}>
            AI-generated institutional intelligence briefs come online once the Fusion Intelligence backend is wired.
          </div>
        </div>
      </div>
    </div>
  );
}
