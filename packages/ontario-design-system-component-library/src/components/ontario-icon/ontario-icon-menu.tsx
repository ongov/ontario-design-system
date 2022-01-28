import { Component, Prop, h } from '@stencil/core';
import menu from './assets/ontario-icon-menu.svg'

@Component({
  tag: 'ontario-icon-menu',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconMenu {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={menu} />;
  }
};
