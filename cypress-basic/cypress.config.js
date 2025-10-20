const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://todomvc.com/examples/react/dist/#/", // o la URL que toque en tu repo
    viewportWidth: 1280,
    viewportHeight: 800,
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,
  },
});