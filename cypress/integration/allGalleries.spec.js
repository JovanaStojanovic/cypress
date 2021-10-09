///<reference types="Cypress" />

import {allGalleries} from './../page_objects/allGalleries';

before('visit link', ()=>{
    cy.visit('/');
});

//check if there is 10 galleries when open the page
it("contains 10 galleries", ()=>{
    allGalleries.divCell.should('have.length', 10);
});

//check if there is additional 10 galleries when user clicks load more button
it("contains 10 more galleries", ()=>{
    allGalleries.loadMoreButton.click();
    allGalleries.divCell.should('have.length', 20);
});