import { Component, Prop, h } from '@stencil/core';
import sentiment2 from './assets/ontario-icon-sentiment-2.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-sentiment-2',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconSentiment2 {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={sentiment2} />;
  }
};
