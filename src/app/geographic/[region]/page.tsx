import Link from "next/link";
import { notFound } from "next/navigation";
import { T } from "@/lib/tokens";
import { findRegionBySlug, ZONE_META, fmt } from "@/lib/data/regions";

export default function RegionDetailPage({ params }: { params: { region: string } }) {
  const r = findRegionBySlug(params.region);
  if (!r) return notFound();

  const z = ZONE_META[r.zone];
  const density = Math.round(r.pop21 / r.area);

  return (
    <div style={{ paddingBottom: 60 }}>
      <Link href="/geographic" style={{ display: "flex", alignItems: "center", gap: 5, padding: "10px 14px 6px", color: T.gold, fontSize: 11, fontFamily: "var(--font-playfair)", letterSpacing: ".06em" }}>
        ← Geographic
      </Link>
      <div style={{ margin: "0 12px 12px", border: `1px solid ${T.border}`, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ padding: "18px 16px 14px", position: "relative", background: "linear-gradient(135deg,rgba(14,30,54,.9),rgba(9,21,36,.9))" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${z.color},transparent)` }} />
          <span style={{ display: "inline-block", fontSize: 9, padding: "2px 8px", borderRadius: 2, background: z.bg, color: z.color, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>{z.label}</span>
          <h2 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1, marginBottom: 3, fontFamily: "var(--font-playfair)", letterSpacing: 0.2 }}>{r.name}</h2>
          <p style={{ fontSize: 11, color: T.muted2, fontWeight: 300 }}>
            Capital: <span style={{ color: T.gold }}>{r.capital}</span> · {r.districts} Districts
          </p>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 }}>
            {r.tags.map((t) => (
              <span key={t} style={{ fontSize: 9, padding: "2px 7px", borderRadius: 2, background: "rgba(255,255,255,0.05)", border: `1px solid ${T.border2}`, color: T.muted2, fontWeight: 300 }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: `1px solid ${T.border}` }}>
          {[[fmt(r.pop21), "Population"], [r.area.toLocaleString() + " km²", "Area"], [density + "/km²", "Density"], [r.districts, "Districts"]].map(([v, l], i) => (
            <div key={l} style={{ padding: "10px 6px", textAlign: "center", borderRight: i < 3 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: T.gold, marginBottom: 1 }}>{v}</div>
              <div style={{ fontSize: 8.5, color: T.muted, textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 300 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 12px" }}>
        <div style={{ border: `1px dashed ${T.border}`, borderRadius: 4, padding: "16px 14px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: T.gold, fontWeight: 600, marginBottom: 4, letterSpacing: ".08em", textTransform: "uppercase" }}>Intelligence Brief</div>
          <div style={{ fontSize: 10, color: T.muted, fontWeight: 300, lineHeight: 1.7 }}>
            AI-generated regional intelligence briefs come online once the Fusion Intelligence backend is wired.
          </div>
        </div>
      </div>
    </div>
  );
}
