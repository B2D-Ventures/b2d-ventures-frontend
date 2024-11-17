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
    refresh_startup: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczMTkwMDY0NSwiaWF0IjoxNzMxODE0MjQ1LCJqdGkiOiI2ZmUwOTc4MWZiYTY0YTYyODQxMGQ1YzYzZTE5NzU1NCIsInVzZXJfaWQiOiI4ODZhMmJiYy02MzQzLTQxMmItYWQyYS02MGIyMDM3MWNhMDkifQ.IMufjpVWcb8i8pB-i1nURDkQ_Mj0inAl2ePXAY5vFh0',
    refresh_investor: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczMTkxNTY4OCwiaWF0IjoxNzMxODI5Mjg4LCJqdGkiOiIzNzc4ZjNjNWVjZmQ0MTc5OTg4ZTRmOGVhN2EyMWFmOSIsInVzZXJfaWQiOiI3NjJmNDE3My02ZjFmLTQ1ZjQtOTUxYS00MGIxMTMwMjRlM2UifQ.BBr-r-k332GasOMrm892wpZMPlwe8eZ5M-bYNwfOkyU',
  },
});
