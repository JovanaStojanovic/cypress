///<reference types="Cypress" />


import {loginPage} from './../page_objects/loginPage';
import { createGalleryPage } from '../page_objects/createGalleryPage';
import { deleteGallery } from '../page_objects/deleteGallery';

describe('POM delete gallery', ()=> {
    beforeEach('log into the app and create a gallery', () => {
        cy.loginViaBackend("petar@gmail.com", "kisobran.22");
        cy.visit('/create');
        createGalleryPage.createGallery("Sunflowers", "beautiful sunflowers fields", "http://static1.everypixel.com/ep-libreshot/0242/0259/3015/99837/2420259301599837355.jpg");
        loginPage.logoutButton.should('be.visible');


        cy.intercept(
            "DELETE",
            "https://gallery-api.vivifyideas.com/api/galleries/*",
            (req)=>{}
        ).as("deleteGallery");


    }); 

    //delete created gallery frontend
    //it("delete gallery", ()=>{
        //cy.wait('@submitGallery').then((interception)=>{
            //expect(interception.response.statusCode).eq(201);
        //})
        //deleteGallery.deleteGallery();
        //cy.url().should('contains', 'https://gallery-app.vivifyideas.com/');
        //deleteGallery.h1.should('have.text', "All Galleries");
    //});

    //delete created gallery via backend, the gallery must be created first in order for this to work
    it('delete gallery', ()=>{
        cy.loginViaBackend("petar@gmail.com", "kisobran.22");
        cy.readFile('./galleryId.json').then((file)=>{
            let galleryId=file;
            cy.deleteGalleryViaBackend(galleryId);
        });
        cy.wait('@deleteGallery').then((interception)=>{
            expect(interception.response.statusCode).eq(200);
        })
    })
    

});
