import { Component, useCallback, useEffect, useMemo, useState } from "react";
import "./Sicurezza8108Page.css";
import Sicurezza8108Controls from "./components/sicurezza8108/Sicurezza8108Controls.jsx";

const FALLBACK_SEDI = [
  { codice: "MARILAB_CENTER", label: "Marilab Center", cartella: "MARILAB CENTER" },
  { codice: "MARILAB_FIUMICINO", label: "Marilab Fiumicino", cartella: "MARILAB_FIUMICINO" },
  { codice: "MARILAB_FUTURE_LABS", label: "Marilab Future Labs", cartella: "MARILAB_FUTURE_LABS" },
  { codice: "MARILAB_GARBATELLA", label: "Marilab Garbatella", cartella: "MARILAB_GARBATELLA" },
  { codice: "MARILAB_SURGERY", label: "Marilab Surgery", cartella: "MARILAB_SURGERY" },
];

const FALLBACK_CATEGORIE = [
  { codice: "01_Documenti_Generali", label: "Documenti generali", cartella: "01_Documenti_Generali" },
  { codice: "02_DVR_e_Valutazioni_Rischio", label: "DVR e valutazioni rischio", cartella: "02_DVR_e_Valutazioni_Rischio" },
  { codice: "03_Nomine", label: "Nomine", cartella: "03_Nomine" },
  { codice: "04_Piano_Emergenza", label: "Piano di emergenza", cartella: "04_Piano_Emergenza" },
  { codice: "05_Registri_e_Verifiche", label: "Registri e verifiche", cartella: "05_Registri_e_Verifiche" },
  { codice: "06_Verbali", label: "Verbali", cartella: "06_Verbali" },
  { codice: "07_Formazione_e_Attestati", label: "Formazione e attestati", cartella: "07_Formazione_e_Attestati" },
];

function normalizzaLista(value, fallback) {
  const source = Array.isArray(value) && value.length ? value : fallback;
  return source
    .map((item) => ({
      codice: String(item?.codice || item?.id || "").trim(),
      label: String(item?.label || item?.nome || item?.codice || "").trim(),
      cartella: String(item?.cartella || item?.codice || "").trim(),
      disponibile: item?.disponibile !== false,
    }))
    .filter((item) => item.codice);
}

function normalizzaSedi(value) {
  const source = Array.isArray(value) && value.length ? value : FALLBACK_SEDI;
  return source
    .map((item) => ({
      codice: String(item?.codice || item?.id || "").trim(),
      label: String(item?.label || item?.nome || item?.codice || "").trim(),
      cartella: String(item?.cartella || item?.codice || "").trim(),
      categorie: normalizzaLista(item?.categorie, FALLBACK_CATEGORIE),
    }))
    .filter((item) => item.codice);
}

function normalizzaTesto(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDate(value) {
  if (!value) return null;
  const direct = new Date(value);
  if (!Number.isNaN(direct.getTime())) return direct;
  const match = String(value).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  const parsed = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(value) {
  const date = parseDate(value);
  if (!date) return "—";
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatSize(value) {
  const bytes = Number(value || 0);
  if (!Number.isFinite(bytes) || bytes <= 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let current = bytes;
  let idx = 0;
  while (current >= 1024 && idx < units.length - 1) {
    current /= 1024;
    idx += 1;
  }
  return `${current >= 10 || idx === 0 ? current.toFixed(0) : current.toFixed(1)} ${units[idx]}`;
}

class Sicurezza8108ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[FMED 81/08] Errore pagina:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <section className="s8108-page s8108-fatal">
          <h2>Sicurezza 81/08</h2>
          <p>La sezione ha rilevato un errore di visualizzazione, ma FMED resta operativo.</p>
          <code>{String(this.state.error?.message || this.state.error)}</code>
          <button type="button" onClick={() => this.setState({ error: null })}>Riprova</button>
        </section>
      );
    }
    return this.props.children;
  }
}

