// content automatically generated by `generate-icons.js` begins
import { Component, Prop, h, Watch, State } from '@stencil/core';
import { Icon } from './icon.interface';
import { IconSize} from './ontario-icon.enum';
import { ConsoleType, MessageStyle } from '../../utils/console-message/console-message.enum';
import { printConsoleMessage } from '../../utils/console-message/console-message';

@Component({
    tag: 'ontario-icon-alert-information',
    styleUrl: 'ontario-icon.scss',
    shadow: true,
})
export class OntarioIconAlertInformation implements Icon {
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
            message: `%c <ontario-icon-alert-information> `,
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
	 * Stencil component lifecycle method that is called once after the component is first connected to the DOM.
	 */
    componentWillLoad() {
        this.validateWidth();
    }

    /**
	 * Returns the HTML code to be rendered into a custom element.
	 */
    render() {
        return (
            <div class='ontario-icon' style={{ 'width': `${this.iconWidthState}px` }}>
                <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="alert-information"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#1080a6"/><path d="M11 17h2v-6h-2v6zm0-8h2V7h-2v2z" fill="#fff"/></svg>
            </div>
        );
    }
};
// content automatically generated by `generate-icons.js` ends
