import { useMemo, useState } from "react";
import { fmedAuthHeaders, fmedFetchJson } from "./fmedApiClient.js";
import "./AuditFinalePage.css";

const STATUS_LABELS = {
  PASS: "Superato",
  WARN: "Rilievo",
  FAIL: "Non conformità",
  INFO: "Informativo",
};

function formatMetric(metric) {
  if (metric === null || metric === undefined || metric === "") return "—";
  if (typeof metric === "object") return JSON.stringify(metric);
  return String(metric);
}

export default function AuditFinalePage({ apiBaseUrl, canManage = false }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("TUTTI");

  const checks = useMemo(() => {
    const rows = Array.isArray(report?.controlli) ? report.controlli : [];
    if (filter === "TUTTI") return rows;
    return rows.filter((item) => item.stato === filter);
  }, [report, filter]);

  async function runAudit(force = true) {
    if (!canManage || loading) return;
    setLoading(true);
    setError("");
    try {
      const data = await fmedFetchJson(`/audit-finale?force=${force ? "true" : "false"}`, {
        apiBaseUrl,
        timeoutMs: 120000,
        retries: 1,
        headers: fmedAuthHeaders(),
      });
      setReport(data);
    } catch (auditError) {
      setError(String(auditError?.message || auditError || "Audit finale non disponibile"));
    } finally {
      setLoading(false);
    }
  }

  function exportJson() {
    if (!report) return;
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `FMED_E8_AUDIT_FINALE_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  if (!canManage) {
    return <div className="fmed-audit-denied">Audit finale disponibile esclusivamente agli amministratori.</div>;
  }

  return (
    <section className="fmed-audit-page">
      <header className="fmed-audit-head">
        <div>
          <span className="fmed-module-kicker">FMED Enterprise E8</span>
          <h3>Audit finale e rilascio stabile</h3>
          <p>Controllo non distruttivo di sicurezza, ruoli, dati, cicli, processi, Master Data, SharePoint e finestra operativa.</p>
        </div>
        <div className="fmed-audit-actions">
          <button type="button" className="primary" onClick={() => runAudit(true)} disabled={loading}>
            {loading ? "Audit in corso…" : "Esegui audit completo"}
          </button>
          <button type="button" onClick={exportJson} disabled={!report || loading}>Esporta report JSON</button>
        </div>
      </header>

      <div className="fmed-audit-rule">
        <strong>Nessuna modifica al database.</strong> Il controllo legge soltanto i dati e segnala gli elementi da verificare prima del rilascio definitivo.
      </div>

      {error && <div className="fmed-audit-error">{error}</div>}

      {!report && !loading && (
        <div className="fmed-audit-empty">
          <strong>Audit non ancora eseguito</strong>
          <span>Avvia il controllo per ottenere esito, punteggio e dettaglio delle verifiche.</span>
        </div>
      )}

      {report && (
        <>
          <div className="fmed-audit-summary">
            <article className={`result ${String(report.esito || "").toLowerCase()}`}>
              <small>Esito generale</small>
              <strong>{String(report.esito || "—").replaceAll("_", " ")}</strong>
              <span>{report.punteggio ?? 0}%</span>
            </article>
            <article><small>Controlli</small><strong>{report.riepilogo?.controlli ?? 0}</strong><span>totali</span></article>
            <article><small>Superati</small><strong>{report.riepilogo?.superati ?? 0}</strong><span>conformi</span></article>
            <article><small>Rilievi</small><strong>{report.riepilogo?.rilievi ?? 0}</strong><span>da verificare</span></article>
            <article><small>Non conformità</small><strong>{report.riepilogo?.non_conformita ?? 0}</strong><span>bloccanti</span></article>
          </div>

          <div className="fmed-audit-toolbar">
            <div>
              <strong>Controlli di rilascio</strong>
              <span>Generato il {new Date(report.generato_il).toLocaleString("it-IT")}</span>
            </div>
            <select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filtra esito audit">
              <option value="TUTTI">Tutti gli esiti</option>
              <option value="FAIL">Non conformità</option>
              <option value="WARN">Rilievi</option>
              <option value="PASS">Superati</option>
              <option value="INFO">Informativi</option>
            </select>
          </div>

          <div className="fmed-audit-list">
            {checks.map((item) => (
              <article key={item.codice} className={`fmed-audit-check ${String(item.stato || "info").toLowerCase()}`}>
                <div className="fmed-audit-check-top">
                  <div>
                    <span>{item.area} · {item.codice}</span>
                    <h4>{item.titolo}</h4>
                  </div>
                  <strong>{STATUS_LABELS[item.stato] || item.stato}</strong>
                </div>
                <p>{item.dettaglio}</p>
                <div className="fmed-audit-check-meta">
                  <span><b>Metrica:</b> {formatMetric(item.metrica)}</span>
                  {item.raccomandazione && <span><b>Azione:</b> {item.raccomandazione}</span>}
                </div>
              </article>
            ))}
          </div>

          <div className="fmed-audit-footer">
            <span>Finestra operativa dal <strong>01/01/2023</strong></span>
            <span>Collaudi: <strong>sempre conservati</strong></span>
            <span>Scritture database: <strong>nessuna</strong></span>
          </div>
        </>
      )}
    </section>
  );
}
