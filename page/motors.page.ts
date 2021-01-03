import { Page } from 'playwright';

export class MotorsPage {

  page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async clickCarsForSale(): Promise<void> {
    await this.page.click('"Cars for sale"');
  }

  async clickFirstCarListing(): Promise<void> {
    await this.page.waitForSelector('"Used Cars"')
    await this.page.click('.tmm-search-card-list-view__link');
  }

  async getSellerName(): Promise<string> {
    return await this.page.textContent('#SellerProfile_MemberNicknameLink');
  }

  async clickSellerName(): Promise<void> {
    await this.page.click('#SellerProfile_MemberNicknameLink');
  }
 }
