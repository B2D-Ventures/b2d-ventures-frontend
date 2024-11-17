describe("template spec", () => {
    it("Admin view dashboard", () => {
      cy.visit(`${Cypress.env("base_url")}/admin-dashboard`);
      cy.wait(3000);
      cy.get('[data-testid="general-inform"]').should("be.visible");
      cy.get('[data-testid="Stock Percentage"]').should("be.visible");
      cy.get('[data-testid="Recent Investments"]').should("be.visible");
      cy.get('[data-testid="Top Performers"]').should("be.visible");
      cy.get('[data-testid="Investment Today"]').should("be.visible");
      cy.wait(1000);
    });
  });