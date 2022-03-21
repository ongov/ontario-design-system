import { Component, Prop, h } from '@stencil/core';
import close from './assets/ontario-icon-close.svg'

@Component({
  tag: 'ontario-icon-close',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconClose {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth?: number = 24;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} style={{
      width: `${this.iconWidth}px`
    }} innerHTML={close} />;
  }
};
