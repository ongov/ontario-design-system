import { Component, Prop, h } from '@stencil/core';
import sentiment5 from './assets/ontario-icon-sentiment-5.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-sentiment-5',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconSentiment5 {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={sentiment5} />;
  }
};
