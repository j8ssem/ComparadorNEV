/**
 * Bloque de visualización del ahorro/sobrecoste anual
 */
export function SavingsDisplay({ esAhorro, importeAbsoluto, nombreIzquierda, nombreDerecha }) {
  return (
    <div
      className={`p-6 rounded-xl border text-center transition-all ${
        esAhorro
          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
          : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
      }`}
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2">
        {esAhorro
          ? `Ahorro estimado del ${nombreDerecha} frente al ${nombreIzquierda}`
          : `Sobrecoste estimado del ${nombreDerecha} frente al ${nombreIzquierda}`}
      </h3>
      <p className="text-5xl font-extrabold tracking-tight">{importeAbsoluto} €</p>
    </div>
  );
}
