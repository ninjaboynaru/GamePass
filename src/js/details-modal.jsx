import React from 'react';
import ReactDOM from 'react-dom';
import DetailsPanel from './components/details-panel';

/**
 * @module
 * Manages the display of the details panel.
 * Renders the details panel within an HTML element with id 'details-modal'
 */
const DetailsModal = new function() {
	const _modalContainerID = 'details-modal';
	let _previousGameData;

	/**
	 * @function
	 * @public
	 * Open the details panel to display some gameData.
	 * If no game data argument is specified, then the previousely passed gameData is used.
	 *
	 * @param {object} gameData - Single api result returned by the GiantBomb API
	 */
	this.Open = function(gameData) {
		let gameDataToRender = gameData;
		if (gameData) {
			_previousGameData = gameData;
		} else if (_previousGameData != undefined) {
			gameDataToRender = _previousGameData;
		}

		let modalContainer = document.getElementById(_modalContainerID);
		ReactDOM.render(<DetailsPanel gameData={gameDataToRender} open />, modalContainer);
	};

	/**
	 * @function
	 * @public
	 * Closes the gamePanel by re-rendering without passing it any gameData prop.
	 */
	this.Close = function() {
		let modalContainer = document.getElementById(_modalContainerID);
		ReactDOM.render(<DetailsPanel />, modalContainer);
	};
}();

export default DetailsModal;
