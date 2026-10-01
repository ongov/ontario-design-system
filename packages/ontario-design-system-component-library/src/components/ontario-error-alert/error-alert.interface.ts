import { Base } from '../../utils/common/common.interface';

export interface ErrorAlert extends Base {
	/**
	 * The text to display for the dropdown list label.
	 *
	 * @example
	 * <ontario-error-alert
	 *   errorId="first-name-error"
	 *   controlId="first-name-control"
	 *   message="A first name is required."
	 *   ...>
	 * </ontario-error-alert>
	 */

	message: string;
	errorId: string;
	controlId: string;
}
