import { useState } from 'react';
import { useVehicleStates } from './hooks/useVehicleStates';
import {
  toSafeNumber,
  calculateIceCost,
  calculateEvCost,
  calculateAverageKwhPrice,
  calculatePhevCosts,
  calculateSavings,
  calculateChargingLocationKm,
} from './utils/calculations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { KmAnnualInput } from './components/KmAnnualInput';
import { ComparisonModeSelector } from './components/ComparisonModeSelector';
import { IceCard } from './components/IceCard';
import { EvCard } from './components/EvCard';
import { PhevCard } from './components/PhevCard';
import { SavingsDisplay } from './components/SavingsDisplay';
import { ResetButton } from './components/common/ResetButton';

const sliderStyles = `
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    height: 0.5rem;
    border-radius: 0.5rem;
    outline: none;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.15rem;
    height: 1.15rem;
    border-radius: 50%;
    background: #e2e8f0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: transform 0.1s ease, background-color 0.1s ease;
  }

  input[type='range']::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }

  input[type='range']::-moz-range-thumb {
    width: 1.15rem;
    height: 1.15rem;
    border: none;
    border-radius: 50%;
    background: #e2e8f0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: transform 0.1s ease, background-color 0.1s ease;
  }

  input[type='range']::-moz-range-thumb:hover {
    transform: scale(1.15);
  }
`;

