import { Component, h, Prop, Element } from '@stencil/core';

@Component({
	tag: 'ontario-inpage-navigation',
	styleUrl: 'ontario-inpage-navigation.scss',
	shadow: true,
})
export class OntarioInpageNavigation {
	@Element() host: HTMLElement;

	/**
	 * The string for the inpage navigation heading.
	 *
	 * If a string is passed, the h2 tag will be populated with the passed string. Else, the default string "On this page" will be used for the heading.
	 */
	@Prop() heading?: string = 'On this page';

	/**
	 * The 2d array for navigation links, link text to display and the linked section id href.
	 *
	 * If the array items are passsed, the navigation list will populate with the passed link text and href. Else, the default navigation items will be used.
	 */
	@Prop() navItems?: [string, string][] = [
		['About the program', '#'],
		['Eligibility', '#'],
		['Available funding', '#'],
		['Program guide', '#'],
		['Contact us', '#'],
	];

	/**
	 * The boolean value for changing the list from one column to two.
	 *
	 * By default the links will appear in one columne, in case the user passes the value `true`, the list items will appear in two columns.
	 */
	@Prop() columns?: boolean = false;

	render() {
		return (
			<div class="ontario-inpage-navigation">
				<nav aria-labelledby="inpage-nav-title">
					<div class="ontario-row">
						<div class="ontario-columns ontario-small-12">
							<div class="ontario-page-navigation" role="navigation">
								<div class="ontario-page-navigation-content">
									<h2 id="inpage-nav-title" class="ontario-page-navigation-header">
										{this.heading}
									</h2>
									<a class="ontario-show-on-focus" href="#skip-to-main">
										Skip this page navigation
									</a>
									<ol class="ontario-page-navigation-list">
										{this.navItems?.map(([text, href]) => (
											<li class="ontario-page-navigation-list__item">
												<a class="ontario-page-navigation-item__link" href={href}>
													{text}
												</a>
											</li>
										))}
									</ol>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}
