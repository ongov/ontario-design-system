import { Component, Prop, h } from '@stencil/core';
import mediaPause from './assets/ontario-icon-media-pause.svg';

@Component({
  tag: 'ontario-icon-media-pause',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconMediaPause {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth?: number = 24;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} style={{
      width: `${this.iconWidth}px`
    }} innerHTML={mediaPause} />;
  }
};
