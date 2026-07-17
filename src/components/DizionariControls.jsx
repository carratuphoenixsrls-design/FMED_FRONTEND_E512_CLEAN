export default function DizionariControls({
  tab,
  onTabChange,
  dictionarySearch,
  onDictionarySearchChange,
  valueSearch,
  onValueSearchChange,
  showInactive,
  onShowInactiveChange,
}) {
  const dictionariesActive = tab === "DIZIONARI";
  const relationsActive = tab === "RELAZIONI";
  const qualityActive = tab === "QUALITA";

  return (
    <section className="core-controls" aria-label="Controlli Master Data">
      <div className="core-standard-tabs" role="tablist" aria-label="Sezioni Master Data">
        <button
          type="button"
          role="tab"
          aria-selected={dictionariesActive}
          className={dictionariesActive ? "active" : ""}
          onClick={() => onTabChange("DIZIONARI")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>Dizionari</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={relationsActive}
          className={relationsActive ? "active" : ""}
          onClick={() => onTabChange("RELAZIONI")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6h4v4H6zM14 14h4v4h-4zM10 8h4v8M8 10v5h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>Relazioni intelligenti</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={qualityActive}
          className={qualityActive ? "active" : ""}
          onClick={() => onTabChange("QUALITA")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4.5 6v5.5c0 4.5 3.1 7.8 7.5 9.5 4.4-1.7 7.5-5 7.5-9.5V6L12 3Zm-3 9 2 2 4-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>Qualità dati</span>
        </button>
      </div>

      {!qualityActive && <div className="core-toolbar">
        <label className="core-search-field">
          <span>{dictionariesActive ? "Trova dizionario" : "Trova relazione"}</span>
          <input
            value={dictionariesActive ? dictionarySearch : valueSearch}
            onChange={(event) => dictionariesActive ? onDictionarySearchChange(event.target.value) : onValueSearchChange(event.target.value)}
            placeholder={dictionariesActive ? "Cerca per nome o codice…" : "Cerca per tipo, origine o destinazione…"}
          />
        </label>
        {dictionariesActive && (
          <label className="core-search-field">
            <span>Cerca nei valori</span>
            <input
              value={valueSearch}
              onChange={(event) => onValueSearchChange(event.target.value)}
              placeholder="Codice o etichetta del valore…"
            />
          </label>
        )}
        <label className="core-inactive-toggle">
          <input type="checkbox" checked={showInactive} onChange={(event) => onShowInactiveChange(event.target.checked)} />
          <span>Mostra disattivati</span>
        </label>
      </div>}
    </section>
  );
}
