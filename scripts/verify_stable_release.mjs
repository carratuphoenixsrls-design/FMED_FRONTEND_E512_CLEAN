import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const required = [
  "package.json", "package-lock.json", "index.html", "vite.config.js", "vercel.json",
  "src/main.jsx", "src/App_nuovo.jsx", "src/CoreStandardPage.jsx", "src/CoreStandardPage.css",
  "src/components/DizionariControls.jsx", "src/FmedE42LightComfortLayout.css",
  "src/FmedE32SemanticColorSystem.css", "src/fmedInlineStyles.js",
  "scripts/verify_master_data_e51.mjs", "scripts/verify_performance_runtime.mjs",
  "public/fmed-build.json",
];
for (const file of required) await access(resolve(root, file), constants.R_OK);

const pkg = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const app = await readFile(resolve(root, "src/App_nuovo.jsx"), "utf8");
const main = await readFile(resolve(root, "src/main.jsx"), "utf8");
const core = await readFile(resolve(root, "src/CoreStandardPage.jsx"), "utf8");
const controls = await readFile(resolve(root, "src/components/DizionariControls.jsx"), "utf8");
const buildInfo = JSON.parse(await readFile(resolve(root, "public/fmed-build.json"), "utf8"));

assert.equal(pkg.version, "5.1.2");
assert.equal(pkg.scripts.build, "vite build --configLoader runner");
assert.equal(pkg.scripts.prebuild, undefined);
assert.match(app, /E5_1_2_CLEAN_REBUILD/);
assert.match(app, /fmedInlineStyles\.js/);
assert.match(main, /e5-1-2-clean-rebuild/);
assert.match(core, /master-data\/audit/);
assert.match(core, /master-data\/acquisisci-valori/);
assert.match(core, /master-data\/normalizza/);
assert.match(core, /ACQUISISCI_E5_MASTER_DATA/);
assert.match(core, /APPLICA_E5_MASTER_DATA/);
assert.match(controls, /Qualità dati/);
assert.equal(buildInfo.release, "E5.1.2 Clean Rebuild");
assert.doesNotMatch(app, /useOnDemandDataset|caricaAssetDataset|caricaInterventiDataset/);
console.log("FMED E5.1.2 Clean Rebuild integrity: OK");
