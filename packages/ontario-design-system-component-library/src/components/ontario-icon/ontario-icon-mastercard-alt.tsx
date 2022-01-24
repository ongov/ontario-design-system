import { Component, Prop, h } from '@stencil/core';
import mastercardAlt from './assets/ontario-icon-mastercard-alt.svg';

@Component({
  tag: 'ontario-icon-mastercard-alt',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconMastercardAlt {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={mastercardAlt} />;
  }
};
