import fs from "node:fs";

const checks = [
  ["src/components/interventi/NewInterventionAssetPicker.jsx", ["Cambia cespite", "Azzera ricerca", "allMatches.length"]],
  ["src/ProcessiPage.jsx", ["humanizeStep", "Quando usarlo"]],
  ["src/pages/SharePointPage.jsx", ["Gestisci nel modulo"]],
  ["src/FmedE31UxReview.css", ["fmed-intervention-selected-summary", "fmed-process-use-case"]],
  ["src/App_nuovo.jsx", ["E5.2.2 CATALOGO CANONICO GLOBALE", "fmed-new-intervention-status"]],
];

for (const [file, needles] of checks) {
  if (!fs.existsSync(file)) throw new Error(`File UX mancante: ${file}`);
  const content = fs.readFileSync(file, "utf8");
  for (const needle of needles) {
    if (!content.includes(needle)) throw new Error(`Controllo UX fallito: ${needle} non trovato in ${file}`);
  }
}
console.log("FMED E5.2.2 UX review compatibility: OK");
