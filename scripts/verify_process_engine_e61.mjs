import fs from "node:fs";

const app = fs.readFileSync("src/App_nuovo.jsx", "utf8");
const page = fs.readFileSync("src/ProcessiPage.jsx", "utf8");
const dialog = fs.readFileSync("src/components/ProcessEngineDialog.jsx", "utf8");
const css = fs.readFileSync("src/ProcessiPage.css", "utf8");

const required = [
  [app, "FMED_ENTERPRISE_1_0_E6_1_PROCESS_ENGINE_UNIFICATO_2026_07_18"],
  [app, "canManageProcesses"],
  [page, "/process-engine/catalogo"],
  [page, "/process-engine/esecuzioni?limit=200"],
  [page, "Process Engine unificato"],
  [page, "Sicurezza 81/08"],
  [dialog, "CanonicalSelect"],
  [dialog, "/process-engine/esecuzioni"],
  [css, ".fmed-process-detail"],
];
for (const [source, marker] of required) {
  if (!source.includes(marker)) throw new Error(`Process Engine E6.1: marker mancante ${marker}`);
}
if (app.includes("E5_2_2_CATALOGO_CANONICO_GLOBALE_2026_07_17")) {
  throw new Error("Process Engine E6.1: versione frontend precedente ancora attiva");
}
console.log("FMED E6.1 Process Engine frontend: OK");
