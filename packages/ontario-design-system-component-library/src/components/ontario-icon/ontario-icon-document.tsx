import { Component, Prop, h } from '@stencil/core';
import document from './assets/ontario-icon-document.svg';

@Component({
  tag: 'ontario-icon-document',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconDocument {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={document} />;
  }
};