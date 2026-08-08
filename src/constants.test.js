import { describe, it, expect } from 'vitest';
import { DEFAULT_VALUES, CHARGING_LOSS_FACTOR } from './constants';

describe('Constantes por defecto', () => {
  it('debe tener valores numéricos válidos para el estado inicial', () => {
    expect(DEFAULT_VALUES.kmAnuales).toBeGreaterThan(0);
    expect(DEFAULT_VALUES.consumoGasolina).toBeGreaterThan(0);
    expect(DEFAULT_VALUES.precioKwh).toBeGreaterThan(0);
  });

  it('debe definir un factor de pérdidas de recarga del 10%', () => {
    expect(CHARGING_LOSS_FACTOR).toBe(1.10);
  });
});