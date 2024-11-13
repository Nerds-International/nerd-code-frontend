describe('started', function () {
    it('on localhost:3000', function () {
        cy.visit('http://localhost:3000');
    })
})

describe('App e2e Tests', function () {
  
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('should load the main page', function () {
      cy.contains('Main Page Content').should('be.visible');  // Adjust to actual text
    });
  
    it('should navigate to Problems Page', function () {
      cy.get('nav').contains('Problems').click();
      cy.url().should('include', '/problems');
      cy.contains('Problems List Content').should('be.visible');  // Adjust to actual text
    });
  
    it('should navigate to Discuss Page', function () {
      cy.get('nav').contains('Discuss').click();
      cy.url().should('include', '/discuss');
      cy.contains('Discuss Page Content').should('be.visible');  // Adjust to actual text
    });
  
    it('should navigate to Battle Page', function () {
      cy.get('nav').contains('Search Battle').click();
      cy.url().should('include', '/search_battle');
      cy.contains('Battle Page Content').should('be.visible');  // Adjust to actual text
    });
  
    it('should navigate to Battle Screen', function () {
      cy.get('nav').contains('Battle').click();
      cy.url().should('include', '/battle');
      cy.contains('Battle Screen Content').should('be.visible');  // Adjust to actual text
    });
  });
  
  describe('Authentication Modal e2e Tests', function () {
    
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.contains('Sign In').click();  // Open the modal
    });
  
    it('should show SignInForm by default', function () {
      cy.get('.auth-form-title').contains('Log In').should('be.visible');
    });
  
    it('should switch to SignUpForm', function () {
      cy.contains("Don't have an account?").click();
      cy.get('.auth-form-title').contains('Join NerdCode').should('be.visible');
    });
  
    it('should switch to ForgotPasswordForm', function () {
      cy.contains('Forgot password?').click();
      cy.get('.auth-form-title').contains('Reset Password').should('be.visible');
    });
  
    it('should complete Sign Up flow and open CompleteProfileForm', function () {
      cy.contains("Don't have an account?").click();
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
      cy.get('button[type="submit"]').contains('Continue').click();
  
      cy.get('.auth-form-title').contains('Complete Your Profile').should('be.visible');
    });
  
    it('should fill in CompleteProfileForm and create account', function () {
      cy.contains("Don't have an account?").click();
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
      cy.get('button[type="submit"]').contains('Continue').click();
  
      cy.get('input[name="username"]').type('TestUser');
      cy.get('input[name="fullName"]').type('Test User');
      cy.get('select[name="avatar"]').select('Avatar 1');
      cy.get('input[type="checkbox"]').check();
      cy.get('button[type="submit"]').contains('Create account').click();
  
      cy.contains('Log In').should('be.visible');  // Should be redirected to Log In page
    });
  });
  