import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1440,
  viewportHeight: 1024,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
  },
  env: {
    base_url: 'http://localhost:3000',
    endpoint: 'http://127.0.0.1:8000',
    refresh_startup: process.env.NEXT_PUBLIC_STARTUP_REFRESH_TOKEN,
    refresh_investor: process.env.NEXT_PUBLIC_INVESTOR_REFRESH_TOKEN,
  },
});