function Sicurezza8108PageInner({ apiBaseUrl }) {
  const [config, setConfig] = useState(null);
  const [documenti, setDocumenti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [sourceMessage, setSourceMessage] = useState("");
  const [search, setSearch] = useState("");
  const [sede, setSede] = useState("TUTTE");
  const [categoria, setCategoria] = useState("TUTTE");

  const sedi = useMemo(() => normalizzaSedi(config?.sedi), [config]);
  const categorie = useMemo(() => normalizzaLista(config?.categorie, FALLBACK_CATEGORIE), [config]);

  const buildOpenUrl = useCallback((siteCode = "", categoryCode = "") => {
    const params = new URLSearchParams();
    if (siteCode) params.set("sede", siteCode);
    if (categoryCode) params.set("categoria", categoryCode);
    const base = String(apiBaseUrl || "").replace(/\/$/, "");
    return `${base}/sicurezza-81-08/apri${params.toString() ? `?${params.toString()}` : ""}`;
  }, [apiBaseUrl]);

  const load = useCallback(async ({ silent = false } = {}) => {
    if (silent) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      const base = String(apiBaseUrl || "").replace(/\/$/, "");
      const [configResponse, docsResponse] = await Promise.all([
        fetch(`${base}/sicurezza-81-08/config`, { headers: { Accept: "application/json" } }),
        fetch(`${base}/sicurezza-81-08/documenti`, { headers: { Accept: "application/json" } }),
      ]);
      const [configData, docsData] = await Promise.all([
        configResponse.json().catch(() => ({})),
        docsResponse.json().catch(() => ({})),
      ]);
      if (!configResponse.ok) throw new Error(configData?.detail || "Configurazione 81/08 non disponibile");
      if (!docsResponse.ok) throw new Error(docsData?.detail || "Indice documentale 81/08 non disponibile");
      setConfig(configData || {});
      setDocumenti(Array.isArray(docsData?.documenti) ? docsData.documenti : []);
      setSourceMessage(String(docsData?.messaggio || ""));
      if (docsData?.errore) setError(String(docsData.errore));
    } catch (err) {
      console.error("[FMED 81/08] Caricamento non riuscito:", err);
      setError(String(err?.message || err || "Caricamento non riuscito"));
      setDocumenti([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    load();
  }, [load]);

  const documentiFiltrati = useMemo(() => {
    const q = normalizzaTesto(search);
    return documenti.filter((doc) => {
      const haystack = normalizzaTesto(`${doc?.nome || ""} ${doc?.sede_label || ""} ${doc?.categoria_label || ""} ${doc?.percorso_relativo || ""}`);
      return (
        (sede === "TUTTE" || doc?.sede === sede) &&
        (categoria === "TUTTE" || doc?.categoria === categoria) &&
        (!q || haystack.includes(q))
      );
    });
  }, [documenti, search, sede, categoria]);

  const eliminaDocumentoIndice = useCallback(async (doc) => {
    const id = doc?.id;
    if (!id || deletingId) return;
    const conferma = window.confirm(`Rimuovere "${doc.nome || "questo documento"}" dall'indice FMED?\n\nIl file originale su SharePoint NON verrà eliminato.`);
    if (!conferma) return;
    setDeletingId(id);
    setError("");
    try {
      const base = String(apiBaseUrl || "").replace(/\/$/, "");
      const response = await fetch(`${base}/sicurezza-81-08/documenti/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload?.detail || "Eliminazione non riuscita");
      setDocumenti((current) => current.filter((item) => String(item.id) !== String(id)));
    } catch (err) {
      setError(String(err?.message || err));
    } finally {
      setDeletingId(null);
    }
  }, [apiBaseUrl, deletingId]);

  const resetFilters = () => {
    setSearch("");
    setSede("TUTTE");
    setCategoria("TUTTE");
  };

  const selectedSite = sedi.find((item) => item.codice === sede);
  const visibleSites = sedi.filter((site) => sede === "TUTTE" || site.codice === sede);
  const documentCount = documenti.filter((doc) => !doc?.is_cartella).length;
  const folderCount = documenti.filter((doc) => doc?.is_cartella).length;
  const unclassifiedCount = documenti.filter((doc) => !doc?.sede || !doc?.categoria).length;

  return (
    <section className="s8108-page">
      <Sicurezza8108Controls
        buildOpenUrl={buildOpenUrl}
        load={load}
        refreshing={refreshing}
        search={search}
        setSearch={setSearch}
        sede={sede}
        setSede={setSede}
        categoria={categoria}
        setCategoria={setCategoria}
        sedi={sedi}
        categorie={categorie}
        resetFilters={resetFilters}
        filteredCount={documentiFiltrati.length}
      />

      <div className="s8108-notice info">
        <strong>Archivio documentale centralizzato</strong>
        <span>{sourceMessage || "Power Automate indicizza i documenti in FMED; i file originali restano su SharePoint."}</span>
      </div>
      {error && <div className="s8108-notice error"><strong>Verifica necessaria</strong><span>{error}</span></div>}

      <div className="s8108-kpi-grid s8108-kpi-grid-documental">
        <article><div className="s8108-kpi-icon">📄</div><div><span>Documenti</span><strong>{documentCount}</strong><small>file indicizzati in FMED</small></div></article>
        <article><div className="s8108-kpi-icon">📁</div><div><span>Cartelle</span><strong>{folderCount || sedi.length * categorie.length}</strong><small>struttura documentale</small></div></article>
        <article className={unclassifiedCount ? "warning" : ""}><div className="s8108-kpi-icon">?</div><div><span>Da classificare</span><strong>{unclassifiedCount}</strong><small>documenti senza sede o categoria</small></div></article>
      </div>

      <div className="s8108-panel">
        <div className="s8108-panel-head">
          <div><h2>Struttura SharePoint 81/08</h2><p>Sette categorie uniformi per ogni sede.</p></div>
          {selectedSite && <a className="s8108-btn" href={buildOpenUrl(selectedSite.codice)} target="_blank" rel="noreferrer">Apri {selectedSite.label}</a>}
        </div>
        <div className="s8108-folder-grid">
          {visibleSites.map((site) => (
            <article className="s8108-site-card" key={site.codice}>
              <div className="s8108-site-head">
                <div><strong>{site.label}</strong><small>{site.cartella}</small></div>
                <a href={buildOpenUrl(site.codice)} target="_blank" rel="noreferrer">Apri sede</a>
              </div>
              <div className="s8108-category-links">
                {(site.categorie?.length ? site.categorie : categorie)
                  .filter((cat) => categoria === "TUTTE" || cat.codice === categoria)
                  .map((cat) => cat.disponibile ? (
                    <a key={cat.codice} href={buildOpenUrl(site.codice, cat.codice)} target="_blank" rel="noreferrer">
                      <span>{cat.codice.slice(0, 2)}</span>
                      <b>{cat.label}</b>
                      <small>Apri</small>
                    </a>
                  ) : (
                    <div key={cat.codice} className="s8108-category-missing" title="Cartella non ancora presente in SharePoint">
                      <span>{cat.codice.slice(0, 2)}</span>
                      <b>{cat.label}</b>
                      <small>Da creare</small>
                    </div>
                  ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="s8108-panel s8108-list-panel">
        <div className="s8108-panel-head"><div><h2>Documenti indicizzati in FMED</h2><p>{loading ? "Lettura archivio in corso…" : `${documentiFiltrati.length} elementi visibili.`}</p></div></div>
        {loading ? <div className="s8108-empty">Caricamento documentazione…</div> : documentiFiltrati.length ? (
          <div className="s8108-doc-list">{documentiFiltrati.map((doc, index) => (
            <article className="s8108-doc-card" key={doc.id || `${doc.nome}-${index}`}>
              <div className="s8108-doc-main">
                <span className="s8108-file-type">{doc.is_cartella ? "CARTELLA" : doc.estensione || "FILE"}</span>
                <div className="s8108-doc-title"><strong title={doc.nome}>{doc.nome}</strong><small title={doc.percorso_relativo}>{doc.percorso_relativo || "Percorso non disponibile"}</small></div>
              </div>
              <dl className="s8108-doc-meta">
                <div><dt>Sede</dt><dd>{doc.sede_label || "Non classificato"}</dd></div>
                <div><dt>Categoria</dt><dd>{doc.categoria_label || "Non classificata"}</dd></div>
                <div><dt>Modificato</dt><dd>{formatDate(doc.data_modifica)}</dd></div>
                <div><dt>Dimensione</dt><dd>{doc.is_cartella ? `${doc.numero_elementi ?? "—"} elementi` : formatSize(doc.dimensione)}</dd></div>
              </dl>
              <div className="s8108-doc-actions">
                {doc.web_url ? <a className="s8108-open-link" href={doc.web_url} target="_blank" rel="noreferrer">Apri</a> : <span>—</span>}
                <button type="button" className="s8108-delete-index" onClick={() => eliminaDocumentoIndice(doc)} disabled={deletingId === doc.id}>{deletingId === doc.id ? "Rimozione…" : "Rimuovi da FMED"}</button>
              </div>
            </article>
          ))}</div>
        ) : (
          <div className="s8108-empty"><strong>Nessun documento indicizzato.</strong><span>Aggiungi o modifica un file nella cartella 81/08 oppure avvia il flusso iniziale di indicizzazione.</span></div>
        )}
      </div>
    </section>
  );
}

export default function Sicurezza8108Page(props) {
  return <Sicurezza8108ErrorBoundary><Sicurezza8108PageInner {...props} /></Sicurezza8108ErrorBoundary>;
}
