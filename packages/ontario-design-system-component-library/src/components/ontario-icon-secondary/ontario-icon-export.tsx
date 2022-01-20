import { Component, Prop, h } from '@stencil/core';
import exportIcon from './assets/ontario-icon-export.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-export',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconExport {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={exportIcon} />;
  }
};
