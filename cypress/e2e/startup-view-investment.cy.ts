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
      cy.get("[data-testid=profile]").click();
      cy.get("[data-testid=deal-accordion]").eq(1).click();
      cy.wait(3000);
    });
  });