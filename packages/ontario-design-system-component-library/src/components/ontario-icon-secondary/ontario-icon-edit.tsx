import { Component, Prop, h } from '@stencil/core';
import edit from './assets/ontario-icon-edit.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-edit',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconEdit {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={edit} />;
  }
};
