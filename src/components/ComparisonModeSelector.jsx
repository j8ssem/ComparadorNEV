/**
 * Selector de modo de comparativa entre vehículos
 */
export function ComparisonModeSelector({ modoComparativa, setModoComparativa }) {
  const modes = [
    { id: 'ICE_VS_EV', label: '🔥 Combustión vs ⚡ EV' },
    { id: 'ICE_VS_PHEV', label: '🔥 Combustión vs 🔋 PHEV' },
    { id: 'PHEV_VS_EV', label: '🔋 PHEV vs ⚡ EV' },
  ];

  return (
    <div className="max-w-lg mx-auto mb-8 flex flex-col sm:flex-row gap-2 justify-center p-1.5 bg-slate-900/80 rounded-xl border border-slate-700">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => setModoComparativa(mode.id)}
          className={`flex-1 py-2 px-3 text-xs md:text-sm font-bold rounded-lg transition-all cursor-pointer ${
            modoComparativa === mode.id
              ? 'bg-slate-700 text-white shadow-md border border-slate-500'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
