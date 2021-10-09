export default class AllGalleries {
    get loadMoreButton(){
        return cy.get('button[class="btn btn-custom"]');
    };
    get divCell(){
        return cy.get('div[class="cell"]');
    }
}

export const allGalleries = new AllGalleries();