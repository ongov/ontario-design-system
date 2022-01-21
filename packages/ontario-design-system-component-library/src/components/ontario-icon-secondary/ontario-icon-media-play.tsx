import { Component, Prop, h } from '@stencil/core';
import mediaPlay from './assets/ontario-icon-media-play.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-media-play',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconMediaPlay {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={mediaPlay} />;
  }
};
