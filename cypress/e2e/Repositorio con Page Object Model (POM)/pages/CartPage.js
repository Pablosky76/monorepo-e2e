export class CartPage {
  remove(productName) {
    cy.contains('.cart_item', productName).find('button').click();
  }
  items() { return cy.get('.cart_item'); }
}