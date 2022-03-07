import { Component, Prop, h } from '@stencil/core';
import sentiment4 from './assets/ontario-icon-sentiment-4.svg';

@Component({
  tag: 'ontario-icon-sentiment-4',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconSentiment4 {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={sentiment4} />;
  }
};
