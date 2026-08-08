# Estrategia de Ramificación y Flujo de Trabajo (Git Flow & Release)

Este documento detalla la convención de Git, el control de versiones y el flujo de integración/despliegue continuo (CI/CD) utilizado en este repositorio.

---

## Principios Clave

* **SemVer (Semantic Versioning 2.0.0):** Formato `MAJOR.MINOR.PATCH`.
* **Single Source of Truth:** La versión objetivo se define directamente en el archivo `package.json` durante la Pull Request (PR).
* **Trunk-based with PRs** La rama `develop` representa el entorno de staging/pre-producción y `main` representa el entorno de producción. Ambas están protegidas y solo aceptan cambios mediante Pull Requests.
* **Sin sobre-ingeniería:** No se utilizan herramientas automáticas externas para calcular versiones ni ramas intermedias de release. Todo es transparente y predecible.

---

## Arquitectura de Ramas

* **`main`**: Código en producción. Recibe cambios únicamente desde `develop`. Cada integración genera un **Tag oficial limpio** (ejemplo: `v1.2.0`).
* **`develop`**: Código en pre-producción (staging). Recibe cambios desde las ramas de tipo `feature/` o `fix/`. Cada integración genera un **Tag de prerelease con timestamp** (ejemplo: `v1.2.0-dev.20260808-140519`).
* **`feature/*` / `fix/***`: Ramas de trabajo efímeras creadas por los desarrolladores para añadir funcionalidades o corregir errores.

---

## Ciclo de Vida de una Versión

```
[feature/mi-tarea] ──(PR + CI Tests)──> [develop] ──(PR)──> [main]
                                            │                   │
                                            ▼                   ▼
                                     Tag: v1.2.0-dev...     Tag: v1.2.0

```

1. **Creación:** El desarrollador crea una rama efímera a partir de `develop`.
2. **Definición en PR:** En la rama se actualiza la versión objetivo en el `package.json` (ejemplo: `"1.2.0"`) y se documentan los cambios en `CHANGELOG.md`.
3. **Staging (`develop`):** Al fusionar la PR, el CI genera un tag de prerelease añadiendo el sufijo `-dev.TIMESTAMP`.
4. **Producción (`main`):** Al fusionar `develop` en `main`, el CI lee la versión del `package.json` y genera el tag oficial limpio (`v1.2.0`).

---

## Ejemplo Práctico Paso a Paso

A continuación se muestra el proceso completo de un desarrollador añadiendo un nuevo botón de exportación a PDF.

### Paso 1: Crear la rama de trabajo

Desde la rama `develop` actualizada, crea la rama para tu nueva funcionalidad:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/export-pdf

```

### Paso 2: Desarrollar y definir la versión objetivo

Implementa los cambios en el código. A continuación, actualiza la versión en `package.json` y documenta los cambios en `CHANGELOG.md`:

**En `package.json`:**

```json
{
  "name": "calculina",
  "version": "1.3.0"
}

```

**En `CHANGELOG.md`:**

```markdown
## [1.3.0]

### Añadido
* Botón para exportar cálculos a formato PDF.

```

### Paso 3: Subir los cambios y abrir la Pull Request

Realiza los commits y sube la rama a GitHub:

```bash
git add .
git commit -m "feat: añadir exportación a PDF y actualizar versión objetivo a 1.3.0"
git push origin feature/export-pdf

```

1. Ve a GitHub y abre una Pull Request desde **`feature/export-pdf`** hacia **`develop`**.
2. La suite de pruebas automáticas (`pr-validation.yml`) se ejecutará para validar que los tests pasan.
3. Una vez aprobada la PR, haz clic en **Merge pull request**.

### Paso 4: Despliegue automático en Staging

Al completar el merge en `develop`:

* GitHub eliminará automáticamente la rama origen `feature/export-pdf`.
* El workflow `develop-release.yml` se activará automáticamente y creará el tag de pruebas:
`v1.3.0-dev.20260808-170000`.

### Paso 5: Promoción a Producción (Release Oficial)

Cuando el equipo decide que los cambios en `develop` están listos para salir a producción:

1. Abre una Pull Request desde **`develop`** hacia **`main`**.
2. Revisa que el diff incluya todos los cambios consolidados.
3. Haz el **Merge** hacia `main`.
4. El workflow `main-release.yml` leerá el `package.json` y creará la release oficial **`v1.3.0`**.