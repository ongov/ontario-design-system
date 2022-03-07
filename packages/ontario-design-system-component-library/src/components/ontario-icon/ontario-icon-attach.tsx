import { Component, Prop, h } from '@stencil/core';
import attach from './assets/ontario-icon-attach.svg';

@Component({
  tag: 'ontario-icon-attach',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconAttach {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={attach} />;
  }
};
