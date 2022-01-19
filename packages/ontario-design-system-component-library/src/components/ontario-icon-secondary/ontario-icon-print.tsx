import { Component, Prop, h } from '@stencil/core';
import print from './assets/ontario-icon-print.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-print',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconPrint {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={print} />;
  }
};
