import FmedModuleIcon from "./components/FmedModuleIcon.jsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./ProcessiPage.css";
import ProcessiControls from "./components/ProcessiControls.jsx";
import ProcessEngineDialog from "./components/ProcessEngineDialog.jsx";
import { fmedAuthHeaders, fmedFetchJson, fmedSession } from "./fmedApiClient.js";

const normalize = value => String(value || "").trim().toLocaleLowerCase("it-IT");

const STATUS_LABELS = {
  BOZZA: "Bozza",
  APERTO: "Aperto",
  ASSEGNATO: "Assegnato",
  IN_CORSO: "In corso",
  IN_ATTESA: "In attesa",
  DA_VERIFICARE: "Da verificare",
  COMPLETATO: "Completato",
  ANNULLATO: "Annullato",
  RIAPERTO: "Riaperto",
  ERRORE: "Errore",
};

const MODULE_LABELS = {
  ASSET: "Asset e cespiti",
  INFRASTRUTTURE: "Infrastrutture e impianti",
  SICUREZZA_81_08: "Sicurezza 81/08",
  FORMAZIONE: "Formazione",
  SORVEGLIANZA_SANITARIA: "Sorveglianza sanitaria",
  QUALITA: "Qualità e non conformità",
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
    ANNULLATO_DALL_UTENTE: "Annullato dall’utente",
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
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("TUTTI");
  const [moduleFilter, setModuleFilter] = useState("TUTTI");
  const [launching, setLaunching] = useState(null);
  const [selectedExecution, setSelectedExecution] = useState(null);
  const [transitionNote, setTransitionNote] = useState("");
  const [transitionBusy, setTransitionBusy] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setMessage("");
    try {
      const [catalogData, executionData] = await Promise.all([
        fmedFetchJson("/process-engine/catalogo", { apiBaseUrl, retries: 1 }),
        fmedFetchJson("/process-engine/esecuzioni?limit=200", { apiBaseUrl, retries: 1, timeoutMs: 60000 }),
      ]);
      setCatalog(Array.isArray(catalogData?.processi) ? catalogData.processi : processes);
      setExecutions(Array.isArray(executionData?.esecuzioni) ? executionData.esecuzioni : []);
    } catch (error) {
      setMessage(`Process Engine non disponibile: ${error?.message || error}`);
      try {
        const fallback = await fmedFetchJson("/core/processi/esecuzioni?limit=100", { apiBaseUrl, retries: 0 });
        setExecutions(Array.isArray(fallback?.esecuzioni) ? fallback.esecuzioni : []);
        setCatalog(processes);
      } catch {
        setExecutions([]);
      }
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl, processes]);

  useEffect(() => { loadData(); }, [loadData]);

  const visibleProcesses = useMemo(
    () => (Array.isArray(catalog) ? catalog : []).filter(item => String(item.codice || "").toUpperCase() !== "NUOVA_SEDE"),
    [catalog],
  );
  const processByCode = useMemo(
    () => new Map(visibleProcesses.map(item => [String(item.codice || "").toUpperCase(), item])),
    [visibleProcesses],
  );
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
    completed: executions.filter(item => String(item.stato || "").toUpperCase() === "COMPLETATO").length,
    errors: executions.filter(item => ["ERRORE", "DA_VERIFICARE"].includes(String(item.stato || "").toUpperCase())).length,
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
    if (String(process?.modalita || "").toUpperCase() === "LEGACY") {
      onLaunchProcess?.(process.codice);
      return;
    }
    setLaunching(process);
  }

  async function refreshSelected(id) {
    if (!id) return;
    try {
      const data = await fmedFetchJson(`/process-engine/esecuzioni/${id}`, { apiBaseUrl, retries: 1 });
      setSelectedExecution(data?.esecuzione || null);
    } catch (error) {
      setMessage(error?.message || "Dettaglio processo non disponibile.");
    }
  }

  async function applyTransition(targetState) {
    if (!selectedExecution?.id || transitionBusy) return;
    setTransitionBusy(true);
    setMessage("");
    try {
      const data = await fmedFetchJson(`/process-engine/esecuzioni/${selectedExecution.id}/transizioni`, {
        apiBaseUrl,
        method: "POST",
        headers: fmedAuthHeaders(),
        retries: 1,
        timeoutMs: 60000,
        body: JSON.stringify({
          stato: targetState,
          nota: transitionNote || null,
          dati: {},
          eseguito_da: actor(),
        }),
      });
      setSelectedExecution(data?.esecuzione || null);
      setTransitionNote("");
      setMessage(data?.warning || `Processo aggiornato: ${STATUS_LABELS[targetState] || targetState}.`);
      await loadData();
    } catch (error) {
      setMessage(error?.message || "Aggiornamento stato non riuscito.");
    } finally {
      setTransitionBusy(false);
    }
  }

  return (
    <section className="fmed-process-page">
      <header className="fmed-process-head">
        <div className="fmed-banner-heading">
          <FmedModuleIcon module="Processi" />
          <div className="fmed-banner-copy">
            <span className="fmed-process-kicker">FMED ENTERPRISE 1.0 · E6.1</span>
            <h2>Process Engine unificato</h2>
            <p>Un unico registro operativo per cespiti, infrastrutture, Sicurezza 81/08, formazione, sorveglianza sanitaria, contratti e non conformità. Ogni passaggio resta tracciato e collegato al dato operativo.</p>
          </div>
        </div>
      </header>

      <aside className="fmed-process-usage" aria-label="Regole del Process Engine">
        <strong>Regola operativa</strong>
        <div>
          <span><b>Apertura</b> tipo, sede, elemento, attività e priorità sono strutturati.</span>
          <span><b>Gestione</b> assegnazione, lavorazione, attesa, verifica e chiusura.</span>
          <span><b>Cicli</b> la chiusura resta collegata al record operativo che genera la nuova scadenza.</span>
          <span><b>Audit</b> ogni transizione registra utente, data, stato e motivazione.</span>
        </div>
      </aside>

      <ProcessiControls
        loading={loading}
        onRefresh={loadData}
        stats={stats}
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <div className="fmed-process-module-filter">
        <button type="button" className={moduleFilter === "TUTTI" ? "is-active" : ""} onClick={() => setModuleFilter("TUTTI")}>Tutti i moduli</button>
        {groupedProcesses.map(([moduleCode]) => (
          <button type="button" key={moduleCode} className={moduleFilter === moduleCode ? "is-active" : ""} onClick={() => setModuleFilter(moduleCode)}>
            {MODULE_LABELS[moduleCode] || moduleCode.replaceAll("_", " ")}
          </button>
        ))}
      </div>

      {message && <div className="fmed-process-message">{message}</div>}

      <div className="fmed-process-groups">
        {groupedProcesses.filter(([moduleCode]) => moduleFilter === "TUTTI" || moduleFilter === moduleCode).map(([moduleCode, moduleProcesses]) => (
          <section className="fmed-process-group" key={moduleCode}>
            <div className="fmed-process-group-head">
              <div><span>Modulo</span><h3>{MODULE_LABELS[moduleCode] || moduleCode.replaceAll("_", " ")}</h3></div>
              <small>{moduleProcesses.length} processi disponibili</small>
            </div>
            <div className="fmed-process-catalog">
              {moduleProcesses.map(process => {
                const code = String(process.codice || "").toUpperCase();
                const last = lastByProcess.get(code);
                return (
                  <article className="fmed-process-card" key={code}>
                    <div className="fmed-process-card-top">
                      <div><span className="fmed-process-code">{code.replaceAll("_", " ")}</span><h3>{process.titolo}</h3></div>
                      {last && <span className={`fmed-process-status is-${String(last.stato || "APERTO").toLowerCase()}`}>{STATUS_LABELS[String(last.stato || "").toUpperCase()] || last.stato}</span>}
                    </div>
                    <p>{process.descrizione}</p>
                    <p className="fmed-process-use-case"><strong>Quando usarlo:</strong> quando devi gestire questa attività con assegnazione, avanzamento, verifica e audit senza uscire dal flusso FMED.</p>
                    <div className="fmed-process-card-flags">
                      <span>{String(process.modalita || "GENERICO").toUpperCase() === "LEGACY" ? "Procedura dedicata" : "Workflow unificato"}</span>
                      {process.governa_ciclo && <span>Collegato ai cicli</span>}
                    </div>
                    <div className="fmed-process-steps">
                      {(process.passi || []).map((step, index) => <span key={step}><b>{index + 1}</b>{humanizeStep(step)}</span>)}
                    </div>
                    <div className="fmed-process-card-footer">
                      <small>{last ? `Ultimo aggiornamento: ${formatDate(last.aggiornato_il || last.created_at)}` : "Nessuna esecuzione registrata"}</small>
                      <button type="button" onClick={() => launchProcess(process)} disabled={!canManage}>{processActionLabel(process)}</button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="fmed-process-history">
        <div className="fmed-process-history-head"><div><h3>Registro processi</h3><p>Stato, scadenza, responsabile, riferimento e avanzamento delle esecuzioni.</p></div></div>
        <div className="fmed-process-table-wrap">
          <table className="fmed-process-table">
            <thead><tr><th>Processo</th><th>Modulo</th><th>Stato</th><th>Responsabile</th><th>Scadenza</th><th>Avanzamento</th><th>Aggiornato</th><th /></tr></thead>
            <tbody>
              {!loading && filteredExecutions.length === 0 && <tr><td colSpan="8" className="fmed-process-empty">Nessuna esecuzione corrispondente.</td></tr>}
              {filteredExecutions.map(item => {
                const config = processByCode.get(String(item.processo || "").toUpperCase());
                const percentage = Math.max(0, Math.min(100, Number(item.percentuale || 0)));
                const moduleCode = String(item.modulo || item.riferimento_modulo || "PROCESS_ENGINE").toUpperCase();
                return <tr key={item.id || `${item.processo}-${item.aggiornato_il}`}>
                  <td><strong>{item.titolo || config?.titolo || String(item.processo || "").replaceAll("_", " ")}</strong><small>{item.sede || "Sede non indicata"}{item.riferimento_id ? ` · ${item.riferimento_id}` : ""}</small></td>
                  <td>{MODULE_LABELS[moduleCode] || moduleCode.replaceAll("_", " ")}</td>
                  <td><span className={`fmed-process-status is-${String(item.stato || "APERTO").toLowerCase()}`}>{STATUS_LABELS[String(item.stato || "").toUpperCase()] || item.stato}</span></td>
                  <td>{item.responsabile || item.assegnato_a || "Da assegnare"}</td>
                  <td>{formatDate(item.scadenza, true)}</td>
                  <td><div className="fmed-process-progress"><span style={{ width: `${percentage}%` }} /></div><small>{percentage}% · {humanizeStep(item.passo_corrente)}</small></td>
                  <td>{formatDate(item.aggiornato_il || item.created_at)}</td>
                  <td><button type="button" className="fmed-process-row-open" onClick={() => refreshSelected(item.id)}>Gestisci</button></td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </section>

      {launching && <ProcessEngineDialog process={launching} apiBaseUrl={apiBaseUrl} onClose={() => setLaunching(null)} onCreated={(execution, warning) => {
        setLaunching(null);
        setMessage(warning || "Processo aperto correttamente.");
        setSelectedExecution(execution || null);
        loadData();
      }} />}

      {selectedExecution && <div className="fmed-process-detail-backdrop" role="presentation" onMouseDown={event => {
        if (event.target === event.currentTarget && !transitionBusy) setSelectedExecution(null);
      }}>
        <section className="fmed-process-detail" role="dialog" aria-modal="true">
          <header><div><span>{MODULE_LABELS[String(selectedExecution.modulo || selectedExecution.riferimento_modulo || "").toUpperCase()] || "Process Engine"}</span><h3>{selectedExecution.titolo || processByCode.get(String(selectedExecution.processo || "").toUpperCase())?.titolo || selectedExecution.processo}</h3><p>{selectedExecution.sede || "Sede non indicata"}{selectedExecution.riferimento_id ? ` · ${selectedExecution.riferimento_id}` : ""}</p></div><button type="button" onClick={() => setSelectedExecution(null)}>×</button></header>
          <div className="fmed-process-detail-grid">
            <article><span>Stato</span><strong>{STATUS_LABELS[String(selectedExecution.stato || "").toUpperCase()] || selectedExecution.stato}</strong></article>
            <article><span>Passaggio</span><strong>{humanizeStep(selectedExecution.passo_corrente)}</strong></article>
            <article><span>Responsabile</span><strong>{selectedExecution.responsabile || selectedExecution.assegnato_a || "Da assegnare"}</strong></article>
            <article><span>Scadenza</span><strong>{formatDate(selectedExecution.scadenza, true)}</strong></article>
          </div>
          <label className="fmed-process-transition-note"><span>Nota della transizione</span><textarea rows="3" value={transitionNote} onChange={event => setTransitionNote(event.target.value)} placeholder="Motivazione, esito o informazione utile per l'audit." /></label>
          <div className="fmed-process-transition-actions">
            {(selectedExecution.transizioni_disponibili || []).map(option => <button type="button" key={option.codice} onClick={() => applyTransition(option.codice)} disabled={transitionBusy}>{transitionBusy ? "Aggiornamento…" : option.etichetta}</button>)}
            {(selectedExecution.transizioni_disponibili || []).length === 0 && <p>Nessuna transizione disponibile per lo stato corrente.</p>}
          </div>
        </section>
      </div>}
    </section>
  );
}
