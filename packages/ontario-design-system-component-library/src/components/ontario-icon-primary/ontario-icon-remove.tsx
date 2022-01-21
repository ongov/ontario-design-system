import { Component, Prop, h } from '@stencil/core';
import remove from './assets/ontario-icon-remove.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-remove',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class OntarioIconRemove {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={remove} />;
  }
};
