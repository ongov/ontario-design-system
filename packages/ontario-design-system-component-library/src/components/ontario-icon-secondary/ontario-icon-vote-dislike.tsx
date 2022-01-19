import { Component, Prop, h } from '@stencil/core';
import voteDislike from './assets/ontario-icon-vote-dislike.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-vote-dislike',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconVoteDislike {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={voteDislike} />;
  }
};
