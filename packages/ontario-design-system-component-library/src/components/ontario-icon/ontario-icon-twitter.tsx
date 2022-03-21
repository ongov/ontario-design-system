import { Component, Prop, h } from '@stencil/core';
import twitter from './assets/ontario-icon-twitter.svg';

@Component({
  tag: 'ontario-icon-twitter',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconTwitter {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth?: number = 24;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} style={{
      width: `${this.iconWidth}px`
    }} innerHTML={twitter} />;
  }
};
