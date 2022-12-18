const getSelector = (label, ...childSelectors) => {
  const base = `[data-cy="${label}"]`

  if (childSelectors.length !== 0) {
    return `${base} ${childSelectors.join(' ')}`
  }

  return base;
}

describe('Movements List', () => {
  it('shows a list of movements', () => {
    cy.intercept('GET', '/api/movements').as('movements')
    cy.visit('http://localhost:3001')
    cy.wait('@movements')
    cy.get(getSelector('movement-item'))
    .should('have.a.property', 'length')
    cy.get(getSelector('movements-list'))
      .should('exist')
  })
  it('has a button to add more movements, and when clicked, goes to add movements pages', () => {
    cy.intercept('GET', '/api/movements').as('movements')
    cy.visit('http://localhost:3001')
    cy.wait('@movements')
    cy.get(getSelector('home-page', 'button'))
      .click()
    cy.location('pathname').should('eq', '/movements/add')
  })
})