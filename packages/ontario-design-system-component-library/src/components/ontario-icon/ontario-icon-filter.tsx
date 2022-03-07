import { Component, Prop, h } from '@stencil/core';
import filter from './assets/ontario-icon-filter.svg';

@Component({
  tag: 'ontario-icon-filter',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconFilter {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={filter} />;
  }
};
