import { Component, Prop, Element, h, Watch, State } from '@stencil/core';
import { Card } from './card.interface';
import { CardType, CardTypes, HeaderType, HeaderTypes, CardsPerRow } from './ontario-card-types';
import { validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

@Component({
	tag: 'ontario-card',
	styleUrl: 'ontario-card.scss',
	shadow: true,
})
export class OntarioCard {
	@Element() host: HTMLElement;

	/**
	 * Used to include individual cards for the card component.
	 * This is passed in as an array of objects with key-value pairs.
	 *
	 * @example
	 * 	<ontario-card
	 * 		card-type="basic"
	 * 		header-type="default"
	 *		cards='[
	 *			{"label": "Card 1", "description": "This is a string"},
	 *			{"label": "Card 2", "description": "This is a string"}
	 *		]'
	 *	></ontario-card>
	 */
	@Prop() cards: string | Card[];

	/**
	 * The type of card to render.
	 *
	 * If no type is passed, it will default to 'basic'.
	 */
	@Prop() cardType: CardType = 'basic';

	/**
	 * The type of header to render.
	 */
	@Prop() headerType: HeaderType;

	/**
	 * The number of cards to display per row.
	 *
	 * If no number is passed, it will default to 3.
	 */
	@Prop() cardsPerRow: CardsPerRow = 3;

	/**
	 * Mutable variable, for internal use only.
	 * Set the card's type depending on validation result.
	 */
	@State() private cardTypeState: string;

	/**
	 * Mutable variable, for internal use only.
	 * Set the card's header type depending on validation result.
	 */
	@State() private headerTypeState: string;

	/**
	 * Internal state containing the parsed Cards.
	 */
	@State() private internalCards: Card[] = [];

	/**
	 * Mutable variable, for internal use only.
	 * Set number of cards per row depending on validation result.
	 */
	@State() cardsPerRowState: number;

	/**
	 * Parse cards data, this is used to handle JSON strings from HTML.
	 */
	@Watch('cards')
	private parseCards() {
		if (typeof this.cards !== 'undefined') {
			this.internalCards = Array.isArray(this.cards) ? this.cards : JSON.parse(this.cards);
		}
	}

	/**
	 * Watch for changes to the `cardType` property for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `cardType` will be set to its default (`basic`).
	 * If a match is found in one of the array values then `cardType` will be set to the matching array key value.
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
	 * Watch for changes to the `headerType` property for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `headerType` will be set to its default (`default`).
	 * If a match is found in one of the array values then `headerType` will be set to the matching array key value.
	 */
	@Watch('headerType')
	validateHeaderType() {
		const isValid = validateValueAgainstArray(this.headerType, HeaderTypes);
		if (isValid) {
			this.headerTypeState = this.headerType;
		} else {
			this.headerTypeState = this.headerType;
		}
	}

	/**
	 * Watch for changes to the `cardsPerRow` property for validation purposes.
	 *
	 * If the user input is not a number or is a negative number then `cardsPerRow` will be set to its default (3).
	 */
	@Watch('cardsPerRow')
	validateCardsPerRow() {
		if (isNaN(this.cardsPerRow) || (!isNaN(this.cardsPerRow) && this.cardsPerRow <= 0)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' cards-per-row ')
				.addRegularText('on')
				.addMonospaceText(' <ontario-card> ')
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
	 * Print the invalid `cardType` prop warning message.
	 * @returns default type (basic).
	 */
	private warnDefaultType(): CardType {
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' card-type ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-card> ')
			.addRegularText('was set to an invalid type; only')
			.addMonospaceText(' basic, image, label, horizontal ')
			.addRegularText('are supported. The default type')
			.addMonospaceText(' basic ')
			.addRegularText('is assumed.')
			.printMessage();
		return 'basic';
	}

	/**
	 * Determines the header style based on the headerType.
	 */
	private determineHeaderStyle() {
		switch (this.headerTypeState) {
			case 'default':
				this.headerTypeState = 'default';
				break;
			case 'darkAccent':
				this.headerTypeState = 'dark';
				break;
			case 'accent':
				this.headerTypeState = 'light';
				break;
			default:
				this.headerTypeState = 'default'; // Set a default value in case of an unknown state
		}

		return this.headerTypeState;
	}

	/**
	 * @returns the classes of the ontario cards based off the `cardType` and number of cards per row.
	 */
	private getClass() {
		return `ontario-card__container ontario-card-type--${this.cardTypeState} ontario-card--cards-per-row-${this.cardsPerRowState}`;
	}

	/**
	 * Set `buttonId`, `label`, and `ariaLabel` using internal component logic.
	 */
	componentWillLoad() {
		this.validateCardsPerRow();
		this.validateType();
		this.validateHeaderType();
		this.determineHeaderStyle();
		this.parseCards();
	}

	/**
	 * This helper is used to help load translations for any slots + text content passed in by the user.
	 */
	componentDidLoad() {}

	render() {
		return (
			<ul class={this.getClass()}>
				{this.internalCards?.map((card) => (
					<li
						class={`ontario-card
								ontario-card--${this.headerTypeState}
								${this.cardTypeState === 'horizontal' ? 'ontario-card--position-horizontal' : 'ontario-card--position-vertical'}
							`}
					>
						{card.image && (
							<div class="ontario-card__image-container">
								<img class="ontario-card__image" src={card.image} />
							</div>
						)}
						<div
							class={`
									ontario-card__text-container
									${card.image ? 'ontario-card--image-true' : ''}
								`}
						>
							<h2 class="ontario-card__heading">
								<a href="#">{card.label}</a>
							</h2>
							{card.description && (
								<div class="ontario-card__description">
									<p>{card.description}</p>
								</div>
							)}
						</div>
					</li>
				))}
			</ul>
		);
	}
}
