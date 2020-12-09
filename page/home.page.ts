import { Page } from 'playwright';

export class HomePage {

  page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async goToHomePage(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async clickFavouritesHeader(): Promise<void> {
    await this.page.click('#SiteHeader_SiteTabs_BarOfSearch_favouritesToggleActivateButton')
  }

  async getLoginMessageText(): Promise<string> {
    return await this.page.textContent('#LoginContinueHeading')
  }
}