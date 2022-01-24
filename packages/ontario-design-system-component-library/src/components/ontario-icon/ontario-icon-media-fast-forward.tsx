import { Component, Prop, h } from '@stencil/core';
import mediaFastForward from './assets/ontario-icon-media-fast-forward.svg';

@Component({
  tag: 'ontario-icon-media-fast-forward',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconMediaFastForward {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={mediaFastForward} />;
  }
};
