import { Component, Prop, h } from '@stencil/core';
import chevronRight from './assets/ontario-icon-chevron-right.svg'

@Component({
  tag: 'ontario-icon-chevron-right',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconChevronRight {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={chevronRight} />;
  }
};
