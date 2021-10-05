/// <reference types="Cypress" /> 

describe("login tests", () => {
    it("visit gallery page", () => {
        cy.visit("/login");

    });
    it("click login button", ()=>{
        cy.get('a[href="/login"]').click();
    });

    //POSITIVE TEST CASES
    //login with correct credentials
    it("login with correct credentials",()=>{
        cy.get('input[id="email"]').type('petar@gmail.com');
        cy.get('input[id="password"]').type('kisobran.22');
        cy.get('button[type="submit"]').click();
    });

    //logout
    it("logout", ()=>{
        cy.wait(3000);
        cy.get('a[role="button "]').click();
    });

    //login with valid email, space at the end of password
    it("login with password contains space at the end",()=>{
        cy.wait(3000);
        cy.get('input[id="email"]').clear().type('petar@gmail.com')
        cy.get('input[id="password"]').clear().type('kisobran.22 ')
        cy.get('button[type="submit"]').click();
    });

    

    //NEGATIVE TEST CASES
   //login without email
   it("login without email",()=>{
    cy.wait(3000);
    cy.get('input[id="email"]').clear();
    cy.get('input[id="password"]').clear().type('kisobran.22');
    cy.get('button[type="submit"]').click();
    }); 

    //login with not registered email
    it("login with not registered email",()=>{
        cy.wait(3000);
        cy.get('input[id="email"]').clear().type('nnn@gmail.com')
        cy.get('input[id="password"]').clear().type('kisobran.22')
        cy.get('button[type="submit"]').click();
    });

    //login with valid email, incorrect password
    it("login with incorrect password",()=>{
        cy.wait(3000);
        cy.get('input[id="email"]').clear().type('petar@gmail.com')
        cy.get('input[id="password"]').clear().type('fotografija22')
        cy.get('button[type="submit"]').click();
    });

   
});