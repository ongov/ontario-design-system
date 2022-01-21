import { Component, Prop, h } from '@stencil/core';
import bookmarkOn from './assets/ontario-icon-bookmark-on.svg';

@Component({
  tag: 'ontario-icon-bookmark-on',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconBookmarkOn {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={bookmarkOn} />;
  }
};
