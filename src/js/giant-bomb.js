import jsonp from 'jsonp';
import apiKeys from './config/api-keys.json';

/**
 * @module
 *
 * Giant Bomb API wrapper module for sending API requests and parsing options objects.
 * Uses JSONP to avoid CORS issues.
 *
 * The API request requires that the name of the JSONP callback being used is sent, thus
 * a JSONP library must be used that allows the JSONP callback name to be defined/overieded.
 *
 * [GiantBomb API Docs]{@link https://www.giantbomb.com/api/documentation}
 *
 * @requires jsonp (npm package "jsonp")
 */
const GiantBombAPI = new function() {
	const _apiKey = apiKeys.GIANT_BOMB_API_KEY;
	const _baseURL = 'https://www.giantbomb.com/api/';

	/**
	 * @private
	 * Image to use if none is available.
	 */
	const _defaultImgPath = '../images/no-img-default.png';

	/**
	 * @private
	 * Giant Bomb API results that do not
	 * have images return image urls that end in this.
	 */
	const _apiDefaultImgEnding = '2853576-gblogo.png';

	const _defaultOptions = {
		resource: 'game',
		id: '',
		fields: ['id', 'name', 'deck'],
		offset: '',
		limit: 10,
		filter: '',
		sort: '',
		query: '',
		resources: ['game']
	};

	/**
	 * Alternate JSONP function used to make the request when running tests.
	 * Tests should change this property to a mock function so they can mock API responses.
	 */
	let _testEnvJSONPFunction;
	this.SetTestEnvJSONPFunction = function(testingMockFn) {
		if (typeof testingMockFn == 'function') {
			_testEnvJSONPFunction = testingMockFn;
		} else {
			throw new Error(
				'Atempting to set GiantBombAPI.SetTestEnvJSONPFunction() called with a non function argument'
			);
		}
	};

	/**
	 * @function
	 * @private
	 * Return a random int between min and max
	 */
	function _RandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * @function
	 * @private
	 * Return a random string to be used for a JSONP request callback name.
	 */
	function _RandomJsonpCallbackName() {
		const minInt = 1000;
		const maxInt = 5000;
		return `json_callback_${_RandomInt(minInt, maxInt)}_${_RandomInt(minInt, maxInt)}`;
	}

	/**
	 * @function
	 * @private
	 * Parse an array of APIFilter objects into a comma , separated string of "field:value" pairs to
	 * be used in the API request url.
	 *
	 * @param {APIFilter[]} Array of APIFilter objects
	 * @returns {string} Comma separated string of "field:value,field:value" pairs
	 */
	function _ReduceFilterArrayToString(filterArray) {
		if (Array.isArray(filterArray) == false) {
			return '';
		}

		return filterArray.reduce(function(accumulator, filterObject, filterObjectIndex) {
			let lastComma = ',';
			if (filterObjectIndex == filterArray.length - 1) {
				lastComma = '';
			}
			return `${accumulator}${filterObject.field}:${filterObject.value}${lastComma}`;
		}, '');
	}

	/**
	 * @function
	 * @private
	 * Parse an array of APISort objects into a comma , separated string of "field:direction" pairs
	 * to be used in the API request url.
	 *
	 * @param {APISort[]} Array of APISort objects
	 * @returns {string} Comma separated string of "field:direction,field:direction" pairs
	 */
	function _ReduceSortArrayToString(sortArray) {
		if (Array.isArray(sortArray) == false) {
			return '';
		}

		return sortArray.reduce(function(accumulator, sortObject, sortObjectIndex) {
			let lastComma = ',';
			if (sortObjectIndex == sortArray.length - 1) {
				lastComma = '';
			}
			return `${accumulator}${sortObject.field}:${sortObject.direction}${lastComma}`;
		}, '');
	}

	/**
	 * @function
	 * @private
	 * Build and return the API request URL as a string.
	 * The request is made using JSONP to avoid CORS issues, thus the name of the JSONP callback being used is
	 * required as the second parameter.
	 *
	 * No options validity or type checking is performed, thus invalid options will be permitted and may
	 * result in a failed API request or an error.
	 *
	 * @param {APIOptions} options - API request options. Fields not specified in these options will revert to the default options.
	 * @param {string} jsonpCallbackName - Name of the JSOP callback that will be used for
	 * for this request. Should be unique.
	 *
	 */
	function _BuildRequestURL(options, jsonpCallbackName) {
		let finalOptions = Object.assign({}, _defaultOptions, options);
		finalOptions.fields = finalOptions.fields.join(',');
		finalOptions.filter = _ReduceFilterArrayToString(finalOptions.filter);
		finalOptions.sort = _ReduceSortArrayToString(finalOptions.sort);
		finalOptions.resources = finalOptions.resources.join(',');

		let url = `${_baseURL}/${finalOptions.resource}/${finalOptions.id}/?api_key=${_apiKey}&field_list=${
			finalOptions.fields
		}&`;
		url += `offset=${finalOptions.offset}&limit=${finalOptions.limit}&filter=${finalOptions.filter}&`;
		url += `sort=${finalOptions.sort}&query=${finalOptions.query}&resources=${finalOptions.resources}&`;
		url += `format=jsonp&json_callback=${jsonpCallbackName}`;

		url = url.replace(/\/\//g, '/');

		return url;
	}

	/**
	 * @function
	 * @private
	 * Replaces the default fallback images in an API response with custom defined default image.
	 * Modifies the apiResponse in place but also returns it.
	 *
	 * @param {object} apiResponse - Reference to the api response
	 * @returns {object} - reference to the modified apiResponse
	 */
	function _ReplaceDefaultImages(apiResponse) {
		let apiResults = apiResponse.results;

		if (apiResults == undefined) {
			return;
		}

		apiResults.forEach(function(currentResult) {
			let resultImageKeys = Object.keys(currentResult.image);

			for (let imageKey of resultImageKeys) {
				if (currentResult.image[imageKey].endsWith(_apiDefaultImgEnding)) {
					currentResult.image[imageKey] = _defaultImgPath;
				}
			}
		});

		return apiResponse;
	}

	/**
	 * @function
	 * @private
	 * Make an API request and return a promise the resolves with the api
	 * response object rejects with an error.
	 *
	 * Request is sent using JSONP.
	 * Rejected error may be JSONP error or API error.
	 *
	 * @param {APIOptions} options - API request options. Fields not specified in these options will
	 * be revert to the default options
	 *
	 * @returns {APIResponsePromise}
	 */
	const _MakeAPIRequest = function(options) {
		const jsonpCallbackName = _RandomJsonpCallbackName();
		const requestURL = _BuildRequestURL(options, jsonpCallbackName);

		let jsonpRequestFn = jsonp;
		if (typeof _testEnvJSONPFunction == 'function') {
			jsonpRequestFn = _testEnvJSONPFunction;
		}

		return new Promise(function(resolve, reject) {
			jsonpRequestFn(requestURL, { name: jsonpCallbackName }, OnRequestResponse);

			function OnRequestResponse(error, response) {
				if (error) {
					reject(error);
				} else {
					_ReplaceDefaultImages(response);
					resolve(response);
				}
			}
		});
	};

	/**
	 * @function
	 * @public
	 *
	 * Perform an API search based on a category object and the options defined within it.
	 * @param {APISearchCategory} categoryObject
	 * @param {number=} resultsLimit - (default 10) Maximum number of results to return (overides the categoryObject options' limit)
	 *
	 * @returns {APIResponsePromise}
	 */
	this.SearchCategory = function(categoryObject, resultsLimit = 10) {
		let requestOptions = Object.assign({}, categoryObject.options, { limit: resultsLimit });

		if (categoryObject.randomizeOffset == true) {
			const randomOffset = _RandomInt(categoryObject.randomOffsetMin, categoryObject.randomOffsetMax);
			Object.assign(requestOptions, { offset: randomOffset });
		}

		return _MakeAPIRequest(requestOptions);
	};

	/**
	 * @function
	 * @public
	 *
	 * Perform an API search for a query string on a specific resource.
	 *
	 * @param {string} query - String to search for
	 * @param {string[]} resources - GiantBomb API resources to search for query in. example(['games', 'platforms'])
	 * @param {APIOptions} options - Aditional options for the search query. Query and Resources options defined
	 * here will NOT overried the query and resource arguments.
	 * @param {number=} resultsLimit - (default 10) Maximum number of results to return (overides the options' limit)
	 *
	 * @returns {APIResponsePromise}
	 */
	this.SearchQuery = function(query, resources, options, resultLimit = 10) {
		const requestOptions = Object.assign({}, options, {
			query: query,
			resources: resources,
			limit: resultLimit,
			resource: 'search'
		});
		return _MakeAPIRequest(requestOptions);
	};
}();

export default GiantBombAPI;
