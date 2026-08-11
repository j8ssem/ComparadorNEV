export const DEFAULT_VALUES = {
  kmAnuales: 15000,
  consumoGasolina: 6.5,
  precioGasolina: 1.65,
  consumoElectrico: 17,
  precioKwh: 0.15,
  precioKwhFuera: 0.45,
  porcentajeFuera: 0,
  porcentajeElectricoPhev: 60, // 60% en modo EV, 40% en modo Híbrido/Gasolina
  consumoPhevElectrico: 18.0,  // kWh/100km en modo 100% EV
  consumoPhevGasolina: 5.5,    // l/100km con batería agotada
  precioGasolinaPhev: 1.65,    // Precio combustible propio
  precioKwhPhev: 0.15,         // Precio energía propio
};

export const CHARGING_LOSS_FACTOR = 1.10;