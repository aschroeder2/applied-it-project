import { ElementHandle, Page } from 'playwright';

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

  async clickLogin(): Promise<void> {
    await this.page.click('#LoginLink')
  }

  async noSavedSearchesMessage(): Promise<string> {
    return await this.page.textContent('#HaveNoSearchesDiv');
  }

  async noSavedCategoriesMessage(): Promise<string> {
    return await this.page.textContent('#HaveNoCategoriesDiv');
  }

  async noSavedSellersMessage(): Promise<string> {
    return await this.page.textContent('#HaveNoSellersDiv');
  }

  async switchToCategories(): Promise<void> {
    await this.page.click('//button[contains(., "Categories")]')
  }

  async switchToSellers(): Promise<void> {
    await this.page.click('//button[contains(., "Sellers")]')
  }

  async goToProperty(): Promise<void> {
    await this.page.click('#SearchTabs1_PropertyLink')
  }

  async getFavouriteTitle(): Promise<string> {
    return await this.page.textContent('#favouriteTitle');
  }

  async goToMotors(): Promise<void> {
    await this.page.click('#SearchTabs1_MotorsLink');
  }

  async clickCategory(category: string): Promise<void> {
    await this.page.click(`//div[@id = "main-box-categories"]//a[contains(., "${category}")]`)
  } 
}
