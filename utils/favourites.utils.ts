import * as global from '../global.conf';


const request = global.request;
const expect = global.chai.expect;

export class FavouritesUtils {
  async addFavourite(requestBody, endpoint, user, favouriteType) {
    let addSearchResponse;
    await request(endpoint)
      .post(`/Favourites/${favouriteType}.json`)
      .send(requestBody)
      .set('Authorization', `OAuth oauth_consumer_key="${user.consumerKey}", oauth_token="${user.oAuthToken}", oauth_signature_method="PLAINTEXT", oauth_signature="${user.consumerSecret}&${user.oAuthTokenSecret}"`)
      .redirects()
      .expect(200)
      .then(function(res) {
        addSearchResponse = res.body;
      });

      return addSearchResponse;
  }

  async getSearchFavouritesList(endpoint, searchType, user) {
    let searchFavouritesList;
    await  request(endpoint)
    .get(`/Favourites/Searches/${searchType}.json`)
    .set('Authorization', `OAuth oauth_consumer_key="${user.consumerKey}", oauth_token="${user.oAuthToken}", oauth_signature_method="PLAINTEXT", oauth_signature="${user.consumerSecret}&${user.oAuthTokenSecret}"`)
    .redirects()
    .expect(200)
    .then(function(res) {
      searchFavouritesList = res.body.List
    });

    return searchFavouritesList
  }

  async getSellerFavouritesList(endpoint, user) {
    let sellerFavouritesList;
    await  request(endpoint)
    .get(`/Favourites/Sellers.json`)
    .set('Authorization', `OAuth oauth_consumer_key="${user.consumerKey}", oauth_token="${user.oAuthToken}", oauth_signature_method="PLAINTEXT", oauth_signature="${user.consumerSecret}&${user.oAuthTokenSecret}"`)
    .redirects()
    .expect(200)
    .then(function(res) {
      sellerFavouritesList = res.body.List
    });

    return sellerFavouritesList
  }

  async getCategoryFavouritesList(endpoint, user) {
    let categoryFavouritesList;
    await  request(endpoint)
    .get(`/Favourites/Categories.json`)
    .set('Authorization', `OAuth oauth_consumer_key="${user.consumerKey}", oauth_token="${user.oAuthToken}", oauth_signature_method="PLAINTEXT", oauth_signature="${user.consumerSecret}&${user.oAuthTokenSecret}"`)
    .redirects()
    .expect(200)
    .then(function(res) {
      categoryFavouritesList = res.body.List
    });

    return categoryFavouritesList
  }

  async deleteFavourite(endpoint, favouriteId, favouriteType, user) {
    await request(endpoint)
      .delete(`/Favourites/${favouriteId}/${favouriteType}.json`)
      .set('Authorization', `OAuth oauth_consumer_key="${user.consumerKey}", oauth_token="${user.oAuthToken}", oauth_signature_method="PLAINTEXT", oauth_signature="${user.consumerSecret}&${user.oAuthTokenSecret}"`)
      .redirects()
      .expect(200)
      .then(function(res) {
        expect(res.body.Response).to.equal('OK');
        expect(res.body.Removed).to.be.true;
      });
  }

  async updateFavourite(endpoint, favouriteId, favouriteType, emailFrequency, user) {
    await request(endpoint)
      .post(`/Favourites/${favouriteId}/${favouriteType}/${emailFrequency}.json`)
      .set('Authorization', `OAuth oauth_consumer_key="${user.consumerKey}", oauth_token="${user.oAuthToken}", oauth_signature_method="PLAINTEXT", oauth_signature="${user.consumerSecret}&${user.oAuthTokenSecret}"`)
      .redirects()
      .expect(200)
      .then(function(res) {
        expect(res.body.Response).to.equal('OK');
        expect(res.body.Saved).to.be.true;
      });
  }
}