import { Component, Prop, h } from '@stencil/core';
import removeAlt from './assets/ontario-icon-remove-alt.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-remove-alt',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class OntarioIconRemoveAlt {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={removeAlt} />;
  }
};
