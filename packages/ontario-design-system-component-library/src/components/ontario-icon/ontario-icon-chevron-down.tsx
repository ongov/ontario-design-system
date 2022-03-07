import { Component, Prop, h } from '@stencil/core';
import chevronDown from './assets/ontario-icon-chevron-down.svg'

@Component({
  tag: 'ontario-icon-chevron-down',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconChevronDown {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={chevronDown} />;
  }
};
