import { useEffect, useMemo, useState } from "react";
import { fmedAuthHeaders, fmedFetchJson, fmedSession } from "../../fmedApiClient.js";
import "./CanonicalSelect.css";

const FIELD_DICTIONARIES = {
  sede: "SEDI",
  societa: "SOCIETA",
  locazione: "LOCAZIONI",
  reparto: "REPARTI",
  branca_medica: "BRANCHE_MEDICHE",
  categoria: "CATEGORIE_ASSET",
  stato_asset: "STATI_ASSET",
  possesso: "POSSESSO",
  fornitore: "FORNITORI",
  costruttore: "COSTRUTTORI",
  modello: "MODELLI",
  tipologia: "TIPOLOGIE_ASSET",
  attivita: "ATTIVITA_INTERVENTO",
  ditta: "DITTE_ESECUTRICI",
  ditta_esecutrice: "DITTE_ESECUTRICI",
  periodicita: "PERIODICITA",
  esito: "ESITI_INTERVENTO",
  priorita: "PRIORITA",
  stato: "STATI_INFRASTRUTTURA",
  descrizione: "ITEM_INFRASTRUTTURE",
  centro_costo: "CENTRI_COSTO",
  responsabile: "RESPONSABILI",
};

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .toLocaleUpperCase("it-IT");
}

function optionLabel(item) {
  if (item && typeof item === "object") return String(item.etichetta || item.label || item.nome || item.codice || "").trim();
  return String(item || "").trim();
}

function dictionaryPayloadKey(code) {
  return String(code || "").trim().toLocaleLowerCase("it-IT");
}

function inferDictionary(field, label, explicit) {
  if (explicit) return String(explicit).toUpperCase();
  if (field === "categoria" && String(label || "").toUpperCase().includes("INFRA")) return "CATEGORIE_INFRASTRUTTURE";
  return FIELD_DICTIONARIES[field] || "";
}

function roleInfo() {
  const session = fmedSession();
  const role = String(session?.ruolo || session?.role || "USER").toUpperCase();
  return {
    role,
    canApprove: ["ADMIN", "AMMINISTRATORE", "SUPERADMIN"].includes(role),
    actor: String(session?.email || session?.nome || "FMED_USER"),
  };
}

function relationContextFor(dictionaryCode, form = {}) {
  const contexts = {
    MODELLI: ["COSTRUTTORI", form?.costruttore],
    REPARTI: ["SEDI", form?.sede],
    LOCAZIONI: ["SEDI", form?.sede],
    SOCIETA: ["SEDI", form?.sede],
    BRANCHE_MEDICHE: ["CATEGORIE_ASSET", form?.categoria],
    ATTIVITA_INTERVENTO: form?.categoria ? ["CATEGORIE_ASSET", form.categoria] : ["TIPOLOGIE_ASSET", form?.tipologia],
    PIANI_MANUTENTIVI: form?.categoria ? ["CATEGORIE_ASSET", form.categoria] : ["TIPOLOGIE_ASSET", form?.tipologia],
    ITEM_INFRASTRUTTURE: ["CATEGORIE_INFRASTRUTTURE", form?.categoria],
    ATTIVITA_INFRASTRUTTURE: ["ITEM_INFRASTRUTTURE", form?.descrizione],
    ATTIVITA_8108: ["TIPOLOGIE_DOCUMENTO_8108", form?.tipologia_documento],
  };
  const context = contexts[String(dictionaryCode || "").toUpperCase()];
  if (!context || !String(context[1] || "").trim()) return null;
  return { sourceDictionary: context[0], sourceValue: String(context[1]).trim() };
}

function labelsFromCatalog(catalog, key) {
  const rows = Array.isArray(catalog?.[dictionaryPayloadKey(key)]) ? catalog[dictionaryPayloadKey(key)] : [];
  return rows.map(optionLabel).filter(Boolean);
}

