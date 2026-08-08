# Registro de Cambios (Changelog)

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/) y usa [Semantic Versioning](https://semver.org/lang/es/).

## [1.2.0] - 2026-08-08

### Añadido
* Botón para restablecer los parámetros a sus valores por defecto.
* Archivo de constantes `src/constants.js` para centralizar la configuración inicial.
* Test unitario con Vitest para validar los valores iniciales.
* Flujo de Integración Continua (CI) con GitHub Actions para validar Pull Requests.
* Flujo de Integración Continua (CI) con Github Actions para generar versiones en develop

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