describe('blog', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('landing page', () => {
    cy.contains('blogs')
  })

  it('user can login', () => {
    cy.contains('show login').click()
    cy.get('input:first').type('sspp')
    cy.get('input:last').type('ssanjua')
    cy.get('#login-button').click()
  })
})