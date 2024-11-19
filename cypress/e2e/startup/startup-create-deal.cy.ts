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
      window.localStorage.setItem("refreshToken", `${Cypress.env("refresh_startup")}`);
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

  it("Startup is able to create view", () => {
    cy.visit(`${Cypress.env("base_url")}/startup`);
    cy.wait(3000);
    cy.visit(`${Cypress.env("base_url")}/startup-form`);
    cy.get('[data-testid="name-input"]').should("be.visible");
    cy.get('[data-testid="name-input"]').type("TEST ADD");
    cy.wait(100);
    cy.get('[data-testid="description-input"]').should("be.visible");
    cy.get('[data-testid="description-input"]').type("TEST ADD");
    cy.wait(100);
    cy.get('[data-testid="allocation-input"]').should("be.visible");
    cy.get('[data-testid="allocation-input"]').type("1000000");
    cy.wait(100);
    cy.get('[data-testid="price-input"]').should("be.visible");
    cy.get('[data-testid="price-input"]').type("10000");
    cy.wait(100);
    cy.get('[data-testid="min-investment-input"]').should("be.visible");
    cy.get('[data-testid="min-investment-input"]').type("10000");
    cy.wait(100);
    cy.get('[data-testid="raised-input"]').should("be.visible");
    cy.get('[data-testid="raised-input"]').type("450000");
    cy.wait(100);
    cy.get('[data-testid="select-type"]').should("be.visible");
    cy.get('[data-testid="select-type"]').click();
    cy.wait(100);
    cy.get('[data-testid="select-value"]').should("be.visible");
    cy.get('[data-testid="select-value"]').click();
    cy.wait(100);
    cy.get('[data-testid="start-date-input"]').should("be.visible");
    cy.get('[data-testid="start-date-input"]').type("10022024");
    cy.wait(100);
    cy.get('[data-testid="end-date-input"]').should("be.visible");
    cy.get('[data-testid="end-date-input"]').type("12022024");
    cy.wait(100);
    cy.get('[data-testid="content-input"]').should("be.visible");
    cy.get('[data-testid="content-input"]').type("TEST ADD");
    cy.wait(100);
    cy.get('[data-testid="submit-button"]').should("be.visible");
    cy.get('[data-testid="submit-button"]').click();
    cy.wait(3000);
    cy.visit(`${Cypress.env("base_url")}/startup`);
  });
});
