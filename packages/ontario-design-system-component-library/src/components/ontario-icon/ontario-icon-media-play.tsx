import { Component, Prop, h } from '@stencil/core';
import mediaPlay from './assets/ontario-icon-media-play.svg';

@Component({
  tag: 'ontario-icon-media-play',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconMediaPlay {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={mediaPlay} />;
  }
};
