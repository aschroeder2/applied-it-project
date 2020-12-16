import * as global from '../../../global.conf';
import { sandboxEndpoint } from '../../../data/endpoints.json';
import { sandboxUser } from '../../../data/users.json';
import { FavouritesUtils } from '../../../utils/favourites.utils';

const request = global.request;
const expect = global.chai.expect;
const favouritesUtils = new FavouritesUtils();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Retrieve search favourites for an user account', async () => {
  afterEach(async function() {
    await cleanUpSearchFavourite();
  });

  it('should return favourited property search', async () => {
    const request = {
      'Email': 0,
      'SearchString': 'category=3399&region=15&district=43&sort_order=PropertyFeature',
      'Type': 4
    };
    const addSearchResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Search');
    expect(addSearchResponse.Saved).to.be.true;

    const favouriteSearches = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'Property', sandboxUser);
    expect(favouriteSearches[0].SearchString).to.equal('category=3399&region=15&district=43&sort_order=PropertyFeature');
  });

  it('should return favourited general search', async () => {
    const request = {
      'Email': 0,
      'SearchString': 'search_string=Karen%20Walker',
      'Type': 0
    };
    const addSearchResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Search');
    expect(addSearchResponse.Saved).to.be.true;

    const favouriteSearches = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'General', sandboxUser);
    expect(favouriteSearches[0].SearchString).to.equal('search_string=Karen%20Walker');
  });

  it('should return favourited job search', async () => {
    const request = {
      'Email': 0,
      'SearchString': 'it+jobs&generalSearch_keypresses=7&generalSearch_suggested=0&generalSearch_suggestedCategory=',
      'Type': 13
    };
    const addSearchResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Search');
    expect(addSearchResponse.Saved).to.be.true;
    const newFavouriteId = addSearchResponse.SearchId

    const favouriteSearches = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'Job', sandboxUser);
    expect(favouriteSearches[0].FavouriteId).to.equal(newFavouriteId);
  });

  it('should return favourited motors search', async () => {
    const request = {
      'Email': 0,
      'SearchString': 'sort_order=MotorsFeatureFirst',
      'Type': 1
    };
    const addSearchResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Search');
    expect(addSearchResponse.Saved).to.be.true;

    const favouriteSearches = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'Motor', sandboxUser);
    expect(favouriteSearches[0].SearchString).to.equal('sort_order=MotorsFeatureFirst');
  });

  it('should return all searches when multiple search types are favourited', async () => {
    const motorsRequest = {
      'Email': 0,
      'SearchString': 'boat',
      'Type': 2
    };
    const jobsRequest = {
      'Email': 0,
      'SearchString': 'it+jobs&generalSearch_keypresses=7&generalSearch_suggested=0&generalSearch_suggestedCategory=',
      'Type': 13
    };
    const generalRequest = {
      'Email': 0,
      'SearchString': 'search_string=Karen%20Walker',
      'Type': 0
    };
    const propertyRequest = {
      'Email': 0,
      'SearchString': 'category=3399&region=15&district=43&sort_order=PropertyFeature',
      'Type': 4
    };
    const addMotorsSearchResponse = await favouritesUtils.addFavourite(motorsRequest, sandboxEndpoint, sandboxUser, 'Search');
    expect(addMotorsSearchResponse.Saved).to.be.true;
    const motorsSearchFavouriteId = addMotorsSearchResponse.SearchId;
    await new Promise(resolve => setTimeout(resolve, 2000));
  
    const addJobsSearchResponse = await favouritesUtils.addFavourite(jobsRequest, sandboxEndpoint, sandboxUser, 'Search');
    expect(addJobsSearchResponse.Saved).to.be.true;
    const jobsSearchFavouriteId = addJobsSearchResponse.SearchId;
    await new Promise(resolve => setTimeout(resolve, 2000));
  
    const addGeneralSearchResponse = await favouritesUtils.addFavourite(generalRequest, sandboxEndpoint, sandboxUser, 'Search');
    expect(addGeneralSearchResponse.Saved).to.be.true;
    const generalSearchFavouriteId = addGeneralSearchResponse.SearchId;
    await new Promise(resolve => setTimeout(resolve, 2000));
  
    const addPropertySearchResponse = await favouritesUtils.addFavourite(propertyRequest, sandboxEndpoint, sandboxUser, 'Search');
    expect(addPropertySearchResponse.Saved).to.be.true;
    const propertySearchFavouriteId = addPropertySearchResponse.SearchId;
    await new Promise(resolve => setTimeout(resolve, 3000));
  
    const expectedFavouriteIds = [motorsSearchFavouriteId, jobsSearchFavouriteId, generalSearchFavouriteId, propertySearchFavouriteId]

    const favouriteSearches = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'All', sandboxUser);
    expect(favouriteSearches).to.have.lengthOf(4);
    
    let returnedSearchIds: Array<number> = []

    await favouriteSearches.forEach(favouriteSearch => {
      returnedSearchIds.push(favouriteSearch.FavouriteId)
    });

    expect(returnedSearchIds).to.have.members(expectedFavouriteIds);
  });

  it('should return an empty favourites list when a user does not have any searches favourited', async () => {
    await cleanUpSearchFavourite();
    const favouriteSearches = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'All', sandboxUser);
    expect(favouriteSearches).to.be.empty;
  });
});

