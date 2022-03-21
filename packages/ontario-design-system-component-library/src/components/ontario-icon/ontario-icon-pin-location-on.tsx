import { Component, Prop, h } from '@stencil/core';
import pinLocationOn from './assets/ontario-icon-pin-location-on.svg';

@Component({
  tag: 'ontario-icon-pin-location-on',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconPinLocationOn {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth?: number = 24;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} style={{
      width: `${this.iconWidth}px`
    }} innerHTML={pinLocationOn} />;
  }
};
