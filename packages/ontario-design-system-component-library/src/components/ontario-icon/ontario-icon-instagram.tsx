// content automatically generated by `generate-icons.js` begins
import { Component, Prop, h, Watch, State } from '@stencil/core';
import { IconWithColour } from './icon.interface';
import { IconSize, IconColour } from './ontario-icon.enum';
import { ConsoleType, MessageStyle } from '../../utils/console-message/console-message.enum';
import { printConsoleMessage } from '../../utils/console-message/console-message';

@Component({
    tag: 'ontario-icon-instagram',
    styleUrl: 'ontario-icon.scss',
    shadow: true,
})
export class OntarioIconInstagram implements IconWithColour {
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
			printConsoleMessage([
        {
            message: '%c icon-width ',
            style: MessageStyle.Code,
        },
        {
            message: '%con',
            style: MessageStyle.Regular,
        },
        {
            message: `%c <ontario-icon-instagram> `,
            style: MessageStyle.Code,
        },
        {
            message: `%cwas set to a non-numeric value; only positive number is allowed. The default size of`,
            style: MessageStyle.Regular,
        },
        {
            message: '%c 24px ',
            style: MessageStyle.Code,
        },
        {
            message: '%cwas assumed.',
            style: MessageStyle.Regular,
        },
    ], ConsoleType.Warning);
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
                <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="instagram"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
            </div>
        );
    }
};
// content automatically generated by `generate-icons.js` ends
