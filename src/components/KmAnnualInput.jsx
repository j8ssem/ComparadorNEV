/**
 * Bloque de entrada de kilómetros anuales
 */
export function KmAnnualInput({ kmAnuales, setKmAnuales, safeKmAnuales, onReset }) {
  return (
    <div className="max-w-lg mx-auto mb-6 bg-slate-700/40 p-5 rounded-xl border border-slate-600">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-slate-300">
          Kilómetros anuales
        </label>
        <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-lg border border-slate-600">
          <input
            type="number"
            value={kmAnuales}
            onChange={(e) => setKmAnuales(e.target.value)}
            className="w-20 bg-transparent text-right text-lg font-bold text-white focus:outline-none"
          />
          <span className="text-xs text-slate-400">km</span>
        </div>
      </div>

      <input
        type="range"
        min="1000"
        max="50000"
        step="500"
        value={safeKmAnuales}
        onChange={(e) => setKmAnuales(Number(e.target.value))}
        className="w-full accent-emerald-500 cursor-pointer h-2 rounded-lg"
        style={{
          background: `linear-gradient(to right, #10b981 ${((safeKmAnuales - 1000) / (50000 - 1000)) * 100}%, #334155 ${((safeKmAnuales - 1000) / (50000 - 1000)) * 100}%)`,
        }}
      />

      <div className="mt-4 flex justify-center">
        {/* Reset button will be passed as children */}
      </div>
    </div>
  );
}
