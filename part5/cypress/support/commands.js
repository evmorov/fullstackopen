Cypress.Commands.add('resetServer', () => {
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
  const user = { name, username, password }
  cy.request('POST', 'http://localhost:3001/api/users/', user)
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3001')
  })
})
