# Pokedex Microfrontends

Challenge técnico Frontend Senior desarrollado con React, TypeScript, Vite y Module Federation. La solución se divide en un Shell y dos microfrontends: Pokemon Detail y Pokemon History.

## Arquitectura

- **Shell — <http://localhost:3000>**: login y sesión, Home, buscador fullscreen, routing, tema, toast global y composición de los microfrontends.
- **Pokemon Detail — <http://localhost:3001>**: detalle del Pokemon, consulta a PokeAPI y registro de visitas.
- **Pokemon History — <http://localhost:3002>**: historial de visitas y navegación al detalle.

El paquete de workspace `@pokedex/history` contiene el dominio, los casos de uso y la persistencia compartida del historial.

El login es local y simulado para efectos del challenge; no requiere un backend de autenticación.

## Stack

- React
- TypeScript
- Vite
- Module Federation
- TanStack Query
- Zustand
- CSS Modules
- Vitest

## Requisitos

- Node.js 22.14.0, versión definida en `.nvmrc`
- npm

## Instalación

Desde la raíz del repositorio:

```bash
npm install
```

## Desarrollo

Para levantar las tres aplicaciones:

```bash
npm run dev
```

También pueden iniciarse por separado:

```bash
npm run dev --workspace @pokedex/shell
npm run dev --workspace @pokedex/pokemon-detail
npm run dev --workspace @pokedex/pokemon-history
```

## Validaciones

```bash
npm test
npm run check
```

`npm run check` ejecuta typecheck, lint y build en los workspaces.

## Decisiones técnicas

1. Se utiliza Clean Architecture de forma pragmática, separando Domain, Application, Infrastructure y Presentation.
2. Los casos de uso dependen de contratos de Domain; PokeAPI y `localStorage` son detalles de Infrastructure.
3. El Shell controla el routing y la composición. Cada remote conserva la responsabilidad de su funcionalidad y recibe callbacks para navegar sin conocer las rutas del Shell.
4. TanStack Query gestiona el estado de servidor; Zustand se limita al estado cliente, como sesión y tema.
5. El historial mantiene una entrada por Pokemon, incrementa sus visitas y actualiza `lastVisitedAt` en cada acceso.
6. Cada visita genera un `visitId`; `dismissedVisitId` evita repetir el mismo toast y permite mostrarlo de nuevo ante una visita posterior.
7. El buscador carga páginas de 30 Pokemon mediante `IntersectionObserver` y ejecuta búsquedas exactas solo al enviar el formulario.

## Historial

El historial se persiste en `localStorage`, conserva una única entrada por Pokemon y ordena el listado por la visita más reciente. Cada visita incrementa el contador, actualiza `lastVisitedAt` y genera un `visitId` que permite identificar y controlar la notificación del último Pokemon visitado.

## Tests

Existen tests enfocados en las reglas de búsqueda, los límites de Home y Search, los mappers relevantes, la gestión del historial y el comportamiento del último Pokemon visitado.

## Build de producción

```bash
npm run build
```