import FmedModuleIcon from "./components/FmedModuleIcon.jsx";
import CoreStandardPage from "./CoreStandardPage.jsx";
import "./ImpostazioniPage.css";

const SETTINGS_SECTIONS = [
  {
    key: "UTENTI",
    title: "Utenti e permessi",
    description: "Ruoli e livelli di accesso al gestionale.",
  },
  {
    key: "MASTER_DATA",
    title: "Master Data",
    description: "Dizionari, relazioni e valori usati nei menu FMED.",
  },
];

export default function ImpostazioniPage({
  apiBaseUrl,
  canManage = false,
  activeTab = "UTENTI",
  onTabChange,
  onDataChanged,
  dictionariesOnly = false,
}) {
  const activeSection = SETTINGS_SECTIONS.find((section) => section.key === activeTab) || SETTINGS_SECTIONS[0];

  return (
    <section className="fmed-settings-page">
      {!dictionariesOnly && <>
        <header className="fmed-settings-head">
          <div className="fmed-banner-heading">
            <FmedModuleIcon module="Impostazioni" />
            <div className="fmed-banner-copy">
              <span className="fmed-module-kicker">Amministrazione FMED</span>
              <h2>Impostazioni</h2>
              <p>Gestisci accessi e dati centrali senza duplicare le funzioni operative di Asset, Interventi, Infrastrutture e Sicurezza 81/08.</p>
            </div>
          </div>
          <div className="fmed-settings-status">
            <small>Sezione attiva</small>
            <strong>{activeSection.title}</strong>
          </div>
        </header>

        <div className="fmed-settings-overview" aria-label="Aree amministrative">
          {SETTINGS_SECTIONS.map((section) => (
            <button
              key={section.key}
              type="button"
              className={activeTab === section.key ? "active" : ""}
              onClick={() => onTabChange?.(section.key)}
            >
              <span>{section.title}</span>
              <small>{section.description}</small>
            </button>
          ))}
        </div>

        <nav className="fmed-settings-tabs" aria-label="Sezioni impostazioni">
          <button type="button" className={activeTab === "UTENTI" ? "active" : ""} onClick={() => onTabChange?.("UTENTI")}>Utenti e permessi</button>
          <button type="button" className={activeTab === "MASTER_DATA" ? "active" : ""} onClick={() => onTabChange?.("MASTER_DATA")}>Master Data</button>
        </nav>
      </>}

      {activeTab === "UTENTI" && <div className="fmed-settings-users">
        <div className="fmed-settings-copy">
          <span className="fmed-module-kicker">Controllo accessi</span>
          <h3>Ruoli FMED</h3>
          <p>Questa sezione regola soltanto accessi e permessi. Non modifica asset, interventi, infrastrutture, scadenze o documenti.</p>
        </div>
        <div className="fmed-settings-role-grid">
          <article>
            <div className="fmed-settings-role-head"><strong>Admin</strong><span>Completo</span></div>
            <p>Accesso a dati, costi, report, SharePoint, Processi, Master Data e gestione utenti.</p>
          </article>
          <article>
            <div className="fmed-settings-role-head"><strong>Service</strong><span>Operativo</span></div>
            <p>Gestione tecnica di asset, interventi, scadenze e documentazione autorizzata.</p>
          </article>
          <article>
            <div className="fmed-settings-role-head"><strong>User</strong><span>Consultazione</span></div>
            <p>Visualizzazione delle informazioni essenziali previste dal proprio livello di accesso.</p>
          </article>
        </div>
        <div className="fmed-settings-note"><strong>Regola FMED:</strong> Processi e moduli operativi restano nella sidebar; qui sono presenti soltanto configurazione e amministrazione.</div>
      </div>}

      {activeTab === "MASTER_DATA" && <CoreStandardPage
        apiBaseUrl={apiBaseUrl}
        canManage={canManage}
        onDataChanged={onDataChanged}
        initialTab="DIZIONARI"
      />}
    </section>
  );
}
