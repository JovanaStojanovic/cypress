export default class RegisterPage {
    get registerPageButton(){
        return cy.get('a[href="/register"]');
    }
    get firstNameInput(){
        return cy.get('input[id="first-name"]');
    }
    get lastNameInput(){
        return cy.get('input[id="last-name"]');
    }
    get emailInput(){
        return cy.get('input[id="email"]');
    }
    get passwordInput(){
        return cy.get('input[id="password"]');
    }
    get passwordConfirmationInput(){
        return cy.get('input[id="password-confirmation"]');
    }
    get checkboxInput(){
        return cy.get('input[type="checkbox"]');
    }
    get submitButton(){
        return cy.get('button[type="submit"]');
    }
    get errorMessage(){
        return cy.get('p[class="alert alert-danger"]');
    }
    get h1(){
        return cy.get('h1');
    }
    register(firstName, lastName, email, password, passwordConfirmation){
        this.firstNameInput.clear().type(firstName);
        this.lastNameInput.clear().type(lastName);
        this.emailInput.clear().type(email);
        this.passwordInput.clear().type(password);
        this.passwordConfirmationInput.clear().type(passwordConfirmation);
        this.checkboxInput.check();
        this.submitButton.click();
}
    registerNoFirstName(lastName, email, password, passwordConfirmation){
        this.lastNameInput.clear().type(lastName);
        this.emailInput.clear().type(email);
        this.passwordInput.clear().type(password);
        this.passwordConfirmationInput.clear().type(passwordConfirmation);
        this.checkboxInput.check();
        this.submitButton.click();
}
    registerSkippedTerms(firstName, lastName, email, password, passwordConfirmation){
        this.firstNameInput.clear().type(firstName);
        this.lastNameInput.clear().type(lastName);
        this.emailInput.clear().type(email);
        this.passwordInput.clear().type(password);
        this.passwordConfirmationInput.clear().type(passwordConfirmation);
        this.submitButton.click();
    }
}
export const registerPage = new RegisterPage();
