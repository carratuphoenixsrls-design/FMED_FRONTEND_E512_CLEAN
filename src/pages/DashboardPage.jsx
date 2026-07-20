import { useCallback, useEffect, useMemo, useState } from "react";
import FmedModuleIcon from "../components/FmedModuleIcon.jsx";
import { fmedAuthHeaders, fmedFetchJson } from "../fmedApiClient.js";

const EMPTY_FILTERS = {
  sede: "TUTTE",
  modulo: "TUTTI",
  stato: "TUTTI",
  priorita: "TUTTE",
  responsabile: "TUTTI",
  dal: "2023-01-01",
  al: "",
  tutto_storico: false,
};


function formatInteger(value) { return Number(value || 0).toLocaleString("it-IT"); }
function formatCurrency(value) { return Number(value || 0).toLocaleString("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }); }
function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("it-IT");
}
function humanize(value) { return String(value || "-").replaceAll("_", " ").toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase()); }
function downloadCsv(rows) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const headers = ["tipo", "id", "titolo", "riferimento", "modulo_label", "sede", "stato", "priorita", "responsabile", "scadenza"];
  const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const content = [headers.join(";"), ...safeRows.map((row) => headers.map((key) => escape(row?.[key])).join(";"))].join("\n");
  const blob = new Blob([`\ufeff${content}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `FMED_Operativo_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
}
function KpiCard({ label, value, detail, tone, icon, onClick }) {
  return <button type="button" className={`fmed-e71-kpi fmed-e71-kpi-${tone}`} onClick={onClick}>
    <span className="fmed-e71-kpi-icon" aria-hidden="true">{icon}</span>
    <span className="fmed-e71-kpi-copy"><strong>{value}</strong><small>{label}</small><em>{detail}</em></span>
  </button>;
}
function FilterSelect({ label, value, onChange, children }) {
  return <label className="fmed-e71-filter"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{children}</select></label>;
}
function ProgressBar({ value, max, tone = "brand" }) {
  const percentage = max > 0 ? Math.min(100, Math.max(0, Number(value || 0) / Number(max) * 100)) : 0;
  return <span className="fmed-e71-progress" aria-hidden="true"><i className={`fmed-e71-progress-${tone}`} style={{ width: `${percentage}%` }} /></span>;
}

export default function DashboardPage({
  apiBaseUrl,
  setNuovoInterventoOpen,
  setFiltroScadenze,
  setPagina,
  setImpostazioniTab,
  avviaProcessoGuidatoFmed,
  openAlertMailDialog,
  openOutlook,
  cespiti = [],
  scadenzeConStatoBase = [],
  scadenzeImminenti = [],
  totaleSpesaDashboard = 0,
}) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [snapshot, setSnapshot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [drilldown, setDrilldown] = useState(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const loadDashboard = useCallback(async ({ force = false } = {}) => {
    setLoading(true); setError("");
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => { if (value && !["TUTTE", "TUTTI"].includes(value)) params.set(key, value); });
      if (force) params.set("force", "true");
      const data = await fmedFetchJson(`/dashboard-enterprise?${params.toString()}`, { apiBaseUrl, headers: fmedAuthHeaders(), timeoutMs: 90000, retries: 1 });
      setSnapshot(data);
    } catch (requestError) { setError(requestError?.message || "Dati non raggiungibili"); }
    finally { setLoading(false); }
  }, [apiBaseUrl, filters]);
  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  const fallbackKpi = useMemo(() => ({
    asset_totali: cespiti.length, asset_attivi: cespiti.length,
    processi_totali: 0, processi_aperti: 0, processi_in_ritardo: 0, processi_da_approvare: 0,
    scadenze_totali: scadenzeConStatoBase.length,
    scadenze_scadute: scadenzeConStatoBase.filter((row) => row?._statoScadenza?.codice === "SCADUTA").length,
    scadenze_entro_30: scadenzeImminenti.length, scadenze_da_pianificare: 0,
    infrastrutture_totali: 0, documenti_81_08: 0, non_conformita_aperte: 0,
    sla_rispettati_percentuale: 100,
    copertura_documentale_percentuale: cespiti.length ? Math.round(100 * cespiti.filter((row) => row?.link_documento || row?.link_sharepoint).length / cespiti.length) : 0,
    costi_tracciati: totaleSpesaDashboard, dizionari: 0, valori_master_attivi: 0, valori_da_approvare: 0, relazioni_attive: 0,
  }), [cespiti, scadenzeConStatoBase, scadenzeImminenti, totaleSpesaDashboard]);

  const kpi = snapshot?.kpi || fallbackKpi;
  const filterOptions = snapshot?.opzioni_filtri || { sedi: [], moduli: [], stati: [], priorita: [], responsabili: [] };
  const trend = snapshot?.trend_mensile || [];
  const maxTrend = Math.max(1, ...trend.map((row) => Math.max(Number(row.processi_aperti || 0), Number(row.processi_completati || 0), Number(row.scadenze || 0))));
  const criticalSites = snapshot?.criticita_per_sede || [];
  const maxSiteScore = Math.max(1, ...criticalSites.map((row) => Number(row.indice_criticita || 0)));
  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  const resetFilters = () => setFilters(EMPTY_FILTERS);
  const showRows = (title, rows, page) => setDrilldown({ title, rows: Array.isArray(rows) ? rows : [], page });
  const navigateDeadline = (status = "TUTTE") => { setFiltroScadenze(status); setPagina("Scadenze"); };

  const quickActions = [
    { label: "Registra intervento", action: () => setNuovoInterventoOpen(true), icon: "+" },
    { label: "Nuovo asset", action: () => avviaProcessoGuidatoFmed("NUOVO_ASSET"), icon: "A" },
    { label: "Cerca asset", action: () => setPagina("Asset"), icon: "⌕" },
    { label: "Scadenze", action: () => navigateDeadline("TUTTE"), icon: "◷" },
    { label: "Infrastrutture", action: () => setPagina("Infrastrutture"), icon: "I" },
    { label: "Sicurezza 81/08", action: () => setPagina("Sicurezza 81/08"), icon: "81" },
  ];

  return <div className="fmed-dashboard-page fmed-e71-dashboard fmed-e81-dashboard" data-fmed-dashboard="E8.1.1">
    <header className="fmed-e71-header fmed-e81-header">
      <div className="fmed-e71-title"><FmedModuleIcon module="Dashboard" className="fmed-dashboard-title-icon" /><div><h2>FMED operativo</h2><p>Cosa richiede attenzione e cosa devi fare oggi</p></div></div>
      <div className="fmed-e71-header-actions">
        <span className="fmed-e71-live"><i /> {loading ? "Aggiornamento…" : "Dati aggiornati"}</span>
        <button type="button" className="fmed-e71-button-secondary" onClick={() => loadDashboard({ force: true })} disabled={loading}>↻ Aggiorna</button>
        <button type="button" className="fmed-e71-button-primary" onClick={() => setAdvancedOpen((value) => !value)}>{advancedOpen ? "Nascondi analisi" : "Analisi e report"}</button>
      </div>
    </header>

    {error && <div className="fmed-e71-warning"><strong>Non tutti i dati sono aggiornati.</strong><span>{error}. Puoi continuare a usare le funzioni disponibili e riprovare con Aggiorna.</span></div>}

    <section className="fmed-e81-automation-strip">
      <div><strong>Automazioni attive</strong><span>Scadenze, cicli, storico, codici e dashboard si aggiornano automaticamente quando registri o chiudi un’attività.</span></div>
      <button type="button" onClick={() => { setImpostazioniTab?.("STRUMENTI"); setPagina("Gestione Utenti"); }}>Strumenti</button>
    </section>

    <section className="fmed-e71-quick-actions fmed-e81-quick-actions">
      {quickActions.map((item) => <button type="button" key={item.label} onClick={item.action}><i>{item.icon}</i><span>{item.label}</span></button>)}
    </section>

    <section className="fmed-e81-section-head"><div><h3>Da fare ora</h3><p>Apri un indicatore per vedere i record reali.</p></div></section>
    <section className="fmed-e71-kpi-grid fmed-e81-kpi-grid">
      <KpiCard label="Scadenze scadute" value={formatInteger(kpi.scadenze_scadute)} detail="Richiedono verifica" tone="danger" icon="!" onClick={() => showRows("Scadenze scadute", (snapshot?.scadenze_operative || []).filter((row) => row.stato === "SCADUTA"), "Scadenze")} />
      <KpiCard label="Entro 30 giorni" value={formatInteger(kpi.scadenze_entro_30)} detail="Da organizzare" tone="warning" icon="30" onClick={() => showRows("Scadenze entro 30 giorni", snapshot?.scadenze_critiche, "Scadenze")} />
      <KpiCard label="Processi in ritardo" value={formatInteger(kpi.processi_in_ritardo)} detail="Attività oltre i tempi" tone="danger" icon="P" onClick={() => showRows("Attività in ritardo", (snapshot?.processi_operativi || []).filter((row) => row.in_ritardo), "Processi")} />
      <KpiCard label="Da approvare" value={formatInteger(kpi.processi_da_approvare)} detail="Verifiche pendenti" tone="warning" icon="✓" onClick={() => showRows("Approvazioni pendenti", snapshot?.approvazioni_pendenti, "Processi")} />
      <KpiCard label="Da pianificare" value={formatInteger(kpi.scadenze_da_pianificare)} detail="Manca la prossima data" tone="secondary" icon="?" onClick={() => showRows("Da pianificare", (snapshot?.scadenze_operative || []).filter((row) => row.stato === "DA_PIANIFICARE"), "Scadenze")} />
      <KpiCard label="Asset attivi" value={formatInteger(kpi.asset_attivi)} detail={`${Number(kpi.copertura_documentale_percentuale || 0).toLocaleString("it-IT")}% documentati`} tone="success" icon="A" onClick={() => setPagina("Asset")} />
    </section>

    <div className="fmed-e81-operational-grid">
      <section className="fmed-e71-panel">
        <div className="fmed-e71-panel-header"><div><h3>Priorità</h3><p>Le prossime attività da controllare</p></div><button type="button" onClick={() => navigateDeadline("TUTTE")}>Apri tutte</button></div>
        <div className="fmed-e71-priority-list">
          {(snapshot?.scadenze_critiche || []).slice(0, 7).map((row) => <button type="button" key={`deadline-${row.id}-${row.famiglia || row.titolo}`} onClick={() => showRows("Dettaglio priorità", snapshot?.scadenze_critiche, "Scadenze")}>
            <span className={`fmed-e71-state-dot ${row.stato === "SCADUTA" ? "danger" : "warning"}`} />
            <span><strong>{row.titolo}</strong><small>{row.riferimento} · {row.sede}</small></span><em>{formatDate(row.scadenza)}</em>
          </button>)}
          {!(snapshot?.scadenze_critiche || []).length && <div className="fmed-e71-empty">Nessuna priorità critica.</div>}
        </div>
      </section>
      <section className="fmed-e71-panel">
        <div className="fmed-e71-panel-header"><div><h3>Attività aperte</h3><p>Solo quelle che richiedono ancora lavoro</p></div><button type="button" onClick={() => setPagina("Processi")}>Gestisci</button></div>
        <div className="fmed-e71-priority-list">
          {(snapshot?.processi_operativi || []).slice(0, 7).map((row) => <button type="button" key={`process-${row.id}`} onClick={() => showRows("Attività aperte", snapshot?.processi_operativi, "Processi")}>
            <span className={`fmed-e71-state-dot ${row.in_ritardo ? "danger" : "warning"}`} />
            <span><strong>{row.titolo}</strong><small>{row.sede} · {row.responsabile || "Da assegnare"}</small></span><em>{humanize(row.stato)}</em>
          </button>)}
          {!(snapshot?.processi_operativi || []).length && <div className="fmed-e71-empty">Nessuna attività aperta.</div>}
        </div>
      </section>
    </div>

    {advancedOpen && <section className="fmed-e81-advanced" aria-label="Analisi avanzate">
      <header><div><h3>Analisi e amministrazione</h3><p>Strumenti secondari, normalmente nascosti per lasciare pulita l'operatività quotidiana.</p></div><div><button type="button" onClick={() => setFiltersOpen((value) => !value)}>{filtersOpen ? "Nascondi filtri" : "Filtri"}</button><button type="button" onClick={() => downloadCsv(snapshot?.export_rows || [])}>Esporta CSV</button></div></header>
      {filtersOpen && <section className="fmed-e71-filters">
        <FilterSelect label="Vista" value={filters.tutto_storico ? "STORICO" : "OPERATIVA"} onChange={(value) => setFilters((current) => value === "STORICO" ? { ...current, tutto_storico: true, dal: "" } : { ...current, tutto_storico: false, dal: "2023-01-01" })}><option value="OPERATIVA">Dal 01/01/2023</option><option value="STORICO">Tutto lo storico</option></FilterSelect>
        <FilterSelect label="Sede" value={filters.sede} onChange={(value) => updateFilter("sede", value)}><option value="TUTTE">Tutte</option>{filterOptions.sedi.map((value) => <option key={value} value={value}>{value}</option>)}</FilterSelect>
        <FilterSelect label="Modulo" value={filters.modulo} onChange={(value) => updateFilter("modulo", value)}><option value="TUTTI">Tutti</option>{filterOptions.moduli.map((item) => <option key={item.codice} value={item.codice}>{item.etichetta}</option>)}</FilterSelect>
        <FilterSelect label="Stato" value={filters.stato} onChange={(value) => updateFilter("stato", value)}><option value="TUTTI">Tutti</option>{filterOptions.stati.map((value) => <option key={value} value={value}>{humanize(value)}</option>)}</FilterSelect>
        <FilterSelect label="Priorità" value={filters.priorita} onChange={(value) => updateFilter("priorita", value)}><option value="TUTTE">Tutte</option>{filterOptions.priorita.map((value) => <option key={value} value={value}>{humanize(value)}</option>)}</FilterSelect>
        <FilterSelect label="Responsabile" value={filters.responsabile} onChange={(value) => updateFilter("responsabile", value)}><option value="TUTTI">Tutti</option>{filterOptions.responsabili.map((value) => <option key={value} value={value}>{value}</option>)}</FilterSelect>
        <button type="button" className="fmed-e71-reset" onClick={resetFilters}>Azzera</button>
      </section>}

      <section className="fmed-e81-summary-grid">
        <article><span>Processi aperti</span><strong>{formatInteger(kpi.processi_aperti)}</strong></article>
        <article><span>Infrastrutture</span><strong>{formatInteger(kpi.infrastrutture_totali)}</strong></article>
        <article><span>Documenti 81/08</span><strong>{formatInteger(kpi.documenti_81_08)}</strong></article>
        <article><span>Costi tracciati</span><strong>{formatCurrency(kpi.costi_tracciati)}</strong></article>
        <article><span>Collaudi conservati</span><strong>{formatInteger(kpi.collaudi_sempre_visibili)}</strong></article>
        <article><span>Archivio pre-2023</span><strong>{formatInteger(kpi.record_archivio_pre_2023)}</strong></article>
      </section>

      <div className="fmed-e71-main-grid">
        <section className="fmed-e71-panel fmed-e71-trend-panel"><div className="fmed-e71-panel-header"><div><h3>Andamento</h3><p>Ultimi 12 mesi</p></div></div><div className="fmed-e71-trend-chart">{trend.map((row) => <div className="fmed-e71-month" key={row.mese}><div className="fmed-e71-bars"><i className="opened" style={{ height: `${Math.max(3, Number(row.processi_aperti || 0) / maxTrend * 100)}%` }} /><i className="closed" style={{ height: `${Math.max(3, Number(row.processi_completati || 0) / maxTrend * 100)}%` }} /><i className="deadlines" style={{ height: `${Math.max(3, Number(row.scadenze || 0) / maxTrend * 100)}%` }} /></div><span>{row.etichetta}</span></div>)}{!trend.length && <div className="fmed-e71-empty">Nessun andamento disponibile.</div>}</div></section>
        <section className="fmed-e71-panel"><div className="fmed-e71-panel-header"><div><h3>Criticità per sede</h3><p>Scadenze e ritardi</p></div></div><div className="fmed-e71-site-list">{criticalSites.slice(0, 8).map((row) => <button type="button" key={row.sede} onClick={() => updateFilter("sede", row.sede)}><span><strong>{row.sede}</strong><small>{row.processi_aperti} attività · {row.scadenze_scadute} scadute</small></span><span className="fmed-e71-site-score"><b>{row.indice_criticita}</b><ProgressBar value={row.indice_criticita} max={maxSiteScore} tone={row.indice_criticita > maxSiteScore * .65 ? "danger" : "warning"} /></span></button>)}{!criticalSites.length && <div className="fmed-e71-empty">Nessuna criticità.</div>}</div></section>
      </div>

      <div className="fmed-e81-advanced-actions"><button type="button" onClick={openAlertMailDialog}>Prepara alert email</button><button type="button" onClick={openOutlook}>Apri Outlook</button><button type="button" onClick={() => setPagina("Processi")}>Processi guidati</button><button type="button" onClick={() => { setImpostazioniTab?.("STRUMENTI"); setPagina("Gestione Utenti"); }}>Strumenti e impostazioni</button></div>
      <section className="fmed-e71-governance"><div><span>Dizionari</span><strong>{formatInteger(kpi.dizionari)}</strong><small>cataloghi</small></div><div><span>Valori attivi</span><strong>{formatInteger(kpi.valori_master_attivi)}</strong><small>menu</small></div><div><span>Relazioni</span><strong>{formatInteger(kpi.relazioni_attive)}</strong><small>automatiche</small></div><div><span>Da approvare</span><strong>{formatInteger(kpi.valori_da_approvare)}</strong><small>dati</small></div><button type="button" onClick={() => setPagina("Dizionari")}>Gestisci dati</button></section>
    </section>}

    {drilldown && <div className="fmed-e71-drawer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDrilldown(null); }}><aside className="fmed-e71-drawer" role="dialog" aria-modal="true" aria-label={drilldown.title}><div className="fmed-e71-drawer-header"><div><h3>{drilldown.title}</h3><p>{drilldown.rows.length} record</p></div><button type="button" onClick={() => setDrilldown(null)}>×</button></div><div className="fmed-e71-drawer-list">{drilldown.rows.slice(0, 100).map((row, index) => <article key={`${row.tipo}-${row.id}-${index}`}><span className={`fmed-e71-record-type ${row.tipo === "SCADENZA" ? "deadline" : "process"}`}>{row.tipo}</span><div><strong>{row.titolo}</strong><small>{row.riferimento} · {row.sede} · {row.modulo_label}</small></div><div className="fmed-e71-record-status"><b>{humanize(row.stato)}</b><small>{formatDate(row.scadenza)}</small></div></article>)}{!drilldown.rows.length && <div className="fmed-e71-empty">Nessun record.</div>}</div><div className="fmed-e71-drawer-footer"><button type="button" className="fmed-e71-button-secondary" onClick={() => downloadCsv(drilldown.rows)}>Esporta</button><button type="button" className="fmed-e71-button-primary" onClick={() => { setPagina(drilldown.page || "Dashboard"); setDrilldown(null); }}>Apri modulo</button></div></aside></div>}
  </div>;
}
