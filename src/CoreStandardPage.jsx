import FmedModuleIcon from "./components/FmedModuleIcon.jsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./CoreStandardPage.css";
import DizionariControls from "./components/DizionariControls.jsx";
import { fmedAuthHeaders, fmedFetchJson, fmedSession } from "./fmedApiClient.js";

const emptyValue = { dizionario: "", codice: "", etichetta: "", ordine: 100, attivo: true, metadati: {} };
const emptyRelation = { tipo: "CONSENTE", sorgente_dizionario: "SEDI", sorgente_codice: "", destinazione_dizionario: "REPARTI", destinazione_codice: "", priorita: 100, obbligatoria: false, attivo: true, metadati: {} };

const apiHeaders = () => fmedAuthHeaders();
const normalizeText = (value) => String(value || "").toLocaleLowerCase("it-IT").trim();

const formatCount = (value) => new Intl.NumberFormat("it-IT").format(Number(value || 0));

function MasterDataQualityPanel({ quality, loading, busy, preview, canManage, onRefresh, onPreviewAcquire, onApplyAcquire, onPreviewNormalize, onApplyNormalize }) {
  const summary = quality?.riepilogo || {};
  const issues = Array.isArray(quality?.criticita) ? quality.criticita : [];
  const score = Number(summary.qualita_percentuale ?? 0);
  const scoreClass = score >= 90 ? "good" : score >= 70 ? "warning" : "danger";
  const previewItems = preview?.tipo === "ACQUISIZIONE" ? preview?.data?.candidati || [] : preview?.data?.piano || [];

  return <section className="core-quality-panel" aria-label="Qualità Master Data">
    <div className="core-quality-heading">
      <div>
        <span className="core-standard-kicker">CONTROLLO MASTER DATA E5</span>
        <h3>Qualità e normalizzazione dei dati</h3>
        <p>Confronta Asset, Interventi e Infrastrutture con i dizionari centrali. Nessuna modifica viene applicata senza anteprima e conferma esplicita.</p>
      </div>
      <button type="button" className="core-primary-button" onClick={onRefresh} disabled={loading || busy}>{loading ? "Analisi…" : "Aggiorna audit"}</button>
    </div>

    {loading && !quality ? <div className="core-quality-loading">Analisi dei dati operativi in corso…</div> : <>
      <div className="core-quality-summary">
        <article className={`core-quality-score ${scoreClass}`}><span>Qualità Master Data</span><strong>{score.toFixed(1)}%</strong><small>copertura {Number(summary.copertura_percentuale || 0).toFixed(1)}%</small></article>
        <article><span>Record analizzati</span><strong>{formatCount(summary.record_analizzati)}</strong><small>Asset, interventi e infrastrutture</small></article>
        <article><span>Da normalizzare</span><strong>{formatCount(summary.valori_da_normalizzare)}</strong><small>formati, codici o alias riconosciuti</small></article>
        <article className={Number(summary.valori_non_censiti || 0) ? "is-warning" : "is-ok"}><span>Non censiti</span><strong>{formatCount(summary.valori_non_censiti)}</strong><small>da acquisire nei dizionari</small></article>
        <article className={Number(summary.dizionari_mancanti || 0) ? "is-warning" : "is-ok"}><span>Dizionari mancanti</span><strong>{formatCount(summary.dizionari_mancanti)}</strong><small>creati automaticamente in acquisizione</small></article>
      </div>

      <div className="core-quality-actions">
        <div>
          <strong>1. Acquisisci valori reali</strong>
          <span>Inserisce nei dizionari i valori utilizzati nei record ma ancora non censiti. Non modifica Asset o interventi.</span>
        </div>
        <button type="button" onClick={onPreviewAcquire} disabled={busy}>Anteprima acquisizione</button>
        {canManage && preview?.tipo === "ACQUISIZIONE" && <button type="button" className="core-danger-safe-button" onClick={onApplyAcquire} disabled={busy || !previewItems.length}>Acquisisci {previewItems.length} valori</button>}
      </div>

      <div className="core-quality-actions">
        <div>
          <strong>2. Normalizza dati riconosciuti</strong>
          <span>Uniforma solo valori già riconosciuti per codice, formato o alias. I valori sconosciuti rimangono invariati.</span>
        </div>
        <button type="button" onClick={onPreviewNormalize} disabled={busy}>Anteprima normalizzazione</button>
        {canManage && preview?.tipo === "NORMALIZZAZIONE" && <button type="button" className="core-danger-safe-button" onClick={onApplyNormalize} disabled={busy || !previewItems.length}>Applica {previewItems.length} correzioni</button>}
      </div>

      {preview && <div className="core-quality-preview">
        <div className="core-section-heading"><h3>{preview.tipo === "ACQUISIZIONE" ? "Valori da acquisire" : "Correzioni sicure previste"}</h3><span>{previewItems.length}</span></div>
        <p>{preview?.data?.criterio}</p>
        <div className="core-quality-preview-list">
          {previewItems.slice(0, 100).map((item, index) => <div key={`${preview.tipo}-${index}`}>
            {preview.tipo === "ACQUISIZIONE" ? <>
              <code>{item.dizionario}</code><strong>{item.etichetta}</strong><span>{item.occorrenze} occorrenze · {item.origine}</span>
            </> : <>
              <code>{item.tabella}.{item.campo}</code><strong>{item.da} → {item.a}</strong><span>{item.chiave_campo}: {String(item.chiave_valore)}</span>
            </>}
          </div>)}
          {!previewItems.length && <div className="core-empty-state">Nessuna operazione necessaria.</div>}
        </div>
        {previewItems.length > 100 && <small>Mostrate le prime 100 operazioni su {previewItems.length}.</small>}
      </div>}

      <div className="core-quality-issues">
        <div className="core-section-heading"><h3>Criticità rilevate</h3><span>{issues.length}</span></div>
        <div className="core-quality-table-head"><span>Dizionario</span><span>Origine</span><span>Valore attuale</span><span>Esito</span><span>Occorrenze</span></div>
        <div className="core-quality-table">
          {issues.slice(0, 250).map((issue, index) => <div className={`core-quality-row status-${String(issue.stato || "").toLowerCase()}`} key={`${issue.dizionario}-${issue.tabella}-${issue.campo}-${issue.valore_attuale}-${index}`}>
            <code>{issue.dizionario}</code>
            <span>{issue.tabella}.{issue.campo}</span>
            <strong>{issue.valore_attuale}</strong>
            <span>{issue.stato === "NON_CENSITO" ? "Non censito" : `${issue.stato} → ${issue.valore_canonico || "—"}`}</span>
            <b>{formatCount(issue.occorrenze)}</b>
          </div>)}
          {!issues.length && <div className="core-empty-state">Nessuna criticità Master Data rilevata.</div>}
        </div>
      </div>
    </>}
  </section>;
}

