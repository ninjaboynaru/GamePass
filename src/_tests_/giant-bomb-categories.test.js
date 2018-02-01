import CategoryData from '../js/config/giant-bomb-categories.json';


const categoryTemplate = {
	'name': expect.any(String),
	'description': expect.any(String),
	'randomizeOffset': expect.any(Boolean),
	'randomOffsetMin': expect.any(Number),
	'randomOffsetMax': expect.any(Number),
	'options': expect.any(Object)
}

test('All category objects have correct properties', function() {
	const allCategoryKeys = Object.keys(CategoryData);
	
	allCategoryKeys.forEach(function(categoryKey) {
		let currentCategory = CategoryData[categoryKey];
		expect(currentCategory).toMatchObject(categoryTemplate);
	});
});