import { Component, Prop, h } from '@stencil/core';
import print from './assets/ontario-icon-print.svg';

@Component({
  tag: 'ontario-icon-print',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconPrint {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={print} />;
  }
};
