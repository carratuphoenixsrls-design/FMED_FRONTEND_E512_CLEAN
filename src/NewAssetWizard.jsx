import FmedModuleIcon from "./components/FmedModuleIcon.jsx";
import { useEffect, useMemo, useState } from "react";
import "./NewAssetWizard.css";

const STEPS = [
  ["ANAGRAFICA", "Identificazione"],
  ["CLASSIFICAZIONE", "Classificazione"],
  ["DOCUMENTAZIONE", "Documentazione"],
  ["PIANO_MANUTENTIVO", "Piano manutentivo"],
  ["CONFERMA", "Conferma"],
];

const EMPTY = {
  codicestrumento: "",
  tipologia: "",
  costruttore: "",
  modello: "",
  matricola: "",
  societa: "",
  sede: "",
  reparto: "",
  branca_medica: "",
  locazione: "",
  categoria: "",
  possesso: "",
  anno_di_fabbricazione: "",
  data_di_collaudo: "",
  data_messa_in_uso: "",
  fornitore: "",
  note: "",
  link_documento: "",
  periodicita: "",
  data_ultimo_intervento: "",
  attivita_manutentiva: "",
  crea_piano_manutentivo: false,
  registra_collaudo_storico: true,
  esito_collaudo: "POSITIVO",
};

const CRITICAL_DICTIONARIES = [
  ["sedi", "Sedi"],
  ["tipologie", "Tipologie asset"],
  ["categorie", "Categorie asset"],
  ["societa", "Società"],
];

function asList(value) {
  return Array.isArray(value) ? value : [];
}

function labelOf(item) {
  if (typeof item === "string" || typeof item === "number") return String(item).trim();
  return String(item?.label || item?.etichetta || item?.sede || item?.descrizione || item?.codice || "").trim();
}

function codeOf(item) {
  if (typeof item === "string" || typeof item === "number") return normalizedCode(item);
  return String(item?.codice || item?.code || item?.label || item?.etichetta || "").trim();
}

