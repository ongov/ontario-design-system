import { Base } from '../../utils/common/common.interface';

export interface Accordion extends Base {
	/**
	 * The label for the individual accordion button.
	 */
	label: string;

	/**
	 * The content is expecting an array of strings to populate the `<ul>` element within each individual accordion.
	 */
	content: string[];

	/**
	 * A boolean to track whether the accordion is expanded or collapsed.
	 */
	isOpen: boolean;
}
