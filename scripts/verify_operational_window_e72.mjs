import fs from "node:fs";
const dashboard = fs.readFileSync("src/pages/DashboardPage.jsx", "utf8");
const app = fs.readFileSync("src/App_nuovo.jsx", "utf8");
const interventions = fs.readFileSync("src/pages/InterventiPage.jsx", "utf8");
const processes = fs.readFileSync("src/ProcessiPage.jsx", "utf8");
const main = fs.readFileSync("src/main.jsx", "utf8");
const requiredDashboard = [
  'dal: "2023-01-01"',
  'tutto_storico: false',
  "Dal 01/01/2023 a oggi",
  "Tutto lo storico",
  "Collaudi conservati",
  "record_archivio_pre_2023",
];
for (const marker of requiredDashboard) if (!dashboard.includes(marker)) throw new Error(`Dashboard E7.2 incompleta: ${marker}`);
if (!app.includes("include_storico=${includeStorico")) throw new Error("Interventi non collegati alla finestra backend");
if (!interventions.includes("_eccezione_collaudo") || !interventions.includes("_archivio_storico")) throw new Error("Etichette archivio/collaudo mancanti");
if (!processes.includes("includeHistory") || !processes.includes("process-engine/esecuzioni?limit=300&include_storico=")) throw new Error("Archivio processi non collegato");
if (!main.includes("e8-audit-finale")) throw new Error("Cache frontend E7.2 non aggiornata");
console.log("FMED E7.2 Finestra Operativa frontend: OK");
