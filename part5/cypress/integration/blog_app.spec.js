describe('Blog app', function () {
  beforeEach(function () {
    cy.resetServer()
    cy.createUser({
      name: 'TestName',
      username: 'TestUsername',
      password: 'TestPassword',
    })
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'TestUsername', password: 'TestPassword' })
    })

    it('A blog can be created', function () {
      cy.contains('New blog').click()

      cy.get(dataTest('blog-title-input')).type('TestTitle')
      cy.get(dataTest('blog-author-input')).type('TestAuthor')
      cy.get(dataTest('blog-url-input')).type('TestURL')
      cy.get(dataTest('blog-create-button')).click()

      cy.get(dataTest('notification')).should('contain', 'A new blog TestTitle created')
      cy.get(dataTest('blog-list')).should('contain', 'TestTitle, TestAuthor')
    })
  })
})

const dataTest = (value) => `[data-test=${value}]`

const expectLoginPage = () => {
  cy.contains('Log in to application')
  cy.get(dataTest('login-button')).should('be.visible')
}
