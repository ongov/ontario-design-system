import { Component, Prop, State, Watch, Listen, Element, h } from '@stencil/core';

import { Language } from '../../utils/common/language-types';
import { HeaderLanguageToggleEventDetails } from '../../utils/events/common-events.interface';
import { validateLanguage, validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import translations from '../../translations/global.i18n.json';

export type OntarioInPageNavigationHeadingLevel = 'h2' | 'h3' | 'h4';

@Component({
	tag: 'ontario-in-page-navigation',
	styleUrl: 'ontario-in-page-navigation.scss',
	shadow: true,
})
export class OntarioInPageNavigation {
	@Element() host!: HTMLElement;

	/**
	 * Optional heading text. If omitted, the heading is resolved from i18n.
	 */
	@Prop() heading?: string;

	/**
	 * Heading level used for the component heading.
	 */
	@Prop() headingLevel: OntarioInPageNavigationHeadingLevel = 'h2';

	/**
	 * Removes the top border from the navigation container.
	 */
	@Prop() noTopBorder?: boolean = false;

	/**
	 * Skip link target id (without #) or anchor (with #).
	 */
	@Prop() skipLinkTarget?: string = 'skip-to-main';

	/**
	 * Enables smooth scrolling and hash updates for in-page links.
	 */
	@Prop() smoothScroll?: boolean = true;

	/**
	 * Language used for translated defaults.
	 */
	@Prop({ mutable: true }) language?: Language;

	@State() translations: any = translations;

	@State() private hasDefaultSlotContent = false;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is connected to the DOM.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
	}

	/**
	 * Handles an update to the language should the user request a language update from the language toggle.
	 */
	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<HeaderLanguageToggleEventDetails>) {
		this.language = validateLanguage(event.detail.newLanguage);
	}

	@Watch('heading')
	validateHeading() {
		if (!this.heading?.trim()) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' heading ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-in-page-navigation> ')
				.addRegularText('was not provided. A localized default heading will be used.')
				.printMessage();
		}
	}

	@Watch('headingLevel')
	validateHeadingLevel(newValue: string) {
		const allowedValues: OntarioInPageNavigationHeadingLevel[] = ['h2', 'h3', 'h4'];
		const isValid = validateValueAgainstArray(newValue, allowedValues);

		if (!isValid) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' headingLevel ')
				.addRegularText('on')
				.addMonospaceText(' <ontario-in-page-navigation> ')
				.addRegularText('was set to an invalid value; only')
				.addMonospaceText(` ${allowedValues.join(', ')} `)
				.addRegularText('are supported. The default value')
				.addMonospaceText(' h2 ')
				.addRegularText('is assumed.')
				.printMessage();

			this.headingLevel = 'h2';
		}
	}

	/**
	 * Checks whether the default slot has any rendered item content.
	 */
	private hasSlotContent(slotElement?: HTMLSlotElement): boolean {
		if (!slotElement) {
			return false;
		}

		const nodes = slotElement.assignedNodes({ flatten: true });

		return nodes.some((node) => {
			if (node.nodeType === Node.ELEMENT_NODE) {
				return true;
			}

			if (node.nodeType === Node.TEXT_NODE) {
				return Boolean(node.textContent?.trim());
			}

			return false;
		});
	}

	/**
	 * Warns when the component has no in-page navigation items to render.
	 */
	private warnIfMissingItems() {
		if (!this.hasDefaultSlotContent) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' <ontario-in-page-navigation> ')
				.addRegularText('requires child')
				.addMonospaceText(' <ontario-in-page-navigation-item> ')
				.addRegularText('elements in the default slot to render links.')
				.printMessage();
		}
	}

	/**
	 * Recomputes default slot content state whenever slotted items change.
	 */
	private handleDefaultSlotChange = (event: Event) => {
		const slotElement = event.target as HTMLSlotElement;
		this.hasDefaultSlotContent = this.hasSlotContent(slotElement);
		this.warnIfMissingItems();
	};

	/**
	 * Resolves a hash link to the target element in the current document.
	 */
	private getAnchorTarget(href: string): HTMLElement | null {
		if (!href || !href.startsWith('#')) {
			return null;
		}

		const targetId = decodeURIComponent(href.slice(1));
		if (!targetId) {
			return null;
		}

		return document.getElementById(targetId);
	}

	/**
	 * Intercepts in-page navigation clicks so the page can smooth-scroll.
	 */
	private handleLinkClick = (event: MouseEvent) => {
		if (!this.smoothScroll) {
			return;
		}

		const clickPath = event.composedPath();
		const anchor = clickPath.find((pathItem) => pathItem instanceof HTMLAnchorElement) as HTMLAnchorElement | undefined;

		if (!anchor || anchor.classList.contains('ontario-page-navigation__skip-link')) {
			return;
		}

		const href = anchor.getAttribute('href')?.trim();
		if (!href || !href.startsWith('#')) {
			return;
		}

		const targetElement = this.getAnchorTarget(href);
		if (!targetElement) {
			return;
		}

		event.preventDefault();
		targetElement.scrollIntoView({ behavior: 'smooth' });
		history.pushState(null, '', href);
	};

	/**
	 * Scrolls to the current hash target after the component finishes loading.
	 */
	private scrollToAnchorOnLoad() {
		if (!this.smoothScroll || !window.location.hash) {
			return;
		}

		const targetElement = this.getAnchorTarget(window.location.hash);

		if (targetElement) {
			setTimeout(() => {
				targetElement.scrollIntoView({ behavior: 'smooth' });
			}, 100);
		}
	}

	/**
	 * Renders the heading at the configured semantic level.
	 */
	private renderHeading(headingText: string) {
		switch (this.headingLevel) {
			case 'h3':
				return <h3 class="ontario-page-navigation-header">{headingText}</h3>;
			case 'h4':
				return <h4 class="ontario-page-navigation-header">{headingText}</h4>;
			case 'h2':
			default:
				return <h2 class="ontario-page-navigation-header">{headingText}</h2>;
		}
	}

	componentWillLoad() {
		this.language = validateLanguage(this.language);
		this.validateHeadingLevel(this.headingLevel);
		this.validateHeading();
	}

	componentDidLoad() {
		const defaultSlot = this.host.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
		this.hasDefaultSlotContent = this.hasSlotContent(defaultSlot || undefined);
		this.warnIfMissingItems();
		this.scrollToAnchorOnLoad();
	}

	render() {
		const resolvedLanguage = validateLanguage(this.language);
		const headingText = this.heading?.trim() || this.translations.inPageNavigation.heading[resolvedLanguage];
		const skipTarget = (this.skipLinkTarget || 'skip-to-main').trim();
		const skipLinkHref = skipTarget.startsWith('#') ? skipTarget : `#${skipTarget}`;

		return (
			<nav aria-label={headingText}>
				<div
					class={{
						'ontario-page-navigation': true,
						'ontario-page-navigation--no-top-border': Boolean(this.noTopBorder),
					}}
				>
					<div class="ontario-page-navigation-content" onClick={this.handleLinkClick}>
						<slot name="heading">{this.renderHeading(headingText)}</slot>
						<slot name="skip-link">
							<a class="ontario-page-navigation__skip-link ontario-show-on-focus" href={skipLinkHref}>
								{this.translations.inPageNavigation.skip[resolvedLanguage]}
							</a>
						</slot>
						<ol class="ontario-page-navigation-list">
							<slot onSlotchange={this.handleDefaultSlotChange}></slot>
						</ol>
					</div>
				</div>
			</nav>
		);
	}
}
