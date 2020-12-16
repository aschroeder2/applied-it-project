import * as global from '../../../global.conf';
import { sandboxEndpoint } from '../../../data/endpoints.json';
import { sandboxUser } from '../../../data/users.json';
import { FavouritesUtils } from '../../../utils/favourites.utils'

const request = global.request;
const expect = global.chai.expect;
const favouritesUtils = new FavouritesUtils();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Update favourite searches saved to a user account', () => {

  afterEach(async function() {
    await cleanUpSearchFavourite();
  });

  it('should successfully update the email frequency for a favourited search', async () => {
    const request = {
          'Email': 0,
          'SearchString': 'category=3399&region=15&district=43&sort_order=PropertyFeature',
          'Type': 4
        };
    const addSearchResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Search');

    expect(addSearchResponse.Saved).to.be.true;

    let favouritedSearchDetails = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'Property', sandboxUser);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const favouriteId = favouritedSearchDetails[0].FavouriteId

    expect(favouritedSearchDetails[0].EmailOptions).to.equal(0);

    await favouritesUtils.updateFavourite(sandboxEndpoint, favouriteId, 'AttributeSearch', 'Daily', sandboxUser);
    favouritedSearchDetails = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'Property', sandboxUser);

    expect(favouritedSearchDetails[0].EmailOptions).to.equal(1);
  });
});

describe('Update favourite sellers saved to a user account', () => {

  afterEach(async function() {
    await cleanUpSellerFavourite();
  });

  it('should successfully update the email frequency for a favourited seller', async () => {
    const request = {
      'Email': 1,
      "SellerId": 4005383,
    };
    const addSellerResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Seller');

    expect(addSellerResponse.Saved).to.be.true;

    let favouritedSellerDetails = await favouritesUtils.getSellerFavouritesList(sandboxEndpoint, sandboxUser);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const favouriteId = favouritedSellerDetails[0].FavouriteId

    expect(favouritedSellerDetails[0].EmailOptions).to.equal(1);

    await favouritesUtils.updateFavourite(sandboxEndpoint, favouriteId, 'Seller', 'Every3Days', sandboxUser);
    favouritedSellerDetails = await favouritesUtils.getSellerFavouritesList(sandboxEndpoint, sandboxUser);

    expect(favouritedSellerDetails[0].EmailOptions).to.equal(3);
  });
});

describe('Update favourite categories saved to a user account', () => {

  afterEach(async function() {
    await cleanUpCategoryFavourite();
  });

  it('should successfully update the email frequency for a favourited category', async () => {
    const request = {
      "Email": 3,
      "CategoryId": 9201
    };
    const addCategoryResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Category');

    expect(addCategoryResponse.Saved).to.be.true;

    let favouritedCateogryDetails = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const favouriteId = favouritedCateogryDetails[0].FavouriteId

    expect(favouritedCateogryDetails[0].EmailOptions).to.equal(3);

    await favouritesUtils.updateFavourite(sandboxEndpoint, favouriteId, 'Category', 'Weekly', sandboxUser);
    favouritedCateogryDetails = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);

    expect(favouritedCateogryDetails[0].EmailOptions).to.equal(7);
  });
});

