import { Component, Prop, h } from '@stencil/core';
import youtube from './assets/ontario-icon-youtube.svg';

@Component({
  tag: 'ontario-icon-youtube',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconYoutube {

  @Prop() colour: "black" | "blue" | "grey" | "white" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={youtube} />;
  }
};
