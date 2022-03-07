import { Component, Prop, h } from '@stencil/core';
import replay from './assets/ontario-icon-replay.svg';

@Component({
  tag: 'ontario-icon-replay',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconPrint {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={replay} />;
  }
};
