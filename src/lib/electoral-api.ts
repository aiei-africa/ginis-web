import { T } from "@/lib/tokens";

export interface CandidateResult {
  candidate_id: string;
  candidate_name: string;
  party_abbr: string | null;
  party_name: string | null;
  colour_hex: string | null;
  votes: number;
  vote_share: string | null;
}

export interface RegionalRow extends CandidateResult {
  year: number;
  election_code: string;
  election_type: string;
  region_id: string;
  region_name: string;
  registered_voters: number | null;
  total_cast: number | null;
  valid_votes: number | null;
  rejected_ballots: number | null;
  turnout_pct: string | null;
}

export interface ConstituencyRow extends CandidateResult {
  year: number;
  election_code: string;
  election_type: string;
  constituency_id: string;
  constituency_name: string;
  ec_code: string;
  region_id: string;
  region_name: string;
  registered_voters: number | null;
  total_cast: number | null;
  valid_votes: number | null;
  rejected_ballots: number | null;
  turnout_pct: string | null;
  collation_status: string;
  declared_at: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchRegionalResults(year = 2024, type = "PRESIDENTIAL"): Promise<RegionalRow[]> {
  const res = await fetch(`${API_URL}/electoral/regional?year=${year}&type=${type}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load regional results");
  return res.json();
}

export async function fetchConstituenciesByRegion(regionNameRaw: string, year = 2024, type = "PRESIDENTIAL"): Promise<ConstituencyRow[]> {
  const res = await fetch(`${API_URL}/electoral/constituencies?year=${year}&type=${type}&region=${encodeURIComponent(regionNameRaw)}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load constituencies");
  return res.json();
}

export async function fetchConstituencyDetail(id: string, year = 2024, type = "PRESIDENTIAL"): Promise<ConstituencyRow[] | null> {
  const res = await fetch(`${API_URL}/electoral/constituencies/${id}?year=${year}&type=${type}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load constituency");
  return res.json();
}

// Kokromoti stores full names like "Ashanti Region"; GINIS displays/slugs the short form "Ashanti".
export function cleanRegionName(name: string): string {
  return name.replace(/\s+Region$/i, "").trim();
}

export interface RegionSummary {
  region_id: string;
  region_name: string;       // clean, e.g. "Ashanti" — use for display and slugify()
  region_name_raw: string;   // raw, e.g. "Ashanti Region" — use when querying the API
  candidates: CandidateResult[];
  turnout_pct: string | null;
  registered_voters: number | null;
  total_cast: number | null;
  lean: "stronghold" | "lean" | "swing";
  leanParty: string;
}

export function groupRegional(rows: RegionalRow[]): RegionSummary[] {
  const map = new Map<string, RegionalRow[]>();
  for (const r of rows) {
    if (!map.has(r.region_name)) map.set(r.region_name, []);
    map.get(r.region_name)!.push(r);
  }
  return Array.from(map.entries()).map(([region_name_raw, group]) => {
    const sorted = [...group].sort((a, b) => b.votes - a.votes);
    const top = sorted[0];
    const second = sorted[1];
    const topShare = parseFloat(top?.vote_share || "0");
    const secondShare = parseFloat(second?.vote_share || "0");
    const diff = topShare - secondShare;
    const lean: RegionSummary["lean"] = diff > 15 ? "stronghold" : diff > 5 ? "lean" : "swing";
    return {
      region_id: top.region_id,
      region_name: cleanRegionName(region_name_raw),
      region_name_raw,
      candidates: sorted,
      turnout_pct: top.turnout_pct,
      registered_voters: top.registered_voters,
      total_cast: top.total_cast,
      lean,
      leanParty: top.party_abbr || top.candidate_name,
    };
  }).sort((a, b) => a.region_name.localeCompare(b.region_name));
}

export function partyColor(hex: string | null, abbr: string | null): string {
  if (hex) return hex;
  if (abbr === "NDC") return "#1B6B3A";
  if (abbr === "NPP") return "#003082";
  return T.muted;
}

export function leanColor(lean: string): string {
  if (lean === "stronghold") return "#C45E08";
  if (lean === "lean") return T.gold;
  return "#5BBFEA";
}

export function leanLabel(lean: string, party: string): string {
  if (lean === "stronghold") return `${party} Fortress`;
  if (lean === "lean") return `${party} Lean`;
  return "Swing";
}
