import { Component, Prop, h } from '@stencil/core';
import sentiment3 from './assets/ontario-icon-sentiment-3.svg';

@Component({
  tag: 'ontario-icon-sentiment-3',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconSentiment3 {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={sentiment3} />;
  }
};
