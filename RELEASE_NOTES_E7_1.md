# FMED Enterprise 1.0 — E7.1 Dashboard Enterprise

Base stabile: E6.2 Process Engine Completo.

## Funzioni
- Dashboard operativa unica per Asset, Processi, Infrastrutture e Sicurezza 81/08.
- KPI reali ricavati dal Process Engine E6.2 e dal Motore Cicli E5.2.
- Filtri globali per sede, modulo, stato, priorità, responsabile e periodo.
- Processi aperti, in ritardo, da approvare e non conformità.
- Scadenze scadute, entro 30/60 giorni e da pianificare.
- Criticità per sede e carico per responsabile.
- Trend mensile e costi tracciati.
- Drill-down dai KPI ai record reali.
- Export CSV dei risultati filtrati.
- Indicatori di governance per dizionari, valori e relazioni intelligenti.

## Regola dati
La Dashboard conta esclusivamente i cicli operativi correnti. Le attività chiuse
o sostituite restano nello storico, ma non generano KPI o criticità.

## Database
E7.1 non richiede nuove tabelle o migrazioni SQL.
