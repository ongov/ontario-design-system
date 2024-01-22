import { Component, Prop, Element, h, State, Watch } from '@stencil/core';
import {
	CardType,
	CardTypes,
	HeaderType,
	HeaderTypes,
	HorizontalImagePositionType,
	HorizontalImageSizeType,
} from './ontario-card-types';
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
	 * Text to be displayed within the header.
	 *
	 * @example
	 *	<ontario-card
	 *		header-type="dark"
	 *		card-type="horizontal"
	 *		label="Card Title 1"
	 *		description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
	 *	>
	 */
	@Prop() label: string;

	/**
	 * Image to be displayed within the card image container.
	 *
	 * This is optional.
	 */
	@Prop() image?: string;

	/**
	 * Text to be displayed within the card description container.
	 *
	 * This is optional.
	 */
	@Prop() description?: string;

	/**
	 * Action link for when the card is clicked.
	 *
	 * This is optional.
	 */
	@Prop() cardLink?: string;

	/**
	 * The type of card to render.
	 *
	 * If no type is passed, it will default to 'basic'.
	 *
	 */
	@Prop() cardType: CardType = 'basic';

	/**
	 * The type of header to render.
	 *
	 * If no type is passed, it will default to 'default'.
	 */
	@Prop() headerType: HeaderType = 'default';

	/**
	 * The position of the image when the card-type is set to 'horizontal'.
	 *
	 * This prop is only necessry when the card-type is set to 'horizontal'.
	 *
	 * @example
	 * 	<ontario-card
	 *		card-type="horizontal"
	 *		label="Card Title 1"
	 *		image="https://picsum.photos/200/300"
	 *		horizontal-image-position-type="left"
	 *		horizontal-image-size-type="one-fourth"
	 *	  description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
	 *	>
	 *	</ontario-card>
	 */
	@Prop() horizontalImagePositionType?: HorizontalImagePositionType = 'left';

	/**
	 * The size of the image when the card-type is set to 'horizontal'.
	 *
	 * This prop is only necessry when the card-type is set to 'horizontal'.
	 *
	 * @example
	 * 	<ontario-card
	 *		card-type="horizontal"
	 *		label="Card Title 1"
	 *		image="https://picsum.photos/200/300"
	 *		horizontal-image-position-type="left"
	 *		horizontal-image-size-type="one-fourth"
	 *	  description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
	 *	>
	 *	</ontario-card>
	 */
	@Prop() horizontalImageSizeType?: HorizontalImageSizeType = 'one-third';

	/**
	 * Provides more context as to what the card interaction is doing. This should only be used for accessibility purposes, if the card interaction requires more * * description than what the text provides.
	 *
	 * This is optional.
	 *
	 */
	@Prop() ariaLabelText?: string;

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
	 * Watch for changes to the `cardType` property for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `cardType` will be set to its default (`basic`).
	 * If a match is found in one of the array values then `cardType` will be set to the matching array key value.
	 */
	@Watch('cardType')
	validateCardType() {
		const isValid = validateValueAgainstArray(this.cardType, CardTypes);
		if (isValid) {
			this.cardTypeState = this.cardType;
		} else {
			this.cardTypeState = this.warnDefaultCardType();
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
			this.headerTypeState = this.warnDefaultHeaderType();
		}
	}

	/**
	 * Print the invalid `cardType` prop warning message.
	 * @returns default type (basic).
	 */
	private warnDefaultCardType(): CardType {
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
	 * Print the invalid `headerType` prop warning message.
	 * @returns default type (default).
	 */
	private warnDefaultHeaderType(): HeaderType {
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' header-type ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-card> ')
			.addRegularText('was set to an invalid type; only')
			.addMonospaceText(' default, light, dark')
			.addRegularText('are supported. The default type')
			.addMonospaceText(' default ')
			.addRegularText('is assumed.')
			.printMessage();
		return 'default';
	}

	/**
	 * @returns the classes of the ontario cards based off the `cardType` and `headerType`.
	 */
	private getClass() {
		if (this.cardTypeState === 'horizontal') {
			return `ontario-card ontario-card__card-type--horizontal ontario-card__image-${this.horizontalImagePositionType} ontario-card__image-size-${this.horizontalImageSizeType}`;
		} else {
			// Return other classes when cardTypeState is not 'horizontal'
			return `ontario-card ontario-card__header-type--${this.headerTypeState} ontario-card__card-type--${this.cardTypeState}`;
		}
	}

	private getHref() {
		return this.cardLink ? this.cardLink : '#';
	}

	componentWillLoad() {
		this.validateCardType();
		this.validateHeaderType();
	}

	render() {
		return (
			<li class={this.getClass()}>
				{this.image && (
					<div class="ontario-card__image-container">
						<a href={this.getHref()} aria-label={this.ariaLabelText}>
							<img class="ontario-card__image" src={this.image} />
						</a>
					</div>
				)}
				<div class={`ontario-card__text-container ${this.image ? 'ontario-card--image-true' : ''}`}>
					<h2 class="ontario-card__heading">
						<a href={this.getHref()} aria-label={this.ariaLabelText}>
							{this.label}
						</a>
					</h2>
					{this.description && (
						<div class="ontario-card__description">
							<p>{this.description}</p>
						</div>
					)}
				</div>
			</li>
		);
	}
}
