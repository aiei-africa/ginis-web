export interface RegionResult {
  ndc: number;
  npp: number;
  total: number;
  turnout: number;
  seats_ndc: number;
  seats_npp: number;
}

export const ELEC_2024: Record<string, RegionResult> = {
  "Greater Accra": { ndc: 1260832, npp: 681535, total: 1987000, turnout: 58.2, seats_ndc: 22, seats_npp: 7 },
  "Ashanti": { ndc: 697076, npp: 1366800, total: 2106108, turnout: 64.8, seats_ndc: 8, seats_npp: 35 },
  "Central": { ndc: 562620, npp: 382749, total: 975000, turnout: 61.5, seats_ndc: 13, seats_npp: 9 },
  "Eastern": { ndc: 453234, npp: 493234, total: 980000, turnout: 62.1, seats_ndc: 18, seats_npp: 15 },
  "Western": { ndc: 423245, npp: 275231, total: 723000, turnout: 59.8, seats_ndc: 11, seats_npp: 3 },
  "Western North": { ndc: 202689, npp: 124024, total: 338000, turnout: 57.4, seats_ndc: 7, seats_npp: 2 },
  "Volta": { ndc: 584234, npp: 56699, total: 653000, turnout: 63.2, seats_ndc: 18, seats_npp: 0 },
  "Oti": { ndc: 182470, npp: 86489, total: 278000, turnout: 60.1, seats_ndc: 7, seats_npp: 2 },
  "Bono": { ndc: 235681, npp: 192773, total: 441000, turnout: 62.3, seats_ndc: 8, seats_npp: 4 },
  "Bono East": { ndc: 216691, npp: 124811, total: 354000, turnout: 61.7, seats_ndc: 7, seats_npp: 4 },
  "Ahafo": { ndc: 130106, npp: 113851, total: 255000, turnout: 60.5, seats_ndc: 4, seats_npp: 2 },
  "Northern": { ndc: 529456, npp: 370928, total: 918000, turnout: 58.9, seats_ndc: 12, seats_npp: 4 },
  "Savannah": { ndc: 134563, npp: 56774, total: 199000, turnout: 57.2, seats_ndc: 6, seats_npp: 1 },
  "North East": { ndc: 138000, npp: 82000, total: 230000, turnout: 59.3, seats_ndc: 4, seats_npp: 2 },
  "Upper East": { ndc: 361597, npp: 106700, total: 479000, turnout: 64.1, seats_ndc: 13, seats_npp: 2 },
  "Upper West": { ndc: 242852, npp: 89906, total: 341000, turnout: 63.8, seats_ndc: 11, seats_npp: 0 },
};

export const POLITICAL_CHAR: Record<string, string> = {
  "Greater Accra": "swing", "Ashanti": "npp_stronghold", "Central": "swing",
  "Eastern": "npp_lean", "Western": "ndc_lean", "Western North": "ndc_lean",
  "Volta": "ndc_stronghold", "Oti": "ndc_lean", "Bono": "swing", "Bono East": "ndc_lean",
  "Ahafo": "swing", "Northern": "ndc_lean", "Savannah": "ndc_lean",
  "North East": "ndc_lean", "Upper East": "ndc_stronghold", "Upper West": "ndc_stronghold",
};

const NDC = "#1B6B1B";
const NPP = "#163488";
const SWING = "#C45E08";
const NDC_BG = "rgba(27,107,27,0.14)";
const NPP_BG = "rgba(22,52,136,0.14)";
const SWING_BG = "rgba(196,94,8,0.14)";

export function polColor(c: string) {
  return c.includes("npp") ? NPP : c.includes("ndc") ? NDC : SWING;
}

export function polBg(c: string) {
  return c.includes("npp") ? NPP_BG : c.includes("ndc") ? NDC_BG : SWING_BG;
}

export function polLabel(c: string) {
  const labels: Record<string, string> = {
    npp_stronghold: "NPP Fortress",
    ndc_stronghold: "NDC Fortress",
    npp_lean: "NPP Lean",
    ndc_lean: "NDC Lean",
    swing: "Swing",
  };
  return labels[c] || c;
}
