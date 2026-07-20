/* FMED ENTERPRISE 1.0 · E8 AUDIT FINALE E RELEASE STABILE · FRONTEND COMPLETO */
/*
  FMED CLEANUP 2026-06-25
  - Verifica JSX eseguita con esbuild: sintassi OK.
  - Rimosso componente CSS globale inutilizzato che poteva creare conflitti grafici.
  - 2026-06-25: aggiunta colonna Locazione negli export e nella pagina Asset.
*/

import { useEffect, useMemo, useDeferredValue, useState, useCallback, memo, lazy, Suspense } from "react";
import { SEDI_STANDARD, SEDI_STANDARD_LIST, PERIODICITA_STANDARD, calcolaProssimaScadenza, etichetteDaDizionario, codiciDaDizionario, chiaveSedeCanonica, etichettaSedeCanonica, listaSediCanoniche } from "./fmedStandard.js";
import styles, { loginStyles, loginLightStyles } from "./fmedInlineStyles.js";
const Sicurezza8108Page = lazy(() => import("./Sicurezza8108Page.jsx"));
const ProcessiPage = lazy(() => import("./ProcessiPage.jsx"));
const ImpostazioniPage = lazy(() => import("./ImpostazioniPage.jsx"));
const NewAssetWizard = lazy(() => import("./NewAssetWizard.jsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const AssetPage = lazy(() => import("./pages/AssetPage.jsx"));
const InterventiPage = lazy(() => import("./pages/InterventiPage.jsx"));
const ScadenzePage = lazy(() => import("./pages/ScadenzePage.jsx"));
const InfrastrutturePage = lazy(() => import("./pages/InfrastrutturePage.jsx"));
const CostiPage = lazy(() => import("./pages/CostiPage.jsx"));
const ExportPage = lazy(() => import("./pages/ExportPage.jsx"));
const SharePointPage = lazy(() => import("./pages/SharePointPage.jsx"));
import NewInterventionAssetPicker from "./components/interventi/NewInterventionAssetPicker.jsx";
import AlertMailDialog from "./components/alerts/AlertMailDialog.jsx";
import CanonicalSelect from "./components/masterdata/CanonicalSelect.jsx";
const nomiCategorie = {
  E: "Elettromedicale",
  A: "Arredo",
  S: "Arredo sanitario",
  CDZ: "Condizionamento",
  GE: "Gruppo elettrogeno",
  UPS: "UPS - Unità Power Supply"
};
const SHAREPOINT_GENERIC_URL = "https://marilab.sharepoint.com/sites/marilab2/Documenti%20condivisi/Forms/AllItems.aspx?id=%2Fsites%2Fmarilab2%2FDocumenti%20condivisi%2FINFRASTRUTTURE%2FFMED_INFRASTRUTTURE%2F00_INVENTARIO";
const DOCUMENTAZIONE_CESPITI_PREDEFINITA = {};

// Backend FMED/FastAPI usato per API, QR code e redirect documentale SharePoint.
// FIX CLOUD V15: su Vercel deve usare SEMPRE la variabile ambiente VITE_API_BASE_URL.
// In locale mantiene il fallback su 127.0.0.1:8000. In produzione usa Render.
const FRONTEND_HOST = window.location.hostname;
const ENV_API_BASE_URL = String(import.meta.env?.VITE_API_BASE_URL || "").replace(/\/$/, "");
const IS_LOCAL_FRONTEND = FRONTEND_HOST === "localhost" || FRONTEND_HOST === "127.0.0.1" || FRONTEND_HOST === "";
const API_BASE_URL = ENV_API_BASE_URL || (IS_LOCAL_FRONTEND ? "http://127.0.0.1:8000" : "https://fmed-backend.onrender.com");

// In cloud NON proviamo localhost/127.0.0.1/10.10.10.31, perché il browser utente non può raggiungerli.
// I fallback locali restano disponibili solo quando il frontend è aperto da localhost.
const API_BASE_CANDIDATES = [API_BASE_URL, ...(ENV_API_BASE_URL ? [] : IS_LOCAL_FRONTEND ? ["http://localhost:8000", "http://10.10.10.31:8000"] : [])].filter((value, index, array) => value && array.indexOf(value) === index);

// Versione frontend visibile per evitare dubbi da cache, browser o PWA.
const MRDB_APP_VERSION = "FMED_ENTERPRISE_1_0_E8_AUDIT_FINALE_RELEASE_STABILE_2026_07_20";
const MRDB_APP_BUILD_LABEL = "FMED ENTERPRISE 1.0 · E8 AUDIT FINALE E RELEASE STABILE";
// FMED PERFORMANCE SAFE MODE
// Render progressivo degli elenchi lunghi: filtri/export restano completi, si alleggerisce solo il DOM visibile.
const FMED_RENDER_BATCH_ASSET = 100;
const FMED_RENDER_BATCH_INTERVENTI = 120;
const FMED_RENDER_BATCH_SCADENZE = 120;
const FMED_API_IN_FLIGHT = new Map();
const FMED_API_MEMORY_CACHE = new Map();
const FMED_API_MEMORY_CACHE_MAX_ITEMS = 48;
function salvaCacheApiFmed(key, data, ttlMs) {
  const now = Date.now();
  for (const [cacheKey, item] of FMED_API_MEMORY_CACHE.entries()) {
    if (!item || now >= Number(item.expiresAt || 0)) FMED_API_MEMORY_CACHE.delete(cacheKey);
  }
  FMED_API_MEMORY_CACHE.set(key, {
    data,
    expiresAt: now + Math.max(1, Number(ttlMs || 1)),
    updatedAt: now,
  });
  while (FMED_API_MEMORY_CACHE.size > FMED_API_MEMORY_CACHE_MAX_ITEMS) {
    const oldestKey = [...FMED_API_MEMORY_CACHE.entries()]
      .sort((a, b) => Number(a[1]?.updatedAt || 0) - Number(b[1]?.updatedAt || 0))[0]?.[0];
    if (!oldestKey) break;
    FMED_API_MEMORY_CACHE.delete(oldestKey);
  }
}
function normalizzaChiaveCacheApi(endpoint) {
  const raw = String(endpoint || "");
  try {
    const url = new URL(raw, "https://fmed.local");
    url.searchParams.delete("_");
    const query = url.searchParams.toString();
    return `${url.pathname}${query ? `?${query}` : ""}`;
  } catch {
    return raw.replace(/([?&])_=\d+(&|$)/, "$1").replace(/[?&]$/, "");
  }
}
function ttlCacheApiFmed(endpoint) {
  const key = normalizzaChiaveCacheApi(endpoint);
  if (key.startsWith("/core/dizionari") || key.startsWith("/core/processi")) return 60_000;
  if (key.startsWith("/infrastrutture") || key.startsWith("/alert/scadenze-uniche")) return 30_000;
  if (key.startsWith("/censimento") || key.startsWith("/interventi")) return 45_000;
  return 15_000;
}
async function caricaJsonDaApi(endpoint, fallback = [], options = {}) {
  const requestKey = normalizzaChiaveCacheApi(endpoint);
  const force = Boolean(options?.force) || /[?&]_=\d+/.test(String(endpoint || ""));
  const ttlMs = Number.isFinite(Number(options?.ttlMs)) ? Number(options.ttlMs) : ttlCacheApiFmed(endpoint);
  const cached = FMED_API_MEMORY_CACHE.get(requestKey);
  if (!force && cached && Date.now() < cached.expiresAt) return cached.data;
  if (FMED_API_IN_FLIGHT.has(requestKey)) return FMED_API_IN_FLIGHT.get(requestKey);
  const requestPromise = (async () => {
    let ultimoErrore = null;
    for (const baseUrl of API_BASE_CANDIDATES) {
      const url = `${baseUrl}${endpoint}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          cache: "default",
          headers: {
            Accept: "application/json"
          }
        });
        const testo = await response.text();
        if (!response.ok) {
          ultimoErrore = `HTTP ${response.status}: ${testo}`;
          continue;
        }
        if (!testo) {
          ultimoErrore = "Risposta vuota";
          continue;
        }
        const datiRaw = JSON.parse(testo);
        const dati = Array.isArray(datiRaw) ? datiRaw : Array.isArray(datiRaw?.data) ? datiRaw.data : Array.isArray(datiRaw?.risultato) ? datiRaw.risultato : datiRaw;
        if (Array.isArray(fallback) && !Array.isArray(dati)) {
          ultimoErrore = "Risposta non valida: atteso array";
          continue;
        }
        if (ttlMs > 0) {
          salvaCacheApiFmed(requestKey, dati, ttlMs);
        }
        return dati;
      } catch (err) {
        ultimoErrore = err;
      }
    }
    console.error("[FMED API] Tutti i tentativi falliti per", endpoint, ultimoErrore);
    return cached?.data ?? fallback;
  })();
  FMED_API_IN_FLIGHT.set(requestKey, requestPromise);
  try {
    return await requestPromise;
  } finally {
    FMED_API_IN_FLIGHT.delete(requestKey);
  }
}
async function chiamataApiAutenticataFmed(endpoint, options = {}) {
  let ultimoErrore = null;
  let token = "";
  try {
    const raw = localStorage.getItem("fmed_login_session") || sessionStorage.getItem("fmed_login_session");
    if (raw) {
      const sessione = JSON.parse(raw);
      token = sessione?.access_token || sessione?.token || "";
    }
  } catch (e) {
    console.error("[FMED] Errore lettura sessione:", e);
  }
  for (const baseUrl of API_BASE_CANDIDATES) {
    const url = `${baseUrl}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token ? {
            Authorization: `Bearer ${token}`
          } : {}),
          ...(options.headers || {})
        }
      });
      const testo = await response.text();
      let dati = null;
      try {
        dati = testo ? JSON.parse(testo) : null;
      } catch {
        dati = testo;
      }
      if (!response.ok) {
        const dettaglio = dati?.detail;
        if (dettaglio && typeof dettaglio === "object") {
          ultimoErrore = [dettaglio.messaggio || dettaglio.message || `HTTP ${response.status}`, dettaglio.request_id ? `ID richiesta: ${dettaglio.request_id}` : "", dettaglio.errore ? `Dettaglio: ${dettaglio.errore}` : ""].filter(Boolean).join(" • ");
        } else {
          ultimoErrore = dettaglio || dati?.message || `HTTP ${response.status}`;
        }
        continue;
      }
      return dati;
    } catch (err) {
      ultimoErrore = err;
    }
  }
  throw new Error(String(ultimoErrore || "Errore collegamento backend FMED"));
}

// Sedi e periodicità provengono dai Master Data centralizzati (fallback in fmedStandard.js).

function chiaveSedeOperativa(valore) {
  const canonica = chiaveSedeCanonica(valore);
  if (canonica) return canonica;
  return String(valore || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[\u200B-\u200D\uFEFF]/g, "").toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function normalizzaMaiuscoleMinuscole(valore) {
  const testo = String(valore || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/_/g, " ").replace(/\s+/g, " ").trim();
  if (!testo) return "NON SPECIFICATA";
  return testo.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()).replace(/\bSrl\b/g, "SRL").replace(/\bSpa\b/g, "SPA").replace(/\bAxa\b/g, "AXA").replace(/\bFmed\b/g, "FMED");
}
function normalizzaSedeDisplay(valore) {
  return etichettaSedeCanonica(valore) || normalizzaMaiuscoleMinuscole(valore);
}
function deduplicaSediFmed(valori = [], includeUnknown = true) {
  return listaSediCanoniche(valori, { includeUnknown });
}

function normalizzaCentroCostoFmed(valore, sedeFallback = "") {
  const candidato = String(valore || sedeFallback || "").trim();
  if (!candidato) return "";
  return normalizzaSedeDisplay(candidato);
}
function getLocazioneFmed(record = {}, fallbackRecord = {}) {
  const valore = record?.locazione ?? record?.Locazione ?? record?.LOCAZIONE ?? record?.ubicazione ?? record?.Ubicazione ?? record?.UBICAZIONE ?? record?.stanza ?? record?.Stanza ?? record?.STANZA ?? record?.locale ?? record?.Locale ?? record?.LOCALE ?? record?.ambiente ?? record?.Ambiente ?? fallbackRecord?.locazione ?? fallbackRecord?.Locazione ?? fallbackRecord?.ubicazione ?? fallbackRecord?.stanza ?? "";
  return String(valore || "").trim();
}
function normalizzaSedePerConfronto(valore) {
  return chiaveSedeOperativa(valore) || normalizzaTestoCodice(valore);
}
function caricaDizionarioExtra(tipo) {
  try {
    const salvati = JSON.parse(localStorage.getItem("fmed_dizionari_extra") || "{}");
    const master = JSON.parse(localStorage.getItem("fmed_dizionari_master") || "{}");

    // Standard FMED: la ditta tecnica degli interventi è sempre ditta_esecutrice.
    // Manteniamo compatibilità con vecchie chiavi localStorage (ditta / ditta_manutentrice)
    // senza farle comparire come dizionari separati.
    const chiavi = tipo === "ditta" || tipo === "ditta_esecutrice" ? ["ditta", "ditta_esecutrice", "ditta_manutentrice"] : [tipo];
    const lista = chiavi.flatMap(chiave => [...(Array.isArray(salvati?.[chiave]) ? salvati[chiave] : []), ...(Array.isArray(master?.[chiave]) ? master[chiave] : [])]);
    return [...new Set(lista.map(v => normalizzaValoreMasterFmed(v)).filter(Boolean))];
  } catch {
    return [];
  }
}
function normalizzaValoreMasterFmed(valore) {
  return String(valore || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, " ").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().toUpperCase();
}
function fmedCatalogoDaCespiti(cespiti = []) {
  const mappa = new Map();
  (Array.isArray(cespiti) ? cespiti : []).forEach(c => {
    const costruttore = normalizzaValoreMasterFmed(c?.costruttore);
    const modello = normalizzaValoreMasterFmed(c?.modello);
    if (!costruttore && !modello) return;
    const chiave = `${costruttore}|${modello}`;
    const precedente = mappa.get(chiave) || {
      count: 0,
      costruttore,
      modello,
      tipologie: {},
      branche: {},
      categorie: {}
    };
    precedente.count += 1;
    const tipologia = normalizzaValoreMasterFmed(c?.tipologia);
    const branca = normalizzaValoreMasterFmed(c?.branca_medica || c?.branca);
    const categoria = normalizzaValoreMasterFmed(c?.categoria);
    if (tipologia) precedente.tipologie[tipologia] = (precedente.tipologie[tipologia] || 0) + 1;
    if (branca) precedente.branche[branca] = (precedente.branche[branca] || 0) + 1;
    if (categoria) precedente.categorie[categoria] = (precedente.categorie[categoria] || 0) + 1;
    mappa.set(chiave, precedente);
  });
  return [...mappa.values()];
}
function fmedPiuFrequente(mappa = {}) {
  return Object.entries(mappa || {}).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] || "";
}
function fmedSuggerisciDaCatalogo(cespiti = [], dati = {}) {
  const costruttore = normalizzaValoreMasterFmed(dati?.costruttore);
  const modello = normalizzaValoreMasterFmed(dati?.modello);
  if (!costruttore && !modello) return null;
  const catalogo = fmedCatalogoDaCespiti(cespiti);
  const match = catalogo.filter(r => {
    const okCostruttore = costruttore ? r.costruttore === costruttore : true;
    const okModello = modello ? r.modello === modello : true;
    return okCostruttore && okModello;
  }).sort((a, b) => b.count - a.count)[0];
  if (!match) return null;
  return {
    count: match.count,
    costruttore: match.costruttore,
    modello: match.modello,
    tipologia: fmedPiuFrequente(match.tipologie),
    branca_medica: fmedPiuFrequente(match.branche),
    categoria: fmedPiuFrequente(match.categorie)
  };
}
function salvaDizionariExtraSuLocalStorage(dizionari) {
  try {
    const dati = {
      ...(dizionari || {})
    };
    // Salva la stessa lista anche con chiave esplicita ditta_esecutrice per chiarezza futura.
    if (Array.isArray(dati.ditta)) {
      dati.ditta_esecutrice = dati.ditta;
      delete dati.ditta_manutentrice;
    }
    localStorage.setItem("fmed_dizionari_extra", JSON.stringify(dati));
  } catch (err) {
    console.warn("Impossibile salvare dizionari extra in localStorage", err);
  }
}
function normalizzaCespiteDaApi(c = {}) {
  const codice = c.codicestrumento || c.codice_strumento || c.CodiceStrumento || c.CODICESTRUMENTO || c.codice || "";
  return {
    ...c,
    codicestrumento: String(codice || "").trim(),
    sede: normalizzaSedeDisplay(c.sede || c.Sede || c.SEDE || ""),
    sede_originale: c.sede || c.Sede || c.SEDE || "",
    tipologia: c.tipologia || c.Tipologia || c.TIPOLOGIA || "",
    reparto: c.reparto || c.Reparto || c.REPARTO || "",
    branca_medica: c.branca_medica || c.branca || c.Branca || c["Branca medica"] || c.BRANCA_MEDICA || "",
    area_sanitaria: c.area_sanitaria || c.area || c.Area || c["Area sanitaria"] || c.AREA_SANITARIA || "",
    locazione: getLocazioneFmed(c),
    costruttore: c.costruttore || c.Costruttore || c.COSTRUTTORE || "",
    modello: c.modello || c.Modello || c.MODELLO || "",
    matricola: c.matricola || c.Matricola || c.MATRICOLA || "",
    categoria: c.categoria || c.Categoria || c.CATEGORIA || "",
    societa: c.societa || c.Societa || c["Società"] || c.SOCIETA || "",
    link_documento: c.link_documento || c.linkDocumentazione || c.link_sharepoint || c.LinkDocumento || "",
    note: c.note || c.Note || c.NOTE || "",
    accessori_sistema_primario: c.accessori_sistema_primario || c.AccessoriSistemaPrimario || c["Accessori / Sistema primario"] || c.ACCESSORI_SISTEMA_PRIMARIO || "",
    marcatura_ce: c.marcatura_ce || c.MarcaturaCE || c["Marcatura CE"] || c.MARCATURA_CE || "",
    alimentazione: c.alimentazione || c.Alimentazione || c.ALIMENTAZIONE || "",
    potenza: c.potenza || c.Potenza || c.POTENZA || "",
    frequenza: c.frequenza || c.Frequenza || c.FREQUENZA || "",
    lotto: c.lotto || c.Lotto || c.LOTTO || ""
  };
}
function normalizzaInterventoDaApi(i = {}) {
  const codice = i.codice_strumento || i.codicestrumento || i.CodiceStrumento || i.CODICESTRUMENTO || i.codice || "";
  return {
    ...i,
    codice_strumento: String(codice || "").trim(),
    codicestrumento: String(codice || "").trim(),
    sede: normalizzaSedeDisplay(i.sede || i.Sede || i.SEDE || ""),
    sede_originale: i.sede || i.Sede || i.SEDE || "",
    tipologia: i.tipologia || i.Tipologia || i.TIPOLOGIA || "",
    attivita: i.attivita || i.Attivita || i["Attività"] || i.ATTIVITA || "",
    costruttore: i.costruttore || i.Costruttore || i.COSTRUTTORE || "",
    modello: i.modello || i.Modello || i.MODELLO || "",
    reparto: i.reparto || i.Reparto || i.REPARTO || "",
    branca_medica: i.branca_medica || i.branca || i.Branca || i["Branca medica"] || i.BRANCA_MEDICA || "",
    locazione: getLocazioneFmed(i),
    matricola: i.matricola || i.Matricola || i.MATRICOLA || "",
    // Società/committente e ditta esecutrice sono campi distinti.
    societa: i.societa || i.Societa || i["Società"] || i.SOCIETA || "",
    ditta_esecutrice: i.ditta_esecutrice || i.ditta || i.Ditta || i["Ditta esecutrice"] || i["DITTA ESECUTRICE"] || "",
    ditta: i.ditta_esecutrice || i.ditta || i.Ditta || i["Ditta esecutrice"] || i["DITTA ESECUTRICE"] || ""
  };
}
const REPARTI_STANDARD = ["POLISPECIALISTICA", "PMA", "ODONTOIATRIA", "LABORATORIO", "FISIOTERAPIA", "DIAGNOSTICA PER IMMAGINI", "DIAGNOSTICA", "CHIRURGIA AMBULATORIALE", "AMMINISTRAZIONE"];
const BRANCHE_MEDICHE_STANDARD = ["DIAGNOSTICA PER IMMAGINI", "RADIOLOGIA TRADIZIONALE", "RISONANZA MAGNETICA", "TAC", "ECOGRAFIA", "MAMMOGRAFIA", "MOC", "CONE BEAM", "ORTOPANTOMOGRAFIA", "RADIOLOGIA INTERVENTISTICA", "CARDIOLOGIA", "NEUROLOGIA", "PNEUMOLOGIA", "GASTROENTEROLOGIA", "ENDOSCOPIA", "ORTOPEDIA", "FISIATRIA", "FISIOTERAPIA", "DERMATOLOGIA", "OCULISTICA", "OTORINOLARINGOIATRIA", "GINECOLOGIA", "OSTETRICIA", "UROLOGIA", "ANDROLOGIA", "ENDOCRINOLOGIA", "DIABETOLOGIA", "MEDICINA INTERNA", "MEDICINA DEL LAVORO", "MEDICINA DELLO SPORT", "CHIRURGIA AMBULATORIALE", "ANESTESIA", "ODONTOIATRIA", "PMA", "LABORATORIO ANALISI", "CHIMICA CLINICA", "EMATOLOGIA", "MICROBIOLOGIA", "BIOLOGIA MOLECOLARE", "IMMUNOLOGIA", "ANATOMIA PATOLOGICA", "POLISPECIALISTICA", "PUNTO PRELIEVI", "VACCINAZIONI", "STERILIZZAZIONE", "EMERGENZA E PRIMO SOCCORSO", "DISPOSITIVI E LINEE DI EMERGENZA", "ALTRO"];
const CATEGORIE_FOTO_CESPITE = [{
  campo: "foto_principale",
  label: "Foto principale"
}, {
  campo: "foto_targhetta",
  label: "Foto targhetta"
}, {
  campo: "foto_accessori",
  label: "Foto accessori"
}, {
  campo: "foto_installazione",
  label: "Foto installazione"
}, {
  campo: "foto_manutenzione",
  label: "Foto manutenzione"
}, {
  campo: "foto_guasto",
  label: "Foto guasto"
}, {
  campo: "foto_dopo_intervento",
  label: "Foto dopo intervento"
}, {
  campo: "foto_documentazione",
  label: "Foto documentazione"
}];
function fmedGuessBrancaMedica(testo) {
  const t = String(testo || "").toUpperCase();
  const regole = [["RISONANZA MAGNETICA", ["RISONANZA", "MAGNETIC RESONANCE", "MRI", "RMN", "INGENIA", "ACHIEVA", "MAGNETOM"]], ["TAC", ["TAC", "TC ", " CT ", "COMPUTED TOMOGRAPHY", "TOMOGRAFIA COMPUTERIZZATA", "OPTIMA CT", "SOMATOM"]], ["ECOGRAFIA", ["ECOGRAF", "ULTRASOUND", "ECHOGRAPH", "SONDA", "TRANSDUCER", "MYLAB", "ARIETTA", "ACUSON"]], ["MAMMOGRAFIA", ["MAMMOGRAPH", "MAMMOGRAF", "SELENIA", "HOLOGIC", "SENOGRAPHE"]], ["MOC", ["MOC", "DEXA", "BONE DENSIT", "DENSITOMETR"]], ["CONE BEAM", ["CONE BEAM", "CBCT"]], ["ORTOPANTOMOGRAFIA", ["ORTOPANTOMOGRAF", "OPG", "PANORAMIC", "KAVO"]], ["CARDIOLOGIA", ["ECG", "ELETTROCARDIO", "HOLTER", "CARDIO", "DEFIBRILL", "ECOCARDIO"]], ["PNEUMOLOGIA", ["SPIROMET", "PNEUMO", "VENTILATOR", "VENTILATORE"]], ["ENDOSCOPIA", ["ENDOSCOP", "COLONOSCOP", "GASTROSCOP", "OLYMPUS"]], ["LABORATORIO ANALISI", ["ANALYZER", "ANALYSER", "LABORATORY", "CENTRIFUG", "EMATOLOG", "CHIMICA CLINICA", "MICROBIOLOG"]], ["STERILIZZAZIONE", ["AUTOCLAVE", "STERILIZER", "STERILIZZ", "GETINGE", "STERIS"]], ["ODONTOIATRIA", ["DENTAL", "ODONTO", "RIUNITO", "MICROMOTORE", "TURBINA"]], ["FISIOTERAPIA", ["LASERTERAPIA", "MAGNETOTERAPIA", "TECARTERAPIA", "ELETTROTERAPIA", "FISIOTERAPIA"]], ["GINECOLOGIA", ["COLPOSCOP", "ISTEROSCOP", "GINECO"]], ["OCULISTICA", ["OCT", "TONOMET", "AUTOREF", "LAMPADA A FESSURA", "OFTALM"]]];
  for (const [branca, keywords] of regole) {
    if (keywords.some(k => t.includes(k))) return branca;
  }
  return "";
}
function fmedSuggerisciTipologiaDaBranca(branca = "") {
  const t = normalizzaTestoCodice(branca);
  const regole = [["ECOGRAFIA", "ECOGRAFO"], ["RISONANZA MAGNETICA", "RISONANZA MAGNETICA"], ["TAC", "TAC"], ["MAMMOGRAFIA", "MAMMOGRAFO"], ["MOC", "DENSITOMETRO OSSEO"], ["CONE BEAM", "CONE BEAM"], ["ORTOPANTOMOGRAFIA", "ORTOPANTOMOGRAFO"], ["CARDIOLOGIA", "ELETTROCARDIOGRAFO"], ["PNEUMOLOGIA", "SPIROMETRO"], ["ENDOSCOPIA", "ENDOSCOPIO"], ["LABORATORIO ANALISI", "ANALIZZATORE"], ["STERILIZZAZIONE", "AUTOCLAVE"], ["ODONTOIATRIA", "RIUNITO ODONTOIATRICO"], ["FISIOTERAPIA", "APPARECCHIATURA FISIOTERAPICA"], ["GINECOLOGIA", "COLPOSCOPIO"], ["OCULISTICA", "APPARECCHIATURA OCULISTICA"], ["EMERGENZA E PRIMO SOCCORSO", "DISPOSITIVO DI EMERGENZA"], ["DISPOSITIVI E LINEE DI EMERGENZA", "DISPOSITIVO DI EMERGENZA"]];
  const match = regole.find(([chiave]) => t.includes(chiave));
  return match ? match[1] : "";
}
const ATTIVITA_STANDARD = ["CONTROLLO QUALITÀ", "MANUTENZIONE ORDINARIA", "MANUTENZIONE PREVENTIVA", "MANUTENZIONE PREVENTIVA / VERIFICA DI SICUREZZA ELETTRICA", "MANUTENZIONE PREVENTIVA / VERIFICA PARTICOLARE", "MANUTENZIONE PREVENTIVA / VERIFICA DI SICUREZZA ELETTRICA / VERIFICA PARTICOLARE", "TARATURA", "VERIFICA DI SICUREZZA ELETTRICA", "VERIFICA PARTICOLARE", "VERIFICA FUNZIONALE"];
const ESITI_STANDARD = ["POSITIVO", "FOLLOW-UP", "NEGATIVO", "CON RISERVA", "DA VERIFICARE", "NON APPLICABILE"];
const PRIORITA_STANDARD = ["BASSA", "MEDIA", "ALTA", "URGENTE"];
const POSSESSO_STANDARD = ["Proprietà", "Noleggio", "Leasing", "Comodato d'uso"];
const STATI_ASSET_STANDARD = ["Attivo", "Dismesso", "Non in uso"];
function normalizzaAttivitaIntervento(valore) {
  let t = pulisciValoreDizionario(valore).replace(/\s*\/\s*/g, " / ").replace(/\s+/g, " ").trim();
  if (!t) return "";
  t = t.replace(/QUALITA'/g, "QUALITÀ").replace(/VERIFCA/g, "VERIFICA").replace(/PAARTICOLARE/g, "PARTICOLARE").replace(/VERIFICA ELETTRICA/g, "VERIFICA DI SICUREZZA ELETTRICA").replace(/VERIFICA DI SICUREZZA$/g, "VERIFICA DI SICUREZZA ELETTRICA");
  if (t.startsWith("TARATURA")) return "TARATURA";
  if (t.startsWith("VERIFICA FUNZIONALE")) return "VERIFICA FUNZIONALE";
  if (t.includes("MANUTENZIONE ORDINARIA")) return "MANUTENZIONE ORDINARIA";
  if (t.includes("CONTROLLO QUALIT")) return "CONTROLLO QUALITÀ";
  const haMP = t.includes("MANUTENZIONE PREVENTIVA");
  const haVSE = t.includes("VERIFICA DI SICUREZZA ELETTRICA");
  const haVP = t.includes("VERIFICA PARTICOLARE");
  if (haMP && haVSE && haVP) {
    return "MANUTENZIONE PREVENTIVA / VERIFICA DI SICUREZZA ELETTRICA / VERIFICA PARTICOLARE";
  }
  if (haMP && haVSE) {
    return "MANUTENZIONE PREVENTIVA / VERIFICA DI SICUREZZA ELETTRICA";
  }
  if (haMP && haVP) {
    return "MANUTENZIONE PREVENTIVA / VERIFICA PARTICOLARE";
  }
  if (haMP) return "MANUTENZIONE PREVENTIVA";
  if (haVSE && haVP) return "MANUTENZIONE PREVENTIVA / VERIFICA DI SICUREZZA ELETTRICA / VERIFICA PARTICOLARE";
  if (haVSE) return "VERIFICA DI SICUREZZA ELETTRICA";
  if (haVP) return "VERIFICA PARTICOLARE";
  return t;
}
function listaPulitaAttivita(valori = [], extra = []) {
  return [...new Set([...ATTIVITA_STANDARD, ...valori, ...extra].map(v => normalizzaAttivitaIntervento(v)).filter(Boolean).filter(v => !v.includes("€")).filter(v => v.length <= 90))].sort((a, b) => a.localeCompare(b, "it", {
    numeric: true,
    sensitivity: "base"
  }));
}
const pulisciValoreDizionario = valore => String(valore || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toUpperCase();
function listaPulitaDizionario(valori = [], extra = []) {
  return [...new Set([...valori, ...extra].map(v => pulisciValoreDizionario(v)).filter(Boolean).filter(v => !v.includes("HTTP://") && !v.includes("HTTPS://") && !v.includes("SHAREPOINT")).filter(v => v.length <= 60))].sort((a, b) => a.localeCompare(b, "it", {
    numeric: true,
    sensitivity: "base"
  }));
}
function normalizzaSocietaDitta(valore) {
  const t = pulisciValoreDizionario(valore).replace(/[’']/g, " ").replace(/\./g, "").replace(/,/g, " ").replace(/-/g, " ").replace(/\bS\s*R\s*L\b/g, "SRL").replace(/\bS\s*P\s*A\b/g, "SPA").replace(/\s+/g, " ").trim();
  if (!t) return "NON SPECIFICATA";

  // Valori generici o interni: non devono sporcare il filtro Ditte/Fornitori.
  if (["FORNITORE", "DITTA", "MEDICAL", "INTERNA", "INTERNO", "INFRASTRUTTURE", "FABIO CARRATU", "FABIO CARRATÙ", "FAMED", "FMED"].includes(t)) {
    return "INTERNA / NON SPECIFICATA";
  }

  // SINCRONIS - nome standard richiesto
  if (t.includes("SINCRONIS") || t.includes("SINCRONYS") || t.includes("SINCRONIX") || t.includes("SINCHRONIS") || t.includes("SYNCHRONIS") || t.includes("SYNCRONIS") || t.includes("SYNCROMED")) {
    return "SINCRONIS MEDICAL";
  }

  // Accorpamenti fornitori principali.
  if (t.includes("MDA") || t.includes("M D A")) return "MDA TECH";
  if (t.includes("MDI TECH") || t.includes("M D I")) return "MDI TECH";
  if (t.includes("PHILIPS")) return "PHILIPS";
  if (t.includes("ESAOTE")) return "ESAOTE";
  if (t.includes("TRADE") && t.includes("ART")) return "TRADE ART";
  if (t.includes("STERIS")) return "STERIS";
  if (t.includes("ESSENCI") || t.includes("ESSECI") || t.includes("SC IMPIANTI") || t.includes("S C IMPIANTI")) return "SC IMPIANTI";
  if (t.includes("OPTOMEDICA") || t.includes("OPTO MEDICA")) return "OPTOMEDICA";
  if (t.includes("PERUCCA")) return "PERUCCA";
  if (t.includes("ROMANA IMPIANTI") || t.includes("ROMANA")) return "ROMANA IMPIANTI";
  if (t.includes("KAVO")) return "KAVO";
  if (t.includes("FISMECO")) return "FISMECO";
  if (t.includes("HS MANAGEMENT") || t.includes("HSE MANAGEMENT")) return "HS MANAGEMENT";
  if (t.includes("HTS MEDICAL") || t === "HTS MED" || t.includes("HTS MED")) return "HTS MEDICAL";
  if (t.includes("ECOSAFY")) return "ECOSAFY";
  if (t.includes("MORBIDUCCI")) return "MORBIDUCCI";
  if (t.includes("RENDESI")) return "RENDESI";
  if (t.includes("ALFA DIGIT") || t.includes("ALFADIGIT")) return "ALFA DIGIT";
  if (t.includes("INVENTIS")) return "INVENTIS";
  if (t.includes("MINDRAY")) return "MINDRAY";
  if (t.includes("SIEMENS")) return "SIEMENS";
  if (t.includes("GE HEALTHCARE") || t.includes("GE MEDICAL SYSTEM") || t.includes("GE MEDICAL SISTEM") || t.includes("GE MEDICAL") || t === "GE") return "GE HEALTHCARE";
  if (t.includes("CARESTREAM")) return "CARESTREAM";
  if (t.includes("FUJIFILM") || t.includes("FUJI")) return "FUJIFILM";
  if (t.includes("HOLOGIC")) return "HOLOGIC";
  if (t.includes("GETINGE")) return "GETINGE";
  if (t.includes("OLYMPUS")) return "OLYMPUS";
  if (t.includes("ELMI")) return "ELMI";
  if (t.includes("GIMA")) return "GIMA";
  if (t.includes("HALGA")) return "HALGA";
  if (t.includes("HOSPITAL STAFF")) return "HOSPITAL STAFF";
  if (t.includes("ERRE X") || t.includes("ERREX") || t.includes("RX MEDICAL")) return "RX MEDICAL";
  if (t.includes("IM MEDICAL")) return "IM MEDICAL";
  return t.replace(/\bSRL\b/g, "").replace(/\bSPA\b/g, "").replace(/\bSNC\b/g, "").replace(/\bSAS\b/g, "").replace(/\bITALIA\b/g, "").replace(/\s+/g, " ").trim() || "INTERNA / NON SPECIFICATA";
}
function raggruppaCostiInterventi(interventi = [], keyFn) {
  const mappa = {};
  (Array.isArray(interventi) ? interventi : []).forEach(intervento => {
    const chiave = keyFn(intervento) || "NON SPECIFICATO";
    if (!mappa[chiave]) {
      mappa[chiave] = {
        nome: chiave,
        interventi: 0,
        totale: 0,
        cespiti: new Set()
      };
    }
    mappa[chiave].interventi += 1;
    mappa[chiave].totale += normalizzaNumeroCostoGlobale(intervento?.costo || intervento?.importo_extra || 0);
    const codice = intervento?.codice_strumento || intervento?.codicestrumento;
    if (codice) mappa[chiave].cespiti.add(codice);
  });
  return Object.values(mappa).map(r => ({
    ...r,
    cespiti: r.cespiti.size
  })).sort((a, b) => b.totale - a.totale || b.interventi - a.interventi || a.nome.localeCompare(b.nome));
}
function normalizzaNumeroCostoGlobale(valore) {
  if (valore === null || valore === undefined || valore === "") return 0;
  if (typeof valore === "number") return Number.isFinite(valore) ? valore : 0;
  let testo = String(valore).trim().replace(/€/g, "").replace(/\s/g, "");
  if (!testo) return 0;
  if (testo.includes(",") && testo.includes(".")) {
    testo = testo.replace(/\./g, "").replace(",", ".");
  } else if (testo.includes(",")) {
    testo = testo.replace(",", ".");
  }
  const numero = Number(testo);
  return Number.isFinite(numero) ? numero : 0;
}
function chiaveCodiceCespite(codice) {
  return String(codice || "").trim().toUpperCase().replace(/\//g, "_");
}
function formatCategoria(categoria) {
  const codice = normalizeCategoria(categoria);
  return nomiCategorie[codice] ? `${codice} - ${nomiCategorie[codice]}` : codice;
}
function normalizeCategoria(categoria) {
  const valore = String(categoria ?? "").trim();
  return valore ? valore : "NON SPECIFICATA";
}
function statoCespite(c) {
  const dismesso = String(c?.dismesso ?? c?.Dismesso ?? "0").trim().toUpperCase();
  const nonInUso = String(c?.strumento_non_in_uso ?? c?.non_in_uso ?? c?.NonInUso ?? "0").trim().toUpperCase();
  const statoManuale = String(c?.stato_asset || c?.stato || c?.Stato || c?.STATO || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toUpperCase();
  const flagVero = v => ["1", "TRUE", "SI", "SÌ", "YES", "Y"].includes(String(v || "").trim().toUpperCase());
  if (flagVero(dismesso) || statoManuale.includes("DISMESS") || statoManuale.includes("DIMESS") || statoManuale.includes("CESSAT") || statoManuale.includes("ROTTAM") || statoManuale.includes("ARCHIV")) {
    return "Dismesso";
  }
  if (flagVero(nonInUso) || statoManuale.includes("NON IN USO") || statoManuale.includes("FUORI USO") || statoManuale.includes("FUORI SERVIZIO") || statoManuale.includes("INATTIV")) {
    return "Non in uso";
  }
  return "Attivo";
}
function datiStatoPerSalvataggio(stato) {
  const valore = String(stato || "Attivo");
  if (valore === "Dismesso") {
    return {
      dismesso: "1",
      strumento_non_in_uso: "0"
    };
  }
  if (valore === "Non in uso") {
    return {
      dismesso: "0",
      strumento_non_in_uso: "1"
    };
  }
  return {
    dismesso: "0",
    strumento_non_in_uso: "0"
  };
}
function coloreStatoAsset(stato) {
  const valore = String(stato || "Attivo");
  if (valore === "Dismesso") return "#FF4D5E";
  if (valore === "Non in uso") return "#FFD166";
  return "#2FD37D";
}
function normalizzaTestoCodice(testo) {
  return String(testo || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim();
}
function soloCifreDaCodice(codice) {
  const numeri = String(codice || "").match(/\d+/g);
  if (!numeri || numeri.length === 0) return null;
  const progressivi = numeri.map(n => Number(n)).filter(n => Number.isFinite(n));
  return progressivi.length ? Math.max(...progressivi) : null;
}
function regolaInventarioStoricaDaSede(sede) {
  const sedeNorm = normalizzaTestoCodice(sede);
  if (sedeNorm.includes("POMEZIA") || sedeNorm.includes("PHOENIX")) {
    return {
      nome: "Pomezia",
      descrizione: "progressivo numerico + P",
      pad: 5,
      matcher: codice => {
        const match = normalizzaTestoCodice(codice).match(/^(\d+)P$/);
        return match ? Number(match[1]) : null;
      },
      formatter: numero => `${String(numero).padStart(5, "0")}P`
    };
  }
  if (sedeNorm.includes("FIUMICINO")) {
    return {
      nome: "Fiumicino",
      descrizione: "progressivo numerico + F",
      pad: 5,
      matcher: codice => {
        const match = normalizzaTestoCodice(codice).match(/^(\d+)F$/);
        return match ? Number(match[1]) : null;
      },
      formatter: numero => `${String(numero).padStart(5, "0")}F`
    };
  }
  if (sedeNorm.includes("PINDARO") || sedeNorm.includes("AXA")) {
    return {
      nome: "Pindaro / AXA",
      descrizione: "progressivo numerico + AXA",
      pad: 5,
      matcher: codice => {
        const match = normalizzaTestoCodice(codice).match(/^(\d+)AXA$/);
        return match ? Number(match[1]) : null;
      },
      formatter: numero => `${String(numero).padStart(5, "0")}AXA`
    };
  }
  if (sedeNorm.includes("SURGERY") || sedeNorm.includes("SURGERI")) {
    return {
      nome: "Surgery",
      descrizione: "formato storico A/000000M",
      pad: 6,
      matcher: codice => {
        const testo = normalizzaTestoCodice(codice).replace(/_/g, "/");
        const matchA = testo.match(/^A\/(\d+)M$/);
        if (matchA) return Number(matchA[1]);
        const matchM = testo.match(/^(\d+)M$/);
        return matchM ? Number(matchM[1]) : null;
      },
      formatter: numero => `A/${String(numero).padStart(6, "0")}M`
    };
  }
  if (sedeNorm.includes("ZAMBRINI")) {
    return {
      nome: "Zambrini",
      descrizione: "formato storico A_000000",
      pad: 6,
      matcher: codice => {
        const testo = normalizzaTestoCodice(codice).replace(/\//g, "_");
        const matchA = testo.match(/^A_(\d+)/);
        if (matchA) return Number(matchA[1]);
        return null;
      },
      formatter: numero => `A_${String(numero).padStart(6, "0")}`
    };
  }
  if (sedeNorm.includes("CAFFARO")) {
    return {
      nome: "Caffaro",
      descrizione: "formato storico A_000000",
      pad: 6,
      matcher: codice => {
        const testo = normalizzaTestoCodice(codice).replace(/\//g, "_");
        const matchA = testo.match(/^A_(\d+)/);
        if (matchA) return Number(matchA[1]);
        return null;
      },
      formatter: numero => `A_${String(numero).padStart(6, "0")}`
    };
  }
  if (sedeNorm.includes("CARABELLI")) {
    return {
      nome: "Carabelli",
      descrizione: "formato storico A_000000",
      pad: 6,
      matcher: codice => {
        const testo = normalizzaTestoCodice(codice).replace(/\//g, "_");
        const matchA = testo.match(/^A_(\d+)/);
        if (matchA) return Number(matchA[1]);
        return null;
      },
      formatter: numero => `A_${String(numero).padStart(6, "0")}`
    };
  }
  return {
    nome: sedeNorm || "Sede non specificata",
    descrizione: "progressivo numerico storico",
    pad: 6,
    matcher: codice => {
      const testo = normalizzaTestoCodice(codice);
      const matchSoloNumero = testo.match(/^(\d+)$/);
      if (matchSoloNumero) return Number(matchSoloNumero[1]);
      return null;
    },
    formatter: numero => String(numero).padStart(6, "0")
  };
}
function generaCodiceInventarioAutomatico(sede, cespiti = []) {
  const sedeNorm = normalizzaTestoCodice(sede);
  const regola = regolaInventarioStoricaDaSede(sede);
  const cespitiSede = (Array.isArray(cespiti) ? cespiti : []).filter(c => normalizzaSedePerConfronto(c?.sede) === normalizzaSedePerConfronto(sedeNorm));
  const progressiviRegola = cespitiSede.map(c => regola.matcher(c?.codicestrumento)).filter(n => Number.isFinite(n) && n > 0);

  // Prima scelta: usa solo i codici che rispettano la convenzione storica della sede.
  if (progressiviRegola.length > 0) {
    return regola.formatter(Math.max(...progressiviRegola) + 1);
  }

  // Fallback: se la sede non ha ancora codici coerenti, usa il numero più alto trovato nella sede.
  const progressiviGenerici = cespitiSede.map(c => soloCifreDaCodice(c?.codicestrumento)).filter(n => Number.isFinite(n) && n >= 0);
  const prossimo = progressiviGenerici.length ? Math.max(...progressiviGenerici) + 1 : 1;
  return regola.formatter(prossimo);
}
function urlSchedaCespiteFrontend(codice) {
  const codicePulito = String(codice || "").trim();

  // QR ETICHETTA ZEBRA:
  // deve essere sempre corto, altrimenti con SharePoint diventa enorme e si taglia.
  return `${API_BASE_URL}/apri-documento/${encodeURIComponent(codicePulito)}`;
}
function parseDataFMED(data) {
  if (!data) return null;
  const testo = String(data).trim();

  // Formati tipo 8/9/2023 00:00:00 oppure 08/09/2023
  const matchSlash = testo.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (matchSlash) {
    const giorno = Number(matchSlash[1]);
    const mese = Number(matchSlash[2]) - 1;
    const anno = Number(matchSlash[3]);
    return new Date(anno, mese, giorno);
  }

  // Formati ISO tipo 2026-06-03T00:00:00+00:00
  const matchIso = testo.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (matchIso) {
    const anno = Number(matchIso[1]);
    const mese = Number(matchIso[2]) - 1;
    const giorno = Number(matchIso[3]);
    return new Date(anno, mese, giorno);
  }
  const dataParsed = new Date(testo);
  return Number.isNaN(dataParsed.getTime()) ? null : dataParsed;
}
function formattaData(data) {
  const dataParsed = parseDataFMED(data);
  if (!dataParsed) return data ? String(data).split(' ')[0] : '-';
  const giorno = String(dataParsed.getDate()).padStart(2, '0');
  const mese = String(dataParsed.getMonth() + 1).padStart(2, '0');
  const anno = dataParsed.getFullYear();
  return `${giorno}/${mese}/${anno}`;
}
function formattaDataInput(data) {
  if (!data) return '';
  return formattaData(data);
}
function formattaDataPerInputDate(data) {
  const dataParsed = parseDataFMED(data);
  if (!dataParsed) return "";
  const anno = dataParsed.getFullYear();
  const mese = String(dataParsed.getMonth() + 1).padStart(2, "0");
  const giorno = String(dataParsed.getDate()).padStart(2, "0");
  return `${anno}-${mese}-${giorno}`;
}
function giorniAllaScadenza(data) {
  const dataParsed = parseDataFMED(data);
  if (!dataParsed) return null;
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);
  dataParsed.setHours(0, 0, 0, 0);
  return Math.ceil((dataParsed - oggi) / (1000 * 60 * 60 * 24));
}
function statoScadenza(data) {
  const giorni = giorniAllaScadenza(data);
  if (giorni === null) {
    return {
      codice: "NON_DISPONIBILE",
      testo: "Data non disponibile",
      colore: "#9AA6B2",
      giorni: null
    };
  }
  if (giorni < 0) {
    return {
      codice: "SCADUTA",
      testo: "Scaduta",
      colore: "#FF4D5E",
      giorni
    };
  }
  if (giorni <= 30) {
    return {
      codice: "30_GIORNI",
      testo: "Entro 30 giorni",
      colore: "#FF9F1C",
      giorni
    };
  }
  if (giorni <= 60) {
    return {
      codice: "60_GIORNI",
      testo: "Entro 60 giorni",
      colore: "#FFD166",
      giorni
    };
  }
  return {
    codice: "REGOLARE",
    testo: "Regolare",
    colore: "#2FD37D",
    giorni
  };
}

function getProssimoInterventoValido(interventi = []) {
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);
  return (Array.isArray(interventi) ? interventi : []).map(i => ({
    ...i,
    _prossimaDataParsed: parseDataFMED(i?.data_prossimo_intervento)
  })).filter(i => {
    if (!i._prossimaDataParsed) return false;
    i._prossimaDataParsed.setHours(0, 0, 0, 0);
    return i._prossimaDataParsed >= oggi;
  }).sort((a, b) => a._prossimaDataParsed - b._prossimaDataParsed)[0] || null;
}
function getJobReportRaw(intervento) {
  if (!intervento || typeof intervento !== "object") return "";

  // 1) Nomi campo più probabili, inclusi quelli importati da Access/Supabase
  const campiDiretti = ["Job report", "job report", "JOB REPORT", "Job Report", "job_report", "Job_report", "jobReport", "JobReport", "jobreport", "job_report_", "INFO", "Info", "info"];
  for (const campo of campiDiretti) {
    const valore = intervento[campo];
    if (valore !== undefined && valore !== null && String(valore).trim()) {
      return String(valore).trim();
    }
  }

  // 2) Ricerca robusta sui nomi colonna: elimina spazi, underscore e simboli
  //    Così intercetta: "Job report", "job_report", "Job-Report", "jobreport" ecc.
  for (const [chiave, valore] of Object.entries(intervento)) {
    if (valore === undefined || valore === null || !String(valore).trim()) continue;
    const keyNorm = String(chiave).toLowerCase().replace(/[^a-z0-9]/g, "");
    if (keyNorm === "jobreport" || keyNorm.includes("jobreport") || keyNorm === "info" || keyNorm.includes("info")) {
      return String(valore).trim();
    }
  }

  // 3) Ultima rete di sicurezza: se qualunque valore contiene un link/percorso documentale
  for (const valore of Object.values(intervento)) {
    const testo = String(valore || "").trim();
    if (!testo) continue;
    if (testo.includes("sharepoint.com") || testo.includes("file:///") || /^[A-Za-z]:\\/.test(testo) || testo.includes("..\\")) {
      return testo;
    }
  }
  return "";
}
function estraiLinkJobReport(intervento) {
  const raw = String(getJobReportRaw(intervento) || "").trim();
  if (!raw) return {
    raw: "",
    url: "",
    apribile: false,
    tipo: "vuoto"
  };
  const parti = raw.split("#").map(p => p.trim()).filter(Boolean);
  const candidato = parti.find(p => /^https?:\/\//i.test(p)) || parti.find(p => /^file:\/\//i.test(p)) || parti.find(p => /^[A-Za-z]:\\/.test(p)) || parti.find(p => /^\.\./.test(p)) || raw.match(/https?:\/\/[^#\s]+/i)?.[0] || raw.match(/file:\/\/[^#\s]+/i)?.[0] || "";
  if (!candidato) return {
    raw,
    url: "",
    apribile: false,
    tipo: "testo"
  };
  if (/^https?:\/\//i.test(candidato)) {
    return {
      raw,
      url: candidato,
      apribile: true,
      tipo: "web"
    };
  }
  if (/^file:\/\//i.test(candidato)) {
    return {
      raw,
      url: candidato,
      apribile: true,
      tipo: "file"
    };
  }
  if (/^[A-Za-z]:\\/.test(candidato)) {
    const fileUrl = `file:///${candidato.replace(/\\/g, "/").replace(/ /g, "%20")}`;
    return {
      raw,
      url: fileUrl,
      apribile: true,
      tipo: "file_locale"
    };
  }
  return {
    raw,
    url: candidato,
    apribile: false,
    tipo: "percorso_relativo"
  };
}
function getLinkDocumentazioneCespite(cespite, interventiCespite = [], linkManuali = {}) {
  const codice = String(cespite?.codicestrumento || "").trim();
  const chiave = chiaveCodiceCespite(codice);

  // PRIORITÀ 1 - Link ufficiale salvato in Supabase sulla tabella Censimento.
  // Questo evita che FMED apra vecchi PDF presi dai Job Report/interventi.
  const linkDaDatabase = String(cespite?.link_documento || "").trim();
  if (linkDaDatabase && /^https?:\/\//i.test(linkDaDatabase)) {
    return {
      url: linkDaDatabase,
      tipo: "database",
      label: "📂 Apri cartella cespite",
      title: `Cartella SharePoint collegata al cespite ${codice}`
    };
  }

  // PRIORITÀ 2 - Link manuali/localStorage o vecchi campi compatibili.
  const linkManuale = linkManuali?.[chiave] || DOCUMENTAZIONE_CESPITI_PREDEFINITA[chiave] || cespite?.link_documentazione || cespite?.link_sharepoint || "";
  if (linkManuale && /^https?:\/\//i.test(String(linkManuale).trim())) {
    return {
      url: String(linkManuale).trim(),
      tipo: "manuale",
      label: "📂 Apri cartella cespite",
      title: `Link documentazione manuale associato al cespite ${codice}`
    };
  }

  // PRIORITÀ 3 - Fallback vecchio: eventuali link nei campi/Job Report del cespite.
  const linkDaCespite = estraiLinkJobReport(cespite);
  if (linkDaCespite.apribile && /^https?:\/\//i.test(linkDaCespite.url)) {
    return {
      url: linkDaCespite.url,
      tipo: "specifico",
      label: "📂 Apri cartella cespite",
      title: "Documentazione specifica collegata al cespite"
    };
  }

  // PRIORITÀ 4 - Cerchiamo tra gli interventi del cespite: priorità ai link SharePoint.
  const interventiValidi = Array.isArray(interventiCespite) ? interventiCespite : [];
  const candidati = interventiValidi.map(intervento => ({
    intervento,
    link: estraiLinkJobReport(intervento)
  })).filter(({
    link
  }) => link?.apribile && /^https?:\/\//i.test(link.url));
  const preferitoSharePoint = candidati.find(({
    link
  }) => String(link.url || "").toLowerCase().includes("sharepoint.com"));
  const preferito = preferitoSharePoint || candidati[0];
  if (preferito) {
    return {
      url: preferito.link.url,
      tipo: "specifico",
      label: "📂 Apri cartella cespite",
      title: codice ? `Documentazione trovata dagli interventi collegati al cespite ${codice}` : "Documentazione trovata dagli interventi collegati"
    };
  }

  // Se non esiste un link specifico, non apriamo più link generici: messaggio chiaro.
  return {
    url: "",
    tipo: "mancante",
    label: "Documentazione non disponibile",
    title: `Nessun link_documento SharePoint disponibile per il cespite ${codice}`
  };
}
function BottoneJobReport({
  intervento
}) {
  const link = estraiLinkJobReport(intervento);
  if (!link.raw) {
    return <span style={styles.mutedSmall}>-</span>;
  }
  if (!link.apribile) {
    return <button type="button" style={styles.docBtnDisabled} title={link.raw} onClick={e => {
      e.stopPropagation();
      alert(`Percorso non apribile direttamente dal browser:\n\n${link.raw}`);
    }}>
        📄 Rif.
      </button>;
  }
  return <button type="button" style={styles.docBtn} title={link.url} onClick={e => {
    e.stopPropagation();
    window.open(link.url, "_blank");
  }}>
      📂 Apri
    </button>;
}
function analisiNonDisponibile(codice) {
  return {
    codice,
    criticita: "VERDE",
    rischio: "BASSO",
    interventi: 0,
    preventive: 0,
    straordinarie: 0,
    fermi_macchina: 0,
    punteggio: 0,
    affidabilita: 100,
    classe_affidabilita: "BUONA",
    scala: "0-39 VERDE | 40-69 GIALLO | 70-100 ROSSO",
    criterio_analisi: "Analisi non disponibile oppure storico manutentivo assente per questo cespite.",
    motivazione: "Non risultano dati sufficienti per calcolare una criticità diversa da verde.",
    dettaglio_calcolo: "Nessuno storico manutentivo disponibile.",
    raccomandazione: "Il cespite non presenta criticità rilevabili dai dati disponibili."
  };
}

// FMED CLEAN: rimosso blocco CSS globale non utilizzato FmedFixRicercaPulsantiStyle.
// Lo stile attivo resta l'override finale dentro AppNuovoCore + oggetto styles.

// ========================================================
// FMED STEP INFRASTRUTTURE - dati pilota da CSV AXA MEDICA
// Modulo isolato: non modifica Asset, Interventi, Scadenze o Export esistenti.
// Quando il backend /infrastrutture sarà attivo, questi dati restano solo fallback di test.
// ========================================================
const SCADENZIARIO_INFRASTRUTTURE_AXA = [{
  "id": 1,
  "sede": "AXA Medica - Via Pindaro 28, 00125 Roma",
  "categoria": "ELETTRICO",
  "descrizione": "MANUTENZIONE IMP. ELETTRICI",
  "ditta": "ESSECI IMPIANTI",
  "periodicita": "ANNUALE",
  "ultimo_intervento": "2026-05-01",
  "prossimo_intervento": "2027-05-01",
  "stato": "OK",
  "giorni_mancanti": 237,
  "note": "",
  "fonte": "CSV AXA MEDICA"
}, {
  "id": 2,
  "sede": "AXA Medica - Via Pindaro 28, 00125 Roma",
  "categoria": "HVAC",
  "descrizione": "IMP. TERMICI E CONDIZIONAMENTO",
  "ditta": "ESSECI IMPIANTI",
  "periodicita": "TRIMESTRALE",
  "ultimo_intervento": "2026-05-01",
  "prossimo_intervento": "2026-08-01",
  "stato": "OK",
  "giorni_mancanti": 42,
  "note": "",
  "fonte": "CSV AXA MEDICA"
}, {
  "id": 3,
  "sede": "AXA Medica - Via Pindaro 28, 00125 Roma",
  "categoria": "RADIOLOGIA",
  "descrizione": "APPARECCHIATURE DI RADIOLOGIA",
  "ditta": "MDA TECH",
  "periodicita": "SEMESTRALE",
  "ultimo_intervento": "2026-02-01",
  "prossimo_intervento": "2026-08-01",
  "stato": "OK",
  "giorni_mancanti": 34,
  "note": "",
  "fonte": "CSV AXA MEDICA"
}, {
  "id": 4,
  "sede": "AXA Medica - Via Pindaro 28, 00125 Roma",
  "categoria": "RM",
  "descrizione": "MANUTENZIONE RISONANZA MAGNETICA",
  "ditta": "HTS",
  "periodicita": "SEMESTRALE",
  "ultimo_intervento": "2026-05-01",
  "prossimo_intervento": "2026-11-01",
  "stato": "OK",
  "giorni_mancanti": 109,
  "note": "",
  "fonte": "CSV AXA MEDICA"
}, {
  "id": 5,
  "sede": "AXA Medica - Via Pindaro 28, 00125 Roma",
  "categoria": "ALTRO",
  "descrizione": "VERIFICHE DI MESSA A TERRA",
  "ditta": "3P S.A.S DI SIMONE PINOTTI",
  "periodicita": "BIENNALE",
  "ultimo_intervento": "2024-11-01",
  "prossimo_intervento": "2026-11-01",
  "stato": "OK",
  "giorni_mancanti": 114,
  "note": "",
  "fonte": "CSV AXA MEDICA"
}, {
  "id": 6,
  "sede": "AXA Medica - Via Pindaro 28, 00125 Roma",
  "categoria": "ANTINCENDIO",
  "descrizione": "ATTREZZATURE ANTINCENDIO",
  "ditta": "GALELLI SRL",
  "periodicita": "SEMESTRALE",
  "ultimo_intervento": "2026-04-01",
  "prossimo_intervento": "2026-10-01",
  "stato": "OK",
  "giorni_mancanti": 89,
  "note": "",
  "fonte": "CSV AXA MEDICA"
}, {
  "id": 7,
  "sede": "AXA Medica - Via Pindaro 28, 00125 Roma",
  "categoria": "LEGIONELLA",
  "descrizione": "CONTROLLI LEGIONELLA",
  "ditta": "GRUPPO ECOSAFETY",
  "periodicita": "ANNUALE",
  "ultimo_intervento": "2026-05-01",
  "prossimo_intervento": "2027-05-01",
  "stato": "OK",
  "giorni_mancanti": 236,
  "note": "",
  "fonte": "CSV AXA MEDICA"
}, {
  "id": 8,
  "sede": "AXA Medica - Via Pindaro 28, 00125 Roma",
  "categoria": "ELETTRICO",
  "descrizione": "VERIFICHE DI SICUREZZA APP. ELETTROMEDICALI",
  "ditta": "3P S.A.S DI SIMONE PINOTTI",
  "periodicita": "BIENNALE",
  "ultimo_intervento": "2024-11-01",
  "prossimo_intervento": "2026-11-01",
  "stato": "OK",
  "giorni_mancanti": 114,
  "note": "",
  "fonte": "CSV AXA MEDICA"
}, {
  "id": 11,
  "sede": "AXA Medica - Via Pindaro 28, 00125 Roma",
  "categoria": "ALTRO",
  "descrizione": "DISINFEZIONE IMPIANTI AERAULICI",
  "ditta": "DEP SRL",
  "periodicita": "DA DEFINIRE",
  "ultimo_intervento": "2022-09-10",
  "prossimo_intervento": "",
  "stato": "DA VERIFICARE",
  "giorni_mancanti": null,
  "note": "Prossima verifica da verificare nel CSV originale",
  "fonte": "CSV AXA MEDICA"
}];
function normalizzaInfrastrutturaDaApi(r = {}) {
  const sedeNormalizzata = normalizzaSedeDisplay(r.sede || r.Sede || "AXA Medica - Via Pindaro 28, 00125 Roma");
  return {
    ...r,
    id: r.id || r.ID || r.Id || "",
    codice: r.codice || r.Codice || r.CODICE || "",
    sede: sedeNormalizzata,
    sede_originale: r.sede_originale || r.sede || r.Sede || "",
    sede_chiave: r.sede_chiave || chiaveSedeOperativa(sedeNormalizzata),
    centro_costo: normalizzaCentroCostoFmed(r.centro_costo || r.centroCosto || r["Centro di costo"], sedeNormalizzata),
    locazione: getLocazioneFmed(r),
    categoria: r.categoria || r.Categoria || r.tipo_impianto || r.impianto || "ALTRO",
    descrizione: r.descrizione || r.Descrizione || r.tipologia || r.Tipologia || r.attivita || r.Attivita || "",
    ditta: r.ditta || r.Ditta || r.ditta_esecutrice || r["DITTA ESECUTRICE"] || "NON SPECIFICATA",
    periodicita: r.periodicita || r.Periodicita || r.cadenza || r.CADENZA || "DA DEFINIRE",
    ultimo_intervento: r.ultimo_intervento || r.data_ultima_verifica || r["DATA ULTIMA VERIFICA"] || "",
    prossimo_intervento: r.prossimo_intervento || r.data_prossima_verifica || r["DATA PROSSIMA VERIFICA"] || "",
    stato: r.stato || r.Stato || r.OK || r.PS || r.SC || "DA_VERIFICARE",
    giorni_mancanti: r.giorni_mancanti ?? r["MANCANO (Giorni Lavorativi)"] ?? null,
    numero_helpdesk: r.numero_helpdesk || r.numeroHelpdesk || "",
    link_documento: r.link_documento || r.linkDocumentazione || "",
    link_sharepoint: r.link_sharepoint || r.linkSharepoint || "",
    link_report: r.link_report || r.linkReport || r.report_url || r.reportUrl || r.report_link || r.reportLink || r.link_reportistica || r.linkReportistica || r.report || r.Report || "",
    responsabile: r.responsabile || r.Responsabile || "",
    priorita: r.priorita || r.Priorita || "MEDIA",
    societa: r.societa || r.Societa || "",
    importo_annuo: r.importo_annuo ?? r.importoAnnuo ?? "",
    note: r.note || r.Note || "",
    fonte: r.fonte || r.Fonte || "Backend FMED"
  };
}

// ========================================================
// FMED INFRASTRUTTURE V2 - Collegamento SharePoint documentale
// Cartella madre ufficiale creata il 17/06/2026:
// INFRASTRUTTURE / SETTORE TECNICO / CONTROLLI VERIFICHE MANUTENZIONI / FMED_INFRASTRUTTURE
// Non modifica lo storico e non cambia logiche backend: costruisce solo URL apribili.
// ========================================================
const FMED_INFRASTRUTTURE_SHAREPOINT_BASE_PATH = "/sites/marilab2/Documenti condivisi/INFRASTRUTTURE/FMED_INFRASTRUTTURE";
const FMED_INFRASTRUTTURE_SHAREPOINT_VIEW_ID = "77809e0e-1cfa-4e59-856e-5c6177e9ab1d";
const FMED_INFRASTRUTTURE_DOC_TYPES = {
  generale: {
    label: "📂 Documentazione",
    cartella: "07_DOCUMENTAZIONE_VARIA",
    usaCategoria: false
  },
  ordinarie: {
    label: "🔧 Ordinarie",
    cartella: "01_ATTIVITA_ORDINARIE",
    usaCategoria: true
  },
  straordinarie: {
    label: "🚨 Straordinarie",
    cartella: "02_ATTIVITA_STRAORDINARIE",
    usaCategoria: true
  },
  fotografie: {
    label: "📸 Foto",
    cartella: "03_FOTOGRAFIE",
    usaCategoria: false
  },
  schemi: {
    label: "📐 Schemi",
    cartella: "04_PROGETTI_E_SCHEMI",
    usaCategoria: false
  },
  certificazioni: {
    label: "📜 Certificazioni",
    cartella: "05_CERTIFICAZIONI",
    usaCategoria: false
  },
  contratti: {
    label: "📄 Contratti",
    cartella: "06_CONTRATTI",
    usaCategoria: false
  },
  costi: {
    label: "💰 Costi",
    cartella: "08_COSTI",
    usaCategoria: true
  },
  manuali: {
    label: "📚 Manuali",
    cartella: "11_MANUALI",
    usaCategoria: true
  }
};
function nomeSedeSharePointInfrastrutture(sede) {
  const chiave = chiaveSedeOperativa(sede);
  const mappa = {
    AXA_MEDICA: "AXA MEDICA",
    MARILAB_CENTER: "MARILAB CENTER",
    MARILAB_SURGERY: "MARILAB SURGERY",
    MARILAB_GARBATELLA: "MARILAB GARBATELLA",
    MARILAB_FIUMICINO: "MARILAB FIUMICINO",
    MARILAB_FUTURE_LABS: "MARILAB FUTURE LABS"
  };
  return mappa[chiave] || pulisciValoreDizionario(sede).replace(/_/g, " ") || "VARIE";
}
function nomeCategoriaSharePointInfrastrutture(categoria) {
  const t = pulisciValoreDizionario(categoria).replace(/_/g, " ");
  if (!t) return "VARIE";
  if (t.includes("CONDIZ") || t.includes("TERM") || t.includes("UTA") || t.includes("HVAC") || t.includes("CLIMA")) return "HVAC";
  if (t.includes("ELETTR")) return "ELETTRICO";
  if (t.includes("GAS")) return "GAS MEDICALI";
  if (t.includes("ANTINC") || t.includes("ESTINT") || t.includes("RILEVAZ")) return "ANTINCENDIO";
  if (t.includes("IDRIC") || t.includes("ACQUA")) return "IDRICO";
  if (t.includes("OSMOSI")) return "OSMOSI";
  if (t.includes("ASCENSOR")) return "ASCENSORI";
  if (t.includes("EDILE") || t.includes("MURAR") || t.includes("PORTA") || t.includes("INFISS")) return "EDILE";
  if (t.includes("SICUREZZA")) return "SICUREZZA";
  return ["HVAC", "ELETTRICO", "GAS MEDICALI", "ANTINCENDIO", "IDRICO", "OSMOSI", "ASCENSORI", "EDILE", "SICUREZZA", "VARIE"].includes(t) ? t : "VARIE";
}
function creaUrlSharePointDaPercorso(percorsoServerRelativo) {
  const percorso = String(percorsoServerRelativo || "").trim();
  if (!percorso) return "";
  const id = encodeURIComponent(percorso);
  return `https://marilab.sharepoint.com/sites/marilab2/Documenti%20condivisi/Forms/AllItems.aspx?id=${id}&viewid=${encodeURIComponent(FMED_INFRASTRUTTURE_SHAREPOINT_VIEW_ID)}`;
}
function urlCartellaInfrastruttura(record, tipo = "generale") {
  const r = normalizzaInfrastrutturaDaApi(record);
  const config = FMED_INFRASTRUTTURE_DOC_TYPES[tipo] || FMED_INFRASTRUTTURE_DOC_TYPES.generale;
  const sede = nomeSedeSharePointInfrastrutture(r.sede);
  const categoria = nomeCategoriaSharePointInfrastrutture(r.categoria);
  const parti = [FMED_INFRASTRUTTURE_SHAREPOINT_BASE_PATH, config.cartella, sede];
  if (config.usaCategoria) parti.push(categoria);
  return creaUrlSharePointDaPercorso(parti.join("/"));
}

// ========================================================
// FMED FASE 2 - SICUREZZA D.LGS. 81/08
// Il modulo usa i record infrastrutturali già disponibili e li classifica
// senza modificare API o schema database.
// ========================================================

// ========================================================
// FMED PHASE 2 - permessi frontend per ruolo
// Admin: accesso completo.
// Service: tecnico operativo, senza Costi/Export/Utenti.
// User: sola consultazione base.
// Nota: questa fase non modifica API/backend. È una protezione UI.
// La protezione definitiva lato sicurezza andrà completata in backend.
// ========================================================
const FMED_ALL_MENU_ITEMS = ["Dashboard", "Asset", "Interventi", "Costi", "Scadenze", "Infrastrutture", "Sicurezza 81/08", "Export", "SharePoint", "Processi", "Dizionari", "Gestione Utenti"];
const FMED_MENU_LABELS = {
  Asset: "Asset e Cespiti",
  Export: "Report e Analisi",
  SharePoint: "SHAREPOINT",
  Dizionari: "Dizionari",
  "Gestione Utenti": "Impostazioni"
};
const FMED_MENU_HELP = {
  Dashboard: "Riepilogo generale di asset, interventi, scadenze, costi e attività recenti.",
  Asset: "Anagrafica delle apparecchiature e dei cespiti: ricerca, nuovo asset, OCR, modifica, documenti, QR e storico.",
  Interventi: "Registra e consulta manutenzioni ordinarie o straordinarie delle apparecchiature medicali e degli asset.",
  Costi: "Analizza costi, fornitori, ditte e spese degli interventi tecnici.",
  Scadenze: "Controlla attività in scadenza o scadute e apri direttamente il modulo collegato.",
  Infrastrutture: "Gestisce impianti e manutenzioni ordinarie o straordinarie di climatizzazione, elettrico, antincendio e altre infrastrutture.",
  "Sicurezza 81/08": "Consulta documenti, adempimenti, verifiche e scadenze della sicurezza sul lavoro.",
  Export: "Crea report, analisi ed esportazioni filtrate dei dati FMED.",
  SharePoint: "Apre l'archivio documentale tecnico centralizzato su SharePoint.",
  Processi: "Usa procedure guidate solo per operazioni complesse che coinvolgono più moduli, come dismissioni, trasferimenti o sostituzioni.",
  Dizionari: "Aggiunge o modifica sedi, società, reparti, locazioni, costruttori, modelli, fornitori, ditte esecutrici e valori dei menu a tendina.",
  "Gestione Utenti": "Gestisce utenti, ruoli, permessi e configurazioni amministrative."
};
function fmedMenuLabel(item) {
  return FMED_MENU_LABELS[item] || item;
}
function fmedMenuHelp(item) {
  return FMED_MENU_HELP[item] || "Apri la funzione FMED selezionata.";
}
const FMED_ROLE_PERMISSIONS = {
  Admin: {
    pages: ["Dashboard", "Asset", "Interventi", "Costi", "Scadenze", "Infrastrutture", "Sicurezza 81/08", "Export", "SharePoint", "Processi", "Dizionari", "Nuovo Asset", "Gestione Utenti"],
    canEdit: true,
    canExport: true,
    canSeeCosts: true,
    canManageUsers: true,
    canManageProcesses: true,
    label: "Amministratore"
  },
  Service: {
    pages: ["Dashboard", "Asset", "Interventi", "Scadenze", "Infrastrutture", "Sicurezza 81/08", "SharePoint", "Processi"],
    canEdit: true,
    canExport: false,
    canSeeCosts: false,
    canManageUsers: false,
    canManageProcesses: true,
    label: "Tecnico Service"
  },
  User: {
    pages: ["Dashboard", "Asset", "Scadenze", "Infrastrutture", "Sicurezza 81/08"],
    canEdit: false,
    canExport: false,
    canSeeCosts: false,
    canManageUsers: false,
    canManageProcesses: false,
    label: "Utente"
  }
};
function normalizzaRuoloFmed(sessioneFmed) {
  const ruolo = String(sessioneFmed?.role || "User").trim().toLowerCase();
  if (ruolo === "admin" || ruolo === "amministratore") return "Admin";
  if (ruolo === "service" || ruolo === "tecnico" || ruolo === "tecnico service") return "Service";
  return "User";
}
function permessiFmed(sessioneFmed) {
  const ruolo = normalizzaRuoloFmed(sessioneFmed);
  return FMED_ROLE_PERMISSIONS[ruolo] || FMED_ROLE_PERMISSIONS.User;
}
const FMED_PROCESS_ROUTE_PAGES = ["Nuovo Asset"];
function puoAccederePaginaFmed(sessioneFmed, pagina) {
  const permessi = permessiFmed(sessioneFmed);
  if (FMED_PROCESS_ROUTE_PAGES.includes(pagina)) return permessi.canManageUsers === true;
  return permessi.pages.includes(pagina);
}
function menuItemsFmedPerRuolo(sessioneFmed) {
  const permessi = permessiFmed(sessioneFmed);
  return FMED_ALL_MENU_ITEMS.filter(item => permessi.pages.includes(item));
}
function AppNuovoCore({
  sessioneFmed = null,
  onLogoutFmed = null
} = {}) {
  // FMED V14 PERFORMANCE + QR FIX + SHAREPOINT RESTORE

  

  // FMED 4.0 MASTER VISUAL SYSTEM: classifica semanticamente i pulsanti
  // in base al testo già renderizzato. Solo UI/CSS, nessuna logica/API alterata.
  

  const [cespiti, setCespiti] = useState([]);
  // FMED V14 PERFORMANCE: caricamento dati ON DEMAND con cache locale.
  // La Dashboard resta leggera: i dataset grandi vengono letti solo quando servono.
  const [assetLoaded, setAssetLoaded] = useState(false);
  const [assetLoading, setAssetLoading] = useState(false);
  const [interventiLoaded, setInterventiLoaded] = useState(false);
  const [interventiLoading, setInterventiLoading] = useState(false);
  const [scadenzeLoaded, setScadenzeLoaded] = useState(false);
  const [scadenzeLoading, setScadenzeLoading] = useState(false);
  const [, setCostiLoaded] = useState(false);
  const [, setCostiLoading] = useState(false);
  const [, setExportLoaded] = useState(false);
  const [, setExportLoading] = useState(false);
  const [, setSchedaCespiteLoading] = useState(false);
  const [ricerca, setRicerca] = useState("");
  const [ricercaCespiteIntervento, setRicercaCespiteIntervento] = useState("");
  const [sede, setSede] = useState("TUTTE");
  const [categoriaFiltro, setCategoriaFiltro] = useState("TUTTE");
  const [assetRepartoFiltro, setAssetRepartoFiltro] = useState("TUTTI");
  const [assetLocazioneFiltro, setAssetLocazioneFiltro] = useState("TUTTE");
  const [assetCostruttoreFiltro, setAssetCostruttoreFiltro] = useState("TUTTI");
  const [assetTipologiaFiltro, setAssetTipologiaFiltro] = useState("TUTTE");
  const [assetModelloFiltro, setAssetModelloFiltro] = useState("TUTTI");
  const [assetSocietaFiltro, setAssetSocietaFiltro] = useState("TUTTE");
  const [assetStatoFiltro, setAssetStatoFiltro] = useState("TUTTI");
  const [ordineCodiceAsset, setOrdineCodiceAsset] = useState("CODICE_ASC");
  const [assetElencoAperto, setAssetElencoAperto] = useState(false);
  const [assetAnalisiAperta, setAssetAnalisiAperta] = useState(false);
  const [sidebarCompattata, setSidebarCompattata] = useState(() => {
    try {
      return localStorage.getItem("fmed_sidebar_compattata") === "1";
    } catch {
      return false;
    }
  });
  const [assetQuickEditCodice, setAssetQuickEditCodice] = useState("");
  const [assetQuickEditForm, setAssetQuickEditForm] = useState({});
  const [assetQuickEditSaving, setAssetQuickEditSaving] = useState(false);
  const [assetSelezionatiBulk, setAssetSelezionatiBulk] = useState([]);
  const [assetBulkBranca, setAssetBulkBranca] = useState("");
  const [assetBulkSede, setAssetBulkSede] = useState("");
  const [assetBulkLocazione, setAssetBulkLocazione] = useState("");
  const [assetBulkStato, setAssetBulkStato] = useState("");
  const [assetBulkSocieta, setAssetBulkSocieta] = useState("");
  const [assetBulkSaving, setAssetBulkSaving] = useState(false);
          const [interventiElencoAperto, setInterventiElencoAperto] = useState(false);
  const [scadenzeElencoAperto, setScadenzeElencoAperto] = useState(false);
  const [pagina, setPagina] = useState("Dashboard");
  const utenteCorrenteFmed = sessioneFmed?.nome || sessioneFmed?.name || sessioneFmed?.username || sessioneFmed?.email || "Utente FMED";
  const ruoloFmed = normalizzaRuoloFmed(sessioneFmed);
  const permessiRuoloFmed = useMemo(() => permessiFmed(sessioneFmed), [sessioneFmed]);
  const menuItemsFmed = useMemo(() => menuItemsFmedPerRuolo(sessioneFmed), [sessioneFmed]);
  useEffect(() => {
    if (!puoAccederePaginaFmed(sessioneFmed, pagina)) {
      setPagina("Dashboard");
    }
  }, [pagina, ruoloFmed, sessioneFmed]);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("fmed_theme_mode") !== "light";
    } catch {
      return true;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("fmed_theme_mode", darkMode ? "dark" : "light");
    } catch {
      // localStorage può essere disabilitato dal browser.
    }
    document.body.dataset.theme = darkMode ? "dark" : "light";
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);
  useEffect(() => {
    try {
      localStorage.setItem("fmed_sidebar_compattata", sidebarCompattata ? "1" : "0");
    } catch {
      // Mantiene il menu utilizzabile anche senza storage.
    }
  }, [sidebarCompattata]);
  const [interventi, setInterventi] = useState([]);
  const [interventiIncludeStorico, setInterventiIncludeStorico] = useState(false);
  const [filtroInterventiSede, setFiltroInterventiSede] = useState("TUTTE");
  const [filtroInterventiSocieta, setFiltroInterventiSocieta] = useState("TUTTE");
  const [filtroInterventiCodice, setFiltroInterventiCodice] = useState("TUTTE");
  const [filtroInterventiTipologia, setFiltroInterventiTipologia] = useState("TUTTE");
  const [filtroInterventiAttivita, setFiltroInterventiAttivita] = useState("TUTTE");
  const [filtroInterventiUltimoDa, setFiltroInterventiUltimoDa] = useState("");
  const [filtroInterventiUltimoA, setFiltroInterventiUltimoA] = useState("");
  const [filtroInterventiProssimoDa, setFiltroInterventiProssimoDa] = useState("");
  const [filtroInterventiProssimoA, setFiltroInterventiProssimoA] = useState("");
  const [filtroInterventiAnnoContabile, setFiltroInterventiAnnoContabile] = useState(String(new Date().getFullYear()));
  const [filtroInterventiPeriodoContabile, setFiltroInterventiPeriodoContabile] = useState("ANNO");
  const [filtroInterventiPeriodoDa, setFiltroInterventiPeriodoDa] = useState("");
  const [filtroInterventiPeriodoA, setFiltroInterventiPeriodoA] = useState("");
  const [ordineInterventi, setOrdineInterventi] = useState("RECENTI");
  const [scadenze, setScadenze] = useState([]);
  const [filtroScadenze, setFiltroScadenze] = useState("TUTTE");
  const [filtroScadenzeModulo, setFiltroScadenzeModulo] = useState("TUTTI");
  const [filtroScadenzeCodice, setFiltroScadenzeCodice] = useState("TUTTE");
  const [filtroScadenzeSede, setFiltroScadenzeSede] = useState("TUTTE");
  const [filtroScadenzeTipologia, setFiltroScadenzeTipologia] = useState("TUTTE");
  const [filtroScadenzeAttivita, setFiltroScadenzeAttivita] = useState("TUTTE");
  const [filtroScadenzeDitta, setFiltroScadenzeDitta] = useState("TUTTE");
  const [filtroScadenzeProssimaDa, setFiltroScadenzeProssimaDa] = useState("");
  const [filtroScadenzeProssimaA, setFiltroScadenzeProssimaA] = useState("");
  const [ordineScadenze, setOrdineScadenze] = useState("SCADENZA_ASC");
  const [scadenzeSelezionateExport, setScadenzeSelezionateExport] = useState([]);
  const [infrastrutture, setInfrastrutture] = useState(SCADENZIARIO_INFRASTRUTTURE_AXA);
      const [infrastruttureLoaded, setInfrastruttureLoaded] = useState(false);
  const [infrastruttureLoading, setInfrastruttureLoading] = useState(false);
  const [filtroInfraSede, setFiltroInfraSede] = useState("TUTTE");
  const [filtroInfraCategoria, setFiltroInfraCategoria] = useState("TUTTE");
  const [filtroInfraStato, setFiltroInfraStato] = useState("TUTTE");
  const [filtroInfraDitta, setFiltroInfraDitta] = useState("TUTTE");
  const [filtroInfraPeriodicita, setFiltroInfraPeriodicita] = useState("TUTTE");
  const [filtroInfraPriorita, setFiltroInfraPriorita] = useState("TUTTE");
  const [filtroInfraResponsabile, setFiltroInfraResponsabile] = useState("TUTTE");
  const [filtroInfraCentroCosto, setFiltroInfraCentroCosto] = useState("TUTTE");
  const [filtroInfraSocieta, setFiltroInfraSocieta] = useState("TUTTE");
  const [filtroInfraProssimaDa, setFiltroInfraProssimaDa] = useState("");
  const [filtroInfraProssimaA, setFiltroInfraProssimaA] = useState("");
  const [ricercaInfra, setRicercaInfra] = useState("");
  const ricercaInfraDeferred = useDeferredValue(ricercaInfra);
  const [formInfrastrutturaOpen, setFormInfrastrutturaOpen] = useState(false);
  const [infraInModifica, setInfraInModifica] = useState(null);
  const [formInfra, setFormInfra] = useState({});
  const [salvataggioInfraLoading, setSalvataggioInfraLoading] = useState(false);
  const [eliminazioneInfraLoading, setEliminazioneInfraLoading] = useState(false);
  const [messaggioInfra, setMessaggioInfra] = useState("");
  const [exportSedeInventario, setExportSedeInventario] = useState("TUTTE");
  const [exportStatoInventario, setExportStatoInventario] = useState("TUTTI");
  const [exportCategoriaInventario, setExportCategoriaInventario] = useState("TUTTE");
  const [exportTipologiaInventario, setExportTipologiaInventario] = useState("TUTTE");
  const [exportCostruttoreInventario, setExportCostruttoreInventario] = useState("TUTTI");
  const [exportRepartoInventario, setExportRepartoInventario] = useState("TUTTI");
  const [exportSocietaInventario, setExportSocietaInventario] = useState("TUTTE");
  const [exportLocazioneInventario, setExportLocazioneInventario] = useState("TUTTE");
  const [exportOrdineInventario, setExportOrdineInventario] = useState("LOCAZIONE_ASC");
  const [exportInventarioColonneExtra, setExportInventarioColonneExtra] = useState({
    stato: false,
    note: false,
    categoria: false,
    societa: false,
    sede: false,
    locazione: false,
    data_collaudo: false,
    link_documentazione: false,
    prezzo: false,
    data_messa_in_uso: false
  });
  const [exportSediInterventi, setExportSediInterventi] = useState([]);
  const [exportSedeInterventi, setExportSedeInterventi] = useState("TUTTE");
  const [exportCodiceInterventi, setExportCodiceInterventi] = useState("TUTTI");
  const [exportTipologiaInterventi, setExportTipologiaInterventi] = useState("TUTTE");
  const [exportSocietaInterventi, setExportSocietaInterventi] = useState("TUTTE");
  const [exportAnnoInterventi, setExportAnnoInterventi] = useState("TUTTI");
  const [exportScadenzaInterventi, setExportScadenzaInterventi] = useState("VALIDI");
  const [exportDataInterventiDa, setExportDataInterventiDa] = useState("");
  const [exportDataInterventiA, setExportDataInterventiA] = useState("");
  const [exportBudgetSede, setExportBudgetSede] = useState("TUTTE");
  const [exportBudgetStato, setExportBudgetStato] = useState("TUTTI");
  const [exportBudgetTipologia, setExportBudgetTipologia] = useState("TUTTE");
  const [exportBudgetCostruttore, setExportBudgetCostruttore] = useState("TUTTI");
  const [exportBudgetCriticita, setExportBudgetCriticita] = useState("TUTTE");
  const [exportBrancheInventario, setExportBrancheInventario] = useState([]);
  const [exportBrancheInterventi, setExportBrancheInterventi] = useState([]);
  const [exportBrancheScadenze, setExportBrancheScadenze] = useState([]);
  const [exportBrancheBudget, setExportBrancheBudget] = useState([]);
  const [exportAttivitaInterventiEscluse, setExportAttivitaInterventiEscluse] = useState([]);
  const [exportCespitiInventarioSelezionati, setExportCespitiInventarioSelezionati] = useState([]);
  const [exportCespitiInterventiSelezionati, setExportCespitiInterventiSelezionati] = useState([]);
  const [exportRicercaCespiteInventario, setExportRicercaCespiteInventario] = useState("");
  const [exportRicercaCespiteInterventi, setExportRicercaCespiteInterventi] = useState("");
  const [impostazioniTab, setImpostazioniTab] = useState("UTENTI");

  // FMED PERFORMANCE SAFE PATCH
  // Le ricerche pesanti usano una versione differita: mentre scrivi la UI resta fluida
  // e i filtri su migliaia di righe vengono calcolati subito dopo, senza bloccare l'input.
  const ricercaDeferred = useDeferredValue(ricerca);
  const ricercaCespiteInterventoDeferred = useDeferredValue(ricercaCespiteIntervento);
  const exportRicercaCespiteInventarioDeferred = useDeferredValue(exportRicercaCespiteInventario);
  const exportRicercaCespiteInterventiDeferred = useDeferredValue(exportRicercaCespiteInterventi);

  // FMED ULTRA SAFE PATCH
  // Ogni pagina lavora solo sui propri dati pesanti. La Dashboard resta un riepilogo leggero.
  const paginaAssetAttiva = pagina === "Asset";
  const paginaInterventiAttiva = pagina === "Interventi";
  const paginaCostiAttiva = pagina === "Costi";
  const paginaScadenzeAttiva = pagina === "Scadenze";
  const paginaExportAttiva = pagina === "Export";
  const paginaInfrastruttureAttiva = pagina === "Infrastrutture";
  const paginaSicurezzaAttiva = pagina === "Sicurezza 81/08";
  const paginaRichiedeAssetPesanti = paginaAssetAttiva || paginaInterventiAttiva;
  const paginaRichiedeInterventiPesanti = paginaInterventiAttiva || paginaCostiAttiva;
  const [exportPanelAperto, setExportPanelAperto] = useState(null);
  const [costiPanelAperto, setCostiPanelAperto] = useState("ditta");
  const [codiceCespiteAutomatico, setCodiceCespiteAutomatico] = useState(true);
  const [generazioneCodiceLoading, setGenerazioneCodiceLoading] = useState(false);
  const [cespiteSelezionato, setCespiteSelezionato] = useState(null);
  const [interventiCespite, setInterventiCespite] = useState([]);
  const [analisiCespite, setAnalisiCespite] = useState(null);
  const [modificaCespite, setModificaCespite] = useState(false);
  const [formCespite, setFormCespite] = useState({});
  const [nuovoCespiteOpen, setNuovoCespiteOpen] = useState(false);
  const [nuovoAssetWizardOpen, setNuovoAssetWizardOpen] = useState(false);
  const [nuovoAssetWizardInitialData, setNuovoAssetWizardInitialData] = useState({});
  const [nuovoAssetWizardReturnPage, setNuovoAssetWizardReturnPage] = useState("Asset");
  const [processoGuidatoEsecuzioneId, setProcessoGuidatoEsecuzioneId] = useState(null);
  const [processoNuovoInterventoGuidato, setProcessoNuovoInterventoGuidato] = useState(false);
  const [gestioneDizionariOpen, setGestioneDizionariOpen] = useState(false);
  const [extraTipologie, setExtraTipologie] = useState(() => caricaDizionarioExtra("tipologia"));
  const [extraCostruttori, setExtraCostruttori] = useState(() => caricaDizionarioExtra("costruttore"));
  const [extraReparti, setExtraReparti] = useState(() => caricaDizionarioExtra("reparto"));
  const [extraBranche, setExtraBranche] = useState(() => caricaDizionarioExtra("branca_medica"));
  const [extraLocazioni, setExtraLocazioni] = useState(() => caricaDizionarioExtra("locazione"));
  const [extraModelli, setExtraModelli] = useState(() => caricaDizionarioExtra("modello"));
  const [extraSedi, setExtraSedi] = useState(() => caricaDizionarioExtra("sede"));
  const [dizionariCoreFmed, setDizionariCoreFmed] = useState(null);
  const [processiCoreFmed, setProcessiCoreFmed] = useState([]);
  const ricaricaDizionariCoreFmed = useCallback(async () => {
    const diz = await caricaJsonDaApi("/core/dizionari", null, {
      force: true
    });
    if (diz?.dizionari) {
      setDizionariCoreFmed(diz.dizionari);
      return diz.dizionari;
    }
    return null;
  }, []);
  useEffect(() => {
    let attivo = true;
    Promise.all([ricaricaDizionariCoreFmed(), caricaJsonDaApi("/core/processi", null)]).then(([, proc]) => {
      if (!attivo) return;
      if (Array.isArray(proc?.processi)) setProcessiCoreFmed(proc.processi);
    }).catch(() => {});
    return () => {
      attivo = false;
    };
  }, [ricaricaDizionariCoreFmed]);
  const creaEsecuzioneProcessoFmed = useCallback(async (codiceProcesso, datiProcesso = {}) => {
    const response = await fetch(`${API_BASE_URL}/core/processi/avvia`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        processo: codiceProcesso,
        dati: datiProcesso,
        avviato_da: utenteCorrenteFmed || sessioneFmed?.email || "FMED"
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data?.status === "ko") {
      throw new Error(data?.detail?.messaggio || data?.detail || data?.errore || "Avvio processo non riuscito");
    }
    const row = Array.isArray(data?.esecuzione) ? data.esecuzione[0] : data?.esecuzione;
    return row || null;
  }, [utenteCorrenteFmed, sessioneFmed]);

  const avviaProcessoGuidatoFmed = useCallback(async (codiceProcesso, datiIniziali = {}) => {
    const datiProcesso = datiIniziali && typeof datiIniziali === "object" ? datiIniziali : {};

    // Nuovo intervento: l'esecuzione viene creata solo dopo la selezione reale del cespite.
    // In questo modo chi chiude subito il popup non lascia processi fantasma "IN CORSO".
    if (codiceProcesso === "NUOVO_INTERVENTO") {
      setProcessoGuidatoEsecuzioneId(null);
      setProcessoNuovoInterventoGuidato(true);
      resetFormNuovoIntervento(null);
      setPagina("Interventi");
      setNuovoInterventoOpen(true);
      return;
    }

    try {
      const row = await creaEsecuzioneProcessoFmed(codiceProcesso, datiProcesso);
      setProcessoGuidatoEsecuzioneId(row?.id || null);
    } catch {
      setProcessoGuidatoEsecuzioneId(null);
    }
    if (codiceProcesso === "NUOVO_ASSET") {
      setNuovoAssetWizardReturnPage(pagina && pagina !== "Nuovo Asset" ? pagina : "Asset");
      setNuovoAssetWizardInitialData(datiProcesso);
      setNuovoCespiteOpen(false);
      setNuovoAssetWizardOpen(true);
      setPagina("Nuovo Asset");
      return;
    }
    if (codiceProcesso === "DISMISSIONE_ASSET") {
      setPagina("Asset");
      window.alert("Seleziona l’asset dalla lista e usa Dismetti. FMED manterrà storico, documenti e cicli collegati.");
      return;
    }
    if (codiceProcesso === "NUOVA_SEDE") {
      setImpostazioniTab("MASTER_DATA");
      setPagina("Dizionari");
      window.alert("Apri il dizionario SEDI per aggiungere o modificare la sede. Il nuovo valore sarà poi disponibile nei menu FMED.");
    }
  }, [creaEsecuzioneProcessoFmed, pagina]);
  const [extraFornitori, setExtraFornitori] = useState(() => caricaDizionarioExtra("fornitore"));
  const [extraDitte, setExtraDitte] = useState(() => caricaDizionarioExtra("ditta"));
  const [extraAttivita, setExtraAttivita] = useState(() => caricaDizionarioExtra("attivita"));
  const [extraCategorie, setExtraCategorie] = useState(() => caricaDizionarioExtra("categoria"));
  const [extraSocieta, setExtraSocieta] = useState(() => caricaDizionarioExtra("societa"));
  const [extraPossesso, setExtraPossesso] = useState(() => caricaDizionarioExtra("possesso"));
  const [extraStatiAsset, setExtraStatiAsset] = useState(() => caricaDizionarioExtra("stato_asset"));
  const [extraEsiti, setExtraEsiti] = useState(() => caricaDizionarioExtra("esito"));
  const [extraPriorita, setExtraPriorita] = useState(() => caricaDizionarioExtra("priorita"));
  const [nuovaTipologia, setNuovaTipologia] = useState("");
  const [nuovoCostruttore, setNuovoCostruttore] = useState("");
  const [nuovoReparto, setNuovoReparto] = useState("");
  const [nuovaBranca, setNuovaBranca] = useState("");
  const [nuovaLocazione, setNuovaLocazione] = useState("");
  const [nuovoModello, setNuovoModello] = useState("");
  const [nuovaSede, setNuovaSede] = useState("");
  const [nuovoFornitore, setNuovoFornitore] = useState("");
  const [nuovaDitta, setNuovaDitta] = useState("");
  const [nuovaAttivita, setNuovaAttivita] = useState("");
  const [nuovaCategoria, setNuovaCategoria] = useState("");
  const [nuovaSocieta, setNuovaSocieta] = useState("");
  const [nuovoPossesso, setNuovoPossesso] = useState("");
  const [nuovoStatoAsset, setNuovoStatoAsset] = useState("");
  const [nuovoEsito, setNuovoEsito] = useState("");
  const [nuovaPriorita, setNuovaPriorita] = useState("");
  const [dizionarioInModifica, setDizionarioInModifica] = useState(null);
  const [valoreDizionarioInModifica, setValoreDizionarioInModifica] = useState("");
  const [dizionariRimossi, setDizionariRimossi] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fmed_dizionari_rimossi") || "{}");
    } catch {
      return {};
    }
  });
  useEffect(() => {
    salvaDizionariExtraSuLocalStorage({
      tipologia: extraTipologie,
      costruttore: extraCostruttori,
      reparto: extraReparti,
      branca_medica: extraBranche,
      locazione: extraLocazioni,
      modello: extraModelli,
      sede: extraSedi,
      fornitore: extraFornitori,
      ditta: extraDitte,
      attivita: extraAttivita,
      categoria: extraCategorie,
      societa: extraSocieta,
      possesso: extraPossesso,
      stato_asset: extraStatiAsset,
      esito: extraEsiti,
      priorita: extraPriorita
    });
  }, [extraTipologie, extraCostruttori, extraReparti, extraBranche, extraLocazioni, extraModelli, extraSedi, extraFornitori, extraDitte, extraAttivita, extraCategorie, extraSocieta, extraPossesso, extraStatiAsset, extraEsiti, extraPriorita]);
  const [formNuovoCespite, setFormNuovoCespite] = useState({
    codicestrumento: "",
    tipologia: "",
    costruttore: "",
    modello: "",
    matricola: "",
    societa: "MARILAB",
    sede: "",
    reparto: "",
    branca_medica: "",
    area_sanitaria: "",
    locazione: "",
    categoria: "E",
    possesso: "Proprietà",
    anno_di_fabbricazione: "",
    marcatura_ce: "",
    alimentazione: "",
    potenza: "",
    frequenza: "",
    lotto: "",
    prezzo: "",
    data_di_collaudo: "",
    data_messa_in_uso: "",
    fornitore: "",
    note: "",
    accessori_sistema_primario: "",
    stato_asset: "Attivo",
    foto_principale: "",
    foto_targhetta: "",
    foto_accessori: "",
    foto_installazione: "",
    foto_manutenzione: "",
    foto_guasto: "",
    foto_dopo_intervento: "",
    foto_documentazione: ""
  });
  const [ocrTarghettaLoading, setOcrTarghettaLoading] = useState(false);
  const [ocrTarghettaEsito, setOcrTarghettaEsito] = useState(null);
  const [ocrAccessorioLoading, setOcrAccessorioLoading] = useState(false);
  const [ocrAccessorioEsito, setOcrAccessorioEsito] = useState(null);
  const [nuovoInterventoOpen, setNuovoInterventoOpen] = useState(false);
  const [alertMailOpen, setAlertMailOpen] = useState(false);
  const [modificaInterventoOpen, setModificaInterventoOpen] = useState(false);
  const [interventoDaModificare, setInterventoDaModificare] = useState(null);
  const [formModificaIntervento, setFormModificaIntervento] = useState({});
  const [formNuovoIntervento, setFormNuovoIntervento] = useState({
    codice_strumento: "",
    sede: "",
    locazione: "",
    branca_medica: "",
    tipologia: "",
    attivita: "MANUTENZIONE ORDINARIA",
    costruttore: "",
    modello: "",
    reparto: "",
    matricola: "",
    societa: "",
    link_documento: "",
    descrizione_attivita: "",
    esito: "",
    costo: "",
    data_ultimo_intervento: "",
    data_prossimo_intervento: "",
    periodicita: "",
    importo_extra: ""
  });
  const [modificaLinkDoc, setModificaLinkDoc] = useState(false);
  const [linkDocInput, setLinkDocInput] = useState("");
  const [linkManualiDocumentazione, setLinkManualiDocumentazione] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fmed_link_documentazione_cespiti") || "{}");
    } catch {
      return {};
    }
  });
  const [storicoCespiteOpen, setStoricoCespiteOpen] = useState(false);
  const [storicoFiltroTesto, setStoricoFiltroTesto] = useState("");
  const [storicoFiltroAttivita, setStoricoFiltroAttivita] = useState("TUTTE");
  const [storicoFiltroDitta, setStoricoFiltroDitta] = useState("TUTTE");
  const [assetRenderLimit, setAssetRenderLimit] = useState(FMED_RENDER_BATCH_ASSET);
  const [interventiRenderLimit, setInterventiRenderLimit] = useState(FMED_RENDER_BATCH_INTERVENTI);
  const [scadenzeRenderLimit, setScadenzeRenderLimit] = useState(FMED_RENDER_BATCH_SCADENZE);
  useEffect(() => {
    // Quando cambi pagina, non renderizzare migliaia di righe subito.
    // La lista si allunga solo con il pulsante "Mostra altri".
    setAssetRenderLimit(FMED_RENDER_BATCH_ASSET);
    setInterventiRenderLimit(FMED_RENDER_BATCH_INTERVENTI);
    setScadenzeRenderLimit(FMED_RENDER_BATCH_SCADENZE);
  }, [pagina]);
  const caricaCespitiOnDemand = useCallback(async ({
    force = false
  } = {}) => {
    if (!force && (assetLoaded || assetLoading)) return cespiti;
    setAssetLoading(true);
    try {
      const dati = await caricaJsonDaApi("/censimento?limit=5000", [], {
        force
      });
      const normalizzati = Array.isArray(dati) ? dati.map(normalizzaCespiteDaApi) : [];
      setCespiti(normalizzati);
      setAssetLoaded(true);
      return normalizzati;
    } finally {
      setAssetLoading(false);
    }
  }, [assetLoaded, assetLoading, cespiti]);
  const caricaInterventiOnDemand = useCallback(async ({
    force = false,
    source = "interventi",
    includeStorico = interventiIncludeStorico
  } = {}) => {
    if (!force && (interventiLoaded || interventiLoading)) return interventi;
    if (source === "costi") setCostiLoading(true);else if (source === "export") setExportLoading(true);else setInterventiLoading(true);
    try {
      const endpointInterventi = `/interventi?limit=5000&include_storico=${includeStorico ? "true" : "false"}`;
      const dati = await caricaJsonDaApi(endpointInterventi, [], {
        force
      });
      const normalizzati = Array.isArray(dati) ? dati.map(normalizzaInterventoDaApi) : [];
      setInterventi(normalizzati);
      setInterventiLoaded(true);
      if (source === "costi") setCostiLoaded(true);
      if (source === "export") setExportLoaded(true);
      return normalizzati;
    } finally {
      if (source === "costi") setCostiLoading(false);else if (source === "export") setExportLoading(false);else setInterventiLoading(false);
    }
  }, [interventiLoaded, interventiLoading, interventi, interventiIncludeStorico]);
  const cambiaVistaStoricoInterventi = useCallback(async (includeStorico) => {
    const next = Boolean(includeStorico);
    setInterventiIncludeStorico(next);
    setInterventiLoaded(false);
    setInterventiRenderLimit(FMED_RENDER_BATCH_INTERVENTI);
    await caricaInterventiOnDemand({ force: true, source: "interventi", includeStorico: next });
  }, [caricaInterventiOnDemand]);

  const caricaScadenzeOnDemand = useCallback(async ({
    force = false
  } = {}) => {
    if (!force && (scadenzeLoaded || scadenzeLoading)) return scadenze;
    setScadenzeLoading(true);
    try {
      const dati = await caricaJsonDaApi("/cicli-unificati/attivi", [], {
        force
      });
      const normalizzati = Array.isArray(dati) ? dati : [];
      setScadenze(normalizzati);
      setScadenzeLoaded(true);
      return normalizzati;
    } finally {
      setScadenzeLoading(false);
    }
  }, [scadenzeLoaded, scadenzeLoading, scadenze]);
  const caricaInfrastruttureOnDemand = useCallback(async ({
    force = false
  } = {}) => {
    if (!force && (infrastruttureLoaded || infrastruttureLoading)) return infrastrutture;
    setInfrastruttureLoading(true);
    try {
      const dati = await caricaJsonDaApi("/infrastrutture", [], {
        force
      });
      const normalizzati = Array.isArray(dati) && dati.length ? dati.map(normalizzaInfrastrutturaDaApi) : SCADENZIARIO_INFRASTRUTTURE_AXA.map(normalizzaInfrastrutturaDaApi);
      setInfrastrutture(normalizzati);
      setInfrastruttureLoaded(true);
      return normalizzati;
    } finally {
      setInfrastruttureLoading(false);
    }
  }, [infrastruttureLoaded, infrastruttureLoading, infrastrutture]);
  useEffect(() => {
    if (paginaAssetAttiva || paginaInterventiAttiva) {
      caricaCespitiOnDemand();
    }
  }, [paginaAssetAttiva, paginaInterventiAttiva, caricaCespitiOnDemand]);
  useEffect(() => {
    if (paginaInterventiAttiva) {
      caricaInterventiOnDemand({
        source: "interventi"
      });
    }
  }, [paginaInterventiAttiva, caricaInterventiOnDemand]);
  const verificaConfigurazioneAlertEmail = useCallback(async () => {
    const dati = await chiamataApiAutenticataFmed("/alert/email-config", { method: "GET" });
    return {
      ...dati,
      message: dati?.messaggio || (dati?.configurato ? "Gmail API configurata correttamente." : "Configurazione email incompleta."),
    };
  }, []);

  const inviaAlertScadenzeEmail = useCallback(async (payload = {}) => {
    const dati = await chiamataApiAutenticataFmed("/alert/scadenze-email", {
      method: "POST",
      body: JSON.stringify({
        destinatari: payload?.destinatari || null,
        sede: payload?.sede || null,
        giorni: Number(payload?.giorni || 30),
      })
    });
    return {
      ...dati,
      message: dati?.messaggio || "Alert scadenze inviato correttamente.",
    };
  }, []);

  const apriOutlookAlertScadenze = useCallback(async (payload = {}) => {
    // Apriamo subito la scheda per evitare il blocco popup del browser durante la richiesta HTTP.
    const outlookWindow = window.open("about:blank", "_blank");
    try {
      const preview = await chiamataApiAutenticataFmed("/alert/scadenze-email-preview", {
        method: "POST",
        body: JSON.stringify({
          destinatari: payload?.destinatari || null,
          sede: payload?.sede || null,
          giorni: Number(payload?.giorni || 30),
        })
      });
      const requestedRecipients = Array.isArray(payload?.destinatari) ? payload.destinatari : [];
      const recipientsList = requestedRecipients.length ? requestedRecipients : (preview?.destinatari_predefiniti || []);
      const recipients = recipientsList.join(";");
      const subject = preview?.oggetto || "FMED - Alert scadenze manutentive";
      const body = preview?.testo || "Aprire FMED per consultare le scadenze.";
      const url = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(recipients)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (outlookWindow) {
        outlookWindow.location.href = url;
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
      return {
        provider: "Outlook Web",
        message: `Bozza aperta con ${Number(preview?.scadenze_totali || 0)} scadenze nell’elenco.`,
        riepilogo: preview?.riepilogo || null,
      };
    } catch (error) {
      if (outlookWindow) outlookWindow.close();
      throw error;
    }
  }, []);
  useEffect(() => {
    if (paginaScadenzeAttiva) {
      caricaScadenzeOnDemand();
    }
  }, [paginaScadenzeAttiva, caricaScadenzeOnDemand]);
  useEffect(() => {
    if (paginaInfrastruttureAttiva) {
      caricaInfrastruttureOnDemand();
    }
  }, [paginaInfrastruttureAttiva, caricaInfrastruttureOnDemand]);
  useEffect(() => {
    if (pagina === "SharePoint") {
      caricaCespitiOnDemand();
      caricaInfrastruttureOnDemand();
    }
  }, [pagina, caricaCespitiOnDemand, caricaInfrastruttureOnDemand]);
  useEffect(() => {
    if (paginaCostiAttiva) {
      caricaInterventiOnDemand({
        source: "costi"
      });
    }
  }, [paginaCostiAttiva, caricaInterventiOnDemand]);
  useEffect(() => {
    if (paginaExportAttiva) {
      // Caricamento leggero e progressivo: i dati servono solo per preparare gli export.
      caricaCespitiOnDemand();
      caricaInterventiOnDemand({
        source: "export"
      });
      caricaScadenzeOnDemand();
      setExportLoaded(true);
    }
  }, [paginaExportAttiva, caricaCespitiOnDemand, caricaInterventiOnDemand, caricaScadenzeOnDemand]);
  useEffect(() => {
    setAssetRenderLimit(FMED_RENDER_BATCH_ASSET);
  }, [ricercaDeferred, sede, categoriaFiltro, assetRepartoFiltro, assetLocazioneFiltro, assetCostruttoreFiltro, assetTipologiaFiltro, assetModelloFiltro, assetSocietaFiltro, assetStatoFiltro, ordineCodiceAsset]);
  useEffect(() => {
    setInterventiRenderLimit(FMED_RENDER_BATCH_INTERVENTI);
  }, [filtroInterventiSede, filtroInterventiSocieta, filtroInterventiCodice, filtroInterventiTipologia, filtroInterventiAttivita, filtroInterventiUltimoDa, filtroInterventiUltimoA, filtroInterventiProssimoDa, filtroInterventiProssimoA, filtroInterventiAnnoContabile, filtroInterventiPeriodoContabile, filtroInterventiPeriodoDa, filtroInterventiPeriodoA, ordineInterventi]);
  useEffect(() => {
    setScadenzeRenderLimit(FMED_RENDER_BATCH_SCADENZE);
  }, [filtroScadenze, filtroScadenzeModulo, filtroScadenzeSede, filtroScadenzeCodice, filtroScadenzeTipologia, filtroScadenzeAttivita, filtroScadenzeDitta, filtroScadenzeProssimaDa, filtroScadenzeProssimaA, ordineScadenze]);
  useEffect(() => {
    if (!nuovoCespiteOpen || !codiceCespiteAutomatico || !formNuovoCespite.sede) return;
    try {
      setGenerazioneCodiceLoading(true);
      const codiceGenerato = generaCodiceInventarioAutomatico(formNuovoCespite.sede, cespiti);
      if (codiceGenerato && formNuovoCespite.codicestrumento !== codiceGenerato) {
        setFormNuovoCespite(prev => ({
          ...prev,
          codicestrumento: codiceGenerato
        }));
      }
    } catch (err) {
      console.error("Errore generazione codice locale:", err);
    } finally {
      setGenerazioneCodiceLoading(false);
    }
  }, [nuovoCespiteOpen, codiceCespiteAutomatico, formNuovoCespite.sede, formNuovoCespite.codicestrumento, cespiti]);
  useEffect(() => {
    const codiceDaUrl = new URLSearchParams(window.location.search).get("cespite");
    if (!codiceDaUrl || cespiteSelezionato) return;
    let annullato = false;
    async function apriCespiteDaUrl() {
      setPagina("Asset");
      const dataset = assetLoaded ? cespiti : await caricaCespitiOnDemand();
      if (annullato) return;
      const cespite = (Array.isArray(dataset) ? dataset : []).find(c => normalizzaTestoCodice(c.codicestrumento) === normalizzaTestoCodice(codiceDaUrl));
      if (cespite) apriSchedaCespite(cespite);
    }
    apriCespiteDaUrl();
    return () => {
      annullato = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps -- apriSchedaCespite usa lo stato corrente; aggiungerla riaprirebbe la scheda a ogni render.
  }, [assetLoaded, cespiti, cespiteSelezionato, caricaCespitiOnDemand]);
  const filtraDizionarioRimosso = useCallback((tipo, valori = []) => {
    const rimossi = new Set((dizionariRimossi?.[tipo] || []).map(v => pulisciValoreDizionario(v)));
    return (Array.isArray(valori) ? valori : []).filter(v => !rimossi.has(pulisciValoreDizionario(v)));
  }, [dizionariRimossi]);
  const cespitiByCodice = useMemo(() => {
    const indice = new Map();
    (Array.isArray(cespiti) ? cespiti : []).forEach(record => {
      const codice = String(record?.codicestrumento || record?.codice_strumento || "").trim();
      if (codice) indice.set(codice, record);
    });
    return indice;
  }, [cespiti]);
  const listaSedi = useMemo(() => filtraDizionarioRimosso("sede", deduplicaSediFmed([...SEDI_STANDARD_LIST, ...cespiti.map(c => c.sede), ...extraSedi], true)), [cespiti, extraSedi, filtraDizionarioRimosso]);
  const sedi = useMemo(() => ["TUTTE", ...listaSedi], [listaSedi]);
  const listaReparti = useMemo(() => filtraDizionarioRimosso("reparto", listaPulitaDizionario(REPARTI_STANDARD, extraReparti)), [extraReparti, filtraDizionarioRimosso]);
  const listaBranche = useMemo(() => filtraDizionarioRimosso("branca_medica", listaPulitaDizionario([...BRANCHE_MEDICHE_STANDARD, ...cespiti.map(c => c.branca_medica || c.branca)], extraBranche)), [cespiti, extraBranche, filtraDizionarioRimosso]);
  const getBrancaAsset = useCallback((c = {}) => {
    const esistente = String(c?.branca_medica || c?.branca || c?.Branca || "").trim();
    if (esistente) return esistente;
    return fmedGuessBrancaMedica([c?.tipologia, c?.modello, c?.costruttore, c?.reparto, c?.locazione, c?.categoria].filter(Boolean).join(" "));
  }, []);
  const getBrancaExportRecord = useCallback((record = {}) => {
    const codice = String(record?.codicestrumento || record?.codice_strumento || record?.codice || "").trim();
    const cespiteCollegato = codice ? cespitiByCodice.get(codice) : null;
    return getBrancaAsset(record) || (cespiteCollegato ? getBrancaAsset(cespiteCollegato) : "") || String(record?.reparto || "").trim();
  }, [cespitiByCodice, getBrancaAsset]);
  const filtroBrancheExport = useCallback((record = {}, brancheSelezionate = []) => {
    if (!Array.isArray(brancheSelezionate) || brancheSelezionate.length === 0) return true;
    const brancaRecord = normalizzaTestoCodice(getBrancaExportRecord(record));
    return brancheSelezionate.some(b => normalizzaTestoCodice(b) === brancaRecord);
  }, [getBrancaExportRecord]);
  function toggleFiltroBrancaExport(setter, branca) {
    const valore = String(branca || "").trim();
    if (!valore) return;
    setter(prev => prev.includes(valore) ? prev.filter(x => x !== valore) : [...prev, valore].sort((a, b) => a.localeCompare(b, "it", {
      sensitivity: "base"
    })));
  }
  function renderFiltroBrancheExport(titolo, brancheSelezionate, setter) {
    return <div style={styles.exportFilterBox}>
        <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: 5
      }}>
          <div style={{
          fontSize: 12,
          fontWeight: 400,
          color: "var(--fmed-text)"
        }}>
            {titolo} · {brancheSelezionate.length ? `${brancheSelezionate.length} selezionate` : "tutte"}
          </div>
          <div style={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap"
        }}>
            <button type="button" style={styles.miniActionBtn} onClick={() => setter([...listaBranche])}>Tutte</button>
            <button type="button" style={styles.miniActionBtn} onClick={() => setter([])}>Nessuna</button>
          </div>
        </div>

        <div style={{
        ...styles.exportCheckboxGrid,
        maxHeight: 180,
        overflowY: "auto"
      }}>
          {listaBranche.map(branca => <label key={branca} style={styles.exportCheckLabel}>
              <input type="checkbox" checked={brancheSelezionate.includes(branca)} onChange={() => toggleFiltroBrancaExport(setter, branca)} />
              <span>{branca}</span>
            </label>)}
        </div>
      </div>;
  }
  function toggleFiltroValoreExport(setter, valore) {
    const pulito = String(valore || "").trim();
    if (!pulito) return;
    setter(prev => prev.includes(pulito) ? prev.filter(x => x !== pulito) : [...prev, pulito].sort((a, b) => a.localeCompare(b, "it", {
      sensitivity: "base"
    })));
  }
  function renderFiltroSediInterventiExport() {
    const sediSelezionate = Array.isArray(exportSediInterventi) ? exportSediInterventi : [];
    return <div style={styles.exportFilterBox}>
        <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: 5
      }}>
          <div style={{
          fontSize: 12,
          fontWeight: 400,
          color: "var(--fmed-text)"
        }}>
            Filtro multiplo sede · {sediSelezionate.length ? `${sediSelezionate.length} selezionate` : "tutte"}
          </div>
          <div style={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap"
        }}>
            <button type="button" style={styles.miniActionBtn} onClick={() => setExportSediInterventi([...listaSediInterventi])}>Tutte</button>
            <button type="button" style={styles.miniActionBtn} onClick={() => setExportSediInterventi([])}>Nessuna</button>
          </div>
        </div>

        <div style={{
        ...styles.exportCheckboxGrid,
        maxHeight: 180,
        overflowY: "auto"
      }}>
          {listaSediInterventi.map(sede => <label key={sede} style={styles.exportCheckLabel}>
              <input type="checkbox" checked={sediSelezionate.includes(sede)} onChange={() => toggleFiltroValoreExport(setExportSediInterventi, sede)} />
              <span>{sede}</span>
            </label>)}
        </div>
      </div>;
  }
  const listeDizionariAsset = useMemo(() => ({
    listaTipologie: filtraDizionarioRimosso("tipologia", listaPulitaDizionario(cespiti.map(c => c.tipologia), extraTipologie)),
    listaCostruttori: filtraDizionarioRimosso("costruttore", listaPulitaDizionario(cespiti.map(c => c.costruttore), extraCostruttori)),
    listaModelli: filtraDizionarioRimosso("modello", listaPulitaDizionario(cespiti.map(c => c.modello), extraModelli)),
    listaFornitori: filtraDizionarioRimosso("fornitore", listaPulitaDizionario(cespiti.map(c => c.fornitore), extraFornitori)),
    listaSocieta: filtraDizionarioRimosso("societa", listaPulitaDizionario(cespiti.map(c => c.societa), extraSocieta)),
    listaLocazioni: filtraDizionarioRimosso("locazione", listaPulitaDizionario(cespiti.map(c => getLocazioneFmed(c)), extraLocazioni))
  }), [cespiti, extraTipologie, extraCostruttori, extraModelli, extraFornitori, extraSocieta, extraLocazioni, filtraDizionarioRimosso]);
  const {
    listaTipologie,
    listaCostruttori,
    listaModelli,
    listaFornitori,
    listaSocieta,
    listaLocazioni
  } = listeDizionariAsset;

  // FMED 3.2 FASE 2 - Società -> Sedi dipendenti.
  // Se scegli una società, il menu Sede mostra solo le sedi presenti per quella società.
  const listaSediAsset = useMemo(() => {
    if (assetSocietaFiltro === "TUTTE") return sedi;
    const societaNorm = normalizzaTestoCodice(assetSocietaFiltro);
    const valori = (Array.isArray(cespiti) ? cespiti : []).filter(c => normalizzaTestoCodice(c?.societa) === societaNorm).map(c => c?.sede).filter(Boolean);
    return ["TUTTE", ...deduplicaSediFmed(valori, true)];
  }, [assetSocietaFiltro, cespiti, sedi]);

  // FMED 2026-06-26 - Locazioni dipendenti dal presidio/sede.
  // Se selezioni "Marilab Future Labs", i menu Locazione mostrano solo stanze/ambienti
  // già presenti in quella sede, evitando di mischiare Pomezia, Caffaro, AXA, ecc.
  const getListaLocazioniPerSede = useCallback((sedeFiltro = "TUTTE", valoreCorrente = "", includiExtra = false) => {
    const sedeNorm = normalizzaSedePerConfronto(sedeFiltro);
    const usaTutte = !sedeNorm || String(sedeFiltro || "").toUpperCase() === "TUTTE";
    const base = (Array.isArray(cespiti) ? cespiti : []).filter(c => {
      if (usaTutte) return true;
      return normalizzaSedePerConfronto(c?.sede) === sedeNorm;
    });
    const valori = [...base.map(c => getLocazioneFmed(c)), valoreCorrente, ...(includiExtra || usaTutte ? extraLocazioni : [])];
    return filtraDizionarioRimosso("locazione", listaPulitaDizionario(valori));
  }, [cespiti, extraLocazioni, filtraDizionarioRimosso]);
  const listaLocazioniAsset = useMemo(() => getListaLocazioniPerSede(sede, assetLocazioneFiltro, false), [getListaLocazioniPerSede, sede, assetLocazioneFiltro]);
  const listaLocazioniExportInventario = useMemo(() => getListaLocazioniPerSede(exportSedeInventario, exportLocazioneInventario, false), [getListaLocazioniPerSede, exportSedeInventario, exportLocazioneInventario]);
  const listaLocazioniNuovoCespite = useMemo(() => getListaLocazioniPerSede(formNuovoCespite?.sede || "TUTTE", formNuovoCespite?.locazione || "", true), [getListaLocazioniPerSede, formNuovoCespite?.sede, formNuovoCespite?.locazione]);
  const listaLocazioniNuovoIntervento = useMemo(() => getListaLocazioniPerSede(formNuovoIntervento?.sede || "TUTTE", formNuovoIntervento?.locazione || "", true), [getListaLocazioniPerSede, formNuovoIntervento?.sede, formNuovoIntervento?.locazione]);
  useEffect(() => {
    if (assetSocietaFiltro === "TUTTE" || sede === "TUTTE") return;
    const valida = listaSediAsset.some(opzione => normalizzaSedePerConfronto(opzione) === normalizzaSedePerConfronto(sede));
    if (!valida) {
      setSede("TUTTE");
      setAssetLocazioneFiltro("TUTTE");
    }
  }, [assetSocietaFiltro, sede, listaSediAsset]);
  useEffect(() => {
    if (!assetBulkSede) {
      setAssetBulkLocazione("");
    }
  }, [assetBulkSede]);
  useEffect(() => {
    if (assetLocazioneFiltro === "TUTTE") return;
    const valida = listaLocazioniAsset.some(loc => normalizzaTestoCodice(loc) === normalizzaTestoCodice(assetLocazioneFiltro));
    if (!valida) setAssetLocazioneFiltro("TUTTE");
  }, [sede, assetLocazioneFiltro, listaLocazioniAsset]);
  useEffect(() => {
    if (exportLocazioneInventario === "TUTTE") return;
    const valida = listaLocazioniExportInventario.some(loc => normalizzaTestoCodice(loc) === normalizzaTestoCodice(exportLocazioneInventario));
    if (!valida) setExportLocazioneInventario("TUTTE");
  }, [exportSedeInventario, exportLocazioneInventario, listaLocazioniExportInventario]);
  const listeDizionariOperativi = useMemo(() => {
    const ditteEsecutriciMasterData = [...etichetteDaDizionario(dizionariCoreFmed, "ditte_esecutrici", []), ...etichetteDaDizionario(dizionariCoreFmed, "ditta_esecutrice", []), ...etichetteDaDizionario(dizionariCoreFmed, "ditte", []), ...etichetteDaDizionario(dizionariCoreFmed, "fornitori", [])];
    return {
      listaCategorie: filtraDizionarioRimosso("categoria", listaPulitaDizionario(cespiti.map(c => normalizeCategoria(c.categoria)), extraCategorie)),
      listaPossesso: filtraDizionarioRimosso("possesso", listaPulitaDizionario([...POSSESSO_STANDARD, ...cespiti.map(c => c.possesso)], extraPossesso)),
      listaStatiAsset: filtraDizionarioRimosso("stato_asset", listaPulitaDizionario(STATI_ASSET_STANDARD, extraStatiAsset)),
      listaSediInterventi: deduplicaSediFmed([...SEDI_STANDARD_LIST, ...interventi.map(i => i.sede)], true),
      listaSocietaInterventi: filtraDizionarioRimosso("societa", listaPulitaDizionario(interventi.map(i => normalizzaSocietaDitta(i.societa)), extraSocieta)),
      listaDitteEsecutrici: filtraDizionarioRimosso("ditta", listaPulitaDizionario([...ditteEsecutriciMasterData, ...interventi.map(i => normalizzaSocietaDitta(i.ditta_esecutrice || i.ditta))], extraDitte)),
      listaEsitiInterventi: filtraDizionarioRimosso("esito", listaPulitaDizionario([...ESITI_STANDARD, ...interventi.map(i => i.esito)], extraEsiti)),
      listaPriorita: filtraDizionarioRimosso("priorita", listaPulitaDizionario(PRIORITA_STANDARD, extraPriorita)),
      listaCodiciFiltroInterventi: [...new Set(interventi.map(i => i.codice_strumento || i.codicestrumento).filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b), "it", {
        numeric: true,
        sensitivity: "base"
      })),
      listaAnniContabiliInterventi: [...new Set([String(new Date().getFullYear()), ...interventi.map(i => parseDataFMED(i.data_ultimo_intervento || i.data_prossimo_intervento)?.getFullYear()).filter(anno => Number.isFinite(anno)).map(String)])].sort((a, b) => Number(b) - Number(a)),
      listaTipologieFiltroInterventi: [...new Set(interventi.map(i => i.tipologia).filter(Boolean))].sort(),
      listaAttivitaFiltroInterventi: filtraDizionarioRimosso("attivita", listaPulitaAttivita(interventi.map(i => i.attivita), extraAttivita))
    };
  }, [cespiti, interventi, dizionariCoreFmed, extraCategorie, extraPossesso, extraStatiAsset, extraSocieta, extraDitte, extraEsiti, extraPriorita, extraAttivita, filtraDizionarioRimosso]);
  const {
    listaCategorie,
    listaPossesso,
    listaStatiAsset,
    listaSediInterventi,
    listaSocietaInterventi,
    listaDitteEsecutrici,
    listaEsitiInterventi,
    listaPriorita,
    listaCodiciFiltroInterventi,
    listaAnniContabiliInterventi,
    listaTipologieFiltroInterventi,
    listaAttivitaFiltroInterventi
  } = listeDizionariOperativi;
  const listaAttivitaExportInterventi = listaAttivitaFiltroInterventi;
  const attivitaExportIncluse = listaAttivitaExportInterventi.filter(a => !exportAttivitaInterventiEscluse.includes(a));
  function toggleAttivitaExportInterventi(attivita) {
    setExportAttivitaInterventiEscluse(prev => prev.includes(attivita) ? prev.filter(x => x !== attivita) : [...prev, attivita].sort((a, b) => a.localeCompare(b, "it", {
      sensitivity: "base"
    })));
  }
  function selezionaTutteAttivitaExportInterventi() {
    setExportAttivitaInterventiEscluse([]);
  }
  function escludiTutteAttivitaExportInterventi() {
    setExportAttivitaInterventiEscluse(listaAttivitaExportInterventi);
  }
  function codiceExportCespite(record) {
    return String(record?.codicestrumento || record?.codice_strumento || "").trim();
  }
  function toggleCespiteExportInventario(codice) {
    const valore = String(codice || "").trim();
    if (!valore) return;
    setExportCespitiInventarioSelezionati(prev => prev.includes(valore) ? prev.filter(x => x !== valore) : [...prev, valore].sort((a, b) => a.localeCompare(b, "it", {
      numeric: true,
      sensitivity: "base"
    })));
  }
  function toggleCespiteExportInterventi(codice) {
    const valore = String(codice || "").trim();
    if (!valore) return;
    setExportCespitiInterventiSelezionati(prev => prev.includes(valore) ? prev.filter(x => x !== valore) : [...prev, valore].sort((a, b) => a.localeCompare(b, "it", {
      numeric: true,
      sensitivity: "base"
    })));
  }
  function selezionaTuttiCespitiInventario(codici) {
    setExportCespitiInventarioSelezionati([...new Set((codici || []).map(c => String(c || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, "it", {
      numeric: true,
      sensitivity: "base"
    })));
  }
  function selezionaTuttiCespitiInterventi(codici) {
    setExportCespitiInterventiSelezionati([...new Set((codici || []).map(c => String(c || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, "it", {
      numeric: true,
      sensitivity: "base"
    })));
  }
  function toggleColonnaExtraInventario(chiave) {
    setExportInventarioColonneExtra(prev => ({
      ...prev,
      [chiave]: !prev?.[chiave]
    }));
  }
  function resetColonneExtraInventario() {
    setExportInventarioColonneExtra({
      stato: false,
      note: false,
      categoria: false,
      societa: false,
      sede: false,
      locazione: false,
      data_collaudo: false,
      link_documentazione: false,
      prezzo: false,
      data_messa_in_uso: false
    });
  }
  const colonneExtraInventarioDisponibili = [{
    key: "stato",
    label: "Stato"
  }, {
    key: "note",
    label: "Note"
  }, {
    key: "categoria",
    label: "Categoria"
  }, {
    key: "societa",
    label: "Società"
  }, {
    key: "sede",
    label: "Sede"
  }, {
    key: "data_collaudo",
    label: "Data collaudo"
  }, {
    key: "link_documentazione",
    label: "Link documentazione"
  }, {
    key: "prezzo",
    label: "Prezzo"
  }, {
    key: "data_messa_in_uso",
    label: "Data messa in uso"
  }];
  function getCespitiExportInventarioFiltrati() {
    const sedeExport = exportSedeInventario || "TUTTE";
    const statoExport = exportStatoInventario || "TUTTI";
    const categoriaExport = exportCategoriaInventario || "TUTTE";
    const tipologiaExport = exportTipologiaInventario || "TUTTE";
    const costruttoreExport = exportCostruttoreInventario || "TUTTI";
    const repartoExport = exportRepartoInventario || "TUTTI";
    const societaExport = exportSocietaInventario || "TUTTE";
    const locazioneExport = exportLocazioneInventario || "TUTTE";
    const cmpAsset = (a, b, campo) => String(a?.[campo] || "").localeCompare(String(b?.[campo] || ""), "it", {
      numeric: true,
      sensitivity: "base"
    });
    return cespiti.filter(c => filtroSedeExport(c, sedeExport)).filter(c => statoExport === "TUTTI" || normalizzaTestoCodice(statoCespite(c)) === normalizzaTestoCodice(statoExport)).filter(c => categoriaExport === "TUTTE" || normalizeCategoria(c.categoria) === categoriaExport).filter(c => tipologiaExport === "TUTTE" || String(c.tipologia || "") === tipologiaExport).filter(c => costruttoreExport === "TUTTI" || String(c.costruttore || "") === costruttoreExport).filter(c => repartoExport === "TUTTI" || normalizzaTestoCodice(c.reparto) === normalizzaTestoCodice(repartoExport)).filter(c => societaExport === "TUTTE" || normalizzaTestoCodice(c.societa) === normalizzaTestoCodice(societaExport)).filter(c => locazioneExport === "TUTTE" || normalizzaTestoCodice(c.locazione) === normalizzaTestoCodice(locazioneExport)).filter(c => filtroBrancheExport(c, exportBrancheInventario)).sort((a, b) => {
      const codice = String(a.codicestrumento || "").localeCompare(String(b.codicestrumento || ""), "it", {
        numeric: true,
        sensitivity: "base"
      });
      switch (exportOrdineInventario) {
        case "CODICE_DESC":
          return -codice;
        case "SEDE_ASC":
          return cmpAsset(a, b, "sede") || cmpAsset(a, b, "reparto") || cmpAsset(a, b, "locazione") || codice;
        case "REPARTO_ASC":
          return cmpAsset(a, b, "reparto") || cmpAsset(a, b, "locazione") || codice;
        case "LOCAZIONE_ASC":
          return cmpAsset(a, b, "locazione") || cmpAsset(a, b, "reparto") || codice;
        case "TIPOLOGIA_ASC":
          return cmpAsset(a, b, "tipologia") || cmpAsset(a, b, "costruttore") || codice;
        case "COSTRUTTORE_ASC":
          return cmpAsset(a, b, "costruttore") || cmpAsset(a, b, "modello") || codice;
        case "STATO_ASC":
          return String(statoCespite(a)).localeCompare(String(statoCespite(b)), "it", {
            numeric: true,
            sensitivity: "base"
          }) || codice;
        case "CODICE_ASC":
        default:
          return codice;
      }
    });
  }
  function getStatoScadenzaIntervento(i) {
    const dataProssimo = parseDataFMED(i?.data_prossimo_intervento);
    if (!dataProssimo) return "SENZA_SCADENZA";
    const oggi = new Date();
    oggi.setHours(0, 0, 0, 0);
    const limite = new Date(oggi);
    limite.setDate(limite.getDate() + 30);
    limite.setHours(23, 59, 59, 999);
    dataProssimo.setHours(12, 0, 0, 0);
    if (dataProssimo < oggi) return "SCADUTI";
    if (dataProssimo <= limite) return "PROSSIMITA";
    return "NON_SCADUTI";
  }
  function interventoHaProssimaScadenzaValida(i) {
    const dataProssimo = parseDataFMED(i?.data_prossimo_intervento);
    if (!dataProssimo) return false;
    const oggi = new Date();
    oggi.setHours(0, 0, 0, 0);
    dataProssimo.setHours(12, 0, 0, 0);

    // Regola audit FMED: l'export interventi, di default, mostra solo attività ancora valide.
    // Una scadenza è valida se la prossima data è oggi o successiva alla data di esportazione.
    return dataProssimo >= oggi;
  }
  function filtroScadenzaExportInterventi(i) {
    if (exportScadenzaInterventi === "VALIDI") return interventoHaProssimaScadenzaValida(i);
    if (exportScadenzaInterventi === "TUTTI") return true;
    return getStatoScadenzaIntervento(i) === exportScadenzaInterventi;
  }
  function getInterventiExportFiltratiBase() {
    const sediExport = Array.isArray(exportSediInterventi) ? exportSediInterventi : [];
    const sedeExport = exportSedeInterventi || "TUTTE";
    const codiceExport = exportCodiceInterventi || "TUTTI";
    const tipologiaExport = exportTipologiaInterventi || "TUTTE";
    const societaExport = exportSocietaInterventi || "TUTTE";
    const annoExport = exportAnnoInterventi || "TUTTI";
    const dataDa = exportDataInterventiDa ? parseDataFMED(exportDataInterventiDa) : null;
    const dataA = exportDataInterventiA ? parseDataFMED(exportDataInterventiA) : null;
    if (dataDa) dataDa.setHours(0, 0, 0, 0);
    if (dataA) dataA.setHours(23, 59, 59, 999);
    return interventi.filter(i => sediExport.length > 0 ? sediExport.some(s => filtroSedeExport(i, s)) : filtroSedeExport(i, sedeExport)).filter(i => codiceExport === "TUTTI" || String(i.codice_strumento || i.codicestrumento || "") === codiceExport).filter(i => tipologiaExport === "TUTTE" || String(i.tipologia || "") === tipologiaExport).filter(i => societaExport === "TUTTE" || normalizzaSocietaDitta(i.ditta_esecutrice || i.ditta) === societaExport).filter(i => filtroBrancheExport(i, exportBrancheInterventi)).filter(i => filtroScadenzaExportInterventi(i)).filter(i => {
      const attivitaExport = String(i.attivita || "NON SPECIFICATA").trim();
      return !exportAttivitaInterventiEscluse.includes(attivitaExport);
    }).filter(i => {
      const dataUltimo = parseDataFMED(i.data_ultimo_intervento);
      if (!dataUltimo) return annoExport === "TUTTI" && !dataDa && !dataA;
      dataUltimo.setHours(12, 0, 0, 0);
      if (annoExport !== "TUTTI" && String(dataUltimo.getFullYear()) !== String(annoExport)) return false;
      if (dataDa && dataUltimo < dataDa) return false;
      if (dataA && dataUltimo > dataA) return false;
      return true;
    });
  }
  function codiciDaCespitiExportInventario() {
    return [...new Set(getCespitiExportInventarioFiltrati().map(codiceExportCespite).filter(Boolean))].sort((a, b) => a.localeCompare(b, "it", {
      numeric: true,
      sensitivity: "base"
    }));
  }
  function codiciDaInterventiExport() {
    return [...new Set(getInterventiExportFiltratiBase().map(codiceExportCespite).filter(Boolean))].sort((a, b) => a.localeCompare(b, "it", {
      numeric: true,
      sensitivity: "base"
    }));
  }
  function filtraCodiciExport(codici, ricerca) {
    const q = normalizzaTestoCodice(ricerca);
    const lista = Array.isArray(codici) ? codici : [];
    if (!q) return lista;
    return lista.filter(codice => normalizzaTestoCodice(codice).includes(q));
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- la funzione usa esclusivamente le dipendenze primitive elencate.
  const codiciInventarioExport = useMemo(() => codiciDaCespitiExportInventario(), [cespiti, exportSedeInventario, exportStatoInventario, exportCategoriaInventario, exportTipologiaInventario, exportCostruttoreInventario, exportRepartoInventario, exportSocietaInventario, exportLocazioneInventario, exportOrdineInventario, exportBrancheInventario, filtroBrancheExport]);
  const codiciInventarioExportVisibili = useMemo(() => filtraCodiciExport(codiciInventarioExport, exportRicercaCespiteInventarioDeferred), [codiciInventarioExport, exportRicercaCespiteInventarioDeferred]);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- la funzione usa esclusivamente le dipendenze primitive elencate.
  const codiciInterventiExport = useMemo(() => codiciDaInterventiExport(), [interventi, exportSedeInterventi, exportSediInterventi, exportCodiceInterventi, exportTipologiaInterventi, exportSocietaInterventi, exportAnnoInterventi, exportScadenzaInterventi, exportDataInterventiDa, exportDataInterventiA, exportAttivitaInterventiEscluse, exportBrancheInterventi, filtroBrancheExport]);
  const codiciInterventiExportVisibili = useMemo(() => filtraCodiciExport(codiciInterventiExport, exportRicercaCespiteInterventiDeferred), [codiciInterventiExport, exportRicercaCespiteInterventiDeferred]);
  const pulisciLista = valori => [...new Set((Array.isArray(valori) ? valori : []).filter(v => v !== null && v !== undefined && typeof v !== "object").map(v => String(v).trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, "it", {
    numeric: true,
    sensitivity: "base"
  }));
  const listaCodiciStrumentoInterventi = pulisciLista([...cespiti.map(c => c.codicestrumento), ...interventi.map(i => i.codice_strumento || i.codicestrumento)]);
  const listaSediFormInterventi = filtraDizionarioRimosso("sede", deduplicaSediFmed([...etichetteDaDizionario(dizionariCoreFmed, "sedi", SEDI_STANDARD_LIST), ...cespiti.map(c => c.sede), ...interventi.map(i => i.sede), ...extraSedi], true));
  const listaTipologieFormInterventi = filtraDizionarioRimosso("tipologia", listaPulitaDizionario([...cespiti.map(c => c.tipologia), ...interventi.map(i => i.tipologia)], extraTipologie));
  const listaCostruttoriFormInterventi = filtraDizionarioRimosso("costruttore", listaPulitaDizionario([...cespiti.map(c => c.costruttore), ...interventi.map(i => i.costruttore)], extraCostruttori));
  const listaModelliFormInterventi = filtraDizionarioRimosso("modello", listaPulitaDizionario([...cespiti.map(c => c.modello), ...interventi.map(i => i.modello)], extraModelli));
  const listaRepartiFormInterventi = filtraDizionarioRimosso("reparto", listaPulitaDizionario(REPARTI_STANDARD, extraReparti));
  const listaBrancheForm = listaBranche;
  const listaSocietaFormInterventi = useMemo(() => filtraDizionarioRimosso("societa", listaPulitaDizionario([...cespiti.map(c => c.societa), ...interventi.map(i => normalizzaSocietaDitta(i.societa))], extraSocieta)), [cespiti, interventi, extraSocieta, filtraDizionarioRimosso]);

  // Dizionario ditta esecutrice: separato da Società / Committente.
  // Usa solo ditta_esecutrice/ditta + voci aggiunte nel dizionario dedicato.
  const listaDitteEsecutriciFormInterventi = listaDitteEsecutrici;
  const listaPeriodicitaFormInterventi = useMemo(() => pulisciLista([...codiciDaDizionario(dizionariCoreFmed, "periodicita", PERIODICITA_STANDARD.map(p => p.codice)), ...interventi.map(i => i.periodicita)]), [dizionariCoreFmed, interventi]);
  function calcolaDataProssimoIntervento(dataUltimo, periodicita) {
    const elenco = Array.isArray(dizionariCoreFmed?.periodicita) ? dizionariCoreFmed.periodicita.map(p => ({
      codice: p.codice,
      mesi: p.mesi
    })) : PERIODICITA_STANDARD;
    return calcolaProssimaScadenza(dataUltimo, periodicita, elenco);
  }
  function aggiornaFormInterventoConScadenza(form, campo, valore) {
    const aggiornato = {
      ...form,
      [campo]: valore
    };
    if (campo === "data_ultimo_intervento" || campo === "periodicita") {
      const prossima = calcolaDataProssimoIntervento(campo === "data_ultimo_intervento" ? valore : aggiornato.data_ultimo_intervento, campo === "periodicita" ? valore : aggiornato.periodicita);
      if (prossima || campo === "periodicita") aggiornato.data_prossimo_intervento = prossima;
    }
    return aggiornato;
  }
  const listaAttivitaInterventi = listaAttivitaFiltroInterventi;
    const cespitiIndicizzati = useMemo(() => (Array.isArray(cespiti) ? cespiti : []).map(record => {
    const branca = getBrancaAsset(record);
    const stato = statoCespite(record);
    return {
      record,
      searchText: [record.codicestrumento, record.tipologia, record.categoria, record.sede, record.sede_originale, branca, record.reparto, record.locazione, record.costruttore, record.modello, record.matricola, record.societa, record.fornitore, record.note, record.accessori_sistema_primario, stato].filter(Boolean).join(" ").toLowerCase(),
      interventoSearchText: [record.codicestrumento, record.tipologia, record.sede, record.reparto, record.costruttore, record.modello, record.matricola].filter(Boolean).join(" ").toLowerCase(),
      sedeNorm: normalizzaSedePerConfronto(record.sede),
      categoriaNorm: normalizeCategoria(record.categoria),
      brancaNorm: normalizzaTestoCodice(branca),
      locazioneNorm: normalizzaTestoCodice(record.locazione),
      costruttoreNorm: normalizzaTestoCodice(record.costruttore),
      tipologiaNorm: normalizzaTestoCodice(record.tipologia),
      modelloNorm: normalizzaTestoCodice(record.modello),
      societaNorm: normalizzaTestoCodice(record.societa),
      statoNorm: normalizzaTestoCodice(stato)
    };
  }), [cespiti, getBrancaAsset]);
  const filtrati = useMemo(() => {
    if (!paginaRichiedeAssetPesanti) return [];
    const q = String(ricercaDeferred || "").toLowerCase();
    const sedeFiltroNormalizzata = normalizzaSedePerConfronto(sede);
    const repartoNorm = normalizzaTestoCodice(assetRepartoFiltro);
    const locazioneNorm = normalizzaTestoCodice(assetLocazioneFiltro);
    const costruttoreNorm = normalizzaTestoCodice(assetCostruttoreFiltro);
    const tipologiaNorm = normalizzaTestoCodice(assetTipologiaFiltro);
    const modelloNorm = normalizzaTestoCodice(assetModelloFiltro);
    const societaNorm = normalizzaTestoCodice(assetSocietaFiltro);
    const statoNorm = normalizzaTestoCodice(assetStatoFiltro);
    return cespitiIndicizzati.filter(item => (!q || item.searchText.includes(q)) && (sede === "TUTTE" || item.sedeNorm === sedeFiltroNormalizzata) && (categoriaFiltro === "TUTTE" || item.categoriaNorm === categoriaFiltro) && (assetRepartoFiltro === "TUTTI" || item.brancaNorm === repartoNorm) && (assetLocazioneFiltro === "TUTTE" || item.locazioneNorm === locazioneNorm) && (assetCostruttoreFiltro === "TUTTI" || item.costruttoreNorm === costruttoreNorm) && (assetTipologiaFiltro === "TUTTE" || item.tipologiaNorm === tipologiaNorm) && (assetModelloFiltro === "TUTTI" || item.modelloNorm === modelloNorm) && (assetSocietaFiltro === "TUTTE" || item.societaNorm === societaNorm) && (assetStatoFiltro === "TUTTI" || item.statoNorm === statoNorm)).map(item => item.record).sort((a, b) => {
      const cmp = (va, vb) => String(va || "").localeCompare(String(vb || ""), "it", {
        numeric: true,
        sensitivity: "base"
      });
      const codice = cmp(a.codicestrumento, b.codicestrumento);
      switch (ordineCodiceAsset) {
        case "CODICE_DESC":
          return -codice;
        case "SEDE_ASC":
          return cmp(a.sede, b.sede) || cmp(getBrancaAsset(a), getBrancaAsset(b)) || cmp(a.locazione, b.locazione) || codice;
        case "REPARTO_ASC":
          return cmp(getBrancaAsset(a), getBrancaAsset(b)) || cmp(a.locazione, b.locazione) || codice;
        case "LOCAZIONE_ASC":
          return cmp(a.locazione, b.locazione) || cmp(getBrancaAsset(a), getBrancaAsset(b)) || codice;
        case "TIPOLOGIA_ASC":
          return cmp(a.tipologia, b.tipologia) || cmp(a.costruttore, b.costruttore) || codice;
        case "COSTRUTTORE_ASC":
          return cmp(a.costruttore, b.costruttore) || cmp(a.modello, b.modello) || codice;
        case "STATO_ASC":
          return cmp(statoCespite(a), statoCespite(b)) || codice;
        case "CODICE_ASC":
        default:
          return codice;
      }
    });
  }, [paginaRichiedeAssetPesanti, cespitiIndicizzati, ricercaDeferred, sede, categoriaFiltro, assetRepartoFiltro, assetLocazioneFiltro, assetCostruttoreFiltro, assetTipologiaFiltro, assetModelloFiltro, assetSocietaFiltro, assetStatoFiltro, ordineCodiceAsset, getBrancaAsset]);
  const assetKpiFiltrati = useMemo(() => {
    // FMED FASE 6 - KPI Asset calcolati una sola volta dalla lista filtrata.
    // Evita ricalcoli sparsi e rende coerenti contatori, tabella e card.
    const riepilogo = {
      totale: filtrati.length,
      attivi: 0,
      dismessi: 0,
      nonInUso: 0
    };
    filtrati.forEach(c => {
      const stato = statoCespite(c);
      if (stato === "Attivo") riepilogo.attivi += 1;else if (stato === "Dismesso") riepilogo.dismessi += 1;else riepilogo.nonInUso += 1;
    });
    return riepilogo;
  }, [filtrati]);
  const filtratiRenderizzati = useMemo(() => filtrati.slice(0, assetRenderLimit), [filtrati, assetRenderLimit]);
  const raggruppaAssetFiltrati = (lista, keyFn, limite = 8) => {
    const gruppi = {};
    (Array.isArray(lista) ? lista : []).forEach(c => {
      const chiave = String(keyFn(c) || "NON SPECIFICATO").trim() || "NON SPECIFICATO";
      gruppi[chiave] = (gruppi[chiave] || 0) + 1;
    });
    return Object.entries(gruppi).map(([nome, totale]) => ({
      nome,
      totale
    })).sort((a, b) => b.totale - a.totale || a.nome.localeCompare(b.nome, "it", {
      sensitivity: "base"
    })).slice(0, limite);
  };
  const assetPerRepartoFiltrati = useMemo(() => raggruppaAssetFiltrati(filtrati, c => getBrancaAsset(c)), [filtrati, getBrancaAsset]);
  const assetPerCostruttoreFiltrati = useMemo(() => raggruppaAssetFiltrati(filtrati, c => c.costruttore), [filtrati]);
  const assetPerSedeFiltrati = useMemo(() => raggruppaAssetFiltrati(filtrati, c => normalizzaSedeDisplay(c.sede)), [filtrati]);
  const assetPerStatoFiltrati = useMemo(() => raggruppaAssetFiltrati(filtrati, c => statoCespite(c)), [filtrati]);
  const cespitiPerNuovoIntervento = useMemo(() => {
    const q = ricercaCespiteInterventoDeferred.trim().toLowerCase();
    if (!q) return [];
    return cespitiIndicizzati.filter(item => item.interventoSearchText.includes(q)).slice(0, 12).map(item => item.record);
  }, [cespitiIndicizzati, ricercaCespiteInterventoDeferred]);
  function dataNelRange(data, da, a) {
    const dataParsed = parseDataFMED(data);
    if (!da && !a) return true;
    if (!dataParsed) return false;
    dataParsed.setHours(0, 0, 0, 0);
    if (da) {
      const dataDa = parseDataFMED(da);
      if (dataDa) {
        dataDa.setHours(0, 0, 0, 0);
        if (dataParsed < dataDa) return false;
      }
    }
    if (a) {
      const dataA = parseDataFMED(a);
      if (dataA) {
        dataA.setHours(0, 0, 0, 0);
        if (dataParsed > dataA) return false;
      }
    }
    return true;
  }
  function normalizzaNumeroCosto(valore) {
    if (valore === null || valore === undefined || valore === "") return 0;
    if (typeof valore === "number") return Number.isFinite(valore) ? valore : 0;
    let testo = String(valore).trim().replace(/€/g, "").replace(/\s/g, "");
    if (!testo) return 0;

    // Gestione formato italiano: 1.234,56
    if (testo.includes(",") && testo.includes(".")) {
      testo = testo.replace(/\./g, "").replace(",", ".");
    } else if (testo.includes(",")) {
      testo = testo.replace(",", ".");
    }
    const numero = Number(testo);
    return Number.isFinite(numero) ? numero : 0;
  }
  function valoreCostoIntervento(intervento = {}) {
    const campiCosto = [intervento?.costo, intervento?.importo_extra, intervento?.Costo, intervento?.COSTO, intervento?.Importo, intervento?.IMPORTO, intervento?.importo, intervento?.totale, intervento?.Totale, intervento?.TOTALE, intervento?.prezzo, intervento?.Prezzo, intervento?.PREZZO, intervento?.spesa, intervento?.Spesa, intervento?.SPESA];
    for (const valore of campiCosto) {
      const numero = normalizzaNumeroCosto(valore);
      if (numero > 0) return numero;
    }
    return 0;
  }
  function importoIntervento(intervento) {
    return valoreCostoIntervento(intervento);
  }
  function formatCurrency(valore) {
    return normalizzaNumeroCosto(valore).toLocaleString("it-IT", {
      style: "currency",
      currency: "EUR"
    });
  }
    function getRangePeriodoContabile(anno, periodo, dataDa, dataA) {
    if (periodo === "PERSONALIZZATO") {
      return {
        da: dataDa ? parseDataFMED(dataDa) : null,
        a: dataA ? parseDataFMED(dataA) : null
      };
    }
    const annoNumero = Number(anno);
    if (!Number.isFinite(annoNumero)) return {
      da: null,
      a: null
    };
    const range = {
      ANNO: [0, 1, 11, 31],
      T1: [0, 1, 2, 31],
      T2: [3, 1, 5, 30],
      T3: [6, 1, 8, 30],
      T4: [9, 1, 11, 31],
      S1: [0, 1, 5, 30],
      S2: [6, 1, 11, 31]
    }[periodo || "ANNO"];
    if (!range) return {
      da: null,
      a: null
    };
    const [meseDa, giornoDa, meseA, giornoA] = range;
    return {
      da: new Date(annoNumero, meseDa, giornoDa),
      a: new Date(annoNumero, meseA, giornoA)
    };
  }
  function interventoNelPeriodoContabile(intervento) {
    const data = parseDataFMED(intervento?.data_ultimo_intervento || intervento?.data_prossimo_intervento);
    if (!data) return false;
    const {
      da,
      a
    } = getRangePeriodoContabile(filtroInterventiAnnoContabile, filtroInterventiPeriodoContabile, filtroInterventiPeriodoDa, filtroInterventiPeriodoA);
    data.setHours(0, 0, 0, 0);
    if (da) {
      da.setHours(0, 0, 0, 0);
      if (data < da) return false;
    }
    if (a) {
      a.setHours(0, 0, 0, 0);
      if (data > a) return false;
    }
    return true;
  }
  function labelPeriodoContabileInterventi() {
    if (filtroInterventiPeriodoContabile === "PERSONALIZZATO") {
      const da = filtroInterventiPeriodoDa ? formattaData(filtroInterventiPeriodoDa) : "inizio";
      const a = filtroInterventiPeriodoA ? formattaData(filtroInterventiPeriodoA) : "fine";
      return `Periodo personalizzato: ${da} - ${a}`;
    }
    const labels = {
      ANNO: "Tutto l'anno",
      T1: "1° trimestre",
      T2: "2° trimestre",
      T3: "3° trimestre",
      T4: "4° trimestre",
      S1: "1° semestre",
      S2: "2° semestre"
    };
    return `${labels[filtroInterventiPeriodoContabile] || "Tutto l'anno"} ${filtroInterventiAnnoContabile}`;
  }
  function resetFiltriInterventi() {
    setFiltroInterventiSede("TUTTE");
    setFiltroInterventiSocieta("TUTTE");
    setFiltroInterventiCodice("TUTTE");
    setFiltroInterventiTipologia("TUTTE");
    setFiltroInterventiAttivita("TUTTE");
    setFiltroInterventiUltimoDa("");
    setFiltroInterventiUltimoA("");
    setFiltroInterventiProssimoDa("");
    setFiltroInterventiProssimoA("");
    setFiltroInterventiAnnoContabile(String(new Date().getFullYear()));
    setFiltroInterventiPeriodoContabile("ANNO");
    setFiltroInterventiPeriodoDa("");
    setFiltroInterventiPeriodoA("");
    setOrdineInterventi("RECENTI");
  }
  function esportaInterventiFiltratiPdf() {
    const righe = interventiFiltrati.map(i => ({
      codice: i.codice_strumento || i.codicestrumento || "-",
      sede: i.sede || "-",
      societa: normalizzaSocietaDitta(i.ditta_esecutrice || i.ditta || ""),
      tipologia: i.tipologia || "-",
      attivita: i.attivita || "-",
      ultimo: formattaData(i.data_ultimo_intervento),
      prossimo: formattaData(i.data_prossimo_intervento),
      costo: formatCurrency(i.costo || i.importo_extra || 0)
    }));
    if (righe.length === 0) {
      alert("Nessun intervento da esportare con i filtri attuali.");
      return;
    }
        const htmlRighe = righe.map(r => `
      <tr>
        <td>${r.codice}</td>
        <td>${r.sede}</td>
        <td>${r.societa}</td>
        <td>${r.tipologia}</td>
        <td>${r.attivita}</td>
        <td>${r.ultimo}</td>
        <td>${r.prossimo}</td>
        <td>${r.costo}</td>
      </tr>
    `).join("");
        const finestra = window.open("", "_blank");
    if (!finestra) {
      alert("Popup bloccato dal browser. Abilita i popup per esportare il PDF.");
      return;
    }
    finestra.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>Export Interventi</title>
          <style>
            @page { size: A4 landscape; margin: 10mm; }
            body {
              margin: 0;
              font-family: "Arial Nova Light", "Arial Nova", Arial, sans-serif;
              background: #f4f7fb;
              color: #0E1B42;
            }
            .header {
              background: linear-gradient(135deg, #00194d 0%, #002f7a 55%, #004c99 100%);
              color: white;
              padding: 30px 38px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-radius: 0 0 26px 26px;
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
              color: white;
            }
            .header p {
              margin: 8px 0 0;
              font-size: 12px;
              color: #dceaff;
              max-width: 760px;
              line-height: 1.45;
            }
            .logoBox {
              width: 108px;
              height: 82px;
              border-radius: 10px;
              background: rgba(255,255,255,.96);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 6px;
              box-shadow: 0 8px 24px rgba(0,0,0,.18);
              flex: 0 0 auto;
            }
            .logo {
              width: 100%;
              height: 100%;
              object-fit: contain;
              display: block;
            }
            .summary {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 12px;
              margin: 18px 24px;
            }
            .card {
              background: white;
              border: 1px solid #d9e6f5;
              border-radius: 15px;
              padding: 13px 15px;
              box-shadow: 0 8px 22px rgba(14, 27, 66, 0.08);
            }
            .label {
              font-size: 10px;
              color: #5f6f89;
              text-transform: uppercase;
              letter-spacing: .5px;
            }
            .value {
              margin-top: 5px;
              font-size: 22px;
              font-weight: 400;
              color: #00194d;
            }
            table {
              width: calc(100% - 48px);
              margin: 6px 24px 0;
              border-collapse: collapse;
              background: white;
              border-radius: 15px;
              overflow: hidden;
              box-shadow: 0 8px 22px rgba(14, 27, 66, 0.08);
              font-size: 9px;
            }
            th {
              background: #3F4642;
              color: white;
              text-align: left;
              padding: 8px 6px;
              font-weight: 400;
            }
            td {
              padding: 8px 6px;
              border-bottom: 1px solid #e5edf7;
              vertical-align: middle;
              text-align: left;
              line-height: 1.25;
              word-break: break-word;
            }
            tr:nth-child(even) td { background: #f8fbff; }
            .footer {
              margin: 16px 24px 0;
              font-size: 10px;
              color: #61718a;
            }

            /* FMED PRINT STANDARD - ripete intestazioni tabella su ogni pagina PDF */
            thead {
              display: table-header-group;
            }
            tfoot {
              display: table-footer-group;
            }
            table {
              page-break-inside: auto;
              break-inside: auto;
            }
            tr {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            th {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @media print {
              thead {
                display: table-header-group;
              }
              tfoot {
                display: table-footer-group;
              }
              tr {
                page-break-inside: avoid;
                break-inside: avoid;
              }
              .header, th {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
  

            /* FMED PRINT STANDARD - ripete intestazioni tabella su ogni pagina PDF */
            thead {
              display: table-header-group;
            }
            tfoot {
              display: table-footer-group;
            }
            table {
              page-break-inside: auto;
              break-inside: auto;
            }
            tr {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            th {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @media print {
              thead {
                display: table-header-group;
              }
              tfoot {
                display: table-footer-group;
              }
              tr {
                page-break-inside: avoid;
                break-inside: avoid;
              }
              .header, th {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
        </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>Storico interventi degli ultimi 12 mesi, ordinato per data ultimo intervento dalla più recente alla meno recente.</h1>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Codice</th>
                <th>Sede</th>
                <th>Ditta esecutrice</th>
                <th>Tipologia</th>
                <th>Attività</th>
                <th>Ultimo intervento</th>
                <th>Prossimo intervento</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>${htmlRighe}</tbody>
          </table>

          
        </body>
      </html>
    `);
    finestra.document.close();
    finestra.focus();
    setTimeout(() => finestra.print(), 500);
  }
  const riepilogoCostiDashboard = useMemo(() => {
    const totaleSpesa = (Array.isArray(interventi) ? interventi : []).reduce((totale, intervento) => totale + importoIntervento(intervento), 0);
    const interventiConCosto = (Array.isArray(interventi) ? interventi : []).filter(intervento => importoIntervento(intervento) > 0).length;
    return {
      totaleSpesaDashboard: totaleSpesa,
      interventiConCostoDashboard: interventiConCosto
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps -- importoIntervento è helper puro e stabile rispetto all’elenco interventi.
  }, [interventi]);
  const {
    totaleSpesaDashboard,
    interventiConCostoDashboard
  } = riepilogoCostiDashboard;
  const fmedAuditQualitaDati = useMemo(() => {
    const listaCespiti = Array.isArray(cespiti) ? cespiti : [];
    const listaInterventi = Array.isArray(interventi) ? interventi : [];
    const contaVuoti = (lista, getter) => lista.reduce((totale, record) => {
      const valore = getter(record);
      return totale + (String(valore ?? "").trim() ? 0 : 1);
    }, 0);
    const assetSenzaBranca = contaVuoti(listaCespiti, c => c.branca_medica || c.branca || c.reparto);
    const assetSenzaLocazione = contaVuoti(listaCespiti, c => getLocazioneFmed(c));
    const assetSenzaMatricola = contaVuoti(listaCespiti, c => c.matricola);
    const assetSenzaModello = contaVuoti(listaCespiti, c => c.modello);
    const assetSenzaCostruttore = contaVuoti(listaCespiti, c => c.costruttore);
    const assetSenzaSharePoint = contaVuoti(listaCespiti, c => c.link_documento || c.link_sharepoint || c.linkDocumentazione);
    const interventiSenzaBranca = contaVuoti(listaInterventi, i => i.branca_medica || i.branca || i.reparto);
    const interventiSenzaLocazione = contaVuoti(listaInterventi, i => getLocazioneFmed(i));
    const anomalieTotali = assetSenzaBranca + assetSenzaLocazione + assetSenzaMatricola + assetSenzaModello + assetSenzaCostruttore + assetSenzaSharePoint + interventiSenzaBranca + interventiSenzaLocazione;
    const controlliPossibili = Math.max(1, listaCespiti.length * 6 + listaInterventi.length * 2);
    const indiceQualita = Math.max(0, Math.round(100 - anomalieTotali / controlliPossibili * 100));
    const righe = [{
      sezione: "ASSET",
      controllo: "ASSET SENZA BRANCA",
      valore: assetSenzaBranca,
      totale: listaCespiti.length,
      priorita: assetSenzaBranca ? "ALTA" : "OK"
    }, {
      sezione: "ASSET",
      controllo: "ASSET SENZA LOCAZIONE",
      valore: assetSenzaLocazione,
      totale: listaCespiti.length,
      priorita: assetSenzaLocazione ? "ALTA" : "OK"
    }, {
      sezione: "ASSET",
      controllo: "ASSET SENZA MATRICOLA",
      valore: assetSenzaMatricola,
      totale: listaCespiti.length,
      priorita: assetSenzaMatricola ? "MEDIA" : "OK"
    }, {
      sezione: "ASSET",
      controllo: "ASSET SENZA MODELLO",
      valore: assetSenzaModello,
      totale: listaCespiti.length,
      priorita: assetSenzaModello ? "MEDIA" : "OK"
    }, {
      sezione: "ASSET",
      controllo: "ASSET SENZA COSTRUTTORE",
      valore: assetSenzaCostruttore,
      totale: listaCespiti.length,
      priorita: assetSenzaCostruttore ? "MEDIA" : "OK"
    }, {
      sezione: "SHAREPOINT",
      controllo: "ASSET SENZA LINK DOCUMENTALE",
      valore: assetSenzaSharePoint,
      totale: listaCespiti.length,
      priorita: assetSenzaSharePoint ? "MEDIA" : "OK"
    }, {
      sezione: "INTERVENTI",
      controllo: "INTERVENTI SENZA BRANCA",
      valore: interventiSenzaBranca,
      totale: listaInterventi.length,
      priorita: interventiSenzaBranca ? "MEDIA" : "OK"
    }, {
      sezione: "INTERVENTI",
      controllo: "INTERVENTI SENZA LOCAZIONE",
      valore: interventiSenzaLocazione,
      totale: listaInterventi.length,
      priorita: interventiSenzaLocazione ? "MEDIA" : "OK"
    }];
    return {
      indiceQualita,
      anomalieTotali,
      assetSenzaBranca,
      assetSenzaLocazione,
      assetSenzaSharePoint,
      interventiSenzaBranca,
      righe
    };
  }, [cespiti, interventi]);
  function exportAuditQualitaDatiFmed() {
    scaricaExcelFmed({
      nomeFile: `FMED_AUDIT_QUALITA_DATI_${new Date().toISOString().slice(0, 10)}.xls`,
      titolo: "FMED · Audit qualità dati",
      sottotitolo: "Controllo anomalie operative su asset, interventi, branche, locazioni e documentazione.",
      meta: [`Indice qualità dati: ${fmedAuditQualitaDati.indiceQualita}%`, `Anomalie totali: ${fmedAuditQualitaDati.anomalieTotali}`, `Asset: ${(Array.isArray(cespiti) ? cespiti.length : 0).toLocaleString("it-IT")}`, `Interventi: ${(Array.isArray(interventi) ? interventi.length : 0).toLocaleString("it-IT")}`],
      colonne: [{
        label: "Sezione",
        value: r => r.sezione
      }, {
        label: "Controllo",
        value: r => r.controllo
      }, {
        label: "Anomalie",
        value: r => r.valore
      }, {
        label: "Totale record",
        value: r => r.totale
      }, {
        label: "Percentuale",
        value: r => r.totale ? `${Math.round(r.valore / r.totale * 100)}%` : "0%"
      }, {
        label: "Priorità",
        value: r => r.priorita
      }],
      righe: fmedAuditQualitaDati.righe
    });
  }
  const interventiFiltrati = useMemo(() => {
    if (!paginaRichiedeInterventiPesanti) return [];
    const sedeFiltroNormalizzata = normalizzaSedePerConfronto(filtroInterventiSede);
    return interventi.filter(i => {
      // FMED FASE 7 - Interventi: filtro professionale e robusto.
      // Manteniamo la logica esistente, ma normalizziamo sedi/ditte/attività
      // per evitare esclusioni dovute a differenze di maiuscole, accenti o formato sede.
      const codiceIntervento = String(i.codice_strumento || i.codicestrumento || "").trim();
      const societaIntervento = normalizzaSocietaDitta(i.ditta_esecutrice || i.ditta || "");
      const tipologiaIntervento = String(i.tipologia || "").trim();
      const attivitaIntervento = normalizzaAttivitaIntervento(i.attivita || "");
      const sedeInterventoNormalizzata = normalizzaSedePerConfronto(i.sede || i.sede_originale || "");
      return (filtroInterventiCodice === "TUTTE" || codiceIntervento === filtroInterventiCodice) && (filtroInterventiSede === "TUTTE" || sedeInterventoNormalizzata === sedeFiltroNormalizzata) && (filtroInterventiSocieta === "TUTTE" || societaIntervento === filtroInterventiSocieta) && (filtroInterventiTipologia === "TUTTE" || tipologiaIntervento === filtroInterventiTipologia) && (filtroInterventiAttivita === "TUTTE" || attivitaIntervento === filtroInterventiAttivita) && interventoNelPeriodoContabile(i) && dataNelRange(i.data_ultimo_intervento, filtroInterventiUltimoDa, filtroInterventiUltimoA) && dataNelRange(i.data_prossimo_intervento, filtroInterventiProssimoDa, filtroInterventiProssimoA);
    }).sort((a, b) => {
      const dataA = parseDataFMED(a.data_ultimo_intervento || a.data_prossimo_intervento) || new Date(0);
      const dataB = parseDataFMED(b.data_ultimo_intervento || b.data_prossimo_intervento) || new Date(0);
      return ordineInterventi === "RECENTI" ? dataB - dataA : dataA - dataB;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps -- interventoNelPeriodoContabile dipende dagli stessi filtri già elencati.
  }, [paginaRichiedeInterventiPesanti, interventi, filtroInterventiCodice, filtroInterventiSede, filtroInterventiSocieta, filtroInterventiTipologia, filtroInterventiAttivita, filtroInterventiUltimoDa, filtroInterventiUltimoA, filtroInterventiProssimoDa, filtroInterventiProssimoA, filtroInterventiAnnoContabile, filtroInterventiPeriodoContabile, filtroInterventiPeriodoDa, filtroInterventiPeriodoA, ordineInterventi]);
    const interventiFiltratiRenderizzati = useMemo(() => interventiFiltrati.slice(0, interventiRenderLimit), [interventiFiltrati, interventiRenderLimit]);
  const riepilogoCostiInterventi = useMemo(() => {
    if (!paginaRichiedeInterventiPesanti) {
      return {
        totaleSpesaInterventiFiltrati: 0,
        codiciCoinvoltiInterventi: new Set(),
        ditteCoinvolteInterventi: new Set(),
        costoMedioInterventoFiltrato: 0,
        classificaCostiPerDitta: [],
        classificaCostiPerSede: [],
        classificaCostiPerCespite: [],
        classificaCostiPerAttivita: []
      };
    }
    const totaleSpesa = interventiFiltrati.reduce((totale, intervento) => totale + importoIntervento(intervento), 0);
    const codiciCoinvolti = new Set(interventiFiltrati.map(i => i.codice_strumento || i.codicestrumento).filter(Boolean));
    const ditteCoinvolte = new Set(interventiFiltrati.map(i => normalizzaSocietaDitta(i.ditta_esecutrice || i.ditta)).filter(Boolean));
    return {
      totaleSpesaInterventiFiltrati: totaleSpesa,
      codiciCoinvoltiInterventi: codiciCoinvolti,
      ditteCoinvolteInterventi: ditteCoinvolte,
      costoMedioInterventoFiltrato: interventiFiltrati.length > 0 ? totaleSpesa / interventiFiltrati.length : 0,
      classificaCostiPerDitta: raggruppaCostiInterventi(interventiFiltrati, i => normalizzaSocietaDitta(i.ditta_esecutrice || i.ditta)),
      classificaCostiPerSede: raggruppaCostiInterventi(interventiFiltrati, i => i.sede || "NON SPECIFICATA"),
      classificaCostiPerCespite: raggruppaCostiInterventi(interventiFiltrati, i => i.codice_strumento || i.codicestrumento || "NON SPECIFICATO"),
      classificaCostiPerAttivita: raggruppaCostiInterventi(interventiFiltrati, i => normalizzaAttivitaIntervento(i.attivita || "NON SPECIFICATA"))
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps -- importoIntervento è helper puro; interventiFiltrati è la sorgente completa.
  }, [paginaRichiedeInterventiPesanti, interventiFiltrati]);
  const {
    totaleSpesaInterventiFiltrati,
    codiciCoinvoltiInterventi,
    ditteCoinvolteInterventi,
    costoMedioInterventoFiltrato,
    classificaCostiPerDitta,
    classificaCostiPerSede,
    classificaCostiPerCespite,
    classificaCostiPerAttivita
  } = riepilogoCostiInterventi;
  const puliziaSocietaDitte = useMemo(() => {
    if (!paginaCostiAttiva) return [];
    return Object.values(interventi.reduce((acc, i) => {
      const originale = String(i.societa || i.ditta || "").trim();
      if (!originale) return acc;
      const standard = normalizzaSocietaDitta(originale);
      const chiave = `${standard}|||${originale}`;
      if (!acc[chiave]) {
        acc[chiave] = {
          originale,
          standard,
          occorrenze: 0
        };
      }
      acc[chiave].occorrenze += 1;
      return acc;
    }, {})).sort((a, b) => a.standard.localeCompare(b.standard, "it", {
      sensitivity: "base"
    }) || b.occorrenze - a.occorrenze);
  }, [paginaCostiAttiva, interventi]);
  const puliziaSocietaDaCorreggere = useMemo(() => puliziaSocietaDitte.filter(r => pulisciValoreDizionario(r.originale) !== pulisciValoreDizionario(r.standard)), [puliziaSocietaDitte]);
  const scadenzeFiltrate = useMemo(() => {
    // E5.2: il backend è l'unica fonte dello scadenziario operativo globale.
    // Asset, infrastrutture e 81/08 condividono la stessa regola di sostituzione.
    return Array.isArray(scadenze) ? scadenze : [];
  }, [scadenze]);
  const scadenzeConStatoBase = useMemo(() => {
    // Il backend ha già escluso cicli annullati, non applicabili e sostituiti.
    return (Array.isArray(scadenzeFiltrate) ? scadenzeFiltrate : []).map(s => {
      const data = s._dataScadenza || s.data_prossimo_intervento || s.prossima_scadenza || s.data_scadenza;
      return {
        ...s,
        sede_originale: s.sede_originale || s.sede || "",
        sede: normalizzaSedeDisplay(s.sede || s.sede_originale || ""),
        _dataScadenza: data,
        _statoScadenza: s._statoScadenza || statoScadenza(data)
      };
    }).sort((a, b) => {
      const da = parseDataFMED(a._dataScadenza) || new Date(8640000000000000);
      const db = parseDataFMED(b._dataScadenza) || new Date(8640000000000000);
      return da - db;
    });
  }, [scadenzeFiltrate]);
  const listaModuliFiltroScadenze = pulisciLista(scadenzeConStatoBase.map(s => s.modulo));
  const listaCodiciFiltroScadenze = pulisciLista(scadenzeConStatoBase.map(s => s.codice_strumento || s.codicestrumento));
  const listaSediFiltroScadenze = deduplicaSediFmed(scadenzeConStatoBase.map(s => s.sede), true);
  const listaTipologieFiltroScadenze = pulisciLista(scadenzeConStatoBase.map(s => s.tipologia));
  const listaAttivitaFiltroScadenze = pulisciLista(scadenzeConStatoBase.map(s => normalizzaAttivitaIntervento(s.attivita || "")));
  const listaDitteFiltroScadenze = pulisciLista(scadenzeConStatoBase.map(s => normalizzaSocietaDitta(s.ditta_esecutrice || s.ditta)));
  function resetFiltriScadenze() {
    setFiltroScadenze("TUTTE");
    setFiltroScadenzeModulo("TUTTI");
    setFiltroScadenzeCodice("TUTTE");
    setFiltroScadenzeSede("TUTTE");
    setFiltroScadenzeTipologia("TUTTE");
    setFiltroScadenzeAttivita("TUTTE");
    setFiltroScadenzeDitta("TUTTE");
    setFiltroScadenzeProssimaDa("");
    setFiltroScadenzeProssimaA("");
    setOrdineScadenze("SCADENZA_ASC");
  }
  useEffect(() => {
    // Vista principale Scadenze: consentiamo tutti gli stati.
    // I KPI indicano l'urgenza, la tabella resta il piano manutentivo completo filtrabile.
    const statiAmmessi = ["TUTTE", "SCADUTA", "30_GIORNI", "60_GIORNI", "REGOLARE", "DA_PIANIFICARE", "NON_DISPONIBILE"];
    if (paginaScadenzeAttiva && !statiAmmessi.includes(filtroScadenze)) {
      setFiltroScadenze("TUTTE");
    }
  }, [paginaScadenzeAttiva, filtroScadenze]);
  const scadenzeConStato = useMemo(() => {
    // FIX EXPORT SCADENZE: i filtri devono valere anche dalla pagina Export,
    // non solo quando la pagina attiva è Scadenze. Prima, su Export,
    // Pindaro/AXA veniva ignorato e l'esportazione prendeva tutte le righe.
    return scadenzeConStatoBase.filter(s => {
      const codice = s.codice_strumento || s.codicestrumento || "";
      const ditta = normalizzaSocietaDitta(s.ditta_esecutrice || s.ditta || "");
      const attivita = normalizzaAttivitaIntervento(s.attivita || "");
      return (filtroScadenze === "TUTTE" || s._statoScadenza.codice === filtroScadenze) && (filtroScadenzeModulo === "TUTTI" || s.modulo === filtroScadenzeModulo) && (filtroScadenzeCodice === "TUTTE" || codice === filtroScadenzeCodice) && (filtroScadenzeSede === "TUTTE" || normalizzaSedePerConfronto(s.sede) === normalizzaSedePerConfronto(filtroScadenzeSede)) && (filtroScadenzeTipologia === "TUTTE" || s.tipologia === filtroScadenzeTipologia) && (filtroScadenzeAttivita === "TUTTE" || attivita === filtroScadenzeAttivita) && (filtroScadenzeDitta === "TUTTE" || ditta === filtroScadenzeDitta) && dataNelRange(s._dataScadenza, filtroScadenzeProssimaDa, filtroScadenzeProssimaA);
    }).sort((a, b) => {
      const dataA = a._dataScadenzaParsed || parseDataFMED(a._dataScadenza) || new Date(8640000000000000);
      const dataB = b._dataScadenzaParsed || parseDataFMED(b._dataScadenza) || new Date(8640000000000000);
      const codiceA = String(a.codice_strumento || a.codicestrumento || "");
      const codiceB = String(b.codice_strumento || b.codicestrumento || "");
      if (ordineScadenze === "SCADENZA_DESC") return dataB - dataA;
      if (ordineScadenze === "CODICE_ASC") {
        return codiceA.localeCompare(codiceB, "it", {
          numeric: true,
          sensitivity: "base"
        });
      }
      if (ordineScadenze === "CODICE_DESC") {
        return codiceB.localeCompare(codiceA, "it", {
          numeric: true,
          sensitivity: "base"
        });
      }
      return dataA - dataB;
    });
  }, [scadenzeConStatoBase, filtroScadenze, filtroScadenzeModulo, filtroScadenzeCodice, filtroScadenzeSede, filtroScadenzeTipologia, filtroScadenzeAttivita, filtroScadenzeDitta, filtroScadenzeProssimaDa, filtroScadenzeProssimaA, ordineScadenze]);
  const scadenzeScadute = scadenzeConStatoBase.filter(s => s._statoScadenza.codice === "SCADUTA");
  const scadenzeImminenti = scadenzeConStatoBase.filter(s => s._statoScadenza.codice === "30_GIORNI");
    const scadenzeVisualizzate = scadenzeConStato;
  const scadenzeRenderizzate = useMemo(() => scadenzeVisualizzate.slice(0, scadenzeRenderLimit), [scadenzeVisualizzate, scadenzeRenderLimit]);
  function chiaveScadenzaExport(s) {
    return [s.modulo || "", s.record_id || "", s.famiglia_codice || "", s.codice_strumento || s.codicestrumento || "", s.sede || "", s.tipologia || "", s.attivita || "", s.ditta_esecutrice || s.ditta || "", formattaData(s._dataUltimoIntervento || s.data_ultimo_intervento), formattaData(s._dataScadenza || s.data_prossimo_intervento || s.prossima_scadenza || s.data_scadenza)].join("|");
  }
  const chiaviScadenzeVisualizzate = scadenzeVisualizzate.map(s => chiaveScadenzaExport(s));
  const scadenzeSelezionateVisualizzate = scadenzeVisualizzate.filter(s => scadenzeSelezionateExport.includes(chiaveScadenzaExport(s)));
  function selezionaTutteScadenzeVisualizzate() {
    setScadenzeSelezionateExport(chiaviScadenzeVisualizzate);
  }
  function deselezionaTutteScadenze() {
    setScadenzeSelezionateExport([]);
  }
  function toggleScadenzaExport(s) {
    const chiave = chiaveScadenzaExport(s);
    setScadenzeSelezionateExport(prev => prev.includes(chiave) ? prev.filter(x => x !== chiave) : [...prev, chiave]);
  }
  async function apriSchedaCespite(c) {
    const codiceOriginale = String(c?.codicestrumento || "").trim();
    const codiceUrl = encodeURIComponent(codiceOriginale);
    const cespiteConStato = {
      ...c,
      stato_asset: statoCespite(c)
    };
    setCespiteSelezionato(cespiteConStato);
    setFormCespite(cespiteConStato);
    setModificaCespite(false);
    setModificaLinkDoc(false);
    setOcrTarghettaEsito(null);
    setOcrTarghettaLoading(false);
    setOcrAccessorioEsito(null);
    setOcrAccessorioLoading(false);
    const chiaveLink = chiaveCodiceCespite(codiceOriginale);
    setLinkDocInput(c?.link_documento || linkManualiDocumentazione[chiaveLink] || DOCUMENTAZIONE_CESPITI_PREDEFINITA[chiaveLink] || c?.link_documentazione || c?.link_sharepoint || "");
    setInterventiCespite([]);
    setStoricoCespiteOpen(false);
    setStoricoFiltroTesto("");
    setStoricoFiltroAttivita("TUTTE");
    setStoricoFiltroDitta("TUTTE");
    setAnalisiCespite(analisiNonDisponibile(codiceOriginale));
    setSchedaCespiteLoading(true);
    try {
      const [storico, analisi] = await Promise.all([caricaJsonDaApi(`/interventi-cespite/${codiceUrl}`, []), caricaJsonDaApi(`/analisi/${codiceUrl}`, analisiNonDisponibile(codiceOriginale))]);
      setInterventiCespite(Array.isArray(storico) ? storico.map(normalizzaInterventoDaApi) : []);
      setAnalisiCespite(analisi && typeof analisi === "object" ? analisi : analisiNonDisponibile(codiceOriginale));
    } catch (err) {
      console.error("Errore caricamento scheda cespite:", err);
      setInterventiCespite([]);
      setAnalisiCespite(analisiNonDisponibile(codiceOriginale));
    } finally {
      setSchedaCespiteLoading(false);
    }
  }
  async function apriSchedaDaCodice(codice) {
    const codicePulito = String(codice || "").trim();
    if (!codicePulito) {
      alert("Codice cespite non disponibile");
      return;
    }
    const dataset = assetLoaded ? cespiti : await caricaCespitiOnDemand();
    const cespite = (Array.isArray(dataset) ? dataset : []).find(c => String(c.codicestrumento || "").trim() === codicePulito);
    if (cespite) {
      apriSchedaCespite(cespite);
    } else {
      alert(`Cespite ${codicePulito} non trovato nel censimento`);
    }
  }
  async function salvaModificheCespite() {
    if (!cespiteSelezionato?.codicestrumento) {
      alert("Nessun cespite selezionato");
      return;
    }
    const codice = String(cespiteSelezionato.codicestrumento || "").trim();
    const codiceNuovo = String(formCespite.codicestrumento || "").trim();
    if (!codiceNuovo) {
      alert("Il codice inventario / strumento non può essere vuoto.");
      return;
    }
    const codiceCambiato = codiceNuovo !== codice;
    const codiceDuplicato = (Array.isArray(cespiti) ? cespiti : []).some(c => {
      const codiceRiga = String(c?.codicestrumento || c?.codice_strumento || c?.codice || "").trim();
      return codiceRiga === codiceNuovo && codiceRiga !== codice;
    });
    if (codiceDuplicato) {
      alert(`Il codice ${codiceNuovo} è già presente in inventario. Usa un codice diverso.`);
      return;
    }
    if (codiceCambiato) {
      const confermaCambioCodice = window.confirm(`Stai modificando il codice inventario da ${codice} a ${codiceNuovo}.\n\nConfermi la modifica?`);
      if (!confermaCambioCodice) return;
    }
    const codiceUrl = encodeURIComponent(codice);
    const datiStato = datiStatoPerSalvataggio(formCespite.stato_asset);
    const datiDaSalvare = {
      ...datiStato,
      codicestrumento: codiceNuovo,
      codice_strumento: codiceNuovo,
      tipologia: formCespite.tipologia || null,
      costruttore: formCespite.costruttore || null,
      modello: formCespite.modello || null,
      matricola: formCespite.matricola || null,
      societa: formCespite.societa || null,
      locazione: formCespite.locazione || null,
      categoria: formCespite.categoria || null,
      possesso: formCespite.possesso || null,
      anno_di_fabbricazione: formCespite.anno_di_fabbricazione || null,
      marcatura_ce: formCespite.marcatura_ce || null,
      alimentazione: formCespite.alimentazione || null,
      potenza: formCespite.potenza || null,
      frequenza: formCespite.frequenza || null,
      lotto: formCespite.lotto || null,
      prezzo: formCespite.prezzo || null,
      data_di_collaudo: formCespite.data_di_collaudo || null,
      data_messa_in_uso: formCespite.data_messa_in_uso || null,
      sede: formCespite.sede || null,
      reparto: formCespite.reparto || null,
      fornitore: formCespite.fornitore || null,
      note: formCespite.note || null,
      accessori_sistema_primario: formCespite.accessori_sistema_primario || null
    };
    try {
      const response = await fetch(`${API_BASE_URL}/cespite/${codiceUrl}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dati: datiDaSalvare
        })
      });
      const testoRisposta = await response.text();
      if (!response.ok) {
        console.error("Errore salvataggio:", response.status, testoRisposta);
        alert(`Errore durante il salvataggio modifiche (${response.status})`);
        return;
      }
      const cespiteAggiornato = {
        ...cespiteSelezionato,
        ...datiDaSalvare,
        codicestrumento: codiceNuovo,
        codice_strumento: codiceNuovo,
        stato_asset: formCespite.stato_asset || statoCespite({
          ...cespiteSelezionato,
          ...datiDaSalvare
        })
      };

      // Se esisteva un link documentazione manuale legato al vecchio codice,
      // lo spostiamo automaticamente sulla nuova chiave per non perderlo.
      if (codiceCambiato) {
        const chiaveVecchia = chiaveCodiceCespite(codice);
        const chiaveNuova = chiaveCodiceCespite(codiceNuovo);
        const linkDaSpostare = linkManualiDocumentazione?.[chiaveVecchia];
        if (linkDaSpostare && chiaveVecchia !== chiaveNuova) {
          const linkAggiornati = {
            ...linkManualiDocumentazione
          };
          delete linkAggiornati[chiaveVecchia];
          linkAggiornati[chiaveNuova] = linkDaSpostare;
          localStorage.setItem("fmed_link_documentazione_cespiti", JSON.stringify(linkAggiornati));
          setLinkManualiDocumentazione(linkAggiornati);
        }
      }
      setCespiteSelezionato(cespiteAggiornato);
      setFormCespite(cespiteAggiornato);
      setCespiti(prev => prev.map(c => {
        const codiceRiga = String(c?.codicestrumento || c?.codice_strumento || c?.codice || "").trim();
        return codiceRiga === codice ? {
          ...c,
          ...cespiteAggiornato
        } : c;
      }));
      setModificaCespite(false);
      alert(codiceCambiato ? "Codice inventario e dati cespite salvati correttamente" : "Modifiche salvate correttamente");
    } catch (err) {
      console.error("Errore rete salvataggio:", err);
      alert("Errore di collegamento con il backend");
    }
  }
  function apriModificaRapidaAsset(cespite) {
    const codice = String(cespite?.codicestrumento || cespite?.codice_strumento || cespite?.codice || "").trim();
    if (!codice) return;
    setAssetQuickEditCodice(codice);
    setAssetQuickEditForm({
      tipologia: cespite?.tipologia || "",
      branca_medica: getBrancaAsset(cespite) || "",
      locazione: getLocazioneFmed(cespite) || "",
      costruttore: cespite?.costruttore || "",
      modello: cespite?.modello || "",
      stato_asset: statoCespite(cespite)
    });
  }
  function annullaModificaRapidaAsset() {
    setAssetQuickEditCodice("");
    setAssetQuickEditForm({});
    setAssetQuickEditSaving(false);
  }
  function aggiornaCampoModificaRapidaAsset(campo, valore) {
    setAssetQuickEditForm(prev => ({
      ...prev,
      [campo]: valore
    }));
  }
  async function salvaModificaRapidaAsset(cespite) {
    const codice = String(cespite?.codicestrumento || cespite?.codice_strumento || cespite?.codice || "").trim();
    if (!codice) {
      alert("Codice cespite non disponibile");
      return;
    }
    const datiStato = datiStatoPerSalvataggio(assetQuickEditForm.stato_asset || statoCespite(cespite));
    const datiDaSalvare = {
      ...datiStato,
      tipologia: assetQuickEditForm.tipologia || null,
      branca_medica: assetQuickEditForm.branca_medica || null,
      locazione: assetQuickEditForm.locazione || null,
      costruttore: assetQuickEditForm.costruttore || null,
      modello: assetQuickEditForm.modello || null
    };
    try {
      setAssetQuickEditSaving(true);
      await chiamataApiAutenticataFmed(`/cespite/${encodeURIComponent(codice)}`, {
        method: "PUT",
        body: JSON.stringify({
          dati: datiDaSalvare
        })
      });
      const cespiteAggiornato = {
        ...cespite,
        ...datiDaSalvare,
        stato_asset: assetQuickEditForm.stato_asset || statoCespite({
          ...cespite,
          ...datiDaSalvare
        })
      };
      setCespiti(prev => prev.map(c => {
        const codiceRiga = String(c?.codicestrumento || c?.codice_strumento || c?.codice || "").trim();
        return codiceRiga === codice ? {
          ...c,
          ...cespiteAggiornato
        } : c;
      }));
      if (cespiteSelezionato && String(cespiteSelezionato.codicestrumento || "").trim() === codice) {
        setCespiteSelezionato(prev => ({
          ...(prev || {}),
          ...cespiteAggiornato
        }));
        setFormCespite(prev => ({
          ...(prev || {}),
          ...cespiteAggiornato
        }));
      }
      annullaModificaRapidaAsset();
    } catch (err) {
      console.error("Errore modifica rapida asset:", err);
      alert("Errore durante il salvataggio rapido del cespite");
    } finally {
      setAssetQuickEditSaving(false);
    }
  }
  function getCodiceAssetBulk(cespite) {
    return String(cespite?.codicestrumento || cespite?.codice_strumento || cespite?.codice || "").trim();
  }
  function toggleSelezioneAssetBulk(codice, selezionato = null) {
    const codicePulito = String(codice || "").trim();
    if (!codicePulito) return;
    setAssetSelezionatiBulk(prev => {
      const set = new Set(prev);
      const deveSelezionare = selezionato === null ? !set.has(codicePulito) : Boolean(selezionato);
      if (deveSelezionare) set.add(codicePulito);else set.delete(codicePulito);
      return Array.from(set);
    });
  }
  function toggleSelezioneAssetVisibiliBulk(seleziona) {
    const codiciVisibili = (Array.isArray(filtratiRenderizzati) ? filtratiRenderizzati : []).map(c => getCodiceAssetBulk(c)).filter(Boolean);
    setAssetSelezionatiBulk(prev => {
      const set = new Set(prev);
      codiciVisibili.forEach(codice => {
        if (seleziona) set.add(codice);else set.delete(codice);
      });
      return Array.from(set);
    });
  }
  function selezionaTuttiAssetFiltratiBulk() {
    const codici = (Array.isArray(filtrati) ? filtrati : []).map(c => getCodiceAssetBulk(c)).filter(Boolean);
    setAssetSelezionatiBulk(Array.from(new Set(codici)));
  }
  async function salvaModificaMultiplaBrancaAsset() {
    const codici = Array.from(new Set(assetSelezionatiBulk.map(c => String(c || "").trim()).filter(Boolean)));
    if (codici.length === 0) {
      alert("Seleziona almeno un asset da aggiornare");
      return;
    }
    const datiBase = {};
    const nuovaBranca = String(assetBulkBranca || "").trim();
    const nuovaSede = String(assetBulkSede || "").trim();
    const nuovaLocazione = String(assetBulkLocazione || "").trim();
    const nuovoStato = String(assetBulkStato || "").trim();
    const nuovaSocieta = String(assetBulkSocieta || "").trim();
    if (nuovaBranca) datiBase.branca_medica = nuovaBranca;
    if (nuovaSede) datiBase.sede = nuovaSede;
    if (nuovaLocazione) datiBase.locazione = nuovaLocazione;
    if (nuovaSocieta) datiBase.societa = nuovaSocieta;
    if (nuovoStato) {
      datiBase.stato_asset = nuovoStato;
      Object.assign(datiBase, datiStatoPerSalvataggio(nuovoStato));
    }
    if (Object.keys(datiBase).length === 0) {
      alert("Scegli almeno un campo da applicare agli asset selezionati");
      return;
    }
    const riepilogo = Object.entries(datiBase).filter(([chiave]) => !["dismesso", "strumento_non_in_uso"].includes(chiave)).map(([chiave, valore]) => `${chiave}: ${valore}`).join("\n");
    const conferma = window.confirm(`Applicare le seguenti modifiche a ${codici.length} asset selezionati?\n\n${riepilogo}`);
    if (!conferma) return;
    try {
      setAssetBulkSaving(true);
      for (const codice of codici) {
        await chiamataApiAutenticataFmed(`/cespite/${encodeURIComponent(codice)}`, {
          method: "PUT",
          body: JSON.stringify({
            dati: datiBase
          })
        });
      }
      setCespiti(prev => prev.map(c => {
        const codiceRiga = getCodiceAssetBulk(c);
        return codici.includes(codiceRiga) ? {
          ...c,
          ...datiBase
        } : c;
      }));
      if (cespiteSelezionato && codici.includes(getCodiceAssetBulk(cespiteSelezionato))) {
        setCespiteSelezionato(prev => ({
          ...(prev || {}),
          ...datiBase
        }));
        setFormCespite(prev => ({
          ...(prev || {}),
          ...datiBase
        }));
      }
      setAssetBulkBranca("");
      setAssetBulkSede("");
      setAssetBulkLocazione("");
      setAssetBulkStato("");
      setAssetBulkSocieta("");
      setAssetSelezionatiBulk([]);
      alert(`Modifica multipla completata su ${codici.length} asset`);
    } catch (err) {
      console.error("Errore modifica multipla asset:", err);
      alert(`Errore durante la modifica multipla asset: ${err?.message || err}`);
    } finally {
      setAssetBulkSaving(false);
    }
  }
  async function aggiornaLinkDocumentazioneCespiteBackend(codice, link) {
    let ultimoErrore = null;
    for (const baseUrl of API_BASE_CANDIDATES) {
      try {
        const response = await fetch(`${baseUrl}/sharepoint/cespiti/${encodeURIComponent(codice)}/link-documento`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            link_documento: link || null
          })
        });
        const testo = await response.text();
        let data = {};
        try {
          data = testo ? JSON.parse(testo) : {};
        } catch {
          data = {};
        }
        if (!response.ok) {
          const dettaglio = typeof data?.detail === "string" ? data.detail : testo || `Errore ${response.status}`;
          throw new Error(dettaglio);
        }
        return data;
      } catch (err) {
        ultimoErrore = err;
        console.error("Errore salvataggio link SharePoint su", baseUrl, err);
      }
    }
    throw ultimoErrore || new Error("Backend FMED non raggiungibile");
  }
  async function salvaLinkDocumentazioneCespite(linkForzato) {
    if (!cespiteSelezionato?.codicestrumento) {
      alert("Nessun cespite selezionato");
      return;
    }
    const codice = String(cespiteSelezionato.codicestrumento).trim();
    const chiave = chiaveCodiceCespite(codice);
    const link = typeof linkForzato === "string" ? linkForzato.trim() : String(linkDocInput || "").trim();
    if (link && !/^https?:\/\//i.test(link)) {
      alert("Inserisci un link valido che inizi con http:// oppure https://");
      return;
    }
    try {
      const risposta = await aggiornaLinkDocumentazioneCespiteBackend(codice, link);
      const linkSalvato = String(risposta?.link_documento || link || "").trim();

      // Rimuoviamo il vecchio fallback locale: da questa release la fonte ufficiale
      // è sempre Censimento.link_documento su Supabase.
      const aggiornati = {
        ...linkManualiDocumentazione
      };
      delete aggiornati[chiave];
      localStorage.setItem("fmed_link_documentazione_cespiti", JSON.stringify(aggiornati));
      setLinkManualiDocumentazione(aggiornati);

      const cespiteAggiornato = {
        ...cespiteSelezionato,
        ...(risposta?.cespite || {}),
        link_documento: linkSalvato || null,
        link_documentazione: linkSalvato || null
      };
      setCespiteSelezionato(cespiteAggiornato);
      setFormCespite(prev => ({
        ...(prev || {}),
        ...cespiteAggiornato
      }));
      setCespiti(prev => prev.map(c => String(c.codicestrumento || "").trim() === codice ? {
        ...c,
        ...cespiteAggiornato
      } : c));
      setLinkDocInput(linkSalvato);
      setModificaLinkDoc(false);
      alert(linkSalvato ? "Nuovo link SharePoint salvato nel database" : "Link SharePoint rimosso dal database");
    } catch (err) {
      console.error("Errore salvataggio link documentazione:", err);
      alert(`Impossibile salvare il link SharePoint: ${err?.message || err}`);
    }
  }
  async function rimuoviLinkDocumentazioneCespite() {
    if (!cespiteSelezionato?.codicestrumento) return;
    const codice = String(cespiteSelezionato.codicestrumento).trim();
    const conferma = window.confirm(`Rimuovere il link SharePoint dal cespite ${codice}?`);
    if (!conferma) return;
    await salvaLinkDocumentazioneCespite("");
  }
    async function eliminaCespiteSelezionato() {
    if (!cespiteSelezionato?.codicestrumento) {
      alert("Nessun cespite selezionato");
      return;
    }
    const codice = String(cespiteSelezionato.codicestrumento || "").trim();
    const conferma = window.confirm(`Vuoi dismettere il cespite ${codice}?\n\nIl record NON verrà cancellato fisicamente: verrà marcato come Dismesso e resterà nello storico.`);
    if (!conferma) return;
    try {
      let response = null;
      let testoRisposta = "";
      let ultimoErrore = null;
      for (const baseUrl of API_BASE_CANDIDATES) {
        try {
          response = await fetch(`${baseUrl}/cespite/${encodeURIComponent(codice)}`, {
            method: "DELETE"
          });
          testoRisposta = await response.text();
          break;
        } catch (err) {
          ultimoErrore = err;
          console.error("Errore DELETE cespite su", baseUrl, err);
        }
      }
      if (!response) {
        console.error("DELETE cespite fallita su tutti i backend", ultimoErrore);
        alert("Errore di collegamento con il backend durante la dismissione del cespite");
        return;
      }
      if (!response.ok) {
        console.error("Errore dismissione cespite:", response.status, testoRisposta);
        alert(`Errore durante la dismissione del cespite (${response.status})\n\n${testoRisposta}`);
        return;
      }
      const chiave = chiaveCodiceCespite(codice);
      const linkAggiornati = {
        ...linkManualiDocumentazione
      };
      delete linkAggiornati[chiave];
      localStorage.setItem("fmed_link_documentazione_cespiti", JSON.stringify(linkAggiornati));
      setLinkManualiDocumentazione(linkAggiornati);
      const cespiteAggiornato = {
        ...cespiteSelezionato,
        dismesso: "1",
        strumento_non_in_uso: "0",
        stato_asset: "Dismesso"
      };
      setCespiteSelezionato(cespiteAggiornato);
      setFormCespite(cespiteAggiornato);
      setCespiti(prev => prev.map(c => String(c.codicestrumento || "").trim() === codice ? {
        ...c,
        ...cespiteAggiornato
      } : c));
      setModificaCespite(false);
      setModificaLinkDoc(false);
      setLinkDocInput("");
      alert(`Cespite ${codice} dismesso correttamente`);
    } catch (err) {
      console.error("Errore rete dismissione cespite:", err);
      alert("Errore di collegamento con il backend durante la dismissione del cespite");
    }
  }
  async function generaCodiceCespiteDaBackend(sedeSelezionata) {
    const sedePulita = String(sedeSelezionata || "").trim();
    if (!sedePulita) {
      alert("Seleziona prima la sede per generare il numero di inventario");
      return "";
    }
    try {
      setGenerazioneCodiceLoading(true);
      const codiceGenerato = generaCodiceInventarioAutomatico(sedePulita, cespiti);
      return String(codiceGenerato || "").trim();
    } catch (err) {
      console.error("Errore generazione codice locale:", err);
      alert("Errore durante la generazione automatica del codice cespite");
      return "";
    } finally {
      setGenerazioneCodiceLoading(false);
    }
  }
  function resetFormNuovoCespite() {
    setCodiceCespiteAutomatico(true);
    setOcrTarghettaEsito(null);
    setOcrTarghettaLoading(false);
    setOcrAccessorioEsito(null);
    setOcrAccessorioLoading(false);
    setFormNuovoCespite({
      codicestrumento: "",
      tipologia: "",
      costruttore: "",
      modello: "",
      matricola: "",
      societa: "MARILAB",
      sede: "",
      reparto: "",
      branca_medica: "",
      area_sanitaria: "",
      locazione: "",
      categoria: "E",
      possesso: "Proprietà",
      anno_di_fabbricazione: "",
      marcatura_ce: "",
      alimentazione: "",
      potenza: "",
      frequenza: "",
      lotto: "",
      prezzo: "",
      data_di_collaudo: "",
      data_messa_in_uso: "",
      fornitore: "",
      note: "",
      accessori_sistema_primario: "",
      stato_asset: "Attivo",
      foto_principale: "",
      foto_targhetta: "",
      foto_accessori: "",
      foto_installazione: "",
      foto_manutenzione: "",
      foto_guasto: "",
      foto_dopo_intervento: "",
      foto_documentazione: ""
    });
  }
  async function copiaDatiCespiteInNuovoAsset(cespiteOrigine = null) {
    const origine = cespiteOrigine || cespiteSelezionato || {};
    if (!origine || !Object.keys(origine).length) {
      alert("Nessun cespite selezionato da copiare.");
      return;
    }
    const sedeOrigine = origine.sede || origine.sede_originale || "";
    const bozzaNuovoCespite = {
      // Campi univoci lasciati vuoti: Fabio li inserisce/modifica prima del salvataggio.
      codicestrumento: "",
      matricola: "",
      lotto: "",
      link_documento: "",
      // Campi copiati per velocizzare inserimenti di strumenti simili.
      tipologia: origine.tipologia || "",
      costruttore: origine.costruttore || "",
      modello: origine.modello || "",
      societa: origine.societa || "MARILAB",
      sede: sedeOrigine,
      reparto: origine.reparto || "",
      branca_medica: origine.branca_medica || origine.branca || "",
      area_sanitaria: origine.area_sanitaria || "",
      locazione: origine.locazione || "",
      categoria: origine.categoria || "E",
      possesso: origine.possesso || "Proprietà",
      anno_di_fabbricazione: origine.anno_di_fabbricazione || origine.anno || "",
      marcatura_ce: origine.marcatura_ce || "",
      alimentazione: origine.alimentazione || "",
      potenza: origine.potenza || "",
      frequenza: origine.frequenza || "",
      prezzo: origine.prezzo || "",
      data_di_collaudo: "",
      data_messa_in_uso: "",
      fornitore: origine.fornitore || "",
      note: origine.note ? `COPIATO DA ${origine.codicestrumento || "cespite"}. ${origine.note}` : `COPIATO DA ${origine.codicestrumento || "cespite"}`,
      accessori_sistema_primario: origine.accessori_sistema_primario || "",
      stato_asset: "Attivo"
    };
    setOcrTarghettaEsito(null);
    setOcrTarghettaLoading(false);
    setOcrAccessorioEsito(null);
    setOcrAccessorioLoading(false);
    setModificaCespite(false);
    setModificaLinkDoc(false);
    setCodiceCespiteAutomatico(true);
    setFormNuovoCespite(bozzaNuovoCespite);
    setCespiteSelezionato(null);
    await avviaProcessoGuidatoFmed("NUOVO_ASSET", bozzaNuovoCespite);
  }
  function apriEtichettaQrCespite(cespite) {
    // MRDB: stampa etichetta in PDF, non più PNG. Richiede endpoint backend /etichetta-pdf/{codice}.
    const codice = String(cespite?.codicestrumento || cespite || "").trim();
    if (!codice) {
      alert("Codice cespite non disponibile per generare il QR");
      return;
    }
    const linkDocumento = String(cespite?.link_documento || "").trim();
    if (!linkDocumento || !/^https?:\/\//i.test(linkDocumento)) {
      alert("Etichetta PDF non generata: manca il link_documento SharePoint del cespite in Censimento.");
      return;
    }
    window.open(`${API_BASE_URL}/etichetta-pdf/${encodeURIComponent(codice)}?t=${Date.now()}`, "_blank");
  }
  function pulisciTestoZebra(valore, maxLength = 40) {
    return String(valore || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\^~]/g, "").replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
  }
  function scaricaEtichettaZplCespite(cespite) {
    const codice = String(cespite?.codicestrumento || cespite || "").trim();
    if (!codice) {
      alert("Codice cespite non disponibile per generare l'etichetta Zebra");
      return;
    }
    const linkDocumento = String(cespite?.link_documento || "").trim();
    if (!linkDocumento || !/^https?:\/\//i.test(linkDocumento)) {
      alert("Etichetta Zebra non generata: manca il link_documento SharePoint del cespite in Censimento.");
      return;
    }
    const url = `${API_BASE_URL}/etichetta-zpl/${encodeURIComponent(codice)}`;
    window.open(url, "_blank");
  }
  function scaricaEtichettaDdlClabelCespite(cespite) {
    const codice = String(cespite?.codicestrumento || cespite || "").trim();
    if (!codice) {
      alert("Codice cespite non disponibile per generare l'etichetta cLabel DDL");
      return;
    }
    const linkDocumento = String(cespite?.link_documento || "").trim();
    if (!linkDocumento || !/^https?:\/\//i.test(linkDocumento)) {
      alert("Etichetta cLabel non generata: manca il link_documento SharePoint del cespite in Censimento.");
      return;
    }
    const tipologia = pulisciTestoZebra(cespite?.tipologia, 32);
    const sede = pulisciTestoZebra(cespite?.sede, 36);
    const reparto = pulisciTestoZebra(cespite?.reparto || cespite?.locazione, 36);
    const costruttore = pulisciTestoZebra(cespite?.costruttore, 28);
    const modello = pulisciTestoZebra(cespite?.modello, 28);
    const matricola = pulisciTestoZebra(cespite?.matricola, 26);
    const qrUrl = urlSchedaCespiteFrontend(codice);

    // FMED - export etichetta per cLabel / CT221B.
    // Formato testuale .DDL leggibile/importabile come tracciato etichetta.
    // Se l'app cLabel richiede un DDL proprietario binario, questo file resta comunque una base chiara
    // e replicabile; in quel caso basta esportare un DDL campione da cLabel e allineiamo il tracciato.
    const ddl = ["# FMED_LABEL_DDL_V1", "# Printer: cLabel CT221B", "# Label suggested: 50x30 mm or 50x40 mm", "SIZE_MM=50x30", "DPI=203", "OBJECT=TEXT;X=2;Y=2;W=46;H=5;FONT=2;BOLD=1;VALUE=FMED", `OBJECT=TEXT;X=2;Y=8;W=46;H=5;FONT=2;BOLD=1;VALUE=${codice}`, `OBJECT=TEXT;X=2;Y=14;W=46;H=4;FONT=1;VALUE=${tipologia}`, `OBJECT=TEXT;X=2;Y=18;W=46;H=4;FONT=1;VALUE=${costruttore} ${modello}`.trim(), `OBJECT=TEXT;X=2;Y=22;W=31;H=4;FONT=1;VALUE=SN ${matricola || "-"}`, `OBJECT=TEXT;X=2;Y=26;W=31;H=3;FONT=1;VALUE=${reparto || sede}`, `OBJECT=QRCODE;X=35;Y=15;W=13;H=13;ECC=M;VALUE=${qrUrl}`, "# END_FMED_LABEL_DDL_V1", ""].join("\n");
    const blob = new Blob([ddl], {
      type: "application/octet-stream;charset=utf-8"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `FMED_ETICHETTA_${codice.replace(/[^A-Za-z0-9_-]/g, "_")}_CLABEL_CT221B.ddl`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  async function fmedLeggiOrientamentoExif(file) {
    // EXIF orientation: 1 normale, 3 ruotata 180, 6 ruotata 90, 8 ruotata -90.
    // Se non leggibile torniamo 1 senza bloccare l'OCR.
    return new Promise(resolve => {
      try {
        const reader = new FileReader();
        reader.onerror = () => resolve(1);
        reader.onload = event => {
          try {
            const view = new DataView(event.target.result);
            if (view.getUint16(0, false) !== 0xffd8) return resolve(1);
            let offset = 2;
            while (offset < view.byteLength) {
              const marker = view.getUint16(offset, false);
              offset += 2;
              if (marker === 0xffe1) {
                offset += 2;
                if (view.getUint32(offset, false) !== 0x45786966) return resolve(1);
                offset += 6;
                const little = view.getUint16(offset, false) === 0x4949;
                offset += view.getUint32(offset + 4, little);
                const tags = view.getUint16(offset, little);
                offset += 2;
                for (let i = 0; i < tags; i += 1) {
                  const tagOffset = offset + i * 12;
                  if (view.getUint16(tagOffset, little) === 0x0112) {
                    return resolve(view.getUint16(tagOffset + 8, little) || 1);
                  }
                }
                return resolve(1);
              }
              if ((marker & 0xff00) !== 0xff00) break;
              offset += view.getUint16(offset, false);
            }
            resolve(1);
          } catch {
            resolve(1);
          }
        };
        reader.readAsArrayBuffer(file.slice(0, 256 * 1024));
      } catch {
        resolve(1);
      }
    });
  }
  async function preparaImmagineOcrFmed(file, opzioni = {}) {
    // Converte in JPEG, corregge l'orientamento EXIF, comprime e restituisce diagnostica.
    const maxLato = opzioni.maxLato || 1600;
    const qualita = opzioni.qualita || 0.82;
    if (!file) throw new Error("Nessun file selezionato");
    const fileType = String(file.type || "").toLowerCase();
    const fileName = String(file.name || "foto_targhetta.jpg");
    const isHeic = /\.(heic|heif)$/i.test(fileName) || fileType.includes("heic") || fileType.includes("heif");
    if (!fileType.startsWith("image/") && !isHeic) {
      throw new Error("File immagine non valido");
    }
    const orientamento = await fmedLeggiOrientamentoExif(file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Impossibile leggere la foto dal dispositivo"));
      reader.onload = () => {
        const dataUrlOriginale = String(reader.result || "");
        const img = new Image();
        img.onerror = () => {
          // Alcuni browser non decodificano HEIC nel canvas. In questo caso mandiamo comunque il base64 al backend,
          // che tenterà la conversione lato server e restituirà un errore chiaro se il formato non è supportato.
          const base64Originale = dataUrlOriginale.includes(",") ? dataUrlOriginale.split(",").pop() : dataUrlOriginale;
          resolve({
            image_base64: base64Originale,
            mime_type: fileType || (isHeic ? "image/heic" : "image/jpeg"),
            filename: fileName,
            original_size: file.size || 0,
            compressed_size: Math.round(base64Originale.length * 3 / 4),
            width: 0,
            height: 0,
            orientation: orientamento,
            note: "Browser non ha decodificato l'immagine: conversione demandata al backend."
          });
        };
        img.onload = () => {
          try {
            const ruotata = orientamento === 6 || orientamento === 8;
            const srcWidth = img.width || 1;
            const srcHeight = img.height || 1;
            const latoMaxOriginale = Math.max(srcWidth, srcHeight);
            const ratio = Math.min(1, maxLato / latoMaxOriginale);
            const drawWidth = Math.max(1, Math.round(srcWidth * ratio));
            const drawHeight = Math.max(1, Math.round(srcHeight * ratio));
            const canvas = document.createElement("canvas");
            canvas.width = ruotata ? drawHeight : drawWidth;
            canvas.height = ruotata ? drawWidth : drawHeight;
            const ctx = canvas.getContext("2d");
            ctx.save();
            switch (orientamento) {
              case 3:
                ctx.translate(canvas.width, canvas.height);
                ctx.rotate(Math.PI);
                break;
              case 6:
                ctx.translate(canvas.width, 0);
                ctx.rotate(Math.PI / 2);
                break;
              case 8:
                ctx.translate(0, canvas.height);
                ctx.rotate(-Math.PI / 2);
                break;
              default:
                break;
            }
            ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
            ctx.restore();
            const jpeg = canvas.toDataURL("image/jpeg", qualita);
            const base64 = jpeg.includes(",") ? jpeg.split(",").pop() : jpeg;
            resolve({
              image_base64: base64,
              mime_type: "image/jpeg",
              filename: fileName.replace(/\.(heic|heif|png|webp)$/i, ".jpg") || "targhetta.jpg",
              original_size: file.size || 0,
              compressed_size: Math.round(base64.length * 3 / 4),
              width: canvas.width,
              height: canvas.height,
              orientation: orientamento,
              note: "Foto convertita e compressa in JPEG prima dell'invio."
            });
          } catch (err) {
            reject(new Error(`Errore compressione immagine: ${err?.message || err}`));
          }
        };
        img.src = dataUrlOriginale;
      };
      reader.readAsDataURL(file);
    });
  }
    function fmedMessaggioErroreBreve(err, fallback = "Errore OCR") {
    const raw = String(err?.message || err?.detail || err || fallback);
    if (!raw) return fallback;
    if (raw.includes("Payload Too Large") || raw.includes("413")) {
      return "Foto troppo pesante. Riprova con una foto più ravvicinata della sola targhetta.";
    }
    if (raw.includes("OCR accessorio non configurato") || raw.includes("OCR targhetta non configurato")) {
      return "OCR Gemini non configurato sul backend: verificare FMED_GEMINI_API_KEY su Render.";
    }
    if (raw.includes("Backend non raggiungibile") || raw.includes("Failed to fetch") || raw.includes("NetworkError")) {
      return "Backend FMED non raggiungibile. Verifica deploy Render e variabile VITE_API_BASE_URL.";
    }
    if (raw.includes("502") || raw.toLowerCase().includes("gemini")) {
      return "Gemini non ha letto correttamente la foto. Riprova con immagine più nitida, dritta e luminosa.";
    }
    return raw.length > 260 ? `${raw.slice(0, 260)}...` : raw;
  }
  function fmedOcrValorePulito(valore) {
    if (valore === null || valore === undefined) return "";
    if (Array.isArray(valore)) {
      return valore.map(v => fmedOcrValorePulito(v)).filter(Boolean).join(" ").trim();
    }
    if (typeof valore === "object") {
      return "";
    }
    return String(valore).replace(/^["']+|["']+$/g, "").replace(/\s+/g, " ").trim();
  }
  function fmedOcrNormalizzaChiave(chiave) {
    return String(chiave || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
  }
  function fmedOcrFlatten(obj, prefix = "", out = {}) {
    if (!obj || typeof obj !== "object") return out;
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => fmedOcrFlatten(item, `${prefix}_${index}`, out));
      return out;
    }
    Object.entries(obj).forEach(([key, value]) => {
      const cleanKey = prefix ? `${prefix}_${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        fmedOcrFlatten(value, cleanKey, out);
        return;
      }
      const valore = fmedOcrValorePulito(value);
      if (valore) {
        out[cleanKey] = valore;
        out[fmedOcrNormalizzaChiave(cleanKey)] = valore;
      }
    });
    return out;
  }
  function fmedOcrPick(mappa, chiavi = []) {
    for (const chiave of chiavi) {
      const diretta = mappa?.[chiave];
      if (fmedOcrValorePulito(diretta)) return fmedOcrValorePulito(diretta);
      const norm = fmedOcrNormalizzaChiave(chiave);
      const normalizzata = mappa?.[norm];
      if (fmedOcrValorePulito(normalizzata)) return fmedOcrValorePulito(normalizzata);
    }
    return "";
  }
  function fmedOcrAnnoDaTesto(...valori) {
    const testo = valori.map(v => fmedOcrValorePulito(v)).filter(Boolean).join(" ");
    const match = testo.match(/\b(19[7-9]\d|20[0-4]\d)\b/);
    return match ? match[1] : "";
  }
  function fmedOcrGuessTipologia(testo) {
    const t = String(testo || "").toUpperCase();
    if (t.includes("ULTRASOUND") || t.includes("ECOGRAF") || t.includes("ECHOGRAPH")) return "ECOGRAFO";
    if (t.includes("MAGNETIC RESONANCE") || t.includes("MRI") || t.includes("RISONANZA") || t.includes("INGENIA") || t.includes("ACHIEVA")) return "TOMOGRAFO A RISONANZA MAGNETICA";
    if (t.includes("MAMMOGRAPH") || t.includes("MAMMOGRAF") || t.includes("SELENIA")) return "MAMMOGRAFO";
    if (t.includes("CT ") || t.includes("TAC") || t.includes("COMPUTED TOMOGRAPHY") || t.includes("TOMOGRAFIA COMPUTERIZZATA")) return "TAC";
    if (t.includes("ECG") || t.includes("ELECTROCARDIO") || t.includes("ELETTROCARDIO")) return "ELETTROCARDIOGRAFO";
    if (t.includes("DEFIBRILL")) return "DEFIBRILLATORE";
    if (t.includes("AUTOCLAVE") || t.includes("STERILIZER") || t.includes("STERILIZZ")) return "STERILIZZATRICE";
    if (t.includes("MONITOR") && (t.includes("PATIENT") || t.includes("PAZIENTE"))) return "MONITOR MULTIPARAMETRICO";
    if (t.includes("VENTILATOR") || t.includes("VENTILATORE")) return "VENTILATORE POLMONARE";
    return "";
  }
  function fmedOcrAggiungiExtra(setter, valore) {
    const pulito = fmedOcrValorePulito(valore);
    if (!pulito) return;
    setter(prev => {
      const lista = Array.isArray(prev) ? prev : [];
      const esiste = lista.some(v => String(v || "").trim().toUpperCase() === pulito.toUpperCase());
      return esiste ? lista : [...lista, pulito];
    });
  }
  function fmedOcrRiepilogoConferma(dati = {}) {
    const righe = [["COSTRUTTORE", dati.costruttore], ["MODELLO", dati.modello], ["MATRICOLA / SN", dati.matricola], ["ANNO", dati.anno || dati.anno_di_fabbricazione], ["TIPOLOGIA", dati.tipologia], ["BRANCA", dati.branca_medica], ["CATEGORIA", dati.categoria], ["MATCH CATALOGO", dati.match_catalogo ? `${dati.match_catalogo} cespiti simili già presenti` : ""], ["MARCATURA CE", dati.marcatura_ce], ["ALIMENTAZIONE", dati.alimentazione], ["POTENZA", dati.potenza], ["FREQUENZA", dati.frequenza], ["LOTTO", dati.lotto]].filter(([, valore]) => String(valore || "").trim()).map(([label, valore]) => `${label}: ${valore}`);
    return righe.length ? righe.join("\n") : "NESSUN DATO CERTO RICONOSCIUTO";
  }
  function fmedOcrConfermaApplicazione(dati = {}, contesto = "nuovo asset") {
    const riepilogo = fmedOcrRiepilogoConferma(dati);
    if (!riepilogo || riepilogo === "NESSUN DATO CERTO RICONOSCIUTO") return true;
    return window.confirm(`OCR INTELLIGENTE - ${String(contesto || "FMED").toUpperCase()}

` + `${riepilogo}

` + "CONFERMI DI COMPILARE / AGGIORNARE I CAMPI CON QUESTI DATI?");
  }
  function fmedTrovaCespitePerCodice(lista = [], codice = "") {
    const chiave = String(codice || "").trim().toUpperCase();
    if (!chiave) return null;
    return (Array.isArray(lista) ? lista : []).find(c => String(c?.codicestrumento || c?.codice_strumento || c?.codice || "").trim().toUpperCase() === chiave) || null;
  }
  async function scansionaTarghettaNuovoCespite(file) {
    if (!file) return;
    if (!String(file.type || "").startsWith("image/")) {
      alert("Carica una foto della targhetta in formato immagine");
      return;
    }
    try {
      setOcrTarghettaLoading(true);
      setOcrTarghettaEsito(null);
      const immagineOcr = await preparaImmagineOcrFmed(file);
      const risposta = await chiamataApiAutenticataFmed("/ocr-targhetta", {
        method: "POST",
        body: JSON.stringify({
          filename: immagineOcr.filename || file.name || "targhetta.jpg",
          mime_type: immagineOcr.mime_type || "image/jpeg",
          image_base64: immagineOcr.image_base64,
          diagnostica_client: immagineOcr
        })
      });
      const contenitore = risposta?.dati || risposta?.data || risposta?.risultato || risposta?.ocr || risposta?.estrazione || risposta || {};
      const flat = {
        ...fmedOcrFlatten(risposta || {}),
        ...fmedOcrFlatten(contenitore || {})
      };
      const rawText = fmedOcrPick(flat, ["raw_text", "rawText", "testo_letto", "testo", "ocr_text", "ocrText", "full_text", "fullText"]) || "";
      const costruttore = fmedOcrPick(flat, ["costruttore", "manufacturer", "manufactured_by", "manufacturedby", "produttore", "marca", "brand", "company", "societa_produttrice", "fabbricante", "legal_manufacturer", "legalmanufacturer"]);
      const modello = fmedOcrPick(flat, ["modello", "model", "model_name", "modelname", "model_number", "modelnumber", "nome_modello", "product_model", "productmodel", "device_model", "devicemodel", "type", "tipo", "reference_model"]);
      const matricola = fmedOcrPick(flat, ["matricola", "serial_number", "serialnumber", "seriale", "serial", "serial_no", "serialno", "sn", "s_n", "numero_serie", "numeroserie", "numero_seriale", "numeroseriale", "serie", "n_serie"]);
      const anno = fmedOcrAnnoDaTesto(fmedOcrPick(flat, ["anno_di_fabbricazione", "anno", "year", "manufacturing_year", "manufacturingyear", "year_of_manufacture", "yearofmanufacture", "date_of_manufacture", "dateofmanufacture", "manufacture_date", "manufacturedate", "dom", "date"]), rawText);
      const marcaturaCe = fmedOcrPick(flat, ["marcatura_ce", "marcaturaCE", "ce", "ce_mark", "ce_marking"]);
      const alimentazione = fmedOcrPick(flat, ["alimentazione", "power_supply", "voltage", "tensione"]);
      const potenza = fmedOcrPick(flat, ["potenza", "power", "watt", "va"]);
      const frequenza = fmedOcrPick(flat, ["frequenza", "frequency", "hz"]);
      const lotto = fmedOcrPick(flat, ["lotto", "lot", "batch"]);
      const tipologiaDiretta = fmedOcrPick(flat, ["tipologia", "device_type", "devicetype", "equipment_type", "equipmenttype", "tipo_apparecchiatura", "tipoapparecchiatura", "apparecchiatura", "categoria_ai", "categoria"]);
      const suggerimentoCatalogo = fmedSuggerisciDaCatalogo(cespiti, {
        costruttore,
        modello
      });
      const tipologia = tipologiaDiretta || suggerimentoCatalogo?.tipologia || fmedOcrGuessTipologia(`${costruttore} ${modello} ${rawText}`);
      const brancaMedica = fmedOcrPick(flat, ["branca_medica", "branca", "specialita", "specialty", "clinical_area"]) || suggerimentoCatalogo?.branca_medica || fmedGuessBrancaMedica(`${costruttore} ${modello} ${tipologia} ${rawText}`);
      const categoriaCatalogo = suggerimentoCatalogo?.categoria || "";
      const confidenceRaw = fmedOcrPick(flat, ["confidence", "confidenza", "score", "accuratezza"]) || "";
      let confidence = Number(String(confidenceRaw).replace(",", "."));
      if (!Number.isFinite(confidence)) confidence = null;
      if (confidence !== null && confidence > 1) confidence = confidence / 100;
      if (confidence !== null) confidence = Math.max(0, Math.min(1, confidence));
      const datiOcrSistema = {
        tipologia,
        branca_medica: brancaMedica,
        costruttore,
        modello,
        matricola,
        anno,
        marcatura_ce: marcaturaCe,
        alimentazione,
        potenza,
        frequenza,
        lotto,
        categoria: categoriaCatalogo,
        match_catalogo: suggerimentoCatalogo?.count || 0
      };
      const campiCertiOcr = [costruttore, modello, matricola, anno, marcaturaCe, alimentazione, potenza, frequenza, lotto, tipologiaDiretta].filter(valore => String(valore || "").trim());
      if (risposta?.trovato === false || campiCertiOcr.length === 0) {
        const requestId = risposta?.diagnostica?.request_id || "";
        const notaBackend = risposta?.messaggio || contenitore?.note || "Il motore OCR non ha riconosciuto dati tecnici utilizzabili.";
        setOcrTarghettaEsito({
          status: "warning",
          confidence,
          note: `${notaBackend}${requestId ? ` • ID richiesta: ${requestId}` : ""}`,
          raw_text: rawText,
          dati_estratti: datiOcrSistema
        });
        return;
      }
      const confermato = fmedOcrConfermaApplicazione(datiOcrSistema, "nuovo asset");
      if (!confermato) {
        setOcrTarghettaEsito({
          status: "annullato",
          confidence,
          note: "OCR letto correttamente, ma applicazione annullata dall'utente.",
          raw_text: rawText,
          dati_estratti: datiOcrSistema
        });
        return;
      }

      // Le select FMED mostrano il valore solo se è tra le opzioni.
      // Per questo aggiungiamo temporaneamente i valori OCR ai dizionari locali.
      fmedOcrAggiungiExtra(setExtraCostruttori, costruttore);
      fmedOcrAggiungiExtra(setExtraModelli, modello);
      fmedOcrAggiungiExtra(setExtraTipologie, tipologia);
      fmedOcrAggiungiExtra(setExtraBranche, brancaMedica);
      fmedOcrAggiungiExtra(setExtraCategorie, categoriaCatalogo);
      setFormNuovoCespite(prev => ({
        ...prev,
        tipologia: tipologia || prev.tipologia || "",
        branca_medica: brancaMedica || prev.branca_medica || "",
        costruttore: costruttore || prev.costruttore || "",
        modello: modello || prev.modello || "",
        matricola: matricola || prev.matricola || "",
        anno_di_fabbricazione: anno || prev.anno_di_fabbricazione || "",
        marcatura_ce: marcaturaCe || prev.marcatura_ce || "",
        alimentazione: alimentazione || prev.alimentazione || "",
        potenza: potenza || prev.potenza || "",
        frequenza: frequenza || prev.frequenza || "",
        lotto: lotto || prev.lotto || "",
        categoria: categoriaCatalogo || prev.categoria || ""
        // FMED OCR: la targhetta del sistema primario aggiorna solo i campi tecnici del cespite.
        // Le note restano manuali; gli accessori vengono gestiti dal pulsante dedicato.
      }));
      const trovati = [costruttore ? `Costruttore: ${costruttore}` : "", modello ? `Modello: ${modello}` : "", matricola ? `Matricola/SN: ${matricola}` : "", anno ? `Anno: ${anno}` : "", marcaturaCe ? `CE: ${marcaturaCe}` : "", alimentazione ? `Alimentazione: ${alimentazione}` : "", potenza ? `Potenza: ${potenza}` : "", frequenza ? `Frequenza: ${frequenza}` : "", lotto ? `Lotto: ${lotto}` : "", tipologia ? `Tipologia: ${tipologia}` : "", brancaMedica ? `Branca: ${brancaMedica}` : "", categoriaCatalogo ? `Categoria: ${categoriaCatalogo}` : "", suggerimentoCatalogo?.count ? `Catalogo: modello già presente ${suggerimentoCatalogo.count} volte` : ""].filter(Boolean);
      setOcrTarghettaEsito({
        status: risposta?.status || "ok",
        confidence,
        note: trovati.length > 0 ? `Dati inseriti: ${trovati.join(" • ")}. Verificare prima del salvataggio.` : "OCR eseguito, ma non sono stati riconosciuti campi certi. Prova una foto più vicina, dritta e luminosa.",
        raw_text: rawText,
        dati_estratti: datiOcrSistema
      });
    } catch (err) {
      console.error("Errore OCR targhetta:", err);
      const messaggio = fmedMessaggioErroreBreve(err, "Errore OCR targhetta");
      setOcrTarghettaEsito({
        status: "error",
        note: messaggio,
        raw_text: ""
      });
      alert(`OCR targhetta non riuscito.

${messaggio}`);
    } finally {
      setOcrTarghettaLoading(false);
    }
  }
  async function salvaCampiSistemaPrimarioCespite(datiSistemaPrimario = {}) {
    if (!cespiteSelezionato?.codicestrumento) {
      throw new Error("Nessun cespite selezionato");
    }
    const codice = String(cespiteSelezionato.codicestrumento || "").trim();
    const codiceUrl = encodeURIComponent(codice);
    const datiPuliti = {
      ...(datiSistemaPrimario.tipologia ? {
        tipologia: datiSistemaPrimario.tipologia
      } : {}),
      ...(datiSistemaPrimario.branca_medica ? {
        branca_medica: datiSistemaPrimario.branca_medica
      } : {}),
      ...(datiSistemaPrimario.costruttore ? {
        costruttore: datiSistemaPrimario.costruttore
      } : {}),
      ...(datiSistemaPrimario.modello ? {
        modello: datiSistemaPrimario.modello
      } : {}),
      ...(datiSistemaPrimario.matricola ? {
        matricola: datiSistemaPrimario.matricola
      } : {}),
      ...(datiSistemaPrimario.anno_di_fabbricazione ? {
        anno_di_fabbricazione: datiSistemaPrimario.anno_di_fabbricazione
      } : {}),
      ...(datiSistemaPrimario.marcatura_ce ? {
        marcatura_ce: datiSistemaPrimario.marcatura_ce
      } : {}),
      ...(datiSistemaPrimario.alimentazione ? {
        alimentazione: datiSistemaPrimario.alimentazione
      } : {}),
      ...(datiSistemaPrimario.potenza ? {
        potenza: datiSistemaPrimario.potenza
      } : {}),
      ...(datiSistemaPrimario.frequenza ? {
        frequenza: datiSistemaPrimario.frequenza
      } : {}),
      ...(datiSistemaPrimario.lotto ? {
        lotto: datiSistemaPrimario.lotto
      } : {})
    };
    if (Object.keys(datiPuliti).length === 0) {
      throw new Error("Nessun dato tecnico certo riconosciuto dalla targhetta");
    }
    let response = null;
    let ultimoErrore = null;
    for (const baseUrl of API_BASE_CANDIDATES) {
      try {
        response = await fetch(`${baseUrl}/cespite/${codiceUrl}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            dati: datiPuliti
          })
        });
        break;
      } catch (err) {
        ultimoErrore = err;
      }
    }
    if (!response) throw new Error(String(ultimoErrore || "Backend non raggiungibile"));
    const testo = await response.text();
    if (!response.ok) {
      throw new Error(`Errore salvataggio sistema primario (${response.status}): ${testo}`);
    }
    const aggiornato = {
      ...cespiteSelezionato,
      ...datiPuliti
    };
    setCespiteSelezionato(aggiornato);
    setFormCespite(prev => ({
      ...prev,
      ...datiPuliti
    }));
    setCespiti(prev => prev.map(c => String(c.codicestrumento || "").trim() === codice ? {
      ...c,
      ...datiPuliti
    } : c));
    return aggiornato;
  }
  async function scansionaTarghettaCespite(file) {
    if (!file) return;
    if (!cespiteSelezionato?.codicestrumento) {
      alert("Apri prima una scheda cespite");
      return;
    }
    if (!String(file.type || "").startsWith("image/")) {
      alert("Carica una foto della targhetta in formato immagine");
      return;
    }
    try {
      setOcrTarghettaLoading(true);
      setOcrTarghettaEsito(null);
      const immagineOcr = await preparaImmagineOcrFmed(file);
      const risposta = await chiamataApiAutenticataFmed("/ocr-targhetta", {
        method: "POST",
        body: JSON.stringify({
          filename: immagineOcr.filename || file.name || "targhetta.jpg",
          mime_type: immagineOcr.mime_type || "image/jpeg",
          image_base64: immagineOcr.image_base64,
          diagnostica_client: immagineOcr
        })
      });
      const contenitore = risposta?.dati || risposta?.data || risposta?.risultato || risposta?.ocr || risposta?.estrazione || risposta || {};
      const flat = {
        ...fmedOcrFlatten(risposta || {}),
        ...fmedOcrFlatten(contenitore || {})
      };
      const rawText = fmedOcrPick(flat, ["raw_text", "rawText", "testo_letto", "testo", "ocr_text", "ocrText", "full_text", "fullText"]) || "";
      const costruttore = fmedOcrPick(flat, ["costruttore", "manufacturer", "manufactured_by", "produttore", "marca", "brand", "company", "fabbricante", "legal_manufacturer"]);
      const modello = fmedOcrPick(flat, ["modello", "model", "model_name", "model_number", "nome_modello", "product_model", "device_model", "type", "tipo", "reference_model"]);
      const matricola = fmedOcrPick(flat, ["matricola", "serial_number", "serialnumber", "seriale", "serial", "serial_no", "serialno", "sn", "s_n", "numero_serie", "numeroserie", "numero_seriale", "serie", "n_serie"]);
      const anno = fmedOcrAnnoDaTesto(fmedOcrPick(flat, ["anno_di_fabbricazione", "anno", "year", "manufacturing_year", "year_of_manufacture", "date_of_manufacture", "manufacture_date", "dom", "date"]), rawText);
      const marcaturaCe = fmedOcrPick(flat, ["marcatura_ce", "marcaturaCE", "ce", "ce_mark", "ce_marking"]);
      const alimentazione = fmedOcrPick(flat, ["alimentazione", "power_supply", "voltage", "tensione"]);
      const potenza = fmedOcrPick(flat, ["potenza", "power", "watt", "va"]);
      const frequenza = fmedOcrPick(flat, ["frequenza", "frequency", "hz"]);
      const lotto = fmedOcrPick(flat, ["lotto", "lot", "batch"]);
      const tipologiaDiretta = fmedOcrPick(flat, ["tipologia", "device_type", "equipment_type", "tipo_apparecchiatura", "apparecchiatura", "categoria_ai", "categoria"]);
      const tipologia = tipologiaDiretta || fmedOcrGuessTipologia(`${costruttore} ${modello} ${rawText}`);
      const brancaMedica = fmedOcrPick(flat, ["branca_medica", "branca", "specialita", "specialty", "clinical_area"]) || fmedGuessBrancaMedica(`${costruttore} ${modello} ${tipologia} ${rawText}`);
      const datiOcrSistema = {
        tipologia,
        branca_medica: brancaMedica,
        costruttore,
        modello,
        matricola,
        anno,
        marcatura_ce: marcaturaCe,
        alimentazione,
        potenza,
        frequenza,
        lotto
      };
      const campiCertiOcr = [costruttore, modello, matricola, anno, marcaturaCe, alimentazione, potenza, frequenza, lotto, tipologiaDiretta].filter(valore => String(valore || "").trim());
      if (risposta?.trovato === false || campiCertiOcr.length === 0) {
        const requestId = risposta?.diagnostica?.request_id || "";
        const notaBackend = risposta?.messaggio || contenitore?.note || "Il motore OCR non ha riconosciuto dati tecnici utilizzabili.";
        setOcrTarghettaEsito({
          status: "warning",
          confidence: null,
          note: `${notaBackend}${requestId ? ` • ID richiesta: ${requestId}` : ""}`,
          raw_text: rawText
        });
        return;
      }
      const confermato = fmedOcrConfermaApplicazione(datiOcrSistema, "scheda cespite");
      if (!confermato) {
        setOcrTarghettaEsito({
          status: "annullato",
          confidence: null,
          note: "OCR letto correttamente, ma aggiornamento del cespite annullato dall'utente.",
          raw_text: rawText
        });
        return;
      }
      fmedOcrAggiungiExtra(setExtraCostruttori, costruttore);
      fmedOcrAggiungiExtra(setExtraModelli, modello);
      fmedOcrAggiungiExtra(setExtraTipologie, tipologia);
      fmedOcrAggiungiExtra(setExtraBranche, brancaMedica);
      await salvaCampiSistemaPrimarioCespite({
        tipologia,
        branca_medica: brancaMedica,
        costruttore,
        modello,
        matricola,
        anno_di_fabbricazione: anno,
        marcatura_ce: marcaturaCe,
        alimentazione,
        potenza,
        frequenza,
        lotto
      });
      const confidenceRaw = fmedOcrPick(flat, ["confidence", "confidenza", "score", "accuratezza"]) || "";
      let confidence = Number(String(confidenceRaw).replace(",", "."));
      if (!Number.isFinite(confidence)) confidence = null;
      if (confidence !== null && confidence > 1) confidence = confidence / 100;
      if (confidence !== null) confidence = Math.max(0, Math.min(1, confidence));
      const trovati = [costruttore ? `Costruttore: ${costruttore}` : "", modello ? `Modello: ${modello}` : "", matricola ? `Matricola/SN: ${matricola}` : "", anno ? `Anno: ${anno}` : "", marcaturaCe ? `CE: ${marcaturaCe}` : "", alimentazione ? `Alimentazione: ${alimentazione}` : "", potenza ? `Potenza: ${potenza}` : "", frequenza ? `Frequenza: ${frequenza}` : "", lotto ? `Lotto: ${lotto}` : "", tipologia ? `Tipologia: ${tipologia}` : "", brancaMedica ? `Branca: ${brancaMedica}` : ""].filter(Boolean);
      setOcrTarghettaEsito({
        status: risposta?.status || "ok",
        confidence,
        note: trovati.length ? `Sistema primario aggiornato e salvato: ${trovati.join(" • ")}` : "OCR eseguito, ma non sono stati riconosciuti campi certi.",
        raw_text: rawText
      });
    } catch (err) {
      console.error("Errore OCR sistema primario cespite:", err);
      const messaggio = fmedMessaggioErroreBreve(err, "Errore OCR sistema primario");
      setOcrTarghettaEsito({
        status: "error",
        note: messaggio,
        raw_text: ""
      });
      alert(`OCR sistema primario non riuscito.

${messaggio}`);
    } finally {
      setOcrTarghettaLoading(false);
    }
  }
  function fmedOcrCostruisciRigaAccessorio(flat = {}, rawText = "") {
    const tipoAccessorio = fmedOcrPick(flat, ["tipo_accessorio", "accessorio", "tipologia_accessorio", "tipologia", "device_type", "equipment_type", "categoria", "nome_prodotto", "product_name"]) || fmedOcrGuessTipologia(rawText) || "Accessorio";
    const costruttore = fmedOcrPick(flat, ["costruttore", "manufacturer", "fabbricante", "produttore", "marca", "brand", "company"]);
    const modello = fmedOcrPick(flat, ["modello", "model", "model_name", "model_number", "type", "tipo", "codice_modello"]);
    const matricola = fmedOcrPick(flat, ["matricola", "serial_number", "serialnumber", "seriale", "serial", "serial_no", "serialno", "sn", "s_n", "numero_serie", "numeroserie", "numero_seriale"]);
    const codice = fmedOcrPick(flat, ["codice_articolo", "part_number", "partnumber", "p_n", "pn", "codice_prodotto", "product_code", "product_number", "ref", "reference"]);
    const parti = [];
    if (costruttore) parti.push(costruttore);
    if (tipoAccessorio && tipoAccessorio !== "Accessorio") parti.push(tipoAccessorio);
    if (modello) parti.push(modello);
    if (matricola) parti.push(`SN${matricola}`);
    if (codice) parti.push(`REF/PN: ${codice}`);
    const riga = parti.join(" - ").replace(/\s+/g, " ").trim();
    return {
      riga: riga || "Accessorio da foto - dati non leggibili",
      tipoAccessorio,
      costruttore,
      modello,
      matricola,
      codice
    };
  }
  function fmedAccodaAccessorio(testoAttuale, nuovaRiga) {
    const attuale = String(testoAttuale || "").trim();
    const riga = String(nuovaRiga || "").trim();
    if (!riga) return attuale;
    const righe = attuale.split(/\r?\n/).map(x => x.trim()).filter(Boolean);
    const rigaPulita = riga.replace(/^[-•]\s*/, "").trim();
    const giaPresente = righe.some(x => x.replace(/^[-•]\s*/, "").trim().toUpperCase() === rigaPulita.toUpperCase());
    if (giaPresente) return attuale;
    return [...righe, rigaPulita].join("\n").trim();
  }
  async function salvaSoloAccessoriCespite(nuovoValoreAccessori) {
    if (!cespiteSelezionato?.codicestrumento) {
      throw new Error("Nessun cespite selezionato");
    }
    const codice = String(cespiteSelezionato.codicestrumento || "").trim();
    const codiceUrl = encodeURIComponent(codice);
    let response = null;
    let ultimoErrore = null;
    for (const baseUrl of API_BASE_CANDIDATES) {
      try {
        response = await fetch(`${baseUrl}/cespite/${codiceUrl}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            dati: {
              accessori_sistema_primario: nuovoValoreAccessori || null
            }
          })
        });
        break;
      } catch (err) {
        ultimoErrore = err;
      }
    }
    if (!response) {
      throw new Error(String(ultimoErrore || "Backend non raggiungibile"));
    }
    const testo = await response.text();
    if (!response.ok) {
      throw new Error(`Errore salvataggio accessori (${response.status}): ${testo}`);
    }
    const aggiornato = {
      ...cespiteSelezionato,
      accessori_sistema_primario: nuovoValoreAccessori || ""
    };
    setCespiteSelezionato(aggiornato);
    setFormCespite(prev => ({
      ...prev,
      accessori_sistema_primario: nuovoValoreAccessori || ""
    }));
    setCespiti(prev => prev.map(c => String(c.codicestrumento || "").trim() === codice ? {
      ...c,
      accessori_sistema_primario: nuovoValoreAccessori || ""
    } : c));
    return aggiornato;
  }
  async function aggiungiAccessorioDaFotoCespite(file) {
    if (!file) return;
    if (!cespiteSelezionato?.codicestrumento) {
      alert("Apri prima una scheda cespite");
      return;
    }
    if (!String(file.type || "").startsWith("image/")) {
      alert("Carica una foto dell'accessorio in formato immagine");
      return;
    }
    try {
      setOcrAccessorioLoading(true);
      setOcrAccessorioEsito(null);
      const immagineOcr = await preparaImmagineOcrFmed(file);
      const risposta = await chiamataApiAutenticataFmed("/ocr-accessorio", {
        method: "POST",
        body: JSON.stringify({
          filename: immagineOcr.filename || file.name || "accessorio.jpg",
          mime_type: immagineOcr.mime_type || "image/jpeg",
          image_base64: immagineOcr.image_base64,
          diagnostica_client: immagineOcr
        })
      });
      const contenitore = risposta?.dati || risposta?.data || risposta?.risultato || risposta?.ocr || risposta?.estrazione || risposta || {};
      const flat = {
        ...fmedOcrFlatten(risposta || {}),
        ...fmedOcrFlatten(contenitore || {})
      };
      const rawText = fmedOcrPick(flat, ["raw_text", "rawText", "testo_letto", "testo", "ocr_text", "ocrText", "full_text", "fullText"]) || "";
      const accessorio = fmedOcrCostruisciRigaAccessorio(flat, rawText);
      const valoreAggiornato = fmedAccodaAccessorio(cespiteSelezionato.accessori_sistema_primario || formCespite.accessori_sistema_primario || "", accessorio.riga);
      await salvaSoloAccessoriCespite(valoreAggiornato);
      const confidenceRaw = fmedOcrPick(flat, ["confidence", "confidenza", "score", "accuratezza"]) || "";
      let confidence = Number(String(confidenceRaw).replace(",", "."));
      if (!Number.isFinite(confidence)) confidence = null;
      if (confidence !== null && confidence > 1) confidence = confidence / 100;
      if (confidence !== null) confidence = Math.max(0, Math.min(1, confidence));
      const dettagli = [accessorio.tipoAccessorio ? `Tipo: ${accessorio.tipoAccessorio}` : "", accessorio.costruttore ? `Costruttore: ${accessorio.costruttore}` : "", accessorio.modello ? `Modello: ${accessorio.modello}` : "", accessorio.matricola ? `SN: ${accessorio.matricola}` : "", accessorio.codice ? `REF/PN: ${accessorio.codice}` : ""].filter(Boolean);
      setOcrAccessorioEsito({
        status: risposta?.status || "ok",
        confidence,
        note: dettagli.length ? `Accessorio aggiunto e salvato: ${dettagli.join(" • ")}` : "Accessorio aggiunto. Verifica il campo Accessori / Sistema primario.",
        raw_text: rawText
      });
    } catch (err) {
      console.error("Errore OCR accessorio:", err);
      const messaggio = fmedMessaggioErroreBreve(err, "Errore OCR accessorio");
      setOcrAccessorioEsito({
        status: "error",
        note: messaggio,
        raw_text: ""
      });
      alert(`OCR accessorio non riuscito.

${messaggio}`);
    } finally {
      setOcrAccessorioLoading(false);
    }
  }
  async function aggiungiAccessorioDaFotoNuovoCespite(file) {
    if (!file) return;
    if (!String(file.type || "").startsWith("image/")) {
      alert("Carica una foto dell'accessorio in formato immagine");
      return;
    }
    try {
      setOcrAccessorioLoading(true);
      setOcrAccessorioEsito(null);
      const immagineOcr = await preparaImmagineOcrFmed(file);
      const risposta = await chiamataApiAutenticataFmed("/ocr-accessorio", {
        method: "POST",
        body: JSON.stringify({
          filename: immagineOcr.filename || file.name || "accessorio.jpg",
          mime_type: immagineOcr.mime_type || "image/jpeg",
          image_base64: immagineOcr.image_base64,
          diagnostica_client: immagineOcr
        })
      });
      const contenitore = risposta?.dati || risposta?.data || risposta?.risultato || risposta?.ocr || risposta?.estrazione || risposta || {};
      const flat = {
        ...fmedOcrFlatten(risposta || {}),
        ...fmedOcrFlatten(contenitore || {})
      };
      const rawText = fmedOcrPick(flat, ["raw_text", "rawText", "testo_letto", "testo", "ocr_text", "ocrText", "full_text", "fullText"]) || "";
      const accessorio = fmedOcrCostruisciRigaAccessorio(flat, rawText);
      setFormNuovoCespite(prev => ({
        ...prev,
        // FMED OCR: gli accessori vanno solo qui, mai nelle Note.
        accessori_sistema_primario: fmedAccodaAccessorio(prev.accessori_sistema_primario || "", accessorio.riga)
      }));
      const confidenceRaw = fmedOcrPick(flat, ["confidence", "confidenza", "score", "accuratezza"]) || "";
      let confidence = Number(String(confidenceRaw).replace(",", "."));
      if (!Number.isFinite(confidence)) confidence = null;
      if (confidence !== null && confidence > 1) confidence = confidence / 100;
      if (confidence !== null) confidence = Math.max(0, Math.min(1, confidence));
      const dettagli = [accessorio.tipoAccessorio ? `Tipo: ${accessorio.tipoAccessorio}` : "", accessorio.costruttore ? `Costruttore: ${accessorio.costruttore}` : "", accessorio.modello ? `Modello: ${accessorio.modello}` : "", accessorio.matricola ? `SN: ${accessorio.matricola}` : "", accessorio.codice ? `REF/PN: ${accessorio.codice}` : ""].filter(Boolean);
      setOcrAccessorioEsito({
        status: risposta?.status || "ok",
        confidence,
        note: dettagli.length ? `Accessorio aggiunto al campo Accessori / Sistema primario: ${dettagli.join(" • ")}` : "Accessorio aggiunto al campo Accessori / Sistema primario. Verifica prima di salvare il cespite.",
        raw_text: rawText
      });
    } catch (err) {
      console.error("Errore OCR accessorio nuovo cespite:", err);
      const messaggio = fmedMessaggioErroreBreve(err, "Errore OCR accessorio");
      setOcrAccessorioEsito({
        status: "error",
        note: messaggio,
        raw_text: ""
      });
      alert(`OCR accessorio non riuscito.

${messaggio}`);
    } finally {
      setOcrAccessorioLoading(false);
    }
  }
  async function fmedOcrApprendiCatalogoDaCespite(datiCespite = {}) {
    const payload = {
      dati: {
        costruttore: datiCespite.costruttore || "",
        modello: datiCespite.modello || "",
        tipologia: datiCespite.tipologia || "",
        branca_medica: datiCespite.branca_medica || "",
        categoria: datiCespite.categoria || ""
      }
    };
    const utile = Object.values(payload.dati).some(v => String(v || "").trim());
    if (!utile) return null;
    try {
      const risposta = await chiamataApiAutenticataFmed("/ocr-catalogo-apprendi", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      return risposta;
    } catch (err) {
      // Non deve mai bloccare il salvataggio del cespite.
      console.warn("[FMED OCR AI] Apprendimento catalogo non riuscito:", err);
      return null;
    }
  }
  async function creaNuovoCespite() {
    let codice = String(formNuovoCespite.codicestrumento || "").trim();
    if (!codice && codiceCespiteAutomatico && formNuovoCespite.sede) {
      codice = await generaCodiceCespiteDaBackend(formNuovoCespite.sede);
      if (codice) {
        setFormNuovoCespite(prev => ({
          ...prev,
          codicestrumento: codice
        }));
      }
    }
    if (!codice) {
      alert("Inserisci manualmente il codice inventario oppure seleziona la sede e genera il codice automatico.");
      return;
    }
    const esisteGia = cespiti.some(c => String(c.codicestrumento || "").trim().toUpperCase() === codice.toUpperCase());
    if (esisteGia) {
      alert("Esiste già un cespite con questo codice strumento");
      return;
    }
        const datiDaCreare = {
      codicestrumento: codice,
      codice_strumento: codice,
      tipologia: formNuovoCespite.tipologia || "NON SPECIFICATA",
      costruttore: formNuovoCespite.costruttore || "NON SPECIFICATO",
      modello: formNuovoCespite.modello || "NON SPECIFICATO",
      matricola: formNuovoCespite.matricola || "",
      societa: formNuovoCespite.societa || "MARILAB",
      sede: formNuovoCespite.sede || "NON SPECIFICATA",
      reparto: formNuovoCespite.reparto || "NON SPECIFICATO",
      branca_medica: formNuovoCespite.branca_medica || "",
      area_sanitaria: formNuovoCespite.area_sanitaria || "",
      locazione: formNuovoCespite.locazione || "NON SPECIFICATA",
      categoria: formNuovoCespite.categoria || "E",
      possesso: formNuovoCespite.possesso || "Proprietà",
      anno_di_fabbricazione: formNuovoCespite.anno_di_fabbricazione || "",
      marcatura_ce: formNuovoCespite.marcatura_ce || "",
      alimentazione: formNuovoCespite.alimentazione || "",
      potenza: formNuovoCespite.potenza || "",
      frequenza: formNuovoCespite.frequenza || "",
      lotto: formNuovoCespite.lotto || "",
      prezzo: formNuovoCespite.prezzo || 0,
      data_di_collaudo: formNuovoCespite.data_di_collaudo || "",
      data_messa_in_uso: formNuovoCespite.data_messa_in_uso || "",
      fornitore: formNuovoCespite.fornitore || "NON SPECIFICATO",
      note: formNuovoCespite.note || "",
      accessori_sistema_primario: formNuovoCespite.accessori_sistema_primario || "",
      foto_principale: formNuovoCespite.foto_principale || "",
      foto_targhetta: formNuovoCespite.foto_targhetta || "",
      foto_accessori: formNuovoCespite.foto_accessori || "",
      foto_installazione: formNuovoCespite.foto_installazione || "",
      foto_manutenzione: formNuovoCespite.foto_manutenzione || "",
      foto_guasto: formNuovoCespite.foto_guasto || "",
      foto_dopo_intervento: formNuovoCespite.foto_dopo_intervento || "",
      foto_documentazione: formNuovoCespite.foto_documentazione || "",
      stato_asset: formNuovoCespite.stato_asset || "Attivo"
    };
    try {
      let response = null;
      let ultimoErrorePost = null;
      for (const baseUrl of API_BASE_CANDIDATES) {
        try {
          response = await fetch(`${baseUrl}/cespite`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              dati: datiDaCreare
            })
          });
          break;
        } catch (err) {
          ultimoErrorePost = err;
          console.error("Errore POST cespite su", baseUrl, err);
        }
      }
      if (!response) {
        console.error("POST cespite fallito su tutti i backend", ultimoErrorePost);
        alert("Errore di collegamento con il backend durante la creazione del cespite");
        return;
      }
      const testoRisposta = await response.text();
      let rispostaBackend = {};
      try {
        rispostaBackend = testoRisposta ? JSON.parse(testoRisposta) : {};
      } catch {
        rispostaBackend = {};
      }
      if (!response.ok) {
        console.error("Errore creazione cespite:", response.status, testoRisposta);
        alert(`Errore durante la creazione del cespite (${response.status})`);
        return;
      }
      const datiBackend = Array.isArray(rispostaBackend.risultato) && rispostaBackend.risultato.length ? rispostaBackend.risultato[0] : {};
      const cespiteCreato = {
        ...datiDaCreare,
        ...datiBackend,
        codicestrumento: rispostaBackend.codice || datiBackend.codicestrumento || codice,
        link_documento: datiBackend.link_documento || rispostaBackend.link_documento || datiDaCreare.link_documento || null,
        stato_asset: formNuovoCespite.stato_asset || "Attivo"
      };
      await fmedOcrApprendiCatalogoDaCespite(cespiteCreato);
      setCespiti(prev => [cespiteCreato, ...prev]);
      setNuovoCespiteOpen(false);
      resetFormNuovoCespite();
      alert("Nuovo cespite creato correttamente. QR pronto nella scheda cespite.");
      apriSchedaCespite(cespiteCreato);
    } catch (err) {
      console.error("Errore rete creazione cespite:", err);
      alert("Errore di collegamento con il backend durante la creazione del cespite");
    }
  }
  function valorePulitoPerTipo(tipo, valore) {
    return tipo === "attivita" ? normalizzaAttivitaIntervento(valore) : pulisciValoreDizionario(valore);
  }
  function configurazioneDizionario(tipo) {
    return {
      tipologia: {
        valore: nuovaTipologia,
        setterLista: setExtraTipologie,
        setterInput: setNuovaTipologia,
        label: "Tipologia"
      },
      sede: {
        valore: nuovaSede,
        setterLista: setExtraSedi,
        setterInput: setNuovaSede,
        label: "Sede"
      },
      costruttore: {
        valore: nuovoCostruttore,
        setterLista: setExtraCostruttori,
        setterInput: setNuovoCostruttore,
        label: "Produttore / Costruttore"
      },
      reparto: {
        valore: nuovoReparto,
        setterLista: setExtraReparti,
        setterInput: setNuovoReparto,
        label: "Reparto"
      },
      branca_medica: {
        valore: nuovaBranca,
        setterLista: setExtraBranche,
        setterInput: setNuovaBranca,
        label: "Branca medica"
      },
      locazione: {
        valore: nuovaLocazione,
        setterLista: setExtraLocazioni,
        setterInput: setNuovaLocazione,
        label: "Locazione"
      },
      modello: {
        valore: nuovoModello,
        setterLista: setExtraModelli,
        setterInput: setNuovoModello,
        label: "Modello"
      },
      fornitore: {
        valore: nuovoFornitore,
        setterLista: setExtraFornitori,
        setterInput: setNuovoFornitore,
        label: "Fornitore"
      },
      ditta: {
        valore: nuovaDitta,
        setterLista: setExtraDitte,
        setterInput: setNuovaDitta,
        label: "Ditta esecutrice"
      },
      attivita: {
        valore: nuovaAttivita,
        setterLista: setExtraAttivita,
        setterInput: setNuovaAttivita,
        label: "Attività intervento"
      },
      categoria: {
        valore: nuovaCategoria,
        setterLista: setExtraCategorie,
        setterInput: setNuovaCategoria,
        label: "Categoria"
      },
      societa: {
        valore: nuovaSocieta,
        setterLista: setExtraSocieta,
        setterInput: setNuovaSocieta,
        label: "Società"
      },
      possesso: {
        valore: nuovoPossesso,
        setterLista: setExtraPossesso,
        setterInput: setNuovoPossesso,
        label: "Possesso"
      },
      stato_asset: {
        valore: nuovoStatoAsset,
        setterLista: setExtraStatiAsset,
        setterInput: setNuovoStatoAsset,
        label: "Stato cespite"
      },
      esito: {
        valore: nuovoEsito,
        setterLista: setExtraEsiti,
        setterInput: setNuovoEsito,
        label: "Esito intervento"
      },
      priorita: {
        valore: nuovaPriorita,
        setterLista: setExtraPriorita,
        setterInput: setNuovaPriorita,
        label: "Priorità"
      }
    }[tipo];
  }
  function aggiungiValoreLocale(tipo) {
    const cfg = configurazioneDizionario(tipo);
    if (!cfg) return;
    const valore = valorePulitoPerTipo(tipo, cfg.valore);
    if (!valore) return;
    if (valore.includes("HTTP://") || valore.includes("HTTPS://") || valore.includes("SHAREPOINT")) {
      alert("Questo valore sembra un link o un dato sporco: non viene aggiunto al dizionario.");
      return;
    }
    cfg.setterLista(prev => [...new Set([...(prev || []), valore])].sort((a, b) => a.localeCompare(b, "it", {
      numeric: true,
      sensitivity: "base"
    })));
    setDizionariRimossi(prev => {
      const aggiornati = {
        ...prev,
        [tipo]: (prev?.[tipo] || []).filter(v => valorePulitoPerTipo(tipo, v) !== valore)
      };
      localStorage.setItem("fmed_dizionari_rimossi", JSON.stringify(aggiornati));
      return aggiornati;
    });
    cfg.setterInput("");
  }
  function rimuoviValoreLocale(tipo, valoreDaRimuovere) {
    const valore = valorePulitoPerTipo(tipo, valoreDaRimuovere);
    if (!valore) return;
    const conferma = window.confirm(`Rimuovere "${valore}" dal dizionario?\n\nLa voce verrà nascosta dai menu a tendina. I dati già presenti nei cespiti/interventi non vengono cancellati dal database.`);
    if (!conferma) return;
    const cfg = configurazioneDizionario(tipo);
    if (cfg?.setterLista) {
      cfg.setterLista(prev => (prev || []).filter(v => valorePulitoPerTipo(tipo, v) !== valore));
    }
    setDizionariRimossi(prev => {
      const attuali = new Set((prev?.[tipo] || []).map(v => valorePulitoPerTipo(tipo, v)));
      attuali.add(valore);
      const aggiornati = {
        ...prev,
        [tipo]: [...attuali].sort((a, b) => a.localeCompare(b, "it", {
          numeric: true,
          sensitivity: "base"
        }))
      };
      localStorage.setItem("fmed_dizionari_rimossi", JSON.stringify(aggiornati));
      return aggiornati;
    });
    if (dizionarioInModifica?.tipo === tipo && dizionarioInModifica?.valore === valore) {
      setDizionarioInModifica(null);
      setValoreDizionarioInModifica("");
    }
  }
  function avviaModificaValoreLocale(tipo, valore) {
    try {
      const valorePulito = valorePulitoPerTipo(tipo, valore);
      if (!tipo || !valorePulito) return;
      setDizionarioInModifica({
        tipo,
        valore: valorePulito
      });
      setValoreDizionarioInModifica(valorePulito);
    } catch (err) {
      console.error("Errore avvio modifica dizionario:", err);
      alert("Errore durante l'apertura della modifica del dizionario.");
    }
  }
  function annullaModificaValoreLocale() {
    setDizionarioInModifica(null);
    setValoreDizionarioInModifica("");
  }
  function campiDatabasePerDizionario(tipo) {
    const mappa = {
      tipologia: {
        cespiti: ["tipologia"],
        interventi: ["tipologia"]
      },
      sede: {
        cespiti: ["sede"],
        interventi: ["sede"]
      },
      costruttore: {
        cespiti: ["costruttore"],
        interventi: ["costruttore"]
      },
      reparto: {
        cespiti: ["reparto"],
        interventi: ["reparto"]
      },
      locazione: {
        cespiti: ["locazione"],
        interventi: []
      },
      modello: {
        cespiti: ["modello"],
        interventi: ["modello"]
      },
      fornitore: {
        cespiti: ["fornitore"],
        interventi: []
      },
      // Ditta esecutrice/esecutrice NON deve modificare societa/committente.
      ditta: {
        cespiti: [],
        interventi: ["ditta_esecutrice"]
      },
      attivita: {
        cespiti: [],
        interventi: ["attivita"]
      },
      categoria: {
        cespiti: ["categoria"],
        interventi: []
      },
      societa: {
        cespiti: ["societa"],
        interventi: ["societa"]
      },
      possesso: {
        cespiti: ["possesso"],
        interventi: []
      },
      esito: {
        cespiti: [],
        interventi: ["esito"]
      }
    };
    return mappa[tipo] || {
      cespiti: [],
      interventi: []
    };
  }
  function recordHaValoreDizionario(record, campi = [], tipo, valoreOriginale) {
    return (campi || []).some(campo => valorePulitoPerTipo(tipo, record?.[campo]) === valoreOriginale);
  }
  async function aggiornaCespiteDaDizionario(cespite, datiDaSalvare) {
    const codice = String(cespite?.codicestrumento || "").trim();
    if (!codice) return;
    const response = await fetch(`${API_BASE_URL}/cespite/${encodeURIComponent(codice)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dati: datiDaSalvare
      })
    });
    const testoRisposta = await response.text();
    if (!response.ok) {
      throw new Error(`Errore aggiornamento cespite ${codice}: ${response.status} ${testoRisposta}`);
    }
  }
  async function aggiornaInterventoDaDizionario(intervento, datiDaSalvare) {
    const id = idIntervento(intervento);
    if (!id) {
      console.warn("Intervento senza ID, impossibile aggiornare da dizionario:", intervento);
      return;
    }
    const datiCompleti = {
      ...normalizzaInterventoPerForm(intervento),
      ...datiDaSalvare
    };
    const tentativi = [`${API_BASE_URL}/interventi/${encodeURIComponent(String(id))}`, `${API_BASE_URL}/intervento/${encodeURIComponent(String(id))}`];
    let ultimoErrore = "";
    for (const url of tentativi) {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dati: datiCompleti
        })
      });
      const testoRisposta = await response.text();
      if (response.ok) return;
      ultimoErrore = `${response.status} ${testoRisposta}`;
    }
    throw new Error(`Errore aggiornamento intervento ${id}: ${ultimoErrore}`);
  }
  async function salvaModificaValoreLocale(tipo, valoreOriginale) {
    try {
      const originale = valorePulitoPerTipo(tipo, valoreOriginale);
      const nuovo = valorePulitoPerTipo(tipo, valoreDizionarioInModifica);
      if (!nuovo) {
        alert("Il nuovo valore non può essere vuoto.");
        return;
      }
      if (nuovo === originale) {
        setDizionarioInModifica(null);
        setValoreDizionarioInModifica("");
        return;
      }
      const cfg = configurazioneDizionario(tipo);
      if (!cfg?.setterLista) return;
      const campi = campiDatabasePerDizionario(tipo);
      const cespitiDaAggiornare = (Array.isArray(cespiti) ? cespiti : []).filter(c => recordHaValoreDizionario(c, campi.cespiti, tipo, originale));
      const interventiDaAggiornare = (Array.isArray(interventi) ? interventi : []).filter(i => recordHaValoreDizionario(i, campi.interventi, tipo, originale));
      const messaggioConferma = `Rinominare "${originale}" in "${nuovo}"?

` + `Cespiti da aggiornare: ${cespitiDaAggiornare.length}
` + `Interventi da aggiornare: ${interventiDaAggiornare.length}

` + "La modifica verrà salvata nel database, non solo nel dizionario locale.";
      if ((cespitiDaAggiornare.length || interventiDaAggiornare.length) && !window.confirm(messaggioConferma)) {
        return;
      }
      const datiCespite = Object.fromEntries((campi.cespiti || []).map(campo => [campo, nuovo]));
      const datiIntervento = Object.fromEntries((campi.interventi || []).map(campo => [campo, nuovo]));
      for (const cespite of cespitiDaAggiornare) {
        await aggiornaCespiteDaDizionario(cespite, datiCespite);
      }
      for (const intervento of interventiDaAggiornare) {
        await aggiornaInterventoDaDizionario(intervento, datiIntervento);
      }
      cfg.setterLista(prev => [...new Set([...(prev || []).filter(v => valorePulitoPerTipo(tipo, v) !== originale), nuovo])].sort((a, b) => a.localeCompare(b, "it", {
        numeric: true,
        sensitivity: "base"
      })));
      setDizionariRimossi(prev => {
        const aggiornati = {
          ...prev,
          [tipo]: (prev?.[tipo] || []).filter(v => valorePulitoPerTipo(tipo, v) !== nuovo).filter(v => valorePulitoPerTipo(tipo, v) !== originale)
        };
        localStorage.setItem("fmed_dizionari_rimossi", JSON.stringify(aggiornati));
        return aggiornati;
      });
      setCespiti(prev => (prev || []).map(c => {
        if (!recordHaValoreDizionario(c, campi.cespiti, tipo, originale)) return c;
        return {
          ...c,
          ...datiCespite
        };
      }));
      setInterventi(prev => (prev || []).map(i => {
        if (!recordHaValoreDizionario(i, campi.interventi, tipo, originale)) return i;
        return {
          ...i,
          ...datiIntervento
        };
      }));
      setScadenze(prev => (prev || []).map(s => {
        if (!recordHaValoreDizionario(s, campi.interventi, tipo, originale)) return s;
        return {
          ...s,
          ...datiIntervento
        };
      }));
      if (cespiteSelezionato && recordHaValoreDizionario(cespiteSelezionato, campi.cespiti, tipo, originale)) {
        const aggiornato = {
          ...cespiteSelezionato,
          ...datiCespite
        };
        setCespiteSelezionato(aggiornato);
        setFormCespite(prev => ({
          ...prev,
          ...datiCespite
        }));
      }
      setDizionarioInModifica(null);
      setValoreDizionarioInModifica("");
      alert(`Dizionario aggiornato correttamente.

` + `Valore precedente: ${originale}
` + `Nuovo valore: ${nuovo}
` + `Cespiti aggiornati: ${cespitiDaAggiornare.length}
` + `Interventi aggiornati: ${interventiDaAggiornare.length}`);
    } catch (err) {
      console.error("Errore salvataggio modifica dizionario:", err);
      alert("Errore durante il salvataggio della modifica del dizionario.\n\n" + (err?.message || err));
    }
  }
  function resetFormNuovoIntervento(cespite = null) {
    setFormNuovoIntervento({
      codice_strumento: cespite?.codicestrumento || "",
      sede: cespite?.sede || "",
      locazione: cespite?.locazione || "",
      branca_medica: cespite?.branca_medica || cespite?.branca || "",
      tipologia: cespite?.tipologia || "",
      attivita: "MANUTENZIONE ORDINARIA",
      costruttore: cespite?.costruttore || "",
      modello: cespite?.modello || "",
      reparto: cespite?.reparto || "",
      matricola: cespite?.matricola || "",
      societa: cespite?.societa || "",
      ditta_esecutrice: "",
      link_documento: "",
      descrizione_attivita: "",
      esito: "",
      costo: "",
      data_ultimo_intervento: "",
      data_prossimo_intervento: "",
      periodicita: "",
      importo_extra: ""
    });
  }
  function apriNuovoIntervento(cespite = null) {
    setProcessoNuovoInterventoGuidato(false);
    setProcessoGuidatoEsecuzioneId(null);
    resetFormNuovoIntervento(cespite);

    // Se arrivo dalla scheda cespite, chiudo prima la scheda
    // e apro direttamente il popup di inserimento intervento già precompilato.
    if (cespite) {
      setCespiteSelezionato(null);
    }
    setNuovoInterventoOpen(true);
  }

  async function aggiornaProcessoNuovoIntervento(payload) {
    if (!processoGuidatoEsecuzioneId) return;
    try {
      await fetch(`${API_BASE_URL}/core/processi/esecuzioni/${processoGuidatoEsecuzioneId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.warn("Aggiornamento processo Nuovo intervento non riuscito:", error);
    }
  }

  async function selezionaCespiteNuovoIntervento(cespite) {
    resetFormNuovoIntervento(cespite);
    if (!processoNuovoInterventoGuidato || processoGuidatoEsecuzioneId) return;
    try {
      const row = await creaEsecuzioneProcessoFmed("NUOVO_INTERVENTO", {
        codice_strumento: cespite?.codicestrumento || "",
        sede: cespite?.sede || "",
        tipologia: cespite?.tipologia || cespite?.categoria || "",
        matricola: cespite?.matricola || "",
        modello: cespite?.modello || "",
      });
      const id = row?.id || null;
      setProcessoGuidatoEsecuzioneId(id);
      if (id) {
        await fetch(`${API_BASE_URL}/core/processi/esecuzioni/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            passo_corrente: "TIPOLOGIA",
            percentuale: 15,
            riferimento_modulo: "ASSET",
            riferimento_id: cespite?.codicestrumento || null,
            dati: { cespite_selezionato: cespite?.codicestrumento || null }
          })
        });
      }
    } catch (error) {
      console.error("Errore avvio processo Nuovo intervento:", error);
      alert(`Cespite selezionato, ma il registro del processo non è disponibile: ${error?.message || error}`);
    }
  }

  async function chiudiNuovoIntervento({ annullaProcesso = true } = {}) {
    if (annullaProcesso && processoNuovoInterventoGuidato && processoGuidatoEsecuzioneId) {
      await aggiornaProcessoNuovoIntervento({
        stato: "ANNULLATO",
        passo_corrente: "ANNULLATO_DALL_UTENTE",
        errori: [],
      });
    }
    setNuovoInterventoOpen(false);
    resetFormNuovoIntervento(null);
    setProcessoNuovoInterventoGuidato(false);
    setProcessoGuidatoEsecuzioneId(null);
  }

  useEffect(() => {
    if (!nuovoInterventoOpen) return;
    const codice = String(formNuovoIntervento.codice_strumento || "").trim();
    if (!codice) return;
    const cespite = fmedTrovaCespitePerCodice(cespiti, codice);
    if (!cespite) return;
    setFormNuovoIntervento(prev => ({
      ...prev,
      sede: prev.sede || cespite.sede || "",
      locazione: prev.locazione || cespite.locazione || "",
      branca_medica: prev.branca_medica || cespite.branca_medica || cespite.branca || "",
      tipologia: prev.tipologia || cespite.tipologia || "",
      costruttore: prev.costruttore || cespite.costruttore || "",
      modello: prev.modello || cespite.modello || "",
      reparto: prev.reparto || cespite.reparto || "",
      matricola: prev.matricola || cespite.matricola || "",
      societa: prev.societa || cespite.societa || "",
      link_documento: prev.link_documento || cespite.link_documento || ""
    }));
  }, [nuovoInterventoOpen, formNuovoIntervento.codice_strumento, cespiti]);
  function idIntervento(intervento) {
    if (!intervento || typeof intervento !== "object") return "";
    return intervento.id || intervento.ID || intervento.id_intervento || intervento.ID_INTERVENTO || intervento.intervento_id || intervento.idintervento || intervento.Id || "";
  }
  function normalizzaInterventoPerForm(intervento) {
    return {
      codice_strumento: intervento?.codice_strumento || intervento?.codicestrumento || "",
      sede: intervento?.sede || "",
      locazione: intervento?.locazione || "",
      branca_medica: intervento?.branca_medica || intervento?.branca || "",
      tipologia: intervento?.tipologia || "",
      attivita: intervento?.attivita || "",
      costruttore: intervento?.costruttore || "",
      modello: intervento?.modello || "",
      reparto: intervento?.reparto || "",
      matricola: intervento?.matricola || "",
      societa: intervento?.societa || "",
      ditta_esecutrice: intervento?.ditta_esecutrice || intervento?.ditta || "",
      link_documento: intervento?.link_documento || getJobReportRaw(intervento) || "",
      descrizione_attivita: intervento?.descrizione_attivita || intervento?.descrizione || intervento?.note || "",
      esito: intervento?.esito || "",
      costo: intervento?.costo || "",
      data_ultimo_intervento: formattaDataPerInputDate(intervento?.data_ultimo_intervento),
      data_prossimo_intervento: formattaDataPerInputDate(intervento?.data_prossimo_intervento),
      periodicita: intervento?.periodicita || "",
      importo_extra: intervento?.importo_extra || ""
    };
  }
  function apriModificaIntervento(intervento) {
    // chiudiamo subito la scheda asset e apriamo direttamente la scheda intervento.
    // Evita la sovrapposizione dei due popup e rende il flusso più chiaro anche da telefono.
    setCespiteSelezionato(null);
    setModificaCespite(false);
    setModificaLinkDoc(false);
    setStoricoCespiteOpen(false);
    setInterventoDaModificare(intervento);
    setFormModificaIntervento(normalizzaInterventoPerForm(intervento));
    setModificaInterventoOpen(true);
  }
  function apriModificaUltimoInterventoCespite() {
    const lista = Array.isArray(interventiCespite) ? [...interventiCespite] : [];
    if (lista.length === 0) {
      alert("Nessun intervento disponibile da modificare per questo cespite");
      return;
    }
    const ultimo = lista.sort((a, b) => {
      const dataA = parseDataFMED(a.data_ultimo_intervento || a.data_prossimo_intervento) || new Date(0);
      const dataB = parseDataFMED(b.data_ultimo_intervento || b.data_prossimo_intervento) || new Date(0);
      return dataB - dataA;
    })[0];
    apriModificaIntervento(ultimo);
  }
  async function salvaModificaIntervento() {
    if (!interventoDaModificare) {
      alert("Nessun intervento selezionato");
      return;
    }
    const id = idIntervento(interventoDaModificare);
    if (!id) {
      alert("Non trovo l'ID dell'intervento da modificare.\n\n" + "Serve che il backend esponga un campo ID per ogni riga intervento.");
      return;
    }
    const datiDaSalvare = {
      codice_strumento: formModificaIntervento.codice_strumento || null,
      sede: formModificaIntervento.sede || null,
      tipologia: formModificaIntervento.tipologia || null,
      attivita: formModificaIntervento.attivita || null,
      costruttore: formModificaIntervento.costruttore || null,
      modello: formModificaIntervento.modello || null,
      reparto: formModificaIntervento.reparto || null,
      matricola: formModificaIntervento.matricola || null,
      societa: formModificaIntervento.societa || null,
      ditta_esecutrice: formModificaIntervento.ditta_esecutrice || null,
      link_documento: formModificaIntervento.link_documento || null,
      descrizione_attivita: formModificaIntervento.descrizione_attivita || null,
      esito: formModificaIntervento.esito || null,
      costo: formModificaIntervento.costo || null,
      data_ultimo_intervento: formModificaIntervento.data_ultimo_intervento || null,
      data_prossimo_intervento: formModificaIntervento.data_prossimo_intervento || null,
      periodicita: formModificaIntervento.periodicita || null,
      importo_extra: formModificaIntervento.importo_extra || null
    };
    const idUrl = encodeURIComponent(String(id));
    const tentativi = [`${API_BASE_URL}/interventi/${idUrl}`, `${API_BASE_URL}/intervento/${idUrl}`];
    try {
      let response = null;
      let testoRisposta = "";
      for (const url of tentativi) {
        response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            dati: datiDaSalvare
          })
        });
        testoRisposta = await response.text();
        if (response.ok) break;
      }
      if (!response || !response.ok) {
        console.error("Errore modifica intervento:", response?.status, testoRisposta);
        alert(`Errore durante la modifica dell'intervento (${response?.status || "nessuna risposta"}).\n\n` + "Se il backend non ha ancora il PUT /interventi/{id}, va aggiunto lato FastAPI.");
        return;
      }
      const codice = formModificaIntervento.codice_strumento || interventoDaModificare.codice_strumento || interventoDaModificare.codicestrumento;
      await ricaricaDatiInterventi(codice);
      setModificaInterventoOpen(false);
      setInterventoDaModificare(null);
      setFormModificaIntervento({});
      alert("Intervento modificato correttamente");
    } catch (err) {
      console.error("Errore rete modifica intervento:", err);
      alert("Errore di collegamento con il backend durante la modifica dell'intervento");
    }
  }
  async function eliminaIntervento(intervento) {
    const id = idIntervento(intervento);
    if (!id) {
      alert("Non trovo l'ID dell'intervento da eliminare.\n\n" + "Serve che il backend esponga un campo ID o id_intervento per ogni riga.");
      return;
    }
    const codice = intervento?.codice_strumento || intervento?.codicestrumento || cespiteSelezionato?.codicestrumento || "";
    const conferma = window.confirm(`Vuoi eliminare definitivamente questo intervento?\n\n` + `Codice: ${codice || "-"}\n` + `Attività: ${intervento?.attivita || "-"}\n` + `Data: ${formattaData(intervento?.data_ultimo_intervento)}`);
    if (!conferma) return;
    try {
      const response = await fetch(`${API_BASE_URL}/interventi/${encodeURIComponent(String(id))}`, {
        method: "DELETE"
      });
      const testoRisposta = await response.text();
      if (!response.ok) {
        console.error("Errore eliminazione intervento:", response.status, testoRisposta);
        alert(`Errore durante l'eliminazione dell'intervento (${response.status}).\n\n` + "Verifica che il backend sia avviato e che la rotta DELETE /interventi/{id_intervento} sia presente.");
        return;
      }
      await ricaricaDatiInterventi(codice);
      alert("Intervento eliminato correttamente");
    } catch (err) {
      console.error("Errore rete eliminazione intervento:", err);
      alert("Errore di collegamento con il backend durante l'eliminazione dell'intervento");
    }
  }
  function esportaScadenzePdf() {
    const scadenzeDaEsportare = scadenzeSelezionateVisualizzate;
    if (scadenzeDaEsportare.length === 0) {
      alert("Seleziona almeno una scadenza da esportare in PDF.");
      return;
    }
    const righe = scadenzeDaEsportare.map(s => {
      const data = s._dataScadenza || s.data_prossimo_intervento || s.prossima_scadenza || s.data_scadenza;
      const stato = s._statoScadenza || statoScadenza(data);
      const giorni = stato.giorni;
      const testoGiorni = giorni === null ? "-" : giorni < 0 ? `${Math.abs(giorni)} gg fa` : `${giorni} gg`;
      return {
        codice: s.codice_strumento || s.codicestrumento || "-",
        sede: s.sede || "-",
        tipologia: s.tipologia || "-",
        attivita: s.attivita || "-",
        ditta: s.ditta_esecutrice || s.ditta || "-",
        ultimo: formattaData(s._dataUltimoIntervento || s.data_ultimo_intervento),
        prossima: formattaData(data),
        giorni: testoGiorni,
        stato: stato.testo,
        codiceStato: stato.codice
      };
    });
    const htmlRighe = righe.map(r => {
      const classe = r.codiceStato === "SCADUTA" ? "badge red" : r.codiceStato === "30_GIORNI" ? "badge orange" : r.codiceStato === "60_GIORNI" ? "badge yellow" : "badge green";
      return `
        <tr>
          <td>${r.codice}</td>
          <td>${r.sede}</td>
          <td>${r.tipologia}</td>
          <td>${r.attivita}</td>
          <td>${r.ditta}</td>
          <td>${r.ultimo}</td>
          <td>${r.prossima}</td>
          <td>${r.giorni}</td>
          <td><span class="${classe}">${r.stato}</span></td>
        </tr>`;
    }).join("");
        const finestra = window.open("", "_blank");
    if (!finestra) {
      alert("Popup bloccato dal browser. Abilita i popup per esportare il PDF.");
      return;
    }
    finestra.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>Scadenze manutentive</title>
        <style>
          @page { size: A4 landscape; margin: 10mm; }

          body {
            margin: 0;
            font-family: "Arial Nova Light", "Arial Nova", Arial, sans-serif;
            background: #f4f7fb;
            color: #0E1B42;
          }

          .header {
            background: linear-gradient(135deg, #00194d 0%, #002f7a 55%, #004c99 100%);
            color: white;
            padding: 34px 42px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 0 0 28px 28px;
          }

          .header h1 {
            margin: 0;
            font-size: 34px;
            letter-spacing: -0.5px;
            color: white;
          }

          .header p {
            margin: 8px 0 0;
            font-size: 13px;
            color: #dceaff;
          }

          .logoBox {
            width: 108px;
            height: 82px;
            border-radius: 10px;
            background: rgba(255,255,255,.96);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 6px;
            box-shadow: 0 8px 24px rgba(0,0,0,.18);
            flex: 0 0 auto;
          }
          .logo {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
          }

          .summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin: 20px 26px;
          }

          .card {
            background: white;
            border: 1px solid #d9e6f5;
            border-radius: 16px;
            padding: 14px 16px;
            box-shadow: 0 8px 22px rgba(14, 27, 66, 0.08);
          }

          .card .label {
            font-size: 11px;
            color: #5f6f89;
            text-transform: uppercase;
            letter-spacing: .5px;
          }

          .card .value {
            margin-top: 6px;
            font-size: 24px;
            font-weight: 400;
            color: #00194d;
          }

          table {
            width: calc(100% - 52px);
            margin: 8px 26px 0;
            border-collapse: collapse;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 22px rgba(14, 27, 66, 0.08);
            font-size: 9.5px;
          }

          th {
            background: #3F4642;
            color: white;
            text-align: left;
            padding: 9px 8px;
            font-weight: 400;
            vertical-align: middle;
          }

          td {
            padding: 8px;
            border-bottom: 1px solid #e5edf7;
            text-align: left;
            vertical-align: middle;
          }

          tr:nth-child(even) td {
            background: #f8fbff;
          }

          .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 999px;
            font-weight: 400;
            font-size: 9px;
          }

          .red {
            background: #ffe2e2;
            color: #b42318;
          }

          .orange {
            background: #fff0dc;
            color: #b54708;
          }

          .yellow {
            background: #fff8d8;
            color: #8a6100;
          }

          .green {
            background: #dcfce7;
            color: #027a48;
          }

          .footer {
            margin: 18px 26px 0;
            font-size: 10px;
            color: #61718a;
          }

            /* FMED PRINT STANDARD - ripete intestazioni tabella su ogni pagina PDF */
            thead {
              display: table-header-group;
            }
            tfoot {
              display: table-footer-group;
            }
            table {
              page-break-inside: auto;
              break-inside: auto;
            }
            tr {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            th {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @media print {
              thead {
                display: table-header-group;
              }
              tfoot {
                display: table-footer-group;
              }
              tr {
                page-break-inside: avoid;
                break-inside: avoid;
              }
              .header, th {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
        </style>
      </head>

      <body>
        <div class="header">
          <div>
            <h1>Criterio: scadenze future entro 30 giorni dalla data di prossimo intervento. Esclusi collaudi, fermi macchina e manutenzioni straordinarie.</h1>
          </div>
        </div>

        <div class="summary">
          <div class="card">
            <div class="label">Totale scadenze</div>
            <div class="value">${righe.length}</div>
          </div>
          <div class="card">
            <div class="label">Scadute</div>
            <div class="value">${righe.filter(r => r.codiceStato === "SCADUTA").length}</div>
          </div>
          <div class="card">
            <div class="label">Entro 30 giorni</div>
            <div class="value">${righe.filter(r => r.codiceStato === "30_GIORNI").length}</div>
          </div>
          <div class="card">
            <div class="label">Entro 60 giorni</div>
            <div class="value">${righe.filter(r => r.codiceStato === "60_GIORNI").length}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Codice</th>
              <th>Sede</th>
              <th>Tipologia</th>
              <th>Attività</th>
              <th>Ditta</th>
              <th>Ultimo intervento</th>
              <th>Prossima scadenza</th>
              <th>Giorni</th>
              <th>Stato</th>
            </tr>
          </thead>
          <tbody>${htmlRighe}</tbody>
        </table>

      </body>
    </html>
  `);
    finestra.document.close();
    finestra.focus();
    setTimeout(() => finestra.print(), 500);
  }
  function escapeExcelHtml(value) {
    return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function nomeFileSicuro(testo) {
    return String(testo || "").trim().replace(/[\\/:*?"<>|]/g, "_").replace(/\s+/g, "_").toUpperCase();
  }
  function pulisciTitoloReportMrdb(testo) {
    return String(testo || "").replace(/\bFMED\s*-\s*/gi, "").replace(/\bFMED\s*3\.0\b/gi, "").replace(/\bFMED\b/gi, "").replace(/\s+[-–—]\s*$/g, "").replace(/\s{2,}/g, " ").trim();
  }
  function scaricaExcelFmed({
    nomeFile,
    titolo,
    sottotitolo,
    meta = [],
    colonne = [],
    righe = []
  }) {
    const oggi = formattaData(new Date());
    const sitoFmed = window.location.origin || "FMED";
    const numeroColonne = Math.max(colonne.length, 1);
    const metaHtml = meta.filter(Boolean).map(m => escapeExcelHtml(m)).join(" · ");
    const intestazioni = colonne.map(c => `<th>${escapeExcelHtml(c.label)}</th>`).join("");
    const corpo = righe.map((r, idx) => {
      const celle = colonne.map(c => {
        const valore = escapeExcelHtml(typeof c.value === "function" ? c.value(r, idx) : r[c.key]);
        const classe = typeof c.className === "function" ? c.className(r, idx) : c.className || "";
        return `<td class="${escapeExcelHtml(classe)}">${valore}</td>`;
      }).join("");
      return `<tr>${celle}</tr>`;
    }).join("");
    const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8" />
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>FMED Export</x:Name>
                <x:WorksheetOptions>
                  <x:FreezePanes/>
                  <x:FrozenNoSplit/>
                  <x:SplitHorizontal>5</x:SplitHorizontal>
                  <x:TopRowBottomPane>5</x:TopRowBottomPane>
                  <x:ActivePane>2</x:ActivePane>
                </x:WorksheetOptions>
                <x:AutoFilter x:Range="R4C1:R4C${numeroColonne}"/>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          body { font-family: "Arial Nova Light", "Arial Nova", Arial, sans-serif; color: #0E1B42; }
          table { border-collapse: collapse; width: 100%; }
          .titleRow td { background: #3F4642; color: white; font-size: 15px; font-weight: 400; padding: 9px 12px; border: 1px solid #3F4642; }
          .subtitleRow td { background: #EEF3EA; color: #5F6B60; font-size: 10px; font-weight: 400; padding: 6px 12px; border: 1px solid #D8CBB9; }
          .criteriaRow td { background: #FFFCF6; color: #5F6B60; font-size: 9px; padding: 5px 12px; border: 1px solid #D8CBB9; }
          .metaRow td { background: #FFFCF6; color: #52627A; font-size: 9px; padding: 5px 12px; border: 1px solid #D8CBB9; }
          th { background: #3F4642; color: white; font-weight: 400; border: 1px solid #D8CBB9; padding: 8px; mso-number-format:"@"; text-align: left; vertical-align: middle; }
          td { border: 1px solid #D8CBB9; padding: 7px; mso-number-format:"@"; text-align: left; vertical-align: middle; }
          tr:nth-child(even) td { background: #F8FBFF; }
          .semaforoRosso { background: #FFE2E2 !important; color: #9A1111; font-weight: 400; }
          .semaforoGiallo { background: #FFF2CC !important; color: #7A5200; font-weight: 400; }
          .semaforoVerde { background: #DCFCE7 !important; color: #006B3A; font-weight: 400; }
          .semaforoBlu { background: #EEF3EA !important; color: #5F6B60; font-weight: 400; }
          .textLeft { text-align: left !important; vertical-align: top !important; white-space: normal; }
          .note { color: #61718A; font-size: 10px; padding-top: 10px; }

            /* FMED PRINT STANDARD - ripete intestazioni tabella su ogni pagina PDF */
            thead {
              display: table-header-group;
            }
            tfoot {
              display: table-footer-group;
            }
            table {
              page-break-inside: auto;
              break-inside: auto;
            }
            tr {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            th {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @media print {
              thead {
                display: table-header-group;
              }
              tfoot {
                display: table-footer-group;
              }
              tr {
                page-break-inside: avoid;
                break-inside: avoid;
              }
              .header, th {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
        </style>
      </head>
      <body>
        <table>
          <tr class="titleRow"><td colspan="${numeroColonne}">FMED Export · ${escapeExcelHtml(pulisciTitoloReportMrdb(titolo))}</td></tr>
          <tr class="subtitleRow"><td colspan="${numeroColonne}">${escapeExcelHtml(sottotitolo || "Report operativo")}</td></tr>
          <tr class="metaRow"><td colspan="${numeroColonne}">Sito: ${escapeExcelHtml(sitoFmed)} · Generato il ${escapeExcelHtml(oggi)}${metaHtml ? " · " + metaHtml : ""}</td></tr>
          <tr>${intestazioni}</tr>
          ${corpo}
        </table>
      </body>
    </html>
  `;
    const blob = new Blob([html], {
      type: "application/vnd.ms-excel;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nomeFile.endsWith(".xls") ? nomeFile : `${nomeFile}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  function scaricaPdfFmed({
    titolo,
    sottotitolo,
    meta = [],
    colonne = [],
    righe = []
  }) {
    if (!righe || righe.length === 0) {
      alert("Nessuna riga da esportare in PDF.");
      return;
    }
    const oggi = formattaData(new Date());
    const sitoFmed = window.location.origin || "FMED";
    const metaHtml = meta.filter(Boolean).map(m => escapeExcelHtml(m)).join(" · ");
    const intestazioni = colonne.map(c => `<th>${escapeExcelHtml(c.label)}</th>`).join("");
    const corpo = righe.map((r, idx) => {
      const celle = colonne.map(c => {
        const valore = escapeExcelHtml(typeof c.value === "function" ? c.value(r, idx) : r[c.key]);
        const classe = typeof c.className === "function" ? c.className(r, idx) : c.className || "";
        return `<td class="${escapeExcelHtml(classe)}">${valore}</td>`;
      }).join("");
      return `<tr>${celle}</tr>`;
    }).join("");
    const finestra = window.open("", "_blank");
    if (!finestra) {
      alert("Popup bloccato dal browser. Abilita i popup per esportare il PDF.");
      return;
    }
    finestra.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${escapeExcelHtml(pulisciTitoloReportMrdb(titolo))}</title>
        <style>
          @page { size: A4 landscape; margin: 9mm; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: "Arial Nova Light", "Arial Nova", Arial, sans-serif;
            background: #f4f7fb;
            color: #0E1B42;
          }
          .header {
            background: linear-gradient(135deg, #133C55 0%, #165A52 100%);
            color: white;
            padding: 14px 22px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            border-radius: 0 0 18px 18px;
          }
          .header h1 {
            margin: 0;
            font-size: 22px;
            letter-spacing: -0.2px;
            color: white;
          }
          .header p {
            margin: 4px 0 0;
            font-size: 10.5px;
            color: #F4F8F7;
            max-width: 900px;
          }
          .headerMeta {
            text-align: right;
            font-size: 10px;
            line-height: 1.35;
            color: #F4F8F7;
            white-space: nowrap;
          }
          .logoBox {
            width: 108px;
            height: 82px;
            border-radius: 10px;
            background: rgba(255,255,255,.96);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 6px;
            box-shadow: 0 8px 24px rgba(0,0,0,.18);
            flex: 0 0 auto;
          }
          .logo {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
          }
          .summary {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin: 16px 20px 12px;
          }
          .card {
            background: white;
            border: 1px solid #d9e6f5;
            border-radius: 14px;
            padding: 12px 14px;
            box-shadow: 0 6px 18px rgba(14, 27, 66, 0.07);
          }
          .card .label {
            font-size: 10px;
            color: #5f6f89;
            text-transform: uppercase;
            letter-spacing: .5px;
            font-weight: 400;
          }
          .card .value {
            margin-top: 5px;
            font-size: 20px;
            font-weight: 400;
            color: #00194d;
          }
          table {
            width: calc(100% - 40px);
            margin: 0 20px;
            border-collapse: collapse;
            background: white;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 6px 18px rgba(14, 27, 66, 0.07);
            font-size: 10.5px;
          }
          th {
            background: #3F4642;
            color: white;
            text-align: left;
            padding: 9px 7px;
            font-weight: 400;
            white-space: nowrap;
            vertical-align: middle;
          }
          td {
            padding: 8px 7px;
            border-bottom: 1px solid #e5edf7;
            text-align: left;
            vertical-align: middle;
          }
          tr:nth-child(even) td { background: #f8fbff; }
          .semaforoRosso { background: #FFE2E2 !important; color: #9A1111; font-weight: 400; }
          .semaforoGiallo { background: #FFF2CC !important; color: #7A5200; font-weight: 400; }
          .semaforoVerde { background: #DCFCE7 !important; color: #006B3A; font-weight: 400; }
          .semaforoBlu { background: #EEF3EA !important; color: #5F6B60; font-weight: 400; }
          .textLeft { text-align: left !important; vertical-align: top !important; white-space: normal; }
          .footer {
            margin: 14px 20px 0;
            font-size: 11px;
            color: #61718a;
          }

            /* FMED PRINT STANDARD - ripete intestazioni tabella su ogni pagina PDF */
            thead {
              display: table-header-group;
            }
            tfoot {
              display: table-footer-group;
            }
            table {
              page-break-inside: auto;
              break-inside: auto;
            }
            tr {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            th {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @media print {
              thead {
                display: table-header-group;
              }
              tfoot {
                display: table-footer-group;
              }
              tr {
                page-break-inside: avoid;
                break-inside: avoid;
              }
              .header, th {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>FMED Export · ${escapeExcelHtml(pulisciTitoloReportMrdb(titolo))}</h1>
            <p>${escapeExcelHtml(sottotitolo || "Report operativo")}${metaHtml ? " · " + metaHtml : ""}</p>
          </div>
          <div class="headerMeta">${escapeExcelHtml(sitoFmed)}<br/>${escapeExcelHtml(oggi)}</div>
        </div>

        <table>
          <thead><tr>${intestazioni}</tr></thead>
          <tbody>${corpo}</tbody>
        </table>
        
      </body>
    </html>
  `);
    finestra.document.close();
    finestra.focus();
    setTimeout(() => finestra.print(), 500);
  }
  function filtroSedeExport(item, sedeExport) {
    if (!sedeExport || sedeExport === "TUTTE" || sedeExport === "TUTTE LE SEDI") return true;
    return normalizzaSedePerConfronto(item?.sede) === normalizzaSedePerConfronto(sedeExport);
  }
  function filtroTestoExport(valore, filtro, tutti = "TUTTI") {
    if (!filtro || filtro === tutti || filtro === "TUTTE") return true;
    return String(valore || "") === String(filtro || "");
  }
  function exportInventarioFmed(formato = "excel") {
    const sedeExport = exportSedeInventario || "TUTTE";
    const statoExport = exportStatoInventario || "TUTTI";
    const categoriaExport = exportCategoriaInventario || "TUTTE";
    const codiciSelezionati = new Set(exportCespitiInventarioSelezionati.map(chiaveCodiceCespite));
    const righe = getCespitiExportInventarioFiltrati().filter(c => codiciSelezionati.size === 0 || codiciSelezionati.has(chiaveCodiceCespite(codiceExportCespite(c))));
    if (righe.length === 0) {
      alert("Nessun cespite trovato con i filtri selezionati.");
      return;
    }

    // Export Inventario sintetico standard: solo queste colonne, in questo ordine.
    // I filtri Excel restano attivi sulla riga intestazioni.
    const colonne = [{
      label: "CodiceStrumento",
      value: c => c.codicestrumento || ""
    }, {
      label: "Locazione",
      value: c => getLocazioneFmed(c)
    }, {
      label: "Tipologia",
      value: c => c.tipologia || ""
    }, {
      label: "Branca",
      value: c => getBrancaExportRecord(c)
    }, {
      label: "Costruttore",
      value: c => c.costruttore || ""
    }, {
      label: "Modello",
      value: c => c.modello || ""
    }, {
      label: "Matricola",
      value: c => c.matricola || ""
    }, {
      label: "Possesso",
      value: c => c.possesso || ""
    }, {
      label: "Anno fabbricazione",
      value: c => c.anno_di_fabbricazione || c.anno_fabbricazione || c.anno || ""
    }];
        const nomeSede = sedeExport === "TUTTE" ? "TUTTE_LE_SEDI" : nomeFileSicuro(sedeExport);
    const payload = {
      nomeFile: `EXPORT_INVENTARIO_${nomeSede}_${new Date().toISOString().slice(0, 10)}.${formato === "pdf" ? "pdf" : "xls"}`,
      titolo: `FMED · Inventario ${sedeExport === "TUTTE" ? "Tutte le sedi" : sedeExport}`,
      sottotitolo: "Report sintetico inventario con colonne standard e filtri Excel attivi.",
      meta: [`Sede: ${sedeExport}`, `Stato: ${statoExport}`, `Categoria: ${categoriaExport}`, `Tipologia: ${exportTipologiaInventario}`, `Costruttore: ${exportCostruttoreInventario}`, `Reparto: ${exportRepartoInventario}`, `Branche: ${exportBrancheInventario.length ? exportBrancheInventario.join(", ") : "Tutte"}`, `Società: ${exportSocietaInventario}`, `Stanza/Locazione: ${exportLocazioneInventario}`, `Ordinamento: ${exportOrdineInventario}`, `Cespiti selezionati: ${exportCespitiInventarioSelezionati.length > 0 ? exportCespitiInventarioSelezionati.length : "filtrati"}`, `Attivi: ${righe.filter(c => statoCespite(c) === "Attivo").length}`, `Dismessi/Non in uso: ${righe.filter(c => statoCespite(c) !== "Attivo").length}`, `Colonne export: CodiceStrumento, Locazione, Tipologia, Branca, Costruttore, Modello, Matricola, Possesso, Anno fabbricazione`],
      colonne,
      righe
    };
    if (formato === "pdf") scaricaPdfFmed(payload);else scaricaExcelFmed(payload);
  }
  function labelStatoScadenzaExportInterventi(stato) {
    const labels = {
      VALIDI: "Solo attività valide/non scadute alla data export",
      TUTTI: "Tutte le scadenze",
      NON_SCADUTI: "Solo non scaduti oltre 30 giorni",
      PROSSIMITA: "Solo in prossimità di scadenza",
      SCADUTI: "Solo scaduti",
      SENZA_SCADENZA: "Senza prossima scadenza"
    };
    return labels[stato] || stato || "Solo attività valide/non scadute alla data export";
  }
  function exportInterventiFmed(formato = "excel") {
    const sediExport = Array.isArray(exportSediInterventi) ? exportSediInterventi : [];
    const sedeExport = sediExport.length > 0 ? sediExport.join(", ") : exportSedeInterventi || "TUTTE";
    const codiciSelezionati = new Set(exportCespitiInterventiSelezionati.map(chiaveCodiceCespite));
    const righe = getInterventiExportFiltratiBase().filter(i => codiciSelezionati.size === 0 || codiciSelezionati.has(chiaveCodiceCespite(codiceExportCespite(i)))).sort((a, b) => {
      const dataA = parseDataFMED(a.data_ultimo_intervento) || new Date(0);
      const dataB = parseDataFMED(b.data_ultimo_intervento) || new Date(0);
      const confrontoData = dataB - dataA;
      if (confrontoData !== 0) return confrontoData;
      return String(a.sede || "").localeCompare(String(b.sede || ""), "it", {
        sensitivity: "base"
      }) || String(a.codice_strumento || a.codicestrumento || "").localeCompare(String(b.codice_strumento || b.codicestrumento || ""), "it", {
        numeric: true,
        sensitivity: "base"
      });
    });
    if (righe.length === 0) {
      alert("Nessun intervento valido trovato con i filtri selezionati. Verifica sedi, branche, cespiti o stato scadenza.");
      return;
    }
    const colonne = [{
      label: "CodiceStrumento",
      value: i => i.codice_strumento || i.codicestrumento || ""
    }, {
      label: "Sede",
      value: i => i.sede || ""
    }, {
      label: "Ditta esecutrice",
      value: i => normalizzaSocietaDitta(i.ditta_esecutrice || i.ditta)
    }, {
      label: "Attività",
      value: i => i.attivita || ""
    }, {
      label: "Tipologia",
      value: i => i.tipologia || ""
    }, {
      label: "Branca",
      value: i => getBrancaExportRecord(i)
    }, {
      label: "Costruttore",
      value: i => i.costruttore || ""
    }, {
      label: "Modello",
      value: i => i.modello || ""
    }, {
      label: "Matricola",
      value: i => i.matricola || ""
    }, {
      label: "Data ultimo intervento",
      value: i => formattaData(i.data_ultimo_intervento)
    }, {
      label: "Data prossimo intervento",
      value: i => formattaData(i.data_prossimo_intervento)
    }];
    const nomeSede = sediExport.length > 0 ? `${sediExport.length}_SEDI` : sedeExport === "TUTTE" ? "TUTTE_LE_SEDI" : nomeFileSicuro(sedeExport);
    const payload = {
      nomeFile: `EXPORT_INTERVENTI_${nomeSede}_${new Date().toISOString().slice(0, 10)}.${formato === "pdf" ? "pdf" : "xls"}`,
      titolo: `FMED · Interventi ${sediExport.length > 0 ? `${sediExport.length} sedi selezionate` : sedeExport === "TUTTE" ? "Tutte le sedi" : sedeExport}`,
      sottotitolo: "Report sintetico interventi filtrati.",
      meta: [`Sede: ${sedeExport}`, `Codice: ${exportCodiceInterventi}`, `Tipologia: ${exportTipologiaInterventi}`, `Branche: ${exportBrancheInterventi.length ? exportBrancheInterventi.join(", ") : "Tutte"}`, `Ditta esecutrice: ${exportSocietaInterventi}`, `Stato scadenza: ${labelStatoScadenzaExportInterventi(exportScadenzaInterventi)}`, `Anno: ${exportAnnoInterventi}`, `Periodo: ${exportDataInterventiDa || "inizio"} - ${exportDataInterventiA || "fine"}`, `Cespiti selezionati: ${exportCespitiInterventiSelezionati.length > 0 ? exportCespitiInterventiSelezionati.length : "filtrati"}`, "Ordinamento: data ultimo intervento decrescente"],
      colonne,
      righe
    };
    if (formato === "pdf") scaricaPdfFmed(payload);else scaricaExcelFmed(payload);
  }
  function exportScadenzeExcelFmed(formato = "excel") {
    const righeBase = scadenzeSelezionateVisualizzate.length > 0 ? scadenzeSelezionateVisualizzate : scadenzeVisualizzate;
    const righe = righeBase.filter(s => filtroBrancheExport(s, exportBrancheScadenze));
    if (righe.length === 0) {
      alert("Nessuna scadenza da esportare. Seleziona almeno una riga oppure modifica i filtri.");
      return;
    }
    const colonne = [{
      label: "Codice",
      value: s => s.codice_strumento || s.codicestrumento || ""
    }, {
      label: "Sede",
      value: s => s.sede || ""
    }, {
      label: "Tipologia",
      value: s => s.tipologia || ""
    }, {
      label: "Branca",
      value: s => getBrancaExportRecord(s)
    }, {
      label: "Locazione",
      value: s => getLocazioneFmed(s, s._cespite || {})
    }, {
      label: "Attività",
      value: s => s.attivita || ""
    }, {
      label: "Ditta esecutrice",
      value: s => s.ditta_esecutrice || s.ditta || ""
    }, {
      label: "Ultimo intervento",
      value: s => formattaData(s._dataUltimoIntervento || s.data_ultimo_intervento)
    }, {
      label: "Prossima scadenza",
      value: s => formattaData(s._dataScadenza || s.data_prossimo_intervento || s.prossima_scadenza || s.data_scadenza)
    }, {
      label: "Giorni",
      value: s => {
        const stato = s._statoScadenza || statoScadenza(s._dataScadenza || s.data_prossimo_intervento);
        return stato.giorni === null ? "" : stato.giorni < 0 ? `${Math.abs(stato.giorni)} gg fa` : `${stato.giorni} gg`;
      }
    }, {
      label: "Stato",
      value: s => (s._statoScadenza || statoScadenza(s._dataScadenza || s.data_prossimo_intervento)).testo
    }];
    const payload = {
      nomeFile: `EXPORT_SCADENZE_${new Date().toISOString().slice(0, 10)}.${formato === "pdf" ? "pdf" : "xls"}`,
      titolo: "FMED · Scadenze manutentive",
      sottotitolo: "Report sintetico scadenze filtrate.",
      meta: [`Righe esportate: ${righe.length}`, `Filtro sede: ${filtroScadenzeSede}`, `Filtro codice: ${filtroScadenzeCodice}`, `Filtro tipologia: ${filtroScadenzeTipologia}`, `Filtro branche: ${exportBrancheScadenze.length ? exportBrancheScadenze.join(", ") : "Tutte"}`, `Filtro attività: ${filtroScadenzeAttivita}`, `Filtro ditta: ${filtroScadenzeDitta}`, `Periodo: ${filtroScadenzeProssimaDa || "inizio"} - ${filtroScadenzeProssimaA || "fine"}`],
      colonne,
      righe
    };
    if (formato === "pdf") scaricaPdfFmed(payload);else scaricaExcelFmed(payload);
  }
  function exportBudgetCriticitaFmed(formato = "excel") {
    function classeSemaforoPunteggio(valore) {
      const n = Number(String(valore ?? "").replace("%", ""));
      if (Number.isNaN(n)) return "";
      if (n >= 70) return "semaforoRosso";
      if (n >= 40) return "semaforoGiallo";
      return "semaforoVerde";
    }
    function classeSemaforoAffidabilita(valore) {
      const n = Number(String(valore ?? "").replace("%", ""));
      if (Number.isNaN(n)) return "";
      if (n < 40) return "semaforoRosso";
      if (n < 70) return "semaforoGiallo";
      return "semaforoVerde";
    }
    function classeSemaforoTesto(valore) {
      const v = String(valore || "").toUpperCase();
      if (v.includes("ROSSO") || v.includes("ALTO")) return "semaforoRosso";
      if (v.includes("GIALLO") || v.includes("MEDIO")) return "semaforoGiallo";
      if (v.includes("VERDE") || v.includes("BASSO")) return "semaforoVerde";
      return "";
    }
    const gruppi = {};
    interventi.forEach(i => {
      const codice = String(i.codice_strumento || i.codicestrumento || "").trim();
      if (!codice) return;
      if (!gruppi[codice]) {
        gruppi[codice] = {
          codice,
          interventi: 0,
          preventive: 0,
          straordinarie: 0,
          fermi: 0,
          costoTotale: 0
        };
      }
      const att = String(i.attivita || "").toUpperCase();
      gruppi[codice].interventi += 1;
      const isStraordinaria = att.includes("STRAORD");
      const isFermo = att.includes("FERMO");
      const isPreventivaOrdinaria = att.includes("PREVENT") || att.includes("ORDINARIA");
      if (isPreventivaOrdinaria) gruppi[codice].preventive += 1;
      if (isStraordinaria) gruppi[codice].straordinarie += 1;
      if (isFermo) gruppi[codice].fermi += 1;

      // Criterio costo budget: sommiamo SOLO manutenzioni straordinarie e fermi macchina.
      // Le ordinarie/preventive/altre attività non entrano nel costo storico di criticità.
      if (isStraordinaria || isFermo) {
        const costo = Number(String(i.costo || "").replace("€", "").replace(/\./g, "").replace(",", ".").trim());
        if (!Number.isNaN(costo)) gruppi[codice].costoTotale += costo;
      }
    });
    const righe = Object.values(gruppi).map(g => {
      const cespite = cespitiByCodice.get(g.codice) || {};
      const punteggio = Math.min(100, g.straordinarie * 12 + g.fermi * 18 + Math.max(0, g.interventi - g.preventive) * 2);
      const criticita = punteggio >= 70 ? "ROSSO" : punteggio >= 40 ? "GIALLO" : "VERDE";
      const rischio = punteggio >= 70 ? "ALTO" : punteggio >= 40 ? "MEDIO" : "BASSO";
      const affidabilita = Math.max(0, 100 - punteggio);
      return {
        ...g,
        sede: cespite.sede || "",
        tipologia: cespite.tipologia || "",
        branca_medica: getBrancaExportRecord(cespite),
        costruttore: cespite.costruttore || "",
        modello: cespite.modello || "",
        locazione: getLocazioneFmed(cespite),
        stato: statoCespite(cespite),
        punteggio,
        criticita,
        rischio,
        affidabilita,
        indicazione: criticita === "ROSSO" ? "Valutare sostituzione / preventivo prioritario" : criticita === "GIALLO" ? "Monitorare e pianificare budget" : "Nessuna priorità immediata"
      };
    }).filter(r => filtroSedeExport(r, exportBudgetSede)).filter(r => filtroTestoExport(r.stato, exportBudgetStato, "TUTTI")).filter(r => filtroTestoExport(r.tipologia, exportBudgetTipologia, "TUTTE")).filter(r => filtroBrancheExport(r, exportBrancheBudget)).filter(r => filtroTestoExport(r.costruttore, exportBudgetCostruttore, "TUTTI")).filter(r => exportBudgetCriticita === "TUTTE" || r.criticita === exportBudgetCriticita).sort((a, b) => b.punteggio - a.punteggio);
    const colonne = [{
      label: "Codice",
      value: r => r.codice
    }, {
      label: "Sede",
      value: r => r.sede
    }, {
      label: "Tipologia",
      value: r => r.tipologia
    }, {
      label: "Branca",
      value: r => r.branca_medica || getBrancaExportRecord(r)
    }, {
      label: "Costruttore",
      value: r => r.costruttore
    }, {
      label: "Modello",
      value: r => r.modello
    }, {
      label: "Locazione",
      value: r => r.locazione
    }, {
      label: "Stato",
      value: r => r.stato
    }, {
      label: "Interventi",
      value: r => r.interventi
    }, {
      label: "Preventive/Ordinarie",
      value: r => r.preventive
    }, {
      label: "Straordinarie",
      value: r => r.straordinarie
    }, {
      label: "Fermi macchina",
      value: r => r.fermi
    }, {
      label: "Costo storico straord./fermi",
      value: r => r.costoTotale ? `${r.costoTotale.toFixed(2).replace(".", ",")} €` : ""
    }, {
      label: "Punteggio",
      value: r => r.punteggio,
      className: r => classeSemaforoPunteggio(r.punteggio)
    }, {
      label: "Criticità",
      value: r => r.criticita,
      className: r => classeSemaforoTesto(r.criticita)
    }, {
      label: "Rischio",
      value: r => r.rischio,
      className: r => classeSemaforoTesto(r.rischio)
    }, {
      label: "Affidabilità",
      value: r => `${r.affidabilita}%`,
      className: r => classeSemaforoAffidabilita(r.affidabilita)
    }, {
      label: "Indicazione budget",
      value: r => r.indicazione
    }];
    const payload = {
      nomeFile: `EXPORT_BUDGET_CRITICITA_${new Date().toISOString().slice(0, 10)}.${formato === "pdf" ? "pdf" : "xls"}`,
      titolo: "FMED · Budget criticità",
      sottotitolo: "Report sintetico criticità e priorità manutentive.",
      meta: [`Asset analizzati: ${righe.length}`, `Sede: ${exportBudgetSede}`, `Stato: ${exportBudgetStato}`, `Tipologia: ${exportBudgetTipologia}`, `Branche: ${exportBrancheBudget.length ? exportBrancheBudget.join(", ") : "Tutte"}`, `Costruttore: ${exportBudgetCostruttore}`, `Criticità: ${exportBudgetCriticita}`, "Semaforo: verde=basso, giallo=medio, rosso=alto", "Filtro Excel attivo sulla riga 5"],
      colonne,
      righe
    };
    if (formato === "pdf") scaricaPdfFmed(payload);else scaricaExcelFmed(payload);
  }
  async function ricaricaDatiInterventi(codice = null) {
    try {
      const interventiRes = await fetch(`${API_BASE_URL}/interventi?limit=5000`);
      if (interventiRes.ok) {
        const datiInterventi = await interventiRes.json();
        setInterventi(Array.isArray(datiInterventi) ? datiInterventi : []);
      }
      const codicePulito = String(codice || cespiteSelezionato?.codicestrumento || "").trim();
      if (codicePulito) {
        const codiceUrl = encodeURIComponent(codicePulito);
        const [storicoRes, analisiRes] = await Promise.all([fetch(`${API_BASE_URL}/interventi-cespite/${codiceUrl}`), fetch(`${API_BASE_URL}/analisi/${codiceUrl}`)]);
        if (storicoRes.ok) {
          const storico = await storicoRes.json();
          setInterventiCespite(Array.isArray(storico) ? storico : []);
        }
        if (analisiRes.ok) {
          const analisi = await analisiRes.json();
          setAnalisiCespite(analisi && typeof analisi === "object" ? analisi : analisiNonDisponibile(codicePulito));
        }
      }
    } catch (err) {
      console.error("Errore aggiornamento dati interventi:", err);
    }
  }
  async function salvaNuovoIntervento() {
    const codice = String(formNuovoIntervento.codice_strumento || "").trim();
    if (!codice) {
      alert("Inserisci il codice strumento dell'intervento");
      return;
    }
    const datiDaSalvare = {
      codice_strumento: codice,
      sede: formNuovoIntervento.sede || null,
      locazione: formNuovoIntervento.locazione || null,
      branca_medica: formNuovoIntervento.branca_medica || null,
      tipologia: formNuovoIntervento.tipologia || null,
      attivita: formNuovoIntervento.attivita || null,
      costruttore: formNuovoIntervento.costruttore || null,
      modello: formNuovoIntervento.modello || null,
      reparto: formNuovoIntervento.reparto || null,
      matricola: formNuovoIntervento.matricola || null,
      societa: formNuovoIntervento.societa || null,
      ditta_esecutrice: formNuovoIntervento.ditta_esecutrice || null,
      link_documento: formNuovoIntervento.link_documento || null,
      descrizione_attivita: formNuovoIntervento.descrizione_attivita || null,
      esito: formNuovoIntervento.esito || null,
      costo: formNuovoIntervento.costo || null,
      data_ultimo_intervento: formNuovoIntervento.data_ultimo_intervento || null,
      data_prossimo_intervento: formNuovoIntervento.data_prossimo_intervento || null,
      periodicita: formNuovoIntervento.periodicita || null,
      importo_extra: formNuovoIntervento.importo_extra || null
    };
    try {
      const response = await fetch(`${API_BASE_URL}/interventi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dati: datiDaSalvare
        })
      });
      const testoRisposta = await response.text();
      let rispostaIntervento = {};
      try { rispostaIntervento = JSON.parse(testoRisposta || "{}"); } catch { rispostaIntervento = {}; }
      if (!response.ok) {
        console.error("Errore creazione intervento:", response.status, testoRisposta);
        alert(`Errore durante la creazione dell'intervento (${response.status})`);
        return;
      }
      const eraProcessoGuidato = processoNuovoInterventoGuidato;
      const idCreato = rispostaIntervento?.dati_creati?.id_intervento || rispostaIntervento?.risultato?.risultato?.[0]?.id_intervento || null;
      if (eraProcessoGuidato && processoGuidatoEsecuzioneId) {
        await aggiornaProcessoNuovoIntervento({
          stato: "COMPLETATO",
          passo_corrente: "CONFERMA",
          percentuale: 100,
          riferimento_modulo: "INTERVENTI",
          riferimento_id: idCreato || codice,
          dati: {
            codice_strumento: codice,
            id_intervento: idCreato,
            attivita: datiDaSalvare.attivita,
            esito: datiDaSalvare.esito,
          }
        });
      }
      await ricaricaDatiInterventi(codice);
      setNuovoInterventoOpen(false);
      resetFormNuovoIntervento(null);
      setProcessoNuovoInterventoGuidato(false);
      setProcessoGuidatoEsecuzioneId(null);
      if (eraProcessoGuidato) setPagina("Processi");
      alert("Intervento inserito correttamente. Storico, scadenze e analisi predittiva aggiornati.");
    } catch (err) {
      console.error("Errore rete creazione intervento:", err);
      alert("Errore di collegamento con il backend durante la creazione dell'intervento");
    }
  }
        const assetPerSede = {};
  cespiti.forEach(c => {
    const nomeSede = normalizzaSedeDisplay(c.sede || "NON SPECIFICATA");
    assetPerSede[nomeSede] = (assetPerSede[nomeSede] || 0) + 1;
  });
  const assetPerCategoria = {};
  cespiti.forEach(c => {
    const categoria = normalizeCategoria(c.categoria);
    assetPerCategoria[categoria] = (assetPerCategoria[categoria] || 0) + 1;
  });
  function coloreCriticita(valore) {
    const v = String(valore || "").toUpperCase();
    if (v.includes("ROSSO") || v.includes("ALTO") || v.includes("CRITICA")) {
      return {
        background: "#FFE3E3",
        color: "var(--fmed-danger-text)",
        border: "1px solid #FDA29B"
      };
    }
    if (v.includes("GIALLO") || v.includes("MEDIO") || v.includes("ATTENZIONE")) {
      return {
        background: "var(--fmed-alert-gold-bg)",
        color: "#9A6700",
        border: "1px solid #FEC84B"
      };
    }
    if (v.includes("VERDE") || v.includes("BASSO") || v.includes("OK")) {
      return {
        background: "#DFF8EA",
        color: "#027A48",
        border: "1px solid #75E0A7"
      };
    }
    return {
      background: "#EEF3EA",
      color: "#0E1B42",
      border: "1px solid #C7DDF5"
    };
  }
    const storicoCespiteOrdinato = (Array.isArray(interventiCespite) ? [...interventiCespite] : []).sort((a, b) => {
    const dataA = parseDataFMED(a.data_ultimo_intervento || a.data_prossimo_intervento) || new Date(0);
    const dataB = parseDataFMED(b.data_ultimo_intervento || b.data_prossimo_intervento) || new Date(0);
    return dataB - dataA;
  });
  const storicoAttivitaOptions = pulisciLista(storicoCespiteOrdinato.map(i => i.attivita));
  const storicoDittaOptions = pulisciLista(storicoCespiteOrdinato.map(i => i.ditta || i.societa));
  const storicoCespiteFiltrato = storicoCespiteOrdinato.filter(i => {
    const testo = `
      ${i.data_ultimo_intervento || ""}
      ${i.data_prossimo_intervento || ""}
      ${i.attivita || ""}
      ${i.tipologia || ""}
      ${i.ditta || ""}
      ${i.societa || ""} ${i.ditta_esecutrice || i.ditta || ""}
      ${i.descrizione_attivita || ""}
      ${i.esito || ""}
    `.toLowerCase();
    return (!storicoFiltroTesto.trim() || testo.includes(storicoFiltroTesto.trim().toLowerCase())) && (storicoFiltroAttivita === "TUTTE" || String(i.attivita || "") === storicoFiltroAttivita) && (storicoFiltroDitta === "TUTTE" || String(i.ditta_esecutrice || i.ditta || "") === storicoFiltroDitta);
  });
  // FMED FASE 8 - Motore Infrastrutture più robusto e professionale.
  // Lo stato viene ricavato da una sola funzione, usata da KPI, tabella ed export.
  function statoInfrastruttura(infra) {
    const statoManuale = normalizzaTestoCodice(infra?.stato).replace(/\s+/g, "_").trim();
    const cicloStato = normalizzaTestoCodice(infra?._ciclo_stato || "").replace(/\s+/g, "_");
    if (cicloStato === "CHIUSO" || ["CHIUSO", "CHIUSA", "ARCHIVIATO", "ARCHIVIATA", "SUPERATO", "SUPERATA"].includes(statoManuale)) {
      return {
        codice: "CHIUSA",
        testo: "Chiusa",
        colore: "#7A8791",
        giorni: null
      };
    }
    const statoDaData = statoScadenza(infra?.prossimo_intervento);
    if (statoManuale === "SC" || statoManuale === "SCADUTA" || statoManuale === "SCADUTO" || statoDaData.codice === "SCADUTA") {
      return {
        ...statoDaData,
        codice: "SCADUTA",
        testo: "Scaduta",
        colore: "#FF4D5E"
      };
    }
    if (statoManuale === "PS" || statoManuale === "IN_SCADENZA" || statoManuale === "PROSSIMA_SCADENZA" || statoDaData.codice === "30_GIORNI") {
      return {
        ...statoDaData,
        codice: "30_GIORNI",
        testo: "In scadenza",
        colore: "#FF9F1C"
      };
    }
    if (statoManuale === "DA_VERIFICARE" || statoManuale === "DA VERIFICARE" || !infra?.prossimo_intervento) {
      return {
        codice: "DA_VERIFICARE",
        testo: "Da verificare",
        colore: "#9AA6B2",
        giorni: null
      };
    }
    return {
      ...statoDaData,
      codice: "OK",
      testo: "OK",
      colore: "#2FD37D"
    };
  }
  const infrastruttureConStato = useMemo(() => (Array.isArray(infrastrutture) ? infrastrutture : []).map(r => ({
    ...normalizzaInfrastrutturaDaApi(r),
    _statoInfra: statoInfrastruttura(normalizzaInfrastrutturaDaApi(r))
  })), [infrastrutture]);

  // FMED INFRASTRUTTURE - criterio operativo default richiesto:
  // 1) mostra solo attività utili e coerenti per sede;
  // 2) per attività mensili/trimestrali/semestrali/annuali: ultimo intervento negli ultimi 12 mesi;
  // 3) per attività biennali/triennali: finestra coerente con la periodicità, quindi rispettivamente 24/36 mesi;
  // 4) esclude lo storico vecchio e le scadenze già scadute, perché non devono sporcare la pagina operativa.
  function mesiValiditaOperativaInfrastruttura(periodicita) {
    const p = normalizzaTestoCodice(periodicita);
    if (p.includes("QUINQUENNALE")) return 60;
    if (p.includes("TRIENNALE") || p.includes("TRIENALE")) return 36;
    if (p.includes("BIENNALE")) return 24;
    if (p.includes("MENSILE")) return 3;

    // Trimestrali, quadrimestrali, semestrali e annuali restano nella finestra operativa 12 mesi.
    return 12;
  }
  function infrastrutturaRilevanteOperativa(r) {
    if (normalizzaTestoCodice(r?._ciclo_stato || "") === "CHIUSO") return false;
    const ultimo = parseDataFMED(r?.ultimo_intervento);
    const prossimo = parseDataFMED(r?.prossimo_intervento);

    // Senza ultimo intervento non entra nella vista default: resta gestibile tramite inserimento/correzione dato,
    // ma non sporca la pagina operativa delle scadenze infrastrutturali.
    if (!ultimo) return false;
    const oggi = new Date();
    oggi.setHours(0, 0, 0, 0);
    ultimo.setHours(0, 0, 0, 0);

    // Esclude tutto ciò che risulta già scaduto: lo storico vecchio non deve comparire di default.
    if (prossimo) {
      prossimo.setHours(0, 0, 0, 0);
      if (prossimo < oggi) return false;
    }
    const mesiValidita = mesiValiditaOperativaInfrastruttura(r?.periodicita);
    const limite = new Date(oggi);
    limite.setMonth(limite.getMonth() - mesiValidita);
    return ultimo >= limite;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- il predicato usa data corrente e campi dei record, senza stato React aggiuntivo.
  const infrastruttureOperative = useMemo(() => infrastruttureConStato.filter(r => infrastrutturaRilevanteOperativa(r)), [infrastruttureConStato]);
  const listaInfraSedi = useMemo(() => deduplicaSediFmed(infrastruttureOperative.map(r => r.sede), true), [infrastruttureOperative]);
  const listaInfraCategorie = useMemo(() => pulisciLista(infrastruttureOperative.map(r => r.categoria)), [infrastruttureOperative]);
  const listaInfraDitte = useMemo(() => pulisciLista(infrastruttureOperative.map(r => normalizzaSocietaDitta(r.ditta))), [infrastruttureOperative]);
  const listaInfraPeriodicita = useMemo(() => pulisciLista(infrastruttureOperative.map(r => r.periodicita)), [infrastruttureOperative]);
  const listaInfraPriorita = useMemo(() => pulisciLista(infrastruttureOperative.map(r => r.priorita)), [infrastruttureOperative]);
  const listaInfraResponsabili = useMemo(() => pulisciLista(infrastruttureOperative.map(r => r.responsabile)), [infrastruttureOperative]);
  const listaInfraCentriCosto = useMemo(() => pulisciLista(infrastruttureOperative.map(r => normalizzaCentroCostoFmed(r.centro_costo, r.sede))), [infrastruttureOperative]);
  const listaInfraSocieta = useMemo(() => pulisciLista(infrastruttureOperative.map(r => r.societa)), [infrastruttureOperative]);
  const infrastruttureFiltrate = useMemo(() => {
    const q = normalizzaTestoCodice(ricercaInfraDeferred);
    return infrastruttureOperative.filter(r => {
      const stato = r._statoInfra?.codice || "";
      const prossima = parseDataFMED(r.prossimo_intervento);
      const da = filtroInfraProssimaDa ? parseDataFMED(filtroInfraProssimaDa) : null;
      const a = filtroInfraProssimaA ? parseDataFMED(filtroInfraProssimaA) : null;
      if (prossima) prossima.setHours(0, 0, 0, 0);
      if (da) da.setHours(0, 0, 0, 0);
      if (a) a.setHours(23, 59, 59, 999);
      const testo = normalizzaTestoCodice(`${r.codice} ${r.sede} ${r.centro_costo} ${r.societa} ${r.categoria} ${r.descrizione} ${r.ditta} ${r.periodicita} ${r.responsabile} ${r.priorita} ${r.numero_helpdesk} ${r.note}`);
      return (filtroInfraSede === "TUTTE" || normalizzaSedePerConfronto(r.sede) === normalizzaSedePerConfronto(filtroInfraSede)) && (filtroInfraCategoria === "TUTTE" || r.categoria === filtroInfraCategoria) && (filtroInfraStato === "TUTTE" || stato === filtroInfraStato) && (filtroInfraDitta === "TUTTE" || normalizzaSocietaDitta(r.ditta) === filtroInfraDitta) && (filtroInfraPeriodicita === "TUTTE" || r.periodicita === filtroInfraPeriodicita) && (filtroInfraPriorita === "TUTTE" || r.priorita === filtroInfraPriorita) && (filtroInfraResponsabile === "TUTTE" || r.responsabile === filtroInfraResponsabile) && (filtroInfraCentroCosto === "TUTTE" || normalizzaCentroCostoFmed(r.centro_costo, r.sede) === filtroInfraCentroCosto) && (filtroInfraSocieta === "TUTTE" || r.societa === filtroInfraSocieta) && (!da || prossima && prossima >= da) && (!a || prossima && prossima <= a) && (!q || testo.includes(q));
    }).sort((a, b) => {
      const da = parseDataFMED(a.prossimo_intervento)?.getTime?.() || 9999999999999;
      const db = parseDataFMED(b.prossimo_intervento)?.getTime?.() || 9999999999999;
      return da - db || String(a.descrizione || "").localeCompare(String(b.descrizione || ""), "it");
    });
  }, [infrastruttureOperative, filtroInfraSede, filtroInfraCategoria, filtroInfraStato, filtroInfraDitta, filtroInfraPeriodicita, filtroInfraPriorita, filtroInfraResponsabile, filtroInfraCentroCosto, filtroInfraSocieta, filtroInfraProssimaDa, filtroInfraProssimaA, ricercaInfraDeferred]);
        
  // Dashboard/KPI infrastrutture: devono seguire SEMPRE i filtri correnti
  // (sede, categoria, stato e ricerca), cioè la stessa lista visibile in tabella.
  const infraScadute = infrastruttureFiltrate.filter(r => r._statoInfra?.codice === "SCADUTA");
  const infraInScadenza = infrastruttureFiltrate.filter(r => r._statoInfra?.codice === "30_GIORNI");
  const infraOk = infrastruttureFiltrate.filter(r => r._statoInfra?.codice === "OK");
  function resetFiltriInfrastrutture() {
    setFiltroInfraSede("TUTTE");
    setFiltroInfraCategoria("TUTTE");
    setFiltroInfraStato("TUTTE");
    setFiltroInfraDitta("TUTTE");
    setFiltroInfraPeriodicita("TUTTE");
    setFiltroInfraPriorita("TUTTE");
    setFiltroInfraResponsabile("TUTTE");
    setFiltroInfraCentroCosto("TUTTE");
    setFiltroInfraSocieta("TUTTE");
    setFiltroInfraProssimaDa("");
    setFiltroInfraProssimaA("");
    setRicercaInfra("");
  }
  function nuovoFormInfrastruttura(base = {}) {
    const sede = normalizzaSedeDisplay(base.sede || SEDI_STANDARD.AXA_MEDICA);
    return {
      codice: base.codice || "",
      sede,
      centro_costo: normalizzaCentroCostoFmed(base.centro_costo, sede) || sede,
      categoria: base.categoria || "HVAC",
      descrizione: base.descrizione || "",
      ditta: base.ditta || "SC IMPIANTI",
      periodicita: base.periodicita || "ANNUALE",
      ultimo_intervento: formattaDataPerInputDate(base.ultimo_intervento) || "",
      prossimo_intervento: formattaDataPerInputDate(base.prossimo_intervento) || "",
      stato: base.stato || "DA_VERIFICARE",
      numero_helpdesk: base.numero_helpdesk || "",
      link_documento: base.link_documento || "",
      link_sharepoint: base.link_sharepoint || "",
      responsabile: base.responsabile || "",
      priorita: base.priorita || "MEDIA",
      societa: base.societa || "",
      importo_annuo: base.importo_annuo ?? "",
      note: base.note || ""
    };
  }
  const infraCategorieStandard = ["HVAC", "ELETTRICO", "GAS MEDICALI", "ANTINCENDIO", "IDRICO", "OSMOSI", "ASCENSORI", "EDILE", "SICUREZZA", "VARIE", "LEGIONELLA", "RADIOLOGIA", "RM", "ALTRO"];
  const infraPeriodicitaStandard = ["TANTUM", "MENSILE", "BIMESTRALE", "TRIMESTRALE", "QUADRIMESTRALE", "SEMESTRALE", "ANNUALE", "BIENNALE", "TRIENNALE", "QUINQUENNALE", "DA DEFINIRE"];
  const infraStatiStandard = ["OK", "DA_VERIFICARE", "30_GIORNI", "SCADUTA"];
  const infraDitteOptions = pulisciLista([...infrastruttureConStato.map(r => normalizzaSocietaDitta(r.ditta)), ...listaDitteEsecutrici, "SC IMPIANTI", "ESSECI IMPIANTI", "MDA TECH", "HTS MEDICAL", "GALELLI SRL", "ECOSAFY", "CAREL", "ROMANA IMPIANTI", "3P SAS DI SIMONE PINOTTI"]).filter(Boolean);
  const infraSocietaOptions = pulisciLista([...infrastruttureConStato.map(r => normalizzaSocietaDitta(r.societa)), ...listaSocieta, "MARILAB S.R.L.", "AXA MEDICA S.R.L.", "PHOENIX S.R.L."]).filter(Boolean);
    const infraCentroCostoOptions = pulisciLista([...infrastruttureConStato.map(r => normalizzaCentroCostoFmed(r.centro_costo, r.sede)), ...SEDI_STANDARD_LIST]).filter(Boolean);
  function apriNuovaInfrastruttura() {
    setInfraInModifica(null);
    setFormInfra(nuovoFormInfrastruttura());
    setMessaggioInfra("");
    setFormInfrastrutturaOpen(true);
  }
  function apriModificaInfrastruttura(record) {
    const normalizzato = normalizzaInfrastrutturaDaApi(record);
    setInfraInModifica(normalizzato);
    setFormInfra(nuovoFormInfrastruttura(normalizzato));
    setMessaggioInfra("");
    setFormInfrastrutturaOpen(true);
  }
  function aggiornaFormInfra(campo, valore) {
    setFormInfra(prev => {
      const prossimo = {
        ...prev,
        [campo]: valore
      };
      if (campo === "sede") {
        prossimo.centro_costo = normalizzaCentroCostoFmed(valore);
        const sedeNorm = normalizzaTestoCodice(valore);
        if (sedeNorm.includes("AXA") || sedeNorm.includes("PINDARO")) prossimo.societa = "AXA MEDICA S.R.L.";else if (sedeNorm.includes("POMEZIA") || sedeNorm.includes("FUTURE LABS") || sedeNorm.includes("PHOENIX")) prossimo.societa = "PHOENIX S.R.L.";else prossimo.societa = "MARILAB S.R.L.";
      }
      return prossimo;
    });
  }
  function payloadInfrastrutturaDaForm() {
    const payload = {
      ...formInfra
    };
    Object.keys(payload).forEach(k => {
      if (typeof payload[k] === "string") payload[k] = payload[k].trim();
      if (payload[k] === "") payload[k] = null;
    });
    if (payload.importo_annuo !== null && payload.importo_annuo !== undefined) {
      const numero = Number(String(payload.importo_annuo).replace(",", "."));
      payload.importo_annuo = Number.isFinite(numero) ? numero : null;
    }
    payload.centro_costo = normalizzaCentroCostoFmed(payload.centro_costo, payload.sede) || payload.sede;
    return payload;
  }
  async function salvaInfrastruttura() {
    if (!formInfra.sede || !formInfra.categoria || !String(formInfra.descrizione || "").trim()) {
      setMessaggioInfra("Sede, categoria e descrizione sono obbligatorie.");
      return;
    }
    setSalvataggioInfraLoading(true);
    setMessaggioInfra("");
    try {
      const payload = payloadInfrastrutturaDaForm();
      const endpoint = infraInModifica?.id ? `/infrastrutture/${encodeURIComponent(infraInModifica.id)}` : "/infrastrutture";
      const method = infraInModifica?.id ? "PUT" : "POST";
      const rispostaSalvataggio = await chiamataApiAutenticataFmed(endpoint, {
        method,
        body: JSON.stringify(payload)
      });
      const recordSalvatoRaw = rispostaSalvataggio?.record || (Array.isArray(rispostaSalvataggio?.data) ? rispostaSalvataggio.data[0] : null);
      if (recordSalvatoRaw) {
        const recordSalvato = normalizzaInfrastrutturaDaApi(recordSalvatoRaw);
        setInfrastrutture(prev => {
          const idSalvato = String(recordSalvato.id || "");
          const esiste = (prev || []).some(r => String(r.id || "") === idSalvato);
          return esiste ? (prev || []).map(r => String(r.id || "") === idSalvato ? recordSalvato : r) : [recordSalvato, ...(prev || [])];
        });
      }
      await caricaInfrastruttureOnDemand({
        force: true
      });
      setFormInfrastrutturaOpen(false);
      setInfraInModifica(null);
      setMessaggioInfra("");
    } catch (err) {
      setMessaggioInfra(`Errore salvataggio: ${err?.message || err}`);
    } finally {
      setSalvataggioInfraLoading(false);
    }
  }
  async function eliminaInfrastruttura(record) {
    const r = normalizzaInfrastrutturaDaApi(record);
    if (!r.id) return;
    if (!window.confirm(`Eliminare definitivamente ${r.codice || r.descrizione || "questa infrastruttura"}?`)) return;
    setEliminazioneInfraLoading(true);
    try {
      await chiamataApiAutenticataFmed(`/infrastrutture/${encodeURIComponent(r.id)}`, {
        method: "DELETE"
      });
      await caricaInfrastruttureOnDemand({
        force: true
      });
    } catch (err) {
      alert(`Errore eliminazione infrastruttura: ${err?.message || err}`);
    } finally {
      setEliminazioneInfraLoading(false);
    }
  }
  function apriDocumentoInfrastruttura(record, tipo = "generale") {
    const r = normalizzaInfrastrutturaDaApi(record);

    // Se il record ha già un link specifico salvato in Supabase, lo rispettiamo solo per il pulsante generale.
    const linkSpecifico = String(r.link_sharepoint || r.link_documento || "").trim();
    if (tipo === "generale" && linkSpecifico && /^https?:\/\//i.test(linkSpecifico)) {
      window.open(linkSpecifico, "_blank");
      return;
    }

    // FASE 4 V2: fallback automatico sulla nuova struttura FMED_INFRASTRUTTURE.
    window.open(urlCartellaInfrastruttura(r, tipo), "_blank");
  }
  function getLinkReportInfrastruttura(record) {
    const r = normalizzaInfrastrutturaDaApi(record);
    const candidati = [r.link_report, r.report_url, r.report_link, r.link_reportistica, r.report, r.link_documento, r.link_sharepoint];
    const link = candidati.map(v => String(v || "").trim()).find(v => /^https?:\/\//i.test(v));
    return link || "";
  }
  function apriReportInfrastruttura(record) {
    const link = getLinkReportInfrastruttura(record);
    if (link) {
      window.open(link, "_blank");
      return;
    }
    alert("Nessun link report disponibile per questa infrastruttura. Se necessario, inseriscilo nel campo report/link documentazione della scheda infrastruttura.");
  }
  function apriMenuAttivitaInfrastruttura(record) {
    const scelta = window.prompt("ATTIVITÀ INFRASTRUTTURA\n\n" + "1 - Attività ordinarie\n" + "2 - Attività straordinarie\n\n" + "Scrivi 1 o 2:", "1");
    if (scelta === null) return;
    const valore = String(scelta || "").trim();
    if (valore === "1") {
      apriDocumentoInfrastruttura(record, "ordinarie");
      return;
    }
    if (valore === "2") {
      apriDocumentoInfrastruttura(record, "straordinarie");
      return;
    }
    alert("Scelta non valida. Usa 1 per Ordinarie oppure 2 per Straordinarie.");
  }
  function apriMenuDocumentazioneInfrastruttura(record) {
    const scelta = window.prompt("DOCUMENTAZIONE INFRASTRUTTURA\n\n" + "1 - Documentazione generale\n" + "2 - Foto\n" + "3 - Schemi e progetti\n" + "4 - Certificazioni\n" + "5 - Contratti\n" + "6 - Costi\n" + "7 - Manuali\n\n" + "Scrivi un numero da 1 a 7:", "1");
    if (scelta === null) return;
    const mappa = {
      "1": "generale",
      "2": "fotografie",
      "3": "schemi",
      "4": "certificazioni",
      "5": "contratti",
      "6": "costi",
      "7": "manuali"
    };
    const tipo = mappa[String(scelta || "").trim()];
    if (!tipo) {
      alert("Scelta non valida. Usa un numero da 1 a 7.");
      return;
    }
    apriDocumentoInfrastruttura(record, tipo);
  }
  function apriMenuAllegaInfrastruttura(record) {
    const scelta = window.prompt("ALLEGA DOCUMENTO INFRASTRUTTURA\n\n" + "Scegli la cartella SharePoint di destinazione.\n" + "FMED aprirà la cartella corretta: trascina lì il PDF o il file da archiviare.\n\n" + "1 - Attività ordinarie\n" + "2 - Attività straordinarie\n" + "3 - Fotografie\n" + "4 - Schemi e progetti\n" + "5 - Certificazioni\n" + "6 - Contratti\n" + "7 - Costi\n" + "8 - Manuali\n" + "9 - Documentazione varia\n\n" + "Scrivi un numero da 1 a 9:", "2");
    if (scelta === null) return;
    const mappa = {
      "1": "ordinarie",
      "2": "straordinarie",
      "3": "fotografie",
      "4": "schemi",
      "5": "certificazioni",
      "6": "contratti",
      "7": "costi",
      "8": "manuali",
      "9": "generale"
    };
    const tipo = mappa[String(scelta || "").trim()];
    if (!tipo) {
      alert("Scelta non valida. Usa un numero da 1 a 9.");
      return;
    }
    const config = FMED_INFRASTRUTTURE_DOC_TYPES[tipo] || FMED_INFRASTRUTTURE_DOC_TYPES.generale;
    alert(`Si apre la cartella SharePoint: ${config.label}.\n\nOra puoi trascinare o caricare il PDF direttamente lì.`);
    apriDocumentoInfrastruttura(record, tipo);
  }
      function renderFmedMenuIcon(item) {
    const common = {
      width: 21,
      height: 21,
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true"
    };
    const stroke = "currentColor";
    const sw = 2;
    if (item === "Dashboard") return <svg {...common}><rect x="4" y="4" width="6" height="6" rx="1.5" stroke={stroke} strokeWidth={sw} /><rect x="14" y="4" width="6" height="6" rx="1.5" stroke={stroke} strokeWidth={sw} /><rect x="4" y="14" width="6" height="6" rx="1.5" stroke={stroke} strokeWidth={sw} /><rect x="14" y="14" width="6" height="6" rx="1.5" stroke={stroke} strokeWidth={sw} /></svg>;
    if (item === "Asset") return <svg {...common}><path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" /><path d="M4 7.5 12 12l8-4.5M12 12v9" stroke={stroke} strokeWidth={sw} strokeLinecap="round" /></svg>;
    if (item === "Interventi") return <svg {...common}><path d="M14.5 5.5a4.5 4.5 0 0 0-5.7 5.7L4 16v4h4l4.8-4.8a4.5 4.5 0 0 0 5.7-5.7l-3 3-4-4 3-3Z" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></svg>;
    if (item === "Costi") return <svg {...common}><path d="M17 5.5A7 7 0 1 0 17 18.5M5 10h10M5 14h9" stroke={stroke} strokeWidth={sw} strokeLinecap="round" /></svg>;
    if (item === "Scadenze") return <svg {...common}><rect x="4" y="5" width="16" height="15" rx="2" stroke={stroke} strokeWidth={sw} /><path d="M8 3v4M16 3v4M4 10h16M8 14h3" stroke={stroke} strokeWidth={sw} strokeLinecap="round" /></svg>;
    if (item === "Infrastrutture") return <svg {...common}><path d="M4 21V8l8-5 8 5v13" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" /><path d="M9 21v-6h6v6M8 10h.01M12 10h.01M16 10h.01" stroke={stroke} strokeWidth={sw} strokeLinecap="round" /></svg>;
    if (item === "Export") return <svg {...common}><path d="M12 3v12M7 10l5 5 5-5M5 21h14" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></svg>;
    if (item === "Sicurezza 81/08") return <svg {...common}><path d="M12 3 20 7v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" /><path d="m9 12 2 2 4-4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></svg>;
    if (item === "SharePoint") return <svg {...common}><path d="M8 13a4 4 0 1 1 .5-5.97M16 11a4 4 0 1 1-.5 5.97M8 12h8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" /></svg>;
    if (item === "Processi") return <svg {...common}><path d="M5 5h6v6H5zM13 13h6v6h-6zM14 5h5M5 14v5h5M11 8h3v5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></svg>;
    if (item === "Dizionari") return <svg {...common}><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" /></svg>;
    if (item === "Gestione Utenti") return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM21 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke={stroke} strokeWidth={sw} strokeLinecap="round" /></svg>;
    return <svg {...common}><circle cx="12" cy="12" r="8" stroke={stroke} strokeWidth={sw} /></svg>;
  }

  function renderFmedBrandMark(compact = false) {
    const size = compact ? 34 : 42;
    return <svg className="fmed-brand-symbol" width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="42" height="42" rx="13" fill="currentColor" fillOpacity=".045" stroke="currentColor" strokeWidth="1.6" />
      <rect x="12" y="12" width="10" height="10" rx="2.5" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeWidth="2" />
      <rect x="26" y="12" width="10" height="10" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <rect x="12" y="26" width="10" height="10" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <rect x="26" y="26" width="10" height="10" rx="2.5" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth="2" />
      <path d="M22 17h4M17 22v4M31 22v4M22 31h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>;
  }

  return <div data-fmed-build={MRDB_APP_VERSION} className={darkMode ? "fmed-app-root fmed-dark-mode" : "fmed-app-root fmed-light-mode"} style={{
    ...styles.app,
    ...(darkMode ? styles.themeDarkVars : styles.themeLightVars),
    ...{}
  }}>



      
      

      

      

      {<aside className={`fmed-side-rail ${sidebarCompattata ? "is-collapsed" : "is-expanded"}`} style={{
      ...styles.sidebar,
      ...(sidebarCompattata ? styles.sidebarCollapsed : {}),
      ...{}
    }}>
        <a href="#" onClick={e => {
        e.preventDefault();
        setPagina("Dashboard");
      }} style={{
        ...styles.sidebarBrandLink,
        ...(sidebarCompattata && true ? styles.sidebarBrandLinkCollapsed : {})
      }} title="FMED · Facility Management di Fabio Carratù">
          {sidebarCompattata && true ? <div className="fmed-sidebar-logo-compact" style={styles.sidebarOnlyTitleCollapsed}>{renderFmedBrandMark(true)}</div> : <div className="fmed-sidebar-logo-lockup">
              <div className="fmed-sidebar-logo-mark" aria-hidden="true">
                {renderFmedBrandMark(false)}
              </div>
              <div className="fmed-sidebar-logo-text">
                <div className="fmed-sidebar-logo-title">FMED</div>
                <div className="fmed-sidebar-logo-subtitle">FACILITY MANAGEMENT</div>
                <div className="fmed-sidebar-logo-byline">di Fabio Carratù</div>
              </div>
            </div>}
        </a>

        <div className={`fmed-sidebar-controls ${sidebarCompattata ? "is-collapsed" : ""}`} style={sidebarCompattata ? styles.sidebarCollapseTopCentered : styles.sidebarCollapseTop}>
          <button
            type="button"
            className="fmed-sidebar-control-btn fmed-sidebar-collapse-btn"
            style={styles.sidebarCollapseBtn}
            onClick={() => setSidebarCompattata(v => !v)}
            title={sidebarCompattata ? "Espandi il menu principale" : "Riduci il menu principale"}
            aria-label={sidebarCompattata ? "Espandi il menu principale" : "Riduci il menu principale"}
          >
            <span className="fmed-sidebar-control-icon" aria-hidden="true">
              {sidebarCompattata ? <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg> : <svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7M20 5v14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </span>
            {!sidebarCompattata && <span className="fmed-sidebar-control-label">Riduci menu</span>}
          </button>
          <button
            type="button"
            className="fmed-sidebar-control-btn fmed-sidebar-theme-btn"
            onClick={() => setDarkMode(prev => !prev)}
            title={darkMode ? "Attiva la modalità chiara" : "Attiva la modalità scura"}
            aria-label={darkMode ? "Attiva la modalità chiara" : "Attiva la modalità scura"}
          >
            <span className="fmed-sidebar-control-icon" aria-hidden="true">
              {darkMode ? <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg> : <svg viewBox="0 0 24 24"><path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </span>
            {!sidebarCompattata && <span className="fmed-sidebar-control-label">{darkMode ? "Tema chiaro" : "Tema scuro"}</span>}
          </button>
        </div>

        <div style={styles.sidebarDivider} />

        <nav style={styles.sidebarNav} aria-label="Funzioni principali FMED">
          {menuItemsFmed.map(item => {
            const active = pagina === item || pagina === "Nuovo Asset" && nuovoAssetWizardReturnPage === item;
            const help = fmedMenuHelp(item);
            return <button key={item} className={`fmed-side-menu-btn ${active ? "is-active" : ""}`} style={{
              ...styles.menuBtn,
              ...(active ? styles.menuBtnActive : {})
            }} title={help} data-help={help} aria-current={active ? "page" : undefined} aria-label={`${fmedMenuLabel(item)}. ${help}`} onClick={() => {
              if (!puoAccederePaginaFmed(sessioneFmed, item)) {
                setPagina("Dashboard");
                return;
              }
              if (item === "Scadenze") setFiltroScadenze("TUTTE");
              if (item === "Dizionari") {
                setImpostazioniTab("MASTER_DATA");
                setPagina("Dizionari");
                return;
              }
              if (item === "Gestione Utenti") setImpostazioniTab("UTENTI");
              setPagina(item);
            }}>
              <span style={styles.menuIconWrap}>
                <span style={{
                  width: 24,
                  height: 24,
                  borderRadius: 8,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,.16)",
                  color: active ? "#FFFFFF" : "rgba(255,255,255,.72)",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: 0
                }}>
                  {renderFmedMenuIcon(item)}
                </span>
              </span>
              {!(sidebarCompattata && true) && <span style={styles.menuLabel}>{fmedMenuLabel(item)}</span>}
              {!sidebarCompattata && <span className="fmed-menu-info" style={styles.menuInfoIcon} title={help} aria-hidden="true">ⓘ</span>}
              {active && !(sidebarCompattata && true) && <span className="fmed-side-chevron">›</span>}
            </button>;
          })}
        </nav>

        <div style={{
        ...styles.sidebarBottomPanel,
        ...(sidebarCompattata && true ? styles.sidebarBottomPanelCollapsed : {})
      }}>
          {sessioneFmed && !(sidebarCompattata && true) && <div style={darkMode ? styles.sidebarUserCard : styles.sidebarUserCardLight}>
              <div style={darkMode ? styles.sidebarUserAvatar : styles.sidebarUserAvatarLight}>
                {String(utenteCorrenteFmed || sessioneFmed.role || "F").slice(0, 1).toUpperCase()}
              </div>
              <div style={styles.sidebarUserInfo}>
                <div style={darkMode ? styles.sidebarUserName : styles.sidebarUserNameLight}>
                  {utenteCorrenteFmed}
                </div>
                <div style={darkMode ? styles.sidebarUserRole : styles.sidebarUserRoleLight}>{permessiRuoloFmed.label || sessioneFmed.label || sessioneFmed.role}</div>
              </div>
            </div>}

          {sessioneFmed && !(sidebarCompattata && true) && <div style={darkMode ? styles.sidebarRoleHint : styles.sidebarRoleHintLight}>
              Ruolo attivo · {permessiRuoloFmed.label}
            </div>}

          <div style={styles.sidebarActionRow}>
            {onLogoutFmed && <button type="button" style={darkMode ? styles.sidebarLogoutSmallBtn : styles.sidebarLogoutSmallBtnLight} onClick={() => {
            rimuoviSessioneFmedSalvata();
            if (onLogoutFmed) onLogoutFmed();else window.location.reload();
          }} title="Esci da FMED">
                <span>⏻</span>
                {!(sidebarCompattata && true) && <span>Logout</span>}
              </button>}
          </div>
        </div>

      </aside>}

      <main className="fmed-main-content" style={{
      ...styles.main,
      ...{}
    }}>
        {/* Ogni modulo usa una sola intestazione dedicata: rimosso il banner globale duplicato. */}

        {pagina === "Dashboard" && <Suspense fallback={<div className="fmed-lazy-loading">Caricamento modulo…</div>}><DashboardPage {...{
          styles,
          apiBaseUrl: API_BASE_URL,
          setNuovoInterventoOpen,
          setFiltroScadenze,
          setPagina,
          avviaProcessoGuidatoFmed,
          openAlertMailDialog: () => setAlertMailOpen(true),
          openOutlook: () => apriOutlookAlertScadenze({ giorni: 30 }),
          cespiti,
          statoCespite,
          interventi,
          scadenzeConStatoBase,
          scadenzeImminenti,
          totaleSpesaDashboard,
          interventiConCostoDashboard,
          formattaData
        }} /></Suspense>}

        {pagina === "SharePoint" && <Suspense fallback={<div className="fmed-lazy-loading">Caricamento SharePoint…</div>}>
          <SharePointPage
            sharePointUrl={SHAREPOINT_GENERIC_URL}
            apiBaseUrl={API_BASE_URL}
            cespiti={cespiti}
            infrastrutture={infrastrutture}
            canManage={permessiRuoloFmed.canManageUsers}
            onNavigate={setPagina}
            onRefreshAssets={() => caricaCespitiOnDemand({ force: true })}
          />
        </Suspense>}

        {pagina === "Processi" && permessiRuoloFmed.canManageProcesses && <Suspense fallback={<div style={styles.card}>Caricamento Processi…</div>}>
            <ProcessiPage
              apiBaseUrl={API_BASE_URL}
              processes={processiCoreFmed}
              onLaunchProcess={avviaProcessoGuidatoFmed}
              canManage={permessiRuoloFmed.canManageProcesses}
            />
          </Suspense>}

        {paginaAssetAttiva && <Suspense fallback={<div className="fmed-lazy-loading">Caricamento modulo…</div>}><AssetPage {...{
          styles,
          apiBaseUrl: API_BASE_URL,
          filtrati,
          cespiti,
          sede,
          categoriaFiltro,
          formatCategoria,
          assetLocazioneFiltro,
          assetStatoFiltro,
          ricerca,
          setRicerca,
          setAssetElencoAperto,
          setSede,
          setAssetLocazioneFiltro,
          listaSediAsset,
          setCategoriaFiltro,
          listaCategorie,
          assetRepartoFiltro,
          setAssetRepartoFiltro,
          listaBranche,
          listaLocazioniAsset,
          assetTipologiaFiltro,
          setAssetTipologiaFiltro,
          listaTipologie,
          assetCostruttoreFiltro,
          setAssetCostruttoreFiltro,
          listaCostruttori,
          assetModelloFiltro,
          setAssetModelloFiltro,
          listaModelli,
          assetSocietaFiltro,
          setAssetSocietaFiltro,
          listaSocieta,
          setAssetStatoFiltro,
          listaStatiAsset,
          ordineCodiceAsset,
          setOrdineCodiceAsset,
          assetElencoAperto,
          setAssetAnalisiAperta,
          assetAnalisiAperta,
          setAssetBulkBranca,
          setAssetBulkSede,
          setAssetBulkLocazione,
          setAssetBulkStato,
          setAssetBulkSocieta,
          setAssetSelezionatiBulk,
          setCodiceCespiteAutomatico,
          avviaProcessoGuidatoFmed,
          setImpostazioniTab,
          setPagina,
          assetKpiFiltrati,
          assetPerSedeFiltrati,
          assetPerRepartoFiltrati,
          assetPerCostruttoreFiltrati,
          assetPerStatoFiltrati,
          assetSelezionatiBulk,
          assetBulkBranca,
          assetBulkSaving,
          assetBulkSocieta,
          assetBulkSede,
          listaSedi,
          assetBulkLocazione,
          getListaLocazioniPerSede,
          assetBulkStato,
          STATI_ASSET_STANDARD,
          salvaModificaMultiplaBrancaAsset,
          selezionaTuttiAssetFiltratiBulk,
          filtratiRenderizzati,
          getCodiceAssetBulk,
          toggleSelezioneAssetVisibiliBulk,
          assetQuickEditCodice,
          apriSchedaCespite,
          toggleSelezioneAssetBulk,
          assetQuickEditForm,
          aggiornaCampoModificaRapidaAsset,
          getBrancaAsset,
          getLocazioneFmed,
          statoCespite,
          coloreStatoAsset,
          assetQuickEditSaving,
          salvaModificaRapidaAsset,
          annullaModificaRapidaAsset,
          apriModificaRapidaAsset,
          setAssetRenderLimit,
          FMED_RENDER_BATCH_ASSET
        }} /></Suspense>}

      {paginaInterventiAttiva && <Suspense fallback={<div className="fmed-lazy-loading">Caricamento modulo…</div>}><InterventiPage {...{
          styles,
          interventiFiltrati,
          interventi,
          interventiIncludeStorico,
          cambiaVistaStoricoInterventi,
          apriNuovoIntervento,
          ricercaCespiteIntervento,
          setRicercaCespiteIntervento,
          cespitiPerNuovoIntervento,
          apriSchedaCespite,
          labelPeriodoContabileInterventi,
          filtroInterventiCodice,
          setFiltroInterventiCodice,
          setInterventiElencoAperto,
          listaCodiciFiltroInterventi,
          filtroInterventiSede,
          setFiltroInterventiSede,
          listaSediInterventi,
          filtroInterventiSocieta,
          setFiltroInterventiSocieta,
          listaSocietaInterventi,
          filtroInterventiTipologia,
          setFiltroInterventiTipologia,
          listaTipologieFiltroInterventi,
          filtroInterventiAttivita,
          setFiltroInterventiAttivita,
          listaAttivitaFiltroInterventi,
          filtroInterventiAnnoContabile,
          setFiltroInterventiAnnoContabile,
          listaAnniContabiliInterventi,
          filtroInterventiPeriodoContabile,
          setFiltroInterventiPeriodoContabile,
          ordineInterventi,
          setOrdineInterventi,
          filtroInterventiPeriodoDa,
          setFiltroInterventiPeriodoDa,
          filtroInterventiPeriodoA,
          setFiltroInterventiPeriodoA,
          filtroInterventiUltimoDa,
          setFiltroInterventiUltimoDa,
          filtroInterventiUltimoA,
          setFiltroInterventiUltimoA,
          filtroInterventiProssimoDa,
          setFiltroInterventiProssimoDa,
          filtroInterventiProssimoA,
          setFiltroInterventiProssimoA,
          interventiElencoAperto,
          permessiRuoloFmed,
          setPagina,
          resetFiltriInterventi,
          esportaInterventiFiltratiPdf,
          formatCurrency,
          totaleSpesaInterventiFiltrati,
          codiciCoinvoltiInterventi,
          ditteCoinvolteInterventi,
          interventiFiltratiRenderizzati,
          apriSchedaDaCodice,
          normalizzaSocietaDitta,
          formattaData,
          BottoneJobReport,
          apriModificaIntervento,
          eliminaIntervento,
          setInterventiRenderLimit,
          FMED_RENDER_BATCH_INTERVENTI
        }} /></Suspense>}

{paginaCostiAttiva && permessiRuoloFmed.canSeeCosts && <Suspense fallback={<div className="fmed-lazy-loading">Caricamento modulo…</div>}><CostiPage {...{
          styles,
          labelPeriodoContabileInterventi,
          filtroInterventiAnnoContabile,
          setFiltroInterventiAnnoContabile,
          listaAnniContabiliInterventi,
          filtroInterventiPeriodoContabile,
          setFiltroInterventiPeriodoContabile,
          filtroInterventiPeriodoDa,
          setFiltroInterventiPeriodoDa,
          filtroInterventiPeriodoA,
          setFiltroInterventiPeriodoA,
          filtroInterventiSede,
          setFiltroInterventiSede,
          listaSediInterventi,
          filtroInterventiSocieta,
          setFiltroInterventiSocieta,
          listaSocietaInterventi,
          filtroInterventiAttivita,
          setFiltroInterventiAttivita,
          listaAttivitaFiltroInterventi,
          filtroInterventiCodice,
          setFiltroInterventiCodice,
          listaCodiciFiltroInterventi,
          resetFiltriInterventi,
          esportaInterventiFiltratiPdf,
          formatCurrency,
          totaleSpesaInterventiFiltrati,
          interventiFiltrati,
          codiciCoinvoltiInterventi,
          ditteCoinvolteInterventi,
          costoMedioInterventoFiltrato,
          classificaCostiPerDitta,
          classificaCostiPerSede,
          classificaCostiPerCespite,
          classificaCostiPerAttivita,
          setCostiPanelAperto,
          costiPanelAperto,
          puliziaSocietaDaCorreggere
        }} /></Suspense>}

{paginaScadenzeAttiva && <Suspense fallback={<div className="fmed-lazy-loading">Caricamento modulo…</div>}><ScadenzePage {...{
          styles,
          scadenzeVisualizzate,
          scadenzeConStatoBase,
          scadenzeSelezionateVisualizzate,
          filtroScadenze,
          setFiltroScadenze,
          filtroScadenzeModulo,
          setFiltroScadenzeModulo,
          listaModuliFiltroScadenze,
          setScadenzeElencoAperto,
          filtroScadenzeCodice,
          setFiltroScadenzeCodice,
          listaCodiciFiltroScadenze,
          filtroScadenzeSede,
          setFiltroScadenzeSede,
          listaSediFiltroScadenze,
          filtroScadenzeTipologia,
          setFiltroScadenzeTipologia,
          listaTipologieFiltroScadenze,
          filtroScadenzeAttivita,
          setFiltroScadenzeAttivita,
          listaAttivitaFiltroScadenze,
          filtroScadenzeDitta,
          setFiltroScadenzeDitta,
          listaDitteFiltroScadenze,
          normalizzaSocietaDitta,
          ordineScadenze,
          setOrdineScadenze,
          filtroScadenzeProssimaDa,
          setFiltroScadenzeProssimaDa,
          filtroScadenzeProssimaA,
          setFiltroScadenzeProssimaA,
          scadenzeElencoAperto,
          selezionaTutteScadenzeVisualizzate,
          deselezionaTutteScadenze,
          resetFiltriScadenze,
          esportaScadenzePdf,
          scadenzeScadute,
          scadenzeImminenti,
          scadenzeRenderizzate,
          chiaveScadenzaExport,
          scadenzeSelezionateExport,
          statoScadenza,
          toggleScadenzaExport,
          apriSchedaDaCodice,
          formattaData,
          setScadenzeRenderLimit,
          FMED_RENDER_BATCH_SCADENZE
        }} /></Suspense>}

{paginaSicurezzaAttiva && <Suspense fallback={<div className="fmed-lazy-loading">Caricamento Sicurezza 81/08…</div>}>
    <Sicurezza8108Page apiBaseUrl={API_BASE_URL} />
  </Suspense>}

{paginaInfrastruttureAttiva && <Suspense fallback={<div className="fmed-lazy-loading">Caricamento modulo…</div>}><InfrastrutturePage {...{
          styles,
          infrastruttureFiltrate,
          infrastruttureConStato,
          infraOk,
          infraInScadenza,
          infraScadute,
          ricercaInfra,
          setRicercaInfra,
          filtroInfraSede,
          setFiltroInfraSede,
          listaInfraSedi,
          filtroInfraCategoria,
          setFiltroInfraCategoria,
          listaInfraCategorie,
          filtroInfraStato,
          setFiltroInfraStato,
          filtroInfraDitta,
          setFiltroInfraDitta,
          listaInfraDitte,
          filtroInfraPeriodicita,
          setFiltroInfraPeriodicita,
          listaInfraPeriodicita,
          filtroInfraPriorita,
          setFiltroInfraPriorita,
          listaInfraPriorita,
          filtroInfraResponsabile,
          setFiltroInfraResponsabile,
          listaInfraResponsabili,
          filtroInfraCentroCosto,
          setFiltroInfraCentroCosto,
          listaInfraCentriCosto,
          filtroInfraSocieta,
          setFiltroInfraSocieta,
          listaInfraSocieta,
          filtroInfraProssimaDa,
          setFiltroInfraProssimaDa,
          filtroInfraProssimaA,
          setFiltroInfraProssimaA,
          permessiRuoloFmed,
          apriNuovaInfrastruttura,
          caricaInfrastruttureOnDemand,
          infrastruttureLoading,
          resetFiltriInfrastrutture,
          formattaData,
          apriMenuAttivitaInfrastruttura,
          apriMenuDocumentazioneInfrastruttura,
          apriReportInfrastruttura,
          apriMenuAllegaInfrastruttura,
          apriModificaInfrastruttura,
          eliminaInfrastruttura,
          eliminazioneInfraLoading,
          formInfrastrutturaOpen,
          infraInModifica,
          formInfra,
          aggiornaFormInfra,
          SEDI_STANDARD_LIST,
          infraCategorieStandard,
          infraDitteOptions,
          infraPeriodicitaStandard,
          infraStatiStandard,
          PRIORITA_STANDARD,
          infraSocietaOptions,
          infraCentroCostoOptions,
          messaggioInfra,
          salvaInfrastruttura,
          salvataggioInfraLoading,
          setFormInfrastrutturaOpen,
          apiBaseUrl: API_BASE_URL
        }} /></Suspense>}

{paginaExportAttiva && permessiRuoloFmed.canExport && <Suspense fallback={<div className="fmed-lazy-loading">Caricamento modulo…</div>}><ExportPage {...{
          styles,
          fmedAuditQualitaDati,
          exportAuditQualitaDatiFmed,
          setExportPanelAperto,
          exportPanelAperto,
          exportSedeInventario,
          setExportSedeInventario,
          listaSedi,
          exportStatoInventario,
          setExportStatoInventario,
          listaStatiAsset,
          exportCategoriaInventario,
          setExportCategoriaInventario,
          listaCategorie,
          formatCategoria,
          exportTipologiaInventario,
          setExportTipologiaInventario,
          listaTipologie,
          exportCostruttoreInventario,
          setExportCostruttoreInventario,
          listaCostruttori,
          exportRepartoInventario,
          setExportRepartoInventario,
          listaReparti,
          exportSocietaInventario,
          setExportSocietaInventario,
          listaSocieta,
          exportLocazioneInventario,
          setExportLocazioneInventario,
          listaLocazioniExportInventario,
          exportOrdineInventario,
          setExportOrdineInventario,
          renderFiltroBrancheExport,
          exportBrancheInventario,
          setExportBrancheInventario,
          setExportCespitiInventarioSelezionati,
          resetColonneExtraInventario,
          colonneExtraInventarioDisponibili,
          exportInventarioColonneExtra,
          toggleColonnaExtraInventario,
          selezionaTuttiCespitiInventario,
          codiciInventarioExportVisibili,
          exportRicercaCespiteInventario,
          setExportRicercaCespiteInventario,
          exportCespitiInventarioSelezionati,
          toggleCespiteExportInventario,
          codiciInventarioExport,
          exportInventarioFmed,
          exportSedeInterventi,
          setExportSedeInterventi,
          setExportSediInterventi,
          listaSediInterventi,
          exportCodiceInterventi,
          setExportCodiceInterventi,
          listaCodiciFiltroInterventi,
          exportTipologiaInterventi,
          setExportTipologiaInterventi,
          listaTipologieFiltroInterventi,
          exportSocietaInterventi,
          setExportSocietaInterventi,
          listaSocietaInterventi,
          exportAnnoInterventi,
          setExportAnnoInterventi,
          listaAnniContabiliInterventi,
          exportScadenzaInterventi,
          setExportScadenzaInterventi,
          exportDataInterventiDa,
          setExportDataInterventiDa,
          exportDataInterventiA,
          setExportDataInterventiA,
          renderFiltroSediInterventiExport,
          exportBrancheInterventi,
          setExportBrancheInterventi,
          selezionaTutteAttivitaExportInterventi,
          escludiTutteAttivitaExportInterventi,
          listaAttivitaExportInterventi,
          exportAttivitaInterventiEscluse,
          toggleAttivitaExportInterventi,
          attivitaExportIncluse,
          selezionaTuttiCespitiInterventi,
          codiciInterventiExportVisibili,
          setExportCespitiInterventiSelezionati,
          exportRicercaCespiteInterventi,
          setExportRicercaCespiteInterventi,
          exportCespitiInterventiSelezionati,
          toggleCespiteExportInterventi,
          codiciInterventiExport,
          exportInterventiFmed,
          scadenzeVisualizzate,
          scadenzeSelezionateVisualizzate,
          resetFiltriScadenze,
          selezionaTutteScadenzeVisualizzate,
          deselezionaTutteScadenze,
          filtroScadenze,
          setFiltroScadenze,
          filtroScadenzeCodice,
          setFiltroScadenzeCodice,
          listaCodiciFiltroScadenze,
          filtroScadenzeSede,
          setFiltroScadenzeSede,
          listaSediFiltroScadenze,
          filtroScadenzeTipologia,
          setFiltroScadenzeTipologia,
          listaTipologieFiltroScadenze,
          filtroScadenzeAttivita,
          setFiltroScadenzeAttivita,
          listaAttivitaFiltroScadenze,
          filtroScadenzeDitta,
          setFiltroScadenzeDitta,
          listaDitteFiltroScadenze,
          normalizzaSocietaDitta,
          filtroScadenzeProssimaDa,
          setFiltroScadenzeProssimaDa,
          filtroScadenzeProssimaA,
          setFiltroScadenzeProssimaA,
          exportBrancheScadenze,
          setExportBrancheScadenze,
          exportScadenzeExcelFmed,
          exportBudgetSede,
          setExportBudgetSede,
          exportBudgetStato,
          setExportBudgetStato,
          exportBudgetTipologia,
          setExportBudgetTipologia,
          exportBudgetCostruttore,
          setExportBudgetCostruttore,
          exportBudgetCriticita,
          setExportBudgetCriticita,
          exportBrancheBudget,
          setExportBrancheBudget,
          exportBudgetCriticitaFmed
        }} /></Suspense>}

        {pagina === "Nuovo Asset" && nuovoAssetWizardOpen && <Suspense fallback={<div style={styles.card}>Caricamento processo Nuovo Asset…</div>}>
            <NewAssetWizard apiBaseUrl={API_BASE_URL} dizionari={dizionariCoreFmed} user={utenteCorrenteFmed || sessioneFmed?.email || "FMED"} executionId={processoGuidatoEsecuzioneId} initialData={nuovoAssetWizardInitialData} onOpenOcr={bozzaWizard => {
          resetFormNuovoCespite();
          setFormNuovoCespite(prev => ({
            ...prev,
            ...(bozzaWizard || {})
          }));
          setNuovoAssetWizardInitialData(bozzaWizard || {});
          setNuovoAssetWizardOpen(false);
          setPagina(nuovoAssetWizardReturnPage || "Asset");
          setNuovoCespiteOpen(true);
        }} onClose={() => {
          setNuovoAssetWizardOpen(false);
          setNuovoAssetWizardInitialData({});
          setProcessoGuidatoEsecuzioneId(null);
          setPagina(nuovoAssetWizardReturnPage || "Asset");
        }} onCreated={risposta => {
          const backend = Array.isArray(risposta?.asset?.risultato) && risposta.asset.risultato.length ? risposta.asset.risultato[0] : risposta?.asset?.dati_creati || {};
          const creato = {
            ...backend,
            ...(risposta?.asset?.dati_creati || {}),
            codicestrumento: risposta?.asset?.codice || backend.codicestrumento,
            link_documento: risposta?.asset?.link_documento || backend.link_documento || null
          };
          setCespiti(prev => [creato, ...prev.filter(x => String(x.codicestrumento || "") !== String(creato.codicestrumento || ""))]);
          setNuovoAssetWizardOpen(false);
          setNuovoAssetWizardInitialData({});
          setProcessoGuidatoEsecuzioneId(null);
          setPagina("Asset");
          alert(`Asset ${creato.codicestrumento || ""} creato correttamente con processo FMED.`);
          if (creato.codicestrumento) apriSchedaCespite(creato);
        }} />
          </Suspense>}

        {(pagina === "Gestione Utenti" || pagina === "Dizionari") && permessiRuoloFmed.canManageUsers && <Suspense fallback={<div style={styles.card}>Caricamento Impostazioni…</div>}>
            <ImpostazioniPage
              apiBaseUrl={API_BASE_URL}
              canManage={permessiRuoloFmed.canManageUsers}
              activeTab={impostazioniTab}
              onTabChange={setImpostazioniTab}
              onDataChanged={ricaricaDizionariCoreFmed}
              dictionariesOnly={pagina === "Dizionari"}
            />
          </Suspense>}

        <AlertMailDialog
          open={alertMailOpen}
          onClose={() => setAlertMailOpen(false)}
          onSend={inviaAlertScadenzeEmail}
          onCheck={verificaConfigurazioneAlertEmail}
          onOpenOutlook={apriOutlookAlertScadenze}
          sites={listaSediAsset}
        />

        {nuovoInterventoOpen && <div className="fmed-modal-overlay" style={styles.modalOverlayTop} role="dialog" aria-modal="true" aria-labelledby="fmed-new-intervention-title">
    <div className="fmed-modal-card" style={{
          ...styles.modalCard,
          ...{}
        }}>
      <button style={styles.closeBtn} onClick={() => chiudiNuovoIntervento({ annullaProcesso: true })}>
        Chiudi
      </button>

      <h2 id="fmed-new-intervention-title" style={styles.modalTitle}>{processoNuovoInterventoGuidato ? "Nuovo intervento guidato" : "Nuovo intervento"}</h2>

      <NewInterventionAssetPicker
        cespiti={cespiti}
        selectedCode={formNuovoIntervento.codice_strumento}
        onSelect={selezionaCespiteNuovoIntervento}
      />

      {processoNuovoInterventoGuidato && !formNuovoIntervento.codice_strumento && (
        <div className="fmed-guided-process-waiting">
          Seleziona un cespite per continuare. Il processo verrà registrato soltanto dopo la selezione.
        </div>
      )}

      {(!processoNuovoInterventoGuidato || formNuovoIntervento.codice_strumento) && <div className="fmed-new-intervention-form" style={styles.editPanel}>
        {processoNuovoInterventoGuidato && <div className="fmed-guided-process-step"><span>Passaggio 2</span><strong>Compila e conferma l’intervento</strong></div>}
        <div style={{
              ...styles.editGrid,
              ...{}
            }}>
          <SelectField label="Codice strumento" field="codice_strumento" allowQuickAdd={false} options={listaCodiciStrumentoInterventi} formCespite={formNuovoIntervento} setFormCespite={setFormNuovoIntervento} />

          <SelectField label="Sede" field="sede" options={listaSediFormInterventi} formCespite={formNuovoIntervento} setFormCespite={setFormNuovoIntervento} />

          <SelectField label="Locazione" field="locazione" options={listaLocazioniNuovoIntervento} formCespite={formNuovoIntervento} setFormCespite={setFormNuovoIntervento} />

          <SelectField label="Branca" field="branca_medica" options={listaBrancheForm} formCespite={formNuovoIntervento} setFormCespite={setFormNuovoIntervento} />

          <SelectField label="Tipologia" field="tipologia" options={listaTipologieFormInterventi} formCespite={formNuovoIntervento} setFormCespite={setFormNuovoIntervento} />

          <SelectField label="Attività" field="attivita" options={listaAttivitaInterventi} formCespite={formNuovoIntervento} setFormCespite={setFormNuovoIntervento} />

          <SelectField label="Costruttore" field="costruttore" options={listaCostruttoriFormInterventi} formCespite={formNuovoIntervento} setFormCespite={setFormNuovoIntervento} />

          <SelectField label="Modello" field="modello" options={listaModelliFormInterventi} formCespite={formNuovoIntervento} setFormCespite={setFormNuovoIntervento} />

          <SelectField label="Reparto" field="reparto" options={listaRepartiFormInterventi} formCespite={formNuovoIntervento} setFormCespite={setFormNuovoIntervento} />

          <div style={styles.editField}>
            <label style={styles.editLabel}>Matricola</label>
            <input style={styles.editInput} value={formNuovoIntervento.matricola || ""} onChange={e => setFormNuovoIntervento({
                  ...formNuovoIntervento,
                  matricola: e.target.value
                })} />
          </div>

          <SelectField label="Società / Committente" field="societa" options={listaSocietaFormInterventi} formCespite={formNuovoIntervento} setFormCespite={setFormNuovoIntervento} />

          <SelectField label="Ditta esecutrice" field="ditta_esecutrice" options={listaDitteEsecutriciFormInterventi} formCespite={formNuovoIntervento} setFormCespite={setFormNuovoIntervento} />

          <CanonicalSelect
            label="Periodicità"
            field="periodicita"
            dictionary="PERIODICITA"
            value={formNuovoIntervento.periodicita || ""}
            options={listaPeriodicitaFormInterventi}
            form={formNuovoIntervento}
            apiBaseUrl={API_BASE_URL}
            style={styles.editField}
            onChange={value => setFormNuovoIntervento(prev => aggiornaFormInterventoConScadenza(prev, "periodicita", value))}
          />

          <div style={styles.editField}>
            <label style={styles.editLabel}>Data ultimo intervento</label>
            <input type="date" style={styles.editInput} value={formNuovoIntervento.data_ultimo_intervento || ""} onChange={e => setFormNuovoIntervento(prev => aggiornaFormInterventoConScadenza(prev, "data_ultimo_intervento", e.target.value))} />
          </div>

          <div style={styles.editField}>
            <label style={styles.editLabel}>Data prossimo intervento</label>
            <input type="date" style={styles.editInput} value={formNuovoIntervento.data_prossimo_intervento || ""} onChange={e => setFormNuovoIntervento({
                  ...formNuovoIntervento,
                  data_prossimo_intervento: e.target.value
                })} />
          </div>

          <div style={styles.editField}>
            <label style={styles.editLabel}>Costo (€)</label>
            <input style={styles.editInput} inputMode="decimal" value={formNuovoIntervento.costo || ""} onChange={e => setFormNuovoIntervento({
                  ...formNuovoIntervento,
                  costo: e.target.value
                })} placeholder="€ 250,00" />
          </div>

          <div style={styles.editField}>
            <label style={styles.editLabel}>Importo extra (€)</label>
            <input style={styles.editInput} inputMode="decimal" value={formNuovoIntervento.importo_extra || ""} onChange={e => setFormNuovoIntervento({
                  ...formNuovoIntervento,
                  importo_extra: e.target.value
                })} placeholder="€ 80,00" />
          </div>

          <CanonicalSelect
            label="Esito"
            field="esito"
            dictionary="ESITI_INTERVENTO"
            value={formNuovoIntervento.esito || ""}
            options={listaEsitiInterventi}
            form={formNuovoIntervento}
            apiBaseUrl={API_BASE_URL}
            style={styles.editField}
            onChange={value => setFormNuovoIntervento(prev => ({ ...prev, esito: value }))}
          />

          <div style={styles.editField}>
            <label style={styles.editLabel}>Link documento / Job report</label>
            <input style={styles.editInput} value={formNuovoIntervento.link_documento || ""} onChange={e => setFormNuovoIntervento({
                  ...formNuovoIntervento,
                  link_documento: e.target.value
                })} placeholder="https://..." />
          </div>

          <div style={{
                ...styles.editField,
                gridColumn: "1 / -1"
              }}>
            <label style={styles.editLabel}>Descrizione attività</label>
            <textarea style={styles.editTextarea} value={formNuovoIntervento.descrizione_attivita || ""} onChange={e => setFormNuovoIntervento({
                  ...formNuovoIntervento,
                  descrizione_attivita: e.target.value
                })} placeholder="Descrivi intervento, ricambi, anomalie, note tecniche..." />
          </div>
        </div>

        <div className="fmed-new-intervention-status" aria-live="polite">
          <span><strong>Prima di salvare:</strong> verifica cespite, attività, date, ditta ed esito. I dati del cespite possono essere corretti senza modificare la sua anagrafica.</span>
          <span>{formNuovoIntervento.codice_strumento ? `Cespite: ${formNuovoIntervento.codice_strumento}` : "Cespite non selezionato"}</span>
        </div>

        <div style={styles.editActions}>
          <button type="button" style={styles.cancelBtn} onClick={() => chiudiNuovoIntervento({ annullaProcesso: true })}>
            Annulla
          </button>

          <button type="button" style={styles.saveBtn} onClick={salvaNuovoIntervento} disabled={!String(formNuovoIntervento.codice_strumento || "").trim()} title={!String(formNuovoIntervento.codice_strumento || "").trim() ? "Seleziona prima un cespite" : "Salva il nuovo intervento"}>
            {String(formNuovoIntervento.codice_strumento || "").trim() ? "Salva intervento" : "Seleziona un cespite"}
          </button>
        </div>
      </div>}
    </div>
  </div>}

        {modificaInterventoOpen && <div className="fmed-modal-overlay" style={{
        ...styles.modalOverlayTop,
        zIndex: 7000
      }}>
    <div className="fmed-modal-card" style={{
          ...styles.modalCard,
          ...{}
        }}>
      <button style={styles.closeBtn} onClick={() => {
            setModificaInterventoOpen(false);
            setInterventoDaModificare(null);
            setFormModificaIntervento({});
          }}>
        Chiudi
      </button>

      <h2 style={styles.modalTitle}>✏️ Modifica intervento</h2>

      <div style={styles.editPanel}>
        <div style={{
              ...styles.editGrid,
              ...{}
            }}>
          <SelectField label="Codice strumento" field="codice_strumento" allowQuickAdd={false} options={listaCodiciStrumentoInterventi} formCespite={formModificaIntervento} setFormCespite={setFormModificaIntervento} />

          <SelectField label="Sede" field="sede" options={listaSediFormInterventi} formCespite={formModificaIntervento} setFormCespite={setFormModificaIntervento} />

          <SelectField label="Tipologia" field="tipologia" options={listaTipologieFormInterventi} formCespite={formModificaIntervento} setFormCespite={setFormModificaIntervento} />

          <SelectField label="Attività" field="attivita" options={listaAttivitaInterventi} formCespite={formModificaIntervento} setFormCespite={setFormModificaIntervento} />

          <SelectField label="Costruttore" field="costruttore" options={listaCostruttoriFormInterventi} formCespite={formModificaIntervento} setFormCespite={setFormModificaIntervento} />

          <SelectField label="Modello" field="modello" options={listaModelliFormInterventi} formCespite={formModificaIntervento} setFormCespite={setFormModificaIntervento} />

          <SelectField label="Reparto" field="reparto" options={listaRepartiFormInterventi} formCespite={formModificaIntervento} setFormCespite={setFormModificaIntervento} />

          <div style={styles.editField}>
            <label style={styles.editLabel}>Matricola</label>
            <input style={styles.editInput} value={formModificaIntervento.matricola || ""} onChange={e => setFormModificaIntervento({
                  ...formModificaIntervento,
                  matricola: e.target.value
                })} />
          </div>

          <SelectField label="Società / Committente" field="societa" options={listaSocietaFormInterventi} formCespite={formModificaIntervento} setFormCespite={setFormModificaIntervento} />

          <SelectField label="Ditta esecutrice" field="ditta_esecutrice" options={listaDitteEsecutriciFormInterventi} formCespite={formModificaIntervento} setFormCespite={setFormModificaIntervento} />

          <CanonicalSelect
            label="Periodicità"
            field="periodicita"
            dictionary="PERIODICITA"
            value={formModificaIntervento.periodicita || ""}
            options={listaPeriodicitaFormInterventi}
            form={formModificaIntervento}
            apiBaseUrl={API_BASE_URL}
            style={styles.editField}
            onChange={value => setFormModificaIntervento(prev => aggiornaFormInterventoConScadenza(prev, "periodicita", value))}
          />

          <div style={styles.editField}>
            <label style={styles.editLabel}>Ultimo intervento</label>
            <input type="date" style={styles.editInput} value={formModificaIntervento.data_ultimo_intervento || ""} onChange={e => setFormModificaIntervento(prev => aggiornaFormInterventoConScadenza(prev, "data_ultimo_intervento", e.target.value))} />
          </div>

          <div style={styles.editField}>
            <label style={styles.editLabel}>Prossimo intervento</label>
            <input type="date" style={styles.editInput} value={formModificaIntervento.data_prossimo_intervento || ""} onChange={e => setFormModificaIntervento({
                  ...formModificaIntervento,
                  data_prossimo_intervento: e.target.value
                })} />
          </div>

          <CanonicalSelect
            label="Esito"
            field="esito"
            dictionary="ESITI_INTERVENTO"
            value={formModificaIntervento.esito || ""}
            options={listaEsitiInterventi}
            form={formModificaIntervento}
            apiBaseUrl={API_BASE_URL}
            style={styles.editField}
            onChange={value => setFormModificaIntervento(prev => ({ ...prev, esito: value }))}
          />

          <div style={styles.editField}>
            <label style={styles.editLabel}>Costo (€)</label>
            <input style={styles.editInput} inputMode="decimal" value={formModificaIntervento.costo || ""} onChange={e => setFormModificaIntervento({
                  ...formModificaIntervento,
                  costo: e.target.value
                })} placeholder="€ 250,00" />
          </div>

          <div style={styles.editField}>
            <label style={styles.editLabel}>Importo extra (€)</label>
            <input style={styles.editInput} inputMode="decimal" value={formModificaIntervento.importo_extra || ""} onChange={e => setFormModificaIntervento({
                  ...formModificaIntervento,
                  importo_extra: e.target.value
                })} placeholder="€ 80,00" />
          </div>

          <div style={{
                ...styles.editField,
                gridColumn: "1 / -1"
              }}>
            <label style={styles.editLabel}>Link documento / Job report</label>
            <input style={styles.editInput} value={formModificaIntervento.link_documento || ""} onChange={e => setFormModificaIntervento({
                  ...formModificaIntervento,
                  link_documento: e.target.value
                })} placeholder="https://..." />
          </div>

          <div style={{
                ...styles.editField,
                gridColumn: "1 / -1"
              }}>
            <label style={styles.editLabel}>Descrizione attività</label>
            <textarea style={styles.editTextarea} value={formModificaIntervento.descrizione_attivita || ""} onChange={e => setFormModificaIntervento({
                  ...formModificaIntervento,
                  descrizione_attivita: e.target.value
                })} placeholder="Correggi descrizione, note tecniche, refusi, ricambi..." />
          </div>
        </div>

        <div style={styles.editActions}>
          <button style={styles.cancelBtn} onClick={() => {
                setModificaInterventoOpen(false);
                setInterventoDaModificare(null);
                setFormModificaIntervento({});
              }}>
            Annulla
          </button>

          <button style={styles.saveBtn} onClick={salvaModificaIntervento}>
            💾 Salva modifiche
          </button>
        </div>
      </div>
    </div>
  </div>}

        {nuovoCespiteOpen && <div className="fmed-modal-overlay" style={styles.modalOverlay}>
    <div className="fmed-modal-card" style={{
          ...styles.modalCard,
          ...{}
        }}>
      <button style={styles.closeBtn} onClick={() => {
            setNuovoCespiteOpen(false);
            setNuovoAssetWizardInitialData({});
            setProcessoGuidatoEsecuzioneId(null);
            resetFormNuovoCespite();
          }}>
        Chiudi
      </button>

      <h2 style={styles.modalTitle}>
        {processoGuidatoEsecuzioneId ? "📷 Acquisizione OCR per wizard Enterprise" : "➕ Aggiungi nuovo cespite"}
      </h2>

      {String(formNuovoCespite.note || "").toUpperCase().includes("COPIATO DA") && <div style={{
            margin: "10px 0 16px 0",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(109,177,147,0.45)",
            background: "rgba(109,177,147,0.12)",
            color: "var(--fmed-text)",
            fontSize: 13,
            lineHeight: 1.45
          }}>
          📋 Bozza creata copiando un cespite esistente. Controlla e modifica codice inventario, matricola e gli altri dati prima di salvare.
        </div>}

      <div style={{
            margin: "12px 0 18px 0",
            padding: 14,
            borderRadius: 14,
            border: "1px solid var(--fmed-border)",
            background: "rgba(19,60,85,0.06)"
          }}>
        <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap"
            }}>
          <div>
            <div style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "var(--fmed-text)"
                }}>
              📷 Scansiona targhetta sistema primario
            </div>
            <div style={{
                  ...styles.mutedSmall,
                  marginTop: 4
                }}>
              Scatta o carica la targhetta dello strumento principale: FMED compila costruttore, modello, matricola e anno. Non modifica Note né Accessori.
            </div>
          </div>

          <label style={{
                ...styles.secondaryBtn,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: ocrTarghettaLoading ? "not-allowed" : "pointer",
                opacity: ocrTarghettaLoading ? 0.7 : 1,
                minHeight: 42,
                padding: "0 16px"
              }}>
            {ocrTarghettaLoading ? "⏳ Lettura..." : "📷 Scansiona sistema primario"}
            <input type="file" accept="image/*" disabled={ocrTarghettaLoading} style={{
                  display: "none"
                }} onChange={e => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  scansionaTarghettaNuovoCespite(file);
                }} />
          </label>
        </div>

        {ocrTarghettaEsito && <div style={{
              marginTop: 12,
              padding: "10px 12px",
              borderRadius: 10,
              background: ocrTarghettaEsito.status === "error" ? "rgba(217,56,30,0.10)" : "rgba(30,130,76,0.10)",
              color: "var(--fmed-text)",
              fontSize: 13
            }}>
            {ocrTarghettaEsito.status === "error" ? "⚠️ " : "✅ "}
            {ocrTarghettaEsito.note || "OCR completato. Controlla i campi prima di salvare."}
            {ocrTarghettaEsito.confidence !== null && ocrTarghettaEsito.confidence !== undefined && <span> Confidenza: {Math.round(Number(ocrTarghettaEsito.confidence) * 100)}%</span>}
          </div>}
      </div>

      <div style={{
            margin: "0 0 18px 0",
            padding: 14,
            borderRadius: 14,
            border: "1px solid var(--fmed-border)",
            background: "rgba(19,60,85,0.04)"
          }}>
        <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap"
            }}>
          <div>
            <div style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "var(--fmed-text)"
                }}>
              📷 Scansiona targhetta accessorio
            </div>
            <div style={{
                  ...styles.mutedSmall,
                  marginTop: 4
                }}>
              Scatta sonde, manipoli, pedaliere, monitor, stampanti, UPS o accessori collegati. FMED li aggiunge solo al campo Accessori / Sistema primario.
            </div>
          </div>

          <label style={{
                ...styles.secondaryBtn,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: ocrAccessorioLoading ? "not-allowed" : "pointer",
                opacity: ocrAccessorioLoading ? 0.7 : 1,
                minHeight: 42,
                padding: "0 16px"
              }}>
            {ocrAccessorioLoading ? "⏳ Lettura..." : "📷 Aggiungi accessorio"}
            <input type="file" accept="image/*" disabled={ocrAccessorioLoading} style={{
                  display: "none"
                }} onChange={e => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  aggiungiAccessorioDaFotoNuovoCespite(file);
                }} />
          </label>
        </div>

        {ocrAccessorioEsito && <div style={{
              marginTop: 12,
              padding: "10px 12px",
              borderRadius: 10,
              background: ocrAccessorioEsito.status === "error" ? "rgba(217,56,30,0.10)" : "rgba(30,130,76,0.10)",
              color: "var(--fmed-text)",
              fontSize: 13
            }}>
            {ocrAccessorioEsito.status === "error" ? "⚠️ " : "✅ "}
            {ocrAccessorioEsito.note || "Accessorio acquisito. Controlla il campo Accessori / Sistema primario."}
            {ocrAccessorioEsito.confidence !== null && ocrAccessorioEsito.confidence !== undefined && <span> Confidenza: {Math.round(Number(ocrAccessorioEsito.confidence) * 100)}%</span>}
          </div>}
      </div>

      <div style={styles.editPanel}>
        <div style={{
              ...styles.editGrid,
              ...{}
            }}>
          <div style={styles.editField}>
            <label style={styles.editLabel}>Codice inventario / strumento *</label>
            <input style={{
                  ...styles.editInput,
                  borderColor: codiceCespiteAutomatico ? "var(--fmed-border)" : "rgba(109,177,147,0.75)"
                }} value={formNuovoCespite.codicestrumento || ""} onChange={e => {
                  // Inserimento manuale: appena Fabio scrive il codice, FMED non lo sovrascrive più.
                  setCodiceCespiteAutomatico(false);
                  setFormNuovoCespite({
                    ...formNuovoCespite,
                    codicestrumento: e.target.value
                  });
                }} placeholder={codiceCespiteAutomatico ? "Generato automaticamente dalla sede" : "Inserisci codice manuale es. A_003999"} />

            <div style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "8px",
                  flexWrap: "wrap"
                }}>
              <button type="button" style={{
                    ...styles.secondaryBtn,
                    padding: "8px 10px",
                    fontSize: "12px"
                  }} onClick={async () => {
                    const codiceGenerato = await generaCodiceCespiteDaBackend(formNuovoCespite.sede);
                    if (!codiceGenerato) return;
                    setCodiceCespiteAutomatico(true);
                    setFormNuovoCespite({
                      ...formNuovoCespite,
                      codicestrumento: codiceGenerato
                    });
                  }}>
                {generazioneCodiceLoading ? "⏳ Generazione..." : "⚙️ Genera automatico"}
              </button>

              <button type="button" style={{
                    ...styles.secondaryBtn,
                    padding: "8px 10px",
                    fontSize: "12px",
                    background: codiceCespiteAutomatico ? undefined : "rgba(109,177,147,0.22)",
                    borderColor: codiceCespiteAutomatico ? undefined : "rgba(109,177,147,0.75)"
                  }} onClick={() => {
                    setCodiceCespiteAutomatico(false);
                    setFormNuovoCespite(prev => ({
                      ...prev,
                      codicestrumento: ""
                    }));
                  }}>
                ✍️ Inserisci manuale
              </button>

              <span style={{
                    ...styles.mutedSmall,
                    alignSelf: "center"
                  }}>
                {codiceCespiteAutomatico ? "Modalità automatica: il codice viene calcolato dalla sede selezionata." : "Modalità manuale: il codice inserito viene salvato così com’è e non viene rigenerato."}
              </span>
            </div>
          </div>

          <SelectField label="Tipologia" field="tipologia" options={listaTipologieFormInterventi} formCespite={formNuovoCespite} setFormCespite={setFormNuovoCespite} />

          <SelectField label="Costruttore" field="costruttore" options={listaCostruttoriFormInterventi} formCespite={formNuovoCespite} setFormCespite={setFormNuovoCespite} />

          <SelectField label="Modello" field="modello" options={listaModelliFormInterventi} formCespite={formNuovoCespite} setFormCespite={setFormNuovoCespite} />

          <div style={styles.editField}>
            <label style={styles.editLabel}>Matricola</label>
            <input style={styles.editInput} value={formNuovoCespite.matricola || ""} onChange={e => setFormNuovoCespite({
                  ...formNuovoCespite,
                  matricola: e.target.value
                })} />
          </div>

          <SelectField label="Società" field="societa" options={listaSocieta} formCespite={formNuovoCespite} setFormCespite={setFormNuovoCespite} />

          <SelectField label="Categoria" field="categoria" options={listaCategorie} formCespite={formNuovoCespite} setFormCespite={setFormNuovoCespite} />

          <SelectField label="Stato asset" field="stato_asset" options={listaStatiAsset} formCespite={formNuovoCespite} setFormCespite={setFormNuovoCespite} />

          <SelectField label="Possesso" field="possesso" options={listaPossesso} formCespite={formNuovoCespite} setFormCespite={setFormNuovoCespite} />

          <CanonicalSelect
            label="Sede"
            field="sede"
            dictionary="SEDI"
            value={formNuovoCespite.sede || ""}
            options={listaSediFormInterventi}
            form={formNuovoCespite}
            apiBaseUrl={API_BASE_URL}
            style={styles.editField}
            onChange={async nuovaSede => {
              setCodiceCespiteAutomatico(true);
              setFormNuovoCespite(prev => ({ ...prev, sede: nuovaSede, codicestrumento: "" }));
              if (!nuovaSede) return;
              const codiceGenerato = await generaCodiceCespiteDaBackend(nuovaSede);
              if (!codiceGenerato) return;
              setFormNuovoCespite(prev => ({ ...prev, sede: nuovaSede, codicestrumento: codiceGenerato }));
            }}
          />

          <SelectField label="Reparto" field="reparto" options={listaRepartiFormInterventi} formCespite={formNuovoCespite} setFormCespite={setFormNuovoCespite} />

          <CanonicalSelect
            label="Branca medica"
            field="branca_medica"
            dictionary="BRANCHE_MEDICHE"
            value={formNuovoCespite.branca_medica || ""}
            options={listaBrancheForm}
            form={formNuovoCespite}
            apiBaseUrl={API_BASE_URL}
            style={styles.editField}
            onChange={nuovaBranca => {
              const tipologiaSuggerita = fmedSuggerisciTipologiaDaBranca(nuovaBranca);
              setFormNuovoCespite(prev => ({ ...prev, branca_medica: nuovaBranca, tipologia: prev.tipologia || tipologiaSuggerita || "" }));
            }}
          />

          <SelectField label="Locazione" field="locazione" options={listaLocazioniNuovoCespite} formCespite={formNuovoCespite} setFormCespite={setFormNuovoCespite} />

          <SelectField label="Fornitore" field="fornitore" options={listaFornitori} formCespite={formNuovoCespite} setFormCespite={setFormNuovoCespite} />

          <div style={styles.editField}>
            <label style={styles.editLabel}>Anno</label>
            <input style={styles.editInput} value={formNuovoCespite.anno_di_fabbricazione || ""} onChange={e => setFormNuovoCespite({
                  ...formNuovoCespite,
                  anno_di_fabbricazione: e.target.value
                })} />
          </div>

          <div style={styles.editField}>
            <label style={styles.editLabel}>Marcatura CE</label>
            <input style={styles.editInput} value={formNuovoCespite.marcatura_ce || ""} onChange={e => setFormNuovoCespite({
                  ...formNuovoCespite,
                  marcatura_ce: e.target.value
                })} />
          </div>

          <div style={styles.editField}>
            <label style={styles.editLabel}>Alimentazione</label>
            <input style={styles.editInput} value={formNuovoCespite.alimentazione || ""} onChange={e => setFormNuovoCespite({
                  ...formNuovoCespite,
                  alimentazione: e.target.value
                })} />
          </div>

          <div style={styles.editField}>
            <label style={styles.editLabel}>Potenza</label>
            <input style={styles.editInput} value={formNuovoCespite.potenza || ""} onChange={e => setFormNuovoCespite({
                  ...formNuovoCespite,
                  potenza: e.target.value
                })} />
          </div>

          <div style={styles.editField}>
            <label style={styles.editLabel}>Frequenza</label>
            <input style={styles.editInput} value={formNuovoCespite.frequenza || ""} onChange={e => setFormNuovoCespite({
                  ...formNuovoCespite,
                  frequenza: e.target.value
                })} />
          </div>

          <div style={styles.editField}>
            <label style={styles.editLabel}>Lotto</label>
            <input style={styles.editInput} value={formNuovoCespite.lotto || ""} onChange={e => setFormNuovoCespite({
                  ...formNuovoCespite,
                  lotto: e.target.value
                })} />
          </div>

          <div style={styles.editField}>
            <label style={styles.editLabel}>Prezzo</label>
            <input style={styles.editInput} value={formNuovoCespite.prezzo || ""} onChange={e => setFormNuovoCespite({
                  ...formNuovoCespite,
                  prezzo: e.target.value
                })} />
          </div>

          <div style={styles.editField}>
            <label style={styles.editLabel}>Data collaudo</label>
            <input style={styles.editInput} value={formNuovoCespite.data_di_collaudo || ""} onChange={e => setFormNuovoCespite({
                  ...formNuovoCespite,
                  data_di_collaudo: e.target.value
                })} placeholder="gg/mm/aaaa" />
          </div>

          <div style={styles.editField}>
            <label style={styles.editLabel}>Data messa in uso</label>
            <input style={styles.editInput} value={formNuovoCespite.data_messa_in_uso || ""} onChange={e => setFormNuovoCespite({
                  ...formNuovoCespite,
                  data_messa_in_uso: e.target.value
                })} placeholder="gg/mm/aaaa" />
          </div>

          <div style={{
                ...styles.editField,
                gridColumn: "1 / -1"
              }}>
            <label style={styles.editLabel}>Accessori / Sistema primario</label>
            <textarea style={styles.editTextarea} value={formNuovoCespite.accessori_sistema_primario || ""} onChange={e => setFormNuovoCespite({
                  ...formNuovoCespite,
                  accessori_sistema_primario: e.target.value
                })} />
          </div>

          <div style={{
                ...styles.editField,
                gridColumn: "1 / -1"
              }}>
            <label style={styles.editLabel}>Foto cespite / documentazione</label>
            <div style={{
                  ...styles.mutedSmall,
                  marginBottom: 8
                }}>
              Inserisci link SharePoint o URL foto. I campi sono compatibili: se il DB non ha ancora le colonne, il backend salva comunque il cespite senza bloccare.
            </div>
            <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 10
                }}>
              {CATEGORIE_FOTO_CESPITE.map(foto => <input key={foto.campo} style={styles.editInput} value={formNuovoCespite[foto.campo] || ""} placeholder={`${foto.label} - link SharePoint / URL`} onChange={e => setFormNuovoCespite({
                    ...formNuovoCespite,
                    [foto.campo]: e.target.value
                  })} />)}
            </div>
          </div>

          <div style={{
                ...styles.editField,
                gridColumn: "1 / -1"
              }}>
            <label style={styles.editLabel}>Note</label>
            <textarea style={styles.editTextarea} value={formNuovoCespite.note || ""} onChange={e => setFormNuovoCespite({
                  ...formNuovoCespite,
                  note: e.target.value
                })} />
          </div>
        </div>

        <div style={styles.editActions}>
          <button style={styles.cancelBtn} onClick={() => {
                setNuovoCespiteOpen(false);
                setNuovoAssetWizardInitialData({});
                setProcessoGuidatoEsecuzioneId(null);
                resetFormNuovoCespite();
              }}>
            Annulla
          </button>

          {processoGuidatoEsecuzioneId ? <button style={styles.saveBtn} onClick={() => {
                setNuovoAssetWizardInitialData({
                  ...formNuovoCespite
                });
                setNuovoCespiteOpen(false);
                setNuovoAssetWizardOpen(true);
                setPagina("Nuovo Asset");
              }}>
              Continua nel wizard Enterprise →
            </button> : <button style={styles.saveBtn} onClick={creaNuovoCespite}>
              💾 Crea cespite
            </button>}
        </div>
      </div>
    </div>
  </div>}

{gestioneDizionariOpen && <div className="fmed-modal-overlay" style={styles.modalOverlay}>
    <div style={{
          ...styles.modalSmallCard,
          ...{}
        }}>
      <button style={styles.closeBtn} onClick={() => {
            setGestioneDizionariOpen(false);
            annullaModificaValoreLocale();
          }}>
        Chiudi
      </button>

      <h2 style={styles.modalTitle}>⚙️ Gestione dizionari Asset</h2>
      <p style={{
            ...styles.muted,
            marginTop: "-6px",
            marginBottom: 18
          }}>
        Dizionari raggruppati e chiusi di default: apri solo la sezione che devi aggiornare. Le voci sporche, i link SharePoint e i duplicati vengono esclusi.
      </p>

      <div style={styles.dictionaryGrid}>
        <DizionarioBox titolo="Aggiungi / modifica Tipologia" tipo="tipologia" valore={nuovaTipologia} onChange={setNuovaTipologia} placeholder="Es. ECOGRAFO" onAdd={() => aggiungiValoreLocale("tipologia")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaTipologie} />

        <DizionarioBox titolo="Aggiungi / modifica Branca medica" tipo="branca_medica" valore={nuovaBranca} onChange={setNuovaBranca} placeholder="Es. ECOGRAFIA" onAdd={() => aggiungiValoreLocale("branca_medica")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaBranche} />

        <DizionarioBox titolo="Aggiungi / modifica Sede" tipo="sede" valore={nuovaSede} onChange={setNuovaSede} placeholder="Es. PINDARO" onAdd={() => aggiungiValoreLocale("sede")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaSedi} />

        <DizionarioBox titolo="Aggiungi / modifica Locazione" tipo="locazione" valore={nuovaLocazione} onChange={setNuovaLocazione} placeholder="Es. SALA ECO 1" onAdd={() => aggiungiValoreLocale("locazione")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaLocazioni} />

        <DizionarioBox titolo="Aggiungi / modifica Produttore / Costruttore" tipo="costruttore" valore={nuovoCostruttore} onChange={setNuovoCostruttore} placeholder="Es. PHILIPS" onAdd={() => aggiungiValoreLocale("costruttore")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaCostruttori} />

        <DizionarioBox titolo="Aggiungi / modifica Modello" tipo="modello" valore={nuovoModello} onChange={setNuovoModello} placeholder="Es. EPIQ 7" onAdd={() => aggiungiValoreLocale("modello")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaModelli} />

        <DizionarioBox titolo="Aggiungi / modifica Fornitore" tipo="fornitore" valore={nuovoFornitore} onChange={setNuovoFornitore} placeholder="Es. SINCRONIS" onAdd={() => aggiungiValoreLocale("fornitore")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaFornitori} />

        <DizionarioBox titolo="Aggiungi / modifica Ditta esecutrice" tipo="ditta" valore={nuovaDitta} onChange={setNuovaDitta} placeholder="Es. ESAOTE SPA" onAdd={() => aggiungiValoreLocale("ditta")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaDitteEsecutrici} />

        <DizionarioBox titolo="Aggiungi / modifica Attività" tipo="attivita" valore={nuovaAttivita} onChange={setNuovaAttivita} placeholder="Es. MANUTENZIONE PREVENTIVA" onAdd={() => aggiungiValoreLocale("attivita")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaAttivitaInterventi} />

        <DizionarioBox titolo="Aggiungi / modifica Categoria" tipo="categoria" valore={nuovaCategoria} onChange={setNuovaCategoria} placeholder="Es. E" onAdd={() => aggiungiValoreLocale("categoria")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaCategorie} />

        <DizionarioBox titolo="Aggiungi / modifica Società" tipo="societa" valore={nuovaSocieta} onChange={setNuovaSocieta} placeholder="Es. MARILAB" onAdd={() => aggiungiValoreLocale("societa")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaSocieta} />

        <DizionarioBox titolo="Aggiungi / modifica Possesso" tipo="possesso" valore={nuovoPossesso} onChange={setNuovoPossesso} placeholder="Es. PROPRIETÀ" onAdd={() => aggiungiValoreLocale("possesso")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaPossesso} />

        <DizionarioBox titolo="Aggiungi / modifica Stato cespite" tipo="stato_asset" valore={nuovoStatoAsset} onChange={setNuovoStatoAsset} placeholder="Es. ATTIVO" onAdd={() => aggiungiValoreLocale("stato_asset")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaStatiAsset} />

        <DizionarioBox titolo="Aggiungi / modifica Esito intervento" tipo="esito" valore={nuovoEsito} onChange={setNuovoEsito} placeholder="Es. POSITIVO" onAdd={() => aggiungiValoreLocale("esito")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaEsitiInterventi} />

        <DizionarioBox titolo="Aggiungi / modifica Priorità" tipo="priorita" valore={nuovaPriorita} onChange={setNuovaPriorita} placeholder="Es. ALTA" onAdd={() => aggiungiValoreLocale("priorita")} onRemove={rimuoviValoreLocale} onEdit={avviaModificaValoreLocale} onSaveEdit={salvaModificaValoreLocale} onCancelEdit={annullaModificaValoreLocale} editState={dizionarioInModifica} editValue={valoreDizionarioInModifica} setEditValue={setValoreDizionarioInModifica} anteprima={listaPriorita} />
      </div>
    </div>
  </div>}

        {cespiteSelezionato && <div className="fmed-modal-overlay" style={styles.modalOverlay}>
    <div className="fmed-modal-card" style={{
          ...styles.modalCard,
          ...{}
        }}>
      <button style={styles.closeBtn} onClick={() => setCespiteSelezionato(null)}>
        Chiudi
      </button>

      <div style={styles.assetHeroCard}>
        <div style={styles.assetHeroLeft}>
          <div style={styles.assetHeroIcon}>📄</div>
          <div>
            <div style={styles.assetHeroLabel}>Scheda Cespite</div>
            <div style={styles.assetHeroCode}>{cespiteSelezionato.codicestrumento}</div>
          </div>
        </div>

      </div>

      {modificaLinkDoc && <div style={styles.linkEditBox}>
          <label style={{
              ...styles.editLabel,
              display: "block",
              marginBottom: "8px"
            }}>
            Link documentazione SharePoint del cespite
          </label>
          <input style={styles.editInput} placeholder="https://marilab.sharepoint.com/..." value={linkDocInput} onChange={e => setLinkDocInput(e.target.value)} />
          <p style={{
              ...styles.muted,
              marginTop: "8px"
            }}>
            Se lasci vuoto il campo, FMED userà SharePoint generale o i link presenti nello storico.
          </p>
          <div style={styles.linkEditActions}>
            <button style={styles.saveBtn} onClick={salvaLinkDocumentazioneCespite}>💾 Salva link</button>
            <button style={styles.cancelBtn} onClick={rimuoviLinkDocumentazioneCespite}>🧹 Rimuovi link</button>
            <button style={styles.cancelBtn} onClick={() => setModificaLinkDoc(false)}>❌ Annulla</button>
          </div>
        </div>}

      {/* Toolbar compatta scheda cespite: tutte le azioni principali in un'unica barra */}

      <div style={styles.assetActionsPanel}>
        <div style={styles.assetActionsHeaderCompact}>
          <div>
            <h3 style={styles.assetActionsTitle}>Azioni cespite</h3>
            <p style={styles.assetActionsSubtitle}>
              Gestione rapida del cespite e dello storico interventi.
            </p>
          </div>
          <div style={styles.assetActionsCode}>{cespiteSelezionato.codicestrumento}</div>
        </div>

        <div style={{
              ...styles.assetActionsGrouped,
              ...{}
            }}>
          <div style={styles.assetActionsGroupBlock}>
            <div style={styles.assetActionsGroupTitle}>Documentazione</div>
            <div style={{
                  ...styles.assetActionsGroupGrid,
                  gridTemplateColumns: "repeat(3, minmax(180px, 1fr))"
                }}>
              <button onClick={() => {
                    const link = getLinkDocumentazioneCespite(cespiteSelezionato, interventiCespite, linkManualiDocumentazione);
                    if (!link?.url) {
                      alert(link?.title || "Nessuna documentazione SharePoint disponibile per questo cespite.");
                      return;
                    }
                    window.open(link.url, "_blank");
                  }} style={{
                    ...styles.assetActionBtn,
                    ...styles.assetActionBtnEdit
                  }}>
                <span style={styles.assetActionIcon}>📂</span>
                <span>Apri cartella</span>
              </button>

              <button onClick={() => {
                    const linkAttuale = getLinkDocumentazioneCespite(cespiteSelezionato, interventiCespite, linkManualiDocumentazione);
                    setLinkDocInput(cespiteSelezionato?.link_documento || linkManualiDocumentazione[chiaveCodiceCespite(cespiteSelezionato.codicestrumento)] || (["database", "manuale"].includes(linkAttuale?.tipo) ? linkAttuale.url : ""));
                    setModificaLinkDoc(!modificaLinkDoc);
                  }} style={styles.assetActionBtn}>
                <span style={styles.assetActionIcon}>🔗</span>
                <span>Link cartella</span>
              </button>

              <button onClick={() => {
                    window.open(`${API_BASE_URL}/scheda-pdf/${encodeURIComponent(cespiteSelezionato.codicestrumento)}?t=${Date.now()}`, "_blank");
                  }} style={styles.assetActionBtn}>
                <span style={styles.assetActionIcon}>📄</span>
                <span>Scheda PDF</span>
              </button>
            </div>
          </div>

          <div style={styles.assetActionsGroupBlock}>
            <div style={styles.assetActionsGroupTitle}>Identificazione</div>
            <div style={{
                  ...styles.assetActionsGroupGrid,
                  gridTemplateColumns: "repeat(3, minmax(180px, 1fr))"
                }}>
              <button onClick={() => apriEtichettaQrCespite(cespiteSelezionato)} style={styles.assetActionBtn}>
                <span style={styles.assetActionIcon}>🔳</span>
                <span>Stampa QR</span>
              </button>

              <button onClick={() => scaricaEtichettaZplCespite(cespiteSelezionato)} style={styles.assetActionBtn}>
                <span style={styles.assetActionIcon}>🏷️</span>
                <span>Etichetta Zebra</span>
              </button>

              <button onClick={() => scaricaEtichettaDdlClabelCespite(cespiteSelezionato)} style={styles.assetActionBtn}>
                <span style={styles.assetActionIcon}>🧾</span>
                <span>Etichetta cLabel DDL</span>
              </button>
            </div>
          </div>

          <div style={styles.assetActionsGroupBlock}>
            <div style={styles.assetActionsGroupTitle}>Manutenzione</div>
            <div style={{
                  ...styles.assetActionsGroupGrid,
                  gridTemplateColumns: "repeat(3, minmax(180px, 1fr))"
                }}>
              <button style={{
                    ...styles.assetActionBtn,
                    ...styles.assetActionBtnPrimary
                  }} onClick={() => apriNuovoIntervento(cespiteSelezionato)}>
                <span style={styles.assetActionIcon}>➕</span>
                <span>Nuovo intervento</span>
              </button>

              <button style={styles.assetActionBtn} onClick={apriModificaUltimoInterventoCespite}>
                <span style={styles.assetActionIcon}>🔧</span>
                <span>Modifica intervento</span>
              </button>

              <button style={{
                    ...styles.assetActionBtn,
                    ...(storicoCespiteOpen ? styles.assetActionBtnEdit : {})
                  }} onClick={() => setStoricoCespiteOpen(!storicoCespiteOpen)}>
                <span style={styles.assetActionIcon}>{storicoCespiteOpen ? "🔼" : "📋"}</span>
                <span>{storicoCespiteOpen ? "Chiudi storico" : "Storico interventi"}</span>
              </button>
            </div>
          </div>

          <div style={styles.assetActionsGroupBlock}>
            <div style={styles.assetActionsGroupTitle}>Gestione cespite</div>
            <div style={{
                  ...styles.assetActionsGroupGrid,
                  gridTemplateColumns: "repeat(3, minmax(180px, 1fr))"
                }}>
              <button onClick={() => setModificaCespite(!modificaCespite)} style={{
                    ...styles.assetActionBtn,
                    ...styles.assetActionBtnEdit
                  }}>
                <span style={styles.assetActionIcon}>✏️</span>
                <span>{modificaCespite ? "Chiudi modifica" : "Modifica cespite"}</span>
              </button>

              <button onClick={() => copiaDatiCespiteInNuovoAsset(cespiteSelezionato)} style={styles.assetActionBtn} title="Copia i dati principali del cespite e apre un nuovo asset modificabile">
                <span style={styles.assetActionIcon}>📋</span>
                <span>Copia dati cespite</span>
              </button>

              <button onClick={eliminaCespiteSelezionato} style={{
                    ...styles.assetActionBtn,
                    ...styles.assetActionBtnDelete
                  }}>
                <span style={styles.assetActionIcon}>📦</span>
                <span>Dismetti</span>
              </button>
            </div>
          </div>
        </div>
      </div>

{modificaCespite && <div style={styles.editPanel}>
    <h3 style={styles.sectionTitle}>✏️ Modifica dati cespite</h3>

    <div style={{
              margin: "12px 0 18px 0",
              padding: 14,
              borderRadius: 14,
              border: "1px solid var(--fmed-border)",
              background: "rgba(19,60,85,0.05)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12
            }}>
      <label style={{
                ...styles.secondaryBtn,
                display: "inline-flex",
                justifyContent: "center",
                cursor: ocrTarghettaLoading ? "not-allowed" : "pointer",
                opacity: ocrTarghettaLoading ? 0.7 : 1
              }}>
        {ocrTarghettaLoading ? "⏳ Lettura sistema..." : "📷 Scansiona sistema primario"}
        <input type="file" accept="image/*" disabled={ocrTarghettaLoading} style={{
                  display: "none"
                }} onChange={e => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  scansionaTarghettaCespite(file);
                }} />
      </label>

      <label style={{
                ...styles.secondaryBtn,
                display: "inline-flex",
                justifyContent: "center",
                cursor: ocrAccessorioLoading ? "not-allowed" : "pointer",
                opacity: ocrAccessorioLoading ? 0.7 : 1
              }}>
        {ocrAccessorioLoading ? "⏳ Lettura accessorio..." : "📷 Scansiona accessorio"}
        <input type="file" accept="image/*" disabled={ocrAccessorioLoading} style={{
                  display: "none"
                }} onChange={e => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  aggiungiAccessorioDaFotoCespite(file);
                }} />
      </label>

      {(ocrTarghettaEsito || ocrAccessorioEsito) && <div style={{
                gridColumn: "1 / -1",
                fontSize: 13,
                color: "var(--fmed-muted)",
                lineHeight: 1.45
              }}>
          {ocrTarghettaEsito?.note ? <div>{ocrTarghettaEsito.status === "error" ? "⚠️" : "✅"} {ocrTarghettaEsito.note}</div> : null}
          {ocrAccessorioEsito?.note ? <div>{ocrAccessorioEsito.status === "error" ? "⚠️" : "✅"} {ocrAccessorioEsito.note}</div> : null}
        </div>}
    </div>

    <div style={{
              ...styles.editGrid,
              ...{}
            }}>
      <div style={styles.editField}>
        <label style={styles.editLabel}>Codice inventario / strumento *</label>
        <input style={{
                  ...styles.editInput,
                  borderColor: String(formCespite.codicestrumento || "").trim() !== String(cespiteSelezionato?.codicestrumento || "").trim() ? "rgba(255,176,32,0.85)" : "var(--fmed-border)"
                }} value={formCespite.codicestrumento || ""} onChange={e => setFormCespite({
                  ...formCespite,
                  codicestrumento: e.target.value
                })} placeholder="Es. A_003999 oppure 00025P" />
        {String(formCespite.codicestrumento || "").trim() !== String(cespiteSelezionato?.codicestrumento || "").trim() && <div style={{
                  marginTop: 6,
                  fontSize: 12,
                  lineHeight: 1.35,
                  color: "var(--fmed-warning)"
                }}>
            ⚠️ Attenzione: stai modificando il codice inventario del cespite. Salva solo se vuoi correggere realmente il codice storico.
          </div>}
      </div>

      <SelectField label="Tipologia" field="tipologia" options={listaTipologieFormInterventi} formCespite={formCespite} setFormCespite={setFormCespite} />

      <SelectField label="Costruttore" field="costruttore" options={listaCostruttoriFormInterventi} formCespite={formCespite} setFormCespite={setFormCespite} />

      <SelectField label="Modello" field="modello" options={listaModelliFormInterventi} formCespite={formCespite} setFormCespite={setFormCespite} />

      <div style={styles.editField}>
        <label style={styles.editLabel}>Matricola</label>
        <input style={styles.editInput} value={formCespite.matricola || ""} onChange={e => setFormCespite({
                  ...formCespite,
                  matricola: e.target.value
                })} />
      </div>

      <SelectField label="Società" field="societa" options={listaSocieta} formCespite={formCespite} setFormCespite={setFormCespite} />

      <SelectField label="Locazione" field="locazione" options={listaLocazioni} formCespite={formCespite} setFormCespite={setFormCespite} />

      <SelectField label="Categoria" field="categoria" options={listaCategorie} formCespite={formCespite} setFormCespite={setFormCespite} />

      <SelectField label="Stato asset" field="stato_asset" options={listaStatiAsset} formCespite={formCespite} setFormCespite={setFormCespite} />

      <SelectField label="Possesso" field="possesso" options={listaPossesso} formCespite={formCespite} setFormCespite={setFormCespite} />

      <div style={styles.editField}>
        <label style={styles.editLabel}>Anno</label>
        <input style={styles.editInput} value={formCespite.anno_di_fabbricazione || ""} onChange={e => setFormCespite({
                  ...formCespite,
                  anno_di_fabbricazione: e.target.value
                })} />
      </div>

      <div style={styles.editField}>
        <label style={styles.editLabel}>Marcatura CE</label>
        <input style={styles.editInput} value={formCespite.marcatura_ce || ""} onChange={e => setFormCespite({
                  ...formCespite,
                  marcatura_ce: e.target.value
                })} />
      </div>

      <div style={styles.editField}>
        <label style={styles.editLabel}>Alimentazione</label>
        <input style={styles.editInput} value={formCespite.alimentazione || ""} onChange={e => setFormCespite({
                  ...formCespite,
                  alimentazione: e.target.value
                })} />
      </div>

      <div style={styles.editField}>
        <label style={styles.editLabel}>Potenza</label>
        <input style={styles.editInput} value={formCespite.potenza || ""} onChange={e => setFormCespite({
                  ...formCespite,
                  potenza: e.target.value
                })} />
      </div>

      <div style={styles.editField}>
        <label style={styles.editLabel}>Frequenza</label>
        <input style={styles.editInput} value={formCespite.frequenza || ""} onChange={e => setFormCespite({
                  ...formCespite,
                  frequenza: e.target.value
                })} />
      </div>

      <div style={styles.editField}>
        <label style={styles.editLabel}>Lotto</label>
        <input style={styles.editInput} value={formCespite.lotto || ""} onChange={e => setFormCespite({
                  ...formCespite,
                  lotto: e.target.value
                })} />
      </div>

      <div style={styles.editField}>
        <label style={styles.editLabel}>Prezzo</label>
        <input style={styles.editInput} value={formCespite.prezzo || ""} onChange={e => setFormCespite({
                  ...formCespite,
                  prezzo: e.target.value
                })} />
      </div>

      <div style={styles.editField}>
        <label style={styles.editLabel}>Data collaudo</label>
        <input style={styles.editInput} value={formattaDataInput(formCespite.data_di_collaudo)} onChange={e => setFormCespite({
                  ...formCespite,
                  data_di_collaudo: e.target.value
                })} />
      </div>

      <div style={styles.editField}>
        <label style={styles.editLabel}>Data messa in uso</label>
        <input style={styles.editInput} value={formattaDataInput(formCespite.data_messa_in_uso)} onChange={e => setFormCespite({
                  ...formCespite,
                  data_messa_in_uso: e.target.value
                })} />
      </div>

      <SelectField label="Sede" field="sede" options={listaSediFormInterventi} formCespite={formCespite} setFormCespite={setFormCespite} />

      <SelectField label="Reparto" field="reparto" options={listaRepartiFormInterventi} formCespite={formCespite} setFormCespite={setFormCespite} />

      <SelectField label="Fornitore" field="fornitore" options={listaFornitori} formCespite={formCespite} setFormCespite={setFormCespite} />

      <div style={{
                ...styles.editField,
                gridColumn: "1 / -1"
              }}>
        <label style={styles.editLabel}>Note</label>
        <textarea style={styles.editTextarea} value={formCespite.note || ""} onChange={e => setFormCespite({
                  ...formCespite,
                  note: e.target.value
                })} />
      </div>

      <div style={{
                ...styles.editField,
                gridColumn: "1 / -1"
              }}>
        <label style={styles.editLabel}>Accessori / Sistema primario</label>
        <textarea style={styles.editTextarea} value={formCespite.accessori_sistema_primario || ""} onChange={e => setFormCespite({
                  ...formCespite,
                  accessori_sistema_primario: e.target.value
                })} />
      </div>
    </div>

    <div style={styles.editActions}>
      <button style={styles.cancelBtn} onClick={() => {
                setFormCespite(cespiteSelezionato);
                setModificaCespite(false);
              }}>
        ❌ Annulla
      </button>

      <button style={styles.saveBtn} onClick={salvaModificheCespite}>
        💾 Salva modifiche
      </button>
    </div>
  </div>}

      {storicoCespiteOpen && <div style={styles.assetHistoryCollapsible}>
          <div style={styles.assetHistoryHeaderCompact}>
            <div>
              <h3 style={styles.assetHistoryTitle}>📋 Storico interventi</h3>
              <p style={styles.assetHistorySubtitle}>
                Storico completo del cespite, filtrabile per testo, attività e ditta. Ordinamento: dal più recente al meno recente.
              </p>
            </div>
            <button style={{
                ...styles.assetActionBtn,
                minWidth: "150px"
              }} onClick={() => setStoricoCespiteOpen(false)}>
              🔼 Chiudi storico
            </button>
          </div>
            <div style={{
              ...styles.historyFilterBar,
              ...{}
            }}>
              <input style={{
                ...styles.input,
                minWidth: "260px",
                flex: 1
              }} placeholder="Cerca nello storico: attività, ditta, esito, descrizione..." value={storicoFiltroTesto} onChange={e => setStoricoFiltroTesto(e.target.value)} />
              <select style={{
                ...styles.select,
                minWidth: "220px"
              }} value={storicoFiltroAttivita} onChange={e => setStoricoFiltroAttivita(e.target.value)}>
                <option value="TUTTE">Tutte le attività</option>
                {storicoAttivitaOptions.map(opzione => <option key={opzione} value={opzione}>{opzione}</option>)}
              </select>
              <select style={{
                ...styles.select,
                minWidth: "220px"
              }} value={storicoFiltroDitta} onChange={e => setStoricoFiltroDitta(e.target.value)}>
                <option value="TUTTE">Tutte le ditte</option>
                {storicoDittaOptions.map(opzione => <option key={opzione} value={opzione}>{opzione}</option>)}
              </select>
              <button style={styles.secondaryBtn} onClick={() => {
                setStoricoFiltroTesto("");
                setStoricoFiltroAttivita("TUTTE");
                setStoricoFiltroDitta("TUTTE");
              }}>
                🧹 Reset
              </button>
            </div>

            <div style={styles.historyResultInfo}>
              Visualizzati {storicoCespiteFiltrato.length} interventi su {storicoCespiteOrdinato.length}.
            </div>

            {<div style={styles.tableWrapCompact}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Data</th>
                      <th style={styles.th}>Attività</th>
                      <th style={styles.th}>Ditta</th>
                      <th style={styles.th}>Prossimo</th>
                      <th style={styles.th}>Documento</th>
                    </tr>
                  </thead>

                  <tbody>
                    {storicoCespiteFiltrato.map((i, index) => <tr key={i.id_intervento || i.id || index} style={styles.tr}>
                        <td style={styles.td}>{formattaData(i.data_ultimo_intervento)}</td>
                        <td style={styles.td}>{i.attivita || "-"}</td>
                        <td style={styles.td}>{i.ditta_esecutrice || i.ditta || "-"}</td>
                        <td style={styles.td}>{formattaData(i.data_prossimo_intervento)}</td>
                        <td style={styles.td}>
                          <div style={styles.rowActionGroup}>
                            <BottoneJobReport intervento={i} />
                            <button type="button" style={styles.actionBtnEdit} title="Modifica questo intervento" onClick={e => {
                          e.stopPropagation();
                          apriModificaIntervento(i);
                        }}>✏️ Modifica</button>
                            <button type="button" style={styles.actionBtnDelete} title="Elimina questo intervento" onClick={e => {
                          e.stopPropagation();
                          eliminaIntervento(i);
                        }}>🗑 Elimina</button>
                          </div>
                        </td>
                      </tr>)}
                    {!storicoCespiteFiltrato.length && <tr><td style={styles.td} colSpan="5">Nessun intervento trovato con i filtri selezionati.</td></tr>}
                  </tbody>
                </table>
              </div>}
        </div>}

      {analisiCespite && <div style={{
            ...styles.assetKpiRibbon,
            ...{}
          }}>
          <div style={styles.assetKpiItem}>
            <span style={styles.assetKpiIconGreen}>🛡️</span>
            <div>
              <div style={styles.assetKpiLabel}>Criticità</div>
              <div style={{
                  ...styles.assetKpiValue,
                  color: coloreCriticita(analisiCespite.criticita).color
                }}>
                {analisiCespite.criticita || "-"}
              </div>
            </div>
          </div>
          <div style={styles.assetKpiItem}>
            <span style={styles.assetKpiIconGreen}>📊</span>
            <div>
              <div style={styles.assetKpiLabel}>Rischio</div>
              <div style={{
                  ...styles.assetKpiValue,
                  color: coloreCriticita(analisiCespite.rischio).color
                }}>
                {analisiCespite.rischio || "-"}
              </div>
            </div>
          </div>
          <div style={styles.assetKpiItem}>
            <span style={styles.assetKpiIconBlue}>⏱️</span>
            <div>
              <div style={styles.assetKpiLabel}>Punteggio</div>
              <div style={styles.assetKpiValue}>{analisiCespite.punteggio ?? "-"}/100</div>
            </div>
          </div>
          <div style={styles.assetKpiItem}>
            <span style={styles.assetKpiIconPurple}>🔧</span>
            <div>
              <div style={styles.assetKpiLabel}>Interventi</div>
              <div style={styles.assetKpiValue}>{analisiCespite.interventi ?? interventiCespite.length}</div>
            </div>
          </div>
          <div style={styles.assetKpiItem}>
            <span style={styles.assetKpiIconOrange}>📅</span>
            <div>
              <div style={styles.assetKpiLabel}>Prossimo intervento</div>
              <div style={styles.assetKpiValueSmall}>
                {getProssimoInterventoValido(interventiCespite)?.data_prossimo_intervento ? formattaData(getProssimoInterventoValido(interventiCespite)?.data_prossimo_intervento) : "-"}
              </div>
            </div>
          </div>
        </div>}

      <div style={{
            ...styles.assetMainGrid,
            ...{}
          }}>
        <div style={styles.assetPanel}>
          <h3 style={styles.sectionTitle}>Dati generali</h3>
          <div style={styles.assetInfoTable}>
            <Detail label="Tipologia" value={cespiteSelezionato.tipologia} />
            <Detail label="Costruttore" value={cespiteSelezionato.costruttore} />
            <Detail label="Modello" value={cespiteSelezionato.modello} />
            <Detail label="Matricola" value={cespiteSelezionato.matricola} />
            <Detail label="Sede" value={cespiteSelezionato.sede} />
            <Detail label="Reparto" value={cespiteSelezionato.reparto} />
            <Detail label="Categoria" value={cespiteSelezionato.categoria} />
            <Detail label="Società" value={cespiteSelezionato.societa} />
            <Detail label="Locazione" value={cespiteSelezionato.locazione} />
            <Detail label="Possesso" value={cespiteSelezionato.possesso} />
            <Detail label="Anno Fabbricazione" value={cespiteSelezionato.anno_di_fabbricazione} />
            <Detail label="Marcatura CE" value={cespiteSelezionato.marcatura_ce} />
            <Detail label="Alimentazione" value={cespiteSelezionato.alimentazione} />
            <Detail label="Potenza" value={cespiteSelezionato.potenza} />
            <Detail label="Frequenza" value={cespiteSelezionato.frequenza} />
            <Detail label="Lotto" value={cespiteSelezionato.lotto} />
            <Detail label="Data Collaudo" value={formattaData(cespiteSelezionato.data_di_collaudo)} />
            <Detail label="Note" value={cespiteSelezionato.note} fallback="Non disponibile" />
            <Detail label="Accessori / Sistema primario" value={cespiteSelezionato.accessori_sistema_primario} fallback="Non disponibile" />
          </div>

          <div style={{
                marginTop: 14,
                padding: 14,
                borderRadius: 14,
                border: "1px solid var(--fmed-border)",
                background: "rgba(19,60,85,0.06)"
              }}>
            <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap"
                }}>
              <div>
                <div style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: "var(--fmed-text)"
                    }}>
                  📷 Scansiona targhetta sistema primario
                </div>
                <div style={{
                      ...styles.mutedSmall,
                      marginTop: 4
                    }}>
                  Aggiorna solo i dati tecnici del cespite principale: costruttore, modello, matricola, anno e tipologia. Non modifica Note né Accessori.
                </div>
              </div>

              <label style={{
                    ...styles.secondaryBtn,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: ocrTarghettaLoading ? "not-allowed" : "pointer",
                    opacity: ocrTarghettaLoading ? 0.7 : 1,
                    minHeight: 42,
                    padding: "0 16px"
                  }}>
                {ocrTarghettaLoading ? "⏳ Lettura..." : "📷 Scansiona sistema primario"}
                <input type="file" accept="image/*" disabled={ocrTarghettaLoading} style={{
                      display: "none"
                    }} onChange={e => {
                      const file = e.target.files?.[0];
                      e.target.value = "";
                      scansionaTarghettaCespite(file);
                    }} />
              </label>
            </div>

            {ocrTarghettaEsito && <div style={{
                  marginTop: 12,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: ocrTarghettaEsito.status === "error" ? "rgba(217,56,30,0.10)" : "rgba(30,130,76,0.10)",
                  color: "var(--fmed-text)",
                  fontSize: 13
                }}>
                {ocrTarghettaEsito.status === "error" ? "⚠️ " : "✅ "}
                {ocrTarghettaEsito.note || "Sistema primario acquisito."}
                {ocrTarghettaEsito.confidence !== null && ocrTarghettaEsito.confidence !== undefined && <span> Confidenza: {Math.round(Number(ocrTarghettaEsito.confidence) * 100)}%</span>}
              </div>}
          </div>

          <div style={{
                marginTop: 14,
                padding: 14,
                borderRadius: 14,
                border: "1px solid var(--fmed-border)",
                background: "rgba(19,60,85,0.06)"
              }}>
            <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap"
                }}>
              <div>
                <div style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: "var(--fmed-text)"
                    }}>
                  📷 Scansiona targhetta accessorio
                </div>
                <div style={{
                      ...styles.mutedSmall,
                      marginTop: 4
                    }}>
                  Scatta una foto della targhetta di sonda, manipolo, cavo, monitor, UPS o altro accessorio. FMED lo aggiunge solo al campo Accessori / Sistema primario, senza modificare le Note.
                </div>
              </div>

              <label style={{
                    ...styles.secondaryBtn,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: ocrAccessorioLoading ? "not-allowed" : "pointer",
                    opacity: ocrAccessorioLoading ? 0.7 : 1,
                    minHeight: 42,
                    padding: "0 16px"
                  }}>
                {ocrAccessorioLoading ? "⏳ Lettura..." : "📷 Aggiungi accessorio"}
                <input type="file" accept="image/*" disabled={ocrAccessorioLoading} style={{
                      display: "none"
                    }} onChange={e => {
                      const file = e.target.files?.[0];
                      e.target.value = "";
                      aggiungiAccessorioDaFotoCespite(file);
                    }} />
              </label>
            </div>

            {ocrAccessorioEsito && <div style={{
                  marginTop: 12,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: ocrAccessorioEsito.status === "error" ? "rgba(217,56,30,0.10)" : "rgba(30,130,76,0.10)",
                  color: "var(--fmed-text)",
                  fontSize: 13
                }}>
                {ocrAccessorioEsito.status === "error" ? "⚠️ " : "✅ "}
                {ocrAccessorioEsito.note || "Accessorio acquisito. Controlla il campo Accessori / Sistema primario."}
                {ocrAccessorioEsito.confidence !== null && ocrAccessorioEsito.confidence !== undefined && <span> Confidenza: {Math.round(Number(ocrAccessorioEsito.confidence) * 100)}%</span>}
              </div>}
          </div>
        </div>

        {analisiCespite && <div style={styles.assetPanel}>
            <h3 style={styles.sectionTitle}>Analisi Predittiva</h3>
            <div style={styles.fmeaGrid}>
              <div style={styles.fmeaBox}>
                <span>Criticità</span>
                <strong style={{
                    color: coloreCriticita(analisiCespite.criticita).color,
                    fontSize: "21px"
                  }}>{analisiCespite.criticita || "-"}</strong>
              </div>
              <div style={styles.fmeaBox}>
                <span>Rischio</span>
                <strong style={{
                    color: coloreCriticita(analisiCespite.rischio).color,
                    fontSize: "21px"
                  }}>{analisiCespite.rischio || "-"}</strong>
              </div>
              <div style={styles.fmeaBox}>
                <span>Punteggio</span>
                <strong style={{
                    fontSize: "21px"
                  }}>{analisiCespite.punteggio ?? "-"}/100</strong>
              </div>
              <div style={styles.fmeaBox}>
                <span>Prossimo intervento</span>
                <strong style={{
                    fontSize: "19px"
                  }}>
                  {getProssimoInterventoValido(interventiCespite)?.data_prossimo_intervento ? formattaData(getProssimoInterventoValido(interventiCespite)?.data_prossimo_intervento) : "-"}
                </strong>
              </div>
            </div>
          </div>}
      </div>

      {analisiCespite && <div style={styles.recommendationPanel}>
          <h3 style={styles.sectionTitle}>Valutazioni predittive</h3>
          <div style={{
              ...styles.recommendationGrid,
              ...{}
            }}>
            <div style={styles.recommendationBox}>
              <div style={styles.recommendationTitle}>ℹ️ Raccomandazione</div>
              <p>{safeText(analisiCespite.raccomandazione)}</p>
            </div>
            <div style={styles.recommendationBox}>
              <div style={styles.recommendationTitle}>⚙️ Motivazione tecnica</div>
              <p>{safeText(analisiCespite.motivazione)}</p>
            </div>
            <div style={styles.recommendationBox}>
              <div style={styles.recommendationTitle}>🧮 Criterio di calcolo</div>
              <p>
                {safeText(analisiCespite.criterio_analisi || analisiCespite.criterio || "Il calcolo considera numero interventi, manutenzioni straordinarie, fermi macchina e prossime scadenze.")}
              </p>
            </div>
          </div>
        </div>}

    </div>
  </div>}

    </main>
    
  </div>;
}
function SelectField({
  label,
  field,
  options = [],
  formCespite,
  setFormCespite,
  dictionary = "",
  allowQuickAdd = true,
}) {
  return <CanonicalSelect
    label={label}
    field={field}
    dictionary={dictionary}
    value={formCespite?.[field] || ""}
    options={options}
    form={formCespite || {}}
    apiBaseUrl={API_BASE_URL}
    allowQuickAdd={allowQuickAdd}
    style={styles.editField}
    onChange={value => setFormCespite(prev => ({ ...prev, [field]: value }))}
  />;
}
function valorePulitoDizionarioBox(tipo, valore) {
  try {
    return tipo === "attivita" ? normalizzaAttivitaIntervento(valore) : pulisciValoreDizionario(valore);
  } catch {
    return String(valore || "").trim().toUpperCase();
  }
}
function safeText(value) {
  if (value === null || value === undefined || value === "") return "-";
  if (Array.isArray(value)) {
    return value.map(item => safeText(item)).join(" | ");
  }
  if (typeof value === "object") {
    return Object.entries(value).map(([key, val]) => `${key}: ${safeText(val)}`).join(" | ");
  }
  return String(value);
}
function DizionarioBox({
  titolo,
  tipo,
  valore,
  onChange,
  placeholder,
  onAdd,
  onRemove,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  editState,
  editValue,
  setEditValue,
  anteprima = []
}) {
  const [aperto, setAperto] = useState(false);
  const vociPulite = Array.isArray(anteprima) ? anteprima.filter(v => v !== null && v !== undefined && typeof v !== "object").map(v => String(v).trim()).filter(Boolean) : [];
  const vociCount = vociPulite.length;
  return <div style={{
    ...styles.dictionaryBox,
    ...(aperto ? styles.dictionaryBoxOpen : {})
  }}>
      <button type="button" style={styles.dictionaryAccordionHeader} onClick={() => setAperto(prev => !prev)}>
        <div style={styles.dictionaryAccordionLeft}>
          <div style={styles.dictionaryAccordionIcon}>☰</div>
          <div>
            <h3 style={styles.dictionaryAccordionTitle}>{titolo}</h3>
            <div style={styles.dictionaryAccordionSubtitle}>{vociCount} voci disponibili</div>
          </div>
        </div>

        <div style={styles.dictionaryAccordionRight}>
          <span style={styles.dictionaryAccordionBadge}>{aperto ? "Aperto" : "Chiuso"}</span>
          <span style={styles.dictionaryAccordionChevron}>{aperto ? "▲" : "▼"}</span>
        </div>
      </button>

      {aperto && <div style={styles.dictionaryAccordionContent}>
          <input style={styles.editInput} value={valore || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder} onKeyDown={e => {
        if (e.key === "Enter") onAdd();
      }} />

          <button style={{
        ...styles.primaryBtn,
        marginTop: "12px",
        width: "100%"
      }} onClick={onAdd}>
            ➕ Aggiungi voce
          </button>

          <div style={styles.dictionaryPreview}>
            {vociPulite.length ? vociPulite.map(item => {
          const inModifica = editState?.tipo === tipo && valorePulitoDizionarioBox(tipo, editState?.valore) === valorePulitoDizionarioBox(tipo, item);
          if (inModifica) {
            return <span key={item} style={{
              ...styles.dictionaryChip,
              ...styles.dictionaryChipEditing
            }}>
                    <input style={styles.dictionaryInlineInput} value={editValue || ""} onChange={e => setEditValue(e.target.value)} autoFocus onKeyDown={e => {
                if (e.key === "Enter") onSaveEdit(tipo, item);
                if (e.key === "Escape") onCancelEdit();
              }} />
                    <button type="button" style={styles.dictionaryChipSave} title="Salva modifica" onClick={e => {
                e.stopPropagation();
                onSaveEdit(tipo, item);
              }}>
                      ✓
                    </button>
                    <button type="button" style={styles.dictionaryChipCancel} title="Annulla modifica" onClick={e => {
                e.stopPropagation();
                onCancelEdit();
              }}>
                      ↩
                    </button>
                  </span>;
          }
          return <span key={item} style={styles.dictionaryChip}>
                  <span style={styles.dictionaryChipText}>{item}</span>
                  {onEdit && tipo ? <button type="button" style={styles.dictionaryChipEdit} title={`Modifica ${item}`} onClick={e => {
              e.stopPropagation();
              onEdit(tipo, item);
            }}>
                      ✎
                    </button> : null}
                  {onRemove && tipo ? <button type="button" style={styles.dictionaryChipRemove} title={`Rimuovi ${item}`} onClick={e => {
              e.stopPropagation();
              onRemove(tipo, item);
            }}>
                      ×
                    </button> : null}
                </span>;
        }) : <span style={styles.mutedSmall}>Nessuna voce disponibile</span>}
          </div>
        </div>}
    </div>;
}

// ========================================================
// FMED LOGIN - wrapper leggero su base approvata
// Non modifica grafica, funzioni, API, Dashboard, Asset, Interventi,
// Costi, Scadenze, Export, SharePoint, QR o logiche esistenti.
// ========================================================

const FMED_LOGIN_SESSION_KEY = "fmed_login_session";
const FMED_INACTIVITY_LIMIT_MS = 30 * 60 * 1000;
function rimuoviSessioneFmedSalvata() {
  localStorage.removeItem(FMED_LOGIN_SESSION_KEY);
  sessionStorage.removeItem(FMED_LOGIN_SESSION_KEY);
}
function leggiSessioneFmedSalvata() {
  try {
    const raw = localStorage.getItem(FMED_LOGIN_SESSION_KEY) || sessionStorage.getItem(FMED_LOGIN_SESSION_KEY);
    if (!raw) return null;
    const sessione = JSON.parse(raw);
    const ultimoMovimento = Number(sessione?.lastActivityAt || sessione?.loginTimestamp || 0);
    if (ultimoMovimento && Date.now() - ultimoMovimento > FMED_INACTIVITY_LIMIT_MS) {
      rimuoviSessioneFmedSalvata();
      return null;
    }

    // FMED FASE 9 - non accettare sessioni salvate senza token backend.
    if (!sessione?.token && !sessione?.access_token) {
      rimuoviSessioneFmedSalvata();
      return null;
    }
    return sessione;
  } catch {
    rimuoviSessioneFmedSalvata();
    return null;
  }
}
function aggiornaUltimaAttivitaSessioneFmed() {
  const raw = localStorage.getItem(FMED_LOGIN_SESSION_KEY) || sessionStorage.getItem(FMED_LOGIN_SESSION_KEY);
  if (!raw) return;
  try {
    const sessione = JSON.parse(raw);
    const aggiornata = {
      ...sessione,
      lastActivityAt: Date.now()
    };
    if (localStorage.getItem(FMED_LOGIN_SESSION_KEY)) {
      localStorage.setItem(FMED_LOGIN_SESSION_KEY, JSON.stringify(aggiornata));
    } else {
      sessionStorage.setItem(FMED_LOGIN_SESSION_KEY, JSON.stringify(aggiornata));
    }
  } catch {
    rimuoviSessioneFmedSalvata();
  }
}
function normalizzaSessioneLoginFmed(dati, usernameFallback = "") {
  const utente = dati?.utente || dati?.user || dati || {};
  const token = dati?.access_token || dati?.token || dati?.jwt || "";
  return {
    token,
    username: String(utente?.username || utente?.email || usernameFallback || "").trim(),
    email: String(utente?.email || "").trim(),
    nome: String(utente?.nome || utente?.name || utente?.username || usernameFallback || "Utente FMED").trim(),
    role: normalizzaRuoloFmed({
      role: utente?.ruolo || utente?.role || "User"
    }),
    label: permessiFmed({
      role: utente?.ruolo || utente?.role || "User"
    }).label,
    loginAt: new Date().toISOString(),
    loginTimestamp: Date.now(),
    lastActivityAt: Date.now(),
    inactivityLimitMs: FMED_INACTIVITY_LIMIT_MS,
    source: "backend"
  };
}
function AppNuovo() {
  const [sessioneFmed, setSessioneFmed] = useState(() => leggiSessioneFmedSalvata());
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrore, setLoginErrore] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [ricordaAccesso, setRicordaAccesso] = useState(false);
  const [loginDarkMode, setLoginDarkMode] = useState(() => {
    try {
      return localStorage.getItem("fmed_theme_mode") !== "light";
    } catch {
      return true;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("fmed_theme_mode", loginDarkMode ? "dark" : "light");
    } catch {
      // Il tema resta disponibile nella sessione corrente.
    }
    if (!sessioneFmed) {
      document.body.dataset.theme = loginDarkMode ? "dark" : "light";
      document.documentElement.dataset.theme = loginDarkMode ? "dark" : "light";
    }
  }, [loginDarkMode, sessioneFmed]);

  useEffect(() => {
    // FASE 10 - evita che browser/PWA mostrino vecchie schermate dopo un nuovo deploy Vercel.
    document.title = MRDB_APP_BUILD_LABEL;
    try {
      window.__MRDB_APP_VERSION__ = MRDB_APP_VERSION;
      localStorage.setItem("mrdb_app_version", MRDB_APP_VERSION);
    } catch {
      // no-op
    }
  }, []);
  const salvaSessioneFmed = useCallback(nuovaSessione => {
    rimuoviSessioneFmedSalvata();
    const sessioneConScadenza = {
      ...nuovaSessione,
      loginTimestamp: Date.now(),
      lastActivityAt: Date.now(),
      inactivityLimitMs: FMED_INACTIVITY_LIMIT_MS
    };
    if (ricordaAccesso) {
      localStorage.setItem(FMED_LOGIN_SESSION_KEY, JSON.stringify(sessioneConScadenza));
    } else {
      sessionStorage.setItem(FMED_LOGIN_SESSION_KEY, JSON.stringify(sessioneConScadenza));
    }
    setSessioneFmed(sessioneConScadenza);
  }, [ricordaAccesso]);
  const loginSubmit = useCallback(async event => {
    event.preventDefault();
    const username = String(loginUsername || "").trim();
    const password = String(loginPassword || "").trim();
    if (!username || !password) {
      setLoginErrore("Inserisci email e password.");
      return;
    }
    setLoginErrore("");
    setLoginLoading(true);
    try {
      const datiLogin = await chiamataApiAutenticataFmed("/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          email: username,
          password
        })
      });
      const nuovaSessione = normalizzaSessioneLoginFmed(datiLogin, username);

      // FMED FASE 9 - sicurezza login: la sessione è valida solo se il backend restituisce JWT.
      // Evita accessi "demo" o sessioni incomplete salvate nel browser.
      if (!nuovaSessione?.token) {
        throw new Error("Token di accesso non ricevuto dal backend");
      }
      salvaSessioneFmed(nuovaSessione);
      setLoginPassword("");
      setLoginLoading(false);
    } catch (err) {
      console.error("[FMED LOGIN] Errore login reale:", err);
      setLoginErrore("Credenziali non valide oppure backend non raggiungibile.");
      setLoginLoading(false);
    }
  }, [loginUsername, loginPassword, salvaSessioneFmed]);
  const logoutFmed = useCallback(() => {
    rimuoviSessioneFmedSalvata();
    setSessioneFmed(null);
    setLoginUsername("");
    setLoginPassword("");
    setLoginErrore("");
    setLoginLoading(false);
  }, []);
  useEffect(() => {
    if (!sessioneFmed) return undefined;
    let timerId = null;
    const logoutPerInattivita = () => {
      logoutFmed();
      setLoginErrore("Sessione scaduta per inattività. Effettua nuovamente l'accesso.");
    };
    const resetTimer = () => {
      aggiornaUltimaAttivitaSessioneFmed();
      window.clearTimeout(timerId);
      timerId = window.setTimeout(logoutPerInattivita, FMED_INACTIVITY_LIMIT_MS);
    };
    const eventi = ["mousemove", "mousedown", "keydown", "click", "scroll", "touchstart"];
    eventi.forEach(evento => window.addEventListener(evento, resetTimer, {
      passive: true
    }));
    resetTimer();
    return () => {
      window.clearTimeout(timerId);
      eventi.forEach(evento => window.removeEventListener(evento, resetTimer));
    };
  }, [sessioneFmed, logoutFmed]);
  const loginUi = loginDarkMode ? loginStyles : loginLightStyles;
  if (!sessioneFmed) {
    return <div style={loginUi.page}>
        <div style={loginUi.card}>
          <button type="button" onClick={() => setLoginDarkMode(prev => !prev)} style={loginUi.themeToggle} title={loginDarkMode ? "Passa alla Light Mode" : "Passa alla Dark Mode"}>
            <span>{loginDarkMode ? "☀️" : "🌙"}</span>
            <span>{loginDarkMode ? "Light" : "Dark"}</span>
          </button>
          <div style={loginUi.kicker}>Area tecnica</div>
          <h1 style={loginUi.title}>Sistema Gestione Manutenzioni</h1>
          <p style={loginUi.subtitle}>Accesso riservato alla gestione tecnica di asset, interventi, scadenze e infrastrutture.</p>

          <form onSubmit={loginSubmit} style={loginUi.form}>
            <label style={loginUi.label}>Email</label>
            <input value={loginUsername} onChange={e => setLoginUsername(e.target.value)} placeholder="email aziendale" autoComplete="username" style={loginUi.input} />

            <label style={loginUi.label}>Password</label>
            <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="password" autoComplete="current-password" style={loginUi.input} />

            <label style={loginUi.rememberRow}>
              <input type="checkbox" checked={ricordaAccesso} onChange={e => setRicordaAccesso(e.target.checked)} />
              <span>Ricorda accesso su questo dispositivo</span>
            </label>

            {loginErrore ? <div style={loginUi.error}>{loginErrore}</div> : null}

            <button type="submit" disabled={loginLoading} style={loginUi.button}>
              {loginLoading ? "Accesso..." : "Accedi"}
            </button>

            <div style={loginUi.versionText}>{MRDB_APP_BUILD_LABEL}</div>
          </form>
        </div>
      </div>;
  }
  return <AppNuovoCore sessioneFmed={sessioneFmed} onLogoutFmed={logoutFmed} />;
}
const Detail = memo(function Detail({
  label,
  value,
  fallback = "-"
}) {
  const valorePulito = String(value ?? "").trim();
  return <div style={styles.detailItem}>
      <div style={styles.detailLabel}>{label}</div>
      <div style={styles.detailValue}>{valorePulito || fallback}</div>
    </div>;
});

/* FMED FULLSCREEN SCADENZE / INTERVENTI - FASE 2 */

export default AppNuovo;
