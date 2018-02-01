import React from 'react';
import DetailsModal from '../details-modal';

class GameTab extends React.Component {
	constructor(properties) {
		super(properties);
		this.OpenDetailsPanel = this.OpenDetailsPanel.bind(this);
	}

	render() {
		const renderLarge = this.props.renderLarge;
		const gameData = this.props.gameData;

		return (
			<div
				onClick={this.OpenDetailsPanel}
				className={`game-tab js-slider-slide-element ${renderLarge ? 'game-tab--large' : ''}`}
			>
				<img src={gameData.image.screen_url} className="game-tab__img" />
				<div className="game-tab__info">
					<p className="game-tab__info__title">{gameData.name}</p>
					<p className="game-tab__info__description">{gameData.deck}</p>
				</div>
			</div>
		);
	}

	OpenDetailsPanel() {
		DetailsModal.Open(this.props.gameData);
	}
}

export default GameTab;
