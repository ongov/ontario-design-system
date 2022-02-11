import { Hint } from '../../utils/common.interface';

export interface HintExpander extends Hint {
	/**
	 * Content to display as the hint, once the expander is toggled open
	 */
	content: string;

	/**
	 * Include visually hidden text inside the label that describes to screen readers the availability of a hint expander
	 */
	ariaLabel?: string;

	/**
	 * Used to used check if the parent component is an input.
	 */
	inputExists?: boolean;
}
