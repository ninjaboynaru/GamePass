/**
 * @typedef APIFilter
 * @type {object}
 * @property {string} field - The API resource field to filter by
 * @property {string} value - The value to filter that field by
 * @example {field:"platforms", value:45} // Only show XBOX One games (145 is XBOX Ones' API ID)
 *
 */

/**
 * @typedef APISort
 * @type {object}
 * @property {string} field - The API resource field to filter by
 * @property {string} direction - either "asc" or "desc" for ascending or descending
 * @example {field:"original_release_date", direction:"asc"} // Sort games by the date they were released
 *
 */

/**
 * @typedef APIResponsePromise
 * @type {Promise}
 * Resolves with an api response or rejects with an error.
 * Error may be a JSONP error or an API error.
 *
 */

/**
* @typedef APIOptions
* @type{object}
*
* @property {string} resource - The API resource to operate on (see the GiantBomb API Docs for a list fo resources)
* @property {number} id - The id of a specific resource 
* @property {string[]} fields - Fields to return for the resource(s) being retrieved
*
* @property {number} offset - Offset id to begin search (Randomize this value for random results) 
* @property {number} limit - Max amount of results to return
*
* @property {APIFilter[]} filter - Filters to apply to API search
* @property {APISort[]} sort - Sorting to apply to the API search
*
* @property {string} query - String to search resources for. Only used if the "resource" property is "search"
* @property {string[]} resources - List of API resources to search for "query" string. Only
* used if "resource" property is "search"
*
*/


/**
* @typedef APISearchCategory
* @type{object}
*
* @property {string} name - Name of the category
* @property {string} description - Short description of the category
* @property {bool} randomizeOffset - Whether or not to randomize the id where API searches start at (true for random results) 
* @property {number} randomOffsetMin - Randomized offset will greater than this number
* @property {number} randomOffsetMax - Randomized offset will less than this number
* @property {APIOptions} options - Options to pass to the GiantBomb API
*
* (NOTE) Some GiantBomb resources have more or less content than others. Specifying an randomOffsetMax of 500 on
* the "platforms" resouce when that resource only has 166 platforms/items may result in problems or errors.
*
*/




