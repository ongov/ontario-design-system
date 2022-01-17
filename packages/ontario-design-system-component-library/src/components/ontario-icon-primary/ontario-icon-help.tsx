import { Component, Prop, h } from '@stencil/core';
import help from './assets/ontario-icon-help.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-help',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconHelp {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={help} />;
  }
};
