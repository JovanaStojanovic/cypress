///<reference types="Cypress" />

import { internet } from 'faker';
import {allGalleries} from './../page_objects/allGalleries';

before('visit link', ()=>{
    cy.visit('/');
});

//check if there is 10 galleries when open the page
it("contains 10 galleries", ()=>{
    cy.intercept(
        "GET",
        "https://gallery-api.vivifyideas.com/api/galleries?page=1&term=",
        (req)=>{}
    ).as("visitedAllGalleriesPage");
    cy.wait('@visitedAllGalleriesPage').then((interception)=>{
        expect(interception.response.statusCode).eq(200);
    })
    allGalleries.divCell.should('have.length', 10);
    allGalleries.heading.should('have.text', 'All Galleries');

});

//check if there is additional 10 galleries when user clicks load more button
it("contains 10 more galleries", ()=>{
    cy.intercept(
        "GET",
        "https://gallery-api.vivifyideas.com/api/galleries?page=2&term=",
        (req)=>{}
    ).as("visitedAllGalleriesPageNext");
    allGalleries.loadMoreButton.click();
    cy.wait('@visitedAllGalleriesPageNext').then((interception)=>{
        expect(interception.response.statusCode).eq(200);
    })
    allGalleries.divCell.should('have.length', 20);
});

