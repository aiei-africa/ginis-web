"use client";

import { useState } from "react";
import Link from "next/link";
import { T } from "@/lib/tokens";
import { INSTITUTIONS, sectColor } from "@/lib/data/institutions";

export default function InstitutionsPage() {
  const [search, setSearch] = useState("");
  const [filterSector, setFilterSector] = useState("all");
  const [filterClass, setFilterClass] = useState("all");

  const sectors = ["all", ...Array.from(new Set(INSTITUTIONS.map((i) => i.sector))).sort()];

  const visible = INSTITUTIONS.filter((i) => {
    const matchesSector = filterSector === "all" || i.sector === filterSector;
    const matchesClass = filterClass === "all" || i.class === filterClass;
    const matchesSearch =
      !search ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.acronym.toLowerCase().includes(search.toLowerCase()) ||
      i.sector.toLowerCase().includes(search.toLowerCase());
    return matchesSector && matchesClass && matchesSearch;
  });

  const byClass = {
    SOE: INSTITUTIONS.filter((x) => x.class === "SOE").length,
    OSE: INSTITUTIONS.filter((x) => x.class === "OSE").length,
    JVC: INSTITUTIONS.filter((x) => x.class === "JVC").length,
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      <div style={{ padding: "16px 14px 12px" }}>
        <div style={{ fontSize: 9, letterSpacing: ".22em", color: "#9B59B6", fontFamily: "var(--font-outfit)", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>
          GINIS · Pillar III
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-playfair)", marginBottom: 3 }}>Institutional Intelligence</h2>
        <p style={{ fontSize: 11, color: T.muted, fontWeight: 300, lineHeight: 1.7 }}>{INSTITUTIONS.length} State Bodies · SOE · OSE · JVC · SIGA Classified</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, marginTop: 12, border: `1px solid ${T.border}`, borderRadius: 2, overflow: "hidden" }}>
          {[
            ["SOE", "State-Owned Enterprises", byClass.SOE, "#27AE60"],
            ["OSE", "Other State Entities", byClass.OSE, "#3498DB"],
            ["JVC", "Joint Venture Companies", byClass.JVC, "#F39C12"],
          ].map(([c, , n, col]) => (
            <button
              key={c as string}
              onClick={() => setFilterClass(filterClass === c ? "all" : (c as string))}
              style={{ padding: "10px 6px", textAlign: "center", background: filterClass === c ? `${col}22` : "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", borderRight: `1px solid ${T.border}` }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: filterClass === c ? (col as string) : T.gold, fontFamily: "var(--font-cormorant)" }}>{n}</div>
              <div style={{ fontSize: 8, color: filterClass === c ? (col as string) : T.muted, textTransform: "uppercase", letterSpacing: ".08em", fontWeight: filterClass === c ? 600 : 300 }}>{c}</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 12px 8px" }}>
        <div style={{ position: "relative", marginBottom: 7 }}>
          <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: T.muted, fontSize: 12 }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search institutions, acronyms, sectors…"
            style={{ width: "100%", background: "rgba(155,89,182,0.05)", border: `1px solid ${T.border}`, borderRadius: 2, padding: "7px 10px 7px 28px", color: T.ivory, fontSize: 12, outline: "none", fontFamily: "var(--font-outfit)", boxSizing: "border-box", fontWeight: 300 }}
          />
        </div>
        <div style={{ display: "flex", gap: 5, overflowX: "auto" }}>
          {sectors.slice(0, 10).map((s) => {
            const isActive = filterSector === s;
            return (
              <button
                key={s}
                onClick={() => setFilterSector(s)}
                style={{ flexShrink: 0, padding: "4px 10px", borderRadius: 2, border: `1px solid ${isActive ? "#9B59B6" : T.border}`, background: isActive ? "rgba(155,89,182,.15)" : "transparent", color: isActive ? "#9B59B6" : T.muted, fontSize: 9.5, cursor: "pointer", fontFamily: "var(--font-outfit)", fontWeight: isActive ? 600 : 300, whiteSpace: "nowrap" }}
              >
                {s === "all" ? "All Sectors" : s}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ padding: "0 12px" }}>
        <div style={{ fontSize: 8.5, color: T.muted, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-outfit)" }}>
          {visible.length} Institutions Shown
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {visible.map((i) => {
            const sc = sectColor(i.sector);
            return (
              <Link
                key={i.id}
                href={`/institutions/${i.id}`}
                style={{ background: "rgba(14,30,54,.5)", border: `1px solid ${T.border}`, borderRadius: 4, padding: "11px 12px", textAlign: "left", width: "100%", display: "flex", alignItems: "center", gap: 12, position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: sc }} />
                <div style={{ width: 42, height: 42, borderRadius: 2, background: `${sc}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${sc}33` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: sc, fontFamily: "var(--font-outfit)", letterSpacing: -0.5, textAlign: "center", lineHeight: 1.1 }}>{i.acronym.slice(0, 4)}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 400, color: T.ivory, lineHeight: 1.2, marginBottom: 2, fontFamily: "var(--font-outfit)" }}>{i.name}</div>
                  <div style={{ fontSize: 10, color: T.muted, fontWeight: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.cat2} · {i.ministry}</div>
                </div>
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <div style={{ fontSize: 9.5, fontWeight: 600, color: sc, marginBottom: 2 }}>{i.class}</div>
                  <div style={{ fontSize: 8.5, color: T.muted, fontWeight: 300 }}>{i.sector}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
