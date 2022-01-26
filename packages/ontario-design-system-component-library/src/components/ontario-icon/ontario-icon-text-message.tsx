import { Component, Prop, h } from '@stencil/core';
import textMessage from './assets/ontario-icon-text-message.svg';

@Component({
  tag: 'ontario-icon-text-message',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconTextMessage {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={textMessage} />;
  }
};
