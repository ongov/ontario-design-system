import { Component, Prop, h } from '@stencil/core';
import instagram from './assets/ontario-icon-instagram.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-instagram',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconInstagram {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={instagram} />;
  }
};
