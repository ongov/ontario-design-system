import { Component, Prop, h } from '@stencil/core';
import sort from './assets/ontario-icon-sort.svg';

@Component({
  tag: 'ontario-icon-sort',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconSort {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={sort} />;
  }
};
