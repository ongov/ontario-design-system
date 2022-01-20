import { Component, Prop, h } from '@stencil/core';
import favouriteOn from './assets/ontario-icon-favourite-on.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-favourite-on',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconFavouriteOn {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={favouriteOn} />;
  }
};