describe('Retrieve seller favourites for an user account', () => {
  afterEach(async function() {
    await cleanUpSellerFavourite();
  });

  it('should return a favourited seller', async () => {
    const request = {
      'Email': 1,
      "SellerId": 4005383,
    };
    const addSellerResponse = await favouritesUtils.addFavourite(request, sandboxEndpoint, sandboxUser, 'Seller');
    expect(addSellerResponse.Saved).to.be.true;

    const favouritedSellers = await favouritesUtils.getSellerFavouritesList(sandboxEndpoint, sandboxUser)
    expect(favouritedSellers[0].MemberId).to.equal(4005383)
  });

  it('should return an empty favourites list when a user does not have any sellers favourited', async () => {
    const favouritedSellers = await favouritesUtils.getSellerFavouritesList(sandboxEndpoint, sandboxUser)
    expect(favouritedSellers).to.be.empty
  });
});

describe('Retrieve category favourites for an user account', () => {
  afterEach(async function() {
    await cleanUpCategoryFavourite();
  });

  it('should return a favourited category', async () => {
    const addCategoryRequest = {
      "Email": 3,
      "CategoryId": 9205
    };
    const addCategoryResponse = await favouritesUtils.addFavourite(addCategoryRequest, sandboxEndpoint, sandboxUser, 'Category');
    expect(addCategoryResponse.Saved).to.be.true;

    const favouritedCategories = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);
    expect(favouritedCategories[0].CategoryId).to.equal(9205);
  });

  it('should return an empty favourites list when a user does not have any categories favourited', async () => {
    const favouritedCategories = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser)
    expect(favouritedCategories).to.be.empty
  });
});

async function cleanUpSearchFavourite() {
  let allSearchFavourites = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'All', sandboxUser);

  for (const favourite of allSearchFavourites) {
    try {
      await favouritesUtils.deleteFavourite(sandboxEndpoint, favourite.FavouriteId, 'AttributeSearch', sandboxUser);
    } catch(error) {
      console.log(error.toString())
    }
    try {
      await favouritesUtils.deleteFavourite(sandboxEndpoint, favourite.FavouriteId, 'Search', sandboxUser);
    } catch(error) {
      console.log(error.toString())
    }
  }

  allSearchFavourites = await favouritesUtils.getSearchFavouritesList(sandboxEndpoint, 'All', sandboxUser);
  await expect(allSearchFavourites).to.be.empty
};

async function cleanUpSellerFavourite() {
  const allSellerFavourites = await favouritesUtils.getSellerFavouritesList(sandboxEndpoint, sandboxUser);

  await allSellerFavourites.forEach( async (favouriteSearch) => {
    const favouriteId = favouriteSearch.FavouriteId;

    await favouritesUtils.deleteFavourite(sandboxEndpoint, favouriteId, 'Seller', sandboxUser);
  });
};

async function cleanUpCategoryFavourite() {
  const allSellerFavourites = await favouritesUtils.getCategoryFavouritesList(sandboxEndpoint, sandboxUser);

  await allSellerFavourites.forEach( async (favouriteSearch) => {
    const favouriteId = favouriteSearch.FavouriteId;

    await favouritesUtils.deleteFavourite(sandboxEndpoint, favouriteId, 'Category', sandboxUser);
  });
};
