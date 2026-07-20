import fs from "node:fs";

const app = fs.readFileSync(new URL("../src/App_nuovo.jsx", import.meta.url), "utf8");
const controls = fs.readFileSync(new URL("../src/components/scadenze/ScadenzeControls.jsx", import.meta.url), "utf8");
const required = [
  "FMED_ENTERPRISE_1_0_E8_1_4_TOOLBAR_SCADENZE_OBSOLETE_2026_07_20",
  "Gestione scadenze obsolete",
  "Seleziona tutte le scadute",
  "Cessa selezionate",
  "/cicli-unificati/cessa",
  "scadenzeScaduteSelezionateCount",
];
for (const token of required) {
  if (!app.includes(token)) throw new Error(`Token E8.1.4 mancante: ${token}`);
}
if (controls.includes('className="fmed-e813-select-expired"') || controls.includes('className="fmed-e813-cessa-action"')) {
  throw new Error("Pulsanti duplicati ancora presenti nel componente annidato");
}
console.log("FMED E8.1.4 scadenze toolbar: OK");
