import FmedModuleIcon from "../FmedModuleIcon.jsx";
export default function Sicurezza8108Controls({
  buildOpenUrl,
  load,
  refreshing,
  search,
  setSearch,
  sede,
  setSede,
  categoria,
  setCategoria,
  sedi,
  categorie,
  resetFilters,
  filteredCount,
}) {
  const hasActiveFilters = Boolean(search.trim()) || sede !== "TUTTE" || categoria !== "TUTTE";

  return (
    <>
      <header className="s8108-page-head">
        <div className="s8108-heading-block">
          <FmedModuleIcon module="Sicurezza" className="s8108-heading-icon" />
          <div>
            <span className="s8108-eyebrow">COMPLIANCE · D.LGS. 81/08</span>
            <h1>Sicurezza 81/08</h1>
            <p>
              Archivio documentale organizzato per sede e categoria. Le scadenze sono gestite esclusivamente nel modulo Scadenze.
            </p>
          </div>
        </div>
        <div className="s8108-head-actions">
          <a
            href={buildOpenUrl()}
            target="_blank"
            rel="noreferrer"
            className="s8108-btn primary"
          >
            Apri SharePoint
          </a>
          <button
            type="button"
            className="s8108-btn"
            onClick={() => load({ silent: true })}
            disabled={refreshing}
          >
            {refreshing ? "Aggiornamento…" : "Aggiorna indice"}
          </button>
        </div>
      </header>

      <div className="s8108-panel s8108-filters">
        <div className="s8108-panel-head compact">
          <div>
            <h2>Filtri documentali</h2>
            <p>Ricerca rapida per nome, percorso, sede e categoria.</p>
          </div>
          <div className="s8108-filter-summary">
            <span className="s8108-result-count">{filteredCount} elementi</span>
            <button
              type="button"
              className="s8108-btn subtle"
              onClick={resetFilters}
              disabled={!hasActiveFilters}
            >
              Azzera filtri
            </button>
          </div>
        </div>
        <div className="s8108-filter-grid">
          <label className="wide">
            <span>Ricerca</span>
            <input
              aria-label="Cerca documenti Sicurezza 81/08"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nome documento, percorso o cartella…"
              autoComplete="off"
            />
          </label>
          <label>
            <span>Sede</span>
            <select
              aria-label="Filtra documenti 81/08 per sede"
              value={sede}
              onChange={(event) => setSede(event.target.value)}
            >
              <option value="TUTTE">Tutte le sedi</option>
              {sedi.map((item) => (
                <option key={item.codice} value={item.codice}>{item.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Categoria</span>
            <select
              aria-label="Filtra documenti 81/08 per categoria"
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            >
              <option value="TUTTE">Tutte le categorie</option>
              {categorie.map((item) => (
                <option key={item.codice} value={item.codice}>{item.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </>
  );
}
