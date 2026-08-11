# Roadmap de Mejoras y Arquitectura - ComparadorNEV

Este documento recopila las futuras funcionalidades, tareas de infraestructura y decisiones técnicas para el desarrollo del proyecto.

---

## 1. Funcionalidades de Producto (Lógica y UI/UX)

* **Gestión de ahorro negativo (EV > Combustión):**
  Cuando el coste del vehículo eléctrico supere al de combustión, adaptar dinámicamente la interfaz cambiando el texto de "Ahorro" a "Sobrecoste" y modificando el color del recuadro a tonos de alerta (rojo/naranja) en lugar de mostrar un valor negativo sin contexto.

* **Opciones avanzadas para Vehículo Eléctrico:**
  Incluir una pestaña de configuración avanzada para especificar el porcentaje de recarga realizado fuera del hogar (público/rápido) y el precio/kWh correspondiente a dicho tramo.

* **Nuevos comparadores (PHEV):**
  * Incorporar la opción de vehículos Híbridos Enchufables (PHEV), dividiendo su análisis en dos bloques: uso 100% eléctrico y uso en modo híbrido.
  * Habilitar las comparativas: Eléctrico vs. PHEV y Combustión vs. PHEV.

* **Desglose de métricas energéticas:**
  Mostrar un resumen detallado de los volúmenes anuales consumidos en cada cálculo (litros totales de combustible y kWh totales consumidos).

* **Viralización y funciones sociales:**
  Añadir un botón para compartir o copiar fácilmente el desglose de resultados y ahorro con otras personas.

---

## 2. Refactorización y Arquitectura de Código

* **Modularización del proyecto:**
  Extraer la lógica y los bloques de interfaz de `App.jsx` hacia componentes independientes dentro de la carpeta `src/components/`.

* **Edición y gestión de formatos con Tailwind CSS:**
  * **Planteamiento:** Estudiar cómo simplificar la modificación de estilos repetidos en múltiples etiquetas HTML (`divs`).
  * **Solución técnica:** En React se solventa creando componentes reutilizables (por ejemplo, un componente `<Card>` o `<Input>` que contenga las clases de Tailwind). De este modo, cualquier cambio de diseño se realiza en un único archivo. Para estilos globales o recurrentes, también se pueden abstraer clases mediante `@apply` en `index.css`.

---

## 3. Conceptos Técnicos y Ecosistema Frontend

* **Arquitectura del entorno de desarrollo (React, Vite, NPM):**
  * **React:** Librería de JavaScript encargada de construir la interfaz gráfica mediante componentes reutilizables y gestionar el estado reactivo de los datos.
  * **Vite:** Herramienta de empaquetado (*build tool*) y servidor local de desarrollo de alta velocidad que procesa el código JSX y Tailwind en tiempo real.
  * **NPM:** Gestor de paquetes de Node.js utilizado para instalar, actualizar y administrar las dependencias externas del proyecto.

---

## 4. Infraestructura, Despliegue y Open Source

* **Publicación del repositorio:**
  * Cambiar la visibilidad del repositorio a público en GitHub.
  * Definir e incluir una licencia Open Source (ej. MIT).
  * Diseñar un Header y Footer globales con información del proyecto, enlaces y créditos.

* **Despliegue continuo en GitHub Pages:**
  Configurar la publicación automática de la web en GitHub Pages mediante un workflow de GitHub Actions que se active tras cada merge en la rama `main`.

* **Empaquetado y portabilidad de la aplicación:**
  * **Planteamiento:** Evaluar si la aplicación se puede empaquetar para funcionar en cualquier servidor web.
  * **Solución técnica:** Sí. Al ejecutar `npm run build`, Vite genera una carpeta `dist/` estática (HTML, CSS y JS). Esa carpeta se puede subir y ejecutar en cualquier servidor web tradicional (Nginx, Apache, CPanel) sin necesidad de tener Node.js instalado en producción.

* **Despliegue en servidores con aplicaciones existentes:**
  * **Planteamiento:** Determinar el procedimiento para desplegar ComparadorNEV en un servidor que ya aloja otras aplicaciones.
  * **Solución técnica:** Se puede convivir sin interferir con otras apps de dos formas: mediante un subdominio (ej. `comparadornev.tudominio.com`) o dentro de una subcarpeta (ej. `tudominio.com/comparadornev/`) mediante reglas de proxy inverso en el servidor web.