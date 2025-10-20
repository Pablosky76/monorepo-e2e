describe('Carrito', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });

  it('Añade y quita un producto del carrito', () => {
    cy.contains('.inventory_item', 'Sauce Labs Backpack')
      .find('button').click();
    cy.get('.shopping_cart_badge').should('contain', '1');

    cy.get('.shopping_cart_link').click();
    cy.contains('.cart_item', 'Sauce Labs Backpack')
      .find('button').click();
    cy.get('.cart_item').should('have.length', 0);
  });
});