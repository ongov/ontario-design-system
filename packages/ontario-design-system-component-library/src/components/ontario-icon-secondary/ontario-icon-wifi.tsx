import { Component, Prop, h } from '@stencil/core';
import wifi from './assets/ontario-icon-wifi.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-wifi',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconWifi {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={wifi} />;
  }
};
