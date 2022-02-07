import { Component, Prop, h } from '@stencil/core';
import grid from './assets/ontario-icon-grid.svg';

@Component({
  tag: 'ontario-icon-grid',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconGrid {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={grid} />;
  }
};
