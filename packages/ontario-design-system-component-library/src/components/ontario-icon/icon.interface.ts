import { IconColour } from './ontario-icon.enum';

export interface Icon {
	/**
	 * Set the icon's colour.
	 * Some icon components do not implement this property and hence implementation is optional.
	 */
	colour?: IconColour;

	/**
	 * The icon width will autogenerate the height since the icons are in square format, thus preserving
	 * the aspect ratio. Implementation is mandatory.
	 */
	iconWidth: number;

	/**
	 * Validate icon width user input. Implementation is mandatory.
	 */
	validateWidth: () => void;

	/**
	 * Stencil API that doesn't return anything. Implementation is optional.
	 */
	componentWillLoad?: () => void;

	/**
	 * Returns the HTML code to be rendered into a custom element. Implementation is mandatory.
	 */
	render?: () => object;
}
