import { Component, Prop, h } from '@stencil/core';
import wifi from './assets/ontario-icon-wifi.svg';

@Component({
  tag: 'ontario-icon-wifi',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconWifi {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={wifi} />;
  }
};
