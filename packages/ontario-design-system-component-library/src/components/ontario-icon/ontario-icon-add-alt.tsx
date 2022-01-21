import { Component, Prop, h } from '@stencil/core';
import addAlt from './assets/ontario-icon-add-alt.svg'

@Component({
  tag: 'ontario-icon-add-alt',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconAddAlt {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={addAlt} />;
  }
};
