import { useState } from 'react';
import { DEFAULT_VALUES, CHARGING_LOSS_FACTOR } from './constants';
import { TooltipInfo } from './TooltipInfo';

export default function App() {
  // Estado común
  const [kmAnuales, setKmAnuales] = useState(DEFAULT_VALUES.kmAnuales);

  // Estado Coche Combustión
  const [consumoGasolina, setConsumoGasolina] = useState(DEFAULT_VALUES.consumoGasolina);
  const [precioGasolina, setPrecioGasolina] = useState(DEFAULT_VALUES.precioGasolina);

  // Estado Coche Eléctrico (Básico)
  const [consumoElectrico, setConsumoElectrico] = useState(DEFAULT_VALUES.consumoElectrico);
  const [precioKwh, setPrecioKwh] = useState(DEFAULT_VALUES.precioKwh);

  // Estado Opciones Avanzadas EV
  const [mostrarAvanzado, setMostrarAvanzado] = useState(false);
  const [precioKwhFuera, setPrecioKwhFuera] = useState(DEFAULT_VALUES.precioKwhFuera);
  const [porcentajeFuera, setPorcentajeFuera] = useState(DEFAULT_VALUES.porcentajeFuera);

  // Función para restablecer
  const handleReset = () => {
    setKmAnuales(DEFAULT_VALUES.kmAnuales);
    setConsumoGasolina(DEFAULT_VALUES.consumoGasolina);
    setPrecioGasolina(DEFAULT_VALUES.precioGasolina);
    setConsumoElectrico(DEFAULT_VALUES.consumoElectrico);
    setPrecioKwh(DEFAULT_VALUES.precioKwh);
    setPrecioKwhFuera(DEFAULT_VALUES.precioKwhFuera);
    setPorcentajeFuera(DEFAULT_VALUES.porcentajeFuera);
    setMostrarAvanzado(false);
  };

  // Valores asegurados (evitan NaN si el input se queda en blanco o invalido)
  const safeKmAnuales = Number(kmAnuales) || 0;
  const safeConsumoGasolina = Number(consumoGasolina) || 0;
  const safePrecioGasolina = Number(precioGasolina) || 0;
  const safeConsumoElectrico = Number(consumoElectrico) || 0;
  const safePrecioKwh = Number(precioKwh) || 0;
  const safePrecioKwhFuera = Number(precioKwhFuera) || 0;
  const safePorcentajeFuera = Number(porcentajeFuera) || 0;

  // Cálculos de costes
  const costeGasolina = (safeKmAnuales / 100) * safeConsumoGasolina * safePrecioGasolina;

  // Cálculo del precio medio ponderado por kWh según el % fuera de casa
  const fraccionFuera = mostrarAvanzado ? safePorcentajeFuera / 100 : 0;
  const fraccionEnCasa = 1 - fraccionFuera;
  const precioKwhMedio = (safePrecioKwh * fraccionEnCasa) + (safePrecioKwhFuera * fraccionFuera);

  const costeElectrico = (safeKmAnuales / 100) * (safeConsumoElectrico * CHARGING_LOSS_FACTOR) * precioKwhMedio;

  const diferencia = costeGasolina - costeElectrico;
  const esAhorro = diferencia >= 0;
  const importeAbsoluto = Math.abs(diferencia).toFixed(2);

  // Cálculos de desglose en km
  const kmFuera = Math.round(safeKmAnuales * (safePorcentajeFuera / 100));
  const kmEnCasa = Math.round(safeKmAnuales * ((100 - safePorcentajeFuera) / 100));

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
        
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-400 tracking-tight mb-2">
            ComparadorNEV
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto font-normal">
            Calcula tu ahorro anual estimado entre un vehículo de nueva energía (NEV) y uno de combustión
          </p>
        </header>

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
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-600 rounded-lg"
          />

          {/* Botón Restablecer */}
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
                      Consumo medio
                    </label>
                    <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                      <input
                        type="number"
                        step="0.1"
                        value={consumoGasolina}
                        onChange={(e) => setConsumoGasolina(e.target.value)}
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
                    value={safeConsumoGasolina}
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
                        onChange={(e) => setPrecioGasolina(e.target.value)}
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
                    value={safePrecioGasolina}
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
                {costeGasolina.toFixed(2)} €
              </span>
            </div>
          </div>

          {/* Columna Derecha: Eléctrico */}
          <div className="bg-slate-900/60 p-6 rounded-xl border border-cyan-500/30 flex flex-col justify-between space-y-6">
            <div>
              {/* Cabecera con título y botón de Opciones Avanzadas */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-cyan-400">
                  Vehículo EV
                </h2>
                <button
                  onClick={() => setMostrarAvanzado(!mostrarAvanzado)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors border cursor-pointer flex items-center gap-1 ${
                    mostrarAvanzado
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                  title="Configurar recarga pública / fuera de casa"
                >
                  ⚙️ {mostrarAvanzado ? 'Avanzado ON' : 'Opciones avanzadas'}
                </button>
              </div>

              <div className="space-y-6">
                {/* Consumo kWh/100km */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="flex items-center text-sm font-medium text-slate-300">
                      Consumo medio
                      <TooltipInfo />
                    </label>
                    <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                      <input
                        type="number"
                        step="0.5"
                        value={consumoElectrico}
                        onChange={(e) => setConsumoElectrico(e.target.value)}
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
                    value={safeConsumoElectrico}
                    onChange={(e) => setConsumoElectrico(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>

                {/* Precio €/kWh (en casa) */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-300">
                      {mostrarAvanzado ? 'Precio energía (en casa)' : 'Precio energía'}
                    </label>
                    <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                      <input
                        type="number"
                        step="0.01"
                        value={precioKwh}
                        onChange={(e) => setPrecioKwh(e.target.value)}
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
                    value={safePrecioKwh}
                    onChange={(e) => setPrecioKwh(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>

                {/* BLOQUE OPCIONES AVANZADAS */}
                {mostrarAvanzado && (
                  <div className="pt-4 border-t border-cyan-500/20 space-y-6">
                    {/* Precio €/kWh (fuera de casa) */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-slate-300">
                          Precio fuera de casa
                        </label>
                        <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                          <input
                            type="number"
                            step="0.01"
                            value={precioKwhFuera}
                            onChange={(e) => setPrecioKwhFuera(e.target.value)}
                            className="w-14 bg-transparent text-right font-bold text-cyan-400 focus:outline-none"
                          />
                          <span className="text-xs text-slate-400">€/kWh</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0.10"
                        max="0.90"
                        step="0.01"
                        value={safePrecioKwhFuera}
                        onChange={(e) => setPrecioKwhFuera(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                      />
                    </div>

                    {/* Porcentaje de carga fuera de casa */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-slate-300">
                          Recargas fuera de casa
                        </label>
                        <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="5"
                            value={porcentajeFuera}
                            onChange={(e) => setPorcentajeFuera(e.target.value)}
                            className="w-12 bg-transparent text-right font-bold text-cyan-400 focus:outline-none"
                          />
                          <span className="text-xs text-slate-400">%</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={safePorcentajeFuera}
                        onChange={(e) => setPorcentajeFuera(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        {safePorcentajeFuera}% fuera ({kmFuera} km) · {100 - safePorcentajeFuera}% en casa ({kmEnCasa} km)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/60 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                Coste Anual Estimado
              </span>
              <span className="text-2xl font-bold text-cyan-400">
                {costeElectrico.toFixed(2)} €
              </span>
            </div>
          </div>

        </div>

        {/* 3. Bloque inferior: Ahorro Anual */}
        <div className={`p-6 rounded-xl border text-center transition-all ${
          esAhorro 
            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' 
            : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
        }`}>
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2">
            {esAhorro ? 'Ahorro estimado del Vehículo Eléctrico' : 'Sobrecoste estimado del Vehículo Eléctrico'}
          </h3>
          
          <p className="text-5xl font-extrabold tracking-tight">
            {importeAbsoluto} €
          </p>
        </div>

      </div>

      <footer className="mt-12 py-6 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>
          ComparadorNEV © 2026 — Desarrollado por{' '}
          <a 
            href="https://github.com/j8ssem" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-200 underline transition-colors"
          >
            j8ssem
          </a>
        </p>
        <p className="mt-1 opacity-75">
          Licencia MIT · Proyecto Open Source
        </p>
      </footer>

    </div>
  );
}