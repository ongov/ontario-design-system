import { Component, Prop, h, Host, Watch, State, Element } from '@stencil/core';

import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { Language } from '../../utils/common/language-types';
import { validateLanguage } from '../../utils/validation/validation-functions';

@Component({
	tag: 'ontario-in-page-navigation-item',
	styleUrl: 'ontario-in-page-navigation-item.scss',
	shadow: true,
})
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

	@State() private hasDefaultSlotContent = false;

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

	private handleDefaultSlotChange = (event: Event) => {
		const slotElement = event.target as HTMLSlotElement;
		this.hasDefaultSlotContent = this.hasSlotContent(slotElement);
		this.validateLabel();
		this.validateHref();
	};

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
						aria-current={this.isCurrent ? 'true' : undefined}
					>
						{this.label?.trim() || ''}
					</a>
				</slot>
			</Host>
		);
	}
}
