import { Component, Prop, h } from '@stencil/core';
import transportBus from './assets/ontario-icon-transport-bus.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-transport-bus',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconTransportBus {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={transportBus} />;
  }
};
