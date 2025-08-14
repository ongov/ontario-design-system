import { Component, h, Element, Prop, State, Watch, getAssetPath } from '@stencil/core';

import { Table, TableColumnOptions, TableRowOptions } from './table.interface';

import { validateTableColumns, validateTableRowOptions } from './utils/ontario-table-validation';

import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { ConsoleType } from '../../utils/console-message/console-message.enum';
import { extractValuesByKey, organizeObjectKeys, removeObjectsBySpecificKey } from '../../utils/helper/utils';

@Component({
	tag: 'ontario-table',
	styleUrl: 'ontario-table.scss',
	shadow: true,
	assetsDirs: ['./assets'],
})
export class OntarioTable implements Table {
	@Element() element: HTMLElement;
	private tableScrollWrapper: HTMLElement;
	private tableScrollDiv: HTMLElement;
	private table: HTMLElement;

	/**
	 * Specifies the caption (or title) of the table.
	 *
	 * This is optional.
	 */
	@Prop() caption?: string | undefined;

	/**
	 * Used to define the columns of the table.
	 *
	 * @example;
	 * <ontario-table
	 *    table-columns='[
	 *      { "title": "Type of service", "key": "service" },
	 *      { "title": "Processing and delivery", "key": "processing" },
	 *      { "title": "Cost", "key": "cost", "type": "numeric" }
	 *    ]'
	 * >
	 * </ontario-table>
	 */
	@Prop() tableColumns: string | TableColumnOptions[];

	/**
	 * Used to define the table body data. Note that the keys passed to the `data` object in the tableData should match the keys of the columns defined in the tableColumns prop.
	 *
	 * @example
	 * <ontario-table
	 *  table-data='[
	 *    {
	 *      "data": {
	 *        "service": "Regular service (online)",
	 *        "processing": "15 business days plus delivery by Canada Post",
	 *        "cost": "$15"
	 *      }
	 *    },
	 *    {
	 *      "data": {
	 *        "service": "Premium service (online)",
	 *        "cost": "$45",
	 *        "processing": "5 business days including delivery by courier"
	 *      }
	 *    }
	 *  ]'
	 * >
	 * </ontario-table>
	 */
	@Prop() tableData: string | TableRowOptions[];

	/**
	 * Indicates whether or not the table data should have alternate row zebra striping.
	 *
	 * This is optional. By default, zebra striping will be added when the table rows extend 5 rows. If zebra striping is needed to table rows less than 5 rows, the prop should be set to “enabled”. If no zebra stripes are needed, it should be set to “disabled”.
	 *
	 * The default will be set to “auto”.
	 */
	@Prop() zebraStripes?: 'auto' | 'disabled' | 'enabled' | undefined = 'auto';

	/**
	 * Used to specify whether or not table data in cells should have reduced top and bottom padding. This is useful for pages with multiple data-heavy tables such as a budget or financial data.
	 *
	 * This is optional. By default it will be set to “false”.
	 */
	@Prop() condensed?: boolean | undefined = false;

	/**
	 * Used to specify whether or not the table should extend the full width of its container.
	 *
	 * This is optional. By default, it will be set to “false”
	 */
	@Prop() fullWidth?: boolean | undefined = false;

	@State() private tableColumnsState: TableColumnOptions[];

	@State() private tableDataState: TableRowOptions[];

	@State() private tableFooterState: TableRowOptions[];

	@Watch('tableColumns')
	private processTableColumns() {
		if (this.tableColumns) this.parseTableColumns(this.tableColumns);
	}

	@Watch('tableData')
	private processTableData() {
		if (this.tableData) this.parseTableData(this.tableData);
	}

