import { Component, Prop, h } from '@stencil/core';
import newWindow from './assets/ontario-icon-new-window.svg'

@Component({
  tag: 'ontario-icon-new-window',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconCreditCard {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={newWindow} />;
  }
};
