describe('Blog app', function () {
  beforeEach(function () {
    cy.resetServerData()
    cy.createUser({
      name: 'TestName',
      username: 'TestUsername',
      password: 'TestPassword',
    })
    cy.visitSite()
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
        .should('contain', 'invalid username or password')
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
      cy.get(dataTest('blog-url-input')).type('TestUrl')
      cy.get(dataTest('blog-create-button')).click()

      cy.get(dataTest('notification')).should('contain', 'A new blog TestTitle created')
      getBlogWithTitle('TestTitle').should('contain', 'TestAuthor')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'TestTitle',
          author: 'TestAuthor',
          url: 'TestUrl',
        })
      })

      it('can be liked', function () {
        const blog = getBlogWithTitle('TestTitle')
        blog.find(dataTest('toggle-button')).click()

        blog.get(dataTest('blog-likes')).should('have.text', 'Likes: 0')
        blog.get(dataTest('blog-like-button')).click()
        blog.get(dataTest('blog-likes')).should('have.text', 'Likes: 1')
        blog.get(dataTest('blog-like-button')).click()
        blog.get(dataTest('blog-likes')).should('have.text', 'Likes: 2')
      })

      it('can be removed', function () {
        getBlogWithTitle('TestTitle').find(dataTest('toggle-button')).click()
        getBlogWithTitle('TestTitle')
          .find(dataTest('blog-remove-button'))
          .click()
          .should('not.exist')
        cy.get(dataTest('blog-list')).contains('TestTitle').should('not.exist')
        cy.get(dataTest('notification')).should('contain', 'Blog TestTitle has been removed')
      })
    })

    describe('when a blog of another user exists', function () {
      beforeEach(function () {
        cy.createUser({
          name: 'AnotherName',
          username: 'AnotherUsername',
          password: 'AnotherPassword',
        })
        cy.createBlogForUser({
          username: 'AnotherUsername',
          password: 'AnotherPassword',
          title: 'AnotherTitle',
          author: 'AnotherAuthor',
          url: 'AnotherUrl',
        })
      })

      it("can't be removed", function () {
        getBlogWithTitle('AnotherTitle').find(dataTest('toggle-button')).click()
        getBlogWithTitle('AnotherTitle')
          .find(dataTest('blog-remove-button'))
          .click()
          .should('exist')
        cy.get(dataTest('blog-list')).contains('AnotherTitle').should('exist')
        cy.get(dataTest('notification')).should('contain', 'Forbidden')
      })
    })

    describe('there are many blogs', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'TestTitle2', author: 'TestAuthor2', likes: 2 })
        cy.createBlog({ title: 'TestTitle1', author: 'TestAuthor1', likes: 1 })
        cy.createBlog({ title: 'TestTitle3', author: 'TestAuthor3', likes: 3 })
      })

      it('blogs are ordered by likes', function () {
        cy.get(dataTest('blog')).then((blogs) => {
          const titles = blogs.map((_, blog) => blog.innerText.split(',')[0]).toArray()
          expect(titles).to.deep.eq(['TestTitle3', 'TestTitle2', 'TestTitle1'])
        })
      })
    })
  })
})

const dataTest = (value) => `[data-test=${value}]`

const expectLoginPage = () => {
  cy.contains('Log in to application')
  cy.get(dataTest('login-button')).should('be.visible')
}

const getBlogWithTitle = (title) => {
  const blogSelector = `${dataTest('blog')}:contains("${title}")`
  return cy.get(dataTest('blog-list')).find(blogSelector)
}