	/**
	 * Parsse and validates the `tableColumns` prop.
	 * If the prop is a string, it will be parsed as JSON.
	 * Validated output is stored in `tableColumnsState`.
	 *
	 * If parsing or validation fails, an error message is logged and the state is set to an empty array as a fallback.
	 */
	private parseTableColumns(columns: string | TableColumnOptions[]) {
		try {
			this.tableColumnsState = typeof columns === 'string' ? JSON.parse(columns) : columns;
			validateTableColumns(this.tableColumnsState);
		} catch (error) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addRegularText(' failed to parse ')
				.addMonospaceText('tableColumns')
				.addRegularText(' for ')
				.addMonospaceText('<ontario-table>')
				.addRegularText(' — check for valid JSON format or structure.\n')
				.addMonospaceText(error.stack)
				.printMessage(ConsoleType.Error);
			this.tableColumnsState = []; // Fallback to prevent render failure
		}
	}

	/**
	 * Parses and validates the `tableData` prop.
	 * If the prop is a string, it will be parsed as JSON.
	 * The parsed object is transformed for internal use and stored in `tableDataState` and `tableFooterState`.
	 *
	 * If parsing or validation fails, logs an error and sets both data states to empty arrays as a fallback.
	 */
	private parseTableData(data: string | TableRowOptions[]) {
		try {
			const parsed = typeof data === 'string' ? JSON.parse(data) : data;
			this.transformTableData(parsed);
			validateTableRowOptions(parsed);
		} catch (error) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addRegularText(' failed to parse ')
				.addMonospaceText('tableData')
				.addRegularText(' for ')
				.addMonospaceText('<ontario-table>')
				.addRegularText(' — check for valid JSON format or structure.\n')
				.addMonospaceText(error.stack)
				.printMessage(ConsoleType.Error);
			this.tableDataState = [];
			this.tableFooterState = []; // Prevents render issues when data is invalid
		}
	}

	private transformTableData = (tableData: TableRowOptions[]) => {
		// get column keys
		const columns = extractValuesByKey<TableColumnOptions>(this.tableColumnsState, 'key').filter(
			(column): column is keyof TableRowOptions => column !== undefined,
		);

		// organize table data data object according to the order of the column keys
		const organizedTableData = organizeObjectKeys(tableData, columns);

		// remove the footer table data into it's own state so that it can be rendered in a `tfoot` element
		const [updatedTableData, tableFooterData] = removeObjectsBySpecificKey(organizedTableData, 'footer', true);

		this.tableDataState = updatedTableData;
		this.tableFooterState = tableFooterData;
	};

	private getZebraStripeClass = () => {
		return this.zebraStripes === 'disabled'
			? `ontario-table--no-zebra-stripes`
			: this.zebraStripes === 'enabled'
				? `ontario-table--zebra-stripes-enabled`
				: ``;
	};

	private getTableClasses = () => {
		let tableClass = '';
		if (this.condensed && this.fullWidth) {
			tableClass = `ontario-table--condensed ontario-table--full-container-width`;
		} else if (this.condensed) {
			tableClass = `ontario-table--condensed`;
		} else if (this.fullWidth) {
			tableClass = `ontario-table--full-container-width`;
		}

		const zebraStripesClass = this.getZebraStripeClass();
		if (tableClass) {
			tableClass = `${tableClass} ${zebraStripesClass}`;
		} else {
			tableClass = zebraStripesClass;
		}

		return tableClass;
	};

	private getColumnClasses = (columnData: TableColumnOptions) => {
		if (columnData.type === 'numeric' && columnData.colSpan) {
			return `ontario-table-cell--numeric ontario-table-header--column-span-${columnData.colSpan}`;
		} else if (columnData.type === 'numeric') {
			return `ontario-table-cell--numeric`;
		} else if (columnData.colSpan) {
			return `ontario-table-header--column-span-${columnData.colSpan}`;
		}

		return;
	};

	// A function used to generate the table header and table definitions for the table body and table footer sections.
	private generateTableDataHTML = (
		dataType: 'tableData' | 'tableFooter',
		rowData: any,
		columns: (string | number | undefined)[],
		rowClass?: string | undefined,
	) => {
		return (
			<tr class={dataType === 'tableData' ? rowClass : ''}>
				{this.tableColumnsState.map((column, index) => {
					const type = column.type;
					const tdClass = type === 'numeric' ? `ontario-table-cell--numeric` : '';

					return index === 0 ? (
						<th scope="row" innerHTML={rowData.data[`${columns[0]}`]}>
							{dataType === 'tableData' && rowData.highlight && (
								<img
									class="ontario-table--highlight-indicator"
									src={getAssetPath('./assets/highlight-indicator.svg')}
								></img>
							)}
						</th>
					) : (
						<td class={tdClass} innerHTML={rowData.data[`${columns[index]}`]}></td>
					);
				})}
			</tr>
		);
	};

	// Helper function to apply the scrollbar styles to the tops of tables
	private applyScrollbar(tableElement: Element, scrollerDiv: HTMLElement) {
		scrollerDiv.style.visibility = 'visible';
		scrollerDiv.style.height = '20px';
		scrollerDiv.style.width = `${tableElement.scrollWidth}px`;
	}

	// The following logic adds scrollbar functionality to the tops of tables depending on their size.
	componentDidLoad() {
		const tables = this.table;
		const scrollerDivs = this.tableScrollDiv;
		const scrollerWrappers = this.tableScrollWrapper;

		if (typeof window !== 'undefined') {
			let resizeObserver = new ResizeObserver(() => {
				this.applyScrollbar(tables, scrollerDivs);
			});

			this.applyScrollbar(tables, scrollerDivs);
			resizeObserver.observe(tables);

			tables.addEventListener('scroll', () => {
				this.applyScrollbar(tables, scrollerDivs);

				scrollerWrappers.scrollLeft = tables.scrollLeft;
			});

			scrollerWrappers.addEventListener('scroll', () => {
				this.applyScrollbar(tables, scrollerDivs);

				tables.scrollLeft = scrollerWrappers.scrollLeft;
			});
		}
	}

	componentWillLoad() {
		this.processTableColumns();
		this.processTableData();
	}

	render() {
		const columns = extractValuesByKey(this.tableColumnsState, 'key');

		return (
			<div class="ontario-table-container">
				<div class="ontario-table-scroll--wrapper" ref={(el) => (this.tableScrollWrapper = el as HTMLElement)}>
					<div class="ontario-table-scroll--div" ref={(el) => (this.tableScrollDiv = el as HTMLElement)}></div>
				</div>
				<div class="ontario-table-div" ref={(el) => (this.table = el as HTMLElement)}>
					<table class={this.getTableClasses()}>
						{this.caption && <caption>{this.caption}</caption>}
						{this.tableColumnsState && (
							<thead>
								<tr>
									{this.tableColumnsState.map((columnData) => {
										const columnClass = this.getColumnClasses(columnData);
										return (
											<th
												scope="col"
												key={columnData.key}
												data-type={columnData.type}
												class={columnClass}
												innerHTML={columnData.title}
											></th>
										);
									})}
								</tr>
							</thead>
						)}
						{this.tableDataState && (
							<tbody>
								{this.tableDataState.map((rowData) => {
									const rowClass = rowData.highlight
										? `ontario-table-row--highlight`
										: rowData.subtotal
											? `ontario-table-row--subtotal`
											: undefined;

									return this.generateTableDataHTML('tableData', rowData, columns, rowClass);
								})}
							</tbody>
						)}
						{!!this.tableFooterState.length && (
							<tfoot>
								{this.tableFooterState.map((footerData) => {
									return this.generateTableDataHTML('tableData', footerData, columns, undefined);
								})}
							</tfoot>
						)}
					</table>
				</div>
			</div>
		);
	}
}
