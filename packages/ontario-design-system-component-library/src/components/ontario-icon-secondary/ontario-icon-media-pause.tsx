import { Component, Prop, h } from '@stencil/core';
import mediaPause from './assets/ontario-icon-media-pause.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-media-pause',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconMediaPause {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={mediaPause} />;
  }
};
