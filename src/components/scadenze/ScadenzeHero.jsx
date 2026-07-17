import FmedModuleIcon from "../FmedModuleIcon.jsx";

export default function ScadenzeHero({ styles, filteredCount, totalCount }) {
  return (
    <section className="fmed-module-hero fmed-module-hero-scadenze" style={styles.scadenzeHeroPanel}>
      <div className="fmed-module-hero-heading">
        <FmedModuleIcon module="Scadenze" />
        <div className="fmed-module-hero-copy" style={styles.scadenzeHeroLeft}>
          <div className="fmed-module-hero-eyebrow" style={styles.scadenzeHeroEyebrow}>Motore cicli unificato</div>
          <h2 className="fmed-module-hero-title" style={styles.scadenzeHeroTitle}>Scadenze operative unificate</h2>
          <p className="fmed-module-hero-subtitle" style={styles.scadenzeHeroSubtitle}>
            Un solo ciclo corrente per ciascun elemento e famiglia: Asset, Infrastrutture e Sicurezza 81/08 senza sovrapposizioni false.
          </p>
        </div>
      </div>
      <div className="fmed-module-hero-metric" style={styles.scadenzeHeroRight}>
        <div className="fmed-module-hero-metric-value" style={styles.scadenzeHeroBadgeNumber}>{filteredCount}</div>
        <div className="fmed-module-hero-metric-label" style={styles.scadenzeHeroBadgeText}>Cicli operativi visibili</div>
        <div className="fmed-module-hero-metric-sub" style={styles.scadenzeHeroBadgeSub}>Su {totalCount} totali</div>
      </div>
    </section>
  );
}
