import { Component, Prop, h } from '@stencil/core';
import newWindow from './assets/ontario-icon-new-window.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-new-window',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconCreditCard {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={newWindow} />;
  }
};
