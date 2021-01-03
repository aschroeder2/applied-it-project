import { ElementHandle, Page } from 'playwright';
import { sandboxHomePage } from '../data/endpoints.json';

export class FavouritesPage {

  page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async goToFavouritesPage(): Promise<void> {
    await this.page.goto(sandboxHomePage + 'MyTradeMe/Favourites.aspx')
  }

  async updateEmailFrequency(favouriteTitle: string, newFrequency: string): Promise<void> {
    await this.page.waitForSelector('#favourites');
    
    const favouriteRow = await this.page.$(`//div[@id = "favourites"]//tr[contains(., "${favouriteTitle}")]`);
    const frequencyLink = await favouriteRow.$('.status');
    const newFrequencyOption = await favouriteRow.$(`//li[contains(., "${newFrequency}")]`)

    await frequencyLink.click();
    await newFrequencyOption.click();
  }

  async getEmailFrequency(favouriteTitle: string): Promise<string> {
    await this.page.waitForSelector('#favourites');

    const favouriteRow = await this.page.$(`//div[@id = "favourites"]//tr[contains(., "${favouriteTitle}")]`);
    const frequencyLink = await favouriteRow.$('.status');

    return await frequencyLink.textContent();
  }

  async selectSellersTab(): Promise<void> {
    await this.page.click('//a[contains(., "Sellers")]');
  }

  async selectCategoriesTab(): Promise<void> {
    await this.page.click('//a[contains(., "Categories")]');
  }

  async removeFavourite(favouriteTitle: string): Promise<void> {
    await this.page.waitForSelector('#favourites');
    
    const favouriteRow = await this.page.$(`//div[@id = "favourites"]//tr[contains(., "${favouriteTitle}")]`);
    const removeLink = await favouriteRow.$('//a[contains(., "Remove")]');

    await removeLink.click();
  }

  async favouritesTabSectionText(): Promise<string> {
    return await this.page.textContent('#mainContent');
  }
 }
