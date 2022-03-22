import { Component, Prop, h, Watch } from '@stencil/core';
import mastercard from './assets/ontario-icon-mastercard.svg';

@Component({
  tag: 'ontario-icon-mastercard',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconMastercard {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth: number = 24;

  @Watch('iconWidth')
  validateWidth() {
    const defaultWidth = 24;

    // If value is not a number, set the iconWidth to be 24
    if (isNaN(this.iconWidth)) {
      this.iconWidth = defaultWidth;
    }
  }

  componentWillLoad() {
    this.validateWidth();
  }
  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} style={{
      width: `${this.iconWidth}px`
    }} innerHTML={mastercard} />;
  }
};
