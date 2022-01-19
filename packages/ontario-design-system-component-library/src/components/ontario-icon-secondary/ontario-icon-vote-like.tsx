import { Component, Prop, h } from '@stencil/core';
import voteLike from './assets/ontario-icon-vote-like.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-vote-like',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconVoteLike {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={voteLike} />;
  }
};
