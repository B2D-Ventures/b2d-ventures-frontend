describe("template spec", () => {
    cy.visit("http://localhost:3000/admin-management");
    cy.get(".text-2xl");
    cy.wait(3000);
});