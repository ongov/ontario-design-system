import { Component, Prop, h } from '@stencil/core';
import tag from './assets/ontario-icon-tag.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-tag',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconTag {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={tag} />;
  }
};
