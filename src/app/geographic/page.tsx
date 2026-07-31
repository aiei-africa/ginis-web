"use client";

import { useState } from "react";
import Link from "next/link";
import { T } from "@/lib/tokens";
import { REGIONS, ZONE_META, slugify, fmt, pct } from "@/lib/data/regions";

const ZONES = ["all", "coastal", "middle", "southern", "northern"] as const;

export default function GeographicPage() {
  const [search, setSearch] = useState("");
  const [zone, setZone] = useState<string>("all");

  const visible = REGIONS.filter((r) => {
    const matchesZone = zone === "all" || r.zone === zone;
    const matchesSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.capital.toLowerCase().includes(search.toLowerCase());
    return matchesZone && matchesSearch;
  });

  return (
    <div style={{ paddingBottom: 60 }}>
      <div style={{ padding: "16px 14px 12px" }}>
        <div style={{ fontSize: 9, letterSpacing: ".22em", color: T.gold, fontFamily: "var(--font-outfit)", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>
          GINIS · Pillar I
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-playfair)", marginBottom: 3 }}>Geographic Intelligence</h2>
        <p style={{ fontSize: 11, color: T.muted, fontWeight: 300, lineHeight: 1.7 }}>16 Regions · 261 Districts · 2021 Census · PostGIS Geometry</p>
      </div>
      <div style={{ padding: "0 12px 10px" }}>
        <div style={{ position: "relative", marginBottom: 7 }}>
          <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: T.muted, fontSize: 12 }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search regions or capitals…"
            style={{ width: "100%", background: "rgba(198,167,78,0.05)", border: `1px solid ${T.border}`, borderRadius: 2, padding: "7px 10px 7px 28px", color: T.ivory, fontSize: 12, outline: "none", fontFamily: "var(--font-outfit)", boxSizing: "border-box", fontWeight: 300 }}
          />
        </div>
        <div style={{ display: "flex", gap: 5, overflowX: "auto" }}>
          {ZONES.map((z) => {
            const zm = ZONE_META[z];
            const isActive = zone === z;
            return (
              <button
                key={z}
                onClick={() => setZone(z)}
                style={{ flexShrink: 0, padding: "4px 11px", borderRadius: 2, border: `1px solid ${isActive ? (zm?.color || T.gold) : T.border}`, background: isActive ? (zm?.bg || "rgba(198,167,78,.12)") : "transparent", color: isActive ? (zm?.color || T.gold) : T.muted, fontSize: 10, cursor: "pointer", fontFamily: "var(--font-outfit)", fontWeight: isActive ? 600 : 300, whiteSpace: "nowrap", textTransform: "capitalize" }}
              >
                {z === "all" ? "All Zones" : z.charAt(0).toUpperCase() + z.slice(1)}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ padding: "0 12px" }}>
        <div style={{ fontSize: 8.5, color: T.muted, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-outfit)" }}>
          {visible.length} Regions · Geographic Pillar
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
          {visible.map((r) => {
            const z = ZONE_META[r.zone];
            const g = parseFloat(pct(r.pop21, r.pop10));
            return (
              <Link
                key={r.name}
                href={`/geographic/${slugify(r.name)}`}
                style={{ background: "rgba(14,30,54,.5)", border: `1px solid ${T.border}`, borderRadius: 4, padding: "12px 11px", textAlign: "left", width: "100%", position: "relative", overflow: "hidden", display: "block" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg,${z.color},${z.color}33)` }} />
                <span style={{ display: "inline-block", fontSize: 8.5, padding: "2px 6px", borderRadius: 2, background: z.bg, color: z.color, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 7, fontWeight: 600 }}>{z.label}</span>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.ivory, lineHeight: 1.1, marginBottom: 2, fontFamily: "var(--font-playfair)" }}>{r.name}</div>
                <div style={{ fontSize: 10, color: T.muted, marginBottom: 8, fontWeight: 300 }}>📍 {r.capital}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                  {[[fmt(r.pop21), "Population"], [r.districts + " dist", "Districts"], [r.area.toLocaleString() + " km²", "Area"], [(g >= 0 ? "+" : "") + g + "%", "Growth"]].map(([v, l]) => (
                    <div key={l}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: T.gold }}>{v}</div>
                      <div style={{ fontSize: 8.5, color: T.muted, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 300 }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 8, textAlign: "right", fontSize: 9, color: z.color, fontFamily: "var(--font-outfit)", letterSpacing: ".06em" }}>Intelligence →</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
