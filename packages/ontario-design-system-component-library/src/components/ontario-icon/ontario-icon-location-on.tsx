import { Component, Prop, h } from '@stencil/core';
import locationOn from './assets/ontario-icon-location-on.svg';

@Component({
  tag: 'ontario-icon-location-on',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconLocationOn {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={locationOn} />;
  }
};
