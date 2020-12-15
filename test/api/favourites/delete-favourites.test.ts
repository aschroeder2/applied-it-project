import * as global from '../../../global.conf';
import { sandboxEndpoint } from '../../../data/endpoints.json';
import { sandboxUser } from '../../../data/users.json';
import { FavouritesUtils } from '../../../utils/favourites.utils'

const request = global.request;
const expect = global.chai.expect;
const favouritesUtils = new FavouritesUtils();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe.only('Delete favourites saved to a user account', () => {

  afterEach(async function() {
    cleanUpSearchFavourite();
    cleanUpSellerFavourite();
    cleanUpCategoryFavourite();
  });

  it('should successfully delete a favourited search', async () => {
    const request = {
          'Email': 0,
          'SearchString': 'category=3399&region=15&district=43&sort_order=PropertyFeature',
          'Type': 4
        };
    const addSearchResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Search');

    expect(addSearchResponse.Saved).to.be.true;

    let favouritedSearchDetails = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'Property', sandboxUser);
    const favouriteId = favouritedSearchDetails[0].FavouriteId

    await favouritesUtils.deleteFavourite(sandboxEndpoint, favouriteId, 'AttributeSearch', sandboxUser);

    favouritedSearchDetails = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'Property', sandboxUser);

    expect(favouritedSearchDetails).to.be.empty;
  });

  it('should successfully delete a favourited seller', async () => {
    const request = {
      'Email': 1,
      "SellerId": 4005383,
    };
    const addSellerResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Seller');

    expect(addSellerResponse.Saved).to.be.true;

    let favouritedSellerDetails = await favouritesUtils.getSellerFavouritesList(sandboxEndpoint, sandboxUser);
    const favouriteId = favouritedSellerDetails[0].FavouriteId

    await favouritesUtils.deleteFavourite(sandboxEndpoint, favouriteId, 'Seller', sandboxUser);

    favouritedSellerDetails = await favouritesUtils.getSellerFavouritesList(sandboxEndpoint, sandboxUser);

    expect(favouritedSellerDetails).to.be.empty;
  });

  it('should successfully delete a favourited category', async () => {
    const request = {
      "Email": 3,
      "CategoryId": 9205
    };
    const addCategoryResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Category');

    expect(addCategoryResponse.Saved).to.be.true;

    let favouritedCateogryDetails = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);
    await new Promise(resolve => setTimeout(resolve, 2000))
    const favouriteId = favouritedCateogryDetails[0].FavouriteId

    await favouritesUtils.deleteFavourite(sandboxEndpoint, favouriteId, 'Category', sandboxUser);

    favouritedCateogryDetails = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);

    expect(favouritedCateogryDetails).to.be.empty;
  });

  it('should return an unsuccessful message when delete request has an invalid favourite id', async () => {
    await request(sandboxEndpoint)
      .delete(`/Favourites/0/Seller.json`)
      .set('Authorization', `OAuth oauth_consumer_key="${sandboxUser.consumerKey}", oauth_token="${sandboxUser.oAuthToken}", oauth_signature_method="PLAINTEXT", oauth_signature="${sandboxUser.consumerSecret}&${sandboxUser.oAuthTokenSecret}"`)
      .redirects()
      .expect(200)
      .then(function(res) {
        expect(res.body.Response).to.equal('ERROR deleting seller_subscription');
        expect(res.body.Removed).to.be.false;
      });
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
