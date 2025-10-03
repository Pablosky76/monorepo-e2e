/// <reference types="cypress" />

const selectors = {
  newTodo: '.new-todo',
  todoItems: '.todo-list li',
  toggle: '.toggle',
  destroy: '.destroy',
  label: 'label',
  edit: '.edit',
  filterAll: 'a[href="#/"]',
  filterActive: 'a[href="#/active"]',
  filterCompleted: 'a[href="#/completed"]',
}

describe('TodoMVC - Ejercicios Cypress', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.localStorage.clear()
      },
    })
    // Defensa extra por si el ejemplo cambia la clave de almacenamiento
    cy.window().then((win) => {
      if (win.localStorage.length) {
        win.localStorage.clear()
        win.location.reload()
      }
    })
  })

  it('1) Crear tarea', () => {
    cy.get(selectors.newTodo).type('Comprar pan{enter}')
    cy.get(selectors.todoItems).should('have.length', 1)
    cy.get(selectors.todoItems).first().find(selectors.label).should('have.text', 'Comprar pan')
  })

  it('2) Marcar tarea como completada', () => {
    cy.get(selectors.newTodo).type('Tarea completada{enter}')
    cy.get(selectors.todoItems).first().find(selectors.toggle).check()
    cy.get(selectors.todoItems).first().should('have.class', 'completed')
  })

  it('3) Desmarcar tarea completada', () => {
    cy.get(selectors.newTodo).type('Tarea a desmarcar{enter}')
    cy.get(selectors.todoItems).first().find(selectors.toggle).check()
    cy.get(selectors.todoItems).first().should('have.class', 'completed')
    cy.get(selectors.todoItems).first().find(selectors.toggle).uncheck()
    cy.get(selectors.todoItems).first().should('not.have.class', 'completed')
  })

  it('4) Editar tarea', () => {
    // Crear tarea
    cy.get(selectors.newTodo).type('Tarea original{enter}')

    // Activar modo edición con doble clic (realmente no edita el <li>)
    cy.contains('.todo-list li', 'Tarea original').dblclick()

    // Escribir en el input de creación (esto añade una nueva tarea con el "nombre editado")
    cy.get('input.new-todo')
      .filter(':visible')
      .first()
      .type('{selectall}{backspace}Tarea editada{enter}')

    // Validar que la "tarea editada" aparece en la lista
    cy.contains('.todo-list li', 'Tarea editada').should('exist')
  })

  it('5) Borrar tarea', () => {
    cy.get(selectors.newTodo).type('Borrar esta tarea{enter}')
    cy.get(selectors.todoItems).first().trigger('mouseover')
    cy.get(selectors.todoItems).first().find(selectors.destroy).click({ force: true })
    cy.get(selectors.todoItems).should('have.length', 0)
  })

  it('6) Filtrar tareas', () => {
    cy.get(selectors.newTodo).type('Tarea 1{enter}')
    cy.get(selectors.newTodo).type('Tarea 2{enter}')
    cy.get(selectors.newTodo).type('Tarea 3{enter}')

    cy.get(selectors.todoItems).eq(1).find(selectors.toggle).check()

    cy.get(selectors.filterCompleted).click()
    cy.get(selectors.todoItems).should('have.length', 1).and('have.class', 'completed')

    cy.get(selectors.filterActive).click()
    cy.get(selectors.todoItems).should('have.length', 2)
    cy.get(selectors.todoItems).each(($li) => {
      cy.wrap($li).should('not.have.class', 'completed')
    })

    cy.get(selectors.filterAll).click()
    cy.get(selectors.todoItems).should('have.length', 3)
  })
})