import { SliderInput } from './common/SliderInput';
import { TooltipInfo } from '../TooltipInfo';

/**
 * Tarjeta del vehículo eléctrico (EV)
 */
export function EvCard({
  consumoElectrico,
  setConsumoElectrico,
  safeConsumoElectrico,
  precioKwh,
  setPrecioKwh,
  safePrecioKwh,
  precioKwhFuera,
  setPrecioKwhFuera,
  safePrecioKwhFuera,
  porcentajeFuera,
  setPorcentajeFuera,
  safePorcentajeFuera,
  mostrarAvanzado,
  setMostrarAvanzado,
  costeElectrico,
  kmFuera,
  kmEnCasa,
}) {
  return (
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
          <SliderInput
            label="Consumo medio"
            value={consumoElectrico}
            safeValue={safeConsumoElectrico}
            onChange={setConsumoElectrico}
            min="10"
            max="30"
            step="0.5"
            unit="kWh/100km"
            color="cyan"
            tooltip={<TooltipInfo />}
          />

          <SliderInput
            label={mostrarAvanzado ? 'Precio energía (en casa)' : 'Precio energía'}
            value={precioKwh}
            safeValue={safePrecioKwh}
            onChange={setPrecioKwh}
            min="0.05"
            max="0.50"
            step="0.01"
            unit="€/kWh"
            color="cyan"
          />

          {mostrarAvanzado && (
            <div className="pt-4 border-t border-cyan-500/20 space-y-6">
              <SliderInput
                label="Precio fuera de casa"
                value={precioKwhFuera}
                safeValue={safePrecioKwhFuera}
                onChange={setPrecioKwhFuera}
                min="0.10"
                max="0.90"
                step="0.01"
                unit="€/kWh"
                color="cyan"
              />

              <div>
                <SliderInput
                  label="Recargas fuera de casa"
                  value={porcentajeFuera}
                  safeValue={safePorcentajeFuera}
                  onChange={setPorcentajeFuera}
                  min="0"
                  max="100"
                  step="5"
                  unit="%"
                  color="cyan"
                  inputClassName="w-12"
                />
                <p className="text-[11px] text-slate-400 mt-2">
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
  );
}
