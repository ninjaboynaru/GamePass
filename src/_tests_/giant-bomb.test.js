import GiantBombAPI from '../js/giant-bomb.js';

const mockResponse = {mockResponse:'mock response value'};
const mockError = {mockError:'mock error value'};
const mockAPIResources = ['games', 'platforms'];
const mockCategoryData = {
	"name":"Playstation 2 Games",
	"description":"Random Playstation 2 Games",
	"randomizeOffset":true,
	"randomOffsetMin":0,
	"randomOffsetMax":1500,
	"options": {
		"resource":"games",
		"filter":[ {"field":"platforms", "value":19} ],
		"fields": ["id", "name", "deck", "image", "original_release_date"]
	}
}


let TEST_SIMULATE_ERROR = false;

GiantBombAPI.SetTestEnvJSONPFunction(jsonpMock);
function jsonpMock(url, options, callback) {
	if(TEST_SIMULATE_ERROR == true)
	{
		callback(mockError, undefined);
	}
	else
	{
		callback(undefined, mockResponse);
	}
}



test('GiantBomb.SearchCategory() resolves with mock API response', function() {

	let searchPromise = GiantBombAPI.SearchCategory(mockCategoryData, 10);

	return expect(searchPromise).resolves.toMatchObject(mockResponse);
});

test('GiantBomb.SearchCategory() rejects with mock error', function() {
	TEST_SIMULATE_ERROR = true;
	let searchPromise = GiantBombAPI.SearchCategory(mockCategoryData, 10);

	return expect(searchPromise).rejects.toMatchObject(mockError);
});



test('GiantBomb.SearchQuery() resolves with mock API response', function() {
	TEST_SIMULATE_ERROR = false;
	let searchPromise = GiantBombAPI.SearchQuery('Halo 3', mockAPIResources, {}, 10);

	return expect(searchPromise).resolves.toMatchObject(mockResponse);
});

test('GiantBomb.SearchQuery() rejects with mock error', function() {
	TEST_SIMULATE_ERROR = true;
	let searchPromise = GiantBombAPI.SearchQuery('Halo 3', mockAPIResources, {}, 10);

	return expect(searchPromise).rejects.toMatchObject(mockError);
});












