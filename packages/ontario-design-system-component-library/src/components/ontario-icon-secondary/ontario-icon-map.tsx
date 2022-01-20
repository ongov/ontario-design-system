import { Component, Prop, h } from '@stencil/core';
import mapIcon from './assets/ontario-icon-map.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-map',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconMap {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={mapIcon} />;
  }
};
