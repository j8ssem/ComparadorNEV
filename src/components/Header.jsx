/**
 * Encabezado de la aplicación
 */
export function Header() {
  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-400 tracking-tight mb-2">
        ComparadorNEV
      </h1>
      <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto font-normal">
        Calcula el ahorro anual estimado entre vehículos de distintas tecnologías
      </p>
    </header>
  );
}
