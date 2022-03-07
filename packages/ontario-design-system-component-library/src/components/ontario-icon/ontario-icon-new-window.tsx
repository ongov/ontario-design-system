import { Component, Prop, h } from '@stencil/core';
import newWindow from './assets/ontario-icon-new-window.svg'

@Component({
  tag: 'ontario-icon-new-window',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconCreditCard {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={newWindow} />;
  }
};
