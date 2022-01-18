import { Component, Prop, h } from '@stencil/core';
import camera from './assets/ontario-icon-camera.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-camera',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconCamera {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={camera} />;
  }
};
