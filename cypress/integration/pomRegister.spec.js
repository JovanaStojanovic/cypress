///<reference types="Cypress" />

import { fake } from 'faker';
import RegisterPage, {registerPage} from './../page_objects/registerPage';
const faker = require('faker');
const randomstring = require("randomstring");


describe("register tests", () => {

    let userRegisterData = {
        randomFirstName:faker.name.findName(),
        randomLastName:faker.name.findName(),
        randomEmail:faker.internet.email(),
        randomPassword:faker.internet.password(),
        randomConfirmedPassword:faker.internet.password(),
        randomEmail1:faker.internet.email(),
        randomEmail2:faker.internet.email()
    }
    let registeredEmail = 'petar@gmail.com';
    let longFirstName= randomstring.generate(256);

    beforeEach("visit register page", () => {
        cy.visit("https://gallery-app.vivifyideas.com/register");

        cy.intercept(
            "POST",
            "https://gallery-api.vivifyideas.com/api/auth/register",
            (req)=>{}
        ).as("registerUser");

        cy.intercept(
            "GET",
            "https://gallery-api.vivifyideas.com/api/galleries?page=1&term=",
            (req)=>{}
        ).as("getHomePage");
    });

    

    //NEGATIVE TEST CASES
    //empty first name field
        it("register with empty first name field", ()=>{
            registerPage.registerNoFirstName(userRegisterData.randomLastName, userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomPassword);
            cy.url().should('contains', 'https://gallery-app.vivifyideas.com/register');
        });
    
    //skipped terms
        it("register with skipped accepted terms", ()=>{
            registerPage.registerSkippedTerms(userRegisterData.randomFirstName, userRegisterData.randomLastName, userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomPassword); 
            cy.wait('@registerUser').then((interception)=> {
                expect(interception.response.statusCode).eq(422);
            })
            registerPage.errorMessage.should('have.text', 'The terms and conditions must be accepted.');
            cy.url().should('contains', 'https://gallery-app.vivifyideas.com/register');
        });

    //wrong email missing first part before @
    it("register with email missing first part before @", ()=>{
        registerPage.register(userRegisterData.randomFirstName, userRegisterData.randomLastName, "@yahoo.com", userRegisterData.randomPassword, userRegisterData.randomPassword);    
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/register');
    });

    //wrong email @ missing
    it("register with email missing @", ()=>{
        registerPage.register(userRegisterData.randomFirstName, userRegisterData.randomLastName, "js14015141yahoo.com", userRegisterData.randomPassword, userRegisterData.randomPassword); 
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/register');
    });
    
    //wrong email . missing
    it("register with email missing .", ()=>{
        registerPage.register(userRegisterData.randomFirstName, userRegisterData.randomLastName, "js140151452@yahoocom", userRegisterData.randomPassword, userRegisterData.randomPassword); 
        cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        registerPage.errorMessage.should('have.text', 'The email must be a valid email address.');
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/register');
    });

    //wrong email space
    it("register with additional space in email", ()=>{
        registerPage.register(userRegisterData.randomFirstName, userRegisterData.randomLastName, "js140151452 @yahoocom", userRegisterData.randomPassword, userRegisterData.randomPassword); 
        cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/register');
    });

    //wrong email more than one @
    it("register with email that contains more than one @", ()=>{
        registerPage.register(userRegisterData.randomFirstName, userRegisterData.randomLastName, "js@1401514112@yahoo.com", userRegisterData.randomPassword, userRegisterData.randomPassword); 
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/register');
    });

    //wrong password less than 8 characters
    it("register with password that contains less than 8 characters", ()=>{
        registerPage.register(userRegisterData.randomFirstName, userRegisterData.randomLastName, userRegisterData.randomEmail, "olovka", "olovka"); 
        cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        registerPage.errorMessage.should('have.text', 'The password must be at least 8 characters.');
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/register');
    });

    //wrong password only 8 letters
    it("register with password that contains 8 letters", ()=>{
        registerPage.register(userRegisterData.randomFirstName, userRegisterData.randomLastName, userRegisterData.randomEmail, "kisobran", "kisobran"); 
        cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        registerPage.errorMessage.should('have.text', 'The password format is invalid.');
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/register');
    });

    //wrong password 6 letters and number
    it("register with password that contains 6 letters and 1 number", ()=>{
        registerPage.register(userRegisterData.randomFirstName, userRegisterData.randomLastName, userRegisterData.randomEmail, "olovka1", "olovka1"); 
        cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        registerPage.errorMessage.should('have.text', 'The password must be at least 8 characters.');
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/register');
    });

    //wrong password 7 numbers
    it("register with password that contains 7 numbers", ()=>{
        registerPage.register(userRegisterData.randomFirstName, userRegisterData.randomLastName, userRegisterData.randomEmail, "1234567", "1234567"); 
        cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        registerPage.errorMessage.should('have.text', 'The password must be at least 8 characters.');
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/register');
    });

    //different password and confirmed password
    it("register with different password and confirmed password", ()=>{
        registerPage.register(userRegisterData.randomFirstName, userRegisterData.randomLastName, userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomConfirmedPassword); 
        cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        registerPage.errorMessage.should('have.text', 'The password confirmation does not match.');
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/register');
    });

    //already registered email
    it("register with already registered email", ()=>{
        registerPage.register(userRegisterData.randomFirstName, userRegisterData.randomLastName, registeredEmail, userRegisterData.randomPassword, userRegisterData.randomPassword); 
        cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        registerPage.errorMessage.should('have.text', 'The email has already been taken.');
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/register');
    });

    //long first name more than 255 characters
    it("register with first name that has 256 characters", ()=>{
        registerPage.register(longFirstName, userRegisterData.randomLastName, userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomPassword); 
        cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(500);
        })
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/register');
    });

    //POSITIVE TEST CASES
    //correct credentials 

    it("register with correct credentials", ()=>{
        registerPage.register(userRegisterData.randomFirstName, userRegisterData.randomLastName, userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomPassword); 
        cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(200);
        })
        cy.wait('@getHomePage').then((interception)=> {
            expect(interception.response.statusCode).eq(200);
        })
        registerPage.h1.should('have.text', 'All Galleries');
    })
    
    //first name consists of 2 parts 
    //how not to use same email address from previous test case when using userRegisterData.randomEmail? 
    it("register with correct credentials", ()=>{
        registerPage.register("Ana-Maria", userRegisterData.randomLastName, userRegisterData.randomEmail1, userRegisterData.randomPassword, userRegisterData.randomPassword);
        cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(200);
        })
        cy.wait('@getHomePage').then((interception)=> {
            expect(interception.response.statusCode).eq(200);
        })
        registerPage.h1.should('have.text', 'All Galleries');
    });

    //first name and last name written in cyrillic alphabet
    //same problem with randomEmail here!
    it("register with correct credentials", ()=>{
        registerPage.register("Јована", "Стојановић", userRegisterData.randomEmail2, userRegisterData.randomPassword, userRegisterData.randomPassword);
        cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(200);
        })
        cy.wait('@getHomePage').then((interception)=> {
            expect(interception.response.statusCode).eq(200);
        })
        registerPage.h1.should('have.text', 'All Galleries');
    });
    
    });

