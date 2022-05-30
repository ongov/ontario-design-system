import { Hint } from '../../utils/common.interface';

export interface HintExpander extends Hint {
	/**
	 * Content to display as the hint, once the expander is toggled open.
	 * Please note that any content that is passed into this prop will only be displayed as a string.
	 * If you would like to add HTML content, supply child content to the component.
	 */
	content: string;
}
