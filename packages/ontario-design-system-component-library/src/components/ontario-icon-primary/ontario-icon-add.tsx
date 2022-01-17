import { Component, Prop, h } from '@stencil/core';
import add from './assets/ontario-icon-add.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-add',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconAdd {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={add} />;
  }
};
