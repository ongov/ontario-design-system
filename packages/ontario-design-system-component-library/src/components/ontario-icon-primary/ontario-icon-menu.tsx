import { Component, Prop, h } from '@stencil/core';
import menu from './assets/ontario-icon-menu.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-menu',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconMenu {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={menu} />;
  }
};
