describe('Inventario', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });

  it('Carga 6 productos', () => {
    cy.get('.inventory_item').should('have.length', 6);
  });

  it('Permite ordenar por precio (low to high)', () => {
    cy.get('[data-test="product_sort_container"]').select('lohi');
    cy.get('.inventory_item_price').then($els => {
      const prices = [...$els].map(e => parseFloat(e.innerText.replace('$','')));
      const sorted = [...prices].sort((a,b)=>a-b);
      expect(prices).to.deep.equal(sorted);
    });
  });
});