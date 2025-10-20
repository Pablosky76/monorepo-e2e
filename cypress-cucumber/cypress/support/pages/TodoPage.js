// cypress/support/pages/TodoPage.js
class TodoPage {
  constructor() {
    this.selectors = {
      newTodo: '.new-todo',
      items: 'ul.todo-list li',
      toggle: '.toggle',
      destroy: '.destroy',
      counter: '.todo-count',
    };
  }

  visit() {
    cy.visit('/', {
      onBeforeLoad: (win) => win.localStorage.clear(), // evita estados previos
    });
    cy.get(this.selectors.newTodo).should('be.visible');
  }

  add(text) {
    cy.get(this.selectors.newTodo).type(`${text}{enter}`);
  }

  // Devuelve el <li> que contiene el texto (úsalo cuando sabes que existe)
  row(text) {
    return cy.contains(this.selectors.items, text);
  }

  toggle(text) {
    this.row(text).find(this.selectors.toggle).click({ force: true });
  }

  edit(oldText, newText) {
    this.row(oldText).find('label').dblclick();
    this.row(oldText).find('input.edit').clear().type(`${newText}{enter}`);
  }

  delete(text) {
    this.row(text).trigger('mouseover').find(this.selectors.destroy).click({ force: true });
  }

  // --------- Asserts 100% seguros (sin usar cy.find que revienta si no hay <ul>) ---------
  shouldHaveCount(n) {
    cy.get('body').then(($body) => {
      const count = $body.find('ul.todo-list li').length; // jQuery puro
      expect(count, 'nº de <li>').to.eq(n);
    });
  }

  shouldContain(text) {
    cy.get('body').then(($body) => {
      const matches = $body.find(`ul.todo-list li:contains("${text}")`).length;
      expect(matches, `debe existir "${text}"`).to.be.greaterThan(0);
    });
  }

  shouldNotContain(text) {
    cy.get('body').then(($body) => {
      const matches = $body.find(`ul.todo-list li:contains("${text}")`).length;
      expect(matches, `no debe existir "${text}"`).to.eq(0);
    });
  }

  shouldBeCompleted(text) {
    this.row(text).should('have.class', 'completed');
  }

  counterShouldBe(text) {
    cy.get(this.selectors.counter).should('contain', text);
  }

  // Filtros resilientes: si no hay enlaces en el footer, cambia el hash directamente
  filter(name) {
    const key = (name || '').toLowerCase();
    const map = { all: '#/', active: '#/active', completed: '#/completed' };
    const resolved =
      key.startsWith('all') ? 'all' :
      key.startsWith('act') ? 'active' :
      key.startsWith('comp') ? 'completed' : 'all';
    const targetHash = map[resolved];

    cy.get('body').then(($b) => {
      const hasFooterLinks = $b.find('footer a').length > 0;
      if (hasFooterLinks) {
        const linkText = resolved === 'all' ? 'All' : resolved === 'active' ? 'Active' : 'Completed';
        cy.contains('a', new RegExp(`^${linkText}$`)).click();
      } else {
        cy.window().then((win) => { win.location.hash = targetHash; });
      }
    });

    cy.location('hash').should('eq', targetHash); // '#/', '#/active', '#/completed'
  }
}

module.exports = new TodoPage();