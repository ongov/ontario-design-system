import { Component, Prop, h } from '@stencil/core';
import video from './assets/ontario-icon-video.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-video',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconVideo {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={video} />;
  }
};
