/**
 * Botón para restablecer todos los valores a su estado inicial
 */
export function ResetButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-600 cursor-pointer flex items-center gap-1"
    >
      ↺ Restablecer valores
    </button>
  );
}
