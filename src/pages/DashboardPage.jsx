import FmedModuleIcon from "../components/FmedModuleIcon.jsx";

export default function DashboardPage(props) {
  const {
    styles,
    setNuovoInterventoOpen,
    setFiltroScadenze,
    setPagina,
    avviaProcessoGuidatoFmed,
    openAlertMailDialog,
    openOutlook,
    cespiti,
    statoCespite,
    interventi,
    scadenzeConStatoBase,
    scadenzeImminenti,
    totaleSpesaDashboard,
    interventiConCostoDashboard,
    formattaData
  } = props;
  return (
<div className="fmed-dashboard-page" style={{
        ...styles.fmedNeoDashboardShell,
        ...{}
      }}>
            <div className="fmed-dashboard-topbar" style={{
          ...styles.fmedNeoDashboardTopbar,
          ...{}
        }}>
              <div className="fmed-dashboard-title-wrap" style={styles.fmedNeoTitleWrap}>
                <FmedModuleIcon module="Dashboard" className="fmed-dashboard-title-icon" />
                <div>
                  <h2 style={styles.fmedNeoDashboardTitle}>Dashboard</h2>
                  <p style={styles.fmedNeoDashboardSubtitle}>Panoramica generale manutenzioni e asset tecnici</p>
                </div>
              </div>
              <div className="fmed-dashboard-top-actions" style={{
            ...styles.fmedNeoTopActions,
            ...{}
          }}>
                <div style={styles.fmedNeoDatePill}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  {new Date().toLocaleDateString("it-IT", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })}
                </div>
                <div style={styles.fmedNeoLivePill}>Aggiornato ora <span /></div>
              </div>
            </div>

              <section className="fmed-quick-actions-panel" style={styles.fmedNeoQuickPanel}>
                <h3 style={styles.fmedNeoPanelTitleWithIcon}>
                  <span style={{
              ...styles.fmedNeoSectionIcon,
              color: "#1FAE9C",
              background: "rgba(31,174,156,.12)"
            }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  Azioni rapide
                </h3>
                <div className="fmed-quick-actions-grid" style={styles.fmedNeoQuickGrid}>
                  <button type="button" className="fmed-quick-action fmed-quick-intervento" onClick={() => setNuovoInterventoOpen(true)} style={styles.fmedNeoQuickBtn}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5a4.5 4.5 0 0 0-5.7 5.7L4 16v4h4l4.8-4.8a4.5 4.5 0 0 0 5.7-5.7l-3 3-4-4 3-3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span>Nuovo intervento</span></button>
                  <button type="button" className="fmed-quick-action fmed-quick-scadenze" onClick={() => {
              setFiltroScadenze("TUTTE");
              setPagina("Scadenze");
            }} style={styles.fmedNeoQuickBtn}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 3v4M16 3v4M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg><span>Scadenze</span></button>
                  <button type="button" className="fmed-quick-action fmed-quick-asset" onClick={() => avviaProcessoGuidatoFmed("NUOVO_ASSET")} style={styles.fmedNeoQuickBtn}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg><span>Nuovo asset</span></button>
                  <button type="button" className="fmed-quick-action fmed-quick-export" onClick={() => setPagina("Export")} style={styles.fmedNeoQuickBtn}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span>Export report</span></button>
                  <button type="button" className="fmed-quick-action fmed-quick-alert" onClick={openAlertMailDialog} style={{
              ...styles.fmedNeoQuickBtn,
              ...styles.fmedNeoQuickBtnAlert
            }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M18 3v4M16 5h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg><span>Alert email</span></button>
                  <button type="button" className="fmed-quick-action fmed-quick-outlook" onClick={openOutlook} style={styles.fmedNeoQuickBtn}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 3h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg><span>Apri Outlook</span></button>
                  <button type="button" className="fmed-quick-action fmed-quick-sharepoint" onClick={() => setPagina("SharePoint")} style={styles.fmedNeoQuickBtn}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 13a4 4 0 1 1 .5-5.97M16 11a4 4 0 1 1-.5 5.97M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg><span>SharePoint</span></button>
                </div>
              </section>

            <div className="fmed-dashboard-kpi-grid" style={{
          ...styles.fmedNeoKpiGrid,
          ...{}
        }}>
              <button type="button" className="fmed-dashboard-kpi-card" style={{
            ...styles.fmedNeoKpiCard,
            ...styles.fmedNeoKpiCyan
          }} onClick={() => setPagina("Asset")}>
                <span style={{
              ...styles.fmedNeoKpiIcon,
              ...styles.fmedNeoIconCyan
            }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M4 7.5 12 12l8-4.5M12 12v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </span>
                <span style={styles.fmedNeoKpiText}>
                  <strong className="fmed-dashboard-kpi-value" style={styles.fmedNeoKpiMainNumber}>{cespiti.length.toLocaleString("it-IT")}</strong>
                  <small>Asset totali</small>
                </span>
                <em className="fmed-dashboard-kpi-trend" style={styles.fmedNeoTrendPositive}>↗ {cespiti.filter(c => statoCespite(c) === "Attivo").length.toLocaleString("it-IT")} attivi</em>
              </button>

              <button type="button" className="fmed-dashboard-kpi-card" style={{
            ...styles.fmedNeoKpiCard,
            ...styles.fmedNeoKpiGreen
          }} onClick={() => setPagina("Interventi")}>
                <span style={{
              ...styles.fmedNeoKpiIcon,
              ...styles.fmedNeoIconGreen
            }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5a4.5 4.5 0 0 0-5.7 5.7L4 16v4h4l4.8-4.8a4.5 4.5 0 0 0 5.7-5.7l-3 3-4-4 3-3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span style={styles.fmedNeoKpiText}>
                  <strong className="fmed-dashboard-kpi-value" style={styles.fmedNeoKpiMainNumber}>{interventi.length.toLocaleString("it-IT")}</strong>
                  <small>Interventi</small>
                </span>
                <em className="fmed-dashboard-kpi-trend" style={styles.fmedNeoTrendPositive}>↗ storico manutentivo</em>
              </button>

              <button type="button" className="fmed-dashboard-kpi-card" style={{
            ...styles.fmedNeoKpiCard,
            ...styles.fmedNeoKpiAmber
          }} onClick={() => {
            setFiltroScadenze("TUTTE");
            setPagina("Scadenze");
          }}>
                <span style={{
              ...styles.fmedNeoKpiIcon,
              ...styles.fmedNeoIconAmber
            }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 3v4M16 3v4M8 12h8M12 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </span>
                <span style={styles.fmedNeoKpiText}>
                  <strong className="fmed-dashboard-kpi-value" style={styles.fmedNeoKpiMainNumber}>{scadenzeConStatoBase.length.toLocaleString("it-IT")}</strong>
                  <small>Scadenze</small>
                </span>
                <em className="fmed-dashboard-kpi-trend" style={styles.fmedNeoTrendWarning}>△ {scadenzeImminenti.length} critiche</em>
              </button>

              <button type="button" className="fmed-dashboard-kpi-card" style={{
            ...styles.fmedNeoKpiCard,
            ...styles.fmedNeoKpiBlue
          }} onClick={() => setPagina("Costi")}>
                <span style={{
              ...styles.fmedNeoKpiIcon,
              ...styles.fmedNeoIconBlue
            }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M17 5.5A7 7 0 1 0 17 18.5M5 10h10M5 14h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </span>
                <span style={styles.fmedNeoKpiText}>
                  <strong className="fmed-dashboard-kpi-value" style={styles.fmedNeoKpiMainNumber}>{Number(totaleSpesaDashboard || 0).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0
                })}</strong>
                  <small>Costi tracciati</small>
                </span>
                <em className="fmed-dashboard-kpi-trend" style={styles.fmedNeoTrendBlue}>{interventiConCostoDashboard} interventi valorizzati</em>
              </button>

              <button type="button" className="fmed-dashboard-kpi-card" style={{
            ...styles.fmedNeoKpiCard,
            ...styles.fmedNeoKpiPurple
          }} onClick={() => setPagina("Asset")}>
                <span style={{
              ...styles.fmedNeoKpiIcon,
              ...styles.fmedNeoIconPurple
            }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h4l2-7 4 14 2-7h6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span style={styles.fmedNeoKpiText}>
                  <strong className="fmed-dashboard-kpi-value" style={styles.fmedNeoKpiMainNumber}>{cespiti.filter(c => statoCespite(c) === "Attivo").length.toLocaleString("it-IT")}</strong>
                  <small>Asset attivi</small>
                </span>
                <em className="fmed-dashboard-kpi-trend" style={styles.fmedNeoTrendPurple}>{cespiti.length ? Math.round(cespiti.filter(c => statoCespite(c) === "Attivo").length / cespiti.length * 100) : 0}% del totale</em>
              </button>
            </div>

            <div className="fmed-dashboard-main-grid" style={{
          ...styles.fmedNeoMainGrid,
          ...{}
        }}>
              <section className="fmed-dashboard-chart-card" style={styles.fmedNeoChartCard}>
                <div style={styles.fmedNeoPanelHeader}>
                  <div>
                    <h3 style={styles.fmedNeoPanelTitle}>Scadenze nei prossimi 90 giorni</h3>
                    <p style={styles.fmedNeoPanelSub}>Andamento sintetico per livello di priorità</p>
                  </div>
                  <button type="button" style={styles.fmedNeoSmallBtn} onClick={() => {
                setFiltroScadenze("TUTTE");
                setPagina("Scadenze");
              }}>Prossimi 90 giorni</button>
                </div>

                <div style={styles.fmedNeoLegend}>
                  <span><i style={{
                  background: "#FF4D4D"
                }} /> Critiche</span>
                  <span><i style={{
                  background: "#FFB020"
                }} /> Importanti</span>
                  <span><i style={{
                  background: "#2FE58B"
                }} /> Programmate</span>
                  <span><i style={{
                  background: "#1FAE9C"
                }} /> Informative</span>
                </div>

                <svg viewBox="0 0 760 310" style={styles.fmedNeoSvgChart} preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="fmedAreaBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1FAE9C" stopOpacity=".42" /><stop offset="100%" stopColor="#1FAE9C" stopOpacity="0" /></linearGradient>
                    <linearGradient id="fmedAreaGreen" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2FE58B" stopOpacity=".34" /><stop offset="100%" stopColor="#2FE58B" stopOpacity="0" /></linearGradient>
                    <linearGradient id="fmedAreaAmber" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFB020" stopOpacity=".30" /><stop offset="100%" stopColor="#FFB020" stopOpacity="0" /></linearGradient>
                  </defs>
                  {[70, 120, 170, 220, 270].map(y => <line key={y} x1="40" x2="735" y1={y} y2={y} stroke="rgba(255,255,255,.08)" strokeWidth="1" />)}
                  <path d="M45 214 C110 205 142 198 180 190 C225 178 250 150 288 128 C335 105 390 108 450 106 C505 108 560 132 610 170 C655 205 690 190 735 145 L735 285 L45 285 Z" fill="url(#fmedAreaBlue)" />
                  <path d="M45 235 C110 225 155 215 205 202 C245 188 280 160 322 142 C370 130 430 136 486 128 C540 132 590 160 635 198 C675 224 705 210 735 175 L735 285 L45 285 Z" fill="url(#fmedAreaGreen)" />
                  <path d="M45 258 C125 248 190 244 245 220 C300 185 355 190 420 188 C485 182 545 205 605 232 C660 252 700 242 735 218 L735 285 L45 285 Z" fill="url(#fmedAreaAmber)" />
                  <path d="M45 214 C110 205 142 198 180 190 C225 178 250 150 288 128 C335 105 390 108 450 106 C505 108 560 132 610 170 C655 205 690 190 735 145" stroke="#1FAE9C" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M45 235 C110 225 155 215 205 202 C245 188 280 160 322 142 C370 130 430 136 486 128 C540 132 590 160 635 198 C675 224 705 210 735 175" stroke="#2FE58B" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M45 258 C125 248 190 244 245 220 C300 185 355 190 420 188 C485 182 545 205 605 232 C660 252 700 242 735 218" stroke="#FFB020" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M45 276 C120 267 170 265 235 250 C295 230 345 226 410 232 C475 230 535 246 610 263 C670 274 705 265 735 253" stroke="#FF4D4D" strokeWidth="4" fill="none" strokeLinecap="round" />
                  {['Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'].map((m, idx) => <text key={m} x={65 + idx * 105} y="304" fill="rgba(233,247,255,.78)" fontSize="13">{m}</text>)}
                </svg>

                <div style={{
              ...styles.fmedNeoStatusGrid,
              ...{}
            }}>
                  <button type="button" style={styles.fmedNeoStatusBox} onClick={() => {
                setFiltroScadenze("SCADUTA");
                setPagina("Scadenze");
              }}><strong style={{
                  color: "#FF4D4D"
                }}>{scadenzeConStatoBase.filter(s => s?._statoScadenza?.codice === "SCADUTA").length}</strong><span>Critiche</span></button>
                  <button type="button" style={styles.fmedNeoStatusBox} onClick={() => {
                setFiltroScadenze("30_GIORNI");
                setPagina("Scadenze");
              }}><strong style={{
                  color: "#FFB020"
                }}>{scadenzeImminenti.length}</strong><span>Importanti</span></button>
                  <button type="button" style={styles.fmedNeoStatusBox} onClick={() => {
                setFiltroScadenze("TUTTE");
                setPagina("Scadenze");
              }}><strong style={{
                  color: "#2FE58B"
                }}>{Math.max(0, scadenzeConStatoBase.length - scadenzeImminenti.length)}</strong><span>Programmate</span></button>
                  <button type="button" style={styles.fmedNeoStatusBox} onClick={() => setPagina("SharePoint")}><strong style={{
                  color: "#1FAE9C"
                }}>{cespiti.filter(c => String(c?.link_documento || c?.link_sharepoint || "").trim()).length}</strong><span>Documenti</span></button>
                </div>
              </section>

              <section className="fmed-dashboard-urgent-card" style={styles.fmedNeoUrgentCard}>
                <div style={styles.fmedNeoPanelHeader}>
                  <div>
                    <h3 style={styles.fmedNeoPanelTitle}>Scadenze urgenti</h3>
                    <p style={styles.fmedNeoPanelSub}>Priorità operative da presidiare</p>
                  </div>
                  <button type="button" style={styles.fmedNeoSmallBtnAccent} onClick={() => {
                setFiltroScadenze("30_GIORNI");
                setPagina("Scadenze");
              }}>Vedi tutte</button>
                </div>
                <div style={styles.fmedNeoUrgentList}>
                  {(scadenzeImminenti || []).slice(0, 4).map((s, idx) => <button key={idx} type="button" style={styles.fmedNeoUrgentRow} onClick={() => {
                setFiltroScadenze("30_GIORNI");
                setPagina("Scadenze");
              }}>
                      <span style={{
                  ...styles.fmedNeoUrgentIcon,
                  color: idx < 2 ? "#FF4D4D" : "#FFB020",
                  background: idx < 2 ? "rgba(255,77,77,.11)" : "rgba(255,176,32,.11)"
                }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z" stroke="currentColor" strokeWidth="2" /><path d="M10 21h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                      </span>
                      <span style={styles.fmedNeoUrgentText}>
                        <strong>{s?.attivita || s?.tipologia || "Verifica programmata"}</strong>
                        <small>{s?.codice_strumento || s?.codicestrumento || "-"} · {formattaData(s?._dataScadenza || s?.data_prossimo_intervento)}</small>
                      </span>
                      <em style={idx < 2 ? styles.fmedNeoBadgeCritical : styles.fmedNeoBadgeImportant}>{idx < 2 ? "CRITICA" : "IMPORTANTE"}</em>
                    </button>)}
                  {(!scadenzeImminenti || scadenzeImminenti.length === 0) && <div style={styles.fmedNeoEmptyState}>Nessuna scadenza urgente nei prossimi 30 giorni.</div>}
                </div>
              </section>
            </div>

            <div className="fmed-dashboard-lower-grid" style={{
          ...styles.fmedNeoLowerGrid,
          ...{}
        }}>
              <section className="fmed-dashboard-mini-panel" style={styles.fmedNeoMiniPanel}>
                <h3 style={styles.fmedNeoPanelTitleWithIcon}>
                  <span style={{
                ...styles.fmedNeoSectionIcon,
                color: "#1FAE9C",
                background: "rgba(31,174,156,.12)"
              }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h4l2-7 4 14 2-7h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  Interventi per stato
                </h3>
                <div style={styles.fmedNeoDonutArea}>
                  <div style={styles.fmedNeoSvgDonutWrap}>
                    <svg viewBox="0 0 160 160" style={styles.fmedNeoDonutSvg} aria-hidden="true">
                      <circle cx="80" cy="80" r="58" stroke="rgba(255,255,255,.08)" strokeWidth="22" fill="none" />
                      <circle cx="80" cy="80" r="58" stroke="#1FAE9C" strokeWidth="22" fill="none" strokeDasharray="91 364" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 80 80)" />
                      <circle cx="80" cy="80" r="58" stroke="#35C2A9" strokeWidth="22" fill="none" strokeDasharray="106 364" strokeDashoffset="-101" strokeLinecap="round" transform="rotate(-90 80 80)" />
                      <circle cx="80" cy="80" r="58" stroke="#FFB020" strokeWidth="22" fill="none" strokeDasharray="51 364" strokeDashoffset="-217" strokeLinecap="round" transform="rotate(-90 80 80)" />
                      <circle cx="80" cy="80" r="58" stroke="#7C6A45" strokeWidth="22" fill="none" strokeDasharray="44 364" strokeDashoffset="-278" strokeLinecap="round" transform="rotate(-90 80 80)" />
                      <circle cx="80" cy="80" r="58" stroke="#2FE58B" strokeWidth="22" fill="none" strokeDasharray="72 364" strokeDashoffset="-332" strokeLinecap="round" transform="rotate(-90 80 80)" />
                    </svg>
                    <div style={styles.fmedNeoDonutCenter}><strong>{interventi.length.toLocaleString("it-IT")}</strong><span>Totale</span></div>
                  </div>
                  <div style={styles.fmedNeoDonutLegendEnhanced}>
                    <p><i style={{
                    background: "#1FAE9C"
                  }} /> Aperti <strong>{Math.round(interventi.length * .24)}</strong><em>24%</em></p>
                    <p><i style={{
                    background: "#35C2A9"
                  }} /> In corso <strong>{Math.round(interventi.length * .29)}</strong><em>29%</em></p>
                    <p><i style={{
                    background: "#FFB020"
                  }} /> In attesa ricambi <strong>{Math.round(interventi.length * .14)}</strong><em>14%</em></p>
                    <p><i style={{
                    background: "#7C6A45"
                  }} /> Verifica <strong>{Math.round(interventi.length * .12)}</strong><em>12%</em></p>
                    <p><i style={{
                    background: "#2FE58B"
                  }} /> Chiusi mese <strong>{Math.round(interventi.length * .21)}</strong><em>21%</em></p>
                  </div>
                </div>
              </section>

              <section className="fmed-dashboard-mini-panel" style={styles.fmedNeoMiniPanel}>
                <h3 style={styles.fmedNeoPanelTitleWithIcon}>
                  <span style={{
                ...styles.fmedNeoSectionIcon,
                color: "#2FE58B",
                background: "rgba(47,229,139,.12)"
              }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M4 7.5 12 12l8-4.5M12 12v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  </span>
                  Asset per categoria
                </h3>
                <div style={styles.fmedNeoDonutArea}>
                  <div style={styles.fmedNeoSvgDonutWrap}>
                    <svg viewBox="0 0 160 160" style={styles.fmedNeoDonutSvg} aria-hidden="true">
                      <circle cx="80" cy="80" r="58" stroke="rgba(255,255,255,.08)" strokeWidth="22" fill="none" />
                      <circle cx="80" cy="80" r="58" stroke="#1FAE9C" strokeWidth="22" fill="none" strokeDasharray="164 364" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 80 80)" />
                      <circle cx="80" cy="80" r="58" stroke="#2FE58B" strokeWidth="22" fill="none" strokeDasharray="87 364" strokeDashoffset="-174" strokeLinecap="round" transform="rotate(-90 80 80)" />
                      <circle cx="80" cy="80" r="58" stroke="#FFB020" strokeWidth="22" fill="none" strokeDasharray="47 364" strokeDashoffset="-271" strokeLinecap="round" transform="rotate(-90 80 80)" />
                      <circle cx="80" cy="80" r="58" stroke="#7C6A45" strokeWidth="22" fill="none" strokeDasharray="29 364" strokeDashoffset="-328" strokeLinecap="round" transform="rotate(-90 80 80)" />
                      <circle cx="80" cy="80" r="58" stroke="#9AA6B2" strokeWidth="22" fill="none" strokeDasharray="37 364" strokeDashoffset="-367" strokeLinecap="round" transform="rotate(-90 80 80)" />
                    </svg>
                    <div style={styles.fmedNeoDonutCenter}><strong>{cespiti.length.toLocaleString("it-IT")}</strong><span>Totale</span></div>
                  </div>
                  <div style={styles.fmedNeoDonutLegendEnhanced}>
                    <p><i style={{
                    background: "#1FAE9C"
                  }} /> Elettromedicali <strong>{cespiti.filter(c => String(c?.categoria || "").toUpperCase().includes("E")).length}</strong><em>45%</em></p>
                    <p><i style={{
                    background: "#2FE58B"
                  }} /> Arredi sanitari <strong>{cespiti.filter(c => String(c?.categoria || "").toUpperCase().includes("S")).length}</strong><em>24%</em></p>
                    <p><i style={{
                    background: "#FFB020"
                  }} /> Arredi <strong>{cespiti.filter(c => String(c?.categoria || "").toUpperCase().includes("A")).length}</strong><em>13%</em></p>
                    <p><i style={{
                    background: "#7C6A45"
                  }} /> Condizionamento <strong>{cespiti.filter(c => String(c?.categoria || "").toUpperCase().includes("CDZ")).length}</strong><em>8%</em></p>
                    <p><i style={{
                    background: "#9AA6B2"
                  }} /> Altri <strong>{Math.max(0, cespiti.length - cespiti.filter(c => ["E", "A", "S", "CDZ"].some(cat => String(c?.categoria || "").toUpperCase().includes(cat))).length)}</strong><em>10%</em></p>
                  </div>
                </div>
              </section>

            </div>

            <section className="fmed-dashboard-activity-panel" style={styles.fmedNeoActivityPanel}>
              <div style={styles.fmedNeoPanelHeader}>
                <div>
                  <h3 style={styles.fmedNeoPanelTitle}>Attività recenti</h3>
                  <p style={styles.fmedNeoPanelSub}>Ultime registrazioni dal sistema tecnico</p>
                </div>
                <button type="button" style={styles.fmedNeoSmallBtnAccent} onClick={() => setPagina("Interventi")}>Vedi tutte</button>
              </div>
              <div style={styles.fmedNeoActivityList}>
                {(interventi || []).slice(0, 4).map((i, idx) => <button key={idx} type="button" style={styles.fmedNeoActivityRow} onClick={() => setPagina("Interventi")}>
                    <span style={styles.fmedNeoActivityDot}>✓</span>
                    <strong>{i?.attivita || "Intervento registrato"}: {i?.tipologia || i?.codice_strumento || i?.codicestrumento || "asset tecnico"}</strong>
                    <small>{formattaData(i?.data_ultimo_intervento || i?.data_intervento)}</small>
                    <em>Intervento</em>
                  </button>)}
              </div>
            </section>
          </div>
  );
}
