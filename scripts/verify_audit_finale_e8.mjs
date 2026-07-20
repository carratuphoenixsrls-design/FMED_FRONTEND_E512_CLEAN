import fs from "node:fs";
const settings = fs.readFileSync("src/ImpostazioniPage.jsx", "utf8");
const page = fs.readFileSync("src/AuditFinalePage.jsx", "utf8");
const css = fs.readFileSync("src/AuditFinalePage.css", "utf8");
if (!settings.includes('key: "AUDIT"') || !settings.includes("AuditFinalePage")) throw new Error("Tab Audit finale non collegata alle Impostazioni");
if (!page.includes('/audit-finale?force=') || !page.includes("Esegui audit completo")) throw new Error("Pagina Audit finale non collegata al backend E8");
if (!page.includes("Esporta report JSON")) throw new Error("Export audit JSON assente");
if (!css.includes("fmed-audit-summary") || !css.includes("fmed-audit-check")) throw new Error("Stili Audit E8 incompleti");
console.log("FMED E8 Audit finale frontend: OK");
