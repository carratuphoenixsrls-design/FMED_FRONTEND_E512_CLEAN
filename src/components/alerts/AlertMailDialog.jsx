import { useEffect, useMemo, useState } from "react";

function splitRecipients(value) {
  return String(value || "")
    .split(/[,;\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AlertMailDialog({
  open,
  onClose,
  onSend,
  onCheck,
  onOpenOutlook,
  sites = [],
  defaultRecipients = "",
}) {
  const [recipients, setRecipients] = useState(defaultRecipients);
  const [site, setSite] = useState("");
  const [days, setDays] = useState(30);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!open) return;
    setRecipients(defaultRecipients || "");
    setSite("");
    setDays(30);
    setStatus(null);
  }, [open, defaultRecipients]);

  const payload = useMemo(() => {
    const parsed = splitRecipients(recipients);
    return {
      destinatari: parsed.length ? parsed : null,
      sede: site || null,
      giorni: Number(days || 30),
    };
  }, [recipients, site, days]);

  if (!open) return null;

  async function run(action) {
    setBusy(true);
    setStatus(null);
    try {
      const result = await action(payload);
      setStatus({ ok: true, ...result });
    } catch (error) {
      setStatus({ ok: false, message: error?.message || "Operazione non riuscita" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fmed-alert-dialog-overlay" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget && !busy) onClose?.();
    }}>
      <section className="fmed-alert-dialog" role="dialog" aria-modal="true" aria-labelledby="fmed-alert-dialog-title">
        <header>
          <div>
            <span>Alert scadenze</span>
            <h2 id="fmed-alert-dialog-title">Invia il riepilogo via email</h2>
            <p>L’email include direttamente l’elenco delle scadenze Asset e Infrastrutture. Outlook resta disponibile come invio manuale; Gmail API abilita l’invio automatico su Render Free.</p>
          </div>
          <button type="button" className="fmed-alert-dialog-close" onClick={onClose} disabled={busy}>Chiudi</button>
        </header>

        <div className="fmed-alert-dialog-grid">
          <label className="is-wide">
            <span>Destinatari</span>
            <textarea
              value={recipients}
              onChange={(event) => setRecipients(event.target.value)}
              placeholder="fabio.carratu@marilab.it, altro@marilab.it"
              rows="2"
            />
            <small>Separare più indirizzi con virgola o punto e virgola. Lasciare vuoto per usare il destinatario predefinito di Render.</small>
          </label>
          <label>
            <span>Sede</span>
            <select value={site} onChange={(event) => setSite(event.target.value)}>
              <option value="">Tutte le sedi</option>
              {sites.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          <label>
            <span>Finestra temporale</span>
            <select value={days} onChange={(event) => setDays(Number(event.target.value))}>
              <option value="7">Scadute ed entro 7 giorni</option>
              <option value="15">Scadute ed entro 15 giorni</option>
              <option value="30">Scadute ed entro 30 giorni</option>
              <option value="60">Scadute ed entro 60 giorni</option>
              <option value="90">Scadute ed entro 90 giorni</option>
            </select>
          </label>
        </div>

        {status && (
          <div className={`fmed-alert-dialog-status ${status.ok ? "is-ok" : "is-error"}`} role="status">
            <strong>{status.ok ? "Operazione completata" : "Configurazione da verificare"}</strong>
            <span>{status.message || status.messaggio || "Stato aggiornato"}</span>
            {status.provider && <small>Provider: {status.provider}</small>}
            {status.riepilogo && (
              <div className="fmed-alert-summary">
                <span>Totale <b>{status.riepilogo.totale ?? 0}</b></span>
                <span>Scadute <b>{status.riepilogo.scadute ?? 0}</b></span>
                <span>Entro 7 gg <b>{status.riepilogo.entro_7 ?? 0}</b></span>
                <span>Infrastrutture <b>{status.riepilogo.infrastrutture ?? 0}</b></span>
              </div>
            )}
          </div>
        )}

        <footer>
          <button type="button" className="secondary" disabled={busy} onClick={() => run(onCheck)}>Verifica configurazione</button>
          <button type="button" className="secondary outlook" disabled={busy} onClick={() => run(onOpenOutlook)}>Apri Outlook con elenco</button>
          <button type="button" className="primary" disabled={busy} onClick={() => run(onSend)}>{busy ? "Operazione in corso…" : "Invia alert con FMED"}</button>
        </footer>
      </section>
    </div>
  );
}
