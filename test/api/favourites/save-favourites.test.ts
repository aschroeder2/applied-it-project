import * as global from '../../../global.conf';
import { sandboxEndpoint } from '../../../data/endpoints.json';
import { sandboxUser } from '../../../data/users.json';
import { FavouritesUtils } from '../../../utils/favourites.utils'

const request = global.request;
const expect = global.chai.expect;
const favouritesUtils = new FavouritesUtils();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe.only('Save favourite searches to a user account', () => {
  it('should successfully save a search with a valid search string', async () => {
    const request = {
          'Email': 0,
          'SearchString': 'category=3399&region=15&district=43&sort_order=PropertyFeature',
          'Type': 4
        };
    const addSearchResponse = await favouritesUtils.addSearchFavourite(request, sandboxEndpoint, sandboxUser);

    expect(addSearchResponse.Saved).to.be.true;
  });
});
