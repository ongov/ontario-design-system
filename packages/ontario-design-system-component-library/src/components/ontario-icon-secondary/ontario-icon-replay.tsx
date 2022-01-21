import { Component, Prop, h } from '@stencil/core';
import replay from './assets/ontario-icon-replay.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-replay',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconPrint {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={replay} />;
  }
};
