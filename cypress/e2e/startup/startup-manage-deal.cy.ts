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

  it("Startup is able to manage deal", () => {
    cy.visit(`${Cypress.env("base_url")}/startup`);
    cy.get('[data-testid="deal-card"]').eq(0).click();
    cy.wait(3000);

    cy.get('[data-testid="edit-deal-button"]').should("be.visible");
    cy.get('[data-testid="edit-deal-button"]').click();

    cy.get('[data-testid="name-input"]').should("be.visible");
    cy.get('[data-testid="name-input"]').type("Test change name");
    cy.wait(1000);
    cy.get('[data-testid="content-input"]').should("be.visible");
    cy.get('[data-testid="content-input"]').clear();
    cy.get('[data-testid="content-input"]').type("test change content");
    cy.wait(100);
    cy.get('[data-testid="submit-button"]').should("be.visible");
    cy.get('[data-testid="submit-button"]').click();
    cy.wait(3000);

    cy.visit(`${Cypress.env("base_url")}/startup`);
    cy.get('[data-testid="deal-card"]').eq(0).click();
  });
});
