const APP_URL = 'http://localhost:3001'

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${APP_URL}/api/testing/reset`)
    cy.visit(APP_URL)
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('[data-test=login-button]').should('be.visible')
  })
})
