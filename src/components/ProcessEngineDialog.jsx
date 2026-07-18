import { useEffect, useMemo, useState } from "react";
import CanonicalSelect from "./masterdata/CanonicalSelect.jsx";
import { fmedAuthHeaders, fmedFetchJson, fmedSession } from "../fmedApiClient.js";
import "./ProcessEngineDialog.css";

const EMPTY_FORM = {
  titolo: "",
  sede: "",
  riferimento_id: "",
  attivita: "",
  priorita: "MEDIA",
  responsabile: "",
  scadenza: "",
  descrizione: "",
};

function actor() {
  const session = fmedSession();
  return String(session?.email || session?.nome || "FMED_USER");
}

function elementLabel(moduleCode) {
  const key = String(moduleCode || "").toUpperCase();
  if (key === "INFRASTRUTTURE") return "Codice infrastruttura o impianto";
  if (key === "ASSET") return "Codice cespite";
  if (key === "SICUREZZA_81_08") return "Documento o adempimento collegato";
  if (key === "FORMAZIONE") return "Corso, gruppo o riferimento";
  if (key === "SORVEGLIANZA_SANITARIA") return "Gruppo o riferimento amministrativo";
  if (key === "CONTRATTI") return "Contratto o servizio collegato";
  return "Elemento o riferimento collegato";
}

