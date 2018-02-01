import React from 'react';
import AtlasSlider from './atlas-slider';

function Header() {
	return (
		<div>
			<div className="header">
				<span className="header__logo">Game Pass</span>
				<SearchBar />
			</div>
			<div className="header-spacer" />
		</div>
	);
}

class GamePanel extends React.Component {
	constructor(properties) {
		super(properties);
	}

	render() {
		const categoryData = this.props.categoryData;
		const gameTabs = categoryData.games.map((game, index) => {
			return <GameTab key={index} gameData={game} />;
		});

		return (
			<div className="game-panel">
				<p className="game-panel__title">{categoryData.category}</p>
				<div className="game-panel__games js-slider">
					<span className="game-panel__games__arrow-left js-slider-arrow" />
					<div className="js-slider-slide">{gameTabs}</div>
					<span className="game-panel__games__arrow-right js-slider-arrow" />
				</div>
			</div>
		);
	}

	componentDidMount() {
		AtlasSlider.Initialize();
	}
}

function GameTab(properties) {
	const gameData = properties.gameData;

	return (
		<div className="game-tab js-slider-slide-element">
			<img src={gameData.image} className="game-tab__img" />
			<div className="game-tab__info">
				<p className="game-tab__info__title">{gameData.name}</p>
				<p className="game-tab__info__description">{gameData.description}</p>
			</div>
		</div>
	);
}

class SearchBar extends React.Component {
	constructor(properties) {
		super(properties);
		this.state = { searchTerm: '' };

		this.OnInputChange = this.OnInputChange.bind(this);
	}

	render() {
		return (
			<input
				className="search-bar"
				value={this.state.searchTerm}
				onChange={this.OnInputChange}
				type="text"
				placeholder="Search"
			/>
		);
	}

	OnInputChange(event) {
		this.setState({ searchTerm: event.target.value });
	}
}

export { Header, GamePanel, GameTab, SearchBar };
