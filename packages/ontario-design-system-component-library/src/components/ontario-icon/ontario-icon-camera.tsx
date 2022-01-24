import { Component, Prop, h } from '@stencil/core';
import camera from './assets/ontario-icon-camera.svg';

@Component({
  tag: 'ontario-icon-camera',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconCamera {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={camera} />;
  }
};
