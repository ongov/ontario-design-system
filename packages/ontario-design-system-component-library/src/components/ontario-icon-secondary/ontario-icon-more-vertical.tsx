import { Component, Prop, h } from '@stencil/core';
import moreVertical from './assets/ontario-icon-more-vertical.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-more-vertical',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconMoreVertical {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={moreVertical} />;
  }
};
