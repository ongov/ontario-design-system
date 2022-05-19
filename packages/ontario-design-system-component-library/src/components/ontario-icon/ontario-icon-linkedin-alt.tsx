// content automatically generated by `generate-icons.js` begins
import { Component, Prop, h, Watch, State } from '@stencil/core';
import { IconWithColour } from './icon.interface';
import { IconSize, IconColour } from './ontario-icon.enum';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

@Component({
    tag: 'ontario-icon-linkedin-alt',
    styleUrl: 'ontario-icon.scss',
    shadow: true,
})
export class OntarioIconLinkedinAlt implements IconWithColour {
    /**
     * The icon width will autogenerate the height since the icons are in square format, thus preserving
     * the aspect ratio.
     */
    @Prop() iconWidth: number = IconSize.Default;

    /**
	 * Mutable variable, for internal use only.
	 * Set the icon's width depending on validation result.
	 */
	@State() iconWidthState: number = IconSize.Default;

    /**
     * Watch for changes in the `iconWidth` variable for validation purpose.
     * If the user input is not a number or is a negative number then `iconWidth` will be set to its default (24).
     */
    @Watch('iconWidth')
    validateWidth() {
		if (isNaN(this.iconWidth) || (!isNaN(this.iconWidth) && this.iconWidth <= 0)) {
			const message = new ConsoleMessageClass();
            message
                .addDesignSystemTag()
                .addMonospaceText(' icon-width ')
                .addRegularText('on')
                .addMonospaceText(' <ontario-icon-linkedin-alt> ')
                .addRegularText(`${isNaN(this.iconWidth) ? 'was set to a non-numeric value' : 'was set to a negative number'}; only a positive number is allowed. The default size of`)
                .addMonospaceText(' 24px ')
                .addRegularText('was assumed.')
                .printMessage();
			this.iconWidthState = IconSize.Default;
		} else {
			this.iconWidthState = this.iconWidth;
		}
    }
    
    /**
     * Set the icon's colour.
     */
    @Prop() colour: IconColour = IconColour.Black;

    /**
	 * Mutable variable, for internal use only.
	 * Set the icon's colour based on validation result.
	 */
	@State() iconColourState: IconColour = IconColour.Black;

    /**
     * Watch for changes in the `colour` variable for validation purpose.
     * If the user input doesn't match one of the enum values then `colour` will be set to its default (`black`).
     * If a match is found in one of the enum values then `colour` will be set to the matching enum value.
     */
    @Watch('colour')
    validateColour() {
        this.iconColourState = (this.colour && Object.values(IconColour).find(colour => colour === this.colour.toLowerCase())) || IconColour.Black;
    }
    
	/**
	 * Stencil component lifecycle method that is called once after the component is first connected to the DOM.
	 */
    componentWillLoad() {
        this.validateColour();
        this.validateWidth();
    }

    /**
	 * Returns the HTML code to be rendered into a custom element.
	 */
    render() {
        return (
            <div class={`ontario-icon ontario-icon--${this.iconColourState}`} style={{ 'width': `${this.iconWidthState}px` }}>
                <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="linkedin-alt"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26 2.9 2.9 0 0 0-2.32 1.3v-1.1h-2.8v8.37h2.8v-4.93c0-.77.62-1.4 1.4-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.8zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.7-1.68-1.7a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.7 1.68zm1.4 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </div>
        );
    }
};
// content automatically generated by `generate-icons.js` ends
