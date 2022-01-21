import { Component, Prop, h } from '@stencil/core';
import twitter from './assets/ontario-icon-twitter.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-twitter',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconTwitter {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={twitter} />;
  }
};
