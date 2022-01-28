import { Component, Prop, h } from '@stencil/core';
import expand from './assets/ontario-icon-expand.svg'

@Component({
  tag: 'ontario-icon-expand',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconExpand {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={expand} />;
  }
};
