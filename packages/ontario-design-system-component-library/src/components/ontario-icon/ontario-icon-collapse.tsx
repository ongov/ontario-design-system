import { Component, Prop, h } from '@stencil/core';
import collapse from './assets/ontario-icon-collapse.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-collapse',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconCollapse {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={collapse} />;
  }
};
