import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

describe('Login con POM', () => {
  const login = new LoginPage();
  const inventory = new InventoryPage();

  it('Login correcto', () => {
    login.loginAs('standard_user', 'secret_sauce');
    inventory.urlContains();
  });

  it('Login bloqueado muestra error', () => {
    login.loginAs('locked_out_user', 'secret_sauce');
    cy.get('[data-test="error"]').should('contain', 'locked out');
  });
});