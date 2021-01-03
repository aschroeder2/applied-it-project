import { Page } from 'playwright';

export class CategoryPage {

  page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async clickSubcategory(subcategory: string): Promise<void> {
    await this.page.click(`//div[@id = 'Subcategories']//a[contains(., "${subcategory}")]`);
  }

  async favouriteSubcategory(): Promise<void> {
    await this.page.click('#ListingsTitle_SaveFavouriteControl_NotSavedButton');
  }
 }
