import { Component, Prop, h } from '@stencil/core';
import transportBicycle from './assets/ontario-icon-transport-bicycle.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-transport-bicycle',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconTransportBicycle {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={transportBicycle} />;
  }
};
