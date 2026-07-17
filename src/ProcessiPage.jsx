import FmedModuleIcon from "./components/FmedModuleIcon.jsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./ProcessiPage.css";
import ProcessiControls from "./components/ProcessiControls.jsx";

const normalize = (value) => String(value || "").trim().toLocaleLowerCase("it-IT");

function safeObject(value) {
  if (!value) return {};
  if (typeof value === "object") return value;
  try { return JSON.parse(value); } catch { return {}; }
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
  }).format(date);
}

function processStatusLabel(status) {
  const key = String(status || "").toUpperCase();
  if (key === "COMPLETATO") return "Completato";
  if (key === "ANNULLATO") return "Annullato";
  if (key === "ERRORE") return "Errore";
  return "In corso";
}


function humanizeStep(value) {
  const key = String(value || "").trim().toUpperCase();
  const labels = {
    ANAGRAFICA: "Anagrafica",
    CLASSIFICAZIONE: "Classificazione",
    DOCUMENTAZIONE: "Documentazione",
    PIANO_MANUTENTIVO: "Piano manutentivo",
    QR_E_CARTELLA: "QR e cartella",
    CONFERMA: "Conferma",
    SELEZIONE_ASSET: "Selezione asset",
    TIPOLOGIA: "Dati intervento",
    ESECUZIONE: "Esecuzione",
    ESITO: "Esito",
    SCADENZA: "Prossima scadenza",
    DOCUMENTO: "Documento",
    MOTIVAZIONE: "Motivazione",
    CHIUSURA_CICLI: "Chiusura cicli",
    ANNULLATO_DALL_UTENTE: "Annullato dall’utente",
  };
  if (labels[key]) return labels[key];
  const text = key.replaceAll("_", " ").toLocaleLowerCase("it-IT");
  return text ? text.charAt(0).toLocaleUpperCase("it-IT") + text.slice(1) : "—";
}

function processUseCase(code) {
  const key = String(code || "").toUpperCase();
  if (key === "NUOVO_ASSET") return "Quando devi censire una nuova apparecchiatura e creare anagrafica, documentazione e piano manutentivo.";
  if (key === "NUOVO_INTERVENTO") return "Quando vuoi avviare un intervento guidato partendo dalla ricerca del cespite corretto.";
  if (key === "DISMISSIONE_ASSET") return "Quando un cespite deve essere chiuso mantenendo storico, documenti e cicli collegati.";
  return "Quando l’operazione coinvolge più passaggi e più moduli FMED.";
}
function processActionLabel(code) {
  const key = String(code || "").toUpperCase();
  if (key === "NUOVO_ASSET") return "Avvia nuovo asset";
  if (key === "NUOVO_INTERVENTO") return "Avvia nuovo intervento";
  if (key === "DISMISSIONE_ASSET") return "Avvia dismissione";
  return "Avvia processo";
}

