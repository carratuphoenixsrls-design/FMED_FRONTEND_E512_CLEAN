import fs from "node:fs";

const cssPath = "src/FmedE32SemanticColorSystem.css";
if (!fs.existsSync(cssPath)) throw new Error(`File colore mancante: ${cssPath}`);
const css = fs.readFileSync(cssPath, "utf8");

const required = [
  "--fmed-canvas", "--fmed-surface", "--fmed-text-primary", "--fmed-text-secondary",
  "--fmed-brand", "--fmed-success", "--fmed-warning", "--fmed-danger", "--fmed-info",
  "--fmed-sidebar", "--fmed-hero", ".fmed-dashboard-kpi-card", ".fmed-modal-card",
  "body[data-theme=\"light\"]", "body[data-theme=\"dark\"]",
];
for (const token of required) {
  if (!css.includes(token)) throw new Error(`Controllo colori fallito: ${token}`);
}

function rgb(hex) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((index) => parseInt(value.slice(index, index + 2), 16) / 255);
}
function luminance(hex) {
  const [r, g, b] = rgb(hex).map((value) => value <= 0.04045
    ? value / 12.92
    : Math.pow((value + 0.055) / 1.055, 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const pairs = [
  ["Light testo principale", "#1f2b28", "#f4f2ec", 7],
  ["Light testo secondario", "#5f6c68", "#f4f2ec", 4.5],
  ["Light hero", "#ffffff", "#184c49", 7],
  ["Light pulsante", "#ffffff", "#1d6862", 4.5],
  ["Dark testo principale", "#f2f6f4", "#0e1514", 7],
  ["Dark testo secondario", "#b0bdb8", "#0e1514", 4.5],
  ["Dark hero", "#f4f8f6", "#182724", 7],
  ["Dark pulsante", "#0e1514", "#68b7af", 4.5],
];
for (const [label, foreground, background, minimum] of pairs) {
  const ratio = contrast(foreground, background);
  if (ratio < minimum) throw new Error(`${label}: contrasto ${ratio.toFixed(2)} inferiore a ${minimum}`);
}

console.log("FMED E3.2 semantic color system: OK");
