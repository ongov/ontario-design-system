import { Component, Prop, h } from '@stencil/core';
import add from './assets/ontario-icon-add.svg'

@Component({
  tag: 'ontario-icon-add',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconAdd {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={add} />;
  }
};
