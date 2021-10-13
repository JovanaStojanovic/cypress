// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("loginViaBackend", (email, password) =>{
    cy.request(
        'POST',
        'https://gallery-api.vivifyideas.com/api/auth/login',
        {
            email: email,
            password:password
        }
    ).its("body").then((response)=>{
        window.localStorage.setItem("token", response.access_token);
    })
})

//Why this custom command doesn't work?
Cypress.Commands.add("createGalleryViaBackend", (title, description, url)=>{
    cy.request(
        'POST',
        'https://gallery-api.vivifyideas.com/api/galleries',
        {
            title:title,
            description: description,
            url: url
        }
    ).its("body").then((response)=>{
        expect(response.status).to.eq(200);
    })
})
