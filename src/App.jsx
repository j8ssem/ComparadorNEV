import { useState } from 'react';

export default function App() {
  // Estado común
  const [kmAnuales, setKmAnuales] = useState(15000);

  // Estado Coche Combustión
  const [consumoGasolina, setConsumoGasolina] = useState(6.5);
  const [precioGasolina, setPrecioGasolina] = useState(1.65);

  // Estado Coche Eléctrico
  const [consumoElectrico, setConsumoElectrico] = useState(17); // kWh/100km
  const [precioKwh, setPrecioKwh] = useState(0.18); // €/kWh

  // Cálculos de costes anuales
  const costeGasolina = (kmAnuales / 100) * consumoGasolina * precioGasolina;
  const costeElectrico = (kmAnuales / 100) * consumoElectrico * precioKwh;
  
  // Cálculo del ahorro
  const ahorroAnual = costeGasolina - costeElectrico;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700">
        
        <h1 className="text-3xl font-extrabold text-center mb-8 text-emerald-400">
          Comparadora de Ahorro: Combustión vs Eléctrico
        </h1>

        {/* 1. Bloque superior: Kilómetros anuales (Común) */}
        <div className="max-w-md mx-auto mb-8 bg-slate-700/50 p-4 rounded-xl border border-slate-600">
          <label className="block text-sm font-medium text-slate-300 mb-2 text-center">
            Kilómetros anuales
          </label>
          <input
            type="number"
            value={kmAnuales}
            onChange={(e) => setKmAnuales(Number(e.target.value))}
            className="w-full bg-slate-700 border border-slate-500 rounded-lg p-3 text-center text-xl font-bold text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        {/* 2. Dos columnas paralelas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Columna Izquierda: Combustión */}
          <div className="bg-slate-900/60 p-6 rounded-xl border border-amber-500/30 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-amber-400 mb-4 text-center">
                Vehículo de Combustión
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Consumo (l / 100 km)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={consumoGasolina}
                    onChange={(e) => setConsumoGasolina(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Precio del combustible (€ / l)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={precioGasolina}
                    onChange={(e) => setPrecioGasolina(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                Coste Anual
              </span>
              <span className="text-2xl font-bold text-amber-400">
                {isNaN(costeGasolina) ? '0.00' : costeGasolina.toFixed(2)} €
              </span>
            </div>
          </div>

          {/* Columna Derecha: Eléctrico */}
          <div className="bg-slate-900/60 p-6 rounded-xl border border-cyan-500/30 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-cyan-400 mb-4 text-center">
                Vehículo Eléctrico
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Consumo (kWh / 100 km)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={consumoElectrico}
                    onChange={(e) => setConsumoElectrico(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Precio energía (€ / kWh)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={precioKwh}
                    onChange={(e) => setPrecioKwh(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                Coste Anual
              </span>
              <span className="text-2xl font-bold text-cyan-400">
                {isNaN(costeElectrico) ? '0.00' : costeElectrico.toFixed(2)} €
              </span>
            </div>
          </div>

        </div>

        {/* 3. Bloque inferior: Ahorro Anual */}
        <div className="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-xl text-center">
          <span className="text-sm font-medium text-emerald-300 uppercase tracking-wider block mb-1">
            Ahorro estimado con el eléctrico
          </span>
          <span className="text-4xl font-black text-emerald-400">
            {isNaN(ahorroAnual) ? '0.00' : ahorroAnual.toFixed(2)} € / año
          </span>
        </div>

      </div>
    </div>
  );
}