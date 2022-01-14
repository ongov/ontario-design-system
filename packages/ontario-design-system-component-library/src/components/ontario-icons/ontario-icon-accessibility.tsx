import { Component, Prop, h } from '@stencil/core';
import accessibility from './assets/ontario-icon-accessibility.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-accessibility',
  styleUrl: 'ontario-icons.scss',
  shadow: false,
})

export class ontarioIconAccessibility {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={accessibility} />;
  }
};
