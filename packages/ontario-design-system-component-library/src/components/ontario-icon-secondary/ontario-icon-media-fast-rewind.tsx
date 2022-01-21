import { Component, Prop, h } from '@stencil/core';
import mediaFastRewind from './assets/ontario-icon-media-fast-rewind.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-media-fast-rewind',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconMediaFastRewind {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={mediaFastRewind} />;
  }
};
