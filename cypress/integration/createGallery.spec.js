///<reference types="Cypress" />

const Locators = require('../fixtures/Locators.json');
import {loginPage} from './../page_objects/loginPage';
import {createGalleryPage} from './../page_objects/createGalleryPage';
import { allGalleries } from '../page_objects/allGalleries';
const faker = require('faker');
const randomstring = require("randomstring");

describe('POM create gallery', ()=> {
    beforeEach('log into the app', () => {
        cy.loginViaBackend("petar@gmail.com", "kisobran.22");
        cy.visit('/create');
        //custom command doesn't work, why? 
        //cy.createGalleryViaBackend("Sunflowers", "beautiful sunflowers field", "http://static1.everypixel.com/ep-libreshot/0242/0259/3015/99837/2420259301599837355.jpg");
        loginPage.logoutButton.should('be.visible');
        createGalleryPage.createGalleryButton.click();

        cy.intercept(
            "POST",
            "https://gallery-api.vivifyideas.com/api/galleries",
            (req)=>{}
        ).as("submitGallery");


    }); 
    
    let galleryData = {
        randomTitle:faker.name.title(),
        randomDescription:faker.lorem.sentence(),
        randomUrlJpg:faker.internet.url() + ".jpg",
        randomUrlPng:faker.internet.url() + ".png",
        randomUrlJpeg: faker.internet.url() + ".jpeg",
        randomUrlTift:faker.internet.url() + ".tift",
        randomUrlGif: faker.internet.url() + ".gif",
        randomUrlHtml: faker.internet.url() + ".html",
        randomUrlJs: faker.internet.url() + ".js",
        randomUrlEps: faker.internet.url() + ".eps"
    }
    let shortTitle= randomstring.generate(1);
    let longTitle= randomstring.generate(256);
    let longDescription= randomstring.generate(1001);
    let minTitle=randomstring.generate(2);
    let maxTitle=randomstring.generate(255);
    let maxDescription=randomstring.generate(1000);

    //TEST CASES
//user needs to be logged in in order to be able to see create gallery button
    it("create gallery option",()=>{
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.h1Title.should('have.text', 'Create Gallery');
    });

//all elements should be visible on create gallery page
    it("all elements visible",()=>{
        createGalleryPage.titleInput.should('be.visible');
        createGalleryPage.descriptionInput.should('be.visible');
        createGalleryPage.image.eq(0).should('be.visible');
        createGalleryPage.addImageButton.should('be.visible');
        createGalleryPage.submitGalleryButton.should('be.visible');
        createGalleryPage.cancelGalleryButton.should('be.visible');
        createGalleryPage.button.eq(0).should('be.visible');
        createGalleryPage.button.eq(1).should('be.visible');
    });

//click submit button without entering title, description and image
    it("click submit button, empty gallery",()=>{
        createGalleryPage.submitGalleryButton.click();
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
    });

//title less than min of 2 characters
    it("title contains 1 character", ()=>{
        createGalleryPage.createGallery(shortTitle, galleryData.randomDescription, galleryData.randomUrlJpg);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "The title must be at least 2 characters.");
    });

//title more than max of 255 characters
    it("title contains 256 characters", ()=>{
        createGalleryPage.createGallery(longTitle, galleryData.randomDescription, galleryData.randomUrlJpg);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "The title may not be greater than 255 characters.");
    });

//description more than max of 1000 characters
    it("description contains 1001 characters", ()=>{
        createGalleryPage.createGallery(galleryData.randomTitle, longDescription, galleryData.randomUrlJpg);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
         cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "The description may not be greater than 1000 characters.");
    });

//invalid url format .tift
    it("url format .tift", ()=>{
        createGalleryPage.createGallery(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlTift);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
         cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "Wrong format of image");
    });

//invalid url format .gif
    it("url format .gif", ()=>{
        createGalleryPage.createGallery(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlGif);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
         cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "Wrong format of image");
    });

//invalid url format .html
    it("url format .html", ()=>{
        createGalleryPage.createGallery(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlHtml);
        cy.wait('@submitGallery').then((interception)=> {
         expect(interception.response.statusCode).eq(422);
        })
         cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "Wrong format of image");
    });

