import * as global from '../../global.conf';
import { sandboxEndpoint } from '../../data/endpoints.json';

const request = global.request;
const expect = global.chai.expect;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Retrieve search favourites for a user account', () => {
  it('should return favourited property searches', (done) => {
    request(sandboxEndpoint)
      .get('/Favourites/Searches/Property.json')
      .trustLocalhost()
      .set('Authorization', 'OAuth oauth_consumer_key="55B545DD6F7FAF4D5FB85C634862D3D5", oauth_token="5B7D6C15389634F3D6B0A0CA1486F04F", oauth_signature_method="PLAINTEXT", oauth_signature="535EC9322B0EC0D8F017176F8DBE1F4B&39EAF9B419F2BCE62338BF5379517B58"')
      .redirects()
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.List).to.not.be.null
        expect(res.body.List[0].FavouriteId).to.equal(1256)
        done();
      });
  });
});
