import { Component, Prop, h } from '@stencil/core';
import microphoneOff from './assets/ontario-icon-microphone-off.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-microphone-off',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconMicrophoneOff {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={microphoneOff} />;
  }
};
