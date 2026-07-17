import React from "react";

export default class FmedErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorId: "" };
  }

  static getDerivedStateFromError(error) {
    return {
      error,
      errorId: `FMED-${Date.now().toString(36).toUpperCase()}`,
    };
  }

  componentDidCatch(error, info) {
    console.error("[FMED QA] Errore applicazione", {
      error,
      componentStack: info?.componentStack,
      errorId: this.state.errorId,
    });
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main className="fmed-fatal-error" role="alert">
        <section className="fmed-fatal-error__card">
          <div className="fmed-fatal-error__mark" aria-hidden="true">FM</div>
          <p className="fmed-fatal-error__eyebrow">FMED Enterprise</p>
          <h1>Impossibile caricare questa schermata</h1>
          <p>
            I dati non sono stati modificati. Aggiorna la pagina; se il problema continua,
            comunica il codice <strong>{this.state.errorId}</strong>.
          </p>
          <div className="fmed-fatal-error__actions">
            <button type="button" onClick={() => window.location.reload()}>Ricarica FMED</button>
            <button type="button" className="is-secondary" onClick={() => window.location.assign("/")}>Torna all’accesso</button>
          </div>
        </section>
      </main>
    );
  }
}
