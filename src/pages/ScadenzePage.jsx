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
    chiudiScadenzaSingolaComeSostituita,
    apriSchedaDaCodice,
    normalizzaSocietaDitta,
    formattaData,
    setScadenzeRenderLimit,
    FMED_RENDER_BATCH_SCADENZE,
  } = props;

  const etichettaModulo = (modulo) => ({
    ASSET: "Asset",
    INFRASTRUTTURE: "Infrastrutture",
    SICUREZZA_81_08: "Sicurezza 81/08",
  }[String(modulo || "").toUpperCase()] || String(modulo || "Altro").replaceAll("_", " "));
  const daPianificare = scadenzeConStatoBase.filter((row) => row?._statoScadenza?.codice === "DA_PIANIFICARE");
  const isCollaudoStorico = (row) => /COLLAUDO/i.test([
    row?.famiglia_codice,
    row?.famiglia_label,
    row?.attivita,
    row?.attivita_originale,
  ].filter(Boolean).join(" "));

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
      <div style={styles.scadenzeKpiCard}><div style={styles.scadenzeKpiTop}><span style={styles.scadenzeKpiIcon}>🗓️</span><span style={styles.scadenzeKpiLabel}>Da pianificare</span></div><strong style={{
              ...styles.scadenzeKpiValue,
              color: "#8A6D1D"
            }}>{daPianificare.length}</strong><span style={styles.scadenzeKpiHint}>senza data futura</span></div>
      <div style={styles.scadenzeKpiCard}><div style={styles.scadenzeKpiTop}><span style={styles.scadenzeKpiIcon}>✅</span><span style={styles.scadenzeKpiLabel}>Selezionate</span></div><strong style={{
              ...styles.scadenzeKpiValue,
              color: "#169C8F"
            }}>{scadenzeSelezionateVisualizzate.length}</strong><span style={styles.scadenzeKpiHint}>per azioni o PDF</span></div>
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
            <p style={styles.scadenzeTableSubtitle}>Selezionate: {scadenzeSelezionateVisualizzate.length} / {scadenzeVisualizzate.length}. Per i cicli Asset puoi cliccare sull’elemento per aprire la scheda cespite.</p>
          </div>
          <button style={styles.scadenzeCloseBtn} onClick={() => setScadenzeElencoAperto(false)}>Chiudi</button>
        </div>
        {<div style={styles.scadenzeTableWrap}>
            <table className="fmed-e818-deadlines-table" style={styles.scadenzeTable}>
              <thead>
                <tr>
                  <th style={styles.scadenzeTh}>Sel.</th><th style={styles.scadenzeTh}>Modulo</th><th style={styles.scadenzeTh}>Elemento</th><th style={styles.scadenzeTh}>Sede</th><th style={styles.scadenzeTh}>Ambito</th><th style={styles.scadenzeTh}>Famiglia attività</th><th style={styles.scadenzeTh}>Ditta / ente</th><th style={styles.scadenzeTh}>Ultima esecuzione</th><th style={styles.scadenzeTh}>Prossima scadenza</th><th style={styles.scadenzeTh}>Giorni</th><th style={styles.scadenzeTh}>Stato</th><th style={styles.scadenzeTh}>Azione</th>
                </tr>
              </thead>
              <tbody>
                {scadenzeRenderizzate.map((s, idx) => {
                  const chiave = chiaveScadenzaExport(s);
                  const selezionata = scadenzeSelezionateExport.includes(chiave);
                  const stato = s._statoScadenza || statoScadenza(s._dataScadenza);
                  return <tr key={chiave || idx} className={`${selezionata ? "is-selected" : ""} ${stato.codice === "SCADUTA" ? "is-expired" : ""}`} style={styles.tr} onClick={() => toggleScadenzaExport(s)}>
                      <td style={styles.scadenzeTd}><input type="checkbox" checked={selezionata} onChange={() => toggleScadenzaExport(s)} onClick={e => e.stopPropagation()} /></td>
                      <td style={styles.scadenzeTd}>{etichettaModulo(s.modulo)}</td>
                      <td style={s.modulo === "ASSET" ? styles.scadenzeTdCode : styles.scadenzeTd} onClick={e => {
                      e.stopPropagation();
                      if (s.modulo === "ASSET") apriSchedaDaCodice(s.codice_strumento || s.codicestrumento);
                    }}>{s.codice_strumento || s.codicestrumento || s.entita_chiave || "-"}</td>
                      <td style={styles.scadenzeTd}>{s.sede || "-"}</td>
                      <td style={styles.scadenzeTd}>{s.tipologia || "-"}</td>
                      <td style={styles.scadenzeTd}>
                        <span>{s.attivita}</span>
                        {isCollaudoStorico(s) && <span className="fmed-e818-history-badge" title="Il collaudo resta conservato nello storico; viene archiviato soltanto il falso ciclo operativo">Storico protetto</span>}
                      </td>
                      <td style={styles.scadenzeTd}>{normalizzaSocietaDitta(s.ditta_esecutrice || s.ditta || "")}</td>
                      <td style={styles.scadenzeTd}>{formattaData(s._dataUltimoIntervento || s.data_ultimo_intervento)}</td>
                      <td style={styles.scadenzeTd}>{formattaData(s._dataScadenza || s.data_prossimo_intervento || s.prossima_scadenza || s.data_scadenza)}</td>
                      <td style={styles.scadenzeTd}>{stato.giorni == null ? "-" : `${stato.giorni} gg`}</td>
                      <td style={styles.scadenzeTd}><span style={{
                        ...styles.scadenzeStatusDot,
                        background: stato.colore
                      }} />{stato.testo}</td>
                      <td style={styles.scadenzeTd} onClick={(event) => event.stopPropagation()}>
                        {["SCADUTA", "DA_PIANIFICARE"].includes(stato.codice) && typeof chiudiScadenzaSingolaComeSostituita === "function" ? <button
                          type="button"
                          className="fmed-e818-row-close-btn"
                          onClick={() => chiudiScadenzaSingolaComeSostituita(s)}
                          style={{
                            minHeight: 32,
                            padding: "0 10px",
                            borderRadius: 9,
                            border: "1px solid #B8C7D1",
                            background: "#F4F7F9",
                            color: "#334E5C",
                            fontSize: 11,
                            fontWeight: 800,
                            whiteSpace: "nowrap",
                            cursor: "pointer",
                          }}
                          title={stato.codice === "DA_PIANIFICARE" ? "Archivia il ciclo come non applicabile" : "Archivia il vecchio ciclo come chiuso e sostituito"}
                        >
                          {stato.codice === "DA_PIANIFICARE" ? "Archivia ciclo" : "Chiudi e sostituisci"}
                        </button> : <span style={{color: "var(--fmed-muted)"}}>—</span>}
                      </td>
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
