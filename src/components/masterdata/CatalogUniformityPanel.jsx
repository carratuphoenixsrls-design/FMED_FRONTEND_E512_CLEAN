const formatCount = (value) => new Intl.NumberFormat("it-IT").format(Number(value || 0));

function ValueLabel({ value }) {
  if (!value) return <span>—</span>;
  return <span className="core-uniformity-value-label">
    <strong>{value.etichetta || value.codice || "—"}</strong>
    <code>{value.codice || "—"}</code>
    <small>{formatCount(value.occorrenze)} utilizzi</small>
  </span>;
}

export default function CatalogUniformityPanel({
  audit,
  loading,
  busy,
  mergePreview,
  canManage,
  onRefresh,
  onPreviewExact,
  onApplyExact,
  onOpenDictionary,
}) {
  const summary = audit?.riepilogo || {};
  const dictionaries = Array.isArray(audit?.dizionari) ? audit.dizionari : [];
  const exact = Array.isArray(audit?.duplicati_esatti) ? audit.duplicati_esatti : [];
  const similar = Array.isArray(audit?.possibili_duplicati) ? audit.possibili_duplicati : [];
  const technical = Array.isArray(audit?.etichette_tecniche) ? audit.etichette_tecniche : [];
  const excluded = Array.isArray(audit?.dizionari_esclusi) ? audit.dizionari_esclusi : [];
  const exactPlan = Array.isArray(mergePreview?.piano) ? mergePreview.piano : [];

  return <section className="core-uniformity-panel" aria-label="Uniformità cataloghi Supabase">
    <div className="core-quality-heading">
      <div>
        <span className="core-standard-kicker">E8.1.8 · CONTROLLO SUPABASE LIVE</span>
        <h3>Uniformità dei cataloghi e delle attività</h3>
        <p>Verifica tutti i valori realmente salvati su Supabase, distingue il nome leggibile dal codice tecnico e propone unificazioni conservative. Nessun valore viene cancellato.</p>
      </div>
      <button type="button" className="core-primary-button" onClick={onRefresh} disabled={loading || busy}>{loading ? "Analisi Supabase…" : "Analizza cataloghi"}</button>
    </div>

    <div className="core-uniformity-rule">
      <strong>Regola inderogabile</strong>
      <span>Codice inventario escluso · nessuna cancellazione · alias e storico sempre conservati · valori simili solo con controllo umano.</span>
    </div>

    {loading && !audit ? <div className="core-quality-loading">Lettura dei dizionari, dei valori, delle relazioni e degli utilizzi operativi…</div> : <>
      <div className="core-quality-summary core-uniformity-summary">
        <article><span>Cataloghi analizzati</span><strong>{formatCount(summary.dizionari_analizzati)}</strong><small>direttamente da Supabase</small></article>
        <article><span>Valori controllati</span><strong>{formatCount(summary.valori_analizzati)}</strong><small>attivi e storici</small></article>
        <article className={Number(summary.gruppi_duplicati_esatti || 0) ? "is-warning" : "is-ok"}><span>Duplicati esatti</span><strong>{formatCount(summary.gruppi_duplicati_esatti)}</strong><small>unificabili come alias</small></article>
        <article className={Number(summary.possibili_duplicati || 0) ? "is-warning" : "is-ok"}><span>Simili da verificare</span><strong>{formatCount(summary.possibili_duplicati)}</strong><small>mai automatici</small></article>
        <article className={Number(summary.etichette_tecniche || 0) ? "is-warning" : "is-ok"}><span>Nomi da correggere</span><strong>{formatCount(summary.etichette_tecniche)}</strong><small>codice mostrato al posto del nome</small></article>
      </div>

      <div className="core-quality-actions core-uniformity-action">
        <div>
          <strong>Unificazione sicura dei soli duplicati esatti</strong>
          <span>Il canonico viene scelto in base a stato, utilizzo e leggibilità. Le vecchie voci diventano alias storici e le relazioni vengono migrate.</span>
        </div>
        <button type="button" onClick={onPreviewExact} disabled={busy || !exact.length}>Anteprima unificazioni</button>
        {canManage && mergePreview && <button type="button" className="core-danger-safe-button" onClick={onApplyExact} disabled={busy || !exactPlan.length}>Unifica {exactPlan.length} gruppi</button>}
      </div>

      {mergePreview && <div className="core-quality-preview core-uniformity-preview">
        <div className="core-section-heading"><h3>Piano non distruttivo</h3><span>{exactPlan.length} gruppi</span></div>
        <p>{mergePreview.criterio}</p>
        <div className="core-uniformity-proposals">
          {exactPlan.slice(0, 100).map((item, index) => <div className="core-uniformity-proposal" key={`${item.dizionario}-${item.chiave_etichetta}-${index}`}>
            <button type="button" className="core-uniformity-dictionary" onClick={() => onOpenDictionary?.(item.dizionario)}>{item.dizionario_label || item.dizionario}</button>
            <ValueLabel value={item.canonico_proposto} />
            <span className="core-uniformity-arrow">←</span>
            <span className="core-uniformity-aliases">{(item.alias_proposti || []).map(alias => <ValueLabel key={alias.id || alias.codice} value={alias} />)}</span>
          </div>)}
          {!exactPlan.length && <div className="core-empty-state">Nessun duplicato esatto da unificare.</div>}
        </div>
      </div>}

      <div className="core-uniformity-catalogs">
        <div className="core-section-heading"><h3>Situazione per catalogo</h3><span>{dictionaries.length}</span></div>
        <div className="core-uniformity-catalog-grid">
          {dictionaries.map(item => <button type="button" key={item.codice} className={`core-uniformity-catalog-card ${item.duplicati_esatti || item.possibili_duplicati || item.etichette_tecniche ? "has-findings" : "is-clean"}`} onClick={() => onOpenDictionary?.(item.codice)}>
            <span>{item.etichetta}</span>
            <code>{item.codice}</code>
            <strong>{formatCount(item.valori)} valori</strong>
            <small>{formatCount(item.duplicati_esatti)} esatti · {formatCount(item.possibili_duplicati)} simili · {formatCount(item.etichette_tecniche)} nomi tecnici</small>
          </button>)}
        </div>
      </div>

      <div className="core-uniformity-findings">
        <div>
          <div className="core-section-heading"><h3>Duplicati esatti</h3><span>{exact.length}</span></div>
          <div className="core-uniformity-list">
            {exact.slice(0, 100).map((item, index) => <button type="button" key={`${item.dizionario}-${index}`} onClick={() => onOpenDictionary?.(item.dizionario)}>
              <b>{item.dizionario_label || item.dizionario}</b>
              <span>{item.canonico_proposto?.etichetta}</span>
              <small>{(item.alias_proposti || []).length} alias · {formatCount(item.occorrenze_totali)} utilizzi</small>
            </button>)}
            {!exact.length && <div className="core-empty-state">Nessun duplicato esatto.</div>}
          </div>
        </div>
        <div>
          <div className="core-section-heading"><h3>Somiglianze da controllare</h3><span>{similar.length}</span></div>
          <div className="core-uniformity-list">
            {similar.slice(0, 100).map((item, index) => <button type="button" key={`${item.dizionario}-${index}`} onClick={() => onOpenDictionary?.(item.dizionario)}>
              <b>{item.dizionario_label || item.dizionario}</b>
              <span>{item.canonico_proposto?.etichetta} ↔ {item.possibile_alias?.etichetta}</span>
              <small>somiglianza {item.similarita}% · controllo manuale</small>
            </button>)}
            {!similar.length && <div className="core-empty-state">Nessuna somiglianza sospetta.</div>}
          </div>
        </div>
      </div>

      {technical.length > 0 && <div className="core-uniformity-technical">
        <div className="core-section-heading"><h3>Etichette tecniche o numerate</h3><span>{technical.length}</span></div>
        <p>Il codice progressivo può restare stabile, ma nei menu deve comparire il nome leggibile inserito dall’amministratore.</p>
        <div className="core-uniformity-list">
          {technical.slice(0, 150).map((item, index) => <button type="button" key={`${item.dizionario}-${item.id || index}`} onClick={() => onOpenDictionary?.(item.dizionario)}>
            <b>{item.dizionario_label || item.dizionario}</b>
            <span>{item.etichetta || "Etichetta mancante"}</span>
            <small>codice {item.codice || "—"} · {formatCount(item.occorrenze)} utilizzi</small>
          </button>)}
        </div>
      </div>}

      <div className="core-uniformity-excluded">
        <strong>Esclusioni applicate</strong>
        <span>{excluded.length ? excluded.map(item => item.descrizione || item.codice).join(", ") : "Codice inventario non presente tra i cataloghi letti"}</span>
      </div>
    </>}
  </section>;
}
