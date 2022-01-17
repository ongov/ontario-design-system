import { Component, Prop, h } from '@stencil/core';
import close from './assets/ontario-icon-close.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-close',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconClose {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={close} />;
  }
};
