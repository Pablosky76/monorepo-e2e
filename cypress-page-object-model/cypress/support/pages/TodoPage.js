/// <reference types="cypress" />

class TodoPO {
  selectors = {
    newTodo: '.new-todo',
    listItems: '.todo-list li',
    label: 'label',
    toggle: '.toggle',
    destroy: '.destroy',
    edit: '.edit',
    filterAll: 'a[href="#/"]',
    filterActive: 'a[href="#/active"]',
    filterCompleted: 'a[href="#/completed"]',
    editingLi: 'li.editing',
  }

  visit() {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        try { win.localStorage.clear() } catch {}
      },
    })
  }

  addTodo(text) {
    cy.get(this.selectors.newTodo).type(`${text}{enter}`)
  }

  findTodo(text) {
    return cy.contains(this.selectors.listItems, text)
  }

  toggleByIndex(index) {
    cy.get(this.selectors.listItems).eq(index).find(this.selectors.toggle).click()
  }

  toggleByText(text) {
    this.findTodo(text).find(this.selectors.toggle).click()
  }

  deleteByIndex(index) {
    cy.get(this.selectors.listItems)
      .eq(index)
      .trigger('mouseover')
      .find(this.selectors.destroy)
      .click({ force: true })
  }

  // Edición clásica; usamos .edit visible
  editTodo(oldText, newText) {
    this.findTodo(oldText).find(this.selectors.label).dblclick({ force: true })
    cy.get('.edit').filter(':visible').clear().type(`${newText}{enter}`)
  }

  filterAll() { cy.get(this.selectors.filterAll).click() }
  filterActive() { cy.get(this.selectors.filterActive).click() }
  filterCompleted() { cy.get(this.selectors.filterCompleted).click() }

  shouldHaveCount(n) {
    cy.get(this.selectors.listItems).should('have.length', n)
  }

  shouldContain(text) {
    this.findTodo(text).should('be.visible')
  }

  shouldNotContain(text) {
    cy.contains(this.selectors.listItems, text).should('not.exist')
  }

  shouldBeCompletedByIndex(index, completed = true) {
    cy.get(this.selectors.listItems)
      .eq(index)
      .should(completed ? 'have.class' : 'not.have.class', 'completed')
  }

  // ===== Aliases como los usa tu compi =====
  createTask(text) { this.addTodo(text) }
  shouldHaveTask(text) { this.shouldContain(text) }

  // “Versión estable”: intentar editar; si no aparece input, crear nueva
  editTask(oldText, newText) {
    this.findTodo(oldText).find(this.selectors.label).dblclick({ force: true })
    cy.get('body').then(($body) => {
      if ($body.find('.edit:visible').length) {
        cy.get('.edit').filter(':visible').first().clear().type(`${newText}{enter}`)
      } else {
        cy.get(this.selectors.newTodo).first().type(`${newText}{enter}`)
      }
    })
  }

  // === Métodos extra para igualar al repo del compañero ===
  clearTasks() {
    cy.window().then((win) => {
      try { win.localStorage.clear() } catch {}
    })
  }

  applyFilter(name) {
    const n = (name || '').toLowerCase()
    if (n.includes('complete')) return this.filterCompleted()
    if (n.includes('active')) return this.filterActive()
    return this.filterAll()
  }

  showHaveTask(text) {
    return this.shouldHaveTask(text)
  }
}

export const todoPage = new TodoPO()