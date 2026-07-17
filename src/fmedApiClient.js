const DEFAULT_API_BASE_URL = "https://fmed-backend.onrender.com";

export function fmedApiBaseUrl(explicitBaseUrl = "") {
  const configured = String(explicitBaseUrl || import.meta.env?.VITE_API_BASE_URL || "").trim().replace(/\/$/, "");
  if (configured) return configured;
  if (typeof window !== "undefined" && ["localhost", "127.0.0.1", ""].includes(window.location.hostname)) {
    return "http://127.0.0.1:8000";
  }
  return DEFAULT_API_BASE_URL;
}

export function fmedApiUrl(pathOrUrl, explicitBaseUrl = "") {
  const value = String(pathOrUrl || "").trim();
  if (/^https?:\/\//i.test(value)) return value;
  return `${fmedApiBaseUrl(explicitBaseUrl)}${value.startsWith("/") ? value : `/${value}`}`;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shouldRetryStatus(status) {
  return [408, 425, 429, 500, 502, 503, 504].includes(Number(status));
}

function readableDetail(data, fallback) {
  const detail = data?.detail;
  if (typeof detail === "string" && detail.trim()) return detail.trim();
  if (detail && typeof detail === "object") {
    return String(detail.messaggio || detail.errore || detail.message || fallback || "Errore backend");
  }
  return String(data?.messaggio || data?.errore || data?.message || fallback || "Errore backend");
}

export async function fmedFetchJson(pathOrUrl, options = {}) {
  const {
    apiBaseUrl = "",
    retries = 2,
    timeoutMs = 45000,
    retryDelayMs = 900,
    ...fetchOptions
  } = options || {};
  const url = fmedApiUrl(pathOrUrl, apiBaseUrl);
  let lastError = null;

  for (let attempt = 0; attempt <= Math.max(0, Number(retries || 0)); attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), Math.max(3000, Number(timeoutMs || 45000)));
    try {
      const response = await fetch(url, {
        cache: "no-store",
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(fetchOptions?.headers || {}),
        },
      });
      const text = await response.text();
      let data = {};
      if (text) {
        try { data = JSON.parse(text); }
        catch { data = { detail: text.slice(0, 1200) }; }
      }
      if (!response.ok) {
        const error = new Error(readableDetail(data, `HTTP ${response.status}`));
        error.status = response.status;
        error.data = data;
        if (attempt < retries && shouldRetryStatus(response.status)) {
          lastError = error;
          await wait(retryDelayMs * (attempt + 1));
          continue;
        }
        throw error;
      }
      return data;
    } catch (error) {
      const normalized = error?.name === "AbortError"
        ? new Error("Il backend FMED non ha risposto entro il tempo previsto")
        : error;
      lastError = normalized;
      const networkFailure = !Number(normalized?.status);
      if (attempt < retries && networkFailure) {
        await wait(retryDelayMs * (attempt + 1));
        continue;
      }
      throw normalized;
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError || new Error("Backend FMED non raggiungibile");
}

export function fmedSession() {
  try {
    const raw = localStorage.getItem("fmed_login_session") || sessionStorage.getItem("fmed_login_session");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function fmedAuthHeaders(extra = {}) {
  const session = fmedSession();
  const token = String(session?.access_token || session?.token || "").trim();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(extra || {}),
  };
}
