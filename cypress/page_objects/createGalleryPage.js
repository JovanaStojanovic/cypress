export default class CreateGalleryPage {
    get h1Title(){
        return cy.get('h1');
    }
    get homeButton(){
        return cy.get('a[href="/"]').eq(1);
    }
    get createGalleryButton(){
        return cy.get('a[href="/create"]');
    }
    get cancelGalleryButton(){
        return cy.get('button[type="submit"]').eq(1);
    }
    get submitGalleryButton(){
        return cy.get('button[type="submit"]').eq(0);
    }
    get titleInput(){
        return cy.get('input[id="title"]');
    }
    get descriptionInput(){
        return cy.get('input[id="description"]');
    }
    get image(){
        return cy.get('input[type="url"]');
    }
    get imageInput(){
        return cy.get('input[type="url"]').eq(0);
    }
    get secondImageInput(){
        return cy.get('input[type="url"]').eq(1);
    }
    get addImageButton(){
        return cy.get('button[type="button"]').eq(2);
    }
    get button(){
        return cy.get('button[class="input-buttons"]');
    }
    get errorMessage(){
        return cy.get('p[class="alert alert-danger"]');
    }
    get titleCreatedGallery(){
        return cy.get('a[class="box-title"]').eq(0);
    }
    createGallery(title, description, image){
        this.createGalleryButton.click();
        this.titleInput.clear().type(title);
        this.descriptionInput.clear().type(description);
        this.image.eq(0).clear().type(image);
        this.submitGalleryButton.click();
    }
    createGalleryNoUrl(title, description){
        this.createGalleryButton.click();
        this.titleInput.clear().type(title);
        this.descriptionInput.clear().type(description);
        this.image.eq(0).clear();
        this.submitGalleryButton.click();
    }
    createGalleryTwoUrls(title, description, image, secondImage){
        this.createGalleryButton.click();
        this.titleInput.clear().type(title);
        this.descriptionInput.clear().type(description);
        this.image.eq(0).clear().type(image);
        this.addImageButton.click();
        this.image.eq(1).clear().type(secondImage);
        this.submitGalleryButton.click();
    }

    checkButton(title, description, image, secondImage){
        this.createGalleryButton.click();
        this.titleInput.clear().type(title);
        this.descriptionInput.clear().type(description);
        this.image.eq(0).clear().type(image);
        this.addImageButton.click();
        this.image.eq(1).clear().type(secondImage);
        cy.wait(3000);
    }
    
    createGalleryNoDescription(title, image){
        this.createGalleryButton.click();
        this.titleInput.clear().type(title);
        this.descriptionInput.clear();
        this.image.eq(0).clear().type(image);
        this.submitGalleryButton.click();
    }

}

export const createGalleryPage = new CreateGalleryPage();
