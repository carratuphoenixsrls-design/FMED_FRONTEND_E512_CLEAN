import fs from "node:fs";
const app = fs.readFileSync("src/App_nuovo.jsx", "utf8");
const page = fs.readFileSync("src/ProcessiPage.jsx", "utf8");
const dialog = fs.readFileSync("src/components/ProcessEngineDialog.jsx", "utf8");
const css = fs.readFileSync("src/ProcessiPage.css", "utf8");
const required = [
  [app, "FMED_ENTERPRISE_1_0_E7_2_OPERATIONAL_WINDOW_ARCHIVE_2026_07_20"],
  [page, "/process-engine/esecuzioni/${id}/quadro"],
  [page, "/attivita/${task.id}"],
  [page, "/approvazioni"],
  [page, "/allegati"],
  [page, "Checklist del processo"],
  [page, "Responsabilità e tempi"],
  [page, "Storico del processo"],
  [dialog, "Approvazione finale richiesta"],
  [dialog, "Sostituto"],
  [css, ".fmed-process-checklist"],
  [css, ".fmed-process-sla"],
];
for (const [source, marker] of required) {
  if (!source.includes(marker)) throw new Error(`Process Engine E6.2: marker mancante ${marker}`);
}
if (app.includes("E6_1_PROCESS_ENGINE_UNIFICATO_2026_07_18")) throw new Error("Versione E6.1 ancora attiva");
console.log("FMED E6.2 Process Engine frontend: OK");
