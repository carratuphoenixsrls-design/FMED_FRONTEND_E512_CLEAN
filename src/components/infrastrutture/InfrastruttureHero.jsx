import FmedModuleIcon from "../FmedModuleIcon.jsx";

export default function InfrastruttureHero({ styles, filteredCount, totalCount }) {
  return (
    <section className="fmed-module-hero fmed-module-hero-infrastrutture" style={styles.assetHeroPanel}>
      <div className="fmed-module-hero-heading">
        <FmedModuleIcon module="Infrastrutture" />
        <div className="fmed-module-hero-copy" style={styles.assetHeroLeft}>
          <div className="fmed-module-hero-eyebrow" style={styles.assetHeroEyebrow}>Scadenziario infrastrutture</div>
          <h2 className="fmed-module-hero-title" style={styles.assetHeroTitle}>Manutenzioni infrastrutturali</h2>
          <p className="fmed-module-hero-subtitle" style={styles.assetHeroSubtitle}>
            Impianti, contratti e attività tecniche con sedi, documentazione e scadenze integrate.
          </p>
        </div>
      </div>
      <div className="fmed-module-hero-metric" style={styles.assetHeroRight}>
        <div className="fmed-module-hero-metric-value" style={styles.assetHeroBadgeNumber}>{filteredCount}</div>
        <div className="fmed-module-hero-metric-label" style={styles.assetHeroBadgeText}>Attività visibili</div>
        <div className="fmed-module-hero-metric-sub" style={styles.assetHeroBadgeSub}>Su {totalCount} totali</div>
      </div>
    </section>
  );
}
