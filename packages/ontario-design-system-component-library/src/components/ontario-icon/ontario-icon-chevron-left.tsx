import { Component, Prop, h } from '@stencil/core';
import chevronLeft from './assets/ontario-icon-chevron-left.svg'

@Component({
  tag: 'ontario-icon-chevron-left',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconChevronLeft {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={chevronLeft} />;
  }
};
