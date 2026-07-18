export default function ProcessiControls({
  loading,
  onRefresh,
  stats,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) {
  return (
    <section className="fmed-process-controls" aria-label="Controlli processi">
      <div className="fmed-process-control-summary">
        <article><span>Disponibili</span><strong>{stats.available}</strong><small>procedure guidate</small></article>
        <article><span>In corso</span><strong>{stats.running}</strong><small>aperte o in lavorazione</small></article>
        <article><span>Completati</span><strong>{stats.completed}</strong><small>ultime 100 esecuzioni</small></article>
        <article><span>Errori</span><strong>{stats.errors}</strong><small>errori o da verificare</small></article>
      </div>

      <div className="fmed-process-control-bar">
        <label className="fmed-process-search-field">
          <span>Cerca nel registro</span>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Processo, passaggio, utente o riferimento…"
          />
        </label>
        <label className="fmed-process-status-field">
          <span>Stato</span>
          <select value={statusFilter} onChange={(event) => onStatusFilterChange(event.target.value)}>
            <option value="TUTTI">Tutti gli stati</option>
            <option value="BOZZA">Bozza</option>
            <option value="APERTO">Aperti</option>
            <option value="ASSEGNATO">Assegnati</option>
            <option value="IN_CORSO">In corso</option>
            <option value="IN_ATTESA">In attesa</option>
            <option value="DA_VERIFICARE">Da verificare</option>
            <option value="COMPLETATO">Completati</option>
            <option value="RIAPERTO">Riaperti</option>
            <option value="ERRORE">Errori</option>
            <option value="ANNULLATO">Annullati</option>
          </select>
        </label>
        <button type="button" className="fmed-process-refresh" onClick={onRefresh} disabled={loading}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5M6.2 8.2A7 7 0 0 1 18.7 7M17.8 15.8A7 7 0 0 1 5.3 17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>{loading ? "Aggiornamento…" : "Aggiorna stato"}</span>
        </button>
      </div>
    </section>
  );
}
