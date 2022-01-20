import { Component, Prop, h } from '@stencil/core';
import mastercard from './assets/ontario-icon-mastercard.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-mastercard',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconMastercard {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={mastercard} />;
  }
};
