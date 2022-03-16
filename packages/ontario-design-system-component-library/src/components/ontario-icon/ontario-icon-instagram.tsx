import { Component, Prop, h } from '@stencil/core';
import instagram from './assets/ontario-icon-instagram.svg';

@Component({
  tag: 'ontario-icon-instagram',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconInstagram {

  @Prop() colour: "black" | "blue" | "grey" | "white" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={instagram} />;
  }
};
