import { Component, Prop, h } from '@stencil/core';
import sentiment5 from './assets/ontario-icon-sentiment-5.svg';

@Component({
  tag: 'ontario-icon-sentiment-5',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconSentiment5 {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={sentiment5} />;
  }
};
