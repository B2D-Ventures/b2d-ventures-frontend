describe("edit deal", () => {
  it("startup can create deal", () => {
    cy.visit("http://localhost:3000/startup", {
      onBeforeLoad: function (window) {
        window.localStorage.setItem("userName", "Yanatchara JERAJA");
        window.localStorage.setItem(
          "userId",
          "7e737e1f-38ed-4285-8657-1ab3f41b2096"
        );
        window.localStorage.setItem("userRole", "startup");
      },
    });
    cy.wait(3000);
    cy.get(".grid.grid-cols-3 > div").eq(5).click();
    cy.get("[data-testid=edit-deal-button]").click();
    cy.get('[data-testid="content-input"]').type("TEST EDIT CONTENT");
    cy.get('[data-testid="submit-button"]').click();
    cy.visit("http://localhost:3000/startup");
    cy.get(".grid.grid-cols-3 > div").eq(5).click();
  });
});
