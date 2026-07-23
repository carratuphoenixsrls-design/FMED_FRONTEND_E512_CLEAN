import fs from "node:fs";

const files = {
  app: fs.readFileSync("src/App_nuovo.jsx", "utf8"),
  page: fs.readFileSync("src/pages/ScadenzePage.jsx", "utf8"),
  controls: fs.readFileSync("src/components/scadenze/ScadenzeControls.jsx", "utf8"),
  css: fs.readFileSync("src/FmedE818FrontendUxUiRefinement.css", "utf8"),
  main: fs.readFileSync("src/main.jsx", "utf8"),
  build: fs.readFileSync("public/fmed-build.json", "utf8"),
};

const required = [
  [files.app, "E8_1_8_UX_UI_MASTER_DATA_UNIFORMITY"],
  [files.app, "sorgentiChiuse"],
  [files.app, "Vista operativa e KPI aggiornati"],
  [files.app, "Chiudi selezionate"],
  [files.app, "fmed-e818-ux-refinement"],
  [files.page, "Storico protetto"],
  [files.page, "fmed-e818-deadlines-table"],
  [files.controls, "fmed-e818-deadline-filters"],
  [files.css, "fmed-e818-close-selected-btn"],
  [files.css, "fmed-predictive-panel::before"],
  [files.css, "is-collapsed"],
  [files.main, "FmedE818FrontendUxUiRefinement.css"],
  [files.build, "fmed512clean.vercel.app"],
];

for (const [text, token] of required) {
  if (!text.includes(token)) throw new Error(`Token E8.1.8 mancante: ${token}`);
}

console.log("FMED E8.1.8 frontend UX/UI refinement: OK");

const uniformity = fs.readFileSync("src/components/masterdata/CatalogUniformityPanel.jsx", "utf8");
const core = fs.readFileSync("src/CoreStandardPage.jsx", "utf8");
const coreCss = fs.readFileSync("src/CoreStandardPage.css", "utf8");
const uniformityRequired = [
  [uniformity, "CONTROLLO SUPABASE LIVE"],
  [uniformity, "Codice inventario escluso"],
  [uniformity, "Nessun valore viene cancellato"],
  [core, "/master-data/uniformazione/anteprima"],
  [core, "UNIFICA_DUPLICATI_ESATTI_E818"],
  [coreCss, ".core-uniformity-panel"],
];
for (const [text, token] of uniformityRequired) {
  if (!text.includes(token)) throw new Error(`Token uniformità E8.1.8 mancante: ${token}`);
}
console.log("FMED E8.1.8 uniformità cataloghi Supabase: OK");
