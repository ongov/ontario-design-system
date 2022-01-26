import { Input } from '../../utils/common.interface';
import { Label } from '../../utils/label/label.interface';

export interface TextInput extends Input, Label {
	/**
	 * The width of the input field. If no value is assigned, it will present as the default input width.
	 */
	inputWidth?: string;

	/**
	 * The input type value.
	 */
	type?: string;
}
