import { Page } from 'playwright';

export class LoginPage {

  page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async enterLoginCredentials(email: string, password: string): Promise<void> {
    await this.page.fill('#page_email', email);
    await this.page.fill('#page_password', password);
  }

  async clickLogIn(): Promise<void>{
    await this.page.click('#LoginPageButton');
  }
}
