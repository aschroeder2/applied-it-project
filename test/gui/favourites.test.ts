import * as global from '../../global.conf';
import { sandboxHomePage, sandboxEndpoint } from '../../data/endpoints.json';
import { sandboxUser } from '../../data/users.json';
import { Browser, Page } from 'playwright';
import { HomePage } from '../../page/home.page';
import { LoginPage } from '../../page/login.page';
import { PropertyPage } from '../../page/property.page'
import { FavouritesUtils } from '../../utils/favourites.utils'
import { MotorsPage } from '../../page/motors.page';
import { SellerPage } from '../../page/seller.page';
import { CategoryPage } from '../../page/category.page';

const expect = global.chai.expect;
const { chromium } = require('playwright');
let page: Page;
let browser: Browser;

describe.only('Add, update, and remove favourites from a user\'s account', () => {
  const favouritesUtils: FavouritesUtils = new FavouritesUtils();
  let homePage: HomePage;
  let loginPage: LoginPage;

  async function logInToTradeMeSite(): Promise<void> {
    await homePage.goToHomePage(sandboxHomePage);
    await homePage.clickLogin();
    await loginPage.enterLoginCredentials(sandboxUser.email, sandboxUser.password);
    await loginPage.clickLogIn();
  };

  async function deleteAllFavourites(): Promise<void> {
    const allSearchFavourites = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'Property', sandboxUser);
    const allSellerFavourites = await favouritesUtils.getSellerFavouritesList(sandboxEndpoint, sandboxUser);
    const allCategoryFavourites = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);

    for (const favouriteSearch of allSearchFavourites) {
      await favouritesUtils.deleteFavourite(sandboxEndpoint, favouriteSearch.FavouriteId, 'AttributeSearch', sandboxUser);
    };

    for (const favouriteSearch of allSellerFavourites) {
      await favouritesUtils.deleteFavourite(sandboxEndpoint, favouriteSearch.FavouriteId, 'Seller', sandboxUser);
    };

    for (const favouriteSearch of allCategoryFavourites) {
      await favouritesUtils.deleteFavourite(sandboxEndpoint, favouriteSearch.FavouriteId, 'Category', sandboxUser);
    };
  }

  beforeEach( async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
  });

  afterEach( async () => {
    deleteAllFavourites();
    await browser.close();
  });

  it('clicking the Favourites menu item should redirect to login if user is not logged in', async () => {
    const homePage: HomePage = new HomePage(page);
    const loginPage: LoginPage = new LoginPage(page);

    await homePage.goToHomePage(sandboxHomePage);
    await homePage.clickFavouritesHeader();

    expect(await homePage.getLoginMessageText()).to.contain('Log in to continue');
  });

  it('when logged in with no saved favourites, clicking the favourites tab shows a no favourites message for all types', async () => {
    await logInToTradeMeSite();
    await homePage.clickFavouritesHeader();

    expect(await homePage.noSavedSearchesMessage()).to.contain('You have no favourite searches saved.');

    await homePage.switchToCategories();
    expect(await homePage.noSavedCategoriesMessage()).to.contain('You have no favourite categories saved.');

    await homePage.switchToSellers();
    expect(await homePage.noSavedSellersMessage()).to.contain('You have no favourite sellers saved.');
  });

  it('a logged in user can successfully save a search favourite', async () => {
    const propertyPage: PropertyPage = new PropertyPage(page);

    await logInToTradeMeSite();
    await homePage.goToProperty();
    await propertyPage.selectToRentFilter();
    await propertyPage.selectRegion('15');
    await new Promise(resolve => setTimeout(resolve, 500))
    await propertyPage.selectDistrict('43');
    await propertyPage.clickSearchRentals();
    await propertyPage.saveFavouriteSearch();
    await homePage.clickFavouritesHeader();
    
    expect(await homePage.getFavouriteTitle()).to.contain('Rentals: Kapiti Coast, Wellington');    
  });

  it('a logged in user can successfully save a seller favourite', async () => {
    const motorsPage: MotorsPage = new MotorsPage(page);
    const sellerPage: SellerPage = new SellerPage(page);

    await logInToTradeMeSite();
    await homePage.goToMotors();
    await motorsPage.clickCarsForSale();
    await motorsPage.clickFirstCarListing();

    const sellerName = await motorsPage.getSellerName();

    await motorsPage.clickSellerName();
    await sellerPage.saveThisSeller();
    await homePage.clickFavouritesHeader();
    await homePage.switchToSellers();
    
    expect(await homePage.getFavouriteTitle()).to.contain(sellerName);    
  });

  it.only('a logged in user can successfully save a category favourite', async () => {
    const categoryPage: CategoryPage = new CategoryPage(page);

    await logInToTradeMeSite();
    await homePage.clickCategory('Antiques & collectables');
    await categoryPage.clickSubcategory('Tools');
    await categoryPage.favouriteSubcategory();
    await homePage.clickFavouritesHeader();
    await homePage.switchToCategories();
    
    expect(await homePage.getFavouriteTitle()).to.contain('Tools');    
  });
});
