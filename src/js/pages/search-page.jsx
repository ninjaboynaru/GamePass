import React from 'react';
import GiantBombAPI from '../giant-bomb';
import GameTab from '../components/game-tab';

/**
 * @class
 * Search page.
 * Must be rendered within a React Route in order to have access to the URL match prop "match".
 * Must be renderd in a React Route whose URL parameters contains a "searhTerm" property.
 *
 * The search query/search term is obtained from "props.match.searchTerm".
 *
 */
class Search extends React.Component {
	constructor(properties) {
		super(properties);
		this.state = { loadedAPIResponse: undefined, error: false };

		this.MakeAPISearch = this.MakeAPISearch.bind(this);
		this.OnGameSearchResolved = this.OnGameSearchResolved.bind(this);
		this.OnGameSearchRejected = this.OnGameSearchRejected.bind(this);

		if (this.props.match == undefined) {
			throw new Error(
				'Search page is missing props.match. Search page must be rendered in a Route in order to have acces to the URL match parameter "searchTerm"'
			);
			return;
		} else if (this.props.match.params.searchTerm == undefined) {
			throw new Error(
				'Search page props.match.params.searchTerm does not exist. Search page must be rendered in a Route whose URL paramters contains a "searchTerm" property'
			);
			return;
		}
	}

	render() {
		let uiToRender;
		if (this.state.error == true) {
			uiToRender = (
				<div>
					<h3>Unable to get data from the Giant Bomb Games Service. Check your internet or try again</h3>
				</div>
			);
		} else if (this.state.loadedAPIResponse == undefined) {
			uiToRender = (
				<div>
					<h3>Loading games. Please wait.</h3> <span className="loading-circle" />
				</div>
			);
		} else if (this.state.loadedAPIResponse.results.length == 0) {
			uiToRender = (
				<div>
					<h3>
						No results found for{' '}
						<span className="emphasized-text--red">{this.props.match.params.searchTerm}</span>
					</h3>
				</div>
			);
		} else {
			let largeGameTabs = this.state.loadedAPIResponse.results.map(function(gameData, index) {
				return <GameTab renderLarge key={gameData.name + index} gameData={gameData} />;
			});

			uiToRender = <div className="container--search-results">{largeGameTabs}</div>;
		}

		return uiToRender;
	}

	componentDidMount() {
		this.MakeAPISearch();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.searchTerm == this.props.match.params.searchTerm) {
			return;
		}
		this.MakeAPISearch(nextProps.match.params.searchTerm);
	}

	MakeAPISearch(optionalExplicitSearchTerm) {
		this.setState({ loadedAPIResponse: undefined });

		let searchTerm = optionalExplicitSearchTerm || this.props.match.params.searchTerm;
		if (searchTerm == '') {
			console.log('Search page recived searchTerm input of length 0. No search will be made');
			return;
		}

		let apiOptions = { fields: ['id', 'name', 'deck', 'image', 'original_release_date', 'original_game_rating'] };
		GiantBombAPI.SearchQuery(searchTerm, ['game'], apiOptions, 20).then(
			this.OnGameSearchResolved,
			this.OnGameSearchRejected
		);
	}

	OnGameSearchResolved(apiResponse) {
		console.log('Search Results For: ' + this.props.match.params.searchTerm, apiResponse.results);
		this.setState({ loadedAPIResponse: apiResponse, error: false });
	}

	OnGameSearchRejected(error) {
		console.error('Error Searching For: ' + this.props.match.params.searchTerm, error);
		this.setState({ error: error });
	}
}

export default Search;
