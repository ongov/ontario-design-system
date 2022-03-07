import { Component, Prop, h } from '@stencil/core';
import mapIcon from './assets/ontario-icon-map.svg';

@Component({
  tag: 'ontario-icon-map',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconMap {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={mapIcon} />;
  }
};
