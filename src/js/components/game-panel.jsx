import React from 'react';
import GameTab from './game-tab';
import AtlasSlider from '../atlas-slider';

class GamePanel extends React.Component {
	constructor(properties) {
		super(properties);
	}

	render() {
		const categoryData = this.props.categoryData;
		const gameTabs = categoryData.apiResponse.results.map((gameData, index) => {
			return <GameTab key={index} gameData={gameData} />;
		});

		return (
			<div className="game-panel">
				<p className="game-panel__title">{categoryData.category.name}</p>
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

export default GamePanel;
