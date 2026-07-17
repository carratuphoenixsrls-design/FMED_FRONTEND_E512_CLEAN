import { useEffect, useMemo, useState } from "react";
import { chiaveSedeCanonica, etichettaSedeCanonica, listaSediCanoniche } from "../../fmedStandard.js";

const normalize = (value) => String(value || "").trim().toLocaleLowerCase("it-IT");

function assetSummary(row) {
  return [row?.costruttore, row?.modello, row?.matricola].filter(Boolean).join(" · ") || "Dati tecnici non disponibili";
}

function assetLocation(row) {
  return [etichettaSedeCanonica(row?.sede), row?.reparto, row?.locazione].filter(Boolean).join(" · ") || "Collocazione non disponibile";
}

export default function NewInterventionAssetPicker({ cespiti = [], selectedCode = "", onSelect }) {
  const [search, setSearch] = useState("");
  const [site, setSite] = useState("TUTTE");
  const [type, setType] = useState("TUTTE");
  const [selectionMode, setSelectionMode] = useState(!selectedCode);

  const sites = useMemo(() => listaSediCanoniche((cespiti || []).map((row) => row?.sede), { includeUnknown: true }), [cespiti]);
  const types = useMemo(() => [...new Set((cespiti || []).map((row) => String(row?.tipologia || row?.categoria || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, "it")), [cespiti]);

  const selected = useMemo(
    () => (cespiti || []).find((row) => String(row?.codicestrumento || "").trim() === String(selectedCode || "").trim()) || null,
    [cespiti, selectedCode]
  );

  useEffect(() => {
    if (!selectedCode) setSelectionMode(true);
  }, [selectedCode]);

  const hasActiveQuery = search.trim().length >= 2 || site !== "TUTTE" || type !== "TUTTE";

  const allMatches = useMemo(() => {
    if (!hasActiveQuery) return [];
    const query = normalize(search);
    return (cespiti || []).filter((row) => {
      if (site !== "TUTTE" && (chiaveSedeCanonica(row?.sede) || String(row?.sede || "").trim()) !== (chiaveSedeCanonica(site) || site)) return false;
      const rowType = String(row?.tipologia || row?.categoria || "");
      if (type !== "TUTTE" && rowType !== type) return false;
      if (!query) return true;
      const haystack = normalize([
        row?.codicestrumento,
        row?.tipologia,
        row?.categoria,
        row?.costruttore,
        row?.modello,
        row?.matricola,
        row?.sede,
        row?.reparto,
        row?.locazione,
        row?.societa,
      ].join(" "));
      return haystack.includes(query);
    });
  }, [cespiti, hasActiveQuery, search, site, type]);

  const results = useMemo(() => allMatches.slice(0, 12), [allMatches]);

  const resetSearch = () => {
    setSearch("");
    setSite("TUTTE");
    setType("TUTTE");
  };

  const chooseAsset = (row) => {
    onSelect?.(row);
    setSelectionMode(false);
  };

  if (selected && !selectionMode) {
    return (
      <section className="fmed-intervention-selected-summary" aria-label="Cespite selezionato per il nuovo intervento">
        <div className="fmed-intervention-selected-summary-copy">
          <span>Passaggio 1 completato</span>
          <h3>{selected.codicestrumento || "Cespite selezionato"} · {selected.tipologia || selected.categoria || "Asset"}</h3>
          <p>{assetSummary(selected)}</p>
          <small>{assetLocation(selected)}</small>
        </div>
        <button type="button" className="fmed-btn-secondary" onClick={() => setSelectionMode(true)}>
          Cambia cespite
        </button>
      </section>
    );
  }

  return (
    <section className="fmed-intervention-asset-picker" aria-label="Selezione cespite per nuovo intervento">
      <div className="fmed-intervention-asset-picker-head">
        <div>
          <span>Passaggio 1</span>
          <h3>Trova e seleziona il cespite</h3>
          <p>Scrivi almeno due caratteri oppure restringi per sede o tipologia. FMED mostrerà solo i risultati pertinenti.</p>
        </div>
        {selected && (
          <div className="fmed-intervention-selected-asset">
            <small>Selezione attuale</small>
            <strong>{selected.codicestrumento}</strong>
            <span>{selected.tipologia || selected.categoria || "Asset"} · {selected.sede || "Sede non indicata"}</span>
          </div>
        )}
      </div>

      <div className="fmed-intervention-asset-picker-filters">
        <label>
          <span>Ricerca cespite</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nome, codice, matricola, modello, costruttore…"
            autoFocus
          />
        </label>
        <label>
          <span>Sede</span>
          <select value={site} onChange={(event) => setSite(event.target.value)}>
            <option value="TUTTE">Tutte le sedi</option>
            {sites.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label>
          <span>Tipologia / categoria</span>
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="TUTTE">Tutte le tipologie</option>
            {types.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>

      <div className="fmed-intervention-search-meta" aria-live="polite">
        <span>{hasActiveQuery ? `${allMatches.length.toLocaleString("it-IT")} cespiti trovati` : "Avvia la ricerca per vedere i cespiti"}</span>
        {(search || site !== "TUTTE" || type !== "TUTTE") && <button type="button" onClick={resetSearch}>Azzera ricerca</button>}
      </div>

      <div className="fmed-intervention-asset-results" role="listbox" aria-label="Risultati cespiti">
        {!hasActiveQuery && <div className="fmed-intervention-asset-empty">Inserisci almeno due caratteri nel campo ricerca, oppure seleziona una sede o una tipologia.</div>}
        {hasActiveQuery && results.length === 0 && <div className="fmed-intervention-asset-empty">Nessun cespite corrisponde ai filtri. Prova a ridurre il testo o azzera la ricerca.</div>}
        {results.map((row) => {
          const code = String(row?.codicestrumento || "");
          const active = code === String(selectedCode || "");
          return (
            <button
              type="button"
              key={code || `${row?.matricola}-${row?.modello}`}
              className={active ? "is-selected" : ""}
              onClick={() => chooseAsset(row)}
              role="option"
              aria-selected={active}
            >
              <strong>{code || "Senza codice"}</strong>
              <span>{row?.tipologia || row?.categoria || "Asset non classificato"}</span>
              <small>{assetSummary(row)}</small>
              <em>{assetLocation(row)}</em>
            </button>
          );
        })}
      </div>

      {allMatches.length > results.length && <div className="fmed-intervention-result-limit">Sono mostrati i primi {results.length} risultati. Restringi la ricerca per trovare il cespite corretto.</div>}

      <div className="fmed-intervention-asset-picker-note">
        Dopo la selezione, FMED compila sede, reparto, locazione, costruttore, modello e matricola. Potrai verificarli prima del salvataggio.
      </div>
    </section>
  );
}
