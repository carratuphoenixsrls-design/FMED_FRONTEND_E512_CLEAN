import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync("src/App_nuovo.jsx", "utf8");
const standard = fs.readFileSync("src/fmedStandard.js", "utf8");
const core = fs.readFileSync("src/CoreStandardPage.jsx", "utf8");
const css = fs.readFileSync("src/CoreStandardPage.css", "utf8");

for (const label of [
  "AXA Medica", "Marilab Center", "Marilab Surgery", "Marilab Garbatella",
  "Marilab Fiumicino", "Marilab Future Labs",
]) assert.ok(standard.includes(label), `Sede canonica mancante: ${label}`);

assert.match(standard, /zero-width|\\u200B/i);
assert.match(app, /listaSediFiltroScadenze = deduplicaSediFmed/);
assert.match(app, /sede: normalizzaSedeDisplay/);
assert.match(core, /data-hygiene\/sedi\/normalizza/);
assert.match(core, /valore precedente verrà conservato nello storico/);
assert.match(css, /core-site-hygiene-panel/);
assert.match(css, /core-site-catalog/);
console.log("FMED E5.2.1 Data Hygiene frontend: OK");
