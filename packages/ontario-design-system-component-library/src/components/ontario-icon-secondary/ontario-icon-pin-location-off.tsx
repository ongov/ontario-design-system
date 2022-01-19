import { Component, Prop, h } from '@stencil/core';
import pinLocationOff from './assets/ontario-icon-pin-location-off.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-pin-location-off',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconPinLocationOff {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={pinLocationOff} />;
  }
};
