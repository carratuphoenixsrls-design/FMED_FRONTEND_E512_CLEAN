# FMED Enterprise 1.0 · E8.1.8
## UX/UI e uniformità cataloghi Supabase

Base: `FMED_FRONTEND_E512_CLEAN-main.zip` e `FMED_BACKEND-main (1)(1).zip` forniti il 23/07/2026.

### Integrazioni frontend
- Aggiornamento immediato della vista e dei KPI dopo la chiusura delle scadenze obsolete.
- Chiusura più evidente e gestione protetta di collaudi e attività storiche.
- Restyling sidebar estesa e collapsed.
- Restyling Analisi Predittiva con colori semantici e gerarchia visiva.
- Audit generale di card, tabelle, filtri, pulsanti, font e contrasto Light/Dark.
- Nuovo pannello **Qualità dati → Uniformità cataloghi Supabase**.

### Uniformità cataloghi
- Lettura live dei dizionari e del loro utilizzo nei record operativi.
- Rilevazione di etichette duplicate, valori simili, codici progressivi ed etichette tecniche/numeriche.
- Anteprima obbligatoria prima di qualsiasi applicazione.
- Unificazione automatica limitata ai soli duplicati con etichetta esattamente equivalente dopo normalizzazione.
- I valori precedenti non vengono cancellati: restano disattivati come alias storici e le relazioni vengono migrate al canonico.
- I valori solo simili richiedono sempre una decisione umana.
- I valori non utilizzati sono soltanto segnalati e non vengono disattivati automaticamente.

### Regola inderogabile
Il dizionario **Codice inventario** è escluso dall’analisi e da qualsiasi modifica automatica.

### Audit allegato
L’audit ricevuto segnala 41 dizionari, 1.828 valori, 836 relazioni e 11 etichette duplicate. Segnala anche tre blocchi da gestire separatamente: identità release, `FMED_JWT_SECRET` e un codice cespite duplicato. Quest’ultimo non viene corretto da questa release perché il Codice inventario è escluso per richiesta dell’amministratore.
