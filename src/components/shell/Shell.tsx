"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PILLARS = [
  { id: "geographic", icon: "🗺", label: "Geographic", color: "#5BBFEA" },
  { id: "electoral", icon: "🗳", label: "Electoral", color: "#C6A74E" },
  { id: "institutions", icon: "🏛", label: "Institutions", color: "#9B59B6" },
  { id: "economic", icon: "📊", label: "Economic", color: "#2ECC71" },
];

const NAV = [
  { id: "home", href: "/", icon: "🏠", label: "Home" },
  { id: "geographic", href: "/geographic", icon: "🗺", label: "Geographic" },
  { id: "electoral", href: "/electoral", icon: "🗳", label: "Electoral" },
  { id: "institutions", href: "/institutions", icon: "🏛", label: "Institutions" },
  { id: "economic", href: "/economic", icon: "📊", label: "Economic" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeId =
    NAV.find((n) => (n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)))?.id ?? "home";
  const isFusion = pathname.startsWith("/fusion");

  return (
    <div className="bg-bg text-ivory min-h-screen font-body font-light">
      {/* Top accent — full width */}
      <div
        className="h-[2px]"
        style={{
          background: "linear-gradient(90deg,transparent,#C6A74E 15%,#E0C97A 50%,#C6A74E 85%,transparent)",
        }}
      />

      {/* Header — full width bar, content centered and scaling */}
      <div className="sticky top-0 z-[100] bg-[rgba(6,13,22,0.97)] backdrop-blur-md border-b border-border">
        <div className="max-w-full sm:max-w-[640px] md:max-w-[860px] lg:max-w-[1100px] xl:max-w-[1300px] mx-auto px-3.5 sm:px-6 lg:px-10 py-2.5 flex items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-[30px] h-[30px] rounded-full border-[1.5px] border-gold flex items-center justify-center bg-[rgba(198,167,78,0.08)] shrink-0">
              <span className="text-sm font-black text-gold font-serif2 leading-none">G</span>
            </div>
            <div>
              <div className="text-xs font-bold tracking-[2px] text-ivory uppercase font-display leading-none">
                GINIS
              </div>
              <div className="text-[7px] tracking-[.14em] text-gold uppercase font-body leading-[1.4] opacity-80">
                Ghana Intelligence
              </div>
            </div>
          </Link>
          <div className="flex-1" />
          {pathname !== "/" && (
            <div className="flex gap-1">
              {PILLARS.map((p) => (
                <Link
                  key={p.id}
                  href={`/${p.id}`}
                  className="w-[26px] h-[26px] rounded-sm border flex items-center justify-center text-xs"
                  style={{
                    borderColor: activeId === p.id ? p.color : "rgba(198,167,78,0.14)",
                    background: activeId === p.id ? `${p.color}22` : "transparent",
                  }}
                >
                  {p.icon}
                </Link>
              ))}
              <Link
                href="/fusion"
                className="w-[26px] h-[26px] rounded-sm border flex items-center justify-center text-xs"
                style={{
                  borderColor: isFusion ? "#E74C3C" : "rgba(198,167,78,0.14)",
                  background: isFusion ? "rgba(231,76,60,.22)" : "transparent",
                }}
              >
                🔮
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Page content — same fluid container, grows with breakpoints */}
      <div className="max-w-full sm:max-w-[640px] md:max-w-[860px] lg:max-w-[1100px] xl:max-w-[1300px] mx-auto px-0 sm:px-4 lg:px-8 pb-20">
        {children}
      </div>

      {/* Bottom Nav — full width bar, content centered to match */}
      <div className="fixed bottom-0 left-0 right-0 bg-[rgba(6,13,22,0.97)] backdrop-blur-md border-t border-border z-[200]">
        <div className="max-w-full sm:max-w-[640px] md:max-w-[860px] lg:max-w-[1100px] xl:max-w-[1300px] mx-auto flex justify-around sm:justify-center sm:gap-8 lg:gap-14 py-1.5 pb-[11px]">
          {NAV.map((n) => {
            const pillar = PILLARS.find((p) => p.id === n.id);
            const isActive = activeId === n.id;
            const color = pillar?.color ?? "#C6A74E";
            return (
              <Link
                key={n.id}
                href={n.href}
                className="flex flex-col items-center gap-0.5 px-2.5 py-0.5"
              >
                <span className="text-base">{n.id === "home" ? "🏠" : pillar?.icon}</span>
                <span
                  className="text-[8px] tracking-[.08em] uppercase"
                  style={{ color: isActive ? color : "#8A7F6E", fontWeight: isActive ? 600 : 300 }}
                >
                  {n.label}
                </span>
              </Link>
            );
          })}
          <Link href="/fusion" className="flex flex-col items-center gap-0.5 px-2.5 py-0.5">
            <span className="text-base">🔮</span>
            <span
              className="text-[8px] tracking-[.08em] uppercase"
              style={{ color: isFusion ? "#E74C3C" : "#8A7F6E", fontWeight: isFusion ? 600 : 300 }}
            >
              Fusion
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
