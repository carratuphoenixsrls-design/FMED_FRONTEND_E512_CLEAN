const ICON_PATHS = {
  Dashboard: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </>
  ),
  Asset: (
    <>
      <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </>
  ),
  Interventi: <path d="M14.5 5.5a4.5 4.5 0 0 0-5.7 5.7L4 16v4h4l4.8-4.8a4.5 4.5 0 0 0 5.7-5.7l-3 3-4-4 3-3Z" />,
  Costi: <path d="M17 5.5A7 7 0 1 0 17 18.5M5 10h10M5 14h9" />,
  Scadenze: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16M8 14h3" />
    </>
  ),
  Infrastrutture: (
    <>
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M9 21v-6h6v6M8 10h.01M12 10h.01M16 10h.01" />
    </>
  ),
  Sicurezza: (
    <>
      <path d="M12 3 20 7v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  Export: <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />,
  SharePoint: <path d="M8 13a4 4 0 1 1 .5-5.97M16 11a4 4 0 1 1-.5 5.97M8 12h8" />,
  Processi: (
    <>
      <path d="M5 5h6v6H5zM13 13h6v6h-6z" />
      <path d="M14 5h5M5 14v5h5M11 8h3v5" />
    </>
  ),
  Dizionari: (
    <>
      <path d="M5 4h14v16H5z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  Impostazioni: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.06.06-2.78 2.78-.06-.06A1.8 1.8 0 0 0 15 19.4a1.8 1.8 0 0 0-1.08 1.65V21h-3.84v-.09A1.8 1.8 0 0 0 9 19.4a1.8 1.8 0 0 0-1.98.36l-.06.06-2.78-2.78.06-.06A1.8 1.8 0 0 0 4.6 15a1.8 1.8 0 0 0-1.65-1.08H3v-3.84h.09A1.8 1.8 0 0 0 4.6 9a1.8 1.8 0 0 0-.36-1.98l-.06-.06 2.78-2.78.06.06A1.8 1.8 0 0 0 9 4.6a1.8 1.8 0 0 0 1.08-1.65V3h3.84v.09A1.8 1.8 0 0 0 15 4.6a1.8 1.8 0 0 0 1.98-.36l.06-.06 2.78 2.78-.06.06A1.8 1.8 0 0 0 19.4 9a1.8 1.8 0 0 0 1.65 1.08H21v3.84h-.09A1.8 1.8 0 0 0 19.4 15Z" />
    </>
  ),
  NuovoAsset: (
    <>
      <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
};

export default function FmedModuleIcon({ module, className = "", size = 24 }) {
  const content = ICON_PATHS[module] || ICON_PATHS.Dashboard;
  return (
    <span className={`fmed-module-icon ${className}`.trim()} aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {content}
        </g>
      </svg>
    </span>
  );
}
