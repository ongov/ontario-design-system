import { Component, Prop, h } from '@stencil/core';
import rssFeed from './assets/ontario-icon-rss-feed.svg';

@Component({
  tag: 'ontario-icon-rss-feed',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconRssFeed {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={rssFeed} />;
  }
};
