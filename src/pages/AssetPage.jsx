import AssetControls from "../components/asset/AssetControls";
import AssetHero from "../components/asset/AssetHero";

export default function AssetPage(props) {
  const {
    styles,
    filtrati,
    cespiti,
    setAssetElencoAperto,
    listaBranche,
    listaSocieta,
    ordineCodiceAsset,
    setOrdineCodiceAsset,
    assetElencoAperto,
    assetAnalisiAperta,
    setAssetBulkBranca,
    setAssetBulkSede,
    setAssetBulkLocazione,
    setAssetBulkStato,
    setAssetBulkSocieta,
    setAssetSelezionatiBulk,
    assetKpiFiltrati,
    assetPerSedeFiltrati,
    assetPerRepartoFiltrati,
    assetPerCostruttoreFiltrati,
    assetPerStatoFiltrati,
    assetSelezionatiBulk,
    assetBulkBranca,
    assetBulkSaving,
    assetBulkSocieta,
    assetBulkSede,
    listaSedi,
    assetBulkLocazione,
    getListaLocazioniPerSede,
    assetBulkStato,
    STATI_ASSET_STANDARD,
    salvaModificaMultiplaBrancaAsset,
    selezionaTuttiAssetFiltratiBulk,
    filtratiRenderizzati,
    getCodiceAssetBulk,
    toggleSelezioneAssetVisibiliBulk,
    assetQuickEditCodice,
    apriSchedaCespite,
    toggleSelezioneAssetBulk,
    assetQuickEditForm,
    aggiornaCampoModificaRapidaAsset,
    getBrancaAsset,
    getLocazioneFmed,
    statoCespite,
    coloreStatoAsset,
    assetQuickEditSaving,
    salvaModificaRapidaAsset,
    annullaModificaRapidaAsset,
    apriModificaRapidaAsset,
    setAssetRenderLimit,
    FMED_RENDER_BATCH_ASSET
  } = props;
  return (
<div className="fmed-asset-page">
            <AssetHero
              styles={styles}
              filteredCount={filtrati.length}
              totalCount={cespiti.length}
            />

            <AssetControls {...props} />

            <div style={{
          ...styles.assetKpiGrid,
          ...{}
        }}>
              <div style={styles.assetKpiCard}>
                <div style={styles.assetKpiTop}><span style={styles.assetKpiIcon}>📋</span><span style={styles.assetKpiLabel}>Asset filtrati</span></div>
                <strong style={styles.assetKpiValue}>{assetKpiFiltrati.totale}</strong>
                <span style={styles.assetKpiHint}>su {cespiti.length} totali</span>
              </div>
              <div style={styles.assetKpiCard}>
                <div style={styles.assetKpiTop}><span style={styles.assetKpiIcon}>✅</span><span style={styles.assetKpiLabel}>Attivi</span></div>
                <strong style={{
              ...styles.assetKpiValue,
              color: "#2FD37D"
            }}>{assetKpiFiltrati.attivi}</strong>
                <span style={styles.assetKpiHint}>operativi</span>
              </div>
              <div style={styles.assetKpiCard}>
                <div style={styles.assetKpiTop}><span style={styles.assetKpiIcon}>⛔</span><span style={styles.assetKpiLabel}>Dismessi</span></div>
                <strong style={{
              ...styles.assetKpiValue,
              color: "#FF4D5E"
            }}>{assetKpiFiltrati.dismessi}</strong>
                <span style={styles.assetKpiHint}>fuori inventario attivo</span>
              </div>
              <div style={styles.assetKpiCard}>
                <div style={styles.assetKpiTop}><span style={styles.assetKpiIcon}>🟠</span><span style={styles.assetKpiLabel}>Non in uso</span></div>
                <strong style={{
              ...styles.assetKpiValue,
              color: "#D99A00"
            }}>{assetKpiFiltrati.nonInUso}</strong>
                <span style={styles.assetKpiHint}>da verificare</span>
              </div>
            </div>

            {assetAnalisiAperta && <div style={{
          ...styles.assetAnalysisGrid,
          ...{}
        }}>
                <div style={styles.assetAnalysisCard}>
                  <h3 style={styles.assetAnalysisTitle}>📍 Distribuzione per sede</h3>
                  <div style={styles.assetRankList}>{assetPerSedeFiltrati.map(r => <div key={r.nome} style={styles.assetRankRow}><span>{r.nome}</span><strong>{r.totale}</strong></div>)}</div>
                </div>

                <div style={styles.assetAnalysisCard}>
                  <h3 style={styles.assetAnalysisTitle}>🏥 Distribuzione per branca</h3>
                  <div style={styles.assetRankList}>{assetPerRepartoFiltrati.map(r => <div key={r.nome} style={styles.assetRankRow}><span>{r.nome}</span><strong>{r.totale}</strong></div>)}</div>
                </div>

                <div style={styles.assetAnalysisCard}>
                  <h3 style={styles.assetAnalysisTitle}>🏭 Costruttori principali</h3>
                  <div style={styles.assetRankList}>{assetPerCostruttoreFiltrati.map(r => <div key={r.nome} style={styles.assetRankRow}><span>{r.nome}</span><strong>{r.totale}</strong></div>)}</div>
                </div>

                <div style={styles.assetAnalysisCard}>
                  <h3 style={styles.assetAnalysisTitle}>🚦 Stato asset</h3>
                  <div style={styles.assetRankList}>{assetPerStatoFiltrati.map(r => <div key={r.nome} style={styles.assetRankRow}><span>{r.nome}</span><strong>{r.totale}</strong></div>)}</div>
                </div>
              </div>}

            {assetElencoAperto && <div style={{
          ...styles.assetTableCard,
          ...{}
        }}>
                <div style={{
            ...styles.assetListHeader,
            ...{}
          }}>
                  <div>
                    <h3 style={styles.assetTableTitle}>Elenco asset filtrati</h3>
                    <p style={styles.assetTableSubtitle}>{filtrati.length} risultati su {cespiti.length}. Puoi modificare i campi principali direttamente dalla riga senza aprire la scheda.</p>
                  </div>
                  <button style={styles.assetCloseBtn} onClick={() => setAssetElencoAperto(false)}>Chiudi</button>
                </div>

                <div className="fmed-asset-bulk-toolbar" style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 10,
            padding: "12px 14px",
            margin: "10px 0 14px",
            border: "1px solid var(--fmed-bulk-panel-border, rgba(31,174,156,.22))",
            borderRadius: 16,
            background: "var(--fmed-bulk-panel-bg, rgba(255,255,255,.72))",
            boxShadow: "var(--fmed-bulk-panel-shadow, 0 10px 24px rgba(15, 23, 42, 0.06))"
          }} onClick={e => e.stopPropagation()}>
                  <strong className="fmed-asset-bulk-title" style={{
              color: "var(--fmed-bulk-title, #0F4C5C)",
              fontSize: 14
            }}>✓ MODIFICA MULTIPLA ASSET</strong>
                  <span className="fmed-asset-bulk-count" style={{
              color: "var(--fmed-bulk-muted, #475569)",
              fontSize: 13
            }}>{assetSelezionatiBulk.length} SELEZIONATI</span>
                  <select value={assetBulkBranca} disabled={assetBulkSaving} onChange={e => setAssetBulkBranca(e.target.value)} style={{
              ...styles.assetQuickSelect,
              minWidth: 230,
              maxWidth: 320
            }}>
                    <option value="">BRANCA: NON MODIFICARE</option>
                    {listaBranche.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <select value={assetBulkSocieta} disabled={assetBulkSaving} onChange={e => setAssetBulkSocieta(e.target.value)} style={{
              ...styles.assetQuickSelect,
              minWidth: 210,
              maxWidth: 280
            }}>
                    <option value="">SOCIETÀ: NON MODIFICARE</option>
                    {listaSocieta.map(soc => <option key={soc} value={soc}>{soc}</option>)}
                  </select>
                  <select value={assetBulkSede} disabled={assetBulkSaving} onChange={e => {
              setAssetBulkSede(e.target.value);
              setAssetBulkLocazione("");
            }} style={{
              ...styles.assetQuickSelect,
              minWidth: 240,
              maxWidth: 360
            }}>
                    <option value="">SEDE: NON MODIFICARE</option>
                    {listaSedi.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <select value={assetBulkLocazione} disabled={assetBulkSaving || !assetBulkSede} onChange={e => setAssetBulkLocazione(e.target.value)} style={{
              ...styles.assetQuickSelect,
              minWidth: 220,
              maxWidth: 320
            }}>
                    <option value="">LOCAZIONE: NON MODIFICARE</option>
                    {getListaLocazioniPerSede(assetBulkSede || "TUTTE", assetBulkLocazione, true).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                  <select value={assetBulkStato} disabled={assetBulkSaving} onChange={e => setAssetBulkStato(e.target.value)} style={{
              ...styles.assetQuickSelect,
              minWidth: 190,
              maxWidth: 260
            }}>
                    <option value="">STATO: NON MODIFICARE</option>
                    {STATI_ASSET_STANDARD.map(stato => <option key={stato} value={stato}>{stato}</option>)}
                  </select>
                  <button type="button" style={{
              ...styles.assetQuickSaveBtn,
              padding: "9px 14px",
              borderRadius: 12
            }} disabled={assetBulkSaving || assetSelezionatiBulk.length === 0 || !(assetBulkBranca || assetBulkSede || assetBulkLocazione || assetBulkStato || assetBulkSocieta)} onClick={salvaModificaMultiplaBrancaAsset}>
                    {assetBulkSaving ? "SALVATAGGIO..." : "💾 APPLICA MODIFICHE"}
                  </button>
                  <button type="button" style={{
              ...styles.assetQuickEditBtn,
              padding: "9px 12px"
            }} disabled={assetBulkSaving} onClick={selezionaTuttiAssetFiltratiBulk}>
                    SELEZIONA TUTTI I FILTRATI
                  </button>
                  <button type="button" style={{
              ...styles.assetQuickCancelBtn,
              padding: "9px 12px",
              borderRadius: 12
            }} disabled={assetBulkSaving || assetSelezionatiBulk.length === 0} onClick={() => setAssetSelezionatiBulk([])}>
                    PULISCI SELEZIONE
                  </button>
                </div>

                {<div style={styles.tableWrap}>
                    <table style={styles.tableLarge}>
                      <thead>
                        <tr>
                          <th style={styles.thLarge}>
                            <input type="checkbox" aria-label="Seleziona asset visibili" checked={filtratiRenderizzati.length > 0 && filtratiRenderizzati.every(c => assetSelezionatiBulk.includes(getCodiceAssetBulk(c)))} onChange={e => toggleSelezioneAssetVisibiliBulk(e.target.checked)} />
                          </th>
                          <th style={{
                    ...styles.thLarge,
                    ...styles.assetStickyCol,
                    cursor: "pointer"
                  }} onClick={() => setOrdineCodiceAsset(ordineCodiceAsset === "CODICE_ASC" ? "CODICE_DESC" : "CODICE_ASC")}>CODICE ↕</th>
                          <th style={{
                    ...styles.thLarge,
                    cursor: "pointer"
                  }} onClick={() => setOrdineCodiceAsset("TIPOLOGIA_ASC")}>TIPOLOGIA ↕</th>
                          <th style={{
                    ...styles.thLarge,
                    cursor: "pointer"
                  }} onClick={() => setOrdineCodiceAsset("SEDE_ASC")}>SEDE ↕</th>
                          <th style={{
                    ...styles.thLarge,
                    cursor: "pointer"
                  }} onClick={() => setOrdineCodiceAsset("REPARTO_ASC")}>BRANCA ↕</th>
                          <th style={{
                    ...styles.thLarge,
                    cursor: "pointer"
                  }} onClick={() => setOrdineCodiceAsset("LOCAZIONE_ASC")}>LOCAZIONE ↕</th>
                          <th style={{
                    ...styles.thLarge,
                    cursor: "pointer"
                  }} onClick={() => setOrdineCodiceAsset("COSTRUTTORE_ASC")}>COSTRUTTORE ↕</th>
                          <th style={styles.thLarge}>MODELLO</th>
                          <th style={{
                    ...styles.thLarge,
                    cursor: "pointer"
                  }} onClick={() => setOrdineCodiceAsset("STATO_ASC")}>STATO ↕</th>
                          <th style={styles.thLarge}>AZIONI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtratiRenderizzati.map((c, i) => {
                  const codiceRiga = String(c?.codicestrumento || c?.codice_strumento || c?.codice || "").trim();
                  const inEdit = assetQuickEditCodice === codiceRiga;
                  return <tr key={codiceRiga || i} style={styles.trClickable} onClick={() => !inEdit && apriSchedaCespite(c)}>
                              <td style={styles.tdLarge} onClick={e => e.stopPropagation()}>
                                <input type="checkbox" aria-label={`Seleziona asset ${codiceRiga}`} checked={assetSelezionatiBulk.includes(codiceRiga)} onChange={e => toggleSelezioneAssetBulk(codiceRiga, e.target.checked)} />
                              </td>
                              <td style={{
                      ...styles.tdCodeLarge,
                      ...styles.assetStickyColBody
                    }}>{codiceRiga}</td>
                              <td style={styles.tdLarge}>
                                {inEdit ? <input style={styles.assetQuickInput} value={assetQuickEditForm.tipologia || ""} onClick={e => e.stopPropagation()} onChange={e => aggiornaCampoModificaRapidaAsset("tipologia", e.target.value)} /> : c.tipologia}
                              </td>
                              <td style={styles.tdLarge}>
                                {inEdit ? <select style={styles.assetQuickSelect} value={assetQuickEditForm.sede || c.sede || ""} onClick={e => e.stopPropagation()} onChange={e => {
                        aggiornaCampoModificaRapidaAsset("sede", e.target.value);
                        aggiornaCampoModificaRapidaAsset("locazione", "");
                      }}>
                                    <option value="">NON SPECIFICATA</option>
                                    {listaSedi.map(s => <option key={s} value={s}>{s}</option>)}
                                  </select> : c.sede}
                              </td>
                              <td style={styles.tdLarge}>
                                {inEdit ? <select style={styles.assetQuickSelect} value={assetQuickEditForm.branca_medica || ""} onClick={e => e.stopPropagation()} onChange={e => aggiornaCampoModificaRapidaAsset("branca_medica", e.target.value)}>
                                    <option value="">Non specificata</option>
                                    {listaBranche.map(r => <option key={r} value={r}>{r}</option>)}
                                  </select> : getBrancaAsset(c) || "-"}
                              </td>
                              <td style={styles.tdLarge}>
                                {inEdit ? <select style={styles.assetQuickSelect} value={assetQuickEditForm.locazione || ""} onClick={e => e.stopPropagation()} onChange={e => aggiornaCampoModificaRapidaAsset("locazione", e.target.value)}>
                                    <option value="">NON SPECIFICATA</option>
                                    {getListaLocazioniPerSede(assetQuickEditForm.sede || c.sede || "TUTTE", assetQuickEditForm.locazione || getLocazioneFmed(c), true).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                  </select> : getLocazioneFmed(c) || "-"}
                              </td>
                              <td style={styles.tdLarge}>
                                {inEdit ? <input style={styles.assetQuickInput} value={assetQuickEditForm.costruttore || ""} onClick={e => e.stopPropagation()} onChange={e => aggiornaCampoModificaRapidaAsset("costruttore", e.target.value)} /> : c.costruttore}
                              </td>
                              <td style={styles.tdLarge}>
                                {inEdit ? <input style={styles.assetQuickInput} value={assetQuickEditForm.modello || ""} onClick={e => e.stopPropagation()} onChange={e => aggiornaCampoModificaRapidaAsset("modello", e.target.value)} /> : c.modello}
                              </td>
                              <td style={styles.tdLarge}>
                                {inEdit ? <select style={styles.assetQuickSelect} value={assetQuickEditForm.stato_asset || statoCespite(c)} onClick={e => e.stopPropagation()} onChange={e => aggiornaCampoModificaRapidaAsset("stato_asset", e.target.value)}>
                                    {STATI_ASSET_STANDARD.map(stato => <option key={stato} value={stato}>{stato}</option>)}
                                  </select> : <>
                                    <span style={{
                          ...styles.statusDot,
                          background: coloreStatoAsset(statoCespite(c))
                        }} />
                                    {statoCespite(c)}
                                  </>}
                              </td>
                              <td style={styles.tdLarge} onClick={e => e.stopPropagation()}>
                                {inEdit ? <div style={styles.assetQuickActions}>
                                    <button type="button" style={styles.assetQuickSaveBtn} disabled={assetQuickEditSaving} onClick={() => salvaModificaRapidaAsset(c)}>💾</button>
                                    <button type="button" style={styles.assetQuickCancelBtn} disabled={assetQuickEditSaving} onClick={annullaModificaRapidaAsset}>✕</button>
                                  </div> : <button type="button" style={styles.assetQuickEditBtn} onClick={() => apriModificaRapidaAsset(c)}>✏️ Modifica</button>}
                              </td>
                            </tr>;
                })}
                      </tbody>
                    </table>
                  </div>}
                {filtrati.length > filtratiRenderizzati.length && <div style={styles.loadMoreRow}>
                    <button type="button" style={styles.assetSecondaryAction} onClick={() => setAssetRenderLimit(v => v + FMED_RENDER_BATCH_ASSET)}>
                      Mostra altri asset ({filtratiRenderizzati.length}/{filtrati.length})
                    </button>
                  </div>}
              </div>}
          </div>
  );
}
