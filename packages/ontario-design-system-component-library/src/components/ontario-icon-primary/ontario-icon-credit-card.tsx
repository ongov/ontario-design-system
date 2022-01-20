import { Component, Prop, h } from '@stencil/core';
import expand from './assets/ontario-icon-expand.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-expand',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconExpand {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={expand} />;
  }
};
