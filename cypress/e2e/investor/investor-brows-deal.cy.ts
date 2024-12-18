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

  it("Startup is able to view investment", () => {
    cy.visit(`${Cypress.env("base_url")}/startup`);
    cy.get('[data-testid="category-filter"]').click();

    // Wait for the dropdown items to be visible and stable
    cy.get('[data-testid="category-filter-item"]', { timeout: 10000 })
      .should("be.visible")
      .then(($el) => {
        // Ensure the element is stable before clicking
        cy.wrap($el).click({ force: true });
      });
  });
});
