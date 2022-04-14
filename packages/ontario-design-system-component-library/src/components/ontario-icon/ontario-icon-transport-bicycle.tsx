// content automatically generated by `generate-icons.js` begins
import { Component, Prop, h, Watch, State } from '@stencil/core';
import { IconWithColour } from './icon.interface';
import { IconSize, IconColour } from './ontario-icon.enum';
import { ConsoleType, MessageStyle } from '../../utils/console-message/console-message.enum';
import { printConsoleMessage } from '../../utils/console-message/console-message';

@Component({
    tag: 'ontario-icon-transport-bicycle',
    styleUrl: 'ontario-icon.scss',
    shadow: true,
})
export class OntarioIconTransportBicycle implements IconWithColour {
    /**
     * The icon width will autogenerate the height since the icons are in square format, thus preserving
     * the aspect ratio.
     */
    @Prop() iconWidth: number = IconSize.DEFAULT;

    /**
	 * Mutable variable, for internal use only.
	 * Set the icon's width depending on validation result.
	 */
	@State() iconWidthState: number = IconSize.DEFAULT;

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
            style: MessageStyle.CODE,
        },
        {
            message: '%con',
            style: MessageStyle.REGULAR,
        },
        {
            message: `%c <ontario-icon-transport-bicycle> `,
            style: MessageStyle.CODE,
        },
        {
            message: `%cwas set to a non-numeric value; only positive number is allowed. The default size of`,
            style: MessageStyle.REGULAR,
        },
        {
            message: '%c 24px ',
            style: MessageStyle.CODE,
        },
        {
            message: '%cwas assumed.',
            style: MessageStyle.REGULAR,
        },
    ], ConsoleType.WARNING);
			this.iconWidthState = IconSize.DEFAULT;
		} else {
			this.iconWidthState = this.iconWidth;
		}
    }
    
    /**
     * Set the icon's colour.
     */
    @Prop() colour: IconColour = IconColour.BLACK;

    /**
	 * Mutable variable, for internal use only.
	 * Set the icon's colour based on validation result.
	 */
	@State() iconColourState: IconColour = IconColour.BLACK;

    /**
     * Watch for changes in the `colour` variable for validation purpose.
     * If the user input doesn't match one of the enum values then `colour` will be set to its default (`black`).
     * If a match is found in one of the enum values then `colour` will be set to the matching enum value.
     */
    @Watch('colour')
    validateColour() {
        this.iconColourState = (this.colour && Object.values(IconColour).find(colour => colour === this.colour.toLowerCase())) || IconColour.BLACK;
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
                <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="transport-bicycle"><path d="M15.208 6.167a1.84 1.84 0 0 0 1.833-1.833A1.84 1.84 0 0 0 15.208 2.5a1.84 1.84 0 0 0-1.833 1.833 1.84 1.84 0 0 0 1.833 1.833zm-9.625 5.958C3.017 12.125 1 14.142 1 16.708s2.017 4.583 4.583 4.583 4.583-2.017 4.583-4.583-2.017-4.583-4.583-4.583zm0 7.792a3.25 3.25 0 0 1-3.208-3.208A3.25 3.25 0 0 1 5.583 13.5a3.25 3.25 0 0 1 3.208 3.208 3.25 3.25 0 0 1-3.208 3.208zM10.9 10.75l2.2-2.2.733.733a6.42 6.42 0 0 0 4.675 1.925V9.375c-1.375 0-2.475-.55-3.3-1.375l-1.742-1.742c-.458-.367-.917-.55-1.467-.55a1.71 1.71 0 0 0-1.283.55L8.15 8.825a1.81 1.81 0 0 0-.55 1.283c0 .55.183 1.008.55 1.283l2.933 2.567v4.583h1.833v-5.683L10.9 10.75zm7.517 1.375c-2.567 0-4.583 2.017-4.583 4.583s2.017 4.583 4.583 4.583S23 19.275 23 16.708s-2.017-4.583-4.583-4.583zm0 7.792a3.25 3.25 0 0 1-3.208-3.208 3.25 3.25 0 0 1 3.208-3.208 3.25 3.25 0 0 1 3.208 3.208 3.25 3.25 0 0 1-3.208 3.208z"/></svg>
            </div>
        );
    }
};
// content automatically generated by `generate-icons.js` ends
