import FmedModuleIcon from "./components/FmedModuleIcon.jsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./ProcessiPage.css";
import ProcessiControls from "./components/ProcessiControls.jsx";
import ProcessEngineDialog from "./components/ProcessEngineDialog.jsx";
import CanonicalSelect from "./components/masterdata/CanonicalSelect.jsx";
import { fmedAuthHeaders, fmedFetchJson, fmedSession } from "./fmedApiClient.js";

const normalize = value => String(value || "").trim().toLocaleLowerCase("it-IT");

const STATUS_LABELS = {
  BOZZA: "Bozza", APERTO: "Aperto", ASSEGNATO: "Assegnato", IN_CORSO: "In corso",
  IN_ATTESA: "In attesa", DA_VERIFICARE: "Da verificare", COMPLETATO: "Completato",
  ANNULLATO: "Annullato", RIAPERTO: "Riaperto", ERRORE: "Errore",
};
const SLA_LABELS = {
  REGOLARE: "Regolare", IN_SCADENZA: "In scadenza", URGENTE: "Urgente", SCADUTO: "In ritardo",
  CHIUSO: "Chiuso", DA_PIANIFICARE: "Da pianificare",
};
const MODULE_LABELS = {
  ASSET: "Asset e cespiti", INFRASTRUTTURE: "Infrastrutture e impianti",
  SICUREZZA_81_08: "Sicurezza 81/08", FORMAZIONE: "Formazione",
  SORVEGLIANZA_SANITARIA: "Sorveglianza sanitaria", QUALITA: "Qualità e non conformità",
  CONTRATTI: "Contratti e servizi",
};

function safeObject(value) {
  if (!value) return {};
  if (typeof value === "object") return value;
  try { return JSON.parse(value); } catch { return {}; }
}
function formatDate(value, dateOnly = false) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("it-IT", dateOnly
    ? { day: "2-digit", month: "2-digit", year: "numeric" }
    : { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }
  ).format(date);
}
function humanizeStep(value) {
  const key = String(value || "").trim().toUpperCase();
  const labels = {
    ANAGRAFICA: "Anagrafica", CLASSIFICAZIONE: "Classificazione", DOCUMENTAZIONE: "Documentazione",
    PIANO_MANUTENTIVO: "Piano manutentivo", QR_E_CARTELLA: "QR e cartella", CONFERMA: "Conferma",
    SELEZIONE_ASSET: "Selezione asset", TIPOLOGIA: "Dati intervento", ESECUZIONE: "Esecuzione",
    ESITO: "Esito", SCADENZA: "Prossima scadenza", DOCUMENTO: "Documento", MOTIVAZIONE: "Motivazione",
    CHIUSURA_CICLI: "Chiusura cicli", APERTURA: "Apertura", ASSEGNAZIONE: "Assegnazione",
    PRESA_IN_CARICO: "Presa in carico", VERIFICA: "Verifica", CHIUSURA: "Chiusura", PIANIFICAZIONE: "Pianificazione",
    NUOVO_CICLO: "Nuovo ciclo", VERBALE: "Verbale", PRESCRIZIONI: "Prescrizioni", EVIDENZE: "Evidenze",
    VERIFICA_DOCUMENTO: "Verifica documento", RICHIESTA_RINNOVO: "Richiesta rinnovo", ACQUISIZIONE: "Acquisizione",
    VALIDAZIONE: "Validazione", DESTINATARI: "Destinatari", EROGAZIONE: "Erogazione", ATTESTATI: "Attestati",
    CONVOCAZIONE: "Convocazione", ESITO_AMMINISTRATIVO: "Esito amministrativo", ANALISI_CAUSA: "Analisi causa",
    AZIONE_CORRETTIVA: "Azione correttiva", ATTUAZIONE: "Attuazione", VERIFICA_EFFICACIA: "Verifica efficacia",
    VERIFICA_CONTRATTO: "Verifica contratto", VALUTAZIONE: "Valutazione", APPROVAZIONE: "Approvazione",
    RINNOVO: "Rinnovo", IN_ATTESA: "In attesa", RIAPERTURA: "Riapertura", ANNULLATO: "Annullato",
  };
  if (labels[key]) return labels[key];
  const text = key.replaceAll("_", " ").toLocaleLowerCase("it-IT");
  return text ? text.charAt(0).toLocaleUpperCase("it-IT") + text.slice(1) : "—";
}
function actor() {
  const session = fmedSession();
  return String(session?.email || session?.nome || "FMED_USER");
}
function processActionLabel(process) {
  const code = String(process?.codice || "").toUpperCase();
  if (code === "NUOVO_ASSET") return "Avvia nuovo asset";
  if (code === "NUOVO_INTERVENTO") return "Avvia nuovo intervento";
  if (code === "DISMISSIONE_ASSET") return "Avvia dismissione";
  return "Apri processo";
}
function isOpenState(value) {
  return !["COMPLETATO", "ANNULLATO", "ERRORE"].includes(String(value || "").toUpperCase());
}

