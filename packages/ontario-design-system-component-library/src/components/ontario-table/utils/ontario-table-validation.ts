import { TableColumnOptions, TableRowOptions } from '../table.interface';

import { ConsoleMessageClass } from '../../../utils/console-message/console-message';
import { ConsoleType } from '../../../utils/console-message/console-message.enum';
import { minimumGridColumns, maximumGridColumns } from '../../../utils/common/common.variables';

export function validateTableColumns(columns: TableColumnOptions[]): boolean {
	for (const column of columns) {
		if (!column.title || !column.key) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addRegularText(' The required keys for ')
				.addMonospaceText('title')
				.addRegularText(' and/or ')
				.addMonospaceText('key')
				.addRegularText(' in the ')
				.addMonospaceText('<ontario-table> tableColumns')
				.addRegularText(' options were not provided. ')
				.printMessage(ConsoleType.Error);
			return false; // Required keys are missing
		}

		if (column.type && column.type !== 'string' && column.type !== 'numeric') {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addRegularText(' The ')
				.addMonospaceText('type')
				.addRegularText(' key in the ')
				.addMonospaceText('<ontario-table> tableColumns')
				.addRegularText(' options is not a valid type. A default type of `string` will be applied.')
				.printMessage();
			return false; // Invalid type for 'type' key
		}

		if (column.colSpan && !(column.colSpan >= minimumGridColumns && column.colSpan <= maximumGridColumns)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addRegularText(' The ')
				.addMonospaceText('colSpan')
				.addRegularText(' in the ')
				.addMonospaceText('<ontario-table> tableColumns')
				.addRegularText(' options is not a valid type. The default colSpan value will be applied.')
				.printMessage();
			return false; // Invalid value for 'colSpan' key
		}
	}

	return true; // All validations passed
}

export function validateTableRowOptions(options: TableRowOptions[]): boolean {
	for (const option of options) {
		if (!option.data || Object.keys(option.data).length === 0) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addRegularText(' The required key for ')
				.addMonospaceText('data')
				.addRegularText(' in the ')
				.addMonospaceText('<ontario-table> tableData')
				.addRegularText(' options was not provided. ')
				.printMessage(ConsoleType.Error);
			return false; // Required key 'data' is missing
		}
	}

	return true; // All validations passed
}
