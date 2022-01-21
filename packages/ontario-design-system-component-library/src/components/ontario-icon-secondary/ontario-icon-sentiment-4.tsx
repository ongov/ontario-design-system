import { Component, Prop, h } from '@stencil/core';
import sentiment4 from './assets/ontario-icon-sentiment-4.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-sentiment-4',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconSentiment4 {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={sentiment4} />;
  }
};