export default function ProcessiPage({ apiBaseUrl, processes = [], onLaunchProcess, canManage = false }) {
  const [catalog, setCatalog] = useState(processes);
  const [executions, setExecutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [includeHistory, setIncludeHistory] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("TUTTI");
  const [moduleFilter, setModuleFilter] = useState("TUTTI");
  const [launching, setLaunching] = useState(null);
  const [selectedExecution, setSelectedExecution] = useState(null);
  const [detail, setDetail] = useState({ attivita: [], approvazioni: [], allegati: [], eventi: [], solleciti: [], requisiti: {} });
  const [transitionNote, setTransitionNote] = useState("");
  const [transitionBusy, setTransitionBusy] = useState(false);
  const [detailBusy, setDetailBusy] = useState(false);
  const [governanceForm, setGovernanceForm] = useState({ responsabile: "", sostituto: "", approvatore: "", scadenza: "" });
  const [attachmentForm, setAttachmentForm] = useState({ tipo: "", nome: "", url: "" });

  const loadData = useCallback(async () => {
    setLoading(true);
    setMessage("");
    try {
      const [catalogData, executionData] = await Promise.all([
        fmedFetchJson("/process-engine/catalogo", { apiBaseUrl, retries: 1 }),
        fmedFetchJson(`/process-engine/esecuzioni?limit=300&include_storico=${includeHistory ? "true" : "false"}`, { apiBaseUrl, retries: 1, timeoutMs: 60000 }),
      ]);
      setCatalog(Array.isArray(catalogData?.processi) ? catalogData.processi : processes);
      setExecutions(Array.isArray(executionData?.esecuzioni) ? executionData.esecuzioni : []);
    } catch (error) {
      setMessage(`Process Engine non disponibile: ${error?.message || error}`);
      try {
        const fallback = await fmedFetchJson("/core/processi/esecuzioni?limit=100", { apiBaseUrl, retries: 0 });
        setExecutions(Array.isArray(fallback?.esecuzioni) ? fallback.esecuzioni : []);
        setCatalog(processes);
      } catch { setExecutions([]); }
    } finally { setLoading(false); }
  }, [apiBaseUrl, processes, includeHistory]);

  useEffect(() => { loadData(); }, [loadData]);
  useEffect(() => {
    if (!selectedExecution) return;
    setGovernanceForm({
      responsabile: selectedExecution.responsabile || selectedExecution.assegnato_a || "",
      sostituto: selectedExecution.sostituto || "",
      approvatore: selectedExecution.approvatore || "",
      scadenza: String(selectedExecution.scadenza || "").slice(0, 10),
    });
  }, [selectedExecution]);

  const visibleProcesses = useMemo(() => (Array.isArray(catalog) ? catalog : []).filter(item => String(item.codice || "").toUpperCase() !== "NUOVA_SEDE"), [catalog]);
  const processByCode = useMemo(() => new Map(visibleProcesses.map(item => [String(item.codice || "").toUpperCase(), item])), [visibleProcesses]);
  const groupedProcesses = useMemo(() => {
    const groups = new Map();
    for (const item of visibleProcesses) {
      const moduleCode = String(item.modulo || "PROCESS_ENGINE").toUpperCase();
      if (!groups.has(moduleCode)) groups.set(moduleCode, []);
      groups.get(moduleCode).push(item);
    }
    return [...groups.entries()];
  }, [visibleProcesses]);
  const stats = useMemo(() => ({
    available: visibleProcesses.length,
    running: executions.filter(item => isOpenState(item.stato)).length,
    overdue: executions.filter(item => String(item?.sla?.codice || item.stato_sla || "").toUpperCase() === "SCADUTO").length,
    approvals: executions.filter(item => ["DA_RICHIEDERE", "DA_APPROVARE"].includes(String(item.approvazione_stato || "").toUpperCase())).length,
  }), [visibleProcesses, executions]);
  const lastByProcess = useMemo(() => {
    const result = new Map();
    for (const execution of executions) {
      const code = String(execution.processo || "").toUpperCase();
      if (code && !result.has(code)) result.set(code, execution);
    }
    return result;
  }, [executions]);
  const filteredExecutions = useMemo(() => {
    const query = normalize(search);
    return executions.filter(item => {
      const status = String(item.stato || "").toUpperCase();
      const moduleCode = String(item.modulo || item.riferimento_modulo || "PROCESS_ENGINE").toUpperCase();
      if (statusFilter !== "TUTTI" && status !== statusFilter) return false;
      if (moduleFilter !== "TUTTI" && moduleCode !== moduleFilter) return false;
      const config = processByCode.get(String(item.processo || "").toUpperCase());
      const payload = safeObject(item.dati);
      const haystack = normalize(`${item.titolo || ""} ${item.processo} ${config?.titolo || ""} ${item.passo_corrente || ""} ${item.avviato_da || ""} ${item.sede || ""} ${item.responsabile || ""} ${item.riferimento_id || ""} ${JSON.stringify(payload)}`);
      return !query || haystack.includes(query);
    });
  }, [executions, moduleFilter, processByCode, search, statusFilter]);

  function launchProcess(process) {
    if (!canManage) return;
    if (String(process?.modalita || "").toUpperCase() === "LEGACY") { onLaunchProcess?.(process.codice); return; }
    setLaunching(process);
  }
  async function refreshSelected(id) {
    if (!id) return;
    setDetailBusy(true);
    try {
      const data = await fmedFetchJson(`/process-engine/esecuzioni/${id}/quadro`, { apiBaseUrl, retries: 1, timeoutMs: 60000 });
      setSelectedExecution(data?.esecuzione || null);
      setDetail({
        attivita: Array.isArray(data?.attivita) ? data.attivita : [],
        approvazioni: Array.isArray(data?.approvazioni) ? data.approvazioni : [],
        allegati: Array.isArray(data?.allegati) ? data.allegati : [],
        eventi: Array.isArray(data?.eventi) ? data.eventi : [],
        solleciti: Array.isArray(data?.solleciti) ? data.solleciti : [],
        requisiti: data?.requisiti || {},
      });
      const missing = data?.requisiti?.allegati_mancanti || [];
      setAttachmentForm(previous => ({ ...previous, tipo: previous.tipo || missing[0] || "" }));
    } catch (error) { setMessage(error?.message || "Dettaglio processo non disponibile."); }
    finally { setDetailBusy(false); }
  }
  async function applyTransition(targetState) {
    if (!selectedExecution?.id || transitionBusy) return;
    setTransitionBusy(true); setMessage("");
    try {
      const data = await fmedFetchJson(`/process-engine/esecuzioni/${selectedExecution.id}/transizioni`, {
        apiBaseUrl, method: "POST", headers: fmedAuthHeaders(), retries: 1, timeoutMs: 60000,
        body: JSON.stringify({ stato: targetState, nota: transitionNote || null, dati: {}, eseguito_da: actor() }),
      });
      setTransitionNote("");
      setMessage(data?.warning || `Processo aggiornato: ${STATUS_LABELS[targetState] || targetState}.`);
      await Promise.all([loadData(), refreshSelected(selectedExecution.id)]);
    } catch (error) { setMessage(error?.message || "Aggiornamento stato non riuscito."); }
    finally { setTransitionBusy(false); }
  }
  async function updateTask(task, state) {
    if (!selectedExecution?.id || detailBusy) return;
    setDetailBusy(true); setMessage("");
    try {
      await fmedFetchJson(`/process-engine/esecuzioni/${selectedExecution.id}/attivita/${task.id}`, {
        apiBaseUrl, method: "PATCH", headers: fmedAuthHeaders(), retries: 1, timeoutMs: 60000,
        body: JSON.stringify({ stato: state, nota: transitionNote || null, aggiornato_da: actor() }),
      });
      await refreshSelected(selectedExecution.id);
      await loadData();
    } catch (error) { setMessage(error?.message || "Checklist non aggiornata."); }
    finally { setDetailBusy(false); }
  }
  async function saveGovernance() {
    if (!selectedExecution?.id || detailBusy) return;
    setDetailBusy(true); setMessage("");
    try {
      await fmedFetchJson(`/process-engine/esecuzioni/${selectedExecution.id}`, {
        apiBaseUrl, method: "PATCH", headers: fmedAuthHeaders(), retries: 1, timeoutMs: 60000,
        body: JSON.stringify({ ...governanceForm, assegnato_a: governanceForm.responsabile || null, aggiornato_da: actor() }),
      });
      setMessage("Responsabilità e scadenza aggiornate.");
      await Promise.all([loadData(), refreshSelected(selectedExecution.id)]);
    } catch (error) { setMessage(error?.message || "Dati di governo non aggiornati."); }
    finally { setDetailBusy(false); }
  }
  async function decideApproval(state) {
    if (!selectedExecution?.id || detailBusy) return;
    setDetailBusy(true); setMessage("");
    try {
      await fmedFetchJson(`/process-engine/esecuzioni/${selectedExecution.id}/approvazioni`, {
        apiBaseUrl, method: "POST", headers: fmedAuthHeaders(), retries: 1, timeoutMs: 60000,
        body: JSON.stringify({ stato: state, nota: transitionNote || `Decisione ${state.toLocaleLowerCase("it-IT")}`, approvatore: governanceForm.approvatore || actor(), eseguito_da: actor() }),
      });
      setMessage(state === "APPROVATA" ? "Processo approvato." : "Processo respinto e da correggere.");
      await Promise.all([loadData(), refreshSelected(selectedExecution.id)]);
    } catch (error) { setMessage(error?.message || "Approvazione non aggiornata."); }
    finally { setDetailBusy(false); }
  }
  async function addAttachment(event) {
    event.preventDefault();
    if (!selectedExecution?.id || detailBusy) return;
    if (!attachmentForm.tipo || !attachmentForm.nome.trim()) { setMessage("Indicare tipo e nome dell’evidenza."); return; }
    setDetailBusy(true); setMessage("");
    try {
      await fmedFetchJson(`/process-engine/esecuzioni/${selectedExecution.id}/allegati`, {
        apiBaseUrl, method: "POST", headers: fmedAuthHeaders(), retries: 1, timeoutMs: 60000,
        body: JSON.stringify({ ...attachmentForm, obbligatorio: (detail.requisiti?.allegati_obbligatori || []).includes(attachmentForm.tipo), caricato_da: actor() }),
      });
      setAttachmentForm({ tipo: "", nome: "", url: "" });
      setMessage("Evidenza registrata nel processo.");
      await refreshSelected(selectedExecution.id);
    } catch (error) { setMessage(error?.message || "Evidenza non registrata."); }
    finally { setDetailBusy(false); }
  }

  const approval = detail.approvazioni?.[0];
  const requirements = detail.requisiti || {};

  return (
    <section className="fmed-process-page">
      <header className="fmed-process-head"><div className="fmed-banner-heading"><FmedModuleIcon module="Processi" /><div className="fmed-banner-copy">
        <span className="fmed-process-kicker">FMED ENTERPRISE 1.0 · E7.2</span><h2>Process Engine completo</h2>
        <p>Workflow multi-modulo con finestra operativa dal 01/01/2023, archivio storico, checklist, SLA, evidenze, approvazioni e audit integrale.</p>
      </div></div></header>

      <aside className="fmed-process-usage" aria-label="Regole del Process Engine"><strong>Regola operativa</strong><div>
        <span><b>Responsabilità</b> responsabile, sostituto e approvatore sono sempre identificati.</span>
        <span><b>SLA</b> scadenze e ritardi sono calcolati per priorità e processo.</span>
        <span><b>Chiusura</b> checklist, evidenze e approvazioni bloccano chiusure incomplete.</span>
        <span><b>Cicli</b> il completamento resta collegato al record operativo e al Motore Cicli.</span>
      </div></aside>

      <div className="fmed-process-message" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <span>{includeHistory ? "Tutto lo storico processi è visibile." : "Vista operativa dal 01/01/2023. I processi ancora aperti restano sempre visibili."}</span>
        <button type="button" onClick={() => setIncludeHistory(value => !value)}>
          {includeHistory ? "Torna alla vista operativa" : "Apri archivio storico"}
        </button>
      </div>

      <ProcessiControls loading={loading} onRefresh={loadData} stats={stats} search={search} onSearchChange={setSearch} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} />

      <div className="fmed-process-module-filter">
        <button type="button" className={moduleFilter === "TUTTI" ? "is-active" : ""} onClick={() => setModuleFilter("TUTTI")}>Tutti i moduli</button>
        {groupedProcesses.map(([moduleCode]) => <button type="button" key={moduleCode} className={moduleFilter === moduleCode ? "is-active" : ""} onClick={() => setModuleFilter(moduleCode)}>{MODULE_LABELS[moduleCode] || moduleCode.replaceAll("_", " ")}</button>)}
      </div>

      {message && <div className="fmed-process-message">{message}</div>}

      <div className="fmed-process-groups">
        {groupedProcesses.filter(([moduleCode]) => moduleFilter === "TUTTI" || moduleFilter === moduleCode).map(([moduleCode, moduleProcesses]) => <section className="fmed-process-group" key={moduleCode}>
          <div className="fmed-process-group-head"><div><span>Modulo</span><h3>{MODULE_LABELS[moduleCode] || moduleCode.replaceAll("_", " ")}</h3></div><small>{moduleProcesses.length} processi disponibili</small></div>
          <div className="fmed-process-catalog">{moduleProcesses.map(process => {
            const code = String(process.codice || "").toUpperCase(); const last = lastByProcess.get(code);
            return <article className="fmed-process-card" key={code}>
              <div className="fmed-process-card-top"><div><span className="fmed-process-code">{code.replaceAll("_", " ")}</span><h3>{process.titolo}</h3></div>{last && <span className={`fmed-process-status is-${String(last.stato || "APERTO").toLowerCase()}`}>{STATUS_LABELS[String(last.stato || "").toUpperCase()] || last.stato}</span>}</div>
              <p>{process.descrizione}</p>
              <p className="fmed-process-use-case"><strong>Quando usarlo:</strong> per gestire questa attività con responsabilità, SLA, evidenze, approvazioni e audit senza uscire dal flusso FMED.</p>
              <div className="fmed-process-card-flags"><span>{String(process.modalita || "GENERICO").toUpperCase() === "LEGACY" ? "Procedura dedicata" : "Workflow completo"}</span>{process.governa_ciclo && <span>Collegato ai cicli</span>}{process.approvazione_obbligatoria && <span>Approvazione richiesta</span>}{process.allegati_obbligatori?.length > 0 && <span>{process.allegati_obbligatori.length} evidenze</span>}</div>
              <div className="fmed-process-steps">{(process.passi || []).map((step, index) => <span key={step}><b>{index + 1}</b>{humanizeStep(step)}</span>)}</div>
              <div className="fmed-process-card-footer"><small>{last ? `Ultimo aggiornamento: ${formatDate(last.aggiornato_il || last.created_at)}` : "Nessuna esecuzione registrata"}</small><button type="button" onClick={() => launchProcess(process)} disabled={!canManage}>{processActionLabel(process)}</button></div>
            </article>;
          })}</div>
        </section>)}
      </div>

      <section className="fmed-process-history"><div className="fmed-process-history-head"><div><h3>Registro processi</h3><p>Stato, SLA, responsabilità, approvazione e avanzamento delle esecuzioni.</p></div></div>
        <div className="fmed-process-table-wrap"><table className="fmed-process-table"><thead><tr><th>Processo</th><th>Modulo</th><th>Stato</th><th>SLA</th><th>Responsabile</th><th>Scadenza</th><th>Checklist</th><th>Approvazione</th><th /></tr></thead><tbody>
          {!loading && filteredExecutions.length === 0 && <tr><td colSpan="9" className="fmed-process-empty">Nessuna esecuzione corrispondente.</td></tr>}
          {filteredExecutions.map(item => {
            const config = processByCode.get(String(item.processo || "").toUpperCase());
            const percentage = Math.max(0, Math.min(100, Number(item.percentuale || 0)));
            const moduleCode = String(item.modulo || item.riferimento_modulo || "PROCESS_ENGINE").toUpperCase();
            const slaCode = String(item?.sla?.codice || item.stato_sla || "REGOLARE").toUpperCase();
            return <tr key={item.id || `${item.processo}-${item.aggiornato_il}`}>
              <td><strong>{item.titolo || config?.titolo || String(item.processo || "").replaceAll("_", " ")}</strong><small>{item.sede || "Sede non indicata"}{item.riferimento_id ? ` · ${item.riferimento_id}` : ""}</small>{item._archivio_storico && <small>Archivio pre-2023</small>}</td>
              <td>{MODULE_LABELS[moduleCode] || moduleCode.replaceAll("_", " ")}</td>
              <td><span className={`fmed-process-status is-${String(item.stato || "APERTO").toLowerCase()}`}>{STATUS_LABELS[String(item.stato || "").toUpperCase()] || item.stato}</span></td>
              <td><span className={`fmed-process-sla is-${slaCode.toLowerCase()}`}>{SLA_LABELS[slaCode] || slaCode}</span></td>
              <td>{item.responsabile || item.assegnato_a || "Da assegnare"}</td>
              <td>{formatDate(item.scadenza, true)}</td>
              <td><div className="fmed-process-progress"><span style={{ width: `${percentage}%` }} /></div><small>{item.checklist_completata || 0}/{item.checklist_totale || 0} · {humanizeStep(item.passo_corrente)}</small></td>
              <td>{humanizeStep(item.approvazione_stato || "NON_RICHIESTA")}</td>
              <td><button type="button" className="fmed-process-row-open" onClick={() => refreshSelected(item.id)}>Gestisci</button></td>
            </tr>;
          })}
        </tbody></table></div>
      </section>

      {launching && <ProcessEngineDialog process={launching} apiBaseUrl={apiBaseUrl} onClose={() => setLaunching(null)} onCreated={(execution, warning) => { setLaunching(null); setMessage(warning || "Processo aperto correttamente."); if (execution?.id) refreshSelected(execution.id); loadData(); }} />}

      {selectedExecution && <div className="fmed-process-detail-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget && !transitionBusy && !detailBusy) setSelectedExecution(null); }}>
        <section className="fmed-process-detail is-complete" role="dialog" aria-modal="true">
          <header><div><span>{MODULE_LABELS[String(selectedExecution.modulo || selectedExecution.riferimento_modulo || "").toUpperCase()] || "Process Engine"}</span><h3>{selectedExecution.titolo || processByCode.get(String(selectedExecution.processo || "").toUpperCase())?.titolo || selectedExecution.processo}</h3><p>{selectedExecution.sede || "Sede non indicata"}{selectedExecution.riferimento_id ? ` · ${selectedExecution.riferimento_id}` : ""}</p></div><button type="button" onClick={() => setSelectedExecution(null)}>×</button></header>

          <div className="fmed-process-detail-grid">
            <article><span>Stato</span><strong>{STATUS_LABELS[String(selectedExecution.stato || "").toUpperCase()] || selectedExecution.stato}</strong></article>
            <article><span>SLA</span><strong>{SLA_LABELS[String(selectedExecution?.sla?.codice || selectedExecution.stato_sla || "REGOLARE").toUpperCase()] || "Regolare"}</strong></article>
            <article><span>Checklist</span><strong>{requirements.checklist_completata || 0}/{requirements.checklist_totale || 0}</strong></article>
            <article><span>Approvazione</span><strong>{humanizeStep(selectedExecution.approvazione_stato || "NON_RICHIESTA")}</strong></article>
          </div>

          <section className="fmed-process-detail-section"><div className="fmed-process-detail-section-head"><div><span>Governance</span><h4>Responsabilità e tempi</h4></div><button type="button" onClick={saveGovernance} disabled={detailBusy}>Salva</button></div>
            <div className="fmed-process-governance-grid">
              <CanonicalSelect label="Responsabile" field="responsabile" dictionary="RESPONSABILI" value={governanceForm.responsabile} onChange={value => setGovernanceForm(prev => ({ ...prev, responsabile: value }))} apiBaseUrl={apiBaseUrl} form={governanceForm} allowQuickAdd />
              <CanonicalSelect label="Sostituto" field="sostituto" dictionary="RESPONSABILI" value={governanceForm.sostituto} onChange={value => setGovernanceForm(prev => ({ ...prev, sostituto: value }))} apiBaseUrl={apiBaseUrl} form={governanceForm} allowQuickAdd />
              <CanonicalSelect label="Approvatore" field="approvatore" dictionary="RESPONSABILI" value={governanceForm.approvatore} onChange={value => setGovernanceForm(prev => ({ ...prev, approvatore: value }))} apiBaseUrl={apiBaseUrl} form={governanceForm} allowQuickAdd />
              <label className="fmed-process-inline-field"><span>Scadenza</span><input type="date" value={governanceForm.scadenza} onChange={event => setGovernanceForm(prev => ({ ...prev, scadenza: event.target.value }))} /></label>
            </div>
          </section>

          <section className="fmed-process-detail-section"><div className="fmed-process-detail-section-head"><div><span>Controlli obbligatori</span><h4>Checklist del processo</h4></div><small>{requirements.checklist_completa ? "Completa" : "Da completare"}</small></div>
            <div className="fmed-process-checklist">{detail.attivita.map(task => <article key={task.id} className={String(task.stato).toUpperCase() === "COMPLETATA" ? "is-done" : ""}>
              <button type="button" aria-label="Cambia stato" onClick={() => updateTask(task, String(task.stato).toUpperCase() === "COMPLETATA" ? "PENDENTE" : "COMPLETATA")} disabled={detailBusy}>{String(task.stato).toUpperCase() === "COMPLETATA" ? "✓" : ""}</button>
              <div><strong>{task.titolo}</strong><small>{humanizeStep(task.fase)}{task.obbligatoria ? " · obbligatoria" : ""}</small></div>
            </article>)}{!detailBusy && detail.attivita.length === 0 && <p>Nessuna checklist configurata per questa procedura.</p>}</div>
          </section>

          <section className="fmed-process-detail-section"><div className="fmed-process-detail-section-head"><div><span>Evidenze</span><h4>Allegati e documenti richiesti</h4></div><small>{requirements.allegati_completi ? "Completi" : `${requirements.allegati_mancanti?.length || 0} mancanti`}</small></div>
            <div className="fmed-process-required-tags">{(requirements.allegati_obbligatori || []).map(type => <span key={type} className={(requirements.allegati_mancanti || []).includes(type) ? "is-missing" : "is-present"}>{humanizeStep(type)}</span>)}</div>
            <form className="fmed-process-attachment-form" onSubmit={addAttachment}>
              <select value={attachmentForm.tipo} onChange={event => setAttachmentForm(prev => ({ ...prev, tipo: event.target.value }))}><option value="">Tipo evidenza</option>{[...(requirements.allegati_obbligatori || []), "ALTRO_DOCUMENTO"].filter((value, index, arr) => arr.indexOf(value) === index).map(type => <option key={type} value={type}>{humanizeStep(type)}</option>)}</select>
              <input value={attachmentForm.nome} onChange={event => setAttachmentForm(prev => ({ ...prev, nome: event.target.value }))} placeholder="Nome documento" />
              <input value={attachmentForm.url} onChange={event => setAttachmentForm(prev => ({ ...prev, url: event.target.value }))} placeholder="Link SharePoint o archivio" />
              <button type="submit" disabled={detailBusy}>Registra</button>
            </form>
            <div className="fmed-process-attachment-list">{detail.allegati.map(item => <article key={item.id}><strong>{humanizeStep(item.tipo)}</strong><span>{item.nome}</span>{item.url && <a href={item.url} target="_blank" rel="noreferrer">Apri</a>}</article>)}</div>
          </section>

          {requirements.approvazione_obbligatoria && <section className="fmed-process-detail-section"><div className="fmed-process-detail-section-head"><div><span>Controllo finale</span><h4>Approvazione</h4></div><small>{humanizeStep(approval?.stato || selectedExecution.approvazione_stato)}</small></div>
            <div className="fmed-process-approval-actions"><button type="button" onClick={() => decideApproval("APPROVATA")} disabled={detailBusy}>Approva</button><button type="button" className="is-danger" onClick={() => decideApproval("RESPINTA")} disabled={detailBusy}>Respingi</button></div>
          </section>}

          <label className="fmed-process-transition-note"><span>Nota della transizione o decisione</span><textarea rows="3" value={transitionNote} onChange={event => setTransitionNote(event.target.value)} placeholder="Motivazione, esito o informazione utile per l’audit." /></label>
          <div className="fmed-process-transition-actions">{(selectedExecution.transizioni_disponibili || []).map(option => <button type="button" key={option.codice} onClick={() => applyTransition(option.codice)} disabled={transitionBusy || detailBusy}>{transitionBusy ? "Aggiornamento…" : option.etichetta}</button>)}{(selectedExecution.transizioni_disponibili || []).length === 0 && <p>Nessuna transizione disponibile per lo stato corrente.</p>}</div>

          <section className="fmed-process-detail-section is-timeline"><div className="fmed-process-detail-section-head"><div><span>Audit</span><h4>Storico del processo</h4></div><small>{detail.eventi.length} eventi</small></div><div className="fmed-process-timeline">{detail.eventi.slice().reverse().map(event => <article key={event.id}><span>{formatDate(event.creato_il)}</span><strong>{humanizeStep(event.evento)}</strong><p>{event.nota || `${humanizeStep(event.stato_da)} → ${humanizeStep(event.stato_a)}`}</p></article>)}</div></section>
        </section>
      </div>}
    </section>
  );
}