function normalizedCode(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalizedLabel(value) {
  return labelOf(value).toLocaleUpperCase("it-IT").replace(/\s+/g, " ").trim();
}

function toOption(value, origin = "PRECARICATO") {
  const label = labelOf(value);
  if (!label) return null;
  return typeof value === "object" && value !== null
    ? value
    : { codice: normalizedCode(label), label, origine: origin };
}

function uniqueOptions(...groups) {
  const seen = new Set();
  const result = [];
  groups.flatMap(asList).forEach((raw) => {
    const item = toOption(raw);
    if (!item) return;
    const key = normalizedCode(codeOf(item)) || normalizedLabel(item);
    if (!key || seen.has(key)) return;
    seen.add(key);
    result.push(item);
  });
  return result;
}

function dictionaryValues(dictionary, ...keys) {
  return uniqueOptions(...keys.map((key) => dictionary?.[key]));
}

function mergeDictionaries(base = {}, incoming = {}) {
  const merged = { ...(base || {}) };
  Object.entries(incoming || {}).forEach(([key, value]) => {
    if (Array.isArray(value)) merged[key] = uniqueOptions(value, merged[key]);
    else if (value !== undefined && value !== null) merged[key] = value;
  });
  return merged;
}

function withCurrent(items, current) {
  return uniqueOptions(items, current ? [toOption(current)] : []);
}

function selectedCode(items, value) {
  const wantedCode = normalizedCode(value);
  const wantedLabel = normalizedLabel(value);
  const found = asList(items).find((item) =>
    normalizedCode(codeOf(item)) === wantedCode || normalizedLabel(item) === wantedLabel
  );
  return normalizedCode(found ? codeOf(found) : value);
}

function includesValue(items, value) {
  if (!String(value || "").trim()) return true;
  const wantedCode = normalizedCode(value);
  const wantedLabel = normalizedLabel(value);
  return asList(items).some((item) =>
    normalizedCode(codeOf(item)) === wantedCode || normalizedLabel(item) === wantedLabel
  );
}

function relationOrigin(row) {
  return normalizedCode(row?.origine || row?.metadati?.origine || row?.source || "MASTER_DATA");
}

function relationState({
  relations,
  sourceDictionary,
  sourceValue,
  sourceItems,
  destinationDictionaries,
  fallbackItems,
}) {
  const destinations = asList(destinationDictionaries).map(normalizedCode);
  if (!sourceValue) {
    return { items: [], mode: "WAITING", restricted: false, relationCount: 0 };
  }

  const sourceCode = selectedCode(sourceItems, sourceValue);
  const family = asList(relations).filter((row) =>
    row?.attivo !== false &&
    normalizedCode(row?.sorgente_dizionario) === normalizedCode(sourceDictionary) &&
    destinations.includes(normalizedCode(row?.destinazione_dizionario))
  );
  const matching = family.filter((row) => normalizedCode(row?.sorgente_codice) === sourceCode);

  if (!matching.length) {
    return {
      items: fallbackItems,
      mode: family.length ? "UNMAPPED" : "FALLBACK",
      restricted: false,
      relationCount: family.length,
    };
  }

  const allowed = new Set(matching.map((row) => normalizedCode(row?.destinazione_codice)));
  const filtered = asList(fallbackItems).filter((item) => allowed.has(normalizedCode(codeOf(item))));
  const historicalOnly = matching.every((row) => relationOrigin(row) === "STORICO");
  return {
    items: filtered,
    mode: historicalOnly ? "HISTORICAL" : "MASTER",
    restricted: true,
    relationCount: matching.length,
  };
}

function relationHint(state, label) {
  if (state.mode === "MASTER") return `${label} filtrati dalle relazioni ufficiali del Master Data.`;
  if (state.mode === "HISTORICAL") return `${label} proposti in base alle associazioni già presenti nel database.`;
  if (state.mode === "UNMAPPED") return `Nessuna relazione specifica configurata: sono mostrate tutte le opzioni attive.`;
  if (state.mode === "FALLBACK") return `Relazione non ancora configurata: sono mostrate tutte le opzioni attive.`;
  return "";
}

function relationError(state, selectedValue, label) {
  if (!selectedValue || !state.restricted) return "";
  return includesValue(state.items, selectedValue) ? "" : `${label} non compatibile con la selezione principale`;
}

function isFutureDate(value) {
  if (!value) return false;
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parsed > today;
}

function localTodayIso() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isValidHttpUrl(value) {
  if (!String(value || "").trim()) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function displayError(error, fallback) {
  if (typeof error === "string") return error;
  if (Array.isArray(error)) return error.map((item) => displayError(item, "")).filter(Boolean).join(" · ");
  if (error && typeof error === "object") {
    return displayError(error.messaggio || error.detail || error.errori || error.errore_originale, fallback);
  }
  return fallback;
}

export default function NewAssetWizard({
  apiBaseUrl,
  dizionari,
  user,
  executionId,
  initialData,
  onClose,
  onCreated,
  onOpenOcr,
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(() => ({ ...EMPTY, ...(initialData || {}) }));
  const [errors, setErrors] = useState([]);
  const [busy, setBusy] = useState(false);
  const [remoteMasterData, setRemoteMasterData] = useState({});
  const [relazioni, setRelazioni] = useState([]);
  const [masterLoading, setMasterLoading] = useState(true);
  const [masterError, setMasterError] = useState("");
  const [masterStatus, setMasterStatus] = useState(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && !busy) onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [busy, onClose]);


  useEffect(() => {
    let active = true;

    async function loadMasterData() {
      setMasterLoading(true);
      setMasterError("");
      try {
        const response = await fetch(`${apiBaseUrl}/core/wizard/nuovo-asset/config`);
        if (!response.ok) throw new Error("Configurazione wizard non disponibile");
        const data = await response.json();
        if (!active) return;
        setRemoteMasterData(data?.dizionari || {});
        setRelazioni(asList(data?.relazioni));
        setMasterStatus(data?.stato || null);
      } catch (primaryError) {
        try {
          const [dictionaryResponse, relationsResponse] = await Promise.all([
            fetch(`${apiBaseUrl}/core/dizionari`),
            fetch(`${apiBaseUrl}/core/relazioni?solo_attive=true`),
          ]);
          if (!dictionaryResponse.ok) throw primaryError;
          const dictionaryData = await dictionaryResponse.json();
          const relationsData = relationsResponse.ok ? await relationsResponse.json() : {};
          if (!active) return;
          setRemoteMasterData(dictionaryData?.dizionari || {});
          setRelazioni(asList(relationsData?.relazioni));
          setMasterStatus({ origine: "CORE_STANDARD", fallback: true });
        } catch (fallbackError) {
          if (!active) return;
          setMasterError(displayError(fallbackError, "Master Data non raggiungibile"));
          setRelazioni([]);
        }
      } finally {
        if (active) setMasterLoading(false);
      }
    }

    loadMasterData();
    return () => { active = false; };
  }, [apiBaseUrl]);

  const masterData = useMemo(() => mergeDictionaries(dizionari || {}, remoteMasterData), [dizionari, remoteMasterData]);

  const options = useMemo(() => ({
    sedi: withCurrent(dictionaryValues(masterData, "sedi"), form.sede),
    societa: withCurrent(dictionaryValues(masterData, "societa"), form.societa),
    tipologie: withCurrent(dictionaryValues(masterData, "tipologie_asset", "tipologie", "categorie_asset"), form.tipologia),
    categorie: withCurrent(dictionaryValues(masterData, "categorie_asset", "tipologie_asset", "tipologie"), form.categoria),
    branche: withCurrent(dictionaryValues(masterData, "branche_mediche", "branche"), form.branca_medica),
    locazioni: withCurrent(dictionaryValues(masterData, "locazioni"), form.locazione),
    fornitori: withCurrent(dictionaryValues(masterData, "fornitori", "ditte_esecutrici"), form.fornitore),
    possesso: withCurrent(dictionaryValues(masterData, "possesso", "tipologie_contratto"), form.possesso),
    periodicita: withCurrent(dictionaryValues(masterData, "periodicita"), form.periodicita),
    costruttori: withCurrent(dictionaryValues(masterData, "costruttori"), form.costruttore),
    modelli: withCurrent(dictionaryValues(masterData, "modelli"), form.modello),
    reparti: withCurrent(dictionaryValues(masterData, "reparti"), form.reparto),
    attivita: withCurrent(dictionaryValues(masterData, "piani_manutentivi", "attivita_intervento", "attivita"), form.attivita_manutentiva),
    esiti: withCurrent(dictionaryValues(masterData, "esiti_intervento", "esiti"), form.esito_collaudo),
  }), [masterData, form]);

  const modelState = useMemo(() => relationState({
    relations: relazioni,
    sourceDictionary: "COSTRUTTORI",
    sourceValue: form.costruttore,
    sourceItems: options.costruttori,
    destinationDictionaries: ["MODELLI"],
    fallbackItems: options.modelli,
  }), [relazioni, form.costruttore, options.costruttori, options.modelli]);

  const departmentState = useMemo(() => relationState({
    relations: relazioni,
    sourceDictionary: "SEDI",
    sourceValue: form.sede,
    sourceItems: options.sedi,
    destinationDictionaries: ["REPARTI"],
    fallbackItems: options.reparti,
  }), [relazioni, form.sede, options.sedi, options.reparti]);

  const locationState = useMemo(() => relationState({
    relations: relazioni,
    sourceDictionary: "SEDI",
    sourceValue: form.sede,
    sourceItems: options.sedi,
    destinationDictionaries: ["LOCAZIONI"],
    fallbackItems: options.locazioni,
  }), [relazioni, form.sede, options.sedi, options.locazioni]);

  const companyState = useMemo(() => relationState({
    relations: relazioni,
    sourceDictionary: "SEDI",
    sourceValue: form.sede,
    sourceItems: options.sedi,
    destinationDictionaries: ["SOCIETA"],
    fallbackItems: options.societa,
  }), [relazioni, form.sede, options.sedi, options.societa]);

  const branchByCategoryState = useMemo(() => relationState({
    relations: relazioni,
    sourceDictionary: "CATEGORIE_ASSET",
    sourceValue: form.categoria,
    sourceItems: options.categorie,
    destinationDictionaries: ["BRANCHE_MEDICHE"],
    fallbackItems: options.branche,
  }), [relazioni, form.categoria, options.categorie, options.branche]);

  const activityState = useMemo(() => relationState({
    relations: relazioni,
    sourceDictionary: "CATEGORIE_ASSET",
    sourceValue: form.categoria || form.tipologia,
    sourceItems: options.categorie,
    destinationDictionaries: ["PIANI_MANUTENTIVI", "ATTIVITA_INTERVENTO"],
    fallbackItems: options.attivita,
  }), [relazioni, form.categoria, form.tipologia, options.categorie, options.attivita]);

  useEffect(() => {
    if (!form.crea_piano_manutentivo || masterLoading) return;
    const current = String(form.attivita_manutentiva || "").trim();
    const compatible = includesValue(activityState.items, current);
    if (current && activityState.restricted && !compatible) {
      setForm((prev) => ({ ...prev, attivita_manutentiva: "" }));
      return;
    }
    if (!current && activityState.restricted && activityState.items.length === 1) {
      setForm((prev) => ({ ...prev, attivita_manutentiva: labelOf(activityState.items[0]) }));
    }
  }, [activityState, form.attivita_manutentiva, form.crea_piano_manutentivo, masterLoading]);

  const missingDictionaries = useMemo(() => CRITICAL_DICTIONARIES
    .filter(([key]) => !asList(options[key]).length)
    .map(([, label]) => label), [options]);

  const update = (key, value) => setForm((prev) => {
    const next = { ...prev, [key]: value };
    if (key === "costruttore") next.modello = "";
    if (key === "sede") {
      next.reparto = "";
      next.locazione = "";
      const nextCompanyState = relationState({
        relations: relazioni,
        sourceDictionary: "SEDI",
        sourceValue: value,
        sourceItems: options.sedi,
        destinationDictionaries: ["SOCIETA"],
        fallbackItems: options.societa,
      });
      next.societa = nextCompanyState.restricted && nextCompanyState.items.length === 1
        ? labelOf(nextCompanyState.items[0])
        : "";
    }
    if (key === "categoria" || key === "tipologia") {
      if (key === "categoria") next.branca_medica = "";
      next.attivita_manutentiva = "";
    }
    if (key === "data_di_collaudo" && value) {
      next.registra_collaudo_storico = true;
      next.esito_collaudo = next.esito_collaudo || "POSITIVO";
      if (!next.data_ultimo_intervento) next.data_ultimo_intervento = value;
    }
    return next;
  });

  function localErrors(index = step) {
    const out = [];
    if (masterLoading) out.push("Attendere il caricamento del Master Data");
    if (missingDictionaries.length) out.push(`Master Data incompleto: ${missingDictionaries.join(", ")}`);

    if (index === 0) {
      if (!form.tipologia) out.push("Tipologia obbligatoria");
      if (!form.sede) out.push("Sede obbligatoria");
      if (!form.matricola && !form.modello) out.push("Inserire almeno matricola o modello");
      if (form.modello && !form.costruttore) out.push("Selezionare il costruttore prima del modello");
      if (!includesValue(options.sedi, form.sede)) out.push("Sede non presente nel Master Data");
      if (!includesValue(options.tipologie, form.tipologia)) out.push("Tipologia non presente nel Master Data");
      if (!includesValue(options.costruttori, form.costruttore)) out.push("Costruttore non presente nel Master Data");
      const modelError = relationError(modelState, form.modello, "Modello");
      if (modelError) out.push(modelError);
      if (form.anno_di_fabbricazione) {
        const year = Number(form.anno_di_fabbricazione);
        const current = new Date().getFullYear();
        if (!Number.isInteger(year) || year < 1990 || year > current + 1) out.push("Anno di fabbricazione non plausibile");
      }
      if (isFutureDate(form.data_messa_in_uso)) out.push("La data di messa in uso non può essere futura");
    }

    if (index === 1) {
      if (!form.categoria) out.push("Categoria obbligatoria");
      if (!form.societa) out.push("Società obbligatoria");
      if (!includesValue(options.categorie, form.categoria)) out.push("Categoria non presente nel Master Data");
      if (!includesValue(options.societa, form.societa)) out.push("Società non presente nel Master Data");
      [
        relationError(companyState, form.societa, "Società"),
        relationError(departmentState, form.reparto, "Reparto"),
        relationError(locationState, form.locazione, "Locazione"),
        relationError(branchByCategoryState, form.branca_medica, "Branca medica"),
      ].filter(Boolean).forEach((error) => out.push(error));
    }

    if (index === 2) {
      if (!isValidHttpUrl(form.link_documento)) out.push("Il link documentazione deve iniziare con http:// o https://");
      if (isFutureDate(form.data_di_collaudo)) out.push("La data di collaudo non può essere futura");
      if (form.data_di_collaudo && form.data_messa_in_uso && form.data_messa_in_uso < form.data_di_collaudo) {
        out.push("La data di messa in uso non può precedere il collaudo");
      }
      if (form.data_di_collaudo && form.registra_collaudo_storico && !form.esito_collaudo) {
        out.push("Esito del collaudo obbligatorio per registrarlo nello storico");
      }
    }

    if (index === 3 && form.crea_piano_manutentivo) {
      if (!form.attivita_manutentiva) out.push("Attività manutentiva obbligatoria");
      if (!form.periodicita) out.push("Periodicità obbligatoria per il piano manutentivo");
      if (!form.data_ultimo_intervento) out.push("Data iniziale obbligatoria per il piano manutentivo");
      if (isFutureDate(form.data_ultimo_intervento)) out.push("La data iniziale del piano non può essere futura");
      const activityError = relationError(activityState, form.attivita_manutentiva, "Attività manutentiva");
      if (activityError) out.push(activityError);
    }

    return [...new Set(out)];
  }

  async function validateCurrent() {
    const local = localErrors();
    if (local.length) {
      setErrors(local);
      return false;
    }

    setErrors([]);
    if (step > 2) return true;

    try {
      const response = await fetch(`${apiBaseUrl}/core/valida`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modulo: "ASSET", dati: form, creazione: true }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.valido) {
        setErrors(asList(data?.errori).length ? data.errori : [displayError(data?.detail, "Dati non validi")]);
        return false;
      }
      setForm((prev) => ({ ...prev, ...(data?.dati || {}) }));
      return true;
    } catch (error) {
      setErrors([`Validazione backend non disponibile: ${displayError(error, "errore di collegamento")}`]);
      return false;
    }
  }

  async function saveProgress(nextStep) {
    if (!executionId) return;
    try {
      await fetch(`${apiBaseUrl}/core/processi/esecuzioni/${executionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passo_corrente: STEPS[nextStep]?.[0] || "CONFERMA",
          percentuale: Math.round((nextStep / (STEPS.length - 1)) * 85),
          stato: "IN_CORSO",
          dati: form,
          errori: [],
        }),
      });
    } catch {
      // Il salvataggio progressivo non blocca il lavoro: la conferma finale resta transazionale.
    }
  }

  async function next() {
    if (!(await validateCurrent())) return;
    const nextStep = Math.min(STEPS.length - 1, step + 1);
    setStep(nextStep);
    saveProgress(nextStep);
  }

  async function submit() {
    const allErrors = STEPS.flatMap((_, index) => localErrors(index));
    if (allErrors.length) {
      setErrors([...new Set(allErrors)]);
      return;
    }

    setBusy(true);
    setErrors([]);
    try {
      const response = await fetch(`${apiBaseUrl}/core/processi/nuovo-asset/conferma`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dati: form, avviato_da: user || "FMED", esecuzione_id: executionId || null }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data?.status !== "ok") {
        const detailErrors = asList(data?.detail?.errori || data?.errori);
        throw new Error(detailErrors.length
          ? detailErrors.map((item) => displayError(item, "")).join(" · ")
          : displayError(data?.detail || data, "Creazione asset non riuscita"));
      }
      onCreated?.(data);
    } catch (error) {
      setErrors([displayError(error?.message || error, "Creazione asset non riuscita")]);
    } finally {
      setBusy(false);
    }
  }

  const todayIso = localTodayIso();
  const sourceLabel = masterStatus?.origine === "MASTER_DATA" ? "Master Data ufficiale" : "Configurazione FMED";

  return (
    <section className="fmed-wizard-page" aria-label="Processo guidato Nuovo Asset">
      <div className="fmed-wizard-card">
        <header className="fmed-wizard-head">
          <div className="fmed-banner-heading">
            <FmedModuleIcon module="NuovoAsset" />
            <div className="fmed-banner-copy">
              <span>FMED ENTERPRISE 1.0 · E5.2.1</span>
              <h2>Nuovo Asset</h2>
              <p>Creazione industrializzata con dati centrali, relazioni intelligenti, controlli backend, SharePoint, QR e piano manutentivo.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Torna indietro" title="Torna indietro">←</button>
        </header>

        <div className={`fmed-wizard-master-status ${masterError ? "error" : masterLoading ? "loading" : "ready"}`}>
          <div>
            <strong>{masterLoading ? "Sincronizzazione Master Data…" : masterError ? "Master Data non sincronizzato" : `${sourceLabel} sincronizzato`}</strong>
            <span>{masterLoading
              ? "FMED sta caricando dizionari e relazioni attive."
              : masterError
                ? masterError
                : `${relazioni.length} relazioni disponibili${masterStatus?.fallback_dizionari?.length ? ` · fallback controllato: ${masterStatus.fallback_dizionari.join(", ")}` : ""}.`}</span>
          </div>
          {!masterLoading && !masterError && <b>LIVE</b>}
        </div>

        <nav className="fmed-wizard-steps" aria-label="Passaggi Nuovo Asset">
          {STEPS.map(([code, title], index) => (
            <button
              type="button"
              key={code}
              className={index === step ? "active" : index < step ? "done" : ""}
              onClick={() => index < step && setStep(index)}
              aria-current={index === step ? "step" : undefined}
            >
              <b>{index + 1}</b><span>{title}</span>
            </button>
          ))}
        </nav>

        {errors.length > 0 && <div className="fmed-wizard-errors" role="alert">{errors.map((error) => <div key={error}>• {error}</div>)}</div>}

        <main className="fmed-wizard-body">
          {step === 0 && <div className="fmed-wizard-grid">
            {onOpenOcr && <div className="fmed-wizard-ocr wide">
              <div><strong>Acquisizione targhetta OCR</strong><span>Usa il lettore già presente in FMED e rientra nel wizard con la bozza compilata.</span></div>
              <button type="button" onClick={() => onOpenOcr(form)}>Apri scansione targhetta</button>
            </div>}
            <Field label="Codice inventario" hint="Lascia vuoto per generazione automatica"><input value={form.codicestrumento || ""} onChange={(event) => update("codicestrumento", event.target.value.toUpperCase())} /></Field>
            <Select label="Sede *" value={form.sede} onChange={(value) => update("sede", value)} items={options.sedi} loading={masterLoading} />
            <Select label="Tipologia *" value={form.tipologia} onChange={(value) => update("tipologia", value)} items={options.tipologie} allowCode loading={masterLoading} />
            <Select label="Costruttore" value={form.costruttore} onChange={(value) => update("costruttore", value)} items={options.costruttori} emptyText="Seleziona costruttore" loading={masterLoading} />
            <Select
              label="Modello"
              value={form.modello}
              onChange={(value) => update("modello", value)}
              items={modelState.items}
              disabled={!form.costruttore || masterLoading}
              emptyText={!form.costruttore ? "Prima seleziona il costruttore" : "Seleziona modello"}
              hint={form.costruttore ? relationHint(modelState, "Modelli") : ""}
            />
            <Field label="Matricola"><input value={form.matricola || ""} onChange={(event) => update("matricola", event.target.value)} /></Field>
            <Field label="Anno di fabbricazione"><input inputMode="numeric" value={form.anno_di_fabbricazione || ""} onChange={(event) => update("anno_di_fabbricazione", event.target.value.replace(/\D/g, "").slice(0, 4))} /></Field>
            <Field label="Data messa in uso"><input type="date" max={todayIso} value={form.data_messa_in_uso || ""} onChange={(event) => update("data_messa_in_uso", event.target.value)} /></Field>
          </div>}

          {step === 1 && <div className="fmed-wizard-grid">
            <Select label="Società *" value={form.societa} onChange={(value) => update("societa", value)} items={companyState.items.length ? companyState.items : options.societa} hint={form.sede ? relationHint(companyState, "Società") : ""} />
            <Select label="Categoria *" value={form.categoria} onChange={(value) => update("categoria", value)} items={options.categorie} allowCode />
            <Select label="Branca medica" value={form.branca_medica} onChange={(value) => update("branca_medica", value)} items={branchByCategoryState.items.length ? branchByCategoryState.items : options.branche} hint={form.categoria ? relationHint(branchByCategoryState, "Branche") : ""} />
            <Select
              label="Reparto"
              value={form.reparto}
              onChange={(value) => update("reparto", value)}
              items={departmentState.items}
              disabled={!form.sede || masterLoading}
              emptyText={!form.sede ? "Prima seleziona la sede" : "Seleziona reparto"}
              hint={form.sede ? relationHint(departmentState, "Reparti") : ""}
            />
            <Select
              label="Locazione"
              value={form.locazione}
              onChange={(value) => update("locazione", value)}
              items={locationState.items}
              disabled={!form.sede || masterLoading}
              emptyText={!form.sede ? "Prima seleziona la sede" : "Seleziona locazione"}
              hint={form.sede ? relationHint(locationState, "Locazioni") : ""}
            />
            <Select label="Possesso" value={form.possesso} onChange={(value) => update("possesso", value)} items={options.possesso} />
            <Select label="Fornitore" value={form.fornitore} onChange={(value) => update("fornitore", value)} items={options.fornitori} />
          </div>}

          {step === 2 && <div className="fmed-wizard-grid">
            <Field label="Link documentazione esistente" wide><input placeholder="Opzionale: la cartella SharePoint sarà creata automaticamente" value={form.link_documento || ""} onChange={(event) => update("link_documento", event.target.value)} /></Field>
            <Field label="Data collaudo"><input type="date" max={todayIso} value={form.data_di_collaudo || ""} onChange={(event) => update("data_di_collaudo", event.target.value)} /></Field>
            {form.data_di_collaudo && <>
              <label className="fmed-wizard-check wide"><input type="checkbox" checked={Boolean(form.registra_collaudo_storico)} onChange={(event) => update("registra_collaudo_storico", event.target.checked)} /><span><b>Registra automaticamente il collaudo nello storico</b><small>FMED creerà un intervento concluso con la data indicata. Il piano manutentivo futuro resta separato.</small></span></label>
              {form.registra_collaudo_storico && <Select label="Esito collaudo *" value={form.esito_collaudo} onChange={(value) => update("esito_collaudo", value)} items={options.esiti} allowCode />}
            </>}
            <Field label="Note operative" wide><textarea rows="6" value={form.note || ""} onChange={(event) => update("note", event.target.value)} /></Field>
            <div className="fmed-wizard-info wide">La conferma crea o collega automaticamente la cartella SharePoint e restituisce i dati per QR ed etichetta. Nessun percorso deve essere scritto manualmente.</div>
          </div>}

          {step === 3 && <div className="fmed-wizard-grid">
            <div className="fmed-wizard-info wide"><b>Collaudo e piano manutentivo sono distinti.</b> Il collaudo, se indicato, viene salvato nello storico come attività conclusa. Qui programmi invece il primo ciclo futuro e la relativa scadenza.</div>
            <label className="fmed-wizard-check wide"><input type="checkbox" checked={Boolean(form.crea_piano_manutentivo)} onChange={(event) => update("crea_piano_manutentivo", event.target.checked)} /><span><b>Crea subito il primo ciclo manutentivo</b><small>FMED calcola la prossima scadenza e registra il ciclo come ATTIVO, senza confonderlo con il collaudo iniziale.</small></span></label>
            {form.crea_piano_manutentivo && <>
              <Select
                label="Attività manutentiva *"
                value={form.attivita_manutentiva}
                onChange={(value) => update("attivita_manutentiva", value)}
                items={activityState.items.length ? activityState.items : options.attivita}
                emptyText="Seleziona attività"
                hint={relationHint(activityState, "Attività") || (!options.attivita.length ? "Configurare attività o piani manutentivi nel Master Data." : "")}
              />
              <Select label="Periodicità *" value={form.periodicita} onChange={(value) => update("periodicita", value)} items={options.periodicita} allowCode />
              <Field label="Data iniziale *"><input type="date" max={todayIso} value={form.data_ultimo_intervento || ""} onChange={(event) => update("data_ultimo_intervento", event.target.value)} /></Field>
            </>}
          </div>}

          {step === 4 && <div className="fmed-wizard-summary">
            <h3>Controllo finale</h3>
            <Summary label="Asset" value={[form.costruttore, form.modello].filter(Boolean).join(" · ") || form.tipologia} />
            <Summary label="Codice" value={form.codicestrumento || "Generazione automatica"} />
            <Summary label="Sede e società" value={[form.sede, form.societa].filter(Boolean).join(" · ")} />
            <Summary label="Matricola" value={form.matricola || "Non indicata"} />
            <Summary label="Classificazione" value={[form.categoria, form.branca_medica, form.reparto, form.locazione].filter(Boolean).join(" · ")} />
            <Summary label="Documentazione" value={form.link_documento ? "Link esistente collegato" : "Cartella SharePoint automatica"} />
            <Summary label="Collaudo storico" value={form.data_di_collaudo && form.registra_collaudo_storico ? `${form.data_di_collaudo} · ${String(form.esito_collaudo || "POSITIVO").replaceAll("_", " ")}` : "Non registrato"} />
            <Summary label="Piano manutentivo" value={form.crea_piano_manutentivo ? `${form.attivita_manutentiva} · ${form.periodicita}` : "Non creato"} />
            <div className="fmed-wizard-info">Alla conferma il backend ripete validazioni e relazioni, blocca duplicati evidenti e registra il processo nel Registro Eventi.</div>
          </div>}
        </main>

        <footer className="fmed-wizard-actions">
          <button type="button" className="secondary" disabled={step === 0 || busy} onClick={() => setStep((current) => current - 1)}>Indietro</button>
          <div className="fmed-wizard-progress" aria-label={`Avanzamento ${step + 1} di ${STEPS.length}`}><span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div>
          {step < STEPS.length - 1
            ? <button type="button" disabled={busy || masterLoading} onClick={next}>Continua</button>
            : <button type="button" disabled={busy || masterLoading} onClick={submit}>{busy ? "Creazione…" : "Crea asset e completa processo"}</button>}
        </footer>
      </div>
    </section>
  );
}

function Field({ label, hint, wide, children }) {
  return <label className={`fmed-wizard-field ${wide ? "wide" : ""}`}><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
}

function Select({ label, value, onChange, items, allowCode = false, disabled = false, loading = false, emptyText = "Seleziona", hint = "" }) {
  const safeItems = uniqueOptions(items);
  return <label className="fmed-wizard-field">
    <span>{label}</span>
    <select value={value || ""} disabled={disabled || loading} onChange={(event) => onChange(event.target.value)}>
      <option value="">{loading ? "Caricamento…" : emptyText}</option>
      {safeItems.map((item) => {
        const optionValue = allowCode ? codeOf(item) : labelOf(item);
        return <option key={`${normalizedCode(codeOf(item))}-${normalizedLabel(item)}`} value={optionValue}>{labelOf(item)}</option>;
      })}
    </select>
    {hint && <small>{hint}</small>}
  </label>;
}

function Summary({ label, value }) {
  return <div className="fmed-wizard-summary-row"><span>{label}</span><strong>{value || "—"}</strong></div>;
}
