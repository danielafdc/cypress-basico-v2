
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Dani')
    cy.get('#lastName').type('Dani')
    cy.get('#email').type('dani@email.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
})