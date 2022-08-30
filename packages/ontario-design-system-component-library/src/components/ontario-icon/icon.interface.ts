import { IconColour, IconSize } from './icon.types';

export interface Icon {
	/**
	 * The icon width will autogenerate the height since the icons are in square format, thus preserving
	 * the aspect ratio.
	 * Implementation is mandatory in each icon component.
	 */
	iconWidth: IconSize;

	/**
	 * Mutable variable, for internal use only.
	 * Set the icon's width depending on validation result.
	 * Implementation is mandatory in each icon component.
	 */
	iconWidthState: number;

	/**
	 * Validate user input for the `iconWidth` property.
	 * Implementation in each icon component is mandatory.
	 */
	validateWidth: () => void;

	/**
	 * Validate the `colour` property for icon components that accept a colour input from users.
	 * Validate `colour` attribute is not provided for icon components that don't accept the colour input.
	 * Implementation is mandatory in each icon component.
	 */
	validateColour: () => void;

	/**
	 * Stencil component lifecycle method that is called once after the component is first connected to the DOM.
	 * Implementation is mandatory in each icon component.
	 */
	componentWillLoad: () => void;

	/**
	 * Returns the HTML code to be rendered into a custom element.
	 * Implementation is mandatory in each icon component.
	 */
	render: () => object;
}

export interface IconWithColour extends Icon {
	/**
	 * Set the icon's colour.
	 * Note that the `keyof typeof` syntax is not necessary to use the enum as a type with StencilJS component.
	 * Implementation is only mandatory in icon components that accept a colour input from users.
	 */
	colour: IconColour | string;

	/**
	 * Mutable variable, for internal use only.
	 * Set the icon's colour based on validation result.
	 * Implementation is only mandatory in icon components that accept a colour input from users.
	 */
	iconColourState: string;
}
