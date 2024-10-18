import { Component, Prop, Element, h, State, Watch } from '@stencil/core';
import {
	HeaderColour,
	HeaderColours,
	HorizontalImagePositionType,
	HorizontalImageSizeType,
	Layout,
	Layouts,
} from './ontario-card-types';
import { validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { printArray } from '../../utils/helper/utils';

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
	 * The layout oritnetation of the card.
	 *
	 * If no type is passed, it will default to 'vertical'.
	 *
	 */
	@Prop() layout?: Layout = 'vertical';

	/**
	 * Set the card's header colour.
	 *
	 * This is optional.
	 */
	@Prop() headerColour?: HeaderColour;

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
	 * Set the card's layout depending on validation result.
	 */
	@State() private layoutState: string;

	/**
	 * Watch for changes to the `layout` property for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `layout` will be set to its default (`vertical`).
	 * If a match is found in one of the array values then `layoutState` will be set to the matching array key value.
	 */
	@Watch('layout')
	validateLayout() {
		if (this.layout) {
			const isValid = validateValueAgainstArray(this.layout, Layouts);
			if (isValid) {
				this.layoutState = this.layout;
			} else {
				this.warnDefaultLayout();
				this.layoutState = 'vertical';
			}
		}
	}

	/**
	 * Watch for changes to the `headerColour` property for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `headerColour` will be kept empty ('').
	 * If a match is found in one of the array values then `headerColour` will be set to the matching array key value.
	 */
	@Watch('headerColour')
	validateHeaderColour() {
		if (this.headerColour) {
			const isValid = validateValueAgainstArray(this.headerColour, HeaderColours);

			if (!isValid) {
				this.warnDefaultHeaderColour();
				this.headerColour = '';
			}
		}
	}

	/**
	 * Print the invalid `layout` prop warning message.
	 */
	private warnDefaultLayout() {
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' layout ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-card> ')
			.addRegularText('was set to an invalid layout; only ')
			.addMonospaceText(printArray([...Layouts]))
			.addRegularText(' are supported. The default layout')
			.addMonospaceText(' vertical ')
			.addRegularText('is assumed.')
			.printMessage();
	}

	/**
	 * Print the invalid `headerColour` prop warning message.
	 */
	private warnDefaultHeaderColour() {
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' header-colour ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-card> ')
			.addRegularText('was set to an invalid colour; only ')
			.addMonospaceText(printArray([...HeaderColours]))
			.addRegularText(' are supported. ')
			.addRegularText('No colour is assumed as the default.')
			.printMessage();
	}

	/**
	 * Returns the top level classes of the card.
	 *
	 * @returns {string}
	 */
	private getCardClasses(): string {
		const baseClass =
			this.layoutState === 'horizontal'
				? `ontario-card ontario-card__card-type--${this.layoutState} ontario-card__image-${this.horizontalImagePositionType} ontario-card__image-size-${this.horizontalImageSizeType}`
				: `ontario-card ontario-card__card-type--basic ontario-card--position-${this.layoutState}`;

		const descriptionClass = this.description ? '' : ' ontario-card__description-false';

		const backgroundClass =
			this.headerColour && !this.description ? `ontario-card__background--${this.headerColour}` : '';

		return `${baseClass} ${descriptionClass} ${backgroundClass}`.trim();
	}

	/**
	 * Returns the heading classes of the card.
	 *
	 * @returns {string}
	 */
	private getCardHeadingClasses(): string {
		const baseClass = 'ontario-card__heading';

		const backgroundClass =
			this.headerColour && validateValueAgainstArray(this.headerColour, HeaderColours)
				? `ontario-card__heading--${this.headerColour}`
				: '';

		return `${baseClass} ${backgroundClass}`.trim();
	}

	/**
	 * Returns the url that the card links to.
	 *
	 * @returns {string}
	 */
	private getHref(): string {
		return this.cardLink ? this.cardLink : '#';
	}

	/**
	 * Component life cycle hook.
	 *
	 * https://stenciljs.com/docs/component-lifecycle#connectedcallback
	 */
	componentWillLoad() {
		this.validateLayout();
		this.validateHeaderColour();
	}

	render() {
		return (
			<li class={this.getCardClasses()}>
				{this.image && (
					<div class="ontario-card__image-container">
						<a href={this.getHref()} aria-label={this.ariaLabelText}>
							<img class="ontario-card__image" src={this.image} />
						</a>
					</div>
				)}
				<div class={`ontario-card__text-container ${this.image ? 'ontario-card--image-true' : ''}`}>
					<h2 class={this.getCardHeadingClasses()}>
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
