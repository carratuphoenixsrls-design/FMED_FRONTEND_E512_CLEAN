function InfrastruttureSelect({ ariaLabel, value, onChange, style, children }) {
  return (
    <select aria-label={ariaLabel} value={value} onChange={onChange} style={style}>
      {children}
    </select>
  );
}

function InfrastruttureDateField({ ariaLabel, title, value, onChange, style }) {
  return (
    <input
      aria-label={ariaLabel}
      type="date"
      value={value}
      onChange={onChange}
      style={style}
      title={title}
    />
  );
}

export default function InfrastruttureControls(props) {
  const {
    styles,
    infraOk,
    infraInScadenza,
    infraScadute,
    ricercaInfra,
    setRicercaInfra,
    filtroInfraSede,
    setFiltroInfraSede,
    listaInfraSedi,
    filtroInfraCategoria,
    setFiltroInfraCategoria,
    listaInfraCategorie,
    filtroInfraStato,
    setFiltroInfraStato,
    filtroInfraDitta,
    setFiltroInfraDitta,
    listaInfraDitte,
    filtroInfraPeriodicita,
    setFiltroInfraPeriodicita,
    listaInfraPeriodicita,
    filtroInfraPriorita,
    setFiltroInfraPriorita,
    listaInfraPriorita,
    filtroInfraResponsabile,
    setFiltroInfraResponsabile,
    listaInfraResponsabili,
    filtroInfraCentroCosto,
    setFiltroInfraCentroCosto,
    listaInfraCentriCosto,
    filtroInfraSocieta,
    setFiltroInfraSocieta,
    listaInfraSocieta,
    filtroInfraProssimaDa,
    setFiltroInfraProssimaDa,
    filtroInfraProssimaA,
    setFiltroInfraProssimaA,
    permessiRuoloFmed,
    apriNuovaInfrastruttura,
    caricaInfrastruttureOnDemand,
    infrastruttureLoading,
    resetFiltriInfrastrutture,
  } = props;

  const refreshInfrastrutture = () => caricaInfrastruttureOnDemand({ force: true });

  return (
    <div style={styles.assetFiltersPanel}>
      <div style={styles.assetFiltersHeader}>
        <div>
          <h3 style={styles.assetSectionTitle}>Filtri infrastrutture</h3>
          <p style={styles.assetSectionSubtitle}>
            Ricerca e filtri operativi per sede, categoria, stato, ditta, periodicità e prossima scadenza.
          </p>
        </div>
        <div style={styles.assetFilterChips}>
          <span style={styles.assetChip}>OK: {infraOk.length}</span>
          <span style={styles.assetChip}>In scadenza: {infraInScadenza.length}</span>
          <span style={styles.assetChip}>Scadute: {infraScadute.length}</span>
        </div>
      </div>

      <div style={styles.assetFiltersGrid}>
        <input
          aria-label="Ricerca infrastrutture"
          value={ricercaInfra}
          onChange={(event) => setRicercaInfra(event.target.value)}
          placeholder="Cerca impianto, ditta, attività, note..."
          style={styles.assetInputLarge || styles.input}
        />

        <InfrastruttureSelect
          ariaLabel="Filtra infrastrutture per sede"
          value={filtroInfraSede}
          onChange={(event) => setFiltroInfraSede(event.target.value)}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTE">Tutte le sedi</option>
          {listaInfraSedi.map((item) => <option key={item} value={item}>{item}</option>)}
        </InfrastruttureSelect>

        <InfrastruttureSelect
          ariaLabel="Filtra infrastrutture per categoria"
          value={filtroInfraCategoria}
          onChange={(event) => setFiltroInfraCategoria(event.target.value)}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTE">Tutte le categorie</option>
          {listaInfraCategorie.map((item) => <option key={item} value={item}>{item}</option>)}
        </InfrastruttureSelect>

        <InfrastruttureSelect
          ariaLabel="Filtra infrastrutture per stato"
          value={filtroInfraStato}
          onChange={(event) => setFiltroInfraStato(event.target.value)}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTE">Tutti gli stati</option>
          <option value="SCADUTA">Scadute</option>
          <option value="30_GIORNI">In scadenza</option>
          <option value="OK">OK</option>
          <option value="DA_VERIFICARE">Da verificare</option>
        </InfrastruttureSelect>

        <InfrastruttureSelect
          ariaLabel="Filtra infrastrutture per ditta"
          value={filtroInfraDitta}
          onChange={(event) => setFiltroInfraDitta(event.target.value)}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTE">Tutte le ditte</option>
          {listaInfraDitte.map((item) => <option key={item} value={item}>{item}</option>)}
        </InfrastruttureSelect>

        <InfrastruttureSelect
          ariaLabel="Filtra infrastrutture per periodicità"
          value={filtroInfraPeriodicita}
          onChange={(event) => setFiltroInfraPeriodicita(event.target.value)}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTE">Tutte le periodicità</option>
          {listaInfraPeriodicita.map((item) => <option key={item} value={item}>{item}</option>)}
        </InfrastruttureSelect>

        <InfrastruttureSelect
          ariaLabel="Filtra infrastrutture per priorità"
          value={filtroInfraPriorita}
          onChange={(event) => setFiltroInfraPriorita(event.target.value)}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTE">Tutte le priorità</option>
          {listaInfraPriorita.map((item) => <option key={item} value={item}>{item}</option>)}
        </InfrastruttureSelect>

        <InfrastruttureSelect
          ariaLabel="Filtra infrastrutture per responsabile"
          value={filtroInfraResponsabile}
          onChange={(event) => setFiltroInfraResponsabile(event.target.value)}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTE">Tutti i responsabili</option>
          {listaInfraResponsabili.map((item) => <option key={item} value={item}>{item}</option>)}
        </InfrastruttureSelect>

        <InfrastruttureSelect
          ariaLabel="Filtra infrastrutture per centro di costo"
          value={filtroInfraCentroCosto}
          onChange={(event) => setFiltroInfraCentroCosto(event.target.value)}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTE">Tutti i centri di costo</option>
          {listaInfraCentriCosto.map((item) => <option key={item} value={item}>{item}</option>)}
        </InfrastruttureSelect>

        <InfrastruttureSelect
          ariaLabel="Filtra infrastrutture per società"
          value={filtroInfraSocieta}
          onChange={(event) => setFiltroInfraSocieta(event.target.value)}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTE">Tutte le società</option>
          {listaInfraSocieta.map((item) => <option key={item} value={item}>{item}</option>)}
        </InfrastruttureSelect>

        <InfrastruttureDateField
          ariaLabel="Prossima scadenza infrastruttura da"
          title="Prossima scadenza da"
          value={filtroInfraProssimaDa}
          onChange={(event) => setFiltroInfraProssimaDa(event.target.value)}
          style={styles.input}
        />

        <InfrastruttureDateField
          ariaLabel="Prossima scadenza infrastruttura a"
          title="Prossima scadenza a"
          value={filtroInfraProssimaA}
          onChange={(event) => setFiltroInfraProssimaA(event.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.assetActionsBar}>
        {permessiRuoloFmed.canEdit && (
          <button type="button" style={styles.assetPrimaryAction} onClick={apriNuovaInfrastruttura}>
            ➕ Nuova infrastruttura
          </button>
        )}
        <button
          type="button"
          style={styles.assetSecondaryAction}
          onClick={refreshInfrastrutture}
          disabled={infrastruttureLoading}
        >
          {infrastruttureLoading ? "⏳ Aggiornamento..." : "🔄 Aggiorna da backend"}
        </button>
        <button type="button" style={styles.assetGhostAction} onClick={resetFiltriInfrastrutture}>
          ♻️ Reset filtri
        </button>
      </div>
    </div>
  );
}
