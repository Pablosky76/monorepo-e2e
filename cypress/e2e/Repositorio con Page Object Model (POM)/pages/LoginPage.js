export class LoginPage {
  visit() { cy.visit('/'); }
  username() { return cy.get('[data-test="username"]'); }
  password() { return cy.get('[data-test="password"]'); }
  submit() { return cy.get('[data-test="login-button"]'); }
  loginAs(user, pass) {
    this.visit();
    this.username().type(user);
    this.password().type(pass);
    this.submit().click();
  }
}