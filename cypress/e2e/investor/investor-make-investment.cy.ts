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
      win.localStorage.setItem(
        "refreshToken",
        `${Cypress.env("refresh_investor")}`
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
                    "refresh-token": `${Cypress.env("refresh_investor")}`,
                  },
                },
              },
            }).then((tokenResponse) => {
              const accessToken = tokenResponse.body.data.access;
              win.localStorage.setItem("accessToken", accessToken);
            });
          });
        }
      }
    );
  });

  it("Invest", () => {
    cy.visit(`${Cypress.env("base_url")}/startup`);
    cy.wait(2000);
    cy.get('[data-testid="deal-card"]').eq(0).click();
    cy.get('[data-testid="fund-button"]').click();
    cy.get('[data-testid="checkbox"]').should("be.visible");
    cy.get('[data-testid="checkbox"]').click();
    cy.get('[data-testid="next"]').should("be.visible");
    cy.get('[data-testid="next"]').click();
    cy.get('[data-testid="accept"]').should("be.visible");
    cy.get('[data-testid="accept"]').click();
    cy.wait(2000);
    cy.visit(`${Cypress.env("base_url")}/startup`);
    cy.get('[data-testid="deal-card"]').eq(0).click();
  });
});
