import assert from "node:assert/strict";
import fs from "node:fs";

const canonical = fs.readFileSync("src/components/masterdata/CanonicalSelect.jsx", "utf8");
const canonicalCss = fs.readFileSync("src/components/masterdata/CanonicalSelect.css", "utf8");
const app = fs.readFileSync("src/App_nuovo.jsx", "utf8");
const assets = fs.readFileSync("src/pages/AssetPage.jsx", "utf8");
const infrastructure = fs.readFileSync("src/pages/InfrastrutturePage.jsx", "utf8");
const wizard = fs.readFileSync("src/NewAssetWizard.jsx", "utf8");
const core = fs.readFileSync("src/CoreStandardPage.jsx", "utf8");
const build = JSON.parse(fs.readFileSync("public/fmed-build.json", "utf8"));
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

assert.match(canonical, /Nuova voce contestuale/);
assert.match(canonical, /core\/dizionari\/suggerimenti/);
assert.match(canonical, /core\/dizionari\/risolvi/);
assert.match(canonical, /core\/relazioni/);
assert.match(canonical, /RICHIESTA_APPROVAZIONE/);
assert.match(canonical, /fmed:master-data-updated/);
assert.match(canonicalCss, /fmed-canonical-overlay/);
assert.match(canonicalCss, /@media \(max-width: 640px\)/);

assert.match(app, /E6_2_PROCESS_ENGINE_COMPLETO/);
assert.match(app, /<CanonicalSelect/);
assert.match(assets, /dictionary="TIPOLOGIE_ASSET"/);
assert.match(assets, /dictionary="COSTRUTTORI"/);
assert.match(assets, /dictionary="MODELLI"/);
assert.match(infrastructure, /dictionary="ITEM_INFRASTRUTTURE"/);
assert.match(infrastructure, /dictionary="CENTRI_COSTO"/);
assert.match(infrastructure, /dictionary="RESPONSABILI"/);
assert.match(wizard, /master-data-updated/);
assert.match(wizard, /restrictToOptions/);

assert.match(core, /core\/dizionari\/valori\/unifica/);
assert.match(core, /core\/relazioni\/acquisisci-storico/);
assert.match(core, /Passato → futuro/);
assert.match(core, /Da approvare/);
assert.match(core, /CATALOGO CANONICO GLOBALE E5\.2\.2/);

for (const source of [assets, infrastructure]) {
  assert.doesNotMatch(source, /<input[^>]+value=\{[^}]*\.(sede|societa|locazione|reparto|branca_medica|categoria|stato_asset|possesso|fornitore|costruttore|modello|tipologia|attivita|ditta|periodicita|esito|priorita|stato|descrizione|centro_costo|responsabile)/i);
}
assert.equal(pkg.version, "6.2.0");
assert.equal(build.release, "E6.2 Process Engine Completo");
assert.equal(pkg.scripts?.prebuild, undefined);
console.log("FMED E6.2 Catalogo Canonico frontend: OK");
