import React from 'react';
import SearchBar from './search-bar';
import sitelinks from '../config/sitelinks.json';

/**
 * @class
 * Creates header.
 * The header links are defined in the config file sitelinks.json
 */
function Header(properties) {
	const navLinks = sitelinks.headerLinks.map(function(linkObject) {
		return (
			<a className="nav__link" href={linkObject.href} key={linkObject.text}>
				{linkObject.text}
			</a>
		);
	});

	return (
		<div>
			<div className="header">
				<div className="header__logo-nav-wrapper">
					<a href="/" className="header__logo">
						Game Pass
					</a>
					<div className="nav">{navLinks}</div>
				</div>

				<SearchBar history={properties.history} />
			</div>
			<div className="header-spacer" />
		</div>
	);
}

export default Header;
