import React from 'react';
import './ontario-footer.scss';

const Footer = () => (
	<div className="footer">
		<footer className="ontario-footer ontario-footer--default">
			<div className="ontario-row">
				<div className="ontario-columns ontario-small-12">
					<ul className="ontario-footer__links-container ontario-footer__links-container--inline">
						<li>
							<a className="ontario-footer__link" href="https://www.ontario.ca/page/accessibility">
								Accessibility
							</a>
						</li>
						<li>
							<a className="ontario-footer__link" href="https://www.ontario.ca/page/privacy-statement">
								Privacy
							</a>
						</li>
						<li>
							<a className="ontario-footer__link" href="https://www.ontario.ca/feedback/contact-us">
								Contact us
							</a>
						</li>
					</ul>
					<div className="ontario-footer__copyright">
						<a className="ontario-footer__link" href="https://www.ontario.ca/page/copyright-information-c-queens-printer-ontario">
							&copy; Queen’s Printer for Ontario, <span className="ontario-nbsp">2012&ndash;21</span>
						</a>
					</div>
				</div>
			</div>
		</footer>
	</div>
);

export default Footer;
