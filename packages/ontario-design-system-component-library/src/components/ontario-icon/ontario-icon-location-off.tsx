import { Component, Prop, h } from '@stencil/core';
import locationOff from './assets/ontario-icon-location-off.svg';

@Component({
  tag: 'ontario-icon-location-off',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconLocationOff {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={locationOff} />;
  }
};
