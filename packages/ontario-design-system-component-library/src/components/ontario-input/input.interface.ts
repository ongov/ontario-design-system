import { Input } from '../../utils/common.interface';

export interface TextInput extends Input {
	/**
	 * The width of the input field. If no value is assigned, it will present as the default input width.
	 */
	inputWidth?: string;

	/**
	 * The input type value.
	 */
	type?: string;
}
