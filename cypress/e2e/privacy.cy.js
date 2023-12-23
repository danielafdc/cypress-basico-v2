//esse _ é o lodash.isso faz com o que o mesmo teste seja repedido diversas vezes
Cypress._.times(3, function() {

it.only('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
  })
})