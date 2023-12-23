describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(() => {
    cy.visit('./src/index.html')
})
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  //esse only é pra executar só esse teste
  //O # significa que estou pegando o id do elemento
  //it.only
  it('preenche os campos obrigatórios e envia o formuário', () => {
    cy.get('#firstName').type('Dani')
    cy.get('#lastName').type('Dani')
    cy.get('#email').type('dani@email.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()//pega um botão que tem o type submit e clica
    //cy.contains('button', 'Enviar').click() outra maneira de fazer o que está na linha de cima

    cy.get('.success').should('be.visible')
  })

  //congelar o relógio do navegador, para por exemplo, ao invés de ficar esperando 3s para desaparecer a imagem.
//eu só validar e seguir. Então adicionei o clock nesse teste
//é requisito a mensagem de sucesso desaparecer. Por isso agora valido isso, mas com o tick eu perco menos tempo com isso.
  //esse delay é pq eu tive que digitar um texto longo. Isso gera um tempo maior na execução.
  //Porém, como a automação tem que ser o mais rápida possível, eu mudo o tempo de digitação desse texto pra 0.
  it.only('preenche os campos obrigatórios e envia o formuário', () => {
    const longText = 'Teste, teste, teste, teste, Teste, teste, teste, teste, Teste, teste, teste, teste, Teste, teste, teste, teste, Teste, teste, teste, teste, Teste, teste, teste, teste '
    cy.clock()
    cy.get('#firstName').type('Dani')
    cy.get('#lastName').type('Dani')
    cy.get('#email').type('dani@email.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formato inválida', () => {
    cy.get('#firstName').type('Dani')
    cy.get('#lastName').type('Dani')
    cy.get('#email').type('dani@email,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone')
      .type('abcdjfjf')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {
    cy.get('#firstName').type('Dani')
    cy.get('#lastName').type('Dani')
    cy.get('#email').type('dani@email.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa o campo nome', () => {
    cy.get('#firstName').type('Dani').should('have.value', 'Dani').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
})

it('envia o formuário com sucesso usando um comando customizado', () => {
  cy.fillMandatoryFieldsAndSubmit()
  cy.get('.success').should('be.visible')
})

it('seleciona um produto (YouTube) por seu texto', () => {
  cy.get('#product').select('YouTube').should('have.value', 'youtube')
})

it('seleciona um produto (Mentoria) por seu valor (value)', () => {
  cy.get('#product').select('mentoria').should('have.value', 'mentoria')
})

it('seleciona um produto (Blog) por seu índice', () => {
  cy.get('#product').select(1).should('have.value', 'blog')
})

it('marca o tipo de atendimento "Feedback"', () => {
  cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
})
 
it('marca cada tipo de atendimento', () => {
  cy.get('input[type="radio"]').should('have.length', 3).each(function($radio) {
    cy.wrap($radio).check()
    cy.wrap($radio).should('be.checked')
  })
})

it('marca ambos checkboxes, depois desmarca o último', () => {
  cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
})

it('seleciona um arquivo da pasta fixtures', () => {
  cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json')
  .should(function($input) {
    expect($input[0].files[0].name).to.equal('example.json')
  })
})

it('seleciona um arquivo simulando um drag-and-drop', () => {
  cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
  .should(function($input) {
    expect($input[0].files[0].name).to.equal('example.json')
  })
})

it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
  cy.fixture('example.json').as('arquivoExemplo')
  cy.get('input[type="file"]')
  .selectFile('@arquivoExemplo')
  .should(function($input) {
    expect($input[0].files[0].name).to.equal('example.json')
  })
})

it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  cy.get('#privacy a').should('have.attr', 'target', '_blank')//privacy a... elemento a dentro do elemento que contém id privacy
})

it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  cy.get('#privacy a').invoke('removeAttr', 'target').click()
  cy.contains('Talking About Testing').should('be.visible')
})

//Com o comando .invoke('show'), você pode forçar a exibição de um elemento HTML que esteja escondido, com um estilo display: none;
it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})

//aquele exemplo onde eu mando um texto longo "texto, texto, texto......" há uma maneira mais inteligente de fazer isso
it.only('preenche a area de texto usando o comando invoke', () => {
  const longText = Cypress._.repeat('0123456789', 20)
  cy.get('#open-text-area').invoke('val', longText).should('have.value', longText)
})
})
