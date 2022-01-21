import { Component, Prop, h } from '@stencil/core';
import linkedin from './assets/ontario-icon-linkedin.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-linkedin',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconLinkedin {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={linkedin} />;
  }
};
