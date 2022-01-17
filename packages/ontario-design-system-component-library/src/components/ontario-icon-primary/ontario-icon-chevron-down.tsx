import { Component, Prop, h } from '@stencil/core';
import chevronDown from './assets/ontario-icon-chevron-down.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-chevron-down',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconChevronDown {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={chevronDown} />;
  }
};
