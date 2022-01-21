import { Component, Prop, h } from '@stencil/core';
import flickr from './assets/ontario-icon-flickr.svg';

@Component({
  tag: 'ontario-icon-flickr',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconFlickr {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={flickr} />;
  }
};
