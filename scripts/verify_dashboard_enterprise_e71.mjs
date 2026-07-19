import fs from "node:fs";
const source = fs.readFileSync("src/pages/DashboardPage.jsx", "utf8");
const css = fs.readFileSync("src/FmedE71DashboardEnterprise.css", "utf8");
const main = fs.readFileSync("src/main.jsx", "utf8");
const required = [
  "Dashboard Enterprise",
  "Filtri globali Dashboard Enterprise",
  "Processi in ritardo",
  "Criticità per sede",
  "Carico per responsabile",
  "downloadCsv",
  "processi_operativi",
  "scadenze_operative",
  "Relazioni intelligenti",
];
for (const marker of required) {
  if (!source.includes(marker)) throw new Error(`Dashboard E7.1 incompleta: ${marker}`);
}
if (!main.includes('import "./FmedE71DashboardEnterprise.css";')) throw new Error("CSS E7.1 non importato");
if (!css.includes(".fmed-e71-kpi-grid") || !css.includes(".fmed-e71-drawer")) throw new Error("CSS Dashboard E7.1 incompleto");
if (source.includes("Math.round(interventi.length *")) throw new Error("Percentuali simulate legacy ancora presenti nella Dashboard E7.1");
console.log("FMED E7.1 Dashboard Enterprise frontend: OK");
