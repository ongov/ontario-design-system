import { Component, Prop, h } from '@stencil/core';
import mediaStop from './assets/ontario-icon-media-stop.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-media-stop',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconMediaStop {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={mediaStop} />;
  }
};
