import { Component, Prop, h } from '@stencil/core';
import favouriteOff from './assets/ontario-icon-favourite-off.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-favourite-off',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconFavouriteOff {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={favouriteOff} />;
  }
};
