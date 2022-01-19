import { Component, Prop, h } from '@stencil/core';
import locationOn from './assets/ontario-icon-location-on.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-location-on',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconLocationOn {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={locationOn} />;
  }
};
