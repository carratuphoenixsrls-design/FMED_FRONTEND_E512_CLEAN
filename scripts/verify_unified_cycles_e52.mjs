import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync("src/App_nuovo.jsx", "utf8");
const page = fs.readFileSync("src/pages/ScadenzePage.jsx", "utf8");
const controls = fs.readFileSync("src/components/scadenze/ScadenzeControls.jsx", "utf8");
const hero = fs.readFileSync("src/components/scadenze/ScadenzeHero.jsx", "utf8");

assert.match(app, /caricaJsonDaApi\("\/cicli-unificati\/attivi"/);
assert.match(app, /filtroScadenzeModulo/);
assert.match(app, /DA_PIANIFICARE/);
assert.match(app, /s\.modulo === filtroScadenzeModulo/);
assert.doesNotMatch(app, /function calcolaScadenzeFmed/);
assert.match(page, /Modulo/);
assert.match(page, /Famiglia attività/);
assert.match(page, /Sicurezza 81\/08/);
assert.match(page, /daPianificare/);
assert.match(controls, /Tutti i moduli/);
assert.match(controls, /Le attività precedenti restano soltanto nello storico/);
assert.match(hero, /Un solo ciclo corrente/);
console.log("FMED E5.2 Unified Cycle frontend: OK");
