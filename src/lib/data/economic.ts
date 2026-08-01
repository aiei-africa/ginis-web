export const MACRO_DATA = [
  { year: 2019, gdp_growth: 8.0, inflation: 7.9, exchange: 5.63, fiscal_deficit: -4.8 },
  { year: 2020, gdp_growth: 0.4, inflation: 10.4, exchange: 5.74, fiscal_deficit: -11.7 },
  { year: 2021, gdp_growth: 5.4, inflation: 12.6, exchange: 6.07, fiscal_deficit: -9.4 },
  { year: 2022, gdp_growth: 3.2, inflation: 31.9, exchange: 10.83, fiscal_deficit: -7.4 },
  { year: 2023, gdp_growth: 2.9, inflation: 40.1, exchange: 12.11, fiscal_deficit: -4.8 },
  { year: 2024, gdp_growth: 4.2, inflation: 23.8, exchange: 15.3, fiscal_deficit: -3.9 },
];

export const CPI_DATA = [
  { month: "Jan", year: 2024, overall: 23.5, food: 26.1, non_food: 21.4 },
  { month: "Feb", year: 2024, overall: 23.2, food: 25.8, non_food: 21.0 },
  { month: "Mar", year: 2024, overall: 25.8, food: 28.3, non_food: 23.7 },
  { month: "Apr", year: 2024, overall: 25.0, food: 27.6, non_food: 22.8 },
  { month: "May", year: 2024, overall: 23.1, food: 25.4, non_food: 21.2 },
  { month: "Jun", year: 2024, overall: 22.8, food: 24.9, non_food: 21.0 },
  { month: "Jul", year: 2024, overall: 20.9, food: 22.4, non_food: 19.7 },
  { month: "Aug", year: 2024, overall: 20.4, food: 21.9, non_food: 19.2 },
  { month: "Sep", year: 2024, overall: 21.5, food: 23.1, non_food: 20.2 },
  { month: "Oct", year: 2024, overall: 22.1, food: 24.0, non_food: 20.6 },
  { month: "Nov", year: 2024, overall: 23.0, food: 25.2, non_food: 21.2 },
  { month: "Dec", year: 2024, overall: 23.8, food: 26.1, non_food: 22.0 },
];

export const COMMODITY_PRICES = [
  { commodity: "Cocoa", unit: "USD/tonne", price: 8200, change: 12.3, description: "Near record high — driven by West Africa supply shortfall" },
  { commodity: "Gold", unit: "USD/oz", price: 2340, change: 8.7, description: "Multi-year high — inflation hedge + central bank buying" },
  { commodity: "Crude Oil", unit: "USD/barrel", price: 84, change: -2.1, description: "Slight decline — demand concerns offset by OPEC+ cuts" },
  { commodity: "Timber", unit: "USD/m³", price: 420, change: 3.2, description: "Steady growth — EU deforestation regulation driving premium prices" },
  { commodity: "Bauxite", unit: "USD/tonne", price: 52, change: 1.8, description: "Stable — aluminium demand recovery supporting prices" },
];

export const ECON_TABS = [
  { id: "macro", label: "Macro" },
  { id: "cpi", label: "CPI" },
  { id: "commodities", label: "Commodities" },
  { id: "fiscal", label: "Fiscal" },
  { id: "markets", label: "Markets" },
  { id: "electoral_econ", label: "Econ-Electoral" },
];
