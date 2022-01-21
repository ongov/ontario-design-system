import { Component, Prop, h } from '@stencil/core';
import textMessage from './assets/ontario-icon-text-message.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-text-message',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconTextMessage {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={textMessage} />;
  }
};
