import * as global from '../../../global.conf';
import { sandboxEndpoint } from '../../../data/endpoints.json';
import { sandboxUser } from '../../../data/users.json';
import { FavouritesUtils } from '../../../utils/favourites.utils'

const request = global.request;
const expect = global.chai.expect;
const favouritesUtils = new FavouritesUtils();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Save favourite searches to a user account', () => {

  afterEach(function() {
    cleanUpSearchFavourite();
  });

  it('should successfully save a search with a valid search string', async () => {
    const request = {
          'Email': 0,
          'SearchString': 'category=3399&region=15&district=43&sort_order=PropertyFeature',
          'Type': 4
        };
    const addSearchResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Search');

    expect(addSearchResponse.Saved).to.be.true;
  });

  it('should return a 400 response when an invalid search type is provided', async () => {
    await request(sandboxEndpoint)
      .post('/Favourites/Search.json')
      .send({
        'Email': 0,
        'SearchString': '',
        'Type': 123456789
      })
      .set('Authorization', `OAuth oauth_consumer_key="${sandboxUser.consumerKey}", oauth_token="${sandboxUser.oAuthToken}", oauth_signature_method="PLAINTEXT", oauth_signature="${sandboxUser.consumerSecret}&${sandboxUser.oAuthTokenSecret}"`)
      .redirects()
      .expect(400)
  });

  it('should return message that search is already saved when the same search string is sent twice', async () => {
    const request = {
          'Email': 0,
          'SearchString': 'category=3399&region=15&district=43&sort_order=PropertyFeature',
          'Type': 4
        };
    const addSearchResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Search');
    expect(addSearchResponse.Saved).to.be.true;

    await new Promise(resolve => setTimeout(resolve, 4000))

    const secondAddSearchResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Search');
    expect(secondAddSearchResponse.Saved).to.be.true;
    expect(secondAddSearchResponse.Response).to.equal('You are already subscribed to this search');
  });
});

describe('Save favourite sellers to a user account', () => {

  afterEach(function() {
    cleanUpSellerFavourite();
  });

  it('should successfully save a seller with a valid seller id', async () => {
    const request = {
          'Email': 1,
          "SellerId": 4005383,
        };
    const addSellerResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Seller');

    expect(addSellerResponse.Saved).to.be.true;
    expect(addSellerResponse.FavouriteType).to.equal(6);
    expect(addSellerResponse.Response).to.equal('OK');
  });

  it('should return a no such member message when an invalid seller id is provided', async () => {
    const request = {
      'Email': 1,
      "SellerId": 0,
    };
    const addSellerResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Seller');

    expect(addSellerResponse.Saved).to.be.false;
    expect(addSellerResponse.Response).to.equal('ERROR no such member');
  });

  it('should return message that seller is already saved when the same sellerId is sent twice', async () => {
    const request = {
      'Email': 1,
      "SellerId": 4005383,
    };
    const addSellerResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Seller');
    expect(addSellerResponse.Saved).to.be.true;

    await new Promise(resolve => setTimeout(resolve, 4000))

    const secondAddSellerResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Seller');
    expect(secondAddSellerResponse.Saved).to.be.true;
    expect(secondAddSellerResponse.Response).to.equal('You are already subscribed to this seller.');
  });
});

describe('Save favourite categories to a user account', () => {

  afterEach(function() {
    cleanUpCategoryFavourite();
  });

  it('should successfully save a category with a valid category id', async () => {
    const request = {
      "Email": 0,
      "CategoryId": 9201
    };
    const addCategoryResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Category');

    expect(addCategoryResponse.Saved).to.be.true;
    expect(addCategoryResponse.FavouriteType).to.equal(1);
    expect(addCategoryResponse.Response).to.equal('OK');
  });

  it('should return a 400 response when an invalid category id is provided', async () => {
    await request(sandboxEndpoint)
      .post('/Favourites/Category.json')
      .send({
        'Email': 0,
        "CategoryId": 123456789
      })
      .set('Authorization', `OAuth oauth_consumer_key="${sandboxUser.consumerKey}", oauth_token="${sandboxUser.oAuthToken}", oauth_signature_method="PLAINTEXT", oauth_signature="${sandboxUser.consumerSecret}&${sandboxUser.oAuthTokenSecret}"`)
      .redirects()
      .expect(400)
  });

  it('should return message that category is already saved when the same category id is sent twice', async () => {
    const request = {
      "Email": 0,
      "CategoryId": 9201
    };
    const addCategoryResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Category');
    expect(addCategoryResponse.Saved).to.be.true;

    await new Promise(resolve => setTimeout(resolve, 4000))

    const secondAddCategoryResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Category');
    expect(secondAddCategoryResponse.Saved).to.be.true;
    expect(secondAddCategoryResponse.Response).to.equal('You are already subscribed to this category');
  });
});

async function cleanUpSearchFavourite() {
  const allSearchFavourites = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'Property', sandboxUser);

  allSearchFavourites.forEach( (favouriteSearch) => {
    const favouriteId = favouriteSearch.FavouriteId;

    favouritesUtils.deleteFavourite(sandboxEndpoint, favouriteId, 'AttributeSearch', sandboxUser);
  });
};

async function cleanUpSellerFavourite() {
  const allSellerFavourites = await favouritesUtils.getSellerFavouritesList(sandboxEndpoint, sandboxUser);

  allSellerFavourites.forEach( (favouriteSearch) => {
    const favouriteId = favouriteSearch.FavouriteId;

    favouritesUtils.deleteFavourite(sandboxEndpoint, favouriteId, 'Seller', sandboxUser);
  });
};

async function cleanUpCategoryFavourite() {
  const allSellerFavourites = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);

  allSellerFavourites.forEach( (favouriteSearch) => {
    const favouriteId = favouriteSearch.FavouriteId;

    favouritesUtils.deleteFavourite(sandboxEndpoint, favouriteId, 'Category', sandboxUser);
  });
};
