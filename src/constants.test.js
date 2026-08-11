import { describe, it, expect } from 'vitest';
import { DEFAULT_VALUES, CHARGING_LOSS_FACTOR } from './constants';

describe('Constantes del simulador', () => {
  describe('Valores por defecto (DEFAULT_VALUES)', () => {
    it('debe definir parámetros globales válidos', () => {
      expect(DEFAULT_VALUES.kmAnuales).toBeGreaterThan(0);
    });

    it('debe definir parámetros válidos para vehículos de Combustión y EV', () => {
      expect(DEFAULT_VALUES.consumoGasolina).toBeGreaterThan(0);
      expect(DEFAULT_VALUES.precioGasolina).toBeGreaterThan(0);
      expect(DEFAULT_VALUES.consumoElectrico).toBeGreaterThan(0);
      expect(DEFAULT_VALUES.precioKwh).toBeGreaterThan(0);
    });

    it('debe definir los parámetros por defecto para el vehículo PHEV', () => {
      expect(DEFAULT_VALUES.porcentajeElectricoPhev).toBeGreaterThanOrEqual(0);
      expect(DEFAULT_VALUES.porcentajeElectricoPhev).toBeLessThanOrEqual(100);
      expect(DEFAULT_VALUES.consumoPhevElectrico).toBeGreaterThan(0);
      expect(DEFAULT_VALUES.consumoPhevGasolina).toBeGreaterThan(0);
      expect(DEFAULT_VALUES.precioGasolinaPhev).toBeGreaterThan(0);
      expect(DEFAULT_VALUES.precioKwhPhev).toBeGreaterThan(0);
    });
  });

  describe('Factores de cálculo', () => {
    it('debe definir un factor de pérdidas de recarga del 10%', () => {
      expect(CHARGING_LOSS_FACTOR).toBe(1.10);
    });
  });
});