export default function App() {
  const vehicleState = useVehicleStates();

  // Convertir valores a números seguros
  const safeKmAnuales = toSafeNumber(vehicleState.kmAnuales);
  const safeConsumoGasolina = toSafeNumber(vehicleState.consumoGasolina);
  const safePrecioGasolina = toSafeNumber(vehicleState.precioGasolina);
  const safeConsumoElectrico = toSafeNumber(vehicleState.consumoElectrico);
  const safePrecioKwh = toSafeNumber(vehicleState.precioKwh);
  const safePrecioKwhFuera = toSafeNumber(vehicleState.precioKwhFuera);
  const safePorcentajeFuera = toSafeNumber(vehicleState.porcentajeFuera);
  const safePorcentajeElectricoPhev = toSafeNumber(vehicleState.porcentajeElectricoPhev);
  const safeConsumoPhevElectrico = toSafeNumber(vehicleState.consumoPhevElectrico);
  const safeConsumoPhevGasolina = toSafeNumber(vehicleState.consumoPhevGasolina);
  const safePrecioGasolinaPhev = toSafeNumber(vehicleState.precioGasolinaPhev);
  const safePrecioKwhPhev = toSafeNumber(vehicleState.precioKwhPhev);

  // Cálculos
  const precioKwhMedio = calculateAverageKwhPrice(
    safePrecioKwh,
    safePrecioKwhFuera,
    vehicleState.mostrarAvanzado ? safePorcentajeFuera : 0
  );

  const costeGasolina = calculateIceCost(safeKmAnuales, safeConsumoGasolina, safePrecioGasolina);
  const costeElectrico = calculateEvCost(safeKmAnuales, safeConsumoElectrico, precioKwhMedio);

  const phevCosts = calculatePhevCosts(
    safeKmAnuales,
    safePorcentajeElectricoPhev,
    safeConsumoPhevElectrico,
    safeConsumoPhevGasolina,
    safePrecioKwhPhev,
    safePrecioGasolinaPhev
  );

  // Configuración dinámica de comparativa
  let costeIzquierda = costeGasolina;
  let costeDerecha = costeElectrico;
  let nombreIzquierda = 'Combustión';
  let nombreDerecha = 'EV';

  if (vehicleState.modoComparativa === 'ICE_VS_PHEV') {
    costeIzquierda = costeGasolina;
    costeDerecha = phevCosts.costePhev;
    nombreIzquierda = 'Combustión';
    nombreDerecha = 'PHEV';
  } else if (vehicleState.modoComparativa === 'PHEV_VS_EV') {
    costeIzquierda = phevCosts.costePhev;
    costeDerecha = costeElectrico;
    nombreIzquierda = 'PHEV';
    nombreDerecha = 'EV';
  }

  const savings = calculateSavings(costeIzquierda, costeDerecha);
  const chargingLocationKm = calculateChargingLocationKm(safeKmAnuales, safePorcentajeFuera);

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <style>{sliderStyles}</style>

      <div className="max-w-4xl w-full bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700">
        <Header />

        {/* Kilómetros Anuales */}
        <div className="max-w-lg mx-auto mb-6 bg-slate-700/40 p-5 rounded-xl border border-slate-600">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-300">
              Kilómetros anuales
            </label>
            <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-lg border border-slate-600">
              <input
                type="number"
                value={vehicleState.kmAnuales}
                onChange={(e) => vehicleState.setKmAnuales(e.target.value)}
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
            onChange={(e) => vehicleState.setKmAnuales(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-2 rounded-lg"
            style={{
              background: `linear-gradient(to right, #10b981 ${((safeKmAnuales - 1000) / (50000 - 1000)) * 100}%, #334155 ${((safeKmAnuales - 1000) / (50000 - 1000)) * 100}%)`,
            }}
          />

          <div className="mt-4 flex justify-center">
            <ResetButton onClick={vehicleState.handleReset} />
          </div>
        </div>

        {/* Selector de Comparativa */}
        <ComparisonModeSelector
          modoComparativa={vehicleState.modoComparativa}
          setModoComparativa={vehicleState.setModoComparativa}
        />

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* IZQUIERDA */}
          {vehicleState.modoComparativa !== 'PHEV_VS_EV' ? (
            <IceCard
              consumoGasolina={vehicleState.consumoGasolina}
              setConsumoGasolina={vehicleState.setConsumoGasolina}
              safeConsumoGasolina={safeConsumoGasolina}
              precioGasolina={vehicleState.precioGasolina}
              setPrecioGasolina={vehicleState.setPrecioGasolina}
              safePrecioGasolina={safePrecioGasolina}
              costeGasolina={costeGasolina}
            />
          ) : (
            <PhevCard
              porcentajeElectricoPhev={vehicleState.porcentajeElectricoPhev}
              setPorcentajeElectricoPhev={vehicleState.setPorcentajeElectricoPhev}
              safePorcentajeElectricoPhev={safePorcentajeElectricoPhev}
              consumoPhevElectrico={vehicleState.consumoPhevElectrico}
              setConsumoPhevElectrico={vehicleState.setConsumoPhevElectrico}
              safeConsumoPhevElectrico={safeConsumoPhevElectrico}
              consumoPhevGasolina={vehicleState.consumoPhevGasolina}
              setConsumoPhevGasolina={vehicleState.setConsumoPhevGasolina}
              safeConsumoPhevGasolina={safeConsumoPhevGasolina}
              precioGasolinaPhev={vehicleState.precioGasolinaPhev}
              setPrecioGasolinaPhev={vehicleState.setPrecioGasolinaPhev}
              safePrecioGasolinaPhev={safePrecioGasolinaPhev}
              precioKwhPhev={vehicleState.precioKwhPhev}
              setPrecioKwhPhev={vehicleState.setPrecioKwhPhev}
              safePrecioKwhPhev={safePrecioKwhPhev}
              costePhev={phevCosts.costePhev}
              kmPhevElectrico={phevCosts.kmPhevElectrico}
              kmPhevGasolina={phevCosts.kmPhevGasolina}
            />
          )}

          {/* DERECHA */}
          {vehicleState.modoComparativa === 'ICE_VS_PHEV' ? (
            <PhevCard
              porcentajeElectricoPhev={vehicleState.porcentajeElectricoPhev}
              setPorcentajeElectricoPhev={vehicleState.setPorcentajeElectricoPhev}
              safePorcentajeElectricoPhev={safePorcentajeElectricoPhev}
              consumoPhevElectrico={vehicleState.consumoPhevElectrico}
              setConsumoPhevElectrico={vehicleState.setConsumoPhevElectrico}
              safeConsumoPhevElectrico={safeConsumoPhevElectrico}
              consumoPhevGasolina={vehicleState.consumoPhevGasolina}
              setConsumoPhevGasolina={vehicleState.setConsumoPhevGasolina}
              safeConsumoPhevGasolina={safeConsumoPhevGasolina}
              precioGasolinaPhev={vehicleState.precioGasolinaPhev}
              setPrecioGasolinaPhev={vehicleState.setPrecioGasolinaPhev}
              safePrecioGasolinaPhev={safePrecioGasolinaPhev}
              precioKwhPhev={vehicleState.precioKwhPhev}
              setPrecioKwhPhev={vehicleState.setPrecioKwhPhev}
              safePrecioKwhPhev={safePrecioKwhPhev}
              costePhev={phevCosts.costePhev}
              kmPhevElectrico={phevCosts.kmPhevElectrico}
              kmPhevGasolina={phevCosts.kmPhevGasolina}
            />
          ) : (
            <EvCard
              consumoElectrico={vehicleState.consumoElectrico}
              setConsumoElectrico={vehicleState.setConsumoElectrico}
              safeConsumoElectrico={safeConsumoElectrico}
              precioKwh={vehicleState.precioKwh}
              setPrecioKwh={vehicleState.setPrecioKwh}
              safePrecioKwh={safePrecioKwh}
              precioKwhFuera={vehicleState.precioKwhFuera}
              setPrecioKwhFuera={vehicleState.setPrecioKwhFuera}
              safePrecioKwhFuera={safePrecioKwhFuera}
              porcentajeFuera={vehicleState.porcentajeFuera}
              setPorcentajeFuera={vehicleState.setPorcentajeFuera}
              safePorcentajeFuera={safePorcentajeFuera}
              mostrarAvanzado={vehicleState.mostrarAvanzado}
              setMostrarAvanzado={vehicleState.setMostrarAvanzado}
              costeElectrico={costeElectrico}
              kmFuera={chargingLocationKm.kmFuera}
              kmEnCasa={chargingLocationKm.kmEnCasa}
            />
          )}
        </div>

        {/* Bloque Ahorro Anual */}
        <SavingsDisplay
          esAhorro={savings.esAhorro}
          importeAbsoluto={savings.importeAbsoluto}
          nombreIzquierda={nombreIzquierda}
          nombreDerecha={nombreDerecha}
        />
      </div>

      <Footer />
    </main>
  );
}
