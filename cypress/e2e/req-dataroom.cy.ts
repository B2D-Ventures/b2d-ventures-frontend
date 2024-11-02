describe('template spec', () => {
    it('Create deal fomr', () => {
      cy.visit('http://localhost:3000')
      cy.get('[data-testid="invest-page"]').should('be.visible')
      cy.wait(2000)
      cy.get('[data-testid="invest-page"]').click()
      cy.get('[data-testid="deal-card"]').should('have.length', 5);
      cy.wait(2000)
      cy.get('[data-testid="deal-card"]').eq(1).click();
      cy.wait(2000)
      cy.get('[data-testid="request-button"').should('be.visible')
      cy.get('[data-testid="request-button"]').click()
    })
  })