function SiteHygienePanel({ audit, loading, busy, preview, canManage, onRefresh, onPreview, onApply }) {
  const summary = audit?.riepilogo || {};
  const variants = Array.isArray(audit?.varianti) ? audit.varianti : [];
  const plan = Array.isArray(preview?.piano) ? preview.piano : [];
  const officialSites = Array.isArray(audit?.sedi_ufficiali) ? audit.sedi_ufficiali : [];
  return <section className="core-site-hygiene-panel" aria-label="Pulizia e normalizzazione sedi">
    <div className="core-quality-heading">
      <div>
        <span className="core-standard-kicker">DATA HYGIENE E5.2.1</span>
        <h3>Pulizia controllata delle sedi</h3>
        <p>Riconduce Asset, Interventi, Infrastrutture e Sicurezza 81/08 alle sei sedi ufficiali. Conserva il valore precedente nello storico e non modifica valori sconosciuti.</p>
      </div>
      <button type="button" className="core-primary-button" onClick={onRefresh} disabled={loading || busy}>{loading ? "Analisi…" : "Aggiorna audit sedi"}</button>
    </div>

    {loading && !audit ? <div className="core-quality-loading">Ricerca di alias, indirizzi incorporati e caratteri invisibili…</div> : <>
      <div className="core-quality-summary core-site-summary">
        <article className="is-ok"><span>Sedi ufficiali</span><strong>{formatCount(summary.sedi_ufficiali || officialSites.length)}</strong><small>nomi brevi e univoci</small></article>
        <article><span>Valori analizzati</span><strong>{formatCount(summary.valori_sede_analizzati)}</strong><small>in tutti i moduli operativi</small></article>
        <article className={Number(summary.valori_da_normalizzare || 0) ? "is-warning" : "is-ok"}><span>Alias da pulire</span><strong>{formatCount(summary.valori_da_normalizzare)}</strong><small>correzioni sicure riconosciute</small></article>
        <article className={Number(summary.valori_sconosciuti || 0) ? "is-warning" : "is-ok"}><span>Sconosciuti</span><strong>{formatCount(summary.valori_sconosciuti)}</strong><small>restano invariati per controllo umano</small></article>
        <article><span>Varianti distinte</span><strong>{formatCount(summary.varianti_distinte)}</strong><small>incluse differenze invisibili</small></article>
      </div>

      <div className="core-site-catalog">
        {officialSites.map(site => <article key={site.chiave}><strong>{site.sede}</strong><span>{site.indirizzo}</span></article>)}
      </div>

      <div className="core-quality-actions">
        <div>
          <strong>Normalizzazione con storico obbligatorio</strong>
          <span>Prima mostra l'anteprima. L'applicazione è disponibile solo agli amministratori e richiede conferma esplicita.</span>
        </div>
        <button type="button" onClick={onPreview} disabled={busy}>Anteprima pulizia sedi</button>
        {canManage && preview && <button type="button" className="core-danger-safe-button" onClick={onApply} disabled={busy || !plan.length}>Applica {plan.length} correzioni</button>}
      </div>

      {preview && <div className="core-quality-preview">
        <div className="core-section-heading"><h3>Correzioni sedi previste</h3><span>{plan.length}</span></div>
        <p>{preview.criterio}</p>
        <div className="core-quality-preview-list">
          {plan.slice(0, 120).map((item, index) => <div key={`${item.tabella}-${item.chiave_valore}-${item.campo}-${index}`}>
            <code>{item.tabella}.{item.campo}</code>
            <strong>{item.da} → {item.a}</strong>
            <span>{item.chiave_campo}: {String(item.chiave_valore)}</span>
          </div>)}
          {!plan.length && <div className="core-empty-state">Nessuna sede da normalizzare.</div>}
        </div>
        {plan.length > 120 && <small>Mostrate le prime 120 correzioni su {plan.length}.</small>}
      </div>}

      <div className="core-quality-issues">
        <div className="core-section-heading"><h3>Varianti rilevate</h3><span>{variants.length}</span></div>
        <div className="core-quality-table-head"><span>Origine</span><span>Campo</span><span>Valore attuale</span><span>Esito</span><span>Occorrenze</span></div>
        <div className="core-quality-table">
          {variants.slice(0, 250).map((item, index) => <div className={`core-quality-row status-${String(item.stato || "").toLowerCase()}`} key={`${item.tabella}-${item.campo}-${item.valore_attuale}-${index}`}>
            <code>{item.tabella}</code>
            <span>{item.campo}</span>
            <strong>{item.valore_attuale}</strong>
            <span>{item.stato === "ALIAS" ? `Alias → ${item.valore_canonico}` : item.stato === "CANONICO" ? "Canonico" : "Sconosciuto: non modificato"}</span>
            <b>{formatCount(item.occorrenze)}</b>
          </div>)}
          {!variants.length && <div className="core-empty-state">Nessun valore sede rilevato.</div>}
        </div>
      </div>
    </>}
  </section>;
}


