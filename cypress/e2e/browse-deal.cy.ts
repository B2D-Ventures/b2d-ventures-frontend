describe('template spec', () => {
    it('Create deal fomr', () => {
      cy.visit('http://localhost:3000')
      cy.get('[data-testid="invest-page"]').should('be.visible')
      cy.wait(2000)
      cy.get('[data-testid="invest-page"]').click()
      cy.get('[data-testid="deal-card"]').should('have.length', 5);
      cy.wait(2000)
      cy.get('[data-testid="deal-card"]').first().click();
      cy.get('[data-testid="fund"]').should('be.visible')
      cy.get('[data-testid="fund"]').click()
      cy.get('[data-testid="checkbox"]').should('be.visible')
      cy.get('[data-testid="checkbox"]').click()
      cy.get('[data-testid="next"]').should('be.visible')
      cy.get('[data-testid="next"]').click()
      cy.get('[data-testid="accept"]').should('be.visible')
      cy.get('[data-testid="accept"]').click()
    })
  })