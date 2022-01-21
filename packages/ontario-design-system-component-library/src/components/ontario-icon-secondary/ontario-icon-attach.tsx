import { Component, Prop, h } from '@stencil/core';
import attach from './assets/ontario-icon-attach.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-attach',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconAttach {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={attach} />;
  }
};
