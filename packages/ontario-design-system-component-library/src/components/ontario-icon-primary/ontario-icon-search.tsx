import { Component, Prop, h } from '@stencil/core';
import search from './assets/ontario-icon-search.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-search',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconSearch {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={search} />;
  }
};
