import { Component, h, Prop, Element, Watch, State } from '@stencil/core';

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
	 * If the array items are passed, the navigation list will populate with the passed link text and href. Else, the default navigation items will be used.
	 */
	@Prop() navItems?: string;

	@State() parsedNavItems: [string, string][] = [];

	@Watch('navItems')
	parseNavItems(newValue: string) {
		if (newValue) {
			try {
				console.log('Parsing navItems:', newValue);
				const parsed = JSON.parse(newValue);
				if (Array.isArray(parsed) && parsed.every((item) => Array.isArray(item) && item.length === 2)) {
					this.parsedNavItems = parsed;
				} else {
					throw new Error('Invalid format');
				}
			} catch (e) {
				console.error('Failed to parse navItems:', e);
				this.setDefaultNavItems();
			}
		} else {
			this.setDefaultNavItems();
		}
	}

	setDefaultNavItems() {
		this.parsedNavItems = [
			['About the program', '#'],
			['Eligibility', '#'],
			['Available funding', '#'],
			['Program guide', '#'],
			['Contact us', '#'],
		];
	}

	componentWillLoad() {
		this.parseNavItems(this.navItems || '');
	}

	/**
	 * The boolean value for changing the list from one column to two.
	 *
	 * By default the links will appear in one column, in case the user passes the value `true`, the list items will appear in two columns.
	 */
	@Prop() columns?: boolean = false;

	render() {
		console.log('Rendering with parsedNavItems:', this.parsedNavItems);
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
										{this.parsedNavItems.map(([text, href]) => (
											<li key={text} class="ontario-page-navigation-list__item">
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
