describe("template spec", () => {
  it("Create deal form", () => {
    cy.visit("http://localhost:3000/startup-form");
    cy.get(".text-2xl");
    cy.wait(3000);

    cy.get('[data-testid="name-input"]').should("be.visible");
    cy.get('[data-testid="name-input"]').type("TEST ADD");
    cy.wait(100);
    cy.get('[data-testid="description-input"]').should("be.visible");
    cy.get('[data-testid="description-input"]').type("TEST ADD");
    cy.wait(100);
    cy.get('[data-testid="allocation-input"]').should("be.visible");
    cy.get('[data-testid="allocation-input"]').type("1000000");
    cy.wait(100);
    cy.get('[data-testid="price-input"]').should("be.visible");
    cy.get('[data-testid="price-input"]').type("10000");
    cy.wait(100);
    cy.get('[data-testid="min-investment-input"]').should("be.visible");
    cy.get('[data-testid="min-investment-input"]').type("10000");
    cy.wait(100);
    cy.get('[data-testid="raised-input"]').should("be.visible");
    cy.get('[data-testid="raised-input"]').type("450000");
    cy.wait(100);
    cy.get('[data-testid="select-type"]').should("be.visible");
    cy.get('[data-testid="select-type"]').click();
    cy.wait(100);
    cy.get('[data-testid="select-value"]').should("be.visible");
    cy.get('[data-testid="select-value"]').click();
    cy.wait(100);
    cy.get('[data-testid="start-date-input"]').should("be.visible");
    cy.get('[data-testid="start-date-input"]').type("10022024");
    cy.wait(100);
    cy.get('[data-testid="end-date-input"]').should("be.visible");
    cy.get('[data-testid="end-date-input"]').type("12022024");
    cy.wait(100);
    cy.get('[data-testid="logo-input"]').should("be.visible");
    cy.get('[data-testid="logo-input"]').selectFile(
      "public/images/fitbake.png"
    );
    cy.wait(100);
    cy.get('[data-testid="content-image-input"]').should("be.visible");
    cy.get('[data-testid="content-image-input"]').selectFile(
      "public/images/fitbake-content.jpg"
    );
    cy.wait(100);
    cy.get('[data-testid="deal-image-input"]').should("be.visible");
    cy.get('[data-testid="deal-image-input"]').selectFile(
      "public/images/fitbake-deal.jpg"
    );
    cy.wait(100);
    cy.get('[data-testid="private-data-input"]').should("be.visible");
    cy.get('[data-testid="private-data-input"]').selectFile(
      "public/images/Document.pdf"
    );
    cy.wait(100);
    cy.get('[data-testid="content-input"]').should("be.visible");
    cy.get('[data-testid="content-input"]').type("TEST ADD");
    cy.wait(100);
    cy.get('[data-testid="submit-button"]').should("be.visible");
    cy.get('[data-testid="submit-button"]').click();
    cy.wait(3000);
    
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="invest-page"]').should("be.visible");
    cy.wait(2000);
    cy.get('[data-testid="invest-page"]').click();
    cy.wait(2000);
  });
});
