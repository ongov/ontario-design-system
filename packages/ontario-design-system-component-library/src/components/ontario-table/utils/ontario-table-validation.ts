import { TableColumnOptions, TableRowOptions } from '../table.interface';

import { ConsoleType } from '../../../utils/console-message/console-message.enum';
import { printInvalidFormatWarning, printMissingPropWarning } from '../../../utils/validation/component-message';
import { minimumGridColumns, maximumGridColumns } from '../../../utils/common/common.variables';

export function validateTableColumns(columns: TableColumnOptions[]): boolean {
	for (const column of columns) {
		if (!column.title || !column.key) {
			printMissingPropWarning({
				propName: 'title and/or key',
				componentTag: '<ontario-table>',
				consequence: 'These keys are required in the tableColumns options.',
				severity: ConsoleType.Error,
			});
			return false; // Required keys are missing
		}

		if (column.type && column.type !== 'string' && column.type !== 'numeric') {
			printInvalidFormatWarning({
				propName: 'tableColumns type',
				componentTag: '<ontario-table>',
				expected: "'string' or 'numeric'",
				received: column.type,
				consequence: 'A default type of `string` will be applied.',
			});
			return false; // Invalid type for 'type' key
		}

		if (column.colSpan && !(column.colSpan >= minimumGridColumns && column.colSpan <= maximumGridColumns)) {
			printInvalidFormatWarning({
				propName: 'tableColumns colSpan',
				componentTag: '<ontario-table>',
				expected: `a number from ${minimumGridColumns} to ${maximumGridColumns}`,
				received: column.colSpan,
				consequence: 'The default colSpan value will be applied.',
			});
			return false; // Invalid value for 'colSpan' key
		}
	}

	return true; // All validations passed
}

export function validateTableRowOptions(options: TableRowOptions[]): boolean {
	for (const option of options) {
		if (!option.data || Object.keys(option.data).length === 0) {
			printMissingPropWarning({
				propName: 'data',
				componentTag: '<ontario-table>',
				consequence: 'This key is required in the tableData options.',
				severity: ConsoleType.Error,
			});
			return false; // Required key 'data' is missing
		}
	}

	return true; // All validations passed
}
