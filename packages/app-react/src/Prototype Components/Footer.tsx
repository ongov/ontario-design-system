import React from 'react';
import './Footer.scss';

const Footer = () => (
	<>
		<div className="footer">
			<footer className="ontario-footer ontario-footer--default">
				{/* {{#if expanded}}
        <div className="ontario-footer__expanded-top-section">
            <div className="ontario-row">
                <div className="ontario-columns ontario-small-12 {{#if expandedTwoColumn}}ontario-medium-6{{/if}}{{#if expandedThreeColumn}}ontario-expanded-footer__one-third-block ontario-medium-12 ontario-large-4{{/if}}">
                    {{#if expandedTwoColumn}}
                        <h2 className="ontario-h4">{{text.ministryOne.heading}}</h2>
                        <p>{{text.ministryOne.description}} <a href="#">{{text.ministryOne.descriptionLink}}</a></p>
                    {{/if}}
                    {{#if expandedThreeColumn}}
                        <h2 className="ontario-h4">{{text.ministryTwo.heading}}</h2>
                        <p>{{text.ministryTwo.description}}</p>
                    {{/if}}
                </div>
                {{#if expandedThreeColumn}}
                    <div className="ontario-columns ontario-small-12 ontario-medium-6 ontario-large-4 ontario-expanded-footer__one-third-block">
                        <h2 className="ontario-h4">{{text.visitedTopics}}</h2>
                        <ul className="ontario-footer__links-container ontario-footer__links-container--two-column-list">
                            <li>
                                <a className="ontario-footer__link" href="">{{text.ministryTwo.links.linkOne}}</a>
                            </li>
                            <li>
                                <a className="ontario-footer__link" href="">{{text.ministryTwo.links.linkTwo}}</a>
                            </li>
                            <li>
                                <a className="ontario-footer__link" href="">{{text.ministryTwo.links.linkThree}}</a>
                            </li>
                            <li>
                                <a className="ontario-footer__link" href="">{{text.ministryTwo.links.linkFour}}</a>
                            </li>
                            <li>
                                <a className="ontario-footer__link" href="">{{text.ministryTwo.links.linkFive}}</a>
                            </li>
                            <li>
                                <a className="ontario-footer__link" href="">{{text.ministryTwo.links.linkSix}}</a>
                            </li>
                            <li>
                                <a className="ontario-footer__link" href="">{{text.ministryTwo.links.linkSeven}}</a>
                            </li>
                            <li>
                                <a className="ontario-footer__link" href="">{{text.ministryTwo.links.linkEight}}</a>
                            </li>
                            <li>
                                <a className="ontario-footer__link" href="">{{text.ministryTwo.links.linkNine}}</a>
                            </li>
                            <li>
                                <a className="ontario-footer__link" href="">{{text.ministryTwo.links.linkTen}}</a>
                            </li>
                        </ul>
                    </div>
                {{/if}}
                <div className="ontario-columns ontario-small-12 {{#if expandedTwoColumn}}ontario-medium-6{{/if}}{{#if expandedThreeColumn}}ontario-medium-6 ontario-large-4 ontario-expanded-footer__one-third-block{{/if}}">
                    {{#if expandedTwoColumn}}
                        <h2 className="ontario-h4">{{text.contactUs}}</h2>
                        <p>{{text.ministryOne.contactUs}} <a href="#">{{text.ministryOne.contactUsLink}}</a></p>
                        <a className="ontario-footer__button ontario-button ontario-margin-bottom-0-!" href="#">{{text.ministryOne.buttonText}}</a>
                    {{/if}}
                    {{#if expandedThreeColumn}}
                        <h2 className="ontario-h4">{{text.contactUs}}</h2>
                        <p>{{text.ministryTwo.contactUs}} <a href="#">{{text.ministryTwo.phone}}</a> {{text.ministryTwo.or}} <a href="#">{{text.ministryTwo.email}}</a></p>
                        <p><a href="#">{{text.signUp}}</a> {{text.ministryTwo.signupForReminders}}</p>
                        <ul className="ontario-footer__links-container ontario-footer__links-container--social">
                            <li>
                                <a className="ontario-footer__link" href="" aria-label="Facebook">
                                    <svg className="ontario-icon" alt="" sol:category="communication" aria-hidden="true" focusable="false" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                                        <use href="../../icons/ontario-icons-secondary.svg#ontario-icon-facebook"></use></svg>
                                </a>
                            </li>
                            <li>
                                <a className="ontario-footer__link" href="" aria-label="Twitter">
                                    <svg className="ontario-icon" alt="" sol:category="communication" aria-hidden="true" focusable="false" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                                        <use href="../../icons/ontario-icons-secondary.svg#ontario-icon-twitter">
                                        </use>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a className="ontario-footer__link" href="" aria-label="Instagram">
                                    <svg className="ontario-icon" alt="" sol:category="communication" aria-hidden="true" focusable="false" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                                        <use href="../../icons/ontario-icons-secondary.svg#ontario-icon-instagram">
                                        </use>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a className="ontario-footer__link" href="" aria-label="Youtube">
                                    <svg className="ontario-icon" alt="" sol:category="communication" aria-hidden="true" focusable="false" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                                        <use href="../../icons/ontario-icons-secondary.svg#ontario-icon-youtube">
                                        </use>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    {{/if}}
                </div>
            </div>
        </div>
    {{/if }} */}
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
	</>
);

export default Footer;