describe('A favourite saved to a user account can be updated to any email frequency', () => {

  afterEach(async function() {
    await cleanUpCategoryFavourite();
  });

  it('should successfully update the email frequency to "None"', async () => {
    const request = {
      "Email": 3,
      "CategoryId": 9201
    };
    const addCategoryResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Category');

    expect(addCategoryResponse.Saved).to.be.true;

    let favouritedCateogryDetails = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const favouriteId = favouritedCateogryDetails[0].FavouriteId

    expect(favouritedCateogryDetails[0].EmailOptions).to.equal(3);

    await favouritesUtils.updateFavourite(sandboxEndpoint, favouriteId, 'Category', 'None', sandboxUser);
    favouritedCateogryDetails = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);

    expect(favouritedCateogryDetails[0].EmailOptions).to.equal(0);
  });

  it('should successfully update the email frequency to "Daily"', async () => {
    const request = {
      "Email": 7,
      "CategoryId": 9202
    };
    const addCategoryResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Category');

    expect(addCategoryResponse.Saved).to.be.true;

    let favouritedCateogryDetails = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const favouriteId = favouritedCateogryDetails[0].FavouriteId

    expect(favouritedCateogryDetails[0].EmailOptions).to.equal(7);

    await favouritesUtils.updateFavourite(sandboxEndpoint, favouriteId, 'Category', 'Daily', sandboxUser);
    favouritedCateogryDetails = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);

    expect(favouritedCateogryDetails[0].EmailOptions).to.equal(1);
  });

  it('should successfully update the email frequency to "Every3Days"', async () => {
    const request = {
      "Email": 0,
      "CategoryId": 9203
    };
    const addCategoryResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Category');

    expect(addCategoryResponse.Saved).to.be.true;

    let favouritedCateogryDetails = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const favouriteId = favouritedCateogryDetails[0].FavouriteId

    expect(favouritedCateogryDetails[0].EmailOptions).to.equal(0);

    await favouritesUtils.updateFavourite(sandboxEndpoint, favouriteId, 'Category', 'Every3Days', sandboxUser);
    favouritedCateogryDetails = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);

    expect(favouritedCateogryDetails[0].EmailOptions).to.equal(3);
  });

  it('should successfully update the email frequency to "Weekly"', async () => {
    const request = {
      "Email": 1,
      "CategoryId": 9204
    };
    const addCategoryResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Category');

    expect(addCategoryResponse.Saved).to.be.true;

    let favouritedCateogryDetails = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const favouriteId = favouritedCateogryDetails[0].FavouriteId

    expect(favouritedCateogryDetails[0].EmailOptions).to.equal(1);

    await favouritesUtils.updateFavourite(sandboxEndpoint, favouriteId, 'Category', 'Weekly', sandboxUser);
    favouritedCateogryDetails = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);

    expect(favouritedCateogryDetails[0].EmailOptions).to.equal(7);
  });

  it('should return an update unsuccessful response when the favourite id is invalid', async () => {
    await request(sandboxEndpoint)
      .post(`/Favourites/0/Seller/Daily.json`)
      .set('Authorization', `OAuth oauth_consumer_key="${sandboxUser.consumerKey}", oauth_token="${sandboxUser.oAuthToken}", oauth_signature_method="PLAINTEXT", oauth_signature="${sandboxUser.consumerSecret}&${sandboxUser.oAuthTokenSecret}"`)
      .redirects()
      .expect(200)
      .then(function(res) {
        expect(res.body.Response).to.equal('ERROR updating category_subscription');
      });
  });

  it('should return an update unsuccessful response when the email frequency is invalid', async () => {
    const addFavouriteRequest = {
      "Email": 1,
      "CategoryId": 9206
    };
    const addCategoryResponse = await favouritesUtils.addFavourite(addFavouriteRequest, sandboxEndpoint, sandboxUser, 'Category');

    expect(addCategoryResponse.Saved).to.be.true;

    let favouritedCateogryDetails = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const favouriteId = favouritedCateogryDetails[0].FavouriteId

    await request(sandboxEndpoint)
      .post(`/Favourites/${favouriteId}/Category/Invalid.json`)
      .set('Authorization', `OAuth oauth_consumer_key="${sandboxUser.consumerKey}", oauth_token="${sandboxUser.oAuthToken}", oauth_signature_method="PLAINTEXT", oauth_signature="${sandboxUser.consumerSecret}&${sandboxUser.oAuthTokenSecret}"`)
      .redirects()
      .expect(200)
      .then(function(res) {
        expect(res.body.Response).to.equal('ERROR updating category_subscription');
      });
  });
});

async function cleanUpSearchFavourite() {
  const allSearchFavourites = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'Property', sandboxUser);

  await allSearchFavourites.forEach( (favouriteSearch) => {
    const favouriteId = favouriteSearch.FavouriteId;

    favouritesUtils.deleteFavourite(sandboxEndpoint, favouriteId, 'AttributeSearch', sandboxUser);
  });
};

async function cleanUpSellerFavourite() {
  const allSellerFavourites = await favouritesUtils.getSellerFavouritesList(sandboxEndpoint, sandboxUser);

  await allSellerFavourites.forEach( (favouriteSearch) => {
    const favouriteId = favouriteSearch.FavouriteId;

    favouritesUtils.deleteFavourite(sandboxEndpoint, favouriteId, 'Seller', sandboxUser);
  });
};

async function cleanUpCategoryFavourite() {
  const allSellerFavourites = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);

  await allSellerFavourites.forEach( (favouriteSearch) => {
    const favouriteId = favouriteSearch.FavouriteId;

    favouritesUtils.deleteFavourite(sandboxEndpoint, favouriteId, 'Category', sandboxUser);
  });
};
