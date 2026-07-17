// FMED Enterprise 1.0 - E5.2.1 Data Hygiene.
// Il backend /core/dizionari resta la fonte primaria; questi valori garantiscono
// continuità anche durante cold-start Render o assenza temporanea di rete.
export const SEDI_STANDARD_DETAILS = {
  AXA_MEDICA: {
    label: "AXA Medica",
    address: "Via Pindaro 28, 00125 Roma",
  },
  MARILAB_SURGERY: {
    label: "Marilab Surgery",
    address: "Viale Alfredo Zambrini 2/4/6, 00121 Roma",
  },
  MARILAB_CENTER: {
    label: "Marilab Center",
    address: "Viale Alfredo Zambrini 14, 00121 Roma",
  },
  MARILAB_GARBATELLA: {
    label: "Marilab Garbatella",
    address: "Via Caffaro 137, 00154 Roma",
  },
  MARILAB_FIUMICINO: {
    label: "Marilab Fiumicino",
    address: "Via della Foce Micina 75A, 00054 Fiumicino",
  },
  MARILAB_FUTURE_LABS: {
    label: "Marilab Future Labs",
    address: "Via dei Castelli Romani 2E/2M, 00071 Pomezia",
  },
};

export const SEDI_STANDARD = Object.fromEntries(
  Object.entries(SEDI_STANDARD_DETAILS).map(([key, value]) => [key, value.label]),
);

export const SEDI_STANDARD_LIST = Object.values(SEDI_STANDARD);

function testoSedeCanonico(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function chiaveSedeCanonica(value) {
  const text = testoSedeCanonico(value);
  if (!text) return "";
  if (
    text.includes("SURGERY")
    || text.includes("SURGERI")
    || /\bZAMBRINI\s+(2|4|6)\b/.test(text)
    || text.includes("ZAMBRINI 2 4 6")
  ) return "MARILAB_SURGERY";
  if (text.includes("PINDARO") || /\bAXA\b/.test(text)) return "AXA_MEDICA";
  if (text.includes("CAFFARO") || text.includes("GARBATELLA")) return "MARILAB_GARBATELLA";
  if (text.includes("FIUMICINO") || text.includes("FOCE MICINA")) return "MARILAB_FIUMICINO";
  if (["POMEZIA", "PHOENIX", "CASTELLI ROMANI", "FUTURE LABS"].some((token) => text.includes(token))) {
    return "MARILAB_FUTURE_LABS";
  }
  if (text.includes("ZAMBRINI") || text.includes("MARILAB CENTER") || text === "CENTER") return "MARILAB_CENTER";
  return "";
}

export function etichettaSedeCanonica(value) {
  const key = chiaveSedeCanonica(value);
  return SEDI_STANDARD[key] || String(value || "").trim();
}

export function listaSediCanoniche(values = [], { includeUnknown = true } = {}) {
  const result = new Map();
  for (const raw of values || []) {
    const value = String(raw || "").trim();
    if (!value) continue;
    const key = chiaveSedeCanonica(value);
    if (key) {
      result.set(key, SEDI_STANDARD[key]);
    } else if (includeUnknown) {
      const unknownKey = `UNKNOWN::${testoSedeCanonico(value)}`;
      if (!result.has(unknownKey)) result.set(unknownKey, value);
    }
  }
  return [...result.values()].sort((a, b) => a.localeCompare(b, "it", { sensitivity: "base" }));
}

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
