export interface TableColumnOptions {
	/**
	 * The text for the column.
	 */
	title: string;

	/**
	 * The unique key of the column. This will be the reference point for the table data rows.
	 */
	key: string | number;

	/**
	 * The type of display for the data that falls under this column. This can either be set to “string” or “numeric”.
	 *
	 * This is optional. If no prop is passed, the default will be set to “string”.
	 */
	type?: 'string' | 'numeric' | undefined;

	/**
	 * The width of the column. The number values are equivalent to the grid column width values.
	 *
	 * This is optional. By default the column width will fit its max content.
	 */
	colSpan?: 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
}

export interface TableRowOptions {
	/**
	 * The data to input into the table rows.
	 *
	 * The keys for the data objects passed in should reflect the respective keys of the TableColumnOptions.
	 */
	data: { [key: string]: string | number | undefined };

	/**
	 * A boolean value to indicate whether or not the row should be highlighted.
	 *
	 * This is optional. If no prop is passed, it will default to false.
	 */
	highlight?: boolean | undefined;

	/**
	 * A boolean value to indicate whether or not the row should be styled as a subtotal.
	 *
	 * This is optional. If no prop is passed, it will default to false.
	 */
	subtotal?: boolean | undefined;

	/**
	 * A boolean value to indicate whether or not the row should be coded as a table footer.
	 *
	 * This is optional. If no prop is passed, it will default to false.
	 */
	footer?: boolean | undefined;
}

export interface Table {
	/**
	 * Specifies the caption (or title) of the table.
	 *
	 * This is optional.
	 */
	caption?: string | undefined;

	/**
	 * Used to define the columns of the table.
	 */
	tableColumns: string | TableColumnOptions[];

	/**
	 * Used to define the table body data. Note that the keys passed to the data object in the tableData should match the keys of the columns defined in the tableColumns prop.
	 */
	tableData: string | TableRowOptions[];

	/**
	 * Indicates whether or not the table data should have alternate row zebra striping.
	 *
	 * This is optional. By default, zebra striping will be added when the table rows extend 5 rows. If zebra striping is needed to table rows less than 5 rows, the prop should be set to “enabled”. If no zebra stripes are needed, it should be set to “disabled”.
	 *
	 * The default will be set to “auto”.
	 */
	zebraStripes?: 'auto' | 'disabled' | 'enabled' | undefined;

	/**
	 * Used to specify whether or not table data in cells should have reduced top and bottom padding. This is useful for pages with multiple data-heavy tables such as a budget or financial data.
	 *
	 * This is optional. By default it will be set to “false”.
	 */
	condensed?: boolean | undefined;

	/**
	 * Used to specify whether or not the table should extend the full width of its container.
	 *
	 * This is optional. By default, it will be set to “false”
	 */
	fullWidth?: boolean | undefined;
}
