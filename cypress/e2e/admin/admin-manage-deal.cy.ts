describe("template spec", () => {
    it("Admin manage deal", () => {
      cy.visit(`${Cypress.env("base_url")}/admin-management`);
      cy.wait(3000);
      cy.get('[data-testid="accordian-deal"]').should("be.visible");
      cy.get('[data-testid="accordian-deal"]').find('[data-testid="deal-item"]').eq(0).click();
      cy.wait(1000);
    });
  });