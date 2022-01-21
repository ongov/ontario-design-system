import { Component, Prop, h } from '@stencil/core';
import voteLike from './assets/ontario-icon-vote-like.svg';

@Component({
  tag: 'ontario-icon-vote-like',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconVoteLike {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={voteLike} />;
  }
};
