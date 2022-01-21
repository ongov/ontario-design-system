import { Component, Prop, h } from '@stencil/core';
import chevronUp from './assets/ontario-icon-chevron-up.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-chevron-up',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconChevronUp {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={chevronUp} />;
  }
};
