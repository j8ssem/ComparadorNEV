import { useState } from 'react';

export default function App() {
  // Variables de estado con sus valores iniciales por defecto
  const [kmAnuales, setKmAnuales] = useState(15000);
  const [consumo, setConsumo] = useState(6.5);
  const [precioCombustible, setPrecioCombustible] = useState(1.65);

  // Fórmula matemática simple: (Km / 100) * Litros_a_los_100 * Precio_Litro
  const costeAnual = ((kmAnuales / 100) * consumo * precioCombustible).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
        
        <h1 className="text-2xl font-bold text-center mb-6 text-emerald-400">
          Calculadora de Gasto de Combustible
        </h1>

        <div className="space-y-4">
          {/* Casilla 1: Kilómetros */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Kilómetros anuales
            </label>
            <input
              type="number"
              value={kmAnuales}
              onChange={(e) => setKmAnuales(Number(e.target.value))}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Casilla 2: Consumo */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Consumo (Litros / 100 km)
            </label>
            <input
              type="number"
              step="0.1"
              value={consumo}
              onChange={(e) => setConsumo(Number(e.target.value))}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Casilla 3: Precio por litro */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Precio del combustible (€ / litro)
            </label>
            <input
              type="number"
              step="0.01"
              value={precioCombustible}
              onChange={(e) => setPrecioCombustible(Number(e.target.value))}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Resultado en vivo */}
        <div className="mt-8 pt-6 border-t border-slate-700 text-center">
          <span className="text-sm text-slate-400 uppercase tracking-wider block mb-1">
            Coste estimado anual: 
          </span>
          <span className="text-4xl font-extrabold text-emerald-400">
            {isNaN(costeAnual) ? '0.00' : costeAnual} €
          </span>
        </div>

      </div>
    </div>
  );
}