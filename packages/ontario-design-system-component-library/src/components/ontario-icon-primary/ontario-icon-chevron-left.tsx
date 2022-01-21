import { Component, Prop, h } from '@stencil/core';
import chevronLeft from './assets/ontario-icon-chevron-left.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-chevron-left',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class OntarioIconChevronLeft {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={chevronLeft} />;
  }
};
