// Función para calcular el degradado dinámico perfecto en todos los navegadores
export const getSliderBackground = (value, min, max, activeColor) => {
  const percentage = ((value - min) / (max - min)) * 100;
  return `linear-gradient(to right, ${activeColor} ${percentage}%, #334155 ${percentage}%)`;
};
