import { getSliderBackground } from '../../utils/sliderStyles';

/**
 * Componente reutilizable de Slider + Input numérico
 * @param {string} label - Etiqueta del input
 * @param {number|string} value - Valor actual
 * @param {number|string} safeValue - Valor seguro (número válido)
 * @param {function} onChange - Callback cuando cambia el valor
 * @param {number} min - Valor mínimo del slider
 * @param {number} max - Valor máximo del slider
 * @param {number|string} step - Paso del slider
 * @param {string} unit - Unidad de medida (ej: "km", "€/l", "kWh/100km")
 * @param {string} color - Color de Tailwind para el slider (ej: "emerald", "amber", "cyan")
 * @param {ReactNode} tooltip - Elemento tooltip (opcional)
 * @param {string} inputClassName - Clases adicionales para el input (opcional)
 */
export function SliderInput({
  label,
  value,
  safeValue,
  onChange,
  min,
  max,
  step,
  unit,
  color = 'emerald',
  tooltip = null,
  inputClassName = '',
}) {
  const colorMap = {
    emerald: { slider: '#10b981', text: 'text-emerald-400' },
    amber: { slider: '#f59e0b', text: 'text-amber-400' },
    cyan: { slider: '#06b6d4', text: 'text-cyan-400' },
    purple: { slider: '#a855f7', text: 'text-purple-400' },
  };

  const { slider: sliderColor, text: textColor } = colorMap[color] || colorMap.emerald;

  return (
    <div>
      <div className="flex justify-between items-center mb-2 gap-2">
        <div className="flex items-center gap-1.5 min-w-0 mr-2">
          <label className="text-sm font-medium text-slate-300 leading-tight">
            {label}
          </label>
          {tooltip}
        </div>

        <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 shrink-0">
          <input
            type="number"
            step={step}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-14 bg-transparent text-right font-bold focus:outline-none ${textColor} ${inputClassName}`}
          />
          <span className="text-xs text-slate-400">{unit}</span>
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={safeValue}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full cursor-pointer h-2 rounded-lg accent-${color}-500`}
        style={{
          background: getSliderBackground(safeValue, min, max, sliderColor),
        }}
      />
    </div>
  );
}
