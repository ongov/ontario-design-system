import { Component, Prop, h } from '@stencil/core';
import mediaFastForward from './assets/ontario-icon-media-fast-forward.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-media-fast-forward',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconMediaFastForward {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={mediaFastForward} />;
  }
};
