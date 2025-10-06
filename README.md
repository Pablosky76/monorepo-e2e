# Cypress + Page Object Model (TodoMVC)

## Ejecutar
- `npm i`
- `npm run cy:open` o `npm run cy:run`

## Estructura
- `cypress/support/pages/TodoPage.js` → Page Object con selectores y acciones.
- `cypress/e2e/todo-pom.cy.js` → Casos de prueba que usan el Page Object.
- `cypress.config.js` → `baseUrl` al TodoMVC React.

## Casos
1. Crear
2. Completar
3. Desmarcar
4. Editar (doble click → `.edit`)
5. Borrar
6. Filtros (All / Active / Completed)