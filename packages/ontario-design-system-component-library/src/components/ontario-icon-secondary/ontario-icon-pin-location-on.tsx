import { Component, Prop, h } from '@stencil/core';
import pinLocationOn from './assets/ontario-icon-pin-location-on.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-pin-location-on',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconPinLocationOn {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={pinLocationOn} />;
  }
};
