import { Component, h, Prop, Element, Watch, State } from '@stencil/core';
import { NavigationItem } from './ontario-in-page-navigation.types';
import { twoColumns } from './ontario-in-page-navigation.columns';
@Component({
	tag: 'ontario-in-page-navigation',
	styleUrl: 'ontario-in-page-navigation.scss',
	shadow: true,
})
export class OntarioInPageNavigation {
	@Element() host: HTMLElement;

	/**
	 * The string for the inpage navigation heading.
	 * If a string is passed, the h2 tag will be populated with the passed string. Else, the default string "On this page" will be used.
	 * @example
	 * <ontario-in-page-navigation
	 * 	heading='My custom in-page navigation heading'
	 * >
	 * </ontario-in-page-navigation>
	 */
	@Prop() heading?: string = 'On this page';

	/**
	 * The array of objects for navigation links, link text to display and the linked section id href.
	 * If the array items are passed, the navigation list will populate with the passed link text and href.
	 * @example
	 * <ontario-in-page-navigation
	 * 	items='[
	 * 		{"title": "Link 01", "href": "#"},
	 * 		{"title": "Link 02", "href": "#"},
	 * 		{"title": "Link 03", "href": "#"},
	 * 		{"title": "Link 04", "href": "#"},
	 * 		{"title": "Link 05", "href": "#"}
	 * 	]'
	 * >
	 * </ontario-in-page-navigation>
	 */
	@Prop() items?: Array<NavigationItem> | string;

	/**
	 * The boolean value for changing the list from one column to two.
	 * By default the links will appear in one column.
	 * In case the user passes the value `true`
	 * AND if the number of links is 13 or more,
	 * the list items will appear in two columns.
	 * @example
	 * <ontario-in-page-navigation
	 * `two-columns='true'
	 * >
	 * </ontario-in-page-navigation>
	 */
	@Prop() twoColumns?: twoColumns['twoColumns'];

	@State() private itemsState: Array<NavigationItem> = [];

	@Watch('navItems')
	parseItems(newValue: Array<NavigationItem> | string) {
		if (newValue) {
			if (typeof newValue === 'string') {
				try {
					const parsed = JSON.parse(newValue);
					if (Array.isArray(parsed)) {
						this.itemsState = parsed;
					} else {
						throw new Error('Invalid format');
					}
				} catch (e) {
					console.error('Failed to parse navItems:', e);
				}
			} else this.itemsState = newValue;
		}
	}

	private generateMenuItem(
		text: string,
		href?: string,
		customHandler?: (event: MouseEvent) => void,
		twoColumns?: boolean,
		index?: number,
		breakpointIndex?: number,
	) {
		const addBreakpoint = twoColumns && index === breakpointIndex;
		return (
			<li key={text} class={`ontario-page-navigation-list__item ${addBreakpoint ? 'breakpoint' : ''}`}>
				<a
					class="ontario-page-navigation-item__link"
					href={href}
					onClick={(event) => customHandler && customHandler(event)}
				>
					{text}
				</a>
			</li>
		);
	}

	componentWillLoad() {
		this.parseItems(this.items ?? '');
	}

	render() {
		const itemsCount = this.itemsState.length;
		const useTwoColumns = this.twoColumns && itemsCount >= 13; // Adjust the number here to decide when to break into two columns
		const breakpointIndex = useTwoColumns
			? itemsCount % 2 === 0
				? itemsCount / 2 + 1
				: Math.ceil(itemsCount / 2)
			: -1;

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
									<ol class={`ontario-page-navigation-list ${useTwoColumns ? 'ontario-page-navigation-columns' : ''}`}>
										{this.itemsState.map((i, index) =>
											this.generateMenuItem(i.title, i.href, i.customHandler, useTwoColumns, index, breakpointIndex),
										)}
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
