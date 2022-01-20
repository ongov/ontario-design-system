import { Component, Prop, h } from '@stencil/core';
import list from './assets/ontario-icon-list.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-list',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconList {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={list} />;
  }
};
