/* FMED Enterprise 1.0 · E5.2.1 Data Hygiene
   Registro stili inline separato dal core applicativo per ridurre parsing e chunk principale. */

const loginStyles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "radial-gradient(circle at 18% 18%, rgba(31,174,156,0.14) 0%, transparent 34%), radial-gradient(circle at 82% 14%, rgba(47,229,139,0.10) 0%, transparent 30%), linear-gradient(135deg, #05111B 0%, #071A28 50%, #0B2233 100%)",
    fontFamily: "'Futura', 'Futura PT', 'Jost', 'Century Gothic', sans-serif",
    color: "#FFFFFF"
  },
  card: {
    position: "relative",
    width: "min(440px, 100%)",
    background: "linear-gradient(180deg, rgba(13,34,52,0.98), rgba(8,24,36,0.98))",
    border: "1px solid rgba(31,174,156,0.22)",
    borderRadius: "28px",
    boxShadow: "0 30px 90px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
    padding: "38px",
    color: "#FFFFFF"
  },
  kicker: {
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    fontSize: "12px",
    color: "#6DB193",
    marginBottom: "18px",
    fontWeight: 500
  },
  title: {
    fontSize: "32px",
    lineHeight: 1.08,
    margin: "0 0 12px",
    fontWeight: 500,
    color: "#FFFFFF"
  },
  subtitle: {
    fontSize: "14px",
    lineHeight: 1.55,
    color: "#C8D4DF",
    margin: "0 0 28px"
  },
  form: {
    display: "grid",
    gap: "12px"
  },
  label: {
    fontSize: "11px",
    letterSpacing: "0.17em",
    textTransform: "uppercase",
    color: "#8DE8FF",
    marginTop: "10px"
  },
  input: {
    width: "100%",
    minHeight: "50px",
    border: "1px solid rgba(31,174,156,0.24)",
    borderRadius: "14px",
    padding: "0 15px",
    fontSize: "15px",
    background: "rgba(4,18,29,0.96)",
    color: "#FFFFFF",
    outline: "none"
  },
  button: {
    marginTop: "18px",
    minHeight: "52px",
    border: "1px solid rgba(31,174,156,0.38)",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #1FAE9C, #1FAE9C)",
    color: "#FFFFFF",
    cursor: "pointer",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontSize: "13px",
    fontWeight: 500,
    boxShadow: "0 14px 36px rgba(0,132,255,0.24)"
  },
  rememberRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "8px",
    fontSize: "13px",
    color: "#C8D4DF"
  },
  error: {
    marginTop: "10px",
    padding: "10px 12px",
    borderRadius: "12px",
    background: "rgba(255,77,94,0.12)",
    border: "1px solid rgba(255,77,94,0.26)",
    color: "#FFB3BC",
    fontSize: "13px"
  },
  versionText: {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "11px",
    letterSpacing: "0.08em",
    color: "#94A9BC"
  },
  themeToggle: {
    position: "absolute",
    top: "18px",
    right: "18px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    minHeight: "34px",
    padding: "0 12px",
    borderRadius: "999px",
    border: "1px solid rgba(31,174,156,0.22)",
    background: "rgba(7,24,36,0.88)",
    color: "#F4F8F7",
    cursor: "pointer",
    fontSize: "11px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    boxShadow: "0 10px 24px rgba(0,0,0,0.22)"
  },
  sessionBadge: {
    position: "fixed",
    right: "18px",
    top: "18px",
    zIndex: 99999,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "7px 8px 7px 12px",
    borderRadius: "999px",
    background: "rgba(7,24,36,0.92)",
    color: "#FFFFFF",
    border: "1px solid rgba(31,174,156,0.22)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
    fontSize: "12px",
    letterSpacing: "0.08em",
    textTransform: "uppercase"
  },
  logoutBtn: {
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(255,255,255,0.12)",
    color: "#FFFFFF",
    borderRadius: "999px",
    padding: "6px 10px",
    minHeight: "28px",
    cursor: "pointer",
    fontSize: "11px",
    letterSpacing: "0.08em"
  }
};
const loginLightStyles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "radial-gradient(circle at 16% 12%, rgba(35,198,214,0.16) 0%, transparent 34%), radial-gradient(circle at 84% 10%, rgba(47,211,125,0.10) 0%, transparent 28%), linear-gradient(135deg, #EEF2EE 0%, #E7EDE8 48%, #F4F6F2 100%)",
    fontFamily: "'Futura', 'Futura PT', 'Jost', 'Century Gothic', sans-serif",
    color: "#24312E"
  },
  card: {
    position: "relative",
    width: "min(460px, 100%)",
    background: "rgba(248,249,246,0.96)",
    border: "1px solid rgba(49,95,90,0.16)",
    borderRadius: "30px",
    boxShadow: "0 28px 72px rgba(48,72,64,0.12), inset 0 1px 0 rgba(255,255,252,0.72)",
    padding: "40px",
    color: "#24312E",
    backdropFilter: "blur(18px)"
  },
  kicker: {
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    fontSize: "12px",
    color: "#356F68",
    marginBottom: "18px",
    fontWeight: 500
  },
  title: {
    fontSize: "32px",
    lineHeight: 1.08,
    margin: "0 0 12px",
    fontWeight: 500,
    color: "#24312E"
  },
  subtitle: {
    fontSize: "14px",
    lineHeight: 1.55,
    color: "#64716D",
    margin: "0 0 28px"
  },
  form: {
    display: "grid",
    gap: "12px"
  },
  label: {
    fontSize: "11px",
    letterSpacing: "0.17em",
    textTransform: "uppercase",
    color: "#356F68",
    marginTop: "10px"
  },
  input: {
    width: "100%",
    minHeight: "50px",
    border: "1px solid rgba(49,95,90,0.18)",
    borderRadius: "14px",
    padding: "0 15px",
    fontSize: "15px",
    background: "rgba(244,246,242,0.98)",
    color: "#24312E",
    outline: "none",
    boxShadow: "0 8px 20px rgba(48,72,64,0.045)"
  },
  button: {
    marginTop: "18px",
    minHeight: "52px",
    border: "1px solid rgba(49,95,90,0.28)",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #356F68, #1FAE9C)",
    color: "#FFFFFF",
    cursor: "pointer",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontSize: "13px",
    fontWeight: 500,
    boxShadow: "0 16px 36px rgba(49,95,90,0.17)"
  },
  rememberRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "8px",
    fontSize: "13px",
    color: "#64716D"
  },
  error: {
    marginTop: "10px",
    padding: "10px 12px",
    borderRadius: "12px",
    background: "rgba(255,77,94,0.09)",
    border: "1px solid rgba(255,77,94,0.22)",
    color: "#B4232F",
    fontSize: "13px"
  },
  versionText: {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "11px",
    letterSpacing: "0.08em",
    color: "#8AA0AE"
  },
  themeToggle: {
    position: "absolute",
    top: "18px",
    right: "18px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    minHeight: "34px",
    padding: "0 12px",
    borderRadius: "999px",
    border: "1px solid rgba(9, 74, 92, 0.14)",
    background: "rgba(255,255,255,0.88)",
    color: "#356F68",
    cursor: "pointer",
    fontSize: "11px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    boxShadow: "0 10px 24px rgba(8,32,51,0.08)"
  }
};

const styles = {
  fmedThemeToggleBtn: {
    height: "42px",
    minHeight: "42px",
    padding: "0 16px",
    borderRadius: "14px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "transform .18s ease, box-shadow .18s ease, background .18s ease"
  },
  fmedThemeToggleBtnDark: {
    background: "rgba(255,255,255,.08)",
    color: "#F7F9FB",
    border: "1px solid rgba(31,174,156,.24)",
    boxShadow: "0 12px 30px rgba(0,0,0,.16)"
  },
  fmedThemeToggleBtnLight: {
    background: "linear-gradient(135deg, #078093 0%, #006272 100%)",
    color: "#FFFFFF",
    border: "1px solid rgba(7,128,147,.24)",
    boxShadow: "0 16px 34px rgba(7,128,147,.18)"
  },
  fmedThemeToggleIcon: {
    fontSize: "15px",
    lineHeight: 1
  },
  /* FMED V16 - Allineamento visivo alla preview Emergent: solo grafica */
  emergentTopBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
    marginBottom: "26px"
  },
  emergentEyebrow: {
    color: "var(--fmed-muted)",
    fontSize: "11px",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    fontWeight: 400,
    marginBottom: "8px"
  },
  emergentPageTitle: {
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: "26px",
    lineHeight: "32px",
    fontWeight: 400,
    letterSpacing: "-0.02em"
  },
  emergentTopActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "10px",
    minWidth: "500px"
  },
  emergentSearchInput: {
    width: "326px",
    height: "44px",
    borderRadius: "10px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    padding: "0 14px",
    fontSize: "14px",
    outline: "none",
    boxShadow: "none"
  },
  emergentNewAssetBtn: {
    height: "42px",
    padding: "0 22px",
    borderRadius: "10px",
    border: "1px solid #133C55",
    background: "#133C55",
    color: "#FFFFFF",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.10em",
    textTransform: "uppercase"
  },
  emergentHero: {
    minHeight: "118px",
    background: "linear-gradient(135deg,#133C55,#165A52)",
    borderRadius: "14px",
    border: "1px solid rgba(19,60,85,.18)",
    borderBottom: "4px solid #6DB193",
    boxShadow: "0 1px 2px rgba(19,60,85,.04), 0 6px 18px rgba(19,60,85,.05)",
    padding: "22px 28px",
    marginBottom: "18px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "28px",
    color: "#F4F8F7"
  },
  emergentHeroLabel: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.20em",
    color: "rgba(247,249,251,.72)",
    marginBottom: "8px"
  },
  emergentHeroNumber: {
    fontSize: "42px",
    lineHeight: "44px",
    fontWeight: 400,
    letterSpacing: "-0.04em",
    color: "#F4F8F7"
  },
  emergentHeroSub: {
    marginTop: "10px",
    color: "rgba(247,249,251,.82)",
    fontSize: "14px"
  },
  emergentHeroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  emergentHeroBtn: {
    height: "38px",
    minHeight: "38px",
    padding: "0 22px",
    borderRadius: "10px",
    border: "1px solid rgba(247,249,251,.38)",
    background: "rgba(255,255,255,.04)",
    color: "#FFFFFF",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    boxShadow: "none"
  },
  emergentHeroBtnActive: {
    height: "38px",
    minHeight: "38px",
    padding: "0 22px",
    borderRadius: "10px",
    border: "1px solid #6DB193",
    background: "#6DB193",
    color: "#FFFFFF",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    boxShadow: "none"
  },
  emergentQuickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "14px",
    marginBottom: "18px"
  },
  emergentQuickCard: {
    position: "relative",
    minHeight: "128px",
    textAlign: "left",
    border: "1px solid var(--fmed-border)",
    borderRadius: "14px",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    padding: "16px 18px 18px 18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
    boxShadow: "0 1px 2px rgba(19,60,85,.04), 0 6px 18px rgba(19,60,85,.05)",
    cursor: "pointer"
  },
  emergentQuickArrow: {
    position: "absolute",
    top: "22px",
    right: "24px",
    color: "var(--fmed-muted)",
    fontSize: "28px",
    lineHeight: 1
  },
  emergentIconBox: {
    width: "39px",
    height: "39px",
    borderRadius: "10px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F4F8F7",
    color: "#6DB193",
    fontSize: "20px",
    marginBottom: "8px"
  },
  emergentQuickLabel: {
    color: "var(--fmed-muted)",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.20em"
  },
  emergentQuickValue: {
    color: "var(--fmed-text)",
    fontSize: "32px",
    lineHeight: "38px",
    fontWeight: 400,
    letterSpacing: "-0.03em"
  },
  emergentQuickSmall: {
    color: "var(--fmed-muted)",
    fontSize: "13px",
    lineHeight: "20px",
    textTransform: "none",
    letterSpacing: "0",
    fontWeight: 400
  },
  emergentAlertGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "14px",
    marginBottom: "18px"
  },
  emergentAlertCard: {
    minHeight: "106px",
    borderRadius: "14px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    textAlign: "left",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(19,60,85,.04), 0 6px 18px rgba(19,60,85,.05)"
  },
  emergentAlertRed: {
    borderColor: "#F4B4AF"
  },
  emergentAlertOrange: {
    borderColor: "#F1CFA5"
  },
  emergentAlertGold: {
    borderColor: "#F4F8F7"
  },
  emergentAlertNumber: {
    width: "56px",
    height: "56px",
    minWidth: "56px",
    borderRadius: "12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F8E1DD",
    color: "#A8362A",
    fontSize: "22px",
    fontWeight: 400
  },
  themeLightVars: {
    // FMED V17-DESIGN — Clean Cloud Blue Light Mode
    // Palette richiesta: #133C55 / #165A52 / #6DB193 / #F4F8F7 / #F7F9FB
    "--fmed-bg": "#F4F8F7",
    "--fmed-surface": "rgba(247,249,251,.98)",
    "--fmed-surface-solid": "#F7F9FB",
    "--fmed-surface-soft": "#F4F8F7",
    "--fmed-text": "#1A1D20",
    "--fmed-muted": "#4E5A66",
    "--fmed-border": "#D8E6F2",
    "--fmed-accent": "#6DB193",
    "--fmed-accent-2": "#165A52",
    "--fmed-sand": "#F4F8F7",
    "--fmed-sage": "#133C55",
    "--fmed-sage-dark": "#165A52",
    "--fmed-primary": "#133C55",
    "--fmed-primary-2": "#165A52",
    "--fmed-highlight": "#6DB193",
    "--fmed-btn": "linear-gradient(135deg,#133C55,#165A52)",
    "--fmed-btn-shadow": "0 10px 24px rgba(19,60,85,.16)",
    "--fmed-main-bg": "linear-gradient(180deg, rgba(234,244,255,.98) 0%, rgba(247,249,251,.96) 60%, rgba(234,244,255,.88) 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg, #133C55 0%, #165A52 58%, #133C55 100%)",
    "--fmed-header-bg": "linear-gradient(135deg, rgba(19,60,85,.98) 0%, rgba(56,111,164,.94) 100%)",
    "--fmed-header-inner": "linear-gradient(135deg, rgba(19,60,85,.96), rgba(56,111,164,.88))",
    "--fmed-card-gradient": "linear-gradient(135deg, rgba(247,249,251,.99), rgba(234,244,255,.94))",
    "--fmed-soft-gradient": "linear-gradient(135deg, rgba(247,249,251,.98), rgba(234,244,255,.90))",
    "--fmed-alert-red-bg": "linear-gradient(135deg, rgba(255,224,219,.96), rgba(247,249,251,.94))",
    "--fmed-alert-orange-bg": "linear-gradient(135deg, rgba(255,241,214,.96), rgba(247,249,251,.94))",
    "--fmed-alert-gold-bg": "linear-gradient(135deg, rgba(234,244,255,.98), rgba(247,249,251,.94))",
    "--fmed-danger-bg": "#FFE0DB",
    "--fmed-danger-text": "#D9381E",
    "--fmed-danger-border": "#F4B4AF",
    "--fmed-soft-btn-bg": "#F7F9FB",
    "--fmed-soft-btn-text": "#133C55"
  },
  themeDarkVars: {
    // FMED V19 — Dark Mode uniformata Clean Blue
    // Unifica fondo, card, header e sidebar su palette blu-notte coerente.
    "--fmed-bg": "#071521",
    "--fmed-surface": "rgba(13,34,52,.98)",
    "--fmed-surface-solid": "#0D2234",
    "--fmed-surface-soft": "#12314A",
    "--fmed-text": "#F4F8F7",
    "--fmed-muted": "#B7C8D8",
    "--fmed-border": "rgba(89,165,216,.26)",
    "--fmed-accent": "#6DB193",
    "--fmed-accent-2": "#165A52",
    "--fmed-sand": "#12314A",
    "--fmed-sage": "#6DB193",
    "--fmed-sage-dark": "#165A52",
    "--fmed-primary": "#133C55",
    "--fmed-primary-2": "#165A52",
    "--fmed-highlight": "#6DB193",
    "--fmed-btn": "linear-gradient(135deg,#169C8F,#0F4C81)",
    "--fmed-btn-shadow": "0 10px 24px rgba(20,103,201,.24)",
    "--fmed-main-bg": "linear-gradient(180deg, rgba(7,21,33,.99) 0%, rgba(9,28,43,.98) 56%, rgba(7,21,33,.99) 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg, #0B2D45 0%, #0D3A59 48%, #071521 100%)",
    "--fmed-header-bg": "linear-gradient(135deg, rgba(13,34,52,.98) 0%, rgba(18,49,74,.96) 100%)",
    "--fmed-header-inner": "linear-gradient(135deg, rgba(13,34,52,.96), rgba(18,49,74,.90))",
    "--fmed-card-gradient": "linear-gradient(135deg, rgba(13,34,52,.98), rgba(18,49,74,.94))",
    "--fmed-soft-gradient": "linear-gradient(135deg, rgba(13,34,52,.96), rgba(18,49,74,.90))",
    "--fmed-alert-red-bg": "linear-gradient(135deg, rgba(83,30,25,.96), rgba(13,34,52,.94))",
    "--fmed-alert-orange-bg": "linear-gradient(135deg, rgba(83,55,20,.96), rgba(13,34,52,.94))",
    "--fmed-alert-gold-bg": "linear-gradient(135deg, rgba(18,49,74,.98), rgba(13,34,52,.94))",
    "--fmed-danger-bg": "#4A1F1B",
    "--fmed-danger-text": "#FF8A7A",
    "--fmed-danger-border": "rgba(255,138,122,.45)",
    "--fmed-soft-btn-bg": "#12314A",
    "--fmed-soft-btn-text": "#F4F8F7"
  },
  smartHero: {
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) 310px",
    gap: "18px",
    alignItems: "stretch",
    marginBottom: "18px"
  },
  smartHeroMain: {
    background: "var(--fmed-header-bg)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "28px",
    padding: "24px 26px",
    boxShadow: "0 18px 45px rgba(45,38,28,.10)"
  },
  smartHeroTitle: {
    margin: "6px 0 8px 0",
    fontSize: "34px",
    lineHeight: 1.05,
    fontWeight: 400,
    color: "var(--fmed-text)",
    letterSpacing: "-.04em"
  },
  smartHeroText: {
    margin: 0,
    maxWidth: "760px",
    color: "var(--fmed-muted)",
    fontSize: "15px",
    lineHeight: 1.55
  },
  smartHeroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "18px"
  },
  smartHeroStatus: {
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "28px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 18px 45px rgba(45,38,28,.10)"
  },
  smartHeroStatusLabel: {
    color: "var(--fmed-muted)",
    fontSize: "13px",
    letterSpacing: ".12em",
    textTransform: "uppercase"
  },
  smartHeroStatusValue: {
    color: "var(--fmed-text)",
    fontSize: "58px",
    lineHeight: 1,
    fontWeight: 400,
    marginTop: "8px"
  },
  smartHeroStatusSub: {
    color: "var(--fmed-muted)",
    fontSize: "14px",
    marginTop: "12px"
  },
  smartKpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0,1fr))",
    gap: "14px",
    marginBottom: "16px"
  },
  smartQuickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0,1fr))",
    gap: "14px",
    marginBottom: "16px"
  },
  smartQuickCard: {
    appearance: "none",
    textAlign: "left",
    border: "1px solid var(--fmed-border)",
    borderRadius: "22px",
    padding: "18px 18px",
    background: "var(--fmed-soft-gradient)",
    color: "var(--fmed-text)",
    cursor: "pointer",
    minHeight: "118px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    boxShadow: "0 12px 28px rgba(45,38,28,.08)"
  },
  smartQuickIcon: {
    fontSize: "24px"
  },
  smartSectionCard: {
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "24px",
    marginBottom: "16px",
    overflow: "hidden",
    boxShadow: "0 14px 36px rgba(45,38,28,.09)"
  },
  smartSectionHeader: {
    width: "100%",
    border: 0,
    background: "transparent",
    color: "var(--fmed-text)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "14px",
    padding: "18px 20px",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit"
  },
  smartSectionTitleBox: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  smartSectionTitle: {
    fontSize: "18px",
    color: "var(--fmed-text)",
    fontWeight: 400
  },
  smartSectionSubtitle: {
    fontSize: "13px",
    color: "var(--fmed-muted)"
  },
  smartSectionAction: {
    border: "1px solid var(--fmed-border)",
    borderRadius: "999px",
    padding: "8px 14px",
    color: "var(--fmed-muted)",
    background: "var(--fmed-soft-btn-bg)",
    fontSize: "12px",
    whiteSpace: "nowrap"
  },
  smartSectionBody: {
    padding: "0 20px 20px 20px"
  },
  smartDashboardColumns: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0,1fr))",
    gap: "16px"
  },
  smartActionGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },
  smartFilterToggleRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    margin: "14px 0 4px 0"
  },
  smartFilterHint: {
    color: "var(--fmed-muted)",
    fontSize: "13px"
  },
  app: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    color: "var(--fmed-text)",
    fontFamily: "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    overflow: "hidden",
    background: "var(--fmed-bg)"
  },
  sidebar: {
    width: "236px",
    minWidth: "236px",
    height: "100vh",
    backgroundColor: "#133C55",
    backgroundImage: "var(--fmed-sidebar-bg)",
    backgroundSize: "cover",
    backgroundPosition: "left bottom",
    backgroundRepeat: "no-repeat",
    borderRight: "1px solid rgba(255,255,255,.12)",
    boxShadow: "8px 0 28px rgba(6,26,52,.18)",
    padding: "12px 10px 12px 10px",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  sidebarNav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "18px",
    width: "100%",
    flex: "1 1 auto",
    minHeight: 0,
    overflowY: "auto",
    paddingBottom: "12px"
  },
  menuIconWrap: {
    width: "28px",
    minWidth: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    background: "rgba(255,255,255,.10)"
  },
  menuLabel: {
    flex: 1,
    textAlign: "left",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  menuInfoIcon: {
    width: "18px",
    minWidth: "18px",
    height: "18px",
    borderRadius: "999px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(255,255,255,.38)",
    background: "rgba(255,255,255,.08)",
    color: "rgba(255,255,255,.90)",
    fontSize: "11px",
    fontWeight: 700,
    lineHeight: 1,
    textTransform: "lowercase",
    cursor: "help"
  },
  sidebarBrandLink: {
    display: "block",
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer"
  },
  sidebarBrand: {
    minHeight: "132px",
    height: "132px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    borderRadius: "18px",
    background: "rgba(255,255,255,.96)",
    border: "1px solid rgba(255,255,255,.55)",
    boxShadow: "0 14px 30px rgba(0,0,0,.20)",
    marginBottom: "14px",
    textAlign: "center",
    backdropFilter: "blur(8px)",
    overflow: "hidden"
  },
  sidebarOnlyTitle: {
    margin: "0 0 2px 0",
    textAlign: "left",
    color: "#FFFFFF",
    fontSize: "20px",
    lineHeight: "24px",
    fontWeight: 400,
    letterSpacing: "0.12em"
  },
  sidebarOnlySub: {
    margin: "0 0 22px 0",
    textAlign: "left",
    color: "rgba(255,255,255,.62)",
    fontSize: "11px",
    lineHeight: "16px",
    fontWeight: 400,
    letterSpacing: "0.20em",
    textTransform: "uppercase"
  },
  fmedBrandMark: {
    width: "54px",
    height: "54px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    background: "linear-gradient(135deg,#8F9E8B 0%,#7C8B79 100%)",
    boxShadow: "0 14px 32px rgba(143,158,139,.24)",
    border: "1px solid rgba(255,255,255,.35)"
  },
  fmedBrandCross: {
    color: "#ffffff",
    fontSize: "28px",
    lineHeight: "28px",
    fontWeight: 400,
    textShadow: "0 4px 12px rgba(0,0,0,.25)"
  },
  fmedBrandCircuit: {
    position: "absolute",
    right: "7px",
    bottom: "5px",
    color: "rgba(255,255,255,.78)",
    fontSize: "16px",
    transform: "rotate(-18deg)"
  },
  sidebarLogoNew: {
    display: "block",
    width: "118px",
    height: "118px",
    objectFit: "contain",
    borderRadius: "12px",
    background: "#FFFFFF",
    border: "none",
    boxShadow: "none",
    filter: "none"
  },
  fmedBrandTextBox: {
    color: "#ffffff"
  },
  fmedBrandTitle: {
    fontSize: "20px",
    lineHeight: "22px",
    fontWeight: 400,
    letterSpacing: "3.2px",
    color: "#ffffff"
  },
  fmedBrandDb: {
    marginTop: "3px",
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: 400,
    letterSpacing: "1.4px",
    color: "#8F9E8B"
  },
  fmedBrandClaim: {
    marginTop: "7px",
    maxWidth: "170px",
    fontSize: "9.5px",
    lineHeight: "12px",
    fontWeight: 400,
    letterSpacing: "1px",
    color: "rgba(255,255,255,.82)",
    textTransform: "uppercase"
  },
  sidebarLogoImage: {
    display: "block",
    width: "66px",
    height: "66px",
    objectFit: "contain",
    borderRadius: "18px",
    background: "transparent",
    border: "none",
    boxShadow: "none",
    filter: "drop-shadow(0 0 18px rgba(143,158,139,.24))"
  },
  sidebarLogoTitle: {
    display: "none"
  },
  sidebarLogoSubtitle: {
    display: "none"
  },
  sidebarLogoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    marginBottom: "20px"
  },
  fmedLogoMark: {
    width: "54px",
    height: "54px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,#8F9E8B 0%,#7C8B79 100%)",
    boxShadow: "0 12px 26px rgba(143,158,139,.24)",
    border: "1px solid rgba(255,255,255,.24)"
  },
  fmedLogoCross: {
    color: "#ffffff",
    fontSize: "28px",
    lineHeight: "28px",
    fontWeight: 400,
    textShadow: "0 3px 10px rgba(0,0,0,.25)"
  },
  fmedLogoText: {
    fontSize: "24px",
    lineHeight: "26px",
    fontWeight: 400,
    letterSpacing: "4px",
    color: "#8F9E8B"
  },
  fmedLogoSub: {
    marginTop: "5px",
    color: "rgba(255,255,255,.74)",
    fontSize: "10px",
    lineHeight: "14px",
    fontWeight: 400,
    letterSpacing: "1.1px",
    textTransform: "uppercase"
  },
  sidebarBrandTop: {
    fontSize: "19px",
    fontWeight: 400,
    letterSpacing: "4px",
    color: "#8F9E8B",
    marginBottom: "8px"
  },
  sidebarBrandPage: {
    fontSize: "30px",
    lineHeight: "34px",
    fontWeight: 400,
    color: "#ffffff",
    letterSpacing: "-.4px"
  },
  sidebarBrandSub: {
    marginTop: "10px",
    color: "rgba(255,255,255,.72)",
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "1.1px"
  },
  smartInterventoBox: {
    marginBottom: "12px",
    padding: "20px",
    borderRadius: "18px",
    background: "var(--fmed-surface-soft)",
    border: "1px solid var(--fmed-border)"
  },
  smartInterventoHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "flex-start",
    marginBottom: "14px",
    flexWrap: "wrap"
  },
  smartInterventoTitle: {
    margin: "0 0 6px 0",
    fontSize: "20px",
    color: "var(--fmed-text)"
  },
  smartResultsBox: {
    marginTop: "14px",
    display: "grid",
    gap: "8px"
  },
  smartResultRow: {
    display: "grid",
    gridTemplateColumns: "120px 1.2fr .8fr .9fr 1fr 1fr",
    gap: "12px",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "12px",
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    cursor: "pointer",
    fontSize: "13px",
    color: "var(--fmed-text)"
  },
  smartResultCode: {
    color: "var(--fmed-accent-2)",
    textDecoration: "underline"
  },
  appName: {
    display: "none"
  },
  appSub: {
    display: "none"
  },
  menuBtn: {
    width: "100%",
    minHeight: "46px",
    padding: "0 16px",
    marginBottom: "0",
    borderRadius: "10px",
    background: "transparent",
    border: "1px solid transparent",
    cursor: "pointer",
    color: "var(--fmed-muted)",
    fontSize: "14px",
    fontWeight: 400,
    transition: "all .18s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "12px",
    appearance: "none",
    WebkitAppearance: "none",
    fontFamily: "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    letterSpacing: ".1px"
  },
  menuBtnActive: {
    background: "linear-gradient(135deg, #169C8F 0%, #169C8F 100%)",
    border: "1px solid rgba(255,255,255,.20)",
    boxShadow: "0 12px 28px rgba(0,86,199,.28)",
    color: "#FFFFFF"
  },
  main: {
    flex: 1,
    height: "100vh",
    padding: "22px 30px",
    boxSizing: "border-box",
    overflow: "auto",
    backgroundColor: "var(--fmed-surface-solid)",
    backgroundImage: "none",
    backgroundSize: "cover",
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat"
  },
  headerBanner: {
    width: "100%",
    minHeight: "98px",
    marginBottom: "18px",
    borderRadius: "26px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-header-bg)",
    boxShadow: "0 18px 44px rgba(61,58,53,.10)",
    overflow: "hidden",
    position: "relative"
  },
  headerBannerContent: {
    minHeight: "98px",
    padding: "20px 28px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
    backgroundImage: "var(--fmed-header-inner)",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  headerBrandText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: "160px"
  },
  headerBrandMain: {
    fontSize: "20px",
    lineHeight: "24px",
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: "#F7F9FB",
    textAlign: "right",
    whiteSpace: "nowrap",
    textShadow: "0 1px 2px rgba(0,0,0,.20)"
  },
  headerBrandSub: {
    marginTop: "2px",
    color: "#D7E4E5",
    fontSize: "12px",
    lineHeight: "15px",
    fontWeight: 500,
    letterSpacing: "0.24em",
    textAlign: "right"
  },
  pageContext: {
    margin: "0 0 6px 0",
    color: "var(--fmed-text)",
    fontSize: "20px",
    lineHeight: "24px",
    fontWeight: 400,
    letterSpacing: "-.2px"
  },
  pageTitle: {
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: "32px",
    lineHeight: "38px",
    fontWeight: 400,
    letterSpacing: "-.6px"
  },
  pageSub: {
    margin: "7px 0 0 0",
    color: "var(--fmed-muted)",
    fontSize: "14px",
    fontWeight: 400
  },
  dashboardHero: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
    gap: "12px",
    alignItems: "stretch",
    marginBottom: "12px",
    padding: "clamp(14px, 4vw, 20px)",
    borderRadius: "22px",
    border: "1px solid var(--fmed-border)",
    background: "linear-gradient(135deg, var(--fmed-surface-solid) 0%, var(--fmed-surface) 52%, var(--fmed-surface-soft) 100%)",
    boxShadow: "0 16px 34px rgba(61,58,53,.10)",
    overflow: "hidden"
  },
  dashboardHeroLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0
  },
  dashboardEyebrow: {
    color: "var(--fmed-sage-dark)",
    fontSize: "10px",
    fontWeight: 400,
    letterSpacing: "1.8px",
    textTransform: "uppercase",
    marginBottom: "5px"
  },
  dashboardHeroTitle: {
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: "24px",
    lineHeight: "28px",
    fontWeight: 400,
    letterSpacing: "-.35px"
  },
  dashboardHeroText: {
    maxWidth: "720px",
    margin: "6px 0 0 0",
    color: "var(--fmed-muted)",
    fontSize: "12.5px",
    lineHeight: "18px",
    fontWeight: 400
  },
  dashboardHeroActions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "10px"
  },
  dashboardActionBtn: {
    height: "34px",
    padding: "0 16px",
    borderRadius: "999px",
    border: "1px solid rgba(111,128,104,.30)",
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    fontSize: "13px",
    fontWeight: 400,
    cursor: "pointer",
    boxShadow: "var(--fmed-btn-shadow)",
    whiteSpace: "nowrap"
  },
  dashboardActionBtnSoft: {
    height: "34px",
    padding: "0 14px",
    borderRadius: "999px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    fontSize: "13px",
    fontWeight: 400,
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(61,58,53,.06)",
    whiteSpace: "nowrap"
  },
  dashboardHeroRight: {
    minHeight: "96px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, var(--fmed-sage), var(--fmed-sage-dark))",
    color: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "0 14px 28px rgba(111,128,104,.20)"
  },
  dashboardHeroNumber: {
    fontSize: "34px",
    lineHeight: "36px",
    fontWeight: 400,
    letterSpacing: "-.45px"
  },
  dashboardHeroLabel: {
    marginTop: "3px",
    fontSize: "12.5px",
    fontWeight: 400
  },
  dashboardHeroSubLabel: {
    marginTop: "2px",
    fontSize: "11px",
    fontWeight: 400,
    opacity: .86
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 145px), 1fr))",
    gap: "10px",
    marginBottom: "12px"
  },
  kpi: {
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "18px",
    padding: "14px 18px",
    boxShadow: "0 12px 28px rgba(61,58,53,.08)",
    minHeight: "82px",
    boxSizing: "border-box"
  },
  kpiTitle: {
    color: "var(--fmed-muted)",
    fontSize: "11px",
    fontWeight: 400,
    letterSpacing: "1.3px",
    textTransform: "uppercase"
  },
  kpiValue: {
    marginTop: "8px",
    color: "var(--fmed-text)",
    fontSize: "24px",
    lineHeight: "28px",
    fontWeight: 400
  },
  scadenzeDashboardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
    gap: "10px",
    marginBottom: "12px"
  },
  alertMiniCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "13px 16px",
    borderRadius: "18px",
    border: "1px solid var(--fmed-border)",
    cursor: "pointer",
    boxShadow: "0 12px 28px rgba(61,58,53,.07)",
    minHeight: "64px",
    boxSizing: "border-box"
  },
  dashboardAlertRed: {
    background: "var(--fmed-alert-red-bg)",
    borderColor: "rgba(230,75,98,.38)"
  },
  dashboardAlertOrange: {
    background: "var(--fmed-alert-orange-bg)",
    borderColor: "rgba(242,138,85,.42)"
  },
  dashboardAlertGold: {
    background: "var(--fmed-alert-gold-bg)",
    borderColor: "rgba(217,178,76,.42)"
  },
  alertIconDot: {
    width: "30px",
    height: "30px",
    borderRadius: "999px",
    boxShadow: "0 10px 22px rgba(0,0,0,.14)",
    flex: "0 0 30px"
  },
  alertTitle: {
    color: "var(--fmed-text)",
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: 400
  },
  scadenzeHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
    marginBottom: "12px"
  },
  selectSmall: {
    height: "40px",
    padding: "0 12px",
    borderRadius: "12px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    fontSize: "13px",
    outline: "none",
    boxShadow: "0 8px 20px rgba(111,128,104,.08)"
  },
  alertCard: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "18px 22px",
    marginBottom: "20px",
    borderRadius: "18px",
    background: "var(--fmed-alert-gold-bg)",
    border: "1px solid #FEC84B",
    color: "var(--fmed-text)",
    cursor: "pointer",
    boxShadow: "0 16px 38px rgba(61,58,53,.10)"
  },
  alertIcon: {
    fontSize: "28px"
  },
  alertText: {
    margin: "6px 0 0 0",
    color: "var(--fmed-muted)",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 400
  },
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
    gap: "14px",
    alignItems: "stretch"
  },
  dashboardChartCard: {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "22px",
    padding: "clamp(16px, 4vw, 24px)",
    boxShadow: "0 18px 40px rgba(61,58,53,.10)",
    overflow: "hidden",
    minHeight: "318px"
  },
  dashboardCardHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "14px"
  },
  dashboardCardKicker: {
    marginBottom: "5px",
    color: "var(--fmed-sage-dark)",
    fontSize: "11px",
    fontWeight: 400,
    letterSpacing: "1.4px",
    textTransform: "uppercase"
  },
  dashboardTinyBtn: {
    height: "38px",
    padding: "0 16px",
    borderRadius: "999px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-text)",
    fontSize: "13px",
    fontWeight: 400,
    cursor: "pointer",
    whiteSpace: "nowrap"
  },
  card: {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 16px 38px rgba(61,58,53,.10)",
    overflow: "hidden"
  },
  cardTitle: {
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: "20px",
    lineHeight: "25px",
    fontWeight: 400,
    letterSpacing: "-.2px"
  },
  muted: {
    color: "var(--fmed-muted)",
    fontSize: "14px"
  },
  filters: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
    gap: "10px",
    marginBottom: "12px"
  },
  interventiFilters: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))",
    gap: "12px",
    marginTop: "16px",
    marginBottom: "10px",
    alignItems: "end"
  },
  contoEconomicoBox: {
    margin: "18px 0 14px",
    padding: "18px",
    borderRadius: "20px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-card-gradient)",
    boxShadow: "0 16px 34px rgba(61,58,53,.10)"
  },
  contoEconomicoHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "14px",
    marginBottom: "14px",
    flexWrap: "wrap"
  },
  contoEconomicoTitle: {
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: "20px",
    fontWeight: 400
  },
  periodoBadge: {
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    fontSize: "13px",
    fontWeight: 400,
    whiteSpace: "nowrap"
  },
  contoEconomicoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(150px, 1fr))",
    gap: "12px"
  },
  contoEconomicoCard: {
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "16px",
    padding: "14px 15px",
    boxShadow: "0 10px 24px rgba(61,58,53,.08)"
  },
  contoEconomicoLabel: {
    display: "block",
    color: "var(--fmed-muted)",
    fontSize: "11px",
    fontWeight: 400,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "7px"
  },
  contoEconomicoValue: {
    display: "block",
    color: "var(--fmed-text)",
    fontSize: "22px",
    fontWeight: 400
  },
  scadenzeActions: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
    margin: "6px 0 20px 0",
    paddingTop: "10px"
  },
  dangerBtn: {
    padding: "15px 24px",
    minWidth: "190px",
    borderRadius: "14px",
    border: "1px solid #A66C61",
    background: "linear-gradient(135deg,#C98A7D,#B9776A)",
    color: "#FFFFFF",
    fontWeight: 400,
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(201,138,125,.24)"
  },
  exportPdfBtn: {
    padding: "15px 24px",
    minWidth: "190px",
    borderRadius: "14px",
    border: "none",
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    fontWeight: 400,
    cursor: "pointer",
    boxShadow: "var(--fmed-btn-shadow)"
  },
  dateFilterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  dateFilterLabel: {
    fontSize: "11px",
    fontWeight: 400,
    color: "var(--fmed-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.4px"
  },
  input: {
    height: "42px",
    padding: "0 14px",
    borderRadius: "11px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    fontSize: "12.5px",
    outline: "none",
    boxShadow: "0 6px 16px rgba(111,128,104,.07)"
  },
  select: {
    height: "42px",
    padding: "0 14px",
    borderRadius: "11px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    fontSize: "12.5px",
    outline: "none",
    boxShadow: "0 6px 16px rgba(111,128,104,.07)"
  },
  tableWrap: {
    width: "100%",
    overflowX: "auto",
    marginTop: "14px"
  },
  loadMoreRow: {
    display: "flex",
    justifyContent: "center",
    padding: "16px 0 4px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "12px",
    color: "var(--fmed-text)"
  },
  th: {
    padding: "7px 8px",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-muted)",
    textAlign: "left",
    fontSize: "11px",
    fontWeight: 400,
    textTransform: "uppercase",
    borderBottom: "1px solid var(--fmed-border)"
  },
  tr: {
    borderBottom: "1px solid var(--fmed-border)"
  },
  td: {
    padding: "6px 7px",
    borderBottom: "1px solid var(--fmed-border)",
    fontSize: "11.5px",
    fontWeight: 400,
    color: "var(--fmed-text)",
    lineHeight: 1.25,
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    verticalAlign: "middle"
  },
  tdCode: {
    padding: "6px 7px",
    color: "#169C8F",
    fontSize: "11.5px",
    fontWeight: 400,
    verticalAlign: "middle",
    whiteSpace: "normal",
    overflowWrap: "anywhere"
  },
  statusDot: {
    display: "inline-block",
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    marginRight: "8px"
  },
  chartBox: {
    marginTop: "16px"
  },
  chartRow: {
    marginBottom: "13px"
  },
  chartLabel: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    color: "var(--fmed-text)",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 400,
    marginBottom: "7px"
  },
  chartValue: {
    color: "var(--fmed-text)",
    fontSize: "13px",
    fontWeight: 400,
    whiteSpace: "nowrap"
  },
  barBack: {
    width: "100%",
    height: "9px",
    background: "rgba(145,160,137,.16)",
    borderRadius: "20px",
    overflow: "hidden"
  },
  barFill: {
    height: "9px",
    background: "linear-gradient(90deg, var(--fmed-sage), var(--fmed-sage-dark))",
    borderRadius: "20px"
  },
  trClickable: {
    borderBottom: "1px solid var(--fmed-border)",
    cursor: "pointer"
  },
  modalOverlayTop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    zIndex: 5000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    boxSizing: "border-box"
  },
  assetHeroPanel: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "12px",
    padding: "16px 18px",
    borderRadius: "18px",
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "0 10px 24px rgba(61,58,53,.08)"
  },
  assetHeroTitle: {
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: "24px",
    fontWeight: 400,
    letterSpacing: "-.3px"
  },
  assetHeroSubtitle: {
    margin: "5px 0 0 0",
    color: "var(--fmed-muted)",
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: "1.35"
  },
  assetHeroBadge: {
    minWidth: "130px",
    textAlign: "center",
    padding: "12px 16px",
    borderRadius: "14px",
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: 400,
    boxShadow: "0 8px 20px rgba(143,158,139,.20)"
  },
  assetKpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(135px, 1fr))",
    gap: "10px",
    margin: "2px 0 12px 0"
  },
  assetKpiCard: {
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "16px",
    padding: "10px 12px",
    boxShadow: "0 8px 20px rgba(61,58,53,.07)",
    minHeight: "70px"
  },
  assetKpiHint: {
    display: "block",
    marginTop: "3px",
    color: "var(--fmed-muted)",
    fontSize: "10px",
    fontWeight: 400
  },
  assetBigBtn: {
    padding: "12px 18px",
    minWidth: "185px",
    borderRadius: "13px",
    border: "none",
    background: "linear-gradient(135deg,#169C8F,#165A52)",
    color: "#FFFFFF",
    fontWeight: 400,
    fontSize: "13px",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(30,90,168,.20)"
  },
  assetBigBtnSecondary: {
    padding: "12px 18px",
    minWidth: "160px",
    borderRadius: "13px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-soft-btn-bg)",
    color: "var(--fmed-soft-btn-text)",
    fontWeight: 400,
    fontSize: "13px",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(30,90,168,.10)"
  },
  assetQuickPanel: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    margin: "6px 0 18px 0",
    padding: "20px 22px",
    borderRadius: "20px",
    background: "var(--fmed-soft-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "0 12px 30px rgba(61,58,53,.08)"
  },
  assetQuickTitle: {
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: "20px",
    fontWeight: 400
  },
  assetQuickText: {
    margin: "6px 0 0 0",
    color: "var(--fmed-muted)",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "1.45"
  },
  assetFilterSummary: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
    margin: "2px 0 12px 0",
    padding: "10px 12px",
    borderRadius: "14px",
    background: "rgba(238,247,255,.70)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-muted)",
    fontSize: "12px",
    fontWeight: 400
  },
  assetAnalysisGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "10px",
    marginBottom: "12px"
  },
  assetRankList: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginTop: "10px"
  },
  assetRankRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    padding: "8px 10px",
    borderRadius: "11px",
    background: "var(--fmed-surface-soft)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    fontSize: "12px",
    fontWeight: 400
  },
  assetListHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "14px",
    marginBottom: "6px"
  },
  tableLarge: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
    color: "var(--fmed-text)"
  },
  thLarge: {
    padding: "9px 10px",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-muted)",
    textAlign: "left",
    fontSize: "11px",
    fontWeight: 400,
    textTransform: "uppercase",
    borderBottom: "1px solid var(--fmed-border)"
  },
  tdLarge: {
    padding: "9px 10px",
    borderBottom: "1px solid var(--fmed-border)",
    fontSize: "12.5px",
    fontWeight: 400,
    color: "var(--fmed-text)",
    lineHeight: "1.25"
  },
  tdCodeLarge: {
    padding: "9px 10px",
    color: "#169C8F",
    fontSize: "12.5px",
    fontWeight: 400,
    verticalAlign: "middle",
    borderBottom: "1px solid var(--fmed-border)"
  },
  assetActionsHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "18px",
    marginBottom: "18px"
  },
  assetActionsTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 400,
    color: "var(--fmed-text)",
    letterSpacing: "-0.02em"
  },
  assetActionsSubtitle: {
    margin: "6px 0 0 0",
    fontSize: "13px",
    color: "var(--fmed-muted)",
    fontWeight: 400
  },
  assetActionsCode: {
    padding: "10px 14px",
    borderRadius: "14px",
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-soft-btn-text)",
    fontWeight: 400,
    fontSize: "14px",
    whiteSpace: "nowrap"
  },
  assetActionBtnPrimary: {
    border: "none",
    background: "linear-gradient(135deg,#169C8F,#165A52)",
    color: "#FFFFFF"
  },
  assetActionIcon: {
    fontSize: "19px",
    lineHeight: 1
  },
  assetActionsGrouped: {
    display: "grid",
    gridTemplateColumns: "1.25fr 0.8fr",
    gap: "14px",
    alignItems: "stretch"
  },
  assetActionsGroupBlock: {
    padding: "12px",
    borderRadius: "16px",
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "0 8px 18px rgba(14,27,66,0.04)"
  },
  assetActionsGroupTitle: {
    marginBottom: "10px",
    color: "var(--fmed-muted)",
    fontSize: "11px",
    fontWeight: 400,
    letterSpacing: "1.6px",
    textTransform: "uppercase"
  },
  assetActionsGroupGrid: {
    display: "grid",
    gap: "10px"
  },
  linkEditBox: {
    width: "100%",
    marginTop: "16px",
    padding: "18px",
    borderRadius: "18px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    boxSizing: "border-box"
  },
  linkEditActions: {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
    flexWrap: "wrap"
  },
  assetHistoryCollapsible: {
    marginTop: "22px",
    borderRadius: "22px",
    border: "1px solid #DCE8F6",
    background: "var(--fmed-surface-solid)",
    boxShadow: "0 12px 28px rgba(14,27,66,0.06)",
    padding: "20px"
  },
  assetHistoryHeaderCompact: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "18px",
    marginBottom: "0"
  },
  historyFilterBar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    paddingTop: "18px",
    marginTop: "16px",
    borderTop: "1px solid #E5EEF9"
  },
  historyResultInfo: {
    marginTop: "12px",
    color: "var(--fmed-muted)",
    fontSize: "12px",
    fontWeight: 400
  },
  tableWrapCompact: {
    width: "100%",
    overflowX: "auto",
    maxHeight: "520px",
    overflowY: "auto",
    marginTop: "12px",
    border: "1px solid #DCE8F6",
    borderRadius: "16px",
    background: "var(--fmed-surface-solid)"
  },
  assetHistoryHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginTop: "0",
    marginBottom: "8px",
    padding: "10px 12px",
    borderRadius: "17px",
    background: "var(--fmed-surface-solid)",
    border: "1px solid #DCE8F6",
    boxShadow: "0 10px 22px rgba(14,27,66,0.05)"
  },
  assetHistoryTitle: {
    margin: 0,
    fontSize: "21px",
    fontWeight: 400,
    color: "var(--fmed-text)"
  },
  assetHistorySubtitle: {
    margin: "3px 0 0 0",
    fontSize: "14px",
    color: "var(--fmed-muted)",
    fontWeight: 400
  },
  sectionTitle: {
    marginTop: "0",
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: 400,
    color: "var(--fmed-text)"
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px"
  },
  analysisCard: {
    background: "var(--fmed-surface-soft)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "20px"
  },
  analysisGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
    gap: "10px"
  },
  analysisBox: {
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "14px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(30,77,155,0.07)"
  },
  analysisDescription: {
    marginTop: "20px",
    padding: "20px",
    background: "var(--fmed-surface-soft)",
    borderRadius: "14px",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)"
  },
  analysisLabel: {
    display: "block",
    fontSize: "11px",
    color: "var(--fmed-muted)",
    textTransform: "uppercase",
    marginBottom: "8px",
    fontWeight: 400
  },
  analysisValue: {
    display: "block",
    fontSize: "24px",
    fontWeight: 400,
    color: "var(--fmed-text)"
  },
  analysisBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "92px",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "16px",
    fontWeight: 400,
    boxSizing: "border-box"
  },
  criteriaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "12px",
    marginTop: "15px"
  },
  criteriaBox: {
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "14px",
    padding: "14px",
    lineHeight: "1.6",
    boxSizing: "border-box"
  },
  editPanel: {
    width: "100%",
    marginTop: "22px",
    padding: "24px",
    borderRadius: "22px",
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "0 14px 35px rgba(30,77,155,0.12)",
    boxSizing: "border-box"
  },
  editGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "16px"
  },
  editField: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  editLabel: {
    fontSize: "11px",
    fontWeight: 400,
    color: "var(--fmed-muted)",
    textTransform: "uppercase"
  },
  assetActionsBar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    margin: "6px 0 12px 0"
  },
  headerActions: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "wrap"
  },
  cancelBtn: {
    padding: "14px 20px",
    borderRadius: "14px",
    border: "1px solid #CAD7E6",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    fontWeight: 400,
    cursor: "pointer"
  },
  saveBtn: {
    padding: "14px 22px",
    borderRadius: "14px",
    border: "none",
    background: "var(--fmed-btn)",
    color: "white",
    fontWeight: 400,
    cursor: "pointer",
    boxShadow: "var(--fmed-btn-shadow)"
  },
  mutedSmall: {
    color: "#9AA6B2",
    fontSize: "12px",
    fontWeight: 400
  },
  docBtn: {
    height: "34px",
    minWidth: "76px",
    padding: "0 12px",
    borderRadius: "10px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-text)",
    fontSize: "12px",
    fontWeight: 400,
    cursor: "pointer",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  },
  rowActionGroup: {
    display: "flex",
    flexDirection: "row",
    gap: "6px",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "nowrap"
  },
  actionBtnEdit: {
    height: "34px",
    minWidth: "92px",
    padding: "0 12px",
    borderRadius: "10px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-text)",
    fontSize: "12px",
    fontWeight: 400,
    cursor: "pointer",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  },
  actionBtnDelete: {
    height: "34px",
    minWidth: "88px",
    padding: "0 12px",
    borderRadius: "10px",
    border: "1px solid #DC2626",
    background: "#DC2626",
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: 400,
    cursor: "pointer",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  },
  docBtnDisabled: {
    height: "34px",
    minWidth: "76px",
    padding: "0 12px",
    borderRadius: "10px",
    border: "1px solid #E5E7EB",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-muted)",
    fontSize: "12px",
    fontWeight: 400,
    cursor: "help",
    whiteSpace: "nowrap"
  },
  selectionCounter: {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "12px",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-text)",
    fontSize: "12px",
    fontWeight: 400,
    border: "1px solid var(--fmed-border)"
  },
  // ===== FMED LAYOUT 2026 - override completo stile Asset/Export/Dizionari =====
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,13,43,0.66)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    zIndex: 9999,
    padding: "10px 12px",
    boxSizing: "border-box",
    overflow: "hidden"
  },
  modalCard: {
    width: "min(1680px, calc(100vw - 24px))",
    maxHeight: "calc(100vh - 20px)",
    overflowY: "auto",
    overflowX: "hidden",
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "22px",
    padding: "10px 12px",
    boxShadow: "0 30px 90px rgba(0,0,0,0.35)",
    color: "var(--fmed-text)",
    boxSizing: "border-box"
  },
  modalSmallCard: {
    width: "min(1720px, calc(100vw - 56px))",
    maxHeight: "calc(100vh - 34px)",
    overflowY: "auto",
    overflowX: "hidden",
    background: "var(--fmed-card-gradient)",
    borderRadius: "28px",
    padding: "30px 34px 34px",
    boxShadow: "0 32px 90px rgba(0,21,70,.28)",
    border: "1px solid rgba(0,76,153,.16)",
    position: "relative",
    boxSizing: "border-box"
  },
  closeBtn: {
    position: "absolute",
    top: "22px",
    right: "22px",
    height: "42px",
    minWidth: "86px",
    borderRadius: "14px",
    border: "1px solid #c8d8ec",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    fontWeight: 400,
    fontFamily: "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(0,21,70,.08)"
  },
  modalTitle: {
    margin: "0 0 22px",
    fontSize: "30px",
    letterSpacing: "-.5px",
    color: "var(--fmed-text)",
    fontWeight: 400,
    fontFamily: "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif"
  },
  assetHeroCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "20px",
    padding: "8px 12px",
    marginBottom: "8px",
    boxShadow: "0 10px 24px rgba(0,31,91,.06)"
  },
  assetHeroLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: "260px"
  },
  assetHeroIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "17px",
    background: "linear-gradient(135deg,#8F9E8B 0%,#7C8B79 100%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    boxShadow: "0 12px 24px rgba(143,158,139,.24)"
  },
  assetHeroLabel: {
    fontSize: "13px",
    fontWeight: 400,
    color: "#2b4770",
    textTransform: "uppercase",
    letterSpacing: ".4px"
  },
  assetHeroCode: {
    fontSize: "29px",
    lineHeight: "31px",
    fontWeight: 400,
    color: "var(--fmed-text)",
    letterSpacing: "-1px"
  },
  assetHeroActions: {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(132px, 1fr))",
    gap: "10px",
    flex: 1
  },
  assetTopBtn: {
    height: "34px",
    borderRadius: "12px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    fontWeight: 400,
    fontSize: "11px",
    fontFamily: "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(0,31,91,.045)",
    whiteSpace: "nowrap"
  },
  assetTopBtnPrimary: {
    background: "linear-gradient(135deg,#8F9E8B 0%,#7C8B79 100%)",
    color: "#fff",
    border: "none",
    boxShadow: "0 14px 28px rgba(143,158,139,.24)"
  },
  assetKpiRibbon: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "0",
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "19px",
    padding: "6px 10px",
    marginBottom: "8px",
    boxShadow: "0 10px 24px rgba(0,31,91,.055)"
  },
  assetKpiItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "6px 12px",
    borderRight: "1px solid #dbe8f7"
  },
  assetKpiIconGreen: {
    width: "36px",
    height: "36px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    background: "#e7f8ef"
  },
  assetKpiIconBlue: {
    width: "36px",
    height: "36px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    background: "#eaf2ff"
  },
  assetKpiIconPurple: {
    width: "36px",
    height: "36px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    background: "#f1e9ff"
  },
  assetKpiIconOrange: {
    width: "36px",
    height: "36px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    background: "var(--fmed-surface-soft)"
  },
  assetKpiLabel: {
    fontSize: "12px",
    fontWeight: 400,
    color: "#123362",
    textTransform: "uppercase",
    letterSpacing: ".4px"
  },
  assetKpiValue: {
    marginTop: "2px",
    fontSize: "19px",
    fontWeight: 400,
    color: "#6F846C",
    textTransform: "uppercase"
  },
  assetKpiValueSmall: {
    marginTop: "2px",
    fontSize: "15px",
    fontWeight: 400,
    color: "var(--fmed-text)"
  },
  assetMainGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
    gap: "14px",
    alignItems: "stretch",
    marginBottom: "12px"
  },
  assetPanel: {
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "17px",
    padding: "13px 16px",
    boxShadow: "0 10px 24px rgba(0,31,91,.052)",
    overflow: "hidden"
  },
  assetPanelCompact: {
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "17px",
    padding: "9px 12px",
    boxShadow: "0 10px 24px rgba(0,31,91,.052)",
    overflow: "hidden",
    marginBottom: "10px"
  },
  assetInfoTable: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 0
  },
  detailItem: {
    display: "grid",
    gridTemplateColumns: "128px 1fr",
    alignItems: "center",
    padding: "5px 0",
    borderBottom: "1px solid var(--fmed-border)",
    minHeight: "22px"
  },
  detailLabel: {
    fontSize: "11.5px",
    color: "#64748b",
    fontWeight: 400
  },
  detailValue: {
    fontSize: "13px",
    color: "var(--fmed-text)",
    fontWeight: 400,
    wordBreak: "break-word"
  },
  fmeaGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "11px",
    height: "calc(100% - 32px)"
  },
  fmeaBox: {
    border: "1px solid var(--fmed-border)",
    borderRadius: "14px",
    background: "var(--fmed-card-gradient)",
    minHeight: "86px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    textAlign: "center",
    color: "var(--fmed-text)",
    fontSize: "15px"
  },
  dashboardIntroCompact: {
    minHeight: "auto",
    padding: "12px 16px",
    borderRadius: "14px",
    gap: "4px",
    marginBottom: "12px"
  },
  dashboardIntroTitle: {
    margin: "6px 0 4px",
    fontSize: "20px",
    lineHeight: 1.12,
    fontWeight: 500,
    color: "var(--fmed-text)"
  },
  dashboardIntroText: {
    margin: 0,
    maxWidth: "1120px",
    fontSize: "12.5px",
    lineHeight: 1.35,
    color: "var(--fmed-muted)"
  },
  dashboardIntroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "8px",
    marginTop: "8px"
  },
  dashboardIntroMiniBox: {
    border: "1px solid var(--fmed-border)",
    borderRadius: "10px",
    padding: "7px 9px",
    minHeight: "44px",
    fontSize: "11.5px",
    lineHeight: 1.25,
    color: "var(--fmed-muted)",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    overflowWrap: "anywhere"
  },
  recommendationPanel: {
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "14px",
    padding: "10px 12px",
    marginBottom: "8px",
    boxShadow: "0 8px 18px rgba(0,31,91,.04)"
  },
  recommendationGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "8px"
  },
  recommendationStack: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "8px"
  },
  recommendationBox: {
    border: "1px solid #cfe0f4",
    borderRadius: "12px",
    padding: "9px 11px",
    minHeight: "74px",
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    fontSize: "11.5px",
    lineHeight: "1.28",
    fontWeight: 400,
    boxShadow: "0 6px 14px rgba(0,31,91,.04)",
    overflowWrap: "anywhere"
  },
  recommendationBoxCompact: {
    border: "1px solid var(--fmed-border)",
    borderRadius: "14px",
    padding: "8px 10px",
    minHeight: "58px",
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    fontSize: "10.5px",
    lineHeight: "1.28",
    fontWeight: 400
  },
  recommendationTitle: {
    color: "#6F846C",
    fontWeight: 400,
    textTransform: "uppercase",
    marginBottom: "4px",
    fontSize: "13px"
  },
  assetActionsPanel: {
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "18px",
    padding: "14px",
    boxShadow: "0 14px 34px rgba(0,31,91,.06)",
    marginTop: "10px",
    marginBottom: "12px"
  },
  assetActionsHeaderCompact: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
    marginBottom: "12px"
  },
  assetActionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 178px), 1fr))",
    gap: "10px"
  },
  assetActionBtn: {
    minHeight: "50px",
    borderRadius: "15px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    fontWeight: 400,
    fontSize: "15px",
    fontFamily: "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    padding: "0 16px",
    whiteSpace: "normal",
    overflow: "hidden",
    textAlign: "center",
    lineHeight: 1.15,
    minWidth: 0
  },
  assetActionBtnEdit: {
    background: "linear-gradient(135deg,#8F9E8B 0%,#7C8B79 100%)",
    color: "#fff",
    border: "none"
  },
  assetActionBtnDanger: {
    background: "var(--fmed-surface-soft)",
    border: "1px solid #D8D2C7",
    color: "#A66C61"
  },
  assetActionBtnDelete: {
    background: "linear-gradient(135deg,#C98A7D 0%,#B9776A 100%)",
    color: "#fff",
    border: "none"
  },
  historyTableWrap: {
    border: "1px solid var(--fmed-border)",
    borderRadius: "14px",
    overflow: "hidden",
    background: "var(--fmed-surface-solid)"
  },
  primaryBtn: {
    minHeight: "40px",
    padding: "0 18px",
    borderRadius: "11px",
    border: "none",
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: 400,
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(19,60,85,.18)",
    whiteSpace: "nowrap",
    overflow: "visible"
  },
  secondaryBtn: {
    minHeight: "40px",
    borderRadius: "11px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    fontWeight: 400,
    fontSize: "12px",
    fontFamily: "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    cursor: "pointer",
    padding: "0 18px",
    whiteSpace: "nowrap",
    overflow: "visible",
    boxShadow: "0 6px 16px rgba(30,77,155,0.08)"
  },
  dictionaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
    gap: "14px",
    alignItems: "start"
  },
  dictionaryBox: {
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    borderRadius: "18px",
    padding: "12px",
    boxShadow: "0 12px 28px rgba(0,31,91,.06)",
    minHeight: "auto",
    boxSizing: "border-box",
    overflow: "hidden"
  },
  dictionaryBoxOpen: {
    boxShadow: "0 18px 38px rgba(0,31,91,.10)"
  },
  dictionaryAccordionHeader: {
    width: "100%",
    border: "none",
    background: "transparent",
    color: "var(--fmed-text)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    cursor: "pointer",
    textAlign: "left",
    padding: "4px 2px",
    fontFamily: "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif"
  },
  dictionaryAccordionLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: 0
  },
  dictionaryAccordionIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "12px",
    background: "var(--fmed-surface-soft)",
    border: "1px solid var(--fmed-border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--fmed-accent)",
    fontWeight: 400,
    flex: "0 0 auto"
  },
  dictionaryAccordionTitle: {
    margin: 0,
    fontSize: "15px",
    lineHeight: 1.15,
    color: "var(--fmed-text)",
    fontWeight: 400
  },
  dictionaryAccordionSubtitle: {
    marginTop: "4px",
    color: "var(--fmed-muted)",
    fontSize: "11px",
    fontWeight: 400
  },
  dictionaryAccordionRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flex: "0 0 auto"
  },
  dictionaryAccordionBadge: {
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-muted)",
    borderRadius: "999px",
    padding: "4px 9px",
    fontSize: "10px",
    fontWeight: 400,
    textTransform: "uppercase"
  },
  dictionaryAccordionChevron: {
    color: "var(--fmed-accent)",
    fontSize: "12px",
    fontWeight: 400
  },
  dictionaryAccordionContent: {
    marginTop: "14px",
    paddingTop: "14px",
    borderTop: "1px solid var(--fmed-border)"
  },
  dictionaryPreview: {
    display: "flex",
    flexWrap: "wrap",
    gap: "7px",
    marginTop: "12px",
    maxHeight: "78px",
    overflowY: "auto",
    overflowX: "hidden",
    paddingRight: "6px",
    alignContent: "flex-start"
  },
  dictionaryChip: {
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-text)",
    borderRadius: "999px",
    padding: "5px 6px 5px 10px",
    fontSize: "10.5px",
    fontWeight: 400,
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    maxWidth: "calc(100% - 4px)",
    minWidth: 0
  },
  dictionaryChipRemove: {
    width: "18px",
    height: "18px",
    borderRadius: "999px",
    border: "1px solid #ffb5bd",
    background: "var(--fmed-danger-bg)",
    color: "#d81725",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "14px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0
  },
  dictionaryChipText: {
    maxWidth: "190px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0
  },
  dictionaryChipEdit: {
    width: "18px",
    height: "18px",
    borderRadius: "999px",
    border: "1px solid #b9c7ff",
    background: "#f1f4ff",
    color: "#78684F",
    fontSize: "11px",
    lineHeight: "16px",
    fontWeight: 400,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0
  },
  dictionaryChipEditing: {
    borderRadius: "14px",
    padding: "6px",
    width: "100%",
    background: "var(--fmed-surface-solid)"
  },
  dictionaryInlineInput: {
    flex: 1,
    minWidth: "120px",
    border: "1px solid #b9c7ff",
    borderRadius: "10px",
    padding: "7px 9px",
    fontSize: "12px",
    fontWeight: 400,
    color: "var(--fmed-text)",
    outline: "none"
  },
  dictionaryChipSave: {
    width: "24px",
    height: "24px",
    borderRadius: "999px",
    border: "1px solid #8fe5b6",
    background: "#eafff3",
    color: "#087b3d",
    fontWeight: 400,
    cursor: "pointer"
  },
  dictionaryChipCancel: {
    width: "24px",
    height: "24px",
    borderRadius: "999px",
    border: "1px solid #d6dff2",
    background: "#f6f8fc",
    color: "#33405f",
    fontWeight: 400,
    cursor: "pointer"
  },
  exportAccordionItem: {
    border: "1px solid var(--fmed-border)",
    borderRadius: "18px",
    background: "var(--fmed-surface-soft)",
    overflow: "hidden",
    boxShadow: "0 10px 26px rgba(61,58,53,.08)"
  },
  exportAccordionHeader: {
    width: "100%",
    border: 0,
    background: "transparent",
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    cursor: "pointer",
    textAlign: "left",
    color: "var(--fmed-text)"
  },
  exportAccordionTitleWrap: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    minWidth: 0
  },
  exportAccordionIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "0 8px 18px rgba(61,58,53,.08)",
    flex: "0 0 auto",
    fontSize: "19px"
  },
  exportAccordionTitle: {
    fontSize: "16px",
    fontWeight: 400,
    color: "var(--fmed-text)",
    lineHeight: 1.2
  },
  exportAccordionSubtitle: {
    marginTop: "4px",
    fontSize: "12px",
    fontWeight: 400,
    color: "var(--fmed-muted)",
    lineHeight: 1.35
  },
  exportAccordionChevron: {
    width: "34px",
    height: "34px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-muted)",
    fontSize: "12px",
    fontWeight: 400,
    flex: "0 0 auto"
  },
  exportAccordionBody: {
    borderTop: "1px solid var(--fmed-border)",
    padding: "18px 20px 20px",
    background: "rgba(255,255,255,.04)"
  },
  exportInlineGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(180px, 1fr))",
    gap: "12px"
  },
  exportInlineGridSmall: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 320px)",
    gap: "12px",
    marginBottom: "12px"
  },
  exportInfoLine: {
    marginTop: "12px",
    color: "var(--fmed-muted)",
    fontSize: "12px",
    fontWeight: 400
  },
  exportActionRow: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
    alignItems: "center"
  },
  exportFilterBox: {
    marginTop: "12px",
    border: "1px solid var(--fmed-border)",
    borderRadius: "14px",
    background: "var(--fmed-surface-soft)",
    padding: "12px"
  },
  exportCheckboxGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "7px 10px",
    maxHeight: "116px",
    overflowY: "auto",
    paddingRight: "4px"
  },
  exportCheckLabel: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    fontSize: "11px",
    fontWeight: 400,
    color: "var(--fmed-text)",
    background: "var(--fmed-surface-solid)",
    border: "1px solid #e1ebf7",
    borderRadius: "10px",
    padding: "7px 8px",
    cursor: "pointer"
  },
  miniActionBtn: {
    height: "26px",
    borderRadius: "999px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    fontSize: "11px",
    fontWeight: 400,
    cursor: "pointer",
    padding: "0 10px"
  },
  editInput: {
    width: "100%",
    minHeight: "42px",
    borderRadius: "12px",
    border: "1px solid var(--fmed-border)",
    padding: "0 12px",
    fontFamily: "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    fontWeight: 400,
    color: "var(--fmed-text)",
    boxSizing: "border-box",
    background: "var(--fmed-surface-solid)"
  },
  editTextarea: {
    width: "100%",
    minHeight: "86px",
    borderRadius: "12px",
    border: "1px solid var(--fmed-border)",
    padding: "12px",
    fontFamily: "\"Futura Light\", \"Futura PT\", Futura, \"Trebuchet MS\", Arial, sans-serif",
    fontWeight: 400,
    color: "var(--fmed-text)",
    boxSizing: "border-box",
    background: "var(--fmed-surface-solid)"
  },
  editActions: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    marginTop: "24px"
  },
  sidebarBottomPanel: {
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    paddingTop: "12px",
    borderTop: "1px solid rgba(255,255,255,.18)"
  },
  sidebarUserCard: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    borderRadius: "16px",
    background: "rgba(255,255,255,.10)",
    border: "1px solid rgba(255,255,255,.18)",
    color: "#FFFFFF",
    backdropFilter: "blur(8px)"
  },
  sidebarUserAvatar: {
    width: "34px",
    height: "34px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,.18)",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: 500,
    flex: "0 0 auto"
  },
  sidebarUserInfo: {
    minWidth: 0,
    flex: 1
  },
  sidebarUserName: {
    color: "#FFFFFF",
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  sidebarUserRole: {
    color: "rgba(255,255,255,.70)",
    fontSize: "10px",
    lineHeight: "14px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  sidebarRoleHint: {
    marginTop: 10,
    padding: "9px 10px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "rgba(255,255,255,0.72)",
    fontSize: 10,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    lineHeight: 1.35,
    textAlign: "center"
  },
  sidebarLogoutBtn: {
    width: "100%",
    height: "42px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,.24)",
    background: "rgba(255,255,255,.10)",
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: 400,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    backdropFilter: "blur(8px)"
  },
  themeToggleBtn: {
    width: "100%",
    height: "42px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,.30)",
    background: "rgba(255,255,255,.12)",
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: 400,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    backdropFilter: "blur(8px)",
    boxShadow: "0 14px 28px rgba(0,0,0,.18)"
  }
};

// Override layout Asset - versione più grande e proporzionata
styles.assetHeroPanel = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
  gap: "18px",
  margin: "4px 0 14px 0",
  padding: "22px 28px",
  borderRadius: "26px",
  background: "var(--fmed-card-gradient)",
  border: "1px solid var(--fmed-border)",
  boxShadow: "0 22px 55px rgba(61,58,53,.12)"
};
styles.assetHeroLeft = {
  flex: 1,
  minWidth: 0
};
styles.assetHeroEyebrow = {
  color: "var(--fmed-muted)",
  fontSize: "14px",
  fontWeight: 400,
  letterSpacing: ".5px",
  textTransform: "uppercase",
  marginBottom: "8px"
};
styles.assetHeroTitle = {
  margin: 0,
  color: "var(--fmed-text)",
  fontSize: "34px",
  lineHeight: "38px",
  fontWeight: 400,
  letterSpacing: "-1.2px"
};
styles.assetHeroSubtitle = {
  margin: "7px 0 0 0",
  color: "var(--fmed-muted)",
  fontSize: "15px",
  fontWeight: 400,
  lineHeight: "1.45",
  maxWidth: "760px"
};
styles.assetHeroRight = {
  minWidth: "210px",
  borderRadius: "22px",
  background: "var(--fmed-btn)",
  color: "#fff",
  padding: "18px 22px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 18px 38px rgba(143,158,139,.28)"
};
styles.assetHeroBadgeNumber = {
  fontSize: "38px",
  lineHeight: "40px",
  fontWeight: 400
};
styles.assetHeroBadgeText = {
  marginTop: "5px",
  fontSize: "15px",
  fontWeight: 400
};
styles.assetHeroBadgeSub = {
  marginTop: "5px",
  fontSize: "13px",
  fontWeight: 400,
  opacity: .86
};
styles.assetFiltersPanel = {
  padding: "20px 24px 18px",
  borderRadius: "24px",
  background: "var(--fmed-card-gradient)",
  border: "1px solid var(--fmed-border)",
  boxShadow: "0 18px 44px rgba(61,58,53,.10)",
  marginBottom: "16px"
};
styles.assetFiltersHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "18px",
  marginBottom: "14px"
};
styles.assetSectionTitle = {
  margin: 0,
  color: "var(--fmed-text)",
  fontSize: "30px",
  lineHeight: "34px",
  fontWeight: 400
};
styles.assetSectionSubtitle = {
  margin: "5px 0 0",
  color: "var(--fmed-muted)",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400
};
styles.assetFilterChips = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  alignItems: "center",
  maxWidth: "460px"
};
styles.assetChip = {
  padding: "12px 18px",
  borderRadius: "999px",
  background: "rgba(143,158,139,.12)",
  border: "1px solid rgba(143,158,139,.35)",
  color: "var(--fmed-text)",
  fontSize: "14px",
  fontWeight: 400,
  whiteSpace: "nowrap"
};
styles.assetFiltersGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))",
  gap: "12px",
  alignItems: "center"
};
styles.assetInputLarge = {
  height: "56px",
  padding: "0 20px",
  borderRadius: "18px",
  border: "1px solid var(--fmed-border)",
  background: "var(--fmed-surface-soft)",
  color: "var(--fmed-text)",
  fontSize: "16px",
  fontWeight: 400,
  outline: "none",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,.7)"
};
styles.assetSelectLarge = {
  height: "56px",
  padding: "0 18px",
  borderRadius: "18px",
  border: "1px solid var(--fmed-border)",
  background: "var(--fmed-surface-soft)",
  color: "var(--fmed-text)",
  fontSize: "15px",
  fontWeight: 400,
  outline: "none"
};
styles.assetKpiGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  gap: "12px",
  margin: "0 0 22px 0"
};
styles.assetKpiCard = {
  background: "var(--fmed-card-gradient)",
  border: "1px solid var(--fmed-border)",
  borderRadius: "26px",
  padding: "22px 24px",
  boxShadow: "0 18px 42px rgba(61,58,53,.10)",
  minHeight: "140px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};
styles.assetKpiTop = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};
styles.assetKpiIcon = {
  fontSize: "24px"
};
styles.assetKpiLabel = {
  color: "var(--fmed-muted)",
  fontSize: "14px",
  fontWeight: 400,
  textTransform: "uppercase",
  letterSpacing: ".55px"
};
styles.assetKpiValue = {
  display: "block",
  color: "var(--fmed-text)",
  fontSize: "46px",
  lineHeight: "48px",
  fontWeight: 400,
  letterSpacing: "-1px",
  marginTop: "12px"
};
styles.assetKpiHint = {
  color: "var(--fmed-muted)",
  fontSize: "14px",
  fontWeight: 400,
  marginTop: "8px"
};
styles.assetActionsBar = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
  gap: "10px",
  margin: "14px 0 2px 0"
};
styles.assetPrimaryAction = {
  height: "50px",
  borderRadius: "16px",
  border: "none",
  background: "var(--fmed-btn)",
  color: "#fff",
  fontSize: "14px",
  fontWeight: 400,
  cursor: "pointer",
  boxShadow: "var(--fmed-btn-shadow)"
};
styles.assetSecondaryAction = {
  height: "50px",
  borderRadius: "16px",
  border: "1px solid var(--fmed-border)",
  background: "var(--fmed-card-gradient)",
  color: "var(--fmed-text)",
  fontSize: "14px",
  fontWeight: 400,
  cursor: "pointer",
  boxShadow: "0 14px 30px rgba(111,128,104,.12)"
};
styles.assetGhostAction = {
  height: "50px",
  borderRadius: "16px",
  border: "1px solid var(--fmed-border)",
  background: "var(--fmed-surface-solid)",
  color: "var(--fmed-text)",
  fontSize: "14px",
  fontWeight: 400,
  cursor: "pointer",
  boxShadow: "0 12px 28px rgba(61,58,53,.08)"
};
styles.assetAnalysisGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
  gap: "12px",
  marginBottom: "16px"
};
styles.assetAnalysisCard = {
  background: "var(--fmed-surface-solid)",
  border: "1px solid var(--fmed-border)",
  borderRadius: "26px",
  padding: "24px",
  boxShadow: "0 18px 42px rgba(61,58,53,.10)"
};
styles.assetAnalysisTitle = {
  margin: "0 0 14px 0",
  color: "var(--fmed-text)",
  fontSize: "21px",
  fontWeight: 400
};
styles.assetRankList = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};
styles.assetRankRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  padding: "13px 16px",
  borderRadius: "16px",
  background: "var(--fmed-surface-soft)",
  border: "1px solid var(--fmed-border)",
  color: "var(--fmed-text)",
  fontSize: "15px",
  fontWeight: 400
};
styles.assetTableCard = {
  background: "var(--fmed-surface-solid)",
  border: "1px solid var(--fmed-border)",
  borderRadius: "28px",
  padding: "24px 26px",
  boxShadow: "0 20px 50px rgba(61,58,53,.11)",
  marginTop: "4px"
};
styles.assetListHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "18px",
  marginBottom: "16px"
};
styles.assetTableTitle = {
  margin: 0,
  color: "var(--fmed-text)",
  fontSize: "25px",
  fontWeight: 400
};
styles.assetTableSubtitle = {
  margin: "6px 0 0",
  color: "var(--fmed-muted)",
  fontSize: "15px",
  fontWeight: 400
};
styles.assetCloseBtn = {
  padding: "14px 22px",
  borderRadius: "16px",
  border: "1px solid var(--fmed-border)",
  background: "var(--fmed-surface-soft)",
  color: "var(--fmed-text)",
  fontSize: "14px",
  fontWeight: 400,
  cursor: "pointer"
};
styles.tableLarge = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0",
  fontSize: "15px",
  color: "var(--fmed-text)"
};
styles.thLarge = {
  padding: "16px 14px",
  background: "var(--fmed-surface-soft)",
  color: "var(--fmed-muted)",
  textAlign: "left",
  fontSize: "13px",
  fontWeight: 400,
  textTransform: "uppercase",
  borderBottom: "1px solid var(--fmed-border)"
};
styles.tdLarge = {
  padding: "16px 14px",
  borderBottom: "1px solid var(--fmed-border)",
  fontSize: "15px",
  fontWeight: 400,
  color: "var(--fmed-text)",
  lineHeight: "1.35"
};
styles.tdCodeLarge = {
  padding: "16px 14px",
  color: "#169C8F",
  fontSize: "14px",
  fontWeight: 400,
  verticalAlign: "middle",
  borderBottom: "1px solid var(--fmed-border)"
};

/* === FMED CLEAN PATCH - RICERCA E PULSANTI SENZA TAGLI ===
   Base: codice caricato dall'utente.
   Correzioni mirate:
   - testo della card Cerca cespite non esce più dal contenitore;
   - input ricerca largo e proporzionato;
   - pulsante Cerca allineato a destra;
   - pulsanti stampatello più grandi ma senza taglio;
   - applicato a tutto il sistema senza modificare backend/API.
*/
Object.assign(styles, {
  /* Layout ricerca cespite */
  assetFiltersPanel: {
    ...styles.assetFiltersPanel,
    overflow: "hidden",
    boxSizing: "border-box"
  },
  assetFiltersHeader: {
    ...styles.assetFiltersHeader,
    alignItems: "flex-start",
    gap: "18px"
  },
  assetSectionTitle: {
    ...styles.assetSectionTitle,
    fontSize: "27px",
    lineHeight: "32px",
    margin: 0,
    overflowWrap: "anywhere"
  },
  assetSectionSubtitle: {
    ...styles.assetSectionSubtitle,
    fontSize: "15px",
    lineHeight: "22px",
    maxWidth: "100%",
    overflowWrap: "anywhere",
    whiteSpace: "normal"
  },
  assetSearchRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 156px",
    gap: "14px",
    alignItems: "center",
    width: "100%",
    maxWidth: "100%",
    marginTop: "14px",
    boxSizing: "border-box"
  },
  assetInputWide: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    minHeight: "54px",
    borderRadius: "16px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-card)",
    color: "var(--fmed-text)",
    padding: "0 20px",
    fontSize: "17px",
    lineHeight: "24px",
    fontWeight: 400,
    outline: "none",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  assetSearchButton: {
    minHeight: "54px",
    minWidth: "156px",
    maxWidth: "156px",
    borderRadius: "16px",
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-card)",
    color: "var(--fmed-text)",
    padding: "0 18px",
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: 650,
    letterSpacing: "0.035em",
    textTransform: "uppercase",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    overflow: "visible",
    boxShadow: "0 8px 16px rgba(42,32,18,.07)"
  },
  smartFilterToggleRow: {
    ...styles.smartFilterToggleRow,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    boxSizing: "border-box"
  },
  smartFilterHint: {
    ...styles.smartFilterHint,
    minWidth: 0,
    maxWidth: "100%",
    overflowWrap: "anywhere",
    whiteSpace: "normal",
    textAlign: "right"
  },
  /* Pulsanti globali principali */
  assetPrimaryAction: {
    ...styles.assetPrimaryAction,
    minHeight: "50px",
    minWidth: "175px",
    padding: "0 18px",
    borderRadius: "15px",
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: 650,
    letterSpacing: "0.035em",
    textTransform: "uppercase",
    fontStyle: "normal",
    whiteSpace: "nowrap",
    overflow: "visible",
    boxSizing: "border-box"
  },
  assetSecondaryAction: {
    ...styles.assetSecondaryAction,
    minHeight: "50px",
    minWidth: "175px",
    padding: "0 18px",
    borderRadius: "15px",
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: 650,
    letterSpacing: "0.035em",
    textTransform: "uppercase",
    fontStyle: "normal",
    whiteSpace: "nowrap",
    overflow: "visible",
    boxSizing: "border-box"
  },
  assetGhostAction: {
    ...styles.assetGhostAction,
    minHeight: "50px",
    minWidth: "175px",
    padding: "0 18px",
    borderRadius: "15px",
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: 650,
    letterSpacing: "0.035em",
    textTransform: "uppercase",
    fontStyle: "normal",
    whiteSpace: "nowrap",
    overflow: "visible",
    boxSizing: "border-box"
  },
  button: {
    ...styles.button,
    minHeight: "46px",
    padding: "0 16px",
    fontSize: "15px",
    lineHeight: "20px",
    fontWeight: 650,
    letterSpacing: "0.035em",
    textTransform: "uppercase",
    fontStyle: "normal",
    whiteSpace: "nowrap",
    boxSizing: "border-box"
  },
  primaryButton: {
    ...styles.primaryButton,
    minHeight: "46px",
    padding: "0 16px",
    fontSize: "15px",
    lineHeight: "20px",
    fontWeight: 650,
    letterSpacing: "0.035em",
    textTransform: "uppercase",
    fontStyle: "normal",
    whiteSpace: "nowrap",
    boxSizing: "border-box"
  },
  secondaryButton: {
    ...styles.secondaryButton,
    minHeight: "46px",
    padding: "0 16px",
    fontSize: "15px",
    lineHeight: "20px",
    fontWeight: 650,
    letterSpacing: "0.035em",
    textTransform: "uppercase",
    fontStyle: "normal",
    whiteSpace: "nowrap",
    boxSizing: "border-box"
  },
  docBtn: {
    ...styles.docBtn,
    minHeight: "38px",
    minWidth: "82px",
    padding: "0 12px",
    fontSize: "14px",
    lineHeight: "18px",
    fontWeight: 650,
    letterSpacing: "0.025em",
    textTransform: "uppercase",
    fontStyle: "normal",
    whiteSpace: "nowrap",
    boxSizing: "border-box"
  },
  docBtnDisabled: {
    ...styles.docBtnDisabled,
    minHeight: "38px",
    minWidth: "82px",
    padding: "0 12px",
    fontSize: "14px",
    lineHeight: "18px",
    fontWeight: 650,
    letterSpacing: "0.025em",
    textTransform: "uppercase",
    fontStyle: "normal",
    whiteSpace: "nowrap",
    boxSizing: "border-box"
  },
  /* Input normali: maiuscolo escluso */
  input: {
    ...styles.input,
    textTransform: "none",
    fontStyle: "normal",
    minWidth: 0,
    boxSizing: "border-box"
  },
  select: {
    ...styles.select,
    textTransform: "none",
    fontStyle: "normal",
    minWidth: 0,
    boxSizing: "border-box"
  },
  /* Tabelle */
  thLarge: {
    ...styles.thLarge,
    textTransform: "uppercase",
    letterSpacing: "0.09em",
    fontStyle: "normal",
    fontWeight: 650
  },
  tdLarge: {
    ...styles.tdLarge,
    textTransform: "none",
    fontStyle: "normal",
    overflowWrap: "anywhere"
  },
  tdCodeLarge: {
    ...styles.tdCodeLarge,
    textTransform: "none",
    fontStyle: "normal",
    whiteSpace: "nowrap"
  }

  
});

/* === FMED CLEAN PATCH - OVERFLOW SCHEDA CESPITE E TOOLBAR ===
   Ridimensiona i pulsanti nelle toolbar e nei popup:
   - mantieni stampatello;
   - testo leggibile;
   - niente uscita dai contenitori;
   - pulsanti a capo se lo spazio non basta.
*/
Object.assign(styles, {
  modalCard: {
    ...styles.modalCard,
    maxWidth: "min(1380px, calc(100vw - 56px))",
    overflowX: "hidden",
    boxSizing: "border-box"
  },
  modalBody: {
    ...styles.modalBody,
    overflowX: "hidden",
    boxSizing: "border-box"
  },
  modalTitle: {
    ...styles.modalTitle,
    maxWidth: "100%",
    overflowWrap: "anywhere"
  },
  assetActionsBar: {
    ...styles.assetActionsBar,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "10px",
    maxWidth: "100%",
    overflow: "hidden",
    boxSizing: "border-box"
  },
  assetPrimaryAction: {
    ...styles.assetPrimaryAction,
    minHeight: "42px",
    minWidth: "0",
    maxWidth: "100%",
    padding: "0 13px",
    borderRadius: "13px",
    fontSize: "13px",
    lineHeight: "17px",
    fontWeight: 650,
    letterSpacing: "0.018em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "clip",
    boxSizing: "border-box",
    flex: "0 1 auto"
  },
  assetSecondaryAction: {
    ...styles.assetSecondaryAction,
    minHeight: "42px",
    minWidth: "0",
    maxWidth: "100%",
    padding: "0 13px",
    borderRadius: "13px",
    fontSize: "13px",
    lineHeight: "17px",
    fontWeight: 650,
    letterSpacing: "0.018em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "clip",
    boxSizing: "border-box",
    flex: "0 1 auto"
  },
  assetGhostAction: {
    ...styles.assetGhostAction,
    minHeight: "42px",
    minWidth: "0",
    maxWidth: "100%",
    padding: "0 13px",
    borderRadius: "13px",
    fontSize: "13px",
    lineHeight: "17px",
    fontWeight: 650,
    letterSpacing: "0.018em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "clip",
    boxSizing: "border-box",
    flex: "0 1 auto"
  },
  button: {
    ...styles.button,
    minHeight: "40px",
    minWidth: "0",
    maxWidth: "100%",
    padding: "0 12px",
    borderRadius: "13px",
    fontSize: "13px",
    lineHeight: "17px",
    fontWeight: 650,
    letterSpacing: "0.018em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "clip",
    boxSizing: "border-box"
  },
  primaryButton: {
    ...styles.primaryButton,
    minHeight: "40px",
    minWidth: "0",
    maxWidth: "100%",
    padding: "0 12px",
    borderRadius: "13px",
    fontSize: "13px",
    lineHeight: "17px",
    fontWeight: 650,
    letterSpacing: "0.018em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "clip",
    boxSizing: "border-box"
  },
  secondaryButton: {
    ...styles.secondaryButton,
    minHeight: "40px",
    minWidth: "0",
    maxWidth: "100%",
    padding: "0 12px",
    borderRadius: "13px",
    fontSize: "13px",
    lineHeight: "17px",
    fontWeight: 650,
    letterSpacing: "0.018em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "clip",
    boxSizing: "border-box"
  },
  docBtn: {
    ...styles.docBtn,
    minHeight: "36px",
    minWidth: "0",
    maxWidth: "90px",
    padding: "0 10px",
    borderRadius: "11px",
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "0.012em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    boxSizing: "border-box"
  },
  docBtnDisabled: {
    ...styles.docBtnDisabled,
    minHeight: "36px",
    minWidth: "0",
    maxWidth: "90px",
    padding: "0 10px",
    borderRadius: "11px",
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "0.012em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    boxSizing: "border-box"
  }
});

/* === FMED DASHBOARD COMPACT + LOGO GRANDE - 11/06/2026 ===
   Modifiche richieste:
   - logo sidebar più grande, quasi a pieno quadrato;
   - banner "Quadro tecnico operativo" più compatto;
   - KPI/card più bassi per far entrare la dashboard in una schermata.
*/
Object.assign(styles, {
  sidebar: {
    ...styles.sidebar,
    width: "244px",
    minWidth: "244px",
    padding: "14px 10px 22px 10px"
  },
  sidebarBrand: {
    ...styles.sidebarBrand,
    minHeight: "176px",
    height: "176px",
    padding: "0",
    borderRadius: "20px",
    marginBottom: "14px",
    background: "rgba(255,255,255,.98)",
    overflow: "hidden"
  },
  sidebarLogoNew: {
    ...styles.sidebarLogoNew,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "4px",
    borderRadius: "18px",
    boxSizing: "border-box",
    background: "#FFFFFF"
  },
  sidebarOnlyTitle: {
    ...styles.sidebarOnlyTitle,
    fontSize: "25px",
    lineHeight: "28px",
    margin: "0 0 2px 0"
  },
  sidebarOnlySub: {
    ...styles.sidebarOnlySub,
    margin: "0 0 18px 0",
    fontSize: "10px",
    lineHeight: "15px"
  },
  sidebarNav: {
    ...styles.sidebarNav,
    gap: "7px",
    marginTop: "14px"
  },
  menuBtn: {
    ...styles.menuBtn,
    minHeight: "42px",
    height: "42px",
    padding: "0 14px",
    borderRadius: "10px",
    fontSize: "12px"
  },
  themeToggleBtn: {
    ...styles.themeToggleBtn,
    height: "42px",
    bottom: "14px",
    borderRadius: "12px",
    fontSize: "12px"
  },
  main: {
    ...styles.main,
    padding: "22px 38px 20px 38px"
  },
  emergentTopBar: {
    ...styles.emergentTopBar,
    marginBottom: "16px",
    gap: "18px"
  },
  emergentEyebrow: {
    ...styles.emergentEyebrow,
    marginBottom: "5px",
    fontSize: "10px"
  },
  emergentPageTitle: {
    ...styles.emergentPageTitle,
    fontSize: "24px",
    lineHeight: "29px"
  },
  emergentTopActions: {
    ...styles.emergentTopActions,
    minWidth: "470px"
  },
  emergentSearchInput: {
    ...styles.emergentSearchInput,
    height: "40px",
    width: "310px"
  },
  emergentNewAssetBtn: {
    ...styles.emergentNewAssetBtn,
    height: "40px",
    minHeight: "40px",
    padding: "0 20px"
  },
  emergentHero: {
    ...styles.emergentHero,
    minHeight: "132px",
    padding: "24px 34px",
    marginBottom: "16px",
    alignItems: "center"
  },
  emergentHeroLabel: {
    ...styles.emergentHeroLabel,
    marginBottom: "6px",
    fontSize: "11px"
  },
  emergentHeroNumber: {
    ...styles.emergentHeroNumber,
    fontSize: "50px",
    lineHeight: "50px"
  },
  emergentHeroSub: {
    ...styles.emergentHeroSub,
    marginTop: "7px",
    fontSize: "13px"
  },
  emergentHeroActions: {
    ...styles.emergentHeroActions,
    gap: "9px"
  },
  emergentHeroBtn: {
    ...styles.emergentHeroBtn,
    height: "36px",
    minHeight: "36px",
    padding: "0 20px",
    fontSize: "12px"
  },
  emergentHeroBtnActive: {
    ...styles.emergentHeroBtnActive,
    height: "36px",
    minHeight: "36px",
    padding: "0 20px",
    fontSize: "12px"
  },
  emergentQuickGrid: {
    ...styles.emergentQuickGrid,
    gap: "16px",
    marginBottom: "16px"
  },
  emergentQuickCard: {
    ...styles.emergentQuickCard,
    minHeight: "152px",
    padding: "18px 20px 18px 20px",
    gap: "6px"
  },
  emergentQuickArrow: {
    ...styles.emergentQuickArrow,
    top: "18px",
    right: "20px",
    fontSize: "25px"
  },
  emergentIconBox: {
    ...styles.emergentIconBox,
    width: "36px",
    height: "36px",
    minWidth: "36px",
    borderRadius: "9px",
    fontSize: "18px",
    marginBottom: "5px"
  },
  emergentQuickLabel: {
    ...styles.emergentQuickLabel,
    fontSize: "10px",
    letterSpacing: "0.18em"
  },
  emergentQuickValue: {
    ...styles.emergentQuickValue,
    fontSize: "29px",
    lineHeight: "33px"
  },
  emergentQuickSmall: {
    ...styles.emergentQuickSmall,
    fontSize: "12px",
    lineHeight: "17px"
  },
  emergentAlertGrid: {
    ...styles.emergentAlertGrid,
    gap: "16px",
    marginBottom: "16px"
  },
  emergentAlertCard: {
    ...styles.emergentAlertCard,
    minHeight: "76px",
    padding: "14px 18px",
    gap: "14px"
  },
  emergentAlertNumber: {
    ...styles.emergentAlertNumber,
    width: "48px",
    height: "48px",
    minWidth: "48px",
    fontSize: "20px",
    borderRadius: "11px"
  },
  smartSectionCard: {
    ...styles.smartSectionCard,
    borderRadius: "16px",
    marginBottom: "9px"
  },
  smartSectionHeader: {
    ...styles.smartSectionHeader,
    minHeight: "58px",
    padding: "12px 18px"
  },
  smartSectionTitle: {
    ...styles.smartSectionTitle,
    fontSize: "17px",
    lineHeight: "20px"
  },
  smartSectionSubtitle: {
    ...styles.smartSectionSubtitle,
    fontSize: "11px",
    lineHeight: "15px"
  },
  smartSectionAction: {
    ...styles.smartSectionAction,
    minHeight: "34px",
    padding: "0 14px",
    fontSize: "11px"
  }
});

/* === FMED UI/UX REFINEMENT V1 - visual-only design system === */
Object.assign(styles, {
  themeDarkVars: {
    ...styles.themeDarkVars,
    "--fmed-bg": "#071521",
    "--fmed-surface": "rgba(13,34,52,.98)",
    "--fmed-surface-solid": "#0D2234",
    "--fmed-surface-soft": "#12314A",
    "--fmed-text": "#F4F8F7",
    "--fmed-muted": "#B7C8D8",
    "--fmed-border": "rgba(89,165,216,.24)",
    "--fmed-main-bg": "linear-gradient(180deg, #071521 0%, #091C2B 58%, #071521 100%)",
    "--fmed-card-gradient": "linear-gradient(135deg, rgba(13,34,52,.98), rgba(18,49,74,.94))",
    "--fmed-soft-gradient": "linear-gradient(135deg, rgba(13,34,52,.96), rgba(18,49,74,.90))"
  },
  app: {
    ...styles.app,
    fontFamily: "'Futura', 'Futura PT', 'Jost', 'Century Gothic', sans-serif",
    letterSpacing: 0,
    background: "var(--fmed-bg)"
  },
  main: {
    ...styles.main,
    padding: "24px 32px",
    background: "var(--fmed-main-bg)"
  },
  sidebar: {
    ...styles.sidebar,
    width: "220px",
    minWidth: "160px",
    padding: "16px 8px",
    boxShadow: "4px 0 16px rgba(0,0,0,.10)"
  },
  sidebarBrand: {
    ...styles.sidebarBrand,
    minHeight: "132px",
    height: "132px",
    borderRadius: "12px",
    marginBottom: "16px"
  },
  sidebarNav: {
    ...styles.sidebarNav,
    gap: "8px"
  },
  menuBtn: {
    ...styles.menuBtn,
    minHeight: "44px",
    height: "44px",
    borderRadius: "12px",
    padding: "0 12px",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: ".05em",
    boxShadow: "none"
  },
  menuIconWrap: {
    ...styles.menuIconWrap,
    width: "32px",
    minWidth: "32px"
  },
  menuLabel: {
    ...styles.menuLabel,
    fontWeight: 500,
    whiteSpace: "normal"
  },
  sidebarOnlyTitle: {
    ...styles.sidebarOnlyTitle,
    fontSize: "22px",
    lineHeight: "24px",
    fontWeight: 500
  },
  sidebarOnlySub: {
    ...styles.sidebarOnlySub,
    fontSize: "10px",
    lineHeight: "14px",
    fontWeight: 400
  },
  themeToggleBtn: {
    ...styles.themeToggleBtn,
    minHeight: "44px",
    height: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 500
  },
  headerBanner: {
    ...styles.headerBanner,
    minHeight: "96px",
    marginBottom: "16px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,.08)"
  },
  headerBannerContent: {
    ...styles.headerBannerContent,
    minHeight: "96px",
    padding: "16px 24px"
  },
  pageContext: {
    ...styles.pageContext,
    marginBottom: "4px",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  pageTitle: {
    ...styles.pageTitle,
    fontSize: "28px",
    lineHeight: "32px",
    fontWeight: 500,
    letterSpacing: 0
  },
  pageSub: {
    ...styles.pageSub,
    marginTop: "4px",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 400
  },
  headerBrandMain: {
    ...styles.headerBrandMain,
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  headerBrandSub: {
    ...styles.headerBrandSub,
    fontWeight: 400,
    letterSpacing: ".05em"
  },
  card: {
    ...styles.card,
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)",
    background: "var(--fmed-surface-solid)"
  },
  emergentHero: {
    ...styles.emergentHero,
    minHeight: "96px",
    padding: "20px 24px",
    marginBottom: "16px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,.08)"
  },
  emergentHeroLabel: {
    ...styles.emergentHeroLabel,
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  emergentHeroNumber: {
    ...styles.emergentHeroNumber,
    fontSize: "44px",
    lineHeight: "46px",
    fontWeight: 500
  },
  emergentHeroSub: {
    ...styles.emergentHeroSub,
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 400
  },
  emergentQuickGrid: {
    ...styles.emergentQuickGrid,
    gap: "16px",
    marginBottom: "16px"
  },
  emergentQuickCard: {
    ...styles.emergentQuickCard,
    minHeight: "128px",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)"
  },
  emergentIconBox: {
    ...styles.emergentIconBox,
    width: "32px",
    height: "32px",
    minWidth: "32px",
    borderRadius: "12px",
    fontSize: "16px"
  },
  emergentQuickLabel: {
    ...styles.emergentQuickLabel,
    fontSize: "10px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  emergentQuickValue: {
    ...styles.emergentQuickValue,
    fontSize: "28px",
    lineHeight: "32px",
    fontWeight: 500
  },
  emergentQuickSmall: {
    ...styles.emergentQuickSmall,
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 400
  },
  kpiGrid: {
    ...styles.kpiGrid,
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "16px"
  },
  kpi: {
    ...styles.kpi,
    minHeight: "104px",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)"
  },
  kpiTitle: {
    ...styles.kpiTitle,
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  kpiValue: {
    ...styles.kpiValue,
    fontSize: "30px",
    lineHeight: "34px",
    fontWeight: 500
  },
  assetKpiGrid: {
    ...styles.assetKpiGrid,
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "16px"
  },
  assetKpiCard: {
    ...styles.assetKpiCard,
    minHeight: "112px",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)"
  },
  assetKpiIcon: {
    ...styles.assetKpiIcon,
    fontSize: "20px"
  },
  assetKpiLabel: {
    ...styles.assetKpiLabel,
    fontSize: "11px",
    lineHeight: "14px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  assetKpiValue: {
    ...styles.assetKpiValue,
    fontSize: "30px",
    lineHeight: "34px",
    fontWeight: 500
  },
  assetKpiHint: {
    ...styles.assetKpiHint,
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 400
  },
  assetHeroPanel: {
    ...styles.assetHeroPanel,
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)"
  },
  assetHeroTitle: {
    ...styles.assetHeroTitle,
    fontSize: "28px",
    lineHeight: "32px",
    fontWeight: 500
  },
  assetHeroSubtitle: {
    ...styles.assetHeroSubtitle,
    fontSize: "13px",
    lineHeight: "20px",
    fontWeight: 400
  },
  assetHeroRight: {
    ...styles.assetHeroRight,
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "none"
  },
  assetFiltersPanel: {
    ...styles.assetFiltersPanel,
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)"
  },
  assetFiltersHeader: {
    ...styles.assetFiltersHeader,
    gap: "16px",
    marginBottom: "16px"
  },
  assetSectionTitle: {
    ...styles.assetSectionTitle,
    fontSize: "22px",
    lineHeight: "28px",
    fontWeight: 500
  },
  assetSectionSubtitle: {
    ...styles.assetSectionSubtitle,
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 400
  },
  assetFiltersGrid: {
    ...styles.assetFiltersGrid,
    gap: "16px"
  },
  assetChip: {
    ...styles.assetChip,
    minHeight: "32px",
    borderRadius: "12px",
    padding: "0 12px",
    fontSize: "12px",
    fontWeight: 500
  },
  filters: {
    ...styles.filters,
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)",
    gap: "16px"
  },
  interventiFilters: {
    ...styles.interventiFilters,
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)",
    gap: "16px"
  },
  input: {
    ...styles.input,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 400,
    boxShadow: "none"
  },
  select: {
    ...styles.select,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 400,
    boxShadow: "none"
  },
  assetInputLarge: {
    ...styles.assetInputLarge,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px"
  },
  assetSelectLarge: {
    ...styles.assetSelectLarge,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px"
  },
  editInput: {
    ...styles.editInput,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 400,
    boxShadow: "none"
  },
  editTextarea: {
    ...styles.editTextarea,
    minHeight: "96px",
    borderRadius: "12px",
    fontSize: "13px",
    lineHeight: "20px",
    fontWeight: 400,
    boxShadow: "none"
  },
  editLabel: {
    ...styles.editLabel,
    fontSize: "11px",
    lineHeight: "14px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  button: {
    ...styles.button,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  primaryButton: {
    ...styles.primaryButton,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  secondaryButton: {
    ...styles.secondaryButton,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  primaryBtn: {
    ...styles.primaryBtn,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  secondaryBtn: {
    ...styles.secondaryBtn,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  cancelBtn: {
    ...styles.cancelBtn,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  saveBtn: {
    ...styles.saveBtn,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  assetPrimaryAction: {
    ...styles.assetPrimaryAction,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  assetSecondaryAction: {
    ...styles.assetSecondaryAction,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  assetGhostAction: {
    ...styles.assetGhostAction,
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  assetActionBtn: {
    ...styles.assetActionBtn,
    minHeight: "44px",
    borderRadius: "12px",
    padding: "8px 12px",
    fontSize: "13px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  docBtn: {
    ...styles.docBtn,
    minHeight: "40px",
    borderRadius: "12px",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal"
  },
  docBtnDisabled: {
    ...styles.docBtnDisabled,
    minHeight: "40px",
    borderRadius: "12px",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal"
  },
  miniActionBtn: {
    ...styles.miniActionBtn,
    minHeight: "40px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal"
  },
  tableWrap: {
    ...styles.tableWrap,
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "none"
  },
  tableWrapCompact: {
    ...styles.tableWrapCompact,
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "none"
  },
  table: {
    ...styles.table,
    borderSpacing: 0,
    fontSize: "13px"
  },
  tableLarge: {
    ...styles.tableLarge,
    borderSpacing: 0,
    fontSize: "13px"
  },
  th: {
    ...styles.th,
    height: "40px",
    padding: "8px 12px",
    fontSize: "11px",
    lineHeight: "14px",
    fontWeight: 500,
    letterSpacing: ".05em",
    borderBottom: "1px solid var(--fmed-border)"
  },
  thLarge: {
    ...styles.thLarge,
    height: "40px",
    padding: "8px 12px",
    fontSize: "11px",
    lineHeight: "14px",
    fontWeight: 500,
    letterSpacing: ".05em",
    borderBottom: "1px solid var(--fmed-border)"
  },
  tr: {
    ...styles.tr,
    minHeight: "40px"
  },
  td: {
    ...styles.td,
    minHeight: "40px",
    padding: "8px 12px",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 400,
    overflowWrap: "anywhere",
    borderBottom: "1px solid rgba(0,0,0,.045)"
  },
  tdLarge: {
    ...styles.tdLarge,
    minHeight: "40px",
    padding: "8px 12px",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 400,
    overflowWrap: "anywhere",
    borderBottom: "1px solid rgba(0,0,0,.045)"
  },
  tdCode: {
    ...styles.tdCode,
    minHeight: "40px",
    padding: "8px 12px",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 500,
    overflowWrap: "anywhere"
  },
  tdCodeLarge: {
    ...styles.tdCodeLarge,
    minHeight: "40px",
    padding: "8px 12px",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 500,
    overflowWrap: "anywhere"
  },
  modalCard: {
    ...styles.modalCard,
    borderRadius: "12px",
    padding: "24px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 12px 32px rgba(0,0,0,.14)"
  },
  modalSmallCard: {
    ...styles.modalSmallCard,
    borderRadius: "12px",
    padding: "24px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 12px 32px rgba(0,0,0,.14)"
  },
  modalTitle: {
    ...styles.modalTitle,
    fontSize: "22px",
    lineHeight: "28px",
    fontWeight: 500,
    letterSpacing: 0
  },
  closeBtn: {
    ...styles.closeBtn,
    minHeight: "40px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  editPanel: {
    ...styles.editPanel,
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)"
  },
  editGrid: {
    ...styles.editGrid,
    gap: "16px"
  },
  editField: {
    ...styles.editField,
    gap: "8px"
  },
  assetActionsPanel: {
    ...styles.assetActionsPanel,
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)"
  },
  assetActionsGroupBlock: {
    ...styles.assetActionsGroupBlock,
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "none"
  },
  assetActionsGroupTitle: {
    ...styles.assetActionsGroupTitle,
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  assetHistoryCollapsible: {
    ...styles.assetHistoryCollapsible,
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)"
  },
  assetPanel: {
    ...styles.assetPanel,
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)"
  },
  sectionTitle: {
    ...styles.sectionTitle,
    fontSize: "18px",
    lineHeight: "24px",
    fontWeight: 500,
    letterSpacing: 0
  },
  detailItem: {
    ...styles.detailItem,
    padding: "12px",
    borderRadius: "12px"
  },
  detailLabel: {
    ...styles.detailLabel,
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  detailValue: {
    ...styles.detailValue,
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 400
  },
  recommendationPanel: {
    ...styles.recommendationPanel,
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)"
  },
  recommendationBox: {
    ...styles.recommendationBox,
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "none"
  },
  exportAccordionItem: {
    ...styles.exportAccordionItem,
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)",
    overflow: "hidden"
  },
  exportAccordionHeader: {
    ...styles.exportAccordionHeader,
    minHeight: "56px",
    padding: "12px 16px",
    borderRadius: "12px"
  },
  exportAccordionIcon: {
    ...styles.exportAccordionIcon,
    width: "32px",
    height: "32px",
    minWidth: "32px",
    borderRadius: "12px",
    fontSize: "16px"
  },
  exportAccordionTitle: {
    ...styles.exportAccordionTitle,
    fontSize: "14px",
    lineHeight: "18px",
    fontWeight: 500
  },
  exportAccordionSubtitle: {
    ...styles.exportAccordionSubtitle,
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 400
  },
  exportAccordionChevron: {
    ...styles.exportAccordionChevron,
    minWidth: "72px",
    width: "auto",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: ".05em",
    textAlign: "right"
  },
  dictionaryBox: {
    ...styles.dictionaryBox,
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)"
  },
  smartSectionCard: {
    ...styles.smartSectionCard,
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)"
  },
  smartSectionHeader: {
    ...styles.smartSectionHeader,
    minHeight: "48px",
    padding: "12px 16px"
  },
  smartSectionTitle: {
    ...styles.smartSectionTitle,
    fontSize: "15px",
    lineHeight: "20px",
    fontWeight: 500
  },
  smartSectionSubtitle: {
    ...styles.smartSectionSubtitle,
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 400
  },
  smartSectionAction: {
    ...styles.smartSectionAction,
    minHeight: "32px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 500
  },
  contoEconomicoBox: {
    ...styles.contoEconomicoBox,
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "0 4px 14px rgba(0,0,0,.05)"
  },
  contoEconomicoCard: {
    ...styles.contoEconomicoCard,
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,.08)",
    boxShadow: "none"
  },
  contoEconomicoLabel: {
    ...styles.contoEconomicoLabel,
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  contoEconomicoValue: {
    ...styles.contoEconomicoValue,
    fontSize: "24px",
    lineHeight: "28px",
    fontWeight: 500
  }
});

/* === FMED UI/UX SAFE V2 - visual-only, no logic changes === */
Object.assign(styles, {
  themeLightVars: {
    ...(styles.themeLightVars || {}),
    "--fmed-bg": "#F5F7FA",
    "--fmed-main-bg": "#F5F7FA",
    "--fmed-surface": "#FFFFFF",
    "--fmed-surface-solid": "#FFFFFF",
    "--fmed-surface-soft": "#F8FAFC",
    "--fmed-text": "#142033",
    "--fmed-muted": "#667085",
    "--fmed-border": "rgba(20,32,51,.10)",
    "--fmed-card-gradient": "#FFFFFF",
    "--fmed-soft-gradient": "#F8FAFC"
  },
  themeDarkVars: {
    ...(styles.themeDarkVars || {}),
    "--fmed-bg": "#071521",
    "--fmed-main-bg": "linear-gradient(180deg, #071521 0%, #091C2B 58%, #071521 100%)",
    "--fmed-surface": "rgba(13,34,52,.98)",
    "--fmed-surface-solid": "#0D2234",
    "--fmed-surface-soft": "#12314A",
    "--fmed-text": "#F4F8F7",
    "--fmed-muted": "#B7C8D8",
    "--fmed-border": "rgba(89,165,216,.24)",
    "--fmed-card-gradient": "linear-gradient(135deg, rgba(13,34,52,.98), rgba(18,49,74,.94))",
    "--fmed-soft-gradient": "linear-gradient(135deg, rgba(13,34,52,.96), rgba(18,49,74,.90))"
  },
  app: {
    ...(styles.app || {}),
    fontFamily: "'Futura', 'Futura PT', 'Jost', 'Century Gothic', sans-serif",
    letterSpacing: 0,
    background: "var(--fmed-bg)",
    color: "var(--fmed-text)"
  },
  main: {
    ...(styles.main || {}),
    padding: "16px 24px",
    gap: "16px",
    background: "var(--fmed-main-bg)"
  },
  sidebar: {
    ...(styles.sidebar || {}),
    width: "188px",
    minWidth: "188px",
    padding: "16px 6px",
    background: "#163A53",
    borderRight: "1px solid rgba(255,255,255,.10)",
    boxShadow: "2px 0 12px rgba(15,23,42,.10)"
  },
  sidebarBrand: {
    ...(styles.sidebarBrand || {}),
    minHeight: "104px",
    height: "104px",
    borderRadius: "12px",
    marginBottom: "12px",
    border: "1px solid rgba(255,255,255,.14)",
    boxShadow: "none"
  },
  sidebarLogoNew: {
    ...(styles.sidebarLogoNew || {}),
    maxWidth: "112px",
    maxHeight: "82px",
    objectFit: "contain"
  },
  sidebarOnlyTitle: {
    ...(styles.sidebarOnlyTitle || {}),
    fontSize: "20px",
    lineHeight: "22px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  sidebarOnlySub: {
    ...(styles.sidebarOnlySub || {}),
    fontSize: "9px",
    lineHeight: "13px",
    fontWeight: 400,
    letterSpacing: ".16em"
  },
  sidebarDivider: {
    ...(styles.sidebarDivider || {}),
    margin: "14px 0",
    opacity: .35
  },
  sidebarNav: {
    ...(styles.sidebarNav || {}),
    gap: "4px",
    marginTop: "10px",
    scrollbarWidth: "thin"
  },
  menuBtn: {
    ...(styles.menuBtn || {}),
    minHeight: "39px",
    height: "39px",
    borderRadius: "12px",
    padding: "0 10px",
    gap: "8px",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em",
    boxShadow: "none",
    transition: "background .18s ease, color .18s ease, transform .18s ease",
    whiteSpace: "normal"
  },
  menuIconWrap: {
    ...(styles.menuIconWrap || {}),
    width: "28px",
    minWidth: "28px"
  },
  menuLabel: {
    ...(styles.menuLabel || {}),
    fontWeight: 500,
    whiteSpace: "normal",
    overflowWrap: "anywhere"
  },
  sidebarBottomPanel: {
    ...(styles.sidebarBottomPanel || {}),
    gap: "8px"
  },
  sidebarUserCard: {
    ...(styles.sidebarUserCard || {}),
    minHeight: "44px",
    padding: "8px",
    borderRadius: "12px",
    boxShadow: "none"
  },
  sidebarRoleHint: {
    ...(styles.sidebarRoleHint || {}),
    minHeight: "34px",
    borderRadius: "12px",
    fontSize: "10px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  sidebarLogoutBtn: {
    ...(styles.sidebarLogoutBtn || {}),
    minHeight: "40px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  themeToggleBtn: {
    ...(styles.themeToggleBtn || {}),
    minHeight: "40px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  headerBanner: {
    ...(styles.headerBanner || {}),
    minHeight: "76px",
    marginBottom: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,.16)",
    boxShadow: "0 6px 16px rgba(15,23,42,.08)"
  },
  headerBannerContent: {
    ...(styles.headerBannerContent || {}),
    minHeight: "76px",
    padding: "14px 20px"
  },
  pageContext: {
    ...(styles.pageContext || {}),
    marginBottom: "4px",
    fontSize: "10px",
    lineHeight: "12px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  pageTitle: {
    ...(styles.pageTitle || {}),
    fontSize: "24px",
    lineHeight: "29px",
    fontWeight: 500,
    letterSpacing: 0
  },
  pageSub: {
    ...(styles.pageSub || {}),
    marginTop: "3px",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 400
  },
  headerBrandMain: {
    ...(styles.headerBrandMain || {}),
    fontSize: "22px",
    lineHeight: "26px",
    fontWeight: 500,
    letterSpacing: ".04em"
  },
  headerBrandSub: {
    ...(styles.headerBrandSub || {}),
    fontSize: "10px",
    lineHeight: "13px",
    fontWeight: 400,
    letterSpacing: ".05em"
  },
  card: {
    ...(styles.card || {}),
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "0 3px 10px rgba(15,23,42,.04)",
    background: "var(--fmed-surface-solid)"
  },
  emergentHero: {
    ...(styles.emergentHero || {}),
    minHeight: "78px",
    padding: "16px 20px",
    marginBottom: "14px",
    borderRadius: "12px",
    boxShadow: "0 6px 16px rgba(15,23,42,.08)"
  },
  emergentHeroLabel: {
    ...(styles.emergentHeroLabel || {}),
    fontSize: "10px",
    lineHeight: "13px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  emergentHeroNumber: {
    ...(styles.emergentHeroNumber || {}),
    fontSize: "34px",
    lineHeight: "36px",
    fontWeight: 500
  },
  emergentHeroSub: {
    ...(styles.emergentHeroSub || {}),
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 400
  },
  emergentQuickGrid: {
    ...(styles.emergentQuickGrid || {}),
    gap: "12px",
    marginBottom: "14px",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"
  },
  emergentQuickCard: {
    ...(styles.emergentQuickCard || {}),
    minHeight: "116px",
    padding: "16px",
    gap: "6px",
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "0 3px 10px rgba(15,23,42,.04)",
    background: "var(--fmed-surface-solid)"
  },
  emergentIconBox: {
    ...(styles.emergentIconBox || {}),
    width: "30px",
    height: "30px",
    minWidth: "30px",
    borderRadius: "10px",
    fontSize: "15px",
    boxShadow: "none"
  },
  emergentQuickLabel: {
    ...(styles.emergentQuickLabel || {}),
    fontSize: "10px",
    lineHeight: "13px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  emergentQuickValue: {
    ...(styles.emergentQuickValue || {}),
    fontSize: "28px",
    lineHeight: "31px",
    fontWeight: 500
  },
  emergentQuickSmall: {
    ...(styles.emergentQuickSmall || {}),
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 400
  },
  dashboardIntroCompact: {
    ...(styles.dashboardIntroCompact || {}),
    minHeight: "auto",
    padding: "16px"
  },
  dashboardIntroTitle: {
    ...(styles.dashboardIntroTitle || {}),
    fontSize: "18px",
    lineHeight: "23px",
    fontWeight: 500,
    letterSpacing: 0
  },
  dashboardIntroText: {
    ...(styles.dashboardIntroText || {}),
    fontSize: "12px",
    lineHeight: "18px",
    fontWeight: 400
  },
  dashboardIntroGrid: {
    ...(styles.dashboardIntroGrid || {}),
    gap: "8px"
  },
  dashboardIntroMiniBox: {
    ...(styles.dashboardIntroMiniBox || {}),
    minHeight: "38px",
    padding: "8px 10px",
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "none"
  },
  smartSectionCard: {
    ...(styles.smartSectionCard || {}),
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "0 3px 10px rgba(15,23,42,.04)",
    marginBottom: "8px",
    overflow: "hidden"
  },
  smartSectionHeader: {
    ...(styles.smartSectionHeader || {}),
    minHeight: "50px",
    padding: "10px 14px",
    borderRadius: "12px"
  },
  smartSectionTitle: {
    ...(styles.smartSectionTitle || {}),
    fontSize: "14px",
    lineHeight: "18px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  smartSectionSubtitle: {
    ...(styles.smartSectionSubtitle || {}),
    fontSize: "11px",
    lineHeight: "15px",
    fontWeight: 400,
    letterSpacing: ".05em"
  },
  smartSectionAction: {
    ...(styles.smartSectionAction || {}),
    minHeight: "32px",
    padding: "0 12px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  assetHeroPanel: {
    ...(styles.assetHeroPanel || {}),
    minHeight: "112px",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "0 3px 10px rgba(15,23,42,.04)"
  },
  assetFiltersPanel: {
    ...(styles.assetFiltersPanel || {}),
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "0 3px 10px rgba(15,23,42,.04)"
  },
  assetFiltersGrid: {
    ...(styles.assetFiltersGrid || {}),
    gap: "12px"
  },
  assetActionsBar: {
    ...(styles.assetActionsBar || {}),
    gap: "8px",
    marginTop: "12px"
  },
  assetKpiGrid: {
    ...(styles.assetKpiGrid || {}),
    gap: "12px"
  },
  assetKpiCard: {
    ...(styles.assetKpiCard || {}),
    minHeight: "92px",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "0 3px 10px rgba(15,23,42,.04)"
  },
  assetKpiLabel: {
    ...(styles.assetKpiLabel || {}),
    fontSize: "10px",
    lineHeight: "13px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  assetKpiValue: {
    ...(styles.assetKpiValue || {}),
    fontSize: "27px",
    lineHeight: "31px",
    fontWeight: 500
  },
  assetKpiHint: {
    ...(styles.assetKpiHint || {}),
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 400
  },
  primaryBtn: {
    ...(styles.primaryBtn || {}),
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    lineHeight: "17px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  secondaryBtn: {
    ...(styles.secondaryBtn || {}),
    minHeight: "44px",
    borderRadius: "12px",
    fontSize: "13px",
    lineHeight: "17px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  assetPrimaryAction: {
    ...(styles.assetPrimaryAction || {}),
    minHeight: "44px",
    borderRadius: "12px",
    padding: "10px 14px",
    fontSize: "13px",
    lineHeight: "17px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  assetSecondaryAction: {
    ...(styles.assetSecondaryAction || {}),
    minHeight: "44px",
    borderRadius: "12px",
    padding: "10px 14px",
    fontSize: "13px",
    lineHeight: "17px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  assetGhostAction: {
    ...(styles.assetGhostAction || {}),
    minHeight: "44px",
    borderRadius: "12px",
    padding: "10px 14px",
    fontSize: "13px",
    lineHeight: "17px",
    fontWeight: 500,
    letterSpacing: ".05em",
    whiteSpace: "normal",
    boxShadow: "none"
  },
  input: {
    ...(styles.input || {}),
    minHeight: "42px",
    borderRadius: "12px",
    padding: "10px 12px",
    border: "1px solid var(--fmed-border)",
    fontSize: "13px",
    fontWeight: 400,
    boxShadow: "none"
  },
  select: {
    ...(styles.select || {}),
    minHeight: "42px",
    borderRadius: "12px",
    padding: "10px 12px",
    border: "1px solid var(--fmed-border)",
    fontSize: "13px",
    fontWeight: 400,
    boxShadow: "none"
  },
  assetInputLarge: {
    ...(styles.assetInputLarge || {}),
    minHeight: "44px",
    borderRadius: "12px",
    padding: "10px 12px",
    fontSize: "13px",
    fontWeight: 400,
    boxShadow: "none"
  },
  assetSelectLarge: {
    ...(styles.assetSelectLarge || {}),
    minHeight: "44px",
    borderRadius: "12px",
    padding: "10px 12px",
    fontSize: "13px",
    fontWeight: 400,
    boxShadow: "none"
  },
  editInput: {
    ...(styles.editInput || {}),
    minHeight: "42px",
    borderRadius: "12px",
    padding: "10px 12px",
    fontSize: "13px",
    fontWeight: 400,
    boxShadow: "none"
  },
  editTextarea: {
    ...(styles.editTextarea || {}),
    minHeight: "86px",
    borderRadius: "12px",
    padding: "10px 12px",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 400,
    boxShadow: "none"
  },
  editLabel: {
    ...(styles.editLabel || {}),
    fontSize: "10px",
    lineHeight: "13px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  tableWrap: {
    ...(styles.tableWrap || {}),
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "none",
    overflow: "auto"
  },
  tableWrapCompact: {
    ...(styles.tableWrapCompact || {}),
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "none",
    overflow: "auto"
  },
  table: {
    ...(styles.table || {}),
    borderSpacing: 0,
    fontSize: "13px"
  },
  tableLarge: {
    ...(styles.tableLarge || {}),
    borderSpacing: 0,
    fontSize: "13px"
  },
  th: {
    ...(styles.th || {}),
    height: "40px",
    padding: "8px 12px",
    fontSize: "10px",
    lineHeight: "13px",
    fontWeight: 500,
    letterSpacing: ".05em",
    borderBottom: "1px solid var(--fmed-border)",
    whiteSpace: "normal"
  },
  thLarge: {
    ...(styles.thLarge || {}),
    height: "40px",
    padding: "8px 12px",
    fontSize: "10px",
    lineHeight: "13px",
    fontWeight: 500,
    letterSpacing: ".05em",
    borderBottom: "1px solid var(--fmed-border)",
    whiteSpace: "normal"
  },
  td: {
    ...(styles.td || {}),
    minHeight: "40px",
    padding: "8px 12px",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 400,
    overflowWrap: "anywhere",
    borderBottom: "1px solid rgba(20,32,51,.055)"
  },
  tdLarge: {
    ...(styles.tdLarge || {}),
    minHeight: "40px",
    padding: "8px 12px",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 400,
    overflowWrap: "anywhere",
    borderBottom: "1px solid rgba(20,32,51,.055)"
  },
  tdCode: {
    ...(styles.tdCode || {}),
    minHeight: "40px",
    padding: "8px 12px",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 500,
    overflowWrap: "anywhere"
  },
  tdCodeLarge: {
    ...(styles.tdCodeLarge || {}),
    minHeight: "40px",
    padding: "8px 12px",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 500,
    overflowWrap: "anywhere"
  },
  modalCard: {
    ...(styles.modalCard || {}),
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid rgba(20,32,51,.10)",
    boxShadow: "0 16px 44px rgba(15,23,42,.16)"
  },
  modalSmallCard: {
    ...(styles.modalSmallCard || {}),
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid rgba(20,32,51,.10)",
    boxShadow: "0 16px 44px rgba(15,23,42,.16)"
  },
  modalTitle: {
    ...(styles.modalTitle || {}),
    fontSize: "20px",
    lineHeight: "25px",
    fontWeight: 500,
    letterSpacing: 0
  },
  closeBtn: {
    ...(styles.closeBtn || {}),
    minHeight: "40px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: ".05em",
    boxShadow: "none"
  },
  assetHeroCard: {
    ...(styles.assetHeroCard || {}),
    padding: "18px",
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "0 3px 10px rgba(15,23,42,.04)"
  },
  assetPanel: {
    ...(styles.assetPanel || {}),
    padding: "18px",
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "0 3px 10px rgba(15,23,42,.04)"
  },
  assetActionsPanel: {
    ...(styles.assetActionsPanel || {}),
    padding: "18px",
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "0 3px 10px rgba(15,23,42,.04)"
  },
  recommendationPanel: {
    ...(styles.recommendationPanel || {}),
    padding: "18px",
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "0 3px 10px rgba(15,23,42,.04)"
  },
  exportAccordionItem: {
    ...(styles.exportAccordionItem || {}),
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "0 3px 10px rgba(15,23,42,.04)",
    overflow: "hidden"
  },
  exportAccordionHeader: {
    ...(styles.exportAccordionHeader || {}),
    minHeight: "50px",
    padding: "10px 14px",
    borderRadius: "12px"
  },
  exportAccordionIcon: {
    ...(styles.exportAccordionIcon || {}),
    width: "30px",
    height: "30px",
    minWidth: "30px",
    borderRadius: "10px",
    fontSize: "15px",
    boxShadow: "none"
  },
  exportAccordionTitle: {
    ...(styles.exportAccordionTitle || {}),
    fontSize: "14px",
    lineHeight: "18px",
    fontWeight: 500
  },
  exportAccordionSubtitle: {
    ...(styles.exportAccordionSubtitle || {}),
    fontSize: "11px",
    lineHeight: "15px",
    fontWeight: 400
  },
  exportAccordionChevron: {
    ...(styles.exportAccordionChevron || {}),
    minWidth: "76px",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: ".05em",
    textAlign: "right"
  },
  contoEconomicoBox: {
    ...(styles.contoEconomicoBox || {}),
    padding: "18px",
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "0 3px 10px rgba(15,23,42,.04)"
  },
  contoEconomicoCard: {
    ...(styles.contoEconomicoCard || {}),
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(20,32,51,.08)",
    boxShadow: "none"
  }
});

/* === FMED SIDEBAR FINAL FIX - logo grande + area utente compatta === */
Object.assign(styles, {
  sidebar: {
    ...(styles.sidebar || {}),
    width: "218px",
    minWidth: "218px",
    padding: "14px 8px 12px 8px",
    background: "linear-gradient(180deg, #123A54 0%, #0B2E49 100%)",
    borderRight: "1px solid rgba(255,255,255,.12)",
    boxShadow: "6px 0 22px rgba(15,23,42,.16)"
  },
  sidebarBrand: {
    ...(styles.sidebarBrand || {}),
    minHeight: "146px",
    height: "146px",
    padding: "6px",
    borderRadius: "12px",
    marginBottom: "10px",
    background: "rgba(255,255,255,.98)",
    border: "1px solid rgba(255,255,255,.55)",
    boxShadow: "0 10px 24px rgba(0,0,0,.16)",
    overflow: "hidden"
  },
  sidebarLogoNew: {
    ...(styles.sidebarLogoNew || {}),
    display: "block",
    width: "100%",
    height: "100%",
    maxWidth: "none",
    maxHeight: "none",
    objectFit: "contain",
    padding: "0",
    borderRadius: "10px",
    background: "#FFFFFF",
    filter: "contrast(1.08) saturate(1.08)"
  },
  sidebarOnlyTitle: {
    ...(styles.sidebarOnlyTitle || {}),
    margin: "0 0 2px 0",
    fontSize: "25px",
    lineHeight: "28px",
    fontWeight: 500,
    letterSpacing: ".05em",
    color: "#FFFFFF"
  },
  sidebarOnlySub: {
    ...(styles.sidebarOnlySub || {}),
    margin: "0 0 12px 0",
    fontSize: "9px",
    lineHeight: "13px",
    fontWeight: 500,
    letterSpacing: ".14em",
    color: "rgba(255,255,255,.66)"
  },
  sidebarDivider: {
    ...(styles.sidebarDivider || {}),
    margin: "10px 0",
    opacity: .28
  },
  sidebarNav: {
    ...(styles.sidebarNav || {}),
    gap: "6px",
    marginTop: "10px",
    paddingBottom: "8px"
  },
  menuBtn: {
    ...(styles.menuBtn || {}),
    minHeight: "42px",
    height: "42px",
    borderRadius: "12px",
    padding: "0 10px",
    gap: "9px",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: ".05em"
  },
  sidebarBottomPanel: {
    ...(styles.sidebarBottomPanel || {}),
    gap: "7px",
    paddingTop: "8px",
    flexShrink: 0
  },
  sidebarUserCard: {
    ...(styles.sidebarUserCard || {}),
    minHeight: "48px",
    padding: "7px 8px",
    borderRadius: "12px",
    boxShadow: "none",
    border: "1px solid rgba(255,255,255,.15)",
    background: "rgba(255,255,255,.08)"
  },
  sidebarUserAvatar: {
    ...(styles.sidebarUserAvatar || {}),
    width: "34px",
    minWidth: "34px",
    height: "34px",
    borderRadius: "12px",
    fontSize: "14px"
  },
  sidebarUserName: {
    ...(styles.sidebarUserName || {}),
    fontSize: "12px",
    lineHeight: "15px",
    fontWeight: 500
  },
  sidebarUserRole: {
    ...(styles.sidebarUserRole || {}),
    fontSize: "9px",
    lineHeight: "12px",
    letterSpacing: ".06em",
    opacity: .72
  },
  sidebarRoleHint: {
    ...(styles.sidebarRoleHint || {}),
    minHeight: "28px",
    height: "28px",
    padding: "0 8px",
    borderRadius: "10px",
    fontSize: "9px",
    lineHeight: "12px",
    fontWeight: 500,
    letterSpacing: ".06em",
    background: "rgba(255,255,255,.07)",
    border: "1px solid rgba(255,255,255,.13)"
  },
  sidebarActionRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "7px",
    width: "100%"
  },
  sidebarThemeSmallBtn: {
    minHeight: "34px",
    height: "34px",
    padding: "0 8px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,.15)",
    background: "rgba(255,255,255,.07)",
    color: "#FFFFFF",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontSize: "10px",
    lineHeight: "12px",
    fontWeight: 500,
    letterSpacing: ".04em",
    textTransform: "uppercase",
    boxShadow: "none"
  },
  sidebarLogoutSmallBtn: {
    minHeight: "34px",
    height: "34px",
    padding: "0 8px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,.15)",
    background: "rgba(255,255,255,.07)",
    color: "#FFFFFF",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontSize: "10px",
    lineHeight: "12px",
    fontWeight: 500,
    letterSpacing: ".04em",
    textTransform: "uppercase",
    boxShadow: "none"
  }
});

/* === F.M.E.D. 3.0 FASE 11 - LIGHT PREMIUM CREMA
   Solo UI/UX: palette Light Mode, pulsanti, card, dashboard e tabelle.
   Non modifica logiche, API, backend, SharePoint, OCR, QR o scadenze.
*/
Object.assign(loginStyles, {
  page: {
    ...(loginStyles.page || {}),
    background: "radial-gradient(circle at 18% 12%, rgba(141,170,145,.20), transparent 30%), linear-gradient(135deg, #F5F1E8 0%, #FBF8F1 48%, #EFE7DA 100%)"
  },
  card: {
    ...(loginStyles.card || {}),
    background: "rgba(252,250,245,.98)",
    border: "1px solid #E4DDD0",
    boxShadow: "0 26px 76px rgba(31, 78, 109, 0.15)"
  },
  kicker: {
    ...(loginStyles.kicker || {}),
    color: "#1F4E6D"
  },
  title: {
    ...(loginStyles.title || {}),
    color: "#1F2933"
  },
  subtitle: {
    ...(loginStyles.subtitle || {}),
    color: "#6B7280"
  },
  label: {
    ...(loginStyles.label || {}),
    color: "#647F69"
  },
  input: {
    ...(loginStyles.input || {}),
    background: "#FCFAF5",
    border: "1px solid #D9D1C3",
    color: "#1F2933"
  },
  button: {
    ...(loginStyles.button || {}),
    background: "linear-gradient(135deg, #1F4E6D 0%, #295E80 100%)",
    boxShadow: "0 14px 34px rgba(31,78,109,.22)"
  }
});
Object.assign(styles, {
  themeLightVars: {
    ...(styles.themeLightVars || {}),
    "--fmed-bg": "#F5F1E8",
    "--fmed-main-bg": "linear-gradient(180deg, #F5F1E8 0%, #FBF8F1 52%, #EFE7DA 100%)",
    "--fmed-surface": "rgba(252,250,245,.98)",
    "--fmed-surface-solid": "#FCFAF5",
    "--fmed-surface-soft": "#F7F2E8",
    "--fmed-text": "#1F2933",
    "--fmed-muted": "#6B7280",
    "--fmed-border": "#E4DDD0",
    "--fmed-accent": "#8DAA91",
    "--fmed-accent-2": "#1F4E6D",
    "--fmed-sand": "#F5F1E8",
    "--fmed-sage": "#8DAA91",
    "--fmed-sage-dark": "#647F69",
    "--fmed-primary": "#1F4E6D",
    "--fmed-primary-2": "#295E80",
    "--fmed-highlight": "#8DAA91",
    "--fmed-btn": "linear-gradient(135deg,#1F4E6D,#295E80)",
    "--fmed-btn-shadow": "0 14px 32px rgba(31,78,109,.18)",
    "--fmed-sidebar-bg": "linear-gradient(180deg, #14384F 0%, #1F4E6D 58%, #102F45 100%)",
    "--fmed-header-bg": "linear-gradient(135deg, #1F4E6D 0%, #295E80 100%)",
    "--fmed-header-inner": "linear-gradient(135deg, rgba(31,78,109,.98), rgba(41,94,128,.92))",
    "--fmed-card-gradient": "linear-gradient(180deg, #FCFAF5 0%, #F7F2E8 100%)",
    "--fmed-soft-gradient": "linear-gradient(180deg, #FCFAF5 0%, #F8F4EC 100%)",
    "--fmed-alert-red-bg": "linear-gradient(135deg, #FDEEEE 0%, #FCFAF5 100%)",
    "--fmed-alert-orange-bg": "linear-gradient(135deg, #FFF3E0 0%, #FCFAF5 100%)",
    "--fmed-alert-gold-bg": "linear-gradient(135deg, #F4F0DA 0%, #FCFAF5 100%)",
    "--fmed-danger-bg": "#FDEEEE",
    "--fmed-danger-text": "#B94242",
    "--fmed-danger-border": "#E8BDB8",
    "--fmed-soft-btn-bg": "#F8F4EC",
    "--fmed-soft-btn-text": "#1F4E6D"
  },
  app: {
    ...(styles.app || {}),
    background: "var(--fmed-bg)"
  },
  main: {
    ...(styles.main || {}),
    backgroundColor: "#F5F1E8",
    backgroundImage: "var(--fmed-main-bg)"
  },
  sidebar: {
    ...(styles.sidebar || {}),
    backgroundColor: "#1F4E6D",
    backgroundImage: "var(--fmed-sidebar-bg)",
    boxShadow: "8px 0 30px rgba(31,78,109,.18)"
  },
  sidebarOnlyTitle: {
    ...(styles.sidebarOnlyTitle || {}),
    color: "#FFFDF8",
    letterSpacing: ".06em"
  },
  sidebarDivider: {
    ...(styles.sidebarDivider || {}),
    borderColor: "rgba(255,255,255,.16)"
  },
  menuBtn: {
    ...(styles.menuBtn || {}),
    color: "rgba(255,255,255,.78)",
    background: "transparent",
    border: "1px solid transparent"
  },
  menuBtnActive: {
    ...(styles.menuBtnActive || {}),
    background: "linear-gradient(135deg, rgba(255,253,248,.20), rgba(141,170,145,.24))",
    border: "1px solid rgba(255,255,255,.24)",
    color: "#FFFFFF",
    boxShadow: "0 12px 26px rgba(0,0,0,.16)"
  },
  headerBanner: {
    ...(styles.headerBanner || {}),
    minHeight: "96px",
    borderRadius: "24px",
    border: "1px solid rgba(228,221,208,.34)",
    background: "var(--fmed-header-bg)",
    boxShadow: "0 18px 42px rgba(31,78,109,.16)"
  },
  headerBannerContent: {
    ...(styles.headerBannerContent || {}),
    minHeight: "96px",
    backgroundImage: "var(--fmed-header-inner)"
  },
  pageContext: {
    ...(styles.pageContext || {}),
    color: "rgba(255,255,255,.84)"
  },
  pageTitle: {
    ...(styles.pageTitle || {}),
    color: "#FFFFFF"
  },
  pageSub: {
    ...(styles.pageSub || {}),
    color: "rgba(255,255,255,.78)"
  },
  dashboardHero: {
    ...(styles.dashboardHero || {}),
    background: "linear-gradient(180deg, #FCFAF5 0%, #F7F2E8 100%)",
    border: "1px solid #E4DDD0",
    boxShadow: "0 18px 42px rgba(31,78,109,.10)"
  },
  dashboardEyebrow: {
    ...(styles.dashboardEyebrow || {}),
    color: "#647F69"
  },
  dashboardHeroRight: {
    ...(styles.dashboardHeroRight || {}),
    background: "linear-gradient(135deg, #8DAA91, #647F69)",
    boxShadow: "0 14px 30px rgba(100,127,105,.22)"
  },
  kpi: {
    ...(styles.kpi || {}),
    background: "linear-gradient(180deg, #FCFAF5 0%, #F8F4EC 100%)",
    border: "1px solid #E4DDD0",
    boxShadow: "0 14px 30px rgba(31,78,109,.08)"
  },
  kpiTitle: {
    ...(styles.kpiTitle || {}),
    color: "#6B7280"
  },
  kpiValue: {
    ...(styles.kpiValue || {}),
    color: "#1F2933"
  },
  primaryBtn: {
    ...(styles.primaryBtn || {}),
    background: "linear-gradient(135deg,#1F4E6D,#295E80)",
    border: "1px solid rgba(31,78,109,.12)",
    color: "#FFFFFF",
    borderRadius: "14px",
    boxShadow: "0 12px 26px rgba(31,78,109,.18)"
  },
  secondaryBtn: {
    ...(styles.secondaryBtn || {}),
    background: "#F8F4EC",
    border: "1px solid #D9D1C3",
    color: "#1F4E6D",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(31,78,109,.06)"
  },
  saveBtn: {
    ...(styles.saveBtn || {}),
    background: "linear-gradient(135deg,#647F69,#8DAA91)",
    border: "1px solid rgba(100,127,105,.18)",
    color: "#FFFFFF",
    borderRadius: "14px",
    boxShadow: "0 12px 26px rgba(100,127,105,.20)"
  },
  cancelBtn: {
    ...(styles.cancelBtn || {}),
    background: "#F8F4EC",
    border: "1px solid #D9D1C3",
    color: "#6B7280",
    borderRadius: "14px"
  },
  docBtn: {
    ...(styles.docBtn || {}),
    background: "#E8F4EE",
    border: "1px solid #C9E0D1",
    color: "#2F6F54",
    borderRadius: "12px"
  },
  docBtnDisabled: {
    ...(styles.docBtnDisabled || {}),
    background: "#F8F4EC",
    border: "1px solid #E4DDD0",
    color: "#8A8174"
  },
  smartHeroMain: {
    ...(styles.smartHeroMain || {}),
    background: "linear-gradient(135deg,#1F4E6D,#295E80)",
    border: "1px solid rgba(228,221,208,.36)",
    boxShadow: "0 18px 42px rgba(31,78,109,.16)"
  },
  smartHeroStatus: {
    ...(styles.smartHeroStatus || {}),
    background: "linear-gradient(180deg,#FCFAF5,#F8F4EC)",
    border: "1px solid #E4DDD0",
    boxShadow: "0 14px 32px rgba(31,78,109,.08)"
  },
  smartQuickCard: {
    ...(styles.smartQuickCard || {}),
    background: "linear-gradient(180deg,#FCFAF5,#F8F4EC)",
    border: "1px solid #E4DDD0",
    boxShadow: "0 14px 30px rgba(31,78,109,.08)"
  },
  smartSectionCard: {
    ...(styles.smartSectionCard || {}),
    background: "linear-gradient(180deg,#FCFAF5,#F8F4EC)",
    border: "1px solid #E4DDD0",
    boxShadow: "0 14px 34px rgba(31,78,109,.08)"
  },
  filterPanel: {
    ...(styles.filterPanel || {}),
    background: "linear-gradient(180deg,#FCFAF5,#F8F4EC)",
    border: "1px solid #E4DDD0"
  },
  input: {
    ...(styles.input || {}),
    background: "#FCFAF5",
    border: "1px solid #D9D1C3",
    color: "#1F2933"
  },
  select: {
    ...(styles.select || {}),
    background: "#FCFAF5",
    border: "1px solid #D9D1C3",
    color: "#1F2933"
  },
  editInput: {
    ...(styles.editInput || {}),
    background: "#FCFAF5",
    border: "1px solid #D9D1C3",
    color: "#1F2933"
  },
  editTextarea: {
    ...(styles.editTextarea || {}),
    background: "#FCFAF5",
    border: "1px solid #D9D1C3",
    color: "#1F2933"
  }
});

// ========================================================
// FMED FASE 13 - UI PREMIUM FACILITY MANAGEMENT
// Solo presentazione: non modifica logiche, API, backend, OCR, QR o SharePoint.
// ========================================================
Object.assign(styles, {
  themeLightVars: {
    ...(styles.themeLightVars || {}),
    "--fmed-bg": "#F6F0E6",
    "--fmed-surface": "rgba(255,251,243,.98)",
    "--fmed-surface-solid": "#FFFBF3",
    "--fmed-surface-soft": "#F9F1E4",
    "--fmed-text": "#0B2340",
    "--fmed-muted": "#64748B",
    "--fmed-border": "#E6D9C5",
    "--fmed-primary": "#073657",
    "--fmed-primary-2": "#0F5C87",
    "--fmed-accent": "#C99B3D",
    "--fmed-sidebar-bg": "linear-gradient(180deg,#062B45 0%,#083B5E 48%,#031D31 100%)",
    "--fmed-main-bg": "radial-gradient(circle at top left, rgba(255,247,232,.95), transparent 38%), linear-gradient(180deg,#F8F2E7 0%,#FBF6EE 100%)",
    "--fmed-card-gradient": "linear-gradient(180deg, rgba(255,252,246,.98) 0%, rgba(250,243,232,.96) 100%)",
    "--fmed-btn": "linear-gradient(135deg,#073657,#0F5C87)"
  },
  sidebar: {
    ...(styles.sidebar || {}),
    width: "260px",
    minWidth: "260px",
    padding: "18px 14px",
    backgroundImage: "linear-gradient(180deg,#062B45 0%,#083B5E 48%,#031D31 100%)",
    boxShadow: "10px 0 34px rgba(6,43,69,.24)"
  },
  sidebarOnlyTitle: {
    ...(styles.sidebarOnlyTitle || {}),
    color: "#F6D58A",
    fontSize: "28px",
    lineHeight: "32px",
    letterSpacing: "0.05em",
    fontWeight: 700,
    textShadow: "0 3px 14px rgba(0,0,0,.22)"
  },
  sidebarOnlySub: {
    ...(styles.sidebarOnlySub || {}),
    display: "block",
    marginTop: "6px",
    marginBottom: "18px",
    color: "#FFF4D9",
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "0.20em",
    fontWeight: 600
  },
  menuBtn: {
    ...(styles.menuBtn || {}),
    minHeight: "52px",
    borderRadius: "12px",
    padding: "12px 14px",
    color: "rgba(255,255,255,.90)",
    fontSize: "16px",
    fontWeight: 600,
    background: "transparent",
    border: "1px solid transparent"
  },
  menuBtnActive: {
    ...(styles.menuBtnActive || {}),
    background: "linear-gradient(180deg,#FFF8EB,#F4E5C9)",
    color: "#073657",
    boxShadow: "0 10px 24px rgba(0,0,0,.16)",
    border: "1px solid rgba(246,213,138,.45)"
  },
  menuIconWrap: {
    ...(styles.menuIconWrap || {}),
    background: "transparent",
    width: "34px",
    minWidth: "34px",
    height: "34px"
  },
  menuLabel: {
    ...(styles.menuLabel || {}),
    fontSize: "16px",
    letterSpacing: "0.01em"
  },
  main: {
    ...(styles.main || {}),
    background: "var(--fmed-main-bg)",
    padding: "18px 24px 22px"
  },
  headerBanner: {
    ...(styles.headerBanner || {}),
    minHeight: "54px",
    marginBottom: "14px",
    background: "transparent",
    border: "0",
    boxShadow: "none"
  },
  headerBannerContent: {
    ...(styles.headerBannerContent || {}),
    minHeight: "54px",
    padding: "0 0 0 0",
    background: "transparent",
    border: "0",
    boxShadow: "none"
  },
  pageContext: {
    ...(styles.pageContext || {}),
    color: "#0B2340",
    fontWeight: 700,
    fontSize: "20px",
    letterSpacing: 0,
    textTransform: "none"
  },
  pageTitle: {
    ...(styles.pageTitle || {}),
    display: "none"
  },
  pageSub: {
    ...(styles.pageSub || {}),
    color: "#5D6B7A",
    marginTop: "4px"
  },
  headerBrandText: {
    ...(styles.headerBrandText || {}),
    display: "none"
  },
  fmedPremiumHero: {
    display: "grid",
    gridTemplateColumns: "170px minmax(0,1fr) 360px",
    gap: "30px",
    alignItems: "center",
    borderRadius: "18px",
    padding: "26px 34px",
    background: "linear-gradient(135deg,#FFFDF7 0%,#FBF3E5 100%)",
    border: "1px solid #E8D8BE",
    boxShadow: "0 18px 42px rgba(66,45,18,.10)",
    marginBottom: "18px"
  },
  fmedPremiumHeroMark: {
    width: "140px",
    height: "140px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#B8862B",
    fontSize: "122px",
    lineHeight: 1,
    fontWeight: 900,
    transform: "rotate(180deg)",
    textShadow: "0 8px 18px rgba(184,134,43,.16)"
  },
  fmedPremiumHeroMain: {
    minWidth: 0
  },
  fmedPremiumHeroTitle: {
    color: "#073657",
    fontSize: "62px",
    lineHeight: 1,
    fontWeight: 800,
    letterSpacing: "0.055em"
  },
  fmedPremiumHeroSubTitle: {
    color: "#B8862B",
    fontSize: "24px",
    lineHeight: 1.2,
    fontWeight: 700,
    letterSpacing: "0.28em",
    marginTop: "12px"
  },
  fmedPremiumHeroText: {
    color: "#0B2340",
    fontSize: "17px",
    lineHeight: 1.55,
    maxWidth: "680px",
    margin: "20px 0 0"
  },
  fmedPremiumTrustColumn: {
    borderLeft: "1px solid #E6D9C5",
    paddingLeft: "28px",
    display: "grid",
    gap: "18px"
  },
  fmedPremiumTrustItem: {
    display: "grid",
    gridTemplateColumns: "54px 1fr",
    columnGap: "14px",
    alignItems: "center",
    color: "#0B2340"
  },
  fmedPremiumKpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: "14px",
    marginBottom: "18px"
  },
  fmedPremiumKpiCard: {
    textAlign: "left",
    minHeight: "116px",
    padding: "18px",
    borderRadius: "12px",
    border: "1px solid #E8D8BE",
    borderBottom: "3px solid #165A52",
    background: "linear-gradient(180deg,#FFFDF8,#FBF4EA)",
    boxShadow: "0 14px 30px rgba(66,45,18,.08)",
    cursor: "pointer"
  },
  fmedPremiumKpiIcon: {
    width: "58px",
    height: "58px",
    borderRadius: "12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    fontWeight: 900,
    float: "left",
    marginRight: "14px"
  },
  fmedPremiumKpiLabel: {
    display: "block",
    color: "#0B2340",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: 800,
    marginTop: "4px"
  },
  fmedPremiumKpiValue: {
    display: "block",
    color: "#0B2340",
    fontSize: "32px",
    lineHeight: 1.1,
    fontWeight: 800,
    marginTop: "6px"
  },
  fmedPremiumKpiSmall: {
    display: "block",
    clear: "both",
    color: "#56677A",
    fontSize: "13px",
    marginTop: "12px"
  },
  fmedPremiumActionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: "14px",
    marginBottom: "22px"
  },
  fmedPremiumActionBtn: {
    minHeight: "72px",
    padding: "16px 18px",
    borderRadius: "12px",
    color: "#fff",
    border: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    boxShadow: "0 14px 30px rgba(6,43,69,.18)",
    cursor: "pointer",
    fontSize: "14px"
  },
  fmedPremiumPanelGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1.2fr",
    gap: "16px"
  },
  fmedPremiumPanel: {
    minHeight: "260px",
    borderRadius: "14px",
    padding: "20px",
    background: "linear-gradient(180deg,#FFFDF8,#FBF4EA)",
    border: "1px solid #E8D8BE",
    boxShadow: "0 14px 34px rgba(66,45,18,.08)",
    color: "#0B2340"
  },
  fmedPremiumPanelTitle: {
    fontSize: "15px",
    fontWeight: 800,
    marginBottom: "16px"
  },
  fmedPremiumDonut: {
    width: "148px",
    height: "148px",
    borderRadius: "50%",
    background: "conic-gradient(#165A52 0 42%, #F3B51B 42% 68%, #6B4BB5 68% 82%, #58A867 82% 100%)",
    color: "#0B2340",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: "12px auto 18px",
    boxShadow: "inset 0 0 0 42px #FFFDF8"
  },
  fmedPremiumLegend: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#0B2340",
    fontSize: "13px",
    margin: "8px 0"
  },
  fmedPremiumBars: {
    height: "190px",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    alignItems: "end",
    gap: "16px",
    paddingTop: "22px"
  },
  fmedPremiumRecentRow: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "42px 1fr auto",
    alignItems: "center",
    gap: "12px",
    border: "0",
    background: "transparent",
    color: "#0B2340",
    padding: "10px 0",
    textAlign: "left",
    cursor: "pointer"
  }
});

// ========================================================
// FMED FASE 14 - PROPORZIONI UI + DARK MODE PETROLIO
// Solo presentazione: non modifica logiche, API, backend, OCR, QR, SharePoint o scadenze.
// ========================================================
Object.assign(styles, {
  themeLightVars: {
    ...(styles.themeLightVars || {}),
    "--fmed-bg": "#F6F0E6",
    "--fmed-main-bg": "radial-gradient(circle at top left, rgba(255,248,235,.94), transparent 34%), linear-gradient(180deg,#F6F0E6 0%,#FBF6ED 52%,#EFE6D8 100%)",
    "--fmed-surface": "rgba(255,251,243,.98)",
    "--fmed-surface-solid": "#FFFBF3",
    "--fmed-surface-soft": "#F8F0E2",
    "--fmed-text": "#092A43",
    "--fmed-muted": "#5F6F7F",
    "--fmed-border": "#E4D3B7",
    "--fmed-primary": "#073657",
    "--fmed-primary-2": "#0F5C87",
    "--fmed-accent": "#C8942F",
    "--fmed-card-gradient": "linear-gradient(180deg,#FFFDF8 0%,#FBF4EA 100%)",
    "--fmed-panel-gradient": "linear-gradient(180deg,#FFFDF8 0%,#FBF4EA 100%)",
    "--fmed-hero-bg": "linear-gradient(135deg,#FFFDF8 0%,#FBF3E5 100%)",
    "--fmed-hero-border": "#E8D8BE",
    "--fmed-icon-bg": "rgba(7,54,87,.08)",
    "--fmed-icon-text": "#073657",
    "--fmed-trust-border": "#E4D3B7"
  },
  themeDarkVars: {
    ...(styles.themeDarkVars || {}),
    "--fmed-bg": "#052438",
    "--fmed-main-bg": "radial-gradient(circle at top left, rgba(19,92,131,.30), transparent 32%), linear-gradient(180deg,#052438 0%,#073657 56%,#041A2A 100%)",
    "--fmed-surface": "rgba(7,54,87,.96)",
    "--fmed-surface-solid": "#073657",
    "--fmed-surface-soft": "#0A466D",
    "--fmed-text": "#FFFFFF",
    "--fmed-muted": "#D8EEFF",
    "--fmed-border": "rgba(177,215,238,.24)",
    "--fmed-primary": "#0B5F8A",
    "--fmed-primary-2": "#165A52",
    "--fmed-accent": "#F2B84B",
    "--fmed-sidebar-bg": "linear-gradient(180deg,#031D31 0%,#052E49 54%,#021522 100%)",
    "--fmed-card-gradient": "linear-gradient(180deg, rgba(8,49,76,.98) 0%, rgba(5,36,56,.98) 100%)",
    "--fmed-panel-gradient": "linear-gradient(180deg, rgba(8,49,76,.98) 0%, rgba(5,36,56,.98) 100%)",
    "--fmed-hero-bg": "linear-gradient(135deg, rgba(8,49,76,.98) 0%, rgba(4,30,48,.98) 100%)",
    "--fmed-hero-border": "rgba(177,215,238,.24)",
    "--fmed-icon-bg": "rgba(242,184,75,.14)",
    "--fmed-icon-text": "#F2B84B",
    "--fmed-trust-border": "rgba(177,215,238,.22)",
    "--fmed-btn-shadow": "0 14px 32px rgba(0,0,0,.28)"
  },
  app: {
    ...(styles.app || {}),
    background: "var(--fmed-bg)",
    color: "var(--fmed-text)"
  },
  main: {
    ...(styles.main || {}),
    background: "var(--fmed-main-bg)",
    color: "var(--fmed-text)",
    padding: "18px 24px 22px"
  },
  sidebar: {
    ...(styles.sidebar || {}),
    width: "260px",
    minWidth: "260px",
    backgroundImage: "var(--fmed-sidebar-bg)"
  },
  sidebarOnlyTitle: {
    ...(styles.sidebarOnlyTitle || {}),
    color: "#F2B84B",
    fontSize: "27px",
    lineHeight: "31px",
    letterSpacing: "0.05em"
  },
  sidebarOnlySub: {
    ...(styles.sidebarOnlySub || {}),
    color: "rgba(255,255,255,.92)",
    fontSize: "12px",
    letterSpacing: "0.18em"
  },
  menuBtn: {
    ...(styles.menuBtn || {}),
    minHeight: "50px",
    padding: "11px 14px",
    fontSize: "16px"
  },
  menuIconWrap: {
    ...(styles.menuIconWrap || {}),
    width: "34px",
    minWidth: "34px",
    height: "34px",
    fontSize: "21px",
    color: "inherit"
  },
  fmedPremiumHero: {
    ...(styles.fmedPremiumHero || {}),
    gridTemplateColumns: "170px minmax(0, 1fr) 310px",
    gap: "30px",
    minHeight: "230px",
    padding: "28px 38px",
    background: "var(--fmed-hero-bg)",
    border: "1px solid var(--fmed-hero-border)",
    color: "var(--fmed-text)"
  },
  fmedPremiumHeroMark: {
    ...(styles.fmedPremiumHeroMark || {}),
    width: "145px",
    height: "145px",
    fontSize: "118px",
    color: "var(--fmed-accent)",
    textShadow: "0 10px 22px rgba(0,0,0,.12)"
  },
  fmedPremiumHeroTitle: {
    ...(styles.fmedPremiumHeroTitle || {}),
    color: "var(--fmed-text)",
    fontSize: "62px",
    lineHeight: "66px",
    letterSpacing: "0.055em"
  },
  fmedPremiumHeroSubTitle: {
    ...(styles.fmedPremiumHeroSubTitle || {}),
    color: "var(--fmed-accent)",
    fontSize: "23px",
    lineHeight: "30px",
    letterSpacing: "0.26em"
  },
  fmedPremiumHeroText: {
    ...(styles.fmedPremiumHeroText || {}),
    color: "var(--fmed-text)",
    fontSize: "16px",
    lineHeight: 1.55,
    maxWidth: "660px"
  },
  fmedPremiumTrustColumn: {
    ...(styles.fmedPremiumTrustColumn || {}),
    borderLeft: "1px solid var(--fmed-trust-border)",
    paddingLeft: "24px",
    gap: "17px"
  },
  fmedPremiumTrustItem: {
    ...(styles.fmedPremiumTrustItem || {}),
    gridTemplateColumns: "50px minmax(0, 1fr)",
    gap: "13px",
    color: "var(--fmed-text)"
  },
  fmedPremiumTrustIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "999px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#073657",
    border: "1px solid rgba(242,184,75,.60)",
    color: "#F2B84B",
    fontSize: "23px",
    fontWeight: 800
  },
  fmedPremiumTrustTitle: {
    display: "block",
    color: "var(--fmed-text)",
    fontSize: "15px",
    lineHeight: "20px",
    fontWeight: 800,
    letterSpacing: "0.02em"
  },
  fmedPremiumTrustSmall: {
    display: "block",
    color: "var(--fmed-muted)",
    fontSize: "13px",
    lineHeight: "18px",
    marginTop: "3px",
    fontWeight: 500
  },
  fmedPremiumKpiGrid: {
    ...(styles.fmedPremiumKpiGrid || {}),
    gridTemplateColumns: "repeat(5, minmax(180px, 1fr))",
    gap: "14px",
    marginBottom: "18px"
  },
  fmedPremiumKpiCard: {
    ...(styles.fmedPremiumKpiCard || {}),
    minHeight: "118px",
    padding: "18px",
    borderRadius: "14px",
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)"
  },
  fmedPremiumKpiIcon: {
    ...(styles.fmedPremiumKpiIcon || {}),
    width: "58px",
    height: "58px",
    borderRadius: "14px",
    fontSize: "28px"
  },
  fmedPremiumKpiLabel: {
    ...(styles.fmedPremiumKpiLabel || {}),
    color: "var(--fmed-text)",
    fontSize: "12px",
    lineHeight: "16px"
  },
  fmedPremiumKpiValue: {
    ...(styles.fmedPremiumKpiValue || {}),
    color: "var(--fmed-text)",
    fontSize: "31px"
  },
  fmedPremiumKpiSmall: {
    ...(styles.fmedPremiumKpiSmall || {}),
    color: "var(--fmed-muted)",
    fontSize: "13px"
  },
  fmedPremiumActionGrid: {
    ...(styles.fmedPremiumActionGrid || {}),
    gridTemplateColumns: "repeat(6, minmax(150px, 1fr))",
    gap: "14px",
    marginBottom: "22px"
  },
  fmedPremiumActionBtn: {
    ...(styles.fmedPremiumActionBtn || {}),
    minHeight: "70px",
    borderRadius: "14px",
    fontSize: "14px",
    fontWeight: 800,
    letterSpacing: "0.035em"
  },
  fmedPremiumPanelGrid: {
    ...(styles.fmedPremiumPanelGrid || {}),
    gridTemplateColumns: "1fr 1fr 1.15fr",
    gap: "16px"
  },
  fmedPremiumPanel: {
    ...(styles.fmedPremiumPanel || {}),
    minHeight: "250px",
    borderRadius: "14px",
    background: "var(--fmed-panel-gradient)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)"
  },
  fmedPremiumPanelTitle: {
    ...(styles.fmedPremiumPanelTitle || {}),
    color: "var(--fmed-text)"
  },
  fmedPremiumDonut: {
    ...(styles.fmedPremiumDonut || {}),
    color: "var(--fmed-text)",
    boxShadow: "inset 0 0 0 42px var(--fmed-surface-solid)"
  },
  fmedPremiumLegend: {
    ...(styles.fmedPremiumLegend || {}),
    color: "var(--fmed-text)"
  },
  fmedPremiumRecentRow: {
    ...(styles.fmedPremiumRecentRow || {}),
    color: "var(--fmed-text)"
  },
  input: {
    ...(styles.input || {}),
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)"
  },
  select: {
    ...(styles.select || {}),
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)"
  },
  editInput: {
    ...(styles.editInput || {}),
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)"
  },
  editTextarea: {
    ...(styles.editTextarea || {}),
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)"
  }
});

// ========================================================
// FMED DASHBOARD BEAUTY PASS - 24/06/2026
// Solo Dashboard: non modifica API, backend, dati, export o logiche.
// ========================================================
Object.assign(styles, {
  fmedDashboardHero: {
    position: "relative",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 340px",
    gap: "28px",
    alignItems: "stretch",
    minHeight: "255px",
    padding: "34px",
    marginBottom: "18px",
    borderRadius: "30px",
    background: "linear-gradient(135deg, rgba(255,253,248,.98) 0%, rgba(249,238,218,.98) 52%, rgba(225,238,232,.95) 100%)",
    border: "1px solid rgba(195,159,104,.42)",
    boxShadow: "0 28px 70px rgba(38,56,73,.14)",
    color: "#092A43"
  },
  fmedDashboardHeroGlow: {
    position: "absolute",
    inset: "auto -80px -130px auto",
    width: "340px",
    height: "340px",
    borderRadius: "999px",
    background: "radial-gradient(circle, rgba(31,94,122,.22) 0%, rgba(47,125,107,.14) 42%, transparent 72%)",
    pointerEvents: "none"
  },
  fmedDashboardHeroContent: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0
  },
  fmedDashboardEyebrow: {
    display: "inline-flex",
    width: "fit-content",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "rgba(31,94,122,.10)",
    border: "1px solid rgba(31,94,122,.18)",
    color: "#1F5E7A",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "16px"
  },
  fmedDashboardTitle: {
    margin: 0,
    color: "#092A43",
    fontSize: "56px",
    lineHeight: "60px",
    fontWeight: 800,
    letterSpacing: "-0.045em"
  },
  fmedDashboardSubtitle: {
    margin: "16px 0 0",
    maxWidth: "760px",
    color: "#536575",
    fontSize: "17px",
    lineHeight: 1.55,
    fontWeight: 450
  },
  fmedDashboardHeroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "26px"
  },
  fmedDashboardPrimaryBtn: {
    minHeight: "50px",
    padding: "0 20px",
    borderRadius: "16px",
    border: "0",
    background: "linear-gradient(135deg,#073657,#1F5E7A)",
    color: "#FFFFFF",
    boxShadow: "0 16px 34px rgba(7,54,87,.24)",
    cursor: "pointer"
  },
  fmedDashboardSecondaryBtn: {
    minHeight: "50px",
    padding: "0 20px",
    borderRadius: "16px",
    border: "0",
    background: "linear-gradient(135deg,#2F7D6B,#68A58F)",
    color: "#FFFFFF",
    boxShadow: "0 16px 34px rgba(47,125,107,.20)",
    cursor: "pointer"
  },
  fmedDashboardGhostBtn: {
    minHeight: "50px",
    padding: "0 20px",
    borderRadius: "16px",
    border: "1px solid rgba(31,94,122,.22)",
    background: "rgba(255,255,255,.56)",
    color: "#1F5E7A",
    cursor: "pointer"
  },
  fmedDashboardStatusCard: {
    position: "relative",
    zIndex: 1,
    padding: "24px",
    borderRadius: "26px",
    background: "linear-gradient(180deg, rgba(9,42,67,.96), rgba(31,94,122,.95))",
    color: "#FFFFFF",
    boxShadow: "0 24px 52px rgba(7,54,87,.24)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  fmedDashboardStatusTop: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "rgba(255,255,255,.82)",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: ".08em"
  },
  fmedDashboardStatusDot: {
    width: "10px",
    height: "10px",
    borderRadius: "999px",
    background: "#F2B84B",
    boxShadow: "0 0 0 6px rgba(242,184,75,.16)"
  },
  fmedDashboardStatusNumber: {
    display: "block",
    marginTop: "20px",
    fontSize: "68px",
    lineHeight: 1,
    fontWeight: 800,
    color: "#FFFFFF"
  },
  fmedDashboardStatusLabel: {
    display: "block",
    marginTop: "8px",
    color: "rgba(255,255,255,.80)",
    fontSize: "15px"
  },
  fmedDashboardStatusLine: {
    height: "9px",
    borderRadius: "999px",
    background: "rgba(255,255,255,.14)",
    overflow: "hidden",
    marginTop: "22px"
  },
  fmedDashboardStatusBtn: {
    marginTop: "18px",
    minHeight: "44px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,.18)",
    background: "rgba(255,255,255,.12)",
    color: "#FFFFFF",
    cursor: "pointer"
  },
  fmedDashboardKpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: "14px",
    marginBottom: "16px"
  },
  fmedDashboardKpiCard: {
    position: "relative",
    overflow: "hidden",
    minHeight: "142px",
    padding: "18px",
    borderRadius: "24px",
    border: "1px solid rgba(226,212,188,.78)",
    background: "linear-gradient(180deg,#FFFDF8,#FBF4EA)",
    color: "#092A43",
    boxShadow: "0 18px 44px rgba(38,56,73,.10)",
    textAlign: "left",
    cursor: "pointer"
  },
  fmedDashboardKpiCardBlue: {
    borderTop: "5px solid #1F5E7A"
  },
  fmedDashboardKpiCardGreen: {
    borderTop: "5px solid #2F7D6B"
  },
  fmedDashboardKpiCardAmber: {
    borderTop: "5px solid #C8942F"
  },
  fmedDashboardKpiCardPetrol: {
    borderTop: "5px solid #0F6B73"
  },
  fmedDashboardKpiCardViolet: {
    borderTop: "5px solid #7C6A45"
  },
  fmedDashboardKpiIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "16px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(31,94,122,.10)",
    color: "#1F5E7A",
    fontSize: "24px",
    fontWeight: 800,
    marginBottom: "14px"
  },
  fmedDashboardKpiLabel: {
    display: "block",
    color: "#586979",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 750,
    letterSpacing: ".07em",
    textTransform: "uppercase"
  },
  fmedDashboardKpiValue: {
    display: "block",
    color: "#092A43",
    fontSize: "36px",
    lineHeight: "40px",
    fontWeight: 850,
    marginTop: "5px"
  },
  fmedDashboardKpiHint: {
    display: "block",
    color: "#667687",
    fontSize: "13px",
    marginTop: "8px"
  },
  fmedDashboardActionStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0,1fr))",
    gap: "12px",
    marginBottom: "16px"
  },
  fmedDashboardQuickAction: {
    minHeight: "72px",
    padding: "14px 18px",
    borderRadius: "20px",
    border: "1px solid rgba(31,94,122,.16)",
    background: "rgba(255,253,248,.72)",
    color: "#092A43",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 14px 34px rgba(38,56,73,.08)"
  },
  fmedDashboardPanelGrid: {
    display: "grid",
    gridTemplateColumns: "1.35fr .8fr 1fr",
    gap: "16px"
  },
  fmedDashboardPanelLarge: {
    minHeight: "300px",
    padding: "22px",
    borderRadius: "26px",
    background: "linear-gradient(180deg,#FFFDF8,#FBF4EA)",
    border: "1px solid rgba(226,212,188,.80)",
    boxShadow: "0 18px 44px rgba(38,56,73,.10)",
    color: "#092A43"
  },
  fmedDashboardPanel: {
    minHeight: "300px",
    padding: "22px",
    borderRadius: "26px",
    background: "linear-gradient(180deg,#FFFDF8,#FBF4EA)",
    border: "1px solid rgba(226,212,188,.80)",
    boxShadow: "0 18px 44px rgba(38,56,73,.10)",
    color: "#092A43"
  },
  fmedDashboardPanelHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "14px",
    marginBottom: "16px"
  },
  fmedDashboardPanelHeaderCompact: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
    marginBottom: "18px"
  },
  fmedDashboardPanelTitle: {
    margin: 0,
    color: "#092A43",
    fontSize: "19px",
    lineHeight: "24px",
    fontWeight: 800
  },
  fmedDashboardPanelSub: {
    margin: "6px 0 0",
    color: "#667687",
    fontSize: "14px",
    lineHeight: 1.45
  },
  fmedDashboardMiniBtn: {
    minHeight: "38px",
    padding: "0 14px",
    borderRadius: "13px",
    border: "1px solid rgba(31,94,122,.18)",
    background: "rgba(31,94,122,.08)",
    color: "#1F5E7A",
    cursor: "pointer"
  },
  fmedDashboardVisualGrid: {
    display: "grid",
    gridTemplateColumns: "210px 1fr",
    gap: "20px",
    alignItems: "center"
  },
  fmedDashboardDonutWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  fmedDashboardDonut: {
    width: "178px",
    height: "178px",
    borderRadius: "999px",
    background: "conic-gradient(#1F5E7A 0 36%, #2F7D6B 36% 60%, #C8942F 60% 80%, #7C6A45 80% 100%)",
    boxShadow: "inset 0 0 0 48px #FFFDF8, 0 18px 38px rgba(38,56,73,.12)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#092A43"
  },
  fmedDashboardMetricList: {
    display: "grid",
    gap: "12px"
  },
  fmedDashboardMetricRow: {
    display: "grid",
    gridTemplateColumns: "14px 1fr auto",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    borderRadius: "16px",
    background: "rgba(255,255,255,.52)",
    color: "#33485B",
    fontSize: "14px"
  },
  fmedDashboardBars: {
    height: "210px",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "14px",
    alignItems: "end",
    paddingTop: "18px"
  },
  fmedDashboardRecentList: {
    display: "grid",
    gap: "10px"
  },
  fmedDashboardRecentRow: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "42px 1fr",
    gap: "12px",
    alignItems: "center",
    padding: "11px",
    borderRadius: "16px",
    border: "1px solid rgba(31,94,122,.10)",
    background: "rgba(255,255,255,.48)",
    color: "#092A43",
    textAlign: "left",
    cursor: "pointer"
  },
  fmedDashboardRecentIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "14px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(47,125,107,.10)",
    color: "#2F7D6B"
  }
});

// ========================================================
// FMED NEO DARK DASHBOARD - 24/06/2026
// Trasforma solo la Dashboard nello stile dark/neon della reference.
// ========================================================
Object.assign(styles, {
  fmedNeoHideHeader: {
    display: "none"
  },
  fmedNeoDashboardShell: {
    margin: "0",
    padding: "26px",
    borderRadius: "0",
    background: "radial-gradient(circle at 18% 0%, rgba(0,215,255,.10), transparent 30%), radial-gradient(circle at 78% 12%, rgba(31,174,156,.10), transparent 28%), linear-gradient(135deg,#061622 0%,#071B27 46%,#05111C 100%)",
    color: "#E9F7FF",
    minHeight: "calc(100vh - 24px)",
    boxShadow: "inset 0 0 0 1px rgba(31,174,156,.08)"
  },
  fmedNeoDashboardTopbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "18px",
    marginBottom: "24px"
  },
  fmedNeoTitleWrap: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  fmedNeoTitleIcon: {
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1FAE9C",
    background: "linear-gradient(135deg, rgba(31,174,156,.16), rgba(31,174,156,.03))",
    border: "1px solid rgba(31,174,156,.24)",
    boxShadow: "0 0 34px rgba(31,174,156,.12)"
  },
  fmedNeoDashboardTitle: {
    margin: 0,
    color: "#F4FBFF",
    fontSize: "32px",
    lineHeight: "38px",
    fontWeight: 850,
    letterSpacing: "-.03em"
  },
  fmedNeoDashboardSubtitle: {
    margin: "4px 0 0",
    color: "rgba(233,247,255,.74)",
    fontSize: "15px",
    lineHeight: 1.4
  },
  fmedNeoTopActions: {
    display: "flex",
    alignItems: "center",
    gap: "14px"
  },
  fmedNeoDatePill: {
    minHeight: "42px",
    padding: "0 16px",
    borderRadius: "12px",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    color: "#E9F7FF",
    background: "rgba(11,31,46,.78)",
    border: "1px solid rgba(129,194,255,.17)",
    boxShadow: "0 12px 28px rgba(0,0,0,.20)"
  },
  fmedNeoLivePill: {
    minHeight: "42px",
    padding: "0 16px",
    borderRadius: "12px",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    color: "#E9F7FF",
    background: "rgba(11,31,46,.78)",
    border: "1px solid rgba(129,194,255,.17)",
    boxShadow: "0 12px 28px rgba(0,0,0,.20)"
  },
  fmedNeoKpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "18px"
  },
  fmedNeoKpiCard: {
    position: "relative",
    overflow: "hidden",
    minHeight: "150px",
    padding: "22px",
    borderRadius: "18px",
    background: "linear-gradient(145deg,rgba(9,32,47,.92),rgba(7,20,33,.92))",
    border: "1px solid rgba(78,198,255,.18)",
    boxShadow: "0 18px 46px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.05)",
    color: "#E9F7FF",
    display: "grid",
    gridTemplateColumns: "62px 1fr",
    gap: "18px",
    alignItems: "center",
    textAlign: "left",
    cursor: "pointer"
  },
  fmedNeoKpiCyan: {
    boxShadow: "0 18px 46px rgba(0,0,0,.28), 0 0 26px rgba(31,174,156,.08)"
  },
  fmedNeoKpiGreen: {
    boxShadow: "0 18px 46px rgba(0,0,0,.28), 0 0 26px rgba(47,229,139,.08)"
  },
  fmedNeoKpiAmber: {
    boxShadow: "0 18px 46px rgba(0,0,0,.28), 0 0 26px rgba(255,176,32,.08)"
  },
  fmedNeoKpiBlue: {
    boxShadow: "0 18px 46px rgba(0,0,0,.28), 0 0 26px rgba(31,174,156,.08)"
  },
  fmedNeoKpiIcon: {
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1FAE9C",
    background: "rgba(31,174,156,.10)",
    border: "1px solid rgba(31,174,156,.16)"
  },
  fmedNeoKpiText: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0
  },
  fmedNeoTrendPositive: {
    gridColumn: "1 / -1",
    color: "#2FE58B",
    fontStyle: "normal",
    fontWeight: 750,
    fontSize: "14px"
  },
  fmedNeoTrendWarning: {
    gridColumn: "1 / -1",
    color: "#FFB020",
    fontStyle: "normal",
    fontWeight: 750,
    fontSize: "14px"
  },
  fmedNeoTrendBlue: {
    gridColumn: "1 / -1",
    color: "#1FAE9C",
    fontStyle: "normal",
    fontWeight: 750,
    fontSize: "14px"
  },
  fmedNeoMainGrid: {
    display: "grid",
    gridTemplateColumns: "1.62fr 1fr",
    gap: "18px",
    marginBottom: "18px"
  },
  fmedNeoChartCard: {
    minHeight: "420px",
    padding: "22px",
    borderRadius: "18px",
    background: "linear-gradient(145deg,rgba(9,32,47,.95),rgba(7,23,35,.95))",
    border: "1px solid rgba(78,198,255,.18)",
    boxShadow: "0 20px 50px rgba(0,0,0,.26)",
    color: "#E9F7FF"
  },
  fmedNeoUrgentCard: {
    minHeight: "420px",
    padding: "22px",
    borderRadius: "18px",
    background: "linear-gradient(145deg,rgba(9,32,47,.95),rgba(7,23,35,.95))",
    border: "1px solid rgba(78,198,255,.18)",
    boxShadow: "0 20px 50px rgba(0,0,0,.26)",
    color: "#E9F7FF"
  },
  fmedNeoPanelHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "14px",
    marginBottom: "16px"
  },
  fmedNeoPanelTitle: {
    margin: 0,
    color: "#F4FBFF",
    fontSize: "19px",
    lineHeight: "24px",
    fontWeight: 850
  },
  fmedNeoPanelSub: {
    margin: "5px 0 0",
    color: "rgba(233,247,255,.60)",
    fontSize: "13px",
    lineHeight: 1.45
  },
  fmedNeoSmallBtn: {
    minHeight: "40px",
    padding: "0 14px",
    borderRadius: "10px",
    background: "rgba(11,31,46,.82)",
    border: "1px solid rgba(129,194,255,.17)",
    color: "#E9F7FF",
    cursor: "pointer"
  },
  fmedNeoSmallBtnAccent: {
    minHeight: "40px",
    padding: "0 14px",
    borderRadius: "10px",
    background: "rgba(31,174,156,.12)",
    border: "1px solid rgba(31,174,156,.24)",
    color: "#1FAE9C",
    cursor: "pointer"
  },
  fmedNeoLegend: {
    display: "flex",
    flexWrap: "wrap",
    gap: "18px",
    color: "rgba(233,247,255,.82)",
    fontSize: "13px",
    marginBottom: "12px"
  },
  fmedNeoSvgChart: {
    width: "100%",
    height: "260px",
    display: "block",
    filter: "drop-shadow(0 12px 22px rgba(0,0,0,.25))"
  },
  fmedNeoStatusGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "12px",
    marginTop: "10px"
  },
  fmedNeoStatusBox: {
    minHeight: "72px",
    padding: "12px",
    borderRadius: "14px",
    background: "rgba(9,27,41,.76)",
    border: "1px solid rgba(129,194,255,.14)",
    color: "#E9F7FF",
    textAlign: "left",
    cursor: "pointer"
  },
  fmedNeoUrgentList: {
    display: "grid",
    gap: "12px"
  },
  fmedNeoUrgentRow: {
    width: "100%",
    minHeight: "76px",
    display: "grid",
    gridTemplateColumns: "54px 1fr auto",
    gap: "12px",
    alignItems: "center",
    padding: "12px",
    borderRadius: "16px",
    background: "linear-gradient(90deg, rgba(255,77,77,.10), rgba(9,27,41,.56))",
    border: "1px solid rgba(255,255,255,.06)",
    color: "#E9F7FF",
    textAlign: "left",
    cursor: "pointer"
  },
  fmedNeoUrgentIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  fmedNeoUrgentText: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: 0
  },
  fmedNeoBadgeCritical: {
    padding: "6px 9px",
    borderRadius: "9px",
    color: "#FF7A7A",
    background: "rgba(255,77,77,.16)",
    fontStyle: "normal",
    fontSize: "11px",
    fontWeight: 850
  },
  fmedNeoBadgeImportant: {
    padding: "6px 9px",
    borderRadius: "9px",
    color: "#FFB020",
    background: "rgba(255,176,32,.14)",
    fontStyle: "normal",
    fontSize: "11px",
    fontWeight: 850
  },
  fmedNeoEmptyState: {
    padding: "18px",
    borderRadius: "14px",
    color: "rgba(233,247,255,.70)",
    background: "rgba(9,27,41,.62)",
    border: "1px dashed rgba(129,194,255,.18)"
  },
  fmedNeoLowerGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1.05fr",
    gap: "18px",
    marginBottom: "18px"
  },
  fmedNeoMiniPanel: {
    minHeight: "220px",
    padding: "22px",
    borderRadius: "18px",
    background: "linear-gradient(145deg,rgba(9,32,47,.95),rgba(7,23,35,.95))",
    border: "1px solid rgba(78,198,255,.18)",
    boxShadow: "0 20px 50px rgba(0,0,0,.22)",
    color: "#E9F7FF"
  },
  fmedNeoQuickPanel: {
    minHeight: "220px",
    padding: "22px",
    borderRadius: "18px",
    background: "linear-gradient(145deg,rgba(9,32,47,.95),rgba(7,23,35,.95))",
    border: "1px solid rgba(78,198,255,.18)",
    boxShadow: "0 20px 50px rgba(0,0,0,.22)",
    color: "#E9F7FF"
  },
  fmedNeoDonutArea: {
    display: "grid",
    gridTemplateColumns: "150px 1fr",
    gap: "18px",
    alignItems: "center",
    marginTop: "20px"
  },
  fmedNeoDonutInterventi: {
    width: "132px",
    height: "132px",
    borderRadius: "999px",
    background: "conic-gradient(#1FAE9C 0 25%, #35C2A9 25% 55%, #FFB020 55% 74%, #7C6A45 74% 86%, #2FE58B 86% 100%)",
    boxShadow: "inset 0 0 0 42px #071B27, 0 0 28px rgba(31,174,156,.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#F4FBFF",
    fontWeight: 850
  },
  fmedNeoDonutAsset: {
    width: "132px",
    height: "132px",
    borderRadius: "999px",
    background: "conic-gradient(#1FAE9C 0 45%, #2FE58B 45% 68%, #FFB020 68% 82%, #7C6A45 82% 100%)",
    boxShadow: "inset 0 0 0 42px #071B27, 0 0 28px rgba(47,229,139,.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#F4FBFF",
    fontWeight: 850
  },
  fmedNeoDonutLegend: {
    display: "grid",
    gap: "8px",
    color: "rgba(233,247,255,.82)",
    fontSize: "13px"
  },
  fmedNeoQuickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "10px",
    marginTop: "18px"
  },
  fmedNeoQuickBtn: {
    minHeight: "76px",
    padding: "12px",
    borderRadius: "14px",
    background: "rgba(11,31,46,.78)",
    border: "1px solid rgba(31,174,156,.16)",
    color: "#1FAE9C",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer"
  },
  fmedNeoActivityPanel: {
    padding: "22px",
    borderRadius: "18px",
    background: "linear-gradient(145deg,rgba(9,32,47,.95),rgba(7,23,35,.95))",
    border: "1px solid rgba(78,198,255,.18)",
    boxShadow: "0 20px 50px rgba(0,0,0,.22)",
    color: "#E9F7FF"
  },
  fmedNeoActivityList: {
    display: "grid",
    gap: "8px"
  },
  fmedNeoActivityRow: {
    width: "100%",
    minHeight: "44px",
    display: "grid",
    gridTemplateColumns: "28px 1fr 120px 110px",
    gap: "12px",
    alignItems: "center",
    padding: "9px 12px",
    borderRadius: "12px",
    background: "rgba(9,27,41,.48)",
    border: "1px solid rgba(255,255,255,.04)",
    color: "#E9F7FF",
    textAlign: "left",
    cursor: "pointer"
  },
  fmedNeoActivityDot: {
    width: "22px",
    height: "22px",
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#2FE58B",
    border: "1px solid rgba(47,229,139,.55)"
  }
});

// ========================================================
// FMED NEO DARK - rifinitura icone/grafici/sidebar 24/06/2026
// ========================================================
Object.assign(styles, {
  main: {
    ...(styles.main || {}),
    background: "#061622",
    color: "#E9F7FF",
    padding: "0"
  },
  sidebar: {
    ...(styles.sidebar || {}),
    backgroundImage: "linear-gradient(180deg,#041421 0%,#06243A 52%,#03111D 100%)",
    borderRight: "1px solid rgba(31,174,156,.12)",
    boxShadow: "inset -1px 0 0 rgba(255,255,255,.03)"
  },
  menuBtn: {
    ...(styles.menuBtn || {}),
    background: "transparent",
    color: "rgba(233,247,255,.86)",
    border: "1px solid transparent",
    boxShadow: "none"
  },
  menuBtnActive: {
    ...(styles.menuBtnActive || {}),
    background: "linear-gradient(90deg, rgba(31,174,156,.34), rgba(31,174,156,.12))",
    color: "#FFFFFF",
    border: "1px solid rgba(31,174,156,.34)",
    boxShadow: "0 0 24px rgba(31,174,156,.22), inset 4px 0 0 #1FAE9C"
  },
  menuIconWrap: {
    ...(styles.menuIconWrap || {}),
    color: "inherit"
  },
  fmedNeoDashboardShell: {
    ...(styles.fmedNeoDashboardShell || {}),
    padding: "24px 28px 28px",
    background: "radial-gradient(circle at 12% 0%, rgba(31,174,156,.10), transparent 26%), radial-gradient(circle at 90% 10%, rgba(139,92,246,.08), transparent 22%), linear-gradient(135deg,#061622 0%,#071B27 46%,#05111C 100%)"
  },
  fmedNeoKpiGrid: {
    ...(styles.fmedNeoKpiGrid || {}),
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: "14px"
  },
  fmedNeoKpiCard: {
    ...(styles.fmedNeoKpiCard || {}),
    minHeight: "142px",
    padding: "18px",
    borderRadius: "18px",
    gridTemplateColumns: "64px 1fr",
    background: "linear-gradient(145deg,rgba(10,35,52,.95),rgba(6,20,32,.96))"
  },
  fmedNeoKpiIcon: {
    ...(styles.fmedNeoKpiIcon || {}),
    width: "60px",
    height: "60px",
    borderRadius: "20px"
  },
  fmedNeoIconCyan: {
    color: "#1FAE9C",
    background: "rgba(31,174,156,.13)",
    borderColor: "rgba(31,174,156,.28)",
    boxShadow: "0 0 26px rgba(31,174,156,.18)"
  },
  fmedNeoIconGreen: {
    color: "#2FE58B",
    background: "rgba(47,229,139,.13)",
    borderColor: "rgba(47,229,139,.28)",
    boxShadow: "0 0 26px rgba(47,229,139,.18)"
  },
  fmedNeoIconAmber: {
    color: "#FFB020",
    background: "rgba(255,176,32,.15)",
    borderColor: "rgba(255,176,32,.32)",
    boxShadow: "0 0 26px rgba(255,176,32,.18)"
  },
  fmedNeoIconBlue: {
    color: "#1FAE9C",
    background: "rgba(31,174,156,.14)",
    borderColor: "rgba(31,174,156,.30)",
    boxShadow: "0 0 26px rgba(31,174,156,.18)"
  },
  fmedNeoIconPurple: {
    color: "#A855F7",
    background: "rgba(168,85,247,.15)",
    borderColor: "rgba(168,85,247,.32)",
    boxShadow: "0 0 26px rgba(168,85,247,.18)"
  },
  fmedNeoKpiPurple: {
    boxShadow: "0 18px 46px rgba(0,0,0,.28), 0 0 26px rgba(168,85,247,.10)"
  },
  fmedNeoTrendPurple: {
    gridColumn: "1 / -1",
    color: "#A855F7",
    fontStyle: "normal",
    fontWeight: 750,
    fontSize: "14px"
  },
  fmedNeoPanelTitleWithIcon: {
    margin: 0,
    color: "#F4FBFF",
    fontSize: "19px",
    lineHeight: "24px",
    fontWeight: 850,
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  fmedNeoSectionIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "10px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(255,255,255,.10)"
  },
  fmedNeoDonutArea: {
    ...(styles.fmedNeoDonutArea || {}),
    gridTemplateColumns: "170px minmax(0, 1fr)",
    gap: "24px",
    marginTop: "18px"
  },
  fmedNeoSvgDonutWrap: {
    position: "relative",
    width: "160px",
    height: "160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    filter: "drop-shadow(0 16px 26px rgba(0,0,0,.36))"
  },
  fmedNeoDonutSvg: {
    width: "160px",
    height: "160px",
    overflow: "visible"
  },
  fmedNeoDonutCenter: {
    position: "absolute",
    inset: "43px",
    borderRadius: "999px",
    background: "radial-gradient(circle,#09273B 0%,#061824 78%)",
    border: "1px solid rgba(255,255,255,.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#F4FBFF",
    boxShadow: "inset 0 0 20px rgba(0,0,0,.35)"
  },
  fmedNeoDonutLegendEnhanced: {
    display: "grid",
    gap: "9px",
    color: "rgba(233,247,255,.86)",
    fontSize: "13px"
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    minHeight: "76px",
    color: "#1FAE9C",
    background: "linear-gradient(145deg,rgba(9,31,46,.82),rgba(6,22,34,.82))",
    border: "1px solid rgba(31,174,156,.22)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.04), 0 12px 26px rgba(0,0,0,.20)"
  }
});

// ========================================================
// FMED FASE 15A - DESIGN SYSTEM GLOBALE DARK ENTERPRISE
// Unifica palette, proporzioni base e rimuove di fatto la Light Mode.
// ========================================================
Object.assign(styles, {
  app: {
    ...(styles.app || {}),
    background: "radial-gradient(circle at 12% 0%, rgba(31,174,156,.10), transparent 28%), radial-gradient(circle at 88% 8%, rgba(168,85,247,.07), transparent 25%), linear-gradient(135deg,#061520 0%,#071B27 46%,#05111C 100%)",
    color: "#F4FBFF"
  },
  themeLightVars: {
    ...(styles.themeDarkVars || {}),
    "--fmed-bg": "#061520",
    "--fmed-surface": "rgba(9,32,47,.96)",
    "--fmed-surface-solid": "#09202F",
    "--fmed-surface-soft": "#0D2A3D",
    "--fmed-text": "#F4FBFF",
    "--fmed-muted": "#C8D4DF",
    "--fmed-border": "rgba(31,174,156,.20)",
    "--fmed-accent": "#1FAE9C",
    "--fmed-main-bg": "radial-gradient(circle at 12% 0%, rgba(31,174,156,.10), transparent 28%), radial-gradient(circle at 88% 8%, rgba(168,85,247,.07), transparent 25%), linear-gradient(135deg,#061520 0%,#071B27 46%,#05111C 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg,#04121E 0%,#06243A 52%,#03111D 100%)",
    "--fmed-header-bg": "linear-gradient(145deg, rgba(10,35,52,.98), rgba(6,20,32,.98))",
    "--fmed-card-gradient": "linear-gradient(145deg, rgba(10,35,52,.96), rgba(6,20,32,.96))",
    "--fmed-soft-gradient": "linear-gradient(145deg, rgba(14,43,64,.94), rgba(8,25,38,.94))"
  },
  themeDarkVars: {
    ...(styles.themeDarkVars || {}),
    "--fmed-bg": "#061520",
    "--fmed-surface": "rgba(9,32,47,.96)",
    "--fmed-surface-solid": "#09202F",
    "--fmed-surface-soft": "#0D2A3D",
    "--fmed-text": "#F4FBFF",
    "--fmed-muted": "#C8D4DF",
    "--fmed-border": "rgba(31,174,156,.20)",
    "--fmed-accent": "#1FAE9C",
    "--fmed-main-bg": "radial-gradient(circle at 12% 0%, rgba(31,174,156,.10), transparent 28%), radial-gradient(circle at 88% 8%, rgba(168,85,247,.07), transparent 25%), linear-gradient(135deg,#061520 0%,#071B27 46%,#05111C 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg,#04121E 0%,#06243A 52%,#03111D 100%)",
    "--fmed-header-bg": "linear-gradient(145deg, rgba(10,35,52,.98), rgba(6,20,32,.98))",
    "--fmed-card-gradient": "linear-gradient(145deg, rgba(10,35,52,.96), rgba(6,20,32,.96))",
    "--fmed-soft-gradient": "linear-gradient(145deg, rgba(14,43,64,.94), rgba(8,25,38,.94))"
  },
  main: {
    ...(styles.main || {}),
    background: "radial-gradient(circle at 12% 0%, rgba(31,174,156,.10), transparent 28%), radial-gradient(circle at 88% 8%, rgba(168,85,247,.07), transparent 25%), linear-gradient(135deg,#061520 0%,#071B27 46%,#05111C 100%)",
    color: "#F4FBFF",
    padding: "24px 28px 28px"
  },
  sidebar: {
    ...(styles.sidebar || {}),
    background: "linear-gradient(180deg,#04121E 0%,#06243A 52%,#03111D 100%)",
    backgroundImage: "linear-gradient(180deg,#04121E 0%,#06243A 52%,#03111D 100%)",
    color: "#F4FBFF",
    borderRight: "1px solid rgba(31,174,156,.16)",
    boxShadow: "inset -1px 0 0 rgba(255,255,255,.03), 14px 0 42px rgba(0,0,0,.22)"
  },
  headerBanner: {
    ...(styles.headerBanner || {}),
    background: "linear-gradient(145deg, rgba(10,35,52,.98), rgba(6,20,32,.98))",
    color: "#F4FBFF",
    border: "1px solid rgba(31,174,156,.20)",
    boxShadow: "0 20px 50px rgba(0,0,0,.24)"
  },
  smartSectionCard: {
    ...(styles.smartSectionCard || {}),
    background: "linear-gradient(145deg, rgba(10,35,52,.96), rgba(6,20,32,.96))",
    color: "#F4FBFF",
    border: "1px solid rgba(31,174,156,.20)",
    boxShadow: "0 20px 50px rgba(0,0,0,.24)",
    borderRadius: "18px"
  },
  smartSectionTitle: {
    ...(styles.smartSectionTitle || {}),
    color: "#F4FBFF",
    fontWeight: 700
  },
  smartSectionSubtitle: {
    ...(styles.smartSectionSubtitle || {}),
    color: "#C8D4DF"
  },
  smartSectionHeader: {
    ...(styles.smartSectionHeader || {}),
    color: "#F4FBFF"
  },
  smartQuickCard: {
    ...(styles.smartQuickCard || {}),
    background: "linear-gradient(145deg, rgba(14,43,64,.94), rgba(8,25,38,.94))",
    color: "#F4FBFF",
    border: "1px solid rgba(31,174,156,.20)",
    borderRadius: "18px"
  },
  kpiCard: {
    ...(styles.kpiCard || {}),
    background: "linear-gradient(145deg, rgba(10,35,52,.96), rgba(6,20,32,.96))",
    color: "#F4FBFF",
    border: "1px solid rgba(31,174,156,.20)",
    borderRadius: "18px"
  },
  filterCard: {
    ...(styles.filterCard || {}),
    background: "linear-gradient(145deg, rgba(10,35,52,.96), rgba(6,20,32,.96))",
    color: "#F4FBFF",
    border: "1px solid rgba(31,174,156,.20)",
    borderRadius: "18px"
  },
  tableWrap: {
    ...(styles.tableWrap || {}),
    background: "linear-gradient(145deg, rgba(10,35,52,.96), rgba(6,20,32,.96))",
    border: "1px solid rgba(31,174,156,.20)",
    borderRadius: "18px",
    boxShadow: "0 20px 50px rgba(0,0,0,.22)"
  },
  table: {
    ...(styles.table || {}),
    background: "transparent",
    color: "#F4FBFF"
  },
  th: {
    ...(styles.th || {}),
    background: "rgba(16,43,64,.98)",
    color: "#F4FBFF",
    borderColor: "rgba(31,174,156,.16)"
  },
  td: {
    ...(styles.td || {}),
    color: "#F4FBFF",
    borderColor: "rgba(31,174,156,.12)"
  },
  input: {
    ...(styles.input || {}),
    background: "rgba(7,24,36,.96)",
    color: "#F4FBFF",
    border: "1px solid rgba(31,174,156,.24)",
    borderRadius: "12px"
  },
  select: {
    ...(styles.select || {}),
    background: "rgba(7,24,36,.96)",
    color: "#F4FBFF",
    border: "1px solid rgba(31,174,156,.24)",
    borderRadius: "12px"
  },
  textarea: {
    ...(styles.textarea || {}),
    background: "rgba(7,24,36,.96)",
    color: "#F4FBFF",
    border: "1px solid rgba(31,174,156,.24)",
    borderRadius: "12px"
  },
  sidebarBottomPanel: {
    ...(styles.sidebarBottomPanel || {}),
    background: "transparent",
    borderTop: "1px solid rgba(31,174,156,.12)"
  },
  sidebarUserCard: {
    ...(styles.sidebarUserCard || {}),
    background: "rgba(9,32,47,.86)",
    border: "1px solid rgba(31,174,156,.18)",
    color: "#F4FBFF"
  },
  sidebarRoleHint: {
    ...(styles.sidebarRoleHint || {}),
    display: "none"
  },
  sidebarActionRow: {
    ...(styles.sidebarActionRow || {}),
    gridTemplateColumns: "1fr"
  },
  sidebarLogoutSmallBtn: {
    ...(styles.sidebarLogoutSmallBtn || {}),
    width: "100%",
    background: "rgba(8,30,45,.82)",
    color: "#F4FBFF",
    border: "1px solid rgba(31,174,156,.22)"
  }
});

// ========================================================
// FMED FASE 15B - DASHBOARD + SIDEBAR + BANNER + KPI PREMIUM
// Rifinitura mirata dopo 15A: proporzioni, grafici, icone,
// sidebar e header in stile enterprise dark/neon.
// Non modifica logiche, API, dati, Supabase, OCR, SharePoint o export.
// ========================================================
Object.assign(styles, {
  app: {
    ...(styles.app || {}),
    background: "#061520",
    color: "#F7F9FB",
    fontFamily: "Inter, 'Futura PT', Futura, 'Trebuchet MS', Arial, sans-serif"
  },
  main: {
    ...(styles.main || {}),
    padding: "22px 28px 28px",
    background: "radial-gradient(circle at 14% 0%, rgba(31,174,156,.12), transparent 30%), radial-gradient(circle at 88% 6%, rgba(168,85,247,.08), transparent 24%), linear-gradient(135deg,#061520 0%,#071B27 46%,#04111B 100%)",
    color: "#F7F9FB",
    overflowX: "hidden"
  },
  sidebar: {
    ...(styles.sidebar || {}),
    width: "250px",
    minWidth: "250px",
    padding: "22px 16px 18px",
    background: "radial-gradient(circle at 10% 2%, rgba(31,174,156,.16), transparent 24%), linear-gradient(180deg,#04111C 0%,#062238 52%,#03101B 100%)",
    borderRight: "1px solid rgba(31,174,156,.18)",
    boxShadow: "inset -1px 0 0 rgba(255,255,255,.035), 18px 0 48px rgba(0,0,0,.30)",
    overflow: "hidden"
  },
  sidebarNav: {
    ...(styles.sidebarNav || {}),
    gap: "10px",
    marginTop: "28px",
    paddingRight: "2px",
    overflowX: "hidden",
    scrollbarWidth: "thin"
  },
  sidebarLogoBox: {
    ...(styles.sidebarLogoBox || {}),
    padding: "6px 2px 18px",
    borderBottom: "1px solid rgba(31,174,156,.10)"
  },
  sidebarTitle: {
    ...(styles.sidebarTitle || {}),
    color: "#FFFFFF",
    letterSpacing: ".16em",
    fontWeight: 850,
    textShadow: "0 0 18px rgba(31,174,156,.16)"
  },
  sidebarSubtitle: {
    ...(styles.sidebarSubtitle || {}),
    color: "#1FAE9C",
    fontWeight: 650
  },
  menuBtn: {
    ...(styles.menuBtn || {}),
    minHeight: "48px",
    padding: "0 13px",
    borderRadius: "14px",
    background: "transparent",
    color: "rgba(229,244,252,.86)",
    border: "1px solid transparent",
    boxShadow: "none",
    fontSize: "14px",
    letterSpacing: ".02em"
  },
  menuBtnActive: {
    ...(styles.menuBtnActive || {}),
    color: "#FFFFFF",
    background: "linear-gradient(90deg, rgba(31,174,156,.38), rgba(31,174,156,.13) 58%, rgba(31,174,156,.04))",
    border: "1px solid rgba(31,174,156,.38)",
    boxShadow: "0 0 28px rgba(31,174,156,.24), inset 4px 0 0 #1FAE9C"
  },
  menuIconWrap: {
    ...(styles.menuIconWrap || {}),
    width: "30px",
    minWidth: "30px",
    height: "30px",
    borderRadius: "10px",
    color: "inherit",
    background: "rgba(31,174,156,.08)",
    border: "1px solid rgba(31,174,156,.12)"
  },
  menuLabel: {
    ...(styles.menuLabel || {}),
    fontWeight: 650
  },
  sidebarBottomPanel: {
    ...(styles.sidebarBottomPanel || {}),
    paddingTop: "14px",
    borderTop: "1px solid rgba(31,174,156,.12)"
  },
  sidebarUserCard: {
    ...(styles.sidebarUserCard || {}),
    minHeight: "66px",
    padding: "12px",
    borderRadius: "16px",
    background: "linear-gradient(145deg,rgba(12,34,51,.92),rgba(5,20,32,.92))",
    border: "1px solid rgba(31,174,156,.20)",
    boxShadow: "0 12px 28px rgba(0,0,0,.22)"
  },
  sidebarLogoutSmallBtn: {
    ...(styles.sidebarLogoutSmallBtn || {}),
    minHeight: "44px",
    borderRadius: "13px",
    background: "rgba(8,30,45,.82)",
    color: "#EAF8FF",
    border: "1px solid rgba(31,174,156,.22)"
  },
  headerBanner: {
    ...(styles.headerBanner || {}),
    padding: "22px 26px",
    borderRadius: "22px",
    background: "linear-gradient(145deg, rgba(10,35,52,.97), rgba(5,18,30,.97))",
    color: "#FFFFFF",
    border: "1px solid rgba(31,174,156,.22)",
    boxShadow: "0 20px 50px rgba(0,0,0,.26), inset 0 1px 0 rgba(255,255,255,.04)"
  },
  fmedNeoHideHeader: {
    display: "none"
  },
  fmedNeoDashboardShell: {
    ...(styles.fmedNeoDashboardShell || {}),
    minHeight: "100vh",
    padding: "28px 30px 30px",
    background: "radial-gradient(circle at 14% 0%, rgba(31,174,156,.13), transparent 30%), radial-gradient(circle at 92% 4%, rgba(168,85,247,.10), transparent 24%), linear-gradient(135deg,#061520 0%,#071B27 45%,#04111B 100%)",
    color: "#F7F9FB",
    boxShadow: "inset 0 0 0 1px rgba(31,174,156,.08)"
  },
  fmedNeoDashboardTopbar: {
    ...(styles.fmedNeoDashboardTopbar || {}),
    marginBottom: "24px",
    alignItems: "center"
  },
  fmedNeoTitleIcon: {
    ...(styles.fmedNeoTitleIcon || {}),
    width: "62px",
    height: "62px",
    borderRadius: "19px",
    color: "#1FAE9C",
    background: "linear-gradient(145deg, rgba(31,174,156,.16), rgba(31,174,156,.045))",
    border: "1px solid rgba(31,174,156,.26)",
    boxShadow: "0 0 36px rgba(31,174,156,.18)"
  },
  fmedNeoDashboardTitle: {
    ...(styles.fmedNeoDashboardTitle || {}),
    fontSize: "34px",
    lineHeight: "40px",
    color: "#FFFFFF",
    fontWeight: 900,
    letterSpacing: "-.035em"
  },
  fmedNeoDashboardSubtitle: {
    ...(styles.fmedNeoDashboardSubtitle || {}),
    color: "#C8D4DF",
    fontSize: "15px"
  },
  fmedNeoDatePill: {
    ...(styles.fmedNeoDatePill || {}),
    minHeight: "46px",
    padding: "0 18px",
    borderRadius: "14px",
    background: "rgba(9,31,48,.80)",
    border: "1px solid rgba(31,174,156,.24)",
    color: "#F7F9FB"
  },
  fmedNeoLivePill: {
    ...(styles.fmedNeoLivePill || {}),
    minHeight: "46px",
    padding: "0 18px",
    borderRadius: "14px",
    background: "rgba(9,31,48,.80)",
    border: "1px solid rgba(31,174,156,.24)",
    color: "#F7F9FB"
  },
  fmedNeoKpiGrid: {
    ...(styles.fmedNeoKpiGrid || {}),
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "18px"
  },
  fmedNeoKpiCard: {
    ...(styles.fmedNeoKpiCard || {}),
    minHeight: "150px",
    padding: "18px 18px 16px",
    borderRadius: "18px",
    gridTemplateColumns: "68px 1fr",
    gap: "18px",
    background: "linear-gradient(145deg,rgba(10,35,52,.96),rgba(5,18,30,.97))",
    border: "1px solid rgba(31,174,156,.22)",
    boxShadow: "0 20px 46px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.045)"
  },
  fmedNeoKpiIcon: {
    ...(styles.fmedNeoKpiIcon || {}),
    width: "62px",
    height: "62px",
    borderRadius: "20px"
  },
  fmedNeoKpiText: {
    ...(styles.fmedNeoKpiText || {}),
    gap: "4px"
  },
  fmedNeoTrendCyan: {
    ...(styles.fmedNeoTrendCyan || {}),
    color: "#1FAE9C",
    fontWeight: 800,
    fontStyle: "normal"
  },
  fmedNeoTrendGreen: {
    ...(styles.fmedNeoTrendGreen || {}),
    color: "#2FE58B",
    fontWeight: 800,
    fontStyle: "normal"
  },
  fmedNeoTrendAmber: {
    ...(styles.fmedNeoTrendAmber || {}),
    color: "#FFB020",
    fontWeight: 800,
    fontStyle: "normal"
  },
  fmedNeoTrendBlue: {
    ...(styles.fmedNeoTrendBlue || {}),
    color: "#1FAE9C",
    fontWeight: 800,
    fontStyle: "normal"
  },
  fmedNeoTrendPurple: {
    ...(styles.fmedNeoTrendPurple || {}),
    color: "#A855F7",
    fontWeight: 800,
    fontStyle: "normal"
  },
  fmedNeoMainGrid: {
    ...(styles.fmedNeoMainGrid || {}),
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.55fr) minmax(360px, .92fr)",
    gap: "18px",
    marginBottom: "18px"
  },
  fmedNeoChartCard: {
    ...(styles.fmedNeoChartCard || {}),
    minHeight: "430px",
    padding: "24px",
    borderRadius: "18px",
    background: "linear-gradient(145deg,rgba(10,35,52,.96),rgba(5,18,30,.97))",
    border: "1px solid rgba(31,174,156,.22)",
    boxShadow: "0 22px 52px rgba(0,0,0,.30), inset 0 1px 0 rgba(255,255,255,.04)"
  },
  fmedNeoChartSvg: {
    ...(styles.fmedNeoChartSvg || {}),
    width: "100%",
    height: "270px",
    marginTop: "14px",
    filter: "drop-shadow(0 12px 20px rgba(0,0,0,.28))"
  },
  fmedNeoLegend: {
    ...(styles.fmedNeoLegend || {}),
    gap: "20px",
    color: "#D7E7F2",
    fontSize: "13px"
  },
  fmedNeoStatTiles: {
    ...(styles.fmedNeoStatTiles || {}),
    gridTemplateColumns: "repeat(4, minmax(0,1fr))",
    gap: "14px",
    marginTop: "18px"
  },
  fmedNeoStatTile: {
    ...(styles.fmedNeoStatTile || {}),
    minHeight: "72px",
    borderRadius: "14px",
    background: "rgba(9,31,48,.70)",
    border: "1px solid rgba(31,174,156,.18)",
    color: "#F7F9FB"
  },
  fmedNeoUrgentPanel: {
    ...(styles.fmedNeoUrgentPanel || {}),
    minHeight: "430px",
    padding: "24px",
    borderRadius: "18px",
    background: "linear-gradient(145deg,rgba(10,35,52,.96),rgba(5,18,30,.97))",
    border: "1px solid rgba(31,174,156,.22)",
    boxShadow: "0 22px 52px rgba(0,0,0,.30)"
  },
  fmedNeoUrgentItem: {
    ...(styles.fmedNeoUrgentItem || {}),
    minHeight: "84px",
    padding: "14px 16px",
    borderRadius: "15px",
    gridTemplateColumns: "56px 1fr auto",
    background: "linear-gradient(90deg,rgba(255,77,94,.105),rgba(255,255,255,.035))",
    border: "1px solid rgba(255,255,255,.055)"
  },
  fmedNeoLowerGrid: {
    ...(styles.fmedNeoLowerGrid || {}),
    display: "grid",
    gridTemplateColumns: "minmax(0, .9fr) minmax(0, .9fr) minmax(380px, 1.05fr)",
    gap: "18px",
    marginBottom: "18px"
  },
  fmedNeoMiniPanel: {
    ...(styles.fmedNeoMiniPanel || {}),
    minHeight: "250px",
    padding: "22px",
    borderRadius: "18px",
    background: "linear-gradient(145deg,rgba(10,35,52,.96),rgba(5,18,30,.97))",
    border: "1px solid rgba(31,174,156,.22)",
    boxShadow: "0 22px 52px rgba(0,0,0,.28)"
  },
  fmedNeoQuickPanel: {
    ...(styles.fmedNeoQuickPanel || {}),
    minHeight: "250px",
    padding: "22px",
    borderRadius: "18px",
    background: "linear-gradient(145deg,rgba(10,35,52,.96),rgba(5,18,30,.97))",
    border: "1px solid rgba(31,174,156,.22)",
    boxShadow: "0 22px 52px rgba(0,0,0,.28)"
  },
  fmedNeoDonutArea: {
    ...(styles.fmedNeoDonutArea || {}),
    gridTemplateColumns: "174px minmax(0,1fr)",
    gap: "24px",
    alignItems: "center",
    marginTop: "20px"
  },
  fmedNeoSvgDonutWrap: {
    ...(styles.fmedNeoSvgDonutWrap || {}),
    width: "168px",
    height: "168px",
    filter: "drop-shadow(0 18px 28px rgba(0,0,0,.38))"
  },
  fmedNeoDonutSvg: {
    ...(styles.fmedNeoDonutSvg || {}),
    width: "168px",
    height: "168px"
  },
  fmedNeoDonutCenter: {
    ...(styles.fmedNeoDonutCenter || {}),
    inset: "45px",
    background: "radial-gradient(circle,#0B2C42 0%,#061824 78%)",
    border: "1px solid rgba(255,255,255,.10)"
  },
  fmedNeoDonutLegendEnhanced: {
    ...(styles.fmedNeoDonutLegendEnhanced || {}),
    gap: "10px",
    fontSize: "13px",
    color: "#D7E7F2"
  },
  fmedNeoQuickGrid: {
    ...(styles.fmedNeoQuickGrid || {}),
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "12px",
    marginTop: "20px"
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    minHeight: "82px",
    padding: "14px",
    borderRadius: "15px",
    color: "#1FAE9C",
    background: "linear-gradient(145deg,rgba(9,31,46,.86),rgba(6,22,34,.88))",
    border: "1px solid rgba(31,174,156,.24)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.04), 0 14px 30px rgba(0,0,0,.22)",
    fontWeight: 750
  },
  fmedNeoActivityPanel: {
    ...(styles.fmedNeoActivityPanel || {}),
    padding: "22px 24px",
    borderRadius: "18px",
    background: "linear-gradient(145deg,rgba(10,35,52,.96),rgba(5,18,30,.97))",
    border: "1px solid rgba(31,174,156,.22)",
    boxShadow: "0 22px 52px rgba(0,0,0,.28)"
  },
  fmedNeoActivityRow: {
    ...(styles.fmedNeoActivityRow || {}),
    minHeight: "48px",
    borderRadius: "13px",
    background: "rgba(9,31,48,.52)",
    border: "1px solid rgba(31,174,156,.08)"
  }
});

// ========================================================
// FMED FASE 15C - PAGINE OPERATIVE DARK ENTERPRISE
// Asset, Interventi, Costi, Scadenze e Infrastrutture:
// stessa palette, proporzioni e leggibilità della Dashboard 15B.
// Solo UI: non modifica logiche, API, Supabase, OCR, SharePoint o export.
// ========================================================
Object.assign(styles, {
  // Shell sezioni operative
  assetHeroPanel: {
    ...(styles.assetHeroPanel || {}),
    minHeight: "150px",
    padding: "24px",
    borderRadius: "22px",
    background: "radial-gradient(circle at 4% 0%, rgba(31,174,156,.16), transparent 34%), linear-gradient(145deg, rgba(10,35,52,.98), rgba(5,18,30,.98))",
    border: "1px solid rgba(31,174,156,.24)",
    boxShadow: "0 24px 60px rgba(0,0,0,.30), inset 0 1px 0 rgba(255,255,255,.05)",
    color: "#F7F9FB"
  },
  assetHeroLeft: {
    ...(styles.assetHeroLeft || {}),
    gap: "10px",
    minWidth: 0
  },
  assetHeroRight: {
    ...(styles.assetHeroRight || {}),
    gap: "12px",
    alignItems: "stretch"
  },
  assetHeroEyebrow: {
    ...(styles.assetHeroEyebrow || {}),
    color: "#1FAE9C",
    fontSize: "12px",
    letterSpacing: ".14em",
    fontWeight: 850,
    textTransform: "uppercase"
  },
  assetHeroTitle: {
    ...(styles.assetHeroTitle || {}),
    color: "#FFFFFF",
    fontSize: "34px",
    lineHeight: "38px",
    fontWeight: 850,
    letterSpacing: "-.035em",
    margin: 0,
    textShadow: "0 0 24px rgba(31,174,156,.14)"
  },
  assetHeroSubtitle: {
    ...(styles.assetHeroSubtitle || {}),
    color: "#C8D4DF",
    fontSize: "15px",
    lineHeight: "22px",
    maxWidth: "860px"
  },
  assetHeroBadgeText: {
    ...(styles.assetHeroBadgeText || {}),
    minWidth: "148px",
    padding: "14px 16px",
    borderRadius: "18px",
    background: "linear-gradient(145deg, rgba(31,174,156,.14), rgba(12,34,51,.76))",
    border: "1px solid rgba(31,174,156,.26)",
    color: "#F7F9FB",
    boxShadow: "0 14px 32px rgba(0,0,0,.22)"
  },
  assetHeroBadgeNumber: {
    ...(styles.assetHeroBadgeNumber || {}),
    color: "#FFFFFF",
    fontSize: "27px",
    lineHeight: "30px",
    fontWeight: 880
  },
  assetHeroBadgeSub: {
    ...(styles.assetHeroBadgeSub || {}),
    color: "#7FE2CC",
    fontSize: "12px",
    fontWeight: 750,
    letterSpacing: ".05em",
    textTransform: "uppercase"
  },
  // KPI operativi
  assetKpiGrid: {
    ...(styles.assetKpiGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "14px",
    marginTop: "18px"
  },
  assetKpiCard: {
    ...(styles.assetKpiCard || {}),
    minHeight: "126px",
    padding: "18px",
    borderRadius: "20px",
    background: "linear-gradient(145deg, rgba(10,35,52,.96), rgba(6,20,32,.96))",
    border: "1px solid rgba(31,174,156,.22)",
    color: "#F7F9FB",
    boxShadow: "0 20px 44px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.045)"
  },
  assetKpiTop: {
    ...(styles.assetKpiTop || {}),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px"
  },
  assetKpiIcon: {
    ...(styles.assetKpiIcon || {}),
    width: "48px",
    height: "48px",
    minWidth: "48px",
    borderRadius: "16px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1FAE9C",
    background: "rgba(31,174,156,.12)",
    border: "1px solid rgba(31,174,156,.26)",
    boxShadow: "0 0 24px rgba(31,174,156,.14)"
  },
  assetKpiLabel: {
    ...(styles.assetKpiLabel || {}),
    color: "#9FB4C5",
    fontSize: "12px",
    letterSpacing: ".10em",
    textTransform: "uppercase",
    fontWeight: 800
  },
  assetKpiValue: {
    ...(styles.assetKpiValue || {}),
    color: "#FFFFFF",
    fontSize: "31px",
    lineHeight: "36px",
    fontWeight: 900,
    letterSpacing: "-.04em"
  },
  assetKpiHint: {
    ...(styles.assetKpiHint || {}),
    color: "#C8D4DF",
    fontSize: "13px",
    lineHeight: "18px"
  },
  // Filtri
  assetFiltersPanel: {
    ...(styles.assetFiltersPanel || {}),
    marginTop: "18px",
    padding: "18px",
    borderRadius: "20px",
    background: "linear-gradient(145deg, rgba(9,31,48,.94), rgba(5,18,30,.94))",
    border: "1px solid rgba(31,174,156,.20)",
    boxShadow: "0 18px 42px rgba(0,0,0,.22)",
    color: "#F7F9FB"
  },
  assetFiltersHeader: {
    ...(styles.assetFiltersHeader || {}),
    color: "#F7F9FB",
    marginBottom: "14px"
  },
  assetFiltersGrid: {
    ...(styles.assetFiltersGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(170px, 1fr))",
    gap: "12px",
    alignItems: "end"
  },
  assetInputLarge: {
    ...(styles.assetInputLarge || {}),
    minHeight: "48px",
    padding: "0 14px",
    borderRadius: "14px",
    background: "rgba(6,21,32,.96)",
    color: "#FFFFFF",
    border: "1px solid rgba(31,174,156,.25)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.04)"
  },
  assetInputWide: {
    ...(styles.assetInputWide || {}),
    minHeight: "48px",
    padding: "0 14px",
    borderRadius: "14px",
    background: "rgba(6,21,32,.96)",
    color: "#FFFFFF",
    border: "1px solid rgba(31,174,156,.25)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.04)"
  },
  assetSelectLarge: {
    ...(styles.assetSelectLarge || {}),
    minHeight: "48px",
    padding: "0 14px",
    borderRadius: "14px",
    background: "rgba(6,21,32,.96)",
    color: "#FFFFFF",
    border: "1px solid rgba(31,174,156,.25)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.04)"
  },
  dateFilterGroup: {
    ...(styles.dateFilterGroup || {}),
    gap: "7px",
    color: "#D7E7F2"
  },
  dateFilterLabel: {
    ...(styles.dateFilterLabel || {}),
    color: "#7FE2CC",
    fontSize: "12px",
    letterSpacing: ".08em",
    textTransform: "uppercase",
    fontWeight: 800
  },
  assetFilterChips: {
    ...(styles.assetFilterChips || {}),
    gap: "9px",
    marginTop: "14px"
  },
  assetChip: {
    ...(styles.assetChip || {}),
    minHeight: "36px",
    padding: "0 12px",
    borderRadius: "999px",
    background: "rgba(31,174,156,.10)",
    color: "#DDF8FF",
    border: "1px solid rgba(31,174,156,.22)",
    fontSize: "12px",
    fontWeight: 750
  },
  // Azioni e pulsanti
  assetActionsBar: {
    ...(styles.assetActionsBar || {}),
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "14px"
  },
  assetPrimaryAction: {
    ...(styles.assetPrimaryAction || {}),
    minHeight: "46px",
    padding: "0 16px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #1FAE9C, #1FAE9C)",
    color: "#02131D",
    border: "1px solid rgba(31,174,156,.50)",
    boxShadow: "0 14px 30px rgba(31,174,156,.22)",
    fontWeight: 850
  },
  assetSecondaryAction: {
    ...(styles.assetSecondaryAction || {}),
    minHeight: "46px",
    padding: "0 16px",
    borderRadius: "14px",
    background: "rgba(13,42,61,.92)",
    color: "#E8F7FF",
    border: "1px solid rgba(31,174,156,.22)",
    boxShadow: "0 12px 26px rgba(0,0,0,.20)",
    fontWeight: 750
  },
  assetGhostAction: {
    ...(styles.assetGhostAction || {}),
    minHeight: "42px",
    padding: "0 13px",
    borderRadius: "13px",
    background: "rgba(255,255,255,.04)",
    color: "#C8D4DF",
    border: "1px solid rgba(31,174,156,.14)"
  },
  assetSearchButton: {
    ...(styles.assetSearchButton || {}),
    minHeight: "48px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #1FAE9C, #1FAE9C)",
    color: "#02131D",
    border: "1px solid rgba(31,174,156,.50)",
    fontWeight: 850
  },
  actionBtnEdit: {
    ...(styles.actionBtnEdit || {}),
    borderRadius: "12px",
    background: "rgba(31,174,156,.12)",
    color: "#7FE2CC",
    border: "1px solid rgba(31,174,156,.24)"
  },
  actionBtnDelete: {
    ...(styles.actionBtnDelete || {}),
    borderRadius: "12px",
    background: "rgba(255,77,94,.12)",
    color: "#FF9AA5",
    border: "1px solid rgba(255,77,94,.24)"
  },
  dangerButton: {
    ...(styles.dangerButton || {}),
    borderRadius: "12px",
    background: "rgba(255,77,94,.14)",
    color: "#FFB3BB",
    border: "1px solid rgba(255,77,94,.28)"
  },
  // Tabelle enterprise
  assetTableCard: {
    ...(styles.assetTableCard || {}),
    marginTop: "18px",
    padding: "18px",
    borderRadius: "22px",
    background: "linear-gradient(145deg, rgba(10,35,52,.96), rgba(5,18,30,.97))",
    border: "1px solid rgba(31,174,156,.20)",
    boxShadow: "0 24px 60px rgba(0,0,0,.28)",
    color: "#F7F9FB"
  },
  assetListHeader: {
    ...(styles.assetListHeader || {}),
    marginBottom: "14px",
    alignItems: "flex-end"
  },
  assetTableTitle: {
    ...(styles.assetTableTitle || {}),
    color: "#FFFFFF",
    fontSize: "20px",
    lineHeight: "24px",
    fontWeight: 850
  },
  assetTableSubtitle: {
    ...(styles.assetTableSubtitle || {}),
    color: "#AFC2D3",
    fontSize: "13px",
    lineHeight: "18px"
  },
  assetSectionTitle: {
    ...(styles.assetSectionTitle || {}),
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: 850
  },
  assetSectionSubtitle: {
    ...(styles.assetSectionSubtitle || {}),
    color: "#AFC2D3"
  },
  tableWrap: {
    ...(styles.tableWrap || {}),
    borderRadius: "18px",
    overflow: "auto",
    background: "rgba(5,18,30,.78)",
    border: "1px solid rgba(31,174,156,.16)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.03)"
  },
  tableLarge: {
    ...(styles.tableLarge || {}),
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    color: "#F7F9FB",
    background: "transparent"
  },
  table: {
    ...(styles.table || {}),
    color: "#F7F9FB",
    background: "transparent"
  },
  thLarge: {
    ...(styles.thLarge || {}),
    position: "sticky",
    top: 0,
    zIndex: 2,
    minHeight: "46px",
    padding: "13px 14px",
    background: "linear-gradient(180deg, rgba(16,43,64,.98), rgba(9,31,48,.98))",
    color: "#7FE2CC",
    borderBottom: "1px solid rgba(31,174,156,.18)",
    fontSize: "11px",
    letterSpacing: ".12em",
    textTransform: "uppercase",
    fontWeight: 850
  },
  th: {
    ...(styles.th || {}),
    background: "linear-gradient(180deg, rgba(16,43,64,.98), rgba(9,31,48,.98))",
    color: "#7FE2CC",
    borderBottom: "1px solid rgba(31,174,156,.18)",
    fontSize: "11px",
    letterSpacing: ".12em",
    textTransform: "uppercase",
    fontWeight: 850
  },
  tdLarge: {
    ...(styles.tdLarge || {}),
    padding: "13px 14px",
    color: "#E8F7FF",
    borderBottom: "1px solid rgba(31,174,156,.09)",
    fontSize: "13px",
    lineHeight: "18px",
    background: "rgba(255,255,255,.00)"
  },
  td: {
    ...(styles.td || {}),
    color: "#E8F7FF",
    borderBottom: "1px solid rgba(31,174,156,.09)",
    background: "transparent"
  },
  tdCodeLarge: {
    ...(styles.tdCodeLarge || {}),
    color: "#FFFFFF",
    fontWeight: 850,
    letterSpacing: ".02em"
  },
  tdCode: {
    ...(styles.tdCode || {}),
    color: "#FFFFFF",
    fontWeight: 850
  },
  tr: {
    ...(styles.tr || {}),
    background: "rgba(255,255,255,.00)",
    color: "#E8F7FF"
  },
  trClickable: {
    ...(styles.trClickable || {}),
    cursor: "pointer",
    transition: "background .15s ease, transform .15s ease"
  },
  rowActionGroup: {
    ...(styles.rowActionGroup || {}),
    gap: "8px",
    justifyContent: "flex-end"
  },
  loadMoreRow: {
    ...(styles.loadMoreRow || {}),
    padding: "18px",
    color: "#AFC2D3"
  },
  // Costi / conto economico / accordion
  card: {
    ...(styles.card || {}),
    background: "linear-gradient(145deg, rgba(10,35,52,.96), rgba(5,18,30,.97))",
    color: "#F7F9FB",
    border: "1px solid rgba(31,174,156,.20)",
    borderRadius: "20px",
    boxShadow: "0 22px 52px rgba(0,0,0,.26)"
  },
  cardTitle: {
    ...(styles.cardTitle || {}),
    color: "#FFFFFF",
    fontWeight: 850
  },
  interventiFilters: {
    ...(styles.interventiFilters || {}),
    background: "linear-gradient(145deg, rgba(9,31,48,.94), rgba(5,18,30,.94))",
    border: "1px solid rgba(31,174,156,.20)",
    borderRadius: "20px",
    color: "#F7F9FB"
  },
  scadenzeHeader: {
    ...(styles.scadenzeHeader || {}),
    background: "linear-gradient(145deg, rgba(10,35,52,.96), rgba(5,18,30,.97))",
    border: "1px solid rgba(31,174,156,.20)",
    borderRadius: "20px",
    color: "#F7F9FB"
  },
  contoEconomicoBox: {
    ...(styles.contoEconomicoBox || {}),
    background: "linear-gradient(145deg, rgba(8,28,43,.96), rgba(5,18,30,.97))",
    border: "1px solid rgba(31,174,156,.20)",
    borderRadius: "22px",
    color: "#F7F9FB"
  },
  contoEconomicoCard: {
    ...(styles.contoEconomicoCard || {}),
    background: "rgba(31,174,156,.08)",
    border: "1px solid rgba(31,174,156,.18)",
    borderRadius: "16px",
    color: "#F7F9FB"
  },
  contoEconomicoTitle: {
    ...(styles.contoEconomicoTitle || {}),
    color: "#FFFFFF"
  },
  contoEconomicoLabel: {
    ...(styles.contoEconomicoLabel || {}),
    color: "#AFC2D3"
  },
  contoEconomicoValue: {
    ...(styles.contoEconomicoValue || {}),
    color: "#FFFFFF",
    fontWeight: 900
  },
  periodoBadge: {
    ...(styles.periodoBadge || {}),
    background: "rgba(31,174,156,.10)",
    color: "#7FE2CC",
    border: "1px solid rgba(31,174,156,.22)"
  },
  exportAccordionItem: {
    ...(styles.exportAccordionItem || {}),
    background: "linear-gradient(145deg, rgba(10,35,52,.96), rgba(5,18,30,.97))",
    border: "1px solid rgba(31,174,156,.20)",
    borderRadius: "18px",
    color: "#F7F9FB"
  },
  exportAccordionHeader: {
    ...(styles.exportAccordionHeader || {}),
    color: "#F7F9FB"
  },
  exportAccordionTitle: {
    ...(styles.exportAccordionTitle || {}),
    color: "#FFFFFF",
    fontWeight: 850
  },
  exportAccordionSubtitle: {
    ...(styles.exportAccordionSubtitle || {}),
    color: "#AFC2D3"
  },
  exportAccordionIcon: {
    ...(styles.exportAccordionIcon || {}),
    color: "#1FAE9C",
    background: "rgba(31,174,156,.10)",
    border: "1px solid rgba(31,174,156,.20)"
  },
  // Form comuni
  input: {
    ...(styles.input || {}),
    minHeight: "46px",
    borderRadius: "14px",
    background: "rgba(6,21,32,.96)",
    color: "#FFFFFF",
    border: "1px solid rgba(31,174,156,.25)"
  },
  select: {
    ...(styles.select || {}),
    minHeight: "46px",
    borderRadius: "14px",
    background: "rgba(6,21,32,.96)",
    color: "#FFFFFF",
    border: "1px solid rgba(31,174,156,.25)"
  },
  textarea: {
    ...(styles.textarea || {}),
    borderRadius: "14px",
    background: "rgba(6,21,32,.96)",
    color: "#FFFFFF",
    border: "1px solid rgba(31,174,156,.25)"
  },
  muted: {
    ...(styles.muted || {}),
    color: "#AFC2D3"
  },
  smallLabel: {
    ...(styles.smallLabel || {}),
    color: "#7FE2CC",
    fontSize: "12px",
    letterSpacing: ".08em",
    textTransform: "uppercase",
    fontWeight: 800
  },
  // Stato / badge / pill
  statusDot: {
    ...(styles.statusDot || {}),
    boxShadow: "0 0 14px currentColor"
  },
  statusPill: {
    ...(styles.statusPill || {}),
    minHeight: "30px",
    borderRadius: "999px",
    background: "rgba(31,174,156,.10)",
    color: "#DDF8FF",
    border: "1px solid rgba(31,174,156,.22)",
    fontWeight: 800
  }

});

/* ========================================================
   FMED FASE 15D - Rifinitura finale Popup / Export / OCR / SharePoint
   Solo UI: nessuna modifica a logiche, API, Supabase o funzioni.
======================================================== */
Object.assign(styles, {
  modalOverlay: {
    ...(styles.modalOverlay || {}),
    background: "rgba(1,8,14,.82)",
    backdropFilter: "blur(14px)",
    padding: "18px",
    overflow: "auto"
  },
  modalOverlayTop: {
    ...(styles.modalOverlayTop || {}),
    background: "rgba(1,8,14,.82)",
    backdropFilter: "blur(14px)",
    padding: "18px"
  },
  modalCard: {
    ...(styles.modalCard || {}),
    width: "min(1580px, calc(100vw - 36px))",
    maxHeight: "calc(100vh - 36px)",
    padding: "24px",
    borderRadius: "26px",
    background: "linear-gradient(145deg, rgba(10,31,47,.99), rgba(5,18,30,.98))",
    border: "1px solid rgba(31,174,156,.24)",
    color: "#F7F9FB",
    boxShadow: "0 36px 110px rgba(0,0,0,.54), inset 0 1px 0 rgba(255,255,255,.04)"
  },
  modalSmallCard: {
    ...(styles.modalSmallCard || {}),
    width: "min(1180px, calc(100vw - 36px))",
    maxHeight: "calc(100vh - 36px)",
    padding: "24px",
    borderRadius: "26px",
    background: "linear-gradient(145deg, rgba(10,31,47,.99), rgba(5,18,30,.98))",
    border: "1px solid rgba(31,174,156,.24)",
    color: "#F7F9FB",
    boxShadow: "0 36px 110px rgba(0,0,0,.54)"
  },
  modalTitle: {
    ...(styles.modalTitle || {}),
    color: "#FFFFFF",
    fontSize: "28px",
    lineHeight: "34px",
    fontWeight: 850,
    letterSpacing: "-.02em",
    marginBottom: "18px"
  },
  closeBtn: {
    ...(styles.closeBtn || {}),
    background: "rgba(255,255,255,.05)",
    color: "#F7F9FB",
    border: "1px solid rgba(31,174,156,.24)",
    borderRadius: "14px",
    boxShadow: "none"
  },
  editPanel: {
    ...(styles.editPanel || {}),
    background: "linear-gradient(145deg, rgba(8,28,43,.96), rgba(5,18,30,.97))",
    border: "1px solid rgba(31,174,156,.22)",
    borderRadius: "22px",
    color: "#F7F9FB",
    boxShadow: "0 18px 44px rgba(0,0,0,.32)"
  },
  editGrid: {
    ...(styles.editGrid || {}),
    gap: "14px"
  },
  editLabel: {
    ...(styles.editLabel || {}),
    color: "#7FE2CC",
    fontSize: "11px",
    letterSpacing: ".11em",
    fontWeight: 800
  },
  detailGrid: {
    ...(styles.detailGrid || {}),
    gap: "14px"
  },
  analysisCard: {
    ...(styles.analysisCard || {}),
    background: "linear-gradient(145deg, rgba(8,28,43,.96), rgba(5,18,30,.97))",
    border: "1px solid rgba(31,174,156,.22)",
    borderRadius: "22px",
    color: "#F7F9FB"
  },
  analysisBox: {
    ...(styles.analysisBox || {}),
    background: "rgba(31,174,156,.06)",
    border: "1px solid rgba(31,174,156,.18)",
    borderRadius: "18px",
    color: "#F7F9FB",
    boxShadow: "none"
  },
  analysisDescription: {
    ...(styles.analysisDescription || {}),
    background: "rgba(31,174,156,.055)",
    border: "1px solid rgba(31,174,156,.16)",
    color: "#EAF6FF"
  },
  criteriaBox: {
    ...(styles.criteriaBox || {}),
    background: "rgba(6,21,32,.78)",
    border: "1px solid rgba(31,174,156,.20)",
    color: "#EAF6FF"
  },
  linkEditBox: {
    ...(styles.linkEditBox || {}),
    background: "rgba(31,174,156,.055)",
    border: "1px solid rgba(31,174,156,.18)",
    color: "#F7F9FB"
  },
  input: {
    ...(styles.input || {}),
    minHeight: "46px",
    borderRadius: "14px",
    background: "rgba(6,21,32,.96)",
    color: "#FFFFFF",
    border: "1px solid rgba(31,174,156,.28)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.035)"
  },
  select: {
    ...(styles.select || {}),
    minHeight: "46px",
    borderRadius: "14px",
    background: "rgba(6,21,32,.96)",
    color: "#FFFFFF",
    border: "1px solid rgba(31,174,156,.28)"
  },
  textarea: {
    ...(styles.textarea || {}),
    borderRadius: "14px",
    background: "rgba(6,21,32,.96)",
    color: "#FFFFFF",
    border: "1px solid rgba(31,174,156,.28)"
  },
  saveBtn: {
    ...(styles.saveBtn || {}),
    border: "1px solid rgba(31,174,156,.46)",
    background: "linear-gradient(135deg,#1FAE9C,#1FAE9C)",
    color: "#02131F",
    fontWeight: 900,
    boxShadow: "0 16px 34px rgba(31,174,156,.18)"
  },
  cancelBtn: {
    ...(styles.cancelBtn || {}),
    background: "rgba(255,255,255,.05)",
    color: "#F7F9FB",
    border: "1px solid rgba(31,174,156,.24)"
  },
  primaryBtn: {
    ...(styles.primaryBtn || {}),
    border: "1px solid rgba(31,174,156,.46)",
    background: "linear-gradient(135deg,#1FAE9C,#1FAE9C)",
    color: "#02131F",
    fontWeight: 900,
    boxShadow: "0 16px 34px rgba(31,174,156,.18)"
  },
  secondaryBtn: {
    ...(styles.secondaryBtn || {}),
    background: "rgba(255,255,255,.05)",
    color: "#F7F9FB",
    border: "1px solid rgba(31,174,156,.24)",
    boxShadow: "none"
  },
  docBtn: {
    ...(styles.docBtn || {}),
    minHeight: "36px",
    borderRadius: "12px",
    background: "rgba(31,174,156,.09)",
    color: "#7FE2CC",
    border: "1px solid rgba(31,174,156,.24)",
    fontWeight: 850
  },
  docBtnDisabled: {
    ...(styles.docBtnDisabled || {}),
    background: "rgba(255,255,255,.035)",
    color: "#7F98AA",
    border: "1px solid rgba(31,174,156,.12)"
  },
  exportAccordionItem: {
    ...(styles.exportAccordionItem || {}),
    background: "linear-gradient(145deg, rgba(8,28,43,.96), rgba(5,18,30,.97))",
    border: "1px solid rgba(31,174,156,.22)",
    borderRadius: "20px",
    color: "#F7F9FB",
    boxShadow: "0 18px 44px rgba(0,0,0,.28)"
  },
  exportAccordionIcon: {
    ...(styles.exportAccordionIcon || {}),
    color: "#1FAE9C",
    background: "rgba(31,174,156,.10)",
    border: "1px solid rgba(31,174,156,.22)"
  },
  selectionCounter: {
    ...(styles.selectionCounter || {}),
    background: "rgba(31,174,156,.08)",
    color: "#DDF8FF",
    border: "1px solid rgba(31,174,156,.22)",
    borderRadius: "14px"
  },
  tableWrapCompact: {
    ...(styles.tableWrapCompact || {}),
    background: "rgba(6,21,32,.72)",
    border: "1px solid rgba(31,174,156,.18)",
    borderRadius: "18px"
  },
  assetHistoryCollapsible: {
    ...(styles.assetHistoryCollapsible || {}),
    background: "linear-gradient(145deg, rgba(8,28,43,.96), rgba(5,18,30,.97))",
    border: "1px solid rgba(31,174,156,.22)",
    color: "#F7F9FB"
  },
  assetActionsGroupBlock: {
    ...(styles.assetActionsGroupBlock || {}),
    background: "rgba(31,174,156,.05)",
    border: "1px solid rgba(31,174,156,.16)",
    color: "#F7F9FB"
  },
  mutedSmall: {
    ...(styles.mutedSmall || {}),
    color: "#AFC2D3"
  }
});

// ========================================================
// FMED FASE 15E - STABILIZZAZIONE TECNICA + QUICK ACTIONS
// - Quick actions portate in alto e rese più leggibili
// - Gestione utenti spiegata meglio
// - Alert email scadenze collegato al backend
// ========================================================
Object.assign(styles, {
  fmedNeoQuickPanel: {
    ...(styles.fmedNeoQuickPanel || {}),
    minHeight: "auto",
    padding: "22px 24px",
    marginBottom: "18px",
    borderRadius: "20px",
    background: "radial-gradient(circle at 4% 0%, rgba(31,174,156,.16), transparent 34%), linear-gradient(145deg,rgba(10,35,52,.98),rgba(5,18,30,.98))",
    border: "1px solid rgba(31,174,156,.28)",
    boxShadow: "0 24px 60px rgba(0,0,0,.32), inset 0 1px 0 rgba(255,255,255,.055)"
  },
  fmedNeoQuickGrid: {
    ...(styles.fmedNeoQuickGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px",
    marginTop: "18px"
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    minHeight: "88px",
    padding: "16px 12px",
    borderRadius: "16px",
    background: "linear-gradient(145deg,rgba(12,44,65,.92),rgba(6,22,34,.94))",
    border: "1px solid rgba(31,174,156,.24)",
    color: "#EAFBFF",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.06), 0 16px 34px rgba(0,0,0,.26)"
  },
  fmedNeoQuickBtnAlert: {
    borderColor: "rgba(47,229,139,.34)",
    color: "#A8FFD4",
    background: "linear-gradient(145deg,rgba(20,67,58,.92),rgba(7,31,36,.94))"
  },
  fmedNeoLowerGrid: {
    ...(styles.fmedNeoLowerGrid || {}),
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)"
  }
});

// ========================================================
// ========================================================
Object.assign(styles, {
  fmedNeoQuickPanel: {
    ...(styles.fmedNeoQuickPanel || {}),
    order: -1,
    position: "relative",
    zIndex: 2,
    marginBottom: "14px"
  },
  fmedNeoQuickGrid: {
    ...(styles.fmedNeoQuickGrid || {}),
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))"
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    fontSize: "12px"
  },
  fmedNeoUrgentCard: {
    ...(styles.fmedNeoUrgentCard || {}),
    opacity: .96
  },
  modalOverlayTop: {
    ...(styles.modalOverlayTop || {}),
    zIndex: 20000,
    alignItems: "center",
    justifyContent: "center",
    padding: "12px"
  },
  modalOverlay: {
    ...(styles.modalOverlay || {}),
    zIndex: 15000
  },
  exportInlineGrid: {
    ...(styles.exportInlineGrid || {}),
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))"
  },
  exportActionRow: {
    ...(styles.exportActionRow || {}),
    flexWrap: "wrap",
    gap: "10px"
  },
  card: {
    ...(styles.card || {}),
    color: "#F7F9FB"
  }
});
Object.assign(loginStyles, {
  page: {
    ...(loginStyles.page || {}),
    background: "radial-gradient(circle at 74% 0%, rgba(31,174,156,.16), transparent 34%), linear-gradient(135deg,#061520 0%,#07131E 48%,#0A2234 100%)",
    minHeight: "100vh",
    padding: "18px"
  },
  card: {
    ...(loginStyles.card || {}),
    width: "min(520px, calc(100vw - 24px))",
    background: "linear-gradient(145deg, rgba(10,35,52,.98), rgba(5,18,30,.98))",
    border: "1px solid rgba(31,174,156,.24)",
    borderRadius: "28px",
    color: "#F7F9FB",
    boxShadow: "0 34px 100px rgba(0,0,0,.45)"
  },
  title: {
    ...(loginStyles.title || {}),
    color: "#FFFFFF",
    fontSize: "clamp(28px, 7vw, 42px)",
    lineHeight: 1.05
  },
  subtitle: {
    ...(loginStyles.subtitle || {}),
    color: "#C8D4DF"
  },
  kicker: {
    ...(loginStyles.kicker || {}),
    color: "#1FAE9C"
  },
  label: {
    ...(loginStyles.label || {}),
    color: "#7FE2CC"
  },
  input: {
    ...(loginStyles.input || {}),
    background: "rgba(6,21,32,.96)",
    color: "#FFFFFF",
    border: "1px solid rgba(31,174,156,.28)"
  },
  button: {
    ...(loginStyles.button || {}),
    background: "linear-gradient(135deg,#1FAE9C,#1FAE9C)",
    color: "#02131F"
  }
});

// ========================================================
// FMED RC FINAL 25/06 - Dashboard senza QR + Zoom Safe
// Migliora adattamento testi/griglie quando il browser è zoomato.
// Non modifica logiche, API, QR in scheda cespite o funzioni backend.
// ========================================================
Object.assign(styles, {
  fmedNeoQuickGrid: {
    ...(styles.fmedNeoQuickGrid || {}),
    gridTemplateColumns: "repeat(auto-fit, minmax(168px, 1fr))",
    alignItems: "stretch"
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    minHeight: "88px",
    height: "100%",
    padding: "14px 12px",
    whiteSpace: "normal",
    textAlign: "center",
    lineHeight: 1.18,
    overflow: "hidden"
  },
  sidebar: {
    ...(styles.sidebar || {}),
    overflowX: "hidden"
  },
  navBtn: {
    ...(styles.navBtn || {}),
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    lineHeight: 1.18
  },
  fmedNeoKpiGrid: {
    ...(styles.fmedNeoKpiGrid || {}),
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))"
  },
  fmedNeoMainGrid: {
    ...(styles.fmedNeoMainGrid || {}),
    gridTemplateColumns: "minmax(0, 1.35fr) minmax(320px, .95fr)"
  }
});

// ========================================================
// Ottimizza la vista smartphone/tablet, elimina riquadri introduttivi
// ridondanti e impedisce testi/pulsanti tagliati con zoom browser.
// Non modifica API, dati, Supabase, QR in scheda asset o backend.
// ========================================================
Object.assign(styles, {
  main: {
    ...(styles.main || {}),
    padding: "18px 22px 24px",
    overflowX: "hidden"
  },
  // Layout minimal: niente banner/sezioni descrittive ripetitive nelle pagine operative.
  headerBanner: {
    ...(styles.headerBanner || {}),
    display: "none"
  },
  assetHeroPanel: {
    ...(styles.assetHeroPanel || {}),
    display: "none"
  },
  fmedNeoDashboardShell: {
    ...(styles.fmedNeoDashboardShell || {}),
    width: "100%",
    maxWidth: "100%",
    overflowX: "hidden"
  },
  fmedNeoTitleWrap: {
    ...(styles.fmedNeoTitleWrap || {}),
    minWidth: 0
  },
  fmedNeoDashboardTitle: {
    ...(styles.fmedNeoDashboardTitle || {}),
    fontSize: "clamp(24px, 6vw, 34px)",
    lineHeight: 1.05,
    overflowWrap: "anywhere"
  },
  fmedNeoDashboardSubtitle: {
    ...(styles.fmedNeoDashboardSubtitle || {}),
    fontSize: "clamp(13px, 3.4vw, 15px)",
    overflowWrap: "anywhere"
  },
  fmedNeoKpiCard: {
    ...(styles.fmedNeoKpiCard || {}),
    minWidth: 0,
    overflow: "hidden"
  },
  fmedNeoKpiText: {
    ...(styles.fmedNeoKpiText || {}),
    minWidth: 0,
    overflowWrap: "anywhere"
  },
  fmedNeoKpiValue: {
    ...(styles.fmedNeoKpiValue || {}),
    fontSize: "clamp(24px, 7vw, 38px)",
    lineHeight: 1
  },
  fmedNeoQuickGrid: {
    ...(styles.fmedNeoQuickGrid || {}),
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px"
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    minHeight: "74px",
    padding: "12px 10px",
    borderRadius: "16px",
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    lineHeight: 1.15
  },
  fmedNeoChartCard: {
    ...(styles.fmedNeoChartCard || {}),
    minWidth: 0,
    overflow: "hidden"
  },
  fmedNeoChartSvg: {
    ...(styles.fmedNeoChartSvg || {}),
    width: "100%",
    maxWidth: "100%",
    height: "clamp(190px, 55vw, 280px)"
  },
  // Pagine operative: filtri/card su una colonna e senza overflow.
  assetFiltersPanel: {
    ...(styles.assetFiltersPanel || {}),
    marginTop: 0,
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden"
  }

  // Schede e modali: full-screen friendly su telefono.
  ,

  modalSmallCard: {
    ...(styles.modalSmallCard || {}),
    maxWidth: "min(560px, 96vw)"
  },
  closeBtn: {
    ...(styles.closeBtn || {}),
    minHeight: "46px",
    borderRadius: "14px"
  },
  editGrid: {
    ...(styles.editGrid || {}),
    minWidth: 0
  },
  editInput: {
    ...(styles.editInput || {}),
    minHeight: "48px",
    fontSize: "16px" // evita zoom automatico iOS sugli input
  },
  editTextarea: {
    ...(styles.editTextarea || {}),
    minHeight: "100px",
    fontSize: "16px"
  },
  editActions: {
    ...(styles.editActions || {}),
    gap: "10px",
    flexWrap: "wrap"
  },
  assetActionsGroupGrid: {
    ...(styles.assetActionsGroupGrid || {}),
    minWidth: 0
  },
  assetActionBtn: {
    ...(styles.assetActionBtn || {}),
    minHeight: "54px",
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    lineHeight: 1.16
  }
});

// ========================================================
// Non tocca logiche, API, Supabase, export o backend.
// ========================================================
Object.assign(styles, {
  fmedNeoQuickGrid: {
    ...(styles.fmedNeoQuickGrid || {}),
    gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))",
    gap: "10px"
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    minHeight: "72px",
    padding: "12px 10px",
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    lineHeight: 1.14
  },
  fmedNeoDatePill: {
    ...(styles.fmedNeoDatePill || {}),
    minWidth: 0,
    whiteSpace: "normal"
  },
  fmedNeoLivePill: {
    ...(styles.fmedNeoLivePill || {}),
    minWidth: 0,
    whiteSpace: "normal"
  },
  card: {
    ...(styles.card || {}),
    maxWidth: "100%",
    overflow: "hidden"
  },
  assetFiltersPanel: {
    ...(styles.assetFiltersPanel || {}),
    marginTop: 0,
    maxWidth: "100%",
    overflow: "hidden"
  },
  editGrid: {
    ...(styles.editGrid || {}),
    minWidth: 0
  },
  editInput: {
    ...(styles.editInput || {}),
    fontSize: "16px"
  },
  editTextarea: {
    ...(styles.editTextarea || {}),
    fontSize: "16px"
  }
});

/* ========================================================
   FMED LIGHT MODE PREMIUM V2 - 2026-06-25
   Obiettivo: Light Mode come immagine approvata.
   Intervento visuale su dashboard Neo tramite variabili CSS:
   - in Light diventa SaaS bianco/azzurro premium;
   - in Dark continua a usare le variabili dark già consolidate.
======================================================== */
Object.assign(styles, {
  themeLightVars: {
    ...(styles.themeLightVars || {}),
    "--fmed-bg": "#F7FBFD",
    "--fmed-main-bg": "linear-gradient(135deg, #F8FCFE 0%, #EEF7FA 44%, #FFFFFF 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg, #FFFFFF 0%, #F8FCFE 54%, #EDF8FB 100%)",
    "--fmed-header-bg": "linear-gradient(145deg, rgba(255,255,255,.96), rgba(249,253,254,.92))",
    "--fmed-header-inner": "linear-gradient(145deg, rgba(255,255,255,.98), rgba(248,252,254,.94))",
    "--fmed-surface": "rgba(255,255,255,.92)",
    "--fmed-surface-solid": "#FFFFFF",
    "--fmed-surface-soft": "#F2FAFC",
    "--fmed-text": "#0A1F33",
    "--fmed-muted": "#657789",
    "--fmed-subtle": "#8A9EAE",
    "--fmed-border": "rgba(10, 55, 78, .10)",
    "--fmed-accent": "#1FAE9C",
    "--fmed-accent-2": "#08798C",
    "--fmed-primary": "#078093",
    "--fmed-primary-2": "#006272",
    "--fmed-card-gradient": "linear-gradient(145deg, rgba(255,255,255,.98), rgba(248,252,254,.94))",
    "--fmed-soft-gradient": "linear-gradient(145deg, rgba(255,255,255,.96), rgba(244,251,253,.90))",
    "--fmed-btn": "linear-gradient(135deg, #078093 0%, #006272 100%)",
    "--fmed-btn-shadow": "0 18px 38px rgba(7,128,147,.18)",
    "--fmed-card-shadow": "0 18px 45px rgba(8,32,51,.075)",
    "--fmed-card-shadow-soft": "0 10px 28px rgba(8,32,51,.055)",
    "--fmed-sidebar-text": "#0A1F33",
    "--fmed-sidebar-muted": "#637587"
  },
  // Shell dashboard: in light riproduce la tavola bianca della reference;
  // in dark rimane coerente perché usa le variabili dark esistenti.
  fmedNeoDashboardShell: {
    ...(styles.fmedNeoDashboardShell || {}),
    margin: 0,
    padding: "28px 30px 32px",
    borderRadius: 0,
    background: "var(--fmed-main-bg)",
    color: "var(--fmed-text)",
    minHeight: "calc(100vh - 24px)",
    boxShadow: "none"
  },
  fmedNeoDashboardTopbar: {
    ...(styles.fmedNeoDashboardTopbar || {}),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "22px",
    marginBottom: "24px"
  },
  fmedNeoTitleIcon: {
    ...(styles.fmedNeoTitleIcon || {}),
    width: "54px",
    height: "54px",
    borderRadius: "17px",
    color: "var(--fmed-accent)",
    background: "rgba(22,185,201,.10)",
    border: "1px solid rgba(22,185,201,.18)",
    boxShadow: "0 16px 34px rgba(22,185,201,.10)"
  },
  fmedNeoDashboardTitle: {
    ...(styles.fmedNeoDashboardTitle || {}),
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: "32px",
    lineHeight: "38px",
    fontWeight: 850,
    letterSpacing: "-.03em"
  },
  fmedNeoDashboardSubtitle: {
    ...(styles.fmedNeoDashboardSubtitle || {}),
    margin: "4px 0 0",
    color: "var(--fmed-muted)",
    fontSize: "15px",
    lineHeight: 1.4
  },
  fmedNeoDatePill: {
    ...(styles.fmedNeoDatePill || {}),
    minHeight: "42px",
    padding: "0 18px",
    borderRadius: "14px",
    color: "var(--fmed-text)",
    background: "rgba(255,255,255,.82)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)"
  },
  fmedNeoLivePill: {
    ...(styles.fmedNeoLivePill || {}),
    minHeight: "42px",
    padding: "0 18px",
    borderRadius: "14px",
    color: "var(--fmed-text)",
    background: "rgba(255,255,255,.82)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)"
  },
  fmedNeoQuickPanel: {
    ...(styles.fmedNeoQuickPanel || {}),
    minHeight: "auto",
    padding: "22px",
    borderRadius: "18px",
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    color: "var(--fmed-text)"
  },
  fmedNeoKpiGrid: {
    ...(styles.fmedNeoKpiGrid || {}),
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "18px"
  },
  fmedNeoKpiCard: {
    ...(styles.fmedNeoKpiCard || {}),
    minHeight: "132px",
    padding: "20px",
    borderRadius: "18px",
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    color: "var(--fmed-text)",
    gridTemplateColumns: "58px 1fr",
    gap: "16px"
  },
  fmedNeoKpiCyan: {
    ...(styles.fmedNeoKpiCyan || {}),
    boxShadow: "var(--fmed-card-shadow)"
  },
  fmedNeoKpiGreen: {
    ...(styles.fmedNeoKpiGreen || {}),
    boxShadow: "var(--fmed-card-shadow)"
  },
  fmedNeoKpiAmber: {
    ...(styles.fmedNeoKpiAmber || {}),
    boxShadow: "var(--fmed-card-shadow)"
  },
  fmedNeoKpiBlue: {
    ...(styles.fmedNeoKpiBlue || {}),
    boxShadow: "var(--fmed-card-shadow)"
  },
  fmedNeoKpiPurple: {
    ...(styles.fmedNeoKpiPurple || {}),
    boxShadow: "var(--fmed-card-shadow)"
  },
  fmedNeoKpiIcon: {
    ...(styles.fmedNeoKpiIcon || {}),
    width: "56px",
    height: "56px",
    borderRadius: "18px",
    color: "var(--fmed-accent)",
    background: "rgba(22,185,201,.10)",
    border: "1px solid rgba(22,185,201,.16)",
    boxShadow: "none"
  },
  fmedNeoKpiValue: {
    ...(styles.fmedNeoKpiValue || {}),
    color: "var(--fmed-text)",
    fontWeight: 850
  },
  fmedNeoTrendPositive: {
    ...(styles.fmedNeoTrendPositive || {}),
    color: "#08B96D",
    fontWeight: 850
  },
  fmedNeoTrendWarning: {
    ...(styles.fmedNeoTrendWarning || {}),
    color: "#FF8A00",
    fontWeight: 850
  },
  fmedNeoTrendBlue: {
    ...(styles.fmedNeoTrendBlue || {}),
    color: "#169C8F",
    fontWeight: 850
  },
  fmedNeoTrendCyan: {
    ...(styles.fmedNeoTrendCyan || {}),
    color: "#1FAE9C",
    fontWeight: 850
  },
  fmedNeoTrendPurple: {
    ...(styles.fmedNeoTrendPurple || {}),
    color: "#7C6A45",
    fontWeight: 850
  },
  fmedNeoMainGrid: {
    ...(styles.fmedNeoMainGrid || {}),
    gridTemplateColumns: "1.6fr 1.05fr",
    gap: "18px",
    marginBottom: "18px"
  },
  fmedNeoChartCard: {
    ...(styles.fmedNeoChartCard || {}),
    minHeight: "420px",
    padding: "22px",
    borderRadius: "18px",
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    color: "var(--fmed-text)"
  },
  fmedNeoUrgentCard: {
    ...(styles.fmedNeoUrgentCard || {}),
    minHeight: "420px",
    padding: "22px",
    borderRadius: "18px",
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    color: "var(--fmed-text)"
  },
  fmedNeoMiniPanel: {
    ...(styles.fmedNeoMiniPanel || {}),
    minHeight: "220px",
    padding: "22px",
    borderRadius: "18px",
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    color: "var(--fmed-text)"
  },
  fmedNeoActivityPanel: {
    ...(styles.fmedNeoActivityPanel || {}),
    padding: "22px",
    borderRadius: "18px",
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    color: "var(--fmed-text)"
  },
  fmedNeoPanelTitle: {
    ...(styles.fmedNeoPanelTitle || {}),
    color: "var(--fmed-text)",
    fontWeight: 850
  },
  fmedNeoPanelTitleWithIcon: {
    ...(styles.fmedNeoPanelTitleWithIcon || {}),
    color: "var(--fmed-text)",
    fontWeight: 850
  },
  fmedNeoPanelSub: {
    ...(styles.fmedNeoPanelSub || {}),
    color: "var(--fmed-muted)"
  },
  fmedNeoLegend: {
    ...(styles.fmedNeoLegend || {}),
    color: "var(--fmed-text)"
  },
  fmedNeoSmallBtn: {
    ...(styles.fmedNeoSmallBtn || {}),
    minHeight: "38px",
    borderRadius: "13px",
    background: "rgba(255,255,255,.80)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    boxShadow: "var(--fmed-card-shadow-soft)"
  },
  fmedNeoSmallBtnAccent: {
    ...(styles.fmedNeoSmallBtnAccent || {}),
    minHeight: "38px",
    borderRadius: "13px",
    background: "rgba(22,185,201,.10)",
    border: "1px solid rgba(22,185,201,.18)",
    color: "var(--fmed-accent-2)",
    boxShadow: "none"
  },
  fmedNeoStatusBox: {
    ...(styles.fmedNeoStatusBox || {}),
    background: "rgba(255,255,255,.76)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    boxShadow: "none"
  },
  fmedNeoEmptyState: {
    ...(styles.fmedNeoEmptyState || {}),
    color: "var(--fmed-muted)",
    background: "rgba(255,255,255,.58)",
    border: "1px dashed rgba(10,55,78,.16)"
  },
  fmedNeoUrgentRow: {
    ...(styles.fmedNeoUrgentRow || {}),
    background: "linear-gradient(90deg, rgba(255,255,255,.92), rgba(249,253,254,.80))",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    boxShadow: "0 8px 22px rgba(8,32,51,.045)"
  },
  fmedNeoActivityRow: {
    ...(styles.fmedNeoActivityRow || {}),
    background: "rgba(255,255,255,.76)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    boxShadow: "none"
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    minHeight: "74px",
    background: "rgba(255,255,255,.78)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-accent-2)",
    boxShadow: "0 8px 20px rgba(8,32,51,.045)"
  },
  fmedNeoQuickBtnAlert: {
    ...(styles.fmedNeoQuickBtnAlert || {}),
    background: "var(--fmed-btn)",
    border: "1px solid rgba(7,128,147,.20)",
    color: "#FFFFFF",
    boxShadow: "var(--fmed-btn-shadow)"
  },
  fmedNeoSectionIcon: {
    ...(styles.fmedNeoSectionIcon || {}),
    color: "var(--fmed-accent)",
    background: "rgba(22,185,201,.10)",
    border: "1px solid rgba(22,185,201,.16)"
  },
  fmedNeoDonutInterventi: {
    ...(styles.fmedNeoDonutInterventi || {}),
    boxShadow: "inset 0 0 0 42px #FFFFFF, 0 14px 32px rgba(8,32,51,.08)",
    color: "var(--fmed-text)"
  },
  fmedNeoDonutAsset: {
    ...(styles.fmedNeoDonutAsset || {}),
    boxShadow: "inset 0 0 0 42px #FFFFFF, 0 14px 32px rgba(8,32,51,.08)",
    color: "var(--fmed-text)"
  },
  fmedNeoDonutLegend: {
    ...(styles.fmedNeoDonutLegend || {}),
    color: "var(--fmed-text)"
  },
  fmedNeoDonutLegendEnhanced: {
    ...(styles.fmedNeoDonutLegendEnhanced || {}),
    color: "var(--fmed-text)"
  },
  fmedNeoSvgChart: {
    ...(styles.fmedNeoSvgChart || {}),
    filter: "drop-shadow(0 10px 18px rgba(8,32,51,.08))"
  },
  // Sidebar premium light: gli stessi stili funzionano anche in dark grazie alle variabili.
  sidebar: {
    ...(styles.sidebar || {}),
    backgroundColor: "transparent",
    backgroundImage: "var(--fmed-sidebar-bg)",
    borderRight: "1px solid var(--fmed-border)",
    boxShadow: "18px 0 46px rgba(8,32,51,.08)"
  },
  menuIconWrap: {
    ...(styles.menuIconWrap || {}),
    background: "rgba(22,185,201,.10)",
    color: "var(--fmed-accent-2)"
  },
  fmedThemeToggleBtnLight: {
    ...(styles.fmedThemeToggleBtnLight || {}),
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    border: "1px solid rgba(7,128,147,.22)",
    boxShadow: "var(--fmed-btn-shadow)"
  }
});

/* === FMED LIGHT SIDEBAR USER CARD FIX 25/06 ===
   Solo Light Mode: corregge card utente e logout in basso nella sidebar.
   Dark Mode usa gli stili originali e resta invariata. */
Object.assign(styles, {
  sidebarUserCardLight: {
    ...(styles.sidebarUserCard || {}),
    minHeight: "58px",
    padding: "10px 12px",
    borderRadius: "16px",
    background: "linear-gradient(145deg, #FFFFFF 0%, #F5FBFD 100%)",
    border: "1px solid rgba(9, 54, 78, .10)",
    color: "#082033",
    boxShadow: "0 12px 28px rgba(8, 32, 51, .08)"
  },
  sidebarUserAvatarLight: {
    ...(styles.sidebarUserAvatar || {}),
    width: "34px",
    minWidth: "34px",
    height: "34px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, rgba(18,184,200,.16), rgba(18,184,200,.06))",
    color: "#087A8D",
    border: "1px solid rgba(18,184,200,.18)",
    boxShadow: "none"
  },
  sidebarUserNameLight: {
    ...(styles.sidebarUserName || {}),
    color: "#082033",
    fontSize: "12px",
    lineHeight: "15px",
    fontWeight: 600
  },
  sidebarUserRoleLight: {
    ...(styles.sidebarUserRole || {}),
    color: "#637287",
    fontSize: "9px",
    lineHeight: "12px",
    letterSpacing: ".08em",
    opacity: 1
  },
  sidebarRoleHintLight: {
    ...(styles.sidebarRoleHint || {}),
    display: "none"
  },
  sidebarLogoutSmallBtnLight: {
    ...(styles.sidebarLogoutSmallBtn || {}),
    width: "100%",
    minHeight: "36px",
    height: "36px",
    borderRadius: "14px",
    background: "#FFFFFF",
    color: "#082033",
    border: "1px solid rgba(9, 54, 78, .10)",
    boxShadow: "0 10px 24px rgba(8,32,51,.06)"
  }
});

// ========================================================
// FMED 26/06 - Asset: sidebar compatta + modifica rapida righe
// ========================================================
Object.assign(styles, {
  sidebarCollapsed: {
    width: "76px",
    minWidth: "76px",
    padding: "10px 8px",
    alignItems: "center"
  },
  sidebarCollapseTop: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "8px"
  },
  sidebarCollapseTopCentered: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginBottom: "8px"
  },
  sidebarCollapseBtn: {
    width: 42,
    height: 38,
    borderRadius: 14,
    border: "1px solid rgba(0,122,140,.18)",
    background: "rgba(255,255,255,.78)",
    color: "#083B46",
    cursor: "pointer",
    fontSize: 18,
    boxShadow: "0 8px 18px rgba(6,34,55,.10)"
  },
  sidebarBrandLinkCollapsed: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: 46,
    padding: 0
  },
  sidebarOnlyTitleCollapsed: {
    width: 42,
    height: 42,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,#0B7C86,#0A5968)",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 1
  },
  sidebarBottomPanelCollapsed: {
    alignItems: "center",
    width: "100%"
  },
  assetStickyCol: {
    position: "sticky",
    left: 0,
    zIndex: 3,
    background: "var(--fmed-table-head-bg, #EEF8FA)"
  },
  assetStickyColBody: {
    position: "sticky",
    left: 0,
    zIndex: 2,
    background: "var(--fmed-card-bg, #FFFFFF)"
  },
  assetQuickInput: {
    width: "100%",
    minWidth: 120,
    height: 36,
    borderRadius: 10,
    border: "1px solid rgba(9,80,92,.18)",
    background: "#FFFFFF",
    color: "#082B3A",
    padding: "0 10px",
    boxSizing: "border-box",
    fontSize: 13,
    outline: "none"
  },
  assetQuickSelect: {
    width: "100%",
    minWidth: 150,
    height: 36,
    borderRadius: 10,
    border: "1px solid rgba(9,80,92,.18)",
    background: "#FFFFFF",
    color: "#082B3A",
    padding: "0 8px",
    boxSizing: "border-box",
    fontSize: 13,
    outline: "none"
  },
  assetQuickActions: {
    display: "flex",
    gap: 6,
    alignItems: "center"
  },
  assetQuickEditBtn: {
    border: "1px solid rgba(10,88,96,.18)",
    background: "#F2FBFC",
    color: "#075363",
    borderRadius: 12,
    padding: "8px 10px",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "nowrap"
  },
  assetQuickSaveBtn: {
    border: "none",
    background: "#0B7C86",
    color: "#FFFFFF",
    borderRadius: 10,
    padding: "8px 10px",
    cursor: "pointer",
    fontSize: 13
  },
  assetQuickCancelBtn: {
    border: "1px solid rgba(180,40,55,.20)",
    background: "#FFF5F5",
    color: "#B42335",
    borderRadius: 10,
    padding: "8px 10px",
    cursor: "pointer",
    fontSize: 13
  }
});

/* ========================================================
   FMED 3.2 FASE 8/9 SAFE - EXPORT AUDIT + DASHBOARD FIX
   Solo UI e report qualità dati. Nessuna modifica DB/API.
======================================================== */
Object.assign(styles, {
  fmedNeoKpiCard: {
    ...(styles.fmedNeoKpiCard || {}),
    minHeight: "128px",
    padding: "18px 16px",
    gridTemplateColumns: "54px minmax(0, 1fr)",
    gap: "12px",
    alignItems: "center"
  },
  fmedNeoKpiText: {
    ...(styles.fmedNeoKpiText || {}),
    minWidth: 0,
    overflow: "hidden"
  },
  fmedNeoKpiMainNumber: {
    display: "block",
    fontSize: "clamp(18px, 2.2vw, 26px)",
    lineHeight: 1.05,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "var(--fmed-text, #0A1F33)",
    fontWeight: 900
  },
  fmedNeoTrendPositive: {
    ...(styles.fmedNeoTrendPositive || {}),
    gridColumn: "1 / -1",
    display: "block",
    width: "100%",
    minWidth: 0,
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    lineHeight: 1.2,
    fontSize: "12px",
    marginTop: "2px"
  },
  fmedNeoTrendWarning: {
    ...(styles.fmedNeoTrendWarning || {}),
    gridColumn: "1 / -1",
    display: "block",
    width: "100%",
    minWidth: 0,
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    lineHeight: 1.2,
    fontSize: "12px",
    marginTop: "2px"
  },
  fmedNeoTrendBlue: {
    ...(styles.fmedNeoTrendBlue || {}),
    gridColumn: "1 / -1",
    display: "block",
    width: "100%",
    minWidth: 0,
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    lineHeight: 1.2,
    fontSize: "12px",
    marginTop: "2px"
  },
  fmedNeoTrendPurple: {
    ...(styles.fmedNeoTrendPurple || {}),
    gridColumn: "1 / -1",
    display: "block",
    width: "100%",
    minWidth: 0,
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    lineHeight: 1.2,
    fontSize: "12px",
    marginTop: "2px"
  },
  fmedNeoKpiGrid: {
    ...(styles.fmedNeoKpiGrid || {}),
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    alignItems: "stretch"
  },
  fmedNeoDonutLegendEnhanced: {
    ...(styles.fmedNeoDonutLegendEnhanced || {}),
    minWidth: 0,
    overflow: "hidden"
  },
  fmedNeoDonutCenter: {
    ...(styles.fmedNeoDonutCenter || {}),
    pointerEvents: "none"
  },
  fmedAuditQualityPanel: {
    margin: "0 0 14px",
    padding: "18px",
    borderRadius: "18px",
    background: "var(--fmed-card-gradient, #FFFFFF)",
    border: "1px solid var(--fmed-border, rgba(10,55,78,.10))",
    boxShadow: "var(--fmed-card-shadow, 0 18px 45px rgba(8,32,51,.075))"
  },
  fmedAuditQualityHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "14px"
  },
  fmedAuditEyebrow: {
    fontSize: "11px",
    letterSpacing: "1.6px",
    color: "var(--fmed-primary, #078093)",
    fontWeight: 850
  },
  fmedAuditTitle: {
    margin: "4px 0 4px",
    color: "var(--fmed-text, #0A1F33)",
    fontSize: "20px",
    fontWeight: 850,
    letterSpacing: ".02em"
  },
  fmedAuditSubtitle: {
    margin: 0,
    color: "var(--fmed-muted, #657789)",
    fontSize: "13px",
    lineHeight: 1.35
  },
  fmedAuditScoreBox: {
    minWidth: "130px",
    padding: "12px 14px",
    borderRadius: "16px",
    textAlign: "center",
    color: "#FFFFFF",
    background: "linear-gradient(135deg, #078093 0%, #006272 100%)",
    boxShadow: "0 16px 32px rgba(7,128,147,.18)"
  },
  fmedAuditScoreMain: {
    display: "block",
    fontSize: "28px",
    lineHeight: 1,
    fontWeight: 900
  },
  fmedAuditMetricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "10px",
    marginBottom: "14px"
  },
  fmedAuditMetric: {
    padding: "13px",
    borderRadius: "14px",
    background: "rgba(7,128,147,.06)",
    border: "1px solid rgba(7,128,147,.12)",
    color: "var(--fmed-text, #0A1F33)"
  },
  fmedAuditMetricMain: {
    display: "block",
    fontSize: "24px",
    fontWeight: 900,
    lineHeight: 1
  },
  fmedAuditMetricSpan: {
    display: "block",
    marginTop: "7px",
    fontSize: "11px",
    letterSpacing: ".08em",
    color: "var(--fmed-muted, #657789)",
    fontWeight: 800
  },
  fmedAuditActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  }
});

Object.assign(styles, {
  card: {
    ...(styles.card || {}),
    borderRadius: 24,
    border: "1px solid var(--fmed-border, rgba(10,55,78,.12))",
    boxShadow: "0 18px 48px rgba(8,32,51,.09)",
    overflow: "hidden"
  },
  fmedNeoKpiGrid: {
    ...(styles.fmedNeoKpiGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(235px, 1fr))",
    gap: "14px",
    alignItems: "stretch",
    marginBottom: "18px"
  },
  fmedNeoKpiCard: {
    ...(styles.fmedNeoKpiCard || {}),
    minHeight: 132,
    height: "100%",
    padding: "17px 16px",
    borderRadius: 22,
    display: "grid",
    gridTemplateColumns: "56px minmax(0, 1fr)",
    gridTemplateRows: "auto auto",
    gap: "10px 13px",
    alignItems: "center",
    textAlign: "left",
    overflow: "hidden",
    boxSizing: "border-box"
  },
  fmedNeoKpiIcon: {
    ...(styles.fmedNeoKpiIcon || {}),
    width: 52,
    height: 52,
    minWidth: 52,
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  fmedNeoKpiText: {
    ...(styles.fmedNeoKpiText || {}),
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    overflow: "hidden"
  },
  fmedNeoKpiMainNumber: {
    ...(styles.fmedNeoKpiMainNumber || {}),
    display: "block",
    fontSize: "clamp(20px, 2.15vw, 28px)",
    lineHeight: 1.02,
    fontWeight: 950,
    letterSpacing: "-.035em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  fmedNeoTrendPositive: {
    ...(styles.fmedNeoTrendPositive || {}),
    gridColumn: "1 / -1",
    alignSelf: "end",
    margin: "2px 0 0",
    padding: "7px 10px",
    borderRadius: 999,
    fontSize: 12,
    lineHeight: 1.18,
    whiteSpace: "normal",
    overflowWrap: "anywhere"
  },
  fmedNeoTrendWarning: {
    ...(styles.fmedNeoTrendWarning || {}),
    gridColumn: "1 / -1",
    alignSelf: "end",
    margin: "2px 0 0",
    padding: "7px 10px",
    borderRadius: 999,
    fontSize: 12,
    lineHeight: 1.18,
    whiteSpace: "normal",
    overflowWrap: "anywhere"
  },
  fmedNeoTrendBlue: {
    ...(styles.fmedNeoTrendBlue || {}),
    gridColumn: "1 / -1",
    alignSelf: "end",
    margin: "2px 0 0",
    padding: "7px 10px",
    borderRadius: 999,
    fontSize: 12,
    lineHeight: 1.18,
    whiteSpace: "normal",
    overflowWrap: "anywhere"
  },
  fmedNeoTrendPurple: {
    ...(styles.fmedNeoTrendPurple || {}),
    gridColumn: "1 / -1",
    alignSelf: "end",
    margin: "2px 0 0",
    padding: "7px 10px",
    borderRadius: 999,
    fontSize: 12,
    lineHeight: 1.18,
    whiteSpace: "normal",
    overflowWrap: "anywhere"
  },
  fmedNeoQuickPanel: {
    ...(styles.fmedNeoQuickPanel || {}),
    borderRadius: 24,
    padding: "18px",
    marginBottom: 16,
    overflow: "hidden"
  },
  fmedNeoQuickGrid: {
    ...(styles.fmedNeoQuickGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(168px, 1fr))",
    gap: "10px"
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    minHeight: 58,
    borderRadius: 18,
    padding: "12px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    lineHeight: 1.15
  },
  fmedNeoChartCard: {
    ...(styles.fmedNeoChartCard || {}),
    borderRadius: 24,
    overflow: "hidden"
  },
  exportAccordionItem: {
    ...(styles.exportAccordionItem || {}),
    borderRadius: 22,
    overflow: "hidden",
    border: "1px solid var(--fmed-border, rgba(10,55,78,.12))",
    background: "var(--fmed-card-gradient, #FFFFFF)",
    boxShadow: "0 14px 34px rgba(8,32,51,.07)"
  },
  exportAccordionHeader: {
    ...(styles.exportAccordionHeader || {}),
    width: "100%",
    minHeight: 72,
    padding: "15px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    textAlign: "left",
    border: 0,
    borderBottom: "1px solid var(--fmed-border, rgba(10,55,78,.10))",
    background: "linear-gradient(135deg, rgba(255,255,255,.92), rgba(245,250,252,.88))",
    cursor: "pointer"
  },
  exportAccordionTitleWrap: {
    ...(styles.exportAccordionTitleWrap || {}),
    display: "flex",
    alignItems: "center",
    gap: 12,
    minWidth: 0
  },
  exportAccordionIcon: {
    ...(styles.exportAccordionIcon || {}),
    width: 42,
    height: 42,
    minWidth: 42,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    background: "rgba(7,128,147,.10)",
    border: "1px solid rgba(7,128,147,.13)"
  },
  exportAccordionTitle: {
    ...(styles.exportAccordionTitle || {}),
    fontSize: 16,
    fontWeight: 900,
    lineHeight: 1.15,
    color: "var(--fmed-text, #082033)"
  },
  exportAccordionSubtitle: {
    ...(styles.exportAccordionSubtitle || {}),
    fontSize: 12.5,
    lineHeight: 1.25,
    color: "var(--fmed-muted, #657789)",
    marginTop: 3
  },
  exportAccordionChevron: {
    ...(styles.exportAccordionChevron || {}),
    width: 36,
    height: 36,
    minWidth: 36,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(7,128,147,.08)",
    color: "var(--fmed-primary, #078093)",
    fontWeight: 900
  },
  exportAccordionBody: {
    ...(styles.exportAccordionBody || {}),
    padding: "16px",
    background: "rgba(255,255,255,.48)"
  },
  exportInlineGrid: {
    ...(styles.exportInlineGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "10px",
    alignItems: "stretch"
  },
  exportActionRow: {
    ...(styles.exportActionRow || {}),
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    alignItems: "stretch",
    marginTop: 12
  },
  primaryBtn: {
    ...(styles.primaryBtn || {}),
    minHeight: 44,
    borderRadius: 14,
    padding: "10px 15px",
    fontWeight: 850,
    letterSpacing: ".02em",
    whiteSpace: "normal"
  },
  secondaryBtn: {
    ...(styles.secondaryBtn || {}),
    minHeight: 44,
    borderRadius: 14,
    padding: "10px 15px",
    fontWeight: 800,
    whiteSpace: "normal"
  },
  miniActionBtn: {
    ...(styles.miniActionBtn || {}),
    minHeight: 36,
    borderRadius: 12,
    padding: "8px 11px",
    fontWeight: 800
  },
  select: {
    ...(styles.select || {}),
    minHeight: 44,
    borderRadius: 14,
    padding: "9px 12px",
    boxSizing: "border-box",
    width: "100%"
  },
  input: {
    ...(styles.input || {}),
    minHeight: 44,
    borderRadius: 14,
    padding: "9px 12px",
    boxSizing: "border-box",
    width: "100%"
  },
  fmedAuditQualityPanel: {
    ...(styles.fmedAuditQualityPanel || {}),
    borderRadius: 22,
    padding: "18px",
    margin: "0 0 16px",
    overflow: "hidden"
  },
  fmedAuditMetricGrid: {
    ...(styles.fmedAuditMetricGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 10
  }
});

/* ========================================================
   FMED 3.3 PATCH 2.2 - UI PULITA DASHBOARD + EXPORT
   Corregge la situazione vista negli screenshot:
   - KPI non devono più tagliare numeri/testi.
   - Export non deve avere barre teal piene su tutte le righe.
   - Accordion export deve tornare card bianca professionale.
   - Nessuna modifica a logiche, API, OCR o salvataggi.
======================================================== */
Object.assign(styles, {
  // Dashboard: griglia KPI stabile, leggibile e senza ellissi inutili.
  fmedNeoKpiGrid: {
    ...(styles.fmedNeoKpiGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(220px, 1fr))",
    gap: "14px",
    alignItems: "stretch",
    margin: "12px 0 18px"
  },
  fmedNeoKpiCard: {
    ...(styles.fmedNeoKpiCard || {}),
    minHeight: 94,
    height: "auto",
    padding: "14px 16px",
    borderRadius: 20,
    display: "grid",
    gridTemplateColumns: "50px minmax(0, 1fr)",
    gridTemplateRows: "auto auto",
    gap: "8px 12px",
    alignItems: "center",
    textAlign: "left",
    overflow: "visible",
    boxSizing: "border-box",
    background: "#FFFFFF",
    border: "1px solid rgba(10,55,78,.11)",
    boxShadow: "0 10px 26px rgba(8,32,51,.065)"
  },
  fmedNeoKpiIcon: {
    ...(styles.fmedNeoKpiIcon || {}),
    width: 48,
    height: 48,
    minWidth: 48,
    borderRadius: 17,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "none"
  },
  fmedNeoKpiText: {
    ...(styles.fmedNeoKpiText || {}),
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 3,
    overflow: "visible"
  },
  fmedNeoKpiMainNumber: {
    ...(styles.fmedNeoKpiMainNumber || {}),
    display: "block",
    fontSize: "clamp(20px, 1.65vw, 27px)",
    lineHeight: 1,
    fontWeight: 950,
    letterSpacing: "-.035em",
    whiteSpace: "nowrap",
    overflow: "visible",
    textOverflow: "clip",
    color: "#082033",
    WebkitTextFillColor: "#082033"
  },
  fmedNeoTrendPositive: {
    ...(styles.fmedNeoTrendPositive || {}),
    gridColumn: "2 / 3",
    alignSelf: "start",
    margin: 0,
    padding: "6px 9px",
    borderRadius: 999,
    fontSize: 11.5,
    lineHeight: 1.12,
    whiteSpace: "nowrap",
    overflow: "visible",
    textOverflow: "clip",
    maxWidth: "100%",
    background: "rgba(232,249,252,.95)",
    color: "#082033",
    WebkitTextFillColor: "#082033",
    border: "1px solid rgba(10,55,78,.08)"
  },
  fmedNeoTrendWarning: {
    ...(styles.fmedNeoTrendWarning || {}),
    gridColumn: "2 / 3",
    alignSelf: "start",
    margin: 0,
    padding: "6px 9px",
    borderRadius: 999,
    fontSize: 11.5,
    lineHeight: 1.12,
    whiteSpace: "nowrap",
    overflow: "visible",
    textOverflow: "clip",
    maxWidth: "100%",
    background: "rgba(255,248,230,.95)",
    color: "#082033",
    WebkitTextFillColor: "#082033",
    border: "1px solid rgba(10,55,78,.08)"
  },
  fmedNeoTrendBlue: {
    ...(styles.fmedNeoTrendBlue || {}),
    gridColumn: "2 / 3",
    alignSelf: "start",
    margin: 0,
    padding: "6px 9px",
    borderRadius: 999,
    fontSize: 11.5,
    lineHeight: 1.12,
    whiteSpace: "nowrap",
    overflow: "visible",
    textOverflow: "clip",
    maxWidth: "100%",
    background: "rgba(232,243,255,.95)",
    color: "#082033",
    WebkitTextFillColor: "#082033",
    border: "1px solid rgba(10,55,78,.08)"
  },
  fmedNeoTrendPurple: {
    ...(styles.fmedNeoTrendPurple || {}),
    gridColumn: "2 / 3",
    alignSelf: "start",
    margin: 0,
    padding: "6px 9px",
    borderRadius: 999,
    fontSize: 11.5,
    lineHeight: 1.12,
    whiteSpace: "nowrap",
    overflow: "visible",
    textOverflow: "clip",
    maxWidth: "100%",
    background: "rgba(246,237,255,.95)",
    color: "#082033",
    WebkitTextFillColor: "#082033",
    border: "1px solid rgba(10,55,78,.08)"
  },
  // Azioni rapide: compattate e proporzionate.
  fmedNeoQuickPanel: {
    ...(styles.fmedNeoQuickPanel || {}),
    borderRadius: 22,
    padding: "16px 18px",
    marginBottom: 14,
    background: "#FFFFFF",
    border: "1px solid rgba(10,55,78,.10)",
    boxShadow: "0 12px 30px rgba(8,32,51,.065)"
  },
  fmedNeoQuickGrid: {
    ...(styles.fmedNeoQuickGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(145px, 1fr))",
    gap: "10px"
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    minHeight: 52,
    borderRadius: 16,
    padding: "10px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    lineHeight: 1.1,
    background: "#FFFFFF",
    color: "#082033",
    WebkitTextFillColor: "#082033",
    border: "1px solid rgba(10,55,78,.10)",
    boxShadow: "0 8px 20px rgba(8,32,51,.055)"
  },
  fmedNeoQuickBtnAlert: {
    ...(styles.fmedNeoQuickBtnAlert || {}),
    background: "#078093",
    color: "#FFFFFF",
    WebkitTextFillColor: "#FFFFFF",
    border: "1px solid rgba(7,128,147,.18)",
    boxShadow: "0 10px 24px rgba(7,128,147,.18)"
  },
  // Export: niente più barre teal piene. Card bianche pulite.
  card: {
    ...(styles.card || {}),
    borderRadius: 24,
    padding: "20px",
    background: "#FFFFFF",
    color: "#082033",
    WebkitTextFillColor: "#082033",
    border: "1px solid rgba(10,55,78,.10)",
    boxShadow: "0 18px 48px rgba(8,32,51,.08)",
    overflow: "hidden"
  },
  exportAccordionItem: {
    ...(styles.exportAccordionItem || {}),
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid rgba(10,55,78,.11)",
    background: "#FFFFFF",
    color: "#082033",
    WebkitTextFillColor: "#082033",
    boxShadow: "0 10px 28px rgba(8,32,51,.055)"
  },
  exportAccordionHeader: {
    ...(styles.exportAccordionHeader || {}),
    width: "100%",
    minHeight: 64,
    padding: "13px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    textAlign: "left",
    border: 0,
    borderBottom: "1px solid rgba(10,55,78,.08)",
    background: "#FFFFFF",
    color: "#082033",
    WebkitTextFillColor: "#082033",
    cursor: "pointer",
    boxShadow: "none"
  },
  exportAccordionTitleWrap: {
    ...(styles.exportAccordionTitleWrap || {}),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    minWidth: 0,
    width: "100%"
  },
  exportAccordionIcon: {
    ...(styles.exportAccordionIcon || {}),
    width: 38,
    height: 38,
    minWidth: 38,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    background: "rgba(7,128,147,.08)",
    color: "#078093",
    WebkitTextFillColor: "#078093",
    border: "1px solid rgba(7,128,147,.14)",
    boxShadow: "none"
  },
  exportAccordionTitle: {
    ...(styles.exportAccordionTitle || {}),
    fontSize: 15.5,
    fontWeight: 900,
    lineHeight: 1.15,
    color: "#082033",
    WebkitTextFillColor: "#082033",
    textTransform: "uppercase",
    letterSpacing: ".02em"
  },
  exportAccordionSubtitle: {
    ...(styles.exportAccordionSubtitle || {}),
    fontSize: 12,
    lineHeight: 1.25,
    color: "#5E6E82",
    WebkitTextFillColor: "#5E6E82",
    marginTop: 3,
    textTransform: "uppercase"
  },
  exportAccordionChevron: {
    ...(styles.exportAccordionChevron || {}),
    width: 36,
    height: 36,
    minWidth: 36,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(7,128,147,.07)",
    color: "#078093",
    WebkitTextFillColor: "#078093",
    fontWeight: 900,
    border: "1px solid rgba(7,128,147,.12)",
    boxShadow: "none"
  },
  exportAccordionBody: {
    ...(styles.exportAccordionBody || {}),
    padding: "16px",
    background: "#F8FCFD",
    color: "#082033",
    WebkitTextFillColor: "#082033"
  },
  fmedAuditQualityPanel: {
    ...(styles.fmedAuditQualityPanel || {}),
    borderRadius: 22,
    padding: "18px",
    margin: "0 0 16px",
    overflow: "hidden",
    background: "#FFFFFF",
    border: "1px solid rgba(10,55,78,.10)",
    boxShadow: "0 12px 34px rgba(8,32,51,.055)"
  },
  fmedAuditMetric: {
    ...(styles.fmedAuditMetric || {}),
    background: "#FFFFFF",
    border: "1px solid rgba(10,55,78,.10)",
    borderRadius: 14,
    padding: "14px",
    color: "#082033",
    WebkitTextFillColor: "#082033",
    boxShadow: "0 8px 18px rgba(8,32,51,.045)"
  },
  fmedAuditScoreBox: {
    ...(styles.fmedAuditScoreBox || {}),
    background: "#FFFFFF",
    border: "1px solid rgba(10,55,78,.10)",
    color: "#082033",
    WebkitTextFillColor: "#082033",
    boxShadow: "0 8px 22px rgba(8,32,51,.055)"
  }
});

/* ========================================================
   FMED 3.3 PATCH 2.4 - DESIGN CLEAN LIGHT/DARK DEFINITIVO
   Pulizia finale richiesta:
   - colori coerenti in Light e Dark;
   - KPI senza barre/pillole tagliate;
   - Export allineato a sinistra e non schiacciato al centro;
   - Dashboard più simile al riferimento approvato;
   - nessuna modifica a API, OCR, DB o logiche operative.
======================================================== */
Object.assign(styles, {
  themeLightVars: {
    ...(styles.themeLightVars || {}),
    "--fmed-bg": "#F6FAFC",
    "--fmed-main-bg": "linear-gradient(180deg,#F7FBFD 0%,#EEF7FA 48%,#F8FCFE 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg,#FFFFFF 0%,#F5FBFD 58%,#EAF7FA 100%)",
    "--fmed-surface": "rgba(255,255,255,.94)",
    "--fmed-surface-solid": "#FFFFFF",
    "--fmed-surface-soft": "#F1F8FB",
    "--fmed-card-gradient": "linear-gradient(145deg,rgba(255,255,255,.98),rgba(247,252,254,.95))",
    "--fmed-soft-gradient": "linear-gradient(145deg,rgba(255,255,255,.96),rgba(240,249,252,.92))",
    "--fmed-text": "#082033",
    "--fmed-muted": "#627386",
    "--fmed-border": "rgba(9,74,92,.12)",
    "--fmed-primary": "#078093",
    "--fmed-primary-2": "#006272",
    "--fmed-accent": "#1FAE9C",
    "--fmed-accent-2": "#087A8D",
    "--fmed-btn": "linear-gradient(135deg,#078093 0%,#006272 100%)",
    "--fmed-btn-shadow": "0 16px 34px rgba(7,128,147,.18)",
    "--fmed-card-shadow": "0 16px 42px rgba(8,32,51,.075)"
  },
  themeDarkVars: {
    ...(styles.themeDarkVars || {}),
    "--fmed-bg": "#061520",
    "--fmed-main-bg": "linear-gradient(180deg,#061520 0%,#071B27 52%,#05111C 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg,#04121E 0%,#082033 55%,#05111C 100%)",
    "--fmed-surface": "rgba(8,28,43,.96)",
    "--fmed-surface-solid": "#081C2B",
    "--fmed-surface-soft": "#0B2639",
    "--fmed-card-gradient": "linear-gradient(145deg,rgba(9,32,47,.96),rgba(6,20,32,.96))",
    "--fmed-soft-gradient": "linear-gradient(145deg,rgba(10,39,58,.92),rgba(7,23,35,.94))",
    "--fmed-text": "#F4FBFF",
    "--fmed-muted": "#AFC5D4",
    "--fmed-border": "rgba(40,181,214,.22)",
    "--fmed-primary": "#1FAE9C",
    "--fmed-primary-2": "#169C8F",
    "--fmed-accent": "#1FAE9C",
    "--fmed-accent-2": "#169C8F",
    "--fmed-btn": "linear-gradient(135deg,#169C8F 0%,#0B4B7D 100%)",
    "--fmed-btn-shadow": "0 16px 36px rgba(20,103,201,.24)",
    "--fmed-card-shadow": "0 18px 42px rgba(0,0,0,.24)"
  },
  app: {
    ...(styles.app || {}),
    background: "var(--fmed-main-bg)",
    color: "var(--fmed-text)"
  },
  sidebar: {
    ...(styles.sidebar || {}),
    background: "var(--fmed-sidebar-bg)",
    borderRight: "1px solid var(--fmed-border)",
    boxShadow: "18px 0 46px rgba(8,32,51,.08)"
  },
  card: {
    ...(styles.card || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    borderRadius: 22
  },
  fmedNeoQuickPanel: {
    ...(styles.fmedNeoQuickPanel || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    borderRadius: 22,
    padding: "16px 18px",
    marginBottom: 14
  },
  fmedNeoQuickGrid: {
    ...(styles.fmedNeoQuickGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(145px, 1fr))",
    gap: 10
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    minHeight: 54,
    borderRadius: 16,
    padding: "10px 12px",
    justifyContent: "center",
    background: "var(--fmed-surface)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "0 8px 20px rgba(8,32,51,.055)"
  },
  fmedNeoQuickBtnAlert: {
    ...(styles.fmedNeoQuickBtnAlert || {}),
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    WebkitTextFillColor: "#FFFFFF",
    border: "1px solid rgba(19,184,200,.28)",
    boxShadow: "var(--fmed-btn-shadow)"
  },
  fmedNeoKpiGrid: {
    ...(styles.fmedNeoKpiGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(170px, 1fr))",
    gap: 12,
    alignItems: "stretch",
    margin: "12px 0 18px"
  },
  fmedNeoKpiCard: {
    ...(styles.fmedNeoKpiCard || {}),
    minHeight: 72,
    height: "auto",
    padding: "12px 14px",
    borderRadius: 18,
    display: "grid",
    gridTemplateColumns: "46px minmax(0, 1fr)",
    gridTemplateRows: "auto auto",
    gap: "5px 10px",
    alignItems: "center",
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "0 10px 26px rgba(8,32,51,.065)",
    overflow: "hidden"
  },
  fmedNeoKpiIcon: {
    ...(styles.fmedNeoKpiIcon || {}),
    width: 42,
    height: 42,
    minWidth: 42,
    borderRadius: 15
  },
  fmedNeoKpiText: {
    ...(styles.fmedNeoKpiText || {}),
    minWidth: 0,
    gap: 2,
    overflow: "hidden"
  },
  fmedNeoKpiMainNumber: {
    ...(styles.fmedNeoKpiMainNumber || {}),
    fontSize: "clamp(20px,1.45vw,26px)",
    lineHeight: 1,
    fontWeight: 900,
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  fmedNeoTrendPositive: {
    ...(styles.fmedNeoTrendPositive || {}),
    gridColumn: "2 / 3",
    display: "block",
    margin: 0,
    padding: 0,
    border: 0,
    background: "transparent",
    boxShadow: "none",
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)",
    fontSize: 11,
    lineHeight: 1.15,
    fontWeight: 800,
    letterSpacing: ".03em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  fmedNeoTrendWarning: {
    ...(styles.fmedNeoTrendWarning || {}),
    gridColumn: "2 / 3",
    display: "block",
    margin: 0,
    padding: 0,
    border: 0,
    background: "transparent",
    boxShadow: "none",
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)",
    fontSize: 11,
    lineHeight: 1.15,
    fontWeight: 800,
    letterSpacing: ".03em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  fmedNeoTrendBlue: {
    ...(styles.fmedNeoTrendBlue || {}),
    gridColumn: "2 / 3",
    display: "block",
    margin: 0,
    padding: 0,
    border: 0,
    background: "transparent",
    boxShadow: "none",
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)",
    fontSize: 11,
    lineHeight: 1.15,
    fontWeight: 800,
    letterSpacing: ".03em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  fmedNeoTrendPurple: {
    ...(styles.fmedNeoTrendPurple || {}),
    gridColumn: "2 / 3",
    display: "block",
    margin: 0,
    padding: 0,
    border: 0,
    background: "transparent",
    boxShadow: "none",
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)",
    fontSize: 11,
    lineHeight: 1.15,
    fontWeight: 800,
    letterSpacing: ".03em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  fmedNeoChartCard: {
    ...(styles.fmedNeoChartCard || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    borderRadius: 22
  },
  exportAccordionItem: {
    ...(styles.exportAccordionItem || {}),
    borderRadius: 18,
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "0 10px 28px rgba(8,32,51,.055)",
    overflow: "hidden",
    marginBottom: 10
  },
  exportAccordionHeader: {
    ...(styles.exportAccordionHeader || {}),
    width: "100%",
    minHeight: 62,
    padding: "13px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    textAlign: "left",
    border: 0,
    borderBottom: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    cursor: "pointer",
    boxShadow: "none"
  },
  exportAccordionTitleWrap: {
    ...(styles.exportAccordionTitleWrap || {}),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    minWidth: 0,
    width: "auto",
    flex: 1
  },
  exportAccordionIcon: {
    ...(styles.exportAccordionIcon || {}),
    width: 38,
    height: 38,
    minWidth: 38,
    borderRadius: 14,
    background: "rgba(19,184,200,.10)",
    color: "var(--fmed-primary)",
    WebkitTextFillColor: "var(--fmed-primary)",
    border: "1px solid rgba(19,184,200,.18)",
    boxShadow: "none"
  },
  exportAccordionTitle: {
    ...(styles.exportAccordionTitle || {}),
    fontSize: 15.5,
    fontWeight: 900,
    lineHeight: 1.15,
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    textTransform: "uppercase",
    letterSpacing: ".02em"
  },
  exportAccordionSubtitle: {
    ...(styles.exportAccordionSubtitle || {}),
    fontSize: 12,
    lineHeight: 1.25,
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)",
    marginTop: 3,
    textTransform: "uppercase"
  },
  exportAccordionChevron: {
    ...(styles.exportAccordionChevron || {}),
    width: 36,
    height: 36,
    minWidth: 36,
    borderRadius: 12,
    background: "rgba(19,184,200,.08)",
    color: "var(--fmed-primary)",
    WebkitTextFillColor: "var(--fmed-primary)",
    border: "1px solid rgba(19,184,200,.16)",
    boxShadow: "none"
  },
  exportAccordionBody: {
    ...(styles.exportAccordionBody || {}),
    padding: "16px",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)"
  },
  fmedAuditQualityPanel: {
    ...(styles.fmedAuditQualityPanel || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    borderRadius: 22,
    padding: "18px"
  },
  fmedAuditMetric: {
    ...(styles.fmedAuditMetric || {}),
    background: "var(--fmed-surface)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 14,
    boxShadow: "0 8px 18px rgba(8,32,51,.045)"
  },
  fmedAuditScoreBox: {
    ...(styles.fmedAuditScoreBox || {}),
    background: "var(--fmed-surface)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 16,
    boxShadow: "0 8px 22px rgba(8,32,51,.055)"
  },
  primaryBtn: {
    ...(styles.primaryBtn || {}),
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    WebkitTextFillColor: "#FFFFFF",
    border: "1px solid rgba(19,184,200,.24)",
    boxShadow: "var(--fmed-btn-shadow)"
  },
  secondaryBtn: {
    ...(styles.secondaryBtn || {}),
    background: "var(--fmed-surface)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)"
  }
});

/* CSS finale di sicurezza: corregge residui generati da vecchi inline style */

/* ========================================================
   FMED 3.3 UI ENTERPRISE - FASE 1
   Pulizia globale Light/Dark senza modificare logiche:
   - palette unica;
   - spaziature coerenti;
   - dashboard, export, tabelle, sidebar e form allineati;
   - dark mode leggibile e non “sporca”.
======================================================== */
Object.assign(styles, {
  themeLightVars: {
    ...(styles.themeLightVars || {}),
    "--fmed-bg": "#F3F8FB",
    "--fmed-main-bg": "linear-gradient(180deg,#F7FBFD 0%,#F1F7FA 48%,#F7FBFD 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg,#FFFFFF 0%,#F7FBFD 62%,#EDF7FA 100%)",
    "--fmed-surface": "rgba(255,255,255,.96)",
    "--fmed-surface-solid": "#FFFFFF",
    "--fmed-surface-soft": "#F4FAFC",
    "--fmed-card-gradient": "linear-gradient(145deg,rgba(255,255,255,.99),rgba(248,252,254,.96))",
    "--fmed-soft-gradient": "linear-gradient(145deg,rgba(255,255,255,.98),rgba(242,249,252,.94))",
    "--fmed-text": "#071E31",
    "--fmed-muted": "#5D7084",
    "--fmed-border": "rgba(7,56,75,.13)",
    "--fmed-border-strong": "rgba(7,56,75,.20)",
    "--fmed-primary": "#078093",
    "--fmed-primary-2": "#006B7C",
    "--fmed-accent": "#16AFC1",
    "--fmed-accent-2": "#087A8D",
    "--fmed-blue": "#169C8F",
    "--fmed-success": "#27B66E",
    "--fmed-warning": "#F5A623",
    "--fmed-danger": "#F45B69",
    "--fmed-btn": "linear-gradient(135deg,#078093 0%,#006B7C 100%)",
    "--fmed-btn-blue": "linear-gradient(135deg,#169C8F 0%,#165A52 100%)",
    "--fmed-card-shadow": "0 14px 34px rgba(7,30,49,.065)",
    "--fmed-card-shadow-soft": "0 8px 22px rgba(7,30,49,.045)",
    "--fmed-focus": "0 0 0 3px rgba(19,184,200,.14)"
  },
  themeDarkVars: {
    ...(styles.themeDarkVars || {}),
    "--fmed-bg": "#04111B",
    "--fmed-main-bg": "linear-gradient(180deg,#04111B 0%,#061827 52%,#04111B 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg,#03101A 0%,#071A29 60%,#04111B 100%)",
    "--fmed-surface": "rgba(8,29,44,.96)",
    "--fmed-surface-solid": "#081D2C",
    "--fmed-surface-soft": "#0B2638",
    "--fmed-card-gradient": "linear-gradient(145deg,rgba(9,31,47,.98),rgba(6,22,34,.98))",
    "--fmed-soft-gradient": "linear-gradient(145deg,rgba(10,38,58,.94),rgba(6,22,34,.96))",
    "--fmed-text": "#F7F9FB",
    "--fmed-muted": "#B4C8D8",
    "--fmed-border": "rgba(52,191,220,.20)",
    "--fmed-border-strong": "rgba(52,191,220,.32)",
    "--fmed-primary": "#1FAE9C",
    "--fmed-primary-2": "#169C8F",
    "--fmed-accent": "#1FAE9C",
    "--fmed-accent-2": "#169C8F",
    "--fmed-blue": "#169C8F",
    "--fmed-success": "#2FD37D",
    "--fmed-warning": "#FFB84D",
    "--fmed-danger": "#FF6070",
    "--fmed-btn": "linear-gradient(135deg,#169C8F 0%,#147C72 100%)",
    "--fmed-btn-blue": "linear-gradient(135deg,#169C8F 0%,#147C72 100%)",
    "--fmed-card-shadow": "0 18px 44px rgba(0,0,0,.28)",
    "--fmed-card-shadow-soft": "0 10px 26px rgba(0,0,0,.18)",
    "--fmed-focus": "0 0 0 3px rgba(22,199,217,.18)"
  },
  app: {
    ...(styles.app || {}),
    background: "var(--fmed-main-bg)",
    color: "var(--fmed-text)",
    fontFamily: "'Futura', 'Futura PT', 'Jost', 'Century Gothic', Arial, sans-serif",
    letterSpacing: ".01em"
  },
  main: {
    ...(styles.main || {}),
    background: "transparent",
    color: "var(--fmed-text)",
    padding: "24px 28px 36px"
  },
  sidebar: {
    ...(styles.sidebar || {}),
    background: "var(--fmed-sidebar-bg)",
    color: "var(--fmed-text)",
    borderRight: "1px solid var(--fmed-border)",
    boxShadow: "16px 0 42px rgba(7,30,49,.07)"
  },
  sidebarNav: {
    ...(styles.sidebarNav || {}),
    gap: 8
  },
  sidebarOnlyTitle: {
    ...(styles.sidebarOnlyTitle || {}),
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    letterSpacing: ".035em",
    fontWeight: 900
  },
  sidebarOnlySub: {
    ...(styles.sidebarOnlySub || {}),
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)",
    letterSpacing: ".18em",
    fontWeight: 800
  },
  sidebarUserCard: {
    ...(styles.sidebarUserCard || {}),
    background: "var(--fmed-surface)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    color: "var(--fmed-text)"
  },
  sidebarLogoutSmallBtn: {
    ...(styles.sidebarLogoutSmallBtn || {}),
    background: "var(--fmed-surface)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)"
  },
  headerBanner: {
    ...(styles.headerBanner || {}),
    background: "transparent",
    border: "0",
    boxShadow: "none",
    padding: "0 0 16px",
    marginBottom: 6
  },
  headerBannerContent: {
    ...(styles.headerBannerContent || {}),
    alignItems: "center",
    gap: 14
  },
  pageTitle: {
    ...(styles.pageTitle || {}),
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    fontWeight: 950,
    letterSpacing: ".02em"
  },
  pageSub: {
    ...(styles.pageSub || {}),
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)",
    fontWeight: 650
  },
  card: {
    ...(styles.card || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 22,
    boxShadow: "var(--fmed-card-shadow)"
  },
  fmedNeoDashboardShell: {
    ...(styles.fmedNeoDashboardShell || {}),
    background: "transparent",
    color: "var(--fmed-text)",
    padding: 0
  },
  fmedNeoDashboardTopbar: {
    ...(styles.fmedNeoDashboardTopbar || {}),
    alignItems: "center",
    marginBottom: 16
  },
  fmedNeoTitleIcon: {
    ...(styles.fmedNeoTitleIcon || {}),
    background: "var(--fmed-surface)",
    color: "var(--fmed-primary)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    borderRadius: 16
  },
  fmedNeoDashboardTitle: {
    ...(styles.fmedNeoDashboardTitle || {}),
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    fontWeight: 950,
    lineHeight: 1.05
  },
  fmedNeoDashboardSubtitle: {
    ...(styles.fmedNeoDashboardSubtitle || {}),
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)",
    fontWeight: 650
  },
  fmedNeoDatePill: {
    ...(styles.fmedNeoDatePill || {}),
    background: "var(--fmed-surface)",
    color: "var(--fmed-primary)",
    WebkitTextFillColor: "var(--fmed-primary)",
    border: "1px solid var(--fmed-border-strong)",
    borderRadius: 14,
    boxShadow: "var(--fmed-card-shadow-soft)"
  },
  fmedNeoLivePill: {
    ...(styles.fmedNeoLivePill || {}),
    background: "var(--fmed-surface)",
    color: "var(--fmed-primary)",
    WebkitTextFillColor: "var(--fmed-primary)",
    border: "1px solid var(--fmed-border-strong)",
    borderRadius: 14,
    boxShadow: "var(--fmed-card-shadow-soft)"
  },
  fmedNeoQuickPanel: {
    ...(styles.fmedNeoQuickPanel || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 22,
    padding: "16px 18px",
    marginBottom: 14,
    boxShadow: "var(--fmed-card-shadow)"
  },
  fmedNeoQuickGrid: {
    ...(styles.fmedNeoQuickGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(140px, 1fr))",
    gap: 10
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    minHeight: 54,
    borderRadius: 16,
    padding: "10px 12px",
    justifyContent: "center",
    background: "var(--fmed-surface)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    fontWeight: 900
  },
  fmedNeoQuickBtnAlert: {
    ...(styles.fmedNeoQuickBtnAlert || {}),
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    WebkitTextFillColor: "#FFFFFF",
    border: "1px solid rgba(19,184,200,.28)",
    boxShadow: "0 14px 28px rgba(7,128,147,.16)"
  },
  fmedNeoKpiGrid: {
    ...(styles.fmedNeoKpiGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(168px, 1fr))",
    gap: 12,
    alignItems: "stretch",
    margin: "12px 0 18px"
  },
  fmedNeoKpiCard: {
    ...(styles.fmedNeoKpiCard || {}),
    minHeight: 78,
    height: "auto",
    padding: "12px 14px",
    borderRadius: 18,
    display: "grid",
    gridTemplateColumns: "44px minmax(0, 1fr)",
    gridTemplateRows: "auto auto",
    columnGap: 10,
    rowGap: 3,
    alignItems: "center",
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden"
  },
  fmedNeoKpiIcon: {
    ...(styles.fmedNeoKpiIcon || {}),
    width: 42,
    height: 42,
    minWidth: 42,
    borderRadius: 15,
    gridRow: "1 / span 2"
  },
  fmedNeoKpiText: {
    ...(styles.fmedNeoKpiText || {}),
    minWidth: 0,
    overflow: "hidden",
    gap: 2
  },
  fmedNeoKpiMainNumber: {
    ...(styles.fmedNeoKpiMainNumber || {}),
    fontSize: "clamp(21px,1.45vw,27px)",
    lineHeight: 1,
    fontWeight: 950,
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  fmedNeoTrendPositive: {
    ...(styles.fmedNeoTrendPositive || {}),
    background: "transparent",
    border: 0,
    boxShadow: "none",
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)",
    fontSize: 11,
    fontWeight: 850,
    letterSpacing: ".02em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: 0,
    margin: 0
  },
  fmedNeoTrendWarning: {
    ...(styles.fmedNeoTrendWarning || {}),
    background: "transparent",
    border: 0,
    boxShadow: "none",
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)",
    fontSize: 11,
    fontWeight: 850,
    letterSpacing: ".02em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: 0,
    margin: 0
  },
  fmedNeoTrendBlue: {
    ...(styles.fmedNeoTrendBlue || {}),
    background: "transparent",
    border: 0,
    boxShadow: "none",
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)",
    fontSize: 11,
    fontWeight: 850,
    letterSpacing: ".02em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: 0,
    margin: 0
  },
  fmedNeoTrendPurple: {
    ...(styles.fmedNeoTrendPurple || {}),
    background: "transparent",
    border: 0,
    boxShadow: "none",
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)",
    fontSize: 11,
    fontWeight: 850,
    letterSpacing: ".02em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: 0,
    margin: 0
  },
  fmedNeoMainGrid: {
    ...(styles.fmedNeoMainGrid || {}),
    display: "grid",
    gridTemplateColumns: "1.55fr 1fr",
    gap: 14,
    alignItems: "stretch"
  },
  fmedNeoLowerGrid: {
    ...(styles.fmedNeoLowerGrid || {}),
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
    marginTop: 14
  },
  fmedNeoChartCard: {
    ...(styles.fmedNeoChartCard || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 22,
    boxShadow: "var(--fmed-card-shadow)"
  },
  fmedNeoUrgentCard: {
    ...(styles.fmedNeoUrgentCard || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 22,
    boxShadow: "var(--fmed-card-shadow)"
  },
  fmedNeoMiniPanel: {
    ...(styles.fmedNeoMiniPanel || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 22,
    boxShadow: "var(--fmed-card-shadow)"
  },
  assetFiltersPanel: {
    ...(styles.assetFiltersPanel || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 22,
    boxShadow: "var(--fmed-card-shadow)"
  },
  assetInputLarge: {
    ...(styles.assetInputLarge || {}),
    background: "var(--fmed-surface)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 14,
    minHeight: 44
  },
  assetSelectLarge: {
    ...(styles.assetSelectLarge || {}),
    background: "var(--fmed-surface)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 14,
    minHeight: 44
  },
  tableWrap: {
    ...(styles.tableWrap || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 22,
    boxShadow: "var(--fmed-card-shadow)",
    overflow: "auto"
  },
  tableWrapCompact: {
    ...(styles.tableWrapCompact || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 18,
    boxShadow: "var(--fmed-card-shadow-soft)"
  },
  table: {
    ...(styles.table || {}),
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)"
  },
  tableLarge: {
    ...(styles.tableLarge || {}),
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)"
  },
  actionBtnEdit: {
    ...(styles.actionBtnEdit || {}),
    minWidth: 88,
    whiteSpace: "nowrap",
    lineHeight: 1,
    borderRadius: 13,
    background: "var(--fmed-surface)",
    color: "var(--fmed-primary)",
    WebkitTextFillColor: "var(--fmed-primary)",
    border: "1px solid var(--fmed-border-strong)"
  },
  exportAccordionItem: {
    ...(styles.exportAccordionItem || {}),
    borderRadius: 18,
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden",
    marginBottom: 10
  },
  exportAccordionHeader: {
    ...(styles.exportAccordionHeader || {}),
    width: "100%",
    minHeight: 58,
    padding: "12px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    textAlign: "left",
    border: 0,
    background: "var(--fmed-surface)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    cursor: "pointer",
    boxShadow: "none"
  },
  exportAccordionTitleWrap: {
    ...(styles.exportAccordionTitleWrap || {}),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    minWidth: 0,
    width: "auto",
    flex: 1
  },
  exportAccordionIcon: {
    ...(styles.exportAccordionIcon || {}),
    width: 38,
    height: 38,
    minWidth: 38,
    borderRadius: 14,
    background: "rgba(19,184,200,.11)",
    color: "var(--fmed-primary)",
    WebkitTextFillColor: "var(--fmed-primary)",
    border: "1px solid rgba(19,184,200,.18)",
    boxShadow: "none"
  },
  exportAccordionTitle: {
    ...(styles.exportAccordionTitle || {}),
    fontSize: 15,
    fontWeight: 950,
    lineHeight: 1.15,
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    textTransform: "uppercase",
    letterSpacing: ".025em"
  },
  exportAccordionSubtitle: {
    ...(styles.exportAccordionSubtitle || {}),
    fontSize: 12,
    lineHeight: 1.25,
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)",
    marginTop: 3,
    textTransform: "uppercase"
  },
  exportAccordionChevron: {
    ...(styles.exportAccordionChevron || {}),
    width: 36,
    height: 36,
    minWidth: 36,
    borderRadius: 12,
    background: "rgba(19,184,200,.08)",
    color: "var(--fmed-primary)",
    WebkitTextFillColor: "var(--fmed-primary)",
    border: "1px solid rgba(19,184,200,.16)",
    boxShadow: "none"
  },
  exportAccordionBody: {
    ...(styles.exportAccordionBody || {}),
    padding: "16px",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)"
  },
  fmedAuditQualityPanel: {
    ...(styles.fmedAuditQualityPanel || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    borderRadius: 22,
    padding: "18px"
  },
  fmedAuditMetric: {
    ...(styles.fmedAuditMetric || {}),
    background: "var(--fmed-surface)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 15,
    boxShadow: "var(--fmed-card-shadow-soft)"
  },
  primaryBtn: {
    ...(styles.primaryBtn || {}),
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    WebkitTextFillColor: "#FFFFFF",
    border: "1px solid rgba(19,184,200,.24)",
    borderRadius: 14
  },
  secondaryBtn: {
    ...(styles.secondaryBtn || {}),
    background: "var(--fmed-surface)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 14
  },
  miniActionBtn: {
    ...(styles.miniActionBtn || {}),
    background: "var(--fmed-surface)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 12
  }
});

/* ========================================================
   FMED 3.4 ENTERPRISE UI - FASE 2.1 DESIGN SYSTEM CORE
   Consolidamento visuale globale: un solo set finale di variabili,
   card, bottoni, form, tabelle, sidebar e modalità Light/Dark.
   Nessuna modifica a API, OCR, Supabase, SharePoint o flussi dati.
======================================================== */
Object.assign(styles, {
  themeLightVars: {
    ...(styles.themeLightVars || {}),
    "--fmed-bg": "#F6F1E7",
    "--fmed-main-bg": "linear-gradient(180deg,#F7F2E8 0%,#FBF7EF 44%,#F1E9DB 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg,#123D52 0%,#0B2F42 54%,#082433 100%)",
    "--fmed-header-bg": "rgba(255,252,246,.92)",
    "--fmed-header-inner": "rgba(255,252,246,.96)",
    "--fmed-surface": "rgba(255,252,246,.96)",
    "--fmed-surface-solid": "#FFFCF6",
    "--fmed-surface-soft": "#F4ECDD",
    "--fmed-surface-raised": "#FFFFFF",
    "--fmed-text": "#17212B",
    "--fmed-muted": "#60707C",
    "--fmed-subtle": "#82919B",
    "--fmed-border": "rgba(23,33,43,.12)",
    "--fmed-border-strong": "rgba(23,33,43,.20)",
    "--fmed-primary": "#0F4C63",
    "--fmed-primary-2": "#0A3447",
    "--fmed-accent": "#7FA088",
    "--fmed-accent-2": "#5F8068",
    "--fmed-blue": "#165A52",
    "--fmed-success": "#2F8F67",
    "--fmed-warning": "#D48A18",
    "--fmed-danger": "#C9434F",
    "--fmed-card-gradient": "linear-gradient(145deg,rgba(255,252,246,.98),rgba(248,241,228,.96))",
    "--fmed-soft-gradient": "linear-gradient(145deg,rgba(255,252,246,.96),rgba(244,236,221,.92))",
    "--fmed-btn": "linear-gradient(135deg,#0F4C63 0%,#0A3447 100%)",
    "--fmed-btn-secondary": "linear-gradient(135deg,#7FA088 0%,#5F8068 100%)",
    "--fmed-btn-shadow": "0 14px 28px rgba(15,76,99,.18)",
    "--fmed-card-shadow": "0 16px 40px rgba(28,34,39,.10)",
    "--fmed-card-shadow-soft": "0 8px 22px rgba(28,34,39,.07)",
    "--fmed-focus": "0 0 0 3px rgba(127,160,136,.22)",
    "--fmed-sidebar-text": "#F8FAFC",
    "--fmed-sidebar-muted": "#BFD0D8"
  },
  themeDarkVars: {
    ...(styles.themeDarkVars || {}),
    "--fmed-bg": "#071018",
    "--fmed-main-bg": "linear-gradient(180deg,#071018 0%,#0B1722 50%,#071018 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg,#06111A 0%,#0A1A28 56%,#06111A 100%)",
    "--fmed-header-bg": "rgba(11,23,34,.92)",
    "--fmed-header-inner": "rgba(13,29,43,.96)",
    "--fmed-surface": "rgba(13,29,43,.96)",
    "--fmed-surface-solid": "#0D1D2B",
    "--fmed-surface-soft": "#10283A",
    "--fmed-surface-raised": "#122C40",
    "--fmed-text": "#F4F8FB",
    "--fmed-muted": "#B8CAD6",
    "--fmed-subtle": "#8FA5B4",
    "--fmed-border": "rgba(171,210,225,.18)",
    "--fmed-border-strong": "rgba(171,210,225,.30)",
    "--fmed-primary": "#6DB193",
    "--fmed-primary-2": "#165A52",
    "--fmed-accent": "#8FBFA0",
    "--fmed-accent-2": "#6FA583",
    "--fmed-blue": "#6DB193",
    "--fmed-success": "#45D48C",
    "--fmed-warning": "#FFBF55",
    "--fmed-danger": "#FF6876",
    "--fmed-card-gradient": "linear-gradient(145deg,rgba(17,39,57,.98),rgba(10,25,38,.98))",
    "--fmed-soft-gradient": "linear-gradient(145deg,rgba(20,48,70,.95),rgba(10,25,38,.96))",
    "--fmed-btn": "linear-gradient(135deg,#165A52 0%,#0B3F38 100%)",
    "--fmed-btn-secondary": "linear-gradient(135deg,#2E7D65 0%,#185641 100%)",
    "--fmed-btn-shadow": "0 16px 34px rgba(0,0,0,.28)",
    "--fmed-card-shadow": "0 18px 44px rgba(0,0,0,.34)",
    "--fmed-card-shadow-soft": "0 10px 26px rgba(0,0,0,.22)",
    "--fmed-focus": "0 0 0 3px rgba(56,191,211,.20)",
    "--fmed-sidebar-text": "#F4F8FB",
    "--fmed-sidebar-muted": "#AFC2CF"
  },
  app: {
    ...(styles.app || {}),
    background: "var(--fmed-main-bg)",
    color: "var(--fmed-text)",
    fontFamily: "'Futura', 'Futura PT', 'Jost', 'Century Gothic', Arial, sans-serif"
  },
  main: {
    ...(styles.main || {}),
    background: "transparent",
    color: "var(--fmed-text)",
    padding: "22px 26px 34px"
  },
  sidebar: {
    ...(styles.sidebar || {}),
    background: "var(--fmed-sidebar-bg)",
    color: "var(--fmed-sidebar-text)",
    borderRight: "1px solid rgba(255,255,255,.10)",
    boxShadow: "18px 0 46px rgba(0,0,0,.16)"
  },
  sidebarButton: {
    ...(styles.sidebarButton || {}),
    color: "var(--fmed-sidebar-text)",
    borderRadius: 16,
    minHeight: 46,
    padding: "11px 13px",
    fontWeight: 800,
    background: "transparent",
    border: "1px solid transparent"
  },
  sidebarButtonActive: {
    ...(styles.sidebarButtonActive || {}),
    background: "rgba(255,255,255,.14)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,.18)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.14)"
  },
  sidebarOnlyTitle: {
    ...(styles.sidebarOnlyTitle || {}),
    color: "#FFFFFF",
    WebkitTextFillColor: "#FFFFFF",
    fontWeight: 950,
    letterSpacing: ".05em"
  },
  sidebarOnlySub: {
    ...(styles.sidebarOnlySub || {}),
    color: "var(--fmed-sidebar-muted)",
    WebkitTextFillColor: "var(--fmed-sidebar-muted)",
    fontWeight: 850,
    letterSpacing: ".18em"
  },
  sidebarUserCard: {
    ...(styles.sidebarUserCard || {}),
    background: "rgba(255,255,255,.10)",
    border: "1px solid rgba(255,255,255,.14)",
    color: "#FFFFFF",
    borderRadius: 18
  },
  card: {
    ...(styles.card || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 22,
    boxShadow: "var(--fmed-card-shadow)",
    overflow: "hidden"
  },
  pageHeader: {
    ...(styles.pageHeader || {}),
    background: "var(--fmed-header-inner)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 24,
    boxShadow: "var(--fmed-card-shadow-soft)"
  },
  pageTitle: {
    ...(styles.pageTitle || {}),
    color: "var(--fmed-text)",
    fontWeight: 950
  },
  pageSubtitle: {
    ...(styles.pageSubtitle || {}),
    color: "var(--fmed-muted)"
  },
  primaryBtn: {
    ...(styles.primaryBtn || {}),
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 14,
    minHeight: 42,
    padding: "10px 15px",
    fontWeight: 850,
    boxShadow: "var(--fmed-btn-shadow)",
    whiteSpace: "nowrap"
  },
  secondaryBtn: {
    ...(styles.secondaryBtn || {}),
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-primary)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 14,
    minHeight: 42,
    padding: "10px 14px",
    fontWeight: 850,
    boxShadow: "var(--fmed-card-shadow-soft)",
    whiteSpace: "nowrap"
  },
  actionBtnEdit: {
    ...(styles.actionBtnEdit || {}),
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 12,
    minHeight: 36,
    padding: "8px 12px",
    fontWeight: 850,
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6
  },
  docBtn: {
    ...(styles.docBtn || {}),
    background: "var(--fmed-btn-secondary)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 12,
    minHeight: 34,
    padding: "7px 11px",
    whiteSpace: "nowrap",
    fontWeight: 850
  },
  docBtnDisabled: {
    ...(styles.docBtnDisabled || {}),
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-muted)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 12
  },
  input: {
    ...(styles.input || {}),
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 14,
    minHeight: 42,
    padding: "10px 12px",
    outline: "none"
  },
  select: {
    ...(styles.select || {}),
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 14,
    minHeight: 42,
    padding: "10px 12px",
    outline: "none"
  },
  textarea: {
    ...(styles.textarea || {}),
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 14,
    padding: "10px 12px",
    outline: "none"
  },
  editInput: {
    ...(styles.editInput || {}),
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 14,
    minHeight: 42,
    fontSize: 15
  },
  editTextarea: {
    ...(styles.editTextarea || {}),
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 14,
    fontSize: 15
  },
  tableWrap: {
    ...(styles.tableWrap || {}),
    background: "var(--fmed-surface)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 20,
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "auto"
  },
  tableWrapCompact: {
    ...(styles.tableWrapCompact || {}),
    background: "var(--fmed-surface)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 20,
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "auto"
  },
  table: {
    ...(styles.table || {}),
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    color: "var(--fmed-text)",
    fontSize: 13
  },
  th: {
    ...(styles.th || {}),
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-text)",
    borderBottom: "1px solid var(--fmed-border)",
    fontWeight: 900,
    letterSpacing: ".04em",
    textTransform: "uppercase",
    fontSize: 11,
    padding: "12px 10px",
    position: "sticky",
    top: 0,
    zIndex: 2,
    whiteSpace: "nowrap"
  },
  td: {
    ...(styles.td || {}),
    color: "var(--fmed-text)",
    borderBottom: "1px solid var(--fmed-border)",
    padding: "11px 10px",
    verticalAlign: "middle"
  },
  tr: {
    ...(styles.tr || {}),
    background: "transparent"
  },
  fmedNeoKpiGrid: {
    ...(styles.fmedNeoKpiGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
    gap: 14,
    alignItems: "stretch",
    marginBottom: 18
  },
  fmedNeoKpiCard: {
    ...(styles.fmedNeoKpiCard || {}),
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 22,
    boxShadow: "var(--fmed-card-shadow-soft)",
    minHeight: 128,
    padding: "16px",
    color: "var(--fmed-text)",
    overflow: "hidden"
  },
  fmedNeoKpiIcon: {
    ...(styles.fmedNeoKpiIcon || {}),
    background: "var(--fmed-soft-gradient)",
    color: "var(--fmed-primary)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 18,
    width: 50,
    height: 50,
    minWidth: 50
  },
  fmedNeoKpiMainNumber: {
    ...(styles.fmedNeoKpiMainNumber || {}),
    color: "var(--fmed-text)",
    fontSize: "clamp(25px,2.4vw,38px)",
    lineHeight: 1.04,
    fontWeight: 950
  },
  fmedNeoKpiLabel: {
    ...(styles.fmedNeoKpiLabel || {}),
    color: "var(--fmed-muted)",
    fontWeight: 850,
    letterSpacing: ".04em"
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 18,
    boxShadow: "var(--fmed-card-shadow-soft)",
    minHeight: 70,
    padding: "12px 14px",
    fontWeight: 850
  },
  fmedNeoSmallBtnAccent: {
    ...(styles.fmedNeoSmallBtnAccent || {}),
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 14,
    whiteSpace: "nowrap",
    fontWeight: 850
  },
  assetHeroPanel: {
    ...(styles.assetHeroPanel || {}),
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 26,
    boxShadow: "var(--fmed-card-shadow)",
    overflow: "hidden"
  },
  assetFiltersPanel: {
    ...(styles.assetFiltersPanel || {}),
    background: "var(--fmed-surface)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 22,
    boxShadow: "var(--fmed-card-shadow-soft)"
  },
  assetSectionTitle: {
    ...(styles.assetSectionTitle || {}),
    color: "var(--fmed-text)",
    fontWeight: 950
  },
  assetSectionSubtitle: {
    ...(styles.assetSectionSubtitle || {}),
    color: "var(--fmed-muted)"
  },
  modalOverlay: {
    ...(styles.modalOverlay || {}),
    background: "rgba(3,10,18,.62)",
    backdropFilter: "blur(10px)"
  },
  modalCard: {
    ...(styles.modalCard || {}),
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border-strong)",
    borderRadius: 24,
    boxShadow: "0 26px 80px rgba(0,0,0,.26)"
  }
});

Object.assign(styles, {
  fmedNeoHideHeader: {
    ...(styles.fmedNeoHideHeader || {}),
    display: "none"
  },
  fmedNeoDashboardShell: {
    ...(styles.fmedNeoDashboardShell || {}),
    width: "100%",
    maxWidth: "1680px",
    margin: "0 auto",
    padding: "0 0 28px",
    color: "var(--fmed-text)"
  },
  fmedNeoDashboardTopbar: {
    ...(styles.fmedNeoDashboardTopbar || {}),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    padding: "18px 20px",
    marginBottom: 16,
    borderRadius: 28,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden"
  },
  fmedNeoTitleWrap: {
    ...(styles.fmedNeoTitleWrap || {}),
    display: "flex",
    alignItems: "center",
    gap: 14,
    minWidth: 0
  },
  fmedNeoTitleIcon: {
    ...(styles.fmedNeoTitleIcon || {}),
    width: 52,
    height: 52,
    minWidth: 52,
    borderRadius: 18,
    display: "grid",
    placeItems: "center",
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    boxShadow: "var(--fmed-btn-shadow)"
  },
  fmedNeoDashboardTitle: {
    ...(styles.fmedNeoDashboardTitle || {}),
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: "clamp(24px,2.2vw,36px)",
    lineHeight: 1.03,
    fontWeight: 950,
    letterSpacing: "-.035em"
  },
  fmedNeoDashboardSubtitle: {
    ...(styles.fmedNeoDashboardSubtitle || {}),
    margin: "6px 0 0",
    color: "var(--fmed-muted)",
    fontSize: 14,
    lineHeight: 1.35,
    fontWeight: 650
  },
  fmedNeoTopActions: {
    ...(styles.fmedNeoTopActions || {}),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    flexWrap: "wrap"
  },
  fmedNeoDatePill: {
    ...(styles.fmedNeoDatePill || {}),
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 42,
    padding: "10px 13px",
    borderRadius: 999,
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    fontSize: 13,
    fontWeight: 850,
    whiteSpace: "nowrap"
  },
  fmedNeoLivePill: {
    ...(styles.fmedNeoLivePill || {}),
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 42,
    padding: "10px 13px",
    borderRadius: 999,
    background: "rgba(109,177,147,.16)",
    border: "1px solid rgba(109,177,147,.28)",
    color: "var(--fmed-text)",
    fontSize: 13,
    fontWeight: 850,
    whiteSpace: "nowrap"
  },
  fmedThemeToggleBtn: {
    ...(styles.fmedThemeToggleBtn || {}),
    minHeight: 42,
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontWeight: 900,
    whiteSpace: "nowrap"
  },
  fmedNeoQuickPanel: {
    ...(styles.fmedNeoQuickPanel || {}),
    padding: "16px",
    marginBottom: 16,
    borderRadius: 24,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden"
  },
  fmedNeoPanelTitleWithIcon: {
    ...(styles.fmedNeoPanelTitleWithIcon || {}),
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: "0 0 13px",
    color: "var(--fmed-text)",
    fontSize: 18,
    fontWeight: 950,
    letterSpacing: "-.02em"
  },
  fmedNeoSectionIcon: {
    ...(styles.fmedNeoSectionIcon || {}),
    width: 40,
    height: 40,
    minWidth: 40,
    borderRadius: 15,
    display: "grid",
    placeItems: "center",
    color: "var(--fmed-primary)",
    background: "var(--fmed-surface-soft)",
    border: "1px solid var(--fmed-border)"
  },
  fmedNeoQuickGrid: {
    ...(styles.fmedNeoQuickGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(168px,1fr))",
    gap: 12
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    minHeight: 86,
    padding: "14px 13px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 20,
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    fontWeight: 900,
    lineHeight: 1.12,
    textAlign: "center",
    overflow: "hidden"
  },
  fmedNeoQuickBtnAlert: {
    ...(styles.fmedNeoQuickBtnAlert || {}),
    background: "linear-gradient(135deg, rgba(255,193,7,.18), rgba(255,255,255,.92))",
    color: "var(--fmed-text)",
    border: "1px solid rgba(255,193,7,.35)"
  },
  fmedNeoKpiGrid: {
    ...(styles.fmedNeoKpiGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(4,minmax(0,1fr))",
    gap: 14,
    alignItems: "stretch",
    marginBottom: 16
  },
  fmedNeoKpiCard: {
    ...(styles.fmedNeoKpiCard || {}),
    minHeight: 142,
    padding: "17px",
    display: "grid",
    gridTemplateColumns: "54px minmax(0,1fr)",
    gridTemplateRows: "1fr auto",
    gap: "10px 13px",
    alignItems: "center",
    borderRadius: 24,
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    textAlign: "left",
    overflow: "hidden"
  },
  fmedNeoKpiIcon: {
    ...(styles.fmedNeoKpiIcon || {}),
    width: 54,
    height: 54,
    minWidth: 54,
    borderRadius: 19,
    display: "grid",
    placeItems: "center",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-primary)",
    border: "1px solid var(--fmed-border)"
  },
  fmedNeoKpiText: {
    ...(styles.fmedNeoKpiText || {}),
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    overflow: "hidden"
  },
  fmedNeoKpiMainNumber: {
    ...(styles.fmedNeoKpiMainNumber || {}),
    display: "block",
    color: "var(--fmed-text)",
    fontSize: "clamp(27px,2.15vw,38px)",
    lineHeight: 1,
    fontWeight: 950,
    letterSpacing: "-.04em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  fmedNeoKpiLabel: {
    ...(styles.fmedNeoKpiLabel || {}),
    color: "var(--fmed-muted)",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: ".04em",
    textTransform: "uppercase"
  },
  fmedNeoTrendPositive: {
    ...(styles.fmedNeoTrendPositive || {}),
    gridColumn: "1 / -1",
    color: "var(--fmed-success)",
    background: "rgba(109,177,147,.14)",
    border: "1px solid rgba(109,177,147,.22)",
    borderRadius: 999,
    padding: "7px 10px",
    fontSize: 12,
    fontWeight: 900,
    fontStyle: "normal",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  fmedNeoTrendWarning: {
    ...(styles.fmedNeoTrendWarning || {}),
    gridColumn: "1 / -1",
    color: "var(--fmed-warning)",
    background: "rgba(255,193,7,.14)",
    border: "1px solid rgba(255,193,7,.25)",
    borderRadius: 999,
    padding: "7px 10px",
    fontSize: 12,
    fontWeight: 900,
    fontStyle: "normal",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  fmedNeoTrendBlue: {
    ...(styles.fmedNeoTrendBlue || {}),
    gridColumn: "1 / -1",
    color: "var(--fmed-primary)",
    background: "rgba(31,78,109,.12)",
    border: "1px solid rgba(31,78,109,.20)",
    borderRadius: 999,
    padding: "7px 10px",
    fontSize: 12,
    fontWeight: 900,
    fontStyle: "normal",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  fmedNeoMainGrid: {
    ...(styles.fmedNeoMainGrid || {}),
    display: "grid",
    gridTemplateColumns: "minmax(0,1.35fr) minmax(340px,.65fr)",
    gap: 16,
    alignItems: "start"
  },
  fmedNeoPanelHeader: {
    ...(styles.fmedNeoPanelHeader || {}),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12
  },
  fmedNeoPanelTitle: {
    ...(styles.fmedNeoPanelTitle || {}),
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: 18,
    fontWeight: 950,
    letterSpacing: "-.02em"
  },
  fmedNeoPanelSub: {
    ...(styles.fmedNeoPanelSub || {}),
    margin: "4px 0 0",
    color: "var(--fmed-muted)",
    fontSize: 13,
    fontWeight: 650
  },
  fmedNeoChartPanel: {
    ...(styles.fmedNeoChartPanel || {}),
    padding: 16,
    borderRadius: 24,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden"
  },
  fmedNeoActivityPanel: {
    ...(styles.fmedNeoActivityPanel || {}),
    padding: 16,
    marginTop: 16,
    borderRadius: 24,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden"
  },
  fmedNeoActivityList: {
    ...(styles.fmedNeoActivityList || {}),
    display: "grid",
    gap: 10
  },
  fmedNeoActivityRow: {
    ...(styles.fmedNeoActivityRow || {}),
    display: "grid",
    gridTemplateColumns: "34px minmax(0,1fr) auto auto",
    gap: 10,
    alignItems: "center",
    width: "100%",
    minHeight: 54,
    padding: "10px 12px",
    borderRadius: 16,
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    textAlign: "left",
    boxShadow: "none",
    overflow: "hidden"
  },
  fmedNeoActivityDot: {
    ...(styles.fmedNeoActivityDot || {}),
    width: 30,
    height: 30,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    background: "rgba(109,177,147,.16)",
    color: "var(--fmed-success)",
    fontWeight: 950
  }
});

/* ========================================================
   FMED 3.4 ENTERPRISE UI - FASE 3 ASSET ENTERPRISE
   Solo UI/UX frontend. Nessuna modifica a API, DB, OCR, Supabase o logiche operative.
   Obiettivo: Asset professionale, filtri ordinati, tabella leggibile, light/dark coerenti.
======================================================== */
Object.assign(styles, {
  assetHeroPanel: {
    ...(styles.assetHeroPanel || {}),
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) minmax(220px,300px)",
    gap: 18,
    alignItems: "stretch",
    padding: "22px",
    margin: "0 0 18px",
    borderRadius: 28,
    background: "linear-gradient(135deg, var(--fmed-surface-solid) 0%, var(--fmed-surface-soft) 100%)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden"
  },
  assetHeroLeft: {
    ...(styles.assetHeroLeft || {}),
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 7
  },
  assetHeroEyebrow: {
    ...(styles.assetHeroEyebrow || {}),
    display: "inline-flex",
    alignItems: "center",
    width: "fit-content",
    padding: "7px 11px",
    borderRadius: 999,
    background: "rgba(31,78,109,.10)",
    color: "var(--fmed-primary)",
    border: "1px solid rgba(31,78,109,.14)",
    fontSize: 12,
    fontWeight: 950,
    letterSpacing: ".08em",
    textTransform: "uppercase"
  },
  assetHeroTitle: {
    ...(styles.assetHeroTitle || {}),
    margin: "4px 0 0",
    color: "var(--fmed-text)",
    fontSize: "clamp(28px, 3vw, 42px)",
    lineHeight: 1.02,
    fontWeight: 950,
    letterSpacing: "-.05em"
  },
  assetHeroSubtitle: {
    ...(styles.assetHeroSubtitle || {}),
    margin: 0,
    maxWidth: 760,
    color: "var(--fmed-muted)",
    fontSize: 15,
    lineHeight: 1.52,
    fontWeight: 650
  },
  assetHeroRight: {
    ...(styles.assetHeroRight || {}),
    minHeight: 132,
    padding: "18px",
    borderRadius: 24,
    background: "linear-gradient(135deg, var(--fmed-primary) 0%, var(--fmed-primary-2) 100%)",
    color: "#FFFFFF",
    boxShadow: "var(--fmed-btn-shadow)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  assetHeroBadgeNumber: {
    ...(styles.assetHeroBadgeNumber || {}),
    fontSize: "clamp(34px, 4vw, 54px)",
    lineHeight: 1,
    fontWeight: 950,
    letterSpacing: "-.05em",
    color: "#FFFFFF"
  },
  assetHeroBadgeText: {
    ...(styles.assetHeroBadgeText || {}),
    marginTop: 8,
    fontSize: 13,
    fontWeight: 950,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,.92)"
  },
  assetHeroBadgeSub: {
    ...(styles.assetHeroBadgeSub || {}),
    marginTop: 3,
    fontSize: 13,
    fontWeight: 750,
    color: "rgba(255,255,255,.76)"
  },
  assetFiltersPanel: {
    ...(styles.assetFiltersPanel || {}),
    padding: 18,
    margin: "0 0 18px",
    borderRadius: 26,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden"
  },
  assetFiltersHeader: {
    ...(styles.assetFiltersHeader || {}),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 14
  },
  assetSectionTitle: {
    ...(styles.assetSectionTitle || {}),
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: 22,
    lineHeight: 1.1,
    fontWeight: 950,
    letterSpacing: "-.03em"
  },
  assetSectionSubtitle: {
    ...(styles.assetSectionSubtitle || {}),
    margin: "6px 0 0",
    color: "var(--fmed-muted)",
    fontSize: 13,
    fontWeight: 650,
    lineHeight: 1.4
  },
  assetFilterChips: {
    ...(styles.assetFilterChips || {}),
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "flex-end"
  },
  assetChip: {
    ...(styles.assetChip || {}),
    display: "inline-flex",
    alignItems: "center",
    minHeight: 30,
    padding: "6px 10px",
    borderRadius: 999,
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    fontSize: 12,
    fontWeight: 900,
    boxShadow: "0 8px 18px rgba(8,32,51,.05)"
  },
  assetFiltersGrid: {
    ...(styles.assetFiltersGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(190px, 1fr))",
    gap: 10,
    alignItems: "stretch"
  },
  assetInputLarge: {
    ...(styles.assetInputLarge || {}),
    gridColumn: "span 2",
    width: "100%",
    minHeight: 46,
    padding: "0 14px",
    borderRadius: 16,
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    outline: "none",
    fontSize: 14,
    fontWeight: 750,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.35)"
  },
  assetSelectLarge: {
    ...(styles.assetSelectLarge || {}),
    width: "100%",
    minHeight: 46,
    padding: "0 12px",
    borderRadius: 16,
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    outline: "none",
    fontSize: 13,
    fontWeight: 800,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.30)"
  },
  assetActionsBar: {
    ...(styles.assetActionsBar || {}),
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
    paddingTop: 14,
    marginTop: 14,
    borderTop: "1px solid var(--fmed-border)"
  },
  assetPrimaryAction: {
    ...(styles.assetPrimaryAction || {}),
    minHeight: 44,
    padding: "0 16px",
    borderRadius: 15,
    border: "1px solid rgba(31,78,109,.22)",
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    fontWeight: 950,
    letterSpacing: ".01em",
    boxShadow: "var(--fmed-btn-shadow)",
    whiteSpace: "nowrap"
  },
  assetSecondaryAction: {
    ...(styles.assetSecondaryAction || {}),
    minHeight: 44,
    padding: "0 16px",
    borderRadius: 15,
    border: "1px solid rgba(109,177,147,.26)",
    background: "linear-gradient(135deg, rgba(109,177,147,.18), rgba(31,78,109,.10))",
    color: "var(--fmed-text)",
    fontWeight: 950,
    whiteSpace: "nowrap"
  },
  assetGhostAction: {
    ...(styles.assetGhostAction || {}),
    minHeight: 44,
    padding: "0 14px",
    borderRadius: 15,
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    fontWeight: 900,
    whiteSpace: "nowrap"
  },
  assetKpiGrid: {
    ...(styles.assetKpiGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 12,
    margin: "0 0 18px"
  },
  assetKpiCard: {
    ...(styles.assetKpiCard || {}),
    minHeight: 114,
    padding: 16,
    borderRadius: 22,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden"
  },
  assetKpiTop: {
    ...(styles.assetKpiTop || {}),
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    color: "var(--fmed-muted)",
    fontSize: 12,
    fontWeight: 950,
    textTransform: "uppercase",
    letterSpacing: ".08em"
  },
  assetKpiValue: {
    ...(styles.assetKpiValue || {}),
    marginTop: 12,
    color: "var(--fmed-text)",
    fontSize: 34,
    lineHeight: 1,
    fontWeight: 950,
    letterSpacing: "-.05em"
  },
  assetKpiSub: {
    ...(styles.assetKpiSub || {}),
    marginTop: 7,
    color: "var(--fmed-muted)",
    fontSize: 12,
    fontWeight: 750
  },
  assetAnalysisGrid: {
    ...(styles.assetAnalysisGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0,1fr))",
    gap: 12,
    marginBottom: 18
  },
  assetAnalysisCard: {
    ...(styles.assetAnalysisCard || {}),
    padding: 16,
    borderRadius: 22,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden"
  },
  assetAnalysisTitle: {
    ...(styles.assetAnalysisTitle || {}),
    margin: "0 0 12px",
    color: "var(--fmed-text)",
    fontSize: 16,
    fontWeight: 950
  },
  assetRankList: {
    ...(styles.assetRankList || {}),
    display: "grid",
    gap: 8
  },
  assetRankRow: {
    ...(styles.assetRankRow || {}),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    minHeight: 34,
    padding: "7px 10px",
    borderRadius: 12,
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    fontSize: 13,
    fontWeight: 800
  },
  assetTableCard: {
    ...(styles.assetTableCard || {}),
    padding: 16,
    borderRadius: 26,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    overflow: "hidden"
  },
  assetListHeader: {
    ...(styles.assetListHeader || {}),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 12
  },
  assetTableTitle: {
    ...(styles.assetTableTitle || {}),
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: 22,
    fontWeight: 950,
    letterSpacing: "-.03em"
  },
  assetTableSubtitle: {
    ...(styles.assetTableSubtitle || {}),
    margin: "6px 0 0",
    color: "var(--fmed-muted)",
    fontSize: 13,
    fontWeight: 650
  },
  assetCloseBtn: {
    ...(styles.assetCloseBtn || {}),
    minHeight: 40,
    padding: "0 14px",
    borderRadius: 14,
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    fontWeight: 900
  },
  tableWrap: {
    ...(styles.tableWrap || {}),
    maxHeight: "68vh",
    overflow: "auto",
    borderRadius: 20,
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)"
  },
  tableLarge: {
    ...(styles.tableLarge || {}),
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    minWidth: 1180,
    color: "var(--fmed-text)"
  },
  thLarge: {
    ...(styles.thLarge || {}),
    position: "sticky",
    top: 0,
    zIndex: 3,
    padding: "13px 12px",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-muted)",
    borderBottom: "1px solid var(--fmed-border)",
    fontSize: 11,
    lineHeight: 1.1,
    fontWeight: 950,
    textTransform: "uppercase",
    letterSpacing: ".08em",
    whiteSpace: "nowrap",
    textAlign: "left"
  },
  tdLarge: {
    ...(styles.tdLarge || {}),
    padding: "12px",
    borderBottom: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    fontSize: 13,
    fontWeight: 700,
    verticalAlign: "middle",
    maxWidth: 280,
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  tdCodeLarge: {
    ...(styles.tdCodeLarge || {}),
    padding: "12px",
    borderBottom: "1px solid var(--fmed-border)",
    color: "var(--fmed-primary)",
    fontSize: 13,
    fontWeight: 950,
    whiteSpace: "nowrap"
  },
  trClickable: {
    ...(styles.trClickable || {}),
    cursor: "pointer",
    background: "var(--fmed-surface-solid)",
    transition: "background .15s ease, transform .15s ease"
  },
  assetStickyCol: {
    ...(styles.assetStickyCol || {}),
    position: "sticky",
    left: 0,
    zIndex: 5,
    background: "var(--fmed-surface-soft)",
    boxShadow: "8px 0 18px rgba(8,32,51,.05)"
  },
  assetStickyColBody: {
    ...(styles.assetStickyColBody || {}),
    position: "sticky",
    left: 0,
    zIndex: 2,
    background: "var(--fmed-surface-solid)",
    boxShadow: "8px 0 18px rgba(8,32,51,.05)"
  },
  assetQuickInput: {
    ...(styles.assetQuickInput || {}),
    minHeight: 36,
    width: "100%",
    borderRadius: 12,
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    padding: "0 10px",
    fontSize: 13,
    fontWeight: 750
  },
  assetQuickSelect: {
    ...(styles.assetQuickSelect || {}),
    minHeight: 36,
    borderRadius: 12,
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    padding: "0 10px",
    fontSize: 12,
    fontWeight: 850
  },
  assetQuickSaveBtn: {
    ...(styles.assetQuickSaveBtn || {}),
    minHeight: 36,
    borderRadius: 12,
    border: "1px solid rgba(109,177,147,.28)",
    background: "linear-gradient(135deg, #2E8B57, #6DB193)",
    color: "#FFFFFF",
    fontWeight: 950,
    whiteSpace: "nowrap"
  },
  assetQuickEditBtn: {
    ...(styles.assetQuickEditBtn || {}),
    minHeight: 36,
    borderRadius: 12,
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-primary)",
    fontWeight: 950,
    whiteSpace: "nowrap"
  },
  assetQuickCancelBtn: {
    ...(styles.assetQuickCancelBtn || {}),
    minHeight: 36,
    borderRadius: 12,
    border: "1px solid rgba(220,53,69,.24)",
    background: "rgba(220,53,69,.10)",
    color: "#DC3545",
    fontWeight: 950,
    whiteSpace: "nowrap"
  }
});

/* ========================================================
   FMED 3.5 ENTERPRISE - FASE 3.5.1 DASHBOARD / HEADER / SIDEBAR
   Solo UI: nessuna modifica a logiche, API, OCR, Supabase o backend.
   Obiettivo: consolidare la dashboard come control room enterprise.
======================================================== */
Object.assign(styles, {
  themeLightVars: {
    ...(styles.themeLightVars || {}),
    "--fmed-bg": "#F5F1E8",
    "--fmed-main-bg": "linear-gradient(180deg, #F5F1E8 0%, #FBF8F1 52%, #EFE7DA 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg, #173B50 0%, #1F4E6D 55%, #16394E 100%)",
    "--fmed-header-bg": "rgba(252,250,245,.94)",
    "--fmed-header-inner": "linear-gradient(145deg, rgba(252,250,245,.98), rgba(247,242,232,.94))",
    "--fmed-surface": "rgba(252,250,245,.96)",
    "--fmed-surface-solid": "#FCFAF5",
    "--fmed-surface-soft": "#F7F2E8",
    "--fmed-text": "#1F2933",
    "--fmed-muted": "#667085",
    "--fmed-subtle": "#8793A0",
    "--fmed-border": "rgba(31,78,109,.14)",
    "--fmed-accent": "#8DAA91",
    "--fmed-accent-2": "#1F4E6D",
    "--fmed-primary": "#1F4E6D",
    "--fmed-primary-2": "#16394E",
    "--fmed-card-gradient": "linear-gradient(145deg, rgba(252,250,245,.98), rgba(247,242,232,.95))",
    "--fmed-soft-gradient": "linear-gradient(145deg, rgba(255,255,255,.84), rgba(247,242,232,.92))",
    "--fmed-btn": "linear-gradient(135deg, #1F4E6D 0%, #16394E 100%)",
    "--fmed-btn-shadow": "0 16px 34px rgba(31,78,109,.20)",
    "--fmed-card-shadow": "0 18px 45px rgba(31,78,109,.12)",
    "--fmed-card-shadow-soft": "0 10px 24px rgba(31,78,109,.08)",
    "--fmed-sidebar-text": "#F8FAFC",
    "--fmed-sidebar-muted": "rgba(248,250,252,.68)"
  },
  themeDarkVars: {
    ...(styles.themeDarkVars || {}),
    "--fmed-bg": "#0D141A",
    "--fmed-main-bg": "linear-gradient(180deg, #0D141A 0%, #111B23 52%, #0B1117 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg, #071117 0%, #0E2734 58%, #071117 100%)",
    "--fmed-header-bg": "rgba(13,20,26,.92)",
    "--fmed-header-inner": "linear-gradient(145deg, rgba(20,31,40,.94), rgba(13,20,26,.94))",
    "--fmed-surface": "rgba(20,31,40,.92)",
    "--fmed-surface-solid": "#141F28",
    "--fmed-surface-soft": "#101A22",
    "--fmed-text": "#EEF5F7",
    "--fmed-muted": "#A9B8C2",
    "--fmed-subtle": "#7F95A3",
    "--fmed-border": "rgba(238,245,247,.10)",
    "--fmed-accent": "#6DB193",
    "--fmed-accent-2": "#6DB193",
    "--fmed-primary": "#6DB193",
    "--fmed-primary-2": "#1FAE9C",
    "--fmed-card-gradient": "linear-gradient(145deg, rgba(20,31,40,.96), rgba(16,26,34,.94))",
    "--fmed-soft-gradient": "linear-gradient(145deg, rgba(23,38,49,.92), rgba(15,25,33,.92))",
    "--fmed-btn": "linear-gradient(135deg, #1FAE9C 0%, #0E6F7F 100%)",
    "--fmed-btn-shadow": "0 16px 34px rgba(56,191,211,.14)",
    "--fmed-card-shadow": "0 18px 45px rgba(0,0,0,.28)",
    "--fmed-card-shadow-soft": "0 10px 24px rgba(0,0,0,.22)",
    "--fmed-sidebar-text": "#EEF5F7",
    "--fmed-sidebar-muted": "rgba(238,245,247,.62)"
  },
  // Layout principale / sidebar / header
  appShell: {
    ...(styles.appShell || {}),
    background: "var(--fmed-main-bg)",
    color: "var(--fmed-text)"
  },
  sidebar: {
    ...(styles.sidebar || {}),
    background: "var(--fmed-sidebar-bg)",
    color: "var(--fmed-sidebar-text)",
    borderRight: "1px solid rgba(255,255,255,.08)",
    boxShadow: "12px 0 36px rgba(0,0,0,.16)"
  },
  sidebarBrand: {
    ...(styles.sidebarBrand || {}),
    color: "var(--fmed-sidebar-text)",
    borderBottom: "1px solid rgba(255,255,255,.10)"
  },
  sidebarBrandPage: {
    ...(styles.sidebarBrandPage || {}),
    color: "var(--fmed-sidebar-muted)",
    letterSpacing: ".08em",
    textTransform: "uppercase"
  },
  sidebarButton: {
    ...(styles.sidebarButton || {}),
    minHeight: 44,
    borderRadius: 14,
    color: "var(--fmed-sidebar-text)",
    background: "transparent",
    border: "1px solid transparent",
    fontWeight: 820
  },
  sidebarButtonActive: {
    ...(styles.sidebarButtonActive || {}),
    color: "#FFFFFF",
    background: "linear-gradient(135deg, rgba(255,255,255,.16), rgba(255,255,255,.08))",
    border: "1px solid rgba(255,255,255,.18)",
    boxShadow: "0 14px 26px rgba(0,0,0,.16)"
  },
  sidebarBottomPanel: {
    ...(styles.sidebarBottomPanel || {}),
    background: "rgba(255,255,255,.09)",
    border: "1px solid rgba(255,255,255,.12)",
    color: "var(--fmed-sidebar-text)"
  },
  headerBanner: {
    ...(styles.headerBanner || {}),
    borderRadius: 24,
    background: "var(--fmed-header-inner)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    color: "var(--fmed-text)",
    overflow: "hidden"
  },
  pageHeader: {
    ...(styles.pageHeader || {}),
    borderRadius: 22,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)"
  },
  // Dashboard 3.5
  fmedNeoDashboardShell: {
    ...(styles.fmedNeoDashboardShell || {}),
    display: "flex",
    flexDirection: "column",
    gap: 18,
    padding: "4px 0 18px",
    color: "var(--fmed-text)"
  },
  fmedNeoDashboardTopbar: {
    ...(styles.fmedNeoDashboardTopbar || {}),
    padding: "22px 24px",
    borderRadius: 28,
    background: "linear-gradient(135deg, var(--fmed-primary) 0%, var(--fmed-primary-2) 100%)",
    border: "1px solid rgba(255,255,255,.14)",
    boxShadow: "0 22px 54px rgba(31,78,109,.24)",
    color: "#FFFFFF",
    minHeight: 126,
    overflow: "hidden",
    alignItems: "center"
  },
  fmedNeoDashboardTitle: {
    ...(styles.fmedNeoDashboardTitle || {}),
    color: "#FFFFFF",
    fontSize: "clamp(26px, 2.4vw, 38px)",
    lineHeight: 1.04,
    letterSpacing: "-.04em",
    margin: 0,
    fontWeight: 950
  },
  fmedNeoDashboardSubtitle: {
    ...(styles.fmedNeoDashboardSubtitle || {}),
    color: "rgba(255,255,255,.82)",
    fontSize: 14,
    lineHeight: 1.45,
    maxWidth: 760
  },
  fmedNeoDatePill: {
    ...(styles.fmedNeoDatePill || {}),
    minHeight: 40,
    borderRadius: 999,
    color: "#FFFFFF",
    background: "rgba(255,255,255,.14)",
    border: "1px solid rgba(255,255,255,.22)",
    boxShadow: "none",
    whiteSpace: "nowrap"
  },
  fmedNeoLivePill: {
    ...(styles.fmedNeoLivePill || {}),
    minHeight: 40,
    borderRadius: 999,
    color: "#FFFFFF",
    background: "rgba(109,177,147,.28)",
    border: "1px solid rgba(255,255,255,.22)",
    boxShadow: "none",
    whiteSpace: "nowrap"
  },
  fmedNeoKpiGrid: {
    ...(styles.fmedNeoKpiGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(190px, 1fr))",
    gap: 14,
    alignItems: "stretch"
  },
  fmedNeoKpiCard: {
    ...(styles.fmedNeoKpiCard || {}),
    minHeight: 138,
    height: "100%",
    borderRadius: 24,
    padding: 18,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    color: "var(--fmed-text)",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "56px minmax(0,1fr)",
    gap: "12px 14px",
    alignItems: "center"
  },
  fmedNeoKpiIcon: {
    ...(styles.fmedNeoKpiIcon || {}),
    width: 52,
    height: 52,
    minWidth: 52,
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.35)"
  },
  fmedNeoKpiMainNumber: {
    ...(styles.fmedNeoKpiMainNumber || {}),
    fontSize: "clamp(28px, 2.5vw, 42px)",
    lineHeight: .96,
    fontWeight: 950,
    letterSpacing: "-.045em",
    color: "var(--fmed-text)",
    whiteSpace: "nowrap"
  },
  fmedNeoKpiLabel: {
    ...(styles.fmedNeoKpiLabel || {}),
    color: "var(--fmed-muted)",
    fontSize: 12,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: ".08em",
    whiteSpace: "normal"
  },
  fmedNeoTrendPositive: {
    ...(styles.fmedNeoTrendPositive || {}),
    color: "#2E8B57",
    background: "rgba(109,177,147,.14)",
    border: "1px solid rgba(109,177,147,.24)"
  },
  fmedNeoTrendWarning: {
    ...(styles.fmedNeoTrendWarning || {}),
    color: "#B26A00",
    background: "rgba(255,193,7,.14)",
    border: "1px solid rgba(255,193,7,.28)"
  },
  fmedNeoMainGrid: {
    ...(styles.fmedNeoMainGrid || {}),
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.55fr) minmax(320px, .9fr)",
    gap: 16,
    alignItems: "stretch"
  },
  fmedNeoChartPanel: {
    ...(styles.fmedNeoChartPanel || {}),
    borderRadius: 26,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden"
  },
  fmedNeoQuickPanel: {
    ...(styles.fmedNeoQuickPanel || {}),
    borderRadius: 26,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden"
  },
  fmedNeoQuickGrid: {
    ...(styles.fmedNeoQuickGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 10
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    minHeight: 78,
    borderRadius: 18,
    padding: "13px 12px",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "none",
    fontWeight: 900,
    whiteSpace: "normal",
    lineHeight: 1.15
  },
  fmedNeoSmallBtn: {
    ...(styles.fmedNeoSmallBtn || {}),
    borderRadius: 14,
    minHeight: 38,
    padding: "0 14px",
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-primary)",
    border: "1px solid var(--fmed-border)",
    fontWeight: 900
  },
  fmedNeoSmallBtnAccent: {
    ...(styles.fmedNeoSmallBtnAccent || {}),
    borderRadius: 14,
    minHeight: 38,
    padding: "0 14px",
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,.16)",
    boxShadow: "var(--fmed-btn-shadow)",
    fontWeight: 900
  },
  fmedNeoPanelTitle: {
    ...(styles.fmedNeoPanelTitle || {}),
    color: "var(--fmed-text)",
    fontWeight: 950,
    letterSpacing: "-.025em"
  },
  fmedNeoPanelSub: {
    ...(styles.fmedNeoPanelSub || {}),
    color: "var(--fmed-muted)",
    lineHeight: 1.35
  },
  fmedNeoActivityPanel: {
    ...(styles.fmedNeoActivityPanel || {}),
    borderRadius: 26,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)"
  },
  fmedNeoActivityRow: {
    ...(styles.fmedNeoActivityRow || {}),
    borderRadius: 16,
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)"
  },
  // Card / tabelle base: pulizia globale leggera
  card: {
    ...(styles.card || {}),
    borderRadius: 24,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    color: "var(--fmed-text)",
    overflow: "hidden"
  },
  tableWrap: {
    ...(styles.tableWrap || {}),
    borderRadius: 20,
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    boxShadow: "var(--fmed-card-shadow-soft)"
  },
  table: {
    ...(styles.table || {}),
    color: "var(--fmed-text)",
    borderCollapse: "separate",
    borderSpacing: 0
  },
  th: {
    ...(styles.th || {}),
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-text)",
    borderBottom: "1px solid var(--fmed-border)",
    fontWeight: 950,
    letterSpacing: ".04em",
    textTransform: "uppercase",
    fontSize: 11
  },
  td: {
    ...(styles.td || {}),
    color: "var(--fmed-text)",
    borderBottom: "1px solid var(--fmed-border)"
  },
  primaryBtn: {
    ...(styles.primaryBtn || {}),
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,.14)",
    boxShadow: "var(--fmed-btn-shadow)",
    borderRadius: 14,
    fontWeight: 900
  },
  secondaryBtn: {
    ...(styles.secondaryBtn || {}),
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-primary)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 14,
    fontWeight: 900
  },
  actionBtnEdit: {
    ...(styles.actionBtnEdit || {}),
    whiteSpace: "nowrap",
    minHeight: 34,
    borderRadius: 12,
    fontWeight: 900
  }

});

/* ========================================================
   FMED 3.5 ENTERPRISE - FASE 3.5.2 ASSET / TABELLE / MODALI
   Solo UI frontend. Nessuna modifica a logiche, API, OCR, Supabase o backend.
   Obiettivo: inventario, filtri, tabelle e popup con stile enterprise uniforme.
======================================================== */
Object.assign(styles, {
  assetHeroPanel: {
    ...(styles.assetHeroPanel || {}),
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(240px, 320px)",
    gap: 18,
    alignItems: "stretch",
    padding: 22,
    margin: "0 0 18px",
    borderRadius: 30,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    color: "var(--fmed-text)",
    overflow: "hidden"
  },
  assetHeroEyebrow: {
    ...(styles.assetHeroEyebrow || {}),
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    width: "fit-content",
    padding: "7px 11px",
    borderRadius: 999,
    background: "color-mix(in srgb, var(--fmed-primary) 12%, transparent)",
    border: "1px solid color-mix(in srgb, var(--fmed-primary) 20%, transparent)",
    color: "var(--fmed-primary)",
    fontSize: 11,
    fontWeight: 950,
    letterSpacing: ".10em",
    textTransform: "uppercase"
  },
  assetHeroTitle: {
    ...(styles.assetHeroTitle || {}),
    margin: "6px 0 0",
    color: "var(--fmed-text)",
    fontSize: "clamp(30px, 3vw, 44px)",
    lineHeight: 1,
    fontWeight: 950,
    letterSpacing: "-.055em"
  },
  assetHeroSubtitle: {
    ...(styles.assetHeroSubtitle || {}),
    margin: 0,
    maxWidth: 760,
    color: "var(--fmed-muted)",
    fontSize: 14,
    lineHeight: 1.55,
    fontWeight: 650
  },
  assetHeroRight: {
    ...(styles.assetHeroRight || {}),
    minHeight: 136,
    padding: 20,
    borderRadius: 26,
    background: "linear-gradient(135deg, var(--fmed-primary) 0%, var(--fmed-primary-2) 100%)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,.18)",
    boxShadow: "var(--fmed-btn-shadow)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  assetHeroBadgeNumber: {
    ...(styles.assetHeroBadgeNumber || {}),
    fontSize: "clamp(36px, 4.5vw, 58px)",
    lineHeight: .95,
    fontWeight: 950,
    letterSpacing: "-.06em",
    color: "#FFFFFF"
  },
  assetHeroBadgeText: {
    ...(styles.assetHeroBadgeText || {}),
    marginTop: 10,
    color: "rgba(255,255,255,.92)",
    fontSize: 12,
    fontWeight: 950,
    letterSpacing: ".10em",
    textTransform: "uppercase"
  },
  assetHeroBadgeSub: {
    ...(styles.assetHeroBadgeSub || {}),
    color: "rgba(255,255,255,.74)",
    fontSize: 13,
    fontWeight: 750
  },
  assetFiltersPanel: {
    ...(styles.assetFiltersPanel || {}),
    padding: 18,
    margin: "0 0 18px",
    borderRadius: 28,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    color: "var(--fmed-text)",
    overflow: "hidden"
  },
  assetFiltersHeader: {
    ...(styles.assetFiltersHeader || {}),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 14
  },
  assetSectionTitle: {
    ...(styles.assetSectionTitle || {}),
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: 22,
    lineHeight: 1.1,
    fontWeight: 950,
    letterSpacing: "-.035em"
  },
  assetSectionSubtitle: {
    ...(styles.assetSectionSubtitle || {}),
    margin: "6px 0 0",
    color: "var(--fmed-muted)",
    fontSize: 13,
    lineHeight: 1.45,
    fontWeight: 650
  },
  assetFilterChips: {
    ...(styles.assetFilterChips || {}),
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "flex-end"
  },
  assetChip: {
    ...(styles.assetChip || {}),
    display: "inline-flex",
    alignItems: "center",
    minHeight: 30,
    padding: "6px 10px",
    borderRadius: 999,
    background: "var(--fmed-surface-solid)",
    border: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    boxShadow: "0 8px 20px rgba(8,32,51,.05)",
    fontSize: 12,
    fontWeight: 900,
    whiteSpace: "nowrap"
  },
  assetFiltersGrid: {
    ...(styles.assetFiltersGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(180px, 1fr))",
    gap: 10,
    alignItems: "stretch"
  },
  assetInputLarge: {
    ...(styles.assetInputLarge || {}),
    gridColumn: "span 2",
    width: "100%",
    minHeight: 46,
    padding: "0 14px",
    borderRadius: 16,
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    outline: "none",
    fontSize: 14,
    fontWeight: 760
  },
  assetSelectLarge: {
    ...(styles.assetSelectLarge || {}),
    width: "100%",
    minHeight: 46,
    padding: "0 12px",
    borderRadius: 16,
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    outline: "none",
    fontSize: 13,
    fontWeight: 820
  },
  assetActionsBar: {
    ...(styles.assetActionsBar || {}),
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
    paddingTop: 14,
    marginTop: 14,
    borderTop: "1px solid var(--fmed-border)"
  },
  assetPrimaryAction: {
    ...(styles.assetPrimaryAction || {}),
    minHeight: 44,
    padding: "0 16px",
    borderRadius: 15,
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,.16)",
    boxShadow: "var(--fmed-btn-shadow)",
    fontWeight: 950,
    whiteSpace: "nowrap"
  },
  assetSecondaryAction: {
    ...(styles.assetSecondaryAction || {}),
    minHeight: 44,
    padding: "0 16px",
    borderRadius: 15,
    background: "color-mix(in srgb, var(--fmed-accent) 20%, var(--fmed-surface-solid))",
    color: "var(--fmed-text)",
    border: "1px solid color-mix(in srgb, var(--fmed-accent) 26%, var(--fmed-border))",
    fontWeight: 950,
    whiteSpace: "nowrap"
  },
  assetGhostAction: {
    ...(styles.assetGhostAction || {}),
    minHeight: 44,
    padding: "0 14px",
    borderRadius: 15,
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    fontWeight: 900,
    whiteSpace: "nowrap"
  },
  assetKpiGrid: {
    ...(styles.assetKpiGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 12,
    margin: "0 0 18px"
  },
  assetKpiCard: {
    ...(styles.assetKpiCard || {}),
    minHeight: 118,
    padding: 16,
    borderRadius: 24,
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden"
  },
  assetKpiValue: {
    ...(styles.assetKpiValue || {}),
    marginTop: 12,
    color: "var(--fmed-text)",
    fontSize: 36,
    lineHeight: 1,
    fontWeight: 950,
    letterSpacing: "-.055em"
  },
  assetTableCard: {
    ...(styles.assetTableCard || {}),
    padding: 16,
    borderRadius: 28,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    color: "var(--fmed-text)",
    overflow: "hidden"
  },
  assetListHeader: {
    ...(styles.assetListHeader || {}),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 12
  },
  assetTableTitle: {
    ...(styles.assetTableTitle || {}),
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: 22,
    fontWeight: 950,
    letterSpacing: "-.035em"
  },
  assetTableSubtitle: {
    ...(styles.assetTableSubtitle || {}),
    margin: "6px 0 0",
    color: "var(--fmed-muted)",
    fontSize: 13,
    fontWeight: 650
  },
  tableWrap: {
    ...(styles.tableWrap || {}),
    maxHeight: "68vh",
    overflow: "auto",
    borderRadius: 22,
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    boxShadow: "var(--fmed-card-shadow-soft)"
  },
  tableWrapCompact: {
    ...(styles.tableWrapCompact || {}),
    maxHeight: "62vh",
    overflow: "auto",
    borderRadius: 20,
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)"
  },
  table: {
    ...(styles.table || {}),
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    color: "var(--fmed-text)"
  },
  tableLarge: {
    ...(styles.tableLarge || {}),
    width: "100%",
    minWidth: 1180,
    borderCollapse: "separate",
    borderSpacing: 0,
    color: "var(--fmed-text)"
  },
  th: {
    ...(styles.th || {}),
    position: "sticky",
    top: 0,
    zIndex: 3,
    padding: "13px 12px",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-muted)",
    borderBottom: "1px solid var(--fmed-border)",
    fontSize: 11,
    lineHeight: 1.1,
    fontWeight: 950,
    textTransform: "uppercase",
    letterSpacing: ".08em",
    whiteSpace: "nowrap",
    textAlign: "left"
  },
  thLarge: {
    ...(styles.thLarge || {}),
    position: "sticky",
    top: 0,
    zIndex: 3,
    padding: "13px 12px",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-muted)",
    borderBottom: "1px solid var(--fmed-border)",
    fontSize: 11,
    lineHeight: 1.1,
    fontWeight: 950,
    textTransform: "uppercase",
    letterSpacing: ".08em",
    whiteSpace: "nowrap",
    textAlign: "left"
  },
  td: {
    ...(styles.td || {}),
    padding: "12px",
    borderBottom: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    fontSize: 13,
    fontWeight: 700,
    verticalAlign: "middle"
  },
  tdLarge: {
    ...(styles.tdLarge || {}),
    padding: "12px",
    borderBottom: "1px solid var(--fmed-border)",
    color: "var(--fmed-text)",
    fontSize: 13,
    fontWeight: 700,
    verticalAlign: "middle",
    maxWidth: 280,
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  tdCodeLarge: {
    ...(styles.tdCodeLarge || {}),
    padding: "12px",
    borderBottom: "1px solid var(--fmed-border)",
    color: "var(--fmed-primary)",
    fontSize: 13,
    fontWeight: 950,
    whiteSpace: "nowrap"
  },
  tr: {
    ...(styles.tr || {}),
    background: "var(--fmed-surface-solid)"
  },
  trClickable: {
    ...(styles.trClickable || {}),
    cursor: "pointer",
    background: "var(--fmed-surface-solid)",
    transition: "background .15s ease, transform .15s ease"
  },
  actionBtnEdit: {
    ...(styles.actionBtnEdit || {}),
    minHeight: 34,
    minWidth: 92,
    padding: "0 12px",
    borderRadius: 12,
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,.16)",
    boxShadow: "0 8px 20px rgba(31,78,109,.16)",
    fontSize: 12,
    fontWeight: 950,
    whiteSpace: "nowrap"
  },
  rowActionGroup: {
    ...(styles.rowActionGroup || {}),
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexWrap: "nowrap"
  },
  docBtn: {
    ...(styles.docBtn || {}),
    minHeight: 34,
    borderRadius: 12,
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-primary)",
    border: "1px solid var(--fmed-border)",
    fontSize: 12,
    fontWeight: 900,
    whiteSpace: "nowrap"
  },
  docBtnDisabled: {
    ...(styles.docBtnDisabled || {}),
    minHeight: 34,
    borderRadius: 12,
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-muted)",
    border: "1px solid var(--fmed-border)",
    fontSize: 12,
    fontWeight: 900,
    whiteSpace: "nowrap"
  },
  modalOverlay: {
    ...(styles.modalOverlay || {}),
    background: "rgba(4, 12, 18, .58)",
    backdropFilter: "blur(8px)"
  },
  modalOverlayTop: {
    ...(styles.modalOverlayTop || {}),
    background: "rgba(4, 12, 18, .58)",
    backdropFilter: "blur(8px)"
  },
  modalCard: {
    ...(styles.modalCard || {}),
    width: "min(1180px, calc(100vw - 34px))",
    maxHeight: "calc(100vh - 34px)",
    borderRadius: 28,
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "0 30px 90px rgba(0,0,0,.26)",
    overflow: "auto"
  },
  modalSmallCard: {
    ...(styles.modalSmallCard || {}),
    width: "min(920px, calc(100vw - 34px))",
    maxHeight: "calc(100vh - 34px)",
    borderRadius: 28,
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "0 30px 90px rgba(0,0,0,.26)",
    overflow: "auto"
  },
  modalTitle: {
    ...(styles.modalTitle || {}),
    color: "var(--fmed-text)",
    fontSize: "clamp(22px, 2.2vw, 32px)",
    lineHeight: 1.05,
    fontWeight: 950,
    letterSpacing: "-.045em"
  },
  editGrid: {
    ...(styles.editGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 14,
    minWidth: 0
  },
  editInput: {
    ...(styles.editInput || {}),
    minHeight: 44,
    borderRadius: 14,
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    fontSize: 15,
    fontWeight: 700
  },
  editTextarea: {
    ...(styles.editTextarea || {}),
    minHeight: 96,
    borderRadius: 14,
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    fontSize: 15,
    fontWeight: 700
  },
  select: {
    ...(styles.select || {}),
    minHeight: 42,
    borderRadius: 13,
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    fontWeight: 780
  },
  input: {
    ...(styles.input || {}),
    minHeight: 42,
    borderRadius: 13,
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    fontWeight: 720
  }
});

/* ========================================================
   FMED 3.5 ENTERPRISE - FASE 3.5.3
   INTERVENTI / COSTI / SCADENZE / INFRASTRUTTURE
   Solo UI frontend. Non modifica API, backend, OCR, Supabase o logiche.
======================================================== */
Object.assign(styles, {
  interventiFilters: {
    ...(styles.interventiFilters || {}),
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: 12,
    alignItems: "end",
    padding: 18,
    margin: "16px 0 14px",
    borderRadius: 24,
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden"
  },
  periodoBadge: {
    ...(styles.periodoBadge || {}),
    minHeight: 38,
    padding: "0 14px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    border: "1px solid color-mix(in srgb, var(--fmed-primary) 24%, var(--fmed-border))",
    background: "color-mix(in srgb, var(--fmed-primary) 9%, var(--fmed-surface-solid))",
    color: "var(--fmed-primary)",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: ".045em",
    textTransform: "uppercase",
    whiteSpace: "nowrap"
  },
  contoEconomicoBox: {
    ...(styles.contoEconomicoBox || {}),
    margin: "18px 0 16px",
    padding: 20,
    borderRadius: 28,
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    boxShadow: "var(--fmed-card-shadow)",
    overflow: "hidden"
  },
  contoEconomicoHeader: {
    ...(styles.contoEconomicoHeader || {}),
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 16
  },
  contoEconomicoTitle: {
    ...(styles.contoEconomicoTitle || {}),
    margin: 0,
    color: "var(--fmed-text)",
    fontSize: "clamp(18px, 1.8vw, 24px)",
    lineHeight: 1.08,
    fontWeight: 950,
    letterSpacing: "-.035em"
  },
  contoEconomicoGrid: {
    ...(styles.contoEconomicoGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))",
    gap: 12
  },
  contoEconomicoCard: {
    ...(styles.contoEconomicoCard || {}),
    minHeight: 104,
    padding: "15px 16px",
    borderRadius: 20,
    background: "var(--fmed-surface-solid)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "0 12px 30px rgba(8,32,51,.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10
  },
  contoEconomicoLabel: {
    ...(styles.contoEconomicoLabel || {}),
    color: "var(--fmed-muted)",
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: ".08em",
    textTransform: "uppercase"
  },
  contoEconomicoValue: {
    ...(styles.contoEconomicoValue || {}),
    color: "var(--fmed-text)",
    fontSize: "clamp(20px, 2.1vw, 30px)",
    lineHeight: 1,
    fontWeight: 950,
    letterSpacing: "-.04em",
    overflowWrap: "anywhere"
  },
  scadenzeHeader: {
    ...(styles.scadenzeHeader || {}),
    padding: 20,
    borderRadius: 28,
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    boxShadow: "var(--fmed-card-shadow)"
  },
  scadenzeActions: {
    ...(styles.scadenzeActions || {}),
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    margin: "14px 0 18px"
  },
  exportAccordionItem: {
    ...(styles.exportAccordionItem || {}),
    borderRadius: 22,
    background: "var(--fmed-card-gradient)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "hidden"
  },
  exportAccordionHeader: {
    ...(styles.exportAccordionHeader || {}),
    minHeight: 68,
    padding: "14px 16px",
    background: "transparent",
    color: "var(--fmed-text)",
    border: 0,
    width: "100%"
  },
  exportAccordionTitleWrap: {
    ...(styles.exportAccordionTitleWrap || {}),
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    gap: 12
  },
  exportAccordionIcon: {
    ...(styles.exportAccordionIcon || {}),
    width: 42,
    height: 42,
    minWidth: 42,
    borderRadius: 15,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "color-mix(in srgb, var(--fmed-primary) 11%, var(--fmed-surface-solid))",
    color: "var(--fmed-primary)",
    border: "1px solid color-mix(in srgb, var(--fmed-primary) 20%, var(--fmed-border))"
  },
  exportAccordionTitle: {
    ...(styles.exportAccordionTitle || {}),
    color: "var(--fmed-text)",
    fontSize: 15,
    fontWeight: 950,
    letterSpacing: "-.02em",
    lineHeight: 1.15
  },
  exportAccordionSubtitle: {
    ...(styles.exportAccordionSubtitle || {}),
    color: "var(--fmed-muted)",
    fontSize: 12,
    fontWeight: 750,
    lineHeight: 1.25
  },
  exportAccordionChevron: {
    ...(styles.exportAccordionChevron || {}),
    borderRadius: 999,
    padding: "8px 11px",
    background: "var(--fmed-surface-soft)",
    color: "var(--fmed-primary)",
    border: "1px solid var(--fmed-border)",
    fontSize: 12,
    fontWeight: 900,
    whiteSpace: "nowrap"
  },
  dangerButton: {
    ...(styles.dangerButton || {}),
    minHeight: 38,
    padding: "0 12px",
    borderRadius: 13,
    background: "linear-gradient(135deg, #DC3545 0%, #A92331 100%)",
    color: "#FFFFFF",
    border: "1px solid rgba(220,53,69,.36)",
    fontWeight: 900,
    boxShadow: "0 12px 24px rgba(220,53,69,.18)",
    whiteSpace: "nowrap"
  },
  dangerBtn: {
    ...(styles.dangerBtn || {}),
    minHeight: 42,
    padding: "0 16px",
    borderRadius: 14,
    background: "linear-gradient(135deg, #DC3545 0%, #A92331 100%)",
    color: "#FFFFFF",
    border: "1px solid rgba(220,53,69,.36)",
    fontWeight: 900,
    boxShadow: "0 12px 24px rgba(220,53,69,.18)",
    whiteSpace: "nowrap"
  },
  tableWrapCompact: {
    ...(styles.tableWrapCompact || {}),
    borderRadius: 22,
    border: "1px solid var(--fmed-border)",
    background: "var(--fmed-surface-solid)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    overflow: "auto"
  }
});

/* ========================================================
   FMED 4.0 ENTERPRISE STABLE - DARK THEME NO AZZURRO
   Rimuove azzurro/cyan acceso dalla Dark Mode e uniforma tutto
   su blu petrolio/grafite. Solo UI frontend.
======================================================== */
Object.assign(styles, {
  themeDarkVars: {
    ...(styles.themeDarkVars || {}),
    "--fmed-bg": "#08131E",
    "--fmed-main-bg": "linear-gradient(180deg, #08131E 0%, #0B1623 52%, #07111B 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg, #07111B 0%, #0B1623 62%, #07111B 100%)",
    "--fmed-header-bg": "linear-gradient(145deg, rgba(12,29,43,.96), rgba(8,19,30,.94))",
    "--fmed-header-inner": "linear-gradient(145deg, rgba(18,33,49,.98), rgba(11,22,35,.96))",
    "--fmed-surface": "rgba(18,33,49,.94)",
    "--fmed-surface-solid": "#122131",
    "--fmed-surface-soft": "#0E1B29",
    "--fmed-text": "#F4F8FB",
    "--fmed-muted": "#AAB8C5",
    "--fmed-subtle": "#7F91A2",
    "--fmed-border": "rgba(148, 173, 194, .18)",
    "--fmed-accent": "#0F7C90",
    "--fmed-accent-2": "#0B5F70",
    "--fmed-primary": "#0F7C90",
    "--fmed-primary-2": "#0A5968",
    "--fmed-card-gradient": "linear-gradient(145deg, rgba(18,33,49,.98), rgba(10,23,36,.96))",
    "--fmed-soft-gradient": "linear-gradient(145deg, rgba(18,33,49,.92), rgba(11,22,35,.88))",
    "--fmed-btn": "linear-gradient(135deg, #0F7C90 0%, #0A5968 100%)",
    "--fmed-btn-shadow": "0 18px 38px rgba(7, 42, 55, .34)",
    "--fmed-card-shadow": "0 18px 45px rgba(0, 0, 0, .28)",
    "--fmed-card-shadow-soft": "0 10px 28px rgba(0, 0, 0, .22)",
    "--fmed-sidebar-text": "#F4F8FB",
    "--fmed-sidebar-muted": "#AAB8C5"
  },
  themeLightVars: {
    ...(styles.themeLightVars || {}),
    "--fmed-primary": "#0F7C90",
    "--fmed-primary-2": "#0A5968",
    "--fmed-accent": "#0F7C90",
    "--fmed-accent-2": "#0A5968",
    "--fmed-btn": "linear-gradient(135deg, #0F7C90 0%, #0A5968 100%)"
  }
});

/* ========================================================
   FMED 4.0 ENTERPRISE - DARK REFERENCE PALETTE FINAL
   Palette identica alla reference: niente azzurro acceso, solo
   navy/grafite, petrolio, bianco. Testi e controlli in maiuscolo.
   Migliora proporzioni tabella infrastrutture e azioni in riga.
   Solo UI frontend: nessuna modifica API, Supabase, OCR o backend.
======================================================== */
Object.assign(styles, {
  themeDarkVars: {
    ...(styles.themeDarkVars || {}),
    "--fmed-bg": "#06121D",
    "--fmed-main-bg": "linear-gradient(180deg, #06121D 0%, #081724 52%, #050E17 100%)",
    "--fmed-sidebar-bg": "linear-gradient(180deg, #06111B 0%, #0A1825 58%, #06111B 100%)",
    "--fmed-header-bg": "linear-gradient(145deg, rgba(8,22,34,.98), rgba(5,15,25,.97))",
    "--fmed-header-inner": "linear-gradient(145deg, rgba(12,31,46,.98), rgba(7,19,31,.97))",
    "--fmed-surface": "rgba(12,31,46,.95)",
    "--fmed-surface-solid": "#0C1F2E",
    "--fmed-surface-soft": "#081A28",
    "--fmed-text": "#F6FBFF",
    "--fmed-muted": "#B7C6D4",
    "--fmed-subtle": "#7F92A2",
    "--fmed-border": "rgba(88, 126, 151, .30)",
    "--fmed-accent": "#147D86",
    "--fmed-accent-2": "#0D636C",
    "--fmed-primary": "#147D86",
    "--fmed-primary-2": "#0D636C",
    "--fmed-card-gradient": "linear-gradient(145deg, rgba(13,34,50,.98), rgba(7,20,32,.98))",
    "--fmed-soft-gradient": "linear-gradient(145deg, rgba(11,28,42,.96), rgba(7,19,31,.94))",
    "--fmed-btn": "linear-gradient(135deg, #147D86 0%, #0D636C 100%)",
    "--fmed-btn-secondary": "linear-gradient(145deg, rgba(11,28,42,.98), rgba(7,19,31,.98))",
    "--fmed-btn-shadow": "0 16px 32px rgba(0, 0, 0, .30)",
    "--fmed-card-shadow": "0 20px 48px rgba(0, 0, 0, .34)",
    "--fmed-card-shadow-soft": "0 12px 28px rgba(0, 0, 0, .24)",
    "--fmed-sidebar-text": "#F6FBFF",
    "--fmed-sidebar-muted": "#B7C6D4"
  },
  // Proporzioni generali più vicine alla reference
  sidebar: {
    ...(styles.sidebar || {}),
    background: "var(--fmed-sidebar-bg)",
    borderRight: "1px solid var(--fmed-border)",
    textTransform: "uppercase"
  },
  sidebarTitle: {
    ...(styles.sidebarTitle || {}),
    color: "var(--fmed-text)",
    fontWeight: 950,
    letterSpacing: ".02em",
    textTransform: "uppercase",
    textShadow: "none"
  },
  sidebarSubtitle: {
    ...(styles.sidebarSubtitle || {}),
    color: "var(--fmed-muted)",
    fontWeight: 800,
    letterSpacing: ".16em",
    textTransform: "uppercase"
  },
  menuBtn: {
    ...(styles.menuBtn || {}),
    minHeight: 48,
    borderRadius: 10,
    color: "var(--fmed-text)",
    background: "rgba(12,31,46,.58)",
    border: "1px solid rgba(88,126,151,.20)",
    fontSize: 14,
    fontWeight: 850,
    letterSpacing: ".04em",
    textTransform: "uppercase"
  },
  menuBtnActive: {
    ...(styles.menuBtnActive || {}),
    background: "linear-gradient(90deg, rgba(20,125,134,.96), rgba(13,99,108,.82))",
    border: "1px solid rgba(20,125,134,.58)",
    boxShadow: "0 14px 30px rgba(0,0,0,.28), inset 4px 0 0 rgba(255,255,255,.20)",
    color: "#FFFFFF"
  },
  // Hero/KPI operativi
  assetHeroPanel: {
    ...(styles.assetHeroPanel || {}),
    minHeight: 146,
    padding: "24px 28px",
    borderRadius: 22,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    color: "var(--fmed-text)",
    textTransform: "uppercase"
  },
  assetHeroTitle: {
    ...(styles.assetHeroTitle || {}),
    color: "var(--fmed-text)",
    fontSize: 34,
    lineHeight: "40px",
    fontWeight: 950,
    letterSpacing: ".015em",
    textTransform: "uppercase",
    textShadow: "none"
  },
  assetHeroSubtitle: {
    ...(styles.assetHeroSubtitle || {}),
    color: "var(--fmed-muted)",
    fontSize: 13,
    lineHeight: "20px",
    fontWeight: 750,
    textTransform: "uppercase"
  },
  assetHeroEyebrow: {
    ...(styles.assetHeroEyebrow || {}),
    color: "#7CC7CD",
    fontSize: 11,
    lineHeight: "16px",
    fontWeight: 950,
    letterSpacing: ".12em",
    textTransform: "uppercase"
  },
  assetHeroBadgeText: {
    ...(styles.assetHeroBadgeText || {}),
    minWidth: 210,
    minHeight: 92,
    borderRadius: 18,
    background: "linear-gradient(145deg, rgba(20,125,134,.88), rgba(13,99,108,.78))",
    color: "#FFFFFF",
    border: "1px solid rgba(124,199,205,.22)",
    boxShadow: "0 18px 34px rgba(0,0,0,.24)",
    textTransform: "uppercase"
  },
  assetHeroBadgeNumber: {
    ...(styles.assetHeroBadgeNumber || {}),
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: "38px",
    fontWeight: 950
  },
  assetHeroBadgeSub: {
    ...(styles.assetHeroBadgeSub || {}),
    color: "rgba(255,255,255,.72)",
    fontSize: 11,
    fontWeight: 850,
    letterSpacing: ".08em",
    textTransform: "uppercase"
  },
  assetKpiGrid: {
    ...(styles.assetKpiGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: 12,
    marginTop: 14
  },
  assetKpiCard: {
    ...(styles.assetKpiCard || {}),
    minHeight: 104,
    padding: "16px 18px",
    borderRadius: 16,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow-soft)",
    color: "var(--fmed-text)",
    textTransform: "uppercase"
  },
  assetKpiValue: {
    ...(styles.assetKpiValue || {}),
    color: "var(--fmed-text)",
    fontSize: 32,
    lineHeight: "36px",
    fontWeight: 950
  },
  assetKpiLabel: {
    ...(styles.assetKpiLabel || {}),
    color: "var(--fmed-muted)",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: ".07em",
    textTransform: "uppercase"
  },
  // Tabelle più proporzionate e testo maiuscolo
  assetTableCard: {
    ...(styles.assetTableCard || {}),
    padding: 16,
    borderRadius: 18,
    background: "var(--fmed-card-gradient)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "var(--fmed-card-shadow)",
    color: "var(--fmed-text)",
    textTransform: "uppercase"
  },
  tableWrap: {
    ...(styles.tableWrap || {}),
    maxHeight: "64vh",
    borderRadius: 14,
    background: "#0A1B29",
    border: "1px solid var(--fmed-border)",
    overflow: "auto"
  },
  tableWrapCompact: {
    ...(styles.tableWrapCompact || {}),
    maxHeight: "60vh",
    borderRadius: 14,
    background: "#0A1B29",
    border: "1px solid var(--fmed-border)",
    overflow: "auto"
  },
  table: {
    ...(styles.table || {}),
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    color: "var(--fmed-text)",
    fontSize: 12,
    textTransform: "uppercase"
  },
  tableLarge: {
    ...(styles.tableLarge || {}),
    width: "100%",
    minWidth: 1360,
    borderCollapse: "separate",
    borderSpacing: 0,
    color: "var(--fmed-text)",
    fontSize: 12,
    textTransform: "uppercase"
  },
  th: {
    ...(styles.th || {}),
    padding: "14px 14px",
    background: "#0F2637",
    color: "var(--fmed-text)",
    borderBottom: "1px solid var(--fmed-border)",
    fontSize: 12,
    lineHeight: 1.15,
    fontWeight: 950,
    letterSpacing: ".04em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    textAlign: "left"
  },
  thLarge: {
    ...(styles.thLarge || {}),
    padding: "14px 14px",
    background: "#0F2637",
    color: "var(--fmed-text)",
    borderBottom: "1px solid var(--fmed-border)",
    fontSize: 12,
    lineHeight: 1.15,
    fontWeight: 950,
    letterSpacing: ".04em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    textAlign: "left"
  },
  td: {
    ...(styles.td || {}),
    padding: "15px 14px",
    color: "var(--fmed-text)",
    borderBottom: "1px solid rgba(88,126,151,.20)",
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 1.35,
    verticalAlign: "middle",
    textTransform: "uppercase"
  },
  tdLarge: {
    ...(styles.tdLarge || {}),
    padding: "15px 14px",
    color: "var(--fmed-text)",
    borderBottom: "1px solid rgba(88,126,151,.20)",
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 1.35,
    verticalAlign: "middle",
    textTransform: "uppercase",
    maxWidth: 260,
    whiteSpace: "normal"
  },
  tdCodeLarge: {
    ...(styles.tdCodeLarge || {}),
    padding: "15px 14px",
    color: "#EAF7F8",
    borderBottom: "1px solid rgba(88,126,151,.20)",
    fontSize: 12,
    fontWeight: 950,
    lineHeight: 1.25,
    textTransform: "uppercase",
    whiteSpace: "nowrap"
  },
  // Azioni infrastrutture in orizzontale e non più gigantesche/impilate
  rowActionGroup: {
    ...(styles.rowActionGroup || {}),
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "nowrap"
  },
  docBtn: {
    ...(styles.docBtn || {}),
    minHeight: 40,
    minWidth: 98,
    padding: "0 12px",
    borderRadius: 10,
    background: "rgba(8,26,40,.92)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    fontSize: 11,
    lineHeight: 1,
    fontWeight: 950,
    letterSpacing: ".035em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  },
  docBtnDisabled: {
    ...(styles.docBtnDisabled || {}),
    minHeight: 40,
    minWidth: 98,
    padding: "0 12px",
    borderRadius: 10,
    background: "rgba(8,26,40,.65)",
    color: "var(--fmed-muted)",
    border: "1px solid var(--fmed-border)",
    fontSize: 11,
    fontWeight: 950,
    textTransform: "uppercase",
    whiteSpace: "nowrap"
  },
  actionBtnEdit: {
    ...(styles.actionBtnEdit || {}),
    minHeight: 40,
    minWidth: 92,
    padding: "0 12px",
    borderRadius: 10,
    background: "rgba(8,26,40,.92)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    boxShadow: "none",
    fontSize: 11,
    fontWeight: 950,
    letterSpacing: ".035em",
    textTransform: "uppercase",
    whiteSpace: "nowrap"
  },
  actionBtnDelete: {
    ...(styles.actionBtnDelete || {}),
    minHeight: 40,
    minWidth: 92,
    padding: "0 12px",
    borderRadius: 10,
    background: "rgba(220,53,69,.12)",
    color: "#FF5B68",
    border: "1px solid rgba(255,91,104,.48)",
    boxShadow: "none",
    fontSize: 11,
    fontWeight: 950,
    letterSpacing: ".035em",
    textTransform: "uppercase",
    whiteSpace: "nowrap"
  },
  primaryBtn: {
    ...(styles.primaryBtn || {}),
    background: "var(--fmed-btn)",
    color: "#FFFFFF",
    border: "1px solid rgba(124,199,205,.22)",
    borderRadius: 10,
    fontWeight: 950,
    letterSpacing: ".04em",
    textTransform: "uppercase",
    boxShadow: "var(--fmed-btn-shadow)"
  },
  secondaryBtn: {
    ...(styles.secondaryBtn || {}),
    background: "rgba(8,26,40,.92)",
    color: "var(--fmed-text)",
    border: "1px solid var(--fmed-border)",
    borderRadius: 10,
    fontWeight: 950,
    letterSpacing: ".04em",
    textTransform: "uppercase"
  }
});

/* ========================================================
   FMED 4.0 MASTER VISUAL SYSTEM - LIGHT + DARK FINAL
   Obiettivo: progetto bello, coerente, enterprise.
   Solo UI: nessuna modifica a logiche, API, OCR, Supabase.
   ======================================================== */

/* ========================================================
   FMED 4.0 - FASE 1 SIDEBAR ENTERPRISE DEFINITIVA
   Solo UI sidebar: nessuna logica/route/API modificata.
   Obiettivo: reference identica, niente azzurrino/celeste.
   ======================================================== */

/* =========================================================
   FMED 4.0 - FASE 3 DASHBOARD ENTERPRISE REFERENCE
   Obiettivo: dashboard coerente con mockup, niente azzurrino/celeste.
   Solo UI: non modifica logica React, API, backend, routing, Supabase o dati.
   ========================================================= */
Object.assign(styles, {
  fmedNeoHideHeader: {
    ...(styles.fmedNeoHideHeader || {}),
    display: "none"
  },
  fmedNeoDashboardShell: {
    ...(styles.fmedNeoDashboardShell || {}),
    width: "100%",
    maxWidth: "1720px",
    margin: "0 auto",
    padding: "4px 0 26px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    color: "var(--fmed-d3-text)",
    background: "transparent"
  },
  fmedNeoDashboardTopbar: {
    ...(styles.fmedNeoDashboardTopbar || {}),
    minHeight: 118,
    padding: "22px 24px",
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    flexWrap: "wrap",
    background: "var(--fmed-d3-hero)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "var(--fmed-d3-shadow)",
    color: "var(--fmed-d3-text)",
    overflow: "hidden",
    position: "relative"
  },
  fmedNeoTitleWrap: {
    ...(styles.fmedNeoTitleWrap || {}),
    display: "flex",
    alignItems: "center",
    gap: 14,
    minWidth: 0
  },
  fmedNeoTitleIcon: {
    ...(styles.fmedNeoTitleIcon || {}),
    width: 54,
    height: 54,
    minWidth: 54,
    borderRadius: 18,
    display: "grid",
    placeItems: "center",
    color: "#FFFFFF",
    background: "linear-gradient(135deg, #1FAE9C 0%, #147C72 100%)",
    boxShadow: "0 16px 34px rgba(31,174,156,.24)",
    border: "1px solid rgba(255,255,255,.22)"
  },
  fmedNeoDashboardTitle: {
    ...(styles.fmedNeoDashboardTitle || {}),
    margin: 0,
    color: "var(--fmed-d3-title)",
    fontSize: "clamp(28px, 2.6vw, 42px)",
    lineHeight: 1.02,
    fontWeight: 500,
    letterSpacing: "-.045em",
    WebkitTextFillColor: "var(--fmed-d3-title)"
  },
  fmedNeoDashboardSubtitle: {
    ...(styles.fmedNeoDashboardSubtitle || {}),
    margin: "6px 0 0",
    maxWidth: 780,
    color: "var(--fmed-d3-muted)",
    fontSize: 14,
    lineHeight: 1.48,
    fontWeight: 400,
    WebkitTextFillColor: "var(--fmed-d3-muted)"
  },
  fmedNeoTopActions: {
    ...(styles.fmedNeoTopActions || {}),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    flexWrap: "wrap"
  },
  fmedNeoDatePill: {
    ...(styles.fmedNeoDatePill || {}),
    minHeight: 42,
    padding: "10px 14px",
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    color: "var(--fmed-d3-text)",
    background: "var(--fmed-d3-pill)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "none",
    fontSize: 13,
    fontWeight: 500,
    whiteSpace: "nowrap"
  },
  fmedNeoLivePill: {
    ...(styles.fmedNeoLivePill || {}),
    minHeight: 42,
    padding: "10px 14px",
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    color: "var(--fmed-d3-text)",
    background: "rgba(31,174,156,.14)",
    border: "1px solid rgba(31,174,156,.24)",
    boxShadow: "none",
    fontSize: 13,
    fontWeight: 500,
    whiteSpace: "nowrap"
  },
  fmedThemeToggleBtn: {
    ...(styles.fmedThemeToggleBtn || {}),
    minHeight: 42,
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid var(--fmed-d3-border)",
    background: "var(--fmed-d3-pill)",
    color: "var(--fmed-d3-text)",
    boxShadow: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontWeight: 500,
    whiteSpace: "nowrap"
  },
  fmedNeoQuickPanel: {
    ...(styles.fmedNeoQuickPanel || {}),
    padding: "18px",
    marginBottom: 0,
    borderRadius: 28,
    background: "var(--fmed-d3-card)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "var(--fmed-d3-shadow-soft)",
    color: "var(--fmed-d3-text)",
    overflow: "hidden"
  },
  fmedNeoPanelTitleWithIcon: {
    ...(styles.fmedNeoPanelTitleWithIcon || {}),
    margin: "0 0 14px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "var(--fmed-d3-title)",
    fontSize: 18,
    lineHeight: 1.18,
    fontWeight: 500,
    letterSpacing: "-.02em",
    WebkitTextFillColor: "var(--fmed-d3-title)"
  },
  fmedNeoSectionIcon: {
    ...(styles.fmedNeoSectionIcon || {}),
    width: 42,
    height: 42,
    minWidth: 42,
    borderRadius: 16,
    display: "grid",
    placeItems: "center",
    color: "#1FAE9C",
    background: "rgba(31,174,156,.12)",
    border: "1px solid rgba(31,174,156,.22)",
    boxShadow: "none"
  },
  fmedNeoQuickGrid: {
    ...(styles.fmedNeoQuickGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: 12,
    marginTop: 0
  },
  fmedNeoQuickBtn: {
    ...(styles.fmedNeoQuickBtn || {}),
    minHeight: 92,
    padding: "15px 12px",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    textAlign: "center",
    background: "var(--fmed-d3-soft)",
    color: "var(--fmed-d3-text)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "none",
    fontWeight: 500,
    lineHeight: 1.12,
    overflow: "hidden"
  },
  fmedNeoQuickBtnAlert: {
    ...(styles.fmedNeoQuickBtnAlert || {}),
    background: "linear-gradient(135deg, rgba(216,154,42,.18), rgba(31,174,156,.08))",
    color: "var(--fmed-d3-title)",
    border: "1px solid rgba(216,154,42,.32)",
    boxShadow: "none"
  },
  fmedNeoKpiGrid: {
    ...(styles.fmedNeoKpiGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: 14,
    alignItems: "stretch",
    marginBottom: 0
  },
  fmedNeoKpiCard: {
    ...(styles.fmedNeoKpiCard || {}),
    minHeight: 136,
    height: "100%",
    padding: "18px",
    borderRadius: 26,
    background: "var(--fmed-d3-card)",
    color: "var(--fmed-d3-text)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "var(--fmed-d3-shadow-soft)",
    display: "grid",
    gridTemplateColumns: "54px minmax(0,1fr)",
    gridTemplateRows: "1fr auto",
    gap: "12px 14px",
    alignItems: "center",
    textAlign: "left",
    overflow: "hidden"
  },
  fmedNeoKpiCyan: {
    ...(styles.fmedNeoKpiCyan || {}),
    borderTop: "4px solid #1FAE9C",
    boxShadow: "var(--fmed-d3-shadow-soft)"
  },
  fmedNeoKpiGreen: {
    ...(styles.fmedNeoKpiGreen || {}),
    borderTop: "4px solid #39C97C",
    boxShadow: "var(--fmed-d3-shadow-soft)"
  },
  fmedNeoKpiAmber: {
    ...(styles.fmedNeoKpiAmber || {}),
    borderTop: "4px solid #D89A2A",
    boxShadow: "var(--fmed-d3-shadow-soft)"
  },
  fmedNeoKpiBlue: {
    ...(styles.fmedNeoKpiBlue || {}),
    borderTop: "4px solid #6DB193",
    boxShadow: "var(--fmed-d3-shadow-soft)"
  },
  fmedNeoKpiPurple: {
    ...(styles.fmedNeoKpiPurple || {}),
    borderTop: "4px solid #7C6A45",
    boxShadow: "var(--fmed-d3-shadow-soft)"
  },
  fmedNeoKpiIcon: {
    ...(styles.fmedNeoKpiIcon || {}),
    width: 54,
    height: 54,
    minWidth: 54,
    borderRadius: 18,
    display: "grid",
    placeItems: "center",
    color: "#1FAE9C",
    background: "rgba(31,174,156,.12)",
    border: "1px solid rgba(31,174,156,.22)",
    boxShadow: "none"
  },
  fmedNeoIconCyan: {
    ...(styles.fmedNeoIconCyan || {}),
    color: "#1FAE9C",
    background: "rgba(31,174,156,.12)",
    borderColor: "rgba(31,174,156,.24)",
    boxShadow: "none"
  },
  fmedNeoIconGreen: {
    ...(styles.fmedNeoIconGreen || {}),
    color: "#39C97C",
    background: "rgba(57,201,124,.12)",
    borderColor: "rgba(57,201,124,.22)",
    boxShadow: "none"
  },
  fmedNeoIconAmber: {
    ...(styles.fmedNeoIconAmber || {}),
    color: "#D89A2A",
    background: "rgba(216,154,42,.14)",
    borderColor: "rgba(216,154,42,.25)",
    boxShadow: "none"
  },
  fmedNeoIconBlue: {
    ...(styles.fmedNeoIconBlue || {}),
    color: "#6DB193",
    background: "rgba(109,177,147,.12)",
    borderColor: "rgba(109,177,147,.22)",
    boxShadow: "none"
  },
  fmedNeoIconPurple: {
    ...(styles.fmedNeoIconPurple || {}),
    color: "#7C6A45",
    background: "rgba(124,106,69,.12)",
    borderColor: "rgba(124,106,69,.22)",
    boxShadow: "none"
  },
  fmedNeoKpiText: {
    ...(styles.fmedNeoKpiText || {}),
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    overflow: "hidden"
  },
  fmedNeoKpiMainNumber: {
    ...(styles.fmedNeoKpiMainNumber || {}),
    display: "block",
    color: "var(--fmed-d3-title)",
    fontSize: "clamp(27px, 2.1vw, 38px)",
    lineHeight: 1,
    fontWeight: 500,
    letterSpacing: "-.045em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitTextFillColor: "var(--fmed-d3-title)"
  },
  fmedNeoKpiLabel: {
    ...(styles.fmedNeoKpiLabel || {}),
    color: "var(--fmed-d3-muted)",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: ".04em",
    textTransform: "uppercase"
  },
  fmedNeoTrendPositive: {
    ...(styles.fmedNeoTrendPositive || {}),
    gridColumn: "1 / -1",
    color: "#1E9E66",
    background: "rgba(57,201,124,.12)",
    border: "1px solid rgba(57,201,124,.22)",
    borderRadius: 999,
    padding: "7px 10px",
    fontSize: 12,
    fontWeight: 500,
    fontStyle: "normal"
  },
  fmedNeoTrendWarning: {
    ...(styles.fmedNeoTrendWarning || {}),
    gridColumn: "1 / -1",
    color: "#B77618",
    background: "rgba(216,154,42,.14)",
    border: "1px solid rgba(216,154,42,.26)",
    borderRadius: 999,
    padding: "7px 10px",
    fontSize: 12,
    fontWeight: 500,
    fontStyle: "normal"
  },
  fmedNeoTrendBlue: {
    ...(styles.fmedNeoTrendBlue || {}),
    gridColumn: "1 / -1",
    color: "#147C72",
    background: "rgba(31,174,156,.12)",
    border: "1px solid rgba(31,174,156,.23)",
    borderRadius: 999,
    padding: "7px 10px",
    fontSize: 12,
    fontWeight: 500,
    fontStyle: "normal"
  },
  fmedNeoTrendCyan: {
    ...(styles.fmedNeoTrendCyan || {}),
    color: "#147C72",
    fontWeight: 500
  },
  fmedNeoTrendPurple: {
    ...(styles.fmedNeoTrendPurple || {}),
    color: "#7C6A45",
    fontWeight: 500
  },
  fmedNeoMainGrid: {
    ...(styles.fmedNeoMainGrid || {}),
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.55fr) minmax(340px, .85fr)",
    gap: 16,
    alignItems: "stretch",
    marginBottom: 0
  },
  fmedNeoChartPanel: {
    ...(styles.fmedNeoChartPanel || {}),
    minHeight: 380,
    padding: 18,
    borderRadius: 28,
    background: "var(--fmed-d3-card)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "var(--fmed-d3-shadow-soft)",
    color: "var(--fmed-d3-text)",
    overflow: "hidden"
  },
  fmedNeoUrgentCard: {
    ...(styles.fmedNeoUrgentCard || {}),
    minHeight: 380,
    padding: 18,
    borderRadius: 28,
    background: "var(--fmed-d3-card)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "var(--fmed-d3-shadow-soft)",
    color: "var(--fmed-d3-text)",
    overflow: "hidden"
  },
  fmedNeoLowerGrid: {
    ...(styles.fmedNeoLowerGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0,1fr))",
    gap: 16,
    marginBottom: 0
  },
  fmedNeoMiniPanel: {
    ...(styles.fmedNeoMiniPanel || {}),
    minHeight: 240,
    padding: 18,
    borderRadius: 28,
    background: "var(--fmed-d3-card)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "var(--fmed-d3-shadow-soft)",
    color: "var(--fmed-d3-text)",
    overflow: "hidden"
  },
  fmedNeoActivityPanel: {
    ...(styles.fmedNeoActivityPanel || {}),
    padding: 18,
    marginTop: 0,
    borderRadius: 28,
    background: "var(--fmed-d3-card)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "var(--fmed-d3-shadow-soft)",
    color: "var(--fmed-d3-text)",
    overflow: "hidden"
  },
  fmedNeoPanelHeader: {
    ...(styles.fmedNeoPanelHeader || {}),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14
  },
  fmedNeoPanelTitle: {
    ...(styles.fmedNeoPanelTitle || {}),
    margin: 0,
    color: "var(--fmed-d3-title)",
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: "-.02em",
    WebkitTextFillColor: "var(--fmed-d3-title)"
  },
  fmedNeoPanelSub: {
    ...(styles.fmedNeoPanelSub || {}),
    margin: "4px 0 0",
    color: "var(--fmed-d3-muted)",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.4,
    WebkitTextFillColor: "var(--fmed-d3-muted)"
  },
  fmedNeoSmallBtn: {
    ...(styles.fmedNeoSmallBtn || {}),
    minHeight: 38,
    padding: "0 14px",
    borderRadius: 14,
    background: "var(--fmed-d3-soft)",
    color: "#147C72",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "none",
    fontWeight: 500
  },
  fmedNeoSmallBtnAccent: {
    ...(styles.fmedNeoSmallBtnAccent || {}),
    minHeight: 38,
    padding: "0 14px",
    borderRadius: 14,
    background: "linear-gradient(135deg,#1FAE9C 0%,#147C72 100%)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,.16)",
    boxShadow: "0 12px 26px rgba(31,174,156,.22)",
    fontWeight: 500
  },
  fmedNeoStatusBox: {
    ...(styles.fmedNeoStatusBox || {}),
    background: "var(--fmed-d3-soft)",
    border: "1px solid var(--fmed-d3-border)",
    color: "var(--fmed-d3-text)",
    boxShadow: "none"
  },
  fmedNeoEmptyState: {
    ...(styles.fmedNeoEmptyState || {}),
    color: "var(--fmed-d3-muted)",
    background: "var(--fmed-d3-soft)",
    border: "1px dashed var(--fmed-d3-border)"
  },
  fmedNeoUrgentList: {
    ...(styles.fmedNeoUrgentList || {}),
    display: "grid",
    gap: 10
  },
  fmedNeoUrgentRow: {
    ...(styles.fmedNeoUrgentRow || {}),
    minHeight: 64,
    padding: "12px",
    borderRadius: 18,
    background: "var(--fmed-d3-soft)",
    border: "1px solid var(--fmed-d3-border)",
    color: "var(--fmed-d3-text)",
    boxShadow: "none",
    textAlign: "left"
  },
  fmedNeoUrgentIcon: {
    ...(styles.fmedNeoUrgentIcon || {}),
    width: 40,
    height: 40,
    borderRadius: 14,
    display: "grid",
    placeItems: "center"
  },
  fmedNeoActivityList: {
    ...(styles.fmedNeoActivityList || {}),
    display: "grid",
    gap: 10
  },
  fmedNeoActivityRow: {
    ...(styles.fmedNeoActivityRow || {}),
    minHeight: 56,
    padding: "10px 12px",
    borderRadius: 18,
    background: "var(--fmed-d3-soft)",
    border: "1px solid var(--fmed-d3-border)",
    color: "var(--fmed-d3-text)",
    boxShadow: "none"
  },
  fmedNeoActivityDot: {
    ...(styles.fmedNeoActivityDot || {}),
    width: 30,
    height: 30,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    background: "rgba(31,174,156,.12)",
    color: "#1FAE9C",
    border: "1px solid rgba(31,174,156,.22)"
  },
  fmedNeoDonutArea: {
    ...(styles.fmedNeoDonutArea || {}),
    display: "grid",
    gridTemplateColumns: "170px minmax(0,1fr)",
    gap: 22,
    alignItems: "center",
    marginTop: 14
  },
  fmedNeoSvgDonutWrap: {
    ...(styles.fmedNeoSvgDonutWrap || {}),
    position: "relative",
    width: 168,
    height: 168,
    filter: "none"
  },
  fmedNeoDonutSvg: {
    ...(styles.fmedNeoDonutSvg || {}),
    width: 168,
    height: 168,
    overflow: "visible"
  },
  fmedNeoDonutCenter: {
    ...(styles.fmedNeoDonutCenter || {}),
    position: "absolute",
    inset: 45,
    borderRadius: 999,
    background: "var(--fmed-d3-card)",
    border: "1px solid var(--fmed-d3-border)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--fmed-d3-title)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.08)"
  },
  fmedNeoDonutLegendEnhanced: {
    ...(styles.fmedNeoDonutLegendEnhanced || {}),
    display: "grid",
    gap: 9,
    color: "var(--fmed-d3-text)",
    fontSize: 13
  }
});

/* =========================================================
   FMED 4.0 - FASE 4 ASSET ENTERPRISE + SIDEBAR COLLAPSE FIX
   Solo UI: nessuna logica, API, routing, Supabase o backend modificati.
   - Fix reale sidebar compatta: quando la riduci libera spazio al contenuto.
   - Asset/Cespiti: palette identica alla Dashboard, senza azzurrino/celeste.
   ========================================================= */
Object.assign(styles, {
  sidebarCollapsed: {
    ...(styles.sidebarCollapsed || {}),
    width: "86px",
    minWidth: "86px",
    maxWidth: "86px",
    flex: "0 0 86px",
    padding: "18px 12px",
    alignItems: "center",
    overflow: "hidden"
  },
  main: {
    ...(styles.main || {}),
    flex: "1 1 auto",
    minWidth: 0,
    width: "auto",
    maxWidth: "none",
    transition: "padding .22s ease, width .22s ease"
  },
  assetHeroPanel: {
    ...(styles.assetHeroPanel || {}),
    minHeight: 146,
    padding: "24px",
    borderRadius: 28,
    background: "var(--fmed-d3-hero)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "var(--fmed-d3-shadow-soft)",
    color: "var(--fmed-d3-text)",
    overflow: "hidden"
  },
  assetHeroEyebrow: {
    ...(styles.assetHeroEyebrow || {}),
    color: "#1FAE9C",
    WebkitTextFillColor: "#1FAE9C",
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: ".14em",
    fontWeight: 500,
    textTransform: "uppercase"
  },
  assetHeroTitle: {
    ...(styles.assetHeroTitle || {}),
    color: "var(--fmed-d3-title)",
    WebkitTextFillColor: "var(--fmed-d3-title)",
    fontSize: "clamp(30px, 2.3vw, 40px)",
    lineHeight: 1.05,
    fontWeight: 500,
    letterSpacing: "-.045em",
    textShadow: "none"
  },
  assetHeroSubtitle: {
    ...(styles.assetHeroSubtitle || {}),
    color: "var(--fmed-d3-muted)",
    WebkitTextFillColor: "var(--fmed-d3-muted)",
    fontSize: 14,
    lineHeight: 1.48,
    maxWidth: 860
  },
  assetHeroRight: {
    ...(styles.assetHeroRight || {}),
    minWidth: 210,
    padding: "18px 20px",
    borderRadius: 24,
    background: "linear-gradient(135deg,#1FAE9C 0%,#147C72 100%)",
    border: "1px solid rgba(255,255,255,.16)",
    color: "#FFFFFF",
    boxShadow: "0 18px 38px rgba(31,174,156,.22)"
  },
  assetHeroBadgeNumber: {
    ...(styles.assetHeroBadgeNumber || {}),
    fontSize: 38,
    lineHeight: "40px",
    fontWeight: 500,
    color: "#FFFFFF",
    WebkitTextFillColor: "#FFFFFF"
  },
  assetHeroBadgeText: {
    ...(styles.assetHeroBadgeText || {}),
    color: "#FFFFFF",
    WebkitTextFillColor: "#FFFFFF",
    background: "transparent",
    border: 0,
    boxShadow: "none",
    padding: 0,
    minWidth: 0,
    fontSize: 14,
    fontWeight: 500
  },
  assetHeroBadgeSub: {
    ...(styles.assetHeroBadgeSub || {}),
    color: "rgba(255,255,255,.78)",
    WebkitTextFillColor: "rgba(255,255,255,.78)",
    fontSize: 12,
    letterSpacing: ".08em",
    textTransform: "uppercase"
  },
  assetFiltersPanel: {
    ...(styles.assetFiltersPanel || {}),
    marginTop: 18,
    padding: 18,
    borderRadius: 26,
    background: "var(--fmed-d3-card)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "var(--fmed-d3-shadow-soft)",
    color: "var(--fmed-d3-text)"
  },
  assetFiltersGrid: {
    ...(styles.assetFiltersGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
    alignItems: "end"
  },
  assetInputLarge: {
    ...(styles.assetInputLarge || {}),
    minHeight: 46,
    borderRadius: 16,
    background: "var(--fmed-d3-soft)",
    color: "var(--fmed-d3-text)",
    WebkitTextFillColor: "var(--fmed-d3-text)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "none"
  },
  assetInputWide: {
    ...(styles.assetInputWide || {}),
    minHeight: 46,
    borderRadius: 16,
    background: "var(--fmed-d3-soft)",
    color: "var(--fmed-d3-text)",
    WebkitTextFillColor: "var(--fmed-d3-text)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "none"
  },
  assetSelectLarge: {
    ...(styles.assetSelectLarge || {}),
    minHeight: 46,
    borderRadius: 16,
    background: "var(--fmed-d3-soft)",
    color: "var(--fmed-d3-text)",
    WebkitTextFillColor: "var(--fmed-d3-text)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "none"
  },
  assetKpiGrid: {
    ...(styles.assetKpiGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 14,
    margin: "18px 0 18px 0"
  },
  assetKpiCard: {
    ...(styles.assetKpiCard || {}),
    minHeight: 124,
    padding: 18,
    borderRadius: 24,
    background: "var(--fmed-d3-card)",
    color: "var(--fmed-d3-text)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "var(--fmed-d3-shadow-soft)",
    textShadow: "none"
  },
  assetKpiTop: {
    ...(styles.assetKpiTop || {}),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  assetKpiIcon: {
    ...(styles.assetKpiIcon || {}),
    width: 46,
    height: 46,
    minWidth: 46,
    borderRadius: 16,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1FAE9C",
    background: "rgba(31,174,156,.12)",
    border: "1px solid rgba(31,174,156,.22)",
    boxShadow: "none",
    fontSize: 22
  },
  assetKpiLabel: {
    ...(styles.assetKpiLabel || {}),
    color: "var(--fmed-d3-muted)",
    WebkitTextFillColor: "var(--fmed-d3-muted)",
    fontSize: 12,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    fontWeight: 500
  },
  assetKpiValue: {
    ...(styles.assetKpiValue || {}),
    color: "var(--fmed-d3-title)",
    WebkitTextFillColor: "var(--fmed-d3-title)",
    fontSize: "clamp(30px, 2vw, 38px)",
    lineHeight: 1.05,
    fontWeight: 500,
    letterSpacing: "-.04em"
  },
  assetKpiHint: {
    ...(styles.assetKpiHint || {}),
    color: "var(--fmed-d3-muted)",
    WebkitTextFillColor: "var(--fmed-d3-muted)",
    fontSize: 12,
    lineHeight: "17px"
  },
  assetTableCard: {
    ...(styles.assetTableCard || {}),
    padding: "20px",
    borderRadius: 28,
    background: "var(--fmed-d3-card)",
    border: "1px solid var(--fmed-d3-border)",
    color: "var(--fmed-d3-text)",
    boxShadow: "var(--fmed-d3-shadow-soft)",
    overflow: "hidden"
  },
  assetTableTitle: {
    ...(styles.assetTableTitle || {}),
    color: "var(--fmed-d3-title)",
    WebkitTextFillColor: "var(--fmed-d3-title)",
    fontSize: 21,
    fontWeight: 500,
    letterSpacing: "-.02em"
  },
  assetTableSubtitle: {
    ...(styles.assetTableSubtitle || {}),
    color: "var(--fmed-d3-muted)",
    WebkitTextFillColor: "var(--fmed-d3-muted)",
    fontSize: 13,
    lineHeight: 1.4
  },
  tableLarge: {
    ...(styles.tableLarge || {}),
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    color: "var(--fmed-d3-text)",
    fontSize: 14
  },
  thLarge: {
    ...(styles.thLarge || {}),
    padding: "14px 12px",
    background: "var(--fmed-d3-soft)",
    color: "var(--fmed-d3-muted)",
    WebkitTextFillColor: "var(--fmed-d3-muted)",
    borderBottom: "1px solid var(--fmed-d3-border)",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: ".08em",
    textTransform: "uppercase"
  },
  tdLarge: {
    ...(styles.tdLarge || {}),
    padding: "14px 12px",
    color: "var(--fmed-d3-text)",
    WebkitTextFillColor: "var(--fmed-d3-text)",
    borderBottom: "1px solid var(--fmed-d3-border)",
    fontSize: 13,
    lineHeight: 1.35
  },
  tdCodeLarge: {
    ...(styles.tdCodeLarge || {}),
    padding: "14px 12px",
    color: "#1FAE9C",
    WebkitTextFillColor: "#1FAE9C",
    borderBottom: "1px solid var(--fmed-d3-border)",
    fontSize: 13,
    fontWeight: 500
  },
  assetPrimaryAction: {
    ...(styles.assetPrimaryAction || {}),
    background: "linear-gradient(135deg,#1FAE9C 0%,#147C72 100%)",
    color: "#FFFFFF",
    WebkitTextFillColor: "#FFFFFF",
    border: "1px solid rgba(255,255,255,.14)",
    boxShadow: "0 14px 30px rgba(31,174,156,.20)"
  },
  assetSecondaryAction: {
    ...(styles.assetSecondaryAction || {}),
    background: "var(--fmed-d3-soft)",
    color: "var(--fmed-d3-text)",
    WebkitTextFillColor: "var(--fmed-d3-text)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "none"
  },
  assetGhostAction: {
    ...(styles.assetGhostAction || {}),
    background: "transparent",
    color: "#1FAE9C",
    WebkitTextFillColor: "#1FAE9C",
    border: "1px solid rgba(31,174,156,.24)",
    boxShadow: "none"
  }
});

/* ========================================================
   FMED 4.0 - FASE 5 INTERVENTI ENTERPRISE
   Scope: solo UI pagina Interventi. Logica, API, routing e dati invariati.
   ======================================================== */
Object.assign(styles, {
  interventiPageShell: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: "100%",
    maxWidth: "none",
    margin: 0,
    minWidth: 0
  },
  interventiHeroPanel: {
    position: "relative",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 210px",
    alignItems: "stretch",
    gap: 18,
    padding: "20px 22px",
    borderRadius: 24,
    background: "linear-gradient(135deg, rgba(8,20,28,.98) 0%, rgba(12,33,42,.96) 62%, rgba(18,87,78,.92) 100%)",
    border: "1px solid rgba(127,226,204,.20)",
    boxShadow: "0 26px 70px rgba(4,13,18,.18)",
    color: "#F5FBFA"
  },
  interventiHeroLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    minWidth: 0
  },
  interventiHeroEyebrow: {
    alignSelf: "flex-start",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: ".13em",
    textTransform: "uppercase",
    color: "#7FE2CC",
    background: "rgba(31,174,156,.12)",
    border: "1px solid rgba(127,226,204,.22)"
  },
  interventiHeroTitle: {
    margin: 0,
    fontSize: "clamp(30px, 3vw, 48px)",
    lineHeight: 1.02,
    letterSpacing: "-.045em",
    fontWeight: 500,
    color: "#FFFFFF"
  },
  interventiHeroSubtitle: {
    margin: 0,
    maxWidth: 760,
    fontSize: 15,
    lineHeight: 1.65,
    color: "rgba(234,247,244,.74)"
  },
  interventiHeroRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 126,
    padding: 16,
    borderRadius: 20,
    background: "rgba(255,255,255,.075)",
    border: "1px solid rgba(255,255,255,.11)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.08)"
  },
  interventiHeroBadgeNumber: {
    fontSize: "clamp(42px, 4vw, 64px)",
    lineHeight: 1,
    fontWeight: 400,
    letterSpacing: "-.06em",
    color: "#7FE2CC"
  },
  interventiHeroBadgeText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    color: "#F7FFFD"
  },
  interventiHeroBadgeSub: {
    marginTop: 5,
    fontSize: 12,
    color: "rgba(234,247,244,.64)"
  },
  interventiPanel: {
    padding: 22,
    borderRadius: 28,
    background: "var(--fmed-card)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "0 18px 50px rgba(10,22,30,.08)"
  },
  interventiPanelHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 18,
    marginBottom: 16
  },
  interventiSectionTitle: {
    margin: 0,
    fontSize: 19,
    lineHeight: 1.15,
    fontWeight: 500,
    letterSpacing: "-.025em",
    color: "var(--fmed-title)"
  },
  interventiSectionSubtitle: {
    margin: "6px 0 0",
    fontSize: 13,
    lineHeight: 1.55,
    color: "var(--fmed-muted)"
  },
  interventiSearchRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    gap: 12,
    alignItems: "center"
  },
  interventiInputWide: {
    minHeight: 48,
    width: "100%",
    borderRadius: 16,
    padding: "0 16px",
    background: "var(--fmed-input-bg)",
    border: "1px solid var(--fmed-d3-border)",
    color: "var(--fmed-text)",
    outline: "none",
    fontSize: 14,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.04)"
  },
  interventiSearchButton: {
    minHeight: 48,
    border: "1px solid rgba(31,174,156,.30)",
    borderRadius: 16,
    padding: "0 18px",
    background: "linear-gradient(135deg,#1FAE9C,#147C72)",
    color: "#FFFFFF",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 12px 26px rgba(31,174,156,.18)"
  },
  interventiSmartResultsBox: {
    marginTop: 14,
    display: "grid",
    gap: 10,
    padding: 12,
    borderRadius: 20,
    background: "var(--fmed-soft-panel)",
    border: "1px solid var(--fmed-d3-border)"
  },
  interventiSmartResultRow: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 14,
    padding: "12px 14px",
    borderRadius: 16,
    border: "1px solid var(--fmed-d3-border)",
    background: "var(--fmed-card)",
    color: "var(--fmed-text)",
    cursor: "pointer",
    textAlign: "left"
  },
  interventiSmartResultCode: {
    color: "#1FAE9C",
    fontSize: 14,
    letterSpacing: ".02em"
  },
  interventiFilterChips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16
  },
  interventiChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    minHeight: 34,
    padding: "0 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    color: "#167F73",
    background: "rgba(31,174,156,.10)",
    border: "1px solid rgba(31,174,156,.22)"
  },
  interventiFiltersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(190px, 1fr))",
    gap: 12,
    alignItems: "end"
  },
  interventiSelectLarge: {
    minHeight: 46,
    width: "100%",
    borderRadius: 15,
    padding: "0 38px 0 13px",
    background: "var(--fmed-input-bg)",
    border: "1px solid var(--fmed-d3-border)",
    color: "var(--fmed-text)",
    outline: "none",
    fontSize: 13,
    fontWeight: 500
  },
  interventiDateFilterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 6
  },
  interventiDateFilterLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    color: "var(--fmed-muted)"
  },
  interventiActionsBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18
  },
  interventiPrimaryAction: {
    minHeight: 46,
    border: "1px solid rgba(31,174,156,.30)",
    borderRadius: 15,
    padding: "0 16px",
    background: "linear-gradient(135deg,#1FAE9C,#147C72)",
    color: "#FFFFFF",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 14px 28px rgba(31,174,156,.18)"
  },
  interventiSecondaryAction: {
    minHeight: 46,
    border: "1px solid rgba(31,174,156,.22)",
    borderRadius: 15,
    padding: "0 16px",
    background: "rgba(31,174,156,.10)",
    color: "#167F73",
    fontWeight: 800,
    cursor: "pointer"
  },
  interventiGhostAction: {
    minHeight: 46,
    border: "1px solid var(--fmed-d3-border)",
    borderRadius: 15,
    padding: "0 16px",
    background: "var(--fmed-soft-panel)",
    color: "var(--fmed-text)",
    fontWeight: 700,
    cursor: "pointer"
  },
  interventiKpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 14
  },
  interventiKpiCard: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minHeight: 138,
    padding: 20,
    borderRadius: 24,
    background: "var(--fmed-card)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "0 18px 42px rgba(8,22,30,.08)"
  },
  interventiKpiTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  interventiKpiIcon: {
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    borderRadius: 14,
    background: "rgba(31,174,156,.12)",
    color: "#1FAE9C",
    fontSize: 18
  },
  interventiKpiLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: ".08em",
    color: "var(--fmed-muted)"
  },
  interventiKpiValue: {
    fontSize: "clamp(27px, 2.2vw, 36px)",
    lineHeight: 1,
    fontWeight: 500,
    letterSpacing: "-.055em",
    color: "var(--fmed-title)"
  },
  interventiKpiHint: {
    fontSize: 12,
    color: "var(--fmed-muted)"
  },
  interventiTableCard: {
    borderRadius: 28,
    background: "var(--fmed-card)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "0 22px 56px rgba(8,22,30,.10)",
    overflow: "hidden"
  },
  interventiListHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "20px 22px",
    borderBottom: "1px solid var(--fmed-d3-border)",
    background: "var(--fmed-soft-panel)"
  },
  interventiTableTitle: {
    margin: 0,
    fontSize: 19,
    fontWeight: 500,
    color: "var(--fmed-title)"
  },
  interventiTableSubtitle: {
    margin: "6px 0 0",
    fontSize: 13,
    color: "var(--fmed-muted)"
  },
  interventiCloseBtn: {
    minHeight: 42,
    borderRadius: 14,
    padding: "0 14px",
    border: "1px solid var(--fmed-d3-border)",
    background: "var(--fmed-card)",
    color: "var(--fmed-text)",
    fontWeight: 800,
    cursor: "pointer"
  },
  interventiTableWrap: {
    width: "100%",
    overflow: "auto",
    maxHeight: "calc(100vh - 260px)"
  },
  interventiTable: {
    width: "100%",
    minWidth: 1120,
    borderCollapse: "separate",
    borderSpacing: 0,
    background: "var(--fmed-card)"
  },
  interventiTh: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    padding: "14px 14px",
    borderBottom: "1px solid var(--fmed-d3-border)",
    background: "var(--fmed-table-head)",
    color: "var(--fmed-muted)",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: ".09em",
    textTransform: "uppercase",
    textAlign: "left",
    whiteSpace: "nowrap"
  },
  interventiTr: {
    background: "var(--fmed-card)"
  },
  interventiTd: {
    padding: "14px 14px",
    borderBottom: "1px solid var(--fmed-d3-border)",
    color: "var(--fmed-text)",
    fontSize: 13,
    lineHeight: 1.45,
    verticalAlign: "middle"
  },
  interventiTdCode: {
    padding: "14px 14px",
    borderBottom: "1px solid var(--fmed-d3-border)",
    color: "#1FAE9C",
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: ".02em",
    cursor: "pointer",
    whiteSpace: "nowrap"
  }
});

/* ========================================================
   FMED 4.0 - FASE 6 SCADENZE ENTERPRISE
   Scope: solo UI pagina Scadenze. Logica, API, Export PDF, backend e Supabase invariati.
   Obiettivo: Scadenziario coerente con Dashboard/Asset/Interventi, zero azzurrino/celeste.
   ======================================================== */
Object.assign(styles, {
  scadenzePageShell: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: "100%",
    maxWidth: "none",
    margin: 0,
    minWidth: 0
  },
  scadenzeHeroPanel: {
    position: "relative",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 210px",
    alignItems: "stretch",
    gap: 18,
    padding: "20px 22px",
    borderRadius: 24,
    background: "linear-gradient(135deg, rgba(8,20,28,.98) 0%, rgba(12,33,42,.96) 58%, rgba(39,87,69,.90) 100%)",
    border: "1px solid rgba(127,226,204,.18)",
    boxShadow: "0 26px 70px rgba(4,13,18,.18)",
    color: "#F5FBFA"
  },
  scadenzeHeroLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    minWidth: 0
  },
  scadenzeHeroEyebrow: {
    alignSelf: "flex-start",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: ".13em",
    textTransform: "uppercase",
    color: "#D89A2A",
    WebkitTextFillColor: "#D89A2A",
    background: "rgba(216,154,42,.12)",
    border: "1px solid rgba(216,154,42,.28)"
  },
  scadenzeHeroTitle: {
    margin: 0,
    fontSize: "clamp(30px, 3vw, 48px)",
    lineHeight: 1.02,
    letterSpacing: "-.045em",
    fontWeight: 500,
    color: "#FFFFFF",
    WebkitTextFillColor: "#FFFFFF"
  },
  scadenzeHeroSubtitle: {
    margin: 0,
    maxWidth: 780,
    fontSize: 15,
    lineHeight: 1.65,
    color: "rgba(234,247,244,.74)",
    WebkitTextFillColor: "rgba(234,247,244,.74)"
  },
  scadenzeHeroRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 168,
    padding: 22,
    borderRadius: 26,
    background: "linear-gradient(135deg, rgba(31,174,156,.20), rgba(216,154,42,.15))",
    border: "1px solid rgba(255,255,255,.11)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.08)"
  },
  scadenzeHeroBadgeNumber: {
    fontSize: "clamp(42px, 4vw, 64px)",
    lineHeight: 1,
    fontWeight: 400,
    letterSpacing: "-.06em",
    color: "#7FE2CC",
    WebkitTextFillColor: "#7FE2CC"
  },
  scadenzeHeroBadgeText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    color: "#F7FFFD",
    WebkitTextFillColor: "#F7FFFD"
  },
  scadenzeHeroBadgeSub: {
    marginTop: 5,
    fontSize: 12,
    color: "rgba(234,247,244,.64)",
    WebkitTextFillColor: "rgba(234,247,244,.64)"
  },
  scadenzeFiltersPanel: {
    padding: 16,
    borderRadius: 22,
    background: "var(--fmed-card)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "0 18px 50px rgba(10,22,30,.08)",
    color: "var(--fmed-text)"
  },
  scadenzeFiltersHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 18,
    marginBottom: 16
  },
  scadenzeSectionTitle: {
    margin: 0,
    fontSize: 19,
    lineHeight: 1.15,
    fontWeight: 500,
    letterSpacing: "-.025em",
    color: "var(--fmed-title)",
    WebkitTextFillColor: "var(--fmed-title)"
  },
  scadenzeSectionSubtitle: {
    margin: "6px 0 0",
    fontSize: 13,
    lineHeight: 1.55,
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)"
  },
  scadenzeFilterChips: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10
  },
  scadenzeChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    minHeight: 34,
    padding: "0 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    color: "#167F73",
    WebkitTextFillColor: "#167F73",
    background: "rgba(31,174,156,.10)",
    border: "1px solid rgba(31,174,156,.22)"
  },
  scadenzeFiltersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(150px, 1fr))",
    gap: 10,
    alignItems: "end"
  },
  scadenzeSelectLarge: {
    minHeight: 46,
    width: "100%",
    borderRadius: 15,
    padding: "0 38px 0 13px",
    background: "var(--fmed-input-bg)",
    border: "1px solid var(--fmed-d3-border)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    outline: "none",
    fontSize: 13,
    fontWeight: 500,
    boxShadow: "none"
  },
  scadenzeInput: {
    minHeight: 46,
    width: "100%",
    borderRadius: 15,
    padding: "0 13px",
    background: "var(--fmed-input-bg)",
    border: "1px solid var(--fmed-d3-border)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    outline: "none",
    fontSize: 13,
    fontWeight: 500,
    boxSizing: "border-box",
    boxShadow: "none"
  },
  scadenzeDateFilterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 6
  },
  scadenzeDateFilterLabel: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)"
  },
  scadenzeActionsBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18
  },
  scadenzePrimaryAction: {
    minHeight: 46,
    border: "1px solid rgba(31,174,156,.30)",
    borderRadius: 15,
    padding: "0 16px",
    background: "linear-gradient(135deg,#1FAE9C,#147C72)",
    color: "#FFFFFF",
    WebkitTextFillColor: "#FFFFFF",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 14px 28px rgba(31,174,156,.18)"
  },
  scadenzeSecondaryAction: {
    minHeight: 46,
    border: "1px solid rgba(31,174,156,.22)",
    borderRadius: 15,
    padding: "0 16px",
    background: "rgba(31,174,156,.10)",
    color: "#167F73",
    WebkitTextFillColor: "#167F73",
    fontWeight: 800,
    cursor: "pointer"
  },
  scadenzeGhostAction: {
    minHeight: 46,
    border: "1px solid var(--fmed-d3-border)",
    borderRadius: 15,
    padding: "0 16px",
    background: "var(--fmed-soft-panel)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    fontWeight: 700,
    cursor: "pointer"
  },
  scadenzeKpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 14
  },
  scadenzeKpiCard: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: 7,
    minHeight: 104,
    padding: 15,
    borderRadius: 18,
    background: "var(--fmed-card)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "0 18px 42px rgba(8,22,30,.08)"
  },
  scadenzeKpiTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  scadenzeKpiIcon: {
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    minWidth: 40,
    borderRadius: 14,
    background: "rgba(31,174,156,.12)",
    color: "#1FAE9C",
    WebkitTextFillColor: "#1FAE9C",
    fontSize: 18
  },
  scadenzeKpiLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: ".08em",
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)"
  },
  scadenzeKpiValue: {
    fontSize: "clamp(27px, 2.2vw, 36px)",
    lineHeight: 1,
    fontWeight: 500,
    letterSpacing: "-.055em",
    color: "var(--fmed-title)",
    WebkitTextFillColor: "var(--fmed-title)"
  },
  scadenzeKpiHint: {
    fontSize: 12,
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)"
  },
  scadenzeTableCard: {
    borderRadius: 22,
    minWidth: 0,
    width: "100%",
    background: "var(--fmed-card)",
    border: "1px solid var(--fmed-d3-border)",
    boxShadow: "0 22px 56px rgba(8,22,30,.10)",
    overflow: "hidden"
  },
  scadenzeListHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "20px 22px",
    borderBottom: "1px solid var(--fmed-d3-border)",
    background: "var(--fmed-soft-panel)"
  },
  scadenzeTableTitle: {
    margin: 0,
    fontSize: 19,
    fontWeight: 500,
    color: "var(--fmed-title)",
    WebkitTextFillColor: "var(--fmed-title)"
  },
  scadenzeTableSubtitle: {
    margin: "6px 0 0",
    fontSize: 13,
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)"
  },
  scadenzeCloseBtn: {
    minHeight: 42,
    borderRadius: 14,
    padding: "0 14px",
    border: "1px solid var(--fmed-d3-border)",
    background: "var(--fmed-card)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    fontWeight: 800,
    cursor: "pointer"
  },
  scadenzeTableWrap: {
    width: "100%",
    overflow: "auto",
    maxHeight: "calc(100vh - 260px)"
  },
  scadenzeTable: {
    width: "100%",
    minWidth: 1450,
    borderCollapse: "separate",
    borderSpacing: 0,
    background: "var(--fmed-card)"
  },
  scadenzeTh: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    padding: "14px 14px",
    borderBottom: "1px solid var(--fmed-d3-border)",
    background: "var(--fmed-table-head)",
    color: "var(--fmed-muted)",
    WebkitTextFillColor: "var(--fmed-muted)",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: ".09em",
    textTransform: "uppercase",
    textAlign: "left",
    whiteSpace: "nowrap"
  },
  scadenzeTd: {
    padding: "14px 14px",
    borderBottom: "1px solid var(--fmed-d3-border)",
    color: "var(--fmed-text)",
    WebkitTextFillColor: "var(--fmed-text)",
    fontSize: 13,
    lineHeight: 1.45,
    verticalAlign: "middle"
  },
  scadenzeTdCode: {
    padding: "14px 14px",
    borderBottom: "1px solid var(--fmed-d3-border)",
    color: "#1FAE9C",
    WebkitTextFillColor: "#1FAE9C",
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: ".02em",
    cursor: "pointer",
    whiteSpace: "nowrap"
  },
  scadenzeStatusDot: {
    display: "inline-block",
    width: 9,
    height: 9,
    minWidth: 9,
    borderRadius: "50%",
    marginRight: 8,
    boxShadow: "0 0 0 3px rgba(255,255,255,.06)"
  }
});

/* === FMED PATCH 30_06_2026 - Scheda cespite desktop enterprise + interventi smart === */
Object.assign(styles, {
  modalOverlay: {
    ...(styles.modalOverlay || {}),
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    overflow: "hidden"
  },
  modalOverlayTop: {
    ...(styles.modalOverlayTop || {}),
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    overflow: "hidden"
  },
  modalCard: {
    ...(styles.modalCard || {}),
    width: "min(1840px, 96vw)",
    maxWidth: "1840px",
    height: "92vh",
    maxHeight: "92vh",
    borderRadius: "26px",
    overflow: "auto"
  },
  assetActionsGrouped: {
    ...(styles.assetActionsGrouped || {}),
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px",
    alignItems: "stretch"
  },
  assetActionsGroupGrid: {
    ...(styles.assetActionsGroupGrid || {}),
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "10px"
  },
  assetActionBtn: {
    ...(styles.assetActionBtn || {}),
    minWidth: 0,
    whiteSpace: "nowrap"
  },
  assetHistoryCollapsible: {
    ...(styles.assetHistoryCollapsible || {}),
    maxWidth: "100%",
    overflow: "hidden"
  },
  tableWrapCompact: {
    ...(styles.tableWrapCompact || {}),
    width: "100%",
    maxHeight: "52vh",
    overflow: "auto"
  },
  editGrid: {
    ...(styles.editGrid || {}),
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"
  }
});

export { loginStyles, loginLightStyles };
export default styles;
