import { CaptionType } from './input-caption.types';

export interface Caption {
	/**
	 * The text to display as the caption. Must be implemented.
	 */
	captionText: string;

	/**
	 * The type of caption to render.
	 * This is optional - if no type is passed, the "default" type will render.
	 */
	captionType?: CaptionType;
}

export interface CaptionInfo extends Caption {
	/**
	 * Determine whether the input field is required.
	 */
	required?: boolean;

	/**
	 * Determine whether the rendered element is a `<label>` or `<legend>`.
	 */
	isLegend?: boolean;

	/**
	 * Name of the component instantiating the class.
	 * This is used for the validation warning message.
	 */
	componentTagName: string;

	translations: any;

	language: any;
}
