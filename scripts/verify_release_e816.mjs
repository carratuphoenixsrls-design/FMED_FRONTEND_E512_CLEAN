import fs from "node:fs";

const app = fs.readFileSync(new URL("../src/App_nuovo.jsx", import.meta.url), "utf8");
const page = fs.readFileSync(new URL("../src/pages/ScadenzePage.jsx", import.meta.url), "utf8");
const tokens = [
  "E8_1_6_ANALISI_PREDITTIVA_CHIUSURA_STORICO",
  "Analisi predittiva",
  "Chiusa e sostituita",
  "stato_finale",
  "chiudiScadenzaSingolaComeSostituita",
];
for (const token of tokens) {
  if (!app.includes(token)) throw new Error(`Token E8.1.6 mancante: ${token}`);
}
if (!page.includes("Chiudi e sostituisci")) throw new Error("Azione riga scadenza mancante");
console.log("FMED E8.1.6 predittiva e chiusura storico: OK");
