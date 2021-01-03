import { Page } from 'playwright';

export class PropertyPage {

  page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async selectToRentFilter(): Promise<void> {
    await this.page.click('#PropertyToRentToggle');
  }

  async selectRegion(region: string): Promise<void> {
    await this.page.selectOption('#PropertyRegionSelect', region);
  }

  async selectDistrict(district: string): Promise<void> {
    await this.page.selectOption('#PropertyDistrictSelect', { value: district })
  }

  async clickSearchRentals(): Promise<void> {
    await this.page.click('"Search rentals"');
  }

  async saveFavouriteSearch(): Promise<void> {
    await this.page.waitForSelector('"Search results"')
    await this.page.click('.new-save-favourite');
  }
}
