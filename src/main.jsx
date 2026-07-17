import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./FmedEnterpriseDesignSystem.css";
import "./FmedVisualConsolidated.css";
import "./FmedLayoutIntegrity.css";
import "./FmedLegacyThemeBridge.css";
import "./FmedE227Polish.css";
import "./FmedE228EnterpriseFix.css";
import "./FmedE2282TypographyLayout.css";
import "./FmedE229OperationalModules.css";
import "./FmedE31UxReview.css";
import FmedErrorBoundary from "./FmedErrorBoundary.jsx";
import "./FmedErrorBoundary.css";
import "./FmedE32SemanticColorSystem.css";
import "./FmedE42LightComfortLayout.css";

const FMED_APP_CACHE_VERSION = "fmed-enterprise-e5-2-1-data-hygiene-20260717-1";

const FMED_API_WARMUP_URL = String(
  import.meta.env?.VITE_API_BASE_URL || "https://fmed-backend.onrender.com"
).replace(/\/$/, "");

function warmBackendFmed() {
  // Avvia subito l'istanza Render mentre il frontend e la schermata login si caricano.
  // La richiesta non blocca l'interfaccia e riduce l'attesa al primo accesso ai dati.
  fetch(`${FMED_API_WARMUP_URL}/`, {
    method: "GET",
    cache: "no-store",
    headers: { Accept: "application/json" },
  }).catch(() => {});
}

async function clearLegacyPwaCache() {
  try {
    const previous = localStorage.getItem("fmed_app_cache_version");
    if (previous === FMED_APP_CACHE_VERSION) return;

    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }

    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }

    localStorage.setItem("fmed_app_cache_version", FMED_APP_CACHE_VERSION);
  } catch (error) {
    console.warn("[FMED] Cache cleanup skipped:", error);
  }
}

async function bootstrap() {
  warmBackendFmed();
  await clearLegacyPwaCache();

  const module = await import("./App_nuovo.jsx");
  const App = module.default;

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <FmedErrorBoundary>
        <App />
      </FmedErrorBoundary>
    </React.StrictMode>
  );
}

bootstrap();