export default function ProcessEngineDialog({ process, apiBaseUrl, onClose, onCreated }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [elementOptions, setElementOptions] = useState([]);
  const [elementsLoading, setElementsLoading] = useState(false);

  useEffect(() => {
    setForm({
      ...EMPTY_FORM,
      titolo: process?.titolo || "",
      priorita: "MEDIA",
    });
    setMessage("");
  }, [process]);

  useEffect(() => {
    let cancelled = false;
    async function loadElements() {
      const moduleCode = String(process?.modulo || "").toUpperCase();
      setElementsLoading(true);
      setElementOptions([]);
      try {
        let options = [];
        if (moduleCode === "INFRASTRUTTURE") {
          const rows = await fmedFetchJson("/infrastrutture", { apiBaseUrl, retries: 1, timeoutMs: 60000 });
          options = (Array.isArray(rows) ? rows : []).map(row => ({
            value: String(row?.codice || row?.id || "").trim(),
            label: [row?.codice || `INF-${row?.id || ""}`, row?.descrizione, row?.sede].filter(Boolean).join(" · "),
            sede: row?.sede || "",
          })).filter(item => item.value);
        } else if (moduleCode === "ASSET") {
          const rows = await fmedFetchJson("/censimento?limit=5000", { apiBaseUrl, retries: 1, timeoutMs: 60000 });
          options = (Array.isArray(rows) ? rows : []).map(row => ({
            value: String(row?.codicestrumento || row?.codice_strumento || row?.codice || "").trim(),
            label: [row?.codicestrumento || row?.codice_strumento, row?.tipologia, row?.costruttore, row?.modello, row?.sede].filter(Boolean).join(" · "),
            sede: row?.sede || "",
          })).filter(item => item.value);
        } else if (moduleCode === "SICUREZZA_81_08") {
          const data = await fmedFetchJson("/sicurezza-81-08/documenti?max_items=5000", { apiBaseUrl, retries: 1, timeoutMs: 60000 });
          options = (Array.isArray(data?.documenti) ? data.documenti : []).map(row => ({
            value: String(row?.id || row?.percorso || row?.nome || "").trim(),
            label: [row?.nome, row?.categoria_label || row?.categoria, row?.sede_label || row?.sede].filter(Boolean).join(" · "),
            sede: row?.sede_label || row?.sede || "",
          })).filter(item => item.value);
        }
        if (!cancelled) setElementOptions(options);
      } catch {
        if (!cancelled) setElementOptions([]);
      } finally {
        if (!cancelled) setElementsLoading(false);
      }
    }
    loadElements();
    return () => { cancelled = true; };
  }, [process, apiBaseUrl]);

  const activityDictionary = useMemo(
    () => process?.attivita_dizionario || (process?.modulo === "INFRASTRUTTURE" ? "ATTIVITA_INFRASTRUTTURE" : "ATTIVITA_PROCESSO"),
    [process],
  );

  if (!process) return null;

  function update(field, value) {
    setForm(previous => ({ ...previous, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (!form.sede) {
      setMessage("Seleziona la sede.");
      return;
    }
    if (process.richiede_elemento && !form.riferimento_id.trim()) {
      setMessage("Inserisci o seleziona l'elemento interessato.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const data = await fmedFetchJson("/process-engine/esecuzioni", {
        apiBaseUrl,
        method: "POST",
        headers: fmedAuthHeaders(),
        retries: 1,
        timeoutMs: 60000,
        body: JSON.stringify({
          processo: process.codice,
          titolo: form.titolo || process.titolo,
          sede: form.sede,
          priorita: form.priorita,
          responsabile: form.responsabile || null,
          assegnato_a: form.responsabile || null,
          scadenza: form.scadenza || null,
          attivita: form.attivita || null,
          descrizione: form.descrizione || null,
          riferimento_modulo: process.modulo,
          riferimento_id: form.riferimento_id.trim() || null,
          avviato_da: actor(),
          dati: {
            sede: form.sede,
            elemento_codice: form.riferimento_id.trim() || null,
            attivita: form.attivita || null,
            descrizione: form.descrizione || null,
            responsabile: form.responsabile || null,
            priorita: form.priorita,
            scadenza: form.scadenza || null,
          },
        }),
      });
      onCreated?.(data?.esecuzione, data?.warning);
    } catch (error) {
      setMessage(error?.message || "Creazione processo non riuscita.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fmed-process-dialog-backdrop" role="presentation" onMouseDown={event => {
      if (event.target === event.currentTarget && !busy) onClose?.();
    }}>
      <section className="fmed-process-dialog" role="dialog" aria-modal="true" aria-labelledby="fmed-process-dialog-title">
        <header>
          <div>
            <span>{process.modulo?.replaceAll("_", " ")}</span>
            <h3 id="fmed-process-dialog-title">{process.titolo}</h3>
            <p>{process.descrizione}</p>
          </div>
          <button type="button" className="fmed-process-dialog-close" onClick={onClose} disabled={busy} aria-label="Chiudi">×</button>
        </header>

        <form onSubmit={submit}>
          <div className="fmed-process-dialog-grid">
            <label className="fmed-process-dialog-field is-wide">
              <span>Titolo operativo</span>
              <input value={form.titolo} onChange={event => update("titolo", event.target.value)} maxLength={300} required />
            </label>

            <CanonicalSelect
              label="Sede"
              field="sede"
              dictionary="SEDI"
              value={form.sede}
              onChange={value => update("sede", value)}
              apiBaseUrl={apiBaseUrl}
              form={form}
              allowQuickAdd
            />

            {(process.richiede_elemento || elementOptions.length > 0) && <label className="fmed-process-dialog-field">
              <span>{elementLabel(process.modulo)}</span>
              <select
                value={form.riferimento_id}
                onChange={event => {
                  const selected = elementOptions.find(item => item.value === event.target.value);
                  setForm(previous => ({
                    ...previous,
                    riferimento_id: event.target.value,
                    sede: selected?.sede || previous.sede,
                  }));
                }}
                required={Boolean(process.richiede_elemento)}
                disabled={elementsLoading}
              >
                <option value="">{elementsLoading ? "Caricamento elementi…" : "Seleziona dal catalogo FMED"}</option>
                {elementOptions.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
              {!elementsLoading && process.richiede_elemento && elementOptions.length === 0 && <small>Nessun elemento disponibile nel catalogo del modulo. Crealo prima tramite il Quick Add o il modulo dedicato.</small>}
            </label>}

            <CanonicalSelect
              label="Attività standard"
              field="attivita"
              dictionary={activityDictionary}
              value={form.attivita}
              onChange={value => update("attivita", value)}
              apiBaseUrl={apiBaseUrl}
              form={{ ...form, ambito: process.modulo }}
              allowQuickAdd
            />

            <CanonicalSelect
              label="Priorità"
              field="priorita"
              dictionary="PRIORITA"
              value={form.priorita}
              onChange={value => update("priorita", value)}
              options={["BASSA", "MEDIA", "ALTA", "URGENTE"]}
              apiBaseUrl={apiBaseUrl}
              form={form}
              allowQuickAdd={false}
            />

            <CanonicalSelect
              label="Responsabile"
              field="responsabile"
              dictionary="RESPONSABILI"
              value={form.responsabile}
              onChange={value => update("responsabile", value)}
              apiBaseUrl={apiBaseUrl}
              form={form}
              allowQuickAdd
            />

            <label className="fmed-process-dialog-field">
              <span>Scadenza</span>
              <input type="date" value={form.scadenza} onChange={event => update("scadenza", event.target.value)} />
            </label>

            <label className="fmed-process-dialog-field is-wide">
              <span>Descrizione e obiettivo</span>
              <textarea value={form.descrizione} onChange={event => update("descrizione", event.target.value)} rows="4" placeholder="Testo narrativo: descrivi problema, risultato atteso o note operative." />
            </label>
          </div>

          {message && <div className="fmed-process-dialog-message">{message}</div>}

          <footer>
            <button type="button" className="is-secondary" onClick={onClose} disabled={busy}>Annulla</button>
            <button type="submit" disabled={busy}>{busy ? "Apertura in corso…" : "Apri processo"}</button>
          </footer>
        </form>
      </section>
    </div>
  );
}
