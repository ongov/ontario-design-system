import { Component, Prop, h } from '@stencil/core';
import moreVertical from './assets/ontario-icon-more-vertical.svg';

@Component({
  tag: 'ontario-icon-more-vertical',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconMoreVertical {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={moreVertical} />;
  }
};
