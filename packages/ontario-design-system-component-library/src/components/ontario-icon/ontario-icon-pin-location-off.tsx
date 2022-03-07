import { Component, Prop, h } from '@stencil/core';
import pinLocationOff from './assets/ontario-icon-pin-location-off.svg';

@Component({
  tag: 'ontario-icon-pin-location-off',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconPinLocationOff {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={pinLocationOff} />;
  }
};
