# Registro de Cambios (Changelog)

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/) y usa [Semantic Versioning](https://semver.org/lang/es/).

## [1.9.0] - 2026-08-12

### Added
- Include PHEV vehicles type and different comparator options
- Update constants test
- Improve "i" tooltip alignment

## [1.8.0] - 2026-08-11

### Added
- New option to set advanced EV parameters in the comparator calcs

## [1.7.0] - 2026-08-11

### Added
- NPM Package and config to build gh-page manually
- Workflow automated gh-pages deployment

## [1.6.0] - 2026-08-11

### Added
- Add footer

### Changed
- Changes after repo rename to **ComparadorNEV**

### Removed
- Roadmap help info file `mejoras.md`

## [1.5.0] - 2026-08-11

### Añadido
- Mensaje dinámico sobre el ahorro o sobrecoste del EV
- Documento de posibles mejoras futuras: mejoras.md

## [1.4.0] - 2026-08-08

### Añadido
- Factor de pérdidas en la recarga de vehículos eléctricos (`CHARGING_LOSS_FACTOR = 1.10`) aplicado al cálculo del consumo eléctrico.
- Componente `TooltipInfo` con diseño estilizado e información explicativa sobre las pérdidas del 10% en recarga.
- Prueba unitaria en Vitest para garantizar la integridad de la constante de pérdidas de carga.

### Cambiado
- Actualizado el cálculo de costes del vehículo eléctrico para reflejar la energía real demandada de la red.

## [1.3.0] - 2026-08-08

### Añadido
* Documentación con el flujo git seguido en este proyecto.
* Update del README.md

## [1.2.0] - 2026-08-08

### Añadido
* Botón para restablecer los parámetros a sus valores por defecto.
* Archivo de constantes `src/constants.js` para centralizar la configuración inicial.
* Test unitario con Vitest para validar los valores iniciales.
* Flujo de Integración Continua (CI) con GitHub Actions para validar Pull Requests.
* Flujo de Integración Continua (CI) con Github Actions para generar versiones en develop
* Flujo de Integración Continua (CI) con Github Actions para generar versiones en rama **main**

## [1.1.0] - 2026-08-08

### Añadido
* Deslizadores interactivos (*range sliders*) en todas las casillas.
* Eliminación de las flechas por defecto de los inputs numéricos por CSS.
* Sincronización en tiempo real entre sliders y entradas de texto.

## [1.0.0] - 2026-08-07

### Añadido
* Comparadora visual entre vehículo de combustión y eléctrico.
* Cálculo en tiempo real de coste anual y ahorro estimado.
* Diseño adaptativo (*responsive*) en modo oscuro con Tailwind CSS v4.