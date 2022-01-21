import { Component, Prop, h } from '@stencil/core';
import deleteIcon from './assets/ontario-icon-delete.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-delete',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconDelete {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={deleteIcon} />;
  }
};
