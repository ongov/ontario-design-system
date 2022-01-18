import { Component, Prop, h } from '@stencil/core';
import bookmarkOn from './assets/ontario-icon-bookmark-on.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-bookmark-on',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconBookmarkOn {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={bookmarkOn} />;
  }
};
