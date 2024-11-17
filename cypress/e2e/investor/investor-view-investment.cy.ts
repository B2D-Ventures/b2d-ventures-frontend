interface UserAttributes {
    id: string;
    username: string;
    refresh_token: string;
  }
  
  interface User {
    attributes: UserAttributes;
  }
  
  describe("template spec", () => {
    before(() => {
      const userName = "Krittin SETDHAVANICH";
      cy.window().then((win) => {
        win.localStorage.setItem("userName", userName);
        win.localStorage.setItem("userRole", "investor");
        win.localStorage.setItem("refreshToken", `${Cypress.env("refresh_investor")}`);
      });
  
      cy.request("GET", `${Cypress.env("endpoint")}/api/admin/users`).then((response) => {
        const users: User[] = response.body.data;
        const user = users.find((user: User) => user.attributes.username === userName);
        if (user) {
          cy.window().then((win) => {
            win.localStorage.setItem("userId", user.attributes.id);
            // Send request to get new accessToken
            cy.request({
              method: "POST",
              url: `${Cypress.env("endpoint")}/api/auths/refresh-token/`,
              body: {
                data: {
                  attributes: {
                    "refresh-token": `${Cypress.env("refresh_investor")}`,
                  },
                },
              },
            }).then((tokenResponse) => {
              const accessToken = tokenResponse.body.data.access;
              win.localStorage.setItem("accessToken", accessToken);
              expect(win.localStorage.getItem("accessToken")).to.be.a("string");
            });
          });
        }
      });
    });
  
    it("Investor is able to view investment", () => {
      cy.visit(`${Cypress.env("base_url")}/investor-dashboard`);
  
      // Wait for the accordion items to be visible
      cy.get('[data-testid="investor-accordion"]', { timeout: 10000 }).should("be.visible");
  
      // Click the first accordion item
      cy.get('[data-testid="investor-accordion"]').first().click({ force: true });
    });
  });