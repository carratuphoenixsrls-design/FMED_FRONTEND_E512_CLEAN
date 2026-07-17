import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile("src/FmedE42LightComfortLayout.css", "utf8");
const app = await readFile("src/App_nuovo.jsx", "utf8");
const main = await readFile("src/main.jsx", "utf8");
const icon = await readFile("src/components/FmedModuleIcon.jsx", "utf8");
const sharepoint = await readFile("src/pages/SharePointPage.jsx", "utf8");
const buildInfo = JSON.parse(await readFile("public/fmed-build.json", "utf8"));

for (const token of [
  "--fmed-canvas: #eef1ed",
  "--fmed-surface: #f8f9f6",
  "--fmed-input-surface: #f4f6f2",
  "--fmed-hero: linear-gradient",
  ".fmed-module-icon",
  ".fmed-banner-heading",
  ".core-dictionary-layout",
  ".fmed-sharepoint-sync-panel",
  "@media (min-width: 1180px)",
]) assert.ok(css.includes(token), `Token/layout Light Comfort mancante: ${token}`);

for (const moduleName of [
  "Dashboard", "Asset", "Interventi", "Costi", "Scadenze", "Infrastrutture",
  "Sicurezza", "Export", "SharePoint", "Processi", "Dizionari", "Impostazioni", "NuovoAsset",
]) assert.ok(icon.includes(`${moduleName}:`), `Icona modulo mancante: ${moduleName}`);

const bannerFiles = {
  "src/pages/DashboardPage.jsx": 'module="Dashboard"',
  "src/components/asset/AssetHero.jsx": 'module="Asset"',
  "src/components/interventi/InterventiHero.jsx": 'module="Interventi"',
  "src/components/scadenze/ScadenzeHero.jsx": 'module="Scadenze"',
  "src/components/infrastrutture/InfrastruttureHero.jsx": 'module="Infrastrutture"',
  "src/pages/CostiPage.jsx": 'module="Costi"',
  "src/pages/ExportPage.jsx": 'module="Export"',
  "src/pages/SharePointPage.jsx": 'module="SharePoint"',
  "src/ProcessiPage.jsx": 'module="Processi"',
  "src/CoreStandardPage.jsx": 'module="Dizionari"',
  "src/ImpostazioniPage.jsx": 'module="Impostazioni"',
  "src/components/sicurezza8108/Sicurezza8108Controls.jsx": 'module="Sicurezza"',
  "src/NewAssetWizard.jsx": 'module="NuovoAsset"',
};
for (const [file, needle] of Object.entries(bannerFiles)) {
  const content = await readFile(file, "utf8");
  assert.ok(content.includes(needle), `Icona banner non collegata: ${file}`);
}

assert.match(app, /E5_2_1_DATA_HYGIENE/);
assert.match(app, /E5\.2\.1 DATA HYGIENE/);
assert.match(app, /sharepoint\/cespiti\/\$\{encodeURIComponent\(codice\)\}\/link-documento/);
assert.ok(!app.includes("A_003323: \"https://marilab.sharepoint.com"), "Fallback SharePoint storico ancora incorporato");
assert.match(app, /data-fmed-build/);
assert.match(main, /FmedE42LightComfortLayout\.css/);
assert.match(sharepoint, /sincronizza-link/);
assert.match(sharepoint, /Anteprima modifiche/);
assert.equal(buildInfo.release, "E5.2.1 Data Hygiene");

console.log("FMED E5.2.1 Light Comfort compatibility: OK");
