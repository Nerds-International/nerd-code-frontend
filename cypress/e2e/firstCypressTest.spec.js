describe('started', function () {
    it('on localhost:3000', function () {
        cy.visit('http://localhost:3000');
    })
})

describe('App e2e Tests', () => {
    beforeEach(() => {
      // Переход на главную страницу с увеличением времени ожидания
      cy.visit('/', { timeout: 10000 });
    });
  
    it('should load the main page', () => {
      // Ожидание конкретного контента на главной странице с увеличением времени ожидания
      cy.contains('Main Page Content', { timeout: 10000 }).should('be.visible');
    });
  
    it('should navigate to Problems Page', () => {
      // Проверка, что nav элемент присутствует перед нажатием
      cy.get('nav', { timeout: 10000 }).should('be.visible');
      cy.get('nav').contains('Problems').click();
      cy.url().should('include', '/problems');
    });
  
    it('should navigate to Discuss Page', () => {
      cy.get('nav', { timeout: 10000 }).should('be.visible');
      cy.get('nav').contains('Discuss').click();
      cy.url().should('include', '/discuss');
    });
  
    it('should navigate to Battle Page', () => {
      cy.get('nav', { timeout: 10000 }).should('be.visible');
      cy.get('nav').contains('Battle').click();
      cy.url().should('include', '/battle');
    });
  
    it('should navigate to Battle Screen', () => {
      cy.get('nav', { timeout: 10000 }).should('be.visible');
      cy.get('nav').contains('Battle Screen').click();
      cy.url().should('include', '/battle-screen');
    });
  });
  
  describe('Authentication Modal e2e Tests', () => {
    beforeEach(() => {
      // Убедиться, что открыта форма авторизации
      cy.visit('/login', { timeout: 10000 });
    });
  
    it('should show SignInForm by default', () => {
      // Проверка, что текст 'Sign In' отображается
      cy.contains('Sign In', { timeout: 10000 }).should('be.visible');
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
  