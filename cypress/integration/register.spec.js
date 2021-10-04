/// <reference types="Cypress" /> 

describe("register tests", () => {
    it("visit register page", () => {
        cy.visit("/register");

    });

    //correct credentials 

    it("register with correct credentials", ()=>{
        cy.get('input[id="first-name"]').type("Jovana");
        cy.get('input[id="last-name"]').type("Stojanovic");
        cy.get('input[id="email"]').type("js140151@yahoo.com");
        cy.get('input[id="password"]').type("kisobran.22");
        cy.get('input[id="password-confirmation"]').type("kisobran.22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //empty first name field

        it("register with empty first name field", ()=>{
            cy.get('input[id="last-name"]').clear().type("Stojanovic");
            cy.get('input[id="email"]').clear().type("js140152@yahoo.com");
            cy.get('input[id="password"]').clear().type("kisobran.22");
            cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
            cy.get('input[type="checkbox"]').check();
            cy.get('button[type="submit"]').click();
        });
    
    //skipped terms

        it("register with skipped accepted terms", ()=>{
            cy.get('input[id="first-name"]').clear().type("Jovana");
            cy.get('input[id="last-name"]').clear().type("Stojanovic");
            cy.get('input[id="email"]').clear().type("js1401521@yahoo.com");
            cy.get('input[id="password"]').clear().type("kisobran.22");
            cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
            cy.get('button[type="submit"]').click();
        });

    //wrong email missing first part before @
    it("register with email missing first part before @", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("@yahoo.com");
        cy.get('input[id="password"]').clear().type("kisobran.22");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });


    //wrong email @ missing

        it("register with email missing @", ()=>{
                cy.get('input[id="first-name"]').clear().type("Jovana");
                cy.get('input[id="last-name"]').clear().type("Stojanovic");
                cy.get('input[id="email"]').clear().type("js1401514yahoo.com");
                cy.get('input[id="password"]').clear().type("kisobran.22");
                cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
                cy.get('input[type="checkbox"]').check();
                cy.get('button[type="submit"]').click();
            });
    
    //wrong email . missing
    it("register with email missing .", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js14015145@yahoocom");
        cy.get('input[id="password"]').clear().type("kisobran.22");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //wrong email space

    it("register with additional space in email", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js14015145 @yahoo.com");
        cy.get('input[id="password"]').clear().type("kisobran.22");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //wrong email more than one @

    it("register with email that contains more than one @", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js@1401514@yahoo.com");
        cy.get('input[id="password"]').clear().type("kisobran.22");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //wrong password less than 8 characters

    it("register with password that contains less than 8 characters", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js140151415@yahoo.com");
        cy.get('input[id="password"]').clear().type("olovka");
        cy.get('input[id="password-confirmation"]').clear().type("olovka");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //wrong password only 8 letters
    it("register with password that contains 8 letters", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js140151424@yahoo.com");
        cy.get('input[id="password"]').clear().type("kisobran");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //wrong password 7 letters and number
    it("register with password that contains 7 letters and 1 number", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js140151416@yahoo.com");
        cy.get('input[id="password"]').clear().type("tasnica1");
        cy.get('input[id="password-confirmation"]').clear().type("tasnica1");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //wrong password 7 numbers
    it("register with password that contains 7 numbers", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js140151422@yahoo.com");
        cy.get('input[id="password"]').clear().type("1234567");
        cy.get('input[id="password-confirmation"]').clear().type("1234567");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //different password and confirmed password
    it("register with different password and confirmed password", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js140151431@yahoo.com");
        cy.get('input[id="password"]').clear().type("kisobran.22");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //already registered email
    it("register with already registered email", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js1401514yahoo.com");
        cy.get('input[id="password"]').clear().type("kisobran.22");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });



    });

