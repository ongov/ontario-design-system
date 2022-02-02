import { Component, Prop, h } from '@stencil/core';
import mediaStop from './assets/ontario-icon-media-stop.svg';

@Component({
  tag: 'ontario-icon-media-stop',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconMediaStop {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={mediaStop} />;
  }
};
