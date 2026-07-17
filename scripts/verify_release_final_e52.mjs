import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync("src/App_nuovo.jsx", "utf8");
const main = fs.readFileSync("src/main.jsx", "utf8");
const wizard = fs.readFileSync("src/NewAssetWizard.jsx", "utf8");
const scadenze = fs.readFileSync("src/pages/ScadenzePage.jsx", "utf8");
const controls = fs.readFileSync("src/components/scadenze/ScadenzeControls.jsx", "utf8");
const vite = fs.readFileSync("vite.config.js", "utf8");
const build = JSON.parse(fs.readFileSync("public/fmed-build.json", "utf8"));
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

assert.match(app, /E5_2_UNIFIED_CYCLE_ENGINE/);
assert.match(app, /E5\.2 MOTORE CICLI UNIFICATO/);
assert.match(app, /\/cicli-unificati\/attivi/);
assert.doesNotMatch(app, /function calcolaScadenzeFmed/);
assert.match(main, /e5-2-unified-cycle-engine/);
assert.match(wizard, /E5\.2/);
assert.match(scadenze, /Sicurezza 81\/08/);
assert.match(scadenze, /Da pianificare/);
assert.match(controls, /Tutti i moduli/);
assert.match(controls, /Motore Cicli E5\.2/);
assert.doesNotMatch(vite, /release-guard|buildStart\s*\(/i);
assert.equal(build.release, "E5.2 Motore Cicli Unificato");
assert.equal(pkg.version, "5.2.0");
assert.equal(pkg.scripts?.prebuild, undefined);
console.log("FMED E5.2 release integrity: OK");
