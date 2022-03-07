import { Component, Prop, h } from '@stencil/core';
import voteLike from './assets/ontario-icon-vote-like.svg';

@Component({
  tag: 'ontario-icon-vote-like',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconVoteLike {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={voteLike} />;
  }
};
