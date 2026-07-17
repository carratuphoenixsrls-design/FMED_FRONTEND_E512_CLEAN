import FmedModuleIcon from "../components/FmedModuleIcon.jsx";
import { useMemo, useState } from "react";

function normalizzaTesto(value) {
  return String(value ?? "").trim();
}

function linkDocumento(record) {
  return normalizzaTesto(
    record?.link_documento ||
    record?.link_sharepoint ||
    record?.linkDocumentazione ||
    record?.link_documentazione ||
    record?.documentazione_url ||
    ""
  );
}

function descrizioneRecord(record, tipo) {
  if (tipo === "ASSET") {
    return normalizzaTesto(record?.tipologia || record?.descrizione || record?.modello || "Asset senza descrizione");
  }
  return normalizzaTesto(record?.descrizione || record?.categoria || record?.tipologia || "Infrastruttura senza descrizione");
}

function codiceRecord(record, tipo, index) {
  if (tipo === "ASSET") return normalizzaTesto(record?.codicestrumento || record?.codice || `ASSET-${index + 1}`);
  return normalizzaTesto(record?.codice || record?.id || `INF-${index + 1}`);
}

function dettaglioErrore(data, fallback) {
  if (typeof data?.detail === "string") return data.detail;
  if (data?.detail?.messaggio) return data.detail.messaggio;
  return fallback;
}

