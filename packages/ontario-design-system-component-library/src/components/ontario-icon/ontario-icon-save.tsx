import { Component, Prop, h } from '@stencil/core';
import save from './assets/ontario-icon-save.svg';

@Component({
  tag: 'ontario-icon-save',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconSave {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={save} />;
  }
};
