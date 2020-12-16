import * as global from '../../global.conf';
import { sandboxEndpoint } from '../../data/endpoints.json';
import { sandboxUser } from '../../data/users.json';
import { FavouritesUtils } from '../../utils/favourites.utils'

const request = global.request;
const expect = global.chai.expect;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Headers validation', () => {

  it('should return an unauthorized error without valid consumer key and oauth token details', async () => {
    await  request(sandboxEndpoint)
    .get(`/Favourites/Sellers.json`)
    .set('Authorization', `OAuth oauth_consumer_key="invalid", oauth_token="invalid", oauth_signature_method="PLAINTEXT", oauth_signature="invalid&invalid"`)
    .redirects()
    .expect(401)
  });
});
