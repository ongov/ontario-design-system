import { Component, Prop, h } from '@stencil/core';
import microphoneOn from './assets/ontario-icon-microphone-on.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-microphone-on',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconMicrophoneOn {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={microphoneOn} />;
  }
};
