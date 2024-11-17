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
      const userName = "Yanatchara JERAJA";
      cy.window().then((win) => {
        win.localStorage.setItem("userName", userName);
        win.localStorage.setItem("userRole", "startup");
        expect(win.localStorage.getItem("userRole")).to.equal("startup");
        window.localStorage.setItem(
          "refreshToken",
          `${Cypress.env("refresh_startup")}`
        );
      });
  
      cy.request("GET", `${Cypress.env("endpoint")}/api/admin/users`).then(
        (response) => {
          const users: User[] = response.body.data;
          const user = users.find(
            (user: User) => user.attributes.username === userName
          );
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
                      "refresh-token": `${Cypress.env("refresh_startup")}`,
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
        }
      );
    });
  
    it("Startup is able to view investment", () => {
      cy.visit(`${Cypress.env("base_url")}/startup-dashboard`);
  
      cy.get('[data-testid="startup-accordian"]').should("be.visible");
      cy.get('[data-testid="startup-accordian"]').first().click({ force: true });
    });
  });
  