import { Page } from 'playwright';

export class SellerPage {

  page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async saveThisSeller(): Promise<void> {
    await this.page.waitForSelector('.membersectioncontainer');
    await this.page.click('#ListingsTitle_SaveFavouriteControl_NotSavedButton');
  }
 }
