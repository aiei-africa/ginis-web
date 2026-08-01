"use client";

import { useState } from "react";
import { T } from "@/lib/tokens";
import { MACRO_DATA, CPI_DATA, COMMODITY_PRICES, ECON_TABS } from "@/lib/data/economic";
import { MiniChart } from "@/components/MiniChart";

const KPIS = [
  { label: "GDP Growth", val: "4.2%", sub: "2024 estimate", color: T.green, trend: "+" },
  { label: "Inflation CPI", val: "23.8%", sub: "Dec 2024", color: T.red, trend: "-" },
  { label: "GHS/USD", val: "15.30", sub: "Dec 2024", color: "#E67E22", trend: "-" },
  { label: "Fiscal Deficit", val: "3.9% GDP", sub: "2024 target", color: T.green, trend: "+" },
  { label: "Cocoa Price", val: "$8,200/t", sub: "+12.3% YoY", color: T.green, trend: "+" },
  { label: "Gold Price", val: "$2,340/oz", sub: "+8.7% YoY", color: T.gold, trend: "+" },
];

export default function EconomicPage() {
  const [activeTab, setActiveTab] = useState("macro");

  return (
    <div style={{ paddingBottom: 60 }}>
      <div style={{ padding: "16px 14px 12px" }}>
        <div style={{ fontSize: 9, letterSpacing: ".22em", color: T.green, fontFamily: "var(--font-outfit)", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>
          GINIS · Pillar IV
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-playfair)", marginBottom: 3 }}>Economic Intelligence</h2>
        <p style={{ fontSize: 11, color: T.muted, fontWeight: 300, lineHeight: 1.7 }}>GDP · CPI · Markets · Fiscal · Electoral-Economic Fusion</p>
      </div>

      <div style={{ margin: "0 12px 12px", border: `1px solid ${T.border}`, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ padding: "10px 12px", borderBottom: `1px solid ${T.border}`, fontSize: 8.5, color: T.muted, letterSpacing: ".18em", textTransform: "uppercase", fontFamily: "var(--font-outfit)", fontWeight: 600 }}>
          2024 KEY INDICATORS · GHANA
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
          {KPIS.map(({ label, val, sub, color, trend }, i) => (
            <div key={label} style={{ padding: "10px 11px", borderRight: i % 2 === 0 ? `1px solid ${T.border}` : "none", borderBottom: i < 4 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color, fontFamily: "var(--font-cormorant)", marginBottom: 1 }}>{trend} {val}</div>
              <div style={{ fontSize: 10, color: T.ivory, fontWeight: 400, marginBottom: 1 }}>{label}</div>
              <div style={{ fontSize: 9, color: T.muted, fontWeight: 300 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: "0 12px 12px", border: `1px solid ${T.border}`, borderRadius: 4, padding: 12 }}>
        <div style={{ fontSize: 8.5, color: T.muted, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-outfit)", fontWeight: 600 }}>GDP GROWTH TRAJECTORY 2019–2024</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 50 }}>
          {MACRO_DATA.map((d) => {
            const h = ((d.gdp_growth + 2) / 12) * 100;
            const color = d.gdp_growth >= 3 ? T.green : d.gdp_growth >= 0 ? T.gold : T.red;
            return (
              <div key={d.year} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div style={{ fontSize: 9, color, fontWeight: 700 }}>{d.gdp_growth}%</div>
                <div style={{ width: "100%", background: color, borderRadius: "2px 2px 0 0", height: `${Math.max(h, 8)}%`, minHeight: 4 }} />
                <div style={{ fontSize: 8.5, color: T.muted, fontWeight: 300 }}>{d.year}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ margin: "0 12px 12px", border: `1px solid ${T.border}`, borderRadius: 4, padding: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 8.5, color: T.muted, letterSpacing: ".18em", textTransform: "uppercase", fontFamily: "var(--font-outfit)", fontWeight: 600, marginBottom: 2 }}>CPI TREND 2024</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.red, fontFamily: "var(--font-cormorant)" }}>23.8%</div>
            <div style={{ fontSize: 10, color: T.muted, fontWeight: 300 }}>December overall CPI</div>
          </div>
          <div style={{ width: 120 }}>
            <MiniChart data={CPI_DATA} valueKey="overall" color={T.red} height={45} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {[["Food", "26.1%", T.red], ["Non-Food", "22.0%", "#E67E22"], ["Housing", "~18%", "#E67E22"]].map(([l, v, c]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: c }}>{v}</div>
              <div style={{ fontSize: 8.5, color: T.muted, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 300 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: "0 12px 12px", border: `1px solid ${T.border}`, borderRadius: 4, padding: 12 }}>
        <div style={{ fontSize: 8.5, color: T.muted, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-outfit)", fontWeight: 600 }}>COMMODITY PRICES · EXPORT EARNINGS</div>
        {COMMODITY_PRICES.map((c) => (
          <div key={c.commodity} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: `1px solid ${T.border2}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.ivory }}>{c.commodity}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.gold, fontFamily: "var(--font-cormorant)" }}>
                  {c.unit.split("/")[0] === "USD" ? `$${c.price.toLocaleString()}` : c.price}
                </div>
                <div style={{ fontSize: 10, color: c.change >= 0 ? T.green : T.red, fontWeight: 600 }}>{c.change >= 0 ? "+" : ""}{c.change}% YoY</div>
              </div>
            </div>
            <div style={{ fontSize: 9.5, color: T.muted, fontWeight: 300, lineHeight: 1.5 }}>{c.description}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 12px" }}>
        <div style={{ fontSize: 8.5, color: T.muted, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-outfit)", fontWeight: 600 }}>AI ECONOMIC INTELLIGENCE</div>
        <div style={{ display: "flex", gap: 5, overflowX: "auto", marginBottom: 10 }}>
          {ECON_TABS.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{ flexShrink: 0, padding: "5px 12px", borderRadius: 2, border: `1px solid ${isActive ? T.green : T.border}`, background: isActive ? "rgba(46,204,113,.15)" : "transparent", color: isActive ? T.green : T.muted, fontSize: 11, cursor: "pointer", fontFamily: "var(--font-outfit)", fontWeight: isActive ? 600 : 300, whiteSpace: "nowrap" }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <div style={{ background: "rgba(14,30,54,.5)", border: `1px solid ${T.border}`, borderRadius: 4, padding: 14, minHeight: 80 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 8, letterSpacing: ".2em", color: T.green, textTransform: "uppercase", fontFamily: "var(--font-outfit)", fontWeight: 600 }}>
              {ECON_TABS.find((x) => x.id === activeTab)?.label}
            </span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${T.green}44,transparent)` }} />
          </div>
          <div style={{ fontSize: 10, color: T.muted, fontWeight: 300, lineHeight: 1.7, textAlign: "center", padding: "10px 0" }}>
            AI-generated economic intelligence briefs come online once the Fusion Intelligence backend is wired.
          </div>
        </div>
      </div>
    </div>
  );
}
