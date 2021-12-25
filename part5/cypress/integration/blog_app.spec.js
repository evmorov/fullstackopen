describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'TestName',
      username: 'TestUsername',
      password: 'TestPassword',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3001')
  })

  it('Login form is shown', function () {
    expectLoginPage()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get(dataTest('username-input')).type('TestUsername')
      cy.get(dataTest('password-input')).type('TestPassword')
      cy.get(dataTest('login-button')).click()

      cy.get(dataTest('notification'))
        .should('contain', 'Successfully logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('TestName logged-in')
      cy.get(dataTest('login-button')).should('not.exist')
    })

    it('fails with wrong credentials', function () {
      cy.get(dataTest('username-input')).type('TestUsername')
      cy.get(dataTest('password-input')).type('WrongPassword')
      cy.get(dataTest('login-button')).click()

      cy.get(dataTest('notification'))
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      expectLoginPage()
    })
  })
})

const dataTest = (value) => `[data-test=${value}]`

const expectLoginPage = () => {
  cy.contains('Log in to application')
  cy.get(dataTest('login-button')).should('be.visible')
}