export default function ProcessiPage({ apiBaseUrl, processes = [], onLaunchProcess, canManage = false }) {
  const [executions, setExecutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("TUTTI");

  const loadExecutions = useCallback(async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${apiBaseUrl}/core/processi/esecuzioni?limit=100`);
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data?.status === "ko") throw new Error(data?.detail || data?.errore || "Caricamento non riuscito");
      setExecutions(Array.isArray(data?.esecuzioni) ? data.esecuzioni : []);
    } catch (error) {
      setMessage(`Storico processi non disponibile: ${error.message}`);
      setExecutions([]);
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => { loadExecutions(); }, [loadExecutions]);

  const visibleProcesses = useMemo(() => processes.filter(item => String(item.codice || "").toUpperCase() !== "NUOVA_SEDE"), [processes]);
  const processByCode = useMemo(() => new Map(visibleProcesses.map(item => [String(item.codice || "").toUpperCase(), item])), [visibleProcesses]);
  const stats = useMemo(() => ({
    available: visibleProcesses.length,
    running: executions.filter(item => String(item.stato || "").toUpperCase() === "IN_CORSO").length,
    completed: executions.filter(item => String(item.stato || "").toUpperCase() === "COMPLETATO").length,
    errors: executions.filter(item => String(item.stato || "").toUpperCase() === "ERRORE").length,
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
    const q = normalize(search);
    return executions.filter(item => {
      const status = String(item.stato || "").toUpperCase();
      if (statusFilter !== "TUTTI" && status !== statusFilter) return false;
      const config = processByCode.get(String(item.processo || "").toUpperCase());
      const payload = safeObject(item.dati);
      const haystack = normalize(`${item.processo} ${config?.titolo || ""} ${item.passo_corrente || ""} ${item.avviato_da || ""} ${JSON.stringify(payload)}`);
      return !q || haystack.includes(q);
    });
  }, [executions, processByCode, search, statusFilter]);

  return (
    <section className="fmed-process-page">
      <header className="fmed-process-head">
        <div className="fmed-banner-heading">
          <FmedModuleIcon module="Processi" />
          <div className="fmed-banner-copy">
            <span className="fmed-process-kicker">FMED ENTERPRISE 1.0</span>
            <h2>Processi</h2>
            <p>Procedure guidate per operazioni complesse che collegano più moduli. La manutenzione ordinaria e straordinaria resta nei moduli Interventi e Infrastrutture.</p>
          </div>
        </div>
      </header>

      <aside className="fmed-process-usage" aria-label="Guida rapida all'utilizzo di FMED">
        <strong>Come scegliere la funzione</strong>
        <div>
          <span><b>Medicali</b> Manutenzioni ordinarie e straordinarie → <em>Interventi</em></span>
          <span><b>Impianti</b> Manutenzioni ordinarie e straordinarie → <em>Infrastrutture</em></span>
          <span><b>Operazioni complesse</b> Più moduli e passaggi → <em>Processi</em></span>
          <span><b>Nuovi valori</b> Sedi, ditte, modelli e menu → <em>Dizionari</em></span>
        </div>
      </aside>

      <ProcessiControls
        loading={loading}
        onRefresh={loadExecutions}
        stats={stats}
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {message && <div className="fmed-process-message">{message}</div>}

      <div className="fmed-process-catalog">
        {visibleProcesses.map(process => {
          const code = String(process.codice || "").toUpperCase();
          const last = lastByProcess.get(code);
          return (
            <article className="fmed-process-card" key={code}>
              <div className="fmed-process-card-top">
                <div>
                  <span className="fmed-process-code">{code.replaceAll("_", " ")}</span>
                  <h3>{process.titolo}</h3>
                </div>
                {last && <span className={`fmed-process-status is-${String(last.stato || "IN_CORSO").toLowerCase()}`}>{processStatusLabel(last.stato)}</span>}
              </div>
              <p>{process.descrizione}</p>
              <p className="fmed-process-use-case"><strong>Quando usarlo:</strong><span>{processUseCase(code)}</span></p>
              <div className="fmed-process-steps">
                {(process.passi || []).map((step, index) => <span key={step}><b>{index + 1}</b>{humanizeStep(step)}</span>)}
              </div>
              <div className="fmed-process-card-footer">
                <small>{last ? `Ultimo avvio: ${formatDate(last.aggiornato_il || last.created_at)}` : "Nessuna esecuzione registrata"}</small>
                <button type="button" onClick={() => onLaunchProcess?.(code)} disabled={!canManage}>{processActionLabel(code)}</button>
              </div>
            </article>
          );
        })}
      </div>

      <section className="fmed-process-history">
        <div className="fmed-process-history-head">
          <div>
            <h3>Registro processi</h3>
            <p>Stato, avanzamento e riferimento delle esecuzioni più recenti.</p>
          </div>

        </div>

        <div className="fmed-process-table-wrap">
          <table className="fmed-process-table">
            <thead><tr><th>Processo</th><th>Stato</th><th>Passaggio</th><th>Avanzamento</th><th>Avviato da</th><th>Aggiornato</th></tr></thead>
            <tbody>
              {!loading && filteredExecutions.length === 0 && <tr><td colSpan="6" className="fmed-process-empty">Nessuna esecuzione corrispondente.</td></tr>}
              {filteredExecutions.map(item => {
                const config = processByCode.get(String(item.processo || "").toUpperCase());
                const percentage = Math.max(0, Math.min(100, Number(item.percentuale || 0)));
                return <tr key={item.id || `${item.processo}-${item.aggiornato_il}`}>
                  <td><strong>{config?.titolo || String(item.processo || "").replaceAll("_", " ")}</strong><small>{item.riferimento_modulo || "Process Engine"}{item.riferimento_id ? ` · ${item.riferimento_id}` : ""}</small></td>
                  <td><span className={`fmed-process-status is-${String(item.stato || "IN_CORSO").toLowerCase()}`}>{processStatusLabel(item.stato)}</span></td>
                  <td>{humanizeStep(item.passo_corrente)}</td>
                  <td><div className="fmed-process-progress"><span style={{ width: `${percentage}%` }} /></div><small>{percentage}%</small></td>
                  <td>{item.avviato_da || "FMED"}</td>
                  <td>{formatDate(item.aggiornato_il || item.created_at)}</td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
