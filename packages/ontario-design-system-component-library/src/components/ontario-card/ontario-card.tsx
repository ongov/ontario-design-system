import { Component, Prop, Element, h, State, Watch } from '@stencil/core';
import {
	headerColours,
	HeaderColourType,
	HorizontalImagePositionType,
	HorizontalImageSizeType,
	layouts,
	LayoutType,
	CardStateType,
} from './ontario-card-types';
import { headingLevels, HeadingLevelType } from '../../utils/common/common.interface';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { printArray } from '../../utils/helper/utils';
import { validateValueAgainstArray } from '../../utils/validation/validation-functions';

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
	 * The heading level that the label will be rendered as.
	 *
	 * @example
	 *	<ontario-card
	 *		heading-level="h4"
	 *		label="Card Title 1"
	 *	>
	 */
	@Prop() headingLevel: HeadingLevelType = 'h2';

	/**
	 * Image to be displayed within the card image container.
	 *
	 * This is optional.
	 */
	@Prop() image?: string;

	/**
	 * Alt text for the card's image.
	 *
	 * This is optional prop, but may be required for an
	 * image due to accessibility requirements.
	 *
	 * You can find guidance on when to add alt text to an image
	 * on the Ontario.ca web content editing guide.
	 *
	 * https://www.ontario.ca/page/ontario-ca-web-content-editing-guide#alt-text-image-accessibility
	 */
	@Prop() imageAltText?: string;

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
	@Prop() layout?: LayoutType = 'vertical';

	/**
	 * Set the card's header colour.
	 *
	 * This is optional.
	 */
	@Prop() headerColour?: HeaderColourType;

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

	@State() private cardState: CardStateType = {
		headerColour: undefined,
		headingLevel: undefined,
		layout: undefined,
	};

	/**
	 * Watch for changes to the `layout` property for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `layout` will be set to its default (`vertical`).
	 * If a match is found in one of the array values then `layoutState` will be set to the matching array key value.
	 */
	@Watch('layout')
	validateLayout() {
		if (this.layout) {
			const isValid = validateValueAgainstArray(this.layout, layouts);

			if (!isValid) {
				this.warnDefaultLayout();
				this.cardState.layout = 'vertical';
				return;
			}

			this.cardState.layout = this.layout;
		}
	}

	/**
	 * Watch for changes to the `headingLevel` property for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `headingLevel` will be set to its default (`h2`).
	 *
	 * If a match is found in one of the array values then `headingLevel` will be set to the matching array key value.
	 */
	@Watch('headingLevel')
	validateHeadingLevel() {
		if (this.headingLevel) {
			const isValid = validateValueAgainstArray(this.headingLevel, headingLevels);

			if (!isValid) {
				this.warnDefaultHeadingLevel();
				this.cardState.headingLevel = 'h2';
				return;
			}

			this.cardState.headingLevel = this.headingLevel;
		}
	}

	/**
	 * Watch for changes to the `headerColour` property for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `headerColour` will be kept empty (undefined).
	 * If a match is found in one of the array values then `headerColour` will be set to the matching array key value.
	 */
	@Watch('headerColour')
	validateHeaderColour() {
		if (this.headerColour) {
			const isValid = validateValueAgainstArray(this.headerColour, headerColours);

			if (!isValid) {
				this.warnDefaultHeaderColour();
				this.cardState.headerColour = undefined;
				return;
			}

			this.cardState.headerColour = this.headerColour;
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
			.addRegularText('was set to an invalid value of ')
			.addMonospaceText(`${this.layout}`)
			.addRegularText('. Only ')
			.addMonospaceText(printArray([...layouts]))
			.addRegularText(' are supported values. The default value of')
			.addMonospaceText(' vertical ')
			.addRegularText('is assumed.')
			.printMessage();
	}

	/**
	 * Print the invalid `headingLevel` prop warning message.
	 */
	private warnDefaultHeadingLevel() {
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' heading-level ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-card> ')
			.addRegularText('was set to an invalid value of ')
			.addMonospaceText(`${this.headingLevel}`)
			.addRegularText('. Only ')
			.addMonospaceText(printArray([...headingLevels]))
			.addRegularText(' are supported values. The default value of')
			.addRegularText(' h2 ')
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
			.addRegularText('was set to an invalid value of ')
			.addMonospaceText(`${this.headerColour}`)
			.addRegularText('. Only ')
			.addMonospaceText(printArray([...headerColours]))
			.addRegularText(' are supported values. The default value of')
			.addMonospaceText(' undefined ')
			.addRegularText('is assumed.')
			.printMessage();
	}

	/**
	 * Update a key within the State Object with a value.
	 *
	 * @param {keyof CardStateType} key - Should match a key found within `CardStateType`.
	 * @param {any} value - Should match the value type associated to the key within `CardStateType`.
	 */
	private updateState(key: keyof CardStateType, value: any) {
		let cardStateCopy = { ...this.cardState };
		cardStateCopy[key] = value;
		this.cardState = cardStateCopy;
	}

	/**
	 * Returns the top level classes of the card.
	 *
	 * @returns {string}
	 */
	private getCardClasses(): string {
		const baseClass =
			this.cardState.layout === 'horizontal'
				? `ontario-card ontario-card__card-type--${this.cardState.layout} ontario-card__image-${this.horizontalImagePositionType} ontario-card__image-size-${this.horizontalImageSizeType}`
				: `ontario-card ontario-card__card-type--basic ontario-card--position-${this.cardState.layout}`;

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

		const backgroundClass = this.cardState.headerColour ? `ontario-card__heading--${this.cardState.headerColour}` : '';

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
		this.updateState('headerColour', this.headerColour);
		this.updateState('headingLevel', this.headingLevel);
		this.updateState('layout', this.layout);
		this.validateLayout();
		this.validateHeadingLevel();
		this.validateHeaderColour();
	}

	render() {
		return (
			<li class={this.getCardClasses()}>
				{this.image && (
					<div class="ontario-card__image-container">
						<a href={this.getHref()} aria-label={this.ariaLabelText}>
							<img class="ontario-card__image" alt={this.imageAltText} src={this.image} />
						</a>
					</div>
				)}
				<div class={`ontario-card__text-container ${this.image ? 'ontario-card--image-true' : ''}`}>
					{/**
					 * h() is a stencil wrapped shorthand method for a render function, and is very
					 * similar to the h() method or createElement() method found within React
					 * It accepts 3 parameters:
					 *  - a string interpretation of an HTML tag (e.g. 'h2')
					 *  - an object of properties / attributes (e.g. 'id', 'className')
					 *  - The innerHTML such as a string, or additional HTML elements
					 */}
					{h(
						this.cardState.headingLevel, //tag
						{ className: this.getCardHeadingClasses() }, //attributes
						<a href={this.getHref()} aria-label={this.ariaLabelText}>
							{this.label}
						</a>,
					)}
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
