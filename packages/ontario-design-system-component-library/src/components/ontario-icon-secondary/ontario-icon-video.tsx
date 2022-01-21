import { Component, Prop, h } from '@stencil/core';
import video from './assets/ontario-icon-video.svg';

@Component({
  tag: 'ontario-icon-video',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconVideo {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={video} />;
  }
};
