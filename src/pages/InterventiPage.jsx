import InterventiControls from "../components/interventi/InterventiControls";
import InterventiHero from "../components/interventi/InterventiHero";

export default function InterventiPage(props) {
  const {
    styles,
    interventiFiltrati,
    interventi,
    interventiIncludeStorico,
    cambiaVistaStoricoInterventi,
    formatCurrency,
    totaleSpesaInterventiFiltrati,
    labelPeriodoContabileInterventi,
    codiciCoinvoltiInterventi,
    ditteCoinvolteInterventi,
    interventiElencoAperto,
    setInterventiElencoAperto,
    interventiFiltratiRenderizzati,
    apriSchedaDaCodice,
    normalizzaSocietaDitta,
    formattaData,
    BottoneJobReport,
    apriModificaIntervento,
    eliminaIntervento,
    setInterventiRenderLimit,
    FMED_RENDER_BATCH_INTERVENTI,
  } = props;

  return (
    <div className="fmed-interventi-enterprise" style={styles.interventiPageShell}>
      <InterventiHero
        styles={styles}
        filteredCount={interventiFiltrati.length}
        totalCount={interventi.length}
      />

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        flexWrap: "wrap",
        padding: "12px 14px",
        margin: "0 0 14px",
        border: "1px solid var(--fmed-border)",
        borderRadius: 14,
        background: "var(--fmed-surface)",
        color: "var(--fmed-text)",
      }}>
        <div>
          <strong style={{ display: "block", fontSize: 13 }}>Finestra operativa E7.2</strong>
          <span style={{ display: "block", marginTop: 3, fontSize: 12, color: "var(--fmed-muted)" }}>
            {interventiIncludeStorico
              ? "Tutto lo storico visibile. I record precedenti al 01/01/2023 sono marcati come archivio."
              : "Attività dal 01/01/2023 a oggi. Tutti i collaudi restano sempre visibili."}
          </span>
        </div>
        <button
          type="button"
          style={interventiIncludeStorico ? styles.interventiSecondaryAction : styles.interventiPrimaryAction}
          onClick={() => cambiaVistaStoricoInterventi?.(!interventiIncludeStorico)}
        >
          {interventiIncludeStorico ? "Torna alla vista operativa" : "Apri archivio storico"}
        </button>
      </div>

      <InterventiControls {...props} />

    <div style={{
          ...styles.interventiKpiGrid,
          ...{}
        }}>
      <div style={styles.interventiKpiCard}><div style={styles.interventiKpiTop}><span style={styles.interventiKpiIcon}>💶</span><span style={styles.interventiKpiLabel}>Totale spesa</span></div><strong style={styles.interventiKpiValue}>{formatCurrency(totaleSpesaInterventiFiltrati)}</strong><span style={styles.interventiKpiHint}>{labelPeriodoContabileInterventi()}</span></div>
      <div style={styles.interventiKpiCard}><div style={styles.interventiKpiTop}><span style={styles.interventiKpiIcon}>🔧</span><span style={styles.interventiKpiLabel}>Interventi</span></div><strong style={{
              ...styles.interventiKpiValue,
              color: "#169C8F"
            }}>{interventiFiltrati.length}</strong><span style={styles.interventiKpiHint}>su {interventi.length} totali</span></div>
      <div style={styles.interventiKpiCard}><div style={styles.interventiKpiTop}><span style={styles.interventiKpiIcon}>🏷️</span><span style={styles.interventiKpiLabel}>Cespiti</span></div><strong style={{
              ...styles.interventiKpiValue,
              color: "#2FD37D"
            }}>{codiciCoinvoltiInterventi.size}</strong><span style={styles.interventiKpiHint}>coinvolti</span></div>
      <div style={styles.interventiKpiCard}><div style={styles.interventiKpiTop}><span style={styles.interventiKpiIcon}>🏢</span><span style={styles.interventiKpiLabel}>Ditte/Società</span></div><strong style={{
              ...styles.interventiKpiValue,
              color: "#D99A00"
            }}>{ditteCoinvolteInterventi.size}</strong><span style={styles.interventiKpiHint}>coinvolte</span></div>
    </div>

    {interventiElencoAperto && <div style={{
          ...styles.interventiTableCard,
          ...{}
        }}>
        <div style={{
            ...styles.interventiListHeader,
            ...{}
          }}>
          <div>
            <h3 style={styles.interventiTableTitle}>Elenco interventi filtrati</h3>
            <p style={styles.interventiTableSubtitle}>{interventiFiltrati.length} risultati su {interventi.length}. Clicca il codice per aprire la scheda cespite.</p>
          </div>
          <button style={styles.interventiCloseBtn} onClick={() => setInterventiElencoAperto(false)}>Chiudi</button>
        </div>
        {<div style={styles.interventiTableWrap}>
            <table style={styles.interventiTable}>
              <thead>
                <tr>
                  <th style={styles.interventiTh}>Codice</th><th style={styles.interventiTh}>Sede</th><th style={styles.interventiTh}>Ditta esecutrice</th><th style={styles.interventiTh}>Tipologia</th><th style={styles.interventiTh}>Attività</th><th style={styles.interventiTh}>Ultimo</th><th style={styles.interventiTh}>Prossimo</th><th style={styles.interventiTh}>Costo</th><th style={styles.interventiTh}>Documento</th><th style={styles.interventiTh}>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {interventiFiltratiRenderizzati.map((i, idx) => <tr key={i.id_intervento || idx} style={styles.interventiTr}>
                    <td style={styles.interventiTdCode} onClick={() => apriSchedaDaCodice(i.codice_strumento || i.codicestrumento)} title="Apri scheda cespite">{i.codice_strumento || i.codicestrumento}</td>
                    <td style={styles.interventiTd}>{i.sede}</td>
                    <td style={styles.interventiTd}>{normalizzaSocietaDitta(i.ditta_esecutrice || i.ditta)}</td>
                    <td style={styles.interventiTd}>{i.tipologia}</td>
                    <td style={styles.interventiTd}>
                      <div>{i.attivita}</div>
                      {i._eccezione_collaudo && <small style={{ display: "block", marginTop: 3, fontWeight: 700, color: "var(--fmed-brand)" }}>Collaudo sempre conservato</small>}
                      {i._archivio_storico && <small style={{ display: "block", marginTop: 3, color: "var(--fmed-muted)" }}>Archivio pre-2023</small>}
                    </td>
                    <td style={styles.interventiTd}>{formattaData(i.data_ultimo_intervento)}</td>
                    <td style={styles.interventiTd}>{formattaData(i.data_prossimo_intervento)}</td>
                    <td style={styles.interventiTd}>{formatCurrency(i.costo || i.importo_extra || 0)}</td>
                    <td style={styles.interventiTd}><BottoneJobReport intervento={i} /></td>
                    <td style={styles.interventiTd}>
                      <div style={styles.rowActionGroup}>
                        <button type="button" style={styles.actionBtnEdit} onClick={() => apriModificaIntervento(i)}>✏️</button>
                        <button type="button" style={styles.actionBtnDelete} onClick={() => eliminaIntervento(i)}>🗑</button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
        {interventiFiltrati.length > interventiFiltratiRenderizzati.length && <div style={styles.loadMoreRow}>
            <button type="button" style={styles.interventiSecondaryAction} onClick={() => setInterventiRenderLimit(v => v + FMED_RENDER_BATCH_INTERVENTI)}>
              Mostra altri interventi ({interventiFiltratiRenderizzati.length}/{interventiFiltrati.length})
            </button>
          </div>}
      </div>}
  </div>
  );
}
