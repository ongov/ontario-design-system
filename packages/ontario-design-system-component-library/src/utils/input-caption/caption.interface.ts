import { CaptionType } from './input-caption.enum';

export interface Caption {
	/**
	 * The text to display as caption. Must be implemented.
	 */
	captionText: string;

	/**
	 * The type of caption to render. Must be implemented.
	 */
	captionType: CaptionType;

	/**
	 * Determine whether the input field is required.
	 */
	isRequired?: boolean;

	/**
	 * Determine whether the rendered element is a `<label>` or `<legend>`.
	 */
	isLegend?: boolean;

	/**
	 * Name of the component instantiating the class.
	 * This is used for validation warning message.
	 */
	componentTagName: string;
}
