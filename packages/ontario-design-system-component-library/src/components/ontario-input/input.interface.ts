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

	/**
	 * Hints the browser/virtual keyboard which layout to present (for example, a numeric keypad).
	 * Accepts the standard `inputmode` values (e.g. `numeric`, `decimal`, `tel`, `email`, `search`).
	 * This is a UX hint only and does not perform or replace validation.
	 *
	 * Typed as `string` (rather than a literal union) so it matches the native `HTMLElement.inputMode`
	 * type Stencil merges into the component's element interface.
	 */
	inputMode?: string;

	/**
	 * A regular expression the browser can use as a hint when validating input and choosing a mobile keyboard layout.
	 * This is a browser hint only and does not replace server-side or component-level validation.
	 */
	pattern?: string;
}
