import fs from "node:fs";
const app = fs.readFileSync("src/App_nuovo.jsx", "utf8");
const build = JSON.parse(fs.readFileSync("public/fmed-build.json", "utf8"));
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const version = "FMED_ENTERPRISE_1_0_E6_1_PROCESS_ENGINE_UNIFICATO_2026_07_18";
if (!app.includes(version)) throw new Error("Versione E6.1 assente in App_nuovo.jsx");
if (build.build !== version) throw new Error("fmed-build.json non allineato a E6.1");
if (pkg.version !== "6.1.0") throw new Error("package.json non allineato a E6.1");
console.log("FMED E6.1 release finale: OK");
