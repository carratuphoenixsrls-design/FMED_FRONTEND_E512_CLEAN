import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync("src/App_nuovo.jsx", "utf8");
const main = fs.readFileSync("src/main.jsx", "utf8");
const standard = fs.readFileSync("src/fmedStandard.js", "utf8");
const core = fs.readFileSync("src/CoreStandardPage.jsx", "utf8");
const scadenze = fs.readFileSync("src/components/scadenze/ScadenzeControls.jsx", "utf8");
const vite = fs.readFileSync("vite.config.js", "utf8");
const build = JSON.parse(fs.readFileSync("public/fmed-build.json", "utf8"));
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

assert.match(app, /E5_2_1_DATA_HYGIENE/);
assert.match(app, /E5\.2\.1 DATA HYGIENE/);
assert.match(app, /\/cicli-unificati\/attivi/);
assert.match(app, /listaSediCanoniche/);
assert.match(app, /deduplicaSediFmed/);
assert.match(main, /e5-2-1-data-hygiene/);
assert.match(standard, /chiaveSedeCanonica/);
assert.match(standard, /listaSediCanoniche/);
assert.match(core, /data-hygiene\/sedi\/audit/);
assert.match(core, /APPLICA_E5_2_1_DATA_HYGIENE/);
assert.match(core, /Pulizia controllata delle sedi/);
assert.match(scadenze, /Motore Cicli E5\.2/);
assert.doesNotMatch(vite, /release-guard|buildStart\s*\(/i);
assert.equal(build.release, "E5.2.1 Data Hygiene");
assert.equal(pkg.version, "5.2.1");
assert.equal(pkg.scripts?.prebuild, undefined);
console.log("FMED E5.2.1 release integrity: OK");
