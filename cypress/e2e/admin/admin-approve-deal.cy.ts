describe('Deal Table', () => {
    it('Approve the first deal that the status is pending.', () => {
      cy.visit(`${Cypress.env("base_url")}/admin-approve`);
      cy.wait(5000);
      cy.get('[data-testid="approve-section"]').eq(0).find('[data-testid="approve-deal-button"]').click();
      cy.wait(6000);
      cy.get('[data-testid="approve-section"]').eq(0).find('[data-testid="reject-deal-button"]').click();
      cy.wait(6000);
    });
  });