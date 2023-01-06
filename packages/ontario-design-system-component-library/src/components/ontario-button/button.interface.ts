import { Base } from '../../utils/common.interface';
import { ButtonType, HtmlType } from './ontario-button.types';

export interface Button extends Base {
	/**
	 * The type of button to render.
	 */
	type: ButtonType;

	/**
	 * The native HTML button type the button should use.
	 */
	htmlType: HtmlType;

	/**
	 * Text to be displayed within the button. This will override the text provided through the Element Content.
	 *
	 * @example
	 * <ontario-button label="Label Text">Text</ontario-button>
	 *
	 * The resulting button will have the label `"Label Text"`.
	 */
	label?: string;

	/**
	 * Provides more context as to what the button interaction is doing. This is optional.
	 *
	 * @example
	 * <ontario-button aria-label-text="Click button to open map">Open</ontario button>
	 */
	ariaLabelText?: string;

	/**
	 * The unique identifier of the button. This is optional - if no ID is passed, one will be generated.
	 */
	elementId?: string;
}
