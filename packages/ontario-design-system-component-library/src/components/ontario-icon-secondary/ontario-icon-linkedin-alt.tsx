import { Component, Prop, h } from '@stencil/core';
import linkedinAlt from './assets/ontario-icon-linkedin-alt.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-linkedin-alt',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconLinkedinAlt {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={linkedinAlt} />;
  }
};
