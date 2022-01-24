import { Component, Prop, h } from '@stencil/core';
import twitterAlt from './assets/ontario-icon-twitter-alt.svg';

@Component({
  tag: 'ontario-icon-twitter-alt',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconTwitterAlt {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={twitterAlt} />;
  }
};
