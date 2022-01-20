import { Component, Prop, h } from '@stencil/core';
import sentiment3 from './assets/ontario-icon-sentiment-3.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-sentiment-3',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconSentiment3 {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={sentiment3} />;
  }
};
