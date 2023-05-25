import { Base } from '../../utils/common/common.interface';

export interface Blockquote extends Base {
	/**
	 * Text to be displayed as the quote. Note that wrapping the quotes in quotations is not needed - this is handled through the component styles.
	 */
	quote: string;

	/**
	 * Optional text to be displayed as the attribution (the author) of the quote.
	 */
	attribution?: string;

	/**
	 * Optional text to be displayed for additional information about the attribution/author.
	 */
	byline?: string | undefined;
}
