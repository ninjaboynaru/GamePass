import React from 'react';
import sitelinks from '../config/sitelinks.json';

/**
 * @class
 * Creates a footer with links.
 * The links are defined in the config file sitelinks.json
 */
function Footer(properties) {
	function LinkObjectsToLinkComponents(linkObjectArray) {
		let linkComponents = linkObjectArray.map(function(linkObject) {
			return (
				<a href={linkObject.href} className="footer__row__link" key={linkObject.text}>
					{linkObject.text}
				</a>
			);
		});

		return linkComponents;
	}

	const footerRow1 = <div className="footer__row">{LinkObjectsToLinkComponents(sitelinks.headerLinks)}</div>;
	const footerRow2 = <div className="footer__row">{LinkObjectsToLinkComponents(sitelinks.socialMediaLinks)}</div>;
	const footerRow3 = <div className="footer__row">{LinkObjectsToLinkComponents(sitelinks.footerLinks)}</div>;

	return (
		<div className="footer">
			{footerRow1}
			{footerRow2}
			{footerRow3}
		</div>
	);
}

export default Footer;
