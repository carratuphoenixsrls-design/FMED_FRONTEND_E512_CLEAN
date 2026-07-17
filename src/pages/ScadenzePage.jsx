import ScadenzeControls from "../components/scadenze/ScadenzeControls";
import ScadenzeHero from "../components/scadenze/ScadenzeHero";

export default function ScadenzePage(props) {
  const {
    styles,
    scadenzeVisualizzate,
    scadenzeConStatoBase,
    scadenzeSelezionateVisualizzate,
    scadenzeElencoAperto,
    setScadenzeElencoAperto,
    scadenzeScadute,
    scadenzeImminenti,
    scadenzeRenderizzate,
    chiaveScadenzaExport,
    scadenzeSelezionateExport,
    statoScadenza,
    toggleScadenzaExport,
    apriSchedaDaCodice,
    normalizzaSocietaDitta,
    formattaData,
    setScadenzeRenderLimit,
    FMED_RENDER_BATCH_SCADENZE,
  } = props;

  return (
    <div className="fmed-scadenze-enterprise" style={styles.scadenzePageShell}>
      <ScadenzeHero
        styles={styles}
        filteredCount={scadenzeVisualizzate.length}
        totalCount={scadenzeConStatoBase.length}
      />

      <ScadenzeControls {...props} />

    <div style={{
          ...styles.scadenzeKpiGrid,
          ...{}
        }}>
      <div style={styles.scadenzeKpiCard}><div style={styles.scadenzeKpiTop}><span style={styles.scadenzeKpiIcon}>📋</span><span style={styles.scadenzeKpiLabel}>Scadenze filtrate</span></div><strong style={styles.scadenzeKpiValue}>{scadenzeVisualizzate.length}</strong><span style={styles.scadenzeKpiHint}>visualizzate</span></div>
      <div style={styles.scadenzeKpiCard}><div style={styles.scadenzeKpiTop}><span style={styles.scadenzeKpiIcon}>🔴</span><span style={styles.scadenzeKpiLabel}>Scadute</span></div><strong style={{
              ...styles.scadenzeKpiValue,
              color: "#FF4D5E"
            }}>{scadenzeScadute.length}</strong><span style={styles.scadenzeKpiHint}>da recuperare</span></div>
      <div style={styles.scadenzeKpiCard}><div style={styles.scadenzeKpiTop}><span style={styles.scadenzeKpiIcon}>🟠</span><span style={styles.scadenzeKpiLabel}>Entro 30 giorni</span></div><strong style={{
              ...styles.scadenzeKpiValue,
              color: "#D99A00"
            }}>{scadenzeImminenti.length}</strong><span style={styles.scadenzeKpiHint}>imminenti</span></div>
      <div style={styles.scadenzeKpiCard}><div style={styles.scadenzeKpiTop}><span style={styles.scadenzeKpiIcon}>✅</span><span style={styles.scadenzeKpiLabel}>Selezionate</span></div><strong style={{
              ...styles.scadenzeKpiValue,
              color: "#169C8F"
            }}>{scadenzeSelezionateVisualizzate.length}</strong><span style={styles.scadenzeKpiHint}>per export PDF</span></div>
    </div>

    {scadenzeElencoAperto && <div style={{
          ...styles.scadenzeTableCard,
          ...{}
        }}>
        <div style={{
            ...styles.scadenzeListHeader,
            ...{}
          }}>
          <div>
            <h3 style={styles.scadenzeTableTitle}>Elenco scadenze filtrate</h3>
            <p style={styles.scadenzeTableSubtitle}>Selezionate: {scadenzeSelezionateVisualizzate.length} / {scadenzeVisualizzate.length}. Clicca sul codice per aprire la scheda cespite.</p>
          </div>
          <button style={styles.scadenzeCloseBtn} onClick={() => setScadenzeElencoAperto(false)}>Chiudi</button>
        </div>
        {<div style={styles.scadenzeTableWrap}>
            <table style={styles.scadenzeTable}>
              <thead>
                <tr>
                  <th style={styles.scadenzeTh}>Sel.</th><th style={styles.scadenzeTh}>Codice</th><th style={styles.scadenzeTh}>Sede</th><th style={styles.scadenzeTh}>Tipologia</th><th style={styles.scadenzeTh}>Attività</th><th style={styles.scadenzeTh}>Ditta</th><th style={styles.scadenzeTh}>Ultimo intervento</th><th style={styles.scadenzeTh}>Prossima scadenza</th><th style={styles.scadenzeTh}>Giorni</th><th style={styles.scadenzeTh}>Stato</th>
                </tr>
              </thead>
              <tbody>
                {scadenzeRenderizzate.map((s, idx) => {
                  const chiave = chiaveScadenzaExport(s);
                  const selezionata = scadenzeSelezionateExport.includes(chiave);
                  const stato = s._statoScadenza || statoScadenza(s._dataScadenza);
                  return <tr key={chiave || idx} style={styles.tr} onClick={() => toggleScadenzaExport(s)}>
                      <td style={styles.scadenzeTd}><input type="checkbox" checked={selezionata} onChange={() => toggleScadenzaExport(s)} onClick={e => e.stopPropagation()} /></td>
                      <td style={styles.scadenzeTdCode} onClick={e => {
                      e.stopPropagation();
                      apriSchedaDaCodice(s.codice_strumento || s.codicestrumento);
                    }}>{s.codice_strumento || s.codicestrumento}</td>
                      <td style={styles.scadenzeTd}>{s.sede}</td>
                      <td style={styles.scadenzeTd}>{s.tipologia}</td>
                      <td style={styles.scadenzeTd}>{s.attivita}</td>
                      <td style={styles.scadenzeTd}>{normalizzaSocietaDitta(s.ditta_esecutrice || s.ditta)}</td>
                      <td style={styles.scadenzeTd}>{formattaData(s._dataUltimoIntervento || s.data_ultimo_intervento)}</td>
                      <td style={styles.scadenzeTd}>{formattaData(s._dataScadenza || s.data_prossimo_intervento || s.prossima_scadenza || s.data_scadenza)}</td>
                      <td style={styles.scadenzeTd}>{stato.giorni ?? "-"} gg</td>
                      <td style={styles.scadenzeTd}><span style={{
                        ...styles.scadenzeStatusDot,
                        background: stato.colore
                      }} />{stato.testo}</td>
                    </tr>;
                })}
              </tbody>
            </table>
          </div>}
        {scadenzeVisualizzate.length > scadenzeRenderizzate.length && <div style={styles.loadMoreRow}>
            <button type="button" style={styles.scadenzeSecondaryAction} onClick={() => setScadenzeRenderLimit(v => v + FMED_RENDER_BATCH_SCADENZE)}>
              Mostra altre scadenze ({scadenzeRenderizzate.length}/{scadenzeVisualizzate.length})
            </button>
          </div>}
      </div>}
  </div>
  );
}
