import { Component, Prop, h } from '@stencil/core';
import transportCar from './assets/ontario-icon-transport-car.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-transport-car',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconTransportCar {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={transportCar} />;
  }
};
