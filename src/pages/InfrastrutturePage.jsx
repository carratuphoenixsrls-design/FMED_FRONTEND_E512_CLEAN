import InfrastruttureControls from "../components/infrastrutture/InfrastruttureControls";
import InfrastruttureHero from "../components/infrastrutture/InfrastruttureHero";
import InfrastruttureRowActions from "../components/infrastrutture/InfrastruttureRowActions";

export default function InfrastrutturePage(props) {
  const {
    styles,
    infrastruttureFiltrate,
    infrastruttureConStato,
    infraOk,
    infraInScadenza,
    infraScadute,
    formattaData,
    apriMenuAttivitaInfrastruttura,
    apriMenuDocumentazioneInfrastruttura,
    apriReportInfrastruttura,
    apriMenuAllegaInfrastruttura,
    formInfrastrutturaOpen,
    infraInModifica,
    formInfra,
    aggiornaFormInfra,
    SEDI_STANDARD_LIST,
    infraCategorieStandard,
    infraDitteOptions,
    infraPeriodicitaStandard,
    infraStatiStandard,
    PRIORITA_STANDARD,
    infraSocietaOptions,
    infraCentroCostoOptions,
    messaggioInfra,
    salvaInfrastruttura,
    salvataggioInfraLoading,
    setFormInfrastrutturaOpen,
  } = props;
  return (
    <>
<div className="fmed-infrastrutture-page">
    <InfrastruttureHero
      styles={styles}
      filteredCount={infrastruttureFiltrate.length}
      totalCount={infrastruttureConStato.length}
    />

    <InfrastruttureControls {...props} />

    <div style={{
          ...styles.assetKpiGrid,
          ...{}
        }}>
      <div style={styles.assetKpiCard}><div style={styles.assetKpiTop}><span style={styles.assetKpiIcon}>🏢</span><span style={styles.assetKpiLabel}>Totale</span></div><strong style={styles.assetKpiValue}>{infrastruttureFiltrate.length}</strong><span style={styles.assetKpiHint}>scadenze filtrate</span></div>
      <div style={styles.assetKpiCard}><div style={styles.assetKpiTop}><span style={styles.assetKpiIcon}>🔴</span><span style={styles.assetKpiLabel}>Scadute</span></div><strong style={{
              ...styles.assetKpiValue,
              color: "#FF4D5E"
            }}>{infraScadute.length}</strong><span style={styles.assetKpiHint}>da recuperare</span></div>
      <div style={styles.assetKpiCard}><div style={styles.assetKpiTop}><span style={styles.assetKpiIcon}>🟠</span><span style={styles.assetKpiLabel}>In scadenza</span></div><strong style={{
              ...styles.assetKpiValue,
              color: "#D99A00"
            }}>{infraInScadenza.length}</strong><span style={styles.assetKpiHint}>entro 30 giorni</span></div>
      <div style={styles.assetKpiCard}><div style={styles.assetKpiTop}><span style={styles.assetKpiIcon}>✅</span><span style={styles.assetKpiLabel}>OK</span></div><strong style={{
              ...styles.assetKpiValue,
              color: "#2FD37D"
            }}>{infraOk.length}</strong><span style={styles.assetKpiHint}>programmate</span></div>
    </div>

    <div style={{
          ...styles.assetTableCard,
          ...{}
        }}>
      <div style={{
            ...styles.assetListHeader,
            ...{}
          }}>
        <div>
          <h3 style={styles.assetTableTitle}>Elenco scadenze infrastrutture</h3>
          <p style={styles.assetTableSubtitle}>Gestione completa da backend: nuovo, modifica, eliminazione e documentazione collegata.</p>
        </div>
      </div>
      {<div style={styles.tableWrap}>
          <table style={styles.tableLarge}>
            <thead>
              <tr>
                <th style={styles.thLarge}>Codice</th>
                <th style={styles.thLarge}>Sede</th>
                <th style={styles.thLarge}>Categoria</th>
                <th style={styles.thLarge}>Attività / Impianto</th>
                <th style={styles.thLarge}>Ditta</th>
                <th style={styles.thLarge}>Periodicità</th>
                <th style={styles.thLarge}>Prossima</th>
                <th style={styles.thLarge}>Priorità</th>
                <th style={styles.thLarge}>Stato</th>
                <th style={styles.thLarge}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {infrastruttureFiltrate.map((r, idx) => <tr key={r.id || idx} style={styles.tr}>
                  <td style={styles.tdCode}>{r.codice || `INF-${String(r.id || idx + 1).padStart(5, "0")}`}</td>
                  <td style={styles.td}>{r.sede}</td>
                  <td style={styles.tdCode}>{r.categoria}</td>
                  <td style={styles.td}>{r.descrizione}</td>
                  <td style={styles.td}>{r.ditta}</td>
                  <td style={styles.td}>{r.periodicita}</td>
                  <td style={styles.td}>{formattaData(r.prossimo_intervento)}</td>
                  <td style={styles.td}>{r.priorita || "MEDIA"}</td>
                  <td style={styles.td}><span style={{
                      ...styles.statusPill,
                      borderColor: r._statoInfra.colore,
                      color: r._statoInfra.colore
                    }}>{r._statoInfra.testo}</span></td>
                  <td style={styles.td}>
                    <InfrastruttureRowActions {...props} infrastruttura={r} />
                  </td>
                </tr>)}
              {infrastruttureFiltrate.length === 0 && <tr><td style={styles.td} colSpan={10}>Nessuna infrastruttura trovata con i filtri attuali.</td></tr>}
            </tbody>
          </table>
        </div>}
    </div>
  </div>

{formInfrastrutturaOpen && <div style={{
        ...styles.modalOverlay,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top left, rgba(31,95,120,0.32), transparent 34%), rgba(7, 21, 33, 0.82)",
        backdropFilter: "blur(10px)",
        overflowY: "hidden"
      }}>
    <div style={{
          width: "min(1480px, 98vw)",
          maxHeight: "96vh",
          borderRadius: 24,
          overflow: "hidden",
          background: "linear-gradient(180deg, #F8FBFC 0%, #EEF5F8 100%)",
          boxShadow: "0 24px 58px rgba(7,21,33,0.32)",
          border: "1px solid rgba(203, 222, 232, 0.95)",
          display: "flex",
          flexDirection: "column"
        }}>
      <div style={{
            padding: "16px 24px 14px",
            background: "linear-gradient(135deg, #10384E 0%, #1F5E7A 56%, #6F8F7A 100%)",
            color: "#FFFFFF",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12
          }}>
        <div>
          <div style={{
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                opacity: 0.88,
                marginBottom: 5
              }}>
            🏢 MRDB INFRASTRUTTURE
          </div>
          <h2 style={{
                margin: 0,
                fontSize: 30,
                lineHeight: 1.05,
                fontWeight: 500,
                color: "#FFFFFF"
              }}>
            {infraInModifica ? "Modifica infrastruttura" : "Nuova infrastruttura"}
          </h2>
          <p style={{
                margin: "6px 0 0",
                maxWidth: 900,
                color: "rgba(255,255,255,0.84)",
                fontSize: 13,
                lineHeight: 1.35
              }}>
            Scheda tecnica infrastrutturale con sedi standard, scadenze, ditta esecutrice, costi e documentazione SharePoint collegata.
          </p>
        </div>

        <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(130px, 1fr))",
              gap: 10,
              minWidth: 430
            }}>
          {[["Codice", formInfra.codice || "AUTO", "#F4F8F7"], ["Categoria", formInfra.categoria || "-", "#E8F5F0"], ["Periodicità", formInfra.periodicita || "-", "#FFF4DE"]].map(([label, value, bg]) => <div key={label} style={{
                padding: "10px 12px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.16)",
                border: "1px solid rgba(255,255,255,0.24)",
                backdropFilter: "blur(8px)"
              }}>
              <div style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.72)",
                  marginBottom: 5
                }}>{label}</div>
              <div style={{
                  color: bg,
                  fontSize: 15,
                  fontWeight: 600,
                  overflowWrap: "anywhere"
                }}>{value}</div>
            </div>)}
        </div>
      </div>

      <div style={{
            padding: 14,
            overflowY: "auto",
            display: "grid",
            gap: 10
          }}>
        <div style={{
              display: "grid",
              gridTemplateColumns: "1.25fr 1fr 1fr",
              gap: 10
            }}>
          <div style={{
                gridColumn: "span 3",
                padding: 14,
                borderRadius: 18,
                background: "linear-gradient(135deg,#FFFFFF 0%,#F4F8F7 100%)",
                border: "1px solid #CFE1EA",
                boxShadow: "0 14px 34px rgba(18,38,63,0.07)"
              }}>
            <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 8,
                  flexWrap: "wrap"
                }}>
              <div>
                <h3 style={{
                      margin: 0,
                      color: "#123C55",
                      fontSize: 19,
                      fontWeight: 500
                    }}>📌 Identificazione</h3>
                <p style={{
                      margin: "6px 0 0",
                      color: "#5D6B7A",
                      fontSize: 13
                    }}>Dati principali dell’impianto o servizio infrastrutturale.</p>
              </div>
              <span style={{
                    padding: "9px 13px",
                    borderRadius: 999,
                    background: "#E6F1F7",
                    color: "#1F5E7A",
                    border: "1px solid #BFD4DF",
                    fontSize: 12
                  }}>
                {formInfra.sede || "Sede non selezionata"}
              </span>
            </div>
            <div style={{
                  display: "grid",
                  gridTemplateColumns: "0.7fr 1.35fr 0.75fr 1fr",
                  gap: 12
                }}>
              <div>
                <div style={styles.smallLabel}>Codice</div>
                <input style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.codice || ""} onChange={e => aggiornaFormInfra("codice", e.target.value)} placeholder="Automatico" />
              </div>
              <div>
                <div style={styles.smallLabel}>Sede</div>
                <select style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.sede || ""} onChange={e => aggiornaFormInfra("sede", e.target.value)}>
                  {SEDI_STANDARD_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <div style={styles.smallLabel}>Categoria</div>
                <select style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.categoria || ""} onChange={e => aggiornaFormInfra("categoria", e.target.value)}>
                  {infraCategorieStandard.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <div style={styles.smallLabel}>Ditta esecutrice</div>
                <select style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.ditta || ""} onChange={e => aggiornaFormInfra("ditta", e.target.value)}>
                  <option value="">Seleziona ditta</option>
                  {infraDitteOptions.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div style={{
                    gridColumn: "span 4"
                  }}>
                <div style={styles.smallLabel}>Attività / impianto</div>
                <input style={{
                      ...styles.input,
                      minHeight: 40,
                      width: "100%",
                      fontSize: 14
                    }} value={formInfra.descrizione || ""} onChange={e => aggiornaFormInfra("descrizione", e.target.value.toUpperCase())} placeholder="ES. UTA, CHILLER, QUADRO ELETTRICO, IMPIANTO ANTINCENDIO..." />
              </div>
            </div>
          </div>

          <div style={{
                padding: 14,
                borderRadius: 18,
                background: "linear-gradient(180deg,#FFFFFF 0%,#EEF7FC 100%)",
                border: "1px solid #CFE1EA",
                boxShadow: "0 14px 34px rgba(18,38,63,0.06)"
              }}>
            <h3 style={{
                  margin: "0 0 14px",
                  color: "#1F5F78",
                  fontSize: 18,
                  fontWeight: 500
                }}>🔧 Manutenzione</h3>
            <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12
                }}>
              <div>
                <div style={styles.smallLabel}>Periodicità</div>
                <select style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.periodicita || ""} onChange={e => aggiornaFormInfra("periodicita", e.target.value)}>
                  {infraPeriodicitaStandard.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <div style={styles.smallLabel}>Stato</div>
                <select style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.stato || "DA_VERIFICARE"} onChange={e => aggiornaFormInfra("stato", e.target.value)}>
                  {infraStatiStandard.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <div style={styles.smallLabel}>Ultimo intervento</div>
                <input type="date" style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.ultimo_intervento || ""} onChange={e => aggiornaFormInfra("ultimo_intervento", e.target.value)} />
              </div>
              <div>
                <div style={styles.smallLabel}>Prossimo intervento</div>
                <input type="date" style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.prossimo_intervento || ""} onChange={e => aggiornaFormInfra("prossimo_intervento", e.target.value)} />
              </div>
              <div>
                <div style={styles.smallLabel}>Priorità</div>
                <select style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.priorita || "MEDIA"} onChange={e => aggiornaFormInfra("priorita", e.target.value)}>
                  {PRIORITA_STANDARD.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div style={{
                padding: 14,
                borderRadius: 18,
                background: "linear-gradient(180deg,#FFFFFF 0%,#EDF8F2 100%)",
                border: "1px solid #CDE7D8",
                boxShadow: "0 14px 34px rgba(18,38,63,0.06)"
              }}>
            <h3 style={{
                  margin: "0 0 14px",
                  color: "#1E824C",
                  fontSize: 18,
                  fontWeight: 500
                }}>🏢 Gestione</h3>
            <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12
                }}>
              <div>
                <div style={styles.smallLabel}>Società</div>
                <select style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.societa || ""} onChange={e => aggiornaFormInfra("societa", e.target.value)}>
                  <option value="">Seleziona società</option>
                  {infraSocietaOptions.map(soc => <option key={soc} value={soc}>{soc}</option>)}
                </select>
              </div>
              <div>
                <div style={styles.smallLabel}>Helpdesk</div>
                <input style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.numero_helpdesk || ""} onChange={e => aggiornaFormInfra("numero_helpdesk", e.target.value)} />
              </div>
              <div>
                <div style={styles.smallLabel}>Responsabile</div>
                <input style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.responsabile || ""} onChange={e => aggiornaFormInfra("responsabile", e.target.value)} />
              </div>
              <div>
                <div style={styles.smallLabel}>Centro costo</div>
                <select style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.centro_costo || ""} onChange={e => aggiornaFormInfra("centro_costo", e.target.value)}>
                  <option value="">Seleziona centro costo</option>
                  {infraCentroCostoOptions.map(cc => <option key={cc} value={cc}>{cc}</option>)}
                </select>
              </div>
              <div>
                <div style={styles.smallLabel}>Importo annuo</div>
                <input style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.importo_annuo ?? ""} onChange={e => aggiornaFormInfra("importo_annuo", e.target.value)} placeholder="0,00" />
              </div>
            </div>
          </div>

          <div style={{
                padding: 14,
                borderRadius: 18,
                background: "linear-gradient(180deg,#FFFFFF 0%,#EAF7F7 100%)",
                border: "1px solid #C4E3E2",
                boxShadow: "0 14px 34px rgba(18,38,63,0.06)"
              }}>
            <h3 style={{
                  margin: "0 0 14px",
                  color: "#2C7A7B",
                  fontSize: 18,
                  fontWeight: 500
                }}>📚 Documentazione</h3>
            <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 12
                }}>
              <button type="button" style={{
                    ...styles.assetSecondaryAction,
                    justifyContent: "center",
                    background: "#E8F1F6",
                    borderColor: "#BFD4DF",
                    color: "#133C55"
                  }} onClick={() => apriMenuAttivitaInfrastruttura(formInfra)}>🔧 Attività</button>
              <button type="button" style={{
                    ...styles.assetSecondaryAction,
                    justifyContent: "center",
                    background: "#E5F4ED",
                    borderColor: "#B8DFC9",
                    color: "#1E824C"
                  }} onClick={() => apriMenuDocumentazioneInfrastruttura(formInfra)}>📚 Documentazione</button>
              <button type="button" style={{
                    ...styles.assetSecondaryAction,
                    justifyContent: "center",
                    background: "#E8F7F8",
                    borderColor: "#BEE3E8",
                    color: "#047481"
                  }} onClick={() => apriReportInfrastruttura(formInfra)}>📊 Report</button>
              <button type="button" style={{
                    ...styles.assetSecondaryAction,
                    justifyContent: "center",
                    background: "#FFF7E6",
                    borderColor: "#F2D19B",
                    color: "#9A5B00"
                  }} onClick={() => apriMenuAllegaInfrastruttura(formInfra)}>📎 Allega</button>
            </div>
            <div style={{
                  display: "grid",
                  gap: 10
                }}>
              <div>
                <div style={styles.smallLabel}>Link documentazione</div>
                <input style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.link_documento || ""} onChange={e => aggiornaFormInfra("link_documento", e.target.value)} placeholder="https://..." />
              </div>
              <div>
                <div style={styles.smallLabel}>Link SharePoint</div>
                <input style={{
                      ...styles.input,
                      minHeight: 38,
                      width: "100%"
                    }} value={formInfra.link_sharepoint || ""} onChange={e => aggiornaFormInfra("link_sharepoint", e.target.value)} placeholder="https://..." />
              </div>
            </div>
          </div>
        </div>

        <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 285px",
              gap: 14
            }}>
          <div style={{
                padding: 14,
                borderRadius: 18,
                background: "linear-gradient(180deg,#FFFFFF 0%,#FFF8E8 100%)",
                border: "1px solid #E7D99F",
                boxShadow: "0 14px 34px rgba(18,38,63,0.05)"
              }}>
            <h3 style={{
                  margin: "0 0 10px",
                  color: "#8A6D12",
                  fontSize: 18,
                  fontWeight: 500
                }}>📝 Note operative</h3>
            <textarea style={{
                  ...styles.input,
                  height: 72,
                  width: "100%",
                  resize: "none"
                }} value={formInfra.note || ""} onChange={e => aggiornaFormInfra("note", e.target.value)} placeholder="Annotazioni operative, criticità, prossimi interventi..." />
          </div>

          <div style={{
                padding: 14,
                borderRadius: 18,
                background: "linear-gradient(180deg,#FFFFFF 0%,#F4F8FB 100%)",
                border: "1px solid #D9E4EA",
                display: "grid",
                alignContent: "center",
                gap: 12,
                boxShadow: "0 14px 34px rgba(18,38,63,0.06)"
              }}>
            {messaggioInfra && <div style={{
                  padding: 12,
                  borderRadius: 16,
                  background: "#FFF4DE",
                  border: "1px solid #E7C47D",
                  color: "#8A5A00",
                  fontSize: 13,
                  lineHeight: 1.35
                }}>
                {messaggioInfra}
              </div>}
            <button type="button" style={{
                  ...styles.assetPrimaryAction,
                  background: "linear-gradient(135deg,#1F5E7A,#6F8F7A)",
                  width: "100%",
                  minHeight: 44
                }} onClick={salvaInfrastruttura} disabled={salvataggioInfraLoading}>
              {salvataggioInfraLoading ? "Salvataggio..." : "Salva infrastruttura"}
            </button>
            <button type="button" style={{
                  ...styles.assetGhostAction,
                  background: "#F8FAFC",
                  width: "100%",
                  minHeight: 42
                }} onClick={() => setFormInfrastrutturaOpen(false)}>
              Annulla
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>}
    </>
  );
}
