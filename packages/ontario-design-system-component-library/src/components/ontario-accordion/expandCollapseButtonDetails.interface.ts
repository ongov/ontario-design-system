export interface ExpandCollapseButtonDetails {
	/**
	 * The label for the 'Expand all' button.
	 *
	 * @example
	 *  <ontario-accordion
	 *		name="My Accordion"
	 *		expand-collapse-button='{
	 *			expandAllSectionsLabel="Expand All",
	 *			collapseAllSectionsLabel="Collapse All"
	 *		}'
	 *		accordion-data='[
	 *			{"label": "Accordion 1", "content": ["Item 1", "Item 2", "Item 3"]},
	 *			{"label": "Accordion 2", "content": ["Item A", "Item B", "Item C"]}
	 *		]'
	 *	></ontario-accordion>
	 *
	 */
	expandAllSectionsLabel: string;

	/**
	 * The label for the 'Collapse all' button.
	 *
	 * @example
	 *  <ontario-accordion
	 *		name="My Accordion"
	 *		expand-collapse-button='{
	 *			expandAllSectionsLabel="Expand All",
	 *			collapseAllSectionsLabel="Collapse All"
	 *		}'
	 *		accordion-data='[
	 *			{"label": "Accordion 1", "content": ["Item 1", "Item 2", "Item 3"]},
	 *			{"label": "Accordion 2", "content": ["Item A", "Item B", "Item C"]}
	 *		]'
	 *	></ontario-accordion>
	 *
	 */
	collapseAllSectionsLabel: string;

	/**
	 * The alt text for the expand/close button.
	 */
	ariaLabelText: string;
}
