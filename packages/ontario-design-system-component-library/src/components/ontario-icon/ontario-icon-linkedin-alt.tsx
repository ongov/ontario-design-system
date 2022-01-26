import { Component, Prop, h } from '@stencil/core';
import linkedinAlt from './assets/ontario-icon-linkedin-alt.svg';

@Component({
  tag: 'ontario-icon-linkedin-alt',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconLinkedinAlt {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={linkedinAlt} />;
  }
};
