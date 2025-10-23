import { Base } from '../../utils/common/common.interface';

export interface Accordion extends Base {
	/**
	 * The label for the individual accordion button.
	 */
	label: string;

	/**
	 * The content type of the accordion.
	 * If no prop is passed, it will default to a string.
	 * If the accordion requires multiple lines or HTML, the `accordionContentType` prop should be set to `html`.
	 */

	accordionContentType: 'string' | 'html';

	/**
	 * The content that is passed into each accordion.
	 */
	content: string;

	/**
	 * A boolean to track whether the accordion is expanded or collapsed.
	 */
	isOpen: boolean;

	/**
	 * Custom Aria Label text for the section.
	 */
	ariaLabelText: string;
}

/**
 * The event detail payload emitted by the accordion component.
 */
export interface AccordionChangeDetail {
	/** Array of indexes currently open */
	openIndexes: number[];

	/** The index that was just toggled (if applicable) */
	changedIndex?: number;

	/** True if triggered by expand/collapse all */
	isBulk?: boolean;

	/** Optional description of what triggered the event */
	reason?: 'init' | 'toggle-one' | 'toggle-all';
}
