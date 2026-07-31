export interface Region {
  name: string;
  capital: string;
  zone: "coastal" | "middle" | "southern" | "northern";
  pop21: number;
  pop10: number;
  area: number;
  districts: number;
  tags: string[];
}

export const REGIONS: Region[] = [
  { name: "Greater Accra", capital: "Accra", zone: "coastal", pop21: 5444203, pop10: 4010054, area: 3245, districts: 29, tags: ["Finance", "Port", "Politics"] },
  { name: "Ashanti", capital: "Kumasi", zone: "middle", pop21: 5440463, pop10: 4780380, area: 24389, districts: 43, tags: ["Gold", "Cocoa", "Culture"] },
  { name: "Central", capital: "Cape Coast", zone: "coastal", pop21: 2859821, pop10: 2201863, area: 9826, districts: 22, tags: ["Heritage", "Fishing", "Education"] },
  { name: "Eastern", capital: "Koforidua", zone: "southern", pop21: 3056890, pop10: 2633154, area: 19323, districts: 33, tags: ["Diamond", "Cocoa", "Volta"] },
  { name: "Western", capital: "Sekondi-Takoradi", zone: "coastal", pop21: 2376021, pop10: 2376021, area: 23921, districts: 14, tags: ["Oil & Gas", "Seaport", "Cocoa"] },
  { name: "Western North", capital: "Sefwi Wiawso", zone: "middle", pop21: 838759, pop10: 702110, area: 14022, districts: 9, tags: ["Gold", "Cocoa", "Forest"] },
  { name: "Volta", capital: "Ho", zone: "southern", pop21: 1907009, pop10: 2118252, area: 20570, districts: 18, tags: ["Ecotourism", "Kente", "Waterfalls"] },
  { name: "Oti", capital: "Dambai", zone: "southern", pop21: 721225, pop10: 585671, area: 11319, districts: 9, tags: ["River", "Wildlife", "New Region"] },
  { name: "Bono", capital: "Sunyani", zone: "middle", pop21: 1208649, pop10: 922617, area: 18460, districts: 12, tags: ["Food Basket", "Cashew", "Agriculture"] },
  { name: "Bono East", capital: "Techiman", zone: "middle", pop21: 1203400, pop10: 904156, area: 16044, districts: 11, tags: ["Yam", "Market", "Trade"] },
  { name: "Ahafo", capital: "Goaso", zone: "middle", pop21: 564668, pop10: 484210, area: 11153, districts: 6, tags: ["Gold Mining", "Timber", "New Region"] },
  { name: "Northern", capital: "Tamale", zone: "northern", pop21: 2479461, pop10: 2479461, area: 70384, districts: 16, tags: ["Savannah", "Shea", "Islamic Heritage"] },
  { name: "Savannah", capital: "Damongo", zone: "northern", pop21: 609895, pop10: 495569, area: 39585, districts: 7, tags: ["Wildlife", "Mole Park", "Gonja"] },
  { name: "North East", capital: "Nalerigu", zone: "northern", pop21: 632463, pop10: 509952, area: 15082, districts: 6, tags: ["Subsistence", "Border", "Sahel"] },
  { name: "Upper East", capital: "Bolgatanga", zone: "northern", pop21: 1201893, pop10: 1046545, area: 8842, districts: 15, tags: ["Handicrafts", "Baskets", "Dams"] },
  { name: "Upper West", capital: "Wa", zone: "northern", pop21: 901226, pop10: 702110, area: 18476, districts: 11, tags: ["Islamic Heritage", "Shea", "Sparse"] },
];

export const ZONE_META: Record<string, { color: string; bg: string; label: string }> = {
  coastal: { color: "#5BBFEA", bg: "rgba(91,191,234,0.12)", label: "Coastal" },
  middle: { color: "#C6A74E", bg: "rgba(198,167,78,0.11)", label: "Middle" },
  southern: { color: "#6DB882", bg: "rgba(109,184,130,0.11)", label: "Southern" },
  northern: { color: "#E07070", bg: "rgba(224,112,112,0.11)", label: "Northern" },
};

export function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function findRegionBySlug(slug: string) {
  return REGIONS.find((r) => slugify(r.name) === slug);
}

export function fmt(n: number) {
  return n >= 1e6 ? (n / 1e6).toFixed(2) + "M" : n >= 1e3 ? (n / 1e3).toFixed(0) + "k" : String(n);
}

export function pct(a: number, b: number) {
  return (((a - b) / b) * 100).toFixed(1);
}
