import { Component, Prop, h } from '@stencil/core';
import newWindow from './assets/ontario-icon-new-window.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-new-window',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconCreditCard {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={newWindow} />;
  }
};
