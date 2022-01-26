import { Component, Prop, h } from '@stencil/core';
import previous from './assets/ontario-icon-previous.svg';

@Component({
  tag: 'ontario-icon-previous',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconPrevious {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={previous} />;
  }
};
