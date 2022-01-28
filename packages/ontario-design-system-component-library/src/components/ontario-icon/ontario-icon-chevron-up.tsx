import { Component, Prop, h } from '@stencil/core';
import chevronUp from './assets/ontario-icon-chevron-up.svg'

@Component({
  tag: 'ontario-icon-chevron-up',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconChevronUp {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={chevronUp} />;
  }
};
