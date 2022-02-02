import { Component, Prop, h } from '@stencil/core';
import sentiment1 from './assets/ontario-icon-sentiment-1.svg';

@Component({
  tag: 'ontario-icon-sentiment-1',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconSentiment1 {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={sentiment1} />;
  }
};
