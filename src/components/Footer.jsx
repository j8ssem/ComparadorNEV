/**
 * Pie de página de la aplicación
 */
export function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-slate-800 text-center text-xs text-slate-500">
      <p>
        <a
          href="https://github.com/j8ssem/ComparadorNEV"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-slate-200 underline transition-colors"
        >
          ComparadorNEV
        </a>
        {' '}© 2026 está en Github — Desarrollado por{' '}
        <a
          href="https://github.com/j8ssem"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-slate-200 underline transition-colors"
        >
          j8ssem
        </a>
      </p>
      <p className="mt-1 opacity-75">Licencia MIT · Proyecto Open Source</p>
    </footer>
  );
}
