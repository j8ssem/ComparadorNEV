import { SliderInput } from './common/SliderInput';
import { TooltipInfo } from '../TooltipInfo';

/**
 * Tarjeta del vehículo híbrido enchufable (PHEV)
 */
export function PhevCard({
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
  kmPhevGasolina,
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
            <SliderInput
              label="Uso 100% Eléctrico"
              value={porcentajeElectricoPhev}
              safeValue={safePorcentajeElectricoPhev}
              onChange={setPorcentajeElectricoPhev}
              min="0"
              max="100"
              step="5"
              unit="%"
              color="purple"
              inputClassName="w-12"
            />
            <p className="text-[11px] text-slate-400 mt-2">
              {safePorcentajeElectricoPhev}% eléctrico ({kmPhevElectrico} km) · {100 - safePorcentajeElectricoPhev}% híbrido ({kmPhevGasolina} km)
            </p>
          </div>

          {/* Bloque 2: Sección Eléctrica */}
          <div className="pt-4 border-t border-purple-500/20 space-y-5">
            <SliderInput
              label="Consumo modo EV"
              value={consumoPhevElectrico}
              safeValue={safeConsumoPhevElectrico}
              onChange={setConsumoPhevElectrico}
              min="5"
              max="25"
              step="0.5"
              unit="kWh/100km"
              color="purple"
              tooltip={<TooltipInfo />}
            />

            <SliderInput
              label="Precio electricidad"
              value={precioKwhPhev}
              safeValue={safePrecioKwhPhev}
              onChange={setPrecioKwhPhev}
              min="0.05"
              max="0.50"
              step="0.01"
              unit="€/kWh"
              color="purple"
            />
          </div>

          {/* Bloque 3: Sección Combustible */}
          <div className="pt-4 border-t border-purple-500/20 space-y-5">
            <SliderInput
              label="Consumo modo Híbrido"
              value={consumoPhevGasolina}
              safeValue={safeConsumoPhevGasolina}
              onChange={setConsumoPhevGasolina}
              min="0.5"
              max="12"
              step="0.1"
              unit="l/100km"
              color="amber"
              tooltip={<TooltipInfo text="Indicar el consumo con batería al mínimo/descargada" />}
            />

            <SliderInput
              label="Precio combustible"
              value={precioGasolinaPhev}
              safeValue={safePrecioGasolinaPhev}
              onChange={setPrecioGasolinaPhev}
              min="1.00"
              max="2.50"
              step="0.01"
              unit="€/l"
              color="amber"
            />
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
