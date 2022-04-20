import { IconColour } from './ontario-icon.enum';

export interface Icon {
	/**
	 * The icon width will autogenerate the height since the icons are in square format, thus preserving
	 * the aspect ratio.
     * Implementation is mandatory.
	 */
	iconWidth: number;

    /**
	 * Mutable variable, for internal use only.
	 * Set the icon's width depending on validation result.
     * Implementation is mandatory.
	 */
	iconWidthState: number;

	/**
	 * Validate user input for the `iconWidth` property.
     * Implementation is mandatory.
	 */
	validateWidth: () => void;

	/**
	 * Stencil component lifecycle method that is called once after the component is first connected to the DOM.
	 * Implementation is optional.
	 */
	componentWillLoad?: () => void;

	/**
	 * Returns the HTML code to be rendered into a custom element.
     * Implementation is mandatory.
	 */
	render?: () => object;
}

export interface IconWithColour extends Icon {
    /**
	 * Set the icon's colour.
	 * Note that the `keyof typeof` syntax is not necessary to use the enum as a type with StencilJS component.
     * Implementation is mandatory.
	 */
	colour: IconColour;

    /**
	 * Mutable variable, for internal use only.
	 * Set the icon's colour based on validation result.
     * Implementation is Mandatory
	 */
	iconColourState: IconColour;

    /**
	 * Validate user input for the `colour` property.
     * Implementation is mandatory.
	 */
	validateColour?: () => void;
}
