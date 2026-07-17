function AssetSelect({ ariaLabel, value, onChange, style, children }) {
  return (
    <select aria-label={ariaLabel} value={value} onChange={onChange} style={style}>
      {children}
    </select>
  );
}

export default function AssetControls(props) {
  const {
    styles,
    filtrati,
    sede,
    categoriaFiltro,
    formatCategoria,
    assetLocazioneFiltro,
    assetStatoFiltro,
    ricerca,
    setRicerca,
    setAssetElencoAperto,
    setSede,
    setAssetLocazioneFiltro,
    listaSediAsset,
    setCategoriaFiltro,
    listaCategorie,
    assetRepartoFiltro,
    setAssetRepartoFiltro,
    listaBranche,
    listaLocazioniAsset,
    assetTipologiaFiltro,
    setAssetTipologiaFiltro,
    listaTipologie,
    assetCostruttoreFiltro,
    setAssetCostruttoreFiltro,
    listaCostruttori,
    assetModelloFiltro,
    setAssetModelloFiltro,
    listaModelli,
    assetSocietaFiltro,
    setAssetSocietaFiltro,
    listaSocieta,
    setAssetStatoFiltro,
    listaStatiAsset,
    ordineCodiceAsset,
    setOrdineCodiceAsset,
    assetElencoAperto,
    setAssetAnalisiAperta,
    assetAnalisiAperta,
    setAssetBulkBranca,
    setAssetBulkSede,
    setAssetBulkLocazione,
    setAssetBulkStato,
    setAssetBulkSocieta,
    setAssetSelezionatiBulk,
    setCodiceCespiteAutomatico,
    avviaProcessoGuidatoFmed,
    setImpostazioniTab,
    setPagina,
  } = props;

  const closeAssetList = () => setAssetElencoAperto(false);

  const resetFilters = () => {
    setRicerca("");
    setSede("TUTTE");
    setCategoriaFiltro("TUTTE");
    setAssetRepartoFiltro("TUTTI");
    setAssetLocazioneFiltro("TUTTE");
    setAssetCostruttoreFiltro("TUTTI");
    setAssetTipologiaFiltro("TUTTE");
    setAssetModelloFiltro("TUTTI");
    setAssetSocietaFiltro("TUTTE");
    setAssetStatoFiltro("TUTTI");
    setOrdineCodiceAsset("CODICE_ASC");
    setAssetBulkBranca("");
    setAssetBulkSede("");
    setAssetBulkLocazione("");
    setAssetBulkStato("");
    setAssetBulkSocieta("");
    setAssetSelezionatiBulk([]);
    closeAssetList();
  };

  return (
    <div style={styles.assetFiltersPanel}>
      <div style={styles.assetFiltersHeader}>
        <div>
          <h3 style={styles.assetSectionTitle}>Filtri inventario</h3>
          <p style={styles.assetSectionSubtitle}>Filtri sempre visibili per ricerca rapida in stile gestionale desktop.</p>
        </div>
        <div style={styles.assetFilterChips}>
          <span style={styles.assetChip}>Sede: {sede}</span>
          <span style={styles.assetChip}>
            Categoria: {categoriaFiltro === "TUTTE" ? "TUTTE" : formatCategoria(categoriaFiltro)}
          </span>
          <span style={styles.assetChip}>Stanza: {assetLocazioneFiltro}</span>
          <span style={styles.assetChip}>Stato: {assetStatoFiltro}</span>
        </div>
      </div>

      <div style={styles.assetFiltersGrid}>
        <input
          aria-label="Ricerca asset"
          placeholder="Cerca per codice, tipologia, matricola, modello o costruttore..."
          value={ricerca}
          onChange={(event) => {
            setRicerca(event.target.value);
            closeAssetList();
          }}
          style={styles.assetInputLarge}
        />

        <AssetSelect
          ariaLabel="Filtra asset per sede"
          value={sede}
          onChange={(event) => {
            setSede(event.target.value);
            setAssetLocazioneFiltro("TUTTE");
            closeAssetList();
          }}
          style={styles.assetSelectLarge}
        >
          {listaSediAsset.map((item) => <option key={item} value={item}>{item}</option>)}
        </AssetSelect>

        <AssetSelect
          ariaLabel="Filtra asset per categoria"
          value={categoriaFiltro}
          onChange={(event) => {
            setCategoriaFiltro(event.target.value);
            closeAssetList();
          }}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTE">Tutte le categorie</option>
          {listaCategorie.map((item) => <option key={item} value={item}>{formatCategoria(item)}</option>)}
        </AssetSelect>

        <AssetSelect
          ariaLabel="Filtra asset per branca"
          value={assetRepartoFiltro}
          onChange={(event) => {
            setAssetRepartoFiltro(event.target.value);
            closeAssetList();
          }}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTI">Tutte le branche</option>
          {listaBranche.map((item) => <option key={item} value={item}>{item}</option>)}
        </AssetSelect>

        <AssetSelect
          ariaLabel="Filtra asset per stanza o locazione"
          value={assetLocazioneFiltro}
          onChange={(event) => {
            setAssetLocazioneFiltro(event.target.value);
            closeAssetList();
          }}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTE">Tutte le stanze / locazioni</option>
          {listaLocazioniAsset.map((item) => <option key={item} value={item}>{item}</option>)}
        </AssetSelect>

        <AssetSelect
          ariaLabel="Filtra asset per tipologia"
          value={assetTipologiaFiltro}
          onChange={(event) => {
            setAssetTipologiaFiltro(event.target.value);
            closeAssetList();
          }}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTE">Tutte le tipologie</option>
          {listaTipologie.map((item) => <option key={item} value={item}>{item}</option>)}
        </AssetSelect>

        <AssetSelect
          ariaLabel="Filtra asset per costruttore"
          value={assetCostruttoreFiltro}
          onChange={(event) => {
            setAssetCostruttoreFiltro(event.target.value);
            closeAssetList();
          }}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTI">Tutti i costruttori</option>
          {listaCostruttori.map((item) => <option key={item} value={item}>{item}</option>)}
        </AssetSelect>

        <AssetSelect
          ariaLabel="Filtra asset per modello"
          value={assetModelloFiltro}
          onChange={(event) => {
            setAssetModelloFiltro(event.target.value);
            closeAssetList();
          }}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTI">Tutti i modelli</option>
          {listaModelli.map((item) => <option key={item} value={item}>{item}</option>)}
        </AssetSelect>

        <AssetSelect
          ariaLabel="Filtra asset per società"
          value={assetSocietaFiltro}
          onChange={(event) => {
            setAssetSocietaFiltro(event.target.value);
            setSede("TUTTE");
            setAssetLocazioneFiltro("TUTTE");
            closeAssetList();
          }}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTE">Tutte le società</option>
          {listaSocieta.map((item) => <option key={item} value={item}>{item}</option>)}
        </AssetSelect>

        <AssetSelect
          ariaLabel="Filtra asset per stato"
          value={assetStatoFiltro}
          onChange={(event) => {
            setAssetStatoFiltro(event.target.value);
            closeAssetList();
          }}
          style={styles.assetSelectLarge}
        >
          <option value="TUTTI">Tutti gli stati</option>
          {listaStatiAsset.map((item) => <option key={item} value={item}>{item}</option>)}
        </AssetSelect>

        <AssetSelect
          ariaLabel="Ordina elenco asset"
          value={ordineCodiceAsset}
          onChange={(event) => setOrdineCodiceAsset(event.target.value)}
          style={styles.assetSelectLarge}
        >
          <option value="CODICE_ASC">Ordina: codice crescente</option>
          <option value="CODICE_DESC">Ordina: codice decrescente</option>
          <option value="LOCAZIONE_ASC">Ordina: stanza / locazione</option>
          <option value="REPARTO_ASC">Ordina: branca</option>
          <option value="SEDE_ASC">Ordina: sede</option>
          <option value="TIPOLOGIA_ASC">Ordina: tipologia</option>
          <option value="COSTRUTTORE_ASC">Ordina: costruttore</option>
          <option value="STATO_ASC">Ordina: stato</option>
        </AssetSelect>
      </div>

      <div style={styles.assetActionsBar}>
        <button style={styles.assetPrimaryAction} onClick={() => setAssetElencoAperto((value) => !value)}>
          {assetElencoAperto ? "▲ Nascondi elenco" : `📋 Apri elenco filtrato (${filtrati.length})`}
        </button>

        <button style={styles.assetSecondaryAction} onClick={() => setAssetAnalisiAperta((value) => !value)}>
          {assetAnalisiAperta ? "▲ Nascondi analisi" : "📊 Analizza asset filtrati"}
        </button>

        <button style={styles.assetGhostAction} onClick={resetFilters}>
          ♻️ Reset filtri
        </button>

        <button
          style={styles.assetGhostAction}
          onClick={() => {
            setCodiceCespiteAutomatico(true);
            avviaProcessoGuidatoFmed("NUOVO_ASSET");
          }}
        >
          ➕ Nuovo asset
        </button>

        <button
          style={styles.assetGhostAction}
          onClick={() => {
            setImpostazioniTab("MASTER_DATA");
            setPagina("Gestione Utenti");
          }}
        >
          ⚙️ Master Data
        </button>
      </div>
    </div>
  );
}