export default function CoreStandardPage({ apiBaseUrl, onDataChanged, canManage = false, initialTab = "DIZIONARI" }) {
  const [catalogo, setCatalogo] = useState([]);
  const [selected, setSelected] = useState("");
  const [draft, setDraft] = useState(emptyValue);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState(initialTab);
  const [relazioni, setRelazioni] = useState([]);
  const [relationDraft, setRelationDraft] = useState(emptyRelation);
  const [relationHistoryPreview, setRelationHistoryPreview] = useState(null);
  const [relationHistoryBusy, setRelationHistoryBusy] = useState(false);
  const [dictionarySearch, setDictionarySearch] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [nextCode, setNextCode] = useState("");
  const [editingValueId, setEditingValueId] = useState(null);
  const [editingLabel, setEditingLabel] = useState("");
  const [mergeSource, setMergeSource] = useState(null);
  const [mergeTargetId, setMergeTargetId] = useState("");
  const [quality, setQuality] = useState(null);
  const [qualityLoading, setQualityLoading] = useState(false);
  const [qualityBusy, setQualityBusy] = useState(false);
  const [qualityPreview, setQualityPreview] = useState(null);
  const [siteHygiene, setSiteHygiene] = useState(null);
  const [siteHygieneLoading, setSiteHygieneLoading] = useState(false);
  const [siteHygieneBusy, setSiteHygieneBusy] = useState(false);
  const [siteHygienePreview, setSiteHygienePreview] = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setMessage("");
    const [dictionaryResult, relationResult] = await Promise.allSettled([
      fmedFetchJson("/core/dizionari/amministrazione", { apiBaseUrl, retries: 3, timeoutMs: 60000 }),
      fmedFetchJson("/core/relazioni?solo_attive=false", { apiBaseUrl, retries: 3, timeoutMs: 60000 }),
    ]);
    const warnings = [];
    if (dictionaryResult.status === "fulfilled") {
      const dictionaries = Array.isArray(dictionaryResult.value?.dizionari) ? dictionaryResult.value.dizionari : [];
      setCatalogo(dictionaries);
      setSelected(prev => prev || dictionaries[0]?.codice || "");
    } else {
      warnings.push(`Dizionari: ${dictionaryResult.reason?.message || "backend non raggiungibile"}`);
    }
    if (relationResult.status === "fulfilled") {
      setRelazioni(Array.isArray(relationResult.value?.relazioni) ? relationResult.value.relazioni : []);
    } else {
      warnings.push(`Relazioni: ${relationResult.reason?.message || "backend non raggiungibile"}`);
    }
    if (warnings.length) {
      setMessage(`Sincronizzazione parziale. ${warnings.join(" · ")}. FMED riprova automaticamente anche dopo il riavvio di Render.`);
    }
    setLoading(false);
  }, [apiBaseUrl]);

  useEffect(() => { load(); }, [load]);

  const loadQuality = useCallback(async (force = true) => {
    setQualityLoading(true);
    try {
      const data = await fmedFetchJson(`/master-data/audit?limit=6000&force=${force ? "true" : "false"}`, { apiBaseUrl, retries: 2, timeoutMs: 60000 });
      setQuality(data);
    } catch (error) {
      setMessage(`Audit Master Data: ${error.message}`);
    } finally {
      setQualityLoading(false);
    }
  }, [apiBaseUrl]);

  const loadSiteHygiene = useCallback(async (force = true) => {
    setSiteHygieneLoading(true);
    try {
      const data = await fmedFetchJson(`/data-hygiene/sedi/audit?limit=10000&force=${force ? "true" : "false"}`, { apiBaseUrl, retries: 2, timeoutMs: 90000 });
      setSiteHygiene(data);
    } catch (error) {
      setMessage(`Data Hygiene sedi: ${error.message}`);
    } finally {
      setSiteHygieneLoading(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    if (tab !== "QUALITA") return;
    if (!quality && !qualityLoading) loadQuality(false);
    if (!siteHygiene && !siteHygieneLoading) loadSiteHygiene(false);
  }, [tab, quality, qualityLoading, loadQuality, siteHygiene, siteHygieneLoading, loadSiteHygiene]);

  async function masterAction(endpoint, payload, type) {
    setQualityBusy(true); setMessage("");
    try {
      const data = await fmedFetchJson(endpoint, { apiBaseUrl, method: "POST", headers: apiHeaders(), body: JSON.stringify(payload), retries: 1, timeoutMs: 120000 });
      if (!payload.apply) {
        setQualityPreview({ tipo: type, data });
        setMessage(type === "ACQUISIZIONE" ? `Anteprima pronta: ${data.totale_candidati || 0} valori acquisibili.` : `Anteprima pronta: ${data.totale_modifiche || 0} correzioni sicure.`);
      } else {
        setQualityPreview(null);
        await Promise.all([load(), loadQuality(true)]);
        await onDataChanged?.({ tipo: `MASTER_DATA_${type}`, risultato: data });
        setMessage(type === "ACQUISIZIONE" ? `Master Data aggiornato: ${data.totale_creati || 0} nuovi valori acquisiti.` : `Normalizzazione completata: ${data.campi_aggiornati || 0} campi aggiornati.`);
      }
      return data;
    } catch (error) {
      setMessage(error.message || "Operazione Master Data non riuscita");
      return null;
    } finally {
      setQualityBusy(false);
    }
  }

  const previewAcquire = () => masterAction("/master-data/acquisisci-valori", { apply: false, limit: 6000, max_modifiche: 3000 }, "ACQUISIZIONE");
  const previewNormalize = () => masterAction("/master-data/normalizza", { apply: false, limit: 6000, max_modifiche: 3000 }, "NORMALIZZAZIONE");
  const applyAcquire = () => {
    const count = qualityPreview?.data?.totale_candidati || 0;
    if (!window.confirm(`Confermi l'acquisizione di ${count} valori reali nei dizionari FMED? I record operativi non verranno modificati.`)) return;
    return masterAction("/master-data/acquisisci-valori", { apply: true, conferma: "ACQUISISCI_E5_MASTER_DATA", limit: 6000, max_modifiche: 3000 }, "ACQUISIZIONE");
  };
  const applyNormalize = () => {
    const count = qualityPreview?.data?.totale_modifiche || 0;
    if (!window.confirm(`Confermi ${count} correzioni Master Data già riconosciute? I valori non censiti resteranno invariati.`)) return;
    return masterAction("/master-data/normalizza", { apply: true, conferma: "APPLICA_E5_MASTER_DATA", limit: 6000, max_modifiche: 3000 }, "NORMALIZZAZIONE");
  };

  async function siteHygieneAction(apply = false) {
    setSiteHygieneBusy(true); setMessage("");
    try {
      let actor = "FMED_ADMIN";
      try {
        const raw = localStorage.getItem("fmed_login_session") || sessionStorage.getItem("fmed_login_session");
        const session = raw ? JSON.parse(raw) : null;
        actor = String(session?.email || session?.nome || actor);
      } catch { actor = "FMED_ADMIN"; }
      const data = await fmedFetchJson("/data-hygiene/sedi/normalizza", {
        apiBaseUrl,
        method: "POST",
        headers: apiHeaders(),
        body: JSON.stringify({
          apply,
          conferma: apply ? "APPLICA_E5_2_1_DATA_HYGIENE" : null,
          limit: 10000,
          max_modifiche: 10000,
          eseguito_da: actor,
        }),
        retries: apply ? 0 : 1,
        timeoutMs: 180000,
      });
      if (!apply) {
        setSiteHygienePreview(data);
        setMessage(`Anteprima sedi pronta: ${data.totale_modifiche || 0} correzioni sicure.`);
      } else {
        setSiteHygienePreview(null);
        await Promise.all([load(), loadQuality(true), loadSiteHygiene(true)]);
        await onDataChanged?.({ tipo: "DATA_HYGIENE_SEDI_E5_2_1", risultato: data });
        setMessage(`Pulizia sedi completata: ${data.campi_aggiornati || 0} campi aggiornati; ${data.errori?.length || 0} errori.`);
      }
      return data;
    } catch (error) {
      setMessage(error.message || "Pulizia sedi non riuscita");
      return null;
    } finally {
      setSiteHygieneBusy(false);
    }
  }

  const previewSiteHygiene = () => siteHygieneAction(false);
  const applySiteHygiene = () => {
    const count = Number(siteHygienePreview?.totale_modifiche || 0);
    if (!window.confirm(`Confermi la normalizzazione di ${count} campi sede? Il valore precedente verrà conservato nello storico e nessun record sarà eliminato.`)) return;
    return siteHygieneAction(true);
  };

  const loadNextCode = useCallback(async (dictionaryCode) => {
    const code = String(dictionaryCode || "").trim();
    if (!code || !canManage) {
      setNextCode("");
      return "";
    }
    try {
      const data = await fmedFetchJson(`/core/dizionari/prossimo-codice/${encodeURIComponent(code)}`, { apiBaseUrl, retries: 2 });
      const generated = String(data?.prossimo_codice || "");
      setNextCode(generated);
      return generated;
    } catch {
      setNextCode("Generato al salvataggio");
      return "";
    }
  }, [apiBaseUrl, canManage]);

  useEffect(() => {
    if (tab === "DIZIONARI") loadNextCode(selected);
  }, [selected, tab, loadNextCode]);

  const current = useMemo(() => catalogo.find(x => x.codice === selected) || catalogo[0], [catalogo, selected]);
  const totalValues = useMemo(() => catalogo.reduce((sum, item) => sum + (item.valori?.length || 0), 0), [catalogo]);
  const activeValues = useMemo(() => catalogo.reduce((sum, item) => sum + (item.valori || []).filter(v => v.attivo !== false).length, 0), [catalogo]);
  const pendingValues = useMemo(() => catalogo.reduce((sum, item) => sum + (item.valori || []).filter(v => String(v.stato_governance || "").toUpperCase() === "RICHIESTA_APPROVAZIONE").length, 0), [catalogo]);
  const filteredCatalog = useMemo(() => {
    const q = normalizeText(dictionarySearch);
    if (!q) return catalogo;
    return catalogo.filter(d => normalizeText(`${d.descrizione} ${d.codice}`).includes(q));
  }, [catalogo, dictionarySearch]);
  const filteredValues = useMemo(() => {
    const q = normalizeText(valueSearch);
    return (current?.valori || []).filter(v => {
      const pending = String(v.stato_governance || "").toUpperCase() === "RICHIESTA_APPROVAZIONE";
      return (showInactive || v.attivo !== false || pending) && (!q || normalizeText(`${v.codice} ${v.etichetta} ${v.stato_governance || ""}`).includes(q));
    });
  }, [current, valueSearch, showInactive]);
  const filteredRelations = useMemo(() => {
    const q = normalizeText(valueSearch);
    return relazioni.filter(r => (showInactive || r.attivo !== false) && (!q || normalizeText(`${r.tipo} ${r.sorgente_dizionario} ${r.sorgente_codice} ${r.destinazione_dizionario} ${r.destinazione_codice}`).includes(q)));
  }, [relazioni, valueSearch, showInactive]);

  async function saveValue() {
    const dictionaryCode = current?.codice || selected || draft.dizionario;
    if (!dictionaryCode || !draft.etichetta.trim()) return setMessage("Dizionario ed etichetta sono obbligatori.");
    setSaving(true); setMessage("");
    try {
      const payload = {
        ...draft,
        dizionario: dictionaryCode,
        codice: null,
        etichetta: draft.etichetta.trim(),
      };
      const data = await fmedFetchJson("/core/dizionari/valori", { apiBaseUrl, method: "POST", headers: apiHeaders(), body: JSON.stringify(payload), retries: 1 });
      const savedCode = data?.codice || nextCode || "codice automatico";
      setDraft({ ...emptyValue, dizionario: dictionaryCode });
      await load();
      await loadNextCode(dictionaryCode);
      await onDataChanged?.({ tipo: "DIZIONARIO_VALORE", dizionario: dictionaryCode, codice: savedCode, etichetta: payload.etichetta });
      setMessage(`Valore salvato con codice stabile ${savedCode} e sincronizzato con i menu operativi FMED.`);
    } catch (error) { setMessage(typeof error.message === "string" ? error.message : "Salvataggio non riuscito"); }
    finally { setSaving(false); }
  }

  async function toggleValue(value) {
    if (!canManage) return;
    setSaving(true);
    try {
      const pending = String(value.stato_governance || "").toUpperCase() === "RICHIESTA_APPROVAZIONE";
      const session = fmedSession();
      const actor = String(session?.email || session?.nome || "FMED_ADMIN");
      const patch = pending || value.attivo === false
        ? { attivo: true, stato_governance: "APPROVATO", approvato_da: actor }
        : { attivo: false };
      await fmedFetchJson(`/core/dizionari/valori/${value.id}`, { apiBaseUrl, method: "PATCH", headers: apiHeaders(), body: JSON.stringify(patch), retries: 1 });
      await load();
      await onDataChanged?.({ tipo: pending ? "DIZIONARIO_APPROVATO" : "DIZIONARIO_STATO", dizionario: value.dizionario, codice: value.codice });
      setMessage(pending ? `Voce ${value.etichetta} approvata e resa disponibile nei menu.` : "Stato della voce aggiornato.");
    } catch (error) { setMessage(error.message); }
    finally { setSaving(false); }
  }

  function startMerge(value) {
    setMergeSource(value);
    setMergeTargetId("");
    setMessage("");
  }

  async function applyMerge() {
    if (!canManage || !mergeSource?.id || !mergeTargetId) return;
    const target = (current?.valori || []).find((item) => String(item.id) === String(mergeTargetId));
    if (!target) return setMessage("Seleziona la voce canonica di destinazione.");
    if (!window.confirm(`Confermi l'unificazione di “${mergeSource.etichetta}” dentro “${target.etichetta}”? Il valore precedente resterà nello storico come alias e non verrà eliminato.`)) return;
    setSaving(true);
    try {
      const session = fmedSession();
      const actor = String(session?.email || session?.nome || "FMED_ADMIN");
      const data = await fmedFetchJson("/core/dizionari/valori/unifica", {
        apiBaseUrl, method: "POST", headers: apiHeaders(), retries: 1,
        body: JSON.stringify({
          dizionario: current?.codice || mergeSource.dizionario,
          valore_canonico_id: Number(mergeTargetId),
          valori_alias_id: [Number(mergeSource.id)],
          utente: actor,
        }),
      });
      setMergeSource(null);
      setMergeTargetId("");
      await load();
      await onDataChanged?.({ tipo: "CATALOGO_UNIFICATO", risultato: data });
      setMessage(`Voce unificata: ${mergeSource.etichetta} è ora alias di ${target.etichetta}.`);
    } catch (error) { setMessage(error.message || "Unificazione non riuscita"); }
    finally { setSaving(false); }
  }

  function startEditValue(value) {
    setEditingValueId(value.id);
    setEditingLabel(String(value.etichetta || ""));
    setMessage("");
  }

  function cancelEditValue() {
    setEditingValueId(null);
    setEditingLabel("");
  }

  async function saveValueLabel(value) {
    const label = editingLabel.trim();
    if (!label) return setMessage("L'etichetta non può essere vuota.");
    setSaving(true); setMessage("");
    try {
      await fmedFetchJson(`/core/dizionari/valori/${value.id}`, {
        apiBaseUrl,
        method: "PATCH",
        headers: apiHeaders(),
        body: JSON.stringify({ etichetta: label }),
        retries: 1,
      });
      cancelEditValue();
      await load();
      await onDataChanged?.({ tipo: "DIZIONARIO_ETICHETTA", dizionario: value.dizionario, codice: value.codice, etichetta: label });
      setMessage(`Etichetta aggiornata. Il codice stabile ${value.codice} non è stato modificato.`);
    } catch (error) { setMessage(error.message); }
    finally { setSaving(false); }
  }

  async function historicalRelationsAction(apply = false) {
    setRelationHistoryBusy(true);
    setMessage("");
    try {
      const session = fmedSession();
      const actor = String(session?.email || session?.nome || "FMED_ADMIN");
      const data = await fmedFetchJson("/core/relazioni/acquisisci-storico", {
        apiBaseUrl, method: "POST", headers: apiHeaders(), retries: apply ? 0 : 1, timeoutMs: 120000,
        body: JSON.stringify({
          apply,
          conferma: apply ? "ACQUISISCI_RELAZIONI_E5_2_2" : null,
          limite: 10000,
          utente: actor,
        }),
      });
      if (!apply) {
        setRelationHistoryPreview(data);
        setMessage(`Anteprima pronta: ${data.totale_da_creare || 0} relazioni storiche trasformabili in automatismi.`);
      } else {
        setRelationHistoryPreview(null);
        await load();
        await onDataChanged?.({ tipo: "RELAZIONI_STORICHE_E5_2_2", risultato: data });
        setMessage(`Relazioni storiche acquisite: ${data.totale_create || 0}. Errori: ${data.errori?.length || 0}.`);
      }
    } catch (error) {
      setMessage(error.message || "Acquisizione relazioni storiche non riuscita");
    } finally {
      setRelationHistoryBusy(false);
    }
  }

  function applyHistoricalRelations() {
    const count = Number(relationHistoryPreview?.totale_da_creare || 0);
    if (!count) return;
    if (!window.confirm(`Confermi la creazione di ${count} relazioni dedotte dal passato? Nessun record operativo verrà modificato.`)) return;
    historicalRelationsAction(true);
  }

  async function saveRelation() {
    const d = relationDraft;
    if (!d.tipo || !d.sorgente_dizionario || !d.sorgente_codice || !d.destinazione_dizionario || !d.destinazione_codice) return setMessage("Completa tutti i campi della relazione.");
    setSaving(true); setMessage("");
    try {
      await fmedFetchJson("/core/relazioni", { apiBaseUrl, method: "POST", headers: apiHeaders(), body: JSON.stringify(d), retries: 1 });
      setRelationDraft({ ...emptyRelation, sorgente_dizionario: d.sorgente_dizionario, destinazione_dizionario: d.destinazione_dizionario });
      await load();
      await onDataChanged?.({ tipo: "RELAZIONE", relazione: d });
      setMessage("Relazione salvata e sincronizzata con i moduli FMED.");
    } catch (error) { setMessage(error.message); }
    finally { setSaving(false); }
  }

  async function toggleRelation(value) {
    if (!canManage) return;
    setSaving(true);
    try {
      await fmedFetchJson(`/core/relazioni/${value.id}`, { apiBaseUrl, method: "PATCH", headers: apiHeaders(), body: JSON.stringify({ attivo: !value.attivo }), retries: 1 });
      await load();
      await onDataChanged?.({ tipo: "RELAZIONE_STATO", relazione: value });
    } catch (error) { setMessage(error.message); }
    finally { setSaving(false); }
  }

  const valuesOf = (code) => catalogo.find(x => x.codice === code)?.valori || [];

  return (
    <section className="core-standard-page">
      <header className="core-standard-head">
        <div className="fmed-banner-heading">
          <FmedModuleIcon module="Dizionari" />
          <div className="fmed-banner-copy">
            <span className="core-standard-kicker">CATALOGO CANONICO GLOBALE E5.2.2</span>
            <h2>Dizionari FMED</h2>
            <p>Aggiungi e modifica i valori utilizzati nei menu a tendina di Asset, Interventi, Infrastrutture, Sicurezza 81/08 e degli altri moduli. Le modifiche restano centralizzate e sincronizzate.</p>
          </div>
        </div>
        <button type="button" className="core-primary-button core-sync-button" onClick={load} disabled={loading} title="Ricarica dizionari e relazioni dal Master Data centrale">
          <span className="core-sync-icon" aria-hidden="true">↻</span>
          <span className="core-sync-copy"><strong>{loading ? "Sincronizzazione…" : "Sincronizza dati"}</strong><small>Ricarica valori e relazioni</small></span>
        </button>
      </header>

      <div className="core-summary-grid">
        <article><span>Dizionari</span><strong>{catalogo.length}</strong><small>fonti dati centrali</small></article>
        <article><span>Valori attivi</span><strong>{activeValues}</strong><small>su {totalValues} complessivi</small></article>
        <article className={pendingValues ? "is-warning" : "is-ok"}><span>Da approvare</span><strong>{pendingValues}</strong><small>richieste Quick Add</small></article>
        <article><span>Relazioni</span><strong>{relazioni.filter(r => r.attivo !== false).length}</strong><small>automatismi configurati</small></article>
      </div>

      {message && <div className="core-standard-message" role="status">{message}</div>}

      <DizionariControls
        tab={tab}
        onTabChange={(nextTab) => { setTab(nextTab); setValueSearch(""); setQualityPreview(null); }}
        dictionarySearch={dictionarySearch}
        onDictionarySearchChange={setDictionarySearch}
        valueSearch={valueSearch}
        onValueSearchChange={setValueSearch}
        showInactive={showInactive}
        onShowInactiveChange={setShowInactive}
      />

      {tab === "DIZIONARI" && <div className="core-dictionary-layout">
        <aside className="core-dictionary-list">
          <div className="core-section-heading"><h3>Dizionari</h3><span>{filteredCatalog.length}</span></div>
          <div className="core-dictionary-scroll">
            {filteredCatalog.map(d => <button type="button" title={`Apri il dizionario ${d.descrizione}`} key={d.codice} className={selected === d.codice ? "active" : ""} onClick={() => { setSelected(d.codice); setValueSearch(""); setDraft({ ...emptyValue, dizionario: d.codice }); cancelEditValue(); }}>
              <strong>{d.descrizione}</strong><span>{(d.valori || []).filter(v => v.attivo !== false).length} attivi · {d.valori?.length || 0} totali</span>
            </button>)}
          </div>
        </aside>

        <div className="core-dictionary-panel">
          <div className="core-dictionary-title"><div><h3>{current?.descrizione || "Dizionario"}</h3><p>Codice tecnico stabile, etichetta leggibile e stato controllato.</p></div><span>{current?.codice}</span></div>
          <div className="core-table-head"><span>Codice</span><span>Etichetta</span><span>Stato</span><span>Azioni</span></div>
          <div className="core-value-table">
            {filteredValues.length ? filteredValues.map(v => <div className={`core-value-row ${v.attivo ? "" : "disabled"}`} key={v.id || `${v.dizionario}-${v.codice}`}>
              <code>{v.codice}</code>
              {editingValueId === v.id ? (
                <input className="core-inline-label-input" value={editingLabel} onChange={(event) => setEditingLabel(event.target.value)} autoFocus />
              ) : <strong>{v.etichetta}</strong>}
              {(() => {
                const governance = String(v.stato_governance || (v.attivo ? "APPROVATO" : "DISATTIVATO")).toUpperCase();
                const statusLabel = governance === "RICHIESTA_APPROVAZIONE" ? "Da approvare" : governance === "SOSTITUITO" ? "Alias storico" : v.attivo ? "Attivo" : "Disattivato";
                const statusClass = governance === "RICHIESTA_APPROVAZIONE" ? "pending" : governance === "SOSTITUITO" ? "replaced" : v.attivo ? "active" : "inactive";
                return <span className={`core-status ${statusClass}`}>{statusLabel}</span>;
              })()}
              {canManage ? <div className="core-value-actions">
                {editingValueId === v.id ? <>
                  <button type="button" onClick={() => saveValueLabel(v)} disabled={saving}>Salva nome</button>
                  <button type="button" className="secondary" onClick={cancelEditValue}>Annulla</button>
                </> : <>
                  <button type="button" onClick={() => startEditValue(v)}>Modifica nome</button>
                  {String(v.stato_governance || "").toUpperCase() !== "SOSTITUITO" && <button type="button" className="secondary" onClick={() => startMerge(v)}>Unifica</button>}
                  <button type="button" className="secondary" onClick={() => toggleValue(v)}>{String(v.stato_governance || "").toUpperCase() === "RICHIESTA_APPROVAZIONE" ? "Approva" : v.attivo ? "Disattiva" : "Riattiva"}</button>
                </>}
              </div> : <span>—</span>}
            </div>) : <div className="core-empty-state">Nessun valore corrispondente ai filtri.</div>}
          </div>

          {canManage && mergeSource && <div className="core-merge-value">
            <div><h4>Unifica duplicato nel valore canonico</h4><p><b>{mergeSource.etichetta}</b> resterà nello storico e diventerà un alias della voce scelta.</p></div>
            <select value={mergeTargetId} onChange={(event) => setMergeTargetId(event.target.value)}>
              <option value="">Seleziona la voce canonica</option>
              {(current?.valori || []).filter((item) => item.attivo !== false && String(item.id) !== String(mergeSource.id)).map((item) => <option key={item.id} value={item.id}>{item.etichetta} · {item.codice}</option>)}
            </select>
            <button type="button" disabled={saving || !mergeTargetId} onClick={applyMerge}>Conferma unificazione</button>
            <button type="button" className="secondary" onClick={() => { setMergeSource(null); setMergeTargetId(""); }}>Annulla</button>
          </div>}

          {canManage && <div className="core-add-value"><h4>Aggiungi valore standard</h4>
            <div className="core-auto-code-preview" title="Il codice viene assegnato dal backend e resta stabile anche se l'etichetta viene modificata">
              <span>Codice automatico</span>
              <code>{nextCode || "Calcolo…"}</code>
            </div>
            <input placeholder="Etichetta mostrata nei menu" value={draft.etichetta} onChange={e => setDraft({ ...draft, dizionario: current?.codice || selected, etichetta: e.target.value })} />
            <input aria-label="Ordine" type="number" min="0" value={draft.ordine} onChange={e => setDraft({ ...draft, dizionario: current?.codice || selected, ordine: Number(e.target.value) })} />
            <button type="button" disabled={saving || !draft.etichetta.trim()} onClick={saveValue}>{saving ? "Salvataggio…" : "Crea valore standard"}</button>
            <p className="core-auto-code-note">FMED assegna un codice univoco progressivo. Il codice non cambia quando modifichi l’etichetta.</p>
          </div>}
        </div>
      </div>}

      {tab === "RELAZIONI" && <div className="core-relations-panel">
        <div className="core-dictionary-title"><div><h3>Relazioni intelligenti</h3><p>Configura i collegamenti che guidano automaticamente i moduli FMED.</p></div><span>{filteredRelations.length} relazioni</span></div>
        {canManage && <div className="core-historical-relations">
          <div><strong>Passato → futuro</strong><span>Rileva combinazioni già usate tra sedi, reparti, modelli, attività e item infrastrutturali e le trasforma in proposte guidate.</span></div>
          <button type="button" onClick={() => historicalRelationsAction(false)} disabled={relationHistoryBusy}>{relationHistoryBusy ? "Analisi…" : "Anteprima relazioni storiche"}</button>
          {relationHistoryPreview && <button type="button" className="core-danger-safe-button" onClick={applyHistoricalRelations} disabled={relationHistoryBusy || !relationHistoryPreview.totale_da_creare}>Acquisisci {relationHistoryPreview.totale_da_creare || 0}</button>}
        </div>}
        {relationHistoryPreview && <div className="core-relation-preview">
          <div className="core-section-heading"><h3>Relazioni storiche acquisibili</h3><span>{relationHistoryPreview.totale_da_creare || 0}</span></div>
          <p>{relationHistoryPreview.criterio}</p>
          {(relationHistoryPreview.piano || []).slice(0, 120).map((item, index) => <div key={`${item.sorgente_dizionario}-${item.sorgente_codice}-${item.destinazione_dizionario}-${item.destinazione_codice}-${index}`}><code>{item.sorgente_dizionario}:{item.sorgente_codice}</code><span>→</span><code>{item.destinazione_dizionario}:{item.destinazione_codice}</code></div>)}
          {(relationHistoryPreview.piano || []).length > 120 && <small>Mostrate le prime 120 relazioni su {relationHistoryPreview.piano.length}.</small>}
        </div>}
        <div className="core-relations-table">
          {filteredRelations.length ? filteredRelations.map(r => <div className={`core-relation-row ${r.attivo ? "" : "disabled"}`} key={r.id}>
            <span className="relation-type">{r.tipo}</span><strong>{r.sorgente_dizionario}: {r.sorgente_codice}</strong><span className="relation-arrow">→</span><strong>{r.destinazione_dizionario}: {r.destinazione_codice}</strong><span>{r.obbligatoria ? "Obbligatoria" : "Opzionale"}</span>
            {canManage && <button type="button" onClick={() => toggleRelation(r)}>{r.attivo ? "Disattiva" : "Riattiva"}</button>}
          </div>) : <div className="core-empty-state">Nessuna relazione corrispondente ai filtri.</div>}
        </div>
        {canManage && <div className="core-add-relation"><h4>Aggiungi relazione</h4>
          <select value={relationDraft.tipo} onChange={e => setRelationDraft({ ...relationDraft, tipo: e.target.value })}><option value="CONSENTE">Consente</option><option value="PROPONE">Propone</option><option value="RICHIEDE">Richiede</option><option value="APPARTIENE_A">Appartiene a</option></select>
          <select value={relationDraft.sorgente_dizionario} onChange={e => setRelationDraft({ ...relationDraft, sorgente_dizionario: e.target.value, sorgente_codice: "" })}>{catalogo.map(d => <option key={d.codice} value={d.codice}>{d.descrizione}</option>)}</select>
          <select value={relationDraft.sorgente_codice} onChange={e => setRelationDraft({ ...relationDraft, sorgente_codice: e.target.value })}><option value="">Valore sorgente</option>{valuesOf(relationDraft.sorgente_dizionario).map(v => <option key={v.codice} value={v.codice}>{v.etichetta}</option>)}</select>
          <select value={relationDraft.destinazione_dizionario} onChange={e => setRelationDraft({ ...relationDraft, destinazione_dizionario: e.target.value, destinazione_codice: "" })}>{catalogo.map(d => <option key={d.codice} value={d.codice}>{d.descrizione}</option>)}</select>
          <select value={relationDraft.destinazione_codice} onChange={e => setRelationDraft({ ...relationDraft, destinazione_codice: e.target.value })}><option value="">Valore destinazione</option>{valuesOf(relationDraft.destinazione_dizionario).map(v => <option key={v.codice} value={v.codice}>{v.etichetta}</option>)}</select>
          <label><input type="checkbox" checked={relationDraft.obbligatoria} onChange={e => setRelationDraft({ ...relationDraft, obbligatoria: e.target.checked })} /> Obbligatoria</label>
          <button type="button" disabled={saving} onClick={saveRelation}>{saving ? "Salvataggio…" : "Salva relazione"}</button>
        </div>}
      </div>}

      {tab === "QUALITA" && <div className="core-quality-stack">
        <SiteHygienePanel
          audit={siteHygiene}
          loading={siteHygieneLoading}
          busy={siteHygieneBusy}
          preview={siteHygienePreview}
          canManage={canManage}
          onRefresh={() => loadSiteHygiene(true)}
          onPreview={previewSiteHygiene}
          onApply={applySiteHygiene}
        />
        <MasterDataQualityPanel
          quality={quality}
          loading={qualityLoading}
          busy={qualityBusy}
          preview={qualityPreview}
          canManage={canManage}
          onRefresh={() => loadQuality(true)}
          onPreviewAcquire={previewAcquire}
          onApplyAcquire={applyAcquire}
          onPreviewNormalize={previewNormalize}
          onApplyNormalize={applyNormalize}
        />
      </div>}
    </section>
  );
}
