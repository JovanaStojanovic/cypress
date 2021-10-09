export default class CreateGalleryPage {
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

    get imageInput(){
        return cy.get('input[type="url"]').eq(0);
    }

    get secondImageInput(){
        return cy.get('input[type="url"]').eq(1);
    }

    get thirdImageInput(){
        return cy.get('input[type="url"]').eq(2);
    }
    get addImageButton(){
        return cy.get('button[type="button"]').eq(2);
    }
    get buttonUp(){
        return cy.get('button[class="input-buttons"]').eq(0);
    }
    get buttonDown(){
        return cy.get('button[class="input-buttons"]').eq(1);
    }
    get lastButtonUp(){
        return cy.get('button[class="input-buttons"]').eq(4);
    }
    get lastButtonDown(){
        return cy.get('button[class="input-buttons"]').eq(5);
    }
    createGallery(title, description, image){
        this.createGalleryButton.click();
        this.titleInput.clear().type(title);
        this.descriptionInput.clear().type(description);
        this.imageInput.clear().type(image);
        this.submitGalleryButton.click();
    }

    createGalleryNoUrl(title, description){
        this.createGalleryButton.click();
        this.titleInput.clear().type(title);
        this.descriptionInput.clear().type(description);
        this.imageInput.clear();
        this.submitGalleryButton.click();
    }
    createGalleryTwoUrls(title, description, image, secondImage){
        this.createGalleryButton.click();
        this.titleInput.clear().type(title);
        this.descriptionInput.clear().type(description);
        this.imageInput.clear().type(image);
        this.secondImageInput.clear().type(secondImage);
        this.submitGalleryButton.click();
    }

    checkButton(title, description, image, secondImage){
        this.createGalleryButton.click();
        this.titleInput.clear().type(title);
        this.descriptionInput.clear().type(description);
        this.imageInput.clear().type(image);
        this.addImageButton.click();
        this.secondImageInput.clear().type(secondImage);
        cy.wait(3000);
    }
    
    createGalleryNoDescription(title, image){
        this.createGalleryButton.click();
        this.titleInput.clear().type(title);
        this.descriptionInput.clear();
        this.imageInput.clear().type(image);
        this.submitGalleryButton.click();
    }

}

export const createGalleryPage = new CreateGalleryPage();