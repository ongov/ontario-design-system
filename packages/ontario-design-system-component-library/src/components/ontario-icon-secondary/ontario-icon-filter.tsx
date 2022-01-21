import { Component, Prop, h } from '@stencil/core';
import filter from './assets/ontario-icon-filter.svg';

@Component({
  tag: 'ontario-icon-filter',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconFilter {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={filter} />;
  }
};
