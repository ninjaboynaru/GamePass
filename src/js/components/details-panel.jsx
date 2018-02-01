import React from 'react';
import ShallowCompare from '../shallow-compare';

class DetailsPanel extends React.Component {
	constructor(properties) {
		super(properties);
		this.state = { open: this.props.open };
		this.OnBackgroundClick = this.OnBackgroundClick.bind(this);
		this.ClosePanel = this.ClosePanel.bind(this);
	}

	render() {
		if (this.state.open == false) {
			return null;
		}

		const gameData = this.props.gameData;
		const parsedDateObject = new Date(gameData.original_release_date);
		const isValidDate =
			!Number.isNaN(parsedDateObject.getFullYear()) && gameData.original_release_date != undefined;
		let releaseDateString = `Release date - ${isValidDate ? parsedDateObject.getFullYear() : 'unknown'}`;

		return (
			<div className="details-panel" onClick={this.OnBackgroundClick}>
				<div className="details-panel__content">
					<img src={gameData.image.small_url} className="details-panel__content__img" />
					<p className="details-panel__content__title">{gameData.name}</p>
					<p className="details-panel__content__date">{releaseDateString}</p>
					<p className="details-panel__content__description">{gameData.deck}</p>
					<p className="details-panel__content__play-text">PLAY</p>
					<span className="details-panel__content__back-text" onClick={this.ClosePanel}>
						BACK
					</span>
				</div>
			</div>
		);
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.open != this.state.open ||
			(ShallowCompare(nextProps.gameData, this.props.gameData) == false && nextProps.open == true)
		) {
			this.setState({ open: nextProps.open });
		}
	}

	/**
	 * Close the panel when the background panel is clicked.
	 */
	OnBackgroundClick(event) {
		if (event.target.classList.contains('details-panel')) {
			this.setState({ open: false });
		}
	}

	ClosePanel() {
		this.setState({ open: false });
	}
}

export default DetailsPanel;
