describe("edit deal", () => {
    it("startup can create deal", () => {
      cy.visit("http://localhost:3000/startup", {
        onBeforeLoad: function (window) {
          window.localStorage.setItem("userName", "Krittin Setdhavanich");
          window.localStorage.setItem(
            "userId",
            "1d8b57f3-7908-44db-95ba-c0d372f97d63"
          );
          window.localStorage.setItem("userRole", "investor");
        },
      });
      cy.wait(3000);
      cy.get('[data-testid="deal-card"]').eq(1).click();
      cy.get('[data-testid="private-data"]').click();
    });
  });
  