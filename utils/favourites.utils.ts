import * as global from '../global.conf';


const request = global.request;
const expect = global.chai.expect;

export class FavouritesUtils {
  async addSearchFavourite(requestBody, endpoint, user) {
    let addSearchResponse;
    await request(endpoint)
      .post('/Favourites/Search.json')
      .send(requestBody)
      .set('Authorization', `OAuth oauth_consumer_key="${user.consumerKey}", oauth_token="${user.oAuthToken}", oauth_signature_method="PLAINTEXT", oauth_signature="${user.consumerSecret}&${user.oAuthTokenSecret}"`)
      .redirects()
      .expect(200)
      .then(function(res) {
        addSearchResponse = res.body;
      });

      return addSearchResponse;
  }
}