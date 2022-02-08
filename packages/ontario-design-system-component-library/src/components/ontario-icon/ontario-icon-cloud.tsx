import { Component, Prop, h } from '@stencil/core';
import cloud from './assets/ontario-icon-cloud.svg';

@Component({
  tag: 'ontario-icon-cloud',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconCloud {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={cloud} />;
  }
};
