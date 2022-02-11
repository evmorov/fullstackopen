const SITE_URL = 'http://localhost:3004'

Cypress.Commands.add('visitSite', () => {
  cy.visit(SITE_URL)
})

Cypress.Commands.add('resetServerData', () => {
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
    localStorage.setItem('currentUser', JSON.stringify(body))
    cy.reload()
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: `${SITE_URL}/api/blogs`,
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`,
    },
  })
  cy.reload()
})

Cypress.Commands.add('createBlogForUser', ({ username, password, title, author, url }) => {
  cy.request('POST', `${SITE_URL}/api/login`, {
    username,
    password,
  }).then(({ body }) => {
    cy.request({
      url: `${SITE_URL}/api/blogs`,
      method: 'POST',
      body: { title, author, url },
      headers: {
        Authorization: `bearer ${body.token}`,
      },
    })
    cy.reload()
  })
})
