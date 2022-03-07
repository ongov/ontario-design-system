import { Component, Prop, h } from '@stencil/core';
import mediaFastForward from './assets/ontario-icon-media-fast-forward.svg';

@Component({
  tag: 'ontario-icon-media-fast-forward',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconMediaFastForward {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={mediaFastForward} />;
  }
};
