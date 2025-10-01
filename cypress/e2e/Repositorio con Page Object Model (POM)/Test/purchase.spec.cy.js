import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

describe('Flujo con carrito (POM)', () => {
  const login = new LoginPage();
  const inventory = new InventoryPage();
  const cart = new CartPage();

  beforeEach(() => {
    login.loginAs('standard_user', 'secret_sauce');
    inventory.urlContains();
  });

  it('Añadir y quitar producto', () => {
    inventory.add('Sauce Labs Backpack');
    inventory.cartBadge().should('contain', '1');
    inventory.goToCart();
    cart.remove('Sauce Labs Backpack');
    cart.items().should('have.length', 0);
  });
});