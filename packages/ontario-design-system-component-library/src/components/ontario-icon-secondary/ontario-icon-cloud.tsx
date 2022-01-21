import { Component, Prop, h } from '@stencil/core';
import cloud from './assets/ontario-icon-cloud.svg';

@Component({
  tag: 'ontario-icon-cloud',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconCloud {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={cloud} />;
  }
};
