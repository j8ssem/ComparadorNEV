import { SliderInput } from './common/SliderInput';

/**
 * Tarjeta del vehículo de combustión (ICE)
 */
export function IceCard({
  consumoGasolina,
  setConsumoGasolina,
  safeConsumoGasolina,
  precioGasolina,
  setPrecioGasolina,
  safePrecioGasolina,
  costeGasolina,
}) {
  return (
    <div className="bg-slate-900/60 p-6 rounded-xl border border-amber-500/30 flex flex-col justify-between space-y-6">
      <div>
        <h2 className="text-xl font-bold text-amber-400 mb-6 text-center">
          Vehículo de Combustión
        </h2>

        <div className="space-y-6">
          <SliderInput
            label="Consumo medio"
            value={consumoGasolina}
            safeValue={safeConsumoGasolina}
            onChange={setConsumoGasolina}
            min="3"
            max="15"
            step="0.1"
            unit="l/100km"
            color="amber"
          />

          <SliderInput
            label="Precio combustible"
            value={precioGasolina}
            safeValue={safePrecioGasolina}
            onChange={setPrecioGasolina}
            min="1.00"
            max="2.50"
            step="0.01"
            unit="€/l"
            color="amber"
          />
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
  );
}
