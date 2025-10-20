// cypress.config.js
const { defineConfig } = require('cypress');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    // Soporta features de Cucumber y specs clásicos de Cypress
    specPattern: 'cypress/e2e/**/*.{feature,cy.js,cy.ts}',
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://todomvc.com/examples/react/dist/',
    viewportWidth: 1200,
    viewportHeight: 800,
    video: false,
    setupNodeEvents: async (on, config) => {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
      return config;
    },
  },
});