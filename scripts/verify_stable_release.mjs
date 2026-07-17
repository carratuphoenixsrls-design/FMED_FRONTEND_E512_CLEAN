import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const required = [
  "package.json", "package-lock.json", "index.html", "vite.config.js", "vercel.json",
  "src/main.jsx", "src/App_nuovo.jsx", "src/fmedStandard.js", "src/CoreStandardPage.jsx",
  "src/CoreStandardPage.css", "src/components/DizionariControls.jsx",
  "src/FmedE42LightComfortLayout.css", "src/FmedE32SemanticColorSystem.css",
  "src/fmedInlineStyles.js", "scripts/verify_data_hygiene_e521.mjs",
  "scripts/verify_unified_cycles_e52.mjs", "scripts/verify_performance_runtime.mjs",
  "public/fmed-build.json",
];
for (const file of required) await access(resolve(root, file), constants.R_OK);

const pkg = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const app = await readFile(resolve(root, "src/App_nuovo.jsx"), "utf8");
const main = await readFile(resolve(root, "src/main.jsx"), "utf8");
const core = await readFile(resolve(root, "src/CoreStandardPage.jsx"), "utf8");
const buildInfo = JSON.parse(await readFile(resolve(root, "public/fmed-build.json"), "utf8"));

assert.equal(pkg.version, "5.2.2");
assert.equal(pkg.scripts.build, "vite build --configLoader runner");
assert.equal(pkg.scripts.prebuild, undefined);
assert.match(app, /E5_2_2_CATALOGO_CANONICO_GLOBALE/);
assert.match(app, /fmedInlineStyles\.js/);
assert.match(main, /e5-2-2-catalogo-canonico/);
assert.match(core, /master-data\/audit/);
assert.match(core, /data-hygiene\/sedi\/audit/);
assert.match(core, /APPLICA_E5_2_1_DATA_HYGIENE/);
assert.equal(buildInfo.release, "E5.2.2 Catalogo Canonico Globale");
assert.doesNotMatch(app, /useOnDemandDataset|caricaAssetDataset|caricaInterventiDataset/);
console.log("FMED E5.2.2 stable release integrity: OK");
