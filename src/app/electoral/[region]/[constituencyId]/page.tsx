import Link from "next/link";
import { notFound } from "next/navigation";
import { T } from "@/lib/tokens";
import { fetchConstituencyDetail, partyColor, cleanRegionName } from "@/lib/electoral-api";

export const dynamic = "force-dynamic";

export default async function ConstituencyDetailPage({ params }: { params: { region: string; constituencyId: string } }) {
  const rows = await fetchConstituencyDetail(params.constituencyId, 2024, "PRESIDENTIAL");
  if (!rows || !rows.length) return notFound();

  const sorted = [...rows].sort((a, b) => b.votes - a.votes);
  const first = sorted[0];

  return (
    <div style={{ paddingBottom: 60 }}>
      <Link href={`/electoral/${params.region}`} style={{ display: "flex", alignItems: "center", gap: 5, padding: "10px 14px 6px", color: T.gold, fontSize: 11, fontFamily: "var(--font-playfair)", letterSpacing: ".06em" }}>
        ← {cleanRegionName(first.region_name)}
      </Link>
      <div style={{ margin: "0 12px 12px", border: `1px solid ${T.border}`, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ padding: "18px 16px 14px", position: "relative", background: "linear-gradient(135deg,rgba(14,30,54,.9),rgba(9,21,36,.9))" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${partyColor(first.colour_hex, first.party_abbr)},transparent)` }} />
          <span style={{ display: "inline-block", fontSize: 9, padding: "2px 8px", borderRadius: 2, background: first.collation_status === "DECLARED" ? "rgba(46,204,113,.15)" : "rgba(198,167,78,.1)", color: first.collation_status === "DECLARED" ? T.green : T.muted, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>
            {first.collation_status}
          </span>
          <h2 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1, marginBottom: 3, fontFamily: "var(--font-playfair)" }}>{first.constituency_name}</h2>
          <p style={{ fontSize: 11, color: T.muted2, fontWeight: 300 }}>{cleanRegionName(first.region_name)} Region · EC Code {first.ec_code} · 2024 Presidential</p>
        </div>
        <div style={{ padding: "12px 15px", borderTop: `1px solid ${T.border}` }}>
          {sorted.map((c) => {
            const pct = parseFloat(c.vote_share || "0");
            const pc = partyColor(c.colour_hex, c.party_abbr);
            return (
              <div key={c.candidate_id} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 10, color: T.ivory, fontWeight: 600 }}>{c.candidate_name} {c.party_abbr ? `(${c.party_abbr})` : "(Ind.)"}</span>
                  <span style={{ fontSize: 10, color: pc, fontWeight: 600 }}>{pct.toFixed(2)}%</span>
                </div>
                <div style={{ height: 5, background: "rgba(198,167,78,0.08)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: pc, borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 9, color: T.muted, fontWeight: 300, marginTop: 2 }}>{c.votes.toLocaleString()} votes</div>
              </div>
            );
          })}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 12 }}>
            {[
              [first.registered_voters?.toLocaleString() || "—", "Registered"],
              [first.turnout_pct ? parseFloat(first.turnout_pct).toFixed(1) + "%" : "—", "Turnout"],
              [first.rejected_ballots?.toLocaleString() || "0", "Rejected"],
            ].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.gold }}>{v}</div>
                <div style={{ fontSize: 8.5, color: T.muted, textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 300 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: "0 12px" }}>
        <div style={{ border: `1px dashed ${T.border}`, borderRadius: 4, padding: "16px 14px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: T.gold, fontWeight: 600, marginBottom: 4, letterSpacing: ".08em", textTransform: "uppercase" }}>Intelligence Brief</div>
          <div style={{ fontSize: 10, color: T.muted, fontWeight: 300, lineHeight: 1.7 }}>
            AI-generated constituency intelligence briefs come online once the Fusion Intelligence backend is wired.
          </div>
        </div>
      </div>
    </div>
  );
}
