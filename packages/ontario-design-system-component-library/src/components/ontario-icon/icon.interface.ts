import { IconColour } from './ontario-icon.enum';

export interface Icon {
	/**
	 * Set the icon's colour.
	 * Some icon components do not implement this property and hence implementation is optional.
     * Note that the `keyof typeof` syntax is not necessary to use the enum as a type with StencilJS component.
	 */
	colour?: IconColour;

	/**
	 * The icon width will autogenerate the height since the icons are in square format, thus preserving
	 * the aspect ratio. Implementation is mandatory.
	 */
	iconWidth: number;

    /**
     * Validate user input for the `colour` property.
     * Implementation is optional because some icons don't use the `colour` property.
     */
    validateColour?: () => void;

	/**
	 * Validate user input for the `iconWidth` property. Implementation is mandatory.
	 */
	validateWidth: () => void;

	/**
	 * Stencil component lifecycle method that is called once after the component is first connected to the DOM.
     * Implementation is optional.
	 */
	componentWillLoad?: () => void;

	/**
	 * Returns the HTML code to be rendered into a custom element. Implementation is mandatory.
	 */
	render?: () => object;
}
