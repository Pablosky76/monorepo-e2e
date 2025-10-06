const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://todomvc.com/examples/react/dist/',
    viewportWidth: 1000,
    viewportHeight: 660,
    video: false,
  },
})