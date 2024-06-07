describe('blog', () => {
  before(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Pupi',
      username: 'pupita',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('landing page', () => {
    cy.contains('blogs')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('show login').click()
      cy.get('input:first').type('pupita')
      cy.get('input:last').type('password')
      cy.get('#login-button').click()
      cy.contains('logged')
    })

    it('fails with wrong credentials', function () {
      cy.contains('show login').click()
      cy.get('input:first').type('pupita')
      cy.get('input:last').type('passwor')
      cy.get('#login-button').click()
      cy.contains('wrong')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('show login').click()
      cy.get('input:first').type('pupita')
      cy.get('input:last').type('password')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('create new post').click()
      cy.get('[data-testid="input-title"]').type("cypress title")
      cy.get('[data-testid="input-author"]').type("pupita")
      cy.get('[data-testid="input-url"]').type("cypress.com")
      cy.get('[data-testid="button-submit"]').click()
      cy.contains('added')
      cy.get('[data-testid="blog-title"]').contains('cypress title')
    })

    it('User can like a blog', function () {

      cy.contains('View').click()
      cy.get('[data-testid="button-like"]').click()
    })

    it("User can delete blog", function () {
      cy.contains('View').click()
      cy.get('[data-testid="blog-remove"]').click()
      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(true);
      });
      cy.contains('Remove').click()
      cy.contains('deleted')
    })

    it('create another blog', function () {
      cy.contains('create new post').click()
      cy.get('[data-testid="input-title"]').type("re cypress blog")
      cy.get('[data-testid="input-author"]').type("pupita again")
      cy.get('[data-testid="input-url"]').type("cypress.com")
      cy.get('[data-testid="button-submit"]').click()
      cy.contains('added')
      cy.get('[data-testid="blog-title"]').contains('cypress')
    })
  })

  describe('For other user', function () {
    beforeEach(function () {
      const user1 = {
        name: 'Nati',
        username: 'natalia',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user1)

      cy.contains('show login').click()
      cy.get('input:first').type('natalia')
      cy.get('input:last').type('password')
      cy.get('#login-button').click()
    })

    it('only the creator can see the delete button', function () {
      cy.contains('View').click()
      cy.get('[data-testid="blog-remove"]').should('not.exist');
    })
  })

  describe('Blogs are ordered according to likes', () => {
    it('Blogs are ordered correctly', () => {
      cy.contains('show login').click()
      cy.get('input:first').type('pupita')
      cy.get('input:last').type('password')
      cy.get('#login-button').click()
      cy.contains('create new post').click()
      cy.get('[data-testid="input-title"]').type("Blog with 10 likes")
      cy.get('[data-testid="input-author"]').type("Author 1")
      cy.get('[data-testid="input-url"]').type("example.com")
      cy.get('[data-testid="button-submit"]').click()
      cy.contains('added')
  
      cy.contains('create new post').click()
      cy.get('[data-testid="input-title"]').type("Blog with 5 likes")
      cy.get('[data-testid="input-author"]').type("Author 2")
      cy.get('[data-testid="input-url"]').type("example.com")
      cy.get('[data-testid="button-submit"]').click()
      cy.contains('added')
  
      cy.contains('create new post').click()
      cy.get('[data-testid="input-title"]').type("Blog with 15 likes")
      cy.get('[data-testid="input-author"]').type("Author 3")
      cy.get('[data-testid="input-url"]').type("example.com")
      cy.get('[data-testid="button-submit"]').click()
      cy.contains('added')
  
      // Verificar que los blogs estén ordenados correctamente en la interfaz de usuario
      cy.get('[data-testid="blog-likes"]').should(($likes) => {
        const likes = $likes.map((index, elem) => Cypress.$(elem).text())
        const sortedLikes = likes.get().sort((a, b) => {
          const likesA = parseInt(a.split(' ')[1], 10)
          const likesB = parseInt(b.split(' ')[1], 10)
          return likesB - likesA
        })
        expect(likes.get()).to.deep.eq(sortedLikes)
      })
    })
  })
})
