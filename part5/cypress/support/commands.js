const SITE_URL = 'http://localhost:3001'

Cypress.Commands.add('resetServer', () => {
  cy.request('POST', `${SITE_URL}/api/testing/reset`)
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
  const user = { name, username, password }
  cy.request('POST', `${SITE_URL}/api/users/`, user)
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${SITE_URL}/api/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit(SITE_URL)
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: `${SITE_URL}/api/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`,
    },
  })
  cy.visit(SITE_URL)
})
