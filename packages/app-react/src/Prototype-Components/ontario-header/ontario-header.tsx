import React, { useState } from 'react';
import './ontario-header.scss';
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
		<>
			<div className="ontario-application-header__container" id="ontario-application-header">
				<div className="ontario-application-main-header-container">
					<section className="ontario-application-header">
						<div className="ontario-row">
							<div className="ontario-columns ontario-small-6 ontario-application-header__logo">
								<a href="https://www.ontario.ca/page/government-ontario">
									<img src={ontarioLogoDesktop} alt="" />
								</a>
							</div>
							<div className="ontario-columns ontario-small-6 ontario-application-header__lang-toggle">
								<a href="/" className="ontario-header-button ontario-header-button--without-outline">
									<abbr title="Français" className="ontario-show-for-small-only">
										FR
									</abbr>
									<span className="ontario-show-for-medium">Français</span>
								</a>
							</div>
						</div>
					</section>
				</div>
				<div className="ontario-application-subheader-menu__container">
					<section className="ontario-application-subheader">
						<div className="ontario-row">
							<div className="ontario-columns ontario-small-12 ontario-application-subheader__container">
								<p className="ontario-application-subheader__heading">
									<a href="/">Design System</a>
								</p>
								<div className="ontario-application-subheader__menu-container">
									<div className="ontario-show-for-large">
										<ul className="ontario-application-subheader__menu ">
											<li>
												<a href="ontario-button">Button</a>
											</li>
											<li>
												<a href="ontario-hint-expander">Hint Expander</a>
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
									</div>
									<div className="ontario-hide-for-small ontario-show-for-medium ontario-hide-for-large">
										<ul className="ontario-application-subheader__menu ">
											<li>
												<a href="#">Link 1</a>
											</li>
											<li>
												<a href="#">Link 2</a>
											</li>
										</ul>
									</div>
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
												<OntarioIconClose width="32px" height="32px" viewBox="0 0 24 24" />
												<span className="ontario-application-header-menu-span ontario-hide-for-small-only">Menu</span>
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
												<OntarioIconMenu width="32px" height="32px" viewBox="0 0 24 24" />
											</div>
											<span className="ontario-application-header-menu-span ontario-hide-for-small-only">Menu</span>
										</button>
									)}
								</div>
							</div>
						</div>
					</section>
					<nav role="navigation" className="ontario-application-navigation" id="ontario-application-navigation">
						{toggle ? (
							<div className="ontario-application-navigation ontario-application-navigation__container nav-ul-opened">
								<ul>
									<li className="ontario-show-for-small-only">
										<a href="#">Link 1</a>
									</li>
									<li className="ontario-show-for-small-only">
										<a href="#">Link 2</a>
									</li>
									<li className="ontario-hide-for-large">
										<a href="#">Link 3</a>
									</li>
									<li className="ontario-hide-for-large">
										<a href="#">Link 4</a>
									</li>
									<li className="ontario-hide-for-large">
										<a href="#">Link 5</a>
									</li>
									<li>
										<a href="#">Link 6</a>
									</li>
									<li>
										<a href="#">Link 7</a>
									</li>
									<li>
										<a href="#">Link 8</a>
									</li>
								</ul>
							</div>
						) : (
							<div className="ontario-application-navigation ontario-application-navigation__container nav-ul-closed">
								<ul>
									<li className="ontario-show-for-small-only">
										<a href="#">Link 1</a>
									</li>
									<li className="ontario-show-for-small-only">
										<a href="#">Link 2</a>
									</li>
									<li className="ontario-hide-for-large">
										<a href="#">Link 3</a>
									</li>
									<li className="ontario-hide-for-large">
										<a href="#">Link 4</a>
									</li>
									<li className="ontario-hide-for-large">
										<a href="#">Link 5</a>
									</li>
									<li>
										<a href="#">Link 6</a>
									</li>
									<li>
										<a href="#">Link 7</a>
									</li>
									<li>
										<a href="#">Link 8</a>
									</li>
								</ul>
							</div>
						)}
					</nav>
				</div>
			</div>
			{toggle && <div className="ontario-hide-for-large ontario-application-overlay"></div>}
		</>
	);
};

export default Header;
