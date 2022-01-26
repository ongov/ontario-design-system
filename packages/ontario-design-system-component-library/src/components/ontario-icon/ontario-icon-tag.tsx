import { Component, Prop, h } from '@stencil/core';
import tag from './assets/ontario-icon-tag.svg';

@Component({
  tag: 'ontario-icon-tag',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconTag {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={tag} />;
  }
};
