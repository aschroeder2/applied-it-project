import * as global from '../../global.conf';
import { sandboxEndpoint } from '../../data/endpoints.json';
import { Browser, Page } from 'playwright';
import { HomePage } from '../../page/home.page';

const expect = global.chai.expect;
const { chromium } = require('playwright');
let page: Page;
let browser: Browser;

describe('Add, update, and remove favourites from a user\'s account', () => {

  beforeEach( async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
  }); 

  it('clicking the Favourites menu item should redirect to login if user is not logged in', async () => {
    const homePage: HomePage = new HomePage(page);

    await homePage.goToHomePage('https://www.tmsandbox.co.nz/');
    await homePage.clickFavouritesHeader();

    expect(await homePage.getLoginMessageText()).to.contain('Log in to continue');

    await browser.close();
  });
});
