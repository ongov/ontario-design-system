import { Component, Prop, h } from '@stencil/core';
import list from './assets/ontario-icon-list.svg';

@Component({
  tag: 'ontario-icon-list',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconList {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={list} />;
  }
};
