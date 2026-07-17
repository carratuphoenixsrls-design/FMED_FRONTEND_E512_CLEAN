import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync("src/App_nuovo.jsx", "utf8");
const main = fs.readFileSync("src/main.jsx", "utf8");
const core = fs.readFileSync("src/CoreStandardPage.jsx", "utf8");
const canonical = fs.readFileSync("src/components/masterdata/CanonicalSelect.jsx", "utf8");
const vite = fs.readFileSync("vite.config.js", "utf8");
const build = JSON.parse(fs.readFileSync("public/fmed-build.json", "utf8"));
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

assert.match(app, /FMED_ENTERPRISE_1_0_E5_2_2_CATALOGO_CANONICO_GLOBALE_2026_07_17/);
assert.match(app, /FMED ENTERPRISE 1\.0 · E5\.2\.2 CATALOGO CANONICO GLOBALE/);
assert.match(main, /fmed-enterprise-e5-2-2-catalogo-canonico/);
assert.match(app, /\/cicli-unificati\/attivi/);
assert.match(core, /data-hygiene\/sedi\/audit/);
assert.match(core, /core\/dizionari\/valori\/unifica/);
assert.match(core, /core\/relazioni\/acquisisci-storico/);
assert.match(canonical, /Quick Add|QUICK_ADD_CONTESTUALE_E5_2_2/);
assert.doesNotMatch(vite, /release-guard|buildStart\s*\(/i);
assert.equal(build.release, "E5.2.2 Catalogo Canonico Globale");
assert.equal(pkg.version, "5.2.2");
assert.equal(pkg.scripts?.prebuild, undefined);
console.log("FMED E5.2.2 release integrity: OK");
