import { Component, Prop, h } from '@stencil/core';
import twitterAlt from './assets/ontario-icon-twitter-alt.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-twitter-alt',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconTwitterAlt {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={twitterAlt} />;
  }
};
