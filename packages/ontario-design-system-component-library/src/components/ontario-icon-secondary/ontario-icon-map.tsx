import { Component, Prop, h } from '@stencil/core';
import mapIcon from './assets/ontario-icon-map.svg';

@Component({
  tag: 'ontario-icon-map',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconMap {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={mapIcon} />;
  }
};
