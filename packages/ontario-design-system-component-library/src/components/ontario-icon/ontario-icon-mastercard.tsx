import { Component, Prop, h } from '@stencil/core';
import mastercard from './assets/ontario-icon-mastercard.svg';

@Component({
  tag: 'ontario-icon-mastercard',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconMastercard {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={mastercard} />;
  }
};
