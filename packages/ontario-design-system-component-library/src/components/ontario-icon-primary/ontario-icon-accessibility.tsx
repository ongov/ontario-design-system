import { Component, Prop, h } from '@stencil/core';
import accessibility from './assets/ontario-icon-accessibility.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-accessibility',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class OntarioIconAccessibility {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={accessibility} />;
  }
};
