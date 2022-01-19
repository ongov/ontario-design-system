import { Component, Prop, h } from '@stencil/core';
import pinLocationOn from './assets/ontario-icon-pin-location-on.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-pin-location-on',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconPinLocationOn {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={pinLocationOn} />;
  }
};
