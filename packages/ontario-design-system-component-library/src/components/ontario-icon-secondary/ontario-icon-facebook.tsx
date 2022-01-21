import { Component, Prop, h } from '@stencil/core';
import facebook from './assets/ontario-icon-facebook.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-facebook',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconFacebook {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={facebook} />;
  }
};
