import { Component, Prop, h } from '@stencil/core';
import search from './assets/ontario-icon-search.svg';

@Component({
  tag: 'ontario-icon-search',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconSearch {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={search} />;
  }
};
