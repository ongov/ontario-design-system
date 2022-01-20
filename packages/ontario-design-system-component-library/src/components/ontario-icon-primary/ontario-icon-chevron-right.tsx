import { Component, Prop, h } from '@stencil/core';
import chevronRight from './assets/ontario-icon-chevron-right.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-chevron-right',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconChevronRight {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={chevronRight} />;
  }
};
