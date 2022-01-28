import { Component, Prop, h } from '@stencil/core';
import twitter from './assets/ontario-icon-twitter.svg';

@Component({
  tag: 'ontario-icon-twitter',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconTwitter {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={twitter} />;
  }
};
