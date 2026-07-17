import FmedModuleIcon from "../FmedModuleIcon.jsx";

export default function InterventiHero({ styles, filteredCount, totalCount }) {
  return (
    <section className="fmed-module-hero fmed-module-hero-interventi" style={styles.interventiHeroPanel}>
      <div className="fmed-module-hero-heading">
        <FmedModuleIcon module="Interventi" />
        <div className="fmed-module-hero-copy" style={styles.interventiHeroLeft}>
          <div className="fmed-module-hero-eyebrow" style={styles.interventiHeroEyebrow}>Registro manutentivo</div>
          <h2 className="fmed-module-hero-title" style={styles.interventiHeroTitle}>Gestione interventi</h2>
          <p className="fmed-module-hero-subtitle" style={styles.interventiHeroSubtitle}>
            Cerca, filtra e consulta gli interventi per sede, ditta, attività, cespite e periodo contabile. L’elenco si apre solo quando ti serve, già filtrato.
          </p>
        </div>
      </div>
      <div className="fmed-module-hero-metric" style={styles.interventiHeroRight}>
        <div className="fmed-module-hero-metric-value" style={styles.interventiHeroBadgeNumber}>{filteredCount}</div>
        <div className="fmed-module-hero-metric-label" style={styles.interventiHeroBadgeText}>Interventi visualizzati</div>
        <div className="fmed-module-hero-metric-sub" style={styles.interventiHeroBadgeSub}>Su {totalCount} totali</div>
      </div>
    </section>
  );
}
