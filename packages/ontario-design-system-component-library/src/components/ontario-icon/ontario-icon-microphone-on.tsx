import { Component, Prop, h } from '@stencil/core';
import microphoneOn from './assets/ontario-icon-microphone-on.svg';

@Component({
  tag: 'ontario-icon-microphone-on',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconMicrophoneOn {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={microphoneOn} />;
  }
};
