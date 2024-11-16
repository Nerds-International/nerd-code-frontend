describe('started', function () {

      beforeEach(() => {
        cy.visit('/');
      });

      it('should load the main page', () => {
        cy.url().should('include', '/');
      });
    
      it('should navigate to Problems Page', () => {
        cy.visit('/problems');
        cy.url().should('include', '/problems');
      });

      it('should navigate to Discuss Page', () => {
        cy.visit('/discuss');
        cy.url().should('include', '/discuss');
      });


      it('should navigate to Battle Page', () => {
        cy.visit('/battle');
        cy.url().should('include', '/battle');
      });

      it('should navigate to Battle Screen', () => {
        cy.visit('/battle/screen');
        cy.url().should('include', '/battle/screen');
      });
})


describe('Authentication Modal e2e Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should open the authentication modal', () => {
      cy.visit('/auth');
      cy.url().should('include', '/auth');
    });
  
    it('should show SignInForm by default', () => {
      cy.visit('/auth/signin');
      cy.url().should('include', '/auth/signin');
    });
  
    it('should navigate to SignUp form', () => {
      cy.visit('/auth/signup');
      cy.url().should('include', '/auth/signup');
    });
  
    it('should navigate to Forgot Password form', () => {
      cy.visit('/auth/forgot-password');
      cy.url().should('include', '/auth/forgot-password');
    });
  
    it('should close the authentication modal', () => {
      cy.visit('/auth');
      cy.visit('/');
      cy.url().should('not.include', '/auth');
    });
  });
  