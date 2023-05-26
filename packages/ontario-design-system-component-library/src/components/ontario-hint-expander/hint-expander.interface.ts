import { Hint } from '../../utils/common/common.interface';

export interface HintExpander extends Hint {
	/**
	 * Content to display as the hint, once the expander is toggled open.
	 * Please note that any content that is passed into this prop will only be displayed as a string.
	 * If you would like to add HTML content, supply child content to the component.
	 *
	 * @example
	 * <ontario-hint-expander hint="This is the hint"
	 *   <img src="https://www.jquery-az.com/html/images/banana.jpg" title="Title of image" alt="alt text here"/>
	 *   <p> Here is the content beside the image </p>
	 * </ontario-hint-expander>
	 */
	content: string;
}