export default function CanonicalSelect({
  label,
  field = "",
  dictionary = "",
  value = "",
  onChange,
  options = [],
  disabled = false,
  loading = false,
  hint = "",
  placeholder = "",
  style,
  selectClassName = "",
  apiBaseUrl = "",
  allowQuickAdd = true,
  form = {},
  restrictToOptions = false,
}) {
  const [extraOptions, setExtraOptions] = useState([]);
  const [catalog, setCatalog] = useState({});
  const [catalogLoaded, setCatalogLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ etichetta: "", famiglia: "", categoria: "", ambito: "", aliases: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const dictionaryCode = inferDictionary(field, label, dictionary);
  const role = roleInfo();
  const relationContext = relationContextFor(dictionaryCode, form);

  useEffect(() => {
    let cancelled = false;
    async function loadCatalog() {
      try {
        const data = await fmedFetchJson("/core/dizionari", { apiBaseUrl, retries: 1 });
        if (!cancelled) {
          setCatalog(data?.dizionari && typeof data.dizionari === "object" ? data.dizionari : {});
          setCatalogLoaded(true);
        }
      } catch {
        if (!cancelled) setCatalogLoaded(false);
      }
    }
    loadCatalog();
    const refresh = () => loadCatalog();
    window.addEventListener("fmed:master-data-updated", refresh);
    return () => {
      cancelled = true;
      window.removeEventListener("fmed:master-data-updated", refresh);
    };
  }, [apiBaseUrl, dictionaryCode]);

  const canonicalRemoteOptions = useMemo(
    () => labelsFromCatalog(catalog, dictionaryCode),
    [catalog, dictionaryCode],
  );

  const cleanOptions = useMemo(() => {
    const map = new Map();
    const source = restrictToOptions
      ? (Array.isArray(options) ? options : [])
      : (catalogLoaded ? canonicalRemoteOptions : (Array.isArray(options) ? options : []));
    for (const item of [...source, ...extraOptions, value]) {
      const labelValue = optionLabel(item);
      if (!labelValue) continue;
      const key = normalize(labelValue);
      if (!map.has(key)) map.set(key, labelValue);
    }
    return [...map.values()].sort((a, b) => a.localeCompare(b, "it", { numeric: true, sensitivity: "base" }));
  }, [options, canonicalRemoteOptions, catalogLoaded, extraOptions, value, restrictToOptions]);

  const familyOptions = useMemo(() => labelsFromCatalog(catalog, "FAMIGLIE_ATTIVITA"), [catalog]);
  const scopeOptions = useMemo(() => labelsFromCatalog(catalog, "AMBITI_OPERATIVI"), [catalog]);
  const categoryDictionary = dictionaryCode.includes("INFRA") || dictionaryCode === "ITEM_INFRASTRUTTURE"
    ? "CATEGORIE_INFRASTRUTTURE"
    : "CATEGORIE_ASSET";
  const categoryOptions = useMemo(() => labelsFromCatalog(catalog, categoryDictionary), [catalog, categoryDictionary]);

  useEffect(() => {
    if (!open || !dictionaryCode || draft.etichetta.trim().length < 2) {
      setSuggestions([]);
      return undefined;
    }
    const timer = setTimeout(async () => {
      try {
        const data = await fmedFetchJson(`/core/dizionari/suggerimenti?dizionario=${encodeURIComponent(dictionaryCode)}&testo=${encodeURIComponent(draft.etichetta.trim())}&limit=5`, { apiBaseUrl, retries: 1 });
        setSuggestions(Array.isArray(data?.suggerimenti) ? data.suggerimenti : []);
      } catch {
        setSuggestions([]);
      }
    }, 320);
    return () => clearTimeout(timer);
  }, [open, dictionaryCode, draft.etichetta, apiBaseUrl]);

  function openQuickAdd() {
    setDraft({
      etichetta: "",
      famiglia: form?.famiglia_attivita || "",
      categoria: form?.categoria || "",
      ambito: dictionaryCode.includes("INFRA") ? "Infrastrutture" : "",
      aliases: "",
    });
    setSuggestions([]);
    setMessage("");
    setOpen(true);
  }

  async function save() {
    const etichetta = draft.etichetta.trim();
    if (!etichetta) {
      setMessage("Inserisci la denominazione standard.");
      return;
    }
    const exact = cleanOptions.find(item => normalize(item) === normalize(etichetta));
    if (exact) {
      onChange?.(exact);
      setOpen(false);
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const aliases = draft.aliases.split(/[\n,;]+/).map(item => item.trim()).filter(Boolean);
      const active = role.canApprove;
      const data = await fmedFetchJson("/core/dizionari/valori", {
        apiBaseUrl,
        method: "POST",
        retries: 1,
        headers: fmedAuthHeaders(),
        body: JSON.stringify({
          dizionario: dictionaryCode,
          codice: "AUTO",
          etichetta,
          ordine: 100,
          attivo: active,
          metadati: {
            famiglia: draft.famiglia || null,
            categoria: draft.categoria || null,
            ambito: draft.ambito || null,
            aliases,
            origine: "QUICK_ADD_CONTESTUALE_E5_2_2",
            stato_governance: active ? "APPROVATO" : "RICHIESTA_APPROVAZIONE",
            richiesto_da: role.actor,
            relazione_contestuale: relationContext ? {
              sorgente_dizionario: relationContext.sourceDictionary,
              sorgente_valore: relationContext.sourceValue,
              destinazione_dizionario: dictionaryCode,
            } : null,
          },
        }),
      });
      if (!active) {
        setMessage("Richiesta registrata. La voce sarà disponibile dopo l'approvazione dell'amministratore.");
        return;
      }
      let relationWarning = "";
      if (relationContext && data?.codice) {
        try {
          const source = await fmedFetchJson(`/core/dizionari/risolvi?dizionario=${encodeURIComponent(relationContext.sourceDictionary)}&valore=${encodeURIComponent(relationContext.sourceValue)}`, { apiBaseUrl, retries: 1 });
          if (source?.codice) {
            await fmedFetchJson("/core/relazioni", {
              apiBaseUrl, method: "POST", retries: 1, headers: fmedAuthHeaders(),
              body: JSON.stringify({
                tipo: "CONSENTE",
                sorgente_dizionario: relationContext.sourceDictionary,
                sorgente_codice: source.codice,
                destinazione_dizionario: dictionaryCode,
                destinazione_codice: data.codice,
                priorita: 100,
                obbligatoria: false,
                attivo: true,
                metadati: { origine: "QUICK_ADD_CONTESTUALE_E5_2_2", creato_da: role.actor },
              }),
            });
          } else {
            relationWarning = "Voce creata; relazione contestuale non applicata perché il valore sorgente non è ancora canonico.";
          }
        } catch (relationError) {
          relationWarning = "Voce creata e selezionata; la relazione contestuale potrà essere completata da Dizionari.";
          console.warn("FMED Quick Add: relazione contestuale non salvata", relationError);
        }
      }
      setExtraOptions(prev => [...prev, etichetta]);
      onChange?.(etichetta, { codice: data?.codice, dizionario: dictionaryCode, relationWarning });
      window.dispatchEvent(new CustomEvent("fmed:master-data-updated", { detail: { dizionario: dictionaryCode, codice: data?.codice, etichetta, relazione: relationContext, relationWarning } }));
      setOpen(false);
    } catch (error) {
      setMessage(error?.message || "Impossibile salvare la nuova voce.");
    } finally {
      setBusy(false);
    }
  }

  return <div className="fmed-canonical-field" style={style}>
    {label && <label className="fmed-canonical-label">{label}</label>}
    <div className="fmed-canonical-row">
      <select
        className={`fmed-canonical-select ${selectClassName}`.trim()}
        value={String(value || "")}
        disabled={disabled || loading}
        onChange={event => onChange?.(event.target.value)}
      >
        <option value="">{placeholder || `Seleziona ${String(label || "voce").toLocaleLowerCase("it-IT")}`}</option>
        {!cleanOptions.length && <option value="" disabled>Nessuna voce disponibile</option>}
        {cleanOptions.map(item => <option key={`${dictionaryCode}-${item}`} value={item}>{item}</option>)}
      </select>
      {allowQuickAdd && dictionaryCode && <button type="button" className="fmed-canonical-add" onClick={openQuickAdd} disabled={disabled || loading} title={`Aggiungi una voce a ${dictionaryCode}`}>＋</button>}
    </div>
    {hint && <small className="fmed-canonical-hint">{hint}</small>}

    {open && <div className="fmed-canonical-overlay" role="dialog" aria-modal="true" aria-label={`Nuova voce ${dictionaryCode}`}>
      <section className="fmed-canonical-dialog">
        <header className="fmed-canonical-dialog-head">
          <div><small>{dictionaryCode}</small><h3>Nuova voce contestuale</h3><p>Il modulo aperto resta invariato. Dopo il salvataggio torni esattamente al punto corrente.</p></div>
          <button type="button" className="fmed-canonical-close" onClick={() => setOpen(false)} aria-label="Chiudi">×</button>
        </header>
        <div className="fmed-canonical-body">
          <div className="fmed-canonical-grid">
            <label className="wide">Denominazione standard<input autoFocus value={draft.etichetta} onChange={e => setDraft(prev => ({ ...prev, etichetta: e.target.value }))} placeholder="Inserisci una denominazione chiara e univoca" /></label>
            <label>Famiglia<select value={draft.famiglia} onChange={e => setDraft(prev => ({ ...prev, famiglia: e.target.value }))}><option value="">Nessuna / da classificare</option>{familyOptions.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
            <label>Categoria<select value={draft.categoria} onChange={e => setDraft(prev => ({ ...prev, categoria: e.target.value }))}><option value="">Nessuna / da classificare</option>{categoryOptions.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
            <label className="wide">Ambito<select value={draft.ambito} onChange={e => setDraft(prev => ({ ...prev, ambito: e.target.value }))}><option value="">Seleziona ambito</option>{scopeOptions.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
            <label className="wide">Alias storici<textarea value={draft.aliases} onChange={e => setDraft(prev => ({ ...prev, aliases: e.target.value }))} placeholder="Una variante storica per riga oppure separate da virgola" /></label>
          </div>
          {!!suggestions.length && <div className="fmed-canonical-suggestions"><strong>Controlla prima le voci simili già presenti</strong>{suggestions.map(item => <button type="button" className="fmed-canonical-suggestion" key={item.codice} onClick={() => { onChange?.(item.etichetta); setOpen(false); }}><span>{item.etichetta}</span><small>{item.codice} · {Math.round(Number(item.similarita || 0) * 100)}%</small></button>)}</div>}
          {message && <div className="fmed-canonical-message">{message}</div>}
          <div className="fmed-canonical-actions"><button type="button" className="fmed-canonical-cancel" onClick={() => setOpen(false)}>Annulla</button><button type="button" className="fmed-canonical-save" onClick={save} disabled={busy}>{busy ? "Salvataggio…" : role.canApprove ? "Crea e seleziona" : "Invia richiesta"}</button></div>
        </div>
      </section>
    </div>}
  </div>;
}
