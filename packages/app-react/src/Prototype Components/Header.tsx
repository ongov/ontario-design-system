import React, { useState } from 'react';
import './Header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ontarioLogoDesktop from './ontario-logo--desktop.svg';
import { ReactComponent as OntarioIconClose } from './ontario-icon-close.svg';
import { ReactComponent as OntarioIconMenu } from './ontario-icon-menu.svg';

const Header = () => {
	const [toggle, setToggle] = useState(false);
	const handleToggle = () => {
		setToggle(prev => !prev);
		console.log(toggle);
	};

	return (
		<div className="documentation-only--application">
			<div className="ontario-application-header__container">
				<header className="ontario-header ontario-application-header" id="ontario-application-header">
					<div className="ontario-row">
						<div className="ontario-columns ontario-small-6 ontario-application-header__logo">
							<a href="https://www.ontario.ca/page/government-ontario">
								<img src={ontarioLogoDesktop} alt="" />
							</a>
						</div>
						<div className="ontario-columns ontario-small-6 ontario-application-header__lang-toggle">
							<a href="" className="ontario-header__language-toggler ontario-header-button ontario-header-button--without-outline">
								<abbr title="Français" className="ontario-show-for-small-only">
									FR
								</abbr>
								<span className="ontario-show-for-medium">Français</span>
							</a>
						</div>
					</div>
				</header>
				<div className="ontario-application-subheader-menu__container">
					<section className="ontario-application-subheader">
						<div className="ontario-row">
							<div className="ontario-columns ontario-small-12 ontario-application-subheader__container">
								<p className="ontario-application-subheader__heading">
									<a href="#">Application name</a>
								</p>

								<div className="ontario-application-subheader__menu-container">
									<ul className="ontario-application-subheader__menu ontario-show-for-large">
										<li>
											<a href="#">Link 1</a>
										</li>
										<li>
											<a href="#">Link 2</a>
										</li>
										<li>
											<a href="#">Link 3</a>
										</li>
										<li>
											<a href="#">Link 4</a>
										</li>
										<li>
											<a href="#">Link 5</a>
										</li>
									</ul>
									<nav>
										{toggle ? (
											<button
												className="active ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline "
												id="ontario-application-header-menu-toggler"
												aria-controls="ontario-application-navigation"
												aria-label="open menu"
												data-target="megaMenu"
												onClick={handleToggle}
											>
												<div className={`ontario-icon ontario-icon--white`}>
													<OntarioIconMenu width="32px" height="32px" viewBox="0 0 24 24" />
													<span className="ontario-application-header-menu-span">Menu</span>
												</div>
											</button>
										) : (
											<button
												className="ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline"
												id="ontario-application-header-menu-toggler"
												aria-controls="ontario-application-navigation"
												aria-label="open menu"
												data-target="megaMenu"
												onClick={handleToggle}
											>
												<div className={`ontario-icon ontario-icon--white`}>
													<OntarioIconClose width="32px" height="32px" viewBox="0 0 24 24" fill="1" />
												</div>
												<span className="ontario-application-header-menu-span">Menu</span>
											</button>
										)}

										<div className="ontario-application-navigation ontario-application-navigation__container">
											{toggle && (
												<ul>
													<li>
														<a href="#">Link 1</a>
													</li>
													<li>
														<a href="#">Link 1</a>
													</li>
													<li>
														<a href="#">Link 1</a>
													</li>
												</ul>
											)}
										</div>
									</nav>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
			<div className="ontario-application-overlay"></div>
		</div>
	);
};

export default Header;
