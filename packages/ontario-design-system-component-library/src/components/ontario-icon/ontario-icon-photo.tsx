import { Component, Prop, h } from '@stencil/core';
import photo from './assets/ontario-icon-photo.svg';

@Component({
  tag: 'ontario-icon-photo',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconPhoto {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={photo} />;
  }
};
