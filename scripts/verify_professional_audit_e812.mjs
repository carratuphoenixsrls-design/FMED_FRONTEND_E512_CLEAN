import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const app = read("src/App_nuovo.jsx");
const main = read("src/main.jsx");
const css = read("src/FmedE812ProfessionalAudit.css");
const build = JSON.parse(read("public/fmed-build.json"));
const html = read("index.html");

const required = [
  [app.includes("FMED_ENTERPRISE_1_0_E8_1_2_AUDIT_GRAFICO_PROFESSIONALE_2026_07_20"), "versione E8.1.2 nel frontend"],
  [app.includes("fmed-e812-professional-ui"), "scope grafico E8.1.2"],
  [app.includes("fmed-e812-login"), "login professionale E8.1.2"],
  [main.includes('import "./FmedE812ProfessionalAudit.css";'), "import stylesheet finale"],
  [main.includes("fmed-enterprise-e8-1-2-audit-grafico-professionale"), "cache version E8.1.2"],
  [css.includes("AUDIT GRAFICO PROFESSIONALE"), "identità stylesheet"],
  [css.includes("grid-template-columns: repeat(3"), "dashboard riproporzionata"],
  [css.includes("Colori semantici") === false, "CSS privo di testo descrittivo improprio"],
  [css.includes("nth-child(1)") === false, "assenza di colorazione decorativa per posizione"],
  [css.includes("radial-gradient") === false, "assenza di sfondi decorativi radiali"],
  [build.release === "E8.1.2 Audit Grafico Professionale", "manifest build E8.1.2"],
  [html.includes("FMED E8.1.2 · Audit Grafico Professionale"), "titolo HTML aggiornato"],
  [html.includes("FMED_ENTERPRISE_1_0_E8_1_2_AUDIT_GRAFICO_PROFESSIONALE_2026_07_20"), "meta build aggiornato"],
];

const failures = required.filter(([ok]) => !ok).map(([, label]) => label);
if (failures.length) {
  console.error("E8.1.2 verification failed:", failures.join(", "));
  process.exit(1);
}

for (const forbidden of ["FmedE811VisualPolish.css", "fmed-e811-visual-polish", "AUDIT_GRAFICO_VISUAL_POLISH"]) {
  if (app.includes(forbidden) || main.includes(forbidden)) {
    console.error(`E8.1.2 contains discarded E8.1.1 marker: ${forbidden}`);
    process.exit(1);
  }
}

console.log("FMED E8.1.2 professional graphic audit: OK");
