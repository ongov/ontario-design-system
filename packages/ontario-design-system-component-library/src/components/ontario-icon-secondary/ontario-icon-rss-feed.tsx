import { Component, Prop, h } from '@stencil/core';
import rssFeed from './assets/ontario-icon-rss-feed.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-rss-feed',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconRssFeed {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={rssFeed} />;
  }
};
