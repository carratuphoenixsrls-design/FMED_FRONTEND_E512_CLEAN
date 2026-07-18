# FMED Enterprise 1.0 — E6.1 Process Engine Unificato

## Moduli coperti

- Asset e apparecchiature;
- Infrastrutture e impianti;
- Sicurezza 81/08;
- Formazione;
- Sorveglianza sanitaria;
- Contratti;
- Non conformità.

## Flusso comune

Bozza → Aperto → Assegnato → In corso → In attesa / Da verificare → Completato.
Sono disponibili annullamento e riapertura motivata secondo le transizioni consentite.

## Dati strutturati

Sede, elemento, attività, priorità e responsabile utilizzano valori canonici e menu a tendina. Il Quick Add contestuale resta disponibile senza interrompere il processo. Titolo, descrizione e note restano campi narrativi.

## Sicurezza e audit

Le operazioni di modifica sono riservate ad Admin e Service. Ogni cambio di stato produce un evento di audit con autore, data, stato precedente, stato successivo e nota.
