import { Component, Prop, h } from '@stencil/core';
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
  @Prop() iconWidth?: number = 24;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={accessibility} style={{
      width: `${this.iconWidth}px`
    }} />
  }
};