export default function SharePointPage({
  sharePointUrl,
  apiBaseUrl,
  cespiti = [],
  infrastrutture = [],
  canManage = false,
  onNavigate,
  onRefreshAssets,
}) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("TUTTI");
  const [status, setStatus] = useState("TUTTI");
  const [vecchiaRadice, setVecchiaRadice] = useState("");
  const [nuovaRadice, setNuovaRadice] = useState("");
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const [syncMessage, setSyncMessage] = useState("");

  const records = useMemo(() => {
    const assets = cespiti.map((record, index) => ({
      type: "ASSET",
      code: codiceRecord(record, "ASSET", index),
      description: descrizioneRecord(record, "ASSET"),
      site: normalizzaTesto(record?.sede || "Non specificata"),
      category: normalizzaTesto(record?.categoria || record?.branca || "Asset"),
      url: linkDocumento(record),
    }));
    const infra = infrastrutture.map((record, index) => ({
      type: "INFRASTRUTTURA",
      code: codiceRecord(record, "INFRASTRUTTURA", index),
      description: descrizioneRecord(record, "INFRASTRUTTURA"),
      site: normalizzaTesto(record?.sede || "Non specificata"),
      category: normalizzaTesto(record?.categoria || "Infrastruttura"),
      url: linkDocumento(record),
    }));
    return [...assets, ...infra];
  }, [cespiti, infrastrutture]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return records.filter((record) => {
      if (source !== "TUTTI" && record.type !== source) return false;
      if (status === "COLLEGATI" && !record.url) return false;
      if (status === "MANCANTI" && record.url) return false;
      if (!needle) return true;
      return [record.code, record.description, record.site, record.category]
        .some((value) => String(value || "").toLowerCase().includes(needle));
    });
  }, [query, records, source, status]);

  const assetsLinked = records.filter((record) => record.type === "ASSET" && record.url).length;
  const infraLinked = records.filter((record) => record.type === "INFRASTRUTTURA" && record.url).length;
  const missing = records.filter((record) => !record.url).length;

  async function eseguiSincronizzazione(apply) {
    const oldRoot = vecchiaRadice.trim();
    const newRoot = nuovaRadice.trim();
    if (!oldRoot || !newRoot) {
      setSyncMessage("Incolla sia la vecchia sia la nuova cartella radice SharePoint.");
      return;
    }
    if (apply) {
      const conferma = window.confirm(
        "Applicare la sostituzione a tutti i link asset individuati nell’anteprima?\n\n" +
        "La parte finale di ogni cartella cespite verrà mantenuta."
      );
      if (!conferma) return;
    }

    setSyncLoading(true);
    setSyncMessage("");
    try {
      const response = await fetch(`${apiBaseUrl}/sharepoint/cespiti/sincronizza-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vecchia_radice: oldRoot,
          nuova_radice: newRoot,
          apply,
          limit: 6000,
        }),
      });
      const text = await response.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }
      if (!response.ok) throw new Error(dettaglioErrore(data, text || `Errore ${response.status}`));
      setSyncResult(data);
      setSyncMessage(apply
        ? `Sincronizzazione completata: ${Number(data.aggiornati || 0)} link aggiornati.`
        : `Anteprima pronta: ${Number(data.aggiornabili || 0)} link possono essere aggiornati.`);
      if (apply && Number(data.aggiornati || 0) > 0) await onRefreshAssets?.();
    } catch (error) {
      setSyncResult(null);
      setSyncMessage(`Sincronizzazione non riuscita: ${error.message}`);
    } finally {
      setSyncLoading(false);
    }
  }

  return (
    <section className="fmed-sharepoint-page">
      <header className="fmed-module-hero fmed-sharepoint-hero">
        <div className="fmed-banner-heading">
          <FmedModuleIcon module="SharePoint" />
          <div className="fmed-banner-copy">
            <span className="fmed-module-kicker">Documentazione tecnica</span>
            <h2>SharePoint FMED</h2>
            <p>Controlla i collegamenti documentali registrati su asset e infrastrutture e apri l’archivio tecnico centralizzato.</p>
          </div>
        </div>
        <button type="button" className="fmed-btn-primary" onClick={() => window.open(sharePointUrl, "_blank", "noopener,noreferrer")}>Apri archivio SharePoint</button>
      </header>

      <div className="fmed-sharepoint-kpis">
        <article><span>Asset con link registrato</span><strong>{assetsLinked.toLocaleString("it-IT")}</strong><small>su {cespiti.length.toLocaleString("it-IT")}</small></article>
        <article><span>Infrastrutture con link registrato</span><strong>{infraLinked.toLocaleString("it-IT")}</strong><small>su {infrastrutture.length.toLocaleString("it-IT")}</small></article>
        <article className={missing ? "is-warning" : "is-ok"}><span>Link non registrati</span><strong>{missing.toLocaleString("it-IT")}</strong><small>da verificare</small></article>
      </div>

      <section className="fmed-sharepoint-controls">
        <div className="fmed-sharepoint-control-grid">
          <label>
            <span>Ricerca</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Codice, descrizione, sede o categoria…" />
          </label>
          <label>
            <span>Archivio</span>
            <select value={source} onChange={(event) => setSource(event.target.value)}>
              <option value="TUTTI">Asset e infrastrutture</option>
              <option value="ASSET">Solo asset</option>
              <option value="INFRASTRUTTURA">Solo infrastrutture</option>
            </select>
          </label>
          <label>
            <span>Stato collegamento</span>
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="TUTTI">Tutti i record</option>
              <option value="COLLEGATI">Con link SharePoint</option>
              <option value="MANCANTI">Senza link</option>
            </select>
          </label>
        </div>
        <div className="fmed-sharepoint-actions">
          <button type="button" className="fmed-btn-secondary" onClick={() => { setQuery(""); setSource("TUTTI"); setStatus("TUTTI"); }}>Azzera filtri</button>
          <button type="button" className="fmed-btn-secondary" onClick={() => onNavigate?.("Asset")}>Vai agli Asset</button>
          <button type="button" className="fmed-btn-secondary" onClick={() => onNavigate?.("Infrastrutture")}>Vai alle Infrastrutture</button>
          <button type="button" className="fmed-btn-secondary" onClick={() => onNavigate?.("Sicurezza 81/08")}>Vai a Sicurezza 81/08</button>
        </div>
      </section>

      {canManage && <section className="fmed-sharepoint-sync-panel">
        <div className="fmed-sharepoint-sync-head">
          <div>
            <span className="fmed-module-kicker">Migrazione centralizzata</span>
            <h3>Sincronizza tutti i link dopo lo spostamento delle cartelle</h3>
            <p>Incolla un link della vecchia cartella radice e il corrispondente link della nuova posizione. FMED mantiene automaticamente la sottocartella specifica di ogni cespite.</p>
          </div>
          <span className="fmed-status-pill">Solo amministratori</span>
        </div>
        <div className="fmed-sharepoint-sync-grid">
          <label>
            <span>Vecchia cartella radice</span>
            <input value={vecchiaRadice} onChange={(event) => { setVecchiaRadice(event.target.value); setSyncResult(null); setSyncMessage(""); }} placeholder="Incolla il vecchio URL SharePoint…" />
          </label>
          <label>
            <span>Nuova cartella radice</span>
            <input value={nuovaRadice} onChange={(event) => { setNuovaRadice(event.target.value); setSyncResult(null); setSyncMessage(""); }} placeholder="Incolla il nuovo URL SharePoint…" />
          </label>
        </div>
        <div className="fmed-sharepoint-sync-actions">
          <button type="button" className="fmed-btn-secondary" disabled={syncLoading} onClick={() => eseguiSincronizzazione(false)}>
            {syncLoading ? "Analisi in corso…" : "1. Anteprima modifiche"}
          </button>
          <button type="button" className="fmed-btn-primary" disabled={syncLoading || !syncResult?.aggiornabili} onClick={() => eseguiSincronizzazione(true)}>
            2. Applica a tutti i link
          </button>
        </div>
        {syncMessage && <div className={syncMessage.includes("non riuscita") ? "fmed-sharepoint-sync-message is-error" : "fmed-sharepoint-sync-message"}>{syncMessage}</div>}
        {syncResult && <>
          <div className="fmed-sharepoint-sync-summary">
            <article><span>Analizzati</span><strong>{Number(syncResult.totale_analizzati || 0).toLocaleString("it-IT")}</strong></article>
            <article><span>Aggiornabili</span><strong>{Number(syncResult.aggiornabili || 0).toLocaleString("it-IT")}</strong></article>
            <article><span>Aggiornati</span><strong>{Number(syncResult.aggiornati || 0).toLocaleString("it-IT")}</strong></article>
            <article><span>Fuori radice</span><strong>{Number(syncResult.fuori_radice || 0).toLocaleString("it-IT")}</strong></article>
          </div>
          {Array.isArray(syncResult.variazioni) && syncResult.variazioni.length > 0 && <div className="fmed-sharepoint-sync-preview">
            {syncResult.variazioni.slice(0, 8).map((item) => (
              <div key={`${item.codicestrumento}-${item.nuovo_link}`}>
                <strong>{item.codicestrumento}</strong>
                <span>{item.tipologia || item.sede || "Cespite"}</span>
                <small>{item.esito}</small>
              </div>
            ))}
            {syncResult.variazioni.length > 8 && <p>Anteprima dei primi 8 asset su {syncResult.variazioni.length.toLocaleString("it-IT")} variazioni rilevate.</p>}
          </div>}
        </>}
      </section>}

      <div className="fmed-sharepoint-table-wrap">
        <div className="fmed-sharepoint-table-head">
          <div>
            <span className="fmed-module-kicker">Controllo collegamenti</span>
            <h3>{filtered.length.toLocaleString("it-IT")} record visibili</h3>
          </div>
          <span className="fmed-status-pill">{status === "MANCANTI" ? "Da completare" : status === "COLLEGATI" ? "Collegati" : "Tutti"}</span>
        </div>
        <table className="fmed-sharepoint-table">
          <thead>
            <tr><th>Tipo</th><th>Codice</th><th>Descrizione</th><th>Sede</th><th>Categoria</th><th>Documentazione</th><th>Gestione</th></tr>
          </thead>
          <tbody>
            {filtered.slice(0, 100).map((record) => (
              <tr key={`${record.type}-${record.code}`}>
                <td><span className="fmed-source-badge">{record.type === "ASSET" ? "Asset" : "Infrastruttura"}</span></td>
                <td><strong>{record.code}</strong></td>
                <td>{record.description}</td>
                <td>{record.site}</td>
                <td>{record.category}</td>
                <td>{record.url
                  ? <button type="button" className="fmed-link-button" onClick={() => window.open(record.url, "_blank", "noopener,noreferrer")}>Apri documento</button>
                  : <span className="fmed-missing-link">Link non registrato</span>}</td>
                <td><button type="button" className="fmed-sharepoint-record-action" onClick={() => onNavigate?.(record.type === "ASSET" ? "Asset" : "Infrastrutture")}>Gestisci nel modulo</button></td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="7" className="fmed-empty-row">Nessun record corrisponde ai filtri selezionati.</td></tr>}
          </tbody>
        </table>
        {filtered.length > 100 && <p className="fmed-table-note">Sono mostrati i primi 100 risultati. Restringi la ricerca per individuare il record desiderato.</p>}
      </div>
    </section>
  );
}
