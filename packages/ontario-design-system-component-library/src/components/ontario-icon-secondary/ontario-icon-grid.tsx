import { Component, Prop, h } from '@stencil/core';
import grid from './assets/ontario-icon-grid.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-grid',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconGrid {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={grid} />;
  }
};
