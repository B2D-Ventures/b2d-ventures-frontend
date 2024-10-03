describe('Deal Table', () => {
    it('Approve the 2nd deal, Reject the 5th deal', () => {
      cy.visit('http://localhost:3000/admin-approve');
      cy.wait(6000);
      cy.get('table tbody tr').eq(1).find('[data-testid="approve-checkbox"]').click();
      cy.wait(5000);
      cy.visit('http://localhost:3000/admin-approve');
      cy.visit('http://localhost:3000/admin-approve');
      cy.wait(6000);
      cy.get('table tbody tr').eq(4).find('[data-testid="reject-checkbox"]').click();
      cy.wait(5000);
      cy.visit('http://localhost:3000/admin-approve');
    });
  });