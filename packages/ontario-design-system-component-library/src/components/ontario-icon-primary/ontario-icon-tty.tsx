import { Component, Prop, h } from '@stencil/core';
import tty from './assets/ontario-icon-tty.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-tty',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconTty {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={tty} />;
  }
};
