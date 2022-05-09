// content automatically generated by `generate-icons.js` begins
import { Component, Prop, h, Watch, State } from '@stencil/core';
import { IconWithColour } from './icon.interface';
import { IconSize, IconColour } from './ontario-icon.enum';
import { ConsoleType, MessageStyle } from '../../utils/console-message/console-message.enum';
import { printConsoleMessage } from '../../utils/console-message/console-message';

@Component({
  tag: 'ontario-icon-bookmark-off',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})
export class OntarioIconBookmarkOff implements IconWithColour {
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
          message: ' icon-width ',
          style: MessageStyle.Code,
        },
        {
          message: 'on',
          style: MessageStyle.Regular,
        },
        {
          message: ` <ontario-icon-bookmark-off> `,
          style: MessageStyle.Code,
        },
        {
          message: `was set to a non-numeric value; only a positive number is allowed. The default size of`,
          style: MessageStyle.Regular,
        },
        {
          message: ' 24px ',
          style: MessageStyle.Code,
        },
        {
          message: 'was assumed.',
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
        <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="bookmark-off"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" /></svg>
      </div>
    );
  }
};
// content automatically generated by `generate-icons.js` ends
