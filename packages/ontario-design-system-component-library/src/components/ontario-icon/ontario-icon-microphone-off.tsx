import { Component, Prop, h } from '@stencil/core';
import microphoneOff from './assets/ontario-icon-microphone-off.svg';

@Component({
  tag: 'ontario-icon-microphone-off',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconMicrophoneOff {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={microphoneOff} />;
  }
};
