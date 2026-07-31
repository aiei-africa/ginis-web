import Link from "next/link";
import { notFound } from "next/navigation";
import { T } from "@/lib/tokens";
import { findRegionBySlug } from "@/lib/data/regions";
import { ELEC_2024, POLITICAL_CHAR, polColor, polBg, polLabel } from "@/lib/data/electoral";

export default function ElectoralDetailPage({ params }: { params: { region: string } }) {
  const r = findRegionBySlug(params.region);
  if (!r) return notFound();

  const e = ELEC_2024[r.name];
  const pc = POLITICAL_CHAR[r.name];
  const pcColor = polColor(pc);
  const nP = e ? ((e.ndc / e.total) * 100).toFixed(1) : "0";
  const nppP = e ? ((e.npp / e.total) * 100).toFixed(1) : "0";

  return (
    <div style={{ paddingBottom: 60 }}>
      <Link href="/electoral" style={{ display: "flex", alignItems: "center", gap: 5, padding: "10px 14px 6px", color: T.gold, fontSize: 11, fontFamily: "var(--font-playfair)", letterSpacing: ".06em" }}>
        ← Electoral
      </Link>
      <div style={{ margin: "0 12px 12px", border: `1px solid ${T.border}`, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ padding: "18px 16px 14px", position: "relative", background: "linear-gradient(135deg,rgba(14,30,54,.9),rgba(9,21,36,.9))" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${pcColor},transparent)` }} />
          <span style={{ display: "inline-block", fontSize: 9, padding: "2px 8px", borderRadius: 2, background: polBg(pc), color: pcColor, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>
            {polLabel(pc)}
          </span>
          <h2 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1, marginBottom: 3, fontFamily: "var(--font-playfair)" }}>{r.name}</h2>
          <p style={{ fontSize: 11, color: T.muted2, fontWeight: 300 }}>Electoral Region · {r.districts} Constituencies · Ghana Fourth Republic</p>
        </div>
        {e && (
          <div style={{ padding: "12px 15px", borderTop: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 8.5, color: T.muted, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>2024 PRESIDENTIAL RESULT</div>
            {[
              { label: "NDC", p: nP, v: e.ndc, c: "#1B6B1B" },
              { label: "NPP", p: nppP, v: e.npp, c: "#163488" },
            ].map(({ label, p, v, c }) => (
              <div key={label} style={{ marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 10, color: c, fontWeight: 600, fontFamily: "var(--font-outfit)" }}>{label} {p}%</span>
                  <span style={{ fontSize: 10, color: c, fontWeight: 300 }}>{v.toLocaleString()}</span>
                </div>
                <div style={{ height: 5, background: "rgba(198,167,78,0.08)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${p}%`, height: "100%", background: c, borderRadius: 2 }} />
                </div>
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 10 }}>
              {[[e.turnout + "%", "Turnout"], [`NDC +${e.seats_ndc}`, "Parl. Seats"], [e.seats_ndc + e.seats_npp + " seats", "Declared"]].map(([v, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.gold }}>{v}</div>
                  <div style={{ fontSize: 8.5, color: T.muted, textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 300 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: "0 12px" }}>
        <div style={{ border: `1px dashed ${T.border}`, borderRadius: 4, padding: "16px 14px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: T.gold, fontWeight: 600, marginBottom: 4, letterSpacing: ".08em", textTransform: "uppercase" }}>Intelligence Brief</div>
          <div style={{ fontSize: 10, color: T.muted, fontWeight: 300, lineHeight: 1.7 }}>
            AI-generated electoral intelligence briefs come online once the Fusion Intelligence backend is wired.
          </div>
        </div>
      </div>
    </div>
  );
}
