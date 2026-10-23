export interface TagToggledDetail {
	/**
	 * The text of the tag.
	 */
	label: string;

	/**
	 * The tag's `value`, or its label if none was set.
	 */
	value: string;

	/**
	 * Whether the tag is now selected.
	 */
	selected: boolean;
}

export interface TagDismissedDetail {
	/**
	 * The text of the tag.
	 */
	label: string;

	/**
	 * The tag's `value`, or its label if none was set.
	 */
	value: string;
}
