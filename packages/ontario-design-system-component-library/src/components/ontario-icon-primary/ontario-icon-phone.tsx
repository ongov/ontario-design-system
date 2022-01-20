import { Component, Prop, h } from '@stencil/core';
import phone from './assets/ontario-icon-phone.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-phone',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconPhone {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={phone} />;
  }
};
