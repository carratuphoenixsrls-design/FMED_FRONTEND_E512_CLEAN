function ScadenzeSelect({ ariaLabel, value, onChange, style, children }) {
  return (
    <select aria-label={ariaLabel} value={value} onChange={onChange} style={style}>
      {children}
    </select>
  );
}

function ScadenzeDateField({ ariaLabel, label, value, onChange, styles }) {
  return (
    <div style={styles.scadenzeDateFilterGroup}>
      <span style={styles.scadenzeDateFilterLabel}>{label}</span>
      <input
        aria-label={ariaLabel}
        type="date"
        value={value}
        onChange={onChange}
        style={styles.scadenzeInput}
      />
    </div>
  );
}

export default function ScadenzeControls(props) {
  const {
    styles,
    scadenzeVisualizzate,
    scadenzeSelezionateVisualizzate,
    filtroScadenze,
    setFiltroScadenze,
    filtroScadenzeModulo,
    setFiltroScadenzeModulo,
    listaModuliFiltroScadenze,
    setScadenzeElencoAperto,
    filtroScadenzeCodice,
    setFiltroScadenzeCodice,
    listaCodiciFiltroScadenze,
    filtroScadenzeSede,
    setFiltroScadenzeSede,
    listaSediFiltroScadenze,
    filtroScadenzeTipologia,
    setFiltroScadenzeTipologia,
    listaTipologieFiltroScadenze,
    filtroScadenzeAttivita,
    setFiltroScadenzeAttivita,
    listaAttivitaFiltroScadenze,
    filtroScadenzeDitta,
    setFiltroScadenzeDitta,
    listaDitteFiltroScadenze,
    normalizzaSocietaDitta,
    ordineScadenze,
    setOrdineScadenze,
    filtroScadenzeProssimaDa,
    setFiltroScadenzeProssimaDa,
    filtroScadenzeProssimaA,
    setFiltroScadenzeProssimaA,
    scadenzeElencoAperto,
    selezionaTutteScadenzeVisualizzate,
    deselezionaTutteScadenze,
    resetFiltriScadenze,
    esportaScadenzePdf,
  } = props;

  const aggiornaFiltro = (setter) => (event) => {
    setter(event.target.value);
    setScadenzeElencoAperto(false);
  };

  return (
    <div style={styles.scadenzeFiltersPanel}>
      <div style={styles.scadenzeFiltersHeader}>
        <div>
          <h3 style={styles.scadenzeSectionTitle}>Filtri scadenze</h3>
          <p style={styles.scadenzeSectionSubtitle}>
            Il Motore Cicli E5.2 mostra una sola scadenza operativa per elemento e famiglia. Le attività precedenti restano soltanto nello storico.
          </p>
        </div>
        <div style={styles.scadenzeFilterChips}>
          <span style={styles.scadenzeChip}>Visibili: {scadenzeVisualizzate.length}</span>
          <span style={styles.scadenzeChip}>Selezionate: {scadenzeSelezionateVisualizzate.length}</span>
        </div>
      </div>

      <div style={styles.scadenzeFiltersGrid}>
        <ScadenzeSelect
          ariaLabel="Filtra scadenze per stato"
          value={filtroScadenze}
          onChange={aggiornaFiltro(setFiltroScadenze)}
          style={styles.scadenzeSelectLarge}
        >
          <option value="TUTTE">Tutti gli stati</option>
          <option value="SCADUTA">Scadute</option>
          <option value="30_GIORNI">Entro 30 giorni</option>
          <option value="60_GIORNI">Da 31 a 60 giorni</option>
          <option value="REGOLARE">Future / regolari</option>
          <option value="DA_PIANIFICARE">Da pianificare</option>
          <option value="NON_DISPONIBILE">Data non disponibile</option>
        </ScadenzeSelect>

        <ScadenzeSelect
          ariaLabel="Filtra scadenze per modulo"
          value={filtroScadenzeModulo}
          onChange={aggiornaFiltro(setFiltroScadenzeModulo)}
          style={styles.scadenzeSelectLarge}
        >
          <option value="TUTTI">Tutti i moduli</option>
          {listaModuliFiltroScadenze.map((modulo) => <option key={modulo} value={modulo}>{modulo.replaceAll("_", " ")}</option>)}
        </ScadenzeSelect>

        <ScadenzeSelect
          ariaLabel="Filtra scadenze per elemento"
          value={filtroScadenzeCodice}
          onChange={aggiornaFiltro(setFiltroScadenzeCodice)}
          style={styles.scadenzeSelectLarge}
        >
          <option value="TUTTE">Tutti gli elementi</option>
          {listaCodiciFiltroScadenze.map((codice) => <option key={codice} value={codice}>{codice}</option>)}
        </ScadenzeSelect>

        <ScadenzeSelect
          ariaLabel="Filtra scadenze per sede"
          value={filtroScadenzeSede}
          onChange={aggiornaFiltro(setFiltroScadenzeSede)}
          style={styles.scadenzeSelectLarge}
        >
          <option value="TUTTE">Tutte le sedi</option>
          {listaSediFiltroScadenze.map((sede) => <option key={sede} value={sede}>{sede}</option>)}
        </ScadenzeSelect>

        <ScadenzeSelect
          ariaLabel="Filtra scadenze per tipologia"
          value={filtroScadenzeTipologia}
          onChange={aggiornaFiltro(setFiltroScadenzeTipologia)}
          style={styles.scadenzeSelectLarge}
        >
          <option value="TUTTE">Tutte le tipologie</option>
          {listaTipologieFiltroScadenze.map((tipologia) => <option key={tipologia} value={tipologia}>{tipologia}</option>)}
        </ScadenzeSelect>

        <ScadenzeSelect
          ariaLabel="Filtra scadenze per attività"
          value={filtroScadenzeAttivita}
          onChange={aggiornaFiltro(setFiltroScadenzeAttivita)}
          style={styles.scadenzeSelectLarge}
        >
          <option value="TUTTE">Tutte le attività</option>
          {listaAttivitaFiltroScadenze.map((attivita) => <option key={attivita} value={attivita}>{attivita}</option>)}
        </ScadenzeSelect>

        <ScadenzeSelect
          ariaLabel="Filtra scadenze per ditta esecutrice"
          value={filtroScadenzeDitta}
          onChange={aggiornaFiltro(setFiltroScadenzeDitta)}
          style={styles.scadenzeSelectLarge}
        >
          <option value="TUTTE">Tutte le ditte</option>
          {listaDitteFiltroScadenze.map((ditta) => (
            <option key={ditta} value={ditta}>{normalizzaSocietaDitta(ditta)}</option>
          ))}
        </ScadenzeSelect>

        <ScadenzeSelect
          ariaLabel="Ordina scadenze"
          value={ordineScadenze}
          onChange={(event) => setOrdineScadenze(event.target.value)}
          style={styles.scadenzeSelectLarge}
        >
          <option value="SCADENZA_ASC">Scadenza più vicina</option>
          <option value="SCADENZA_DESC">Scadenza più lontana</option>
          <option value="CODICE_ASC">Codice crescente</option>
          <option value="CODICE_DESC">Codice decrescente</option>
        </ScadenzeSelect>

        <ScadenzeDateField
          ariaLabel="Scadenza da"
          label="Scadenza da"
          value={filtroScadenzeProssimaDa}
          onChange={(event) => setFiltroScadenzeProssimaDa(event.target.value)}
          styles={styles}
        />
        <ScadenzeDateField
          ariaLabel="Scadenza a"
          label="Scadenza a"
          value={filtroScadenzeProssimaA}
          onChange={(event) => setFiltroScadenzeProssimaA(event.target.value)}
          styles={styles}
        />
      </div>

      <div style={styles.scadenzeActionsBar}>
        <button type="button" style={styles.scadenzePrimaryAction} onClick={() => setScadenzeElencoAperto((value) => !value)}>
          {scadenzeElencoAperto ? "▲ Nascondi elenco" : `📋 Apri elenco filtrato (${scadenzeVisualizzate.length})`}
        </button>
        <button type="button" style={styles.scadenzeSecondaryAction} onClick={selezionaTutteScadenzeVisualizzate}>
          ✅ Seleziona visibili
        </button>
        <button type="button" style={styles.scadenzeGhostAction} onClick={deselezionaTutteScadenze}>
          ⬜ Deseleziona
        </button>
        <button type="button" style={styles.scadenzeGhostAction} onClick={resetFiltriScadenze}>
          🔄 Reset filtri
        </button>
        <button
          type="button"
          style={{
            ...styles.scadenzeGhostAction,
            opacity: scadenzeSelezionateVisualizzate.length === 0 ? 0.55 : 1,
          }}
          onClick={esportaScadenzePdf}
          disabled={scadenzeSelezionateVisualizzate.length === 0}
        >
          📄 PDF selezionate ({scadenzeSelezionateVisualizzate.length})
        </button>
      </div>
    </div>
  );
}
