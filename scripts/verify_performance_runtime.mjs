import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const app = await readFile(resolve(root, "src/App_nuovo.jsx"), "utf8");
const styles = await readFile(resolve(root, "src/fmedInlineStyles.js"), "utf8");
const vite = await readFile(resolve(root, "vite.config.js"), "utf8");

assert.match(app, /E6_2_PROCESS_ENGINE_COMPLETO/);
assert.match(app, /FMED_API_MEMORY_CACHE_MAX_ITEMS = 48/);
assert.match(app, /salvaCacheApiFmed/);
assert.match(app, /fmedInlineStyles\.js/);
assert.ok(app.length < 500_000, `App_nuovo.jsx ancora troppo grande: ${app.length} byte`);
assert.ok(styles.length > 350_000, "Registro stili separato incompleto");
assert.match(vite, /react-vendor/);
assert.match(vite, /fmed-inline-styles/);

const assetsDir = resolve(root, "dist/assets");
const files = await readdir(assetsDir);
const appChunk = files.find((name) => /^App_nuovo-.*\.js$/.test(name));
const styleChunk = files.find((name) => /^fmed-inline-styles-.*\.js$/.test(name));
const reactChunk = files.find((name) => /^react-vendor-.*\.js$/.test(name));
assert.ok(appChunk, "Chunk applicativo non trovato");
assert.ok(styleChunk, "Chunk stili non trovato");
assert.ok(reactChunk, "Chunk React vendor non trovato");
const appBytes = (await stat(resolve(assetsDir, appChunk))).size;
assert.ok(appBytes < 350_000, `Chunk applicativo oltre budget: ${appBytes} byte`);

console.log(`FMED E6.2 performance runtime: OK · app ${Math.round(appBytes / 1024)} KB · chunk separati attivi`);
