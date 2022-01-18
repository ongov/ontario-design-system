import { Component, Prop, h } from '@stencil/core';
import flickr from './assets/ontario-icon-flickr.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-flickr',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconFlickr {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={flickr} />;
  }
};
