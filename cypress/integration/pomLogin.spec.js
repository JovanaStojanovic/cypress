///<reference types="Cypress" />

import {loginPage} from './../page_objects/loginPage';
const faker = require('faker');

describe('POM login', ()=> {
    let userData = {
        randomEmail:faker.internet.email(),
        randomPassword:faker.internet.password()
    }
    let correctEmail = 'petar@gmail.com';
    let correctPassword= 'kisobran.22';
    beforeEach('visit link', ()=>{
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app');
    });

    //POSITIVE TEST CASES
//login with correct credentials
    it("login with correct credentials",()=>{

        cy.intercept(
            "POST",
            "https://gallery-api.vivifyideas.com/api/auth/login",
            (req)=>{}
        ).as("validLogin");

        loginPage.loginButton.click();
        loginPage.login(correctEmail, correctPassword);
        cy.wait('@validLogin').then((interception)=>{
            expect(interception.response.statusCode).eq(200);
        })
        loginPage.logoutButton.should('be.visible');
    });

     //logout
     it("logout", ()=>{
        loginPage.loginButton.click();
        loginPage.login(correctEmail, correctPassword);
        loginPage.logoutButton.should('be.visible');
        loginPage.logoutButton.click();
        loginPage.logoutButton.should('not.exist');
    });


    //login with invalid data
    it("login with invalid data", ()=>{
        loginPage.loginButton.click();
        loginPage.login(correctEmail, userData.randomPassword);
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/login');
        loginPage.errorMessage.should('be.visible').and('have.text', "Bad Credentials").and('have.css', 'color', 'rgb(114, 28, 36)');
        
    });
});