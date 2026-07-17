// FMED 4.2 - fallback locale dei dizionari centrali.
// Il backend /core/dizionari resta la fonte primaria; questi valori garantiscono
// continuità anche durante cold-start Render o assenza temporanea di rete.
export const SEDI_STANDARD = {
  AXA_MEDICA: "AXA Medica",
  MARILAB_SURGERY: "Marilab Surgery",
  MARILAB_CENTER: "Marilab Center",
  MARILAB_GARBATELLA: "Marilab Garbatella",
  MARILAB_FIUMICINO: "Marilab Fiumicino",
  MARILAB_FUTURE_LABS: "Marilab Future Labs",
};

export const SEDI_STANDARD_LIST = Object.values(SEDI_STANDARD);

export const PERIODICITA_STANDARD = [
  { codice: "MENSILE", mesi: 1 },
  { codice: "BIMESTRALE", mesi: 2 },
  { codice: "TRIMESTRALE", mesi: 3 },
  { codice: "QUADRIMESTRALE", mesi: 4 },
  { codice: "SEMESTRALE", mesi: 6 },
  { codice: "ANNUALE", mesi: 12 },
  { codice: "BIENNALE", mesi: 24 },
  { codice: "TRIENNALE", mesi: 36 },
  { codice: "QUADRIENNALE", mesi: 48 },
  { codice: "QUINQUENNALE", mesi: 60 },
  { codice: "DECENNALE", mesi: 120 },
  { codice: "UNA_TANTUM", mesi: 0 },
  { codice: "DA_DEFINIRE", mesi: null },
];

export function mesiPeriodicita(valore, elenco = PERIODICITA_STANDARD) {
  const codice = String(valore || "").trim().toUpperCase().replace(/[\s-]+/g, "_");
  const aliases = { TANTUM: "UNA_TANTUM", "UNA TANTUM": "UNA_TANTUM" };
  const normalizzato = aliases[codice] || codice;
  return elenco.find((x) => x.codice === normalizzato)?.mesi ?? null;
}

export function calcolaProssimaScadenza(dataUltimo, periodicita, elenco = PERIODICITA_STANDARD) {
  const mesi = mesiPeriodicita(periodicita, elenco);
  if (!dataUltimo || !mesi) return "";
  const base = String(dataUltimo).slice(0, 10);
  const data = new Date(`${base}T12:00:00`);
  if (Number.isNaN(data.getTime())) return "";
  const giorno = data.getDate();
  data.setMonth(data.getMonth() + mesi);
  if (data.getDate() !== giorno) data.setDate(0);
  return data.toISOString().slice(0, 10);
}

export function etichetteDaDizionario(dizionari, chiave, fallback = []) {
  const elementi = dizionari?.[chiave];
  if (!Array.isArray(elementi)) return fallback;
  return elementi.map((x) => x?.label || x?.sede || x?.codice).filter(Boolean);
}

export function codiciDaDizionario(dizionari, chiave, fallback = []) {
  const elementi = dizionari?.[chiave];
  if (!Array.isArray(elementi)) return fallback;
  return elementi.map((x) => x?.codice || x?.label).filter(Boolean);
}
