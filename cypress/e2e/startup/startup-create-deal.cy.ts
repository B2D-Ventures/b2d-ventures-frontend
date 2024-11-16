describe("template spec", () => {
    it("Startup is able to create view", () => {
      cy.visit(`${Cypress.env("base_url")}/admin-dashboard`);
      cy.wait(3000);
      cy.wait(1000);
    });
  });