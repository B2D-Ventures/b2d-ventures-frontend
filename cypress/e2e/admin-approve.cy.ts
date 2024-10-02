describe('Deal Table', () => {
    it('should click the checkbox of the 5th deal', () => {
      cy.visit('http://localhost:3000/admin-approve');
      cy.get('table tbody tr').should('have.length', 5);
      cy.get('table tbody tr').eq(4).find('[data-testid="checkbox"]').click();
      cy.get('table tbody tr').eq(4).find('[data-testid="checkbox"]').should('be.checked');
    });
  });