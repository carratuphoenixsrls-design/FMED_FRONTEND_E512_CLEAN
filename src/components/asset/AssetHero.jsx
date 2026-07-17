import FmedModuleIcon from "../FmedModuleIcon.jsx";

export default function AssetHero({ styles, filteredCount, totalCount }) {
  return (
    <section className="fmed-module-hero fmed-module-hero-asset" style={styles.assetHeroPanel}>
      <div className="fmed-module-hero-heading">
        <FmedModuleIcon module="Asset" />
        <div className="fmed-module-hero-copy" style={styles.assetHeroLeft}>
          <div className="fmed-module-hero-eyebrow" style={styles.assetHeroEyebrow}>Inventario tecnico</div>
          <h2 className="fmed-module-hero-title" style={styles.assetHeroTitle}>Gestione asset</h2>
          <p className="fmed-module-hero-subtitle" style={styles.assetHeroSubtitle}>
            Cerca, filtra e consulta gli asset per sede, categoria e stato. L’elenco si apre solo quando ti serve, già filtrato.
          </p>
        </div>
      </div>
      <div className="fmed-module-hero-metric" style={styles.assetHeroRight}>
        <div className="fmed-module-hero-metric-value" style={styles.assetHeroBadgeNumber}>{filteredCount}</div>
        <div className="fmed-module-hero-metric-label" style={styles.assetHeroBadgeText}>Asset visualizzati</div>
        <div className="fmed-module-hero-metric-sub" style={styles.assetHeroBadgeSub}>Su {totalCount} totali</div>
      </div>
    </section>
  );
}
