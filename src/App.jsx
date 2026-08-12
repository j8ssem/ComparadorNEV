import { useState } from 'react';
import { DEFAULT_VALUES, CHARGING_LOSS_FACTOR } from './constants';
import { TooltipInfo } from './TooltipInfo';

// Función para calcular el degradado dinámico perfecto en todos los navegadores
const getSliderBackground = (value, min, max, activeColor) => {
  const percentage = ((value - min) / (max - min)) * 100;
  return `linear-gradient(to right, ${activeColor} ${percentage}%, #334155 ${percentage}%)`;
};

export default function App() {
  // Estado Modo Comparativa
  const [modoComparativa, setModoComparativa] = useState('ICE_VS_EV');

  // Estado común
  const [kmAnuales, setKmAnuales] = useState(DEFAULT_VALUES.kmAnuales);

  // Estado Coche Combustión
  const [consumoGasolina, setConsumoGasolina] = useState(DEFAULT_VALUES.consumoGasolina);
  const [precioGasolina, setPrecioGasolina] = useState(DEFAULT_VALUES.precioGasolina);

  // Estado Coche Eléctrico
  const [consumoElectrico, setConsumoElectrico] = useState(DEFAULT_VALUES.consumoElectrico);
  const [precioKwh, setPrecioKwh] = useState(DEFAULT_VALUES.precioKwh);
  const [mostrarAvanzado, setMostrarAvanzado] = useState(false);
  const [precioKwhFuera, setPrecioKwhFuera] = useState(DEFAULT_VALUES.precioKwhFuera);
  const [porcentajeFuera, setPorcentajeFuera] = useState(DEFAULT_VALUES.porcentajeFuera);

  // Estado Coche PHEV (Independiente)
  const [porcentajeElectricoPhev, setPorcentajeElectricoPhev] = useState(DEFAULT_VALUES.porcentajeElectricoPhev);
  const [consumoPhevElectrico, setConsumoPhevElectrico] = useState(DEFAULT_VALUES.consumoPhevElectrico);
  const [consumoPhevGasolina, setConsumoPhevGasolina] = useState(DEFAULT_VALUES.consumoPhevGasolina);
  const [precioGasolinaPhev, setPrecioGasolinaPhev] = useState(DEFAULT_VALUES.precioGasolinaPhev);
  const [precioKwhPhev, setPrecioKwhPhev] = useState(DEFAULT_VALUES.precioKwhPhev);

  // Reset
  const handleReset = () => {
    setKmAnuales(DEFAULT_VALUES.kmAnuales);
    setConsumoGasolina(DEFAULT_VALUES.consumoGasolina);
    setPrecioGasolina(DEFAULT_VALUES.precioGasolina);
    setConsumoElectrico(DEFAULT_VALUES.consumoElectrico);
    setPrecioKwh(DEFAULT_VALUES.precioKwh);
    setPrecioKwhFuera(DEFAULT_VALUES.precioKwhFuera);
    setPorcentajeFuera(DEFAULT_VALUES.porcentajeFuera);
    setMostrarAvanzado(false);
    // Reset PHEV
    setPorcentajeElectricoPhev(DEFAULT_VALUES.porcentajeElectricoPhev);
    setConsumoPhevElectrico(DEFAULT_VALUES.consumoPhevElectrico);
    setConsumoPhevGasolina(DEFAULT_VALUES.consumoPhevGasolina);
    setPrecioGasolinaPhev(DEFAULT_VALUES.precioGasolinaPhev);
    setPrecioKwhPhev(DEFAULT_VALUES.precioKwhPhev);
  };

  // Valores asegurados
  const safeKmAnuales = Number(kmAnuales) || 0;
  const safeConsumoGasolina = Number(consumoGasolina) || 0;
  const safePrecioGasolina = Number(precioGasolina) || 0;
  const safeConsumoElectrico = Number(consumoElectrico) || 0;
  const safePrecioKwh = Number(precioKwh) || 0;
  const safePrecioKwhFuera = Number(precioKwhFuera) || 0;
  const safePorcentajeFuera = Number(porcentajeFuera) || 0;

  const safePorcentajeElectricoPhev = Number(porcentajeElectricoPhev) || 0;
  const safeConsumoPhevElectrico = Number(consumoPhevElectrico) || 0;
  const safeConsumoPhevGasolina = Number(consumoPhevGasolina) || 0;
  const safePrecioGasolinaPhev = Number(precioGasolinaPhev) || 0;
  const safePrecioKwhPhev = Number(precioKwhPhev) || 0;

  // Cálculo EV
  const fraccionFuera = mostrarAvanzado ? safePorcentajeFuera / 100 : 0;
  const fraccionEnCasa = 1 - fraccionFuera;
  const precioKwhMedio = (safePrecioKwh * fraccionEnCasa) + (safePrecioKwhFuera * fraccionFuera);
  const costeElectrico = (safeKmAnuales / 100) * (safeConsumoElectrico * CHARGING_LOSS_FACTOR) * precioKwhMedio;

  // Cálculo Combustión
  const costeGasolina = (safeKmAnuales / 100) * safeConsumoGasolina * safePrecioGasolina;

  // Cálculo PHEV
  const kmPhevElectrico = Math.round(safeKmAnuales * (safePorcentajeElectricoPhev / 100));
  const kmPhevGasolina = Math.round(safeKmAnuales * ((100 - safePorcentajeElectricoPhev) / 100));

  const costePhevElectrico = (kmPhevElectrico / 100) * (safeConsumoPhevElectrico * CHARGING_LOSS_FACTOR) * safePrecioKwhPhev;
  const costePhevGasolina = (kmPhevGasolina / 100) * safeConsumoPhevGasolina * safePrecioGasolinaPhev;
  const costePhev = costePhevElectrico + costePhevGasolina;

  // Configuración dinámica de comparativa
  let costeIzquierda = costeGasolina;
  let costeDerecha = costeElectrico;
  let nombreIzquierda = "Combustión";
  let nombreDerecha = "EV";

  if (modoComparativa === 'ICE_VS_PHEV') {
    costeIzquierda = costeGasolina;
    costeDerecha = costePhev;
    nombreIzquierda = "Combustión";
    nombreDerecha = "PHEV";
  } else if (modoComparativa === 'PHEV_VS_EV') {
    costeIzquierda = costePhev;
    costeDerecha = costeElectrico;
    nombreIzquierda = "PHEV";
    nombreDerecha = "EV";
  }

  const diferencia = costeIzquierda - costeDerecha;
  const esAhorro = diferencia >= 0;
  const importeAbsoluto = Math.abs(diferencia).toFixed(2);

  const kmFuera = Math.round(safeKmAnuales * (safePorcentajeFuera / 100));
  const kmEnCasa = Math.round(safeKmAnuales * ((100 - safePorcentajeFuera) / 100));

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <style>{`
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type='number'] {
          -moz-appearance: textfield;
        }

        /* 1. Base común del slider */
        input[type='range'] {
          -webkit-appearance: none;
          appearance: none;
          height: 0.5rem;
          border-radius: 0.5rem;
          outline: none;
        }

        /* 2. Bolita personalizada para Chrome, Edge y Safari */
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 1.15rem;
          height: 1.15rem;
          border-radius: 50%;
          background: #e2e8f0; /* Tono slate-200 en vez de #ffffff */
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
          cursor: pointer;
          transition: transform 0.1s ease, background-color 0.1s ease;
        }

        input[type='range']::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        /* 3. Bolita personalizada para Firefox */
        input[type='range']::-moz-range-thumb {
          width: 1.15rem;
          height: 1.15rem;
          border: none;
          border-radius: 50%;
          background: #e2e8f0; /* Tono slate-200 en vez de #ffffff */
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
          cursor: pointer;
          transition: transform 0.1s ease, background-color 0.1s ease;
        }

        input[type='range']::-moz-range-thumb:hover {
          transform: scale(1.15);
        }
      `}</style>

      <div className="max-w-4xl w-full bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700">
        
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-400 tracking-tight mb-2">
            ComparadorNEV
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto font-normal">
            Calcula el ahorro anual estimado entre vehículos de distintas tecnologías
          </p>
        </header>

        {/* 1. Bloque Kilómetros Anuales */}
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
              background: getSliderBackground(safeKmAnuales, 1000, 50000, '#10b981')
            }}
          />

          <div className="mt-4 flex justify-center">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-600 cursor-pointer flex items-center gap-1.5"
            >
              ↺ Restablecer valores
            </button>
          </div>
        </div>

        {/* Selector de Comparativa */}
        <div className="max-w-lg mx-auto mb-8 flex flex-col sm:flex-row gap-2 justify-center p-1.5 bg-slate-900/80 rounded-xl border border-slate-700">
          <button
            onClick={() => setModoComparativa('ICE_VS_EV')}
            className={`flex-1 py-2 px-3 text-xs md:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              modoComparativa === 'ICE_VS_EV'
                ? 'bg-slate-700 text-white shadow-md border border-slate-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            🔥 Combustión vs ⚡ EV
          </button>
          <button
            onClick={() => setModoComparativa('ICE_VS_PHEV')}
            className={`flex-1 py-2 px-3 text-xs md:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              modoComparativa === 'ICE_VS_PHEV'
                ? 'bg-slate-700 text-white shadow-md border border-slate-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            🔥 Combustión vs 🔋 PHEV
          </button>
          <button
            onClick={() => setModoComparativa('PHEV_VS_EV')}
            className={`flex-1 py-2 px-3 text-xs md:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              modoComparativa === 'PHEV_VS_EV'
                ? 'bg-slate-700 text-white shadow-md border border-slate-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            🔋 PHEV vs ⚡ EV
          </button>
        </div>

        {/* 2. Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* IZQUIERDA */}
          {modoComparativa !== 'PHEV_VS_EV' ? (
            <div className="bg-slate-900/60 p-6 rounded-xl border border-amber-500/30 flex flex-col justify-between space-y-6">
              <div>
                <h2 className="text-xl font-bold text-amber-400 mb-6 text-center">
                  Vehículo de Combustión
                </h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-slate-300">Consumo medio</label>
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
                      className="w-full accent-amber-500 cursor-pointer h-2 rounded-lg"
                      style={{
                        background: getSliderBackground(safeConsumoGasolina, 3, 15, '#f59e0b')
                      }}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-slate-300">Precio combustible</label>
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
                      className="w-full accent-amber-500 cursor-pointer h-2 rounded-lg"
                      style={{
                        background: getSliderBackground(safePrecioGasolina, 1, 2.5, '#f59e0b')
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/60 text-center">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Coste Anual Estimado</span>
                <span className="text-2xl font-bold text-amber-400">{costeGasolina.toFixed(2)} €</span>
              </div>
            </div>
          ) : (
            <PhevCard
              porcentajeElectricoPhev={porcentajeElectricoPhev}
              setPorcentajeElectricoPhev={setPorcentajeElectricoPhev}
              safePorcentajeElectricoPhev={safePorcentajeElectricoPhev}
              consumoPhevElectrico={consumoPhevElectrico}
              setConsumoPhevElectrico={setConsumoPhevElectrico}
              safeConsumoPhevElectrico={safeConsumoPhevElectrico}
              consumoPhevGasolina={consumoPhevGasolina}
              setConsumoPhevGasolina={setConsumoPhevGasolina}
              safeConsumoPhevGasolina={safeConsumoPhevGasolina}
              precioGasolinaPhev={precioGasolinaPhev}
              setPrecioGasolinaPhev={setPrecioGasolinaPhev}
              safePrecioGasolinaPhev={safePrecioGasolinaPhev}
              precioKwhPhev={precioKwhPhev}
              setPrecioKwhPhev={setPrecioKwhPhev}
              safePrecioKwhPhev={safePrecioKwhPhev}
              costePhev={costePhev}
              kmPhevElectrico={kmPhevElectrico}
              kmPhevGasolina={kmPhevGasolina}
            />
          )}

          {/* DERECHA */}
          {modoComparativa === 'ICE_VS_PHEV' ? (
            <PhevCard
              porcentajeElectricoPhev={porcentajeElectricoPhev}
              setPorcentajeElectricoPhev={setPorcentajeElectricoPhev}
              safePorcentajeElectricoPhev={safePorcentajeElectricoPhev}
              consumoPhevElectrico={consumoPhevElectrico}
              setConsumoPhevElectrico={setConsumoPhevElectrico}
              safeConsumoPhevElectrico={safeConsumoPhevElectrico}
              consumoPhevGasolina={consumoPhevGasolina}
              setConsumoPhevGasolina={setConsumoPhevGasolina}
              safeConsumoPhevGasolina={safeConsumoPhevGasolina}
              precioGasolinaPhev={precioGasolinaPhev}
              setPrecioGasolinaPhev={setPrecioGasolinaPhev}
              safePrecioGasolinaPhev={safePrecioGasolinaPhev}
              precioKwhPhev={precioKwhPhev}
              setPrecioKwhPhev={setPrecioKwhPhev}
              safePrecioKwhPhev={safePrecioKwhPhev}
              costePhev={costePhev}
              kmPhevElectrico={kmPhevElectrico}
              kmPhevGasolina={kmPhevGasolina}
            />
          ) : (
            <div className="bg-slate-900/60 p-6 rounded-xl border border-cyan-500/30 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-cyan-400">Vehículo EV</h2>
                  <button
                    onClick={() => setMostrarAvanzado(!mostrarAvanzado)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors border cursor-pointer flex items-center gap-1 ${
                      mostrarAvanzado
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    ⚙️ {mostrarAvanzado ? 'Avanzado ON' : 'Opciones avanzadas'}
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2 gap-2">
                      <div className="flex items-center gap-1.5 min-w-0 mr-2">
                        <label className="text-sm font-medium text-slate-300 leading-tight">
                          Consumo medio
                        </label>
                        <TooltipInfo />
                      </div>

                      <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 shrink-0">
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
                      className="w-full accent-cyan-500 cursor-pointer h-2 rounded-lg"
                      style={{
                        background: getSliderBackground(safeConsumoElectrico, 10, 30, '#06b6d4')
                      }}
                    />
                  </div>

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
                      className="w-full accent-cyan-500 cursor-pointer h-2 rounded-lg"
                      style={{
                        background: getSliderBackground(safePrecioKwh, 0.05, 0.5, '#06b6d4')
                      }}
                    />
                  </div>

                  {mostrarAvanzado && (
                    <div className="pt-4 border-t border-cyan-500/20 space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-slate-300">Precio fuera de casa</label>
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
                          className="w-full accent-cyan-500 cursor-pointer h-2 rounded-lg"
                          style={{
                            background: getSliderBackground(safePrecioKwhFuera, 0.1, 0.9, '#06b6d4')
                          }}
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-slate-300">Recargas fuera de casa</label>
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
                          className="w-full accent-cyan-500 cursor-pointer h-2 rounded-lg"
                          style={{
                            background: getSliderBackground(safePorcentajeFuera, 0, 100, '#06b6d4')
                          }}
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
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Coste Anual Estimado</span>
                <span className="text-2xl font-bold text-cyan-400">{costeElectrico.toFixed(2)} €</span>
              </div>
            </div>
          )}

        </div>

        {/* 3. Bloque Ahorro Anual */}
        <div className={`p-6 rounded-xl border text-center transition-all ${
          esAhorro 
            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' 
            : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
        }`}>
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2">
            {esAhorro 
              ? `Ahorro estimado del ${nombreDerecha} frente al ${nombreIzquierda}` 
              : `Sobrecoste estimado del ${nombreDerecha} frente al ${nombreIzquierda}`
            }
          </h3>
          <p className="text-5xl font-extrabold tracking-tight">{importeAbsoluto} €</p>
        </div>

      </div>

      <footer className="mt-12 py-6 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>
          <a href="https://github.com/j8ssem/ComparadorNEV" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200 underline transition-colors">
            ComparadorNEV
          </a>
          {' '}© 2026 está en Github — Desarrollado por{' '}
          <a href="https://github.com/j8ssem" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200 underline transition-colors">
            j8ssem
          </a>
        </p>
        <p className="mt-1 opacity-75">Licencia MIT · Proyecto Open Source</p>
      </footer>
    </main>
  );
}

// Subcomponente Tarjeta PHEV (UI Unificada con Tooltips)
function PhevCard({
  porcentajeElectricoPhev,
  setPorcentajeElectricoPhev,
  safePorcentajeElectricoPhev,
  consumoPhevElectrico,
  setConsumoPhevElectrico,
  safeConsumoPhevElectrico,
  consumoPhevGasolina,
  setConsumoPhevGasolina,
  safeConsumoPhevGasolina,
  precioGasolinaPhev,
  setPrecioGasolinaPhev,
  safePrecioGasolinaPhev,
  precioKwhPhev,
  setPrecioKwhPhev,
  safePrecioKwhPhev,
  costePhev,
  kmPhevElectrico,
  kmPhevGasolina
}) {
  return (
    <div className="bg-slate-900/60 p-6 rounded-xl border border-purple-500/30 flex flex-col justify-between space-y-6">
      <div>
        <h2 className="text-xl font-bold text-purple-400 mb-6 text-center">
          Vehículo PHEV (Híbrido)
        </h2>

        <div className="space-y-5">
          
          {/* Bloque 1: Slider Uso 100% Eléctrico */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-300">
                Uso 100% Eléctrico
              </label>
              <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="5"
                  value={porcentajeElectricoPhev}
                  onChange={(e) => setPorcentajeElectricoPhev(e.target.value)}
                  className="w-12 bg-transparent text-right font-bold text-purple-400 focus:outline-none"
                />
                <span className="text-xs text-slate-400">%</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={safePorcentajeElectricoPhev}
              onChange={(e) => setPorcentajeElectricoPhev(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer h-2 rounded-lg"
              style={{
                background: getSliderBackground(safePorcentajeElectricoPhev, 0, 100, '#a855f7')
              }}
            />
            <p className="text-[11px] text-slate-400 mt-1">
              {safePorcentajeElectricoPhev}% eléctrico ({kmPhevElectrico} km) · {100 - safePorcentajeElectricoPhev}% híbrido ({kmPhevGasolina} km)
            </p>
          </div>

          {/* Bloque 2: Sección Eléctrica */}
          <div className="pt-4 border-t border-purple-500/20 space-y-5">
            {/* Consumo modo EV con Tooltip */}
            <div>
              <div className="flex justify-between items-center mb-2 gap-2">
                <div className="flex items-center gap-1.5 min-w-0 mr-2">
                  <label className="text-sm font-medium text-slate-300 leading-tight">
                    Consumo modo EV
                  </label>
                  <TooltipInfo />
                </div>

                <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 shrink-0">
                  <input
                    type="number"
                    step="0.5"
                    value={consumoPhevElectrico}
                    onChange={(e) => setConsumoPhevElectrico(e.target.value)}
                    className="w-14 bg-transparent text-right font-bold text-purple-400 focus:outline-none"
                  />
                  <span className="text-xs text-slate-400">kWh/100km</span>
                </div>
              </div>

              <input
                type="range"
                min="5"
                max="25"
                step="0.5"
                value={safeConsumoPhevElectrico}
                onChange={(e) => setConsumoPhevElectrico(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer h-2 rounded-lg"
                style={{
                  background: getSliderBackground(safeConsumoPhevElectrico, 5, 25, '#a855f7')
                }}
              />
            </div>

            {/* Precio electricidad */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300">
                  Precio electricidad
                </label>
                <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                  <input
                    type="number"
                    step="0.01"
                    value={precioKwhPhev}
                    onChange={(e) => setPrecioKwhPhev(e.target.value)}
                    className="w-14 bg-transparent text-right font-bold text-purple-400 focus:outline-none"
                  />
                  <span className="text-xs text-slate-400">€/kWh</span>
                </div>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.50"
                step="0.01"
                value={safePrecioKwhPhev}
                onChange={(e) => setPrecioKwhPhev(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer h-2 rounded-lg"
                style={{
                  background: getSliderBackground(safePrecioKwhPhev, 0.05, 0.5, '#a855f7')
                }}
              />
            </div>
          </div>

          {/* Bloque 3: Sección Combustible */}
          <div className="pt-4 border-t border-purple-500/20 space-y-5">
            {/* Consumo modo Híbrido con Tooltip */}
            <div>
              <div className="flex justify-between items-center mb-2 gap-2">
                <div className="flex items-center gap-1.5 min-w-0 mr-2">
                  <label className="text-sm font-medium text-slate-300 leading-tight">
                    Consumo modo Híbrido
                  </label>
                  <TooltipInfo text="Indicar el consumo con batería al mínimo/descargada" />
                </div>

                <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 shrink-0">
                  <input
                    type="number"
                    step="0.1"
                    value={consumoPhevGasolina}
                    onChange={(e) => setConsumoPhevGasolina(e.target.value)}
                    className="w-14 bg-transparent text-right font-bold text-amber-400 focus:outline-none"
                  />
                  <span className="text-xs text-slate-400">l/100km</span>
                </div>
              </div>

              <input
                type="range"
                min="0.5"
                max="12"
                step="0.1"
                value={safeConsumoPhevGasolina}
                onChange={(e) => setConsumoPhevGasolina(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 rounded-lg"
                style={{
                  background: getSliderBackground(safeConsumoPhevGasolina, 0.5, 12, '#f59e0b')
                }}
              />
            </div>

            {/* Precio combustible */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300">
                  Precio combustible
                </label>
                <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                  <input
                    type="number"
                    step="0.01"
                    value={precioGasolinaPhev}
                    onChange={(e) => setPrecioGasolinaPhev(e.target.value)}
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
                value={safePrecioGasolinaPhev}
                onChange={(e) => setPrecioGasolinaPhev(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 rounded-lg"
                style={{
                  background: getSliderBackground(safePrecioGasolinaPhev, 1, 2.5, '#f59e0b')
                }}
              />
            </div>
          </div>

        </div>
      </div>

      <div className="pt-4 border-t border-slate-700/60 text-center">
        <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
          Coste Anual Estimado
        </span>
        <span className="text-2xl font-bold text-purple-400">
          {costePhev.toFixed(2)} €
        </span>
      </div>
    </div>
  );
}