describe("template spec", () => {
  it("Create deal form", () => {
    cy.visit("http://localhost:3000/admin-management");
    cy.wait(3000);
    cy.get('[data-testid="deal-accordion"]').eq(0).should("be.visible");
    cy.get('[data-testid="deal-accordion"]').eq(0).click();
    cy.wait(1000);
  });
});
