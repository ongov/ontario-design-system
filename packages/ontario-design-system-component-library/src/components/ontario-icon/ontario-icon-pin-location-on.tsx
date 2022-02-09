import { Component, Prop, h } from '@stencil/core';
import pinLocationOn from './assets/ontario-icon-pin-location-on.svg';

@Component({
  tag: 'ontario-icon-pin-location-on',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconPinLocationOn {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={pinLocationOn} />;
  }
};
