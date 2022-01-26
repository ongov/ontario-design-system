export interface Label {
	/**
	 * The text to display as label. Must be implemented.
	 */
	labelCaption: string;

	/**
	 * The form control with which the caption is associated. Must be implemented.
	 */
	labelFor?: string;

	/**
	 * The type of label to render. Must be implemented.
	 */
	labelType: string;
}
