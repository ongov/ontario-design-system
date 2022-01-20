import { Component, Prop, h } from '@stencil/core';
import previous from './assets/ontario-icon-previous.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-previous',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconPrevious {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={previous} />;
  }
};
