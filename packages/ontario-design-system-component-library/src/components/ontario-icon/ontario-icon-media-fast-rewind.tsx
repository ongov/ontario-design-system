import { Component, Prop, h } from '@stencil/core';
import mediaFastRewind from './assets/ontario-icon-media-fast-rewind.svg';

@Component({
  tag: 'ontario-icon-media-fast-rewind',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconMediaFastRewind {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={mediaFastRewind} />;
  }
};
