import { useState } from 'react';
import { DEFAULT_VALUES } from '../constants';

/**
 * Hook que gestiona todos los estados de los vehículos
 */
export const useVehicleStates = () => {
  // Estado Modo Comparativa
  const [modoComparativa, setModoComparativa] = useState('ICE_VS_EV');

  // Estado común
  const [kmAnuales, setKmAnuales] = useState(DEFAULT_VALUES.kmAnuales);

  // Estado Coche Combustión
  const [consumoGasolina, setConsumoGasolina] = useState(DEFAULT_VALUES.consumoGasolina);
  const [precioGasolina, setPrecioGasolina] = useState(DEFAULT_VALUES.precioGasolina);

  // Estado Coche Eléctrico
  const [consumoElectrico, setConsumoElectrico] = useState(DEFAULT_VALUES.consumoElectrico);
  const [precioKwh, setPrecioKwh] = useState(DEFAULT_VALUES.precioKwh);
  const [mostrarAvanzado, setMostrarAvanzado] = useState(false);
  const [precioKwhFuera, setPrecioKwhFuera] = useState(DEFAULT_VALUES.precioKwhFuera);
  const [porcentajeFuera, setPorcentajeFuera] = useState(DEFAULT_VALUES.porcentajeFuera);

  // Estado Coche PHEV (Independiente)
  const [porcentajeElectricoPhev, setPorcentajeElectricoPhev] = useState(DEFAULT_VALUES.porcentajeElectricoPhev);
  const [consumoPhevElectrico, setConsumoPhevElectrico] = useState(DEFAULT_VALUES.consumoPhevElectrico);
  const [consumoPhevGasolina, setConsumoPhevGasolina] = useState(DEFAULT_VALUES.consumoPhevGasolina);
  const [precioGasolinaPhev, setPrecioGasolinaPhev] = useState(DEFAULT_VALUES.precioGasolinaPhev);
  const [precioKwhPhev, setPrecioKwhPhev] = useState(DEFAULT_VALUES.precioKwhPhev);

  // Reset
  const handleReset = () => {
    setKmAnuales(DEFAULT_VALUES.kmAnuales);
    setConsumoGasolina(DEFAULT_VALUES.consumoGasolina);
    setPrecioGasolina(DEFAULT_VALUES.precioGasolina);
    setConsumoElectrico(DEFAULT_VALUES.consumoElectrico);
    setPrecioKwh(DEFAULT_VALUES.precioKwh);
    setPrecioKwhFuera(DEFAULT_VALUES.precioKwhFuera);
    setPorcentajeFuera(DEFAULT_VALUES.porcentajeFuera);
    setMostrarAvanzado(false);
    // Reset PHEV
    setPorcentajeElectricoPhev(DEFAULT_VALUES.porcentajeElectricoPhev);
    setConsumoPhevElectrico(DEFAULT_VALUES.consumoPhevElectrico);
    setConsumoPhevGasolina(DEFAULT_VALUES.consumoPhevGasolina);
    setPrecioGasolinaPhev(DEFAULT_VALUES.precioGasolinaPhev);
    setPrecioKwhPhev(DEFAULT_VALUES.precioKwhPhev);
  };

  return {
    modoComparativa,
    setModoComparativa,
    kmAnuales,
    setKmAnuales,
    consumoGasolina,
    setConsumoGasolina,
    precioGasolina,
    setPrecioGasolina,
    consumoElectrico,
    setConsumoElectrico,
    precioKwh,
    setPrecioKwh,
    mostrarAvanzado,
    setMostrarAvanzado,
    precioKwhFuera,
    setPrecioKwhFuera,
    porcentajeFuera,
    setPorcentajeFuera,
    porcentajeElectricoPhev,
    setPorcentajeElectricoPhev,
    consumoPhevElectrico,
    setConsumoPhevElectrico,
    consumoPhevGasolina,
    setConsumoPhevGasolina,
    precioGasolinaPhev,
    setPrecioGasolinaPhev,
    precioKwhPhev,
    setPrecioKwhPhev,
    handleReset,
  };
};
