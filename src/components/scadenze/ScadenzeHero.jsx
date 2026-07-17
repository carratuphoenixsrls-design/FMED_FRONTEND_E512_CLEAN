import FmedModuleIcon from "../FmedModuleIcon.jsx";

export default function ScadenzeHero({ styles, filteredCount, totalCount }) {
  return (
    <section className="fmed-module-hero fmed-module-hero-scadenze" style={styles.scadenzeHeroPanel}>
      <div className="fmed-module-hero-heading">
        <FmedModuleIcon module="Scadenze" />
        <div className="fmed-module-hero-copy" style={styles.scadenzeHeroLeft}>
          <div className="fmed-module-hero-eyebrow" style={styles.scadenzeHeroEyebrow}>Scadenziario tecnico</div>
          <h2 className="fmed-module-hero-title" style={styles.scadenzeHeroTitle}>Gestione scadenze</h2>
          <p className="fmed-module-hero-subtitle" style={styles.scadenzeHeroSubtitle}>
            Piano manutentivo filtrabile per stato, cespite, sede, attività, ditta e intervallo di scadenza.
          </p>
        </div>
      </div>
      <div className="fmed-module-hero-metric" style={styles.scadenzeHeroRight}>
        <div className="fmed-module-hero-metric-value" style={styles.scadenzeHeroBadgeNumber}>{filteredCount}</div>
        <div className="fmed-module-hero-metric-label" style={styles.scadenzeHeroBadgeText}>Scadenze visibili</div>
        <div className="fmed-module-hero-metric-sub" style={styles.scadenzeHeroBadgeSub}>Su {totalCount} totali</div>
      </div>
    </section>
  );
}
