/// <reference types="Cypress" /> 

describe("login tests", () => {
    it("visit gallery page", () => {
        cy.visit("/login");

    });
    it("click login button", ()=>{
        cy.get('a[href="/login"]').click();
    });

    it("login with correct credentials",()=>{
        cy.get('input[id="email"]').type('petar@gmail.com')
        cy.get('input[id="password"]').type('kisobran.22')
        cy.get('button[type="submit"]').click();
    });
    it("log out", ()=>{
        cy.get('a[role="button "]').click();
    });
});