import { Component, Prop, h } from '@stencil/core';
import facebook from './assets/ontario-icon-facebook.svg';

@Component({
  tag: 'ontario-icon-facebook',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconFacebook {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={facebook} />;
  }
};
