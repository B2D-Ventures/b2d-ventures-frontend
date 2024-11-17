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

  it("Investor is able to schedule meeting", () => {
    cy.visit(`${Cypress.env("base_url")}/startup`);
    cy.wait(2000);
    cy.get('[data-testid="deal-card"]').eq(0).click();
    cy.wait(1000);
    cy.get('[data-testid="schedule-meeting-button"]').click();
    cy.wait(1000);
    cy.get('[data-testid="date-meeting"]').type("11292024");
    cy.wait(100);
    cy.get('[data-testid="start-time-meeting"]').type("0909");
    cy.wait(100);
    cy.get('[data-testid="end-time-meeting"]').type("1010");
    cy.wait(100);
    cy.get('[data-testid="title-meeting"]').type("test meeting");
    cy.wait(100);
    cy.get('[data-testid="description-meeting"]').type("test meeting");
    cy.wait(100);
    cy.get('[data-testid="confirm-button"]').click();
    cy.wait(100);
  });
});
