// content automatically generated by `generate-icons.js` begins
import { Component, Prop, h, Watch, State } from '@stencil/core';
import { IconWithColour } from './icon.interface';
import { IconSize, IconColour } from './ontario-icon.enum';
import { ConsoleType, MessageStyle } from '../../utils/console-message/console-message.enum';
import { printConsoleMessage } from '../../utils/console-message/console-message';

@Component({
    tag: 'ontario-icon-vote-like',
    styleUrl: 'ontario-icon.scss',
    shadow: true,
})
export class OntarioIconVoteLike implements IconWithColour {
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
            message: `%c <ontario-icon-vote-like> `,
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
                <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="vote-like"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.3l.95-4.57.03-.32c0-.4-.17-.8-.44-1.06L14.17 1 7.6 7.6c-.37.36-.6.86-.6 1.4v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.1-.23.14-.47.14-.73v-2z"/></svg>
            </div>
        );
    }
};
// content automatically generated by `generate-icons.js` ends
