import { describe, it, expect } from 'vitest';
import { DEFAULT_VALUES } from './constants';

describe('Constantes por defecto', () => {
  it('debe tener valores numéricos válidos para el estado inicial', () => {
    expect(DEFAULT_VALUES.kmAnuales).toBeGreaterThan(0);
    expect(DEFAULT_VALUES.consumoGasolina).toBeGreaterThan(0);
    expect(DEFAULT_VALUES.precioKwh).toBeGreaterThan(0);
  });
});