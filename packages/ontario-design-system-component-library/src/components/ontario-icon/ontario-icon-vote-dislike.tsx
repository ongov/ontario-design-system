import { Component, Prop, h } from '@stencil/core';
import voteDislike from './assets/ontario-icon-vote-dislike.svg';

@Component({
  tag: 'ontario-icon-vote-dislike',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconVoteDislike {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={voteDislike} />;
  }
};
