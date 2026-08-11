# ComparadorNEV — Comparador de ahorro entre vehículos de nueva energía (NEV)

![Version](https://img.shields.io/badge/version-1.9.1-blue.svg)

Aplicación web interactiva para calcular y comparar el coste anual de uso entre un vehículo de combustión tradicional y un vehículo eléctrico.

Para usarla, simplemente accede a la URL de Github Pages donde se aloja la web de [ComparadorNEV](https://j8ssem.github.io/ComparadorNEV/)


---

## 🚀 Tecnologías utilizadas

* **React 19** (Vite)
* **Tailwind CSS v4**
* **JavaScript (ES6+)**

---

## 🛠️ Instalación y Ejecución Local

### Requisitos previos
* **Node.js** (v20 o superior recomendado)
* **npm**

### Pasos para iniciar el proyecto

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/j8ssem/ComparadorNEV.git
   cd ComparadorNEV
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Exponer en red local (opcional, para pruebas en móviles):**
   ```bash
   npm run dev -- --host
   ```

---

## 📋 Comandos Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con Vite. |
| `npm run build` | Compila y optimiza la aplicación para producción. |
| `npm run test` | Ejecuta la suite de pruebas unitarias. |
| `npm run preview` | Previsualiza la build de producción en local. |

---

## 🌿 Estrategia de Ramas (Git Flow)

* **`main`**: Producción y versiones estables (etiquetadas con SemVer).
* **`develop`**: Rama principal de integración para desarrollo.
* **`feature/*`**: Ramas secundarias para nuevas funcionalidades.

---

## 📚 Documentación del Proyecto

* 📖 [Estrategia de Git, SemVer y Releases](docs/git-flow-guide.md)