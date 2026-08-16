import { CHARGING_LOSS_FACTOR } from '../constants';

/**
 * Convierte un valor a número seguro (0 si no es válido)
 */
export const toSafeNumber = (value) => Number(value) || 0;

/**
 * Calcula el coste de un vehículo de combustión
 */
export const calculateIceCost = (kmAnuales, consumoGasolina, precioGasolina) => {
  return (kmAnuales / 100) * consumoGasolina * precioGasolina;
};

/**
 * Calcula el coste de un vehículo eléctrico
 */
export const calculateEvCost = (kmAnuales, consumoElectrico, precioKwhMedio) => {
  return (kmAnuales / 100) * (consumoElectrico * CHARGING_LOSS_FACTOR) * precioKwhMedio;
};

/**
 * Calcula el precio medio del kWh considerando recargas en casa y fuera
 */
export const calculateAverageKwhPrice = (precioKwh, precioKwhFuera, porcentajeFuera) => {
  const fraccionFuera = porcentajeFuera / 100;
  const fraccionEnCasa = 1 - fraccionFuera;
  return (precioKwh * fraccionEnCasa) + (precioKwhFuera * fraccionFuera);
};

/**
 * Calcula el coste del PHEV desglosado
 */
export const calculatePhevCosts = (kmAnuales, porcentajeElectricoPhev, consumoPhevElectrico, consumoPhevGasolina, precioKwhPhev, precioGasolinaPhev) => {
  const kmPhevElectrico = Math.round(kmAnuales * (porcentajeElectricoPhev / 100));
  const kmPhevGasolina = Math.round(kmAnuales * ((100 - porcentajeElectricoPhev) / 100));

  const costePhevElectrico = (kmPhevElectrico / 100) * (consumoPhevElectrico * CHARGING_LOSS_FACTOR) * precioKwhPhev;
  const costePhevGasolina = (kmPhevGasolina / 100) * consumoPhevGasolina * precioGasolinaPhev;

  return {
    kmPhevElectrico,
    kmPhevGasolina,
    costePhevElectrico,
    costePhevGasolina,
    costePhev: costePhevElectrico + costePhevGasolina,
  };
};

/**
 * Calcula la diferencia de coste y determina si hay ahorro
 */
export const calculateSavings = (costeIzquierda, costeDerecha) => {
  const diferencia = costeIzquierda - costeDerecha;
  return {
    diferencia,
    esAhorro: diferencia >= 0,
    importeAbsoluto: Math.abs(diferencia).toFixed(2),
  };
};

/**
 * Calcula km desglosados por ubicación de recarga
 */
export const calculateChargingLocationKm = (kmAnuales, porcentajeFuera) => {
  return {
    kmFuera: Math.round(kmAnuales * (porcentajeFuera / 100)),
    kmEnCasa: Math.round(kmAnuales * ((100 - porcentajeFuera) / 100)),
  };
};
