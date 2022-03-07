import { Component, Prop, h } from '@stencil/core';
import video from './assets/ontario-icon-video.svg';

@Component({
  tag: 'ontario-icon-video',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconVideo {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={video} />;
  }
};
