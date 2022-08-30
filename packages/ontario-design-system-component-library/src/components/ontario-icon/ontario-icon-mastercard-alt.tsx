// content automatically generated by `generate-icons.js` begins
import { Component, Prop, h, Watch, State, Element } from '@stencil/core';
import { Icon } from './icon.interface';
import { IconSize } from './icon.types';
import { ConsoleMessageClass } from '../../utils/console-message/console-message'; 

@Component({
    tag: 'ontario-icon-mastercard-alt',
    styleUrl: 'ontario-icon.scss',
    shadow: true,
})
export class OntarioIconMastercardAlt implements Icon {
  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth: IconSize = 24;

  /**
	 * Mutable variable, for internal use only.
	 * Set the icon's width depending on validation result.
	 */
  @State() iconWidthState: number;

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
              .addMonospaceText(' <ontario-icon-mastercard-alt> ')
              .addRegularText(`${isNaN(this.iconWidth) ? 'was set to a non-numeric value' : 'was set to a negative number'}; only a positive number is allowed. The default size of`)
              .addMonospaceText(' 24px ')
              .addRegularText('was assumed.')
              .printMessage();
    this.iconWidthState = 24;
  } else {
    this.iconWidthState = this.iconWidth;
  }
  }
  
    /**
     * Reference to the host element
     * Use to check if the host element has the `colour` attribute set
     */
    @Element() host: HTMLElement;

    /**
     * Validate that the `colour` attribute is not set by users
     * Prints a warning message if the `colour` attribute is set
     */
    validateColour() {
        if (this.host.hasAttribute('colour')) {
            const message = new ConsoleMessageClass();
            message
                .addDesignSystemTag()
                .addMonospaceText(' colour ')
                .addRegularText('on')
                .addMonospaceText(' <ontario-icon-mastercard-alt> ')
                .addRegularText('cannot be set. The provided colour is ignored.')
                .printMessage();
        }
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
            <div class={`ontario-icon ontario-icon--width-${this.iconWidthState}`} style={{ 'width': `${this.iconWidthState}px` }}>
                <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="mastercard-alt"><circle cx="8" cy="12" r="6.5" fill="#eb001b"/><circle cx="16" cy="12" r="6.5" fill="#f79e1b"/><path d="M12 17.124S9.5 15.5 9.5 12 12 6.876 12 6.876 14.5 8.5 14.5 12 12 17.124 12 17.124z" fill="#ff5f00"/><path d="M21.173 16.85v-.3h.125v-.06H21v.06h.117v.3h.055zm.578 0v-.35h-.1l-.105.25-.105-.25h-.1v.35h.065v-.265l.098.227h.067l.098-.227v.265h.063z" fill="#f79e1b"/></svg>
            </div>
        );
    }
};
// content automatically generated by `generate-icons.js` ends
