import assert from "node:assert/strict";
import fs from "node:fs";
const app = fs.readFileSync("src/App_nuovo.jsx", "utf8");
const main = fs.readFileSync("src/main.jsx", "utf8");
const dashboard = fs.readFileSync("src/pages/DashboardPage.jsx", "utf8");
const css = fs.readFileSync("src/FmedE811VisualPolish.css", "utf8");
const build = JSON.parse(fs.readFileSync("public/fmed-build.json", "utf8"));
assert.match(app, /E8_1_1_AUDIT_GRAFICO_VISUAL_POLISH/);
assert.match(app, /E8\.1\.1 AUDIT GRAFICO E VISUAL POLISH/);
assert.match(app, /fmed-e811-visual-polish/);
assert.match(app, /fmed-login-card/);
assert.match(main, /FmedE811VisualPolish\.css/);
assert.ok(main.indexOf("FmedE811VisualPolish.css") > main.indexOf("FmedE81OperationalSimplified.css"));
assert.match(dashboard, /data-fmed-dashboard="E8\.1\.1"/);
assert.ok(css.length > 25000);
for (const selector of [
  ".fmed-e71-kpi-grid",
  ".fmed-e71-quick-actions",
  ".fmed-module-hero-asset",
  ".fmed-module-hero-interventi",
  ".fmed-module-hero-scadenze",
  ".fmed-module-hero-infrastrutture",
  ".s8108-page-head",
  "thead th",
  ".fmed-login-card"
]) assert.ok(css.includes(selector), `Selector visuale mancante: ${selector}`);
assert.equal(build.release, "E8.1.1 Audit Grafico e Visual Polish");
assert.equal(build.backend_required, "E8.1 or newer");
console.log("FMED E8.1.1 Audit Grafico e Visual Polish frontend: OK");
