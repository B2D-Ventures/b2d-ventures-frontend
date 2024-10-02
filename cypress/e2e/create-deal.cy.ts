describe('template spec', () => {
  it('Create deal fomr', () => {
    cy.visit('http://localhost:3000/startup-form')
    cy.get('.text-2xl')
    cy.get(':nth-child(2) > .px-\[102px\]')
    // cy.get('.w-\[1236px\]')
    // cy.contains('Create Deal')
    // cy.contains('Enter startup name')
  })
})