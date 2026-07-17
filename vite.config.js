import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: { host: "0.0.0.0", port: 5173 },
  plugins: [react()],
  build: {
    target: "es2022",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/scheduler")) return "react-vendor";
          if (id.endsWith("/src/fmedInlineStyles.js")) return "fmed-inline-styles";
          return undefined;
        },
      },
    },
  },
});
