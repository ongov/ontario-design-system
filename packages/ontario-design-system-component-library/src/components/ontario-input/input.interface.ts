import { Input } from '../../utils/common/common.interface';

export interface TextInput extends Input {
	/**
	 * The width of the input field. If no value is assigned, it will present as the `default` input width.
	 */
	inputWidth?: string;

	/**
	 * The input type value.
	 *
	 * If no `type` is provided, it will default to 'text'.
	 */
	type?: string;

	/**
	 * This is used to determine whether the input is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	required?: boolean;
}
