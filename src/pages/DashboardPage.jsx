import { useCallback, useEffect, useMemo, useState } from "react";
import FmedModuleIcon from "../components/FmedModuleIcon.jsx";
import { fmedAuthHeaders, fmedFetchJson } from "../fmedApiClient.js";

const EMPTY_FILTERS = {
  sede: "TUTTE",
  modulo: "TUTTI",
  stato: "TUTTI",
  priorita: "TUTTE",
  responsabile: "TUTTI",
  dal: "",
  al: "",
};

const MODULE_PAGE = {
  ASSET: "Asset",
  INFRASTRUTTURE: "Infrastrutture",
  SICUREZZA_81_08: "Sicurezza 81/08",
  FORMAZIONE: "Processi",
  SORVEGLIANZA_SANITARIA: "Processi",
  CONTRATTI: "Processi",
  QUALITA: "Processi",
  PROCESS_ENGINE: "Processi",
};

function formatInteger(value) {
  return Number(value || 0).toLocaleString("it-IT");
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("it-IT");
}

function humanize(value) {
  return String(value || "-").replaceAll("_", " ").toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}

function downloadCsv(rows) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const headers = ["tipo", "id", "titolo", "riferimento", "modulo_label", "sede", "stato", "priorita", "responsabile", "scadenza"];
  const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const content = [headers.join(";"), ...safeRows.map((row) => headers.map((key) => escape(row?.[key])).join(";"))].join("\n");
  const blob = new Blob([`\ufeff${content}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `FMED_Dashboard_Enterprise_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function ProgressBar({ value, max, tone = "brand" }) {
  const percentage = max > 0 ? Math.min(100, Math.max(0, (Number(value || 0) / Number(max)) * 100)) : 0;
  return <span className="fmed-e71-progress" aria-hidden="true"><i className={`fmed-e71-progress-${tone}`} style={{ width: `${percentage}%` }} /></span>;
}

function KpiCard({ label, value, detail, tone, icon, onClick }) {
  return (
    <button type="button" className={`fmed-e71-kpi fmed-e71-kpi-${tone}`} onClick={onClick}>
      <span className="fmed-e71-kpi-icon" aria-hidden="true">{icon}</span>
      <span className="fmed-e71-kpi-copy">
        <strong>{value}</strong>
        <small>{label}</small>
        <em>{detail}</em>
      </span>
    </button>
  );
}

function FilterSelect({ label, value, onChange, children }) {
  return (
    <label className="fmed-e71-filter">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>{children}</select>
    </label>
  );
}

export default function DashboardPage({
  apiBaseUrl,
  setNuovoInterventoOpen,
  setFiltroScadenze,
  setPagina,
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

  const loadDashboard = useCallback(async ({ force = false } = {}) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && !["TUTTE", "TUTTI"].includes(value)) params.set(key, value);
      });
      if (force) params.set("force", "true");
      const data = await fmedFetchJson(`/dashboard-enterprise?${params.toString()}`, {
        apiBaseUrl,
        headers: fmedAuthHeaders(),
        timeoutMs: 90000,
        retries: 1,
      });
      setSnapshot(data);
    } catch (requestError) {
      setError(requestError?.message || "Dashboard Enterprise non raggiungibile");
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl, filters]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const fallbackKpi = useMemo(() => ({
    asset_totali: cespiti.length,
    asset_attivi: cespiti.length,
    processi_totali: 0,
    processi_aperti: 0,
    processi_in_ritardo: 0,
    processi_da_approvare: 0,
    scadenze_totali: scadenzeConStatoBase.length,
    scadenze_scadute: scadenzeConStatoBase.filter((row) => row?._statoScadenza?.codice === "SCADUTA").length,
    scadenze_entro_30: scadenzeImminenti.length,
    scadenze_da_pianificare: 0,
    infrastrutture_totali: 0,
    documenti_81_08: 0,
    non_conformita_aperte: 0,
    sla_rispettati_percentuale: 100,
    copertura_documentale_percentuale: cespiti.length ? Math.round(100 * cespiti.filter((row) => row?.link_documento || row?.link_sharepoint).length / cespiti.length) : 0,
    costi_tracciati: totaleSpesaDashboard,
    dizionari: 0,
    valori_master_attivi: 0,
    valori_da_approvare: 0,
    relazioni_attive: 0,
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

  const navigateDeadline = (status = "TUTTE") => {
    setFiltroScadenze(status);
    setPagina("Scadenze");
  };

  const quickActions = [
    { label: "Nuovo intervento", action: () => setNuovoInterventoOpen(true), icon: "＋" },
    { label: "Nuovo asset", action: () => avviaProcessoGuidatoFmed("NUOVO_ASSET"), icon: "◇" },
    { label: "Nuovo processo", action: () => setPagina("Processi"), icon: "▶" },
    { label: "Scadenze", action: () => navigateDeadline("TUTTE"), icon: "◷" },
    { label: "Alert email", action: openAlertMailDialog, icon: "✉" },
    { label: "Outlook", action: openOutlook, icon: "↗" },
  ];

  return (
    <div className="fmed-dashboard-page fmed-e71-dashboard" data-fmed-dashboard="E7.1">
      <header className="fmed-e71-header">
        <div className="fmed-e71-title">
          <FmedModuleIcon module="Dashboard" className="fmed-dashboard-title-icon" />
          <div>
            <h2>Dashboard Enterprise</h2>
            <p>Processi, cicli, criticità e responsabilità in un’unica vista operativa</p>
          </div>
        </div>
        <div className="fmed-e71-header-actions">
          <span className="fmed-e71-live"><i /> {loading ? "Aggiornamento…" : `Aggiornata ${snapshot?.aggiornato_il ? new Date(snapshot.aggiornato_il).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }) : "ora"}`}</span>
          <button type="button" className="fmed-e71-button-secondary" onClick={() => loadDashboard({ force: true })} disabled={loading}>↻ Aggiorna</button>
          <button type="button" className="fmed-e71-button-primary" onClick={() => downloadCsv(snapshot?.export_rows || [])}>Esporta CSV</button>
        </div>
      </header>

      {error && (
        <div className="fmed-e71-warning">
          <strong>Dashboard Enterprise non sincronizzata.</strong>
          <span>{error}. I dati locali restano visibili, ma KPI processi e infrastrutture richiedono il backend E7.1.</span>
        </div>
      )}

      <section className="fmed-e71-filters" aria-label="Filtri globali Dashboard Enterprise">
        <FilterSelect label="Sede" value={filters.sede} onChange={(value) => updateFilter("sede", value)}>
          <option value="TUTTE">Tutte le sedi</option>
          {filterOptions.sedi.map((value) => <option key={value} value={value}>{value}</option>)}
        </FilterSelect>
        <FilterSelect label="Modulo" value={filters.modulo} onChange={(value) => updateFilter("modulo", value)}>
          <option value="TUTTI">Tutti i moduli</option>
          {filterOptions.moduli.map((item) => <option key={item.codice} value={item.codice}>{item.etichetta}</option>)}
        </FilterSelect>
        <FilterSelect label="Stato" value={filters.stato} onChange={(value) => updateFilter("stato", value)}>
          <option value="TUTTI">Tutti gli stati</option>
          {filterOptions.stati.map((value) => <option key={value} value={value}>{humanize(value)}</option>)}
        </FilterSelect>
        <FilterSelect label="Priorità" value={filters.priorita} onChange={(value) => updateFilter("priorita", value)}>
          <option value="TUTTE">Tutte le priorità</option>
          {filterOptions.priorita.map((value) => <option key={value} value={value}>{humanize(value)}</option>)}
        </FilterSelect>
        <FilterSelect label="Responsabile" value={filters.responsabile} onChange={(value) => updateFilter("responsabile", value)}>
          <option value="TUTTI">Tutti i responsabili</option>
          {filterOptions.responsabili.map((value) => <option key={value} value={value}>{value}</option>)}
        </FilterSelect>
        <label className="fmed-e71-filter"><span>Dal</span><input type="date" value={filters.dal} onChange={(event) => updateFilter("dal", event.target.value)} /></label>
        <label className="fmed-e71-filter"><span>Al</span><input type="date" value={filters.al} onChange={(event) => updateFilter("al", event.target.value)} /></label>
        <button type="button" className="fmed-e71-reset" onClick={resetFilters}>Azzera filtri</button>
      </section>

      <section className="fmed-e71-quick-actions">
        {quickActions.map((item) => <button type="button" key={item.label} onClick={item.action}><i>{item.icon}</i><span>{item.label}</span></button>)}
      </section>

      <section className="fmed-e71-kpi-grid">
        <KpiCard label="Processi aperti" value={formatInteger(kpi.processi_aperti)} detail={`${formatInteger(kpi.processi_totali)} processi complessivi`} tone="brand" icon="P" onClick={() => showRows("Processi operativi", snapshot?.processi_operativi, "Processi")} />
        <KpiCard label="Processi in ritardo" value={formatInteger(kpi.processi_in_ritardo)} detail={`SLA rispettati ${Number(kpi.sla_rispettati_percentuale || 0).toLocaleString("it-IT")}%`} tone="danger" icon="!" onClick={() => showRows("Processi in ritardo", (snapshot?.processi_operativi || []).filter((row) => row.in_ritardo), "Processi")} />
        <KpiCard label="Da approvare" value={formatInteger(kpi.processi_da_approvare)} detail="Verifiche e approvazioni pendenti" tone="warning" icon="✓" onClick={() => showRows("Approvazioni pendenti", snapshot?.approvazioni_pendenti, "Processi")} />
        <KpiCard label="Scadenze scadute" value={formatInteger(kpi.scadenze_scadute)} detail={`${formatInteger(kpi.scadenze_entro_30)} entro 30 giorni`} tone="danger" icon="◷" onClick={() => showRows("Scadenze critiche", (snapshot?.scadenze_operative || []).filter((row) => row.stato === "SCADUTA"), "Scadenze")} />
        <KpiCard label="Da pianificare" value={formatInteger(kpi.scadenze_da_pianificare)} detail="Cicli privi di data futura" tone="warning" icon="?" onClick={() => showRows("Cicli da pianificare", (snapshot?.scadenze_operative || []).filter((row) => row.stato === "DA_PIANIFICARE"), "Scadenze")} />
        <KpiCard label="Asset attivi" value={formatInteger(kpi.asset_attivi)} detail={`${Number(kpi.copertura_documentale_percentuale || 0).toLocaleString("it-IT")}% con documentazione`} tone="success" icon="A" onClick={() => setPagina("Asset")} />
        <KpiCard label="Infrastrutture" value={formatInteger(kpi.infrastrutture_totali)} detail="Impianti e controlli censiti" tone="secondary" icon="I" onClick={() => setPagina("Infrastrutture")} />
        <KpiCard label="Documenti 81/08" value={formatInteger(kpi.documenti_81_08)} detail={`${formatInteger(kpi.non_conformita_aperte)} non conformità aperte`} tone="brand" icon="81" onClick={() => setPagina("Sicurezza 81/08")} />
      </section>

      <div className="fmed-e71-main-grid">
        <section className="fmed-e71-panel fmed-e71-trend-panel">
          <div className="fmed-e71-panel-header">
            <div><h3>Andamento operativo</h3><p>Processi aperti, completati e scadenze negli ultimi 12 mesi</p></div>
            <span className="fmed-e71-chip">Dati reali</span>
          </div>
          <div className="fmed-e71-trend-legend"><span><i className="opened" />Aperti</span><span><i className="closed" />Completati</span><span><i className="deadlines" />Scadenze</span></div>
          <div className="fmed-e71-trend-chart">
            {trend.map((row) => (
              <div className="fmed-e71-month" key={row.mese} title={`${row.etichetta}: ${row.processi_aperti} aperti, ${row.processi_completati} completati, ${row.scadenze} scadenze`}>
                <div className="fmed-e71-bars">
                  <i className="opened" style={{ height: `${Math.max(3, Number(row.processi_aperti || 0) / maxTrend * 100)}%` }} />
                  <i className="closed" style={{ height: `${Math.max(3, Number(row.processi_completati || 0) / maxTrend * 100)}%` }} />
                  <i className="deadlines" style={{ height: `${Math.max(3, Number(row.scadenze || 0) / maxTrend * 100)}%` }} />
                </div>
                <span>{row.etichetta}</span>
              </div>
            ))}
            {!trend.length && <div className="fmed-e71-empty">Nessun andamento disponibile.</div>}
          </div>
          <div className="fmed-e71-cost-strip"><span>Costi tracciati</span><strong>{formatCurrency(kpi.costi_tracciati)}</strong></div>
        </section>

        <section className="fmed-e71-panel">
          <div className="fmed-e71-panel-header"><div><h3>Priorità operative</h3><p>Record che richiedono attenzione immediata</p></div><button type="button" onClick={() => navigateDeadline("TUTTE")}>Apri scadenze</button></div>
          <div className="fmed-e71-priority-list">
            {(snapshot?.scadenze_critiche || []).slice(0, 6).map((row) => (
              <button type="button" key={`deadline-${row.id}-${row.famiglia || row.titolo}`} onClick={() => showRows("Dettaglio scadenze critiche", snapshot?.scadenze_critiche, "Scadenze")}>
                <span className={`fmed-e71-state-dot ${row.stato === "SCADUTA" ? "danger" : "warning"}`} />
                <span><strong>{row.titolo}</strong><small>{row.riferimento} · {row.sede}</small></span>
                <em>{formatDate(row.scadenza)}</em>
              </button>
            ))}
            {!(snapshot?.scadenze_critiche || []).length && <div className="fmed-e71-empty">Nessuna scadenza critica.</div>}
          </div>
        </section>
      </div>

      <div className="fmed-e71-secondary-grid">
        <section className="fmed-e71-panel">
          <div className="fmed-e71-panel-header"><div><h3>Criticità per sede</h3><p>Indice composto da scadenze e processi in ritardo</p></div></div>
          <div className="fmed-e71-site-list">
            {criticalSites.slice(0, 8).map((row) => (
              <button type="button" key={row.sede} onClick={() => updateFilter("sede", row.sede)}>
                <span><strong>{row.sede}</strong><small>{row.processi_aperti} processi · {row.scadenze_scadute} scadute</small></span>
                <span className="fmed-e71-site-score"><b>{row.indice_criticita}</b><ProgressBar value={row.indice_criticita} max={maxSiteScore} tone={row.indice_criticita > maxSiteScore * 0.65 ? "danger" : "warning"} /></span>
              </button>
            ))}
            {!criticalSites.length && <div className="fmed-e71-empty">Nessuna criticità per sede.</div>}
          </div>
        </section>

        <section className="fmed-e71-panel">
          <div className="fmed-e71-panel-header"><div><h3>Processi per modulo</h3><p>Aperti, completati e in ritardo</p></div><button type="button" onClick={() => setPagina("Processi")}>Apri Processi</button></div>
          <div className="fmed-e71-module-list">
            {(snapshot?.processi_per_modulo || []).slice(0, 8).map((row) => (
              <button type="button" key={row.codice} onClick={() => setPagina(MODULE_PAGE[row.codice] || "Processi")}>
                <span><strong>{row.etichetta}</strong><small>{row.completati} completati</small></span>
                <span><b>{row.aperti}</b> aperti<em>{row.in_ritardo} in ritardo</em></span>
              </button>
            ))}
            {!(snapshot?.processi_per_modulo || []).length && <div className="fmed-e71-empty">Nessun processo registrato.</div>}
          </div>
        </section>

        <section className="fmed-e71-panel">
          <div className="fmed-e71-panel-header"><div><h3>Carico per responsabile</h3><p>Assegnazioni correnti e ritardi</p></div></div>
          <div className="fmed-e71-responsible-list">
            {(snapshot?.processi_per_responsabile || []).slice(0, 8).map((row) => (
              <button type="button" key={row.responsabile} onClick={() => updateFilter("responsabile", row.responsabile)}>
                <span className="fmed-e71-avatar">{row.responsabile.slice(0, 2).toUpperCase()}</span>
                <span><strong>{row.responsabile}</strong><small>{row.aperti} aperti su {row.totale}</small></span>
                <em>{row.in_ritardo} ritardi</em>
              </button>
            ))}
            {!(snapshot?.processi_per_responsabile || []).length && <div className="fmed-e71-empty">Nessuna assegnazione disponibile.</div>}
          </div>
        </section>
      </div>

      <section className="fmed-e71-governance">
        <div><span>Dizionari</span><strong>{formatInteger(kpi.dizionari)}</strong><small>cataloghi centrali</small></div>
        <div><span>Valori Master Data</span><strong>{formatInteger(kpi.valori_master_attivi)}</strong><small>attivi e selezionabili</small></div>
        <div><span>Relazioni intelligenti</span><strong>{formatInteger(kpi.relazioni_attive)}</strong><small>passato → futuro</small></div>
        <div className={Number(kpi.valori_da_approvare || 0) > 0 ? "attention" : ""}><span>Da approvare</span><strong>{formatInteger(kpi.valori_da_approvare)}</strong><small>governance dati</small></div>
        <button type="button" onClick={() => setPagina("Dizionari")}>Apri governance dati</button>
      </section>

      {drilldown && (
        <div className="fmed-e71-drawer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDrilldown(null); }}>
          <aside className="fmed-e71-drawer" role="dialog" aria-modal="true" aria-label={drilldown.title}>
            <div className="fmed-e71-drawer-header">
              <div><h3>{drilldown.title}</h3><p>{drilldown.rows.length} record reali disponibili</p></div>
              <button type="button" onClick={() => setDrilldown(null)}>×</button>
            </div>
            <div className="fmed-e71-drawer-list">
              {drilldown.rows.slice(0, 100).map((row, index) => (
                <article key={`${row.tipo}-${row.id}-${index}`}>
                  <span className={`fmed-e71-record-type ${row.tipo === "SCADENZA" ? "deadline" : "process"}`}>{row.tipo}</span>
                  <div><strong>{row.titolo}</strong><small>{row.riferimento} · {row.sede} · {row.modulo_label}</small></div>
                  <div className="fmed-e71-record-status"><b>{humanize(row.stato)}</b><small>{formatDate(row.scadenza)}</small></div>
                </article>
              ))}
              {!drilldown.rows.length && <div className="fmed-e71-empty">Nessun record per questo indicatore.</div>}
            </div>
            <div className="fmed-e71-drawer-footer">
              <button type="button" className="fmed-e71-button-secondary" onClick={() => downloadCsv(drilldown.rows)}>Esporta elenco</button>
              <button type="button" className="fmed-e71-button-primary" onClick={() => { setPagina(drilldown.page || "Dashboard"); setDrilldown(null); }}>Apri modulo</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
