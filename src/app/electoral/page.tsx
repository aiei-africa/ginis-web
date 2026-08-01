"use client";

import { useState } from "react";
import Link from "next/link";
import { T } from "@/lib/tokens";
import { REGIONS, slugify } from "@/lib/data/regions";
import { ELEC_2024, POLITICAL_CHAR, polColor, polBg, polLabel } from "@/lib/data/electoral";

const FILTERS: [string, string][] = [["all", "All"], ["npp", "NPP"], ["ndc", "NDC"], ["swing", "Swing"]];

export default function ElectoralPage() {
  const [filter, setFilter] = useState("all");

  const visible = REGIONS.filter((r) => {
    if (filter === "all") return true;
    return POLITICAL_CHAR[r.name]?.includes(filter);
  });

  const sorted = [...visible].sort(
    (a, b) => (ELEC_2024[b.name]?.ndc || 0) - (ELEC_2024[a.name]?.ndc || 0)
  );

  const totalNDC = Object.values(ELEC_2024).reduce((s, e) => s + e.ndc, 0);
  const totalNPP = Object.values(ELEC_2024).reduce((s, e) => s + e.npp, 0);

  return (
    <div style={{ paddingBottom: 60 }}>
      <div style={{ padding: "16px 14px 12px" }}>
        <div style={{ fontSize: 9, letterSpacing: ".22em", color: T.gold, fontFamily: "var(--font-outfit)", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>
          GINIS · Pillar II
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-playfair)", marginBottom: 3 }}>Electoral Intelligence</h2>
        <p style={{ fontSize: 11, color: T.muted, fontWeight: 300, lineHeight: 1.7 }}>276 Constituencies · 2024 Presidential & Parliamentary · AIEI</p>
      </div>

      <div style={{ margin: "0 12px 12px", border: `1px solid ${T.border}`, borderRadius: 4, padding: 14 }}>
        <div style={{ fontSize: 8.5, color: T.muted, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-outfit)", fontWeight: 600 }}>
          2024 NATIONAL RESULT · JOHN MAHAMA (NDC) WON
        </div>
        {[
          { label: "NDC · Mahama", p: 56.55, v: totalNDC, c: "#1B6B1B", seats: 184 },
          { label: "NPP · Bawumia", p: 41.18, v: totalNPP, c: "#163488", seats: 88 },
        ].map(({ label, p, c, seats }) => (
          <div key={label} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: c, fontWeight: 600 }}>{label}</span>
              <span style={{ fontSize: 10, color: c, fontWeight: 300 }}>{p}% · {seats} seats</span>
            </div>
            <div style={{ height: 7, background: "rgba(198,167,78,0.08)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${p}%`, height: "100%", background: c, borderRadius: 2 }} />
            </div>
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 10 }}>
          {[["60.9%", "Turnout"], ["276", "Seats"], ["2028", "Next"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.gold, fontFamily: "var(--font-cormorant)" }}>{v}</div>
              <div style={{ fontSize: 8.5, color: T.muted, textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 300 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 12px 8px", display: "flex", gap: 5, overflowX: "auto" }}>
        {FILTERS.map(([f, l]) => {
          const isActive = filter === f;
          const color = f === "npp" ? "#163488" : f === "ndc" ? "#1B6B1B" : f === "swing" ? "#C45E08" : T.gold;
          const bg = f === "npp" ? "rgba(22,52,136,0.14)" : f === "ndc" ? "rgba(27,107,27,0.14)" : f === "swing" ? "rgba(196,94,8,0.14)" : "rgba(198,167,78,.1)";
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{ flexShrink: 0, padding: "4px 11px", borderRadius: 2, border: `1px solid ${isActive ? color : T.border}`, background: isActive ? bg : "transparent", color: isActive ? color : T.muted, fontSize: 10, cursor: "pointer", fontFamily: "var(--font-outfit)", fontWeight: isActive ? 600 : 300 }}
            >
              {l}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "0 12px" }}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {sorted.map((r) => {
            const e = ELEC_2024[r.name];
            const pc = POLITICAL_CHAR[r.name];
            const pcColor = polColor(pc);
            const nP = e ? ((e.ndc / e.total) * 100).toFixed(1) : "0";
            return (
              <Link
                key={r.name}
                href={`/electoral/${slugify(r.name)}`}
                style={{ background: "rgba(14,30,54,.5)", border: `1px solid ${T.border}`, borderRadius: 4, padding: "12px 11px", textAlign: "left", width: "100%", position: "relative", overflow: "hidden", display: "block" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg,${pcColor},${pcColor}33)` }} />
                <span style={{ display: "inline-block", fontSize: 8.5, padding: "2px 6px", borderRadius: 2, background: polBg(pc), color: pcColor, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7, fontWeight: 600 }}>
                  {polLabel(pc)}
                </span>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.ivory, lineHeight: 1.1, marginBottom: 2, fontFamily: "var(--font-playfair)" }}>{r.name}</div>
                {e && (
                  <>
                    <div style={{ height: 4, borderRadius: 2, background: "rgba(198,167,78,0.08)", overflow: "hidden", display: "flex", margin: "6px 0" }}>
                      <div style={{ width: `${nP}%`, background: "#1B6B1B" }} />
                      <div style={{ width: `${100 - parseFloat(nP)}%`, background: "#163488" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: T.muted, fontWeight: 300 }}>
                      <span>NDC {nP}%</span>
                      <span>Turnout {e.turnout}%</span>
                      <span>NPP {((e.npp / e.total) * 100).toFixed(1)}%</span>
                    </div>
                  </>
                )}
                <div style={{ marginTop: 8, textAlign: "right", fontSize: 9, color: pcColor, letterSpacing: ".06em" }}>Intelligence →</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
