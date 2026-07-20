import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const app = read("src/App_nuovo.jsx");
const controls = read("src/components/scadenze/ScadenzeControls.jsx");
const page = read("src/pages/ScadenzePage.jsx");
const css = read("src/FmedE813SystemLayoutAudit.css");
const main = read("src/main.jsx");

const required = [
  [app, "E8_1_3_SCADENZE_CESSATE_LAYOUT_AUDIT"],
  [app, "selezionaTutteScadenzeScadute"],
  [app, "cessaScadenzeSelezionate"],
  [app, "/cicli-unificati/cessa"],
  [controls, "Cessa selezionate"],
  [controls, "Seleziona scadute"],
  [page, "I collaudi sono protetti"],
  [css, ".fmed-e813-layout-audit"],
  [css, ".fmed-e813-cessa-action"],
  [main, "FmedE813SystemLayoutAudit.css"],
];
for (const [content, token] of required) {
  if (!content.includes(token)) throw new Error(`Token E8.1.3 mancante: ${token}`);
}
if (app.includes("E8_1_2_AUDIT_GRAFICO_PROFESSIONALE_2026_07_20")) {
  throw new Error("Versione visibile E8.1.2 ancora presente");
}
console.log("FMED E8.1.3 frontend: scadenze cessate e layout audit OK");
