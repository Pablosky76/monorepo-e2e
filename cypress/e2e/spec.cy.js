describe('Nginx demo', () => {
  it('Carga la página y contiene el texto de bienvenida', () => {
    cy.visit('/');
    cy.get('body').should('contain.text', 'Welcome to nginx');
  });
});
