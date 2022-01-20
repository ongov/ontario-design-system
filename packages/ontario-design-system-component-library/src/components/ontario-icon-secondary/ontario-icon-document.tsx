import { Component, Prop, h } from '@stencil/core';
import document from './assets/ontario-icon-document.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-document',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconDocument {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={document} />;
  }
};
