import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const mustExist = [
  "src/App_nuovo.jsx",
  "src/FmedErrorBoundary.jsx",
  "src/pages/DashboardPage.jsx",
  "src/pages/AssetPage.jsx",
  "src/pages/InterventiPage.jsx",
  "src/pages/InfrastrutturePage.jsx",
  "src/pages/ScadenzePage.jsx",
  "src/pages/CostiPage.jsx",
  "src/pages/SharePointPage.jsx",
  "src/ProcessiPage.jsx",
  "src/ImpostazioniPage.jsx",
];
for (const file of mustExist) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`File richiesto mancante: ${file}`);
}
const forbidden = [
  "src/CoreEnterpriseWorkspace.jsx",
  "src/CoreEnterpriseWorkspace.css",
  "src/App_mobile.jsx",
  "src/mobile.css",
  "capacitor.config.ts",
  "capacitor.config.js",
];
for (const file of forbidden) {
  if (fs.existsSync(path.join(root, file))) failures.push(`Residuo obsoleto presente: ${file}`);
}
const app = fs.readFileSync(path.join(root, "src/App_nuovo.jsx"), "utf8");
const swCount = (app.match(/navigator\.serviceWorker\.getRegistrations/g) || []).length;
if (swCount) failures.push("La pulizia service worker deve restare centralizzata in main.jsx");
const main = fs.readFileSync(path.join(root, "src/main.jsx"), "utf8");
if (!main.includes("FmedErrorBoundary")) failures.push("Error boundary globale non collegata");
if (failures.length) {
  console.error("FMED E2.3 Desktop QA: FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("FMED E2.3 Desktop QA integrity: OK");
