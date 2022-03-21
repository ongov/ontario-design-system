import { Component, Prop, h } from '@stencil/core';
import transportWalk from './assets/ontario-icon-transport-walk.svg';

@Component({
  tag: 'ontario-icon-transport-walk',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconTransportWalk {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth?: number = 24;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} style={{
      width: `${this.iconWidth}px`
    }} innerHTML={transportWalk} />;
  }
};
