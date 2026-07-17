function InterventiSelect({ ariaLabel, value, onChange, style, children }) {
  return (
    <select className="fmed-interventi-select" aria-label={ariaLabel} value={value} onChange={onChange} style={style}>
      {children}
    </select>
  );
}

function InterventiDateField({ label, value, onChange, styles }) {
  return (
    <div className="fmed-interventi-date-field" style={styles.interventiDateFilterGroup}>
      <span style={styles.interventiDateFilterLabel}>{label}</span>
      <input type="date" value={value} onChange={onChange} style={styles.input} />
    </div>
  );
}

export default function InterventiControls(props) {
  const {
    styles,
    interventiFiltrati,
    apriNuovoIntervento,
    ricercaCespiteIntervento,
    setRicercaCespiteIntervento,
    cespitiPerNuovoIntervento,
    apriSchedaCespite,
    labelPeriodoContabileInterventi,
    filtroInterventiCodice,
    setFiltroInterventiCodice,
    setInterventiElencoAperto,
    listaCodiciFiltroInterventi,
    filtroInterventiSede,
    setFiltroInterventiSede,
    listaSediInterventi,
    filtroInterventiSocieta,
    setFiltroInterventiSocieta,
    listaSocietaInterventi,
    filtroInterventiTipologia,
    setFiltroInterventiTipologia,
    listaTipologieFiltroInterventi,
    filtroInterventiAttivita,
    setFiltroInterventiAttivita,
    listaAttivitaFiltroInterventi,
    filtroInterventiAnnoContabile,
    setFiltroInterventiAnnoContabile,
    listaAnniContabiliInterventi,
    filtroInterventiPeriodoContabile,
    setFiltroInterventiPeriodoContabile,
    ordineInterventi,
    setOrdineInterventi,
    filtroInterventiPeriodoDa,
    setFiltroInterventiPeriodoDa,
    filtroInterventiPeriodoA,
    setFiltroInterventiPeriodoA,
    filtroInterventiUltimoDa,
    setFiltroInterventiUltimoDa,
    filtroInterventiUltimoA,
    setFiltroInterventiUltimoA,
    filtroInterventiProssimoDa,
    setFiltroInterventiProssimoDa,
    filtroInterventiProssimoA,
    setFiltroInterventiProssimoA,
    interventiElencoAperto,
    permessiRuoloFmed,
    setPagina,
    resetFiltriInterventi,
    esportaInterventiFiltratiPdf,
  } = props;

  const closeInterventiList = () => setInterventiElencoAperto(false);

  return (
    <>
      <div className="fmed-interventi-panel" style={styles.interventiPanel}>
        <div className="fmed-interventi-panel-head" style={styles.interventiPanelHeader}>
          <div>
            <h3 style={styles.interventiSectionTitle}>Cerca cespite</h3>
            <p style={styles.interventiSectionSubtitle}>
              Cerca un cespite e apri la scheda già pronta per aggiungere un intervento precompilato.
            </p>
          </div>
          <button
            type="button"
            style={styles.interventiGhostAction}
            onClick={() => apriNuovoIntervento(null)}
            title="Inserimento manuale senza preselezionare il cespite"
          >
            ➕ Inserimento manuale
          </button>
        </div>

        <div className="fmed-interventi-search-row" style={styles.interventiSearchRow}>
          <input
            aria-label="Cerca cespite per nuovo intervento"
            placeholder="Cerca cespite per codice, tipologia, modello, matricola o sede..."
            value={ricercaCespiteIntervento}
            onChange={(event) => setRicercaCespiteIntervento(event.target.value)}
            style={styles.interventiInputWide}
          />
          <button
            type="button"
            style={styles.interventiSearchButton}
            onClick={() => {}}
            title="La ricerca si aggiorna automaticamente mentre scrivi"
          >
            🔍 Cerca
          </button>
        </div>

        {ricercaCespiteIntervento.trim() && (
          <div className="fmed-interventi-smart-results" style={styles.interventiSmartResultsBox}>
            {cespitiPerNuovoIntervento.length === 0 ? (
              <p style={styles.muted}>Nessun cespite trovato.</p>
            ) : (
              cespitiPerNuovoIntervento.map((cespite) => (
                <div
                  key={cespite.codicestrumento}
                  className="fmed-interventi-smart-row"
                  style={styles.interventiSmartResultRow}
                  onClick={() => {
                    apriSchedaCespite(cespite);
                    setRicercaCespiteIntervento("");
                  }}
                  title="Apri scheda cespite per aggiungere un intervento precompilato"
                >
                  <strong style={styles.interventiSmartResultCode}>{cespite.codicestrumento}</strong>
                  <span>{cespite.tipologia || "-"}</span>
                  <span>{cespite.sede || "-"}</span>
                  <span>{cespite.reparto || "-"}</span>
                  <span>{cespite.costruttore || "-"}</span>
                  <span>{cespite.modello || "-"}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="fmed-interventi-panel" style={styles.interventiPanel}>
        <div className="fmed-interventi-panel-head" style={styles.interventiPanelHeader}>
          <div>
            <h3 style={styles.interventiSectionTitle}>Filtri interventi</h3>
            <p style={styles.interventiSectionSubtitle}>
              Filtri sempre visibili per consultare rapidamente lo storico interventi.
            </p>
          </div>
          <div style={styles.interventiFilterChips}>
            <span style={styles.interventiChip}>Periodo: {labelPeriodoContabileInterventi()}</span>
            <span style={styles.interventiChip}>Interventi: {interventiFiltrati.length}</span>
          </div>
        </div>

        <div className="fmed-interventi-filter-grid" style={styles.interventiFiltersGrid}>
          <InterventiSelect
            ariaLabel="Filtra interventi per codice cespite"
            value={filtroInterventiCodice}
            onChange={(event) => {
              setFiltroInterventiCodice(event.target.value);
              closeInterventiList();
            }}
            style={styles.interventiSelectLarge}
          >
            <option value="TUTTE">Tutti i codici</option>
            {listaCodiciFiltroInterventi.map((codice) => <option key={codice} value={codice}>{codice}</option>)}
          </InterventiSelect>

          <InterventiSelect
            ariaLabel="Filtra interventi per sede"
            value={filtroInterventiSede}
            onChange={(event) => {
              setFiltroInterventiSede(event.target.value);
              closeInterventiList();
            }}
            style={styles.interventiSelectLarge}
          >
            <option value="TUTTE">Tutte le sedi</option>
            {listaSediInterventi.map((sede) => <option key={sede} value={sede}>{sede}</option>)}
          </InterventiSelect>

          <InterventiSelect
            ariaLabel="Filtra interventi per società o ditta"
            value={filtroInterventiSocieta}
            onChange={(event) => {
              setFiltroInterventiSocieta(event.target.value);
              closeInterventiList();
            }}
            style={styles.interventiSelectLarge}
          >
            <option value="TUTTE">Tutte le società/ditte</option>
            {listaSocietaInterventi.map((societa) => <option key={societa} value={societa}>{societa}</option>)}
          </InterventiSelect>

          <InterventiSelect
            ariaLabel="Filtra interventi per tipologia"
            value={filtroInterventiTipologia}
            onChange={(event) => {
              setFiltroInterventiTipologia(event.target.value);
              closeInterventiList();
            }}
            style={styles.interventiSelectLarge}
          >
            <option value="TUTTE">Tutte le tipologie</option>
            {listaTipologieFiltroInterventi.map((tipologia) => <option key={tipologia} value={tipologia}>{tipologia}</option>)}
          </InterventiSelect>

          <InterventiSelect
            ariaLabel="Filtra interventi per attività"
            value={filtroInterventiAttivita}
            onChange={(event) => {
              setFiltroInterventiAttivita(event.target.value);
              closeInterventiList();
            }}
            style={styles.interventiSelectLarge}
          >
            <option value="TUTTE">Tutte le attività</option>
            {listaAttivitaFiltroInterventi.map((attivita) => <option key={attivita} value={attivita}>{attivita}</option>)}
          </InterventiSelect>

          <InterventiSelect
            ariaLabel="Filtra interventi per anno contabile"
            value={filtroInterventiAnnoContabile}
            onChange={(event) => {
              setFiltroInterventiAnnoContabile(event.target.value);
              closeInterventiList();
            }}
            style={styles.interventiSelectLarge}
          >
            {listaAnniContabiliInterventi.map((anno) => <option key={anno} value={anno}>Anno contabile {anno}</option>)}
          </InterventiSelect>

          <InterventiSelect
            ariaLabel="Filtra interventi per periodo contabile"
            value={filtroInterventiPeriodoContabile}
            onChange={(event) => {
              setFiltroInterventiPeriodoContabile(event.target.value);
              closeInterventiList();
            }}
            style={styles.interventiSelectLarge}
          >
            <option value="ANNO">Tutto l&apos;anno</option>
            <option value="T1">1° trimestre</option>
            <option value="T2">2° trimestre</option>
            <option value="T3">3° trimestre</option>
            <option value="T4">4° trimestre</option>
            <option value="S1">1° semestre</option>
            <option value="S2">2° semestre</option>
            <option value="PERSONALIZZATO">Periodo personalizzato</option>
          </InterventiSelect>

          <InterventiSelect
            ariaLabel="Ordina interventi"
            value={ordineInterventi}
            onChange={(event) => setOrdineInterventi(event.target.value)}
            style={styles.interventiSelectLarge}
          >
            <option value="RECENTI">Data più recente</option>
            <option value="VECCHI">Data meno recente</option>
          </InterventiSelect>

          {filtroInterventiPeriodoContabile === "PERSONALIZZATO" && (
            <>
              <InterventiDateField
                label="Periodo da"
                value={filtroInterventiPeriodoDa}
                onChange={(event) => setFiltroInterventiPeriodoDa(event.target.value)}
                styles={styles}
              />
              <InterventiDateField
                label="Periodo a"
                value={filtroInterventiPeriodoA}
                onChange={(event) => setFiltroInterventiPeriodoA(event.target.value)}
                styles={styles}
              />
            </>
          )}

          <InterventiDateField
            label="Ultimo intervento da"
            value={filtroInterventiUltimoDa}
            onChange={(event) => setFiltroInterventiUltimoDa(event.target.value)}
            styles={styles}
          />
          <InterventiDateField
            label="Ultimo intervento a"
            value={filtroInterventiUltimoA}
            onChange={(event) => setFiltroInterventiUltimoA(event.target.value)}
            styles={styles}
          />
          <InterventiDateField
            label="Prossimo intervento da"
            value={filtroInterventiProssimoDa}
            onChange={(event) => setFiltroInterventiProssimoDa(event.target.value)}
            styles={styles}
          />
          <InterventiDateField
            label="Prossimo intervento a"
            value={filtroInterventiProssimoA}
            onChange={(event) => setFiltroInterventiProssimoA(event.target.value)}
            styles={styles}
          />
        </div>

        <div style={styles.interventiActionsBar}>
          <button
            type="button"
            style={styles.interventiPrimaryAction}
            onClick={() => setInterventiElencoAperto((value) => !value)}
          >
            {interventiElencoAperto ? "▲ Nascondi elenco" : `📋 Apri elenco filtrato (${interventiFiltrati.length})`}
          </button>
          {permessiRuoloFmed.canSeeCosts && (
            <button type="button" style={styles.interventiSecondaryAction} onClick={() => setPagina("Costi")}>
              📊 Analizza costi
            </button>
          )}
          <button type="button" style={styles.interventiGhostAction} onClick={resetFiltriInterventi}>
            🔄 Reset filtri
          </button>
          <button type="button" style={styles.interventiGhostAction} onClick={esportaInterventiFiltratiPdf}>
            📄 Esporta PDF
          </button>
        </div>
      </div>
    </>
  );
}
