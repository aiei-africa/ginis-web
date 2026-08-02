import Link from "next/link";
import { notFound } from "next/navigation";
import { T } from "@/lib/tokens";
import { slugify } from "@/lib/data/regions";
import { fetchRegionalResults, fetchConstituenciesByRegion, groupRegional, partyColor } from "@/lib/electoral-api";

export const dynamic = "force-dynamic";

export default async function RegionConstituenciesPage({ params }: { params: { region: string } }) {
  const regionalRows = await fetchRegionalResults(2024, "PRESIDENTIAL");
  const regions = groupRegional(regionalRows);
  const match = regions.find((r) => slugify(r.region_name) === params.region);
  if (!match) return notFound();

  const rows = await fetchConstituenciesByRegion(match.region_name_raw, 2024, "PRESIDENTIAL");
  if (!rows.length) return notFound();

  const map = new Map<string, typeof rows>();
  for (const r of rows) {
    if (!map.has(r.constituency_id)) map.set(r.constituency_id, []);
    map.get(r.constituency_id)!.push(r);
  }
  const constituencies = Array.from(map.entries()).map(([id, group]) => {
    const sorted = [...group].sort((a, b) => b.votes - a.votes);
    return { id, name: sorted[0].constituency_name, candidates: sorted, turnout_pct: sorted[0].turnout_pct, status: sorted[0].collation_status };
  }).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div style={{ paddingBottom: 60 }}>
      <Link href="/electoral" style={{ display: "flex", alignItems: "center", gap: 5, padding: "10px 14px 6px", color: T.gold, fontSize: 11, fontFamily: "var(--font-playfair)", letterSpacing: ".06em" }}>
        ← Electoral
      </Link>
      <div style={{ padding: "6px 14px 12px" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-playfair)", marginBottom: 3 }}>{match.region_name}</h2>
        <p style={{ fontSize: 11, color: T.muted, fontWeight: 300, lineHeight: 1.7 }}>{constituencies.length} Constituencies · 2024 Presidential · EC Gazetted</p>
      </div>
      <div style={{ padding: "0 12px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
          {constituencies.map((c) => {
            const top = c.candidates[0];
            const topPct = parseFloat(top?.vote_share || "0").toFixed(1);
            const tc = partyColor(top?.colour_hex ?? null, top?.party_abbr ?? null);
            return (
              <Link
                key={c.id}
                href={`/electoral/${params.region}/${c.id}`}
                style={{ background: "rgba(14,30,54,.5)", border: `1px solid ${T.border}`, borderRadius: 4, padding: "11px 12px", textAlign: "left", width: "100%", display: "flex", alignItems: "center", gap: 12, position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: tc }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.ivory, lineHeight: 1.2, marginBottom: 2 }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: T.muted, fontWeight: 300 }}>
                    {top?.party_abbr || "Ind."} {topPct}% · Turnout {c.turnout_pct ? parseFloat(c.turnout_pct).toFixed(1) : "—"}%
                  </div>
                </div>
                <span style={{ fontSize: 8.5, padding: "2px 6px", borderRadius: 2, background: c.status === "DECLARED" ? "rgba(46,204,113,.15)" : "rgba(198,167,78,.1)", color: c.status === "DECLARED" ? T.green : T.muted, fontWeight: 600, flexShrink: 0 }}>
                  {c.status}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
