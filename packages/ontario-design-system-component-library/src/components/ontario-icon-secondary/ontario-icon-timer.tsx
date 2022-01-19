import { Component, Prop, h } from '@stencil/core';
import timer from './assets/ontario-icon-timer.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-timer',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconTimer {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={timer} />;
  }
};
