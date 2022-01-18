import { Component, Prop, h } from '@stencil/core';
import cloud from './assets/ontario-icon-cloud.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-cloud',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconCloud {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={cloud} />;
  }
};
