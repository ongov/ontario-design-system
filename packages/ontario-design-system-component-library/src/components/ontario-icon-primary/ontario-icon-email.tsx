import { Component, Prop, h } from '@stencil/core';
import email from './assets/ontario-icon-email.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-email',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class OntarioIconEmail {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={email} />;
  }
};
