import { CaptionType } from './input-caption.enum';

export interface Caption {
	/**
	 * The text to display as caption. Must be implemented.
	 */
	caption: string;

	/**
	 * The type of caption to render. Must be implemented.
	 */
	captionType: CaptionType;

	/**
	 * Determine whether the input field is required.
	 */
	isRequired?: boolean;
}
