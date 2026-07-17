import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync("src/App_nuovo.jsx", "utf8");
const main = fs.readFileSync("src/main.jsx", "utf8");
const wizard = fs.readFileSync("src/NewAssetWizard.jsx", "utf8");
const core = fs.readFileSync("src/CoreStandardPage.jsx", "utf8");
const vite = fs.readFileSync("vite.config.js", "utf8");
const build = JSON.parse(fs.readFileSync("public/fmed-build.json", "utf8"));
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

assert.match(app, /E5_1_2_CLEAN_REBUILD/);
assert.match(app, /E5\.1\.2 CLEAN REBUILD/);
assert.doesNotMatch(app, /E4_2_1_LIGHT_COMFORT_SHAREPOINT_SYNC/);
assert.match(main, /e5-1-2-clean-rebuild/);
assert.match(wizard, /E5\.1\.2/);
assert.match(core, /master-data\/audit/);
assert.match(core, /master-data\/normalizza/);
assert.match(core, /Authorization/);
assert.doesNotMatch(vite, /release-guard|buildStart\s*\(/i);
assert.equal(build.release, "E5.1.2 Clean Rebuild");
assert.equal(pkg.version, "5.1.2");
assert.equal(pkg.scripts?.prebuild, undefined);
console.log("FMED E5.1.2 Clean Rebuild integrity: OK");
