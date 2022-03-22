import { Component, Prop, h, Watch } from '@stencil/core';
import accessibility from './assets/ontario-icon-accessibility.svg';

@Component({
  tag: 'ontario-icon-accessibility',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})
export class OntarioIconAccessibility {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth: number = 24;

  @Watch('iconWidth')
  validateName() {
    // If value is not a number, set the iconWidth to be 24
    if (isNaN(this.iconWidth)) {
      this.iconWidth = 24;
    }
  }

  componentWillLoad() {
    this.validateName();
  }
  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} style={{
      width: `${this.iconWidth}px`
    }} innerHTML={accessibility}
    />
  }
};