//invalid url format .js
    it("url format .js", ()=>{
        createGalleryPage.createGallery(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlJs);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
         cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "Wrong format of image");
     });

//invalid url format .eps
    it("url format .eps", ()=>{
        createGalleryPage.createGallery(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlEps);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
         cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "Wrong format of image");
    });

//title and description good, no url
    it("empty url field", ()=>{
        createGalleryPage.createGalleryNoUrl(galleryData.randomTitle, galleryData.randomDescription);
         cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
    });

//check button Up
it("check button Up", ()=>{ 
    createGalleryPage.checkButton(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlJpg, galleryData.randomUrlPng);
    createGalleryPage.button.eq(4).click();
    createGalleryPage.image.eq(0).should('have.value', galleryData.randomUrlPng);
 });

//check button down
it("check button Down", ()=>{ 
    createGalleryPage.checkButton(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlJpg, galleryData.randomUrlPng);
    createGalleryPage.button.eq(2).click();
    createGalleryPage.image.eq(0).should('have.value', galleryData.randomUrlPng);
 });

//2 urls, 1 valid, 1 invalid format
    it("1 valid, 1 invalid format", ()=>{
        createGalleryPage.createGalleryTwoUrls(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlTift, galleryData.randomUrlJpg);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        createGalleryPage.errorMessage.should('be.visible').and('contain', "Wrong format of image");
    });

//all valid fields, title min 2 characters
    it("title 2 characters, all valid fields", ()=>{
        createGalleryPage.createGalleryTwoUrls(minTitle, galleryData.randomDescription, galleryData.randomUrlPng, galleryData.randomUrlJpeg);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(201);
        })
        cy.url().should('contain', 'https://gallery-app.vivifyideas.com/');
        createGalleryPage.titleCreatedGallery.should('have.text', ('\n          '+minTitle+'\n        '));
        allGalleries.heading.should('have.text', 'All Galleries');
    });

//all valid fields, title max 255 characters
it("title 255 characters, all valid fields", ()=>{
    createGalleryPage.createGallery(maxTitle, galleryData.randomDescription, galleryData.randomUrlPng);
    cy.wait('@submitGallery').then((interception)=> {
        expect(interception.response.statusCode).eq(201);
    })
    cy.url().should('contain', 'https://gallery-app.vivifyideas.com/');
    createGalleryPage.titleCreatedGallery.should('have.text', ('\n          '+maxTitle+'\n        '));
    allGalleries.heading.should('have.text', 'All Galleries');
});

//all valid fields, description max 1000 characters
it("description 1000 characters, all valid fields", ()=>{
    createGalleryPage.createGallery(galleryData.randomTitle, maxDescription, galleryData.randomUrlPng);
    cy.wait('@submitGallery').then((interception)=> {
        expect(interception.response.statusCode).eq(201);
    })
    cy.url().should('contain', 'https://gallery-app.vivifyideas.com/');
    createGalleryPage.titleCreatedGallery.eq(0).should('have.text', ('\n          '+galleryData.randomTitle+'\n        '));
    allGalleries.heading.should('have.text', 'All Galleries');
});

//description field empty, title and image valid
it("empty description field, all valid fields", ()=>{
    createGalleryPage.createGalleryNoDescription(galleryData.randomTitle, galleryData.randomUrlJpg);
    cy.wait('@submitGallery').then((interception)=> {
        expect(interception.response.statusCode).eq(201);
    })
    cy.url().should('contain', 'https://gallery-app.vivifyideas.com/');
    createGalleryPage.titleCreatedGallery.eq(0).should('have.text', ('\n          '+galleryData.randomTitle+'\n        '));
    allGalleries.heading.should('have.text', 'All Galleries');
});

//check cancel button
it("cancel button", ()=>{
    createGalleryPage.cancelGalleryButton.click();
    cy.url().should('contain', 'https://gallery-app.vivifyideas.com/');
    allGalleries.heading.should('have.text', 'All Galleries');
});  

});
