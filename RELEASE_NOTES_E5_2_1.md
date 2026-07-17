# FMED Enterprise 1.0 — E5.2.1 Data Hygiene

Base stabile: E5.2 Motore Cicli Unificato.

## Obiettivo
Eliminare duplicati e varianti delle sedi senza perdere storico e senza modificare automaticamente dati operativi non verificati.

## Sedi ufficiali
- AXA Medica
- Marilab Center
- Marilab Surgery
- Marilab Garbatella
- Marilab Fiumicino
- Marilab Future Labs

Il nome sede viene separato dall'indirizzo. Abbreviazioni, indirizzi completi, differenze di maiuscole e caratteri invisibili vengono ricondotti alla stessa chiave canonica.

## Sicurezza dati
- Lo SQL crea la tabella di audit e consolida i sei Master Data.
- Lo SQL non aggiorna Censimento, Interventi, Infrastrutture o 81/08.
- L'app mostra prima audit e anteprima.
- L'app richiede conferma esplicita per applicare.
- Ogni valore precedente viene salvato nell'audit prima della modifica.
- I valori sconosciuti restano invariati.
- Nessun record viene eliminato.

## Ordine
1. Eseguire solo SQL_FMED_ENTERPRISE_E5_2_1_DATA_HYGIENE.sql.
2. Pubblicare backend Render.
3. Pubblicare frontend Vercel.
4. Dizionari → Qualità dati → Aggiorna audit sedi.
5. Anteprima pulizia sedi.
6. Applicare solo dopo controllo dell'anteprima.
