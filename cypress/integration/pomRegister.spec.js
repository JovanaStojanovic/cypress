///<reference types="Cypress" />

import {registerPage} from './../page_objects/registerPage';
const faker = require('faker');


describe("register tests", () => {

    let userRegisterData = {
        randomFirstName:faker.name.findName(),
        randomLastName:faker.name.findName(),
        randomEmail:faker.internet.email(),
        randomPassword:faker.internet.password(),
        
    }
    let correctEmail = 'petar@gmail.com';
    let correctPassword= 'kisobran.22';

    beforeEach("visit register page", () => {
        cy.visit("https://gallery-app.vivifyideas.com/register");

    });

    //POSITIVE TEST CASES
    //correct credentials 

    it.only("register with correct credentials", ()=>{
        registerPage.register(userRegisterData.randomFirstName, userRegisterData.randomLastName, userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomPassword); 
    });
    
    //first name consists of 2 parts
    it("register with correct credentials", ()=>{
        cy.get('input[id="first-name"]').clear().type("Ana-Maria");
        cy.get('input[id="last-name"]').clear().type("Suarez");
        cy.get('input[id="email"]').clear().type("amsuarez1@gmail.com");
        cy.get('input[id="password"]').clear().type("kisobran.22");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //all info written in cyrillic alphabet
    it("register with correct credentials", ()=>{
        cy.get('input[id="first-name"]').clear().type("Јована");
        cy.get('input[id="last-name"]').clear().type("Стојановић");
        cy.get('input[id="email"]').clear().type("js140151555@yahoo.com");
        cy.get('input[id="password"]').clear().type("kisobran.22");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //NEGATIVE TEST CASES
    //empty first name field

        it("register with empty first name field", ()=>{
            cy.get('input[id="last-name"]').clear().type("Stojanovic");
            cy.get('input[id="email"]').clear().type("js1401522@yahoo.com");
            cy.get('input[id="password"]').clear().type("kisobran.22");
            cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
            cy.get('input[type="checkbox"]').check();
            cy.get('button[type="submit"]').click();
        });
    
    //skipped terms

        it("register with skipped accepted terms", ()=>{
            cy.get('input[id="first-name"]').clear().type("Jovana");
            cy.get('input[id="last-name"]').clear().type("Stojanovic");
            cy.get('input[id="email"]').clear().type("js14015212@yahoo.com");
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
            cy.get('input[id="email"]').clear().type("js14015141yahoo.com");
            cy.get('input[id="password"]').clear().type("kisobran.22");
            cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
            cy.get('input[type="checkbox"]').check();
            cy.get('button[type="submit"]').click();
     });
    
    //wrong email . missing
    it("register with email missing .", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js140151452@yahoocom");
        cy.get('input[id="password"]').clear().type("kisobran.22");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //wrong email space

    it("register with additional space in email", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js140151453 @yahoo.com");
        cy.get('input[id="password"]').clear().type("kisobran.22");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //wrong email more than one @

    it("register with email that contains more than one @", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js@1401514112@yahoo.com");
        cy.get('input[id="password"]').clear().type("kisobran.22");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //wrong password less than 8 characters

    it("register with password that contains less than 8 characters", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js140151415111@yahoo.com");
        cy.get('input[id="password"]').clear().type("olovka");
        cy.get('input[id="password-confirmation"]').clear().type("olovka");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //wrong password only 8 letters
    it("register with password that contains 8 letters", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js140151424121@yahoo.com");
        cy.get('input[id="password"]').clear().type("kisobran");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //wrong password 6 letters and number
    it("register with password that contains 6 letters and 1 number", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js140151416121@yahoo.com");
        cy.get('input[id="password"]').clear().type("olovka1");
        cy.get('input[id="password-confirmation"]').clear().type("olovka1");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //wrong password 7 numbers
    it("register with password that contains 7 numbers", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js140151422121@yahoo.com");
        cy.get('input[id="password"]').clear().type("1234567");
        cy.get('input[id="password-confirmation"]').clear().type("1234567");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //different password and confirmed password
    it("register with different password and confirmed password", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js1401514312@yahoo.com");
        cy.get('input[id="password"]').clear().type("kisobran.22");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //already registered email
    it("register with already registered email", ()=>{
        cy.get('input[id="first-name"]').clear().type("Jovana");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js140151421yahoo.com");
        cy.get('input[id="password"]').clear().type("kisobran.22");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });

    //long first name more than 255 characters
    it("register with first name that has 256 characters", ()=>{
        cy.get('input[id="first-name"]').clear().type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum turpis mattis mi vulputate eleifend. Integer non mattis diam. Aenean nec viverra nisl. Fusce nibh nisi, scelerisque sit amet enim sed, lacinia dictum urna. Quisque vel velit sit nulla.");
        cy.get('input[id="last-name"]').clear().type("Stojanovic");
        cy.get('input[id="email"]').clear().type("js111111@yahoo.com");
        cy.get('input[id="password"]').clear().type("kisobran.22");
        cy.get('input[id="password-confirmation"]').clear().type("kisobran.22");
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
    });


    });
