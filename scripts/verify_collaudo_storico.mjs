import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const wizard = await readFile("src/NewAssetWizard.jsx", "utf8");
assert.match(wizard, /registra_collaudo_storico/);
assert.match(wizard, /Registra automaticamente il collaudo nello storico/);
assert.match(wizard, /Collaudo e piano manutentivo sono distinti/);
assert.match(wizard, /attivita_manutentiva: ""/);
assert.match(wizard, /activityState\.restricted && !compatible/);
assert.match(wizard, /Collaudo storico/);
console.log("FMED E3.2.1 collaudo storico wizard: OK");
