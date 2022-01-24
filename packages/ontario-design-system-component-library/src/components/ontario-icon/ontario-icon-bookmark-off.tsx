import { Component, Prop, h } from '@stencil/core';
import bookmarkOff from './assets/ontario-icon-bookmark-off.svg';

@Component({
  tag: 'ontario-icon-bookmark-off',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconBookmarkOff {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={bookmarkOff} />;
  }
};
