const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const TodoPage = require('../../support/pages/TodoPage');

Given('que visito la app de TodoMVC', () => { TodoPage.visit(); });
When('creo la tarea {string}', (t) => { TodoPage.add(t); });
Then('debería ver {int} tarea en la lista', (n) => { TodoPage.shouldHaveCount(n); });
Then('debería ver la tarea {string}', (t) => { TodoPage.shouldContain(t); });