export class InventoryPage {
  urlContains() { cy.url().should('include', '/inventory.html'); }
  add(productName) {
    cy.contains('.inventory_item', productName).find('button').click();
  }
  sortBy(value) { cy.get('[data-test="product_sort_container"]').select(value); }
  cartBadge() { return cy.get('.shopping_cart_badge'); }
  goToCart() { cy.get('.shopping_cart_link').click(); }
}