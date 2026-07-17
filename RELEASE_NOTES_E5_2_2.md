# FMED Enterprise 1.0 — E5.2.2 Catalogo Canonico Globale

Base stabile: **E5.2.1 Data Hygiene**.

## Obiettivo

Rendere univoci e governati tutti i valori strutturati utilizzati da FMED, mantenendo la corrispondenza tra dati storici e nuovi inserimenti.

## Funzioni principali

- Cataloghi centrali con codice univoco, denominazione standard, alias e stato di governance.
- Campi strutturati selezionabili mediante menu a tendina nei moduli Asset, Nuovo Asset, Interventi e Infrastrutture.
- Quick Add contestuale `+ Nuova voce` senza uscire dal modulo in compilazione.
- Creazione immediata per amministratori e richiesta di approvazione per utenti standard.
- Controllo di duplicati, alias e denominazioni simili prima della creazione.
- Unificazione non distruttiva: la voce duplicata diventa `SOSTITUITO` e resta come alias della voce canonica.
- Migrazione delle relazioni collegate dal vecchio codice al codice canonico.
- Acquisizione controllata delle relazioni già presenti nello storico, senza riscrivere i record operativi.
- Validazione backend: un valore strutturato non censito viene rifiutato e deve passare dal Catalogo Canonico.

## Passato e futuro

Il testo storico non viene eliminato. Alias, vecchi codici e denominazioni vengono risolti verso la voce canonica. I nuovi inserimenti utilizzano esclusivamente valori governati.

## Sicurezza dei dati

Lo SQL E5.2.2 è non distruttivo e ripetibile:

- non elimina record;
- non tronca tabelle;
- non riscrive automaticamente Asset, Interventi o Infrastrutture;
- crea soltanto strutture di governance, cataloghi mancanti, audit e voci storiche da classificare.

## Pubblicazione

1. Eseguire in Supabase soltanto `SQL_FMED_ENTERPRISE_E5_2_2_CATALOGO_CANONICO_GLOBALE.sql`.
2. Pubblicare il backend E5.2.2 su Render.
3. Verificare `/` e `/docs`.
4. Pubblicare il frontend E5.2.2 su Vercel.
5. Aprire `Dizionari` e utilizzare prima anteprime, approvazioni e unificazioni controllate.
