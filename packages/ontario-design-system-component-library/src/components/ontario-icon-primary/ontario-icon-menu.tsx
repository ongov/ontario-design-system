import { Component, Prop, h } from '@stencil/core';
import menu from './assets/ontario-icon-menu.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-menu',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class OntarioIconMenu {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={menu} />;
  }
};
