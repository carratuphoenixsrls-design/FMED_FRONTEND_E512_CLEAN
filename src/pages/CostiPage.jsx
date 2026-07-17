import FmedModuleIcon from "../components/FmedModuleIcon.jsx";
import CostiControls from "../components/costi/CostiControls.jsx";

export default function CostiPage(props) {
  const {
    styles,
    labelPeriodoContabileInterventi,
    filtroInterventiAnnoContabile,
    setFiltroInterventiAnnoContabile,
    listaAnniContabiliInterventi,
    filtroInterventiPeriodoContabile,
    setFiltroInterventiPeriodoContabile,
    filtroInterventiPeriodoDa,
    setFiltroInterventiPeriodoDa,
    filtroInterventiPeriodoA,
    setFiltroInterventiPeriodoA,
    filtroInterventiSede,
    setFiltroInterventiSede,
    listaSediInterventi,
    filtroInterventiSocieta,
    setFiltroInterventiSocieta,
    listaSocietaInterventi,
    filtroInterventiAttivita,
    setFiltroInterventiAttivita,
    listaAttivitaFiltroInterventi,
    filtroInterventiCodice,
    setFiltroInterventiCodice,
    listaCodiciFiltroInterventi,
    resetFiltriInterventi,
    esportaInterventiFiltratiPdf,
    formatCurrency,
    totaleSpesaInterventiFiltrati,
    interventiFiltrati,
    codiciCoinvoltiInterventi,
    ditteCoinvolteInterventi,
    costoMedioInterventoFiltrato,
    classificaCostiPerDitta,
    classificaCostiPerSede,
    classificaCostiPerCespite,
    classificaCostiPerAttivita,
    setCostiPanelAperto,
    costiPanelAperto,
    puliziaSocietaDaCorreggere
  } = props;
  return (
<div className="fmed-costi-page" style={styles.card}>
    <header className="fmed-costi-hero" style={styles.scadenzeHeader}>
      <div className="fmed-banner-heading">
        <FmedModuleIcon module="Costi" />
        <div className="fmed-banner-copy">
          <span className="fmed-costi-kicker">Controllo economico</span>
          <h2 className="fmed-costi-title" style={styles.cardTitle}>Analisi costi manutentivi</h2>
          <p style={styles.muted}>
            Analisi economica sugli interventi con anno contabile, periodo, sede, ditta, attività e cespite. I dati usano gli stessi filtri della pagina Interventi.
          </p>
        </div>
      </div>
    </header>

    <CostiControls {...{
      labelPeriodoContabileInterventi,
      filtroInterventiAnnoContabile,
      setFiltroInterventiAnnoContabile,
      listaAnniContabiliInterventi,
      filtroInterventiPeriodoContabile,
      setFiltroInterventiPeriodoContabile,
      filtroInterventiPeriodoDa,
      setFiltroInterventiPeriodoDa,
      filtroInterventiPeriodoA,
      setFiltroInterventiPeriodoA,
      filtroInterventiSede,
      setFiltroInterventiSede,
      listaSediInterventi,
      filtroInterventiSocieta,
      setFiltroInterventiSocieta,
      listaSocietaInterventi,
      filtroInterventiAttivita,
      setFiltroInterventiAttivita,
      listaAttivitaFiltroInterventi,
      filtroInterventiCodice,
      setFiltroInterventiCodice,
      listaCodiciFiltroInterventi,
      resetFiltriInterventi,
      esportaInterventiFiltratiPdf,
    }} />

    <section className="fmed-costi-summary" style={styles.contoEconomicoBox}>
      <div style={styles.contoEconomicoHeader}>
        <div>
          <h3 style={styles.contoEconomicoTitle}>Quadro economico filtrato</h3>
          <p style={styles.muted}>Il totale considera solo le righe con costo valorizzato nei campi costo/importo_extra.</p>
        </div>
      </div>

      <div className="fmed-costi-summary-grid" style={styles.contoEconomicoGrid}>
        <div style={styles.contoEconomicoCard}><span style={styles.contoEconomicoLabel}>Totale spesa</span><strong style={styles.contoEconomicoValue}>{formatCurrency(totaleSpesaInterventiFiltrati)}</strong></div>
        <div style={styles.contoEconomicoCard}><span style={styles.contoEconomicoLabel}>Interventi</span><strong style={styles.contoEconomicoValue}>{interventiFiltrati.length}</strong></div>
        <div style={styles.contoEconomicoCard}><span style={styles.contoEconomicoLabel}>Cespiti coinvolti</span><strong style={styles.contoEconomicoValue}>{codiciCoinvoltiInterventi.size}</strong></div>
        <div style={styles.contoEconomicoCard}><span style={styles.contoEconomicoLabel}>Ditte coinvolte</span><strong style={styles.contoEconomicoValue}>{ditteCoinvolteInterventi.size}</strong></div>
        <div style={styles.contoEconomicoCard}><span style={styles.contoEconomicoLabel}>Costo medio</span><strong style={styles.contoEconomicoValue}>{formatCurrency(costoMedioInterventoFiltrato)}</strong></div>
      </div>
    </section>

    <div className="fmed-costi-rankings" style={{
          display: "grid",
          gap: 10,
          marginTop: 18
        }}>
      {[["ditta", "Costi per ditta", classificaCostiPerDitta, "💶"], ["sede", "Costi per sede", classificaCostiPerSede, "🏥"], ["cespiti", "Cespiti più costosi", classificaCostiPerCespite, "📦"], ["attivita", "Costi per attività", classificaCostiPerAttivita, "🛠️"]].map(([chiave, titolo, righe, icona]) => <div key={chiave} className="fmed-costi-accordion" style={styles.exportAccordionItem}>
          <button type="button" style={styles.exportAccordionHeader} onClick={() => setCostiPanelAperto(costiPanelAperto === chiave ? null : chiave)}>
            <div style={styles.exportAccordionTitleWrap}>
              <span style={styles.exportAccordionIcon}>{icona}</span>
              <div>
                <div style={styles.exportAccordionTitle}>{titolo}</div>
                <div style={styles.exportAccordionSubtitle}>{righe.length} voci · totale {formatCurrency(righe.reduce((acc, r) => acc + (Number(r.totale) || 0), 0))}</div>
              </div>
            </div>
            <span style={styles.exportAccordionChevron}>{costiPanelAperto === chiave ? "▲ Chiudi" : "▼ Apri"}</span>
          </button>

          {costiPanelAperto === chiave && <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr><th style={styles.th}>Voce</th><th style={styles.th}>Interventi</th><th style={styles.th}>Cespiti</th><th style={styles.th}>Totale</th></tr>
                </thead>
                <tbody>
                  {righe.slice(0, 20).map(r => <tr key={`${titolo}-${r.nome}`} style={styles.tr}>
                      <td style={styles.tdCode}>{r.nome}</td>
                      <td style={styles.td}>{r.interventi}</td>
                      <td style={styles.td}>{r.cespiti}</td>
                      <td style={styles.td}>{formatCurrency(r.totale)}</td>
                    </tr>)}
                  {righe.length === 0 && <tr><td style={styles.td} colSpan={4}>Nessun dato disponibile con i filtri attuali.</td></tr>}
                </tbody>
              </table>
            </div>}
        </div>)}
    </div>

    <div className="fmed-costi-accordion fmed-costi-cleanup" style={{
          ...styles.exportAccordionItem,
          marginTop: 18
        }}>
      <button type="button" style={styles.exportAccordionHeader} onClick={() => setCostiPanelAperto(costiPanelAperto === "pulizia" ? null : "pulizia")}>
        <div style={styles.exportAccordionTitleWrap}>
          <span style={styles.exportAccordionIcon}>🧹</span>
          <div>
            <div style={styles.exportAccordionTitle}>Pulizia Ditte/Società - proposte di accorpamento</div>
            <div style={styles.exportAccordionSubtitle}>{puliziaSocietaDaCorreggere.length} varianti rilevate</div>
          </div>
        </div>
        <span style={styles.exportAccordionChevron}>{costiPanelAperto === "pulizia" ? "▲ Chiudi" : "▼ Apri"}</span>
      </button>
      {costiPanelAperto === "pulizia" && <>
          <p style={{
              ...styles.muted,
              margin: "12px 14px"
            }}>
            Questa tabella non modifica Supabase: mostra le varianti trovate e il nome standard usato da FMED per filtri e analisi. Quando sei d'accordo, possiamo generare lo script SQL di bonifica definitiva.
          </p>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead><tr><th style={styles.th}>Valore presente</th><th style={styles.th}>Nome standard FMED</th><th style={styles.th}>Occorrenze</th><th style={styles.th}>Esito</th></tr></thead>
              <tbody>
                {puliziaSocietaDaCorreggere.slice(0, 80).map(r => <tr key={`${r.standard}-${r.originale}`} style={styles.tr}>
                    <td style={styles.td}>{r.originale}</td>
                    <td style={styles.tdCode}>{r.standard}</td>
                    <td style={styles.td}>{r.occorrenze}</td>
                    <td style={styles.td}>Da accorpare</td>
                  </tr>)}
                {puliziaSocietaDaCorreggere.length === 0 && <tr><td style={styles.td} colSpan={4}>Nessuna variante da correggere rilevata.</td></tr>}
              </tbody>
            </table>
          </div>
        </>}
    </div>
  </div>
  );
}
