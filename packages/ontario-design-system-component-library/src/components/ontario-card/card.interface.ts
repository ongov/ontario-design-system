import { Base } from '../../utils/common/common.interface';

export interface Card extends Base {
	/**
	 * Text to be displayed within the header.
	 */
	label: string;

	/**
	 * Image to be displayed within the card image container.
	 *
	 * This is optional.
	 */
	image?: string;

	/**
	 * Text to be displayed within the card description container.
	 *
	 * This is optional.
	 */
	description?: string;

	/**
	 * Provides more context as to what the card interaction is doing. This should only be used for accessibility purposes, if the card interaction requires more description than what the text provides.
	 *
	 * This is optional.
	 *
	 * @example
	 * 	<ontario-card
	 * 		card-type="basic"
	 * 		header-type="default"
	 *		cards='[
	 *			{"label": "Card 1", "aria-label-text": "Clicking this card will lead to the contact page", "description": "This is a string"},
	 *			{"label": "Card 2", "description": "This is a string"}
	 *		]'
	 *	></ontario-card>
	 */
	ariaLabelText?: string;
}
