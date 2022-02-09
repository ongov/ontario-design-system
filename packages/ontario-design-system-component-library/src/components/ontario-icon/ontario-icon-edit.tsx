import { Component, Prop, h } from '@stencil/core';
import edit from './assets/ontario-icon-edit.svg';

@Component({
  tag: 'ontario-icon-edit',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconEdit {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={edit} />;
  }
};
