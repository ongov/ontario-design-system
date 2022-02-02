import { Component, Prop, h } from '@stencil/core';
import transportBicycle from './assets/ontario-icon-transport-bicycle.svg';

@Component({
  tag: 'ontario-icon-transport-bicycle',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconTransportBicycle {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={transportBicycle} />;
  }
};
