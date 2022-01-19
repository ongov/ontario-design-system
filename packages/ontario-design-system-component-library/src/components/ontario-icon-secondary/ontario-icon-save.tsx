import { Component, Prop, h } from '@stencil/core';
import save from './assets/ontario-icon-save.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-save',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconSave {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={save} />;
  }
};
