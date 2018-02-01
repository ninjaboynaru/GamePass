/**
 * @function
 * Performs a shallow comparison of 2 objects by comapring their properties using the === comparator.
 * Returns true only if both objects have the same set of properties and values for those properties.
 * Only compares own properties of the objects and not those that exist on their prototypes.
 *
 * @param {object} objA
 * @param {object} objB
 * @param {bool=} looseComparison - If true, uses == comparator to compare the object properties
 */
function ShallowCompare(objA, objB, looseComparison = false) {
	let objAKeys = Object.keys(objA);
	let objBKeys = Object.keys(objB);
	let combinedObjKeys = objAKeys.concat(objBKeys);

	for (let keyString of combinedObjKeys) {
		if (looseComparison) {
			if (objA[keyString] != objB[keyString]) {
				return false;
			}
		} else if (objA[keyString] !== objB[keyString]) {
			return false;
		}
	}

	return true;
}

export default ShallowCompare;
