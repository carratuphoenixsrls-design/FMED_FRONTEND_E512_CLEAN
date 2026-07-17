export default function InfrastruttureRowActions(props) {
  const {
    styles,
    infrastruttura,
    permessiRuoloFmed,
    apriMenuAttivitaInfrastruttura,
    apriMenuDocumentazioneInfrastruttura,
    apriReportInfrastruttura,
    apriMenuAllegaInfrastruttura,
    apriModificaInfrastruttura,
    eliminaInfrastruttura,
    eliminazioneInfraLoading,
  } = props;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      <button
        type="button"
        style={styles.assetSecondaryAction}
        title="Apri attività ordinarie o straordinarie"
        onClick={() => apriMenuAttivitaInfrastruttura(infrastruttura)}
      >
        🔧 Attività
      </button>
      <button
        type="button"
        style={styles.assetSecondaryAction}
        title="Apri documentazione SharePoint"
        onClick={() => apriMenuDocumentazioneInfrastruttura(infrastruttura)}
      >
        📚 Documentazione
      </button>
      <button
        type="button"
        style={{
          ...styles.assetSecondaryAction,
          background: "#E8F7F8",
          borderColor: "#BEE3E8",
          color: "#047481",
        }}
        title="Apri link report"
        onClick={() => apriReportInfrastruttura(infrastruttura)}
      >
        📊 Report
      </button>
      <button
        type="button"
        style={{
          ...styles.assetSecondaryAction,
          background: "#FFF7E6",
          borderColor: "#F2D19B",
          color: "#9A5B00",
        }}
        title="Apri la cartella SharePoint corretta per allegare un file"
        onClick={() => apriMenuAllegaInfrastruttura(infrastruttura)}
      >
        📎 Allega
      </button>
      {permessiRuoloFmed.canEdit && (
        <button
          type="button"
          style={styles.assetGhostAction}
          title="Modifica infrastruttura"
          onClick={() => apriModificaInfrastruttura(infrastruttura)}
        >
          ✏️
        </button>
      )}
      {permessiRuoloFmed.canEdit && (
        <button
          type="button"
          style={styles.dangerButton}
          title="Elimina infrastruttura"
          onClick={() => eliminaInfrastruttura(infrastruttura)}
          disabled={eliminazioneInfraLoading}
        >
          🗑
        </button>
      )}
    </div>
  );
}
