import fs from "node:fs";

const required = [
  ["src/CoreStandardPage.jsx", "QUALITA"],
  ["src/CoreStandardPage.jsx", "/master-data/audit"],
  ["src/CoreStandardPage.jsx", "/master-data/acquisisci-valori"],
  ["src/CoreStandardPage.jsx", "/master-data/normalizza"],
  ["src/components/DizionariControls.jsx", "Qualità dati"],
  ["src/CoreStandardPage.css", "FMED Enterprise E5.2"],
  ["src/App_nuovo.jsx", "E5.2 MOTORE CICLI UNIFICATO"],
];
for (const [file, token] of required) {
  const text = fs.readFileSync(file, "utf8");
  if (!text.includes(token)) throw new Error(`[E5.2] Token mancante in ${file}: ${token}`);
}
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
if (pkg.scripts?.prebuild) throw new Error("[E5.2] prebuild non deve bloccare i deploy Vercel manuali");
console.log("[FMED E5.2] Master Data Governance frontend: OK");
