import React from 'react';

/**
 * @class
 * Search bar the redirects to the search page on enter.
 * Must be rendered in a React Route in order to have acces to the prop "history"
 */
class SearchBar extends React.Component {
	constructor(properties) {
		super(properties);
		this.state = { searchTerm: '' };

		this.OnInputChange = this.OnInputChange.bind(this);
		this.OnKeyDown = this.OnKeyDown.bind(this);
	}

	render() {
		return (
			<input
				className="search-bar"
				value={this.state.searchTerm}
				onChange={this.OnInputChange}
				onKeyDown={this.OnKeyDown}
				type="text"
				placeholder="Search"
			/>
		);
	}

	OnInputChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	OnKeyDown(event) {
		if (this.state.searchTerm != '' && event.keyCode == 13) {
			if (this.props.history) {
				event.target.blur();
				window.scrollTo(0, 0);
				this.props.history.push('/search/' + this.state.searchTerm);
			} else {
				throw new Error(
					'SearchBar component has not been passed props.history object. Unable to redirect to search/:searchTerm'
				);
			}
		}
	}
}

export default SearchBar;
