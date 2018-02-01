import React from 'react';
import { MemoryRouter, Route, Router } from 'react-router';
import { configure,  mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBar from '../js/components/search-bar';


configure({ adapter: new Adapter() });

test('Search Bar changes to correct route with correct argument', function(){
	let fullComponent = (
		<MemoryRouter>
			<Route component={SearchBar}/>
		</MemoryRouter>
	);

	let componentWrapper = mount(fullComponent);
	let routerWrapper = componentWrapper.find(Router);
	let searchBarWrapper = componentWrapper.find(SearchBar);

	const inputText = 'Simulated test search term';
	searchBarWrapper.simulate('change', {target:{value:inputText}} );
	searchBarWrapper.simulate('keyDown', {keyCode:13, target:{blur:()=>{} } });
	
	const currentURLPath = routerWrapper.props().history.location.pathname;
	const expectedURLPath = `/search/${inputText}`;
	expect(currentURLPath).toBe(expectedURLPath);

});