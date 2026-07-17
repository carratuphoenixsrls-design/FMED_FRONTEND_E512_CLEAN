import FmedModuleIcon from "../components/FmedModuleIcon.jsx";
export default function ExportPage(props) {
  const {
    styles,
    fmedAuditQualitaDati,
    exportAuditQualitaDatiFmed,
    setExportPanelAperto,
    exportPanelAperto,
    exportSedeInventario,
    setExportSedeInventario,
    listaSedi,
    exportStatoInventario,
    setExportStatoInventario,
    listaStatiAsset,
    exportCategoriaInventario,
    setExportCategoriaInventario,
    listaCategorie,
    formatCategoria,
    exportTipologiaInventario,
    setExportTipologiaInventario,
    listaTipologie,
    exportCostruttoreInventario,
    setExportCostruttoreInventario,
    listaCostruttori,
    exportRepartoInventario,
    setExportRepartoInventario,
    listaReparti,
    exportSocietaInventario,
    setExportSocietaInventario,
    listaSocieta,
    exportLocazioneInventario,
    setExportLocazioneInventario,
    listaLocazioniExportInventario,
    exportOrdineInventario,
    setExportOrdineInventario,
    renderFiltroBrancheExport,
    exportBrancheInventario,
    setExportBrancheInventario,
    setExportCespitiInventarioSelezionati,
    resetColonneExtraInventario,
    colonneExtraInventarioDisponibili,
    exportInventarioColonneExtra,
    toggleColonnaExtraInventario,
    selezionaTuttiCespitiInventario,
    codiciInventarioExportVisibili,
    exportRicercaCespiteInventario,
    setExportRicercaCespiteInventario,
    exportCespitiInventarioSelezionati,
    toggleCespiteExportInventario,
    codiciInventarioExport,
    exportInventarioFmed,
    exportSedeInterventi,
    setExportSedeInterventi,
    setExportSediInterventi,
    listaSediInterventi,
    exportCodiceInterventi,
    setExportCodiceInterventi,
    listaCodiciFiltroInterventi,
    exportTipologiaInterventi,
    setExportTipologiaInterventi,
    listaTipologieFiltroInterventi,
    exportSocietaInterventi,
    setExportSocietaInterventi,
    listaSocietaInterventi,
    exportAnnoInterventi,
    setExportAnnoInterventi,
    listaAnniContabiliInterventi,
    exportScadenzaInterventi,
    setExportScadenzaInterventi,
    exportDataInterventiDa,
    setExportDataInterventiDa,
    exportDataInterventiA,
    setExportDataInterventiA,
    renderFiltroSediInterventiExport,
    exportBrancheInterventi,
    setExportBrancheInterventi,
    selezionaTutteAttivitaExportInterventi,
    escludiTutteAttivitaExportInterventi,
    listaAttivitaExportInterventi,
    exportAttivitaInterventiEscluse,
    toggleAttivitaExportInterventi,
    attivitaExportIncluse,
    selezionaTuttiCespitiInterventi,
    codiciInterventiExportVisibili,
    setExportCespitiInterventiSelezionati,
    exportRicercaCespiteInterventi,
    setExportRicercaCespiteInterventi,
    exportCespitiInterventiSelezionati,
    toggleCespiteExportInterventi,
    codiciInterventiExport,
    exportInterventiFmed,
    scadenzeVisualizzate,
    scadenzeSelezionateVisualizzate,
    resetFiltriScadenze,
    selezionaTutteScadenzeVisualizzate,
    deselezionaTutteScadenze,
    filtroScadenze,
    setFiltroScadenze,
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
    filtroScadenzeProssimaDa,
    setFiltroScadenzeProssimaDa,
    filtroScadenzeProssimaA,
    setFiltroScadenzeProssimaA,
    exportBrancheScadenze,
    setExportBrancheScadenze,
    exportScadenzeExcelFmed,
    exportBudgetSede,
    setExportBudgetSede,
    exportBudgetStato,
    setExportBudgetStato,
    exportBudgetTipologia,
    setExportBudgetTipologia,
    exportBudgetCostruttore,
    setExportBudgetCostruttore,
    exportBudgetCriticita,
    setExportBudgetCriticita,
    exportBrancheBudget,
    setExportBrancheBudget,
    exportBudgetCriticitaFmed
  } = props;
  return (
<div className="fmed-export-page fmed-report-page" style={styles.card}>
            <header className="fmed-report-hero">
              <div className="fmed-banner-heading fmed-report-hero-heading">
                <FmedModuleIcon module="Export" />
                <div className="fmed-report-hero-copy fmed-banner-copy">
                  <span>Report e analisi</span>
                  <h2>Report e analisi FMED</h2>
                  <p>Esporta inventario, interventi, scadenze, budget e audit qualità in formati ordinati e pronti per l’uso.</p>
                </div>
              </div>
              <div className="fmed-report-environment">
                <small>Ambiente report</small>
                <strong>{window.location.host}</strong>
                <span>Inventario · Interventi · Scadenze · Budget</span>
              </div>
            </header>

            <div className="fmed-report-audit" style={styles.fmedAuditQualityPanel}>
              <div className="fmed-report-audit-head" style={styles.fmedAuditQualityHead}>
                <div>
                  <div style={styles.fmedAuditEyebrow}>Audit qualità dati</div>
                  <h3 style={styles.fmedAuditTitle}>Controllo rapido integrità FMED</h3>
                  <p style={styles.fmedAuditSubtitle}>Verifica automatica di branche, locazioni, matricole, modelli, costruttori e link documentali.</p>
                </div>
                <div style={styles.fmedAuditScoreBox}>
                  <strong style={styles.fmedAuditScoreMain}>{fmedAuditQualitaDati.indiceQualita}%</strong>
                  <span>Indice qualità</span>
                </div>
              </div>
              <div className="fmed-report-audit-grid" style={styles.fmedAuditMetricGrid}>
                <div style={styles.fmedAuditMetric}><strong style={styles.fmedAuditMetricMain}>{fmedAuditQualitaDati.assetSenzaBranca}</strong><span>Asset senza branca</span></div>
                <div style={styles.fmedAuditMetric}><strong style={styles.fmedAuditMetricMain}>{fmedAuditQualitaDati.assetSenzaLocazione}</strong><span>Asset senza locazione</span></div>
                <div style={styles.fmedAuditMetric}><strong style={styles.fmedAuditMetricMain}>{fmedAuditQualitaDati.assetSenzaSharePoint}</strong><span>Senza SharePoint</span></div>
                <div style={styles.fmedAuditMetric}><strong style={styles.fmedAuditMetricMain}>{fmedAuditQualitaDati.interventiSenzaBranca}</strong><span>Interventi senza branca</span></div>
              </div>
              <div className="fmed-report-audit-actions" style={styles.fmedAuditActions}>
                <button type="button" style={styles.primaryBtn} onClick={exportAuditQualitaDatiFmed}>Esporta audit qualità dati</button>
                <button type="button" style={styles.secondaryBtn} onClick={() => setExportPanelAperto("inventario")}>Apri export inventario</button>
              </div>
            </div>

            <div style={{
          display: "grid",
          gap: 12
        }}>
              <div className="fmed-report-accordion-item" style={styles.exportAccordionItem}>
                <button type="button" className="fmed-report-accordion-header" style={styles.exportAccordionHeader} onClick={() => setExportPanelAperto(exportPanelAperto === "inventario" ? null : "inventario")}>
                  <div className="fmed-report-accordion-title-wrap" style={styles.exportAccordionTitleWrap}>
                    <span style={styles.exportAccordionIcon}>📦</span>
                    <div>
                      <div style={styles.exportAccordionTitle}>Export Inventario</div>
                      <div style={styles.exportAccordionSubtitle}>Inventario sintetico con colonne opzionali.</div>
                    </div>
                  </div>
                  <span style={styles.exportAccordionChevron}>{exportPanelAperto === "inventario" ? "▲" : "▼"}</span>
                </button>

                {exportPanelAperto === "inventario" && <div style={styles.exportAccordionBody}>
                    <div style={styles.exportInlineGrid}>
                      <select style={styles.select} value={exportSedeInventario} onChange={e => setExportSedeInventario(e.target.value)}>
                        <option value="TUTTE">Tutte le sedi</option>
                        {listaSedi.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select style={styles.select} value={exportStatoInventario} onChange={e => setExportStatoInventario(e.target.value)}>
                        <option value="TUTTI">Tutti gli stati</option>
                        {listaStatiAsset.map(stato => <option key={stato} value={stato}>{stato}</option>)}
                      </select>
                      <select style={styles.select} value={exportCategoriaInventario} onChange={e => setExportCategoriaInventario(e.target.value)}>
                        <option value="TUTTE">Tutte le categorie</option>
                        {listaCategorie.map(cat => <option key={cat} value={cat}>{formatCategoria(cat)}</option>)}
                      </select>
                      <select style={styles.select} value={exportTipologiaInventario} onChange={e => setExportTipologiaInventario(e.target.value)}>
                        <option value="TUTTE">Tutte le tipologie</option>
                        {listaTipologie.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <select style={styles.select} value={exportCostruttoreInventario} onChange={e => setExportCostruttoreInventario(e.target.value)}>
                        <option value="TUTTI">Tutti i costruttori</option>
                        {listaCostruttori.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <select style={styles.select} value={exportRepartoInventario} onChange={e => setExportRepartoInventario(e.target.value)}>
                        <option value="TUTTI">Tutti i reparti</option>
                        {listaReparti.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <select style={styles.select} value={exportSocietaInventario} onChange={e => setExportSocietaInventario(e.target.value)}>
                        <option value="TUTTE">Tutte le società</option>
                        {listaSocieta.map(soc => <option key={soc} value={soc}>{soc}</option>)}
                      </select>
                      <select style={styles.select} value={exportLocazioneInventario} onChange={e => setExportLocazioneInventario(e.target.value)}>
                        <option value="TUTTE">Tutte le stanze / locazioni</option>
                        {listaLocazioniExportInventario.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                      </select>
                      <select style={styles.select} value={exportOrdineInventario} onChange={e => setExportOrdineInventario(e.target.value)}>
                        <option value="LOCAZIONE_ASC">Ordina per stanza / locazione</option>
                        <option value="REPARTO_ASC">Ordina per reparto</option>
                        <option value="SEDE_ASC">Ordina per sede</option>
                        <option value="CODICE_ASC">Ordina per codice crescente</option>
                        <option value="CODICE_DESC">Ordina per codice decrescente</option>
                        <option value="TIPOLOGIA_ASC">Ordina per tipologia</option>
                        <option value="COSTRUTTORE_ASC">Ordina per costruttore</option>
                        <option value="STATO_ASC">Ordina per stato</option>
                      </select>
                    </div>

                    {renderFiltroBrancheExport("Filtro multiplo branca", exportBrancheInventario, setExportBrancheInventario)}

                    <div style={{
                ...styles.exportActionRow,
                justifyContent: "flex-start",
                marginTop: 10
              }}>
                      <button type="button" style={{
                  ...styles.primaryBtn,
                  flex: "0 1 220px"
                }} onClick={() => {
                  setExportStatoInventario("Attivo");
                  setExportCespitiInventarioSelezionati([]);
                }}>
                        Esporta solo asset attivi
                      </button>
                      <button type="button" style={{
                  ...styles.secondaryBtn,
                  flex: "0 1 180px"
                }} onClick={() => {
                  setExportSedeInventario("TUTTE");
                  setExportStatoInventario("TUTTI");
                  setExportCategoriaInventario("TUTTE");
                  setExportTipologiaInventario("TUTTE");
                  setExportCostruttoreInventario("TUTTI");
                  setExportRepartoInventario("TUTTI");
                  setExportSocietaInventario("TUTTE");
                  setExportLocazioneInventario("TUTTE");
                  setExportOrdineInventario("LOCAZIONE_ASC");
                  setExportBrancheInventario([]);
                  setExportCespitiInventarioSelezionati([]);
                }}>
                        Reset filtri inventario
                      </button>
                    </div>

                    <div style={styles.exportFilterBox}>
                      <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  marginBottom: 5
                }}>
                        <div style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "var(--fmed-text)"
                  }}>Colonne aggiuntive opzionali</div>
                        <button type="button" style={styles.miniActionBtn} onClick={resetColonneExtraInventario}>Default pulito</button>
                      </div>
                      <div style={styles.exportCheckboxGrid}>
                        {colonneExtraInventarioDisponibili.map(colonna => <label key={colonna.key} style={styles.exportCheckLabel}>
                            <input type="checkbox" checked={!!exportInventarioColonneExtra[colonna.key]} onChange={() => toggleColonnaExtraInventario(colonna.key)} />
                            <span>{colonna.label}</span>
                          </label>)}
                      </div>
                      <div style={{
                  marginTop: 8,
                  fontSize: 11,
                  color: "var(--fmed-muted)",
                  fontWeight: 400
                }}>
                        Di default l'export resta sintetico. Accessori/Sistema primario resta nella scheda cespite e non viene esportato.
                      </div>
                    </div>

                    <div style={styles.exportFilterBox}>
                      <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  marginBottom: 5
                }}>
                        <div style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "var(--fmed-text)"
                  }}>Cespiti da esportare</div>
                        <div style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap"
                  }}>
                          <button type="button" style={styles.miniActionBtn} onClick={() => selezionaTuttiCespitiInventario(codiciInventarioExportVisibili)}>Seleziona visibili</button>
                          <button type="button" style={styles.miniActionBtn} onClick={() => setExportCespitiInventarioSelezionati([])}>Nessuno</button>
                        </div>
                      </div>

                      <input style={{
                  ...styles.input,
                  marginBottom: 5
                }} value={exportRicercaCespiteInventario} onChange={e => setExportRicercaCespiteInventario(e.target.value)} placeholder="Cerca codice cespite da esportare..." />

                      <div style={{
                  ...styles.exportCheckboxGrid,
                  maxHeight: 170,
                  overflowY: "auto"
                }}>
                        {codiciInventarioExportVisibili.slice(0, 300).map(codice => <label key={codice} style={styles.exportCheckLabel}>
                            <input type="checkbox" checked={exportCespitiInventarioSelezionati.includes(codice)} onChange={() => toggleCespiteExportInventario(codice)} />
                            <span>{codice}</span>
                          </label>)}
                      </div>

                      {codiciInventarioExportVisibili.length > 300 && <div style={{
                  marginTop: 6,
                  fontSize: 11,
                  color: "var(--fmed-muted)",
                  fontWeight: 400
                }}>
                          Mostrati i primi 300 codici: usa la ricerca per trovare gli altri.
                        </div>}

                      <div style={{
                  marginTop: 8,
                  fontSize: 11,
                  color: "var(--fmed-muted)",
                  fontWeight: 400
                }}>
                        Disponibili: {codiciInventarioExport.length} · Visibili: {codiciInventarioExportVisibili.length} · Selezionati: {exportCespitiInventarioSelezionati.length}. Se non selezioni nulla, esporta tutti i cespiti filtrati.
                      </div>
                    </div>

                    <div style={styles.exportInfoLine}>
                      Filtri: {exportSedeInventario} · {exportStatoInventario} · {exportCategoriaInventario === "TUTTE" ? "Tutte le categorie" : formatCategoria(exportCategoriaInventario)} · {exportTipologiaInventario} · Branche: {exportBrancheInventario.length ? exportBrancheInventario.length : "tutte"} · {exportCostruttoreInventario} · {exportRepartoInventario} · {exportSocietaInventario} · {exportLocazioneInventario} · {exportOrdineInventario}
                    </div>
                    <div style={styles.exportActionRow}>
                      <button style={{
                  ...styles.primaryBtn,
                  flex: 1
                }} onClick={() => exportInventarioFmed("excel")}>Excel</button>
                      <button style={{
                  ...styles.secondaryBtn,
                  flex: 1
                }} onClick={() => exportInventarioFmed("pdf")}>PDF</button>
                    </div>
                  </div>}
              </div>

              <div className="fmed-report-accordion-item" style={styles.exportAccordionItem}>
                <button type="button" className="fmed-report-accordion-header" style={styles.exportAccordionHeader} onClick={() => setExportPanelAperto(exportPanelAperto === "interventi" ? null : "interventi")}>
                  <div className="fmed-report-accordion-title-wrap" style={styles.exportAccordionTitleWrap}>
                    <span style={styles.exportAccordionIcon}>🛠️</span>
                    <div>
                      <div style={styles.exportAccordionTitle}>Export Interventi</div>
                      <div style={styles.exportAccordionSubtitle}>Storico interventi filtrato.</div>
                    </div>
                  </div>
                  <span style={styles.exportAccordionChevron}>{exportPanelAperto === "interventi" ? "▲" : "▼"}</span>
                </button>

                {exportPanelAperto === "interventi" && <div style={styles.exportAccordionBody}>
                    <div style={styles.exportInlineGrid}>
                      <select style={styles.select} value={exportSedeInterventi} onChange={e => {
                  setExportSedeInterventi(e.target.value);
                  setExportSediInterventi([]);
                }}>
                        <option value="TUTTE">Tutte le sedi</option>
                        {listaSediInterventi.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select style={styles.select} value={exportCodiceInterventi} onChange={e => setExportCodiceInterventi(e.target.value)}>
                        <option value="TUTTI">Tutti i codici</option>
                        {listaCodiciFiltroInterventi.map(codice => <option key={codice} value={codice}>{codice}</option>)}
                      </select>
                      <select style={styles.select} value={exportTipologiaInterventi} onChange={e => setExportTipologiaInterventi(e.target.value)}>
                        <option value="TUTTE">Tutte le tipologie</option>
                        {listaTipologieFiltroInterventi.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <select style={styles.select} value={exportSocietaInterventi} onChange={e => setExportSocietaInterventi(e.target.value)}>
                        <option value="TUTTE">Tutte le ditte/società</option>
                        {listaSocietaInterventi.map(soc => <option key={soc} value={soc}>{soc}</option>)}
                      </select>
                      <select style={styles.select} value={exportAnnoInterventi} onChange={e => setExportAnnoInterventi(e.target.value)}>
                        <option value="TUTTI">Tutti gli anni</option>
                        {listaAnniContabiliInterventi.map(anno => <option key={anno} value={anno}>{anno}</option>)}
                      </select>
                      <select style={styles.select} value={exportScadenzaInterventi} onChange={e => setExportScadenzaInterventi(e.target.value)}>
                        <option value="VALIDI">Solo validi/non scaduti alla data export</option>
                        <option value="PROSSIMITA">Solo in prossimità di scadenza</option>
                        <option value="NON_SCADUTI">Solo non scaduti oltre 30 giorni</option>
                        <option value="SCADUTI">Solo scaduti</option>
                        <option value="SENZA_SCADENZA">Senza prossima scadenza</option>
                        <option value="TUTTI">Tutte le scadenze</option>
                      </select>
                      <input type="date" style={styles.input} value={exportDataInterventiDa} onChange={e => setExportDataInterventiDa(e.target.value)} />
                      <input type="date" style={styles.input} value={exportDataInterventiA} onChange={e => setExportDataInterventiA(e.target.value)} />
                    </div>

                    {renderFiltroSediInterventiExport()}

                    {renderFiltroBrancheExport("Filtro multiplo branca", exportBrancheInterventi, setExportBrancheInterventi)}

                    <div style={styles.exportFilterBox}>
                      <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  marginBottom: 5
                }}>
                        <div style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "var(--fmed-text)"
                  }}>Attività da includere nell'export</div>
                        <div style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap"
                  }}>
                          <button type="button" style={styles.miniActionBtn} onClick={selezionaTutteAttivitaExportInterventi}>Tutte</button>
                          <button type="button" style={styles.miniActionBtn} onClick={escludiTutteAttivitaExportInterventi}>Nessuna</button>
                        </div>
                      </div>

                      <div style={styles.exportCheckboxGrid}>
                        {listaAttivitaExportInterventi.map(attivita => <label key={attivita} style={styles.exportCheckLabel}>
                            <input type="checkbox" checked={!exportAttivitaInterventiEscluse.includes(attivita)} onChange={() => toggleAttivitaExportInterventi(attivita)} />
                            <span>{attivita}</span>
                          </label>)}
                      </div>

                      <div style={{
                  marginTop: 8,
                  fontSize: 11,
                  color: "var(--fmed-muted)",
                  fontWeight: 400
                }}>
                        Incluse: {attivitaExportIncluse.length} / {listaAttivitaExportInterventi.length}
                      </div>
                    </div>

                    <div style={styles.exportFilterBox}>
                      <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  marginBottom: 5
                }}>
                        <div style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "var(--fmed-text)"
                  }}>Cespiti da esportare negli interventi</div>
                        <div style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap"
                  }}>
                          <button type="button" style={styles.miniActionBtn} onClick={() => selezionaTuttiCespitiInterventi(codiciInterventiExportVisibili)}>Seleziona visibili</button>
                          <button type="button" style={styles.miniActionBtn} onClick={() => setExportCespitiInterventiSelezionati([])}>Nessuno</button>
                        </div>
                      </div>

                      <input style={{
                  ...styles.input,
                  marginBottom: 5
                }} value={exportRicercaCespiteInterventi} onChange={e => setExportRicercaCespiteInterventi(e.target.value)} placeholder="Cerca codice cespite da esportare..." />

                      <div style={{
                  ...styles.exportCheckboxGrid,
                  maxHeight: 170,
                  overflowY: "auto"
                }}>
                        {codiciInterventiExportVisibili.slice(0, 300).map(codice => <label key={codice} style={styles.exportCheckLabel}>
                            <input type="checkbox" checked={exportCespitiInterventiSelezionati.includes(codice)} onChange={() => toggleCespiteExportInterventi(codice)} />
                            <span>{codice}</span>
                          </label>)}
                      </div>

                      {codiciInterventiExportVisibili.length > 300 && <div style={{
                  marginTop: 6,
                  fontSize: 11,
                  color: "var(--fmed-muted)",
                  fontWeight: 400
                }}>
                          Mostrati i primi 300 codici: usa la ricerca per trovare gli altri.
                        </div>}

                      <div style={{
                  marginTop: 8,
                  fontSize: 11,
                  color: "var(--fmed-muted)",
                  fontWeight: 400
                }}>
                        Disponibili: {codiciInterventiExport.length} · Visibili: {codiciInterventiExportVisibili.length} · Selezionati: {exportCespitiInterventiSelezionati.length}. Se non selezioni nulla, esporta tutti gli interventi filtrati.
                      </div>
                    </div>

                    <div style={styles.exportActionRow}>
                      <button style={{
                  ...styles.primaryBtn,
                  flex: 1
                }} onClick={() => exportInterventiFmed("excel")}>Excel</button>
                      <button style={{
                  ...styles.secondaryBtn,
                  flex: 1
                }} onClick={() => exportInterventiFmed("pdf")}>PDF</button>
                    </div>
                  </div>}
              </div>

              <div className="fmed-report-accordion-item" style={styles.exportAccordionItem}>
                <button type="button" className="fmed-report-accordion-header" style={styles.exportAccordionHeader} onClick={() => setExportPanelAperto(exportPanelAperto === "scadenze" ? null : "scadenze")}>
                  <div className="fmed-report-accordion-title-wrap" style={styles.exportAccordionTitleWrap}>
                    <span style={styles.exportAccordionIcon}>📅</span>
                    <div>
                      <div style={styles.exportAccordionTitle}>Export Scadenze</div>
                      <div style={styles.exportAccordionSubtitle}>Scadenze visibili o selezionate.</div>
                    </div>
                  </div>
                  <span style={styles.exportAccordionChevron}>{exportPanelAperto === "scadenze" ? "▲" : "▼"}</span>
                </button>

                {exportPanelAperto === "scadenze" && <div style={styles.exportAccordionBody}>
                    <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 10
              }}>
                      <div style={styles.exportInfoLine}>
                        Visibili: {scadenzeVisualizzate.length} · Selezionate: {scadenzeSelezionateVisualizzate.length}
                      </div>
                      <div style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap"
                }}>
                        <button type="button" style={styles.miniActionBtn} onClick={resetFiltriScadenze}>Reset filtri</button>
                        <button type="button" style={styles.miniActionBtn} onClick={selezionaTutteScadenzeVisualizzate}>Seleziona visibili</button>
                        <button type="button" style={styles.miniActionBtn} onClick={deselezionaTutteScadenze}>Nessuna</button>
                      </div>
                    </div>
                    <div style={styles.exportInlineGrid}>
                      <select style={styles.select} value={filtroScadenze} onChange={e => setFiltroScadenze(e.target.value)}>
                        <option value="TUTTE">Tutti gli stati</option>
                        <option value="SCADUTA">Scadute</option>
                        <option value="30_GIORNI">Entro 30 giorni</option>
                        <option value="60_GIORNI">Entro 60 giorni</option>
                        <option value="REGOLARE">Regolari</option>
                      </select>
                      <select style={styles.select} value={filtroScadenzeCodice} onChange={e => setFiltroScadenzeCodice(e.target.value)}>
                        <option value="TUTTE">Tutti i codici</option>
                        {listaCodiciFiltroScadenze.map(codice => <option key={codice} value={codice}>{codice}</option>)}
                      </select>
                      <select style={styles.select} value={filtroScadenzeSede} onChange={e => setFiltroScadenzeSede(e.target.value)}>
                        <option value="TUTTE">Tutte le sedi</option>
                        {listaSediFiltroScadenze.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select style={styles.select} value={filtroScadenzeTipologia} onChange={e => setFiltroScadenzeTipologia(e.target.value)}>
                        <option value="TUTTE">Tutte le tipologie</option>
                        {listaTipologieFiltroScadenze.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <select style={styles.select} value={filtroScadenzeAttivita} onChange={e => setFiltroScadenzeAttivita(e.target.value)}>
                        <option value="TUTTE">Tutte le attività</option>
                        {listaAttivitaFiltroScadenze.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                      <select style={styles.select} value={filtroScadenzeDitta} onChange={e => setFiltroScadenzeDitta(e.target.value)}>
                        <option value="TUTTE">Tutte le ditte</option>
                        {listaDitteFiltroScadenze.map(d => <option key={d} value={d}>{normalizzaSocietaDitta(d)}</option>)}
                      </select>
                      <input type="date" style={styles.input} value={filtroScadenzeProssimaDa} onChange={e => setFiltroScadenzeProssimaDa(e.target.value)} />
                      <input type="date" style={styles.input} value={filtroScadenzeProssimaA} onChange={e => setFiltroScadenzeProssimaA(e.target.value)} />
                    </div>
                    {renderFiltroBrancheExport("Filtro multiplo branca", exportBrancheScadenze, setExportBrancheScadenze)}
                    <div style={styles.exportActionRow}>
                      <button style={{
                  ...styles.primaryBtn,
                  flex: 1
                }} onClick={() => exportScadenzeExcelFmed("excel")}>Excel</button>
                      <button style={{
                  ...styles.secondaryBtn,
                  flex: 1
                }} onClick={() => exportScadenzeExcelFmed("pdf")}>PDF</button>
                    </div>
                  </div>}
              </div>

              <div className="fmed-report-accordion-item" style={styles.exportAccordionItem}>
                <button type="button" className="fmed-report-accordion-header" style={styles.exportAccordionHeader} onClick={() => setExportPanelAperto(exportPanelAperto === "budget" ? null : "budget")}>
                  <div className="fmed-report-accordion-title-wrap" style={styles.exportAccordionTitleWrap}>
                    <span style={styles.exportAccordionIcon}>🧠</span>
                    <div>
                      <div style={styles.exportAccordionTitle}>Export Budget Criticità</div>
                      <div style={styles.exportAccordionSubtitle}>Budget manutentivo con criticità VERDE/GIALLO/ROSSO dallo storico interventi.</div>
                    </div>
                  </div>
                  <span style={styles.exportAccordionChevron}>{exportPanelAperto === "budget" ? "▲" : "▼"}</span>
                </button>

                {exportPanelAperto === "budget" && <div style={styles.exportAccordionBody}>
                    <div style={styles.exportInlineGrid}>
                      <select style={styles.select} value={exportBudgetSede} onChange={e => setExportBudgetSede(e.target.value)}>
                        <option value="TUTTE">Tutte le sedi</option>
                        {listaSedi.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select style={styles.select} value={exportBudgetStato} onChange={e => setExportBudgetStato(e.target.value)}>
                        <option value="TUTTI">Tutti gli stati</option>
                        {listaStatiAsset.map(stato => <option key={stato} value={stato}>{stato}</option>)}
                      </select>
                      <select style={styles.select} value={exportBudgetTipologia} onChange={e => setExportBudgetTipologia(e.target.value)}>
                        <option value="TUTTE">Tutte le tipologie</option>
                        {listaTipologie.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <select style={styles.select} value={exportBudgetCostruttore} onChange={e => setExportBudgetCostruttore(e.target.value)}>
                        <option value="TUTTI">Tutti i costruttori</option>
                        {listaCostruttori.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <select style={styles.select} value={exportBudgetCriticita} onChange={e => setExportBudgetCriticita(e.target.value)}>
                        <option value="TUTTE">Tutte le criticità</option>
                        <option value="ROSSO">ROSSO</option>
                        <option value="GIALLO">GIALLO</option>
                        <option value="VERDE">VERDE</option>
                      </select>
                    </div>
                    {renderFiltroBrancheExport("Filtro multiplo branca", exportBrancheBudget, setExportBrancheBudget)}
                    <div style={styles.exportActionRow}>
                      <button style={{
                  ...styles.primaryBtn,
                  flex: 1
                }} onClick={() => exportBudgetCriticitaFmed("excel")}>Excel</button>
                      <button style={{
                  ...styles.secondaryBtn,
                  flex: 1
                }} onClick={() => exportBudgetCriticitaFmed("pdf")}>PDF</button>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
  );
}
