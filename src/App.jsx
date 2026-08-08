import { useState } from 'react';
import { DEFAULT_VALUES, CHARGING_LOSS_FACTOR } from './constants';
import { TooltipInfo } from './TooltipInfo';

export default function App() {
  // Estado común
  const [kmAnuales, setKmAnuales] = useState(DEFAULT_VALUES.kmAnuales);

  // Estado Coche Combustión
  const [consumoGasolina, setConsumoGasolina] = useState(DEFAULT_VALUES.consumoGasolina);
  const [precioGasolina, setPrecioGasolina] = useState(DEFAULT_VALUES.precioGasolina);

  // Estado Coche Eléctrico
  const [consumoElectrico, setConsumoElectrico] = useState(DEFAULT_VALUES.consumoElectrico);
  const [precioKwh, setPrecioKwh] = useState(DEFAULT_VALUES.precioKwh);

  // Función para restablecer
  const handleReset = () => {
    setKmAnuales(DEFAULT_VALUES.kmAnuales);
    setConsumoGasolina(DEFAULT_VALUES.consumoGasolina);
    setPrecioGasolina(DEFAULT_VALUES.precioGasolina);
    setConsumoElectrico(DEFAULT_VALUES.consumoElectrico);
    setPrecioKwh(DEFAULT_VALUES.precioKwh);
  };

  // Cálculos de costes
  const costeGasolina = (kmAnuales / 100) * consumoGasolina * precioGasolina;
  const costeElectrico = (kmAnuales / 100) * (consumoElectrico * CHARGING_LOSS_FACTOR) * precioKwh;
  const ahorroAnual = costeGasolina - costeElectrico;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      
      {/* Estilo para ocultar las flechitas por defecto de los inputs number */}
      <style>{`
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div className="max-w-4xl w-full bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700">
        
        <h1 className="text-3xl font-extrabold text-center mb-8 text-emerald-400">
          Comparador de ahorro: Combustión vs. Eléctrico
        </h1>

        {/* 1. Bloque superior: Kilómetros anuales */}
        <div className="max-w-lg mx-auto mb-8 bg-slate-700/40 p-5 rounded-xl border border-slate-600">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-300">
              Kilómetros anuales
            </label>
            <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-lg border border-slate-600">
              <input
                type="number"
                value={kmAnuales}
                onChange={(e) => setKmAnuales(Number(e.target.value))}
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
            value={kmAnuales}
            onChange={(e) => setKmAnuales(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-600 rounded-lg"
          />

          {/* Botón Restablecer centrado debajo de los kilómetros */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-600 cursor-pointer flex items-center gap-1.5"
            >
              ↺ Restablecer valores
            </button>
          </div>

        </div>

        {/* 2. Columnas paralelas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Columna Izquierda: Combustión */}
          <div className="bg-slate-900/60 p-6 rounded-xl border border-amber-500/30 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-xl font-bold text-amber-400 mb-6 text-center">
                Vehículo de Combustión
              </h2>

              <div className="space-y-6">
                {/* Consumo l/100km */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-300">
                      Consumo
                    </label>
                    <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                      <input
                        type="number"
                        step="0.1"
                        value={consumoGasolina}
                        onChange={(e) => setConsumoGasolina(Number(e.target.value))}
                        className="w-14 bg-transparent text-right font-bold text-amber-400 focus:outline-none"
                      />
                      <span className="text-xs text-slate-400">l/100km</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    step="0.1"
                    value={consumoGasolina}
                    onChange={(e) => setConsumoGasolina(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>

                {/* Precio €/l */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-300">
                      Precio combustible
                    </label>
                    <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                      <input
                        type="number"
                        step="0.01"
                        value={precioGasolina}
                        onChange={(e) => setPrecioGasolina(Number(e.target.value))}
                        className="w-14 bg-transparent text-right font-bold text-amber-400 focus:outline-none"
                      />
                      <span className="text-xs text-slate-400">€/l</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1.00"
                    max="2.50"
                    step="0.01"
                    value={precioGasolina}
                    onChange={(e) => setPrecioGasolina(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/60 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                Coste Anual Estimado
              </span>
              <span className="text-2xl font-bold text-amber-400">
                {isNaN(costeGasolina) ? '0.00' : costeGasolina.toFixed(2)} €
              </span>
            </div>
          </div>

          {/* Columna Derecha: Eléctrico */}
          <div className="bg-slate-900/60 p-6 rounded-xl border border-cyan-500/30 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-xl font-bold text-cyan-400 mb-6 text-center">
                Vehículo Eléctrico
              </h2>

              <div className="space-y-6">
                {/* Consumo kWh/100km */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="flex items-center text-sm font-medium text-slate-300">
                      Consumo
                      <TooltipInfo />
                    </label>
                    <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                      <input
                        type="number"
                        step="0.5"
                        value={consumoElectrico}
                        onChange={(e) => setConsumoElectrico(Number(e.target.value))}
                        className="w-14 bg-transparent text-right font-bold text-cyan-400 focus:outline-none"
                      />
                      <span className="text-xs text-slate-400">kWh/100km</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="0.5"
                    value={consumoElectrico}
                    onChange={(e) => setConsumoElectrico(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>

                {/* Precio €/kWh */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-300">
                      Precio energía
                    </label>
                    <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                      <input
                        type="number"
                        step="0.01"
                        value={precioKwh}
                        onChange={(e) => setPrecioKwh(Number(e.target.value))}
                        className="w-14 bg-transparent text-right font-bold text-cyan-400 focus:outline-none"
                      />
                      <span className="text-xs text-slate-400">€/kWh</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.50"
                    step="0.01"
                    value={precioKwh}
                    onChange={(e) => setPrecioKwh(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/60 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                Coste Anual Estimado
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