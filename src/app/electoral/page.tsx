import Link from "next/link";
import { T } from "@/lib/tokens";
import { slugify } from "@/lib/data/regions";
import { fetchRegionalResults, groupRegional, partyColor, leanColor, leanLabel } from "@/lib/electoral-api";

export const dynamic = "force-dynamic";

export default async function ElectoralPage() {
  const rows = await fetchRegionalResults(2024, "PRESIDENTIAL");
  const regions = groupRegional(rows);

  const nationalNDC = rows.filter((r) => r.party_abbr === "NDC").reduce((s, r) => s + r.votes, 0);
  const nationalNPP = rows.filter((r) => r.party_abbr === "NPP").reduce((s, r) => s + r.votes, 0);
  const nationalTotal = regions.reduce((s, r) => s + (r.total_cast || 0), 0);

  return (
    <div style={{ paddingBottom: 60 }}>
      <div style={{ padding: "16px 14px 12px" }}>
        <div style={{ fontSize: 9, letterSpacing: ".22em", color: T.gold, fontFamily: "var(--font-outfit)", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>
          GINIS · Pillar II · EC Gazetted Results
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-playfair)", marginBottom: 3 }}>Electoral Intelligence</h2>
        <p style={{ fontSize: 11, color: T.muted, fontWeight: 300, lineHeight: 1.7 }}>2024 Presidential · 16 Regions · Official EC Declarations</p>
      </div>

      <div style={{ margin: "0 12px 12px", border: `1px solid ${T.border}`, borderRadius: 4, padding: 14 }}>
        <div style={{ fontSize: 8.5, color: T.muted, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-outfit)", fontWeight: 600 }}>
          2024 NATIONAL RESULT
        </div>
        {[
          { label: "NDC · Mahama", v: nationalNDC, c: "#1B6B3A" },
          { label: "NPP · Bawumia", v: nationalNPP, c: "#003082" },
        ].map(({ label, v, c }) => {
          const p = nationalTotal ? ((v / nationalTotal) * 100).toFixed(2) : "0";
          return (
            <div key={label} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                <span style={{ fontSize: 11, color: c, fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: 10, color: c, fontWeight: 300 }}>{p}%</span>
              </div>
              <div style={{ height: 7, background: "rgba(198,167,78,0.08)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${p}%`, height: "100%", background: c, borderRadius: 2 }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "0 12px" }}>
        <div style={{ fontSize: 8.5, color: T.muted, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-outfit)" }}>
          {regions.length} Regions · Tap to drill into constituencies
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {regions.map((r) => {
            const lc = leanColor(r.lean);
            const top = r.candidates[0];
            const second = r.candidates[1];
            const topPct = parseFloat(top?.vote_share || "0").toFixed(1);
            return (
              <Link
                key={r.region_id}
                href={`/electoral/${slugify(r.region_name)}`}
                style={{ background: "rgba(14,30,54,.5)", border: `1px solid ${T.border}`, borderRadius: 4, padding: "12px 11px", textAlign: "left", width: "100%", position: "relative", overflow: "hidden", display: "block" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg,${lc},${lc}33)` }} />
                <span style={{ display: "inline-block", fontSize: 8.5, padding: "2px 6px", borderRadius: 2, background: `${lc}22`, color: lc, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7, fontWeight: 600 }}>
                  {leanLabel(r.lean, r.leanParty)}
                </span>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.ivory, lineHeight: 1.1, marginBottom: 2, fontFamily: "var(--font-playfair)" }}>{r.region_name}</div>
                {top && (
                  <>
                    <div style={{ height: 4, borderRadius: 2, background: "rgba(198,167,78,0.08)", overflow: "hidden", display: "flex", margin: "6px 0" }}>
                      <div style={{ width: `${topPct}%`, background: partyColor(top.colour_hex, top.party_abbr) }} />
                      <div style={{ width: `${100 - parseFloat(topPct)}%`, background: second ? partyColor(second.colour_hex, second.party_abbr) : T.border2 }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: T.muted, fontWeight: 300 }}>
                      <span>{top.party_abbr || "Ind."} {topPct}%</span>
                      <span>Turnout {r.turnout_pct ? parseFloat(r.turnout_pct).toFixed(1) : "—"}%</span>
                    </div>
                  </>
                )}
                <div style={{ marginTop: 8, textAlign: "right", fontSize: 9, color: lc, letterSpacing: ".06em" }}>Intelligence →</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
