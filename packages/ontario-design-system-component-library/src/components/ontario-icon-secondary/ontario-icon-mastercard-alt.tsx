import { Component, Prop, h } from '@stencil/core';
import mastercardAlt from './assets/ontario-icon-mastercard-alt.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-mastercard-alt',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconMastercardAlt {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={mastercardAlt} />;
  }
};
