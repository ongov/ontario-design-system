import { Component, Prop, h } from '@stencil/core';
import pinLocationOff from './assets/ontario-icon-pin-location-off.svg';

@Component({
  tag: 'ontario-icon-pin-location-off',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconPinLocationOff {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={pinLocationOff} />;
  }
};
