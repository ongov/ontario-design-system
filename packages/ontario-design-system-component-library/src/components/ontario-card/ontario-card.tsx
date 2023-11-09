import { Component, Prop, Element, h, Watch, State } from '@stencil/core';

import { CardType, CardTypes, HeaderType, HeaderTypes, CardsPerRow, CardsPerRowValues } from './ontario-card-types';

import { validatePropExists, validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

@Component({
	tag: 'ontario-card',
	styleUrl: 'ontario-card.scss',
	shadow: true,
})
export class OntarioCard {
	@Element() host: HTMLElement;

	/**
	 * The type of card to render.
	 *
	 * If no type is passed, it will default to 'basic'.
	 */
	@Prop() cardType: CardType = 'basic';

	/**
	 * The type of card to render.
	 *
	 * If no type is passed, it will default to 'basic'.
	 */
	@Prop() headerType: HeaderType = 'default';

	/**
	 * The type of card to render.
	 *
	 * If no type is passed, it will default to 'basic'.
	 */
	@Prop() cardsPerRow: CardsPerRow = 3;

	/**
	 * Text to be displayed within the button. This will override the text provided through the host element textContent.
	 *
	 * @example
	 * <ontario-button label="Label Text">Text</ontario-button>
	 *
	 * The resulting button will have the label `"Label Text"`.
	 */
	@Prop() title?: string;

	/**
	 * Text to be displayed within the button. This will override the text provided through the host element textContent.
	 *
	 * @example
	 * <ontario-button label="Label Text">Text</ontario-button>
	 *
	 * The resulting button will have the label `"Label Text"`.
	 */
	@Prop() description?: string;

	/**
	 * Provides more context as to what the button interaction is doing. This should only be used for accessibility purposes, if the button interaction requires more description than what the text provides.
	 *
	 *  This is optional.
	 *
	 * @example
	 * <ontario-button aria-label-text="Click button to open map">Open</ontario button>
	 */
	@Prop({ mutable: true }) ariaTitleText?: string;

	/**
	 * The unique identifier of the button. This is optional - if no ID is passed, one will be generated.
	 */
	@Prop({ mutable: true }) elementId?: string;

	/**
	 * Mutable variable, for internal use only.
	 * Set the button's type depending on validation result.
	 */
	@State() private cardTypeState: string;

	@State() private headerTypeState: string;

	@State() private titleState: string;

	/**
	 * Mutable variable, for internal use only.
	 * Set the icon's width depending on validation result.
	 */
	@State() cardsPerRowState: number;

	/*
	 * Watch for changes to the `label` property for validation purposes.
	 *
	 * If  no `label` prop is provided, the `label` prop will be set to the host element textContent (if it exists).
	 */
	@Watch('title')
	private updateTitleContent() {
		this.titleState = this.title ?? this.host.textContent ?? '';
		this.validateTitleContent(this.titleState);
	}

	/**
	 * Watch for changes to the `type` property for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `type` will be set to its default (`secondary`).
	 * If a match is found in one of the array values then `type` will be set to the matching array key value.
	 */
	@Watch('cardType')
	validateType() {
		const isValid = validateValueAgainstArray(this.cardType, CardTypes);
		if (isValid) {
			this.cardTypeState = this.cardType;
		} else {
			this.cardTypeState = this.warnDefaultType();
		}
	}

	/**
	 * Watch for changes to the `type` property for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `type` will be set to its default (`secondary`).
	 * If a match is found in one of the array values then `type` will be set to the matching array key value.
	 */
	@Watch('cardsPerRow')
	validateCardsPerRow() {
		if (isNaN(this.cardsPerRow) || (!isNaN(this.cardsPerRow) && this.cardsPerRow <= 0)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' cards-per-row ')
				.addRegularText('on')
				.addMonospaceText(' <ontario-cardy> ')
				.addRegularText(
					`${
						isNaN(this.cardsPerRow) ? 'was set to a non-numeric value' : 'was set to a negative number'
					}; only a positive number is allowed. The default number of cards per row: `,
				)
				.addMonospaceText(' 3 ')
				.addRegularText('was assumed.')
				.printMessage();
			this.cardsPerRowState = 3;
		} else {
			this.cardsPerRowState = this.cardsPerRow;
		}
	}

	/**
	 * Watch for changes to the `type` property for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `type` will be set to its default (`secondary`).
	 * If a match is found in one of the array values then `type` will be set to the matching array key value.
	 */
	@Watch('headerType')
	validateHeaderType() {
		const isValid = validateValueAgainstArray(this.headerType, HeaderTypes);
		if (isValid) {
			this.headerTypeState = this.headerType;
		} else {
			this.headerTypeState = this.warnDefaultType();
		}
	}

	/**
	 * Print the missing `label` prop warning message
	 */
	validateTitleContent(newValue: string) {
		if (validatePropExists(newValue)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' title ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-card> ')
				.addRegularText('was not provided')
				.printMessage();
		}
	}

	/**
	 * Print the invalid `type` prop warning message
	 * @returns default type (secondary)
	 */
	private warnDefaultType(): CardType {
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' card-type ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-card> ')
			.addRegularText('was set to an invalid type; only')
			.addMonospaceText(' basic, image, title, horizontal ')
			.addRegularText('are supported. The default type')
			.addMonospaceText(' basic ')
			.addRegularText('is assumed.')
			.printMessage();
		return 'basic';
	}

	/**
	 * @returns the classes of the button based of the button's `type`.
	 */
	private getClass() {
		return `ontario-card ontario-card-type--${this.cardTypeState} ontario-card__cards-per-row--${this.cardTypeState}`;
	}

	public getId(): string {
		return this.elementId ?? '';
	}

	/**
	 * Set `buttonId`, `label`, and `ariaLabel` using internal component logic.
	 */
	componentWillLoad() {
		this.updateTitleContent();
		this.validateType();
		this.validateHeaderType();
		this.ariaTitleText = this.ariaTitleText ?? this.titleState;
	}

	/**
	 * This helper is used to help load translations for any slots + text content passed in by the user.
	 */
	componentDidLoad() {}

	render() {
		return (
			<button type={this.htmlTypeState} class={this.getClass()} aria-label={this.ariaLabelText} id={this.getId()}>
				{this.labelState}
			</button>
		);
	}
}
