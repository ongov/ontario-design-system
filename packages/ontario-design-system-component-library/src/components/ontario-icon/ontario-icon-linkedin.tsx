import { Component, Prop, h } from '@stencil/core';
import linkedin from './assets/ontario-icon-linkedin.svg';

@Component({
  tag: 'ontario-icon-linkedin',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconLinkedin {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={linkedin} />;
  }
};
