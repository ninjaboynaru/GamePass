import React from 'react';
import GiantBombAPI from '../giant-bomb';
import GiantBombCategories from '../config/giant-bomb-categories';
import GamePanel from '../components/game-panel';

/**
 * @class
 * Home page of the application. Meant to emulate Netflixs' home page.
 *
 * Makes API requests for various game categories and as each one returns,
 * the results of the request are added to the state and rendered.
 */
class Home extends React.Component {
	constructor(properties) {
		super(properties);
		this.state = { loadedCategories: [] };

		GiantBombAPI.SearchCategory(GiantBombCategories.UPCOMING_GAMES, 10).then(
			this.OnSearchResolved.bind(this, GiantBombCategories.UPCOMING_GAMES),
			this.OnSearchRejected.bind(this, GiantBombCategories.UPCOMING_GAMES)
		);

		GiantBombAPI.SearchCategory(GiantBombCategories.XBOX_ONE_GAMES_RANDOM, 10).then(
			this.OnSearchResolved.bind(this, GiantBombCategories.XBOX_ONE_GAMES_RANDOM),
			this.OnSearchRejected.bind(this, GiantBombCategories.XBOX_ONE_GAMES_RANDOM)
		);

		GiantBombAPI.SearchCategory(GiantBombCategories.PS4_GAMES_RANDOM, 10).then(
			this.OnSearchResolved.bind(this, GiantBombCategories.PS4_GAMES_RANDOM),
			this.OnSearchRejected.bind(this, GiantBombCategories.PS4_GAMES_RANDOM)
		);

		setTimeout(
			function() {
				GiantBombAPI.SearchCategory(GiantBombCategories.PC_GAMES_RANDOM, 10).then(
					this.OnSearchResolved.bind(this, GiantBombCategories.PC_GAMES_RANDOM),
					this.OnSearchRejected.bind(this, GiantBombCategories.PC_GAMES_RANDOM)
				);

				GiantBombAPI.SearchCategory(GiantBombCategories.GAME_CUBE_GAMES_RANDOM, 10).then(
					this.OnSearchResolved.bind(this, GiantBombCategories.GAME_CUBE_GAMES_RANDOM),
					this.OnSearchRejected.bind(this, GiantBombCategories.GAME_CUBE_GAMES_RANDOM)
				);
				GiantBombAPI.SearchCategory(GiantBombCategories.XBOX_360_GAMES_RANDOM, 10).then(
					this.OnSearchResolved.bind(this, GiantBombCategories.XBOX_360_GAMES_RANDOM),
					this.OnSearchRejected.bind(this, GiantBombCategories.XBOX_360_GAMES_RANDOM)
				);

				GiantBombAPI.SearchCategory(GiantBombCategories.RANDOM, 10).then(
					this.OnSearchResolved.bind(this, GiantBombCategories.RANDOM),
					this.OnSearchRejected.bind(this, GiantBombCategories.RANDOM)
				);
			}.bind(this),
			1000
		);
	}

	OnSearchResolved(category, apiResponse) {
		this.AddCategoryToState(category, apiResponse);
	}
	OnSearchRejected(category, error) {
		console.error(`Error searching category with name ${category.name}`, error);
	}

	AddCategoryToState(categoryObject, categoryAPIResponse) {
		let newLoadedCategories = this.state.loadedCategories;
		let categoryData = { category: categoryObject, apiResponse: categoryAPIResponse };
		newLoadedCategories.push(categoryData);

		this.setState({ loadedCategories: newLoadedCategories });
	}

	render() {
		let panels = this.state.loadedCategories.map(function(data, index) {
			return <GamePanel key={index} categoryData={data} />;
		});

		return <div>{panels}</div>;
	}
}

export default Home;
