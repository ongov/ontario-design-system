import { Component, Prop, h, Host, Watch, State, Element } from '@stencil/core';

import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { Language } from '../../utils/common/language-types';
import { validateLanguage } from '../../utils/validation/validation-functions';

@Component({
	tag: 'ontario-in-page-navigation-item',
	styleUrl: 'ontario-in-page-navigation-item.scss',
	shadow: true,
})
/**
 * A single list item link used inside `ontario-in-page-navigation`.
 */
export class OntarioInPageNavigationItem {
	@Element() host!: HTMLElement;

	/**
	 * Link label for the in-page navigation item.
	 */
	@Prop() label?: string;

	/**
	 * In-page anchor target, for example #eligibility.
	 */
	@Prop() href?: string;

	/**
	 * Marks the current/active section.
	 */
	@Prop() isCurrent?: boolean = false;

	/**
	 * Language used if localized text is required in the future.
	 */
	@Prop({ mutable: true }) language?: Language;

	/**
	 * Tracks whether the default slot has user-provided content.
	 */
	@State() private hasDefaultSlotContent = false;

	/**
	 * Checks whether the default slot contains element or non-empty text nodes.
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
	 * Validates the label prop when no slot override is supplied.
	 */
	@Watch('label')
	validateLabel() {
		if (this.hasDefaultSlotContent) {
			return;
		}

		if (!this.label?.trim()) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' label ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-in-page-navigation-item> ')
				.addRegularText('was not provided.')
				.printMessage();
		}
	}

	/**
	 * Validates the href prop when no slot override is supplied.
	 */
	@Watch('href')
	validateHref() {
		if (this.hasDefaultSlotContent) {
			return;
		}

		if (!this.href?.trim()) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' href ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-in-page-navigation-item> ')
				.addRegularText('was not provided.')
				.printMessage();
			return;
		}

		if (!this.href.trim().startsWith('#')) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' href ')
				.addRegularText('on')
				.addMonospaceText(' <ontario-in-page-navigation-item> ')
				.addRegularText('must be an in-page anchor that starts with')
				.addMonospaceText(' # ')
				.printMessage();
		}
	}

	/**
	 * Re-evaluates slot presence and validation when slot content changes.
	 */
	private handleDefaultSlotChange = (event: Event) => {
		const slotElement = event.target as HTMLSlotElement;
		this.hasDefaultSlotContent = this.hasSlotContent(slotElement);
		this.validateLabel();
		this.validateHref();
	};

	/**
	 * Initializes language and validates props after first render.
	 */
	componentDidLoad() {
		const defaultSlot = this.host.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
		this.hasDefaultSlotContent = this.hasSlotContent(defaultSlot || undefined);
		this.language = validateLanguage(this.language);
		this.validateLabel();
		this.validateHref();
	}

	render() {
		const resolvedHref = this.href?.trim();

		return (
			<Host class="ontario-in-page-navigation-item" role="listitem">
				<slot onSlotchange={this.handleDefaultSlotChange}>
					<a
						class="ontario-in-page-navigation-item__link"
						href={resolvedHref || undefined}
						aria-current={this.isCurrent ? 'location' : undefined}
					>
						{this.label?.trim() || ''}
					</a>
				</slot>
			</Host>
		);
	}
}
