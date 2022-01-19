import { Component, Prop, h } from '@stencil/core';
import locationOff from './assets/ontario-icon-location-off.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-location-off',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconLocationOff {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={locationOff} />;
  }
};
