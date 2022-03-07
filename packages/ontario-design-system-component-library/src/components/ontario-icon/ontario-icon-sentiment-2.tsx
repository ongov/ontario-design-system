import { Component, Prop, h } from '@stencil/core';
import sentiment2 from './assets/ontario-icon-sentiment-2.svg';

@Component({
  tag: 'ontario-icon-sentiment-2',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconSentiment2 {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={sentiment2} />;
  }
};
